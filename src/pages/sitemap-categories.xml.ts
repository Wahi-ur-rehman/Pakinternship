// ==============================================================================
// src/pages/sitemap-categories.xml.ts
// Categories XML Sitemap across all active hiring tracks in Pakistan
// Only includes categories meeting the 3+ listing threshold (Section 9 & 10)
// ==============================================================================

import type { APIRoute } from 'astro';
import { getPublishedListings, getAllCategories } from '../lib/supabase';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') || 'https://pakistan-internships.pages.dev';
  const published = await getPublishedListings();
  const allCategories = getAllCategories();

  // Filter categories with at least 3 verified published listings
  const validCategories = allCategories.filter((cat) => {
    const count = published.filter((l) => l.category === cat.slug).length;
    return count >= 3;
  });

  const urls = validCategories
    .map(
      (cat) => `
  <url>
    <loc>${baseUrl}/${cat.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
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
