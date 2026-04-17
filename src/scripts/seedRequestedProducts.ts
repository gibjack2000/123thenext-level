import { supabase } from '../lib/supabaseNode.ts';

if (!supabase) {
  console.error('Supabase client not configured');
  process.exit(1);
}

const dummyProducts = [
  {
    market: 'US',
    category: 'supplements',
    title: 'Neuro-Grade Creatine Monohydrate',
    asin: 'B0NEUROCREA',
    affiliate_link: 'https://example.com/neuro-creatine',
    image_url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
    cta: 'COGNITIVE',
    description: 'Premium neuro-grade creatine monohydrate for enhanced cognitive performance.',
    price: 34.99,
    rating: 5.0,
    is_active: true,
    tags: ['COGNITIVE']
  },
  {
    market: 'US',
    category: 'supplements',
    title: 'Mitochondrial NAD+ Precursor',
    asin: 'B0MITONAD',
    affiliate_link: 'https://example.com/mito-nad',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    cta: 'CELLULAR',
    description: 'Advanced mitochondrial support with NAD+ precursors for cellular energy.',
    price: 59.99,
    rating: 5.0,
    is_active: true,
    tags: ['CELLULAR']
  },
  {
    market: 'US',
    category: 'performance_testing',
    title: 'Biological Age (Epigenetic) Test',
    asin: 'B0BIOAGETEST',
    affiliate_link: 'https://example.com/bio-age-test',
    image_url: 'https://images.unsplash.com/photo-1579165466541-74e24690554a?auto=format&fit=crop&w=800&q=80',
    cta: 'LONGEVITY',
    description: 'Measure your biological age with this advanced epigenetic testing kit.',
    price: 299.00,
    rating: 5.0,
    is_active: true,
    tags: ['LONGEVITY']
  },
  {
    market: 'US',
    category: 'fitness_gear',
    title: 'High-Load Strength Equipment',
    asin: 'B0STREQUIP',
    affiliate_link: 'https://example.com/strength-equip',
    image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    cta: 'PERFORMANCE',
    description: 'Professional grade high-load strength training equipment.',
    price: 1299.00,
    rating: 5.0,
    is_active: true,
    tags: ['PERFORMANCE']
  }
];

(async () => {
  console.log('Seeding requested dummy products...');
  for (const product of dummyProducts) {
    const { error } = await supabase.from('amazon_affiliate_products').upsert({
      market: product.market,
      category: product.category,
      title: product.title,
      asin: product.asin,
      affiliate_link: product.affiliate_link,
      image_url: product.image_url,
      cta: product.cta,
      description: product.description,
      price: product.price,
      rating: product.rating,
      is_active: product.is_active,
      tags: product.tags,
      last_updated: new Date().toISOString()
    }, {
      onConflict: 'asin'
    });

    if (error) {
      console.error('Error seeding product:', product.title, error);
    } else {
      console.log('Successfully seeded:', product.title);
    }
  }
  console.log('Seeding completed.');
  process.exit(0);
})();
