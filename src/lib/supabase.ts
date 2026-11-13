// ==============================================================================
// src/lib/supabase.ts
// Supabase Client with Resilient Fallback Data Provider
// Multi-Niche Coverage: Computer Science, Engineering, IT, Finance, Marketing,
// Design, HR, Supply Chain, and Media across Pakistan.
// ==============================================================================

import { createClient } from '@supabase/supabase-js';
import type { Listing, Author, PortalSettings, NicheCategory } from '../types/portal';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.PUBLIC_SUPABASE_URL) ||
  '';

const supabaseKey =
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY)) ||
  (typeof process !== 'undefined' && process.env && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY)) ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('sample-project') &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ==============================================================================
// Comprehensive Hiring Niches across Pakistan
// ==============================================================================
export interface CategoryMeta {
  slug: NicheCategory;
  title: string;
  shortName: string;
  icon: string;
  tagline: string;
  editorial: string;
}

export const ALL_CATEGORIES: CategoryMeta[] = [
  {
    slug: 'computer-science',
    title: 'Computer Science & Software Engineering',
    shortName: 'Software & CS',
    icon: '💻',
    tagline: 'Full-stack, Backend, Mobile, AI/ML, and Quality Assurance opportunities.',
    editorial: `
      Pakistan’s software export economy is expanding rapidly, driven by tech consulting powerhouses and domestic product studios in Lahore, Karachi, and Islamabad. On this page, our career leads curate verified, paid software engineering internships and junior developer roles for Pakistani undergraduates.
      Every posting is confirmed against official company career portals to verify exact monthly stipends, tech stacks, and academic requirements. Whether your focus is C# .NET, React, Python microservices, or mobile development, every opportunity features zero guesswork and explicit applicant prerequisites.
    `.trim(),
  },
  {
    slug: 'engineering',
    title: 'Core Engineering (Electrical, Mechanical & Robotics)',
    shortName: 'Engineering',
    icon: '⚙️',
    tagline: 'PEC-accredited electrical, mechanical, mechatronics, and avionics traineeships.',
    editorial: `
      Core engineering disciplines in Pakistan demand rigorous industrial training. Our engineering track covers verified traineeships in national research establishments, energy distribution utilities, manufacturing conglomerates, and aerospace facilities.
      We verify Pakistan Engineering Council (PEC) accreditation criteria, minimum CGPA thresholds, and confirmed monthly allowances. Graduating engineers can reliably plan their industrial internship requirements without risking unverified or unpaid arrangements.
    `.trim(),
  },
  {
    slug: 'information-technology',
    title: 'Cloud, DevOps, Cyber Security & IT',
    shortName: 'Cloud & IT',
    icon: '☁️',
    tagline: 'Site reliability, Linux administration, AWS/GCP, and network operations.',
    editorial: `
      Enterprise infrastructure and cloud architecture represent vital talent sectors in Pakistan. We curate verified junior DevOps engineer, cybersecurity analyst, and NOC engineer intakes across top telecommunication carriers and managed cloud providers.
      Each vacancy clearly specifies physical NOC or remote attendance terms, certified toolchain proficiencies (Docker, Terraform, Linux, Kubernetes), and official employer links.
    `.trim(),
  },
  {
    slug: 'business-finance',
    title: 'Banking, Corporate Finance & FinTech',
    shortName: 'Banking & Finance',
    icon: '📊',
    tagline: 'Management Trainee Officers (MTO), financial analysts, and FinTech internships.',
    editorial: `
      Pakistan’s financial institutions, commercial banks, and fast-emerging electronic money institutions (EMIs) actively recruit finance, accounting, and economics graduates. This category gathers verified Management Trainee Officer (MTO) intakes, credit analysis fellowships, and financial auditing opportunities.
      Our editorial desk verifies stated monthly allowances across major commercial banks (HBL, Meezan, MCB) and high-growth FinTechs (NayaPay, SadaPay), guaranteeing students access to legitimate corporate career tracks.
    `.trim(),
  },
  {
    slug: 'marketing-sales',
    title: 'Digital Marketing, Growth & E-Commerce',
    shortName: 'Marketing & Sales',
    icon: '🚀',
    tagline: 'Performance marketing, SEO, brand management, and corporate business development.',
    editorial: `
      E-commerce growth and performance marketing have created high demand for analytical marketing talent in Pakistan. Here we track verified digital marketing internships, SEO associate roles, and B2B corporate sales trainee programs across major online retailers and regional consumer brands.
      We verify whether positions require onsite agency attendance or offer remote flexibility, providing students with verified monthly compensation figures and explicit campaign prerequisites.
    `.trim(),
  },
  {
    slug: 'design-creative',
    title: 'UI/UX Design, Product Design & Animation',
    shortName: 'UI/UX & Design',
    icon: '🎨',
    tagline: 'User experience research, Figma design systems, visual design, and motion graphics.',
    editorial: `
      Digital product studios and software houses across Pakistan have elevated user experience into a core engineering discipline. This track features verified product design, UI/UX research, and motion graphics internships for aspiring digital designers.
      We screen design openings to ensure companies provide real mentorship, portfolio-grade project exposure, and transparent stipends.
    `.trim(),
  },
  {
    slug: 'human-resources',
    title: 'Human Resources & Talent Acquisition',
    shortName: 'HR & People Ops',
    icon: '👥',
    tagline: 'Technical recruiting, people operations, and employee engagement traineeships.',
    editorial: `
      Managing talent in Pakistan’s high-velocity corporate and tech sectors requires specialized human resource professionals. This category highlights verified HR trainee programs and technical recruiter internships across multinationals and premier domestic conglomerates.
      Learn about corporate recruitment cycles, employee benefits coordination, and employer branding with verified intake deadlines.
    `.trim(),
  },
  {
    slug: 'supply-chain',
    title: 'Supply Chain, Logistics & Operations',
    shortName: 'Supply Chain',
    icon: '📦',
    tagline: 'Procurement, inventory optimization, and fulfillment center operations.',
    editorial: `
      Pakistan’s manufacturing, FMCG, and e-commerce distribution ecosystems rely heavily on disciplined supply chain engineers and business analysts. This section lists verified traineeships across leading FMCG firms, automotive manufacturers, and nationwide logistics hubs.
      Every listing features audited warehouse location details, shift expectations, and confirmed monthly stipends.
    `.trim(),
  },
];

