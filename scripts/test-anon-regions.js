import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, anonKey);

async function testAllRegions() {
  for (const region of ['US', 'UK', 'ES']) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('market_region', region);

    if (error) {
      console.error(`❌ Region ${region} query error:`, error);
    } else {
      console.log(`✅ Region ${region}: Fetched ${data.length} products`);
      const cats = Array.from(new Set(data.map(p => p.category)));
      console.log(`   Categories in ${region}:`, cats);
    }
  }
}

testAllRegions();
