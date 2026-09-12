import { useState, useEffect } from 'react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { useMarket, Market } from '../contexts/MarketContext';

export interface ProductDb {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  price_text: string;
  deal_url: string;
  market_region: 'US' | 'UK' | 'ES' | string;
  badge_text: string;
  image_url: string;
}

// In-memory cache of products across the application lifecycle
const productCache = new Map<string, ProductDb>();
let allProductsPromise: Promise<ProductDb[]> | null = null;
let isCacheHydrated = false;

// Fallback flagship products for instant initial render or offline resilience
const FALLBACK_FLAGSHIP_PRODUCTS: ProductDb[] = [
  {
    id: 'reagent-strips-us',
    name: 'ALLTEST 10-Parameter Urinary Reagent Strips',
    category: 'Performance & Testing',
    rating: 4.85,
    description: 'A visual, dip-and-read chemical test tracking 10 critical parameters (Glucose, Ketones, Specific Gravity, Blood, pH, Protein, Nitrite, Bilirubin, Urobilinogen, Leucocytes) in under 2 minutes.',
    price_text: '$14.99',
    deal_url: 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20',
    market_region: 'US',
    badge_text: 'FDA Cleared & CLIA Waived',
    image_url: 'https://123thenextlevel.com/assets/images/shop/reagent-strips.png'
  },
  {
    id: 'reagent-strips-uk',
    name: 'ALLTEST 10-Parameter Urinary Reagent Strips',
    category: 'Performance & Testing',
    rating: 4.85,
    description: 'A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes. Zero digital screen-time.',
    price_text: '£12.99',
    deal_url: 'https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'MHRA Registered',
    image_url: 'https://123thenextlevel.com/assets/images/shop/reagent-strips.png'
  },
  {
    id: 'reagent-strips-es',
    name: 'Tiras Reactivas Urinarias de 10 Parámetros ALLTEST',
    category: 'Performance & Testing',
    rating: 4.85,
    description: 'Prueba química visual de inmersión y lectura que evalúa 10 parámetros críticos en menos de 2 minutos.',
    price_text: '14,99€',
    deal_url: 'https://www.amazon.es/dp/B0DJM3KV8X?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'Marcado CE Conformidad Médica',
    image_url: 'https://123thenextlevel.com/assets/images/shop/reagent-strips.png'
  },
  {
    id: 'sleep-analyzer-us',
    name: 'Withings Sleep Analyzer Under-Mattress Pad',
    category: 'Tech Gadgets & Wearables',
    rating: 4.82,
    description: 'A contact-free ballistocardiography mat placed under the mattress. Logs sleeping heart rate, sleep cycles, snoring, and passive breathing disturbances.',
    price_text: '$129.95',
    deal_url: 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20',
    market_region: 'US',
    badge_text: 'Touch-Free Sleep Science',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png'
  },
  {
    id: 'sleep-analyzer-uk',
    name: 'Withings Medically Validated Sleep Analyzer',
    category: 'Tech Gadgets & Wearables',
    rating: 4.82,
    description: 'A contact-free ballistocardiography mat placed under the mattress. Logs sleeping heart rate, sleep cycles, snoring, and medically validated Sleep Apnea episodes.',
    price_text: '£119.99',
    deal_url: 'https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'CE Medically Validated (Apnea)',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png'
  },
  {
    id: 'sleep-analyzer-es',
    name: 'Analizador de Sueño Withings para Debajo del Colchón',
    category: 'Tech Gadgets & Wearables',
    rating: 4.82,
    description: 'Colchoneta de balistocardiografía sin contacto que registra frecuencia cardíaca, ciclos de sueño y apneas.',
    price_text: '129,95€',
    deal_url: 'https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'CE Validación Médica',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png'
  },
  {
    id: 'cgm-us',
    name: 'Continuous Glucose Monitor (Abbott FreeStyle Libre 3 Plus / Dexcom)',
    category: 'Performance & Testing',
    rating: 4.9,
    description: 'Real-time interstitial glucose telemetry updating every 60 seconds directly to your smartphone.',
    price_text: '$89.00 / month',
    deal_url: 'https://www.freestyle.abbott/us-en/home.html',
    market_region: 'US',
    badge_text: 'FDA Cleared Continuous Biosensor',
    image_url: 'https://123thenextlevel.com/assets/images/shop/cgm.png'
  },
  {
    id: 'cgm-uk',
    name: 'Continuous Glucose Monitor (Abbott Lingo UK)',
    category: 'Performance & Testing',
    rating: 4.9,
    description: 'Continuous metabolic glucose biosensor mapping dynamic insulin sensitivity and carbohydrate tolerance.',
    price_text: '£79.00 / month',
    deal_url: 'https://hellolingo.co.uk',
    market_region: 'UK',
    badge_text: 'MHRA Registered',
    image_url: 'https://123thenextlevel.com/assets/images/shop/cgm.png'
  },
  {
    id: 'cgm-es',
    name: 'Monitor Continuo de Glucosa (Abbott Lingo / Libre)',
    category: 'Performance & Testing',
    rating: 4.9,
    description: 'Biosensor metabólico continuo que registra la glucosa intersticial en tiempo real para optimizar la longevidad.',
    price_text: '79,00€ / mes',
    deal_url: 'https://www.freestyle.abbott/es-es/home.html',
    market_region: 'ES',
    badge_text: 'Marcado CE Sanitario',
    image_url: 'https://123thenextlevel.com/assets/images/shop/cgm.png'
  },
  {
    id: 'segmental-scale-us',
    name: 'Withings Body Scan Segmental Composition Scale',
    category: 'Tech Gadgets & Wearables',
    rating: 4.88,
    description: '6-lead ECG and segmental body impedance scale measuring torso, arm, and leg visceral fat and vascular age.',
    price_text: '$399.95',
    deal_url: 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
    market_region: 'US',
    badge_text: 'FDA Cleared',
    image_url: 'https://123thenextlevel.com/assets/images/shop/body-scan.png'
  },
  {
    id: 'segmental-scale-uk',
    name: 'Withings Body Scan Segmental Composition Scale',
    category: 'Tech Gadgets & Wearables',
    rating: 4.88,
    description: '6-lead ECG and segmental body impedance scale measuring torso, arm, and leg visceral fat and vascular age.',
    price_text: '£349.99',
    deal_url: 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'CE Medical Marked',
    image_url: 'https://123thenextlevel.com/assets/images/shop/body-scan.png'
  },
  {
    id: 'segmental-scale-es',
    name: 'Báscula Segmental Withings Body Scan',
    category: 'Tech Gadgets & Wearables',
    rating: 4.88,
    description: 'Báscula médica de impedancia segmental con ECG de 6 derivaciones y evaluación de salud vascular.',
    price_text: '399,95€',
    deal_url: 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'Certificación Médica CE',
    image_url: 'https://123thenextlevel.com/assets/images/shop/body-scan.png'
  },
  {
    id: 'sirtuin-stack-us',
    name: 'Momentous Sirtuin Activation & Cell Recovery Stack',
    category: 'Nutrition & Supplements',
    rating: 4.92,
    description: 'Clinically pure longevity stack featuring pharmaceutical-grade Resveratrol, NMN/NAD+ precursors, and Apigenin.',
    price_text: '$89.95',
    deal_url: 'https://livemomentous.com/modernwisdom?code=modernwisdom',
    market_region: 'US',
    badge_text: 'NSF Certified for Sport',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png'
  },
  {
    id: 'sirtuin-stack-uk',
    name: 'Momentous Sirtuin Activation & Cell Recovery Stack',
    category: 'Nutrition & Supplements',
    rating: 4.92,
    description: 'Clinically pure longevity stack featuring pharmaceutical-grade Resveratrol, NMN/NAD+ precursors, and Apigenin.',
    price_text: '£79.99',
    deal_url: 'https://healf.co.uk/collections/momentus',
    market_region: 'UK',
    badge_text: 'NSF Certified / UK Sourced (Healf)',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png'
  },
  {
    id: 'sirtuin-stack-es',
    name: 'Paquete de Activación de Sirtuina y Recuperación Celular Momentous',
    category: 'Nutrition & Supplements',
    rating: 4.92,
    description: 'Stack de longevidad celular de máxima pureza con Resveratrol, precursores NAD+ y Apigenina.',
    price_text: '89,95€',
    deal_url: 'https://newtra.eu',
    market_region: 'ES',
    badge_text: 'Customs-Safe EU Delivery (Newtra)',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png'
  },
  {
    id: 'stethoscope-us',
    name: 'Eko CORE 500™ Digital AI Stethoscope',
    category: 'Performance & Testing',
    rating: 4.95,
    description: 'FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs.',
    price_text: '$429.00',
    deal_url: 'https://www.ekohealth.com/products/core-500-digital-stethoscope',
    market_region: 'US',
    badge_text: 'FDA Cleared AI Auscultation',
    image_url: 'https://123thenextlevel.com/assets/images/shop/core-500.png'
  },
  {
    id: 'stethoscope-uk',
    name: 'Eko CORE 500™ Digital AI Stethoscope',
    category: 'Performance & Testing',
    rating: 4.95,
    description: 'FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs.',
    price_text: '£379.00',
    deal_url: 'https://www.ekohealth.com/products/core-500-digital-stethoscope',
    market_region: 'UK',
    badge_text: 'MHRA Registered',
    image_url: 'https://123thenextlevel.com/assets/images/shop/core-500.png'
  },
  {
    id: 'stethoscope-es',
    name: 'Estetoscopio Digital con IA Eko CORE 500™',
    category: 'Performance & Testing',
    rating: 4.95,
    description: 'Estetoscopio electrónico con ECG de 3 derivaciones e IA clínica para detección temprana de arritmias y soplos.',
    price_text: '429,00€',
    deal_url: 'https://www.doccheck.com/es/',
    market_region: 'ES',
    badge_text: 'CE Marked Clinical Device',
    image_url: 'https://123thenextlevel.com/assets/images/shop/core-500.png'
  },
  {
    id: 'wearable-tracker-us',
    name: 'Apple Watch Series 10 (GPS 46mm)',
    category: 'Tech Gadgets & Wearables',
    rating: 4.80,
    description: 'Advanced multispectral wrist wearable capturing sleeping heart rate, sleep apnea notifications, and autonomic HRV.',
    price_text: '$399.00',
    deal_url: 'https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20',
    market_region: 'US',
    badge_text: 'FDA Approved Heart Notifications',
    image_url: 'https://123thenextlevel.com/assets/images/shop/apple-watch.png'
  },
  {
    id: 'wearable-tracker-uk',
    name: 'Apple Watch Series 10 (GPS 46mm)',
    category: 'Tech Gadgets & Wearables',
    rating: 4.80,
    description: 'Advanced multispectral wrist wearable capturing sleeping heart rate, sleep apnea notifications, and autonomic HRV.',
    price_text: '£379.00',
    deal_url: 'https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'MHRA Certified Telemetry',
    image_url: 'https://123thenextlevel.com/assets/images/shop/apple-watch.png'
  },
  {
    id: 'wearable-tracker-es',
    name: 'Apple Watch Series 10 (GPS 46mm)',
    category: 'Tech Gadgets & Wearables',
    rating: 4.80,
    description: 'Reloj inteligente multiespectral avanzado que registra apnea del sueño, ECG y variabilidad de la frecuencia cardíaca.',
    price_text: '399,00€',
    deal_url: 'https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'CE Compliant Biometrics',
    image_url: 'https://123thenextlevel.com/assets/images/shop/apple-watch.png'
  },
  {
    id: 'blood-pressure-cuff-us',
    name: 'Withings BPM Connect Wi-Fi Cuff',
    category: 'Tech Gadgets & Wearables',
    rating: 4.8,
    description: 'Medically accurate Wi-Fi blood pressure and heart rate monitor syncing directly to your cardiovascular history.',
    price_text: '$99.95',
    deal_url: 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20',
    market_region: 'US',
    badge_text: 'FDA Cleared',
    image_url: 'https://123thenextlevel.com/assets/images/shop/bpm-connect.png'
  },
  {
    id: 'blood-pressure-cuff-uk',
    name: 'Withings BPM Connect Wi-Fi Cuff',
    category: 'Tech Gadgets & Wearables',
    rating: 4.8,
    description: 'Medically accurate Wi-Fi blood pressure and heart rate monitor syncing directly to your cardiovascular history.',
    price_text: '£89.99',
    deal_url: 'https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'CE Medical Class IIa',
    image_url: 'https://123thenextlevel.com/assets/images/shop/bpm-connect.png'
  },
  {
    id: 'blood-pressure-cuff-es',
    name: 'Withings BPM Connect Tensiómetro Inteligente',
    category: 'Tech Gadgets & Wearables',
    rating: 4.8,
    description: 'Tensiómetro Wi-Fi clínicamente validado que sincroniza automáticamente con el historial vascular.',
    price_text: '99,95€',
    deal_url: 'https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'CE Medical Class IIa',
    image_url: 'https://123thenextlevel.com/assets/images/shop/bpm-connect.png'
  },
  {
    id: 'amazon-health-us-b09pskn6x3',
    name: 'Lifepro RejuvaWrap Infrared Sauna Blanket for Detox & Relaxation',
    category: 'Lifestyle & Recovery Gear',
    rating: 4.85,
    description: 'Low-EMF far-infrared thermal blanket delivering deep mitochondrial heat shock protein activation at home.',
    price_text: '$228.46',
    deal_url: 'https://www.amazon.com/dp/B09PSKN6X3?tag=123znl08-20',
    market_region: 'US',
    badge_text: 'Biohacker Approved',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sauna.png'
  },
  {
    id: 'amazon-health-uk-b09pskn6x3',
    name: 'LifePro Infrared Sauna Blanket For Relaxation, Detox & Rejuvenation',
    category: 'Lifestyle & Recovery Gear',
    rating: 4.85,
    description: 'Low-EMF far-infrared thermal blanket delivering deep mitochondrial heat shock protein activation at home.',
    price_text: '£254.99',
    deal_url: 'https://www.amazon.co.uk/dp/B09PSKN6X3?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'UK Quality Standard',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sauna.png'
  },
  {
    id: 'amazon-health-es-b09pskn6x3',
    name: 'LifePro RejuvaWrap Manta de Sauna Infrarroja Térmica',
    category: 'Lifestyle & Recovery Gear',
    rating: 4.85,
    description: 'Manta térmica de infrarrojo lejano con bajo EMF para desintoxicación celular y recuperación mitocondrial.',
    price_text: '289,99€',
    deal_url: 'https://www.amazon.es/dp/B09PSKN6X3?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'Certificado UE',
    image_url: 'https://123thenextlevel.com/assets/images/shop/sauna.png'
  },
  {
    id: 'amazon-health-us-b0c3hcd34r',
    name: 'Soundcore by Anker Q20i Hybrid Active Noise Cancelling Headphones',
    category: 'Lifestyle & Recovery Gear',
    rating: 4.8,
    description: 'Over-ear hybrid ANC headphones engineered for acoustic sanctuary, noise attenuation, and focus entrainment.',
    price_text: '$37.98',
    deal_url: 'https://www.amazon.com/dp/B0C3HCD34R?tag=123znl08-20',
    market_region: 'US',
    badge_text: 'Biohacker Approved',
    image_url: 'https://123thenextlevel.com/assets/images/shop/headphones.png'
  },
  {
    id: 'amazon-health-uk-b0c3hcd34r',
    name: 'Soundcore by Anker Q20i Hybrid Active Noise Cancelling Headphones',
    category: 'Lifestyle & Recovery Gear',
    rating: 4.8,
    description: 'Over-ear hybrid ANC headphones engineered for acoustic sanctuary, noise attenuation, and focus entrainment.',
    price_text: '£28.40',
    deal_url: 'https://www.amazon.co.uk/dp/B0C3HCD34R?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'UK Quality Standard',
    image_url: 'https://123thenextlevel.com/assets/images/shop/headphones.png'
  },
  {
    id: 'amazon-health-es-b08hmwzbxc',
    name: 'Soundcore Anker Q30 Auriculares Inalámbricos con Cancelación de Ruido',
    category: 'Lifestyle & Recovery Gear',
    rating: 4.8,
    description: 'Auriculares inalámbricos con cancelación activa de ruido híbrida para un santuario acústico sin distracciones.',
    price_text: '49,99€',
    deal_url: 'https://www.amazon.es/dp/B08HMWZBXC?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'Certificado UE',
    image_url: 'https://123thenextlevel.com/assets/images/shop/headphones.png'
  },
  {
    id: 'amazon-fitness-us-rower',
    name: 'Concept2 RowErg Indoor Rowing Machine with PM5 Monitor',
    category: 'Fitness & Conditioning',
    rating: 4.95,
    description: 'Gold-standard low-impact cardiovascular conditioning and VO2 max training ergometer.',
    price_text: '$990.00',
    deal_url: 'https://www.amazon.com/dp/B00NH9WEUA?tag=123znl08-20',
    market_region: 'US',
    badge_text: 'PM5 Clinical Standard',
    image_url: 'https://123thenextlevel.com/assets/images/shop/rower.png'
  },
  {
    id: 'amazon-fitness-uk-rower',
    name: 'Concept2 RowErg Indoor Rowing Machine with PM5 Monitor',
    category: 'Fitness & Conditioning',
    rating: 4.95,
    description: 'Gold-standard low-impact cardiovascular conditioning and VO2 max training ergometer.',
    price_text: '£850.00',
    deal_url: 'https://www.amazon.co.uk/dp/B00NH9WEUA?tag=123znl0f3-21',
    market_region: 'UK',
    badge_text: 'PM5 Clinical Standard',
    image_url: 'https://123thenextlevel.com/assets/images/shop/rower.png'
  },
  {
    id: 'amazon-fitness-es-rower',
    name: 'Concept2 RowErg Máquina de Remo de Interior con Monitor PM5',
    category: 'Fitness & Conditioning',
    rating: 4.95,
    description: 'La máquina de remo de referencia mundial para acondicionamiento cardiovascular cruzado.',
    price_text: '950,00€',
    deal_url: 'https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21',
    market_region: 'ES',
    badge_text: 'Estándar Clínico PM5',
    image_url: 'https://123thenextlevel.com/assets/images/shop/rower.png'
  }
];

