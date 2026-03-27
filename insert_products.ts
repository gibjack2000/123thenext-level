import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { MOCK_PRODUCTS } from './src/data/mockData';

dotenv.config();

const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDA2Mjg4MiwiZXhwIjoyMDg5NjM4ODgyfQ.FJeB0CuCAM968bN7aSpSyRyN3aguZ_IGsNxHru6t2qM";
const supabaseUrl = process.env.VITE_SUPABASE_URL;

if (!supabaseUrl) {
  console.error("Missing VITE_SUPABASE_URL in .env");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function importProducts() {
  console.log('Starting affiliate products import...');
  
  for (const product of MOCK_PRODUCTS) {
    const insertData = {
      market: product.region,
      asin: product.amazon_asin,
      title: product.product_name,
      image_url: product.image_url,
      price: product.price ? `${product.price}` : null,
      category: product.category,
      rating: product.rating,
      description: product.description,
      affiliate_link: product.amazon_url,
      is_active: product.featured,
      last_updated: product.last_checked_at,
      cta: product.short_benefit || 'Buy Now',
      "Amazon tag": "123thenextlevel-20"
    };

    const { data, error } = await supabase
      .from('amazon_affiliate_products')
      .insert(insertData)
      .select();

    if (error) {
      console.error('Error inserting product:', product.product_name, error);
    } else {
      console.log('Successfully inserted:', product.product_name, `[${product.region}]`);
    }
  }
}

importProducts()
  .then(() => setTimeout(() => process.exit(0), 1000));

