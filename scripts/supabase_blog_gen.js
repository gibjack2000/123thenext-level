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

// 1b. Parse Arguments
const args = process.argv.slice(2);
const targetBlogCategory = args[0] || 'nutrition'; // default: nutrition
const sourceProductCategory = args[1] || 'supplements'; // default: supplements

async function generateAutomatedBlog() {
  console.log(`🚀 Starting automated blog generation [Source: ${sourceProductCategory} -> Target: ${targetBlogCategory}]...`);

  try {
    // 2. Pick a random product from target source category
    console.log(`Fetching active products with category '${sourceProductCategory}'...`);
    const { data: products, error: pError } = await supabase
      .from('amazon_affiliate_products')
      .select('*')
      .eq('is_active', true)
      .eq('category', sourceProductCategory);

    if (pError) throw pError;
    
    let selectedProduct;
    if (!products || products.length === 0) {
      console.log(`⚠️ No active products in '${sourceProductCategory}' found. Falling back to any active product...`);
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
    console.log(`Generating blog content with Gemini Flash (target: ${targetBlogCategory})...`);
    const prompt = `
      Write a professional and engaging blog post for the "${targetBlogCategory}" pillar of 123TheNextLevel.
      Focus on this product:
      Product Name: ${selectedProduct.title}
      Description: ${selectedProduct.description}
      Product Link: ${selectedProduct.affiliate_link}
      
      Requirements:
      1. Length: Approximately 350 words.
      2. Topic: How ${selectedProduct.title} specifically benefits the user's "${targetBlogCategory}" journey. 
      3. Tone: Authoritative, premium, and science-backed yet accessible.
      4. Structure: 
         - Catchy Heading
         - Opening "Problem & Solution" hook
         - Deep dive into ${selectedProduct.title} benefits
         - Conclusion with a call to action
      5. Branding: Mention "The Next Level" mindset.
      6. Include a naturally integrated Markdown link: [Shop ${selectedProduct.title} on Amazon](${selectedProduct.affiliate_link})
      7. Output format must be ONLY a valid JSON object (no markdown code blocks) with the following keys:
         "title": A catchy, SEO-optimized title for ${targetBlogCategory}.
         "excerpt": A short 2-sentence hook for the article feed.
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
    const slugBase = blogData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newBlog = {
      category: targetBlogCategory,
      title: blogData.title,
      slug: `${slugBase}-${crypto.randomBytes(2).toString('hex')}`,
      author: '123TheNext Level AI',
      content: blogData.content,
      image_url: selectedProduct.image_url,
      image_url_2: `https://images.unsplash.com/photo-${['1512621776951-a57141f2eefd', '1511688858344-1833878fcacc', '1505576399279-565b52d4ac71', '1490818387583-1baba5e638af'][Math.floor(Math.random() * 4)]}?auto=format&fit=crop&q=80&w=800`,
      image_url_3: `https://images.unsplash.com/photo-${['1571019614242-c5c5dee9f50b', '1581009146145-b5ef050c2e1e', '1544367567-0f2fcb009e0b', '1506126613408-eca07ce68773'][Math.floor(Math.random() * 4)]}?auto=format&fit=crop&q=80&w=800`,
      affiliate_url: selectedProduct.affiliate_link,
      excerpt: blogData.excerpt,
      tags: blogData.tags,
      featured: false,
      created_at: new Date().toISOString()
    };

    // 5. Insert into Supabase
    console.log(`Inserting blog post into '${targetBlogCategory}' category...`);
    const { data: inserted, error: iError } = await supabase
      .from('blog_posts')
      .insert([newBlog])
      .select();

    if (iError) throw iError;

    console.log(`🎉 SUCCESS! [${targetBlogCategory}] post created: ${newBlog.slug}`);

  } catch (err) {
    console.error(`❌ Error in ${targetBlogCategory} generation:`, err);
    process.exit(1);
  }
}

generateAutomatedBlog();
