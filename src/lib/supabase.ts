// ==============================================================================
// src/lib/supabase.ts
// Supabase Client with Resilient Mock Fallback Data Provider
// ==============================================================================

import { createClient } from '@supabase/supabase-js';
import type { Listing, Author, PortalSettings } from '../types/portal';

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

// Built-in verified seed authors
export const SEED_AUTHORS: Author[] = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    name: 'Hamza Tariq',
    slug: 'hamza-tariq',
    role: 'Senior Tech Career Advisor & Engineering Lead',
    bio: 'Hamza Tariq is a veteran software engineer and career mentor with over 9 years of experience in Pakistan’s technology ecosystem. He reviews and validates early-career software engineering, data science, and infrastructure roles specifically for Pakistani undergraduates.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    linkedin_url: 'https://linkedin.com/in/hamzatariq-pk',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    name: 'Ayesha Siddiqui',
    slug: 'ayesha-siddiqui',
    role: 'Technical Talent Lead & AI Systems Mentor',
    bio: 'Ayesha Siddiqui has led technical hiring for top Pakistani technology firms and incubators. She conducts source verifications to ensure student postings adhere strictly to genuine compensation and eligibility guidelines.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    linkedin_url: 'https://linkedin.com/in/ayeshasiddiqui-pk',
    created_at: '2026-01-01T00:00:00Z',
  }
];

// Built-in verified sample listings covering:
// 1. Open Internship with verified stipend
// 2. Open Job (Remote) with null stipend testing literal fallback: "Not disclosed by the employer"
// 3. Open Internship with null deadline testing literal fallback: "Rolling / Apply ASAP"
// 4. Closed Listing testing banner state & validThrough past date
// 5. Open Engineering Internship
export const SEED_LISTINGS: Listing[] = [
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
    verified_by: 'Hamza Tariq',
    verified_at: '2026-11-01T07:45:00Z',
  },
  {
    id: 'b2000000-0000-0000-0000-000000000002',
    slug: 'junior-cloud-devops-engineer-arbisoft-remote-2026',
    title: 'Junior Cloud DevOps Engineer',
    company: 'Arbisoft',
    location: 'Islamabad',
    mode: 'remote',
    employment_type: 'FULL_TIME',
    category: 'information-technology',
    stipend: null, // Tests non-negotiable fallback: "Not disclosed by the employer"
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
    verified_by: 'Hamza Tariq',
    verified_at: '2026-11-02T09:30:00Z',
  },
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
    deadline: '2026-10-31', // Past deadline: status closed
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
    status: 'closed', // Demonstrates closed banner state & past validThrough
    published_at: '2026-10-01T08:00:00Z',
    expired_at: '2026-10-31T23:59:59Z',
    author_id: 'a1000000-0000-0000-0000-000000000001',
    meta_description: 'SUPARCO Embedded Systems Internship in Islamabad. Open to Pakistani nationals in Electrical, Avionics, Mechatronics Engineering. Applications closed.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.suparco.gov.pk',
    company_logo: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Hamza Tariq',
    verified_at: '2026-10-01T07:50:00Z',
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
    deadline: null, // Tests non-negotiable fallback: "Rolling / Apply ASAP"
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
    stipend: null,
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
    verified_by: 'Hamza Tariq',
    verified_at: '2026-11-05T08:15:00Z',
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
    author_id: 'a1000000-0000-0000-0000-000000000002',
    meta_description: 'NESCOM Robotics & Automation Internship in Islamabad. Stipend PKR 40,000/month. Open to BS Mechatronics, Mechanical, and Electrical engineering students.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.nescom.gov.pk',
    company_logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Ayesha Siddiqui',
    verified_at: '2026-11-06T13:45:00Z',
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
    verified_by: 'Hamza Tariq',
    verified_at: '2026-11-07T08:30:00Z',
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
    author_id: 'a1000000-0000-0000-0000-000000000002',
    meta_description: 'K-Electric Power Systems Engineering Internship in Karachi. Stipend PKR 35,000/month. Open to Electrical Engineering students specializing in power.',
    featured: false,
    direct_apply: false,
    company_website: 'https://www.ke.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=120&q=80',
    verified_stipend: true,
    verified_deadline: true,
    verified_nationality: true,
    verified_degree: true,
    verified_by: 'Ayesha Siddiqui',
    verified_at: '2026-11-07T11:45:00Z',
  },
  // Item in pending_review awaiting verification gate
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
    status: 'pending_review', // Demonstrates Verification Gate in /admin/review
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
  monthly_publish_count: 7, // currently 7 of 12 published this month
  publish_cap: 12,
  last_reset_month: '2026-11-01',
  updated_at: '2026-11-09T00:00:00Z',
};

// Data access functions
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
  // Keep published and closed listings live for SEO (Never delete, Rule 3 & 8)
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
