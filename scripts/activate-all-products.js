import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function activateAllProducts() {
  console.log('=== 🚀 RUNNING DB SAFETY ALIGNMENT: SET ALL PRODUCTS TO ACTIVE ===');

  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products in database.`);

  let updatedCount = 0;
  for (const product of products) {
    if (product.is_active !== true) {
      const { error: updateErr } = await supabase
        .from('products')
        .update({ is_active: true })
        .eq('id', product.id);

      if (updateErr) {
        console.error(`Error updating product ${product.id}:`, updateErr);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`✅ Update complete: Set is_active = true on ${updatedCount} products (Total: ${products.length}).`);
}

activateAllProducts();
