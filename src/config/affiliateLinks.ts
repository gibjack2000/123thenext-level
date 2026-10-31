export type MarketRegion = 'US' | 'UK' | 'ES';

export type StoreCategory =
  | "Clinical Diagnostics & Labs"
  | "Smart Hardware & Wearables"
  | "Exercise & Fitness Gear"
  | "Supplements & Nutraceuticals"
  | "Kitchen & Culinary Bio-Hacks";

// Alias kept for backward compatibility across components
export type ProductCategory = StoreCategory;

export interface SupplierOption {
  id?: string;
  productId?: string;
  marketRegion?: MarketRegion;
  supplierName: "Amazon" | "iHerb" | "Life Extension" | "Withings" | "HealthLabs" | "LOLA Health" | "Melio" | string;
  url: string;
  ctaText: string;
  priceText: string;
  badgeText: string;
  isPrimary: boolean;
  isActive?: boolean;
  is_active?: boolean;
  perksNote?: string; // e.g., "Prime 2-Day" or "Rewards + 5% Off"
}

export interface SovereignProduct {
  id: string;
  name: string;
  category: StoreCategory;
  rating: number;
  description: string;
  image_url: string;
  us: SupplierOption[];
  uk: SupplierOption[];
  es: SupplierOption[];
}

export interface SovereignProductItem {
  id: string;
  name: string;
  category: StoreCategory | string;
  rating: number;
  description: string;
  price_text: string;
  deal_url: string;
  market_region?: MarketRegion;
  badge_text: string;
  image_url: string;
  network?: string;
  is_direct_affiliate?: boolean;
  hub_placement_slot?: string;
  suppliers?: SupplierOption[];
}

export const STORE_CATEGORIES: StoreCategory[] = [
  "Clinical Diagnostics & Labs",
  "Smart Hardware & Wearables",
  "Exercise & Fitness Gear",
  "Supplements & Nutraceuticals",
  "Kitchen & Culinary Bio-Hacks"
];

// Direct Life Extension US Blood Panel Links (Temporary Direct Protocol)
export const US_BLOOD_TEST_BASIC_URL = "https://www.lifeextension.com/lab-testing/itemqd100025/healthy-aging-panel-basic-blood-test";
export const US_BLOOD_TEST_BASIC_BADGE = "💊 Entry-Level Metabolic Baseline ($155)";
export const US_BLOOD_TEST_COMPREHENSIVE_URL = "https://www.lifeextension.com/lab-testing/itemqd100026/healthy-aging-panel-comprehensive-blood-test";
export const US_BLOOD_TEST_COMPREHENSIVE_BADGE = "💊 Comprehensive Metabolic & Inflammatory Map";

// Direct Life Extension US Complete Urinalysis (Item #QD007909)
export const US_URINALYSIS_TEST_URL = "https://www.lifeextension.com/lab-testing/itemqd007909/urinalysis-urine-test";
export const US_URINALYSIS_TEST_BADGE = "💊 Quest Diagnostics Requisition ($24)";

