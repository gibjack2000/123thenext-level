import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  Dumbbell, 
  ChefHat, 
  Smartphone, 
  Pill, 
  Sparkles, 
  Zap, 
  Activity 
} from 'lucide-react';

type MarketTab = 'US' | 'UK' | 'ES';

interface ProductMarketConfig {
  url: string;
  ctaText: string;
  badge: string;
  network: string;
  priceText: string;
}

interface SovereignProduct {
  id: string;
  name: string;
  category: string;
  isDirectAffiliate: boolean;
  rating: number;
  description: string;
  image_url: string;
  us: ProductMarketConfig;
  uk: ProductMarketConfig;
  es: ProductMarketConfig;
}

// Category Header Definitions
interface CategoryBannerConfig {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBorder: string;
  iconGlow: string;
  radarColor: string;
}

const CATEGORY_BANNERS: Record<string, CategoryBannerConfig> = {
  supplements: {
    title: 'SUPPLEMENTS',
    subtitle: 'Vitamins, proteins, and dietary supplements',
    icon: Pill,
    iconColor: 'text-emerald-400',
    iconBorder: 'border-emerald-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    radarColor: 'text-emerald-500/10'
  },
  supplement: {
    title: 'SUPPLEMENTS',
    subtitle: 'Vitamins, proteins, and dietary supplements',
    icon: Pill,
    iconColor: 'text-emerald-400',
    iconBorder: 'border-emerald-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    radarColor: 'text-emerald-500/10'
  },
  fitness: {
    title: 'FITNESS GEAR',
    subtitle: 'Home gym essentials and workout equipment',
    icon: Dumbbell,
    iconColor: 'text-cyan-400',
    iconBorder: 'border-cyan-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
    radarColor: 'text-cyan-500/10'
  },
  'fitness gear': {
    title: 'FITNESS GEAR',
    subtitle: 'Home gym essentials and workout equipment',
    icon: Dumbbell,
    iconColor: 'text-cyan-400',
    iconBorder: 'border-cyan-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
    radarColor: 'text-cyan-500/10'
  },
  kitchen: {
    title: 'HOME & KITCHEN',
    subtitle: 'Appliances, cookware, and longevity nutrient extractors',
    icon: ChefHat,
    iconColor: 'text-amber-400',
    iconBorder: 'border-amber-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    radarColor: 'text-amber-500/10'
  },
  'home & kitchen': {
    title: 'HOME & KITCHEN',
    subtitle: 'Appliances, cookware, and longevity nutrient extractors',
    icon: ChefHat,
    iconColor: 'text-amber-400',
    iconBorder: 'border-amber-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    radarColor: 'text-amber-500/10'
  },
  'tech gadgets & wearables': {
    title: 'TECH GADGETS & WEARABLES',
    subtitle: 'Latest biophysical monitors, wearables, and sleep sensors',
    icon: Smartphone,
    iconColor: 'text-indigo-400',
    iconBorder: 'border-indigo-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(99,102,241,0.25)]',
    radarColor: 'text-indigo-500/10'
  },
  'performance & testing': {
    title: 'PERFORMANCE & TESTING',
    subtitle: 'Diagnostic tools, biomarker testing, and telemetry devices',
    icon: Sparkles,
    iconColor: 'text-rose-400',
    iconBorder: 'border-rose-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]',
    radarColor: 'text-rose-500/10'
  },
  'lifestyle & performance gear': {
    title: 'LIFESTYLE & RECOVERY GEAR',
    subtitle: 'Somatic recovery gear, thermal saunas, and sensory optimization',
    icon: Zap,
    iconColor: 'text-blue-400',
    iconBorder: 'border-blue-500/30',
    iconGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.25)]',
    radarColor: 'text-blue-500/10'
  }
};

const DEFAULT_BANNER_CONFIG: CategoryBannerConfig = {
  title: 'CURATED GEAR HUB',
  subtitle: 'High-performance lifestyle accelerators and equipment',
  icon: Activity,
  iconColor: 'text-cyan-400',
  iconBorder: 'border-cyan-500/30',
  iconGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
  radarColor: 'text-cyan-500/10'
};

