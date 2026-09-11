-- ==============================================================================
-- SUPABASE BLOGS SCHEMA & SEED MIGRATION SCRIPT
-- Table: public.blogs
-- Description: Creates the blogs table with scheduling, status, cover image,
--              SEO metadata, Row Level Security (RLS), and stages draft articles.
-- ==============================================================================

-- 1. Create the blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'wellness',
  author TEXT NOT NULL DEFAULT '123TheNextLevel Editorial',
  tags TEXT[] DEFAULT '{}',
  reading_time_minutes INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  affiliate_product_1 UUID REFERENCES public.amazon_affiliate_products(id) ON DELETE SET NULL,
  affiliate_product_2 UUID REFERENCES public.amazon_affiliate_products(id) ON DELETE SET NULL,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status_published_at ON public.blogs(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- 3. Automatic updated_at Timestamp Trigger
CREATE OR REPLACE FUNCTION public.handle_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_blogs_updated_at ON public.blogs;
CREATE TRIGGER trigger_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.handle_blogs_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 4a. Public Read Policy:
-- Visitors can ONLY read articles that are explicitly 'published' and where published_at is in the past.
DROP POLICY IF EXISTS "Public can view published blogs only" ON public.blogs;
CREATE POLICY "Public can view published blogs only"
ON public.blogs
FOR SELECT
USING (
  status = 'published'
  AND published_at IS NOT NULL
  AND published_at <= timezone('utc'::text, now())
);

-- 4b. Authenticated / Service Role Policy:
-- Admin users and backend service keys have full unrestricted access to draft, schedule, and edit posts.
DROP POLICY IF EXISTS "Service role and authenticated users full access" ON public.blogs;
CREATE POLICY "Service role and authenticated users full access"
ON public.blogs
FOR ALL
USING (
  auth.role() = 'service_role' OR auth.role() = 'authenticated'
)
WITH CHECK (
  auth.role() = 'service_role' OR auth.role() = 'authenticated'
);

-- 5. Enable Realtime Replication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'blogs'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.blogs;
  END IF;
END $$;

-- ==============================================================================
-- 6. SEED DATA: Stage Draft Articles for Review
-- All initial articles are staged with status = 'draft' and published_at = NULL.
-- Cover images are served directly from the public 'blog-covers' Supabase CDN bucket.
-- ==============================================================================

INSERT INTO public.blogs (
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  category,
  author,
  tags,
  reading_time_minutes,
  featured,
  status,
  published_at,
  meta_title,
  meta_description,
  og_image_url
)
VALUES
(
  'performance-biodata-protocols',
  'Performance & Biodata: Telemetry Protocols for High-Output Athletes',
  'Leverage continuous biometric streams, lactate threshold tracking, and biomechanical analytics to optimize training loads and eliminate overtraining syndrome.',
  E'Modern athletic performance has transcended guesswork. By integrating real-time telemetry, continuous heart rate variability (HRV), and force-vector biodata, elite athletes can operate at the cutting edge of human capability.\n\n### 1. The Power of Continuous Telemetry\nBiometric tracking is no longer just about counting daily steps. It is about understanding the autonomic nervous system''s response to acute and chronic stress loads.\n- **HRV Autonomic Profiling:** Monitoring RMSSD trends upon waking provides an objective window into readiness.\n- **Lactate & Glucose Dynamics:** Real-time metabolic tracking ensures you train within target physiological zones.\n\n### 2. Biomechanical Vector Analytics\nAnalyzing force distribution, contact time asymmetry, and kinetic chain efficiency prevents microtraumas before they manifest as chronic injuries.\n\n### Action Step\nEstablish your biometric baseline over a 14-day calibration window before programming peak training blocks.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png',
  'fitness',
  '123TheNextLevel Team',
  ARRAY['performance', 'biodata', 'biometrics', 'training', 'HRV', 'sports science'],
  7,
  true,
  'draft',
  NULL,
  'Performance & Biodata Protocols | 123TheNextLevel',
  'Optimize human athletic performance through real-time biometric telemetry, HRV profiling, and biomechanical kinetic tracking.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png'
),
(
  'healthspan-longevity-epigenetic-optimization',
  'Healthspan & Longevity: Epigenetic Reprogramming & Cellular Renewal',
  'Targeting the hallmarks of aging through caloric timing, senolytic therapies, NAD+ precursors, and mitochondrial biogenesis.',
  E'Living longer is meaningless without preserving cognitive clarity, metabolic flexibility, and physical independence. The emerging paradigm of longevity medicine focuses on extending healthspan—the fraction of life spent free from chronic disease.\n\n### 1. Targeting the Hallmarks of Aging\nCellular aging is governed by well-characterized pathways that can be modulated:\n- **Mitochondrial Renewal:** Activating PGC-1alpha through zone 2 cardio and temperature stressors triggers mitochondrial biogenesis.\n- **Autophagy & Senophagy:** Periodic fasting and polyphenol-rich nutrition promote cellular cleanup of senescent "zombie" cells.\n\n### 2. Epigenetic Maintenance\nDNA methylation clocks demonstrate that biological age can diverge significantly from chronological age through targeted lifestyle interventions.\n\n### Conclusion\nLongevity is the compound interest of daily biological stewardship.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png',
  'health',
  '123TheNextLevel Team',
  ARRAY['longevity', 'healthspan', 'epigenetics', 'cellular renewal', 'mitochondria', 'anti-aging'],
  8,
  true,
  'draft',
  NULL,
  'Healthspan & Longevity Protocols | 123TheNextLevel',
  'Explore cellular renewal, epigenetic age reversal, and mitochondrial health strategies for extending youthful healthspan.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png'
),
(
  'metabolic-nutrition-glycemic-mastery',
  'Metabolic Nutrition: Precision Fueling & Glycemic Mastery',
  'Eliminate the afternoon energy crash through glycemic stabilization, optimal macronutrient sequencing, and metabolic flexibility.',
  E'Food is not merely fuel; it is molecular information that instructs your genes, modulates hormonal cascades, and dictates neurotransmitter production.\n\n### 1. The Glycemic Rollercoaster\nRapid glucose spikes trigger proportional insulin surges, leading to reactive hypoglycemia, brain fog, and intense cravings. Stabilizing your glucose baseline unlocks sustained, steady mental energy.\n\n### 2. Macronutrient Sequencing Strategy\nEating fiber and protein prior to complex carbohydrates slows gastric emptying and dramatically blunts post-prandial glycemic excursions.\n\n### 3. Metabolic Flexibility\nTraining your physiology to seamlessly transition between burning glucose and utilizing fatty acids is the cornerstone of metabolic resilience.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png',
  'nutrition',
  '123TheNextLevel Team',
  ARRAY['metabolic nutrition', 'glucose control', 'energy', 'diet', 'meal sequencing', 'metabolism'],
  6,
  true,
  'draft',
  NULL,
  'Metabolic Nutrition & Glycemic Mastery | 123TheNextLevel',
  'Master your metabolic energy with precision macronutrient sequencing, glucose stabilization, and metabolic flexibility.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png'
),
(
  'autonomic-engineering-neuro-regulation',
  'Autonomic Engineering: Neuro-Somatic Protocols for Peak Nervous System Balance',
  'Learn how deliberate breath manipulation, vagus nerve stimulation, and sensory tuning downregulate chronic cortisol.',
  E'In a hyper-stimulated digital environment, your autonomic nervous system can remain locked in sympathetic fight-or-flight dominance without you realizing it.\n\n### 1. The Vagus Nerve Highway\nThe vagus nerve accounts for 80% of parasympathetic signaling. By engaging specific somatic practices, you can manually trigger downregulation:\n- **The Physiological Sigh:** Two sharp nasal inhales followed by an extended oral exhalation.\n- **Cold Water Facial Immersion:** Triggers the mammalian dive reflex, instantaneously reducing heart rate.\n\n### 2. Neuro-Recovery Architecture\nDesigning dedicated transition rituals between work hours and evening rest protects sleep architecture and restorative hormone pulses.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png',
  'wellness',
  '123TheNextLevel Team',
  ARRAY['autonomic engineering', 'nervous system', 'vagus nerve', 'stress relief', 'breathwork', 'neuroscience'],
  6,
  true,
  'draft',
  NULL,
  'Autonomic Engineering & Nervous System Balance | 123TheNextLevel',
  'Scientific protocols to modulate your autonomic nervous system, engage the vagus nerve, and eliminate chronic stress.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png'
),
(
  'womens-health-hormonal-vitality',
  'Women''s Health: Hormonal Synchronization & Cycle-Synced Vitality',
  'Aligning strength training, nutrient timing, and recovery windows with infradian rhythms to support lifetime hormonal vitality.',
  E'A woman''s physiology operates on both a 24-hour circadian clock and a ~28-day infradian rhythm. Aligning nutrition and training with these cyclical hormonal shifts unlocks optimal energy, mood stability, and body composition.\n\n### 1. The Four Infradian Phases\n- **Follicular Phase:** Estrogen rises, enhancing insulin sensitivity, neuroplasticity, and willingness to tackle high-intensity training.\n- **Ovulatory Window:** Peak energy and strength capacity.\n- **Luteal Phase:** Progesterone elevates basal body temperature and metabolic rate; prioritize complex carbohydrates and magnesium.\n- **Menstrual Phase:** Downregulate physical strain and prioritize restorative sleep and micronutrient replenishment.\n\n### 2. Micronutrient Optimization\nTailored intake of bioavailable iron, zinc, B-vitamins, and essential fatty acids sustains hormonal equilibrium across every decade of life.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png',
  'wellness',
  '123TheNextLevel Team',
  ARRAY['womens health', 'hormonal balance', 'cycle syncing', 'vitality', 'infradian rhythm', 'wellness'],
  7,
  true,
  'draft',
  NULL,
  'Women''s Health & Hormonal Vitality | 123TheNextLevel',
  'Comprehensive guide to cycle syncing, hormonal equilibrium, and tailored fitness protocols for women.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png'
),
(
  'socio-architecture-bio-networks',
  'Socio-Architecture: The Biology of Connection & Environmental Design',
  'How physical architecture, social micro-communities, and environmental signals impact neurobiology and immune longevity.',
  E'Human health is not isolated to internal biochemistry. The environments we inhabit and the social networks we maintain exert profound epigenetic and hormonal influences.\n\n### 1. Environmental Sensory Design\nLight spectrums, acoustic levels, and spatial layouts directly calibrate our neurochemistry and cortisol baseline.\n\n### 2. The Longevity of Human Connection\nStrong social bonds and meaningful community engagement are among the strongest statistical predictors of longevity, reducing systemic inflammation markers and supporting cardiovascular resilience.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png',
  'wellness',
  '123TheNextLevel Team',
  ARRAY['socio architecture', 'community', 'environmental health', 'bio networks', 'longevity'],
  5,
  false,
  'draft',
  NULL,
  'Socio-Architecture & Bio-Networks | 123TheNextLevel',
  'Explore how environmental architecture and social cohesion directly influence neurobiology and long-term healthspan.',
  'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  cover_image_url = EXCLUDED.cover_image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  og_image_url = EXCLUDED.og_image_url,
  updated_at = timezone('utc'::text, now());

-- ==============================================================================
-- 7. DATABASE WEBHOOK TRIGGERS (pg_net)
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 7a. Trigger: Alert when a new row is inserted with status = 'draft'
CREATE OR REPLACE FUNCTION public.notify_blog_draft_created()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  IF NEW.status = 'draft' THEN
    payload := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', jsonb_build_object(
        'id', NEW.id,
        'title', NEW.title,
        'category', NEW.category,
        'status', NEW.status,
        'slug', NEW.slug,
        'created_at', NEW.created_at
      )
    );

    PERFORM net.http_post(
      url := 'https://123thenextlevel.com/api/webhooks/blog-draft-alert',
      body := payload,
      headers := jsonb_build_object('Content-Type', 'application/json')
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_notify_blogs_draft ON public.blogs;
CREATE TRIGGER trigger_notify_blogs_draft
AFTER INSERT ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.notify_blog_draft_created();

-- 7b. Drop any legacy database-level queue empty triggers
-- Queue Empty alerts are handled safely via the Admin Dashboard (/api/webhooks/blog-queue-empty-check)
-- to prevent false positives during bulk database seeding or migrations.
DROP TRIGGER IF EXISTS trigger_queue_empty_blogs ON public.blogs;
DROP TRIGGER IF EXISTS trigger_queue_empty_blog_posts ON public.blog_posts;
DROP FUNCTION IF EXISTS public.notify_blog_queue_empty_check();


