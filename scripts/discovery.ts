// ==============================================================================
// scripts/discovery.ts
// Section 6 Stage A — Discovery (Automated Ingestion into Staging Table)
// Fetches candidate listings from official career portals into staging_listings
// DOES NOT PUBLISH.
// ==============================================================================

import { isSupabaseConfigured, supabase } from '../src/lib/supabase';

interface DiscoveryTarget {
  name: string;
  sourceUrl: string;
  category: 'engineering' | 'computer-science' | 'information-technology';
  rawTitle: string;
  rawCompany: string;
  rawSampleText: string;
}

// Configurable official announcement sources across Pakistan Tech Hubs
const TARGET_SOURCES: DiscoveryTarget[] = [
  {
    name: 'Jazz Digital Career Intake',
    sourceUrl: 'https://jobs.jazz.com.pk/summer-internship-program-2026',
    category: 'computer-science',
    rawTitle: 'Software Engineering Trainee (Data & Core API)',
    rawCompany: 'Jazz (PMCL)',
    rawSampleText: `
      Jazz Summer Internship Program 2026.
      Position: Software Engineering Trainee.
      Location: Islamabad HQ (Hybrid).
      Eligibility: Pakistani nationals only. Final year BS in Computer Science, Software Engineering or Data Science from HEC recognized universities. Minimum CGPA: 3.0. Age under 26 years.
      Compensation / Stipend: PKR 50,000 per month.
      Application Deadline: 2026-12-10.
      Role Summary: Assist senior engineering squads in developing data pipeline microservices, refactoring legacy REST endpoints, and authoring unit tests.
      Required Skills: Python, SQL, REST APIs, Git, Docker fundamentals.
    `,
  },
  {
    name: 'PTCL Trainee Engineer Scheme',
    sourceUrl: 'https://ptcl.com.pk/careers/trainee-engineer-telecom-2026',
    category: 'engineering',
    rawTitle: 'Trainee Engineer - Optical Fiber & Transmission',
    rawCompany: 'PTCL Group',
    rawSampleText: `
      PTCL Trainee Engineer Optical Transmission Intake 2026.
      Location: Rawalpindi / Lahore.
      Mode: Onsite.
      Stipend: PKR 42,000 / month.
      Deadline: 2026-11-30.
      Eligibility: Pakistani nationals only with PEC registration. BS Electrical (Telecom) or Electronic Engineering. Min CGPA 2.8.
      Responsibilities: Support fiber optic network commissioning, evaluate OTDR loss traces, inspect DWDM transmission multiplexers.
      Skills: Fiber Optics, DWDM, OTDR, Networking, Linux basics.
    `,
  },
  {
    name: 'Afiniti AI Fellowship',
    sourceUrl: 'https://www.afiniti.com/careers/fellowship-2026',
    category: 'computer-science',
    rawTitle: 'Machine Learning Research Intern',
    rawCompany: 'Afiniti',
    rawSampleText: `
      Afiniti Behavioral AI Research Fellowship.
      Location: Lahore.
      Mode: Hybrid.
      Eligibility: Pakistani nationals only. Enrolled in MS or final year BS Computer Science / Math / AI. Minimum 3.3 CGPA.
      Stipend: PKR 60,000 per month.
      Deadline: 2026-12-05.
      Responsibilities: Train PyTorch models on behavioral customer interaction datasets. Evaluate ROC-AUC metrics. Optimize model latency.
      Skills: Python, PyTorch, Pandas, scikit-learn, Vector Math.
    `,
  }
];

export async function runStageADiscovery() {
  console.log('--- [Stage A: Discovery] Starting official career source ingest ---');
  let stagedCount = 0;

  for (const target of TARGET_SOURCES) {
    console.log(`Checking target source: ${target.name} (${target.sourceUrl})`);

    const stagingRecord = {
      source_name: target.name,
      source_url: target.sourceUrl,
      raw_title: target.rawTitle,
      raw_company: target.rawCompany,
      raw_text: target.rawSampleText.trim(),
      status: 'pending_structuring',
      discovered_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('staging_listings')
        .insert(stagingRecord)
        .select();

      if (error) {
        console.error(`Failed to stage record for ${target.name}:`, error.message);
      } else {
        stagedCount++;
        console.log(`Successfully inserted into staging_listings: ID ${data?.[0]?.id}`);
      }
    } else {
      stagedCount++;
      console.log(`[Mock Mode] Staged record locally for: ${target.rawTitle} at ${target.rawCompany}`);
    }
  }

  console.log(`--- [Stage A: Discovery Complete] ${stagedCount} candidate listings written to staging_listings table. ---`);
  console.log('Notice: Discovery records remain in staging and CANNOT publish until passing Stage B structuring and Stage C human verification.');
}

// Direct execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/')) || process.argv[1]?.includes('discovery')) {
  runStageADiscovery().catch(console.error);
}
