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

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function generateAutomatedBlog() {
  console.log("🚀 Starting automated blog generation from Supabase...");

  try {
    // 2. Pick a random supplement product
    console.log("Fetching active products from 'amazon_affiliate_products' with category 'supplements'...");
    const { data: products, error: pError } = await supabase
      .from('amazon_affiliate_products')
      .select('*')
      .eq('is_active', true)
      .eq('category', 'supplements'); // Specifically target supplements

    if (pError) throw pError;
    
    let selectedProduct;
    if (!products || products.length === 0) {
      console.log("⚠️ No active supplements found. Falling back to any active product...");
      const { data: allProducts, error: allPError } = await supabase
        .from('amazon_affiliate_products')
        .select('*')
        .eq('is_active', true);
      
      if (allPError) throw allPError;
      if (!allProducts || allProducts.length === 0) throw new Error("No active products found.");
      selectedProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
    } else {
      selectedProduct = products[Math.floor(Math.random() * products.length)];
    }

    console.log(`✅ Selected product: ${selectedProduct.title} (ASIN: ${selectedProduct.asin})`);

    // 3. Generate blog content using Gemini
    console.log("Generating blog content with Gemini Flash (target: Nutrition)...");
    const prompt = `
      Write a professional and engaging nutrition blog post about the following supplement/product:
      Product Name: ${selectedProduct.title}
      Description: ${selectedProduct.description}
      Product Link: ${selectedProduct.affiliate_link}
      
      Requirements:
      1. Length: Approximately 300 words.
      2. Topic: How this specific supplement supports optimal nutrition and health. This is for the "Nutrition" category.
      3. Tone: Informative, authoritative, and encourages interaction.
      4. Strategy: Begin with a compelling hook about nutrition, then introduce the ${selectedProduct.title} as a key tool/supplement, and conclude with the importance of balanced nutrition.
      5. Include a naturally integrated Markdown link to the product: [Check Price on Amazon](${selectedProduct.affiliate_link})
      6. Output format must be ONLY a valid JSON object (no markdown code blocks) with the following keys:
         "title": A catchy, SEO-optimized nutrition headline.
         "excerpt": A short 2-sentence hook for the feed.
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
      category: 'nutrition', // Fixed category as requested
      title: blogData.title,
      slug: `${slug}-${crypto.randomBytes(2).toString('hex')}`,
      author: '123TheNext Level AI',
      content: blogData.content,
      image_url: selectedProduct.image_url,
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
