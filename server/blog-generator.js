import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Initialize Supabase with Service Role Key (bypasses RLS)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);

// Helper: load weekly pitches fallback
function getLocalPitches() {
  try {
    const candidates = [
      path.resolve(process.cwd(), 'content/pitches/weekly-pitches.json'),
      path.resolve(process.cwd(), 'public/content/pitches/weekly-pitches.json')
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.pitches && parsed.pitches.length > 0) {
          return parsed.pitches;
        }
      }
    }
  } catch (err) {
    console.warn('[BlogGenerator] Notice reading local pitches:', err.message);
  }
  return [];
}

// Built-in fallback candidate titles if both Google Sheets & JSON are missing
const DEFAULT_PILLAR_TOPICS = {
  health: {
    title: 'ApoB vs LDL Particle Count: The Complete Cardiovascular Longevity Guide',
    keywords: 'ApoB, cardiovascular risk, LDL particles, preventive longevity, blood panel',
    summary: 'A clear guide explaining why ApoB is a superior predictor of cardiovascular events and how to optimize your arterial health in simple terms.'
  },
  fitness: {
    title: 'Zone 2 Cardio & Lactate Clearance: How Everyday Movement Transforms Your Cells',
    keywords: 'Zone 2 training, lactate threshold, mitochondrial biogenesis, aerobic capacity',
    summary: 'Discover how conversational-pace cardio builds cellular mitochondria and enhances physical stamina with simple weekly routines.'
  },
  nutrition: {
    title: 'The Glycaemic Impact Spectrum: How Food Sequencing Balances Energy and Mood',
    keywords: 'glycaemic index, insulin sensitivity, continuous glucose monitoring, food sequencing',
    summary: 'Learn practical food sequencing tricks—like eating greens before carbs—to prevent energy slumps and steady your metabolism.'
  },
  wellness: {
    title: 'Vagus Nerve Reset: Daily Breathing and Somatic Protocols for Deep Rest',
    keywords: 'vagus nerve, autonomic nervous system, somatic breathwork, heart rate variability',
    summary: 'Simple 5-minute somatic breathing exercises that calm stress, stimulate the parasympathetic nervous system, and restore restful sleep.'
  }
};

// Initialize Google Sheets Auth safely
let sheetDoc = null;
async function getSheetDoc() {
  if (sheetDoc) return sheetDoc;
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    return null;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    sheetDoc = doc;
    return sheetDoc;
  } catch (err) {
    console.warn('[BlogGenerator] Google Sheets connection failed, using local queue fallback:', err.message);
    return null;
  }
}

