// This script seeds dummy affiliate products for the Performance & Testing Suite into Supabase.
// Run it with `node src/scripts/seedAffiliateProducts.ts` (ensure you have the Supabase credentials in env).

import { supabase } from '../lib/supabaseNode.ts';

if (!supabase) {
  console.error('Supabase client not configured');
  process.exit(1);
}

const dummyProducts = [
  // Diagnostic US
  {
    market: 'US',
    category: 'performance_testing',
    title: 'Diagnostic Test US',
    asin: 'B0EXAMPLEUS',
    affiliate_link: 'https://amazon.com/dp/B0CXM1X8PQ',
    image_url: 'https://images.unsplash.com/photo-1585321347093-f33d1f9e3c1c?auto=format&fit=crop&w=800&q=80',
    cta: 'Diagnostic Test US',
    description: 'Dummy diagnostic product for US market',
    price: 99.99,
    rating: 5.0,
    is_active: true,
    tags: []
  },
  // Diagnostic UK
  {
    market: 'UK',
    category: 'performance_testing',
    title: 'Diagnostic Test UK',
    asin: 'B0EXAMPLEUK',
    affiliate_link: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    image_url: 'https://images.unsplash.com/photo-1585321347093-f33d1f9e3c1c?auto=format&fit=crop&w=800&q=80',
    cta: 'Diagnostic Test UK',
    description: 'Dummy diagnostic product for UK market',
    price: 79.99,
    currency: 'GBP',
    rating: 5.0,
    is_active: true,
    tags: []
  },
  // Diagnostic ES
  {
    market: 'ES',
    category: 'performance_testing',
    title: 'Diagnostic Test ES',
    asin: 'B0EXAMPLEES',
    affiliate_link: 'https://amazon.es/dp/B0CXM1X8PQ',
    image_url: 'https://images.unsplash.com/photo-1585321347093-f33d1f9e3c1c?auto=format&fit=crop&w=800&q=80',
    cta: 'Diagnostic Test ES',
    description: 'Dummy diagnostic product for Spain market',
    price: 89.99,
    currency: 'EUR',
    rating: 5.0,
    is_active: true,
    tags: []
  },
  // Performance (strength) US
  {
    market: 'US',
    category: 'performance_testing',
    title: 'Performance Strength Rack US',
    asin: 'B0PERFUS',
    affiliate_link: 'https://amazon.com/dp/B0CLB5X8X9',
    image_url: 'https://images.unsplash.com/photo-1517971071642-6c2b761c00b5?auto=format&fit=crop&w=800&q=80',
    cta: 'Performance Strength',
    description: 'Dummy performance product for US market',
    price: 199.99,
    rating: 5.0,
    is_active: true,
    tags: []
  },
  // Women's Health Affiliate Products
  {
    market: 'US',
    category: 'performance_testing',
    title: 'Ovarian Reserve Test Kit (USA)',
    asin: 'B0OVARIANUS',
    affiliate_link: 'https://amazon.com/dp/B0OVARIANUS',
    image_url: 'https://images.unsplash.com/photo-1585321347093-f33d1f9e3c1c?auto=format&fit=crop&w=800&q=80',
    cta: 'Ovarian Reserve Test Kit (USA)',
    description: 'Diagnostic ovarian reserve test kit for US market',
    price: 149.99,
    rating: 5.0,
    is_active: true,
    tags: []
  },
  {
    market: 'UK',
    category: 'performance_testing',
    title: 'Ovarian Reserve Test Kit (UK)',
    asin: 'B0OVARIANUK',
    affiliate_link: 'https://amazon.co.uk/dp/B0OVARIANUK',
    image_url: 'https://images.unsplash.com/photo-1585321347093-f33d1f9e3c1c?auto=format&fit=crop&w=800&q=80',
    cta: 'Ovarian Reserve Test Kit (UK)',
    description: 'Diagnostic ovarian reserve test kit for UK market',
    price: 149.99,
    rating: 5.0,
    is_active: true,
    tags: []
  },
  {
    market: 'ES',
    category: 'performance_testing',
    title: 'Kit de Reserva Ovarica (Espana)',
    asin: 'B0OVARIANES',
    affiliate_link: 'https://amazon.es/dp/B0OVARIANES',
    image_url: 'https://images.unsplash.com/photo-1585321347093-f33d1f9e3c1c?auto=format&fit=crop&w=800&q=80',
    cta: 'Kit de Reserva Ovarica (Espana)',
    description: 'Diagnostic ovarian reserve test kit for Spain market',
    price: 149.99,
    rating: 5.0,
    is_active: true,
    tags: []
  },
  {
    market: 'US',
    category: 'performance_testing',
    title: 'Creatine Monohydrate (USA)',
    asin: 'B0CREATINE',
    affiliate_link: 'https://amazon.com/dp/B0CREATINE',
    image_url: 'https://images.unsplash.com/photo-1517971071642-6c2b761c00b5?auto=format&fit=crop&w=800&q=80',
    cta: 'Creatine',
    description: 'High-quality creatine monohydrate for performance',
    price: 39.99,
    rating: 5.0,
    is_active: true,
    tags: []
  },
  {
    market: 'US',
    category: 'performance_testing',
    title: 'NAD+ Booster (USA)',
    asin: 'B0NAD',
    affiliate_link: 'https://amazon.com/dp/B0NAD',
    image_url: 'https://images.unsplash.com/photo-1516574187844-b0db4f138f5d?auto=format&fit=crop&w=800&q=80',
    cta: 'NAD+ Booster',
    description: 'NAD+ precursor supplement for longevity',
    price: 59.99,
    rating: 5.0,
    is_active: true,
    tags: []
  },
  {
    market: 'US',
    category: 'performance_testing',
    title: 'High-Load Strength Equipment',
    asin: 'B0STRENGTH',
    affiliate_link: 'https://amazon.com/dp/B0STRENGTH',
    image_url: 'https://images.unsplash.com/photo-1506354666781-a5d7f3cd8aef?auto=format&fit=crop&w=800&q=80',
    cta: 'Strength Gear',
    description: 'Heavy-load strength training equipment for performance',
    price: 299.99,
    rating: 5.0,
    is_active: true,
    tags: []
  }
];

(async () => {
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
    });
    if (error) {
      console.error('Error seeding product', product.title, error);
    } else {
      console.log('Seeded', product.title);
    }
  }
  process.exit(0);
})();
