-- =========================================================================
-- 123THENEXTLEVEL: SUPABASE PRODUCT & PREMIUM GUIDE SEED
-- Adds "The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol"
-- Additive & Non-Destructive Upsert Migration
-- =========================================================================

-- 1. Ensure Table Structure Compatibility (Non-Destructive)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  rating NUMERIC DEFAULT 4.9,
  description TEXT,
  price_text TEXT,
  deal_url TEXT,
  market_region TEXT,
  badge_text TEXT,
  image_url TEXT,
  is_direct_affiliate BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  hub_placement_slot TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Upsert Metabolic Master Guide into Store Products (US, UK, & Spain)
INSERT INTO public.products (
  id,
  name,
  category,
  rating,
  description,
  price_text,
  deal_url,
  market_region,
  badge_text,
  image_url,
  is_direct_affiliate,
  is_active,
  hub_placement_slot
) VALUES
-- UK Store Entry (£19.00)
(
  'metabolic-master-guide-uk',
  'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
  'Clinical Diagnostics & Co-Pilot',
  4.98,
  'A phased biometric blueprint to strip deep visceral organ fat, optimize glycemic control, and preserve skeletal muscle mass.',
  '£19.00',
  '/checkout?product=metabolic-master-guide',
  'UK',
  'PREMIUM MASTER GUIDE',
  '/assets/images/metabolic_nutrition_cover_New.png',
  TRUE,
  TRUE,
  'primary_guide_slot'
),
-- US Store Entry ($25.00)
(
  'metabolic-master-guide-us',
  'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
  'Clinical Diagnostics & Co-Pilot',
  4.98,
  'A phased biometric blueprint to strip deep visceral organ fat, optimize glycemic control, and preserve skeletal muscle mass.',
  '$25.00',
  '/checkout?product=metabolic-master-guide',
  'US',
  'PREMIUM MASTER GUIDE',
  '/assets/images/metabolic_nutrition_cover_New.png',
  TRUE,
  TRUE,
  'primary_guide_slot'
),
-- ES Store Entry (22,00€)
(
  'metabolic-master-guide-es',
  'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
  'Clinical Diagnostics & Co-Pilot',
  4.98,
  'A phased biometric blueprint to strip deep visceral organ fat, optimize glycemic control, and preserve skeletal muscle mass.',
  '22,00€',
  '/checkout?product=metabolic-master-guide',
  'ES',
  'PREMIUM MASTER GUIDE',
  '/assets/images/metabolic_nutrition_cover_New.png',
  TRUE,
  TRUE,
  'primary_guide_slot'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  rating = EXCLUDED.rating,
  description = EXCLUDED.description,
  price_text = EXCLUDED.price_text,
  deal_url = EXCLUDED.deal_url,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 3. Upsert into Premium Guides Table
INSERT INTO public.premium_guides (
  slug,
  title,
  category,
  short_description,
  long_description,
  price_display,
  stripe_price_id,
  image,
  file_name,
  featured,
  tags,
  included,
  audience,
  disclaimer
) VALUES (
  'metabolic-master-guide',
  'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
  'Nutrition',
  'A phased biometric blueprint to strip deep visceral organ fat, optimize glycemic control, and preserve skeletal muscle mass.',
  'Stop Guessing Your Weight. Re-Engineer Your Internal Biology in 12 Weeks. A phased protocol integrating fasting bioimpedance scales, continuous autonomic wearables, weekly urine chemistry, and quarterly clinical phlebotomy to strip deep visceral organ fat.',
  '£19.00 / $25.00 / €22.00',
  'price_metabolic_master_guide',
  '/assets/images/metabolic_nutrition_cover_New.png',
  'metabolic-master-guide.pdf',
  TRUE,
  ARRAY['Visceral Fat', 'Bioimpedance', 'Metabolism', 'Wearables', '12-Week Protocol', 'Body Composition'],
  ARRAY[
    'Visceral Fat Rating & Smart Scale Calibration',
    'Targeted Protein & Resistance Workout Schedules',
    '14-Day Telemetry Logging & GP Leave-Behind Export',
    'Sunday Urinalysis & Day 90 Blood Draw Cadence Matrix'
  ],
  'Individuals looking to eliminate hidden visceral organ adiposity, optimize muscle-to-fat ratio, and systematically lower ApoB and HbA1c.',
  'This guide is for informational and educational purposes only and does not constitute medical advice. Consult with a qualified physician before starting any intensive nutritional or exercise intervention.'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  price_display = EXCLUDED.price_display,
  image = EXCLUDED.image,
  file_name = EXCLUDED.file_name,
  tags = EXCLUDED.tags,
  included = EXCLUDED.included;