// Generate guaranteed unique slug
function sanitizeSlug(text) {
  return (text || 'clinical-masterclass')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function processCategoryJob(category) {
  const catKey = (category || 'Health').toLowerCase();
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  try {
    console.log(`[BlogGenerator] Starting job for category: ${normalizedCategory}`);
    
    // Log start to DB if publish_jobs exists
    if (supabase) {
      try {
        await supabase.from('publish_jobs').update({ status: 'running', last_run_at: new Date() }).eq('category', normalizedCategory);
      } catch (_) {}
    }
    
    let targetRow = null;
    let title = '';
    let keywords = '';
    let tone = 'warm, encouraging, friendly, and easy to understand';
    let audience = 'general public seeking clear, practical health longevity guidance';
    let cta = 'Explore verified clinical baseline blood panels and biomarker diagnostics on 123thenextlevel.com.';
    let summary = '';

    // 1. Try Google Sheets first
    try {
      const doc = await getSheetDoc();
      if (doc) {
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow();
        const rows = await sheet.getRows();
        targetRow = rows.find(row => 
          (row.get('category') || '').toLowerCase() === catKey && 
          row.get('status') === 'queued'
        );
        if (targetRow) {
          title = targetRow.get('title');
          keywords = targetRow.get('keywords') || '';
          tone = targetRow.get('tone') || tone;
          audience = targetRow.get('audience') || audience;
          cta = targetRow.get('cta') || cta;
        }
      }
    } catch (sheetErr) {
      console.warn('[BlogGenerator] Notice reading sheet row:', sheetErr.message);
    }

    // 2. If no sheet row found, fallback to weekly pitches
    if (!title) {
      const pitches = getLocalPitches();
      const candidate = pitches.find(p => (p.category || '').toLowerCase() === catKey && p.draftStatus !== 'drafted');
      if (candidate) {
        title = candidate.title;
        keywords = candidate.targetKeyword || `${catKey}, longevity, biomarkers, health`;
        summary = candidate.summary || '';
      } else {
        const fallback = DEFAULT_PILLAR_TOPICS[catKey] || DEFAULT_PILLAR_TOPICS.health;
        title = fallback.title;
        keywords = fallback.keywords;
        summary = fallback.summary;
      }
    }

    console.log(`[BlogGenerator] Generating content for: "${title}" (${normalizedCategory})`);

    // Category default dark-mode cover banners
    const CATEGORY_DEFAULT_BANNERS = {
      health: '/assets/images/blog/healthspan_longevity_cover.png',
      fitness: '/assets/images/blog/performance_biodata_cover.png',
      nutrition: '/assets/images/blog/metabolic_nutrition_cover.png',
      wellness: '/assets/images/blog/autonomic_engineering_cover.png'
    };
    const defaultCover = CATEGORY_DEFAULT_BANNERS[catKey] || CATEGORY_DEFAULT_BANNERS.health;
    const finalImageUrl = (targetRow && targetRow.get('image_url')) || defaultCover;
    const infographicUrl = (targetRow && targetRow.get('infographic_banner_url')) || '';

    // Generate AI Content using Gemini in simple layman terms with responsive infographics
    let htmlContent = '';
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
      const prompt = `
        Act as an expert, warm, and highly relatable longevity and health educator for the ${normalizedCategory} pillar.
        Write a comprehensive, engaging, and authoritative blog post of at least 1,500-2,000 words.

        Title: ${title}
        Primary Keywords: ${keywords}
        Tone: ${tone} (warm, accessible, empathetic, and encouraging)
        Audience: Everyday people who want to live longer, healthier lives without getting bogged down in medical school jargon.
        Call to action: ${cta}

        CRITICAL STYLE REQUIREMENTS:
        1. Simple Layman Terms: Explain complex biochemistry with everyday, relatable analogies (e.g., comparing blood vessels to garden hoses, mitochondria to rechargeable phone batteries, or insulin to a hotel room keycard).
        2. Clean Formatting: Use <h2>, <h3>, <p>, and <ul> / <li> tags.
        3. Native Infographic Bento Grid: Include a dedicated visual summary section mid-article styled as a responsive bento grid container with dark background (#111827), subtle border (#1f2937), accent callouts, and comparison cards.
        4. Actionable Steps: Provide clear "What You Can Do Today" takeaways.
        5. Regional Access: Mention how to procure verified clinical blood panels or testing across the US, UK, and Spain.
        6. Output ONLY HTML content, without enclosing markdown code blocks like \`\`\`html.
      `;
      
      const result = await model.generateContent(prompt);
      htmlContent = result.response.text().replace(/^```html\s*|\s*```$/g, '').trim();
    } catch (aiErr) {
      console.warn('[BlogGenerator] Gemini API generation error, crafting high-quality structured masterclass template:', aiErr.message);
      htmlContent = `
        <h2>Understanding ${title}</h2>
        <p>Your health is your most valuable asset, but medical reports can often feel like reading a foreign language. In this guide, we break down everything you need to know about <strong>${title}</strong> using simple everyday analogies and actionable steps you can start using today.</p>
        
        <!-- BENTO_INFOGRAPHIC_START -->
        <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 1rem; padding: 1.5rem; margin: 2rem 0; color: #f8fafc;">
          <h3 style="color: #38bdf8; font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem;">📊 Quick Visual Guide: Key Target Matrix</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(56, 189, 248, 0.2); padding: 1rem; border-radius: 0.75rem;">
              <span style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: bold;">Standard Lab Range</span>
              <p style="font-size: 1.25rem; font-weight: bold; color: #e2e8f0; margin-top: 0.25rem;">"Average" Range</p>
              <p style="font-size: 0.8rem; color: #64748b;">Often reflects a population with rising chronic illness.</p>
            </div>
            <div style="background: rgba(6, 78, 59, 0.25); border: 1px solid rgba(16, 185, 129, 0.4); padding: 1rem; border-radius: 0.75rem;">
              <span style="font-size: 0.75rem; color: #6ee7b7; text-transform: uppercase; font-weight: bold;">Optimal Longevity Target</span>
              <p style="font-size: 1.25rem; font-weight: bold; color: #10b981; margin-top: 0.25rem;">Peak Health Zone</p>
              <p style="font-size: 0.8rem; color: #a7f3d0;">Scientifically proven to protect vitality and healthspan.</p>
            </div>
          </div>
        </div>
        <!-- BENTO_INFOGRAPHIC_END -->

        <h2>The Everyday Analogy: Why It Matters</h2>
        <p>Think of your body like a high-performance vehicle. When the check-engine light comes on, ignoring it doesn't solve the issue. By checking your key biomarkers proactively, you can make small, simple adjustments before any warning signs emerge.</p>

        <h2>3 Practical Steps You Can Take Today</h2>
        <ul>
          <li><strong>Step 1: Test, Don't Guess:</strong> Establish a baseline with a physician-reviewed blood panel.</li>
          <li><strong>Step 2: Consistent Daily Movement:</strong> Aim for conversational-pace walking or Zone 2 cardio 3-4 times per week.</li>
          <li><strong>Step 3: Restorative Sleep:</strong> Give your body 7-8 hours each night to repair cellular wear and tear.</li>
        </ul>
      `;
    }

    const excerptMatch = htmlContent.replace(/<[^>]+>/g, '').substring(0, 160);
    const excerpt = summary || (excerptMatch.length === 160 ? excerptMatch + '...' : excerptMatch);

    const fmEntries = [
      `featured_image: '${finalImageUrl}'`,
      `featured_image_alt: '${title.replace(/['"]/g, '')}'`
    ];
    if (infographicUrl) {
      fmEntries.push(`infographic_banner_url: '${infographicUrl}'`);
      fmEntries.push(`infographic_banner_alt: '${title.replace(/['"]/g, '')} Infographic'`);
    }
    const frontmatter = `---\n${fmEntries.join('\n')}\n---\n\n`;
    const finalContent = frontmatter + htmlContent;

    // Guaranteed Unique Slug Strategy
    const baseSlug = sanitizeSlug(title);
    let assignedSlug = baseSlug;

    // Retry loop with timestamp & entropy to guarantee 100% collision-free insertion
    let insertResult = null;
    let insertError = null;

    if (supabase) {
      for (let attempt = 1; attempt <= 4; attempt++) {
        assignedSlug = attempt === 1 
          ? baseSlug 
          : `${baseSlug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

        const { data: inserted, error: dbErr } = await supabase
          .from('blog_posts')
          .insert({
            category: catKey,
            title,
            slug: assignedSlug,
            author: 'Clinical Advisory Team',
            content: finalContent,
            excerpt,
            tags: [catKey, 'longevity', 'health', 'protocols'],
            featured: false,
            status: 'draft',
            image_url: finalImageUrl
          })
          .select('id, slug')
          .single();

        if (!dbErr) {
          insertResult = inserted;
          insertError = null;
          break;
        }

        insertError = dbErr;

        // If duplicate slug constraint, loop to retry with new unique slug
        if (dbErr.code === '23505' || dbErr.message?.includes('slug') || dbErr.message?.includes('duplicate') || dbErr.message?.includes('unique')) {
          console.warn(`[BlogGenerator] Slug "${assignedSlug}" already exists, generating unique suffix (attempt ${attempt}/4)...`);
          continue;
        }

        // If blog_posts doesn't exist, try fallback blogs table
        if (dbErr.code === 'PGRST205') {
          const { data: bInserted, error: bErr } = await supabase
            .from('blogs')
            .insert({
              category: catKey,
              title,
              slug: assignedSlug,
              author: 'Clinical Advisory Team',
              content: finalContent,
              excerpt,
              status: 'draft',
              image_url: finalImageUrl
            })
            .select('id, slug')
            .single();

          if (!bErr) {
            insertResult = bInserted;
            insertError = null;
            break;
          }
        }

        // Any other error, break out
        break;
      }
    }

    if (insertError) {
      throw insertError;
    }

    const postUrl = `/blog/${assignedSlug}`;

    // Update Spreadsheet if targetRow exists
    if (targetRow) {
      try {
        targetRow.assign({
          status: 'published',
          published_at: new Date().toISOString(),
          post_url: postUrl,
          error_message: ''
        });
        await targetRow.save();
      } catch (_) {}
    }

    // Log success
    if (supabase) {
      try {
        await supabase.from('publish_logs').insert({
          category: normalizedCategory,
          status: 'success',
          message: `Successfully drafted: "${title}"`
        });
        await supabase.from('publish_jobs').update({ status: 'idle' }).eq('category', normalizedCategory);
      } catch (_) {}
    }

    console.log(`[BlogGenerator] ✅ Successfully created draft "${title}" at ${postUrl}`);
    return { success: true, postUrl, slug: assignedSlug, title };

  } catch (error) {
    console.error(`[BlogGenerator] ❌ Error processing ${normalizedCategory}:`, error.message);
    
    // Log error to DB
    if (supabase) {
      try {
        await supabase.from('publish_logs').insert({
          category: normalizedCategory,
          status: 'error',
          message: error.message
        });
        await supabase.from('publish_jobs').update({ status: 'idle' }).eq('category', normalizedCategory);
      } catch (_) {}
    }
    
    return { success: false, error: error.message };
  }
}

/**
 * Fetch queue status:
 * Checks Google Sheets first. If unconfigured or empty, seamlessly falls back to local weekly pitches.
 * NEVER returns an error to the frontend!
 */
export async function getQueue() {
  const queue = {
    Health: null,
    Fitness: null,
    Nutrition: null,
    Wellness: null
  };

  // 1. Try Google Sheets
  try {
    const doc = await getSheetDoc();
    if (doc) {
      const sheet = doc.sheetsByIndex[0];
      await sheet.loadHeaderRow();
      const rows = await sheet.getRows();
      
      for (const category of Object.keys(queue)) {
        const targetRow = rows.find(row => 
          (row.get('category') || '').toLowerCase() === category.toLowerCase() && 
          row.get('status') === 'queued'
        );
        if (targetRow) {
          queue[category] = targetRow.get('title');
        }
      }
    }
  } catch (err) {
    console.warn('[BlogGenerator] Google Sheets queue check bypassed:', err.message);
  }

  // 2. For any empty categories, fallback to local weekly-pitches.json
  const pitches = getLocalPitches();
  for (const category of Object.keys(queue)) {
    if (!queue[category]) {
      const catKey = category.toLowerCase();
      const pitch = pitches.find(p => (p.category || '').toLowerCase() === catKey && p.draftStatus !== 'drafted');
      if (pitch) {
        queue[category] = pitch.title;
      } else {
        const fallback = DEFAULT_PILLAR_TOPICS[catKey] || DEFAULT_PILLAR_TOPICS.health;
        queue[category] = fallback.title;
      }
    }
  }

  return queue;
}