export const sovereignHealthStack: SovereignProduct[] = [
  // ============================================================================
  // 1. CLINICAL DIAGNOSTICS & LABS
  // ============================================================================
  {
    id: "essential-blood-panel",
    name: "Healthy Aging Panel (Basic) [#QD100025]",
    category: "Clinical Diagnostics & Labs",
    rating: 4.92,
    description: "Core cardiovascular and metabolic blood panel measuring Cholesterol, HDL, LDL, Triglycerides, Fasting Glucose, HbA1c, and basic kidney/liver filtration via Quest Diagnostics.",
    image_url: "/Products/clinical-blood-panel.jpg",
    us: [
      {
        supplierName: "Life Extension",
        url: US_BLOOD_TEST_BASIC_URL,
        ctaText: "Order Basic Bloods (Life Extension $155 🇺🇸)",
        priceText: "$155.00",
        badgeText: US_BLOOD_TEST_BASIC_BADGE,
        isPrimary: true,
        perksNote: "Item #QD100025 • Entry-Level Baseline"
      }
    ],
    uk: [
      {
        supplierName: "LOLA Health",
        url: "https://referrals.lolahealth.com/NextLevel15",
        ctaText: "Select Core Health 45 (LOLA UK 🇬🇧)",
        priceText: "From £125.00",
        badgeText: "45 Essential Biomarkers • UKAS Accredited",
        isPrimary: true,
        perksNote: "Select 'Core Health 45' • Essential Health MOT"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.melio.es",
        ctaText: "Order Baseline Bloods (Melio ES 🇪🇸)",
        priceText: "Desde 69,00€",
        badgeText: "🇪🇸 ES (Melio/Megalab)",
        isPrimary: true,
        perksNote: "160+ Centros Eurofins Megalab"
      }
    ]
  },
  {
    id: "blood-panel",
    name: "Healthy Aging Panel (Comprehensive) [#QD100026]",
    category: "Clinical Diagnostics & Labs",
    rating: 4.95,
    description: "Direct-to-consumer longevity blood panels mapping essential biomarkers including ApoB, hs-CRP, Vitamin D, Thyroid, and Hormones. Local Quest draw in the US via Life Extension, private clinical setups in UK and ES.",
    image_url: "/Products/clinical-blood-panel.jpg",
    us: [
      {
        supplierName: "Life Extension",
        url: US_BLOOD_TEST_COMPREHENSIVE_URL,
        ctaText: "Order Comprehensive Panel (Life Extension US 🇺🇸)",
        priceText: "From $299.00",
        badgeText: US_BLOOD_TEST_COMPREHENSIVE_BADGE,
        isPrimary: true,
        perksNote: "Item #QD100026 • Quest Diagnostics Requisition"
      },
      {
        supplierName: "Life Extension",
        url: US_BLOOD_TEST_BASIC_URL,
        ctaText: "Order Basic Option ($155)",
        priceText: "$155.00",
        badgeText: US_BLOOD_TEST_BASIC_BADGE,
        isPrimary: false,
        perksNote: "Item #QD100025 • Entry Baseline"
      }
    ],
    uk: [
      {
        supplierName: "LOLA Health UK",
        url: "https://snwbl.io/out/NcealZ11",
        ctaText: "Select Vital Check 56 (LOLA UK 🇬🇧)",
        priceText: "From £155.00",
        badgeText: "⭐ Recommended Longevity Baseline • 56 Biomarkers",
        isPrimary: true,
        perksNote: "56 Biomarkers • ApoB, hs-CRP, Hormones & Home Draw"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.melio.es",
        ctaText: "Order 56-Biomarker Panel (Melio ES 🇪🇸)",
        priceText: "Desde 149,00€",
        badgeText: "🇪🇸 ES (Melio/Megalab)",
        isPrimary: true,
        perksNote: "Resultados Médicos en 48h"
      }
    ]
  },
  {
    id: "urinalysis-acr",
    name: "Clinical Lab Urine ACR (Microalbumin & Creatinine Panel)",
    category: "Clinical Diagnostics & Labs",
    rating: 4.91,
    description: "Synchronized clinical urinalysis measuring Albumin-to-Creatinine Ratio (ACR), Microalbumin, and Creatinine to evaluate renal filtration alongside your blood draw.",
    image_url: "/Products/clinical-urine-acr.jpg",
    us: [
      {
        supplierName: "Life Extension",
        url: US_URINALYSIS_TEST_URL,
        ctaText: "Order Lab Urinalysis (Life Extension $24 🇺🇸)",
        priceText: "$24.00",
        badgeText: US_URINALYSIS_TEST_BADGE,
        isPrimary: true,
        perksNote: "Item #QD007909 • Quest Diagnostics Requisition"
      }
    ],
    uk: [
      {
        supplierName: "LOLA Health",
        url: "https://referrals.lolahealth.com/NextLevel15",
        ctaText: "Order Urinalysis on LOLA Health UK 🇬🇧",
        priceText: "From £65.00",
        badgeText: "🇬🇧 UK (LOLA/UKAS)",
        isPrimary: true,
        perksNote: "15% Off Referral • UKAS Urinalysis"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.melio.es",
        ctaText: "Order Lab Urine ACR (Melio ES 🇪🇸)",
        priceText: "Desde 39,00€",
        badgeText: "🇪🇸 ES (Melio/Megalab)",
        isPrimary: true,
        perksNote: "Sedimento + Cociente ACR"
      }
    ]
  },
  {
    id: "cgm",
    name: "Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)",
    category: "Clinical Diagnostics & Labs",
    rating: 4.80,
    description: "Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health.",
    image_url: "/Products/clinical-cgm-sensor.jpg",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20",
        ctaText: "Order CGM Sensor (Lingo US 🇺🇸)",
        priceText: "From $89.00/mo",
        badgeText: "🇺🇸 US (Abbott Lingo / FDA)",
        isPrimary: true,
        perksNote: "Prime 2-Day • OTC FDA Cleared"
      }
    ],
    uk: [
      {
        supplierName: "LOLA Health",
        url: "https://hellolingo.co.uk",
        ctaText: "Order CGM Sensor (Lingo UK 🇬🇧)",
        priceText: "From £79.00/mo",
        badgeText: "🇬🇧 UK (Abbott Lingo / MHRA)",
        isPrimary: true,
        perksNote: "14-Day Continuous Biosensor"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.dexcom.com/es-ES",
        ctaText: "Order CGM Sensor (Dexcom ES 🇪🇸)",
        priceText: "Desde 79,00€/mo",
        badgeText: "🇪🇸 ES (Dexcom ONE+ / CE)",
        isPrimary: true,
        perksNote: "Sensor Continuo Marcado CE"
      }
    ]
  },
  {
    id: "stethoscope",
    name: "Eko CORE 500™ Digital AI Stethoscope",
    category: "Clinical Diagnostics & Labs",
    rating: 4.95,
    description: "FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds.",
    image_url: "/Products/clinical-ai-stethoscope.jpg",
    us: [
      {
        supplierName: "HealthLabs",
        url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
        ctaText: "Order AI Stethoscope (Eko US 🇺🇸)",
        priceText: "$429.00",
        badgeText: "🇺🇸 US (Eko Health / FDA)",
        isPrimary: true,
        perksNote: "3-Lead ECG + Clinical AI"
      }
    ],
    uk: [
      {
        supplierName: "LOLA Health",
        url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
        ctaText: "Order AI Stethoscope (Eko UK 🇬🇧)",
        priceText: "£379.00",
        badgeText: "🇬🇧 UK (Eko Health / MHRA)",
        isPrimary: true,
        perksNote: "3-Lead ECG + Clinical AI"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.doccheck.com/es/",
        ctaText: "Order AI Stethoscope (DocCheck ES 🇪🇸)",
        priceText: "429,00€",
        badgeText: "🇪🇸 ES (Eko Health / CE)",
        isPrimary: true,
        perksNote: "ECG 3 Derivaciones + IA"
      }
    ]
  },
  {
    id: "reagent-strips",
    name: "10-Parameter Home Urinalysis Dipstick Kit",
    category: "Clinical Diagnostics & Labs",
    rating: 4.90,
    description: "Direct medical-grade 10-parameter urinalysis strips for weekly tracking of microvascular health, proteinuria, pH, ketones, glucose, and renal function.",
    image_url: "/Products/aymed.webp",
    us: [
      {
        supplierName: "Amazon",
        url: "https://diagnoxhealth.com/products/urinalysis-test",
        ctaText: "Order Home Dipstick Kit (Diagnox US 🇺🇸)",
        priceText: "From $16.99",
        badgeText: "🇺🇸 US (Diagnox / FDA Cleared)",
        isPrimary: true,
        perksNote: "100 Medical-Grade Strips"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21",
        ctaText: "Order Home Dipstick Kit (ALLTEST UK 🇬🇧)",
        priceText: "From £12.99",
        badgeText: "🇬🇧 UK (ALLTEST / CE Marked)",
        isPrimary: true,
        perksNote: "Prime Delivery • 100 Strips"
      },
      {
        supplierName: "LOLA Health",
        url: "https://referrals.lolahealth.com/NextLevel15",
        ctaText: "Add Clinical Lab ACR (LOLA UK 🇬🇧)",
        priceText: "From £49.00",
        badgeText: "🇬🇧 UK (LOLA/UKAS)",
        isPrimary: false,
        perksNote: "15% Off Referral"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.melio.es",
        ctaText: "Order Home Dipstick Kit (ALLTEST ES 🇪🇸)",
        priceText: "Desde 14,50€",
        badgeText: "🇪🇸 ES (ALLTEST / Marcado CE)",
        isPrimary: true,
        perksNote: "10 Parámetros Clínicos"
      }
    ]
  },
  {
    id: "epigenetic-test",
    name: "Biological Age & Epigenetic Methylation Test Kit",
    category: "Clinical Diagnostics & Labs",
    rating: 4.93,
    description: "DunedinPACE epigenetic clock and DNA methylation pace-of-aging test kit to quantify your biological age trajectory vs chronological age.",
    image_url: "/Products/clinical-epigenetic-kit.jpg",
    us: [
      {
        supplierName: "HealthLabs",
        url: "https://www.healthlabs.com/?affiliate=123znl",
        ctaText: "Order Epigenetic Kit (HealthLabs US 🇺🇸)",
        priceText: "From $299.00",
        badgeText: "🇺🇸 US (HealthLabs/Quest)",
        isPrimary: true,
        perksNote: "DunedinPACE Methylation Clock"
      }
    ],
    uk: [
      {
        supplierName: "LOLA Health UK",
        url: "https://snwbl.io/out/NcealZ11",
        ctaText: "Order Your TruAge Test on LOLA Health UK 🇬🇧",
        priceText: "From £375.00",
        badgeText: "🇬🇧 UK (LOLA/UKAS)",
        isPrimary: true,
        perksNote: "TruAge • Biological Age & DunedinPACE"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.melio.es",
        ctaText: "Order Epigenetic Kit (Melio ES 🇪🇸)",
        priceText: "Desde 249,00€",
        badgeText: "🇪🇸 ES (Melio/Megalab)",
        isPrimary: true,
        perksNote: "Reloj Epigenético ADN"
      }
    ]
  },
  {
    id: "ovarian-test",
    name: "Ovarian Reserve Female Hormone Test Kit",
    category: "Clinical Diagnostics & Labs",
    rating: 4.85,
    description: "A biology-specific finger-prick blood test to evaluate ovarian reserve and reproductive longevity baselines.",
    image_url: "/Products/clinical-blood-panel.jpg",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B08H7V69F7?tag=123znl0e-20",
        ctaText: "Order Hormone Test (Amazon US 🇺🇸)",
        priceText: "From $49.00",
        badgeText: "🇺🇸 US (HealthLabs/Quest)",
        isPrimary: true,
        perksNote: "Prime 2-Day Home Kit"
      },
      {
        supplierName: "HealthLabs",
        url: "https://www.healthlabs.com/?affiliate=123znl",
        ctaText: "Clinical AMH & Hormone Draw (HealthLabs US)",
        priceText: "From $99.00",
        badgeText: "CLIA/CAP Venous Draw",
        isPrimary: false,
        perksNote: "Quest/Labcorp Clinic"
      }
    ],
    uk: [
      {
        supplierName: "LOLA Health",
        url: "https://referrals.lolahealth.com/NextLevel15",
        ctaText: "Order Hormone Panel (LOLA UK 🇬🇧)",
        priceText: "From £39.00",
        badgeText: "🇬🇧 UK (LOLA/UKAS)",
        isPrimary: true,
        perksNote: "15% Off Referral • Female Hormones"
      },
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B08H7V69F7?tag=123znl0f3-21",
        ctaText: "Buy Home FSH Kit (Amazon UK 🇬🇧)",
        priceText: "£39.00",
        badgeText: "CE Home Test",
        isPrimary: false,
        perksNote: "Prime Next-Day"
      }
    ],
    es: [
      {
        supplierName: "Melio",
        url: "https://www.melio.es",
        ctaText: "Order Hormone Panel (Melio ES 🇪🇸)",
        priceText: "Desde 45,00€",
        badgeText: "🇪🇸 ES (Melio/Megalab)",
        isPrimary: true,
        perksNote: "Reserva Ovárica AMH + FSH"
      },
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B08H7V69F7?tag=123znl08a-21",
        ctaText: "Comprar Kit Hormonal (Amazon ES 🇪🇸)",
        priceText: "45,00€",
        badgeText: "Marcado CE",
        isPrimary: false,
        perksNote: "Envío Prime"
      }
    ]
  },

  // ============================================================================
  // 2. SMART HARDWARE & WEARABLES
  // ============================================================================
  {
    id: "blood-pressure-cuff",
    name: "Withings BPM Connect Wi-Fi Cuff",
    category: "Smart Hardware & Wearables",
    rating: 4.80,
    description: "Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data.",
    image_url: "/Products/withingsconnect.webp",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$99.95",
        badgeText: "FDA Cleared",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/us/en/bpm-connect",
        ctaText: "Order Direct from Withings US",
        priceText: "$129.95",
        badgeText: "Official Store",
        isPrimary: false,
        perksNote: "30-Day Trial + HSA/FSA Eligible"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£89.99",
        badgeText: "CE Medical Class IIa",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/uk/en/bpm-connect",
        ctaText: "Order Direct from Withings UK",
        priceText: "£119.95",
        badgeText: "Official Store",
        isPrimary: false,
        perksNote: "2-Year Manufacturer Warranty"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "99,95€",
        badgeText: "CE Medical Class IIa",
        isPrimary: true,
        perksNote: "Envío Prime 24/48h"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/es/es/bpm-connect",
        ctaText: "Pedir en Withings Oficial ES",
        priceText: "129,95€",
        badgeText: "Tienda Oficial",
        isPrimary: false,
        perksNote: "Garantía Oficial Europea 2 Años"
      }
    ]
  },
  {
    id: "sleep-analyzer",
    name: "Withings Sleep Analyzer Under-Mattress Pad",
    category: "Smart Hardware & Wearables",
    rating: 4.82,
    description: "A contact-free sleep tracker placed under your mattress. Automatically logs sleeping heart rate, sleep cycles, and passive breathing disturbances.",
    image_url: "/Products/withingsleep.webp",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$129.95",
        badgeText: "Touch-Free Sleep Science",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/us/en/sleep",
        ctaText: "Order Direct from Withings US",
        priceText: "$149.95",
        badgeText: "Official Store",
        isPrimary: false,
        perksNote: "30-Day Trial + HSA/FSA"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£119.99",
        badgeText: "CE Medically Validated (Apnea)",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/uk/en/sleep-analyzer",
        ctaText: "Order Direct from Withings UK",
        priceText: "£129.95",
        badgeText: "Official Store",
        isPrimary: false,
        perksNote: "2-Year Manufacturer Warranty"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "129,95€",
        badgeText: "CE Medically Validated (Apnea)",
        isPrimary: true,
        perksNote: "Envío Prime 24/48h"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/es/es/sleep-analyzer",
        ctaText: "Pedir en Withings Oficial ES",
        priceText: "149,95€",
        badgeText: "Tienda Oficial",
        isPrimary: false,
        perksNote: "Garantía Oficial Europea"
      }
    ]
  },
  {
    id: "segmental-scale",
    name: "Withings Body Scan Segmental Composition Scale",
    category: "Smart Hardware & Wearables",
    rating: 4.88,
    description: "FDA-cleared 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index.",
    image_url: "/Products/newithings.webp",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$399.95",
        badgeText: "FDA Cleared",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/us/en/body-scan",
        ctaText: "Order Direct from Withings US",
        priceText: "$399.95",
        badgeText: "Official Store",
        isPrimary: false,
        perksNote: "30-Day Trial + HSA/FSA"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£349.99",
        badgeText: "CE Medical Marked",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/uk/en/body-scan",
        ctaText: "Order Direct from Withings UK",
        priceText: "£349.95",
        badgeText: "Official Store",
        isPrimary: false,
        perksNote: "2-Year Manufacturer Warranty"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "399,95€",
        badgeText: "CE Medical Marked",
        isPrimary: true,
        perksNote: "Envío Prime 24/48h"
      },
      {
        supplierName: "Withings",
        url: "https://www.withings.com/es/es/body-scan",
        ctaText: "Pedir en Withings Oficial ES",
        priceText: "399,95€",
        badgeText: "Tienda Oficial",
        isPrimary: false,
        perksNote: "Garantía Oficial Europea"
      }
    ]
  },
  {
    id: "wearable-tracker",
    name: "Apple Watch Series 10 (GPS 46mm)",
    category: "Smart Hardware & Wearables",
    rating: 4.80,
    description: "Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and Heart Rate Variability (HRV).",
    image_url: "/Products/apple10.jpg",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$399.00",
        badgeText: "FDA Approved Heart Notifications",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£379.00",
        badgeText: "MHRA Certified Telemetry",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "399,00€",
        badgeText: "CE Compliant Biometrics",
        isPrimary: true,
        perksNote: "Envío Prime 24/48h"
      }
    ]
  },
  {
    id: "noise-headphones",
    name: "Sony WH-CH720N Noise-Canceling Headphones",
    category: "Smart Hardware & Wearables",
    rating: 4.90,
    description: "Immersive active noise cancellation to completely isolate your auditory environment during vagal and deep-breathing mindfulness cycles.",
    image_url: "/Products/headphone-us.webp",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B0BTY3Y6PP?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$149.99",
        badgeText: "Ultra-Lightweight Comfort",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B0BTY3Y6PP?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£119.00",
        badgeText: "35-Hour Battery Life",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B0BTY3Y6PP?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "129,00€",
        badgeText: "Cancelación Activa de Ruido",
        isPrimary: true,
        perksNote: "Envío Prime 24/48h"
      }
    ]
  },

  // ============================================================================
  // 3. EXERCISE & FITNESS GEAR
  // ============================================================================
  {
    id: "rowing-machine",
    name: "Concept2 Remo Indoor Model D Rower",
    category: "Exercise & Fitness Gear",
    rating: 4.95,
    description: "The gold-standard indoor rowing machine with PM5 monitor to optimize cardiorespiratory output, muscular baseline, and metabolic power.",
    image_url: "/assets/images/shop/rower.png",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$990.00",
        badgeText: "Clinical Standard PM5 Monitor",
        isPrimary: true,
        perksNote: "Prime Freight Delivery"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B099KBD9X8?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£850.00",
        badgeText: "Clinical Standard PM5 Monitor",
        isPrimary: true,
        perksNote: "Prime Delivery"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B099KBD9X8?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "950,00€",
        badgeText: "Monitor PM5 Estándar",
        isPrimary: true,
        perksNote: "Envío Prime"
      }
    ]
  },
  {
    id: "sauna-tent",
    name: "Portable Full-Body Infrared Sauna Tent",
    category: "Exercise & Fitness Gear",
    rating: 4.80,
    description: "Advanced far-infrared full-body heating cabin with folding chair, remote control, and heated footpad to accelerate cellular recovery and detoxification.",
    image_url: "/Products/sauna.jpeg",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B08H23V7S5?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$249.00",
        badgeText: "Low EMF Carbon Panels",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B08H23V7S5?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£199.99",
        badgeText: "Low EMF Carbon Panels",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B08H23V7S5?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "229,00€",
        badgeText: "Paneles de Carbono de Bajo EMF",
        isPrimary: true,
        perksNote: "Envío Prime"
      }
    ]
  },
  {
    id: "meditation-cushion",
    name: "basaho Classic Zafu Meditation Cushion",
    category: "Exercise & Fitness Gear",
    rating: 4.85,
    description: "Buckwheat-filled organic cotton meditation cushion to optimize posture, spinal alignment, and vagal tone training.",
    image_url: "/Products/medcushion-uk.webp",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B01697W160?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$35.00",
        badgeText: "Organic Cotton Certified",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B01697W160?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£29.99",
        badgeText: "Buckwheat Filled Premium",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B01697W160?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "34,99€",
        badgeText: "Algodón Orgánico Certificado",
        isPrimary: true,
        perksNote: "Envío Prime"
      }
    ]
  },

  // ============================================================================
  // 4. SUPPLEMENTS & NUTRACEUTICALS
  // ============================================================================
  {
    id: "sirtuin-stack",
    name: "Momentous Sirtuin Activation & Cell Recovery Stack",
    category: "Supplements & Nutraceuticals",
    rating: 4.90,
    description: "Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways.",
    image_url: "/assets/images/shop/sirtuin-stack.png",
    us: [
      {
        supplierName: "Life Extension",
        url: "https://livemomentous.com/modernwisdom?code=modernwisdom",
        ctaText: "Order Sirtuin Stack (US 🇺🇸)",
        priceText: "$89.95",
        badgeText: "NSF Certified for Sport",
        isPrimary: true,
        perksNote: "COA Batch Verified"
      },
      {
        supplierName: "iHerb",
        url: "https://www.iherb.com/search?kw=resveratrol+nad",
        ctaText: "Compare on iHerb US",
        priceText: "From $34.00",
        badgeText: "iHerb Verified",
        isPrimary: false,
        perksNote: "Rewards + 5% Off"
      },
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B07TK5K5TQ?tag=123znl0e-20",
        ctaText: "Buy NAD+ on Amazon US",
        priceText: "$49.00",
        badgeText: "Prime Eligible",
        isPrimary: false,
        perksNote: "Prime 2-Day"
      }
    ],
    uk: [
      {
        supplierName: "Life Extension",
        url: "https://healf.co.uk/collections/momentus",
        ctaText: "Order Sirtuin Stack (Healf UK 🇬🇧)",
        priceText: "£79.99",
        badgeText: "NSF Certified / UK Sourced",
        isPrimary: true,
        perksNote: "Third-Party Purity Tested"
      },
      {
        supplierName: "iHerb",
        url: "https://uk.iherb.com/search?kw=resveratrol+nad",
        ctaText: "Compare on iHerb UK",
        priceText: "From £29.00",
        badgeText: "iHerb UK Direct",
        isPrimary: false,
        perksNote: "Rewards + 5% Off"
      },
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B0BNB8K8Q5?tag=123znl0f3-21",
        ctaText: "Buy NAD+ on Amazon UK",
        priceText: "£64.90",
        badgeText: "UK GMP Certified",
        isPrimary: false,
        perksNote: "Prime Next-Day"
      }
    ],
    es: [
      {
        supplierName: "Life Extension",
        url: "https://newtra.eu",
        ctaText: "Order Sirtuin Stack (Newtra ES 🇪🇸)",
        priceText: "89,95€",
        badgeText: "Customs-Safe EU Delivery",
        isPrimary: true,
        perksNote: "Envío Europeo Sin Aduanas"
      },
      {
        supplierName: "iHerb",
        url: "https://es.iherb.com/search?kw=resveratrol+nad",
        ctaText: "Comparar en iHerb ES",
        priceText: "Desde 32,00€",
        badgeText: "iHerb España",
        isPrimary: false,
        perksNote: "Rewards + 5% Dto."
      },
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B0DBQZBSTM?tag=123znl08a-21",
        ctaText: "Comprar NAD+ en Amazon ES",
        priceText: "129,00€",
        badgeText: "Certificado UE",
        isPrimary: false,
        perksNote: "Envío Prime"
      }
    ]
  },
  {
    id: "marine-collagen",
    name: "Zebora Marine Collagen Peptides Powder",
    category: "Supplements & Nutraceuticals",
    rating: 4.75,
    description: "Hydrolyzed Type I & III fish collagen with biotin and vitamin C to reinforce structural tissue matrix and joint integrity.",
    image_url: "/Products/CollagenUS.jpg",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B07T8H5N1M?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$28.99",
        badgeText: "Non-GMO & Gluten-Free",
        isPrimary: true,
        perksNote: "Prime 2-Day"
      },
      {
        supplierName: "iHerb",
        url: "https://www.iherb.com/search?kw=marine+collagen+peptides",
        ctaText: "Order on iHerb US",
        priceText: "$24.99",
        badgeText: "Wild-Caught Tested",
        isPrimary: false,
        perksNote: "Rewards + 5% Off"
      },
      {
        supplierName: "Life Extension",
        url: "https://www.lifeextension.com/search#q=collagen",
        ctaText: "View on Life Extension",
        priceText: "$27.00",
        badgeText: "Clinical Grade",
        isPrimary: false,
        perksNote: "COA Verified"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B07T8H5N1M?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£24.99",
        badgeText: "Wild-Caught Sourced",
        isPrimary: true,
        perksNote: "Prime Next-Day"
      },
      {
        supplierName: "iHerb",
        url: "https://uk.iherb.com/search?kw=marine+collagen+peptides",
        ctaText: "Order on iHerb UK",
        priceText: "£21.99",
        badgeText: "Lab Audited",
        isPrimary: false,
        perksNote: "Rewards + 5% Off"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B07T8H5N1M?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "27,99€",
        badgeText: "Péptidos de Colágeno Hidrolizado",
        isPrimary: true,
        perksNote: "Envío Prime 24/48h"
      },
      {
        supplierName: "iHerb",
        url: "https://es.iherb.com/search?kw=marine+collagen+peptides",
        ctaText: "Pedir en iHerb ES",
        priceText: "24,50€",
        badgeText: "Pureza Verificada",
        isPrimary: false,
        perksNote: "Rewards + 5% Dto."
      }
    ]
  },

  // ============================================================================
  // 5. KITCHEN & CULINARY BIO-HACKS
  // ============================================================================
  {
    id: "water-bottle",
    name: "Owala FreeSip Insulated Stainless Steel Bottle",
    category: "Kitchen & Culinary Bio-Hacks",
    rating: 4.90,
    description: "Triple-insulated water bottle with patented FreeSip built-in straw, keeping hydration clean and ice-cold for 24 hours.",
    image_url: "/assets/images/shop/water-bottle.png",
    us: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20",
        ctaText: "Buy on Amazon US 🇺🇸",
        priceText: "$27.99",
        badgeText: "Leak-Proof Double Wall",
        isPrimary: true,
        perksNote: "Prime 2-Day • BPA-Free Steel"
      }
    ],
    uk: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.co.uk/dp/B08524B5C6?tag=123znl0f3-21",
        ctaText: "Buy on Amazon UK 🇬🇧",
        priceText: "£22.99",
        badgeText: "Leak-Proof Double Wall",
        isPrimary: true,
        perksNote: "Prime Next-Day • BPA-Free"
      }
    ],
    es: [
      {
        supplierName: "Amazon",
        url: "https://www.amazon.es/dp/B08524B5C6?tag=123znl08a-21",
        ctaText: "Comprar en Amazon ES 🇪🇸",
        priceText: "26,99€",
        badgeText: "Aislamiento de Doble Pared",
        isPrimary: true,
        perksNote: "Envío Prime • Acero Sin BPA"
      }
    ]
  }
];

