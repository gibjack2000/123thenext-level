import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);

// Initialize Google Sheets Auth
let sheetDoc = null;
async function getSheetDoc() {
  if (sheetDoc) return sheetDoc;
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets credentials are not fully configured in environment variables.');
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  sheetDoc = doc; // Only cache if loadInfo succeeds
  return sheetDoc;
}

export async function processCategoryJob(category) {
  let logId = null;
  try {
    console.log(`Starting job for category: ${category}`);
    
    // Log start to DB
    await supabase.from('publish_jobs').update({ status: 'running', last_run_at: new Date() }).eq('category', category);
    
    const doc = await getSheetDoc();
    const sheet = doc.sheetsByIndex[0]; // Assuming first sheet
    await sheet.loadHeaderRow();
    
    const rows = await sheet.getRows();
    
    // Find first queued row for this category
    const targetRow = rows.find(row => 
      row.get('category').toLowerCase() === category.toLowerCase() && 
      row.get('status') === 'queued'
    );

    if (!targetRow) {
      console.log(`No queued rows found for ${category}.`);
      await supabase.from('publish_jobs').update({ status: 'idle' }).eq('category', category);
      return { success: true, message: 'No queued rows.' };
    }

    const title = targetRow.get('title');
    const keywords = targetRow.get('keywords');
    const tone = targetRow.get('tone') || 'informative';
    const audience = targetRow.get('audience') || 'general';
    const cta = targetRow.get('cta');

    console.log(`Generating content for: ${title}`);
    
    // Generate AI Content
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const prompt = `
      Act as an expert health and longevity writer for the ${category} niche.
      Write a highly engaging, well-structured, production-ready blog post in clear, simple layman terms.
      Title: ${title}
      Keywords to include: ${keywords}
      Tone: ${tone} (warm, encouraging, friendly, and easy to understand)
      Audience: ${audience} (general public, everyday readers seeking practical longevity guidance)
      Call to action at the end: ${cta}
      
      Requirements:
      - Start with a compelling, relatable introduction using everyday analogies.
      - Use simple, accessible vocabulary throughout. Avoid dense medical-school jargon; explain complex health concepts in plain English so any reader can easily understand and act on them.
      - Use proper HTML headings (<h2>, <h3>).
      - Include bullet points and easy action steps where relevant.
      - Output ONLY HTML content, without markdown wrappers like \`\`\`html.
      - Ensure the final output is clean HTML ready for a CMS.
    `;
    
    const result = await model.generateContent(prompt);
    let htmlContent = result.response.text();
    htmlContent = htmlContent.replace(/^```html\s*|\s*```$/g, '');

    // Get 2 images for the category
    const { data: images } = await supabase
      .from('media_library')
      .select('id')
      .eq('category', category)
      .limit(2);
      
    // Get 2 affiliates for the category
    const { data: affiliates } = await supabase
      .from('affiliate_products')
      .select('id')
      .eq('category', category)
      .limit(2);

    const image_1_id = targetRow.get('image_1_id') || (images && images[0] ? images[0].id : null);
    const image_2_id = targetRow.get('image_2_id') || (images && images[1] ? images[1].id : null);
    const affiliate_1_id = targetRow.get('affiliate_1_id') || (affiliates && affiliates[0] ? affiliates[0].id : null);
    const affiliate_2_id = targetRow.get('affiliate_2_id') || (affiliates && affiliates[1] ? affiliates[1].id : null);

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const postUrl = `/blog/${slug}`;
    const excerptMatch = htmlContent.replace(/<[^>]+>/g, '').substring(0, 160);
    const excerpt = excerptMatch.length === 160 ? excerptMatch + '...' : excerptMatch;

    // Default dark-mode category banners (#111827 & #10b981)
    const CATEGORY_DEFAULT_BANNERS = {
      health: '/assets/images/blog/healthspan_longevity_cover.png',
      fitness: '/assets/images/blog/performance_biodata_cover.png',
      nutrition: '/assets/images/blog/metabolic_nutrition_cover.png',
      wellness: '/assets/images/blog/autonomic_engineering_cover.png'
    };
    const defaultCover = CATEGORY_DEFAULT_BANNERS[category.toLowerCase()] || CATEGORY_DEFAULT_BANNERS.health;
    const finalImageUrl = targetRow.get('image_url') || defaultCover;
    const infographicUrl = targetRow.get('infographic_banner_url') || '';
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

    // Save to Supabase
    const { data: postInsert, error: dbError } = await supabase
      .from('blog_posts')
      .insert({
        category: category.toLowerCase(),
        title,
        slug,
        author: 'AI Blog Automation',
        content: finalContent,
        excerpt,
        image_url: finalImageUrl,
        image_url_2: image_2_id,
        image_url_3: null, // Placeholder for 3rd image if needed
        affiliate_product_1: affiliate_1_id,
        affiliate_product_2: affiliate_2_id,
        tags: keywords ? keywords.split(',').map(t => t.trim()) : [],
        featured: false,
        status: 'draft'
      })
      .select('id')
      .single();

    if (dbError) {
      if (dbError.code === '23505') {
        throw new Error('A blog post with this slug already exists.');
      }
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Update Spreadsheet
    targetRow.assign({
      status: 'published',
      published_at: new Date().toISOString(),
      post_url: postUrl,
      error_message: ''
    });
    await targetRow.save();

    // Log success
    await supabase.from('publish_logs').insert({
      category,
      status: 'success',
      message: `Successfully generated draft: ${title}`
    });

    await supabase.from('publish_jobs').update({ status: 'idle' }).eq('category', category);
    
    console.log(`Success: Published ${title}`);
    return { success: true, postUrl };

  } catch (error) {
    console.error(`Error processing ${category}:`, error.message);
    
    // Log error to DB
    await supabase.from('publish_logs').insert({
      category,
      status: 'error',
      message: error.message
    });

    await supabase.from('publish_jobs').update({ status: 'idle' }).eq('category', category);
    
    // Update spreadsheet to reflect error if possible
    try {
        const doc = await getSheetDoc();
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow();
        const rows = await sheet.getRows();
        const targetRow = rows.find(row => 
          row.get('category').toLowerCase() === category.toLowerCase() && 
          row.get('status') === 'queued'
        );
        if (targetRow) {
            targetRow.assign({
                status: 'error',
                error_message: error.message
            });
            await targetRow.save();
        }
    } catch (e) {
        console.error('Secondary error updating sheet state:', e);
    }
    
    return { success: false, error: error.message };
  }
}

export async function getQueue() {
  try {
    const doc = await getSheetDoc();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();
    
    const queue = {
      Health: null,
      Fitness: null,
      Nutrition: null,
      Wellness: null
    };

    // Find the first queued row for each category
    for (const category of Object.keys(queue)) {
      const targetRow = rows.find(row => 
        row.get('category').toLowerCase() === category.toLowerCase() && 
        row.get('status') === 'queued'
      );
      if (targetRow) {
        queue[category] = targetRow.get('title');
      }
    }
    
    return queue;
  } catch (error) {
    console.error('Error fetching queue:', error);
    return { error: error.message };
  }
}

