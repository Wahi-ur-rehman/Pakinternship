// ==============================================================================
// src/pages/sitemap-posts.xml.ts
// Section 9: Posts XML Sitemap (Published and Closed postings)
// Excludes archived posts (which 301 redirect to categories)
// ==============================================================================

import type { APIRoute } from 'astro';
import { getOpenAndClosedListings } from '../lib/supabase';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') || 'https://pakistan-internships.pages.dev';
  const listings = await getOpenAndClosedListings();

  const urls = listings
    .filter((l) => l.status === 'published' || l.status === 'closed')
    .map((l) => {
      const lastmod = l.updated_at || l.published_at || l.source_checked_on;
      const priority = l.status === 'published' ? (l.featured ? '0.9' : '0.8') : '0.5';
      const changefreq = l.status === 'published' ? 'daily' : 'monthly';
      return `
  <url>
    <loc>${baseUrl}/${l.category}/${l.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
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
