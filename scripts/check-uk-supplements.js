import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { MOCK_PRODUCTS } from '../src/data/mockData.ts';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function inspectSupplements() {
  console.log('--- Checking Supabase amazon_affiliate_products for UK supplements ---');
  const { data: dbData, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .eq('market', 'UK')
    .eq('category', 'supplements');

  if (error) {
    console.error('Supabase query error:', error);
  } else {
    console.log(`Found ${dbData?.length || 0} products in amazon_affiliate_products for UK/supplements`);
    if (dbData && dbData.length > 0) {
      console.log('Sample from DB:', dbData.slice(0, 3));
    }
  }

  const mockSuppsUK = MOCK_PRODUCTS.filter(p => p.region === 'UK' && p.category === 'supplements');
  console.log(`Found ${mockSuppsUK.length} products in MOCK_PRODUCTS for UK/supplements`);
  
  const allSupps = MOCK_PRODUCTS.filter(p => p.category === 'supplements');
  console.log(`Total MOCK_PRODUCTS in supplements across all regions: ${allSupps.length}`);
  console.log(`- US: ${MOCK_PRODUCTS.filter(p => p.region === 'US' && p.category === 'supplements').length}`);
  console.log(`- UK: ${mockSuppsUK.length}`);
  console.log(`- ES: ${MOCK_PRODUCTS.filter(p => p.region === 'ES' && p.category === 'supplements').length}`);
}

inspectSupplements();
