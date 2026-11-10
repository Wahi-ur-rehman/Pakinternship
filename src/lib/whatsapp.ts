// ==============================================================================
// src/lib/whatsapp.ts
// Section 12: WhatsApp Share Message Generator
// Exact Structure & AdSense/Google Scaled Content Abuse Safe Rules
// ==============================================================================

import type { Listing } from '../types/portal';

export function generateWhatsAppShareMessage(
  listing: Listing,
  siteUrl: string = 'https://pakistan-internships.pages.dev'
): string {
  const isInternship = listing.employment_type === 'INTERN';
  const rolePrefix = isInternship ? 'Internship' : 'Job';
  
  // Stipend rule: [stipend] OR "Check details on the full post"
  const stipendText = listing.stipend ? listing.stipend : 'Check details on the full post';
  
  // Deadline rule: [deadline] OR "Not specified by the employer"
  const deadlineText = listing.deadline ? listing.deadline : 'Not specified by the employer';
  
  // Neutral 2-sentence description (No hype, no sensationalism)
  const neutralDescription = `${listing.company} is accepting applications for the ${listing.title} position based in ${listing.location}. Open to eligible Pakistani engineering and IT students meeting the stated academic prerequisites.`;

  // Site post URL only (never leak or direct-link raw external source)
  const postUrl = `${siteUrl}/${listing.category}/${listing.slug}`;

  // Assemble according to Section 12 exact spec
  const message = `🚨 New ${rolePrefix} Alert! - Role: ${listing.title} - Company: ${listing.company} - Location: ${listing.location} (${listing.mode}) - Stipend: ${stipendText} - Deadline: ${deadlineText} ${neutralDescription} 👉 Check full eligibility & apply here: ${postUrl}`;

  return message;
}