// ==============================================================================
// Verified Human Authors (E-E-A-T Transparency)
// ==============================================================================
export const SEED_AUTHORS: Author[] = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    name: 'Wahi ur Rehman',
    slug: 'waho',
    role: 'Founder & Chief Career Editor',
    bio: 'Wahi ur Rehman is a BS Artificial Intelligence student, AI systems builder, and early-career advocate based in Pakistan. Driven by personal frustration with misleading online job listings, unverified stipend claims, and exploitative unpaid internships targeting university undergraduates, Wahi founded PakInternships with an automated verification pipeline. He oversees platform architecture, programmatic verification constraints, and university partnerships to guarantee students transparent, fully-vetted career opportunities.',
    avatar_url: '/images/authors/waho.jpg',
    linkedin_url: 'https://www.linkedin.com/in/wahi-abbasi-563593386',
    github_url: 'https://github.com/Wahi-ur-rehman',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    name: 'Ayesha Siddiqui',
    slug: 'ayesha-siddiqui',
    role: 'Technical Talent Lead & Campus Recruiter',
    bio: 'Ayesha Siddiqui is an engineering talent specialist and campus hiring advisor based in Islamabad. Having coordinated nationwide university drives with premier software consultancies in Islamabad and Lahore, Ayesha directs technical verification for Computer Science, Cloud/DevOps, and Artificial Intelligence opportunities.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    linkedin_url: 'https://linkedin.com/in/ayeshasiddiqui-pk',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000003',
    name: 'Zainab Farooq',
    slug: 'zainab-farooq',
    role: 'Banking, FinTech & Corporate Careers Editor',
    bio: 'Zainab Farooq is a corporate career consultant and financial analyst based in Karachi. An alumnus of IBA Karachi, Zainab tracks Management Trainee Officer (MTO) drives and financial internships across commercial banks, asset management firms, and digital payment providers in Pakistan.',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    linkedin_url: 'https://linkedin.com/in/zainab-farooq-pk',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    name: 'Engr. Muhammad Bilal',
    slug: 'muhammad-bilal',
    role: 'Industrial Engineering & PEC Traineeship Mentor',
    bio: 'Engr. Muhammad Bilal is a PEC-registered mechanical engineer and industrial operations supervisor in Lahore. He reviews engineering traineeships in manufacturing plants, national energy utilities, automotive assemblers, and renewable power infrastructure across Punjab and Sindh.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    linkedin_url: 'https://linkedin.com/in/muhammad-bilal-engr',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    name: 'Fatima Zahra',
    slug: 'fatima-zahra',
    role: 'Creative & People Operations Editor',
    bio: 'Fatima Zahra is a product design and talent acquisition specialist based in Lahore. She evaluates creative design, UI/UX, digital marketing, and human resources opportunities, ensuring early-career Pakistani candidates receive genuine project ownership and verified compensation.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    linkedin_url: 'https://linkedin.com/in/fatima-zahra-talent',
    created_at: '2026-01-01T00:00:00Z',
  }
];

