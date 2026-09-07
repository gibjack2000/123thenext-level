import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ExternalLink, 
  Search, 
  Star, 
  ShieldCheck, 
  ShoppingBag, 
  Check, 
  Flame, 
  Zap, 
  HeartPulse, 
  Dumbbell, 
  Pill, 
  Waves,
  ArrowRight,
  Filter
} from 'lucide-react';

export type RegionKey = 'US' | 'UK' | 'ES';

export interface RegionalConfig {
  price: string;
  badge: string;
  url: string;
  ctaText: string;
  network: string;
}

export interface ExpressProduct {
  id: string;
  name: string;
  category: 'supplements' | 'fitness' | 'wellness';
  categoryLabel: string;
  tag: string;
  rating: number;
  reviewsCount: string;
  shortBenefit: string;
  description: string;
  imageUrl: string;
  isDirectAffiliate: boolean;
  regions: Record<RegionKey, RegionalConfig>;
}

export const EXPRESS_PRODUCTS: ExpressProduct[] = [
  // ==========================================
  // 1. SPECIALIZED SUPPLEMENTS & VITAMINS
  // ==========================================
  {
    id: "sirtuin-stack",
    name: "Momentous Sirtuin Activation & Cell Recovery Stack",
    category: "supplements",
    categoryLabel: "Specialized Supplements & Vitamins",
    tag: "Autophagy & NAD+",
    rating: 4.95,
    reviewsCount: "2.8k+",
    shortBenefit: "Synergistic Trans-Resveratrol, NMN & Nattokinase to activate cellular repair and NAD+ longevity cofactors.",
    description: "NSF Certified for Sport. Clinical-grade longevity cofactors designed for mitochondrial integrity and cellular geroscience.",
    imageUrl: "/assets/images/shop/sirtuin-stack.png",
    isDirectAffiliate: true,
    regions: {
      US: {
        price: "$89.95",
        badge: "NSF Certified for Sport",
        url: "https://livemomentous.com/modernwisdom?code=modernwisdom",
        ctaText: "Procure on Momentous US 🇺🇸",
        network: "Momentous Direct"
      },
      UK: {
        price: "£79.99",
        badge: "NSF Certified / UK Sourced",
        url: "https://healf.co.uk/collections/momentus",
        ctaText: "Procure on Healf UK 🇬🇧",
        network: "Healf UK Partner"
      },
      ES: {
        price: "89,95€",
        badge: "Customs-Safe EU Delivery",
        url: "https://newtra.eu",
        ctaText: "Procure on Newtra ES 🇪🇸",
        network: "Newtra EU Partner"
      }
    }
  },
  {
    id: "marine-collagen",
    name: "Zebora Marine Collagen Peptides Powder (Type I & III)",
    category: "supplements",
    categoryLabel: "Specialized Supplements & Vitamins",
    tag: "Joint & Fascia Matrix",
    rating: 4.80,
    reviewsCount: "4.1k+",
    shortBenefit: "Wild-caught hydrolyzed marine peptides paired with Biotin & Vitamin C for ligament and tendon resilience.",
    description: "Highly bioavailable micro-granulated peptides supporting connective joint elasticity, arterial walls, and skin barrier density.",
    imageUrl: "/assets/images/shop/marine-collagen.png",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$28.99",
        badge: "Non-GMO & Wild Caught",
        url: "https://www.amazon.com/dp/B07T8H5N1M?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£24.99",
        badge: "Wild-Caught Marine Matrix",
        url: "https://www.amazon.co.uk/dp/B07T8H5N1M?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "27,99€",
        badge: "Péptidos Hidrolizados Tipo I/III",
        url: "https://www.amazon.es/dp/B07T8H5N1M?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },
  {
    id: "creatine-monohydrate",
    name: "Optimum Nutrition Micronized Creatine Monohydrate",
    category: "supplements",
    categoryLabel: "Specialized Supplements & Vitamins",
    tag: "Cognitive & Power Reserve",
    rating: 4.90,
    reviewsCount: "68k+",
    shortBenefit: "100% pure micronized creatine supporting ATP cellular energy, executive brain function, and muscular strength.",
    description: "Unflavored pure creatine powder designed to saturate phosphocreatine cellular reserves and enhance muscular power output.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/P/B002DYIZEO.01._SL500_.jpg",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$39.99",
        badge: "Creapure Tested / Zero Fillers",
        url: "https://www.amazon.com/dp/B002DYIZEO?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£32.99",
        badge: "Informed-Choice Certified",
        url: "https://www.amazon.co.uk/dp/B002DYIZEO?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "36,99€",
        badge: "Creatina Micronizada 100% Pura",
        url: "https://www.amazon.es/dp/B002DYIZEO?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },
  {
    id: "magnesium-threonate",
    name: "Magtein® Magnesium L-Threonate Cognitive Support",
    category: "supplements",
    categoryLabel: "Specialized Supplements & Vitamins",
    tag: "Synaptic & Sleep Protocol",
    rating: 4.88,
    reviewsCount: "12k+",
    shortBenefit: "The only magnesium compound proven to cross the blood-brain barrier for deep slow-wave sleep and memory density.",
    description: "Patented Magtein® complex formulated to enhance synaptic plasticity, nighttime HRV recovery, and neuro-metabolic stability.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/P/B01M4GM9R1.01._SL500_.jpg",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$34.95",
        badge: "Patented Magtein® Brain Formula",
        url: "https://www.amazon.com/dp/B01M4GM9R1?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£29.95",
        badge: "Blood-Brain Barrier Bioactive",
        url: "https://www.amazon.co.uk/dp/B01M4GM9R1?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "34,00€",
        badge: "L-Treonato de Magnesio Patentado",
        url: "https://www.amazon.es/dp/B01M4GM9R1?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },

  // ==========================================
  // 2. FITNESS & GYM EQUIPMENT
  // ==========================================
  {
    id: "concept2-rower",
    name: "Concept2 Model D Indoor Rower with PM5 Clinical Monitor",
    category: "fitness",
    categoryLabel: "Fitness & Gym Equipment",
    tag: "VO2 Max & Full-Body Power",
    rating: 4.98,
    reviewsCount: "14k+",
    shortBenefit: "The gold-standard ergometer for whole-body cardiovascular threshold training and zero-impact joint longevity.",
    description: "Precision flywheel air-resistance rowing ergometer with PM5 performance monitor tracking wattage, split times, and heart rate telemetry.",
    imageUrl: "/assets/images/shop/rower.png",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$990.00",
        badge: "Clinical Standard PM5 Ergometer",
        url: "https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20",
        ctaText: "Check Availability on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£895.00",
        badge: "Concept2 Official PM5 Monitor",
        url: "https://www.amazon.co.uk/dp/B099KBD9X8?tag=123znl0f3-21",
        ctaText: "Check Availability on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "990,00€",
        badge: "Remo Indoor Profesional Concept2",
        url: "https://www.amazon.es/dp/B099KBD9X8?tag=123znl08a-21",
        ctaText: "Check Availability on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },
  {
    id: "neoprene-dumbbells",
    name: "Amazon Basics Hexagonal Neoprene Dumbbell Set",
    category: "fitness",
    categoryLabel: "Fitness & Gym Equipment",
    tag: "Strength Mandate & Bone Density",
    rating: 4.82,
    reviewsCount: "115k+",
    shortBenefit: "Color-coded non-slip cast iron weights for progressive resistance training, osteogenic loading, and metabolic tone.",
    description: "Durable neoprene-coated cast iron dumbbells designed with anti-roll hexagonal heads for safe home gym strength routines.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/P/B01LR5RG08.01._SL500_.jpg",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$10.26 - $45.00",
        badge: "Non-Slip Anti-Roll Grip",
        url: "https://www.amazon.com/dp/B01LR5RG08?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£9.99 - £39.99",
        badge: "Hexagonal Cast Iron Core",
        url: "https://www.amazon.co.uk/dp/B01LR5RG08?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "11,50€ - 42,00€",
        badge: "Recubrimiento de Neopreno Antideslizante",
        url: "https://www.amazon.es/dp/B01LR5RG08?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },
  {
    id: "resistance-bands",
    name: "Fit Simplify 5-Level Resistance Loop Bands Set",
    category: "fitness",
    categoryLabel: "Fitness & Gym Equipment",
    tag: "Mobility & Glute Activation",
    rating: 4.75,
    reviewsCount: "140k+",
    shortBenefit: "100% natural latex progressive resistance loops for hip stability, rotator cuff conditioning, and injury prevention.",
    description: "Complete 5-band progressive resistance system with travel pouch and illustrated physical therapy exercise manual.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/P/B01AVDVHTI.01._SL500_.jpg",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$8.48",
        badge: "100% Eco-Latex / 5 Levels",
        url: "https://www.amazon.com/dp/B01AVDVHTI?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£7.99",
        badge: "5 Levels + Instruction Manual",
        url: "https://www.amazon.co.uk/dp/B01AVDVHTI?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "8,99€",
        badge: "Set de 5 Bandas Elásticas",
        url: "https://www.amazon.es/dp/B01AVDVHTI?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },
  {
    id: "foam-roller",
    name: "Amazon Basics High-Density Trigger Point Foam Roller",
    category: "fitness",
    categoryLabel: "Fitness & Gym Equipment",
    tag: "Myofascial Release",
    rating: 4.70,
    reviewsCount: "95k+",
    shortBenefit: "Molded polypropylene foam roller for deep myofascial release, spinal decompression, and post-workout lymphatic flow.",
    description: "High-density foam structure that retains shape under heavy pressure, facilitating targeted tissue recovery and flexibility.",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/P/B00XM2MXK8.01._SL500_.jpg",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$15.29",
        badge: "High-Density Molded Foam",
        url: "https://www.amazon.com/dp/B00XM2MXK8?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£13.99",
        badge: "Deep Tissue Myofascial Tool",
        url: "https://www.amazon.co.uk/dp/B00XM2MXK8?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "15,99€",
        badge: "Rodillo de Espuma Alta Densidad",
        url: "https://www.amazon.es/dp/B00XM2MXK8?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },

  // ==========================================
  // 3. AUTONOMIC RESET & WELLNESS GEAR
  // ==========================================
  {
    id: "stethoscope",
    name: "Eko CORE 500™ Digital AI Stethoscope & 3-Lead ECG",
    category: "wellness",
    categoryLabel: "Autonomic Reset & Wellness Gear",
    tag: "Vagus & Cardiac Telemetry",
    rating: 4.96,
    reviewsCount: "1.2k+",
    shortBenefit: "FDA-cleared acoustic amplifier with 3-lead ECG display and AI murmur/arrhythmia detection in 15 seconds.",
    description: "Next-generation clinician acoustic tool bridging digital stethoscope clarity with live wireless phonocardiogram telemetry.",
    imageUrl: "/assets/images/shop/core-500.png",
    isDirectAffiliate: true,
    regions: {
      US: {
        price: "$429.00",
        badge: "FDA Cleared AI Auscultation",
        url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
        ctaText: "Procure on Eko Health US 🇺🇸",
        network: "Eko Direct Partner"
      },
      UK: {
        price: "£379.00",
        badge: "MHRA Registered Device",
        url: "https://www.ekohealth.com/products/core-500-digital-stethoscope",
        ctaText: "Procure on Eko Health UK 🇬🇧",
        network: "Eko Direct Partner"
      },
      ES: {
        price: "429,00€",
        badge: "Marcado Médico CE Clase II",
        url: "https://www.doccheck.com/es/",
        ctaText: "Procure on DocCheck ES 🇪🇸",
        network: "DocCheck EU Partner"
      }
    }
  },
  {
    id: "sleep-analyzer",
    name: "Withings Sleep Analyzer Under-Mattress Pad",
    category: "wellness",
    categoryLabel: "Autonomic Reset & Wellness Gear",
    tag: "Contact-Free Sleep Apnea Lab",
    rating: 4.85,
    reviewsCount: "3.4k+",
    shortBenefit: "Zero-wearable pneumatic sensor analyzing sleep cycles, continuous heart rate, snoring, and breathing disturbances.",
    description: "Clinically validated under-mattress mat with automatic Wi-Fi sync, generating medical-grade sleep architecture and apnea diagnostics.",
    imageUrl: "/assets/images/shop/sleep-analyzer.png",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$129.95",
        badge: "Zero-Wearable Pneumatic Sensor",
        url: "https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£119.99",
        badge: "CE Medically Validated (Apnea)",
        url: "https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "129,95€",
        badge: "Validación Médica CE (Apnea)",
        url: "https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },
  {
    id: "blood-pressure-cuff",
    name: "Withings BPM Connect Wi-Fi Smart Blood Pressure Cuff",
    category: "wellness",
    categoryLabel: "Autonomic Reset & Wellness Gear",
    tag: "Vascular Compliance",
    rating: 4.80,
    reviewsCount: "7.8k+",
    shortBenefit: "FDA-cleared wireless cuff delivering instant color-coded systolic, diastolic, and pulse feedback directly to your phone.",
    description: "Compact smart monitor that logs arterial elasticity trends and exports clinician-formatted PDF reports for shared decision-making.",
    imageUrl: "/assets/images/shop/bpm-connect.png",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$99.95",
        badge: "FDA Cleared Smart Monitor",
        url: "https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£89.99",
        badge: "CE Medical Class IIa",
        url: "https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "99,95€",
        badge: "Certificado Médico CE Clase IIa",
        url: "https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  },
  {
    id: "meditation-cushion",
    name: "basaho Classic Zafu Ergonomic Meditation Cushion",
    category: "wellness",
    categoryLabel: "Autonomic Reset & Wellness Gear",
    tag: "Vagal Tone & Posture",
    rating: 4.88,
    reviewsCount: "1.9k+",
    shortBenefit: "Buckwheat-filled organic cotton cushion designed for pelvis alignment during somatic breathwork and parasympathetic resets.",
    description: "Ergonomic meditation bolster providing firm spinal support, opening the diaphragm for optimal diaphragmatic breathing cycles.",
    imageUrl: "/assets/images/shop/meditation-cushion.png",
    isDirectAffiliate: false,
    regions: {
      US: {
        price: "$35.00",
        badge: "Organic Cotton & Buckwheat",
        url: "https://www.amazon.com/dp/B01697W160?tag=123znl0e-20",
        ctaText: "Order on Amazon US 🇺🇸",
        network: "Amazon Associates"
      },
      UK: {
        price: "£29.99",
        badge: "Ergonomic Pelvic Support",
        url: "https://www.amazon.co.uk/dp/B01697W160?tag=123znl0f3-21",
        ctaText: "Order on Amazon UK 🇬🇧",
        network: "Amazon Associates"
      },
      ES: {
        price: "34,99€",
        badge: "Algodón Orgánico Certificado",
        url: "https://www.amazon.es/dp/B01697W160?tag=123znl08a-21",
        ctaText: "Order on Amazon ES 🇪🇸",
        network: "Amazon Associates"
      }
    }
  }
];

export default function HomeExpressShop() {
  const [activeTab, setActiveTab] = useState<'supplements' | 'fitness' | 'wellness'>('supplements');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('US');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by active tab and search query
  const filteredProducts = EXPRESS_PRODUCTS.filter(product => {
    const matchesTab = product.category === activeTab;
    const matchesSearch = searchQuery.trim() === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortBenefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const categoryMetadata = {
    supplements: {
      title: "Specialized Supplements & Vitamins",
      subtitle: "Molecular-grade longevity fuel, NAD+ cofactors, joint matrix peptides & cognitive minerals.",
      icon: Pill,
      color: "from-cyan-500 to-blue-500",
      accent: "text-cyan-400"
    },
    fitness: {
      title: "Fitness & Gym Equipment",
      subtitle: "Clinical ergometers, progressive dumbbells, resistance loops & osteogenic loading tools.",
      icon: Dumbbell,
      color: "from-amber-500 to-orange-500",
      accent: "text-amber-400"
    },
    wellness: {
      title: "Autonomic Reset & Wellness Gear",
      subtitle: "FDA-cleared AI stethoscopes, under-mattress sleep labs, Wi-Fi cuffs & somatic cushions.",
      icon: Waves,
      color: "from-indigo-500 to-purple-500",
      accent: "text-indigo-400"
    }
  };

  const currentMeta = categoryMetadata[activeTab];
  const IconComponent = currentMeta.icon;

  return (
    <section 
      id="express-shop" 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24"
    >
      {/* Target alias anchor for #shop */}
      <span id="shop" className="block relative -top-24 invisible" />

      {/* Header Section */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-black uppercase tracking-widest shadow-md shadow-cyan-500/5">
          <ShoppingBag size={14} className="animate-pulse" />
          <span>Product Express Lane</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
          Longevity Hardware <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">&amp; Clinical Fuel</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto font-sans leading-relaxed">
          Direct-to-consumer procurement for biological optimization. Verified Amazon Associate catalog items and clinical-partner test kits mapped to our core geroscience protocols.
        </p>
      </div>

      {/* Control Bar: Category Tabs + Country Switcher */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl mb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Navigation Category Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('supplements')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'supplements'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black scale-[1.02]'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <Pill size={16} />
              <span>Supplements &amp; Vitamins</span>
            </button>

            <button
              onClick={() => setActiveTab('fitness')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'fitness'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black scale-[1.02]'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <Dumbbell size={16} />
              <span>Fitness &amp; Gym Equipment</span>
            </button>

            <button
              onClick={() => setActiveTab('wellness')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === 'wellness'
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/20 font-black scale-[1.02]'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <Waves size={16} />
              <span>Autonomic Reset &amp; Gear</span>
            </button>
          </div>

          {/* Right Side: Country Specific Pricing Switcher */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Pricing Market:
            </span>

            <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedRegion('US')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  selectedRegion === 'US'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇺🇸</span>
                <span>US ($)</span>
              </button>

              <button
                onClick={() => setSelectedRegion('UK')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  selectedRegion === 'UK'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇬🇧</span>
                <span>UK (£)</span>
              </button>

              <button
                onClick={() => setSelectedRegion('ES')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  selectedRegion === 'ES'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇪🇸</span>
                <span>ES (€)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Sub-bar: Category Info & Search Filter */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${currentMeta.accent}`}>
              <IconComponent size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">{currentMeta.title}</h3>
              <p className="text-xs text-slate-400">{currentMeta.subtitle}</p>
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search gear & supplements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800">
          <p className="text-sm text-slate-400">No products found matching "{searchQuery}" in this category.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs text-cyan-400 hover:underline font-bold"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const regionalData = product.regions[selectedRegion];

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/90 overflow-hidden hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-500/5"
              >
                {/* Image Container with Badges */}
                <div>
                  <div className="relative aspect-square w-full bg-slate-950 p-4 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        // Fallback image if remote url fails
                        (e.target as HTMLImageElement).src = '/assets/images/shop/sirtuin-stack.png';
                      }}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Protocol Tag */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900/90 text-cyan-400 border border-cyan-500/20 backdrop-blur-md">
                      {product.tag}
                    </span>

                    {/* Network Affiliate Pill */}
                    <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
                      product.isDirectAffiliate 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {regionalData.network}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star size={12} fill="currentColor" />
                        <span>{product.rating}</span>
                        <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                        {regionalData.badge}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h4>

                    {/* Short Clinical Benefit */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {product.shortBenefit}
                    </p>
                  </div>
                </div>

                {/* Footer: Price & CTA Button */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-baseline justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Live Market Price:</span>
                    <span className="text-lg font-black text-white tracking-tight">
                      {regionalData.price}
                    </span>
                  </div>

                  <a
                    href={regionalData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/10 hover:scale-[1.01] cursor-pointer"
                  >
                    <span>{regionalData.ctaText}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Express Shop Banner & Link to Full Store */}
      <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-center sm:text-left">
        <div className="space-y-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} />
            <span>Sovereign Health Stack Ecosystem</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white">
            Looking for blood draw panels, wearable telemetry, or home sauna pods?
          </h4>
          <p className="text-xs text-slate-400">
            Browse our complete 50+ item clinical registry curated across all 6 longevity protocols.
          </p>
        </div>

        <Link
          to="/store"
          className="shrink-0 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 transition flex items-center gap-2 shadow-lg"
        >
          <span>View Sovereign Store (50+)</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </section>
  );
}
