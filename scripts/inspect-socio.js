import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const { data: blog, error } = await supabase.from('blog_posts').select('*').eq('slug', 'socio-architecture-bio-networks').single();
  if (error) {
    console.error('Error fetching blog_posts:', error);
    return;
  }

  console.log('Title:', blog.title);
  console.log('Status:', blog.status);
  console.log('\n--- Searching for Product references in content ---');
  const lines = blog.content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('ProductCard') || l.includes('product-card') || l.includes('amazon') || l.includes('sauna') || l.includes('headphones') || l.includes('rower') || l.includes('data-product-id')) {
      console.log(`Line ${i}: ${l}`);
    }
  });

  console.log('\n--- Full Content ---');
  console.log(blog.content);
}

inspect();
