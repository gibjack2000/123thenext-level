import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function prependDomainToRelativeImages() {
  console.log('Querying products for relative image URLs (/assets/images/%)...');
  
  // 1. Fetch all products with relative image paths
  const { data: relativeProducts, error: fetchErr } = await supabase
    .from('products')
    .select('id, name, image_url')
    .like('image_url', '/assets/images/%');

  if (fetchErr) {
    console.error('Error fetching relative products:', fetchErr);
    return;
  }

  console.log(`Found ${relativeProducts?.length || 0} products with relative image paths.`);

  if (!relativeProducts || relativeProducts.length === 0) {
    console.log('All product image URLs in database are already absolute or updated!');
    return;
  }

  // 2. Update each product with prepended domain
  let updatedCount = 0;
  for (const prod of relativeProducts) {
    const absoluteUrl = `https://123thenextlevel.com${prod.image_url}`;
    const { error: updateErr } = await supabase
      .from('products')
      .update({ image_url: absoluteUrl })
      .eq('id', prod.id);

    if (updateErr) {
      console.error(`Failed to update ${prod.id}:`, updateErr);
    } else {
      console.log(`Updated ${prod.id}: ${absoluteUrl}`);
      updatedCount++;
    }
  }

  console.log(`\nSuccessfully prepended domain to ${updatedCount} product image URLs in live Supabase!`);
}

prependDomainToRelativeImages();