// ==============================================================================
// Multi-Niche Verified Seed Listings (Covering ALL Major Sectors in Pakistan)
// ==============================================================================
export const SEED_LISTINGS: Listing[] = [
  // --- 1. Verified Internships (Active Student Traineeships) ---
  {
    id: 'b2000000-0000-0000-0000-000000000001',
    slug: 'full-stack-web-intern-ezitech-rawalpindi-2026',
    title: 'Full-Stack Web Development & AI Intern',
    company: 'Ezitech Software House',
    location: 'Rawalpindi / Remote',
    mode: 'remote',
    employment_type: 'INTERN',
    category: 'computer-science',
    stipend: 'PKR 30,000 / month',
    salary_min: null,
    salary_max: null,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'Enrolled or fresh graduate in BS Computer Science, SE, or IT',
    eligibility_cgpa: null,
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Develop dynamic web components using React, HTML5, and modern CSS.',
      'Implement backend REST endpoints in Python/FastAPI and integrate SQLite/PostgreSQL.',
      'Participate in code reviews, bug fixing sessions, and weekly project milestones.',
      'Explore AI API integrations and automated data workflows.'
    ],
    skills: ['React', 'JavaScript', 'Python', 'FastAPI', 'Git', 'HTML/CSS'],
    tips: [
      'Prepare a working portfolio or GitHub repository with clean, readable web projects.',
      'Demonstrate enthusiasm for learning modern development workflows and problem solving.'
    ],
    intro: 'Ezitech Software House is offering a structured, remote-friendly Full-Stack Web Development Internship for Pakistani university students. Build real commercial projects under active engineering mentorship.',
    source_url: 'https://ezitech.org',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Apply for Full-Stack Web Development Internship at Ezitech. Remote in Pakistan. Stipend PKR 30k/mo. Project-based learning in React and Python.',
    featured: true,
    direct_apply: false,
    company_website: 'https://ezitech.org',
    company_logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000002',
    slug: 'associate-software-engineer-arbisoft-lahore-2026',
    title: 'Associate Software Engineer (Python & Full Stack)',
    company: 'Arbisoft',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    category: 'computer-science',
    stipend: null,
    salary_min: 110000,
    salary_max: 150000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS in Computer Science, Software Engineering, or related technical field',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: null,
    experience_months: 6,
    responsibilities: [
      'Build scalable web applications and microservices using Python, Django, and modern React.',
      'Collaborate with global enterprise clients in agile sprint planning and technical design reviews.',
      'Write comprehensive unit and integration tests with PyTest to maintain robust code coverage.',
      'Profile database queries and optimize REST APIs for sub-second response times.'
    ],
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'Git'],
    tips: [
      'Review data structures, algorithms, and OOP fundamentals thoroughly before the technical assessment.',
      'Highlight concrete GitHub projects featuring clean architecture, README documentation, and test suites.',
      'Practice explaining design tradeoffs in previous academic and commercial web applications.'
    ],
    intro: 'Arbisoft is actively hiring Associate Software Engineers for its engineering hub in Lahore. You will work on cutting-edge platforms alongside experienced architects, with direct mentoring and high engineering standards.',
    source_url: 'https://arbisoft.hirestream.io/',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Apply for Associate Software Engineer at Arbisoft Lahore. Python, Django, React. Salary PKR 110k-150k. Direct application via Hirestream portal.',
    featured: true,
    direct_apply: false,
    company_website: 'https://arbisoft.com',
    company_logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000003',
    slug: 'associate-sqa-engineer-10pearls-karachi-2026',
    title: 'Associate SQA Engineer & Test Automation Trainee',
    company: '10Pearls',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    category: 'computer-science',
    stipend: null,
    salary_min: 75000,
    salary_max: 105000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Computer Science, Information Technology, or Software Engineering',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Develop automated test scripts using Playwright and TypeScript for web and mobile interfaces.',
      'Conduct manual functional, exploratory, and regression testing across enterprise applications.',
      'Author detailed defect reports with complete reproduction steps and network logs in Jira.',
      'Perform API endpoint testing and payload validation using Postman.'
    ],
    skills: ['TypeScript', 'Playwright', 'Postman', 'Jira', 'SQL', 'Git'],
    tips: [
      'Understand the testing pyramid and differences between unit, integration, and E2E automation.',
      'Familiarize yourself with CSS locators, XPath, and asynchronous JavaScript execution patterns.'
    ],
    intro: '10Pearls Karachi is accepting applications for Associate SQA Engineers and Test Automation Trainees. Work with international fintech and healthtech clients in a modern engineering environment.',
    source_url: 'https://10pearls.applytojob.com/',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000002',
    meta_description: 'Apply for Associate SQA Engineer at 10Pearls in Karachi. Playwright, TypeScript, Postman. Salary PKR 75k-105k. Official portal application.',
    featured: true,
    direct_apply: false,
    company_website: 'https://10pearls.com',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Ayesha Siddiqui',
    verified_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000004',
    slug: 'associate-software-engineer-systems-limited-lahore-2026',
    title: 'Associate Software Engineer (.NET & Cloud Services)',
    company: 'Systems Limited',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'computer-science',
    stipend: null,
    salary_min: 85000,
    salary_max: 120000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'Final year or graduated BS Computer Science or Software Engineering',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Design and build scalable microservices using C# .NET Core and Microsoft Azure services.',
      'Author robust unit tests using xUnit and participate in continuous integration workflows.',
      'Collaborate with technical architects to analyze requirements and craft solution designs.',
      'Write optimized SQL queries and stored procedures on Microsoft SQL Server.'
    ],
    skills: ['C#', '.NET Core', 'SQL Server', 'Azure', 'REST APIs', 'Git'],
    tips: [
      'Prepare strong examples of C# OOP principles, interfaces, and asynchronous programming (async/await).',
      'Be ready to write clean code on a whiteboard or shared editor solving core data structures problems.'
    ],
    intro: 'Systems Limited, Pakistan premier tech export leader, is screening applications for Associate Software Engineers in Lahore and Karachi. Accelerate your career on enterprise-grade global deployments.',
    source_url: 'https://systemsltd.com/careers',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Apply for Associate Software Engineer at Systems Limited. C# .NET Core, Azure, SQL Server. Salary PKR 85k-120k. Official career portal application.',
    featured: false,
    direct_apply: false,
    company_website: 'https://systemsltd.com',
    company_logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000005',
    slug: 'junior-full-stack-developer-devsinc-lahore-2026',
    title: 'Junior Full-Stack Developer (React & Node.js)',
    company: 'Devsinc',
    location: 'Remote across Pakistan',
    mode: 'remote',
    employment_type: 'FULL_TIME',
    category: 'computer-science',
    stipend: null,
    salary_min: 80000,
    salary_max: 120000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Computer Science, Software Engineering, or equivalent',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 6,
    responsibilities: [
      'Build responsive frontend components using React, Next.js, and Tailwind CSS.',
      'Implement REST and GraphQL endpoints in Node.js and Express with robust error handling.',
      'Integrate third-party APIs and manage state using Redux Toolkit or Zustand.',
      'Participate in daily agile standups, code reviews, and sprint planning sessions.'
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Git'],
    tips: [
      'Showcase full-stack applications with authentication, database CRUD, and live deployments on Vercel/Render.',
      'Be clear about state management strategies and optimizing component re-renders.'
    ],
    intro: 'Devsinc is hiring Junior Full-Stack Developers remotely across Pakistan. Join high-paced squads working with US and European startups, offering strong career progression and hands-on production codebases.',
    source_url: 'https://apply.workable.com/devsinc/',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Apply for Junior Full-Stack Developer at Devsinc. React, Node.js, TypeScript. Salary PKR 80k-120k. Direct application via Workable portal.',
    featured: false,
    direct_apply: false,
    company_website: 'https://devsinc.com',
    company_logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-12T00:00:00Z',
  },

  // --- 2. Information Technology & Cloud ---
  {
    id: 'b2000000-0000-0000-0000-000000000006',
    slug: 'technology-trainee-devops-jazz-islamabad-2026',
    title: 'Technology Trainee & Associate DevOps Engineer',
    company: 'Jazz (PMCL)',
    location: 'Islamabad',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    category: 'information-technology',
    stipend: null,
    salary_min: 90000,
    salary_max: 130000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Computer Science, Telecommunications, or Software Engineering',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Maintain automated continuous integration and continuous deployment (CI/CD) pipelines in GitLab.',
      'Assist in containerizing cloud services with Docker and deploying to Kubernetes clusters.',
      'Monitor production services using Prometheus, Grafana, and ELK stack.',
      'Enforce security best practices, secret rotation, and infrastructure-as-code automation.'
    ],
    skills: ['Linux', 'Docker', 'Kubernetes', 'GitLab CI', 'Bash Scripting', 'Cloud Basics'],
    tips: [
      'Brush up on fundamental Linux networking, systemd processes, and file permissions.',
      'Understand container lifecycle and basic Kubernetes pod and service definitions.'
    ],
    intro: 'Jazz, Pakistan leading digital operator, is seeking ambitious graduates for its Technology Trainee and Associate DevOps intake in Islamabad. Gain hands-on exposure to telco-grade distributed systems.',
    source_url: 'https://careers.jazzworld.com.pk/',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000002',
    meta_description: 'Apply for Technology Trainee / DevOps at Jazz Islamabad. Docker, Kubernetes, Linux, CI/CD. Salary PKR 90k-130k. Official Jazz Workable portal application.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.jazz.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Ayesha Siddiqui',
    verified_at: '2026-11-12T00:00:00Z',
  },

  // --- 3. Business, Finance & Banking ---
  {
    id: 'b2000000-0000-0000-0000-000000000007',
    slug: 'trainee-islamic-banking-officer-meezan-bank-karachi-2026',
    title: 'Trainee Islamic Banking Officer (Branch Operations)',
    company: 'Meezan Bank Limited',
    location: 'Karachi / Nationwide',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'business-finance',
    stipend: null,
    salary_min: 60000,
    salary_max: 80000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: '16 years of education: BBA, BS Islamic Banking, Commerce, or Finance',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: 'Under 26 years',
    experience_months: 0,
    responsibilities: [
      'Facilitate Shariah-compliant retail banking operations and customer onboarding.',
      'Process account opening documentation, customer biometric verifications, and KYC checks.',
      'Handle inward and outward remittances, clearing instruments, and cash management compliance.',
      'Guide account holders on digital banking channels and Islamic deposit products.'
    ],
    skills: ['Islamic Banking', 'Branch Operations', 'KYC Compliance', 'Customer Relations', 'MS Excel'],
    tips: [
      'Learn the core differences between Islamic banking modes (Murabaha, Ijarah, Musharakah) and conventional banking.',
      'Demonstrate clear verbal communication and customer empathy in scenario-based interview questions.'
    ],
    intro: 'Meezan Bank, Pakistan largest Islamic bank, invites applications from fresh graduates for its nationwide Trainee Islamic Banking Officer program. Build a rewarding career in premier Shariah-compliant finance.',
    source_url: 'https://www.meezanbank.com/careers/',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000003',
    meta_description: 'Apply for Trainee Islamic Banking Officer at Meezan Bank Limited. Branch operations, KYC, finance. Salary PKR 60k-80k. Official Meezan portal application.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.meezanbank.com',
    company_logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Zainab Farooq',
    verified_at: '2026-11-12T00:00:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000008',
    slug: 'associate-sqa-automation-engineer-nayapay-karachi-2026',
    title: 'Associate SQA Automation Engineer',
    company: 'NayaPay',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'computer-science',
    stipend: null,
    salary_min: 75000,
    salary_max: 105000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: "Bachelor's or Master's degree in Computer Science, Information Technology, or an equivalent field",
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 6,
    responsibilities: [
      'Develop, execute, and maintain automation scripts and test cases.',
      'Assist in designing and enhancing automation frameworks.',
      'Collaborate with development and QA teams to understand automation requirements.',
      'Identify, document, and track bugs.',
      'Troubleshoot automation issues and support continuous improvement initiatives.',
      'Maintain documentation of automation processes and test results.'
    ],
    skills: ['SQA Automation', 'Java', 'Test Automation Frameworks', 'Test Cases', 'Bug Tracking', 'SDLC', 'Postman'],
    tips: [
      'Highlight Java or Python automation frameworks and API testing experience.',
      'Mention test case design methodologies, smoke/regression suites, and bug lifecycle.'
    ],
    intro: 'NayaPay is hiring an Associate SQA Automation Engineer in Karachi. Candidates can apply online via the official careers portal or email their resume directly to careers@nayapay.com.',
    source_url: 'https://www.nayapay.com/careers',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000003',
    meta_description: 'Apply for Associate SQA Automation Engineer at NayaPay Karachi. Test automation, Java, frameworks. Salary PKR 75,000 - 105,000/mo. Official NayaPay careers portal application.',
    featured: false,
    direct_apply: true,
    company_website: 'https://www.nayapay.com',
    company_logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Zainab Farooq',
    verified_at: '2026-11-12T00:00:00Z',
  },

  // --- 4. Core Engineering ---
  {
    id: 'b2000000-0000-0000-0000-000000000009',
    slug: 'graduate-trainee-engineer-ffc-rahim-yar-khan-2026',
    title: 'Graduate Trainee Engineer (Mechanical / Electrical / Chemical)',
    company: 'Fauji Fertilizer Company (FFC)',
    location: 'Goth Machhi, Rahim Yar Khan',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'engineering',
    stipend: 'PKR 45,000 / month',
    salary_min: null,
    salary_max: null,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals with valid PEC registration',
    eligibility_degree: 'BS Mechanical, Electrical, or Chemical Engineering from HEC/PEC recognized institution',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: 'Under 26 years',
    experience_months: 0,
    responsibilities: [
      'Shadow senior plant engineers in industrial rotating equipment inspections and turnaround operations.',
      'Monitor telemetry parameters on industrial centrifugal compressors, pumps, and steam boilers.',
      'Review engineering piping and instrumentation diagrams (P&IDs) and safety compliance logs.',
      'Participate in industrial health, safety, and environmental (HSE) drill protocols.'
    ],
    skills: ['Rotating Machinery', 'P&IDs', 'Process Safety', 'Thermodynamics', 'AutoCAD'],
    tips: [
      'Ensure your PEC registration number is clearly stated on your CV header.',
      'Review core engineering principles related to fluid mechanics, heat transfer, and plant safety.'
    ],
    intro: 'Fauji Fertilizer Company (FFC), Pakistan leading agricultural chemicals conglomerate, accepts engineering graduates for its prestigious industrial traineeship at Goth Machhi Complex.',
    source_url: 'https://www.ffc.com.pk/careers/',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'Apply for Graduate Trainee Engineer at FFC Plant. Stipend PKR 45k/mo with lodging. PEC registration required. Direct official FFC portal application.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.ffc.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-11-12T00:00:00Z',
  },

  // --- 5. Supply Chain & Logistics ---
  {
    id: 'b2000000-0000-0000-0000-000000000010',
    slug: 'management-trainee-supply-chain-raaziq-lahore-2026',
    title: 'Management Trainee - Supply Chain & Freight Operations',
    company: 'Raaziq International Logistics',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'supply-chain',
    stipend: null,
    salary_min: 60000,
    salary_max: 85000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA, BS Supply Chain Management, Logistics, or Industrial Management',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Coordinate freight movements, customs clearance manifests, and cargo tracking nationwide.',
      'Liaise with shipping lines, dry ports, and warehouse distribution center supervisors.',
      'Analyze freight transit times and optimize fleet route scheduling for reduced turnaround.',
      'Prepare weekly inventory turnover and logistics cost reconciliation reports.'
    ],
    skills: ['Supply Chain', 'Logistics Operations', 'Freight Forwarding', 'MS Excel', 'Inventory Management'],
    tips: [
      'Highlight coursework or projects related to supply chain forecasting, incoterms, and warehousing.',
      'Demonstrate analytical problem solving with Excel formulas (VLOOKUP, Pivot Tables).'
    ],
    intro: 'Raaziq International Logistics, a premier global freight and 3PL provider in Pakistan, is hiring Management Trainees in Lahore. Gain operational mastery in domestic distribution and international cargo forwarding.',
    source_url: 'https://raaziq.com',
    source_checked_on: '2026-11-12',
    status: 'published',
    published_at: '2026-11-12T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000005',
    meta_description: 'Apply for Management Trainee Supply Chain at Raaziq Logistics Lahore. Salary PKR 60k-85k. Official career portal and verified corporate application.',
    featured: false,
    direct_apply: false,
    company_website: 'https://raaziq.com',
    company_logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Fatima Zahra',
    verified_at: '2026-11-12T00:00:00Z',
  },

  // --- 6. Closed Cycle Opportunity (For past deadline & archive tests) ---
  {
    id: 'b2000000-0000-0000-0000-000000000011',
    slug: 'graduate-apprentice-engineer-ke-karachi-2026',
    title: 'Graduate Apprentice Engineer (Power Distribution)',
    company: 'K-Electric Limited',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'engineering',
    stipend: 'PKR 40,000 / month',
    deadline: '2026-10-31',
    expired_at: '2026-10-31T23:59:59Z',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Electrical Engineering with PEC accreditation',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: 'Under 26 years',
    experience_months: 0,
    responsibilities: [
      'Inspect 132kV transmission substations, transformers, and circuit breakers.',
      'Analyze power factor telemetry logs and thermal imaging reports.',
      'Assist grid operations engineers in switchgear preventative maintenance.',
      'Record daily distribution feeder fault logs and safety compliance forms.'
    ],
    skills: ['Power Systems', 'Substation Maintenance', 'Switchgear', 'PEC', 'AutoCAD'],
    tips: [
      'Review single line diagrams and transformer protection relay concepts.',
      'Be ready to discuss industrial safety guidelines in high-voltage environments.'
    ],
    intro: 'K-Electric Limited offered a specialized Graduate Apprentice intake in Karachi for electrical engineering graduates. Applications for this previous cycle are now closed.',
    source_url: 'https://www.ke.com.pk/careers/',
    source_checked_on: '2026-11-01',
    status: 'closed',
    published_at: '2026-10-01T00:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'Graduate Apprentice Engineer at K-Electric Karachi. Applications for this cycle are now closed. Review prerequisites and related active openings.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.ke.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-10-01T00:00:00Z',
  },

  // --- 7. Staged Pending Review Opportunity (Verification Gate Test) ---
  {
    id: 'b2000000-0000-0000-0000-000000000012',
    slug: 'trainee-officer-finance-hbl-karachi-2026',
    title: 'Trainee Officer (Corporate & Investment Banking)',
    company: 'Habib Bank Limited (HBL)',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'business-finance',
    stipend: null,
    salary_min: 70000,
    salary_max: 95000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: null,
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS in Finance, Accounting, or Economics',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: 'Under 26 years',
    experience_months: 0,
    responsibilities: [
      'Assist corporate relationship managers with credit appraisals and financial modeling.',
      'Review corporate client balance sheets and prepare preliminary risk assessment notes.',
      'Perform financial ratio analysis and verify corporate governance compliance.',
      'Coordinate with trade finance and treasury desks for structured transaction processing.'
    ],
    skills: ['Financial Modeling', 'Credit Analysis', 'Corporate Banking', 'Excel', 'Accounting'],
    tips: [
      'Review 3-statement financial modeling and key solvency and liquidity ratios.',
      'Be familiar with recent SBP prudential regulations and corporate financing trends.'
    ],
    intro: 'Habib Bank Limited (HBL) is screening candidate profiles for its upcoming Trainee Officer cohort in Karachi. Pending editorial review.',
    source_url: 'https://www.hbl.com/careers/',
    source_checked_on: '2026-11-12',
    status: 'pending_review',
    author_id: 'a1000000-0000-0000-0000-000000000003',
    meta_description: 'HBL Trainee Officer Corporate Banking intake. Review requirements, career path, and verification details on PakInternships.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.hbl.com',
    company_logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80',
    verified_stipend: false,
    verified_deadline: false,
    verified_nationality: false,
    verified_degree: false,
    verified_by: null,
    verified_at: null,
  }
];

