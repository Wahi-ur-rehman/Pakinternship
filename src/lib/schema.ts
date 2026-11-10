// ==============================================================================
// src/lib/schema.ts
// Google-Compliant JobPosting Structured Data Generator (Section 9 & 9B Full Specification)
// Strict compliance:
// 1. employmentType: "INTERN" for internships; "FULL_TIME", "PART_TIME", etc. for standard jobs
// 2. jobLocationType: ONLY "TELECOMMUTE" if 100% remote; NEVER emit for hybrid or onsite
// 3. baseSalary: omitted entirely if no numeric value exists; never estimate or emit 0
// 4. validThrough: past date when closed (archive signal without deletion); future or omitted when rolling
// 5. directApply: false
// 6. applicantLocationRequirements: Pakistan for remote
// ==============================================================================

import type { Listing } from '../types/portal';

export function generateJobPostingSchema(listing: Listing, siteUrl: string = 'https://pakistan-internships.pages.dev'): Record<string, unknown> {
  const isInternship = listing.employment_type === 'INTERN';
  const isRemote = listing.mode === 'remote';
  const isClosed = listing.status === 'closed';

  // Build clean HTML description
  const descriptionHtml = `
    <p>${escapeHtml(listing.intro)}</p>
    <h3>Key Responsibilities</h3>
    <ul>
      ${listing.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
    </ul>
    <h3>Eligibility & Requirements</h3>
    <ul>
      <li><strong>Nationality:</strong> ${escapeHtml(listing.eligibility_nationality)}</li>
      <li><strong>Degree:</strong> ${escapeHtml(listing.eligibility_degree)}</li>
      ${listing.eligibility_cgpa ? `<li><strong>CGPA:</strong> ${escapeHtml(listing.eligibility_cgpa)}</li>` : ''}
      ${listing.eligibility_age ? `<li><strong>Age Limit:</strong> ${escapeHtml(listing.eligibility_age)}</li>` : ''}
    </ul>
    <h3>Skills Required</h3>
    <p>${escapeHtml(listing.skills.join(', '))}</p>
  `.trim();

  // Root Schema
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: listing.title,
    description: descriptionHtml,
    identifier: {
      '@type': 'PropertyValue',
      name: listing.company,
      value: listing.id,
    },
    datePosted: listing.published_at ? listing.published_at.slice(0, 10) : listing.source_checked_on,
    employmentType: listing.employment_type,
    hiringOrganization: {
      '@type': 'Organization',
      name: listing.company,
      sameAs: listing.company_website || undefined,
      logo: listing.company_logo || undefined,
    },
    directApply: false,
  };

  // validThrough Handling (Section 8 & 9B.5 Expiry Signal)
  if (isClosed) {
    // If closed, set validThrough to past date (yesterday or deadline)
    schema.validThrough = listing.expired_at
      ? listing.expired_at
      : listing.deadline
      ? `${listing.deadline}T23:59:59+05:00`
      : '2026-10-01T00:00:00+05:00';
  } else if (listing.deadline) {
    schema.validThrough = `${listing.deadline}T23:59:59+05:00`;
  }
  // If deadline is null and listing is open, validThrough is omitted for rolling intake

  // Location / Remote Handling (Section 9B.2 & 9B.6)
  if (isRemote) {
    // 100% Remote ONLY: TELECOMMUTE + applicantLocationRequirements
    schema.jobLocationType = 'TELECOMMUTE';
    schema.applicantLocationRequirements = {
      '@type': 'Country',
      name: 'Pakistan',
    };
  } else {
    // Onsite or Hybrid: DO NOT set jobLocationType to REMOTE or HYBRID (Google invalidates it)
    schema.jobLocation = {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: listing.location,
        addressCountry: 'PK',
      },
    };
  }

  // baseSalary Handling: Strict omission if no numeric value exists
  if (listing.salary_min || listing.salary_max) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: listing.salary_currency || 'PKR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: listing.salary_min || undefined,
        maxValue: listing.salary_max || undefined,
        value: !listing.salary_max ? listing.salary_min : undefined,
        unitText: listing.salary_period || 'MONTH',
      },
    };
  }

  // Credentials & Experience
  schema.educationRequirements = {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: listing.eligibility_degree.toLowerCase().includes('master')
      ? 'postgraduate degree'
      : 'bachelor degree',
  };

  schema.experienceRequirements = {
    '@type': 'OccupationalExperienceRequirements',
    monthsOfExperience: listing.experience_months || (isInternship ? 0 : 6),
  };

  // Skills & Responsibilities
  if (listing.skills && listing.skills.length > 0) {
    schema.skills = listing.skills;
  }

  return schema;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
