-- ==============================================================================
-- 001_initial_schema.sql
-- Production Supabase Migration for Automated Internship & Job Portal (Pakistan)
-- Enforces:
-- 1. Database-level Verification Gate constraint (4 human confirmations required)
-- 2. Monthly publish cap enforcement (max 12 posts per month)
-- 3. Immutable slug post-publish
-- 4. Expiry / Archive state machine & audit log
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
DO $$ BEGIN
    CREATE TYPE listing_mode AS ENUM ('onsite', 'remote', 'hybrid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE employment_type AS ENUM ('INTERN', 'FULL_TIME', 'PART_TIME', 'CONTRACTOR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE listing_status AS ENUM ('draft', 'pending_review', 'published', 'closed', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Authors Table
CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    bio TEXT NOT NULL,
    avatar_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Settings Table (Singleton)
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY DEFAULT 1,
    monthly_publish_count INT NOT NULL DEFAULT 0,
    publish_cap INT NOT NULL DEFAULT 12,
    last_reset_month DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT single_row_settings CHECK (id = 1)
);

-- Initialize default settings row if empty
INSERT INTO settings (id, monthly_publish_count, publish_cap, last_reset_month)
VALUES (1, 0, 12, CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;

-- 3. Internships & Jobs Table
CREATE TABLE IF NOT EXISTS internships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    mode listing_mode NOT NULL DEFAULT 'onsite',
    employment_type employment_type NOT NULL DEFAULT 'INTERN',
    category TEXT NOT NULL DEFAULT 'computer-science', -- 'engineering', 'computer-science', 'information-technology'
    stipend TEXT, -- Never AI-written. NULL renders literal "Not disclosed by the employer"
    salary_min NUMERIC,
    salary_max NUMERIC,
    salary_currency TEXT DEFAULT 'PKR',
    salary_period TEXT DEFAULT 'MONTH', -- 'MONTH', 'YEAR', 'WEEK', 'HOUR'
    deadline DATE, -- Never AI-written. NULL renders literal "Rolling / Apply ASAP"
    eligibility_nationality TEXT NOT NULL DEFAULT 'Pakistani nationals only',
    eligibility_degree TEXT NOT NULL,
    eligibility_cgpa TEXT,
    eligibility_age TEXT,
    experience_months INT DEFAULT 0,
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    tips JSONB NOT NULL DEFAULT '[]'::jsonb,
    intro TEXT NOT NULL,
    source_url TEXT NOT NULL, -- INTERNAL ONLY! NEVER exposed in public client HTML
    source_checked_on DATE NOT NULL DEFAULT CURRENT_DATE,
    status listing_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    expired_at TIMESTAMPTZ,
    author_id UUID REFERENCES authors(id) ON DELETE RESTRICT,
    meta_description TEXT NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    direct_apply BOOLEAN NOT NULL DEFAULT FALSE,
    company_website TEXT,
    company_logo TEXT,
    
    -- Verification Gate Audit Fields (Human Review Mandatory)
    verified_stipend BOOLEAN NOT NULL DEFAULT FALSE,
    verified_deadline BOOLEAN NOT NULL DEFAULT FALSE,
    verified_nationality BOOLEAN NOT NULL DEFAULT FALSE,
    verified_degree BOOLEAN NOT NULL DEFAULT FALSE,
    verified_by TEXT,
    verified_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- NON-NEGOTIABLE DATABASE CHECK CONSTRAINT:
    -- Cannot be 'published' without all 4 explicit confirmations, author, and reviewer stamp!
    CONSTRAINT chk_verification_gate CHECK (
        status != 'published' OR (
            verified_stipend = TRUE AND
            verified_deadline = TRUE AND
            verified_nationality = TRUE AND
            verified_degree = TRUE AND
            verified_by IS NOT NULL AND
            verified_at IS NOT NULL AND
            author_id IS NOT NULL AND
            published_at IS NOT NULL
        )
    ),
    CONSTRAINT chk_meta_description_length CHECK (
        status != 'published' OR (length(meta_description) >= 120 AND length(meta_description) <= 170)
    )
);

-- Indexing for high-performance query execution & SEO
CREATE INDEX IF NOT EXISTS idx_internships_status_category ON internships(status, category);
CREATE INDEX IF NOT EXISTS idx_internships_published_at ON internships(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_internships_deadline ON internships(deadline);
CREATE INDEX IF NOT EXISTS idx_internships_slug ON internships(slug);

-- 4. Staging Table for Discovery (Stage A)
CREATE TABLE IF NOT EXISTS staging_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL,
    raw_title TEXT,
    raw_company TEXT,
    raw_text TEXT NOT NULL,
    raw_html TEXT,
    status TEXT NOT NULL DEFAULT 'pending_structuring', -- 'pending_structuring', 'structured', 'rejected'
    extracted_data JSONB,
    discovered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Audit Log Table (Tracking all verification & lifecycle changes)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES internships(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    actor TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Trigger: Prevent slug mutation once published
CREATE OR REPLACE FUNCTION prevent_published_slug_mutation()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status = 'published' AND OLD.slug <> NEW.slug THEN
        RAISE EXCEPTION 'Slug cannot be modified once a listing has been published. Old: %, New: %', OLD.slug, NEW.slug;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_published_slug_mutation ON internships;
CREATE TRIGGER trg_prevent_published_slug_mutation
    BEFORE UPDATE ON internships
    FOR EACH ROW
    EXECUTE FUNCTION prevent_published_slug_mutation();

-- 7. Trigger: Enforce Publish Cap (12 per month maximum) and Auto-Increment
CREATE OR REPLACE FUNCTION enforce_monthly_publish_cap()
RETURNS TRIGGER AS $$
DECLARE
    v_cap INT;
    v_count INT;
    v_last_reset DATE;
BEGIN
    -- Check if record is transitioning to published
    IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status <> 'published') THEN
        SELECT publish_cap, monthly_publish_count, last_reset_month 
        INTO v_cap, v_count, v_last_reset 
        FROM settings 
        WHERE id = 1 FOR UPDATE;

        -- Auto-reset monthly counter if calendar month changed
        IF date_trunc('month', CURRENT_DATE) > date_trunc('month', v_last_reset) THEN
            v_count := 0;
            UPDATE settings 
            SET monthly_publish_count = 0, last_reset_month = CURRENT_DATE, updated_at = NOW() 
            WHERE id = 1;
        END IF;

        IF v_count >= v_cap THEN
            RAISE EXCEPTION 'Monthly publish cap of % has been reached. Current count: % in this billing month.', v_cap, v_count;
        END IF;

        -- Increment settings counter
        UPDATE settings 
        SET monthly_publish_count = monthly_publish_count + 1, updated_at = NOW() 
        WHERE id = 1;

        -- Auto set published_at if null
        IF NEW.published_at IS NULL THEN
            NEW.published_at := NOW();
        END IF;

        -- Log audit trail
        INSERT INTO audit_logs (listing_id, action, actor, details)
        VALUES (
            NEW.id,
            'PUBLISHED',
            COALESCE(NEW.verified_by, 'admin'),
            jsonb_build_object('slug', NEW.slug, 'monthly_count', v_count + 1, 'cap', v_cap)
        );
    END IF;

    -- Update timestamp
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_monthly_publish_cap ON internships;
CREATE TRIGGER trg_enforce_monthly_publish_cap
    BEFORE INSERT OR UPDATE ON internships
    FOR EACH ROW
    EXECUTE FUNCTION enforce_monthly_publish_cap();

-- 8. Seed Verified Editorial Board Authors
INSERT INTO authors (id, name, slug, role, bio, avatar_url, linkedin_url, github_url)
VALUES 
(
    'a1000000-0000-0000-0000-000000000001',
    'Wahi ur Rehman',
    'waho',
    'Founder & Chief Career Editor',
    'Wahi ur Rehman is a BS Artificial Intelligence student, AI systems builder, and early-career advocate based in Pakistan. Driven by personal frustration with misleading online job listings, unverified stipend claims, and exploitative unpaid internships targeting university undergraduates, Wahi founded PakInternships with an automated verification pipeline. He oversees platform architecture, programmatic verification constraints, and university partnerships to guarantee students transparent, fully-vetted career opportunities.',
    '/images/authors/waho.jpg',
    'https://www.linkedin.com/in/wahi-abbasi-563593386',
    'https://github.com/Wahi-ur-rehman'
),
(
    'a1000000-0000-0000-0000-000000000002',
    'Ayesha Siddiqui',
    'ayesha-siddiqui',
    'Technical Talent Lead & Campus Recruiter',
    'Ayesha Siddiqui is an engineering talent specialist and campus hiring advisor based in Islamabad. Having coordinated nationwide university drives with premier software consultancies in Islamabad and Lahore, Ayesha directs technical verification for Computer Science, Cloud/DevOps, and Artificial Intelligence opportunities.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'https://linkedin.com/in/ayeshasiddiqui-pk',
    NULL
),
(
    'a1000000-0000-0000-0000-000000000003',
    'Zainab Farooq',
    'zainab-farooq',
    'Banking, FinTech & Corporate Careers Editor',
    'Zainab Farooq is a corporate career consultant and financial analyst based in Karachi. An alumnus of IBA Karachi, Zainab tracks Management Trainee Officer (MTO) drives and financial internships across commercial banks, asset management firms, and digital payment providers in Pakistan.',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    'https://linkedin.com/in/zainab-farooq-pk',
    NULL
),
(
    'a1000000-0000-0000-0000-000000000004',
    'Engr. Muhammad Bilal',
    'muhammad-bilal',
    'Industrial Engineering & PEC Traineeship Mentor',
    'Engr. Muhammad Bilal is a PEC-registered mechanical engineer and industrial operations supervisor in Lahore. He reviews engineering traineeships in manufacturing plants, national energy utilities, automotive assemblers, and renewable power infrastructure across Punjab and Sindh.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://linkedin.com/in/muhammad-bilal-engr',
    NULL
),
(
    'a1000000-0000-0000-0000-000000000005',
    'Fatima Zahra',
    'fatima-zahra',
    'Creative & People Operations Editor',
    'Fatima Zahra is a product design and talent acquisition specialist based in Lahore. She evaluates creative design, UI/UX, digital marketing, and human resources opportunities, ensuring early-career Pakistani candidates receive genuine project ownership and verified compensation.',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    'https://linkedin.com/in/fatima-zahra-talent',
    NULL
) ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Internship (100% Verified, passes all gate constraints)
INSERT INTO internships (
    id, slug, title, company, location, mode, employment_type, category,
    stipend, deadline, eligibility_nationality, eligibility_degree, eligibility_cgpa, eligibility_age,
    experience_months, responsibilities, skills, tips, intro, source_url, source_checked_on,
    status, published_at, author_id, meta_description, featured, direct_apply,
    company_website, company_logo,
    verified_stipend, verified_deadline, verified_nationality, verified_degree, verified_by, verified_at
) VALUES (
    'b2000000-0000-0000-0000-000000000001',
    'software-engineering-intern-systems-limited-lahore-2026',
    'Software Engineering Intern',
    'Systems Limited',
    'Lahore',
    'onsite',
    'INTERN',
    'computer-science',
    'PKR 45,000 / month',
    CURRENT_DATE + INTERVAL '25 days',
    'Pakistani nationals only',
    'Final-year BS Computer Science, Software Engineering, or related technical field',
    'Minimum 3.0 CGPA',
    'Under 26 years',
    0,
    '[
        "Design, build, and debug microservices using C# .NET Core and relational databases.",
        "Collaborate with senior software architects in sprint planning, code reviews, and pair programming.",
        "Author unit and integration tests using xUnit to maintain high test coverage.",
        "Profile SQL queries and optimize RESTful endpoints for low latency."
    ]'::jsonb,
    '["C#", ".NET Core", "SQL Server", "REST APIs", "Git", "Data Structures"]'::jsonb,
    '[
        "Emphasize object-oriented programming principles and your final year project architecture on your CV.",
        "Review common data structure algorithms (hash maps, binary trees, recursion) prior to the technical screen.",
        "Be prepared to explain database normalization and ACID properties with concrete examples."
    ]'::jsonb,
    'Systems Limited is offering an intensive 6-month Software Engineering Internship in Lahore designed for high-achieving Pakistani graduates. Interns will join active engineering squads shipping enterprise-grade platforms.',
    'https://www.systemsltd.com/careers/engineering-intern-2026',
    CURRENT_DATE,
    'published',
    NOW(),
    'a1000000-0000-0000-0000-000000000001',
    'Apply for the Software Engineering Internship at Systems Limited in Lahore. Stipend PKR 45,000/month. Open to final year BS CS & SE students with min 3.0 CGPA.',
    TRUE,
    FALSE,
    'https://www.systemsltd.com',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    TRUE, TRUE, TRUE, TRUE, 'Wahi ur Rehman', NOW()
) ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Full-Time Job (Demonstrating Job Schema & Fallback rules)
INSERT INTO internships (
    id, slug, title, company, location, mode, employment_type, category,
    stipend, salary_min, salary_max, salary_currency, salary_period,
    deadline, eligibility_nationality, eligibility_degree, eligibility_cgpa, eligibility_age,
    experience_months, responsibilities, skills, tips, intro, source_url, source_checked_on,
    status, published_at, author_id, meta_description, featured, direct_apply,
    company_website, company_logo,
    verified_stipend, verified_deadline, verified_nationality, verified_degree, verified_by, verified_at
) VALUES (
    'b2000000-0000-0000-0000-000000000002',
    'junior-cloud-devops-engineer-arbisoft-remote-2026',
    'Junior Cloud DevOps Engineer',
    'Arbisoft',
    'Islamabad',
    'remote',
    'FULL_TIME',
    'information-technology',
    NULL, -- Tests strict fallback rendering: "Not disclosed by the employer"
    120000, 160000, 'PKR', 'MONTH',
    CURRENT_DATE + INTERVAL '18 days',
    'Pakistani nationals only',
    'BS Computer Science, Telecommunications, or Electrical Engineering',
    NULL,
    NULL,
    6,
    '[
        "Provision and maintain scalable AWS infrastructure utilizing Terraform infrastructure-as-code.",
        "Configure automated CI/CD pipelines in GitHub Actions for automated linting and zero-downtime deployment.",
        "Monitor Kubernetes container workloads, cluster metrics, and alerting policies.",
        "Participate in blameless post-mortem investigations and disaster recovery rehearsals."
    ]'::jsonb,
    '["AWS", "Terraform", "Docker", "Kubernetes", "Linux", "Bash", "CI/CD"]'::jsonb,
    '[
        "Demonstrate practical hands-on experience with personal cloud projects or open-source infrastructure scripts.",
        "Be ready to troubleshoot real-world Linux permission and networking bottlenecks during the interview."
    ]'::jsonb,
    'Arbisoft is hiring a Junior Cloud DevOps Engineer for a remote position across Pakistan. You will join an infrastructure team supporting global client web applications with 99.99% availability SLAs.',
    'https://arbisoft.com/careers/devops-junior-2026',
    CURRENT_DATE,
    'published',
    NOW(),
    'a1000000-0000-0000-0000-000000000001',
    'Arbisoft is hiring a Junior Cloud DevOps Engineer (Remote across Pakistan). Terraform, AWS, Docker, Kubernetes. Open to graduates with 6+ months experience.',
    FALSE,
    FALSE,
    'https://arbisoft.com',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
    TRUE, TRUE, TRUE, TRUE, 'Wahi ur Rehman', NOW()
) ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Closed Listing (Demonstrating closed banner state & expired_at past date)
INSERT INTO internships (
    id, slug, title, company, location, mode, employment_type, category,
    stipend, deadline, eligibility_nationality, eligibility_degree, eligibility_cgpa, eligibility_age,
    experience_months, responsibilities, skills, tips, intro, source_url, source_checked_on,
    status, published_at, expired_at, author_id, meta_description, featured, direct_apply,
    company_website, company_logo,
    verified_stipend, verified_deadline, verified_nationality, verified_degree, verified_by, verified_at
) VALUES (
    'b2000000-0000-0000-0000-000000000003',
    'embedded-systems-intern-suparco-islamabad-2026',
    'Embedded Systems Intern',
    'SUPARCO',
    'Islamabad',
    'onsite',
    'INTERN',
    'engineering',
    'PKR 35,000 / month',
    CURRENT_DATE - INTERVAL '10 days',
    'Pakistani nationals only',
    'BS Electrical, Avionics, Mechatronics, or Computer Engineering',
    'Minimum 3.2 CGPA',
    'Under 25 years',
    0,
    '[
        "Develop real-time sensor processing firmware in embedded C for microcontrollers.",
        "Perform PCB hardware bring-up and logic analyzer diagnostics in satellite communications lab.",
        "Document hardware verification test protocols and telemetry interfaces."
    ]'::jsonb,
    '["Embedded C", "Microcontrollers", "RTOS", "Oscilloscopes", "PCB Design"]'::jsonb,
    '[
        "Prepare to answer fundamentals on interrupt handling, timers, and communication protocols (UART, SPI, I2C).",
        "Bring documentation or portfolio of past microcontroller hardware prototypes."
    ]'::jsonb,
    'SUPARCO National Satellite Program completed its specialized internship intake for embedded systems and avionics telemetry development at the Islamabad space center.',
    'https://www.suparco.gov.pk/careers/internship-2026',
    CURRENT_DATE - INTERVAL '40 days',
    'closed',
    NOW() - INTERVAL '40 days',
    NOW() - INTERVAL '10 days',
    'a1000000-0000-0000-0000-000000000001',
    'SUPARCO Embedded Systems Internship in Islamabad. Open to Pakistani nationals in Electrical, Avionics, Mechatronics Engineering. Applications closed.',
    FALSE,
    FALSE,
    'https://www.suparco.gov.pk',
    'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=120&q=80',
    TRUE, TRUE, TRUE, TRUE, 'Wahi ur Rehman', NOW() - INTERVAL '40 days'
) ON CONFLICT (slug) DO NOTHING;
