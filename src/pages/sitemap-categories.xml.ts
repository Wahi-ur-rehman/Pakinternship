// ==============================================================================
// src/pages/sitemap-categories.xml.ts
// Section 9: Categories XML Sitemap (Only categories with >= 3 listings)
// Excludes thin categories under minimum content threshold
// ==============================================================================

import type { APIRoute } from 'astro';
import { getPublishedListings } from '../lib/supabase';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') || 'https://pakistan-internships.pages.dev';
  const published = await getPublishedListings();

  const categories = ['engineering', 'computer-science', 'information-technology'];
  
  // Section 9 & 10 Rule: Category must have at least 3 published listings to be indexed!
  const validCategories = categories.filter((cat) => {
    const count = published.filter((l) => l.category === cat).length;
    return count >= 3;
  });

  const urls = validCategories
    .map((cat) => `
  <url>
    <loc>${baseUrl}/${cat}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`)
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
