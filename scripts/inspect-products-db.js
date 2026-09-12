import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectProducts() {
  const { data: prods, error } = await supabase
    .from('products')
    .select('id, name, market_region, price_text, badge_text, deal_url')
    .or('id.ilike.%sauna%,id.ilike.%headphone%,id.ilike.%b09pskn6x3%,id.ilike.%b0c3hcd34r%,id.ilike.%b08hmwzbxc%');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${prods.length} products matching sauna/headphones:`);
  console.table(prods);
}

inspectProducts();
