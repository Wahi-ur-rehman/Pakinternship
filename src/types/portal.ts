// ==============================================================================
// src/types/portal.ts
// Core domain interfaces for Automated Internship & Job Portal
// ==============================================================================

export type ListingMode = 'onsite' | 'remote' | 'hybrid';
export type EmploymentType = 'INTERN' | 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR';
export type ListingStatus = 'draft' | 'pending_review' | 'published' | 'closed' | 'archived';

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar_url?: string;
  linkedin_url?: string;
  created_at?: string;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  mode: ListingMode;
  employment_type: EmploymentType;
  category: 'engineering' | 'computer-science' | 'information-technology';
  
  // Non-negotiable: Never AI-invented numbers!
  stipend: string | null; // NULL renders literal "Not disclosed by the employer"
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string;
  salary_period?: 'MONTH' | 'YEAR' | 'WEEK' | 'HOUR';
  deadline: string | null; // NULL renders literal "Rolling / Apply ASAP"
  
  eligibility_nationality: string; // e.g., "Pakistani nationals only"
  eligibility_degree: string;
  eligibility_cgpa?: string | null;
  eligibility_age?: string | null;
  experience_months?: number;
  
  responsibilities: string[]; // 4-6 items with active verbs
  skills: string[];
  tips: string[]; // 3-4 interview & resume tips
  intro: string; // 60-80 words
  
  source_url: string; // INTERNAL ONLY. NEVER rendered publicly in client HTML
  source_checked_on: string; // ISO date string
  
  status: ListingStatus;
  published_at?: string | null;
  expired_at?: string | null;
  author_id: string;
  meta_description: string; // 150-160 chars
  featured: boolean;
  direct_apply?: boolean;
  
  company_website?: string;
  company_logo?: string;
  
  // Verification Gate - Human Confirmation Audit
  verified_stipend: boolean;
  verified_deadline: boolean;
  verified_nationality: boolean;
  verified_degree: boolean;
  verified_by?: string | null;
  verified_at?: string | null;
  
  created_at?: string;
  updated_at?: string;
}

export interface PortalSettings {
  id: number;
  monthly_publish_count: number;
  publish_cap: number; // default 12
  last_reset_month: string;
  updated_at?: string;
}

export interface AdSenseComplianceCheck {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  details: string;
  severity: 'blocker' | 'warning' | 'info';
}
