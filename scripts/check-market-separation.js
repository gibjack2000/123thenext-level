import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkMarketSeparation() {
  const { data: allProducts, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error:', error);
    return;
  }

  const byRegionAndCategory = {};

  for (const p of allProducts) {
    const key = `${p.market_region || 'UNKNOWN'}_${p.category || 'UNKNOWN'}`;
    byRegionAndCategory[key] = (byRegionAndCategory[key] || 0) + 1;
  }

  console.log('=== Products by Region and Category in public.products ===');
  console.log(byRegionAndCategory);

  console.log('\n--- Checking for any UK links in US or ES rows ---');
  const usRowsWithUkLinks = allProducts.filter(p => p.market_region === 'US' && p.deal_url?.includes('amazon.co.uk'));
  console.log(`US rows with amazon.co.uk links: ${usRowsWithUkLinks.length}`);

  const esRowsWithUkLinks = allProducts.filter(p => p.market_region === 'ES' && p.deal_url?.includes('amazon.co.uk'));
  console.log(`ES rows with amazon.co.uk links: ${esRowsWithUkLinks.length}`);

  const ukRowsWithUsLinks = allProducts.filter(p => p.market_region === 'UK' && p.deal_url?.includes('amazon.com'));
  console.log(`UK rows with amazon.com links (non-direct): ${ukRowsWithUsLinks.filter(p => !p.is_direct_affiliate).length}`);
}

checkMarketSeparation();