// Prepopulate cache with fallback products and alias mappings for instant synchronous rendering
FALLBACK_FLAGSHIP_PRODUCTS.forEach(p => {
  productCache.set(p.id.toLowerCase(), p);
});

// Pre-map base names to US fallback products as strict default
const baseAliasFallbacks: Record<string, string> = {
  'wearable-tracker': 'wearable-tracker-us',
  'sauna': 'amazon-health-us-b09pskn6x3',
  'sauna-us': 'amazon-health-us-b09pskn6x3',
  'headphones': 'amazon-health-us-b0c3hcd34r',
  'headphones-us': 'amazon-health-us-b0c3hcd34r',
  'rower': 'amazon-fitness-us-rower',
  'rower-us': 'amazon-fitness-us-rower',
  'cgm': 'cgm-us',
  'sleep-analyzer': 'sleep-analyzer-us',
  'reagent-strips': 'reagent-strips-us',
  'segmental-scale': 'segmental-scale-us',
  'sirtuin-stack': 'sirtuin-stack-us',
  'stethoscope': 'stethoscope-us',
  'blood-pressure-cuff': 'blood-pressure-cuff-us'
};

Object.entries(baseAliasFallbacks).forEach(([alias, targetId]) => {
  const targetProd = productCache.get(targetId.toLowerCase());
  if (targetProd) {
    productCache.set(alias.toLowerCase(), targetProd);
  }
});

