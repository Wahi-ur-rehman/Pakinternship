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
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
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
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    linkedin_url: 'https://linkedin.com/in/fatima-zahra-talent',
    created_at: '2026-01-01T00:00:00Z',
  }
];

// ==============================================================================
// Multi-Niche Verified Seed Listings (Covering ALL Major Sectors in Pakistan)
// ==============================================================================
export const SEED_LISTINGS: Listing[] = [
  // --- 1. Computer Science ---
  {
    id: 'b2000000-0000-0000-0000-000000000001',
    slug: 'software-engineering-intern-systems-limited-lahore-2026',
    title: 'Software Engineering Intern',
    company: 'Systems Limited',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'computer-science',
    stipend: 'PKR 45,000 / month',
    deadline: '2026-12-15',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'Final-year BS Computer Science, Software Engineering, or related discipline',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: 'Under 26 years',
    experience_months: 0,
    responsibilities: [
      'Design, build, and debug microservices using C# .NET Core and relational databases.',
      'Collaborate with senior software architects in sprint planning, code reviews, and pair programming.',
      'Author unit and integration tests using xUnit to maintain high test coverage.',
      'Profile SQL queries and optimize RESTful endpoints for low latency.'
    ],
    skills: ['C#', '.NET Core', 'SQL Server', 'REST APIs', 'Git', 'Data Structures'],
    tips: [
      'Emphasize object-oriented programming principles and your final year project architecture on your CV.',
      'Review common data structure algorithms (hash maps, binary trees, recursion) prior to the technical screen.',
      'Be prepared to explain database normalization and ACID properties with concrete examples.'
    ],
    intro: 'Systems Limited is offering an intensive 6-month Software Engineering Internship in Lahore designed for high-achieving Pakistani graduates. Interns will join active engineering squads shipping enterprise-grade platforms.',
    source_url: 'https://www.systemsltd.com/careers/engineering-intern-2026',
    source_checked_on: '2026-11-05',
    status: 'published',
    published_at: '2026-11-01T08:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Apply for the Software Engineering Internship at Systems Limited in Lahore. Stipend PKR 45,000/month. Open to final year BS CS & SE students with min 3.0 CGPA.',
    featured: true,
    direct_apply: false,
    company_website: 'https://www.systemsltd.com',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-01T07:45:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000004',
    slug: 'qa-automation-intern-10pearls-karachi-2026',
    title: 'QA Automation Intern',
    company: '10Pearls',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'INTERN',
    category: 'computer-science',
    stipend: 'PKR 40,000 / month',
    deadline: null, // Tests "Rolling / Apply ASAP"
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Computer Science, IT, or Software Engineering',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Write automated end-to-end regression test scripts with Playwright and TypeScript.',
      'Execute manual functional test cases across modern web and mobile applications.',
      'Log detailed bug reports with repro steps, network logs, and console traces in Jira.',
      'Collaborate with developers to verify fixes during pre-release staging.'
    ],
    skills: ['TypeScript', 'Playwright', 'Selenium', 'Postman', 'Git', 'Jira'],
    tips: [
      'Demonstrate basic understanding of locator strategies and asynchronous execution.',
      'Familiarize yourself with the differences between integration tests and end-to-end tests.'
    ],
    intro: '10Pearls Karachi is accepting applications for a hybrid QA Automation Internship. You will work alongside test automation engineers building quality frameworks for global fintech clients.',
    source_url: 'https://10pearls.com/careers/internships-2026',
    source_checked_on: '2026-11-08',
    status: 'published',
    published_at: '2026-11-04T11:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000002',
    meta_description: 'Apply for the QA Automation Internship at 10Pearls in Karachi. Stipend PKR 40,000/month. Learn Playwright and automated regression testing. Rolling deadline.',
    featured: false,
    direct_apply: false,
    company_website: 'https://10pearls.com',
    company_logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Ayesha Siddiqui',
    verified_at: '2026-11-04T10:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000005',
    slug: 'junior-react-frontend-developer-careem-karachi-2026',
    title: 'Junior React Frontend Developer',
    company: 'Careem',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    category: 'computer-science',
    stipend: null, // Tests "Not disclosed by employer"
    salary_min: 140000,
    salary_max: 180000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: '2026-12-20',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Computer Science or Software Engineering',
    eligibility_cgpa: null,
    eligibility_age: null,
    experience_months: 12,
    responsibilities: [
      'Build responsive, accessible user interfaces using React, Next.js, and TypeScript.',
      'Optimize web performance, Core Web Vitals, and Lighthouse scores for high-traffic passenger surfaces.',
      'Integrate GraphQL and REST APIs with optimistic client state management.',
      'Collaborate with UI/UX product designers in Figma design review and component tokens.'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL'],
    tips: [
      'Prepare code samples showcasing clean component decomposition and state management.',
      'Understand how the browser rendering pipeline, hydration, and bundle splitting work.'
    ],
    intro: 'Careem is seeking a Junior React Frontend Developer to join its Karachi engineering hub. You will contribute to high-frequency rider and captain web products deployed to millions of active regional users.',
    source_url: 'https://www.careem.com/careers/junior-frontend-2026',
    source_checked_on: '2026-11-07',
    status: 'published',
    published_at: '2026-11-05T09:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Careem Karachi is hiring a Junior React Frontend Developer. React, TypeScript, Next.js. Salary PKR 140,000 - 180,000/month. Apply with Pakistan eligibility.',
    featured: true,
    direct_apply: false,
    company_website: 'https://www.careem.com',
    company_logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-05T08:15:00Z',
  },

  // --- 2. Core Engineering ---
  {
    id: 'b2000000-0000-0000-0000-000000000003',
    slug: 'embedded-systems-intern-suparco-islamabad-2026',
    title: 'Embedded Systems Intern',
    company: 'SUPARCO',
    location: 'Islamabad',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'engineering',
    stipend: 'PKR 35,000 / month',
    deadline: '2026-10-31', // Closed state
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Electrical, Avionics, Mechatronics, or Computer Engineering',
    eligibility_cgpa: 'Minimum 3.2 CGPA',
    eligibility_age: 'Under 25 years',
    experience_months: 0,
    responsibilities: [
      'Develop real-time sensor processing firmware in embedded C for microcontrollers.',
      'Perform PCB hardware bring-up and logic analyzer diagnostics in satellite communications lab.',
      'Document hardware verification test protocols and telemetry interfaces.',
      'Assist senior researchers in satellite component thermal testing simulations.'
    ],
    skills: ['Embedded C', 'Microcontrollers', 'RTOS', 'Oscilloscopes', 'PCB Design'],
    tips: [
      'Prepare to answer fundamentals on interrupt handling, timers, and communication protocols (UART, SPI, I2C).',
      'Bring documentation or portfolio of past microcontroller hardware prototypes.'
    ],
    intro: 'SUPARCO National Satellite Program completed its specialized internship intake for embedded systems and avionics telemetry development at the Islamabad space center.',
    source_url: 'https://www.suparco.gov.pk/careers/internship-2026',
    source_checked_on: '2026-10-01',
    status: 'closed',
    published_at: '2026-10-01T08:00:00Z',
    expired_at: '2026-10-31T23:59:59Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'SUPARCO Embedded Systems Internship in Islamabad. Open to Pakistani nationals in Electrical, Avionics, Mechatronics Engineering. Applications closed.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.suparco.gov.pk',
    company_logo: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-10-01T07:50:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000006',
    slug: 'robotics-mechatronics-intern-nescom-islamabad-2026',
    title: 'Robotics & Automation Intern',
    company: 'NESCOM',
    location: 'Islamabad',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'engineering',
    stipend: 'PKR 40,000 / month',
    deadline: '2026-12-30',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Mechatronics, Mechanical, or Electrical Engineering',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: 'Under 25 years',
    experience_months: 0,
    responsibilities: [
      'Model robotic kinematics and simulate dynamic payloads using ROS 2 and Gazebo.',
      'Program motor controllers, encoders, and sensor DAQ boards.',
      'Assemble electro-mechanical actuators and perform load stress benchmarking.',
      'Author safety procedure checklists and technical test logs.'
    ],
    skills: ['ROS 2', 'Python', 'C++', 'CAD Modeling', 'Sensors', 'Actuators'],
    tips: [
      'Review classical control theory (PID tuning, Laplace transforms) and inverse kinematics.',
      'Be ready to present photos or videos of your robotics hardware semester projects.'
    ],
    intro: 'NESCOM Automation Directorate is accepting engineering interns for a 4-month term in Islamabad. Interns get hands-on access to advanced robotics research rigs and automated motion hardware.',
    source_url: 'https://www.nescom.gov.pk/careers/internships-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-06T14:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'NESCOM Robotics & Automation Internship in Islamabad. Stipend PKR 40,000/month. Open to BS Mechatronics, Mechanical, and Electrical engineering students.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.nescom.gov.pk',
    company_logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-11-06T13:45:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000008',
    slug: 'power-systems-engineering-intern-k-electric-karachi-2026',
    title: 'Power Systems Engineering Intern',
    company: 'K-Electric',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'engineering',
    stipend: 'PKR 35,000 / month',
    deadline: '2026-12-18',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Electrical Engineering (Power stream)',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Assist grid station engineers in inspecting 132kV transformers and switchgear protection relays.',
      'Perform load flow studies and fault analysis calculations using ETAP software.',
      'Record feeder power factor readings and thermal imaging logs.',
      'Draft daily preventive maintenance reports for transmission network substations.'
    ],
    skills: ['ETAP', 'Electrical Machines', 'Power Distribution', 'Switchgear', 'Safety Compliance'],
    tips: [
      'Review transformer equivalent circuits, power factor correction, and per-unit system calculations.',
      'Understand safety protocols for high-voltage transmission environments.'
    ],
    intro: 'K-Electric offers a structured technical internship in Karachi for electrical engineering students focusing on grid distribution, substation operations, and renewable energy integration.',
    source_url: 'https://www.ke.com.pk/careers/internships-2026',
    source_checked_on: '2026-11-08',
    status: 'published',
    published_at: '2026-11-07T12:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'K-Electric Power Systems Engineering Internship in Karachi. Stipend PKR 35,000/month. Open to Electrical Engineering students specializing in power.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.ke.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-11-07T11:45:00Z',
  },

  // --- 3. Cloud & DevOps / IT ---
  {
    id: 'b2000000-0000-0000-0000-000000000002',
    slug: 'junior-cloud-devops-engineer-arbisoft-remote-2026',
    title: 'Junior Cloud DevOps Engineer',
    company: 'Arbisoft',
    location: 'Islamabad',
    mode: 'remote',
    employment_type: 'FULL_TIME',
    category: 'information-technology',
    stipend: null,
    salary_min: 120000,
    salary_max: 160000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: '2026-12-01',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Computer Science, Telecommunications, or Electrical Engineering',
    eligibility_cgpa: null,
    eligibility_age: null,
    experience_months: 6,
    responsibilities: [
      'Provision and maintain scalable AWS infrastructure utilizing Terraform infrastructure-as-code.',
      'Configure automated CI/CD pipelines in GitHub Actions for automated linting and zero-downtime deployment.',
      'Monitor Kubernetes container workloads, cluster metrics, and alerting policies.',
      'Participate in blameless post-mortem investigations and disaster recovery rehearsals.'
    ],
    skills: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Linux', 'Bash', 'CI/CD'],
    tips: [
      'Demonstrate practical hands-on experience with personal cloud projects or open-source infrastructure scripts.',
      'Be ready to troubleshoot real-world Linux permission and networking bottlenecks during the interview.'
    ],
    intro: 'Arbisoft is hiring a Junior Cloud DevOps Engineer for a remote position across Pakistan. You will join an infrastructure team supporting global client web applications with 99.99% availability SLAs.',
    source_url: 'https://arbisoft.com/careers/devops-junior-2026',
    source_checked_on: '2026-11-06',
    status: 'published',
    published_at: '2026-11-02T10:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Arbisoft is hiring a Junior Cloud DevOps Engineer (Remote across Pakistan). Terraform, AWS, Docker, Kubernetes. Open to graduates with 6+ months experience.',
    featured: false,
    direct_apply: false,
    company_website: 'https://arbisoft.com',
    company_logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-02T09:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000007',
    slug: 'network-security-intern-nayatel-islamabad-2026',
    title: 'Network Security Intern',
    company: 'Nayatel',
    location: 'Islamabad',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'information-technology',
    stipend: 'PKR 30,000 / month',
    deadline: '2026-12-10',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Computer Science, Telecom, or Information Security',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Assist NOC & SOC teams in monitoring optical fiber backbone traffic and anomaly alerts.',
      'Configure Cisco and Juniper routers, switches, and VLAN routing rules.',
      'Analyze Wireshark packet captures to diagnose connection dropped frames and latency.',
      'Participate in quarterly firewall rule audit and vulnerability patching.'
    ],
    skills: ['Cisco CCNA', 'Wireshark', 'TCP/IP', 'Firewalls', 'Linux', 'VLAN'],
    tips: [
      'Review OSI 7-layer model, subnetting calculations, and TCP three-way handshake.',
      'Highlight any hands-on experience with Packet Tracer or GNS3 network topologies.'
    ],
    intro: 'Nayatel is hiring a Network Security Intern for its Islamabad operations center. You will gain operational exposure to high-speed fiber-to-the-home and metropolitan core network infrastructure.',
    source_url: 'https://nayatel.com/careers/internships-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-07T09:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Nayatel Network Security Internship in Islamabad. Stipend PKR 30,000/month. Cisco, Wireshark, optical networking. Open to BS CS and Telecom students.',
    featured: false,
    direct_apply: false,
    company_website: 'https://nayatel.com',
    company_logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-07T08:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000010',
    slug: 'cybersecurity-soc-trainee-trillium-karachi-2026',
    title: 'Cybersecurity SOC Analyst Trainee',
    company: 'Trillium Information Security',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'information-technology',
    stipend: 'PKR 50,000 / month',
    deadline: '2026-12-16',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Cyber Security, Computer Science, or Software Engineering',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Triage SIEM alerts and security telemetry in 24/7 security operations center.',
      'Investigate phishing submissions, malicious attachments, and IP reputation reports.',
      'Execute vulnerability scans and correlate findings against the MITRE ATT&CK matrix.',
      'Maintain incident ticket logs and draft remediation playbooks.'
    ],
    skills: ['SIEM', 'Splunk', 'Wireshark', 'MITRE ATT&CK', 'Linux', 'Network Defense'],
    tips: [
      'Be ready to explain how common web exploits (SQLi, XSS, CSRF) function and how to detect them in HTTP logs.',
      'Familiarize yourself with common Windows Event IDs associated with credential dumping.'
    ],
    intro: 'Trillium Information Security is recruiting entry-level SOC analysts for its Karachi monitoring facility. Trainees gain hands-on operational experience triaging enterprise threat telemetry.',
    source_url: 'https://trilliumisys.com/careers/soc-analyst-2026',
    source_checked_on: '2026-11-08',
    status: 'published',
    published_at: '2026-11-08T09:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Trillium Cyber Security SOC Trainee in Karachi. Stipend PKR 50,000/month. Learn SIEM, incident response, and network defense. Pakistani nationals eligible.',
    featured: false,
    direct_apply: false,
    company_website: 'https://trilliumisys.com',
    company_logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-08T08:15:00Z',
  },

  // --- 4. Business & Finance ---
  {
    id: 'b2000000-0000-0000-0000-000000000011',
    slug: 'management-trainee-officer-finance-hbl-karachi-2026',
    title: 'Management Trainee Officer — Corporate Finance',
    company: 'Habib Bank Limited (HBL)',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'business-finance',
    stipend: 'PKR 85,000 / month',
    deadline: '2026-12-15',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS Finance, Accounting, Economics, or MBA',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: 'Under 27 years',
    experience_months: 0,
    responsibilities: [
      'Conduct financial statement analysis, credit assessments, and corporate debt valuations.',
      'Build discounted cash flow (DCF) models and debt repayment schedules in advanced Excel.',
      'Assist corporate banking relationship managers in quarterly syndicated loan reviews.',
      'Prepare regulatory compliance filings in accordance with State Bank of Pakistan (SBP) directives.'
    ],
    skills: ['Financial Modeling', 'DCF Valuation', 'Corporate Banking', 'Advanced Excel', 'SBP Compliance'],
    tips: [
      'Master the three financial statements and their interconnected cash flow line items.',
      'Stay updated on current State Bank of Pakistan policy interest rates and macroeconomic indicators.'
    ],
    intro: 'Habib Bank Limited (HBL) has opened applications for its flagship Corporate Finance MTO program in Karachi. Successful candidates will rotate through corporate lending, treasury, and investment banking desks.',
    source_url: 'https://www.hbl.com/careers/mto-finance-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T10:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000003',
    meta_description: 'Apply for HBL Corporate Finance MTO Program in Karachi. Monthly salary PKR 85,000/month. Open to BBA and BS Finance graduates with min 3.0 CGPA.',
    featured: true,
    direct_apply: false,
    company_website: 'https://www.hbl.com',
    company_logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Zainab Farooq',
    verified_at: '2026-11-08T09:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000012',
    slug: 'islamic-banking-intern-meezan-bank-lahore-2026',
    title: 'Islamic Banking & Treasury Intern',
    company: 'Meezan Bank',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'INTERN',
    category: 'business-finance',
    stipend: 'PKR 35,000 / month',
    deadline: '2026-12-22',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA, BS Finance, Accounting, or Islamic Banking',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Examine Murabaha, Ijarah, and Diminishing Musharakah contract documentations.',
      'Reconcile daily branch liquidity accounts and treasury sukuk asset portfolios.',
      'Support internal audit teams during quarterly Shariah board compliance reviews.',
      'Analyze consumer financing credit scoring trends.'
    ],
    skills: ['Islamic Finance', 'Murabaha', 'Accounting', 'Reconciliation', 'Banking Operations'],
    tips: [
      'Understand the fundamental differences between conventional interest and Islamic profit-loss sharing.',
      'Be prepared to discuss basic Murabaha transaction workflows.'
    ],
    intro: 'Meezan Bank is accepting applications for a winter internship in Lahore focusing on Islamic financial operations, retail financing, and branch treasury oversight.',
    source_url: 'https://www.meezanbank.com/careers/internships-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T11:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000003',
    meta_description: 'Meezan Bank Islamic Banking Internship in Lahore. Stipend PKR 35,000/month. Open to BBA and Accounting students. Shariah finance operations training.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.meezanbank.com',
    company_logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Zainab Farooq',
    verified_at: '2026-11-08T10:15:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000013',
    slug: 'fintech-audit-intern-nayapay-karachi-2026',
    title: 'FinTech Compliance & Risk Intern',
    company: 'NayaPay',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'business-finance',
    stipend: 'PKR 40,000 / month',
    deadline: '2026-12-28',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Accounting & Finance, Business Analytics, or Economics',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Monitor suspicious digital wallet transactions against AML and KYC risk triggers.',
      'Investigate chargeback and merchant dispute escalations in digital checkout operations.',
      'Draft monthly compliance reports for regulatory submission to the State Bank of Pakistan.',
      'Collaborate with product squads to verify merchant onboarding verification flows.'
    ],
    skills: ['AML/KYC', 'FinTech', 'Risk Analysis', 'SQL', 'Excel', 'Compliance'],
    tips: [
      'Demonstrate familiarization with Pakistani electronic payment regulations and 1Link payment routing.',
      'Review anti-money laundering (AML) red flags and consumer privacy regulations.'
    ],
    intro: 'NayaPay is screening candidates for a FinTech Compliance & Risk Internship at its Karachi headquarters. You will work on real-time transaction monitoring and digital payments risk mitigation.',
    source_url: 'https://nayapay.com/careers/internships-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T12:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000003',
    meta_description: 'NayaPay FinTech Compliance & Risk Internship in Karachi. Stipend PKR 40,000/month. AML, KYC, digital payments, SBP regulations. Open to Finance graduates.',
    featured: false,
    direct_apply: false,
    company_website: 'https://nayapay.com',
    company_logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Zainab Farooq',
    verified_at: '2026-11-08T11:45:00Z',
  },

  // --- 5. Marketing & Sales ---
  {
    id: 'b2000000-0000-0000-0000-000000000014',
    slug: 'performance-marketing-intern-daraz-karachi-2026',
    title: 'Performance Marketing Intern',
    company: 'Daraz',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'INTERN',
    category: 'marketing-sales',
    stipend: 'PKR 40,000 / month',
    deadline: '2026-12-14',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS Marketing, Media Sciences, or Data Analytics',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Monitor and optimize paid social media ad spend across Meta Ads Manager and Google Ads.',
      'Analyze click-through rates (CTR), customer acquisition costs (CAC), and return on ad spend (ROAS).',
      'Conduct weekly A/B testing on ad creative copies and e-commerce landing pages.',
      'Coordinate with regional merchandising leads to align ad copy with flash sales.'
    ],
    skills: ['Meta Ads', 'Google Ads', 'Google Analytics 4', 'Excel', 'ROAS Analysis', 'A/B Testing'],
    tips: [
      'Review fundamental marketing metrics: CPC, CPM, CTR, ROAS, and conversion funnel stages.',
      'Bring examples or case studies of previous paid ad campaigns or campus social media promotions.'
    ],
    intro: 'Daraz Pakistan is hiring a Performance Marketing Intern in Karachi. You will assist the digital growth team in managing multi-million PKR monthly ad spend across high-traffic shopping campaigns.',
    source_url: 'https://careers.daraz.com/performance-marketing-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T13:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000005',
    meta_description: 'Daraz Performance Marketing Internship in Karachi. Stipend PKR 40,000/month. Meta Ads, Google Ads, e-commerce growth. Open to BBA and Marketing students.',
    featured: true,
    direct_apply: false,
    company_website: 'https://daraz.pk',
    company_logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Fatima Zahra',
    verified_at: '2026-11-08T12:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000015',
    slug: 'growth-marketing-associate-foodpanda-lahore-2026',
    title: 'Growth Marketing Associate',
    company: 'foodpanda',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'marketing-sales',
    stipend: null,
    salary_min: 90000,
    salary_max: 120000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: '2026-12-20',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS Marketing, Management, or Economics',
    eligibility_cgpa: null,
    eligibility_age: null,
    experience_months: 6,
    responsibilities: [
      'Execute localized city-level customer retention campaigns for food delivery and Pandamart.',
      'Segment customer cohorts based on ordering frequency, basket size, and churn probability.',
      'Manage in-app banner placements and push notification automated triggers.',
      'Evaluate partner restaurant co-branding sponsorships and promotional vouchers.'
    ],
    skills: ['Cohort Analysis', 'Push Notifications', 'CRM Tools', 'Excel', 'Growth Hacking'],
    tips: [
      'Understand how food delivery platforms calculate customer lifetime value (LTV) vs acquisition cost (CAC).',
      'Be ready to present practical ideas for improving dormant customer reactivation.'
    ],
    intro: 'foodpanda is hiring a Growth Marketing Associate for its Lahore operations. You will be responsible for driving user retention, voucher campaigns, and food delivery expansion across Punjab.',
    source_url: 'https://careers.foodpanda.com/growth-associate-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T14:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000005',
    meta_description: 'foodpanda Lahore is hiring a Growth Marketing Associate. Salary PKR 90,000 - 120,000/month. Retention marketing, user cohorts, Pandamart campaigns.',
    featured: false,
    direct_apply: false,
    company_website: 'https://foodpanda.pk',
    company_logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Fatima Zahra',
    verified_at: '2026-11-08T13:45:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000016',
    slug: 'b2b-sales-trainee-zong-islamabad-2026',
    title: 'B2B Enterprise Sales Trainee',
    company: 'Zong 4G (CMPak)',
    location: 'Islamabad',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'marketing-sales',
    stipend: 'PKR 38,000 / month',
    deadline: '2026-12-24',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS Business Administration, Telecom Management, or Marketing',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Prospect enterprise corporate accounts for telecom data, leased lines, and IoT SIM services.',
      'Draft commercial proposals and RFP response tenders for corporate business clients.',
      'Accompany senior key account managers on corporate client pitches in Islamabad and Rawalpindi.',
      'Log leads and client communications in Salesforce CRM.'
    ],
    skills: ['B2B Sales', 'Lead Generation', 'Client Relationship', 'RFP Proposals', 'CRM'],
    tips: [
      'Emphasize verbal communication, presentation demeanor, and active listening skills.',
      'Research Zong 4G corporate enterprise product portfolio (cloud, connectivity, IoT) before interviewing.'
    ],
    intro: 'Zong 4G is screening candidates for an Enterprise B2B Sales Trainee position in Islamabad. You will gain direct corporate sales experience pitching telecommunication and IoT connectivity to top tier clients.',
    source_url: 'https://www.zong.com.pk/careers/b2b-trainee-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T15:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000005',
    meta_description: 'Zong 4G Enterprise B2B Sales Trainee in Islamabad. Stipend PKR 38,000/month. Corporate client sales, RFP proposals. Open to BBA and Telecom graduates.',
    featured: false,
    direct_apply: false,
    company_website: 'https://zong.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Fatima Zahra',
    verified_at: '2026-11-08T14:30:00Z',
  },

  // --- 6. Design & Creative ---
  {
    id: 'b2000000-0000-0000-0000-000000000017',
    slug: 'ui-ux-design-intern-venturedive-lahore-2026',
    title: 'UI/UX Product Design Intern',
    company: 'VentureDive',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'INTERN',
    category: 'design-creative',
    stipend: 'PKR 45,000 / month',
    deadline: '2026-12-18',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Design, Computer Science, Human-Computer Interaction, or Multimedia Arts',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Create high-fidelity interactive prototypes and wireframes using Figma auto-layout and components.',
      'Conduct qualitative user interviews and synthesize user journey mapping findings.',
      'Maintain design system tokens, typography scales, and accessibility color contrast standards.',
      'Hand off developer-ready design specs to React and Flutter engineering squads.'
    ],
    skills: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research'],
    tips: [
      'Include 2 to 3 well-documented case studies in your portfolio detailing problem statements, iterations, and results.',
      'Be prepared to walk through your Figma component organization and auto-layout setup.'
    ],
    intro: 'VentureDive is hiring a UI/UX Product Design Intern in Lahore. You will work with product designers and user researchers creating intuitive web and mobile interfaces for global digital products.',
    source_url: 'https://venturedive.com/careers/ui-ux-intern-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T16:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000005',
    meta_description: 'VentureDive UI/UX Product Design Internship in Lahore. Stipend PKR 45,000/month. Figma, wireframing, design systems. Open to Design and CS students with portfolio.',
    featured: true,
    direct_apply: false,
    company_website: 'https://venturedive.com',
    company_logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Fatima Zahra',
    verified_at: '2026-11-08T15:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000018',
    slug: 'visual-brand-designer-tintash-lahore-2026',
    title: 'Junior Visual & Brand Designer',
    company: 'Tintash',
    location: 'Lahore',
    mode: 'remote',
    employment_type: 'FULL_TIME',
    category: 'design-creative',
    stipend: null,
    salary_min: 100000,
    salary_max: 130000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: '2026-12-25',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BFA / BS Graphic Design, Visual Communication, or Multimedia',
    eligibility_cgpa: null,
    eligibility_age: null,
    experience_months: 12,
    responsibilities: [
      'Develop cohesive brand identity assets, pitch decks, and digital collateral.',
      'Design marketing landing page hero graphics, iconography, and illustration sets.',
      'Collaborate with game designers and product teams on visual interface mockups.',
      'Maintain brand consistency across external web and social properties.'
    ],
    skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Brand Identity', 'Typography', 'Visual Design'],
    tips: [
      'Showcase diversity in your graphic design portfolio spanning typography, vector illustration, and clean layouts.',
      'Demonstrate understanding of responsive layout constraints and image optimization for the web.'
    ],
    intro: 'Tintash is hiring a Junior Visual & Brand Designer for a remote role across Pakistan. You will craft brand aesthetics, presentation decks, and web marketing visuals for high-growth tech clients.',
    source_url: 'https://tintash.com/careers/visual-designer-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T17:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000005',
    meta_description: 'Tintash is hiring a Junior Visual & Brand Designer (Remote across Pakistan). Salary PKR 100,000 - 130,000/month. Illustrator, Figma, brand identity.',
    featured: false,
    direct_apply: false,
    company_website: 'https://tintash.com',
    company_logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Fatima Zahra',
    verified_at: '2026-11-08T16:15:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000019',
    slug: 'motion-graphics-intern-sadapay-islamabad-2026',
    title: 'Motion Graphics & 3D Design Intern',
    company: 'SadaPay',
    location: 'Islamabad',
    mode: 'hybrid',
    employment_type: 'INTERN',
    category: 'design-creative',
    stipend: 'PKR 50,000 / month',
    deadline: '2026-12-30',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Animation, Multimedia, Graphic Design, or Fine Arts',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Create fluid 2D and 3D motion animations for app product releases and social content.',
      'Rig and animate 3D isometric financial card elements using Blender and After Effects.',
      'Export lightweight Lottie animations for in-app mobile integration.',
      'Brainstorm visual storyboards with product marketing managers.'
    ],
    skills: ['After Effects', 'Blender', 'Lottie', 'Motion Design', 'Storyboarding', 'Premier Pro'],
    tips: [
      'Submit a showreel link (Vimeo / YouTube) showcasing timing, easing, and kinetic typography.',
      'Understand how Lottie JSON animations optimize performance on iOS and Android devices.'
    ],
    intro: 'SadaPay is looking for a Motion Graphics & 3D Design Intern in Islamabad. You will create engaging motion assets, in-app micro-interactions, and viral promotional visuals for Pakistan’s leading digital wallet.',
    source_url: 'https://sadapay.pk/careers/motion-intern-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T18:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'SadaPay Motion Graphics & 3D Design Internship in Islamabad. Stipend PKR 50,000/month. After Effects, Blender, Lottie animations. Showreel required.',
    featured: false,
    direct_apply: false,
    company_website: 'https://sadapay.pk',
    company_logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Wahi ur Rehman',
    verified_at: '2026-11-08T17:30:00Z',
  },

  // --- 7. Human Resources ---
  {
    id: 'b2000000-0000-0000-0000-000000000020',
    slug: 'hr-talent-acquisition-trainee-unilever-karachi-2026',
    title: 'Human Resources Leadership Trainee',
    company: 'Unilever Pakistan',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'human-resources',
    stipend: 'PKR 95,000 / month',
    deadline: '2026-12-12',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS Human Resources, Psychology, Business Administration, or MBA',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: 'Under 26 years',
    experience_months: 0,
    responsibilities: [
      'Coordinate campus recruitment drives and summer trainee selection assessments across Pakistan.',
      'Screen candidate resumes against competency frameworks and schedule structured interview panels.',
      'Facilitate new-hire onboarding orientations and cultural induction programs.',
      'Analyze employee engagement survey responses and prepare leadership pulse summaries.'
    ],
    skills: ['Talent Acquisition', 'HR Operations', 'Campus Recruitment', 'Interviewing', 'Excel'],
    tips: [
      'Demonstrate structured problem solving using the STAR method (Situation, Task, Action, Result).',
      'Understand Unilever’s core values of purpose-led leadership, equity, and inclusion.'
    ],
    intro: 'Unilever Pakistan has launched its flagship Future Leaders Trainee program in Karachi for HR graduates. Trainees rotate through talent acquisition, industrial labor relations, and organizational development desks.',
    source_url: 'https://www.unilever.pk/careers/hr-trainee-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T19:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000002',
    meta_description: 'Unilever Pakistan Human Resources Trainee Program in Karachi. Monthly salary PKR 95,000/month. Campus recruitment, onboarding, talent ops. Open to BBA & MBA graduates.',
    featured: true,
    direct_apply: false,
    company_website: 'https://unilever.pk',
    company_logo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Ayesha Siddiqui',
    verified_at: '2026-11-08T18:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000021',
    slug: 'people-operations-intern-arbisoft-lahore-2026',
    title: 'People Operations & Culture Intern',
    company: 'Arbisoft',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'INTERN',
    category: 'human-resources',
    stipend: 'PKR 40,000 / month',
    deadline: '2026-12-20',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS Human Resources, Social Sciences, or Public Administration',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Maintain employee lifecycle records and benefits documentation in HRIS software.',
      'Organize internal tech company knowledge sharing workshops, hackathons, and team offsites.',
      'Assist with candidate correspondence and pre-employment reference checks.',
      'Track employee leave management and attendance telemetry reports.'
    ],
    skills: ['HRIS', 'People Operations', 'Employee Engagement', 'Communication', 'Documentation'],
    tips: [
      'Highlight organization, emotional intelligence, and discretion regarding confidential employee records.',
      'Share examples of campus event organization or student society management.'
    ],
    intro: 'Arbisoft is hiring a People Operations & Culture Intern in Lahore. You will support software engineering squads with workplace culture, benefits onboarding, and internal team engagement initiatives.',
    source_url: 'https://arbisoft.com/careers/people-intern-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T19:30:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000005',
    meta_description: 'Arbisoft People Operations & Culture Internship in Lahore. Stipend PKR 40,000/month. HRIS, employee engagement, onboarding. Open to BBA and HR students.',
    featured: false,
    direct_apply: false,
    company_website: 'https://arbisoft.com',
    company_logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Fatima Zahra',
    verified_at: '2026-11-08T19:00:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000022',
    slug: 'technical-recruiting-intern-systemsltd-lahore-2026',
    title: 'Technical Talent Acquisition Intern',
    company: 'Systems Limited',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'human-resources',
    stipend: 'PKR 35,000 / month',
    deadline: '2026-12-27',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS HR, Computer Science, or Information Technology',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Source candidate pipelines for software engineers, cloud architects, and QA testers on LinkedIn Recruiter.',
      'Coordinate technical coding assessments and schedule interview loops with engineering directors.',
      'Track recruitment metrics including time-to-hire, offer acceptance rate, and applicant drop-off in ATS.',
      'Participate in career fairs and campus placement tests at FAST, NUST, and UET.'
    ],
    skills: ['LinkedIn Recruiter', 'Technical Sourcing', 'ATS Systems', 'Candidate Screening', 'Excel'],
    tips: [
      'Familiarize yourself with standard tech jargon (full-stack, CI/CD, React, microservices) so you can screen engineering profiles effectively.',
      'Be prepared to demonstrate proactive sourcing techniques using boolean search operators.'
    ],
    intro: 'Systems Limited is accepting applications for a Technical Talent Acquisition Intern in Lahore. You will gain hands-on training sourcing and recruiting software engineers for enterprise delivery squads.',
    source_url: 'https://www.systemsltd.com/careers/ta-intern-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T20:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000002',
    meta_description: 'Systems Limited Technical Talent Acquisition Internship in Lahore. Stipend PKR 35,000/month. Tech sourcing, ATS, campus drives. Open to HR and CS students.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.systemsltd.com',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Ayesha Siddiqui',
    verified_at: '2026-11-08T19:30:00Z',
  },

  // --- 8. Supply Chain & Operations ---
  {
    id: 'b2000000-0000-0000-0000-000000000023',
    slug: 'supply-chain-trainee-engro-karachi-2026',
    title: 'Supply Chain Operations Trainee',
    company: 'Engro Corporation',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'supply-chain',
    stipend: 'PKR 90,000 / month',
    deadline: '2026-12-16',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Industrial Engineering, Supply Chain, or Mechanical Engineering',
    eligibility_cgpa: 'Minimum 3.0 CGPA',
    eligibility_age: 'Under 26 years',
    experience_months: 0,
    responsibilities: [
      'Model demand forecasting and raw material replenishment cycles across industrial manufacturing plants.',
      'Perform logistics fleet route optimization to minimize fuel consumption and delivery delays.',
      'Audit warehouse stock inventory reconciliation and monitor buffer stock levels in SAP ERP.',
      'Coordinate vendor performance scorecards and supplier quality assurance audits.'
    ],
    skills: ['SAP ERP', 'Supply Chain', 'Demand Forecasting', 'Inventory Control', 'Logistics'],
    tips: [
      'Review classical inventory management models (EOQ, safety stock formulas, ABC analysis).',
      'Demonstrate understanding of end-to-end supply chain linkages from procurement to distribution.'
    ],
    intro: 'Engro Corporation is recruiting high-potential engineering and supply chain graduates for its Operations Trainee intake in Karachi. Trainees rotate through plant procurement, logistics, and planning departments.',
    source_url: 'https://www.engro.com/careers/supply-chain-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T20:30:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'Engro Corporation Supply Chain Operations Trainee in Karachi. Monthly salary PKR 90,000/month. SAP ERP, demand forecasting, logistics. Open to Industrial Engineering & Supply Chain graduates.',
    featured: true,
    direct_apply: false,
    company_website: 'https://engro.com',
    company_logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-11-08T20:00:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000024',
    slug: 'procurement-operations-intern-nestle-lahore-2026',
    title: 'Procurement & Sourcing Intern',
    company: 'Nestlé Pakistan',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'INTERN',
    category: 'supply-chain',
    stipend: 'PKR 45,000 / month',
    deadline: '2026-12-22',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BBA / BS Supply Chain, Economics, or Industrial Management',
    eligibility_cgpa: 'Minimum 2.8 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Assist category procurement managers in analyzing packaging material price fluctuations.',
      'Issue vendor quotation requests and perform commercial price comparison matrices.',
      'Verify supplier compliance with Nestlé Responsible Sourcing guidelines.',
      'Track purchase order status and resolve delivery bottlenecks with factory teams.'
    ],
    skills: ['Procurement', 'Vendor Management', 'Cost Analysis', 'SAP', 'Negotiation', 'Excel'],
    tips: [
      'Understand total cost of ownership (TCO) and supplier negotiation fundamentals.',
      'Be prepared to explain how sustainable procurement practices reduce corporate supply chain risk.'
    ],
    intro: 'Nestlé Pakistan has opened applications for a Procurement & Sourcing Internship at its Lahore head office. You will work on strategic supplier negotiations and commodity sourcing operations.',
    source_url: 'https://www.nestle.pk/careers/procurement-intern-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T21:00:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'Nestlé Pakistan Procurement & Sourcing Internship in Lahore. Stipend PKR 45,000/month. Supplier negotiations, SAP, cost analysis. Open to Supply Chain students.',
    featured: false,
    direct_apply: false,
    company_website: 'https://nestle.pk',
    company_logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-11-08T20:30:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000025',
    slug: 'warehouse-fulfillment-coordinator-daraz-lahore-2026',
    title: 'Fulfillment & Logistics Coordinator',
    company: 'Daraz',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    category: 'supply-chain',
    stipend: null,
    salary_min: 75000,
    salary_max: 95000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    deadline: '2026-12-29',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS Supply Chain, Logistics, or Business Administration',
    eligibility_cgpa: null,
    eligibility_age: null,
    experience_months: 6,
    responsibilities: [
      'Supervise inbound sorting, order dispatch, and reverse logistics in automated sorting center.',
      'Monitor order fulfillment SLAs, courier handover times, and delivery return rates.',
      'Implement 5S safety and layout efficiency improvements across sorting bays.',
      'Coordinate daily throughput reporting with regional distribution center leadership.'
    ],
    skills: ['Fulfillment', 'Reverse Logistics', 'Warehouse Management (WMS)', '5S', 'Excel'],
    tips: [
      'Be prepared to describe handling high-velocity peak order surges (such as 11.11 shopping festival volumes).',
      'Demonstrate understanding of last-mile delivery economics and hub-and-spoke distribution models.'
    ],
    intro: 'Daraz is hiring a Fulfillment & Logistics Coordinator for its Lahore central sorting hub. You will manage shift throughput, automated package sorting lines, and dispatch operations across Punjab.',
    source_url: 'https://careers.daraz.com/logistics-coordinator-2026',
    source_checked_on: '2026-11-09',
    status: 'published',
    published_at: '2026-11-08T21:30:00Z',
    author_id: 'a1000000-0000-0000-0000-000000000004',
    meta_description: 'Daraz Lahore is hiring a Fulfillment & Logistics Coordinator. Salary PKR 75,000 - 95,000/month. Warehouse management, order fulfillment, last-mile logistics.',
    featured: false,
    direct_apply: false,
    company_website: 'https://daraz.pk',
    company_logo: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Engr. Muhammad Bilal',
    verified_at: '2026-11-08T21:00:00Z',
  },

  // --- Staging Record Awaiting Review ---
  {
    id: 'b2000000-0000-0000-0000-000000000009',
    slug: 'machine-learning-intern-afiniti-lahore-2026',
    title: 'Machine Learning Intern',
    company: 'Afiniti',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'INTERN',
    category: 'computer-science',
    stipend: 'PKR 55,000 / month',
    deadline: '2026-12-25',
    eligibility_nationality: 'Pakistani nationals only',
    eligibility_degree: 'BS / MS Computer Science or Data Science',
    eligibility_cgpa: 'Minimum 3.2 CGPA',
    eligibility_age: null,
    experience_months: 0,
    responsibilities: [
      'Preprocess real-time behavioral telemetry data using PySpark and Pandas.',
      'Train and evaluate gradient boosted trees and neural networks for call center agent routing.',
      'Implement model performance monitoring dashboards in Grafana.',
      'Collaborate with data engineers on feature store maintenance.'
    ],
    skills: ['Python', 'PyTorch', 'scikit-learn', 'SQL', 'Pandas', 'Feature Engineering'],
    tips: [
      'Review precision-recall tradeoffs, cross-validation strategies, and AUC-ROC curves.',
      'Be ready to explain how regularization techniques prevent overfitting in deep models.'
    ],
    intro: 'Afiniti is screening candidates for an advanced Machine Learning Internship in Lahore. Interns work directly with behavioral AI models operating on high-throughput enterprise pipelines.',
    source_url: 'https://www.afiniti.com/careers/ml-intern-2026',
    source_checked_on: '2026-11-09',
    status: 'pending_review',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'Afiniti Machine Learning Internship in Lahore. Work with enterprise behavioral AI models. Python, PyTorch, PySpark. Stipend PKR 55,000/month.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.afiniti.com',
    company_logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80',
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
    if (!error && data) return data as Listing[];
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
