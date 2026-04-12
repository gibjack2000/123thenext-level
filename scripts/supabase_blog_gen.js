import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

// 1. Initialize Clients
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const apiKey = process.env.VITE_GEMINI_API_KEY || 'AIzaSyDu4wqfISnPtU8JNUwGaW2tUUAPtOzsAk0';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });

async function generateAutomatedBlog() {
  console.log("🚀 Starting automated blog generation from Supabase...");

  try {
    // 2. Pick a random active product
    console.log("Fetching active products from 'amazon_affiliate_products'...");
    const { data: products, error: pError } = await supabase
      .from('amazon_affiliate_products')
      .select('*')
      .eq('is_active', true);

    if (pError) throw pError;
    if (!products || products.length === 0) throw new Error("No active products found.");

    const product = products[Math.floor(Math.random() * products.length)];
    console.log(`✅ Selected product: ${product.title} (ASIN: ${product.asin})`);

    // 3. Generate blog content using Gemini
    console.log("Generating blog content with Gemini Flash...");
    const prompt = `
      Write a professional and engaging health blog post about the following product:
      Product Name: ${product.title}
      Description: ${product.description}
      Category: ${product.category}
      
      Requirements:
      1. Length: Approximately 300 words.
      2. Topic: How this specific product improves health and wellness. This is for the "Health" category.
      3. Tone: Informative, premium, and encouraging.
      4. Include a mention of the product naturally with its link: ${product.affiliate_link}
      5. Output format must be ONLY a valid JSON object (no markdown code blocks) with the following keys:
         "title": A catchy headline.
         "excerpt": A short 2-sentence hook.
         "content": The full blog post in Markdown format (use ## and ### for structure).
         "tags": An array of 3-5 relevant keywords.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up if the AI ignores "no markdown code blocks"
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const blogData = JSON.parse(jsonStr);

    console.log("✅ Content generated and parsed.");

    // 4. Prepare Blog Post Object
    const slug = blogData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newBlog = {
      category: 'health',
      title: blogData.title,
      slug: `${slug}-${crypto.randomBytes(2).toString('hex')}`,
      author: '123TheNext Level Team',
      content: blogData.content,
      image_url: product.image_url,
      excerpt: blogData.excerpt,
      tags: blogData.tags,
      featured: false,
      created_at: new Date().toISOString()
    };

    // 5. Insert into Supabase
    console.log("Inserting blog post into Supabase 'blog_posts' table...");
    const { data: inserted, error: iError } = await supabase
      .from('blog_posts')
      .insert([newBlog])
      .select();

    if (iError) throw iError;

    console.log("🎉 SUCCESS! Blog post created in Supabase.");
    console.log(`Title: ${newBlog.title}`);
    console.log(`Slug: ${newBlog.slug}`);

  } catch (err) {
    console.error("❌ Error in automation script:", err);
    process.exit(1);
  }
}

generateAutomatedBlog();