/**
 * Sanitize and heal image and deal URLs
 */
export function sanitizeProductData(p: any): ProductDb {
  let healedImg = p.image_url || '';
  if (healedImg) {
    if (healedImg.startsWith('/assets/') && !healedImg.startsWith('http')) {
      healedImg = `https://123thenextlevel.com${healedImg}`;
    } else if (healedImg.startsWith('/Products/') && !healedImg.startsWith('http')) {
      healedImg = `https://123thenextlevel.com${healedImg}`;
    }
  }

  let healedDeal = p.deal_url || '#';
  if (healedDeal.startsWith('https://123thenextlevel.comhttp')) {
    healedDeal = healedDeal.replace('https://123thenextlevel.com', '');
  }

  return {
    id: p.id || '',
    name: p.name || 'Clinical Product',
    category: p.category || 'Clinical Hardware',
    rating: typeof p.rating === 'number' ? p.rating : parseFloat(p.rating || '4.8'),
    description: p.description || '',
    price_text: p.price_text || '$0.00',
    deal_url: healedDeal,
    market_region: (p.market_region || 'US').toUpperCase(),
    badge_text: p.badge_text || 'Clinically Verified',
    image_url: healedImg
  };
}

/**
 * Fetch all products from public.products in Supabase (with deduplicated promise)
 */
