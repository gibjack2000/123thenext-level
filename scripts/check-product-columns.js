import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkColumns() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Sample product columns in public.products:', Object.keys(data[0] || {}));
    console.log('Sample row:', data[0]);
  }
}

checkColumns();
