import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const rotation = { pillar: 'health', market: 'US' };

const pillarToCategory = {
  'health': ['Health & Household', 'health_wellness', 'supplements'],
  'fitness': ['Fitness', 'Sports & Outdoors', 'fitness_gear'],
  'nutrition': ['supplements', 'home_kitchen'],
  'wellness': ['health_wellness', 'home_kitchen', 'Tech Gadgets']
};

async function run() {
  console.log('=== E2E Test: Full Pipeline ===\n');
  console.log(`Rotation: ${rotation.pillar} / ${rotation.market}\n`);

  // 1. Fetch product
  console.log('Step 1: Fetching product from Supabase RPC...');
  let product = null;
  const cats = pillarToCategory[rotation.pillar];
  for (const cat of cats) {
    const { data } = await supabase.rpc('get_random_amazon_product', { p_market: rotation.market, p_category: cat });
    if (data && data.length > 0) { product = data[0]; break; }
  }
  if (!product) { console.error('No product found!'); return; }
  const productName = product.title || product.product_name;
  const affiliateLink = product.affiliate_link;
  console.log(`  ✅ Product: ${productName}\n`);

  // 2. Generate content with Gemini
  console.log('Step 2: Generating content with Gemini 2.5 Flash...');
  const prompt = `
    Write a 600-word high-quality SEO blog post for 123thenextlevel.com.
    The topic is related to ${rotation.pillar} and premium lifestyle.
    
    Article Requirements:
    - Tone: Informative, premium, and professional.
    - Format: Markdown text.
    - Naturally mention the product "${productName}" in the content.
    - In the 2nd paragraph, when you mention the product "${productName}", format it as a bolded markdown link using this affiliate link: ${affiliateLink}. Example: [**${productName}**](${affiliateLink})
    - Ensure the link is attached directly to the product name. Do NOT include a separate "Check Price on Amazon" link.
    - The content should be engaging and offer real value to readers.
    
    Also, generate the following metadata:
    - title: A catchy, SEO-friendly headline.
    - slug: A URL-safe version of the title (e.g., how-to-improve-fitness).
    - excerpt: A compelling 160-character summary for social/meta tags.
    - tags: An array of 3 relevant keywords.
    - image_prompts: A list of 3 cinematic AI image prompts matching the article theme and a "premium dark-themed" aesthetic.

    Return the result EXCLUSIVELY as a JSON object with this structure:
    {
      "title": "...",
      "slug": "...",
      "content": "...",
      "excerpt": "...",
      "tags": ["tag1", "tag2", "tag3"],
      "image_prompts": ["prompt1", "prompt2", "prompt3"]
    }
  `;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { responseMimeType: "application/json" }
  });

  const responseText = result.text;
  if (!responseText) { console.error('Empty Gemini response!'); return; }
  const aiData = JSON.parse(responseText);
  console.log(`  ✅ Generated: "${aiData.title}"`);
  console.log(`  Slug: ${aiData.slug}`);
  console.log(`  Tags: ${aiData.tags.join(', ')}`);
  console.log(`  Excerpt: ${aiData.excerpt}\n`);

  // 3. Insert into database
  console.log('Step 3: Inserting into blog_posts table...');
  const { data: post, error: insertError } = await supabase
    .from('blog_posts')
    .insert({
      category: rotation.pillar,
      title: aiData.title,
      slug: aiData.slug,
      author: "123TheNext Level Team",
      content: aiData.content,
      image_url: aiData.image_prompts[0],
      excerpt: aiData.excerpt,
      tags: aiData.tags,
      featured: false
    })
    .select()
    .single();

  if (insertError) {
    console.error(`  ❌ Insert failed: ${insertError.message}`);
    return;
  }

  console.log(`  ✅ Post inserted! ID: ${post.id}`);
  console.log('\n=== E2E Test PASSED ===');
}

run().catch(e => console.error('Fatal error:', e.message));