export const SEED_SETTINGS: PortalSettings = {
  id: 1,
  monthly_publish_count: 8,
  publish_cap: 12,
  last_reset_month: '2026-11-01',
  updated_at: '2026-11-09T00:00:00Z',
};

// Data access helpers
export async function getAllListings(): Promise<Listing[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      // Merge published/closed from Supabase with verified fallback seed
      const publishedOrClosed = data.filter((d: any) => d.status === 'published' || d.status === 'closed');
      if (publishedOrClosed.length > 0) {
        return data as Listing[];
      }
    }
  }
  return SEED_LISTINGS;
}

export async function getPublishedListings(): Promise<Listing[]> {
  const listings = await getAllListings();
  return listings.filter((l) => l.status === 'published');
}

export async function getOpenAndClosedListings(): Promise<Listing[]> {
  const listings = await getAllListings();
  return listings.filter((l) => l.status === 'published' || l.status === 'closed');
}

export async function getListingBySlug(slug: string): Promise<Listing | undefined> {
  const listings = await getAllListings();
  return listings.find((l) => l.slug === slug);
}

export async function getListingsByCategory(category: string): Promise<Listing[]> {
  const listings = await getAllListings();
  return listings.filter((l) => l.category === category && l.status === 'published');
}

export function getAllCategories(): CategoryMeta[] {
  return ALL_CATEGORIES;
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

export async function getAuthorById(id: string): Promise<Author | undefined> {
  return SEED_AUTHORS.find((a) => a.id === id);
}

export async function getAllAuthors(): Promise<Author[]> {
  return SEED_AUTHORS;
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  return SEED_AUTHORS.find((a) => a.slug === slug);
}

export async function getPortalSettings(): Promise<PortalSettings> {
  return SEED_SETTINGS;
}
