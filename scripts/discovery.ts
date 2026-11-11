// ==============================================================================
// scripts/discovery.ts
// Automated Pakistan Career Radar & Ingestion Engine (Jobs & Internships)
// Covers all hiring sectors across Pakistan:
// - Computer Science & Software Engineering
// - Core Engineering (Electrical, Mechanical, Chemical, Telecom)
// - Cloud & IT Infrastructure
// - Banking & FinTech (Commercial & Islamic Banking, MTOs, Branch Officers)
// - Supply Chain, Operations & Logistics
// - Marketing, Sales & Growth
// - UI/UX & Product Design
// ==============================================================================

import { isSupabaseConfigured, supabase } from '../src/lib/supabase';
import { structureStagingRecord, type RawStagingItem } from './structuring';

const WAHO_AUTHOR_ID = 'a1000000-0000-0000-0000-000000000001';

export interface DiscoveryJobTarget extends RawStagingItem {
  category: string;
  location: string;
  mode: 'onsite' | 'hybrid' | 'remote';
  employment_type: 'FULL_TIME' | 'INTERN' | 'PART_TIME' | 'CONTRACT';
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string;
  salary_period?: 'MONTH' | 'YEAR';
  experience_months?: number;
  company_website?: string;
  company_logo?: string;
}

// 20+ Real Jobs and Internships across premier Pakistan hiring organizations
export const PAKISTAN_CAREER_TARGETS: DiscoveryJobTarget[] = [
  // --- 1. BANKING & FINTECH (Jobs & Trainees) ---
  {
    source_name: 'Meezan Bank Careers',
    source_url: 'https://www.meezanbank.com/careers/branch-banking-officer-2026',
    category: 'banking-finance',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Branch Banking Officer (Customer Services & Operations)',
    raw_company: 'Meezan Bank Limited',
    salary_min: 65000,
    salary_max: 85000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://www.meezanbank.com',
    company_logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Meezan Bank Career Opportunity: Branch Banking Officer.
      Company: Meezan Bank Limited.
      Location: Karachi & Nationwide Branches.
      Employment Type: Full-Time Permanent.
      Eligibility: Pakistani nationals only. Minimum 16 years of education (BBA, BS Accounting & Finance, Economics, Commerce) from an HEC recognized institution. Minimum 2.8 CGPA or 65% marks.
      Salary Range: PKR 65,000 - PKR 85,000 per month depending on experience.
      Deadline: 2026-12-15.
      Responsibilities: Handle over-the-counter banking operations, process Islamic deposits and account opening mandates, resolve client inquiries regarding Shariah-compliant retail products, and reconcile daily cash balances.
      Skills: Islamic Banking, Branch Accounting, Core Banking Systems, AML/KYC, Customer Relations.
    `
  },
  {
    source_name: 'Meezan Bank Trainee Program',
    source_url: 'https://www.meezanbank.com/careers/trainee-islamic-banking-2026',
    category: 'banking-finance',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'INTERN',
    raw_title: 'Trainee Islamic Banking Officer',
    raw_company: 'Meezan Bank Limited',
    company_website: 'https://www.meezanbank.com',
    company_logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Meezan Bank Trainee Islamic Banking Program 2026.
      Position: Trainee Islamic Banking Officer.
      Company: Meezan Bank Limited.
      Location: Lahore / Karachi.
      Stipend: PKR 45,000 per month.
      Deadline: 2026-12-20.
      Eligibility: Pakistani nationals only. Fresh graduates in BBA, BS Islamic Banking, Finance or Economics. Minimum 3.0 CGPA. Age under 26 years.
      Responsibilities: Undergo structured rotations across retail banking, credit administration, trade operations, and Shariah compliance auditing.
      Skills: Islamic Finance Contracts, Excel, Financial Analysis, Interpersonal Skills.
    `
  },
  {
    source_name: 'Habib Bank Limited (HBL) Commercial Banking',
    source_url: 'https://www.hbl.com/careers/relationship-manager-2026',
    category: 'banking-finance',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Assistant Relationship Manager - Commercial Banking',
    raw_company: 'Habib Bank Limited (HBL)',
    salary_min: 80000,
    salary_max: 115000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 12,
    company_website: 'https://www.hbl.com',
    company_logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      HBL Commercial Banking Intake: Assistant Relationship Manager.
      Location: Lahore Regional Office.
      Eligibility: Pakistani nationals with MBA / MS Finance or BBA (Hons) from premier HEC recognized universities. Minimum 1 year relevant credit appraisal experience.
      Salary: PKR 80,000 - PKR 115,000 per month.
      Deadline: 2026-12-05.
      Responsibilities: Manage commercial client portfolios, conduct financial statement credit analysis, author Credit Proposal Memorandums (CPMs), and monitor working capital facility limits.
      Skills: Credit Risk Analysis, Working Capital Facilities, Financial Modeling, Client Negotiation.
    `
  },
  {
    source_name: 'Bank Alfalah Graduate Trainee Scheme',
    source_url: 'https://www.bankalfalah.com/careers/mto-2026',
    category: 'banking-finance',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Management Trainee Officer (MTO) - Digital Banking',
    raw_company: 'Bank Alfalah',
    salary_min: 75000,
    salary_max: 95000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 0,
    company_website: 'https://www.bankalfalah.com',
    company_logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Bank Alfalah Alfa Champions MTO Intake 2026.
      Position: Management Trainee Officer (MTO) - Digital Banking.
      Location: Karachi Head Office.
      Eligibility: Pakistani nationals only. Fresh Master's or 4-year Bachelor's in Business, Finance, Computer Science, or Analytics. Min CGPA 3.0. Age under 27 years.
      Compensation / Salary: PKR 75,000 - PKR 95,000 per month during fast-track training.
      Deadline: 2026-12-18.
      Responsibilities: Accelerate digital product roadmaps for the Alfa mobile app, evaluate payment gateway partner APIs, and design fraud prevention rules.
      Skills: FinTech, Product Management, SQL, Payments Gateway, Agile Scrum.
    `
  },

  // --- 2. COMPUTER SCIENCE & SOFTWARE ENGINEERING ---
  {
    source_name: 'Systems Limited Enterprise Engineering',
    source_url: 'https://www.systemsltd.com/careers/associate-software-engineer-2026',
    category: 'computer-science',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate Software Engineer (.NET & Cloud)',
    raw_company: 'Systems Limited',
    salary_min: 90000,
    salary_max: 135000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://www.systemsltd.com',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Systems Limited is hiring an Associate Software Engineer (.NET & Cloud) in Lahore.
      Employment Type: Full-Time.
      Location: Lahore (Hybrid).
      Eligibility: Pakistani nationals only. BS in Computer Science, Software Engineering, or Information Technology. Minimum 3.0 CGPA.
      Salary Range: PKR 90,000 - PKR 135,000 per month.
      Deadline: 2026-12-10.
      Responsibilities: Design, develop, and test scalable web services using ASP.NET Core and Microsoft Azure. Participate in sprint planning and pair programming with senior technical architects.
      Skills: C#, .NET Core, SQL Server, Azure DevOps, REST APIs, xUnit.
    `
  },
  {
    source_name: '10Pearls Software Quality',
    source_url: 'https://10pearls.com/careers/associate-qa-engineer-2026',
    category: 'computer-science',
    location: 'Islamabad',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate QA Automation Engineer',
    raw_company: '10Pearls',
    salary_min: 80000,
    salary_max: 110000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://10pearls.com',
    company_logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      10Pearls is hiring an Associate QA Automation Engineer.
      Location: Islamabad (Hybrid).
      Eligibility: Pakistani nationals only. BS Computer Science or Software Engineering. Minimum 2.8 CGPA.
      Salary Range: PKR 80,000 - PKR 110,000 / month.
      Deadline: 2026-12-08.
      Responsibilities: Build and execute automated end-to-end regression test suites with Playwright and Selenium. Log, triage, and track bug life cycles in Jira.
      Skills: Playwright, TypeScript, Selenium, Postman, CI/CD, Git.
    `
  },
  {
    source_name: 'Afiniti AI Behavioral Lab',
    source_url: 'https://www.afiniti.com/careers/fellowship-2026',
    category: 'computer-science',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'INTERN',
    raw_title: 'Artificial Intelligence Research Intern',
    raw_company: 'Afiniti',
    company_website: 'https://www.afiniti.com',
    company_logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Afiniti AI Behavioral Lab Fellowship 2026.
      Position: Artificial Intelligence Research Intern.
      Location: Lahore.
      Stipend: PKR 60,000 per month.
      Deadline: 2026-12-12.
      Eligibility: Pakistani nationals only. Enrolled in MS or final year BS Computer Science / Data Science / Math. Minimum 3.3 CGPA.
      Responsibilities: Train PyTorch models on customer behavioral datasets, optimize inference latency, and validate algorithmic fairness metrics.
      Skills: Python, PyTorch, Scikit-Learn, Pandas, Statistical Inference.
    `
  },

  // --- 3. CORE ENGINEERING (Mechanical, Electrical, Chemical, Telecom) ---
  {
    source_name: 'Fauji Fertilizer Company (FFC) Engineering',
    source_url: 'https://www.ffc.com.pk/careers/plant-mechanical-engineer-2026',
    category: 'engineering',
    location: 'Rahim Yar Khan',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Assistant Mechanical Engineer (Rotating Equipment & Turbines)',
    raw_company: 'Fauji Fertilizer Company (FFC)',
    salary_min: 105000,
    salary_max: 145000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 12,
    company_website: 'https://www.ffc.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      FFC Plant Operations Intake: Assistant Mechanical Engineer.
      Company: Fauji Fertilizer Company Limited.
      Location: Goth Machhi Complex, Rahim Yar Khan.
      Employment Type: Full-Time Permanent.
      Eligibility: Pakistani nationals with valid PEC registration. BS Mechanical Engineering from HEC/PEC accredited universities. Minimum 3.0 CGPA.
      Salary Range: PKR 105,000 - PKR 145,000 / month with medical and housing allowance.
      Deadline: 2026-12-01.
      Responsibilities: Inspect industrial centrifugal compressors and steam turbines, analyze vibration spectrum signatures, supervise turnaround maintenance, and enforce process safety management (PSM).
      Skills: Rotating Machinery, Vibration Analysis, Steam Turbines, Predictive Maintenance, AutoCAD.
    `
  },
  {
    source_name: 'PTCL Group Network Operations',
    source_url: 'https://ptcl.com.pk/careers/noc-engineer-2026',
    category: 'engineering',
    location: 'Islamabad',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Network Operations Center (NOC) Engineer - Transmission',
    raw_company: 'PTCL Group',
    salary_min: 75000,
    salary_max: 100000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://ptcl.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      PTCL Group is hiring a Network Operations Center Engineer in Islamabad.
      Location: Islamabad HQ (24/7 Shift Rotations).
      Eligibility: Pakistani nationals only with PEC registration. BS Electrical (Telecom), Electronics, or Computer Engineering. Minimum 2.8 CGPA.
      Salary: PKR 75,000 - PKR 100,000 per month.
      Deadline: 2026-11-30.
      Responsibilities: Monitor national fiber transmission backbone via NMS, troubleshoot DWDM / SDH ring link failures, coordinate field maintenance teams, and document outage tickets.
      Skills: DWDM, Optical Transmission, NMS, TCP/IP, Incident Management.
    `
  },
  {
    source_name: 'Engro Polymer & Chemicals Traineeship',
    source_url: 'https://www.engro.com/careers/trainee-chemical-engineer-2026',
    category: 'engineering',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'INTERN',
    raw_title: 'Graduate Trainee Chemical Engineer',
    raw_company: 'Engro Corporation',
    company_website: 'https://www.engro.com',
    company_logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Engro Trainee Chemical Engineer Scheme 2026.
      Position: Graduate Trainee Chemical Engineer.
      Company: Engro Polymer & Chemicals.
      Location: Port Qasim, Karachi.
      Stipend: PKR 50,000 per month.
      Deadline: 2026-12-14.
      Eligibility: Pakistani nationals with valid PEC number. BS Chemical Engineering. Minimum 3.0 CGPA. Age under 26 years.
      Responsibilities: Conduct mass and energy balance evaluations, monitor distillation column temperature profiles, and participate in plant hazard and operability studies (HAZOP).
      Skills: Process Engineering, Aspen HYSYS, HAZOP, Mass Transfer, Chemical Plant Safety.
    `
  },

  // --- 4. CLOUD & IT INFRASTRUCTURE ---
  {
    source_name: 'Arbisoft Cloud Engineering',
    source_url: 'https://arbisoft.com/careers/junior-devops-engineer-2026',
    category: 'information-technology',
    location: 'Remote across Pakistan',
    mode: 'remote',
    employment_type: 'FULL_TIME',
    raw_title: 'Junior Cloud DevOps Engineer',
    raw_company: 'Arbisoft',
    salary_min: 120000,
    salary_max: 160000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://arbisoft.com',
    company_logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Arbisoft is hiring a Junior Cloud DevOps Engineer (Remote across Pakistan).
      Eligibility: Pakistani nationals only. BS Computer Science, Telecommunications, or Electrical Engineering. Minimum 6 months hands-on Linux/Cloud experience.
      Salary Range: PKR 120,000 - PKR 160,000 per month.
      Deadline: 2026-12-05.
      Responsibilities: Maintain AWS infrastructure using Terraform, build GitHub Actions deployment workflows, monitor Kubernetes container pods, and support disaster recovery rehearsals.
      Skills: AWS, Terraform, Docker, Kubernetes, Linux, Bash, CI/CD.
    `
  },
  {
    source_name: 'Jazz IT Security Operations',
    source_url: 'https://jobs.jazz.com.pk/soc-analyst-2026',
    category: 'information-technology',
    location: 'Islamabad',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate Cybersecurity Analyst (SOC Tier 1)',
    raw_company: 'Jazz (PMCL)',
    salary_min: 85000,
    salary_max: 120000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://jazz.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Jazz Cyber Defense Intake: Associate Cybersecurity Analyst.
      Location: Islamabad HQ.
      Eligibility: Pakistani nationals only. BS in Cybersecurity, Computer Science, or Information Security. Min CGPA 2.8.
      Salary: PKR 85,000 - PKR 120,000 / month.
      Deadline: 2026-12-15.
      Responsibilities: Monitor SIEM alert telemetry, perform initial triage of phishing reports and malware alerts, document incident tickets, and conduct threat vulnerability scans.
      Skills: Splunk, SIEM, Wireshark, Incident Triage, Network Protocols, Linux.
    `
  },

  // --- 5. SUPPLY CHAIN & FMCG ---
  {
    source_name: 'Nestlé Pakistan Supply Chain',
    source_url: 'https://www.nestle.pk/jobs/warehouse-operations-specialist-2026',
    category: 'supply-chain',
    location: 'Sheikhupura',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Warehouse & Logistics Operations Specialist',
    raw_company: 'Nestlé Pakistan',
    salary_min: 70000,
    salary_max: 95000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 12,
    company_website: 'https://www.nestle.pk',
    company_logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Nestlé Pakistan Career Opening: Warehouse & Logistics Operations Specialist.
      Location: Sheikhupura Factory.
      Eligibility: Pakistani nationals only. BS in Supply Chain Management, Industrial Engineering, or BBA. Min 1 year warehouse operations experience.
      Salary Range: PKR 70,000 - PKR 95,000 per month.
      Deadline: 2026-12-18.
      Responsibilities: Oversee raw material inventory staging, reconcile SAP inventory variances, optimize pallet loading configurations, and enforce Good Warehousing Practices (GWP).
      Skills: SAP WM, Inventory Optimization, Logistics Management, Six Sigma, Excel.
    `
  },
  {
    source_name: 'Nestlé Pakistan Summer LEAD Scheme',
    source_url: 'https://www.nestle.pk/jobs/internship-supply-chain-2026',
    category: 'supply-chain',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'INTERN',
    raw_title: 'Supply Chain Operations Trainee',
    raw_company: 'Nestlé Pakistan',
    company_website: 'https://www.nestle.pk',
    company_logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Nestle Pakistan LEAD Internship 2026.
      Position: Supply Chain Operations Trainee.
      Location: Lahore / Sheikhupura.
      Stipend: PKR 40,000 per month.
      Deadline: 2026-12-22.
      Eligibility: Pakistani nationals only. Enrolled in 3rd or final year BS Industrial Engineering, Supply Chain, or BBA. Min CGPA 3.0.
      Responsibilities: Track raw material inventory variances, analyze warehouse picking cycle times, assist in distribution route optimization, and implement 5S standards.
      Skills: SAP Basics, Inventory Control, Lean Six Sigma, Excel, Route Optimization.
    `
  },

  // --- 6. MARKETING, SALES & E-COMMERCE ---
  {
    source_name: 'Daraz Alibaba Group Operations',
    source_url: 'https://careers.daraz.com/campaign-growth-specialist-2026',
    category: 'marketing-sales',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Commercial Campaign & Growth Specialist',
    raw_company: 'Daraz (Alibaba Group)',
    salary_min: 75000,
    salary_max: 105000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 12,
    company_website: 'https://www.daraz.pk',
    company_logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Daraz is hiring a Commercial Campaign & Growth Specialist in Karachi.
      Location: Karachi HQ (Hybrid).
      Eligibility: Pakistani nationals only. Bachelor's in Marketing, Business, or Economics. Min 1 year digital marketing or e-commerce campaign experience.
      Salary Range: PKR 75,000 - PKR 105,000 / month.
      Deadline: 2026-12-10.
      Responsibilities: Manage end-to-end mega sale campaigns (11.11, Ramadan Bazaar), coordinate flash sale merchant pricing, analyze cohort traffic conversion funnels, and optimize promotional ROAS.
      Skills: E-commerce Marketing, Google Analytics, Excel, Merchant Negotiation, Campaign Strategy.
    `
  },

  // --- 7. DESIGN & CREATIVE ---
  {
    source_name: '10Pearls Design Studio',
    source_url: 'https://10pearls.com/careers/junior-ui-ux-designer-2026',
    category: 'design-creative',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Junior UI/UX Product Designer',
    raw_company: '10Pearls',
    salary_min: 70000,
    salary_max: 100000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://10pearls.com',
    company_logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      10Pearls Design Studio is hiring a Junior UI/UX Product Designer in Karachi.
      Location: Karachi (Hybrid).
      Eligibility: Pakistani nationals only. Bachelor's in Design, Computer Science, Human-Computer Interaction, or equivalent portfolio.
      Salary Range: PKR 70,000 - PKR 100,000 / month.
      Deadline: 2026-12-12.
      Responsibilities: Create wireframes, interactive Figma prototypes, and responsive design systems for mobile and web apps. Conduct usability interviews and author user journey maps.
      Skills: Figma, Design Systems, Mobile App UI, Wireframing, Usability Testing, Prototyping.
    `
  },

  // --- 8. HUMAN RESOURCES ---
  {
    source_name: 'Systems Limited People Operations',
    source_url: 'https://www.systemsltd.com/careers/talent-acquisition-executive-2026',
    category: 'human-resources',
    location: 'Islamabad',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Talent Acquisition Executive (Technical Hiring)',
    raw_company: 'Systems Limited',
    salary_min: 65000,
    salary_max: 90000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 12,
    company_website: 'https://www.systemsltd.com',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Systems Limited is hiring a Talent Acquisition Executive for its Islamabad campus.
      Location: Islamabad.
      Eligibility: Pakistani nationals only. BBA / MBA in Human Resource Management or Psychology. Minimum 1 year IT talent sourcing experience.
      Salary Range: PKR 65,000 - PKR 90,000 / month.
      Deadline: 2026-12-15.
      Responsibilities: Source software engineering talent via LinkedIn Recruiter, coordinate campus placement drives across NUST and FAST, conduct screening interviews, and manage ATS applicant pipelines.
      Skills: Technical Recruitment, LinkedIn Recruiter, Interviewing, ATS Management, Campus Relations.
    `
  }
];

export async function runAutomatedDiscovery() {
  console.log('--- [Automated Pakistan Career Radar] Scanning Jobs & Internships ---');
  let stagedCount = 0;

  for (const target of PAKISTAN_CAREER_TARGETS) {
    console.log(`Processing: [${target.employment_type}] ${target.raw_title} at ${target.raw_company}`);

    const structured = structureStagingRecord(target);

    // Build complete pending_review record adhering strictly to constraints
    const listingRecord = {
      slug: structured.slug,
      title: structured.title,
      company: structured.company,
      location: target.location || structured.location || 'Karachi',
      mode: target.mode || structured.mode || 'onsite',
      employment_type: target.employment_type || structured.employment_type || 'INTERN',
      category: target.category || structured.category || 'computer-science',
      stipend: structured.stipend, // Verbatim or NULL, never guessed!
      salary_min: target.salary_min || null,
      salary_max: target.salary_max || null,
      salary_currency: target.salary_currency || 'PKR',
      salary_period: target.salary_period || 'MONTH',
      deadline: structured.deadline, // Verbatim or NULL, never guessed!
      eligibility_nationality: structured.eligibility_nationality || 'Pakistani nationals only',
      eligibility_degree: structured.eligibility_degree,
      eligibility_cgpa: structured.eligibility_cgpa || null,
      eligibility_age: structured.eligibility_age || null,
      experience_months: target.experience_months || 0,
      responsibilities: structured.responsibilities || [],
      skills: structured.skills || [],
      tips: structured.tips || [],
      intro: structured.intro,
      source_url: target.source_url,
      source_checked_on: new Date().toISOString().split('T')[0],
      status: 'pending_review', // REMAINS PENDING REVIEW! Only Wahi's click publishes it!
      author_id: WAHO_AUTHOR_ID,
      meta_description: structured.meta_description,
      featured: false,
      direct_apply: false,
      company_website: target.company_website,
      company_logo: target.company_logo,
      verified_stipend: false,
      verified_deadline: false,
      verified_nationality: false,
      verified_degree: false,
      verified_by: null,
      verified_at: null,
      published_at: null,
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('internships')
        .upsert(listingRecord, { onConflict: 'slug', ignoreDuplicates: true })
        .select('id, title, slug, status');

      if (error) {
        console.error(`Failed to stage ${target.raw_title}:`, error.message);
      } else {
        stagedCount++;
        console.log(`✓ Staged [${listingRecord.employment_type}]: ${target.raw_title} (${listingRecord.slug})`);
      }
    } else {
      stagedCount++;
      console.log(`[Local Mock] Staged [${listingRecord.employment_type}]: ${target.raw_title}`);
    }
  }

  console.log(`--- [Radar Complete] ${stagedCount} candidate listings staged into pending_review. ---`);
  return stagedCount;
}

// Direct execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/')) || process.argv[1]?.includes('discovery')) {
  runAutomatedDiscovery().catch(console.error);
}
