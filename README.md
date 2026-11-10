# PakInternships 🇵🇰
### Automated, SEO-First Early-Career & Internship Portal for Pakistan

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Ready-F38020?style=flat&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)

PakInternships is an automated, SEO-first, hyper-niche job and internship portal designed specifically for Pakistani university students and fresh graduates. Operating on near-zero cash cost, it is architected from the ground up to provide verified, fact-checked listings across all major economic sectors in Pakistan while surviving Google's scaled-content-abuse policies and ensuring strict Google AdSense compliance.

---

## 🌟 Key Pillars & Architectural Guarantees

### 1. Strict Non-Negotiable Factual Accuracy
* **Zero AI-Invented Figures**: The AI pipeline is strictly forbidden from guessing, estimating, or extrapolating stipends, deadlines, salaries, or academic criteria.
* **Deterministic Fallbacks**: Empty fields render exact, humanized fallbacks:
  * Missing Stipend: `"Not disclosed by the employer"`
  * Missing Deadline: `"Rolling / Apply ASAP"`
* **Database Verification Gate**: A post **cannot reach `published` status** without four logged human confirmations (`verified_stipend`, `verified_deadline`, `verified_nationality`, `verified_degree`), enforced at the PostgreSQL check-constraint level.

### 2. Comprehensive Multi-Niche Coverage
PakInternships covers all 8 premier recruitment tracks across Pakistan:
* **💻 Computer Science & Software Engineering** (Full-stack, AI/ML, Mobile, QA)
* **⚙️ Core Engineering** (Electrical, Mechanical, Mechatronics, PEC-accredited programs)
* **☁️ Information Technology & Cloud** (DevOps, SRE, Network Ops, Cybersecurity SOC)
* **📊 Banking, Corporate Finance & FinTech** (MTO drives, Credit Analysis, SBP compliance)
* **🚀 Digital Marketing, Growth & E-Commerce** (Performance marketing, Meta/Google Ads)
* **🎨 UI/UX Design & Product Creation** (Figma design systems, Motion graphics, 3D)
* **👥 Human Resources & Talent Acquisition** (Technical recruiting, People operations)
* **📦 Supply Chain, Logistics & Procurement** (Warehouse operations, SAP ERP, FMCG)

### 3. Expiry & Archival Discipline (Never 404)
* **Daily Cron (02:00 PKT)**: Inspects deadlines daily. When `deadline < today`, status transitions to `closed`, `expired_at` is set, and a prominent banner is rendered with links to 3 active alternative listings.
* **Schema Accuracy**: Closed postings update schema `validThrough` to the past date while maintaining static page health.
* **12-Month 301 Archival**: Listings older than 12 months issue HTTP 301 Permanent Redirects to their parent category, preserving link equity without duplicate thin content.

### 4. Google AdSense & E-E-A-T Excellence
* **AdSense Audit Engine (`/admin/adsense-check`)**: Built-in 8-point automated compliance checker validating publication cadence ($\le 12$/month), author attribution, indexable URL thickness, and trust pages.
* **Real Editorial Board**: Every post is attributed to a real, vetted professional editor with an individual profile page under `/authors/[slug]`.
* **Humanized Legal Pages**: Five complete, non-templated trust pages (`/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`).

### 5. Google JobPosting Schema & 95+ Lighthouse
* Emits valid `schema.org/JobPosting` JSON-LD on every listing (`INTERN` for internships, `FULL_TIME`/`PART_TIME` for jobs).
* Static generation ensures pure HTML/CSS delivery with **zero runtime JavaScript bloat** on listing pages for near-instant Time to First Byte (TTFB).

---

## 🏗 Tech Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | **Astro 5 (Static Output)** | Ultra-fast SSG, zero client JS overhead, top SEO rankings |
| **Styling** | **Tailwind CSS v4** | Modern, token-based design system optimized for mobile speed |
| **Database** | **Supabase (PostgreSQL)** | Free-tier relational database with strict SQL check constraints |
| **Hosting** | **Cloudflare Pages** | Global edge network with free automated CI/CD builds |
| **Automation** | **GitHub Actions** | Daily cron running at 02:00 PKT for automated expiry audits |
| **Language** | **TypeScript 5** | Strict end-to-end typing across schema, pipeline, and components |

---

