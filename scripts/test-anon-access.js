import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, anonKey);

async function testAnonAccess() {
  console.log('Testing public/anon client access to public.products:');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(5);

  if (error) {
    console.error('❌ Anon query error (RLS or permissions issue):', error);
  } else {
    console.log(`✅ Anon query success! Fetched ${data.length} sample rows:`);
    console.log(data.map(p => ({ id: p.id, name: p.name, category: p.category, market: p.market_region })));
  }
}

testAnonAccess();
