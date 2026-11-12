// ==============================================================================
// src/lib/deep_links.ts
// Direct Job URL Resolution, Deep-Linking Enforcement & ATS Search Query Builder
// Prevents generic career portal 404s and enforces verified deep-linked apply URLs
// ==============================================================================

export interface DeepLinkResolution {
  resolvedUrl: string;
  isGenericFallback: boolean;
  warning?: string;
  atsType?: string;
}

// Regex to identify generic career root paths without a unique job slug or ID
const GENERIC_CAREER_PATH_REGEX = /^\/?(careers?|jobs?|vacancies|work-with-us|join-us|en\/careers?|en\/jobs?|pk\/careers?|pk\/jobs?)?\/?$/i;

// Social networks that must NEVER be used as direct apply links
const BLOCKED_SOCIAL_DOMAINS = /^(https?:\/\/)?(www\.)?(instagram\.com|facebook\.com|fb\.com|tiktok\.com)/i;

/**
 * Checks if a given URL is a generic root career link rather than a deep job link.
 */
export function isGenericCareerUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return true;
  
  // Clean url
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed === '#' || trimmed.startsWith('mailto:')) return false;

  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const pathname = parsed.pathname.toLowerCase().replace(/\/+$/, '');
    const search = parsed.search;

    // If query string contains a search parameter or job ID, it's considered deep-linked
    if (search && /(search|q|keyword|jobid|gh_jid|reqid|postingid|id)=/i.test(search)) {
      return false;
    }

    // Google forms, Bitly, or direct file uploads
    if (/forms\.gle|docs\.google\.com\/forms|bit\.ly/i.test(parsed.hostname)) {
      return false;
    }

    // Specific ATS deep patterns
    // e.g. workable.com/company/j/ID or applytojob.com/apply/ID
    if (/applytojob\.com/i.test(parsed.hostname) && /\/apply\/[a-z0-9]+/i.test(pathname)) {
      return false;
    }
    if (/workable\.com/i.test(parsed.hostname) && /\/j\/[a-z0-9]+/i.test(pathname)) {
      return false;
    }
    if (/hirestream\.io/i.test(parsed.hostname) && pathname.length > 5 && pathname !== '/jobs') {
      return false;
    }
    if (/rozee\.pk/i.test(parsed.hostname) && (pathname.includes('/job/') || search.includes('q='))) {
      return false;
    }
    if (/mustakbil\.com/i.test(parsed.hostname) && (pathname.includes('/jobs/') || search.includes('q='))) {
      return false;
    }
    if (/linkedin\.com/i.test(parsed.hostname) && pathname.includes('/jobs/view/')) {
      return false;
    }

    // If the path matches generic career root patterns and has no job identifiers
    if (GENERIC_CAREER_PATH_REGEX.test(pathname) || pathname === '') {
      return true;
    }

    // If path segments are very short or just 1 segment that says 'careers'
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length <= 1 && ['careers', 'jobs', 'vacancies', 'career', 'job'].includes(segments[0])) {
      return true;
    }

    return false;
  } catch {
    // If URL parsing fails, treat as generic/malformed
    return true;
  }
}

/**
 * Resolves a destination URL into a deep job link.
 * If generic, constructs an automated ATS search query URL and flags warning.
 */
export function buildDirectOrSearchUrl(
  targetUrl: string,
  title: string,
  company: string
): DeepLinkResolution {
  if (!targetUrl || targetUrl.trim() === '' || targetUrl.trim() === '#') {
    return {
      resolvedUrl: `https://www.rozee.pk/job/jardinsearch/q/${encodeURIComponent(title)}`,
      isGenericFallback: true,
      warning: '⚠️ Warning: Missing job URL. Defaulted to verified Pakistan ATS search query.'
    };
  }

  const cleanUrl = targetUrl.trim();

  // Handle mailto directly
  if (cleanUrl.startsWith('mailto:')) {
    return {
      resolvedUrl: cleanUrl,
      isGenericFallback: false,
      atsType: 'email'
    };
  }

  // Social URLs are rejected from being treated as direct apply
  if (BLOCKED_SOCIAL_DOMAINS.test(cleanUrl)) {
    const encodedTitle = encodeURIComponent(title.trim());
    return {
      resolvedUrl: `https://www.rozee.pk/job/jardinsearch/q/${encodedTitle}`,
      isGenericFallback: true,
      warning: '⚠️ Warning: Social media URL (Instagram/Facebook) detected. Substituted with direct Pakistan ATS search query.'
    };
  }

  const isGeneric = isGenericCareerUrl(cleanUrl);

  if (!isGeneric) {
    return {
      resolvedUrl: cleanUrl,
      isGenericFallback: false
    };
  }

  // If the target is a known company portal, keep the clean career portal path
  // NEVER append long arbitrary titles into company ATS search bars that return "No jobs found"!
  let enhancedUrl = cleanUrl;
  try {
    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const host = parsed.hostname.toLowerCase();

    // Aggregators with broad search capability
    if (host.includes('rozee.pk')) {
      const simplifiedQuery = encodeURIComponent(title.split(/[\s(&/-]+/)[0] || 'internship');
      enhancedUrl = `https://www.rozee.pk/job/jardinsearch/q/${simplifiedQuery}`;
    } else if (host.includes('mustakbil.com')) {
      const simplifiedQuery = encodeURIComponent(title.split(/[\s(&/-]+/)[0] || 'internship');
      enhancedUrl = `https://www.mustakbil.com/jobs/search?q=${simplifiedQuery}`;
    } else {
      // For enterprise company career sites (FFC, Systems Ltd, Meezan, Jazz, etc.)
      // DO NOT append arbitrary long search strings that cause "No jobs found" errors.
      // Retain the clean, official career endpoint where candidates can browse all live openings.
      enhancedUrl = cleanUrl.split('?')[0];
    }
  } catch {
    enhancedUrl = cleanUrl;
  }

  return {
    resolvedUrl: enhancedUrl,
    isGenericFallback: true,
    warning: '⚠️ Warning: Generic Career Portal Link Detected. Please supply direct job URL to prevent 404s.'
  };
}

/**
 * Validates and extracts links from flyer text or social media caption.
 */
export function extractDirectApplyChannel(
  caption: string,
  explicitUrl?: string,
  explicitEmail?: string
): { directApplyUrl: string; hrEmail: string; isGenericFallback: boolean; warning?: string } {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const linkRegex = /(https?:\/\/[^\s]+)/gi;

  const hrEmail = (explicitEmail || caption.match(emailRegex)?.[1] || '').trim();

  // Find non-social URLs from caption or explicit input
  const linksFound = (caption.match(linkRegex) || []).map(l => l.replace(/[.,;:)]+$/, ''));
  const candidateUrl = (explicitUrl || linksFound.find(l => !BLOCKED_SOCIAL_DOMAINS.test(l)) || '').trim();

  if (candidateUrl) {
    const resolution = buildDirectOrSearchUrl(candidateUrl, '', '');
    return {
      directApplyUrl: resolution.resolvedUrl,
      hrEmail,
      isGenericFallback: resolution.isGenericFallback,
      warning: resolution.warning
    };
  }

  if (hrEmail) {
    return {
      directApplyUrl: `mailto:${hrEmail}`,
      hrEmail,
      isGenericFallback: false
    };
  }

  return {
    directApplyUrl: '',
    hrEmail: '',
    isGenericFallback: true,
    warning: '⚠️ Warning: No direct apply URL or HR email found.'
  };
}
