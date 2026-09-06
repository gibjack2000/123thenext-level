-- =========================================================================
-- 123THENEXTLEVEL: SOVEREIGN STORE PRODUCTS SCHEMA & SAFE UPSERT MIGRATION
-- Safe, additive migration script for Supabase SQL Editor
-- Project ID: seoaictzhmqdwnkfymxt
-- =========================================================================

-- 1. ADD NEW ADMINISTRATIVE & DISPATCH COLUMNS SAFELY
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_direct_affiliate BOOLEAN DEFAULT FALSE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS hub_placement_slot TEXT DEFAULT NULL;

-- 2. RESET DYNAMIC CATEGORIES FOR EXISTING ENTRIES
UPDATE public.products SET category = 'Performance & Testing' WHERE id LIKE '%reagent%';

-- 3. ADD AND UPDATE ALL 16 PRODUCTS ACROSS US, UK, & ES (48 ROWS TOTAL)
INSERT INTO public.products (
  id, name, category, rating, description, price_text, deal_url, market_region, badge_text, image_url, is_direct_affiliate, hub_placement_slot
) VALUES 
-- ALLTEST Reagent Strips
('reagent-strips-us', 'ALLTEST 10-Parameter Urinary Reagent Strips', 'Performance & Testing', 4.85, 'A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes.', '$14.99', 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20', 'US', 'FDA Cleared & CLIA Waived', '/assets/images/shop/reagent-strips.png', FALSE, NULL),
('reagent-strips-uk', 'ALLTEST 10-Parameter Urinary Reagent Strips', 'Performance & Testing', 4.85, 'A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes.', '£12.99', 'https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21', 'UK', 'MHRA Registered', '/assets/images/shop/reagent-strips.png', FALSE, NULL),
('reagent-strips-es', 'ALLTEST 10-Parameter Urinary Reagent Strips', 'Performance & Testing', 4.85, 'A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes.', '14,99€', 'https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21', 'ES', 'CE 0123 Medical Marked', '/assets/images/shop/reagent-strips.png', FALSE, NULL),

-- Blood Panels
('blood-panel-us', 'Personalized Cellular Biomarker Map (56 Biomarkers)', 'Performance & Testing', 4.95, 'Direct-to-consumer longevity blood panels mapping 56 essential biomarkers via local Quest or Labcorp centers.', '$299.00', 'https://www.healthlabs.com/?affiliate=123znl', 'US', 'CLIA Certified & CAP Accredited', '/assets/images/shop/blood-panel.png', TRUE, 'blood_panel_slot'),
('blood-panel-uk', 'Personalized Cellular Biomarker Map (56 Biomarkers)', 'Performance & Testing', 4.95, 'Direct-to-consumer longevity blood panels mapping 56 essential biomarkers via partner UK lab centers.', '£149.00', 'https://snwbl.io/out/NcealZ11', 'UK', 'UKAS Accredited & ISO Certified', '/assets/images/shop/blood-panel.png', TRUE, 'blood_panel_slot'),
('blood-panel-es', 'Personalized Cellular Biomarker Map (56 Biomarkers)', 'Performance & Testing', 4.95, 'Direct-to-consumer longevity blood panels mapping 56 essential biomarkers via partner ES lab centers.', '149,00€', 'https://www.melio.es', 'ES', 'CE Marked & Megalab Certified Partner', '/assets/images/shop/blood-panel.png', TRUE, 'blood_panel_slot'),

-- CGM
('cgm-us', 'Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)', 'Tech Gadgets & Wearables', 4.80, 'Real-time interstitial glucose tracking mapping energy peaks and valleys.', '$89.00/mo', 'https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20', 'US', 'FDA Cleared / OTC Eligible', '/assets/images/shop/cgm.png', TRUE, 'cgm_slot'),
('cgm-uk', 'Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)', 'Tech Gadgets & Wearables', 4.80, 'Real-time interstitial glucose tracking mapping energy peaks and valleys.', '£79.00/mo', 'https://hellolingo.co.uk', 'UK', 'MHRA Registered', '/assets/images/shop/cgm.png', TRUE, 'cgm_slot'),
('cgm-es', 'Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)', 'Tech Gadgets & Wearables', 4.80, 'Real-time interstitial glucose tracking mapping energy peaks and valleys.', '79,00€/mo', 'https://www.dexcom.com/es-ES', 'ES', 'CE Marked / Pharmacy Approved', '/assets/images/shop/cgm.png', TRUE, 'cgm_slot'),

-- Withings BPM Connect
('blood-pressure-cuff-us', 'Withings BPM Connect Wi-Fi Cuff', 'Tech Gadgets & Wearables', 4.80, 'Smart Wi-Fi blood pressure cuff automatically logging systolic and diastolic trends.', '$99.95', 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20', 'US', 'FDA Cleared', '/assets/images/shop/bpm-connect.png', FALSE, NULL),
('blood-pressure-cuff-uk', 'Withings BPM Connect Wi-Fi Cuff', 'Tech Gadgets & Wearables', 4.80, 'Smart Wi-Fi blood pressure cuff automatically logging systolic and diastolic trends.', '£89.99', 'https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21', 'UK', 'CE Medical Class IIa', '/assets/images/shop/bpm-connect.png', FALSE, NULL),
('blood-pressure-cuff-es', 'Withings BPM Connect Wi-Fi Cuff', 'Tech Gadgets & Wearables', 4.80, 'Smart Wi-Fi blood pressure cuff automatically logging systolic and diastolic trends.', '99,95€', 'https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21', 'ES', 'CE Medical Class IIa', '/assets/images/shop/bpm-connect.png', FALSE, NULL),

-- Withings Sleep
('sleep-analyzer-us', 'Withings Sleep Analyzer Under-Mattress Pad', 'Tech Gadgets & Wearables', 4.82, 'A contact-free sleep tracker placed under your mattress.', '$129.95', 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20', 'US', 'Touch-Free Sleep Science', '/assets/images/shop/sleep-analyzer.png', FALSE, NULL),
('sleep-analyzer-uk', 'Withings Sleep Analyzer Under-Mattress Pad', 'Tech Gadgets & Wearables', 4.82, 'A contact-free sleep tracker placed under your mattress.', '£119.99', 'https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21', 'UK', 'CE Medically Validated (Apnea)', '/assets/images/shop/sleep-analyzer.png', FALSE, NULL),
('sleep-analyzer-es', 'Withings Sleep Analyzer Under-Mattress Pad', 'Tech Gadgets & Wearables', 4.82, 'A contact-free sleep tracker placed under your mattress.', '129,95€', 'https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21', 'ES', 'CE Medically Validated (Apnea)', '/assets/images/shop/sleep-analyzer.png', FALSE, NULL),

-- Withings Body Scan Scale
('segmental-scale-us', 'Withings Body Scan Segmental Composition Scale', 'Tech Gadgets & Wearables', 4.88, 'FDA-cleared 8-electrode bioelectrical impedance scale segmentally mapping skeletal muscle mass and fat.', '$399.95', 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20', 'US', 'FDA Cleared', '/assets/images/shop/body-scan.png', FALSE, NULL),
('segmental-scale-uk', 'Withings Body Scan Segmental Composition Scale', 'Tech Gadgets & Wearables', 4.88, 'FDA-cleared 8-electrode bioelectrical impedance scale segmentally mapping skeletal muscle mass and fat.', '£349.99', 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21', 'UK', 'CE Medical Marked', '/assets/images/shop/body-scan.png', FALSE, NULL),
('segmental-scale-es', 'Withings Body Scan Segmental Composition Scale', 'Tech Gadgets & Wearables', 4.88, 'FDA-cleared 8-electrode bioelectrical impedance scale segmentally mapping skeletal muscle mass and fat.', '399,95€', 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21', 'ES', 'CE Medical Marked', '/assets/images/shop/body-scan.png', FALSE, NULL),

-- Apple Watch 10
('wearable-tracker-us', 'Apple Watch Series 10 (GPS 46mm)', 'Tech Gadgets & Wearables', 4.80, 'Advanced multispectral wearable capturing sleep apnea and HRV.', '$399.00', 'https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20', 'US', 'FDA Approved Heart Notifications', '/assets/images/shop/apple-watch.png', FALSE, 'primary_wearable_slot'),
('wearable-tracker-uk', 'Apple Watch Series 10 (GPS 46mm)', 'Tech Gadgets & Wearables', 4.80, 'Advanced multispectral wearable capturing sleep apnea and HRV.', '£379.00', 'https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21', 'UK', 'MHRA Certified Telemetry', '/assets/images/shop/apple-watch.png', FALSE, 'primary_wearable_slot'),
('wearable-tracker-es', 'Apple Watch Series 10 (GPS 46mm)', 'Tech Gadgets & Wearables', 4.80, 'Advanced multispectral wearable capturing sleep apnea and HRV.', '399,00€', 'https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21', 'ES', 'CE Compliant Biometrics', '/assets/images/shop/apple-watch.png', FALSE, 'primary_wearable_slot'),

-- Eko Stethoscope
('stethoscope-us', 'Eko CORE 500™ Digital AI Stethoscope', 'Performance & Testing', 4.95, 'FDA-cleared electronic stethoscope with 3-lead ECG.', '$429.00', 'https://www.ekohealth.com/products/core-500-digital-stethoscope', 'US', 'FDA Cleared AI Auscultation', '/assets/images/shop/core-500.png', TRUE, NULL),
('stethoscope-uk', 'Eko CORE 500™ Digital AI Stethoscope', 'Performance & Testing', 4.95, 'FDA-cleared electronic stethoscope with 3-lead ECG.', '£379.00', 'https://www.ekohealth.com/products/core-500-digital-stethoscope', 'UK', 'MHRA Registered', '/assets/images/shop/core-500.png', TRUE, NULL),
('stethoscope-es', 'Eko CORE 500™ Digital AI Stethoscope', 'Performance & Testing', 4.95, 'FDA-cleared electronic stethoscope with 3-lead ECG.', '429,00€', 'https://www.doccheck.com/es/', 'ES', 'CE Marked Clinical Device', '/assets/images/shop/core-500.png', TRUE, NULL),

-- Momentous Supplements
('sirtuin-stack-us', 'Momentous Sirtuin Activation Stack', 'Supplements', 4.90, 'Premium NSF Certified for Sport cellular recovery supplements.', '$89.95', 'https://livemomentous.com/modernwisdom?code=modernwisdom', 'US', 'NSF Certified for Sport', '/assets/images/shop/sirtuin-stack.png', TRUE, 'supplement_slot'),
('sirtuin-stack-uk', 'Momentous Sirtuin Activation Stack', 'Supplements', 4.90, 'Premium NSF Certified for Sport cellular recovery supplements.', '£79.99', 'https://healf.co.uk/collections/momentus', 'UK', 'NSF Certified / UK Sourced', '/assets/images/shop/sirtuin-stack.png', TRUE, 'supplement_slot'),
('sirtuin-stack-es', 'Momentous Sirtuin Activation Stack', 'Supplements', 4.90, 'Premium NSF Certified for Sport cellular recovery supplements.', '89,95€', 'https://newtra.eu', 'ES', 'Customs-Safe EU Delivery', '/assets/images/shop/sirtuin-stack.png', TRUE, 'supplement_slot'),

-- Sony Headphones
('noise-headphones-us', 'Sony WH-CH720N Noise-Canceling Headphones', 'Lifestyle & Performance Gear', 4.90, 'Active noise cancellation to isolate auditory environments for mindfulness.', '$149.99', 'https://www.amazon.com/dp/B0BTY3Y6PP?tag=123znl0e-20', 'US', 'Ultra-Lightweight Comfort', '/assets/images/shop/sony-headphones.png', FALSE, 'vagal_recovery_slot'),
('noise-headphones-uk', 'Sony WH-CH720N Noise-Canceling Headphones', 'Lifestyle & Performance Gear', 4.90, 'Active noise cancellation to isolate auditory environments for mindfulness.', '£119.00', 'https://www.amazon.co.uk/dp/B0BTY3Y6PP?tag=123znl0f3-21', 'UK', '35-Hour Battery Life', '/assets/images/shop/sony-headphones.png', FALSE, 'vagal_recovery_slot'),
('noise-headphones-es', 'Sony WH-CH720N Noise-Canceling Headphones', 'Lifestyle & Performance Gear', 4.90, 'Active noise cancellation to isolate auditory environments for mindfulness.', '129,00€', 'https://www.amazon.es/dp/B0BTY3Y6PP?tag=123znl08a-21', 'ES', 'Cancelación Activa de Ruido', '/assets/images/shop/sony-headphones.png', FALSE, 'vagal_recovery_slot'),

-- Meditation Cushion
('meditation-cushion-us', 'basaho Classic Zafu Meditation Cushion', 'Lifestyle & Performance Gear', 4.85, 'Organic cotton zafu cushion to support posture and vagal reset.', '$35.00', 'https://www.amazon.com/dp/B01697W160?tag=123znl0e-20', 'US', 'Organic Cotton Certified', '/assets/images/shop/meditation-cushion.png', FALSE, NULL),
('meditation-cushion-uk', 'basaho Classic Zafu Meditation Cushion', 'Lifestyle & Performance Gear', 4.85, 'Organic cotton zafu cushion to support posture and vagal reset.', '£29.99', 'https://www.amazon.co.uk/dp/B01697W160?tag=123znl0f3-21', 'UK', 'Buckwheat Filled Premium', '/assets/images/shop/meditation-cushion.png', FALSE, NULL),
('meditation-cushion-es', 'basaho Classic Zafu Meditation Cushion', 'Lifestyle & Performance Gear', 4.85, 'Organic cotton zafu cushion to support posture and vagal reset.', '34,99€', 'https://www.amazon.es/dp/B01697W160?tag=123znl08a-21', 'ES', 'Algodón Orgánico Certificado', '/assets/images/shop/meditation-cushion.png', FALSE, NULL),

-- Marine Collagen
('marine-collagen-us', 'Zebora Marine Collagen Peptides Powder', 'Lifestyle & Performance Gear', 4.75, 'Type I & III hydrolyzed marine collagen with biotin.', '$28.99', 'https://www.amazon.com/dp/B07T8H5N1M?tag=123znl0e-20', 'US', 'Non-GMO & Gluten-Free', '/assets/images/shop/marine-collagen.png', FALSE, NULL),
('marine-collagen-uk', 'Zebora Marine Collagen Peptides Powder', 'Lifestyle & Performance Gear', 4.75, 'Type I & III hydrolyzed marine collagen with biotin.', '£24.99', 'https://www.amazon.co.uk/dp/B07T8H5N1M?tag=123znl0f3-21', 'UK', 'Wild-Caught Sourced', '/assets/images/shop/marine-collagen.png', FALSE, NULL),
('marine-collagen-es', 'Zebora Marine Collagen Peptides Powder', 'Lifestyle & Performance Gear', 4.75, 'Type I & III hydrolyzed marine collagen with biotin.', '27,99€', 'https://www.amazon.es/dp/B07T8H5N1M?tag=123znl08a-21', 'ES', 'Péptidos de Colágeno Hidrolizado', '/assets/images/shop/marine-collagen.png', FALSE, NULL),

-- Owala Bottle
('water-bottle-us', 'Owala FreeSip Insulated Water Bottle', 'Lifestyle & Performance Gear', 4.90, 'Insulated water bottle with patented FreeSip straw.', '$27.99', 'https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20', 'US', 'Leak-Proof Double Wall', '/assets/images/shop/water-bottle.png', FALSE, NULL),
('water-bottle-uk', 'Owala FreeSip Insulated Water Bottle', 'Lifestyle & Performance Gear', 4.90, 'Insulated water bottle with patented FreeSip straw.', '£22.99', 'https://www.amazon.co.uk/dp/B08524B5C6?tag=123znl0f3-21', 'UK', 'Leak-Proof Double Wall', '/assets/images/shop/water-bottle.png', FALSE, NULL),
('water-bottle-es', 'Owala FreeSip Insulated Water Bottle', 'Lifestyle & Performance Gear', 4.90, 'Insulated water bottle with patented FreeSip straw.', '26,99€', 'https://www.amazon.es/dp/B08524B5C6?tag=123znl08a-21', 'ES', 'Aislamiento de Doble Pared', '/assets/images/shop/water-bottle.png', FALSE, NULL),

-- Rower
('rowing-machine-us', 'Concept2 Remo Indoor Model D Rower', 'Performance & Testing', 4.95, 'Gold standard rowing machine with PM5 monitor.', '$990.00', 'https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20', 'US', 'Clinical Standard PM5 Monitor', '/assets/images/shop/rower.png', FALSE, NULL),
('rowing-machine-uk', 'Concept2 Remo Indoor Model D Rower', 'Performance & Testing', 4.95, 'Gold standard rowing machine with PM5 monitor.', '£850.00', 'https://www.amazon.co.uk/dp/B099KBD9X8?tag=123znl0f3-21', 'UK', 'Clinical Standard PM5 Monitor', '/assets/images/shop/rower.png', FALSE, NULL),
('rowing-machine-es', 'Concept2 Remo Indoor Model D Rower', 'Performance & Testing', 4.95, 'Gold standard rowing machine with PM5 monitor.', '950,00€', 'https://www.amazon.es/dp/B099KBD9X8?tag=123znl08a-21', 'ES', 'Monitor PM5 Estándar', '/assets/images/shop/rower.png', FALSE, NULL),

-- Sauna
('sauna-tent-us', 'Portable Full-Body Infrared Sauna Tent', 'Lifestyle & Performance Gear', 4.80, 'Far-infrared full-body home heating cabin to accelerate autonomic recovery.', '$249.00', 'https://www.amazon.com/dp/B08H23V7S5?tag=123znl0e-20', 'US', 'Low EMF Carbon Panels', '/assets/images/shop/sauna.png', FALSE, NULL),
('sauna-tent-uk', 'Portable Full-Body Infrared Sauna Tent', 'Lifestyle & Performance Gear', 4.80, 'Far-infrared full-body home heating cabin to accelerate autonomic recovery.', '£199.99', 'https://www.amazon.co.uk/dp/B08H23V7S5?tag=123znl0f3-21', 'UK', 'Low EMF Carbon Panels', '/assets/images/shop/sauna.png', FALSE, NULL),
('sauna-tent-es', 'Portable Full-Body Infrared Sauna Tent', 'Lifestyle & Performance Gear', 4.80, 'Far-infrared full-body home heating cabin to accelerate autonomic recovery.', '229,00€', 'https://www.amazon.es/dp/B08H23V7S5?tag=123znl08a-21', 'ES', 'Paneles de Carbono de Bajo EMF', '/assets/images/shop/sauna.png', FALSE, NULL),

-- Ovarian Test Kit
('ovarian-test-us', 'Ovarian Reserve Female Hormone Test Kit', 'Performance & Testing', 4.85, 'Biology-specific endocrine screen for performance tracking.', '$49.00', 'https://www.amazon.com/dp/B08H7V69F7?tag=123znl0e-20', 'US', 'CLIA Certified Labs', '/assets/images/shop/ovarian-test.png', FALSE, 'epigenetic_slot'),
('ovarian-test-uk', 'Ovarian Reserve Female Hormone Test Kit', 'Performance & Testing', 4.85, 'Biology-specific endocrine screen for performance tracking.', '£39.00', 'https://www.amazon.co.uk/dp/B08H7V69F7?tag=123znl0f3-21', 'UK', 'UKAS Accredited Labs', '/assets/images/shop/ovarian-test.png', FALSE, 'epigenetic_slot'),
('ovarian-test-es', 'Ovarian Reserve Female Hormone Test Kit', 'Performance & Testing', 4.85, 'Biology-specific endocrine screen for performance tracking.', '45,00€', 'https://www.amazon.es/dp/B08H7V69F7?tag=123znl08a-21', 'ES', 'Laboratorios Acreditados UE', '/assets/images/shop/ovarian-test.png', FALSE, 'epigenetic_slot')

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
  hub_placement_slot = EXCLUDED.hub_placement_slot;
