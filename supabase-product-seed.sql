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
  checkout_instruction TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS checkout_instruction TEXT DEFAULT NULL;

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

-- ============================================================================
-- 4. Upsert Bundle SKUs into Products & Premium Guides
-- ============================================================================
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
  image_url
) VALUES 
  -- Pick Any 3 Bundle (UK / US / ES)
  (
    'bundle-pick-3-uk',
    'Pick Any 3 Master Guides (Custom Trio Bundle)',
    'Protocol Bundles',
    4.99,
    'Choose any 3 of our 10 Premium Master Guides to build your tailored longevity and healthspan protocol.',
    '£29.99',
    '/checkout?bundle=bundle-pick-3',
    'UK',
    'CUSTOM TRIO BUNDLE',
    '/assets/images/metabolic_nutrition_cover_New.png'
  ),
  (
    'bundle-pick-3-us',
    'Pick Any 3 Master Guides (Custom Trio Bundle)',
    'Protocol Bundles',
    4.99,
    'Choose any 3 of our 10 Premium Master Guides to build your tailored longevity and healthspan protocol.',
    '$29.99',
    '/checkout?bundle=bundle-pick-3',
    'US',
    'CUSTOM TRIO BUNDLE',
    '/assets/images/metabolic_nutrition_cover_New.png'
  ),
  (
    'bundle-pick-3-es',
    'Pick Any 3 Master Guides (Custom Trio Bundle)',
    'Protocol Bundles',
    4.99,
    'Elige 3 de nuestras 10 Guías Maestras Premium para construir tu protocolo personalizado de longevidad.',
    '29,99€',
    '/checkout?bundle=bundle-pick-3',
    'ES',
    'PACK TRÍO PERSONALIZADO',
    '/assets/images/metabolic_nutrition_cover_New.png'
  ),
  -- Complete 10-Guide Master Vault (UK / US / ES)
  (
    'bundle-complete-vault-10-uk',
    'Complete 10-Guide Master Vault',
    'Protocol Bundles',
    5.00,
    'Instant access to all 10 Premium Master Guides — covering body composition, metabolic nutrition, autonomic engineering, women''s health, home fitness, and clinical telemetry.',
    '£59.99',
    '/checkout?bundle=bundle-complete-vault-10',
    'UK',
    'COMPLETE VAULT ACCESS (SAVE 70%)',
    '/assets/images/metabolic_nutrition_cover_New.png'
  ),
  (
    'bundle-complete-vault-10-us',
    'Complete 10-Guide Master Vault',
    'Protocol Bundles',
    5.00,
    'Instant access to all 10 Premium Master Guides — covering body composition, metabolic nutrition, autonomic engineering, women''s health, home fitness, and clinical telemetry.',
    '$59.99',
    '/checkout?bundle=bundle-complete-vault-10',
    'US',
    'COMPLETE VAULT ACCESS (SAVE 70%)',
    '/assets/images/metabolic_nutrition_cover_New.png'
  ),
  (
    'bundle-complete-vault-10-es',
    'Complete 10-Guide Master Vault',
    'Protocol Bundles',
    5.00,
    'Acceso instantáneo a las 10 Guías Maestras Premium con descarga ZIP en 1 clic.',
    '59,99€',
    '/checkout?bundle=bundle-complete-vault-10',
    'ES',
    'ACCESO A LA BÓVEDA COMPLETA',
    '/assets/images/metabolic_nutrition_cover_New.png'
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
) VALUES 
  (
    'bundle-pick-3',
    'Pick Any 3 Master Guides (Custom Trio Bundle)',
    'Bundle',
    'Choose any 3 of our 10 Premium Master Guides to build your tailored longevity and healthspan protocol.',
    'Build your tailored 3-guide longevity blueprint. Saves over 50% compared to purchasing single master books. Choose any 3 titles across body composition, strength, mobility, nutrition, and autonomic sleep protocols.',
    '£29.99 / $29.99 / €29.99',
    'price_bundle_pick_3',
    '/assets/images/metabolic_nutrition_cover_New.png',
    'bundle-pick-3.zip',
    TRUE,
    ARRAY['Bundle', 'Trio', 'Custom Protocol', 'Longevity', 'Best Value'],
    ARRAY['Choose any 3 of 10 Premium Master Guides', 'High-res PDF instant downloads', 'Full lifetime protocol revisions included'],
    'Individuals seeking a customized protocol focusing on their exact biological priorities.',
    'Educational protocol materials only. Consult a physician before intensive diet or fitness changes.'
  ),
  (
    'bundle-complete-vault-10',
    'Complete 10-Guide Master Vault',
    'Bundle',
    'Instant access to all 10 Premium Master Guides — covering body composition, metabolic nutrition, autonomic engineering, women''s health, home fitness, and clinical telemetry.',
    'The complete geroscience and clinical execution vault. Contains all 10 Master Execution Books in high-res PDF with 1-click ZIP archive access.',
    '£59.99 / $59.99 / €59.99',
    'price_bundle_complete_vault_10',
    '/assets/images/metabolic_nutrition_cover_New.png',
    'all-ten-master-guides.zip',
    TRUE,
    ARRAY['Complete Vault', 'All 10 Books', 'Master Suite', 'Geroscience Archive'],
    ARRAY['All 10 Master Execution Books', '1-Click Complete ZIP Archive', 'Lifetime access to all future editions'],
    'Individuals and practitioners wanting the entire geroscience library and clinic-ready protocols.',
    'Educational protocol materials only. Consult a physician before intensive diet or fitness changes.'
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  price_display = EXCLUDED.price_display,
  image = EXCLUDED.image,
  file_name = EXCLUDED.file_name,
  tags = EXCLUDED.tags,
  included = EXCLUDED.included;

-- ============================================================================
-- 5. Upsert UK Blood Panels (Tier 1: LOLA Core Health 45 & Tier 2: LOLA Vital Check 56)
-- ============================================================================
-- Clean up legacy ambiguous ID if present
DELETE FROM public.products WHERE id = 'blood-panel-uk';

-- Tier 1: LOLA Core Health 45
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
  hub_placement_slot,
  checkout_instruction
) VALUES (
  'blood-panel-uk-core45',
  'LOLA Core Health 45',
  'Performance & Testing',
  4.98,
  'Comprehensive 45-biomarker direct-to-consumer blood panel covering cholesterol & lipid ratios, HbA1c 90-day glucose, liver, kidney, high-sensitivity CRP, vitamin D, active B12, and baseline hormones. Includes at-home venous blood draw by a certified phlebotomist and GMC doctor review.',
  'From £125.00',
  'https://referrals.lolahealth.com/NextLevel15',
  'UK',
  '45 Essential Biomarkers • UKAS Accredited',
  '/assets/images/shop/blood-panel.png',
  TRUE,
  TRUE,
  'blood_panel_slot',
  'Select ''Core Health 45'' on LOLA Health for an essential health MOT.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  rating = EXCLUDED.rating,
  description = EXCLUDED.description,
  price_text = EXCLUDED.price_text,
  deal_url = EXCLUDED.deal_url,
  market_region = EXCLUDED.market_region,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url,
  is_direct_affiliate = EXCLUDED.is_direct_affiliate,
  is_active = EXCLUDED.is_active,
  hub_placement_slot = EXCLUDED.hub_placement_slot,
  checkout_instruction = EXCLUDED.checkout_instruction,
  updated_at = NOW();

-- Tier 2: LOLA Vital Check 56 (Comprehensive Longevity Baseline)
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
  hub_placement_slot,
  checkout_instruction
) VALUES (
  'blood-panel-uk-vital56',
  'LOLA Vital Check 56 (Comprehensive Longevity Baseline)',
  'Performance & Testing',
  4.99,
  'Advanced multi-omic longevity blood panel tracking 56 essential biomarkers—including ApoB (cardiovascular plaque risk), hs-CRP (systemic inflammation), and HbA1c (glycemic variability). Includes GMC doctor review and optional home phlebotomy visit.',
  'From £155.00',
  'https://snwbl.io/out/NcealZ11',
  'UK',
  '⭐ Recommended Longevity Baseline • 56 Biomarkers',
  '/assets/images/shop/blood-panel.png',
  TRUE,
  TRUE,
  'blood_panel_slot',
  'On the LOLA Health website, select ''Vital Check 56'' and choose ''Phlebotomist for a Home Visit''.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  rating = EXCLUDED.rating,
  description = EXCLUDED.description,
  price_text = EXCLUDED.price_text,
  deal_url = EXCLUDED.deal_url,
  market_region = EXCLUDED.market_region,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url,
  is_direct_affiliate = EXCLUDED.is_direct_affiliate,
  is_active = EXCLUDED.is_active,
  hub_placement_slot = EXCLUDED.hub_placement_slot,
  checkout_instruction = EXCLUDED.checkout_instruction,
  updated_at = NOW();

-- ============================================================================
-- 6. Upsert UK Epigenetic Kit (Biological Age & Epigenetic Methylation Kit)
-- ============================================================================
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
  hub_placement_slot,
  checkout_instruction
) VALUES (
  'epigenetic-kit-uk',
  'Biological Age & Epigenetic Methylation Kit (UK 🇬🇧)',
  'Performance & Testing',
  4.93,
  'Epigenetic DNA methylation clock measuring biological pace of aging vs chronological age, DunedinPACE, and telomere length.',
  'From £375.00',
  'https://snwbl.io/out/NcealZ11',
  'UK',
  '🇬🇧 UK (LOLA/UKAS)',
  '/Products/lola-epigenetic-kit.jpg',
  TRUE,
  TRUE,
  'epigenetic_slot',
  'On the LOLA Health website, select the ''TruAge Test'' to measure your cellular biological age, rate of ageing (DunedinPACE), and telomere length.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  rating = EXCLUDED.rating,
  description = EXCLUDED.description,
  price_text = EXCLUDED.price_text,
  deal_url = EXCLUDED.deal_url,
  market_region = EXCLUDED.market_region,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url,
  is_direct_affiliate = EXCLUDED.is_direct_affiliate,
  is_active = EXCLUDED.is_active,
  hub_placement_slot = EXCLUDED.hub_placement_slot,
  checkout_instruction = EXCLUDED.checkout_instruction,
  updated_at = NOW();

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
  hub_placement_slot,
  checkout_instruction
) VALUES (
  'epigenetic-test-uk',
  'Biological Age & Epigenetic Methylation Kit (UK 🇬🇧)',
  'Performance & Testing',
  4.93,
  'Epigenetic DNA methylation clock measuring biological pace of aging vs chronological age, DunedinPACE, and telomere length.',
  'From £375.00',
  'https://snwbl.io/out/NcealZ11',
  'UK',
  '🇬🇧 UK (LOLA/UKAS)',
  '/Products/lola-epigenetic-kit.jpg',
  TRUE,
  TRUE,
  'epigenetic_slot',
  'On the LOLA Health website, select the ''TruAge Test'' to measure your cellular biological age, rate of ageing (DunedinPACE), and telomere length.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  rating = EXCLUDED.rating,
  description = EXCLUDED.description,
  price_text = EXCLUDED.price_text,
  deal_url = EXCLUDED.deal_url,
  market_region = EXCLUDED.market_region,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url,
  is_direct_affiliate = EXCLUDED.is_direct_affiliate,
  is_active = EXCLUDED.is_active,
  hub_placement_slot = EXCLUDED.hub_placement_slot,
  checkout_instruction = EXCLUDED.checkout_instruction,
  updated_at = NOW();

-- ============================================================================
-- 7. Upsert UK Urinalysis (LOLA Health UK)
-- ============================================================================
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
  hub_placement_slot,
  checkout_instruction
) VALUES (
  'urinalysis-uk',
  'Urinalysis',
  'Performance & Testing',
  4.90,
  'UKAS-certified urine panel measuring Albumin-to-Creatinine ratio (ACR), proteinuria, and kidney metabolic safety.',
  'From £65.00',
  'https://referrals.lolahealth.com/NextLevel15',
  'UK',
  '🇬🇧 UK (LOLA/UKAS)',
  '/Products/lola-urine-acr.jpg',
  TRUE,
  TRUE,
  'urinalysis_slot',
  'On the LOLA Health website, select ''Urinalysis'' for full-spectrum urine and renal screening.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  rating = EXCLUDED.rating,
  description = EXCLUDED.description,
  price_text = EXCLUDED.price_text,
  deal_url = EXCLUDED.deal_url,
  market_region = EXCLUDED.market_region,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url,
  is_direct_affiliate = EXCLUDED.is_direct_affiliate,
  is_active = EXCLUDED.is_active,
  hub_placement_slot = EXCLUDED.hub_placement_slot,
  checkout_instruction = EXCLUDED.checkout_instruction,
  updated_at = NOW();

