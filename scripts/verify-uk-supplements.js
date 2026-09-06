import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, anonKey);

async function verifyUkSupplements() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('market_region', 'UK');

  if (error) {
    console.error('Error:', error);
    return;
  }

  const supps = data.filter(p => p.category?.toLowerCase() === 'supplements');
  console.log(`✅ Fetched ${data.length} total UK products.`);
  console.log(`✅ UK Supplements count: ${supps.length}`);
  console.log('\nSample 5 UK Supplements:');
  supps.slice(0, 5).forEach((p, idx) => {
    console.log(`${idx + 1}. ${p.name} | Price: ${p.price_text} | Image: ${p.image_url} | URL: ${p.deal_url}`);
  });
}

verifyUkSupplements();
