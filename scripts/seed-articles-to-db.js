import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const articles = [
  {
    slug: 'performance-biodata-protocols',
    title: 'Performance & Biodata: Telemetry Protocols for High-Output Athletes',
    excerpt: 'Leverage continuous biometric streams, lactate threshold tracking, and biomechanical analytics to optimize training loads and eliminate overtraining syndrome.',
    content: `Modern athletic performance has transcended guesswork. By integrating real-time telemetry, continuous heart rate variability (HRV), and force-vector biodata, elite athletes can operate at the cutting edge of human capability.

### 1. The Power of Continuous Telemetry
Biometric tracking is no longer just about counting daily steps. It is about understanding the autonomic nervous system's response to acute and chronic stress loads.
- **HRV Autonomic Profiling:** Monitoring RMSSD trends upon waking provides an objective window into readiness.
- **Lactate & Glucose Dynamics:** Real-time metabolic tracking ensures you train within target physiological zones.

### 2. Biomechanical Vector Analytics
Analyzing force distribution, contact time asymmetry, and kinetic chain efficiency prevents microtraumas before they manifest as chronic injuries.

### Action Step
Establish your biometric baseline over a 14-day calibration window before programming peak training blocks.`,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png',
    image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png',
    category: 'fitness',
    author: '123TheNextLevel Team',
    tags: ['performance', 'biodata', 'biometrics', 'training', 'HRV', 'sports science'],
    reading_time_minutes: 7,
    featured: true,
    status: 'draft',
    published_at: null
  },
  {
    slug: 'healthspan-longevity-epigenetic-optimization',
    title: 'Healthspan & Longevity: Epigenetic Reprogramming & Cellular Renewal',
    excerpt: 'Targeting the hallmarks of aging through caloric timing, senolytic therapies, NAD+ precursors, and mitochondrial biogenesis.',
    content: `Living longer is meaningless without preserving cognitive clarity, metabolic flexibility, and physical independence. The emerging paradigm of longevity medicine focuses on extending healthspan—the fraction of life spent free from chronic disease.

### 1. Targeting the Hallmarks of Aging
Cellular aging is governed by well-characterized pathways that can be modulated:
- **Mitochondrial Renewal:** Activating PGC-1alpha through zone 2 cardio and temperature stressors triggers mitochondrial biogenesis.
- **Autophagy & Senophagy:** Periodic fasting and polyphenol-rich nutrition promote cellular cleanup of senescent "zombie" cells.

### 2. Epigenetic Maintenance
DNA methylation clocks demonstrate that biological age can diverge significantly from chronological age through targeted lifestyle interventions.

### Conclusion
Longevity is the compound interest of daily biological stewardship.`,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png',
    image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png',
    category: 'health',
    author: '123TheNextLevel Team',
    tags: ['longevity', 'healthspan', 'epigenetics', 'cellular renewal', 'mitochondria', 'anti-aging'],
    reading_time_minutes: 8,
    featured: true,
    status: 'draft',
    published_at: null
  },
  {
    slug: 'metabolic-nutrition-glycemic-mastery',
    title: 'Metabolic Nutrition: Precision Fueling & Glycemic Mastery',
    excerpt: 'Eliminate the afternoon energy crash through glycemic stabilization, optimal macronutrient sequencing, and metabolic flexibility.',
    content: `Food is not merely fuel; it is molecular information that instructs your genes, modulates hormonal cascades, and dictates neurotransmitter production.

### 1. The Glycemic Rollercoaster
Rapid glucose spikes trigger proportional insulin surges, leading to reactive hypoglycemia, brain fog, and intense cravings. Stabilizing your glucose baseline unlocks sustained, steady mental energy.

### 2. Macronutrient Sequencing Strategy
Eating fiber and protein prior to complex carbohydrates slows gastric emptying and dramatically blunts post-prandial glycemic excursions.

### 3. Metabolic Flexibility
Training your physiology to seamlessly transition between burning glucose and utilizing fatty acids is the cornerstone of metabolic resilience.`,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png',
    image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png',
    category: 'nutrition',
    author: '123TheNextLevel Team',
    tags: ['metabolic nutrition', 'glucose control', 'energy', 'diet', 'meal sequencing', 'metabolism'],
    reading_time_minutes: 6,
    featured: true,
    status: 'draft',
    published_at: null
  },
  {
    slug: 'autonomic-engineering-neuro-regulation',
    title: 'Autonomic Engineering: Neuro-Somatic Protocols for Peak Nervous System Balance',
    excerpt: 'Learn how deliberate breath manipulation, vagus nerve stimulation, and sensory tuning downregulate chronic cortisol.',
    content: `In a hyper-stimulated digital environment, your autonomic nervous system can remain locked in sympathetic fight-or-flight dominance without you realizing it.

### 1. The Vagus Nerve Highway
The vagus nerve accounts for 80% of parasympathetic signaling. By engaging specific somatic practices, you can manually trigger downregulation:
- **The Physiological Sigh:** Two sharp nasal inhales followed by an extended oral exhalation.
- **Cold Water Facial Immersion:** Triggers the mammalian dive reflex, instantaneously reducing heart rate.

### 2. Neuro-Recovery Architecture
Designing dedicated transition rituals between work hours and evening rest protects sleep architecture and restorative hormone pulses.`,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png',
    image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png',
    category: 'wellness',
    author: '123TheNextLevel Team',
    tags: ['autonomic engineering', 'nervous system', 'vagus nerve', 'stress relief', 'breathwork', 'neuroscience'],
    reading_time_minutes: 6,
    featured: true,
    status: 'draft',
    published_at: null
  },
  {
    slug: 'womens-health-hormonal-vitality',
    title: "Women's Health: Hormonal Synchronization & Cycle-Synced Vitality",
    excerpt: 'Aligning strength training, nutrient timing, and recovery windows with infradian rhythms to support lifetime hormonal vitality.',
    content: `A woman's physiology operates on both a 24-hour circadian clock and a ~28-day infradian rhythm. Aligning nutrition and training with these cyclical hormonal shifts unlocks optimal energy, mood stability, and body composition.

### 1. The Four Infradian Phases
- **Follicular Phase:** Estrogen rises, enhancing insulin sensitivity, neuroplasticity, and willingness to tackle high-intensity training.
- **Ovulatory Window:** Peak energy and strength capacity.
- **Luteal Phase:** Progesterone elevates basal body temperature and metabolic rate; prioritize complex carbohydrates and magnesium.
- **Menstrual Phase:** Downregulate physical strain and prioritize restorative sleep and micronutrient replenishment.

### 2. Micronutrient Optimization
Tailored intake of bioavailable iron, zinc, B-vitamins, and essential fatty acids sustains hormonal equilibrium across every decade of life.`,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png',
    image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png',
    category: 'wellness',
    author: '123TheNextLevel Team',
    tags: ['womens health', 'hormonal balance', 'cycle syncing', 'vitality', 'infradian rhythm', 'wellness'],
    reading_time_minutes: 7,
    featured: true,
    status: 'draft',
    published_at: null
  },
  {
    slug: 'socio-architecture-bio-networks',
    title: 'Socio-Architecture: The Biology of Connection & Environmental Design',
    excerpt: 'How physical architecture, social micro-communities, and environmental signals impact neurobiology and immune longevity.',
    content: `Human health is not isolated to internal biochemistry. The environments we inhabit and the social networks we maintain exert profound epigenetic and hormonal influences.

### 1. Environmental Sensory Design
Light spectrums, acoustic levels, and spatial layouts directly calibrate our neurochemistry and cortisol baseline.

### 2. The Longevity of Human Connection
Strong social bonds and meaningful community engagement are among the strongest statistical predictors of longevity, reducing systemic inflammation markers and supporting cardiovascular resilience.`,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png',
    image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png',
    category: 'wellness',
    author: '123TheNextLevel Team',
    tags: ['socio architecture', 'community', 'environmental health', 'bio networks', 'longevity'],
    reading_time_minutes: 5,
    featured: false,
    status: 'draft',
    published_at: null
  }
];

async function seed() {
  console.log('--- Seeding 6 Draft Articles to Database ---');

  for (const table of ['blogs', 'blog_posts']) {
    try {
      console.log(`Attempting to seed into public.${table}...`);
      for (const item of articles) {
        let payload = { ...item };
        if (table === 'blog_posts') {
          delete payload.cover_image_url;
          delete payload.reading_time_minutes;
          delete payload.published_at;
        }


        const { data, error } = await supabase
          .from(table)
          .upsert(payload, { onConflict: 'slug' })
          .select('id, title, status, slug')
          .single();

        if (error) {
          if (error.code === 'PGRST205') {
            console.log(`Table "${table}" does not exist yet (run SQL schema to create it).`);
            break;
          }
          console.error(`Error inserting "${item.title}" into ${table}:`, error.message);
        } else {
          console.log(`✅ Seeded into ${table}: "${data.title}" [${data.status}] -> ID: ${data.id}`);
        }
      }
    } catch (err) {
      console.error(`Failed on table ${table}:`, err.message);
    }
  }

  console.log('\n--- Seeding Process Finished ---');
}


seed();
