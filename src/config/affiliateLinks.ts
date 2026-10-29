export type MarketRegion = 'US' | 'UK' | 'ES';
export type ProductCategory =
  | '🩸 Clinical Diagnostics & Lab Testing'
  | '⌚ Smart Hardware & Wearables'
  | '🌿 Supplements & Master Guides'
  | 'Tech Gadgets & Wearables'
  | 'Performance & Testing'
  | 'Supplements'
  | 'Lifestyle & Performance Gear'
  | 'Rapid Fluid Telemetry';

export interface ProductMarketConfig {
  url: string;
  ctaText: string;
  badge: string;
  network: string;
  priceText: string;
}

export interface SovereignProduct {
  id: string;
  name: string;
  category: ProductCategory;
  isDirectAffiliate: boolean;
  rating: number;
  description: string;
  image_url: string;
  us: ProductMarketConfig;
  uk: ProductMarketConfig;
  es: ProductMarketConfig;
}

export interface SovereignProductItem {
  id: string;
  name: string;
  category: string;
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
}

export const sovereignHealthStack: SovereignProduct[] = [
  {
    id: "essential-blood-panel",
    name: "Choice A: Essential Baseline Bloods (Core Lipids, HbA1c, Fasting Glucose)",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: true,
    rating: 4.92,
    description: "Core cardiovascular and metabolic blood panel measuring Cholesterol, HDL, LDL, Triglycerides, Fasting Glucose, HbA1c, and basic kidney/liver filtration.",
    image_url: "/Products/clinical-blood-panel.jpg",
    us: {
      url: "https://www.healthlabs.com/?affiliate=123znl",
      ctaText: "Order Baseline Bloods (HealthLabs US 🇺🇸)",
      badge: "🇺🇸 US (HealthLabs/Quest)",
      network: "HealthLabs Direct",
      priceText: "From $99.00"
    },
    uk: {
      url: "https://referrals.lolahealth.com/NextLevel15",
      ctaText: "Order Baseline Bloods (LOLA UK 🇬🇧)",
      badge: "🇬🇧 UK (LOLA/UKAS)",
      network: "LOLA Health Partner",
      priceText: "From £69.00"
    },
    es: {
      url: "https://www.melio.es",
      ctaText: "Order Baseline Bloods (Melio ES 🇪🇸)",
      badge: "🇪🇸 ES (Melio/Megalab)",
      network: "Melio ES Partner",
      priceText: "Desde 69,00€"
    }
  },
  {
    id: "blood-panel",
    name: "Choice B: Vital Check 56 (Full 56-Biomarker Cellular Panel)",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: true,
    rating: 4.95,
    description: "Direct-to-consumer longevity blood panels mapping 56 essential biomarkers including ApoB, hs-CRP, Vitamin D, Thyroid, and Hormones. Local Quest/Labcorp draw in the US, private clinical setups in UK and ES.",
    image_url: "/Products/clinical-blood-panel.jpg",
    us: {
      url: "https://www.healthlabs.com/?affiliate=123znl",
      ctaText: "Order 56-Biomarker Panel (HealthLabs US 🇺🇸)",
      badge: "🇺🇸 US (HealthLabs/Quest)",
      network: "HealthLabs Direct",
      priceText: "From $299.00"
    },
    uk: {
      url: "https://referrals.lolahealth.com/NextLevel15",
      ctaText: "Order 56-Biomarker Panel (LOLA UK 🇬🇧)",
      badge: "🇬🇧 UK (LOLA/UKAS)",
      network: "LOLA Health Partner",
      priceText: "From £149.00"
    },
    es: {
      url: "https://www.melio.es",
      ctaText: "Order 56-Biomarker Panel (Melio ES 🇪🇸)",
      badge: "🇪🇸 ES (Melio/Megalab)",
      network: "Melio ES Partner",
      priceText: "Desde 149,00€"
    }
  },
  {
    id: "urinalysis-acr",
    name: "Clinical Lab Urine ACR (Microalbumin & Creatinine Panel)",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: true,
    rating: 4.91,
    description: "Synchronized clinical urinalysis measuring Albumin-to-Creatinine Ratio (ACR), Microalbumin, and Creatinine to evaluate renal filtration alongside your blood draw.",
    image_url: "/Products/clinical-urine-acr.jpg",
    us: {
      url: "https://www.healthlabs.com/?affiliate=123znl",
      ctaText: "Order Lab Urine ACR (HealthLabs US 🇺🇸)",
      badge: "🇺🇸 US (HealthLabs/Quest)",
      network: "HealthLabs Direct",
      priceText: "From $69.00"
    },
    uk: {
      url: "https://referrals.lolahealth.com/NextLevel15",
      ctaText: "Order Lab Urine ACR (LOLA UK 🇬🇧)",
      badge: "🇬🇧 UK (LOLA/UKAS)",
      network: "LOLA Health Partner",
      priceText: "From £49.00"
    },
    es: {
      url: "https://www.melio.es",
      ctaText: "Order Lab Urine ACR (Melio ES 🇪🇸)",
      badge: "🇪🇸 ES (Melio/Megalab)",
      network: "Melio ES Partner",
      priceText: "Desde 39,00€"
    }
  },
  {
    id: "cgm",
    name: "Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: true,
    rating: 4.80,
    description: "Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health.",
    image_url: "/Products/clinical-cgm-sensor.jpg",
    us: {
      url: "https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20",
      ctaText: "Order CGM Sensor (Lingo US 🇺🇸)",
      badge: "🇺🇸 US (Abbott Lingo / FDA)",
      network: "Amazon Associates",
      priceText: "From $89.00/mo"
    },
    uk: {
      url: "https://hellolingo.co.uk",
      ctaText: "Order CGM Sensor (Lingo UK 🇬🇧)",
      badge: "🇬🇧 UK (Abbott Lingo / MHRA)",
      network: "Lingo UK Direct",
      priceText: "From £79.00/mo"
    },
    es: {
      url: "https://www.dexcom.com/es-ES",
      ctaText: "Order CGM Sensor (Dexcom ES 🇪🇸)",
      badge: "🇪🇸 ES (Dexcom ONE+ / CE)",
      network: "Dexcom ES Portal",
      priceText: "Desde 79,00€/mo"
    }
  },
  {
    id: "stethoscope",
    name: "Eko CORE 500™ Digital AI Stethoscope",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: true,
    rating: 4.95,
    description: "FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds.",
    image_url: "/Products/clinical-ai-stethoscope.jpg",
    us: {
      url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      ctaText: "Order AI Stethoscope (Eko US 🇺🇸)",
      badge: "🇺🇸 US (Eko Health / FDA)",
      network: "Eko Health Direct",
      priceText: "$429.00"
    },
    uk: {
      url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      ctaText: "Order AI Stethoscope (Eko UK 🇬🇧)",
      badge: "🇬🇧 UK (Eko Health / MHRA)",
      network: "Eko Health Direct",
      priceText: "£379.00"
    },
    es: {
      url: "https://www.doccheck.com/es/",
      ctaText: "Order AI Stethoscope (DocCheck ES 🇪🇸)",
      badge: "🇪🇸 ES (Eko Health / CE)",
      network: "DocCheck EU Partner",
      priceText: "429,00€"
    }
  },
  {
    id: "sirtuin-stack",
    name: "Momentous Sirtuin Activation & Cell Recovery Stack",
    category: "🌿 Supplements & Master Guides",
    isDirectAffiliate: true,
    rating: 4.90,
    description: "Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways.",
    image_url: "/assets/images/shop/sirtuin-stack.png",
    us: {
      url: "https://livemomentous.com/modernwisdom?code=modernwisdom",
      ctaText: "Order Sirtuin Stack (Momentous US 🇺🇸)",
      badge: "NSF Certified for Sport",
      network: "Momentous Partner",
      priceText: "$89.95"
    },
    uk: {
      url: "https://healf.co.uk/collections/momentus",
      ctaText: "Order Sirtuin Stack (Healf UK 🇬🇧)",
      badge: "NSF Certified / UK Sourced",
      network: "Healf UK Portal",
      priceText: "£79.99"
    },
    es: {
      url: "https://newtra.eu",
      ctaText: "Order Sirtuin Stack (Newtra ES 🇪🇸)",
      badge: "Customs-Safe EU Delivery",
      network: "Newtra EU Portal",
      priceText: "89,95€"
    }
  },
  {
    id: "reagent-strips",
    name: "10-Parameter Home Urinalysis Dipstick Kit",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: false,
    rating: 4.90,
    description: "Direct medical-grade 10-parameter urinalysis strips for weekly tracking of microvascular health, proteinuria, pH, ketones, glucose, and renal function.",
    image_url: "/Products/aymed.webp",
    us: {
      url: "https://diagnoxhealth.com/products/urinalysis-test",
      ctaText: "Order Home Dipstick Kit (Diagnox US 🇺🇸)",
      badge: "🇺🇸 US (Diagnox / FDA Cleared)",
      network: "Diagnox Health Direct",
      priceText: "From $16.99"
    },
    uk: {
      url: "https://referrals.lolahealth.com/NextLevel15",
      ctaText: "Order Home Dipstick Kit (LOLA UK 🇬🇧)",
      badge: "🇬🇧 UK (ALLTEST / CE Marked)",
      network: "LOLA Health Direct",
      priceText: "From £12.99"
    },
    es: {
      url: "https://www.melio.es",
      ctaText: "Order Home Dipstick Kit (ALLTEST ES 🇪🇸)",
      badge: "🇪🇸 ES (ALLTEST / Marcado CE)",
      network: "SaludOnNet / Eurofins Direct",
      priceText: "Desde 14,50€"
    }
  },
  {
    id: "epigenetic-test",
    name: "Biological Age & Epigenetic Methylation Test Kit",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: true,
    rating: 4.93,
    description: "DunedinPACE epigenetic clock and DNA methylation pace-of-aging test kit to quantify your biological age trajectory vs chronological age.",
    image_url: "/Products/clinical-epigenetic-kit.jpg",
    us: {
      url: "https://www.healthlabs.com/?affiliate=123znl",
      ctaText: "Order Epigenetic Kit (HealthLabs US 🇺🇸)",
      badge: "🇺🇸 US (HealthLabs/Quest)",
      network: "HealthLabs Direct",
      priceText: "From $299.00"
    },
    uk: {
      url: "https://referrals.lolahealth.com/NextLevel15",
      ctaText: "Order Epigenetic Kit (LOLA UK 🇬🇧)",
      badge: "🇬🇧 UK (LOLA/UKAS)",
      network: "LOLA Health Partner",
      priceText: "From £249.00"
    },
    es: {
      url: "https://www.melio.es",
      ctaText: "Order Epigenetic Kit (Melio ES 🇪🇸)",
      badge: "🇪🇸 ES (Melio/Megalab)",
      network: "Melio ES Partner",
      priceText: "Desde 249,00€"
    }
  },
  {
    id: "blood-pressure-cuff",
    name: "Withings BPM Connect Wi-Fi Cuff",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.80,
    description: "Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data.",
    image_url: "/assets/images/shop/bpm-connect.png",
    us: {
      url: "https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20",
      ctaText: "Review Vascular Compliance on Withings US 🇺🇸",
      badge: "FDA Cleared",
      network: "Amazon Associates",
      priceText: "$99.95"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21",
      ctaText: "Review Vascular Compliance on Withings UK 🇬🇧",
      badge: "CE Medical Class IIa",
      network: "Amazon Associates",
      priceText: "£89.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21",
      ctaText: "Review Vascular Compliance on Withings ES 🇪🇸",
      badge: "CE Medical Class IIa",
      network: "Amazon Associates",
      priceText: "99,95€"
    }
  },
  {
    id: "sleep-analyzer",
    name: "Withings Sleep Analyzer Under-Mattress Pad",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.82,
    description: "A contact-free sleep tracker placed under your mattress. Automatically logs sleeping heart rate, sleep cycles, and passive breathing disturbances.",
    image_url: "/assets/images/shop/sleep-analyzer.png",
    us: {
      url: "https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20",
      ctaText: "Review Sleep Telemetry on Withings US 🇺🇸",
      badge: "Touch-Free Sleep Science",
      network: "Amazon Associates",
      priceText: "$129.95"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21",
      ctaText: "Review Sleep Telemetry on Withings UK 🇬🇧",
      badge: "CE Medically Validated (Apnea)",
      network: "Amazon Associates",
      priceText: "£119.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21",
      ctaText: "Review Sleep Telemetry on Withings ES 🇪🇸",
      badge: "CE Medically Validated (Apnea)",
      network: "Amazon Associates",
      priceText: "129,95€"
    }
  },
  {
    id: "segmental-scale",
    name: "Withings Body Scan Segmental Composition Scale",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.88,
    description: "FDA-cleared 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index.",
    image_url: "/assets/images/shop/body-scan.png",
    us: {
      url: "https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20",
      ctaText: "Examine Somatic Metrics on Withings US 🇺🇸",
      badge: "FDA Cleared",
      network: "Amazon Associates",
      priceText: "$399.95"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21",
      ctaText: "Examine Somatic Metrics on Withings UK 🇬🇧",
      badge: "CE Medical Marked",
      network: "Amazon Associates",
      priceText: "£349.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21",
      ctaText: "Examine Somatic Metrics on Withings ES 🇪🇸",
      badge: "CE Medical Marked",
      network: "Amazon Associates",
      priceText: "399,95€"
    }
  },
  {
    id: "wearable-tracker",
    name: "Apple Watch Series 10 (GPS 46mm)",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.80,
    description: "Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and Heart Rate Variability (HRV).",
    image_url: "/assets/images/shop/apple-watch.png",
    us: {
      url: "https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20",
      ctaText: "Compare Wearables on Amazon US 🇺🇸",
      badge: "FDA Approved Heart Notifications",
      network: "Amazon Associates",
      priceText: "$399.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21",
      ctaText: "Compare Wearables on Amazon UK 🇬🇧",
      badge: "MHRA Certified Telemetry",
      network: "Amazon Associates",
      priceText: "£379.00"
    },
    es: {
      url: "https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21",
      ctaText: "Compare Wearables on Amazon ES 🇪🇸",
      badge: "CE Compliant Biometrics",
      network: "Amazon Associates",
      priceText: "399,00€"
    }
  },
  {
    id: "noise-headphones",
    name: "Sony WH-CH720N Noise-Canceling Headphones",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.90,
    description: "Immersive active noise cancellation to completely isolate your auditory environment during vagal and deep-breathing mindfulness cycles.",
    image_url: "/assets/images/shop/sony-headphones.png",
    us: {
      url: "https://www.amazon.com/dp/B0BTY3Y6PP?tag=123znl0e-20",
      ctaText: "Examine Noise Isolation on Amazon US 🇺🇸",
      badge: "Ultra-Lightweight Comfort",
      network: "Amazon Associates",
      priceText: "$149.99"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0BTY3Y6PP?tag=123znl0f3-21",
      ctaText: "Examine Noise Isolation on Amazon UK 🇬🇧",
      badge: "35-Hour Battery Life",
      network: "Amazon Associates",
      priceText: "£119.00"
    },
    es: {
      url: "https://www.amazon.es/dp/B0BTY3Y6PP?tag=123znl08a-21",
      ctaText: "Examine Noise Isolation on Amazon ES 🇪🇸",
      badge: "Cancelación Activa de Ruido",
      network: "Amazon Associates",
      priceText: "129,00€"
    }
  },
  {
    id: "meditation-cushion",
    name: "basaho Classic Zafu Meditation Cushion",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.85,
    description: "Buckwheat-filled organic cotton meditation cushion to optimize posture, spinal alignment, and vagal tone training.",
    image_url: "/assets/images/shop/meditation-cushion.png",
    us: {
      url: "https://www.amazon.com/dp/B01697W160?tag=123znl0e-20",
      ctaText: "View Ergonomics on Amazon US 🇺🇸",
      badge: "Organic Cotton Certified",
      network: "Amazon Associates",
      priceText: "$35.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B01697W160?tag=123znl0f3-21",
      ctaText: "View Ergonomics on Amazon UK 🇬🇧",
      badge: "Buckwheat Filled Premium",
      network: "Amazon Associates",
      priceText: "£29.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B01697W160?tag=123znl08a-21",
      ctaText: "View Ergonomics on Amazon ES 🇪🇸",
      badge: "Algodón Orgánico Certificado",
      network: "Amazon Associates",
      priceText: "34,99€"
    }
  },
  {
    id: "marine-collagen",
    name: "Zebora Marine Collagen Peptides Powder",
    category: "🌿 Supplements & Master Guides",
    isDirectAffiliate: false,
    rating: 4.75,
    description: "Hydrolyzed Type I & III fish collagen with biotin and vitamin C to reinforce structural tissue matrix and joint integrity.",
    image_url: "/assets/images/shop/marine-collagen.png",
    us: {
      url: "https://www.amazon.com/dp/B07T8H5N1M?tag=123znl0e-20",
      ctaText: "Buy Marine Collagen on Amazon US 🇺🇸",
      badge: "Non-GMO & Gluten-Free",
      network: "Amazon Associates",
      priceText: "$28.99"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B07T8H5N1M?tag=123znl0f3-21",
      ctaText: "Buy Marine Collagen on Amazon UK 🇬🇧",
      badge: "Wild-Caught Sourced",
      network: "Amazon Associates",
      priceText: "£24.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B07T8H5N1M?tag=123znl08a-21",
      ctaText: "Buy Marine Collagen on Amazon ES 🇪🇸",
      badge: "Péptidos de Colágeno Hidrolizado",
      network: "Amazon Associates",
      priceText: "27,99€"
    }
  },
  {
    id: "water-bottle",
    name: "Owala FreeSip Insulated Stainless Steel Bottle",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.90,
    description: "Triple-insulated water bottle with patented FreeSip built-in straw, keeping hydration clean and ice-cold for 24 hours.",
    image_url: "/assets/images/shop/water-bottle.png",
    us: {
      url: "https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20",
      ctaText: "Examine Hydration Gear on Amazon US 🇺🇸",
      badge: "Leak-Proof Double Wall",
      network: "Amazon Associates",
      priceText: "$27.99"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B08524B5C6?tag=123znl0f3-21",
      ctaText: "Examine Hydration Gear on Amazon UK 🇬🇧",
      badge: "Leak-Proof Double Wall",
      network: "Amazon Associates",
      priceText: "£22.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B08524B5C6?tag=123znl08a-21",
      ctaText: "Examine Hydration Gear on Amazon ES 🇪🇸",
      badge: "Aislamiento de Doble Pared",
      network: "Amazon Associates",
      priceText: "26,99€"
    }
  },
  {
    id: "rowing-machine",
    name: "Concept2 Remo Indoor Model D Rower",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.95,
    description: "The gold-standard indoor rowing machine with PM5 monitor to optimize cardiorespiratory output, muscular baseline, and metabolic power.",
    image_url: "/assets/images/shop/rower.png",
    us: {
      url: "https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20",
      ctaText: "Compare Rowers on Amazon US 🇺🇸",
      badge: "Clinical Standard PM5 Monitor",
      network: "Amazon Associates",
      priceText: "$990.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B099KBD9X8?tag=123znl0f3-21",
      ctaText: "Compare Rowers on Amazon UK 🇬🇧",
      badge: "Clinical Standard PM5 Monitor",
      network: "Amazon Associates",
      priceText: "£850.00"
    },
    es: {
      url: "https://www.amazon.es/dp/B099KBD9X8?tag=123znl08a-21",
      ctaText: "Compare Rowers on Amazon ES 🇪🇸",
      badge: "Monitor PM5 Estándar",
      network: "Amazon Associates",
      priceText: "950,00€"
    }
  },
  {
    id: "sauna-tent",
    name: "Portable Full-Body Infrared Sauna Tent",
    category: "⌚ Smart Hardware & Wearables",
    isDirectAffiliate: false,
    rating: 4.80,
    description: "Advanced far-infrared full-body heating cabin with folding chair, remote control, and heated footpad to accelerate cellular recovery and detoxification.",
    image_url: "/assets/images/shop/sauna.png",
    us: {
      url: "https://www.amazon.com/dp/B08H23V7S5?tag=123znl0e-20",
      ctaText: "Review Thermal Caps on Amazon US 🇺🇸",
      badge: "Low EMF Carbon Panels",
      network: "Amazon Associates",
      priceText: "$249.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B08H23V7S5?tag=123znl0f3-21",
      ctaText: "Review Thermal Caps on Amazon UK 🇬🇧",
      badge: "Low EMF Carbon Panels",
      network: "Amazon Associates",
      priceText: "£199.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B08H23V7S5?tag=123znl08a-21",
      ctaText: "Review Thermal Caps on Amazon ES 🇪🇸",
      badge: "Paneles de Carbono de Bajo EMF",
      network: "Amazon Associates",
      priceText: "229,00€"
    }
  },
  {
    id: "ovarian-test",
    name: "Ovarian Reserve Female Hormone Test Kit",
    category: "🩸 Clinical Diagnostics & Lab Testing",
    isDirectAffiliate: false,
    rating: 4.85,
    description: "A biology-specific finger-prick blood test to evaluate ovarian reserve and reproductive longevity baselines.",
    image_url: "/assets/images/shop/ovarian-test.png",
    us: {
      url: "https://www.amazon.com/dp/B08H7V69F7?tag=123znl0e-20",
      ctaText: "Order Hormone Test (HealthLabs US 🇺🇸)",
      badge: "🇺🇸 US (HealthLabs/Quest)",
      network: "Amazon Associates",
      priceText: "$49.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B08H7V69F7?tag=123znl0f3-21",
      ctaText: "Order Hormone Test (LOLA UK 🇬🇧)",
      badge: "🇬🇧 UK (LOLA/UKAS)",
      network: "Amazon Associates",
      priceText: "£39.00"
    },
    es: {
      url: "https://www.amazon.es/dp/B08H7V69F7?tag=123znl08a-21",
      ctaText: "Order Hormone Test (Melio ES 🇪🇸)",
      badge: "🇪🇸 ES (Melio/Megalab)",
      network: "Amazon Associates",
      priceText: "45,00€"
    }
  }
];

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
  lola_core_health: 'https://referrals.lolahealth.com/NextLevel15',
  lola_vital_check: 'https://referrals.lolahealth.com/NextLevel15',
  lola_peak_insights: 'https://referrals.lolahealth.com/NextLevel15',
  lola_health: 'https://referrals.lolahealth.com/NextLevel15',
  hp_blood_panel_uk: 'https://referrals.lolahealth.com/NextLevel15',
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

