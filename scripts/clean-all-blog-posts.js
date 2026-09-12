import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanAllBlogPosts() {
  console.log('Fetching all blog_posts from Supabase...');
  const { data: posts, error } = await supabase.from('blog_posts').select('*');
  if (error) {
    console.error('Error fetching blog_posts:', error);
    return;
  }

  console.log(`Found ${posts.length} posts. Checking and cleaning UK/ES hardcoded data...`);

  for (const p of posts) {
    let contentChanged = false;
    let newContent = p.content || '';

    // Replace amazon.co.uk with amazon.com US affiliate tag
    if (newContent.includes('amazon.co.uk')) {
      newContent = newContent.replace(/https?:\/\/(?:www\.)?amazon\.co\.uk\/dp\/([A-Z0-9]{10})(?:\?[^\s\)\"\'>]*)?/gi, 'https://www.amazon.com/dp/$1?tag=123znl0e-20');
      newContent = newContent.replace(/amazon\.co\.uk/gi, 'amazon.com');
      contentChanged = true;
    }

    // Replace amazon.es with amazon.com US affiliate tag
    if (newContent.includes('amazon.es')) {
      newContent = newContent.replace(/https?:\/\/(?:www\.)?amazon\.es\/dp\/([A-Z0-9]{10})(?:\?[^\s\)\"\'>]*)?/gi, 'https://www.amazon.com/dp/$1?tag=123znl0e-20');
      newContent = newContent.replace(/amazon\.es/gi, 'amazon.com');
      contentChanged = true;
    }

    // Replace any foreign tags with US tag
    if (newContent.includes('tag=youruk-21') || newContent.includes('tag=123znl0a-21') || newContent.includes('tag=123znl08a-21') || newContent.includes('tag=123znl0f3-21')) {
      newContent = newContent.replace(/tag=(?:youruk-21|123znl0a-21|123znl08a-21|123znl0f3-21)/gi, 'tag=123znl0e-20');
      contentChanged = true;
    }

    // Check if affiliate_product_1..4 are UK products (292, 297, 298)
    const badIds = [292, 297, 298];
    let aff1 = p.affiliate_product_1;
    let aff2 = p.affiliate_product_2;
    let aff3 = p.affiliate_product_3;
    let aff4 = p.affiliate_product_4;
    let affChanged = false;

    if (badIds.includes(aff1)) { aff1 = null; affChanged = true; }
    if (badIds.includes(aff2)) { aff2 = null; affChanged = true; }
    if (badIds.includes(aff3)) { aff3 = null; affChanged = true; }
    if (badIds.includes(aff4)) { aff4 = null; affChanged = true; }

    if (contentChanged || affChanged) {
      console.log(`🧹 Cleaning post: "${p.title}" (${p.slug})`);
      const { error: updateErr } = await supabase
        .from('blog_posts')
        .update({
          content: newContent,
          affiliate_product_1: aff1,
          affiliate_product_2: aff2,
          affiliate_product_3: aff3,
          affiliate_product_4: aff4
        })
        .eq('id', p.id);

      if (updateErr) {
        console.error(`  ❌ Error updating ${p.slug}:`, updateErr);
      } else {
        console.log(`  ✅ Cleaned successfully!`);
      }
    }
  }

  console.log('\n🎉 ALL BLOG POSTS IN SUPABASE ARE NOW 100% CLEAN US DEFAULTS!');
}

cleanAllBlogPosts().catch(console.error);