// 100% COMPLETE STATIC CATALOG FALLBACK REGISTRY
const localMasterCatalog: SovereignProduct[] = [
  {
    id: "blood-panel",
    name: "Personalized Cellular Biomarker Map (56 Biomarkers)",
    category: "Performance & Testing",
    isDirectAffiliate: true,
    rating: 4.95,
    description: "Direct-to-consumer longevity blood panels mapping 56 essential biomarkers. Local Quest/Labcorp draw in the US, private clinical setups in UK and ES.",
    image_url: "https://123thenextlevel.com/assets/images/shop/blood-panel.png",
    us: {
      url: "https://www.healthlabs.com/?affiliate=123znl",
      ctaText: "Map Your Biomarkers on HealthLabs US 🇺🇸",
      badge: "CLIA Certified & CAP Accredited",
      network: "HealthLabs Direct",
      priceText: "$299.00"
    },
    uk: {
      url: "https://snwbl.io/out/NcealZ11",
      ctaText: "Map Your Biomarkers on LOLA Health UK 🇬🇧",
      badge: "UKAS Accredited & ISO Certified",
      network: "LOLA Health Partner",
      priceText: "£149.00"
    },
    es: {
      url: "https://www.melio.es",
      ctaText: "Map Your Biomarkers on Melio ES 🇪🇸",
      badge: "CE Marked & Megalab Certified Partner",
      network: "Melio ES Partner",
      priceText: "149,00€"
    }
  },
  {
    id: "cgm",
    name: "Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)",
    category: "Tech Gadgets & Wearables",
    isDirectAffiliate: true,
    rating: 4.80,
    description: "Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health.",
    image_url: "https://123thenextlevel.com/assets/images/shop/cgm.png",
    us: {
      url: "https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20",
      ctaText: "Examine Glycemic Protocols on Lingo US 🇺🇸",
      badge: "FDA Cleared / OTC Eligible",
      network: "Amazon Associates",
      priceText: "$89.00/mo"
    },
    uk: {
      url: "https://hellolingo.co.uk",
      ctaText: "Examine Glycemic Protocols on Lingo UK 🇬🇧",
      badge: "MHRA Registered",
      network: "Lingo UK Direct",
      priceText: "£79.00/mo"
    },
    es: {
      url: "https://www.dexcom.com/es-ES",
      ctaText: "Examine Glycemic Protocols on Dexcom ES 🇪🇸",
      badge: "CE Marked / Pharmacy Approved",
      network: "Dexcom ES Portal",
      priceText: "79,00€/mo"
    }
  },
  {
    id: "stethoscope",
    name: "Eko CORE 500™ Digital AI Stethoscope",
    category: "Performance & Testing",
    isDirectAffiliate: true,
    rating: 4.95,
    description: "FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds.",
    image_url: "https://123thenextlevel.com/assets/images/shop/core-500.png",
    us: {
      url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      ctaText: "Review Acoustic Specs on Eko US 🇺🇸",
      badge: "FDA Cleared AI Auscultation",
      network: "Eko Health Direct",
      priceText: "$429.00"
    },
    uk: {
      url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      ctaText: "Review Acoustic Specs on Eko UK 🇬🇧",
      badge: "MHRA Registered",
      network: "Eko Health Direct",
      priceText: "£379.00"
    },
    es: {
      url: "https://www.doccheck.com/es/",
      ctaText: "Review Acoustic Specs on DocCheck ES 🇪🇸",
      badge: "CE Marked Clinical Device",
      network: "DocCheck EU Partner",
      priceText: "429,00€"
    }
  },
  {
    id: "sirtuin-stack",
    name: "Momentous Sirtuin Activation Stack",
    category: "Supplements",
    isDirectAffiliate: true,
    rating: 4.90,
    description: "Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways.",
    image_url: "https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png",
    us: {
      url: "https://livemomentous.com/modernwisdom?code=modernwisdom",
      ctaText: "Review Certified Ingredients on Momentous US 🇺🇸",
      badge: "NSF Certified for Sport",
      network: "Momentous Partner",
      priceText: "$89.95"
    },
    uk: {
      url: "https://healf.co.uk/collections/momentus",
      ctaText: "Review Certified Ingredients on Healf UK 🇬🇧",
      badge: "NSF Certified / UK Sourced",
      network: "Healf UK Portal",
      priceText: "£79.99"
    },
    es: {
      url: "https://newtra.eu",
      ctaText: "Review Certified Ingredients on Newtra ES 🇪🇸",
      badge: "Customs-Safe EU Delivery",
      network: "Newtra EU Portal",
      priceText: "89,95€"
    }
  },
  {
    id: "ag1-nutrition",
    name: "AG1 Essential Nutrition (75 Vitamins & Minerals)",
    category: "Supplements",
    isDirectAffiliate: true,
    rating: 4.90,
    description: "Comprehensive daily nutritional insurance packing 75 vitamins, minerals, probiotics, and whole-food ingredients in a single daily scoop.",
    image_url: "https://123thenextlevel.com/assets/images/shop/ag1-nutrition.png",
    us: {
      url: "https://drinkag1.com/modernwisdom",
      ctaText: "Buy AG1 on drinkag1.com US 🇺🇸",
      badge: "4 Clinical Trials | NSF Certified",
      network: "AG1 Direct",
      priceText: "$79.00/mo"
    },
    uk: {
      url: "https://drinkag1.com/modernwisdom",
      ctaText: "Buy AG1 on drinkag1.com UK 🇬🇧",
      badge: "4 Clinical Trials | NSF Certified",
      network: "AG1 Direct",
      priceText: "£79.00/mo"
    },
    es: {
      url: "https://drinkag1.com/modernwisdom",
      ctaText: "Buy AG1 on drinkag1.com ES 🇪🇸",
      badge: "4 Ensayos Clínicos | Certificado NSF",
      network: "AG1 Direct",
      priceText: "87,00€/mes"
    }
  },
  {
    id: "timeline-mitopure",
    name: "Timeline Mitopure Cellular Energy (Urolithin A)",
    category: "Supplements",
    isDirectAffiliate: true,
    rating: 4.95,
    description: "Clinically proven to trigger mitophagy, clearing away damaged mitochondria to renew cellular energy and enhance muscle strength over time.",
    image_url: "https://123thenextlevel.com/assets/images/shop/timeline-mitopure.png",
    us: {
      url: "https://timeline.com/modernwisdom",
      ctaText: "Examine Mitopure on Timeline US 🇺🇸",
      badge: "50+ Patents | FDA GRAS Status",
      network: "Timeline Direct",
      priceText: "$99.00"
    },
    uk: {
      url: "https://timeline.com/modernwisdom",
      ctaText: "Examine Mitopure on Timeline UK 🇬🇧",
      badge: "50+ Patents | UKAS Validated",
      network: "Timeline Direct",
      priceText: "£89.00"
    },
    es: {
      url: "https://timeline.com/modernwisdom",
      ctaText: "Examine Mitopure on Timeline ES 🇪🇸",
      badge: "50+ Patentes | Estado GRAS de la FDA",
      network: "Timeline Direct",
      priceText: "99,00€"
    }
  },
  {
    id: "omega3-fishoil",
    name: "Nordic Naturals Ultimate Omega 2X",
    category: "Supplements",
    isDirectAffiliate: false,
    rating: 4.88,
    description: "Doctor-recommended double-strength omega-3 fish oil supporting cardiovascular health, joint mobility, and autonomic nervous system balance.",
    image_url: "https://123thenextlevel.com/assets/images/shop/omega3-fishoil.png",
    us: {
      url: "https://www.amazon.com/dp/B07371SREH?tag=123znl0e-20",
      ctaText: "Purchase Omega-3s on Amazon US 🇺🇸",
      badge: "Third-Party Purity Certified",
      network: "Amazon Associates",
      priceText: "$49.95"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B07371SREH?tag=123znl0f3-21",
      ctaText: "Purchase Omega-3s on Amazon UK 🇬🇧",
      badge: "Third-Party Purity Certified",
      network: "Amazon Associates",
      priceText: "£42.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B07371SREH?tag=123znl08a-21",
      ctaText: "Purchase Omega-3s on Amazon ES 🇪🇸",
      badge: "Certificado de Pureza de Terceros",
      network: "Amazon Associates",
      priceText: "49,95€"
    }
  },
  {
    id: "nattokinase-enzyme",
    name: "Pure Nattokinase Plaque-Clearing Enzyme (10,000 FU)",
    category: "Supplements",
    isDirectAffiliate: false,
    rating: 4.80,
    description: "Natural fibrinolytic enzyme extracted from fermented Japanese Natto, clinically studied to support arterial plaque clearance and optimal vascular blood flow.",
    image_url: "https://123thenextlevel.com/assets/images/shop/nattokinase-enzyme.png",
    us: {
      url: "https://www.amazon.com/dp/B0045YV0SM?tag=123znl0e-20",
      ctaText: "Purchase Nattokinase on Amazon US 🇺🇸",
      badge: "100% Vegan | Non-GMO Verified",
      network: "Amazon Associates",
      priceText: "$24.99"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0045YV0SM?tag=123znl0f3-21",
      ctaText: "Purchase Nattokinase on Amazon UK 🇬🇧",
      badge: "100% Vegan | Non-GMO Verified",
      network: "Amazon Associates",
      priceText: "£19.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B0045YV0SM?tag=123znl08a-21",
      ctaText: "Purchase Nattokinase on Amazon ES 🇪🇸",
      badge: "Sin OGM Verificado | 100% Vegano",
      network: "Amazon Associates",
      priceText: "24,99€"
    }
  },
  {
    id: "coq10-energy",
    name: "Doctor's Best Coenzyme Q10 (CoQ10 100mg)",
    category: "Supplements",
    isDirectAffiliate: false,
    rating: 4.85,
    description: "Essential cellular coenzyme required to support mitochondrial vitality, cardiovascular contraction power, and statin users.",
    image_url: "https://123thenextlevel.com/assets/images/shop/coq10-energy.png",
    us: {
      url: "https://www.amazon.com/dp/B0019GW3G8?tag=123znl0e-20",
      ctaText: "Purchase CoQ10 on Amazon US 🇺🇸",
      badge: "USP Verified Active Ingredients",
      network: "Amazon Associates",
      priceText: "$29.95"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0019GW3G8?tag=123znl0f3-21",
      ctaText: "Purchase CoQ10 on Amazon UK 🇬🇧",
      badge: "USP Verified Active Ingredients",
      network: "Amazon Associates",
      priceText: "£24.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B0019GW3G8?tag=123znl08a-21",
      ctaText: "Purchase CoQ10 on Amazon ES 🇪🇸",
      badge: "Ingredientes Activos Verificados USP",
      network: "Amazon Associates",
      priceText: "29,95€"
    }
  },
  {
    id: "ala-mitochondrial",
    name: "Source Naturals Alpha Lipoic Acid (ALA 300mg)",
    category: "Supplements",
    isDirectAffiliate: false,
    rating: 4.75,
    description: "Universal metabolic antioxidant and coenzyme that enhances glucose uptake, regenerates glutathione, and reinforces mitochondrial cellular defense.",
    image_url: "https://123thenextlevel.com/assets/images/shop/ala-mitochondrial.png",
    us: {
      url: "https://www.amazon.com/dp/B00020IA7Y?tag=123znl0e-20",
      ctaText: "Purchase ALA on Amazon US 🇺🇸",
      badge: "Mitochondrial Coenzyme Support",
      network: "Amazon Associates",
      priceText: "$19.95"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B00020IA7Y?tag=123znl0f3-21",
      ctaText: "Purchase ALA on Amazon UK 🇬🇧",
      badge: "Mitochondrial Coenzyme Support",
      network: "Amazon Associates",
      priceText: "£16.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B00020IA7Y?tag=123znl08a-21",
      ctaText: "Purchase ALA on Amazon ES 🇪🇸",
      badge: "Soporte Coenzimático Mitocondrial",
      network: "Amazon Associates",
      priceText: "19,95€"
    }
  },
  {
    id: "magnesium-threonate",
    name: "Life Extension Neuro-Mag Magnesium L-Threonate",
    category: "Supplements",
    isDirectAffiliate: false,
    rating: 4.90,
    description: "Patented form of magnesium shown to cross the blood-brain barrier to support synaptic plasticity, recall speed, and sleep quality.",
    image_url: "https://123thenextlevel.com/assets/images/shop/coq10-energy.png",
    us: {
      url: "https://www.amazon.com/dp/B006P536E6?tag=123znl0e-20",
      ctaText: "Purchase Magtein on Amazon US 🇺🇸",
      badge: "Crosses Blood-Brain Barrier",
      network: "Amazon Associates",
      priceText: "$32.95"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B006P536E6?tag=123znl0f3-21",
      ctaText: "Purchase Magtein on Amazon UK 🇬🇧",
      badge: "Crosses Blood-Brain Barrier",
      network: "Amazon Associates",
      priceText: "£28.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B006P536E6?tag=123znl08a-21",
      ctaText: "Purchase Magtein on Amazon ES 🇪🇸",
      badge: "Cruza Barrera Hematoencefálica",
      network: "Amazon Associates",
      priceText: "32,95€"
    }
  },
  {
    id: "creatine-monohydrate",
    name: "Thorne Creatine Monohydrate Pure Creapure",
    category: "Supplements",
    isDirectAffiliate: false,
    rating: 4.92,
    description: "Highest-grade micronized creatine powder supporting cellular phosphocreatine reserves, power output, and cognitive metabolic performance.",
    image_url: "https://123thenextlevel.com/assets/images/shop/ala-mitochondrial.png",
    us: {
      url: "https://www.amazon.com/dp/B07978R94X?tag=123znl0e-20",
      ctaText: "Purchase Creatine on Amazon US 🇺🇸",
      badge: "NSF Certified for Sport",
      network: "Amazon Associates",
      priceText: "$36.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B07978R94X?tag=123znl0f3-21",
      ctaText: "Purchase Creatine on Amazon UK 🇬🇧",
      badge: "NSF Certified for Sport",
      network: "Amazon Associates",
      priceText: "£32.00"
    },
    es: {
      url: "https://www.amazon.es/dp/B07978R94X?tag=123znl08a-21",
      ctaText: "Purchase Creatine on Amazon ES 🇪🇸",
      badge: "Certificado NSF para Deporte",
      network: "Amazon Associates",
      priceText: "36,00€"
    }
  },
  {
    id: "reagent-strips",
    name: "ALLTEST 10-Parameter Urinary Reagent Strips",
    category: "Performance & Testing",
    isDirectAffiliate: false,
    rating: 4.85,
    description: "A visual, dip-and-read chemical test tracking 10 critical parameters in under 2 minutes. Zero digital screen-time.",
    image_url: "https://123thenextlevel.com/assets/images/shop/reagent-strips.png",
    us: {
      url: "https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20",
      ctaText: "Explore Reagents on Amazon US 🇺🇸",
      badge: "FDA Cleared & CLIA Waived",
      network: "Amazon Associates",
      priceText: "$14.99"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21",
      ctaText: "Explore Reagents on Amazon UK 🇬🇧",
      badge: "MHRA Registered",
      network: "Amazon Associates",
      priceText: "£12.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21",
      ctaText: "Explore Reagents on Amazon ES 🇪🇸",
      badge: "CE 0123 Medical Marked",
      network: "Amazon Associates",
      priceText: "14,99€"
    }
  },
  {
    id: "blood-pressure-cuff",
    name: "Withings BPM Connect Wi-Fi Cuff",
    category: "Tech Gadgets & Wearables",
    isDirectAffiliate: false,
    rating: 4.80,
    description: "Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data.",
    image_url: "https://123thenextlevel.com/assets/images/shop/bpm-connect.png",
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
    category: "Tech Gadgets & Wearables",
    isDirectAffiliate: false,
    rating: 4.82,
    description: "A contact-free sleep tracker placed under your mattress. Automatically logs sleeping heart rate, sleep cycles, and passive breathing disturbances.",
    image_url: "https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png",
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
    category: "Tech Gadgets & Wearables",
    isDirectAffiliate: false,
    rating: 4.88,
    description: "FDA-cleared 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index.",
    image_url: "https://123thenextlevel.com/assets/images/shop/body-scan.png",
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
    category: "Tech Gadgets & Wearables",
    isDirectAffiliate: false,
    rating: 4.80,
    description: "Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and Heart Rate Variability (HRV).",
    image_url: "https://123thenextlevel.com/assets/images/shop/apple-watch.png",
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
    category: "Lifestyle & Performance Gear",
    isDirectAffiliate: false,
    rating: 4.90,
    description: "Immersive active noise cancellation to completely isolate your auditory environment during vagal and deep-breathing mindfulness cycles.",
    image_url: "https://123thenextlevel.com/assets/images/shop/sony-headphones.png",
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
    category: "Lifestyle & Performance Gear",
    isDirectAffiliate: false,
    rating: 4.85,
    description: "Buckwheat-filled organic cotton meditation cushion to optimize posture, spinal alignment, and vagal tone training.",
    image_url: "https://123thenextlevel.com/assets/images/shop/meditation-cushion.png",
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
    category: "Lifestyle & Performance Gear",
    isDirectAffiliate: false,
    rating: 4.75,
    description: "Hydrolyzed Type I & III fish collagen with biotin and vitamin C to reinforce structural tissue matrix and joint integrity.",
    image_url: "https://123thenextlevel.com/assets/images/shop/marine-collagen.png",
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
    category: "Lifestyle & Performance Gear",
    isDirectAffiliate: false,
    rating: 4.90,
    description: "Triple-insulated water bottle with patented FreeSip built-in straw, keeping hydration clean and ice-cold for 24 hours.",
    image_url: "https://123thenextlevel.com/assets/images/shop/water-bottle.png",
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
    category: "Fitness",
    isDirectAffiliate: false,
    rating: 4.95,
    description: "The gold-standard indoor rowing machine with PM5 monitor to optimize cardiorespiratory output, muscular baseline, and metabolic power.",
    image_url: "https://123thenextlevel.com/assets/images/shop/rower.png",
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
    id: "kettlebell-set",
    name: "Bowflex SelectTech 840 Adjustable Kettlebell",
    category: "Fitness",
    isDirectAffiliate: false,
    rating: 4.88,
    description: "Adjusts from 8 to 40 lbs with the turn of a dial for rapid eccentric loading, posterior chain power, and functional hypertrophy.",
    image_url: "https://123thenextlevel.com/assets/images/shop/rower.png",
    us: {
      url: "https://www.amazon.com/dp/B07V2C6374?tag=123znl0e-20",
      ctaText: "View Kettlebells on Amazon US 🇺🇸",
      badge: "6-in-1 Compact Resistance",
      network: "Amazon Associates",
      priceText: "$149.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B07V2C6374?tag=123znl0f3-21",
      ctaText: "View Kettlebells on Amazon UK 🇬🇧",
      badge: "6-in-1 Compact Resistance",
      network: "Amazon Associates",
      priceText: "£139.00"
    },
    es: {
      url: "https://www.amazon.es/dp/B07V2C6374?tag=123znl08a-21",
      ctaText: "View Kettlebells on Amazon ES 🇪🇸",
      badge: "Resistencia Compacta 6 en 1",
      network: "Amazon Associates",
      priceText: "149,00€"
    }
  },
  {
    id: "pullup-bar",
    name: "Iron Gym Total Upper Body Workout Bar",
    category: "Fitness",
    isDirectAffiliate: false,
    rating: 4.82,
    description: "Multifunctional doorway resistance system for strict pull-ups, chin-ups, and core decompression without wall screws.",
    image_url: "https://123thenextlevel.com/assets/images/shop/rower.png",
    us: {
      url: "https://www.amazon.com/dp/B001EJMS6B?tag=123znl0e-20",
      ctaText: "View Bar on Amazon US 🇺🇸",
      badge: "Heavy-Duty Steel Construction",
      network: "Amazon Associates",
      priceText: "$29.99"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B001EJMS6B?tag=123znl0f3-21",
      ctaText: "View Bar on Amazon UK 🇬🇧",
      badge: "Heavy-Duty Steel Construction",
      network: "Amazon Associates",
      priceText: "£26.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B001EJMS6B?tag=123znl08a-21",
      ctaText: "View Bar on Amazon ES 🇪🇸",
      badge: "Construcción de Acero",
      network: "Amazon Associates",
      priceText: "29,99€"
    }
  },
  {
    id: "sauna-tent",
    name: "Portable Full-Body Infrared Sauna Tent",
    category: "Lifestyle & Performance Gear",
    isDirectAffiliate: false,
    rating: 4.80,
    description: "Advanced far-infrared full-body heating cabin with folding chair, remote control, and heated footpad to accelerate cellular recovery and detoxification.",
    image_url: "https://123thenextlevel.com/assets/images/shop/sauna.png",
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
    category: "Performance & Testing",
    isDirectAffiliate: false,
    rating: 4.85,
    description: "A biology-specific finger-prick blood test to evaluate ovarian reserve and reproductive longevity baselines.",
    image_url: "https://123thenextlevel.com/assets/images/shop/ovarian-test.png",
    us: {
      url: "https://www.amazon.com/dp/B08H7V69F7?tag=123znl0e-20",
      ctaText: "Buy Ovarian Test on Amazon US 🇺🇸",
      badge: "CLIA Certified Labs",
      network: "Amazon Associates",
      priceText: "$49.00"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B08H7V69F7?tag=123znl0f3-21",
      ctaText: "Buy Ovarian Test on Amazon UK 🇬🇧",
      badge: "UKAS Accredited Labs",
      network: "Amazon Associates",
      priceText: "£39.00"
    },
    es: {
      url: "https://www.amazon.es/dp/B08H7V69F7?tag=123znl08a-21",
      ctaText: "Buy Ovarian Test on Amazon ES 🇪🇸",
      badge: "Laboratorios Acreditados UE",
      network: "Amazon Associates",
      priceText: "45,00€"
    }
  },
  {
    id: "kitchen-blender",
    name: "Premium Longevity Nutrient Blender & Extractor",
    category: "Kitchen",
    isDirectAffiliate: false,
    rating: 4.90,
    description: "High-speed precision cyclonic nutrient extractor designed to pulverize tough cell walls of leafy greens, seeds, and frozen longevity superfoods.",
    image_url: "https://123thenextlevel.com/assets/images/shop/water-bottle.png",
    us: {
      url: "https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20",
      ctaText: "Buy Blender on Amazon US 🇺🇸",
      badge: "1200W Professional Motor",
      network: "Amazon Associates",
      priceText: "$89.99"
    },
    uk: {
      url: "https://www.amazon.co.uk/dp/B08524B5C6?tag=123znl0f3-21",
      ctaText: "Buy Blender on Amazon UK 🇬🇧",
      badge: "1200W Professional Motor",
      network: "Amazon Associates",
      priceText: "£79.99"
    },
    es: {
      url: "https://www.amazon.es/dp/B08524B5C6?tag=123znl08a-21",
      ctaText: "Buy Blender on Amazon ES 🇪🇸",
      badge: "Motor Profesional de 1200W",
      network: "Amazon Associates",
      priceText: "84,99€"
    }
  }
];

