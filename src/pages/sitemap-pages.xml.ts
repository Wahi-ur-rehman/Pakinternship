// ==============================================================================
// src/pages/sitemap-pages.xml.ts
// Section 9: Static Pages XML Sitemap (Homepage, Legal, Authors)
// ==============================================================================

import type { APIRoute } from 'astro';
import { getAllAuthors } from '../lib/supabase';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') || 'https://pakistan-internships.pages.dev';
  const authors = await getAllAuthors();

  const staticPages = [
    { loc: '', priority: '1.0', changefreq: 'daily' },
    { loc: 'about', priority: '0.6', changefreq: 'monthly' },
    { loc: 'contact', priority: '0.6', changefreq: 'monthly' },
    { loc: 'privacy-policy', priority: '0.4', changefreq: 'monthly' },
    { loc: 'terms', priority: '0.4', changefreq: 'monthly' },
    { loc: 'disclaimer', priority: '0.4', changefreq: 'monthly' },
  ];

  const authorPages = authors.map((a) => ({
    loc: `authors/${a.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  const allPages = [...staticPages, ...authorPages];

  const urls = allPages
    .map(
      (p) => `
  <url>
    <loc>${baseUrl}/${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
