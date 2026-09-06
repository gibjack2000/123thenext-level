import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, anonKey);

async function verifyAllRegions() {
  for (const region of ['US', 'UK', 'ES']) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('market_region', region);

    if (error) {
      console.error(`Error for ${region}:`, error);
    } else {
      const supps = data.filter(p => p.category?.toLowerCase() === 'supplements');
      console.log(`Region ${region}: Total Products = ${data.length}, Supplements = ${supps.length}`);
    }
  }
}

verifyAllRegions();