function CategoryBanner({ categoryKey }: { categoryKey: string }) {
  const normKey = categoryKey.toLowerCase();
  const config = CATEGORY_BANNERS[normKey] || DEFAULT_BANNER_CONFIG;
  const Icon = config.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-8 flex items-center justify-between shadow-2xl transition-all duration-300">
      {/* Subtle Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      />

      {/* Futuristic Radar & Circular Reticle Graphics (Right-aligned) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none opacity-20 overflow-hidden">
        <svg className={`w-full h-full ${config.radarColor || 'text-cyan-400'}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="75" cy="50" r="44" strokeDasharray="3 3" />
          <circle cx="75" cy="50" r="32" />
          <circle cx="75" cy="50" r="18" strokeDasharray="2 2" />
          <circle cx="75" cy="50" r="6" />
          <path d="M75 6 v88 M31 50 h88" strokeDasharray="1 3" />
          <path d="M44 19 l62 62 M44 81 l62 -62" strokeWidth="0.3" strokeDasharray="2 4" />
        </svg>
      </div>

      {/* Main Content Info */}
      <div className="relative z-10 flex items-center space-x-6">
        {/* Squircle Badge Icon */}
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-slate-950/90 border ${config.iconBorder} flex items-center justify-center ${config.iconGlow} flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${config.iconColor} transform -rotate-45`} />
        </div>

        {/* Text Area */}
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            {config.title}
          </h3>
          <p className="text-slate-400 text-sm md:text-base mt-1 font-normal">
            {config.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  const [activeTab, setActiveTab] = useState<MarketTab>('US');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicStore() {
      setLoading(true);
      try {
        // 1. Fetch live products from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('market_region', activeTab);

        if (error || !data || data.length === 0) {
          throw error || new Error("Database is empty or disconnected");
        }

        // 2. Client-side absolute image link matching
        const healedData = data.map((p: any) => {
          let healedImg = p.image_url;
          if (healedImg && healedImg.startsWith('/assets/') && !healedImg.startsWith('http')) {
            healedImg = `https://123thenextlevel.com${healedImg}`;
          }

          let healedDeal = p.deal_url;
          if (healedDeal && healedDeal.startsWith('https://123thenextlevel.comhttp')) {
            healedDeal = healedDeal.replace('https://123thenextlevel.com', '');
          }

          return { ...p, image_url: healedImg, deal_url: healedDeal };
        });

        setProducts(healedData);

        // 3. Extract unique categories present in the database
        const rawCategories = healedData.map((p: any) => p.category).filter(Boolean);
        const uniqueCategories = Array.from(new Set(rawCategories)).map((cat: any) => {
          return cat.charAt(0).toUpperCase() + cat.slice(1);
        });

        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.warn("Supabase fetch failed. Falling back to local offline registry:", err);
        
        // 4. Offline Fallback logic: Load from our built-in master registry
        const marketKey = activeTab.toLowerCase() as 'us' | 'uk' | 'es';
        const formattedFallback = localMasterCatalog.map(product => {
          const marketConfig = product[marketKey];
          return {
            id: `${product.id}-${marketKey}`,
            name: product.name,
            category: product.category,
            is_direct_affiliate: product.isDirectAffiliate,
            rating: product.rating,
            description: product.description,
            image_url: product.image_url,
            deal_url: marketConfig.url,
            badge_text: marketConfig.badge,
            network: marketConfig.network,
            price_text: marketConfig.priceText,
            market_region: activeTab
          };
        });

        setProducts(formattedFallback);

        // Dynamically extract categories from fallback
        const uniqueCategories = Array.from(new Set(formattedFallback.map(p => p.category)));
        setCategories(['All', ...uniqueCategories]);
      } finally {
        setLoading(false);
      }
    }

    fetchDynamicStore();
  }, [activeTab]);

  // Handle case-insensitive filtering
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());

  // Split into Tier 1 (Clinical Direct) and Tier 2 (Amazon Hub)
  const clinicalPartners = filteredProducts.filter(p => 
    p.is_direct_affiliate === true || 
    (p.deal_url && !p.deal_url.toLowerCase().includes('amazon'))
  );

  const amazonHubProducts = filteredProducts.filter(p => 
    p.is_direct_affiliate !== true && 
    (p.deal_url && p.deal_url.toLowerCase().includes('amazon'))
  );

  // Group amazon products by category for structured sections when "All" is active
  const amazonCategoriesInView = Array.from(
    new Set(amazonHubProducts.map(p => p.category).filter(Boolean))
  );

  const getFlagEmoji = (tab: MarketTab) => {
    if (tab === 'US') return '🇺🇸';
    if (tab === 'UK') return '🇬🇧';
    return '🇪🇸';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased p-6 md:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Sovereign Apothecary & Longevity Gear Store
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Access highly localized, premium diagnostic blood screening, advanced biophysical sensors, and curated lifestyle accelerators.
        </p>
      </div>

      {/* Country Selector */}
      <div className="max-w-md mx-auto flex justify-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl mb-12">
        {(['US', 'UK', 'ES'] as MarketTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setActiveCategory('All');
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <span className="text-lg">{getFlagEmoji(tab)}</span>
            <span>{tab === 'ES' ? 'España (EU)' : tab === 'UK' ? 'United Kingdom' : 'United States'}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Filter Pills */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-900 pb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
          <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Syncing Live Catalog...</span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* TIER 1: CLINICAL DIAGNOSTICS & DIRECT PARTNERS */}
          {clinicalPartners.length > 0 && (
            <div className="space-y-6">
              <div className="border-l-4 border-rose-500 pl-4">
                <span className="text-xs text-rose-500 uppercase font-semibold tracking-widest">DIRECT ACCESS PARTNERS</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Clinical Diagnostics & Direct Offerings</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalPartners.map(product => (
                  <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/30 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                    <div>
                      {product.image_url && (
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 mb-4 flex items-center justify-center p-4">
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-rose-950/20 border border-rose-900/30">
                          {product.category}
                        </span>
                        <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                          <span>★</span> <span>{product.rating || '4.85'}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors duration-300">{product.name}</h3>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Badge Status</span>
                        <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/20">{product.badge_text || 'Verified'}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                        <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                        <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition-all duration-300">
                          Access Partner Portal
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIER 2: CURATED LIFESTYLE & GEAR (AMAZON ASSOCIATES) */}
          {amazonHubProducts.length > 0 && (
            <div className="space-y-10 pt-6 border-t border-slate-900">
              <div className="border-l-4 border-cyan-500 pl-4">
                <span className="text-xs text-cyan-400 uppercase font-semibold tracking-widest">CURATED LIFESTYLE & PILLAR HARDWARE</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Amazon Longevity Gear Hub</h2>
              </div>

              {/* If "All" is active, render category-by-category with header banners */}
              {activeCategory === 'All' ? (
                amazonCategoriesInView.map(catKey => {
                  const catProducts = amazonHubProducts.filter(p => p.category === catKey);
                  return (
                    <div key={catKey} className="space-y-6 pt-4">
                      {/* Section Header Banner with Icon & Telemetry Background */}
                      <CategoryBanner categoryKey={catKey} />

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catProducts.map(product => (
                          <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                            <div>
                              {product.image_url && (
                                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-850/80 mb-4 flex items-center justify-center p-4">
                                  <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                                    }}
                                  />
                                </div>
                              )}
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                                  {product.category}
                                </span>
                                <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                                  <span>★</span> <span>{product.rating || '4.80'}</span>
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{product.name}</h3>
                              <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold">Network Target</span>
                                <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">{product.network || 'Amazon Associates'}</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                                <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                                <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300">
                                  Buy on Amazon {getFlagEmoji(activeTab)}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Specific Category Filter Active: Render Single Matching Category Banner */
                <div className="space-y-6">
                  <CategoryBanner categoryKey={activeCategory} />

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amazonHubProducts.map(product => (
                      <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                        <div>
                          {product.image_url && (
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-850/80 mb-4 flex items-center justify-center p-4">
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                              {product.category}
                            </span>
                            <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                              <span>★</span> <span>{product.rating || '4.80'}</span>
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{product.name}</h3>
                          <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-semibold">Network Target</span>
                            <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">{product.network || 'Amazon Associates'}</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                            <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                            <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300">
                              Buy on Amazon {getFlagEmoji(activeTab)}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Localized Disclaimers */}
          <div className="text-center max-w-3xl mx-auto pt-12 border-t border-slate-900 space-y-2 text-[10px] text-slate-500 leading-relaxed">
            <p>
              {activeTab === 'ES'
                ? '* Enlace de afiliado oficial de Amazon España. Su compra apoya directamente nuestra investigación de longevidad sin costo adicional.'
                : '* Official Amazon affiliate link. Your purchase directly supports our longevity research at zero additional cost to you.'}
            </p>
            <p>
              All diagnostic and physiological telemetry solutions are intended strictly for educational and baseline tracking purposes. Access portals are operated by external third-party medical partners. 123TheNextLevel never retains, compiles, or sells your genetic, hematological, or molecular test results.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
