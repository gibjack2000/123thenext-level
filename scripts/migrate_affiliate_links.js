import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrateAffiliateLinks() {
  console.log("🔍 Starting affiliate link migration for existing posts...");

  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id, title, content, affiliate_url');

    if (error) throw error;
    if (!posts) return;

    console.log(`Found ${posts.length} posts. Analyzing...`);

    let updatedCount = 0;

    for (const post of posts) {
      // Skip if already has a link
      if (post.affiliate_url && post.affiliate_url.length > 10) continue;

      // Find first Amazon link in content
      // Pattern matches (https://www.amazon.com/...) or (https://amzn.to/...)
      const amazonMatch = post.content.match(/\((https?:\/\/(?:www\.)?(?:amazon|amzn)\.(?:com|co\.uk|es)[^)]+)\)/);
      
      if (amazonMatch && amazonMatch[1]) {
        const link = amazonMatch[1];
        console.log(`✅ Found link for "${post.title}": ${link.substring(0, 50)}...`);
        
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ affiliate_url: link })
          .eq('id', post.id);

        if (updateError) {
          console.error(`❌ Failed to update "${post.title}":`, updateError.message);
        } else {
          updatedCount++;
        }
      } else {
        console.log(`⚠️ No link found in content for "${post.title}"`);
      }
    }

    console.log(`\n🎉 Migration complete! Updated ${updatedCount} posts.`);

  } catch (err) {
    console.error("❌ Migration failed:", err);
  }
}

migrateAffiliateLinks();