// Helper to resolve multi-supplier options for any Storefront product (Supabase or Regional Catalog)
export function resolveProductSuppliers(product: any, market: MarketRegion): SupplierOption[] {
  if (Array.isArray(product?.suppliers) && product.suppliers.length > 0) {
    return product.suppliers;
  }

  const mKey = market.toLowerCase() as 'us' | 'uk' | 'es';
  if (Array.isArray(product?.[mKey]) && product[mKey].length > 0) {
    return product[mKey];
  }

  const rawId = String(product?.id || '').toLowerCase().replace(/-(us|uk|es)$/, '');
  const id = String(product?.id || rawId || 'prod');
  const matchedStackItem = sovereignHealthStack.find(item => item.id.toLowerCase() === rawId);

  let dealUrl = String(product?.deal_url || product?.affiliate_link || '');
  let priceText = String(product?.price_text || '');
  let badgeText = String(product?.badge_text || 'Verified');
  const category = String(product?.category || '');
  const title = String(product?.name || product?.title || '');
  const lowerTitle = title.toLowerCase();
  const lowerDeal = dealUrl.toLowerCase();

  if (matchedStackItem) {
    const stackOptions = matchedStackItem[mKey] || [];
    if (stackOptions.length > 0) {
      return stackOptions.map((opt, idx) => ({
        ...opt,
        id: opt.id || `${id || matchedStackItem.id}-${market.toLowerCase()}-${opt.supplierName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        productId: id || matchedStackItem.id,
        marketRegion: market,
        isActive: opt.isActive ?? opt.is_active ?? true,
        url: idx === 0 ? (dealUrl || opt.url) : opt.url,
        priceText: idx === 0 ? (priceText || opt.priceText) : opt.priceText,
        badgeText: idx === 0 ? (badgeText || opt.badgeText) : opt.badgeText
      }));
    }
  }

  // Determine primary supplier name
  let primarySupplier: SupplierOption['supplierName'] = 'Amazon';
  let primaryPerks = market === 'ES' ? 'Envío Prime 24/48h' : market === 'UK' ? 'Prime Next-Day' : 'Prime 2-Day';
  let primaryCta =
    market === 'ES'
      ? 'Comprar en Amazon ES 🇪🇸'
      : market === 'UK'
        ? 'Buy on Amazon UK 🇬🇧'
        : 'Buy on Amazon US 🇺🇸';

  if (
    lowerTitle.includes('12-week metabolic') ||
    lowerTitle.includes('visceral fat protocol') ||
    lowerDeal.includes('metabolic-visceral-fat') ||
    lowerDeal.includes('metabolic-master-guide')
  ) {
    primarySupplier = 'Life Extension';
    primaryPerks = 'Instant Protocol Access • Secure Checkout';
    primaryCta = 'Access Paid Protocol 🔒 — £29.00';
    dealUrl = '/checkout?item=metabolic-visceral-fat-protocol';
    priceText = '£29.00';
  } else if (
    market === 'US' && (
      id.includes('essential-blood') ||
      lowerDeal.includes('itemqd100025') ||
      (lowerTitle.includes('basic') && (lowerTitle.includes('blood') || lowerTitle.includes('aging') || lowerTitle.includes('panel')))
    )
  ) {
    // Temporary US Blood Test Links: Basic Option (#QD100025)
    primarySupplier = 'Life Extension';
    primaryPerks = 'Item #QD100025 • Entry-Level Baseline';
    primaryCta = 'Order Basic Panel ($155 🇺🇸)';
    dealUrl = US_BLOOD_TEST_BASIC_URL;
    priceText = '$155.00';
    badgeText = US_BLOOD_TEST_BASIC_BADGE;
  } else if (
    market === 'US' && (
      id.includes('blood-panel') ||
      lowerDeal.includes('itemqd100026') ||
      lowerDeal.includes('healthy-aging-panel') ||
      ((lowerTitle.includes('blood') || lowerTitle.includes('cellular') || lowerTitle.includes('biomarker') || lowerTitle.includes('comprehensive')) &&
        !id.includes('pressure') && !lowerTitle.includes('pressure') &&
        !id.includes('ovarian') && !lowerTitle.includes('ovarian'))
    )
  ) {
    // Temporary US Blood Test Links: Comprehensive (#QD100026)
    primarySupplier = 'Life Extension';
    primaryPerks = 'Item #QD100026 • Quest Diagnostics Requisition';
    primaryCta = 'Order Comprehensive Panel (Life Extension US 🇺🇸)';
    dealUrl = US_BLOOD_TEST_COMPREHENSIVE_URL;
    priceText = 'From $299.00';
    badgeText = US_BLOOD_TEST_COMPREHENSIVE_BADGE;
  } else if (
    market === 'US' && (
      id.includes('urinalysis-test') ||
      id === 'urinalysis-us' ||
      id === 'urinalysis-acr' ||
      lowerDeal.includes('itemqd007909') ||
      (id.includes('urinalysis') && !id.includes('reagent') && !lowerTitle.includes('dipstick') && !lowerTitle.includes('urinox'))
    )
  ) {
    // US Clinical Lab Urinalysis (Life Extension Item #QD007909)
    primarySupplier = 'Life Extension';
    primaryPerks = 'Item #QD007909 • Quest Diagnostics Requisition';
    primaryCta = 'Order Lab Urinalysis (Life Extension $24 🇺🇸)';
    dealUrl = US_URINALYSIS_TEST_URL;
    priceText = '$24.00';
    badgeText = US_URINALYSIS_TEST_BADGE;
  } else if (market === 'UK' && (id.includes('epigenetic') || lowerTitle.includes('epigenetic') || lowerTitle.includes('truage') || (lowerTitle.includes('biological age') && !id.includes('blood-panel')))) {
    primarySupplier = 'LOLA Health UK';
    primaryPerks = 'TruAge • Biological Age & DunedinPACE';
    primaryCta = 'Order Your TruAge Test on LOLA Health UK 🇬🇧';
    dealUrl = 'https://snwbl.io/out/NcealZ11';
    priceText = 'From £375.00';
    badgeText = '🇬🇧 UK (LOLA/UKAS)';
  } else if (market === 'UK' && (id.includes('vital') || lowerTitle.includes('vital check') || id === 'blood-panel-uk-vital56' || (lowerTitle.includes('56') && (lowerTitle.includes('blood') || lowerTitle.includes('longevity'))))) {
    primarySupplier = 'LOLA Health UK';
    primaryPerks = '56 Biomarkers • ApoB, hs-CRP, Hormones & Home Draw';
    primaryCta = 'Select Vital Check 56 (LOLA UK 🇬🇧)';
    dealUrl = 'https://snwbl.io/out/NcealZ11';
    priceText = 'From £155.00';
    badgeText = '⭐ Recommended Longevity Baseline • 56 Biomarkers';
  } else if (market === 'UK' && (id.includes('core') || lowerTitle.includes('core health') || id === 'blood-panel-uk-core45' || id.includes('essential-blood'))) {
    primarySupplier = 'LOLA Health';
    primaryPerks = '45 Essential Biomarkers • UKAS Lab';
    primaryCta = 'Select Core Health 45 (LOLA UK 🇬🇧)';
    dealUrl = 'https://referrals.lolahealth.com/NextLevel15';
    priceText = 'From £125.00';
    badgeText = '45 Essential Biomarkers • UKAS Accredited';
  } else if (
    market === 'UK' && (
      id.includes('urinalysis') || lowerTitle.includes('urinalysis') || lowerTitle.includes('acr')
    ) && !id.includes('reagent') && !lowerTitle.includes('dipstick') && !lowerTitle.includes('urinox') && !id.includes('alltest')
  ) {
    primarySupplier = 'LOLA Health UK';
    primaryPerks = 'UKAS Lab • Urine Albumin & Renal Screen';
    primaryCta = 'Order Urinalysis on LOLA Health UK 🇬🇧';
    dealUrl = 'https://referrals.lolahealth.com/NextLevel15';
    priceText = 'From £65.00';
    badgeText = '🇬🇧 UK (LOLA/UKAS)';
  } else if (lowerDeal.includes('snwbl.io')) {
    primarySupplier = 'LOLA Health UK';
    primaryPerks = 'TruAge • Biological Age & DunedinPACE';
    primaryCta = 'Order Your TruAge Test on LOLA Health UK 🇬🇧';
    dealUrl = 'https://snwbl.io/out/NcealZ11';
    priceText = 'From £375.00';
  } else if (lowerDeal.includes('lolahealth') || (market === 'UK' && lowerTitle.includes('lola'))) {
    primarySupplier = 'LOLA Health';
    primaryPerks = '15% Off Referral • UKAS Lab';
    primaryCta = 'Select Core Health 45 (LOLA UK 🇬🇧)';
    priceText = 'From £125.00';
    badgeText = '45 Essential Biomarkers • UKAS Accredited';
  } else if (lowerDeal.includes('healthlabs')) {
    primarySupplier = 'HealthLabs';
    primaryPerks = 'CLIA/CAP Quest & Labcorp';
    primaryCta = 'Order via HealthLabs US 🇺🇸';
  } else if (lowerDeal.includes('melio')) {
    primarySupplier = 'Melio';
    primaryPerks = '160+ Centros Eurofins Megalab';
    primaryCta = 'Pedir en Melio ES 🇪🇸';
  } else if (lowerDeal.includes('withings')) {
    primarySupplier = 'Withings';
    primaryPerks = '2-Year Official Warranty';
    primaryCta = `Order Direct from Withings ${market}`;
  } else if (lowerDeal.includes('iherb')) {
    primarySupplier = 'iHerb';
    primaryPerks = 'Rewards + 5% Off';
    primaryCta = `Order on iHerb ${market}`;
  } else if (lowerDeal.includes('lifeextension') || lowerDeal.includes('livemomentous') || lowerDeal.includes('healf') || lowerDeal.includes('newtra')) {
    primarySupplier = 'Life Extension';
    primaryPerks = 'COA Purity Audited';
    primaryCta = `Order Direct (${market})`;
  } else if (lowerDeal.includes('/checkout')) {
    primarySupplier = 'Life Extension';
    primaryPerks = 'Instant Digital PDF Download';
    primaryCta = 'Get Master Guide ➔';
  }

  const options: SupplierOption[] = [
    {
      id: `${id || 'prod'}-${market.toLowerCase()}-${primarySupplier.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      productId: id,
      marketRegion: market,
      supplierName: primarySupplier,
      url: dealUrl || '#',
      ctaText: primaryCta,
      priceText: priceText || (market === 'UK' ? '£24.99' : market === 'ES' ? '24,99€' : '$29.99'),
      badgeText,
      isPrimary: true,
      isActive: true,
      perksNote: primaryPerks
    }
  ];

  // Add alternate tier option for US Blood Tests
  if (market === 'US') {
    const isBasicCard = id.includes('essential-blood') || lowerDeal.includes('itemqd100025') || (lowerTitle.includes('basic') && lowerTitle.includes('panel'));
    const isCompCard = !isBasicCard && (
      id.includes('blood-panel') ||
      lowerDeal.includes('itemqd100026') ||
      lowerDeal.includes('healthy-aging-panel') ||
      ((lowerTitle.includes('blood') || lowerTitle.includes('cellular') || lowerTitle.includes('biomarker')) &&
        !id.includes('pressure') && !lowerTitle.includes('pressure') &&
        !id.includes('ovarian') && !lowerTitle.includes('ovarian'))
    );

    if (isCompCard) {
      options.push({
        id: `${id || 'prod'}-us-life-extension-basic`,
        productId: id,
        marketRegion: 'US',
        supplierName: 'Life Extension (Basic $155)',
        url: US_BLOOD_TEST_BASIC_URL,
        ctaText: 'Order Basic Panel ($155)',
        priceText: '$155.00',
        badgeText: US_BLOOD_TEST_BASIC_BADGE,
        isPrimary: false,
        isActive: true,
        perksNote: 'Item #QD100025 • Entry Baseline'
      });
    } else if (isBasicCard) {
      options.push({
        id: `${id || 'prod'}-us-life-extension-comp`,
        productId: id,
        marketRegion: 'US',
        supplierName: 'Life Extension (Comprehensive)',
        url: US_BLOOD_TEST_COMPREHENSIVE_URL,
        ctaText: 'Order Comprehensive Panel ($299)',
        priceText: 'From $299.00',
        badgeText: US_BLOOD_TEST_COMPREHENSIVE_BADGE,
        isPrimary: false,
        isActive: true,
        perksNote: 'Item #QD100026 • 56-Biomarker Map'
      });
    }
  }

  // Add multi-supplier options for Supplements & Nutraceuticals (excluding digital guides)
  if (
    category.includes('Supplements') &&
    !lowerDeal.includes('/checkout') &&
    !lowerTitle.includes('master guide') &&
    !lowerTitle.includes('12-week metabolic')
  ) {
    const cleanKeywords = encodeURIComponent(
      title
        .replace(/[^a-zA-Z0-9\s]/g, ' ')
        .split(/\s+/)
        .slice(0, 3)
        .join(' ')
    );
    const iherbDomain = market === 'UK' ? 'https://uk.iherb.com' : market === 'ES' ? 'https://es.iherb.com' : 'https://www.iherb.com';
    const leDomain = market === 'US' ? 'https://www.lifeextension.com' : 'https://www.lifeextensioneurope.com';

    if (primarySupplier !== 'iHerb') {
      options.push({
        id: `${id || 'prod'}-${market.toLowerCase()}-iherb`,
        productId: id,
        marketRegion: market,
        supplierName: 'iHerb',
        url: `${iherbDomain}/search?kw=${cleanKeywords}`,
        ctaText: market === 'ES' ? 'Ver en iHerb' : 'Compare on iHerb',
        priceText: priceText,
        badgeText: 'Third-Party Tested',
        isPrimary: false,
        isActive: true,
        perksNote: 'Rewards + 5% Off'
      });
    }
    if (primarySupplier !== 'Life Extension') {
      options.push({
        id: `${id || 'prod'}-${market.toLowerCase()}-life-extension`,
        productId: id,
        marketRegion: market,
        supplierName: 'Life Extension',
        url: `${leDomain}/search#q=${cleanKeywords}`,
        ctaText: market === 'ES' ? 'Life Extension UE' : 'Life Extension',
        priceText: priceText,
        badgeText: 'COA Lab Verified',
        isPrimary: false,
        isActive: true,
        perksNote: 'Clinical Potency'
      });
    }
  }

  // Add Withings Direct secondary option for Withings hardware
  if (lowerTitle.includes('withings') && primarySupplier === 'Amazon') {
    const withingsLocale = market === 'UK' ? 'uk/en' : market === 'ES' ? 'es/es' : 'us/en';
    options.push({
      id: `${id || 'prod'}-${market.toLowerCase()}-withings`,
      productId: id,
      marketRegion: market,
      supplierName: 'Withings',
      url: `https://www.withings.com/${withingsLocale}`,
      ctaText: market === 'ES' ? 'Withings Oficial' : 'Withings Direct',
      priceText: priceText,
      badgeText: 'Official Store',
      isPrimary: false,
      isActive: true,
      perksNote: '2-Yr Warranty'
    });
  }

  return options;
}

// Centralized affiliate links dictionary for legacy page compatibility
export const affiliateLinks: Record<string, any> = {
  us: 'https://amazon.com/dp/B0CXM1X8PQ',
  uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
  es: 'https://amazon.es/dp/B0CXM1X8PQ',
  oura: 'https://www.amazon.com/Oura-Ring-Gen3-Horizon-Stealth/dp/B0D4N3L9XW',
  insidetracker: 'https://www.insidetracker.com/',
  levels: 'https://amazon.com/dp/B0CXM1X8PQ',
  strength: 'https://amazon.com/dp/B0CLB5X8X9',
  menopause: 'https://amazon.com/dp/B0CMB6X8Y1',
  creatine: 'https://amazon.com/dp/B0CXM1X8PQ',
  nad: 'https://livemomentous.com/modernwisdom?code=modernwisdom',
  epigenetic: 'https://amazon.com/dp/B0D5N6X8Z2',
  lola_truage_epigenetic: 'https://snwbl.io/out/NcealZ11',
  epigenetic_uk: 'https://snwbl.io/out/NcealZ11',
  lola_core_health: 'https://referrals.lolahealth.com/NextLevel15',
  lola_vital_check: 'https://snwbl.io/out/NcealZ11',
  lola_peak_insights: 'https://referrals.lolahealth.com/NextLevel15',
  lola_health: 'https://referrals.lolahealth.com/NextLevel15',
  hp_blood_panel_uk: 'https://referrals.lolahealth.com/NextLevel15',
  hp_blood_panel_us: US_BLOOD_TEST_COMPREHENSIVE_URL,
  us_blood_test_comprehensive: US_BLOOD_TEST_COMPREHENSIVE_URL,
  us_blood_test_basic: US_BLOOD_TEST_BASIC_URL,
  hp_urinalysis_us: US_URINALYSIS_TEST_URL,
  us_urinalysis_test: US_URINALYSIS_TEST_URL,
  urinalysis_test_us: US_URINALYSIS_TEST_URL,
  hp_biological_age: 'https://amazon.com/dp/B0CXM1X8PQ',
  hp_nad_stack: 'https://livemomentous.com/modernwisdom?code=modernwisdom',
  hp_bio_response: 'https://amazon.com/dp/B0CXM1X8PQ',
  hp_kit_us: 'https://amazon.com/dp/B0CXM1X8PQ',
  hp_kit_uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
  hp_kit_es: 'https://amazon.es/dp/B0CXM1X8PQ',
  hp_spermidine: 'https://www.amazon.com/dp/B08J5P8D9D',
  hp_quercetin: 'https://www.amazon.com/dp/B07BFR4QC2',
  hp_nad_complete: 'https://renuebyscience.com/',
  hp_coq10: 'https://www.amazon.com/dp/B0019GW3Y8',
};

export const LOLA_HEALTH_AFFILIATE_URL = 'https://referrals.lolahealth.com/NextLevel15';
export const UK_BLOOD_TEST_AFFILIATE_URL = 'https://referrals.lolahealth.com/NextLevel15';
