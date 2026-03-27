import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

async function checkUpdate() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  
  // Try to update a dummy record or just check the first one
  const { data: get_data } = await supabase.from('amazon_affiliate_products').select('id, title').limit(1);
  if (!get_data || get_data.length === 0) return console.log("No data");
  
  const testId = get_data[0].id;
  console.log("Testing update on ID:", testId);
  
  const { data, error } = await supabase
    .from('amazon_affiliate_products')
    .update({ title: get_data[0].title + " test" })
    .eq('id', testId)
    .select();
    
  console.log("Update Error:", error);
  console.log("Update Data returned (if any):", data);
  
  // Revert
  if (data && data.length > 0) {
    await supabase.from('amazon_affiliate_products').update({ title: get_data[0].title }).eq('id', testId);
  }
}

checkUpdate();