export async function fetchAllProducts(): Promise<ProductDb[]> {
  if (isCacheHydrated && productCache.size > 10) {
    return Array.from(productCache.values());
  }

  if (allProductsPromise) {
    return allProductsPromise;
  }

  allProductsPromise = (async () => {
    try {
      if (supabase && hasValidSupabaseConfig) {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (!error && data && data.length > 0) {
          data.forEach((rawProd: any) => {
            const sanitized = sanitizeProductData(rawProd);
            productCache.set(sanitized.id.toLowerCase(), sanitized);
          });
          isCacheHydrated = true;
          return Array.from(productCache.values());
        }
      }
    } catch (err) {
      console.warn('Could not fetch products from Supabase, utilizing cached master catalog:', err);
    }

    return Array.from(productCache.values());
  })();

  return allProductsPromise;
}

// Friendly aliases mapping common short names and cross-region IDs to exact product records
const PRODUCT_ALIASES: Record<string, Record<Market, string>> = {
  'cgm': {
    'US': 'cgm-us',
    'UK': 'cgm-uk',
    'ES': 'cgm-es'
  },
  'cgm-us': {
    'US': 'cgm-us',
    'UK': 'cgm-uk',
    'ES': 'cgm-es'
  },
  'cgm-uk': {
    'US': 'cgm-us',
    'UK': 'cgm-uk',
    'ES': 'cgm-es'
  },
  'cgm-es': {
    'US': 'cgm-us',
    'UK': 'cgm-uk',
    'ES': 'cgm-es'
  },
  'sleep-analyzer': {
    'US': 'sleep-analyzer-us',
    'UK': 'sleep-analyzer-uk',
    'ES': 'sleep-analyzer-es'
  },
  'sleep-analyzer-us': {
    'US': 'sleep-analyzer-us',
    'UK': 'sleep-analyzer-uk',
    'ES': 'sleep-analyzer-es'
  },
  'sleep-analyzer-uk': {
    'US': 'sleep-analyzer-us',
    'UK': 'sleep-analyzer-uk',
    'ES': 'sleep-analyzer-es'
  },
  'sleep-analyzer-es': {
    'US': 'sleep-analyzer-us',
    'UK': 'sleep-analyzer-uk',
    'ES': 'sleep-analyzer-es'
  },
  'reagent-strips': {
    'US': 'reagent-strips-us',
    'UK': 'reagent-strips-uk',
    'ES': 'reagent-strips-es'
  },
  'reagent-strips-us': {
    'US': 'reagent-strips-us',
    'UK': 'reagent-strips-uk',
    'ES': 'reagent-strips-es'
  },
  'reagent-strips-uk': {
    'US': 'reagent-strips-us',
    'UK': 'reagent-strips-uk',
    'ES': 'reagent-strips-es'
  },
  'reagent-strips-es': {
    'US': 'reagent-strips-us',
    'UK': 'reagent-strips-uk',
    'ES': 'reagent-strips-es'
  },
  'segmental-scale': {
    'US': 'segmental-scale-us',
    'UK': 'segmental-scale-uk',
    'ES': 'segmental-scale-es'
  },
  'segmental-scale-us': {
    'US': 'segmental-scale-us',
    'UK': 'segmental-scale-uk',
    'ES': 'segmental-scale-es'
  },
  'segmental-scale-uk': {
    'US': 'segmental-scale-us',
    'UK': 'segmental-scale-uk',
    'ES': 'segmental-scale-es'
  },
  'segmental-scale-es': {
    'US': 'segmental-scale-us',
    'UK': 'segmental-scale-uk',
    'ES': 'segmental-scale-es'
  },
  'sirtuin-stack': {
    'US': 'sirtuin-stack-us',
    'UK': 'sirtuin-stack-uk',
    'ES': 'sirtuin-stack-es'
  },
  'sirtuin-stack-us': {
    'US': 'sirtuin-stack-us',
    'UK': 'sirtuin-stack-uk',
    'ES': 'sirtuin-stack-es'
  },
  'sirtuin-stack-uk': {
    'US': 'sirtuin-stack-us',
    'UK': 'sirtuin-stack-uk',
    'ES': 'sirtuin-stack-es'
  },
  'sirtuin-stack-es': {
    'US': 'sirtuin-stack-us',
    'UK': 'sirtuin-stack-uk',
    'ES': 'sirtuin-stack-es'
  },
  'stethoscope': {
    'US': 'stethoscope-us',
    'UK': 'stethoscope-uk',
    'ES': 'stethoscope-es'
  },
  'stethoscope-us': {
    'US': 'stethoscope-us',
    'UK': 'stethoscope-uk',
    'ES': 'stethoscope-es'
  },
  'stethoscope-uk': {
    'US': 'stethoscope-us',
    'UK': 'stethoscope-uk',
    'ES': 'stethoscope-es'
  },
  'stethoscope-es': {
    'US': 'stethoscope-us',
    'UK': 'stethoscope-uk',
    'ES': 'stethoscope-es'
  },
  'blood-pressure-cuff': {
    'US': 'blood-pressure-cuff-us',
    'UK': 'blood-pressure-cuff-uk',
    'ES': 'blood-pressure-cuff-es'
  },
  'blood-pressure-cuff-us': {
    'US': 'blood-pressure-cuff-us',
    'UK': 'blood-pressure-cuff-uk',
    'ES': 'blood-pressure-cuff-es'
  },
  'blood-pressure-cuff-uk': {
    'US': 'blood-pressure-cuff-us',
    'UK': 'blood-pressure-cuff-uk',
    'ES': 'blood-pressure-cuff-es'
  },
  'blood-pressure-cuff-es': {
    'US': 'blood-pressure-cuff-us',
    'UK': 'blood-pressure-cuff-uk',
    'ES': 'blood-pressure-cuff-es'
  },
  'wearable-tracker': {
    'US': 'wearable-tracker-us',
    'UK': 'wearable-tracker-uk',
    'ES': 'wearable-tracker-es'
  },
  'wearable-tracker-us': {
    'US': 'wearable-tracker-us',
    'UK': 'wearable-tracker-uk',
    'ES': 'wearable-tracker-es'
  },
  'wearable-tracker-uk': {
    'US': 'wearable-tracker-us',
    'UK': 'wearable-tracker-uk',
    'ES': 'wearable-tracker-es'
  },
  'wearable-tracker-es': {
    'US': 'wearable-tracker-us',
    'UK': 'wearable-tracker-uk',
    'ES': 'wearable-tracker-es'
  },
  'sauna': {
    'US': 'amazon-health-us-b09pskn6x3',
    'UK': 'amazon-health-uk-b09pskn6x3',
    'ES': 'amazon-health-es-b09pskn6x3'
  },
  'sauna-us': {
    'US': 'amazon-health-us-b09pskn6x3',
    'UK': 'amazon-health-uk-b09pskn6x3',
    'ES': 'amazon-health-es-b09pskn6x3'
  },
  'sauna-uk': {
    'US': 'amazon-health-us-b09pskn6x3',
    'UK': 'amazon-health-uk-b09pskn6x3',
    'ES': 'amazon-health-es-b09pskn6x3'
  },
  'sauna-es': {
    'US': 'amazon-health-us-b09pskn6x3',
    'UK': 'amazon-health-uk-b09pskn6x3',
    'ES': 'amazon-health-es-b09pskn6x3'
  },
  'amazon-health-us-b09pskn6x3': {
    'US': 'amazon-health-us-b09pskn6x3',
    'UK': 'amazon-health-uk-b09pskn6x3',
    'ES': 'amazon-health-es-b09pskn6x3'
  },
  'amazon-health-uk-b09pskn6x3': {
    'US': 'amazon-health-us-b09pskn6x3',
    'UK': 'amazon-health-uk-b09pskn6x3',
    'ES': 'amazon-health-es-b09pskn6x3'
  },
  'amazon-health-es-b09pskn6x3': {
    'US': 'amazon-health-us-b09pskn6x3',
    'UK': 'amazon-health-uk-b09pskn6x3',
    'ES': 'amazon-health-es-b09pskn6x3'
  },
  'headphones': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'headphones-us': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'headphones-uk': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'headphones-es': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'bose-headphones': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'amazon-health-us-b0c3hcd34r': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'amazon-health-uk-b0c3hcd34r': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'amazon-health-es-b08hmwzbxc': {
    'US': 'amazon-health-us-b0c3hcd34r',
    'UK': 'amazon-health-uk-b0c3hcd34r',
    'ES': 'amazon-health-es-b08hmwzbxc'
  },
  'rower': {
    'US': 'amazon-fitness-us-rower',
    'UK': 'amazon-fitness-uk-rower',
    'ES': 'amazon-fitness-es-rower'
  },
  'rower-us': {
    'US': 'amazon-fitness-us-rower',
    'UK': 'amazon-fitness-uk-rower',
    'ES': 'amazon-fitness-es-rower'
  },
  'rower-uk': {
    'US': 'amazon-fitness-us-rower',
    'UK': 'amazon-fitness-uk-rower',
    'ES': 'amazon-fitness-es-rower'
  },
  'rower-es': {
    'US': 'amazon-fitness-us-rower',
    'UK': 'amazon-fitness-uk-rower',
    'ES': 'amazon-fitness-es-rower'
  },
  'amazon-fitness-us-rower': {
    'US': 'amazon-fitness-us-rower',
    'UK': 'amazon-fitness-uk-rower',
    'ES': 'amazon-fitness-es-rower'
  },
  'amazon-fitness-uk-rower': {
    'US': 'amazon-fitness-us-rower',
    'UK': 'amazon-fitness-uk-rower',
    'ES': 'amazon-fitness-es-rower'
  },
  'amazon-fitness-es-rower': {
    'US': 'amazon-fitness-us-rower',
    'UK': 'amazon-fitness-uk-rower',
    'ES': 'amazon-fitness-es-rower'
  },
  'kettlebell': {
    'US': 'amazon-fitness-us-kettlebell',
    'UK': 'amazon-fitness-uk-kettlebell',
    'ES': 'amazon-fitness-es-kettlebell'
  },
  'apple-watch': {
    'US': 'wearable-tracker-us',
    'UK': 'wearable-tracker-uk',
    'ES': 'wearable-tracker-es'
  }
};

