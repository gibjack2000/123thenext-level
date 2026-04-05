import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('content')
    .eq('id', '505f9bea-ddfe-4b6f-97df-3aa8ee18a6de')
    .single();

  if (error) {
    console.error('Error fetching post:', error.message);
    return;
  }

  console.log('--- POST CONTENT START ---');
  console.log(data.content);
  console.log('--- POST CONTENT END ---');
}

check();
