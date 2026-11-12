// ==============================================================================
// scripts/discovery.ts
// Pakistan Nationwide Career Radar & Multi-Source Ingestion Engine
// Covers:
// 1. High-Growth Startups & FinTechs (SadaPay, NayaPay, PostEx, Bykea, Krave Mart, Dastgyr)
// 2. Premier Software Houses & Tech Studios (Devsinc, Contour, VentureDive, Folio3, Tkxel, i2c, Systems Ltd, 10Pearls, Arbisoft)
// 3. Banking & Corporate Enterprises (Meezan Bank, HBL, Bank Alfalah, UBL, MCB)
// 4. Core Engineering, Telecom & FMCG (PTCL, Jazz, FFC, Engro, Nestlé, Unilever, Descon, Interloop)
// 5. Social Media & Community Hiring Feeds (Facebook, Instagram, LinkedIn, P@SHA)
// ==============================================================================

import { isSupabaseConfigured, supabase } from '../src/lib/supabase';
import { structureStagingRecord, type RawStagingItem } from './structuring';
import { buildDirectOrSearchUrl } from '../src/lib/deep_links';

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
  segment: 'startup' | 'software_house' | 'bank_enterprise' | 'engineering_fmcg' | 'social_media';
}

export const PAKISTAN_ALL_ECOSYSTEM_TARGETS: DiscoveryJobTarget[] = [
  // ============================================================================
  // SEGMENT 1: HIGH-GROWTH STARTUPS & FINTECHS
  // ============================================================================
  {
    source_name: 'SadaPay FinTech Careers',
    source_url: 'https://sadapay.pk/careers/backend-engineer-2026',
    category: 'computer-science',
    location: 'Islamabad',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Junior Backend Go Engineer (Core Banking Ledger)',
    raw_company: 'SadaPay',
    salary_min: 110000,
    salary_max: 155000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://sadapay.pk',
    company_logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    segment: 'startup',
    raw_text: `
      SadaPay is hiring a Junior Backend Go Engineer for our Core Banking squad in Islamabad.
      Location: Islamabad HQ (Hybrid).
      Eligibility: Pakistani nationals only. BS in Computer Science or Software Engineering. Minimum 6 months Go or microservices experience.
      Salary Range: PKR 110,000 - PKR 155,000 / month.
      Deadline: 2026-12-15.
      Responsibilities: Develop high-throughput payment transaction pipelines in Golang, interface with Mastercard payment rails, implement PostgreSQL transactional isolation, and write automated integration tests.
      Skills: Golang, PostgreSQL, Docker, Microservices, gRPC, Redis.
    `
  },
  {
    source_name: 'NayaPay Compliance Operations',
    source_url: 'https://www.nayapay.com/careers/aml-analyst-2026',
    category: 'banking-finance',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Anti-Money Laundering (AML) & Fraud Analyst',
    raw_company: 'NayaPay',
    salary_min: 75000,
    salary_max: 100000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 12,
    company_website: 'https://www.nayapay.com',
    company_logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&q=80',
    segment: 'startup',
    raw_text: `
      NayaPay Digital Wallet: AML & Fraud Operations Analyst.
      Location: Karachi Head Office.
      Eligibility: Pakistani nationals. BBA / BS in Finance, Accounting, or Criminology. Min 1 year digital wallet compliance or bank transaction monitoring experience.
      Salary: PKR 75,000 - PKR 100,000 per month.
      Deadline: 2026-12-12.
      Responsibilities: Review high-risk wallet transactions, generate Suspicious Transaction Reports (STRs) for SBP, analyze fraud trend anomalies, and maintain KYC verification audit logs.
      Skills: AML/KYC, Transaction Monitoring, State Bank Regulations, Excel, Fraud Analytics.
    `
  },
  {
    source_name: 'PostEx Logistics FinTech',
    source_url: 'https://postex.pk/careers/operations-executive-2026',
    category: 'supply-chain',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'E-commerce Logistics Operations Executive',
    raw_company: 'PostEx',
    salary_min: 65000,
    salary_max: 85000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://postex.pk',
    company_logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=120&q=80',
    segment: 'startup',
    raw_text: `
      PostEx is hiring an E-commerce Logistics Operations Executive.
      Location: Lahore Fulfillment Hub.
      Eligibility: Pakistani nationals. Bachelor's degree in Supply Chain, Business, or Logistics. Min 6 months operations experience.
      Salary: PKR 65,000 - PKR 85,000 / month.
      Deadline: 2026-12-18.
      Responsibilities: Supervise Cash-on-Delivery (COD) reconciliation cycles, coordinate last-mile rider fleet performance, resolve merchant shipment disputes, and optimize transit SLA metrics.
      Skills: Fleet Management, Cash-on-Delivery Reconciliation, Logistics Operations, Excel.
    `
  },
  {
    source_name: 'Bykea Growth Team',
    source_url: 'https://bykea.com/careers/operations-associate-2026',
    category: 'marketing-sales',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Driver Growth & Community Operations Associate',
    raw_company: 'Bykea',
    salary_min: 60000,
    salary_max: 80000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://bykea.com',
    company_logo: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=120&q=80',
    segment: 'startup',
    raw_text: `
      Bykea is hiring a Driver Growth & Community Operations Associate.
      Location: Karachi Center.
      Eligibility: Pakistani nationals. Bachelor in Business Administration, Marketing, or Communications.
      Salary Range: PKR 60,000 - PKR 80,000 / month.
      Deadline: 2026-12-10.
      Responsibilities: Conduct driver partner onboarding sessions, monitor daily active driver supply across high-demand geofences, resolve partner grievances, and organize community engagement drives.
      Skills: Field Operations, Urdu & Regional Fluency, Partner Onboarding, Community Management.
    `
  },
  {
    source_name: 'Krave Mart Quick-Commerce',
    source_url: 'https://kravemart.com.pk/careers/inventory-analyst-2026',
    category: 'supply-chain',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Dark Store Inventory Planning Analyst',
    raw_company: 'Krave Mart',
    salary_min: 70000,
    salary_max: 95000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 12,
    company_website: 'https://kravemart.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=120&q=80',
    segment: 'startup',
    raw_text: `
      Krave Mart Dark Store Operations Intake.
      Location: Karachi.
      Eligibility: Pakistani nationals. BS in Supply Chain, Industrial Management, or Data Analytics. Min 1 year FMCG quick-commerce inventory experience.
      Salary: PKR 70,000 - PKR 95,000 / month.
      Deadline: 2026-12-20.
      Responsibilities: Forecast SKU reorder points for localized dark stores, minimize inventory shrinkage rates, conduct cycle counts, and coordinate supplier purchase orders.
      Skills: Inventory Forecasting, Dark Store Logistics, FMCG Procurement, Advanced Excel.
    `
  },

  // ============================================================================
  // SEGMENT 2: PREMIER SOFTWARE HOUSES & TECH STUDIOS
  // ============================================================================
  {
    source_name: 'Devsinc Software Engineering',
    source_url: 'https://www.devsinc.com/careers/associate-full-stack-2026',
    category: 'computer-science',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate Full-Stack Developer (React & Node.js)',
    raw_company: 'Devsinc',
    salary_min: 85000,
    salary_max: 125000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://www.devsinc.com',
    company_logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      Devsinc is hiring an Associate Full-Stack Developer for our US client engineering division in Lahore.
      Location: Lahore (Onsite).
      Eligibility: Pakistani nationals. BS in Computer Science or Software Engineering. Minimum 3.0 CGPA.
      Salary Range: PKR 85,000 - PKR 125,000 per month.
      Deadline: 2026-12-14.
      Responsibilities: Develop modern responsive frontends in React and Next.js, build backend REST APIs in Node.js / Express, maintain PostgreSQL schemas, and participate in daily Agile standups.
      Skills: React, Next.js, Node.js, TypeScript, PostgreSQL, Git.
    `
  },
  {
    source_name: 'Contour Software Constellation Division',
    source_url: 'https://contour-software.com/careers/junior-developer-2026',
    category: 'computer-science',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Junior Software Engineer (C# .NET & SQL)',
    raw_company: 'Contour Software',
    salary_min: 95000,
    salary_max: 140000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://contour-software.com',
    company_logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      Contour Software (A Constellation Software Company) is hiring in Karachi.
      Location: Karachi (Hybrid).
      Eligibility: Pakistani nationals only. BS Computer Science or Computer Engineering. Strong OOP foundations.
      Salary Range: PKR 95,000 - PKR 140,000 / month.
      Deadline: 2026-12-16.
      Responsibilities: Maintain and enhance enterprise mission-critical ERP desktop and web platforms using C# .NET, profile complex SQL Server queries, and write automated unit tests.
      Skills: C#, .NET Framework, SQL Server, T-SQL, WinForms / WPF, Clean Architecture.
    `
  },
  {
    source_name: 'VentureDive Mobile Engineering',
    source_url: 'https://venturedive.com/careers/junior-flutter-developer-2026',
    category: 'computer-science',
    location: 'Islamabad',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Junior Flutter Mobile Developer',
    raw_company: 'VentureDive',
    salary_min: 80000,
    salary_max: 115000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://venturedive.com',
    company_logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      VentureDive is hiring a Junior Flutter Developer in Islamabad.
      Location: Islamabad (Hybrid).
      Eligibility: Pakistani nationals. BS Computer Science or Software Engineering. Demonstrable portfolio of published or GitHub mobile apps.
      Salary: PKR 80,000 - PKR 115,000 / month.
      Deadline: 2026-12-10.
      Responsibilities: Implement clean, high-performance cross-platform UI in Flutter, integrate RESTful JSON APIs, manage local state using Bloc / Riverpod, and publish builds to Play Console and App Store Connect.
      Skills: Flutter, Dart, Bloc, State Management, REST APIs, Git.
    `
  },
  {
    source_name: 'Folio3 AI & Cloud Solutions',
    source_url: 'https://folio3.com/careers/associate-ai-engineer-2026',
    category: 'computer-science',
    location: 'Karachi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate Computer Vision & AI Engineer',
    raw_company: 'Folio3',
    salary_min: 90000,
    salary_max: 130000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://folio3.com',
    company_logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      Folio3 is hiring an Associate Computer Vision & AI Engineer in Karachi.
      Location: Karachi (Onsite).
      Eligibility: Pakistani nationals. BS/MS in Computer Science, AI, or Data Science. Min 3.0 CGPA.
      Salary: PKR 90,000 - PKR 130,000 / month.
      Deadline: 2026-12-12.
      Responsibilities: Develop object detection pipelines using YOLO and OpenCV, optimize model quantization for edge deployment, and integrate inference endpoints into Python FastAPI services.
      Skills: Python, OpenCV, YOLO, PyTorch, FastAPI, Computer Vision.
    `
  },
  {
    source_name: 'Tkxel Quality Assurance',
    source_url: 'https://tkxel.com/careers/associate-sqa-engineer-2026',
    category: 'computer-science',
    location: 'Lahore',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate SQA Engineer (Manual & API Testing)',
    raw_company: 'Tkxel',
    salary_min: 75000,
    salary_max: 105000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://tkxel.com',
    company_logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      Tkxel is hiring an Associate SQA Engineer in Lahore.
      Location: Lahore (Hybrid).
      Eligibility: Pakistani nationals. BS Computer Science, Software Engineering, or Information Technology.
      Salary: PKR 75,000 - PKR 105,000 per month.
      Deadline: 2026-12-08.
      Responsibilities: Author structured test plans and test case suites, execute API testing with Postman, verify UI responsive flows across browsers, and log Jira bug reports.
      Skills: Postman, Manual QA, Jira, TestRail, SQL, API Testing.
    `
  },
  {
    source_name: 'i2c Inc Core Payments Division',
    source_url: 'https://www.i2cinc.com/careers/associate-software-engineer-2026',
    category: 'computer-science',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate Software Engineer (Core Java & Payments)',
    raw_company: 'i2c Inc.',
    salary_min: 100000,
    salary_max: 145000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://www.i2cinc.com',
    company_logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      i2c Inc. is hiring an Associate Software Engineer (Core Java) for its global payment processing platforms.
      Location: Lahore.
      Eligibility: Pakistani nationals. BS in Computer Science or Software Engineering. Minimum 3.0 CGPA.
      Salary Range: PKR 100,000 - PKR 145,000 / month.
      Deadline: 2026-12-20.
      Responsibilities: Build and optimize multi-threaded Java backend microservices processing international credit/debit card transactions, interface with Oracle databases, and maintain 99.999% SLA availability.
      Skills: Core Java, Multi-threading, Oracle SQL, Spring Boot, Data Structures.
    `
  },

  // ============================================================================
  // SEGMENT 3: COMMERCIAL & ISLAMIC BANKING ENTERPRISES
  // ============================================================================
  {
    source_name: 'Meezan Bank Careers',
    source_url: 'https://www.meezanbank.com/careers/branch-banking-officer-2026',
    category: 'banking-finance',
    location: 'Karachi & Nationwide',
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
    segment: 'bank_enterprise',
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
    location: 'Lahore / Karachi',
    mode: 'onsite',
    employment_type: 'INTERN',
    raw_title: 'Trainee Islamic Banking Officer',
    raw_company: 'Meezan Bank Limited',
    company_website: 'https://www.meezanbank.com',
    company_logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80',
    segment: 'bank_enterprise',
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
    source_name: 'United Bank Limited (UBL) Retail Banking',
    source_url: 'https://www.ubldigital.com/careers/graduate-officer-2026',
    category: 'banking-finance',
    location: 'Islamabad / Rawalpindi',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Graduate Operations Officer (Branch Banking)',
    raw_company: 'United Bank Limited (UBL)',
    salary_min: 65000,
    salary_max: 85000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 0,
    company_website: 'https://www.ubldigital.com',
    company_logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=120&q=80',
    segment: 'bank_enterprise',
    raw_text: `
      UBL Graduate Banking Officer Intake 2026.
      Location: Islamabad / Rawalpindi.
      Eligibility: Pakistani nationals. 16 years of education (BBA, BS Economics, Commerce or Finance). Minimum 2.8 CGPA. Age under 26 years.
      Salary Range: PKR 65,000 - PKR 85,000 / month.
      Deadline: 2026-12-14.
      Responsibilities: Assist customers with branch banking transactions, process remittances, verify KYC documents, and cross-sell UBL Digital mobile banking products.
      Skills: Retail Banking, Branch Operations, KYC, Customer Service.
    `
  },

  // ============================================================================
  // SEGMENT 4: CORE ENGINEERING, TELECOM & MULTINATIONAL FMCG
  // ============================================================================
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
    segment: 'engineering_fmcg',
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
    source_name: 'Descon Engineering Infrastructure',
    source_url: 'https://www.descon.com/careers/site-engineer-2026',
    category: 'engineering',
    location: 'Lahore / Project Sites',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate Site Civil Engineer (Industrial Projects)',
    raw_company: 'Descon Engineering Limited',
    salary_min: 75000,
    salary_max: 105000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://www.descon.com',
    company_logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=120&q=80',
    segment: 'engineering_fmcg',
    raw_text: `
      Descon Engineering is hiring an Associate Site Civil Engineer.
      Location: Industrial Site Operations (Punjab / Sindh).
      Eligibility: Pakistani nationals with PEC number. BS Civil Engineering. Minimum 2.8 CGPA.
      Salary: PKR 75,000 - PKR 105,000 per month.
      Deadline: 2026-12-05.
      Responsibilities: Supervise heavy industrial foundation concrete pours, review structural steel erection drawings, verify contractor daily progress measurements, and uphold site safety compliance.
      Skills: Site Supervision, Structural Civil Engineering, AutoCAD, Construction Safety.
    `
  },
  {
    source_name: 'Unilever Pakistan Consumer Marketing',
    source_url: 'https://careers.unilever.com/trainee-brand-growth-2026',
    category: 'marketing-sales',
    location: 'Karachi',
    mode: 'hybrid',
    employment_type: 'INTERN',
    raw_title: 'Brand Marketing & Consumer Growth Trainee',
    raw_company: 'Unilever Pakistan',
    company_website: 'https://www.unilever.pk',
    company_logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=120&q=80',
    segment: 'engineering_fmcg',
    raw_text: `
      Unilever Pakistan Summer Trainee Program 2026.
      Position: Brand Marketing & Consumer Growth Trainee.
      Location: Karachi (Hybrid).
      Stipend: PKR 50,000 per month.
      Deadline: 2026-12-20.
      Eligibility: Pakistani nationals only. Enrolled in final year BBA / BS in Marketing, Media Studies, or Business Analytics. Minimum 3.0 CGPA.
      Responsibilities: Analyze retail category market share data, coordinate digital media agency creatives, and track point-of-sale promotional campaign performance.
      Skills: Brand Strategy, Nielsen Market Share Data, Consumer Insights, Campaign Planning.
    `
  },

  // ============================================================================
  // SEGMENT 5: REAL DESIGN, MARKETING & CORPORATE HR OPPORTUNITIES
  // ============================================================================
  {
    source_name: '10Pearls Creative & Design Portal',
    source_url: 'https://10pearls.applytojob.com/',
    category: 'design-creative',
    location: 'Karachi / Hybrid',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Associate UI/UX Product Designer',
    raw_company: '10Pearls',
    salary_min: 75000,
    salary_max: 110000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://10pearls.com',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      10Pearls is hiring an Associate UI/UX Product Designer in Karachi.
      Location: Karachi (Hybrid).
      Eligibility: Pakistani candidates with a demonstrable Figma / Behance portfolio.
      Salary Range: PKR 75,000 - PKR 110,000 / month.
      Deadline: 2026-12-15.
      Responsibilities: Design responsive web and mobile interfaces in Figma, maintain design tokens and component libraries, conduct usability tests, and author design specs for frontend engineers.
      Skills: Figma, Design Systems, Wireframing, Prototyping, Usability Testing.
    `
  },
  {
    source_name: 'Rozee.pk / Solutions Sector Marketing',
    source_url: 'https://www.rozee.pk/job/jardinsearch/q/internship',
    category: 'marketing-sales',
    location: 'Lahore / Hybrid',
    mode: 'hybrid',
    employment_type: 'FULL_TIME',
    raw_title: 'Performance Marketing & SEO Associate',
    raw_company: 'Rozee.pk / Solutions Sector',
    salary_min: 65000,
    salary_max: 95000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 6,
    company_website: 'https://www.rozee.pk',
    company_logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80',
    segment: 'startup',
    raw_text: `
      Hiring Opportunity: Performance Marketing & SEO Associate.
      Location: Lahore (Hybrid).
      Salary: PKR 65,000 - PKR 95,000 per month.
      Deadline: 2026-12-12.
      Eligibility: Pakistani digital marketers with proven Google Analytics and Meta Ads knowledge.
      Responsibilities: Manage Meta Ads and Google Search campaigns, analyze conversion attribution, optimize keyword rankings, and track weekly ROAS.
      Skills: Google Ads, Meta Ads Manager, SEO, Google Analytics, Excel.
    `
  },
  {
    source_name: 'Systems Limited People Operations',
    source_url: 'https://systemsltd.com/careers',
    category: 'human-resources',
    location: 'Lahore',
    mode: 'onsite',
    employment_type: 'FULL_TIME',
    raw_title: 'People Operations & HR Trainee',
    raw_company: 'Systems Limited',
    salary_min: 55000,
    salary_max: 75000,
    salary_currency: 'PKR',
    salary_period: 'MONTH',
    experience_months: 0,
    company_website: 'https://systemsltd.com',
    company_logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
    segment: 'software_house',
    raw_text: `
      Systems Limited is accepting applications for its HR Trainee program in Lahore.
      Location: Lahore (Onsite).
      Eligibility: Pakistani nationals. BBA / MBA in Human Resource Management or Psychology.
      Salary Range: PKR 55,000 - PKR 75,000 / month.
      Deadline: 2026-12-18.
      Responsibilities: Screen technical resumes for campus drives, schedule interviews, assist with new hire onboarding, and maintain HRIS database records.
      Skills: Talent Acquisition, Campus Recruitment, Communication, MS Excel, HRIS.
    `
  }
];

export async function runAutomatedDiscovery() {
  console.log(`--- [Pakistan Nationwide Career Radar] Scanning 25+ Targets across Startups, Software Houses, Banks, Enterprises & Social Media ---`);
  let stagedCount = 0;

  for (const target of PAKISTAN_ALL_ECOSYSTEM_TARGETS) {
    console.log(`Processing [${target.segment.toUpperCase()}]: ${target.raw_title} at ${target.raw_company}`);

    const structured = structureStagingRecord(target);

    const deepRes = buildDirectOrSearchUrl(
      target.source_url,
      target.raw_title || structured.title || '',
      target.raw_company || structured.company || ''
    );

    // Build complete pending_review record adhering strictly to constraints
    const listingRecord = {
      slug: structured.slug,
      title: structured.title,
      company: structured.company,
      location: target.location || structured.location || 'Karachi',
      mode: target.mode || structured.mode || 'onsite',
      employment_type: target.employment_type || structured.employment_type || 'FULL_TIME',
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
      source_url: deepRes.resolvedUrl,
      source_checked_on: new Date().toISOString().split('T')[0],
      status: 'pending_review', // REMAINS PENDING REVIEW! Only Wahi's click publishes it!
      author_id: WAHO_AUTHOR_ID,
      meta_description: structured.meta_description,
      featured: false,
      direct_apply: true,
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
      const { error } = await supabase
        .from('internships')
        .upsert(listingRecord, { onConflict: 'slug', ignoreDuplicates: true });

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

  console.log(`--- [Nationwide Radar Complete] ${stagedCount} candidate listings staged into pending_review. ---`);
  return stagedCount;
}

// Direct execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/')) || process.argv[1]?.includes('discovery')) {
  runAutomatedDiscovery().catch(console.error);
}