## 📁 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── daily-cron.yml           # Daily 02:00 PKT automated expiry workflow
├── public/
│   ├── images/authors/              # Editorial board profile photography
│   ├── _headers                     # Cloudflare security and cache headers
│   ├── favicon.svg                  # Portal vector brand icon
│   └── robots.txt                   # Search crawler directives
├── scripts/
│   ├── discovery.ts                 # Stage A: Automated carrier portal scraper
│   ├── structuring.ts               # Stage B: Constrained AI schema extraction
│   ├── cron_expiry.ts               # Stage D: Idempotent daily expiry auditor
│   └── test_acceptance.ts           # 11-point acceptance verification test suite
├── src/
│   ├── components/
│   │   └── AdSlot.astro             # Non-intrusive AdSense slots (max 3 per page)
│   ├── layouts/
│   │   └── Layout.astro             # Global master layout with OpenGraph & Meta
│   ├── lib/
│   │   ├── adsense.ts               # Programmatic 8-point AdSense auditor
│   │   ├── schema.ts                # Google JobPosting JSON-LD generator
│   │   ├── supabase.ts              # Resilient Supabase client & fallback data
│   │   └── whatsapp.ts              # Section 12 compliant WhatsApp generator
│   ├── pages/
│   │   ├── [category]/
│   │   │   ├── [slug].astro         # High-converting individual listing template
│   │   │   └── index.astro          # Curated category feed with editorial copy
│   │   ├── admin/
│   │   │   ├── adsense-check.astro  # Section 11 AdSense compliance dashboard
│   │   │   ├── posts.astro          # Post inventory & editorial status manager
│   │   │   ├── review.astro         # Section 7 Human Verification Gate
│   │   │   └── settings.astro       # Monthly publish cap settings (12/mo)
│   │   ├── authors/
│   │   │   └── [slug].astro         # Author bio & reviewed listings page
│   │   ├── about.astro              # Mission, story & editorial board
│   │   ├── contact.astro            # Editorial corrections & recruiter contact
│   │   ├── disclaimer.astro         # Factual accuracy & employer disclaimers
│   │   ├── index.astro              # Homepage with multi-niche selector
│   │   ├── privacy-policy.astro     # Hand-written GDPR/AdSense privacy policy
│   │   ├── sitemap*.xml.ts          # Segmented XML sitemaps (posts, categories, pages)
│   │   └── terms.astro              # User and applicant terms of service
│   └── types/
│       └── portal.ts                # TypeScript domain models and enums
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   # PostgreSQL DDL, triggers, and seed data
└── package.json
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/Wahi-ur-rehman/Pakinternship.git
cd Pakinternship
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate the values (optional for local mock preview):
```env
PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SITE_URL=https://pakistan-internships.pages.dev
ADMIN_SECRET_KEY=pakinternships-secret-2026
```

### 3. Run Acceptance Test Suite
Verify that all 11 Master Build Prompt criteria pass:
```bash
npm run test:audit
```

### 4. Start Local Development Server
```bash
npm run dev
```
Visit `http://localhost:4321` to explore the portal.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 🗄️ Database & Verification Gate Setup

1. Open your Supabase Project dashboard at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Paste the contents of [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql) and execute.
4. The migration establishes:
   * `authors`, `internships`, `settings`, and `audit_logs` tables.
   * `chk_verification_gate`: Check constraint blocking publish without all 4 verifications.
   * `prevent_published_slug_change()`: Trigger guaranteeing URL immutability.
   * `enforce_monthly_publish_cap()`: Trigger enforcing maximum 12 publishes per 30-day window.

---

## 👥 Editorial Leadership & Board

* **Wahi ur Rehman** — *Founder & Chief Career Editor* ([LinkedIn](https://www.linkedin.com/in/wahi-abbasi-563593386) • [GitHub](https://github.com/Wahi-ur-rehman))
* **Ayesha Siddiqui** — *Technical Talent Lead & Campus Recruiter (NUST)*
* **Zainab Farooq** — *Banking, FinTech & Corporate Careers Editor (IBA)*
* **Engr. Muhammad Bilal** — *Industrial Engineering & PEC Traineeship Mentor (UET)*
* **Fatima Zahra** — *Creative, Design & Growth Marketing Editor*

---

## 📜 License

This project is open-source software licensed under the [MIT License](./LICENSE).

Copyright (c) 2026 **Wahi ur Rehman** and PakInternships Contributors.
