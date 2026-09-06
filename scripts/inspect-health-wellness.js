import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function inspectHealthWellness() {
  console.log('=== Checking amazon_affiliate_products for health_wellness ===');
  const { data: dbData, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .ilike('category', '%health%');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Found ' + dbData.length + ' health_wellness products in amazon_affiliate_products:');
    const byMarket = {};
    for (const item of dbData) {
      byMarket[item.market] = (byMarket[item.market] || 0) + 1;
    }
    console.log('By market:', byMarket);
    dbData.forEach((p, idx) => {
      console.log((idx + 1) + '. [' + p.market + '] [' + p.asin + '] ' + (p.title || p.product_name) + ' | Price: ' + p.price);
    });
  }

  // Also check for 'wellness' or similar categories
  const { data: wellnessData } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .ilike('category', '%wellness%');

  console.log('Found ' + (wellnessData?.length || 0) + ' wellness products in amazon_affiliate_products.');
}

inspectHealthWellness();
