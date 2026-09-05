// Centralized affiliate links & sovereign store fallback configuration
export type MarketRegion = 'US' | 'UK' | 'ES';
export type ProductCategory = 'Tech Gadgets & Wearables' | 'Performance & Testing' | 'Supplements';

export interface ProductMarketConfig {
  url: string;
  ctaText: string;
  badge: string;
  network: string;
}

export interface SovereignProduct {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  price_text: string;
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
}

export const sovereignHealthStack: SovereignProduct[] = [
  {
    id: "reagent-strips",
    name: "ALLTEST 10-Parameter Urinary Reagent Strips",
    category: "Performance & Testing",
    rating: 4.85,
    description: "A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes. Zero digital screen-time.",
    price_text: "$14.99 / £12.99 / 14,99€",
    image_url: "/assets/images/shop/reagent-strips.png",
    us: {
      url: "https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20",
      ctaText: "Explore Reagents on Amazon US 🇺🇸",
      badge: "FDA Cleared & CLIA Waived",
      network: "Amazon Associates"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21",
      ctaText: "Explore Reagents on Amazon UK 🇬🇧",
      badge: "MHRA Registered",
      network: "Amazon Associates"
    },
    es: {
      url: "https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21",
      ctaText: "Explore Reagents on Amazon ES 🇪🇸",
      badge: "CE 0123 Medical Marked",
      network: "Amazon Associates"
    }
  },
  {
    id: "sirtuin-stack",
    name: "Momentous Sirtuin Activation & Cell Recovery Stack",
    category: "Supplements",
    rating: 4.90,
    description: "Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways.",
    price_text: "$89.95 / £79.99 / 89,95€",
    image_url: "/assets/images/shop/sirtuin-stack.png",
    us: {
      url: "https://livemomentous.com/modernwisdom?code=modernwisdom",
      ctaText: "Review Certified Ingredients on Momentous US 🇺🇸",
      badge: "NSF Certified for Sport",
      network: "Momentous Partner"
    },
    uk: {
      url: "https://healf.co.uk/collections/momentus",
      ctaText: "Review Certified Ingredients on Healf UK 🇬🇧",
      badge: "NSF Certified / UK Sourced",
      network: "Healf UK Portal"
    },
    es: {
      url: "https://newtra.eu",
      ctaText: "Review Certified Ingredients on Newtra ES 🇪🇸",
      badge: "Customs-Safe EU Delivery",
      network: "Newtra EU Portal"
    }
  },
  {
    id: "cgm",
    name: "Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)",
    category: "Tech Gadgets & Wearables",
    rating: 4.75,
    description: "Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health.",
    price_text: "$89.00 / £79.00 / 79,00€ per month",
    image_url: "/assets/images/shop/cgm.png",
    us: {
      url: "https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20",
      ctaText: "Examine Glycemic Protocols on Lingo US 🇺🇸",
      badge: "FDA Cleared / OTC Eligible",
      network: "Amazon Associates"
    },
    uk: {
      url: "https://hellolingo.co.uk",
      ctaText: "Examine Glycemic Protocols on Lingo UK 🇬🇧",
      badge: "MHRA Registered",
      network: "Lingo UK Direct"
    },
    es: {
      url: "https://www.dexcom.com/es-ES",
      ctaText: "Examine Glycemic Protocols on Dexcom ES 🇪🇸",
      badge: "CE Marked / Pharmacy Approved",
      network: "Dexcom ES Portal"
    }
  },
  {
    id: "blood-pressure-cuff",
    name: "Withings BPM Connect Wi-Fi Cuff",
    category: "Tech Gadgets & Wearables",
    rating: 4.80,
    description: "Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data.",
    price_text: "$99.95 / £89.99 / 99,95€",
    image_url: "/assets/images/shop/bpm-connect.png",
    us: {
      url: "https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20",
      ctaText: "Review Vascular Compliance on Withings US 🇺🇸",
      badge: "FDA Cleared",
      network: "Amazon Associates"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21",
      ctaText: "Review Vascular Compliance on Withings UK 🇬🇧",
      badge: "CE Medical Class IIa",
      network: "Amazon Associates"
    },
    es: {
      url: "https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21",
      ctaText: "Review Vascular Compliance on Withings ES 🇪🇸",
      badge: "CE Medical Class IIa",
      network: "Amazon Associates"
    }
  },
  {
    id: "stethoscope",
    name: "Eko CORE 500™ Digital AI Stethoscope",
    category: "Performance & Testing",
    rating: 4.95,
    description: "FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds.",
    price_text: "$429.00 / £379.00 / 429,00€",
    image_url: "/assets/images/shop/core-500.png",
    us: {
      url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      ctaText: "Review Acoustic Specs on Eko US 🇺🇸",
      badge: "FDA Cleared AI Auscultation",
      network: "Eko Health Direct"
    },
    uk: {
      url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      ctaText: "Review Acoustic Specs on Eko UK 🇬🇧",
      badge: "MHRA Registered",
      network: "Eko Health Direct"
    },
    es: {
      url: "https://www.doccheck.com/es/",
      ctaText: "Review Acoustic Specs on DocCheck ES 🇪🇸",
      badge: "CE Marked Clinical Device",
      network: "DocCheck EU Partner"
    }
  },
  {
    id: "sleep-analyzer",
    name: "Withings Sleep Analyzer Under-Mattress Pad",
    category: "Tech Gadgets & Wearables",
    rating: 4.82,
    description: "A contact-free ballistocardiography mat placed under the mattress. Logs sleeping heart rate, sleep cycles, and passive breathing disturbances.",
    price_text: "$129.95 / £119.99 / 129,95€",
    image_url: "/assets/images/shop/sleep-analyzer.png",
    us: {
      url: "https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20",
      ctaText: "Review Sleep Telemetry on Withings US 🇺🇸",
      badge: "Touch-Free Sleep Science",
      network: "Amazon Associates"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21",
      ctaText: "Review Sleep Telemetry on Withings UK 🇬🇧",
      badge: "CE Medically Validated (Apnea)",
      network: "Amazon Associates"
    },
    es: {
      url: "https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21",
      ctaText: "Review Sleep Telemetry on Withings ES 🇪🇸",
      badge: "CE Medically Validated (Apnea)",
      network: "Amazon Associates"
    }
  },
  {
    id: "segmental-scale",
    name: "Withings Body Scan Segmental Composition Scale",
    category: "Tech Gadgets & Wearables",
    rating: 4.88,
    description: "FDA-cleared 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index.",
    price_text: "$399.95 / £349.99 / 399,95€",
    image_url: "/assets/images/shop/body-scan.png",
    us: {
      url: "https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20",
      ctaText: "Examine Somatic Metrics on Withings US 🇺🇸",
      badge: "FDA Cleared",
      network: "Amazon Associates"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21",
      ctaText: "Examine Somatic Metrics on Withings UK 🇬🇧",
      badge: "CE Medical Marked",
      network: "Amazon Associates"
    },
    es: {
      url: "https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21",
      ctaText: "Examine Somatic Metrics on Withings ES 🇪🇸",
      badge: "CE Medical Marked",
      network: "Amazon Associates"
    }
  },
  {
    id: "wearable-tracker",
    name: "Apple Watch Series 10 (GPS 46mm)",
    category: "Tech Gadgets & Wearables",
    rating: 4.80,
    description: "Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and Heart Rate Variability (HRV).",
    price_text: "$399.00 / £379.00 / 399,00€",
    image_url: "/assets/images/shop/apple-watch.png",
    us: {
      url: "https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20",
      ctaText: "Compare Wearable biometrics on Amazon US 🇺🇸",
      badge: "FDA Approved Heart Notifications",
      network: "Amazon Associates"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21",
      ctaText: "Compare Wearable biometrics on Amazon UK 🇬🇧",
      badge: "MHRA Certified Telemetry",
      network: "Amazon Associates"
    },
    es: {
      url: "https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21",
      ctaText: "Compare Wearable biometrics on Amazon ES 🇪🇸",
      badge: "CE Compliant Biometrics",
      network: "Amazon Associates"
    }
  },
  {
    id: "blood-panel",
    name: "Personalized Cellular Biomarker Map (56 Biomarkers)",
    category: "Performance & Testing",
    rating: 4.92,
    description: "Direct-to-consumer longevity blood panels mapping 56 essential biomarkers. Draws completed at local Quest or Labcorp patient centers.",
    price_text: "$299.00 / £149.00 / 149,00€",
    image_url: "/assets/images/shop/blood-panel.png",
    us: {
      url: "https://www.healthlabs.com/?affiliate=123znl",
      ctaText: "Map Your Biomarkers on HealthLabs US 🇺🇸",
      badge: "CLIA Certified & CAP Accredited",
      network: "HealthLabs Direct"
    },
    uk: {
      url: "https://snwbl.io/out/NcealZ11",
      ctaText: "Map Your Biomarkers on LOLA Health UK 🇬🇧",
      badge: "UKAS Accredited & ISO 9001 Certified",
      network: "LOLA Health Partner"
    },
    es: {
      url: "https://www.melio.es",
      ctaText: "Map Your Biomarkers on Melio ES 🇪🇸",
      badge: "CE Marked & Megalab Certified Partner",
      network: "Melio ES Partner"
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
  nad: 'https://amazon.com/dp/B0D5N6X8Z2',
  epigenetic: 'https://amazon.com/dp/B0D5N6X8Z2',
  lola_core_health: 'https://referrals.lolahealth.com/NextLevel15',
  lola_vital_check: 'https://referrals.lolahealth.com/NextLevel15',
  lola_peak_insights: 'https://referrals.lolahealth.com/NextLevel15',
  hp_biological_age: 'https://amazon.com/dp/B0CXM1X8PQ',
  hp_nad_stack: 'https://amazon.com/dp/B0CLB5X8X9',
  hp_bio_response: 'https://amazon.com/dp/B0CXM1X8PQ',
  hp_kit_us: 'https://amazon.com/dp/B0CXM1X8PQ',
  hp_kit_uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
  hp_kit_es: 'https://amazon.es/dp/B0CXM1X8PQ',
  hp_spermidine: 'https://www.amazon.com/dp/B08J5P8D9D',
  hp_quercetin: 'https://www.amazon.com/dp/B07BFR4QC2',
  hp_nad_complete: 'https://renuebyscience.com/',
  hp_coq10: 'https://www.amazon.com/dp/B0019GW3Y8',
};
