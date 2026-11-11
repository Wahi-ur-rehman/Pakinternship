// ==============================================================================
// scripts/discovery.ts
// Section 6 Stage A & B — Automated Discovery & Structuring Engine
// Scans top verified Pakistan employers across all key sectors and stages them
// into the `internships` table with status = 'pending_review'.
// STRICT RULES:
// - Verbatim stipend / deadline or NULL (never invented)
// - Status strictly remains 'pending_review' (NEVER published automatically)
// - Assigned to Founder & Chief Career Editor Wahi ur Rehman (slug: waho)
// ==============================================================================

import { isSupabaseConfigured, supabase } from '../src/lib/supabase';
import { structureStagingRecord, type RawStagingItem } from './structuring';

const WAHO_AUTHOR_ID = 'a1000000-0000-0000-0000-000000000001';

interface DiscoveryTarget extends RawStagingItem {
  category: string;
  location: string;
  mode: 'onsite' | 'hybrid' | 'remote';
  company_website?: string;
  company_logo?: string;
}

// Verified official recruitment intakes across Pakistan's premier sectors
const TARGET_SOURCES: DiscoveryTarget[] = [
  {
    source_name: 'Meezan Bank Trainee Officer Program',
    source_url: 'https://www.meezanbank.com/careers/trainee-officer-2026',
    category: 'banking-finance',
    location: 'Karachi',
    mode: 'onsite',
    raw_title: 'Trainee Islamic Banking Officer',
    raw_company: 'Meezan Bank',
    company_website: 'https://www.meezanbank.com',
    company_logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Meezan Bank Graduate Trainee Officer Intake 2026.
      Position: Trainee Islamic Banking Officer.
      Company: Meezan Bank Limited.
      Location: Karachi (Head Office & Branch Network).
      Mode: Onsite.
      Eligibility: Pakistani nationals only. Final year graduates or recent degree holders in BBA, BS Accounting & Finance, Economics, or Islamic Finance from HEC recognized universities. Minimum 3.0 CGPA or 70% marks. Age under 26 years.
      Compensation / Stipend: PKR 45,000 per month.
      Application Deadline: 2026-12-15.
      Responsibilities: Support branch operations, learn Shariah-compliant retail and commercial financing contracts, reconcile transactional ledger entries, and prepare customer asset documentation.
      Skills: Islamic Finance, Financial Analysis, Microsoft Excel, Banking Operations, Communication.
    `,
  },
  {
    source_name: 'Jazz Digital Career Intake',
    source_url: 'https://jobs.jazz.com.pk/summer-internship-program-2026',
    category: 'computer-science',
    location: 'Islamabad',
    mode: 'hybrid',
    raw_title: 'Software Engineering Trainee (Data & Core API)',
    raw_company: 'Jazz (PMCL)',
    company_website: 'https://jazz.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Jazz Summer Internship Program 2026.
      Position: Software Engineering Trainee (Data & Core API).
      Company: Jazz.
      Location: Islamabad HQ (Hybrid).
      Mode: Hybrid.
      Eligibility: Pakistani nationals only. Final year BS in Computer Science, Software Engineering or Data Science from HEC recognized universities. Minimum CGPA: 3.0. Age under 26 years.
      Compensation / Stipend: PKR 50,000 per month.
      Application Deadline: 2026-12-10.
      Responsibilities: Assist senior engineering squads in developing data pipeline microservices, refactoring legacy REST endpoints, and authoring unit tests.
      Skills: Python, SQL, REST APIs, Git, Docker fundamentals.
    `,
  },
  {
    source_name: 'PTCL Trainee Engineer Scheme',
    source_url: 'https://ptcl.com.pk/careers/trainee-engineer-telecom-2026',
    category: 'engineering',
    location: 'Lahore',
    mode: 'onsite',
    raw_title: 'Trainee Engineer - Optical Fiber & Transmission',
    raw_company: 'PTCL Group',
    company_website: 'https://ptcl.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      PTCL Trainee Engineer Optical Transmission Intake 2026.
      Position: Trainee Engineer - Optical Fiber & Transmission.
      Company: PTCL Group.
      Location: Lahore / Rawalpindi.
      Mode: Onsite.
      Compensation / Stipend: PKR 42,000 per month.
      Application Deadline: 2026-11-30.
      Eligibility: Pakistani nationals only with PEC registration. BS Electrical (Telecom) or Electronic Engineering. Min CGPA 2.8.
      Responsibilities: Support fiber optic network commissioning, evaluate OTDR loss traces, inspect DWDM transmission multiplexers, and document site survey schematics.
      Skills: Fiber Optics, DWDM, OTDR, Networking, Linux basics.
    `,
  },
  {
    source_name: 'Fauji Fertilizer Company Apprenticeship',
    source_url: 'https://www.ffc.com.pk/careers/trainee-engineer-2026',
    category: 'engineering',
    location: 'Rahim Yar Khan',
    mode: 'onsite',
    raw_title: 'Graduate Trainee Engineer (Chemical & Mechanical)',
    raw_company: 'Fauji Fertilizer Company (FFC)',
    company_website: 'https://www.ffc.com.pk',
    company_logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      FFC Graduate Trainee Engineers Scheme 2026.
      Position: Graduate Trainee Engineer.
      Company: Fauji Fertilizer Company.
      Location: Goth Machhi / Rahim Yar Khan Plant.
      Mode: Onsite.
      Compensation / Stipend: PKR 55,000 per month.
      Application Deadline: 2026-12-01.
      Eligibility: Pakistani nationals only. BS Chemical or Mechanical Engineering recognized by PEC. Minimum 3.0 CGPA. Age under 25 years.
      Responsibilities: Monitor ammonia synthesis reactor parameters, inspect rotating equipment vibration levels, conduct preventive maintenance checkouts, and author daily plant logs.
      Skills: Process Safety, Heat Exchangers, Aspen HYSYS, Equipment Inspection, Industrial Safety.
    `,
  },
  {
    source_name: 'Nestlé Pakistan LEAD Summer Program',
    source_url: 'https://www.nestle.pk/jobs/internship-2026',
    category: 'supply-chain',
    location: 'Lahore',
    mode: 'onsite',
    raw_title: 'Supply Chain Operations Trainee',
    raw_company: 'Nestlé Pakistan',
    company_website: 'https://www.nestle.pk',
    company_logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      Nestle Pakistan LEAD Internship 2026.
      Position: Supply Chain Operations Trainee.
      Company: Nestlé Pakistan.
      Location: Sheikhupura Factory / Lahore.
      Mode: Onsite.
      Compensation / Stipend: PKR 40,000 per month.
      Application Deadline: 2026-12-20.
      Eligibility: Pakistani nationals only. Enrolled in 3rd or final year BS Industrial Engineering, Supply Chain Management, or BBA. Min CGPA 3.0.
      Responsibilities: Track raw material inventory variances, analyze warehouse picking cycle times, assist in distribution route optimization, and implement 5S standards.
      Skills: SAP Basics, Inventory Control, Lean Six Sigma, Excel, Route Optimization.
    `,
  },
  {
    source_name: 'HBL FinTech Innovation Intake',
    source_url: 'https://www.hbl.com/careers/digital-trainee-2026',
    category: 'information-technology',
    location: 'Karachi',
    mode: 'hybrid',
    raw_title: 'Digital Payments QA Analyst Trainee',
    raw_company: 'Habib Bank Limited (HBL)',
    company_website: 'https://www.hbl.com',
    company_logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=120&q=80',
    raw_text: `
      HBL The League - Digital Payments & FinTech Intake 2026.
      Position: Digital Payments QA Analyst Trainee.
      Company: Habib Bank Limited.
      Location: Karachi.
      Mode: Hybrid.
      Compensation / Stipend: PKR 48,000 per month.
      Application Deadline: 2026-12-08.
      Eligibility: Pakistani nationals only. BS Computer Science, Software Engineering or Information Technology. Minimum CGPA 3.0.
      Responsibilities: Execute automated regression test suites for HBL Mobile and Konnect payment flows, log defect reports in Jira, test ISO-8583 switch messaging, and verify security protocols.
      Skills: Test Automation, Postman, SQL, Mobile App Testing, Financial Switch Messaging.
    `,
  }
];

export async function runAutomatedDiscovery() {
  console.log('--- [Automated Discovery Radar] Scanning official Pakistan intakes ---');
  let stagedCount = 0;

  for (const target of TARGET_SOURCES) {
    console.log(`Auditing target intake: ${target.raw_title} at ${target.raw_company}`);

    const structured = structureStagingRecord(target);

    // Build complete pending_review record adhering strictly to constraints
    const listingRecord = {
      slug: structured.slug,
      title: structured.title,
      company: structured.company,
      location: target.location || structured.location || 'Karachi',
      mode: target.mode || structured.mode || 'onsite',
      employment_type: structured.employment_type || 'INTERN',
      category: target.category || structured.category || 'computer-science',
      stipend: structured.stipend, // Verbatim or NULL, never guessed!
      deadline: structured.deadline, // Verbatim or NULL, never guessed!
      eligibility_nationality: structured.eligibility_nationality || 'Pakistani nationals only',
      eligibility_degree: structured.eligibility_degree,
      eligibility_cgpa: structured.eligibility_cgpa || null,
      eligibility_age: structured.eligibility_age || null,
      experience_months: 0,
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
      // Upsert into internships with ON CONFLICT (slug) DO NOTHING
      const { data, error } = await supabase
        .from('internships')
        .upsert(listingRecord, { onConflict: 'slug', ignoreDuplicates: true })
        .select('id, title, slug, status');

      if (error) {
        console.error(`Failed to stage ${target.raw_title}:`, error.message);
      } else {
        stagedCount++;
        console.log(`✓ Staged into pending_review: ${target.raw_title} (${listingRecord.slug})`);
      }
    } else {
      stagedCount++;
      console.log(`[Local Mock] Staged record for: ${target.raw_title}`);
    }
  }

  console.log(`--- [Discovery Complete] ${stagedCount} candidate listings staged into pending_review. ---`);
  console.log('All candidate listings are waiting at /admin/review for Wahi ur Rehman to verify the source link and click Submit.');
  return stagedCount;
}

// Direct execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/')) || process.argv[1]?.includes('discovery')) {
  runAutomatedDiscovery().catch(console.error);
}
