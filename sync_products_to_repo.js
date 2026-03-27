import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncProducts() {
  const { data, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*');

  if (error) {
    console.error("Error fetching products:", error);
    process.exit(1);
  }

  // map back to mockData format
  const mockProducts = data.map(p => ({
    id: p.id,
    region: p.market,
    category: p.category,
    product_name: p.title,
    amazon_asin: p.asin,
    amazon_url: p.affiliate_link,
    image_url: p.image_url,
    short_benefit: p.cta || '',
    description: p.description || '',
    price: p.price ? parseFloat(p.price) : null,
    currency: p.market === 'US' ? 'USD' : p.market === 'UK' ? 'GBP' : 'EUR',
    rating: p.rating || 0,
    featured: p.is_active || false,
    tags: [], // Tags aren't stored in DB, fallback to empty array
    last_checked_at: p.last_updated
  }));

  const fileContent = `import { Product } from '../types';\n\nexport const MOCK_PRODUCTS: Product[] = ${JSON.stringify(mockProducts, null, 2)};\n`;
  
  const targetPath = path.join(process.cwd(), 'src', 'data', 'mockData.ts');
  fs.writeFileSync(targetPath, fileContent, 'utf-8');
  console.log('Successfully synced', mockProducts.length, 'products to src/data/mockData.ts');
}

syncProducts();