/**
 * Dynamically resolve a requested product ID to match the active region (US, UK, ES)
 */
export function resolveRegionalProductId(
  rawId: string,
  targetMarket: Market = 'US',
  productsList?: ProductDb[]
): string {
  if (!rawId) return '';
  const normalizedRaw = rawId.trim().toLowerCase();
  const market = (targetMarket || 'US').toUpperCase() as Market;
  const targetSuffix = `-${market.toLowerCase()}`;

  // 0. Check alias dictionary
  const baseWithoutSuffix = normalizedRaw.replace(/-(us|uk|es)$/i, '');
  if (PRODUCT_ALIASES[normalizedRaw] && PRODUCT_ALIASES[normalizedRaw][market]) {
    return PRODUCT_ALIASES[normalizedRaw][market];
  }
  if (PRODUCT_ALIASES[baseWithoutSuffix] && PRODUCT_ALIASES[baseWithoutSuffix][market]) {
    return PRODUCT_ALIASES[baseWithoutSuffix][market];
  }

  // 1. Direct match check in cache or provided list
  const catalog = productsList || Array.from(productCache.values());

  // Check if rawId exists and is already in the target market
  const directMatch = catalog.find(p => p.id.toLowerCase() === normalizedRaw);
  if (directMatch && directMatch.market_region.toUpperCase() === market) {
    return directMatch.id;
  }

  // 2. Suffix conversion: if rawId ends with -us, -uk, or -es
  if (/-(us|uk|es)$/i.test(normalizedRaw)) {
    const baseId = normalizedRaw.replace(/-(us|uk|es)$/i, '');
    const regionalCandidate = `${baseId}${targetSuffix}`;

    const candidateMatch = catalog.find(p => p.id.toLowerCase() === regionalCandidate);
    if (candidateMatch) {
      return candidateMatch.id;
    }
  }

  // 3. Infix conversion: if rawId contains -us-, -uk-, or -es- (e.g. amazon-supp-us-b004u3y8om, amazon-fitness-us-rower)
  if (/-(us|uk|es)-/i.test(normalizedRaw)) {
    const regionalInfixCandidate = normalizedRaw.replace(/-(us|uk|es)-/i, `-${market.toLowerCase()}-`);
    const infixMatch = catalog.find(p => p.id.toLowerCase() === regionalInfixCandidate);
    if (infixMatch) {
      return infixMatch.id;
    }
  }

  // 4. Base conversion: if rawId has no region (e.g. 'cgm', 'reagent-strips', 'sleep-analyzer')
  const appendedCandidate = `${normalizedRaw}${targetSuffix}`;
  const appendedMatch = catalog.find(p => p.id.toLowerCase() === appendedCandidate);
  if (appendedMatch) {
    return appendedMatch.id;
  }

  // 5. Fallback: return direct match if exists, or appended candidate, or original rawId
  return directMatch ? directMatch.id : rawId;
}

