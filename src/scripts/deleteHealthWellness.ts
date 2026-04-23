import { supabase } from '../lib/supabaseNode.ts';

if (!supabase) {
  console.error('Supabase client not configured');
  process.exit(1);
}

(async () => {
  console.log('Attempting to delete US Health & Wellness products...');
  
  // 1. Find the IDs of the products we want to delete
  const { data: products, error: fetchError } = await supabase
    .from('amazon_affiliate_products')
    .select('id')
    .eq('market', 'US')
    .eq('category', 'health_wellness');

  if (fetchError) {
    console.error('Error fetching products:', fetchError);
    process.exit(1);
  }

  if (!products || products.length === 0) {
    console.log('No products found in US Health & Wellness category.');
    process.exit(0);
  }

  const ids = products.map(p => p.id);
  console.log(`Found ${ids.length} products to delete.`);

  // 2. Delete mappings that reference these products
  const { error: mappingError } = await supabase
    .from('affiliate_link_mappings')
    .delete()
    .in('product_id', ids);

  if (mappingError) {
    console.error('Error deleting mappings:', mappingError);
    process.exit(1);
  }
  console.log('Successfully cleared associated mappings.');

  // 3. Delete the products themselves
  const { error: deleteError } = await supabase
    .from('amazon_affiliate_products')
    .delete()
    .in('id', ids);

  if (deleteError) {
    console.error('Error deleting products:', deleteError);
    process.exit(1);
  }

  console.log('Successfully deleted US Health & Wellness products.');
  process.exit(0);
})();
