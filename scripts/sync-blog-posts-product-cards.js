import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const MASTERCLASS_PRODUCT_CARDS = {
  'socio-architecture-bio-networks': `
## 6. Curated Socio-Architectural & Environmental Hardware

Transform your physical living space into a high-performance wellness sanctuary with hardware from our Sovereign Store:

<ProductCard id="sleep-analyzer-us" productType="Zero-Contact Sleep Biosensor" />

<ProductCard id="sauna-us" productType="Far-Infrared Thermal Sanctuary" />

<ProductCard id="headphones-us" productType="Acoustic Sanctuary & Noise Defense" />
`.trim(),

  'performance-biodata-protocols': `
## 6. Curated Performance & Bio-Telemetry Hardware

Transform your physiological performance with precision bio-telemetry hardware from our Sovereign Store:

<ProductCard id="rower-us" productType="Precision Ergometer Hardware" />

<ProductCard id="wearable-tracker-us" productType="Multispectral Biosensing Wearable" />

<ProductCard id="reagent-strips-us" productType="Rapid Biochemical Diagnostic" />
`.trim(),

  'healthspan-longevity-epigenetic-optimization': `
## 6. Curated Epigenetic & Senolytic Arsenal

Deploy clinically validated longevity hardware and cellular formulations from our Sovereign Store:

<ProductCard id="sirtuin-stack-us" productType="Clinical Sirtuin Activation" />

<ProductCard id="segmental-scale-us" productType="Clinical Segmental Composition" />

<ProductCard id="blood-pressure-cuff-us" productType="Arterial Compliance Telemetry" />
`.trim(),

  'metabolic-nutrition-glycemic-mastery': `
## 6. Curated Metabolic Optimization Stack

Maintain strict glycemic stability with metabolic biosensors from our Sovereign Store:

<ProductCard id="cgm-us" productType="Real-Time Glycemic Telemetry" />

<ProductCard id="segmental-scale-us" productType="Visceral Adiposity & Muscle Mass" />

<ProductCard id="reagent-strips-us" productType="Urinary Ketosis & Hydration Diagnostics" />
`.trim(),

  'autonomic-engineering-neuro-regulation': `
## 6. Curated Neuromodulation & Autonomic Hardware

Systematically modulate vagal tone with clinical hardware from our Sovereign Store:

<ProductCard id="sleep-analyzer-us" productType="Nocturnal Vagal Tone & Apnea Screening" />

<ProductCard id="stethoscope-us" productType="Clinical 3-Lead AI Cardiac Auscultation" />

<ProductCard id="blood-pressure-cuff-us" productType="Autonomic Cardiovascular Monitoring" />
`.trim(),

  'womens-health-hormonal-vitality': `
## 6. Curated Infradian & Ovarian Longevity Arsenal

Optimize infradian phases and ovarian longevity with hardware from our Sovereign Store:

<ProductCard id="cgm-us" productType="Continuous Metabolic Infradian Tracking" />

<ProductCard id="segmental-scale-us" productType="Bone Mineral & Lean Mass Telemetry" />

<ProductCard id="sirtuin-stack-us" productType="Mitochondrial Sirtuin Protection" />
`.trim()
};

async function updateBlogPosts() {
  console.log('🔄 Updating blog posts with dynamic Sovereign Store product cards...');

  for (const [slug, newSection6] of Object.entries(MASTERCLASS_PRODUCT_CARDS)) {
    // 1. Fetch current post
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, content')
      .eq('slug', slug);

    if (error || !posts || posts.length === 0) {
      console.warn(`⚠️ Post ${slug} not found in blog_posts table.`);
      continue;
    }

    const post = posts[0];
    let content = post.content || '';

    // Replace Section 6 with dynamic ProductCard tags
    const section6Regex = /## 6\.[\s\S]*?(?=## 7\.|\n---\s*\n## 7\.|$)/i;

    if (section6Regex.test(content)) {
      content = content.replace(section6Regex, newSection6 + '\n\n---\n\n');
    } else {
      content += '\n\n---\n\n' + newSection6;
    }

    // Update blog_posts
    const { error: updateErr } = await supabase
      .from('blog_posts')
      .update({ content })
      .eq('id', post.id);

    if (updateErr) {
      console.error(`❌ Failed to update ${slug}:`, updateErr);
    } else {
      console.log(`✅ Successfully updated "${slug}" with dynamic Sovereign Store product cards!`);
    }

    // Also update blogs table if exists
    try {
      await supabase
        .from('blogs')
        .update({ content })
        .eq('slug', slug);
    } catch {}
  }

  console.log('\n🎉 ALL MASTERCLASS BLOG POSTS SYNCED WITH SOVEREIGN STORE PRODUCTS!');
}

updateBlogPosts().catch(console.error);