/**
 * Fetch a single product by ID, resolving market awareness
 */
export async function getProductById(
  rawId: string,
  market: Market = 'US'
): Promise<ProductDb | null> {
  const allProds = await fetchAllProducts();
  const resolvedId = resolveRegionalProductId(rawId, market, allProds);

  const matched = allProds.find(p => p.id.toLowerCase() === resolvedId.toLowerCase());
  if (matched) return matched;

  // Fallback to original rawId if different
  const fallbackMatch = allProds.find(p => p.id.toLowerCase() === rawId.toLowerCase());
  if (fallbackMatch) return fallbackMatch;

  return productCache.get(resolvedId.toLowerCase()) || productCache.get(rawId.toLowerCase()) || null;
}

/**
 * React Hook for consuming dynamic product recommendations in components
 */
export function useDynamicProduct(rawId: string, marketOverride?: Market) {
  let contextMarket: Market = 'US';
  try {
    const marketCtx = useMarket();
    if (marketCtx && marketCtx.market) {
      contextMarket = marketCtx.market;
    }
  } catch {
    contextMarket = 'US';
  }

  // Local state to support instant window event listeners
  const [activeMarket, setActiveMarket] = useState<Market>(marketOverride || contextMarket || 'US');

  // Sync with context or marketOverride
  useEffect(() => {
    if (marketOverride) {
      setActiveMarket(marketOverride);
    } else if (contextMarket) {
      setActiveMarket(contextMarket);
    }
  }, [contextMarket, marketOverride]);

  // Direct event listener for instant responsiveness
  useEffect(() => {
    if (marketOverride) return;

    const handleMarketEvent = (e: any) => {
      const incoming = e?.detail?.market || e?.detail?.region;
      if (incoming && ['US', 'UK', 'ES'].includes(incoming.toUpperCase())) {
        setActiveMarket(incoming.toUpperCase() as Market);
      }
    };

    window.addEventListener('market-changed', handleMarketEvent);
    window.addEventListener('region-changed', handleMarketEvent);

    return () => {
      window.removeEventListener('market-changed', handleMarketEvent);
      window.removeEventListener('region-changed', handleMarketEvent);
    };
  }, [marketOverride]);

  const [product, setProduct] = useState<ProductDb | null>(() => {
    const resolvedId = resolveRegionalProductId(rawId, activeMarket);
    return productCache.get(resolvedId.toLowerCase()) || productCache.get(rawId.toLowerCase()) || null;
  });

  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!rawId) {
        setProduct(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const resolved = await getProductById(rawId, activeMarket);
        if (isMounted) {
          setProduct(resolved);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error loading product');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [rawId, activeMarket]);

  return { product, loading, error, market: activeMarket };
}

