import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function fixUsLinks() {
  const { data: allProducts } = await supabase.from('products').select('*');
  const usRowsWithUkLinks = allProducts.filter(p => p.market_region === 'US' && p.deal_url?.includes('amazon.co.uk'));
  console.log('US row with UK link:', usRowsWithUkLinks);
  for (const row of usRowsWithUkLinks) {
    const fixedUrl = row.deal_url.replace('amazon.co.uk', 'amazon.com').replace('123znl0f3-21', '123znl0e-20');
    await supabase.from('products').update({ deal_url: fixedUrl }).eq('id', row.id);
    console.log(`Fixed ${row.id} -> ${fixedUrl}`);
  }
}

fixUsLinks();
