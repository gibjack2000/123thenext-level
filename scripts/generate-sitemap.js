import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const BASE_URL = 'https://123thenextlevel.com';
const TODAY = new Date().toISOString().split('T')[0];

// Fallback list of known published blog posts in case of offline build or network issues
const FALLBACK_PUBLISHED_POSTS = [
  { slug: 'magnesium-l-threonate-brain-barrier-sleep-hrv', created_at: '2026-11-01' },
  { slug: 'the-unsung-heroes-of-mobility-a-guide-to-healthy-toes', created_at: '2026-03-21' },
  { slug: 'you-don-t-need-the-gym-10-effective-home-workouts-that-actually-work', created_at: '2026-04-29' },
  { slug: 'practical-mindfulness', created_at: '2026-03-23' },
  { slug: 'omega-3-index-rbc-epa-dha-cardiovascular', created_at: '2026-11-01' },
  { slug: 'cardiac-drift-aerobic-decoupling-hydration-zones', created_at: '2026-11-01' },
  { slug: 'understanding-your-immune-system', created_at: '2026-03-23' },
  { slug: '5-daily-habits-that-support-vitality', created_at: '2026-03-23' },
  { slug: 'mastering-meal-prep', created_at: '2026-03-23' },
  { slug: 'cgm-non-diabetic-glucose-spikes-longevity', created_at: '2026-11-01' },
  { slug: 'full-body-mri-screening-longevity-incidentalomas-6238', created_at: '2026-11-01' },
  { slug: 'you-ll-never-guess-what-happens-to-your-body-when-you-start-walking-daily', created_at: '2026-04-29' },
  { slug: 'the-science-of-sleep-how-to-build-a-better-bedtime-routine', created_at: '2026-03-23' },
  { slug: 'socio-architecture-bio-networks', created_at: '2026-09-11' },
  { slug: 'womens-health-hormonal-vitality', created_at: '2026-09-11' },
  { slug: 'autonomic-engineering-neuro-regulation', created_at: '2026-09-11' }
];

// Core static routes for 123TheNextLevel
const STATIC_ROUTES = [
  // Root Homepage
  { path: '/', priority: '1.0', changefreq: 'daily', lastmod: TODAY },

  // Primary Clinical & Protocol Gateways
  { path: '/start-here', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/overview', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/clinician-copilot', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/health-quiz', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/library', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/library/body-composition', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/science', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/premium-guides', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/intelligence-hub', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/glossary', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/checkout', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },

  // Sovereign Regional Storefronts & Catalogs
  { path: '/store', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/store-us', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/store-uk', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/store-es', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/hardware-store', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/store/metabolic-master-guide', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },

  // Core Longevity Pillars & Deep-Dives
  { path: '/health', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/health/preventive', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/health/cellular', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/health/cellular/deep-dive', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/health/cellular/epigenetic-tracking', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/health/systemic', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },

  { path: '/fitness', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/fitness/fundamentals', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/fitness/wearables', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/fitness/biosensing', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/fitness/methodology', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/fitness/recovery/cold-immersion', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/fitness/recovery/infrared-sauna', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },

  { path: '/nutrition', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/nutrition/glp1', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/nutrition/muscle-brain', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/nutrition/biomarkers', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },

  { path: '/wellness', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/neurowellness', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/neurowellness/hard-care', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/neurowellness/soft-care', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/neurowellness/metabolism', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/neurowellness/vns', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/neurowellness/breathwork', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },

  { path: '/womens-health', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/womens-health/longevity', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/womens-health/performance', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/womens-health/metabolic', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/womens-health/bone-density', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },

  { path: '/social-fitness', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { path: '/social-fitness/pickleball', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/social-fitness/festivals', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { path: '/social-fitness/recovery', priority: '0.7', changefreq: 'monthly', lastmod: TODAY },

  // Preventative Blood Test Guides & Clinical Requisition Hubs
  { path: '/guides/', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/guides/uk-preventative-blood-tests/', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/guides/us-preventative-blood-tests/', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/guides/us-doctor-blood-tests/', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/guides/es-analisis-sangre-preventivos/', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
  { path: '/guides/spain-preventative-blood-tests/', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },

  // Blog Hub
  { path: '/blog', priority: '0.9', changefreq: 'daily', lastmod: TODAY }
];

async function fetchPublishedBlogPosts() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('[Sitemap Generator] Supabase credentials not found in env, using fallback post list.');
    return FALLBACK_PUBLISHED_POSTS;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, created_at')
      .eq('status', 'published');

    if (error || !data || data.length === 0) {
      console.warn('[Sitemap Generator] Could not query blog_posts from Supabase, using fallback list:', error?.message);
      return FALLBACK_PUBLISHED_POSTS;
    }

    console.log(`[Sitemap Generator] Successfully fetched ${data.length} published blog posts from Supabase.`);
    return data;
  } catch (err) {
    console.warn('[Sitemap Generator] Error querying Supabase, using fallback post list:', err.message);
    return FALLBACK_PUBLISHED_POSTS;
  }
}

function formatDate(isoOrDateString) {
  if (!isoOrDateString) return TODAY;
  try {
    return new Date(isoOrDateString).toISOString().split('T')[0];
  } catch {
    return TODAY;
  }
}

function generateXml(staticRoutes, blogPosts) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Routes
  for (const route of staticRoutes) {
    const url = route.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${route.lastmod || TODAY}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq || 'weekly'}</changefreq>\n`;
    xml += `    <priority>${route.priority || '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Published Blog Posts
  // Track slugs to prevent duplicates
  const seenSlugs = new Set();
  for (const post of blogPosts) {
    if (!post.slug || seenSlugs.has(post.slug)) continue;
    seenSlugs.add(post.slug);

    const postDate = formatDate(post.created_at);
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${postDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

export async function generateSitemap() {
  console.log('[Sitemap Generator] Compiling canonical sitemap.xml for https://123thenextlevel.com ...');
  
  const blogPosts = await fetchPublishedBlogPosts();
  const xmlContent = generateXml(STATIC_ROUTES, blogPosts);

  // Target paths:
  // 1. public/sitemap.xml (source directory for dev and Vite)
  const publicPath = path.resolve(projectRoot, 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, xmlContent, 'utf8');
  console.log(`[Sitemap Generator] Written to ${publicPath}`);

  // 2. dist/sitemap.xml (production build folder)
  const distDir = path.resolve(projectRoot, 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.resolve(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xmlContent, 'utf8');
    console.log(`[Sitemap Generator] Written to ${distPath}`);
  }

  // 3. public_html/sitemap.xml (if hosted in adjacent public_html)
  const publicHtmlDir = path.resolve(projectRoot, '..', 'public_html');
  if (fs.existsSync(publicHtmlDir)) {
    const publicHtmlPath = path.resolve(publicHtmlDir, 'sitemap.xml');
    fs.writeFileSync(publicHtmlPath, xmlContent, 'utf8');
    console.log(`[Sitemap Generator] Written to ${publicHtmlPath}`);
  }

  console.log(`[Sitemap Generator] Done! Generated valid sitemap with ${STATIC_ROUTES.length + blogPosts.length} entries.`);
  return xmlContent;
}

// Auto-run if executed directly
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generateSitemap().catch(err => {
    console.error('[Sitemap Generator] Fatal error:', err);
    process.exit(1);
  });
}
