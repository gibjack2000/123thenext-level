import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Required for bypassing RLS
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Supabase Admin Client
const supabase = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!);

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY! });
// Note: with @google/genai, we use ai.models.generateContent directly or specify the model in the config


interface Rotation {
  pillar: string;
  market: string;
}

/**
 * Determines the Market and Pillar by cycling through available options
 * based on the current number of posts in the database.
 */
async function getCurrentRotation(): Promise<Rotation> {
  const { count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true });

  const pillars = ['health', 'fitness', 'nutrition', 'wellness'];
  const markets = ['US', 'UK', 'ES'];

  const safeCount = count || 0;

  return {
    pillar: pillars[safeCount % pillars.length],
    market: markets[safeCount % markets.length]
  };
}

/**
 * Main function to generate and post content.
 */
export async function generateAndPostContent() {
  console.log('--- Starting Automation Job ---');
  
  const rotation = await getCurrentRotation();
  console.log(`Targeting Pillar: ${rotation.pillar}, Market: ${rotation.market}`);

  // Helper to map pillar to database category
  const pillarToCategory: Record<string, string[]> = {
    'health': ['Health & Household', 'health_wellness', 'supplements'],
    'fitness': ['Fitness', 'Sports & Outdoors', 'fitness_gear'],
    'nutrition': ['supplements', 'home_kitchen'],
    'wellness': ['health_wellness', 'home_kitchen', 'Tech Gadgets']
  };

  const possibleCategories = pillarToCategory[rotation.pillar] || [rotation.pillar];
  
  // Try to find a product in any of the mapped categories
  let product = null;
  let rpcError = null;

  for (const category of possibleCategories) {
    const { data, error } = await supabase
      .rpc('get_random_amazon_product', { 
        p_market: rotation.market, 
        p_category: category 
      });
    
    if (data && data.length > 0) {
      product = data[0];
      break;
    }
    if (error) rpcError = error;
  }

  if (rpcError || !product) {
    console.error('Error fetching product from RPC:', rpcError?.message || 'No product found.');
    return { success: false, error: 'Product not found for the specified market/pillar rotation.' };
  }

  const productName = product.title || product.product_name; 
  const affiliateLink = product.affiliate_link;

  console.log(`Fetched Product: ${productName}`);

  // 2. Generate Content with Gemini 1.5 Flash
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

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { 
        responseMimeType: "application/json" 
      }
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error('Gemini returned empty response.');
    }
    const aiData = JSON.parse(responseText);

    // 3. Final Database Insert
    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        category: rotation.pillar,
        title: aiData.title,
        slug: aiData.slug,
        author: "123TheNext Level Team",
        content: aiData.content,
        image_url: aiData.image_prompts[0], // Saving the first prompt to image_url as requested
        excerpt: aiData.excerpt,
        tags: aiData.tags,
        featured: false // Draft status for review
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Supabase Insert Error: ${insertError.message}`);
    }

    console.log(`Successfully created post: ${aiData.title} (ID: ${post.id})`);
    return { success: true, postId: post.id, title: aiData.title };

  } catch (err: any) {
    console.error('Generation/DB Error:', err.message);
    return { success: false, error: err.message };
  }
}
