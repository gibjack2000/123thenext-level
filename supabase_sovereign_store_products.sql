-- ============================================================
-- 123THENEXTLEVEL: SOVEREIGN STORE PRODUCTS SCHEMA & SAFE UPSERT
-- Safe, non-destructive migration script for Supabase SQL Editor
-- Updated with verified unique ASINs for US, UK, and ES
-- ============================================================

-- 1. Ensure table exists
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  rating NUMERIC DEFAULT 4.8,
  description TEXT,
  price_text TEXT,
  deal_url TEXT,
  market_region TEXT NOT NULL,
  badge_text TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Safe RLS setup
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Allow public read access on products'
  ) THEN
    CREATE POLICY "Allow public read access on products" 
      ON public.products FOR SELECT 
      TO public 
      USING (true);
  END IF;
END $$;

-- 3. Non-destructive UPSERT of 27 regional entries (9 products x 3 regions: US, UK, ES)
INSERT INTO public.products (
  id, name, category, rating, description, price_text, deal_url, market_region, badge_text, image_url
) VALUES 
('reagent-strips-us', 'ALLTEST 10-Parameter Urinary Reagent Strips', 'Performance & Testing', 4.85, 'A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes. Zero digital screen-time.', '$14.99', 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20', 'US', 'FDA Cleared & CLIA Waived', '/assets/images/shop/reagent-strips.png'),
('reagent-strips-uk', 'ALLTEST 10-Parameter Urinary Reagent Strips', 'Performance & Testing', 4.85, 'A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes. Zero digital screen-time.', '£12.99', 'https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21', 'UK', 'MHRA Registered', '/assets/images/shop/reagent-strips.png'),
('reagent-strips-es', 'ALLTEST Tiras de Reactivos Urinarios de 10 Parámetros', 'Performance & Testing', 4.85, 'Prueba química visual de inmersión y lectura que rastrea 10 parámetros críticos en menos de 2 minutos. Cero tiempo de pantalla digital.', '14,99€', 'https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21', 'ES', 'CE 0123 Medical Marked', '/assets/images/shop/reagent-strips.png'),
('sirtuin-stack-us', 'Momentous Sirtuin Activation & Cell Recovery Stack', 'Supplements', 4.90, 'Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways.', '$89.95', 'https://livemomentous.com/modernwisdom?code=modernwisdom', 'US', 'NSF Certified for Sport', '/assets/images/shop/sirtuin-stack.png'),
('sirtuin-stack-uk', 'Momentous Sirtuin Activation & Cell Recovery Stack', 'Supplements', 4.90, 'Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways.', '£79.99', 'https://healf.co.uk/collections/momentus', 'UK', 'NSF Certified / UK Sourced (Healf)', '/assets/images/shop/sirtuin-stack.png'),
('sirtuin-stack-es', 'Paquete de Activación de Sirtuina y Recuperación Celular Momentous', 'Supplements', 4.90, 'Trans-Resveratrol, NMN y Natokinasa de alta calidad con certificación NSF para el deporte. Proporciona cofactores para activar las vías de sirtuinas.', '89,95€', 'https://newtra.eu', 'ES', 'Customs-Safe EU Delivery (Newtra)', '/assets/images/shop/sirtuin-stack.png'),
('cgm-us', 'Continuous Glucose Monitor (Abbott Lingo / Dexcom Stelo)', 'Performance & Testing', 4.75, 'Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health.', '$89.00 / month', 'https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20', 'US', 'FDA Cleared / OTC Eligible', '/assets/images/shop/cgm.png'),
('cgm-uk', 'Continuous Glucose Monitor (Abbott Lingo UK)', 'Performance & Testing', 4.75, 'Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health.', '£79.00 / month', 'https://hellolingo.co.uk', 'UK', 'MHRA Registered', '/assets/images/shop/cgm.png'),
('cgm-es', 'Monitor Continuo de Glucosa (Dexcom ONE+ / Abbott Libre)', 'Performance & Testing', 4.75, 'Monitoreo de glucosa en tiempo real que mapea picos de energía. Sincroniza datos para optimizar la nutrición metabólica.', '79,00€ / mes', 'https://www.dexcom.com/es-ES', 'ES', 'CE Marked / Pharmacy Approved', '/assets/images/shop/cgm.png'),
('blood-pressure-cuff-us', 'Withings BPM Connect Wi-Fi Cuff', 'Tech Gadgets & Wearables', 4.80, 'Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data.', '$99.95', 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20', 'US', 'FDA Cleared', '/assets/images/shop/bpm-connect.png'),
('blood-pressure-cuff-uk', 'Withings BPM Connect Wi-Fi Cuff', 'Tech Gadgets & Wearables', 4.80, 'Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data.', '£89.99', 'https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21', 'UK', 'CE Medical Class IIa', '/assets/images/shop/bpm-connect.png'),
('blood-pressure-cuff-es', 'Withings BPM Connect Tensiómetro Inteligente', 'Tech Gadgets & Wearables', 4.80, 'Tensiómetro inteligente Wi-Fi. Registra automáticamente las tendencias cardiovasculares en su panel de control privado.', '99,95€', 'https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21', 'ES', 'CE Medical Class IIa', '/assets/images/shop/bpm-connect.png'),
('stethoscope-us', 'Eko CORE 500™ Digital AI Stethoscope', 'Performance & Testing', 4.95, 'FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds.', '$429.00', 'https://www.ekohealth.com/products/core-500-digital-stethoscope', 'US', 'FDA Cleared AI Auscultation', '/assets/images/shop/core-500.png'),
('stethoscope-uk', 'Eko CORE 500™ Digital AI Stethoscope', 'Performance & Testing', 4.95, 'FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds.', '£379.00', 'https://www.ekohealth.com/products/core-500-digital-stethoscope', 'UK', 'MHRA Registered', '/assets/images/shop/core-500.png'),
('stethoscope-es', 'Estetoscopio Digital con IA Eko CORE 500™', 'Performance & Testing', 4.95, 'Estetoscopio electrónico con ECG de 3 derivaciones. Utiliza IA clínica para evaluar soplos cardíacos y arritmias en 15 seconds.', '429,00€', 'https://www.doccheck.com/es/', 'ES', 'CE Marked Clinical Device', '/assets/images/shop/core-500.png'),
('sleep-analyzer-us', 'Withings Sleep Analyzer Under-Mattress Pad', 'Tech Gadgets & Wearables', 4.82, 'A contact-free ballistocardiography mat placed under the mattress. Logs sleeping heart rate, sleep cycles, and passive breathing disturbances.', '$129.95', 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20', 'US', 'Touch-Free Sleep Science', '/assets/images/shop/sleep-analyzer.png'),
('sleep-analyzer-uk', 'Withings Medically Validated Sleep Analyzer', 'Tech Gadgets & Wearables', 4.82, 'A contact-free ballistocardiography mat placed under the mattress. Logs sleeping heart rate, sleep cycles, and medically validated Sleep Apnea episodes.', '£119.99', 'https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21', 'UK', 'CE Medically Validated (Apnea)', '/assets/images/shop/sleep-analyzer.png'),
('sleep-analyzer-es', 'Withings Analizador de Sueño de Contacto Cero', 'Tech Gadgets & Wearables', 4.82, 'Alfombrilla neumática bajo el colchón. Registra el ritmo cardíaco nocturno y detecta la apnea obstructiva del sueño con validación médica CE.', '129,95€', 'https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21', 'ES', 'CE Medically Validated (Apnea)', '/assets/images/shop/sleep-analyzer.png'),
('segmental-scale-us', 'Withings Body Scan Segmental Composition Scale', 'Tech Gadgets & Wearables', 4.88, 'FDA-cleared 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index.', '$399.95', 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20', 'US', 'FDA Cleared', '/assets/images/shop/body-scan.png'),
('segmental-scale-uk', 'Withings Body Scan Segmental Composition Scale', 'Tech Gadgets & Wearables', 4.88, 'CE Medical-marked 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index.', '£349.99', 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21', 'UK', 'CE Medical Marked', '/assets/images/shop/body-scan.png'),
('segmental-scale-es', 'Báscula de Composición Segmentaria Withings Body Scan', 'Tech Gadgets & Wearables', 4.88, 'Báscula médica de impedancia con 8 electrodos. Mapea la masa muscular y el índice de grasa visceral para guiar los ciclos metabólicos.', '399,95€', 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21', 'ES', 'CE Medical Marked', '/assets/images/shop/body-scan.png'),
('wearable-tracker-us', 'Apple Watch Series 10 (GPS 46mm)', 'Tech Gadgets & Wearables', 4.80, 'Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and Heart Rate Variability (HRV).', '$399.00', 'https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20', 'US', 'FDA Approved Heart Notifications', '/assets/images/shop/apple-watch.png'),
('wearable-tracker-uk', 'Apple Watch Series 10 (GPS 46mm)', 'Tech Gadgets & Wearables', 4.80, 'Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and Heart Rate Variability (HRV).', '£379.00', 'https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21', 'UK', 'MHRA Certified Telemetry', '/assets/images/shop/apple-watch.png'),
('wearable-tracker-es', 'Apple Watch Series 10 (GPS 46mm)', 'Tech Gadgets & Wearables', 4.80, 'Reloj inteligente avanzado con sensores multiespectrales para monitorizar la variabilidad de la frecuencia cardíaca nocturna (HRV).', '399,00€', 'https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21', 'ES', 'CE Compliant Biometrics', '/assets/images/shop/apple-watch.png'),
('blood-panel-us', 'Personalized Cellular Biomarker Map (56 Biomarkers)', 'Performance & Testing', 4.92, 'Direct-to-consumer longevity blood panels mapping 56 essential biomarkers. Draws completed at local Quest or Labcorp patient centers.', '$299.00', 'https://www.healthlabs.com/?affiliate=123znl', 'US', 'CLIA Certified & CAP Accredited', '/assets/images/shop/blood-panel.png'),
('blood-panel-uk', 'Lola Vital Check 56 (Baseline Longevity Blood Map)', 'Performance & Testing', 4.98, 'Advanced, direct-to-consumer longevity blood panel analyzing 56 primary biomarkers including ApoB, hs-CRP, and HbA1c.', '£149.00', 'https://snwbl.io/out/NcealZ11', 'UK', 'UKAS Accredited & ISO 9001 Certified', '/assets/images/shop/blood-panel.png'),
('blood-panel-es', 'Mapa de Biomarcadores Celulares Melio (56 Biomarcadores)', 'Performance & Testing', 4.92, 'Análisis de sangre integral que cubre 56 biomarcadores metabólicos y cardiovasculares. Extracción privada en centros colaboradores de España.', '149,00€', 'https://www.melio.es', 'ES', 'CE Marked & Megalab/Unilabs Certified Partner', '/assets/images/shop/blood-panel.png')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  rating = EXCLUDED.rating,
  description = EXCLUDED.description,
  price_text = EXCLUDED.price_text,
  deal_url = EXCLUDED.deal_url,
  market_region = EXCLUDED.market_region,
  badge_text = EXCLUDED.badge_text,
  image_url = EXCLUDED.image_url;

-- ============================================================
-- 4. ALIGN CATEGORIES TO EXISTING FRONTEND TABS (For existing DB rows)
-- ============================================================
-- 1. Tech Gadgets & Wearables
UPDATE public.products SET category = 'Tech Gadgets & Wearables' 
WHERE id IN (
  'blood-pressure-cuff-us', 'blood-pressure-cuff-uk', 'blood-pressure-cuff-es',
  'sleep-analyzer-us', 'sleep-analyzer-uk', 'sleep-analyzer-es',
  'segmental-scale-us', 'segmental-scale-uk', 'segmental-scale-es',
  'wearable-tracker-us', 'wearable-tracker-uk', 'wearable-tracker-es'
);

-- 2. Performance & Testing
UPDATE public.products SET category = 'Performance & Testing' 
WHERE id IN (
  'cgm-us', 'cgm-uk', 'cgm-es',
  'stethoscope-us', 'stethoscope-uk', 'stethoscope-es',
  'blood-panel-us', 'blood-panel-uk', 'blood-panel-es',
  'reagent-strips-us', 'reagent-strips-uk', 'reagent-strips-es'
);

-- 3. Supplements
UPDATE public.products SET category = 'Supplements' 
WHERE id IN (
  'sirtuin-stack-us', 'sirtuin-stack-uk', 'sirtuin-stack-es'
);
