import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Activity, 
  Zap, 
  HeartPulse, 
  Droplets, 
  Moon, 
  Dumbbell, 
  Search, 
  Sliders, 
  Info, 
  Globe2, 
  Package, 
  Sparkles, 
  FileText, 
  Stethoscope, 
  Layers, 
  Check, 
  ChevronRight,
  ShoppingCart
} from 'lucide-react';
import { useAffiliateLinks } from '../contexts/AffiliateLinksContext';

export type StoreCountry = 'US' | 'UK' | 'ES';
export type BioSuiteKey = 'all' | 'suite-a' | 'suite-b' | 'suite-c' | 'suite-d' | 'suite-e';

interface LocalizedListing {
  id: string;
  suiteKey: 'suite-a' | 'suite-b' | 'suite-c' | 'suite-d' | 'suite-e';
  suiteTitle: string;
  itemNumber: string;
  categoryLabel: string;
  networkTag: string;
  title: string;
  concept: string;
  clinicalPurpose: string;
  keyBenefits: string[];
  specs: string;
  ctaText: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: 'cyan' | 'amber' | 'emerald' | 'rose';
  countryDetails: Record<StoreCountry, {
    badge: string;
    logistics: string;
    affiliateKey: string;
    fallbackUrl: string;
    priceEstimate: string;
  }>;
}

export const hardwareListings: LocalizedListing[] = [
  // ============================================================
  // SUITE A: DAILY CHEMICAL & METABOLIC REAGENTS (NO SCREEN TIME)
  // ============================================================
  {
    id: 'metabolic-strips',
    suiteKey: 'suite-a',
    suiteTitle: 'SUITE A: DAILY CHEMICAL & METABOLIC REAGENTS',
    itemNumber: '01',
    categoryLabel: 'Amazon Essential Link',
    networkTag: 'Amazon Associates Verified',
    title: 'Your Simple 2-Minute Morning Balance Check',
    concept: 'Zero Screen-Time Daily Reagent.',
    clinicalPurpose: 'A plain paper, dip-and-read visual chemical test tracking 10 critical parameters (Glucose, Ketones, Specific Gravity, Blood, pH, Protein, Nitrite, Bilirubin, Urobilinogen, and Leucocytes) in under 2 minutes. Requires zero digital setup, app sync, screen time, or Bluetooth pairing. Instantly flags early kidney stress, metabolic ketones, and hydration imbalances, delivering peace of mind without the digital noise.',
    keyBenefits: [
      '10-Parameter Renal & Metabolic Spectrum',
      'Zero Screen-Time / Digital Noise Freedom',
      'Instant 60-Second Colorimetric Validation',
      'Catch Hydration & Acid-Base Drift at Dawn'
    ],
    specs: '100 Medical-Grade Reagent Strips • Desiccant Bottle Storage • 24-Month Stability',
    ctaText: 'Explore Reagent Specifications (Amazon)',
    icon: Droplets,
    accentColor: 'cyan',
    countryDetails: {
      US: {
        badge: 'FDA Cleared & CLIA Waived',
        logistics: 'US Prime 1-Day Delivery via Amazon US',
        affiliateKey: 'hp_urinalysis_strips',
        fallbackUrl: 'https://www.amazon.com/dp/B0855CY29W',
        priceEstimate: '$14.99 (100 Tests)'
      },
      UK: {
        badge: 'MHRA Registered & UKCA Compliant',
        logistics: 'Fulfilled locally via Amazon UK Prime',
        affiliateKey: 'hp_urinalysis_strips_uk',
        fallbackUrl: 'https://www.amazon.co.uk/dp/B0855CY29W',
        priceEstimate: '£12.99 (100 Tests)'
      },
      ES: {
        badge: 'CE 0123 Marked & ISO 13485',
        logistics: 'Distribución local Amazon España / Almacén UE',
        affiliateKey: 'hp_urinalysis_strips_es',
        fallbackUrl: 'https://www.amazon.es/dp/B0855CY29W',
        priceEstimate: '14,50 € (100 Tiras)'
      }
    }
  },
  {
    id: 'sirtuin-fuel',
    suiteKey: 'suite-a',
    suiteTitle: 'SUITE A: DAILY CHEMICAL & METABOLIC REAGENTS',
    itemNumber: '02',
    categoryLabel: 'NSF-Certified Cellular Protection',
    networkTag: 'Direct Clinical Network',
    title: 'Sirtuin Activation & Cell Recovery Stack',
    concept: 'Purified Epigenetic Software Support.',
    clinicalPurpose: 'Third-party tested, NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide the structural cofactors required to activate your body\'s Sirtuin longevity pathways, helping stabilize chromatin loops and repair DNA.',
    keyBenefits: [
      'NSF Certified for Sport (3rd-Party Lab Verified)',
      'Stabilizes Chromatin Loops & Promotes Autophagy',
      'Micronized Trans-Resveratrol Bioavailability',
      'Purified Cofactors for Cellular ATP Synthesis'
    ],
    specs: 'Pharmaceutical-Grade Purity • Heavy Metal & Solvent Screened • 30-Day Supply',
    ctaText: 'Review Certified Ingredient Profile',
    icon: Sparkles,
    accentColor: 'amber',
    countryDetails: {
      US: {
        badge: 'NSF Certified for Sport • FDA cGMP',
        logistics: 'Direct fulfillment from LiveMomentous.com (US Hub)',
        affiliateKey: 'hp_momentous_stack',
        fallbackUrl: 'https://www.livemomentous.com/',
        priceEstimate: '$65.00 / mo'
      },
      UK: {
        badge: 'Informed-Sport Certified • UK Approved',
        logistics: 'Dispatched locally via Healf UK (No import fees)',
        affiliateKey: 'hp_momentous_stack_uk',
        fallbackUrl: 'https://healf.com/',
        priceEstimate: '£54.00 / mo'
      },
      ES: {
        badge: 'Registro Sanitario UE • Libre de Aduana',
        logistics: 'Sourced via Newtra EU (Bypasses Spanish customs seizures)',
        affiliateKey: 'hp_momentous_stack_es',
        fallbackUrl: 'https://www.livemomentous.com/',
        priceEstimate: '59,00 € / mes'
      }
    }
  },

  // ============================================================
  // SUITE B: CONTINUOUS ENERGY & CARDIAC TELEMETRY
  // ============================================================
  {
    id: 'cgm-telemetry',
    suiteKey: 'suite-b',
    suiteTitle: 'SUITE B: CONTINUOUS ENERGY & CARDIAC TELEMETRY',
    itemNumber: '03',
    categoryLabel: 'Continuous Glycemic Tracking (Impact.com Network)',
    networkTag: 'Impact.com Telehealth Partnership',
    title: 'Your Stable Energy Fuel Gauge',
    concept: 'Real-Time Metabolic Guidance.',
    clinicalPurpose: 'Tracks interstitial glucose levels 24/7, providing instant smartphone feedback on how your meals, exercise, and stress impact your blood sugar. Eliminates painful finger-pricks, teaching you to flatten metabolic spikes and prevent insulin resistance.',
    keyBenefits: [
      '24/7 Continuous Interstitial Glucose Telemetry',
      'Zero Finger-Prick Calibration Required',
      'Real-Time Personalized Food Spike Detection',
      'Preserves Mitochondrial Energy Capacity'
    ],
    specs: '14-Day Continuous Sensor Life • Waterproof IP28 • Bluetooth 5.0 BLE Streaming',
    ctaText: 'Examine Glycemic Compatibility Protocols',
    icon: Zap,
    accentColor: 'amber',
    countryDetails: {
      US: {
        badge: 'FDA Cleared Over-The-Counter (OTC)',
        logistics: 'Abbott Lingo™ & Dexcom Stelo™ direct to door',
        affiliateKey: 'hp_cgm_us',
        fallbackUrl: 'https://hellolingo.com/',
        priceEstimate: '$89 / 2 Sensors (Monthly)'
      },
      UK: {
        badge: 'MHRA Registered • CE Medical Device',
        logistics: 'Abbott Lingo™ UK Direct dispatch',
        affiliateKey: 'hp_cgm_uk',
        fallbackUrl: 'https://hellolingo.com/en-gb/',
        priceEstimate: '£79 / 2 Sensors (Monthly)'
      },
      ES: {
        badge: 'Marcado CE Médico • Farmacia Regulada',
        logistics: 'Dexcom ONE+ o unidades Freestyle Libre autorizadas en farmacia local',
        affiliateKey: 'hp_cgm_es',
        fallbackUrl: 'https://www.dexcom.com/es-es',
        priceEstimate: '75,00 € / mes'
      }
    }
  },
  {
    id: 'vascular-telemetry',
    suiteKey: 'suite-b',
    suiteTitle: 'SUITE B: CONTINUOUS ENERGY & CARDIAC TELEMETRY',
    itemNumber: '04',
    categoryLabel: 'Arterial Compliance (CJ Affiliate Network)',
    networkTag: 'CJ Affiliate • Withings Verified',
    title: 'Your Arterial Flow & Blood Pressure Radar',
    concept: 'Continuous Cardiovascular Oversight.',
    clinicalPurpose: 'Wi-Fi-enabled, professional-grade blood pressure cuff. Automatically logs and maps your blood pressure and arterial trends over time against JNC-8 guidelines, avoiding spot-check anxiety.',
    keyBenefits: [
      'JNC-8 Clinical Guideline Risk Classification',
      'Automatic Seamless Wi-Fi & Bluetooth Cloud Sync',
      'Eliminates White-Coat Office Spot-Check Bias',
      'Monitors Long-Term Arterial Compliance Drift'
    ],
    specs: 'Oscillometric Matrix • 6-Month Rechargeable Battery • Universal Cuff 22–42 cm',
    ctaText: 'Review Vascular Compliance Details',
    icon: HeartPulse,
    accentColor: 'rose',
    countryDetails: {
      US: {
        badge: 'FDA Cleared Medical Device Class II',
        logistics: 'Withings US Direct & Amazon Prime US',
        affiliateKey: 'hp_withings_bpm',
        fallbackUrl: 'https://www.withings.com/us/en/bpm-connect',
        priceEstimate: '$129.95'
      },
      UK: {
        badge: 'CE Medical Class IIa • MHRA Registered',
        logistics: 'Withings UK Official Store fulfillment',
        affiliateKey: 'hp_withings_bpm_uk',
        fallbackUrl: 'https://www.withings.com/uk/en/bpm-connect',
        priceEstimate: '£109.95'
      },
      ES: {
        badge: 'Certificación Sanitaria CE Clase IIa',
        logistics: 'Envío oficial Withings España y distribuidores autorizados',
        affiliateKey: 'hp_withings_bpm_es',
        fallbackUrl: 'https://www.withings.com/es/es/bpm-connect',
        priceEstimate: '119,95 €'
      }
    }
  },
  {
    id: 'ai-stethoscope',
    suiteKey: 'suite-b',
    suiteTitle: 'SUITE B: CONTINUOUS ENERGY & CARDIAC TELEMETRY',
    itemNumber: '05',
    categoryLabel: 'AI Clinical Auscultation (Impact.com/VigLink)',
    networkTag: 'Eko Health Clinical Partnership',
    title: 'The AI-Enhanced Cardiopulmonary Listener',
    concept: '15-Second Structural Valve Check.',
    clinicalPurpose: 'FDA-cleared, CE-marked digital stethoscope with integrated 3-lead ECG. Uses clinical-grade AI to scan heart valve sounds, murmurs, and early signals of cardiac strain in just 15 seconds, syncing waveforms directly to your secure dashboard [24, 29].',
    keyBenefits: [
      'Integrated 3-Lead Color Full-Spectrum ECG',
      '40x Audio Amplification with Active Noise Cancellation',
      'AI Structural Murmur & Strain Detection Algorithms',
      'Exports Clinical Waveforms Directly to Cardiologist'
    ],
    specs: '40x Acoustic Amp • Full-Color OLED Waveform Screen • HIPAA/GDPR Cloud Ready',
    ctaText: 'Review Acoustic Cardiopulmonary Specifications',
    icon: Stethoscope,
    accentColor: 'cyan',
    countryDetails: {
      US: {
        badge: 'FDA 510(k) Cleared • HIPAA Compliant',
        logistics: 'Sourced direct from EkoHealth.com (US HQ)',
        affiliateKey: 'hp_eko_core500',
        fallbackUrl: 'https://www.ekohealth.com/products/core-500-digital-stethoscope',
        priceEstimate: '$429.00'
      },
      UK: {
        badge: 'MHRA Registered • UKCA Approved',
        logistics: 'Direct dispatch via EkoHealth UK international logistics',
        affiliateKey: 'hp_eko_core500_uk',
        fallbackUrl: 'https://www.ekohealth.com/',
        priceEstimate: '£379.00'
      },
      ES: {
        badge: 'Marcado CE Médico Clase IIa',
        logistics: 'Distributed via European DocCheck Shop (Entregas seguras UE)',
        affiliateKey: 'hp_eko_core500_es',
        fallbackUrl: 'https://www.doccheckshop.com/',
        priceEstimate: '419,00 €'
      }
    }
  },

  // ============================================================
  // SUITE C: PASSIVE SLEEP & AUTONOMIC RECOVERY (ZERO WEARABLE STRESS)
  // ============================================================
  {
    id: 'sleep-analyzer',
    suiteKey: 'suite-c',
    suiteTitle: 'SUITE C: PASSIVE SLEEP & AUTONOMIC RECOVERY',
    itemNumber: '06',
    categoryLabel: 'Touch-Free Autonomic Sleep Scan (CJ Affiliate Network)',
    networkTag: 'CJ Affiliate • Withings Sleep Hub',
    title: 'Your Passive Stress Battery Radar',
    concept: 'Wearable-Free Circadian Oversight.',
    clinicalPurpose: 'An ultra-slim, contact-free pressure mat placed once under your mattress. Uses advanced ballistocardiography to monitor continuous sleeping heart rate, sleep architecture, and breathing pauses overnight, transferring data silently to your dashboard upon waking.',
    keyBenefits: [
      '100% Touch-Free (Zero Wrist Wearing or Nightly Charging)',
      'Clinical Ballistocardiography Sleep Staging (Deep/REM)',
      'Continuous Nocturnal Heart Rate & Snoring Metrics',
      'Medical-Grade Sleep Breathing Disturbance Tracking'
    ],
    specs: 'Pneumatic Sensor Array • Under-Mattress Form Factor • Zero EMF Emission in Bed',
    ctaText: 'Examine Passive Telemetry Specs',
    icon: Moon,
    accentColor: 'cyan',
    countryDetails: {
      US: {
        badge: 'FDA Validated Respiratory Telemetry',
        logistics: 'Withings US Direct Fulfillment & Amazon Prime',
        affiliateKey: 'hp_withings_sleep',
        fallbackUrl: 'https://www.withings.com/us/en/sleep',
        priceEstimate: '$129.95'
      },
      UK: {
        badge: 'Medically CE-Validated (Sleep Apnea Tracking)',
        logistics: 'Withings UK Store (Compliant UK plug included)',
        affiliateKey: 'hp_withings_sleep_uk',
        fallbackUrl: 'https://www.withings.com/uk/en/sleep-analyzer',
        priceEstimate: '£129.95'
      },
      ES: {
        badge: 'Validado CE Médico (Detección de Apnea del Sueño)',
        logistics: 'Withings Europa / Envío prioritario España',
        affiliateKey: 'hp_withings_sleep_es',
        fallbackUrl: 'https://www.withings.com/es/es/sleep-analyzer',
        priceEstimate: '149,95 €'
      }
    }
  },

  // ============================================================
  // SUITE D: BODY COMPOSITION & PERFORMANCE TRACKING
  // ============================================================
  {
    id: 'body-scan-scale',
    suiteKey: 'suite-d',
    suiteTitle: 'SUITE D: BODY COMPOSITION & PERFORMANCE TRACKING',
    itemNumber: '07',
    categoryLabel: 'Somatic Mass Analyzer (CJ Affiliate Network)',
    networkTag: 'CJ Affiliate • Withings Verified',
    title: 'Your Visceral Fat & Muscle Tracker',
    concept: 'Whole-Body Somatic Breakdown.',
    clinicalPurpose: 'Uses dual-frequency bioelectrical impedance with an 8-electrode grab bar to map exact skeletal muscle distribution and visceral fat surrounding your organs. Provides the baseline metrics needed to guide your fasting repair and muscle rebuilding cycles.',
    keyBenefits: [
      'Segmental Muscle Balance (Torso, Left/Right Arms & Legs)',
      'Visceral Fat Organ Layer Quantification',
      'Integrated 6-Lead ECG & Vascular Age Scoring',
      'Guides Dynamic Hormesis (Autophagy vs Hypertrophy)'
    ],
    specs: '8 Stainless Steel Electrodes • Retractable Handle • 0.1 lb High-Precision Load Cells',
    ctaText: 'Examine Somatic Segmental Analytics',
    icon: Dumbbell,
    accentColor: 'amber',
    countryDetails: {
      US: {
        badge: 'FDA Cleared 6-Lead Station',
        logistics: 'Direct US dispatch via Withings Portal',
        affiliateKey: 'hp_withings_bodyscan',
        fallbackUrl: 'https://www.withings.com/us/en/body-scan',
        priceEstimate: '$399.95'
      },
      UK: {
        badge: 'CE Medical Approved Segmental Station',
        logistics: 'Withings UK Official Direct dispatch',
        affiliateKey: 'hp_withings_bodyscan_uk',
        fallbackUrl: 'https://www.withings.com/uk/en/body-scan',
        priceEstimate: '£349.95'
      },
      ES: {
        badge: 'Certificado CE Médico Clase IIa',
        logistics: 'Distribuidor oficial Withings España',
        affiliateKey: 'hp_withings_bodyscan_es',
        fallbackUrl: 'https://www.withings.com/es/es/body-scan',
        priceEstimate: '399,95 €'
      }
    }
  },
  {
    id: 'autonomic-wearables',
    suiteKey: 'suite-d',
    suiteTitle: 'SUITE D: BODY COMPOSITION & PERFORMANCE TRACKING',
    itemNumber: '08',
    categoryLabel: 'Passive HRV Recovery Telemetry',
    networkTag: 'Amazon / Verified Retail Network',
    title: 'Your Sleep & Stress Recovery Radar',
    concept: 'Continuous Autonomic Balancing.',
    clinicalPurpose: 'Multi-spectral optical biosensors capturing sleeping Heart Rate Variability (HRV), resting heart rate, and blood oxygen trends. Designed to monitor nervous system recovery overnight without active daily monitoring stress.',
    keyBenefits: [
      'Continuous Nocturnal HRV (rMSSD) Mapping',
      'Optical PPG Biosensors for Cardiovascular Strain',
      'Seamless Passive Background Sync to Longevity App',
      'Monitors Autonomic Balance Without Daily Alert Fatigue'
    ],
    specs: 'Multi-Spectral Optical Sensor • ECG Functionality • Water Resistant 50m',
    ctaText: 'Compare Certified Wearables',
    icon: Activity,
    accentColor: 'cyan',
    countryDetails: {
      US: {
        badge: 'FDA Cleared ECG & AFib Notification',
        logistics: 'Amazon US Prime / Apple Store US',
        affiliateKey: 'hp_apple_watch',
        fallbackUrl: 'https://www.amazon.com/dp/B0DGJ9M8D7',
        priceEstimate: 'From $399.00'
      },
      UK: {
        badge: 'CE / MHRA Approved Sensor Array',
        logistics: 'Amazon UK Prime / Currys UK',
        affiliateKey: 'hp_apple_watch_uk',
        fallbackUrl: 'https://www.amazon.co.uk/dp/B0DGJ9M8D7',
        priceEstimate: 'From £399.00'
      },
      ES: {
        badge: 'Marcado CE Sanitario • Distribución Oficial',
        logistics: 'Amazon España / Distribuidores Autorizados',
        affiliateKey: 'hp_apple_watch_es',
        fallbackUrl: 'https://www.amazon.es/dp/B0DGJ9M8D7',
        priceEstimate: 'Desde 449,00 €'
      }
    }
  },

  // ============================================================
  // SUITE E: CLINICAL DIRECT-TO-CONSUMER BLOOD BASELINES
  // ============================================================
  {
    id: 'blood-panels',
    suiteKey: 'suite-e',
    suiteTitle: 'SUITE E: CLINICAL DIRECT-TO-CONSUMER BLOOD BASELINES',
    itemNumber: '09',
    categoryLabel: 'DTC Multi-Omic Panels',
    networkTag: 'CJ Affiliate • HealthLabs & Melio Network',
    title: 'Your Personalized Cellular Biomarker Map',
    concept: 'Deep Software "Scratch" Diagnostic.',
    clinicalPurpose: 'Direct-to-consumer longevity blood panels analyzing 56 essential biomarkers—including ApoB (arterial plaque risk), HbA1c (glycemic history), and hs-CRP (chronic inflammation). Securely purchase on our site, visit your local clinic for a quick draw, and receive results privately online.',
    keyBenefits: [
      'Comprehensive 56-Biomarker Longevity Spectrum',
      'True Cardiovascular Plaque Particle Count (ApoB)',
      'High-Sensitivity Inflammation Index (hs-CRP)',
      'Confidential Physician-Reviewed Digital Telehealth Portal'
    ],
    specs: 'CLIA & CAP Accredited Laboratories • 48-Hour Digital Turnaround • Private Results',
    ctaText: 'Map Your Cellular Biomarker Baseline',
    icon: FileText,
    accentColor: 'rose',
    countryDetails: {
      US: {
        badge: 'CLIA & CAP Certified (Quest & Labcorp)',
        logistics: 'Partnered with Quest & Labcorp via HealthLabs on CJ Affiliate',
        affiliateKey: 'hp_healthlabs_panel',
        fallbackUrl: 'https://www.healthlabs.com/',
        priceEstimate: '$249.00 (Full Panel)'
      },
      UK: {
        badge: 'UKAS Accredited Private Lab Network',
        logistics: 'Connected to local private clinics & home phlebotomy',
        affiliateKey: 'hp_blood_panel_uk',
        fallbackUrl: 'https://healf.com/',
        priceEstimate: '£199.00 (Full Panel)'
      },
      ES: {
        badge: 'Laboratorios Acreditados ISO 15189',
        logistics: 'Partnered with Unilabs & Laboratorios Megalab via Melio',
        affiliateKey: 'hp_blood_panel_es',
        fallbackUrl: 'https://www.melio.es/',
        priceEstimate: '189,00 € (Panel Completo)'
      }
    }
  }
];

export const BiologicalHardwareStoreGrid: React.FC = () => {
  const { links } = useAffiliateLinks();
  const [selectedCountry, setSelectedCountry] = useState<StoreCountry>('US');
  const [activeSuite, setActiveSuite] = useState<BioSuiteKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const countries = [
    {
      id: 'US' as StoreCountry,
      name: 'United States Store',
      flag: '🇺🇸',
      badgeHighlight: 'FDA Cleared & CLIA Waived',
      subText: 'USPS / Prime Delivery'
    },
    {
      id: 'UK' as StoreCountry,
      name: 'United Kingdom Store',
      flag: '🇬🇧',
      badgeHighlight: 'MHRA Registered & UKCA',
      subText: 'UK Domestic Dispatch'
    },
    {
      id: 'ES' as StoreCountry,
      name: 'España / EU Store',
      flag: '🇪🇸',
      badgeHighlight: 'CE Marked / CE 0123',
      subText: 'Logística Libre de Aduana UE'
    }
  ];

  const suites = [
    { key: 'all' as BioSuiteKey, label: 'All 9 Bio-Listings', count: 9 },
    { key: 'suite-a' as BioSuiteKey, label: 'Suite A: Daily Reagents', count: 2 },
    { key: 'suite-b' as BioSuiteKey, label: 'Suite B: Continuous Telemetry', count: 3 },
    { key: 'suite-c' as BioSuiteKey, label: 'Suite C: Passive Sleep', count: 1 },
    { key: 'suite-d' as BioSuiteKey, label: 'Suite D: Body Composition', count: 2 },
    { key: 'suite-e' as BioSuiteKey, label: 'Suite E: DTC Blood Baselines', count: 1 }
  ];

  const filteredListings = hardwareListings.filter((item) => {
    const matchesSuite = activeSuite === 'all' || item.suiteKey === activeSuite;
    const matchesSearch = 
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clinicalPurpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.countryDetails[selectedCountry].badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSuite && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto my-16 font-sans">
      {/* Outer Shell: Double-Bezel Hardware Architecture */}
      <div className="relative rounded-[2.25rem] bg-slate-900/60 p-2 md:p-3 ring-1 ring-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {/* Glow Accent Lines */}
        <div className="absolute top-0 left-1/3 w-80 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 right-1/3 w-80 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        {/* Inner Core Container */}
        <div className="relative rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-b from-[#080c16] via-[#0b1220] to-[#070a13] border border-slate-800/90 p-6 md:p-10 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-slate-800/80">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold">
                <Package size={13} className="text-cyan-400" />
                <span>Biological Hardware Catalog // Clinically Compliant Logistics</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                Preserving the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
                  Biological Hardware
                </span>
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                A verified medical-grade index of chemical reagents, continuous telemetry biosensors, and multi-omic blood panels designed to protect and optimize your physical body today.
              </p>
            </div>

            {/* Regulatory Authority Pill */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-1 self-start lg:self-end">
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-cyan-400" />
                <span>Regulatory Verification</span>
              </div>
              <div className="text-[11px] text-slate-300">
                All 9 listings are localized with country-compliant certification.
              </div>
            </div>
          </div>

          {/* Segmented Country Button Controller */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-cyan-400 font-bold">
                <Globe2 size={13} />
                Select Your Regional Compliance Store:
              </span>
              <span className="text-slate-500 hidden sm:inline">Automatic Currency & Customs Routing</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md">
              {countries.map((country) => {
                const isSelected = selectedCountry === country.id;
                return (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => setSelectedCountry(country.id)}
                    className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {/* Active Background Pill Animation */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeStoreCountry"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                      />
                    )}

                    <div className="relative z-10 flex items-center space-x-3">
                      <span className="text-2xl flex-shrink-0">{country.flag}</span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold tracking-tight">
                          {country.name}
                        </div>
                        <div className={`text-[10px] font-mono font-semibold ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                          {country.badgeHighlight}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 text-right hidden lg:block">
                      <span className="text-[9px] font-mono text-slate-500">
                        {country.subText}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Controls: Suite Filters & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            {/* Suite Filter Horizontal Scrolling Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-mono">
              {suites.map((suite) => (
                <button
                  key={suite.key}
                  type="button"
                  onClick={() => setActiveSuite(suite.key)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer border ${
                    activeSuite === suite.key
                      ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {suite.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter by biomarker or hardware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
              />
            </div>
          </div>

          {/* Product Store Grid (3x3 / 9 Listings) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredListings.map((item) => {
                const IconComponent = item.icon;
                const countryInfo = item.countryDetails[selectedCountry];
                const dynamicUrl = links[countryInfo.affiliateKey]?.url || countryInfo.fallbackUrl;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="relative rounded-2xl bg-gradient-to-b from-[#090e1b] via-[#0d1424] to-[#070a13] p-6 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Hover Top Glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                    <div className="relative z-10 space-y-4">
                      {/* Top Badging Row: Regional Clearance Badge + Suite Number */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                            <ShieldCheck size={11} className="text-cyan-400" />
                            <span>{countryInfo.badge}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 block">
                            {item.categoryLabel}
                          </div>
                        </div>

                        {/* Clinical Icon */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                          item.accentColor === 'rose'
                            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                            : item.accentColor === 'amber'
                              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                              : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                        }`}>
                          <IconComponent size={18} />
                        </div>
                      </div>

                      {/* Title & Concept */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          {item.concept}
                        </div>
                        <h3 className="text-base sm:text-lg font-display font-extrabold text-white leading-snug group-hover:text-cyan-200 transition-colors mt-0.5">
                          {item.title}
                        </h3>
                      </div>

                      {/* Clinical Purpose Narrative */}
                      <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-4">
                        {item.clinicalPurpose}
                      </p>

                      {/* Key Daily Benefits Bullet Points */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                          Daily Clinical Utility:
                        </div>
                        <div className="space-y-1">
                          {item.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                            <div key={bIdx} className="flex items-start space-x-2 text-[11px] text-slate-300">
                              <CheckCircle2 size={12} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span className="leading-tight">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Localized Logistics & Specs Strip */}
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-500">Logistics:</span>
                          <span className="text-cyan-300 text-right truncate max-w-[180px]" title={countryInfo.logistics}>
                            {countryInfo.logistics}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-0.5 border-t border-slate-900">
                          <span className="text-slate-500">Price / Access:</span>
                          <span className="font-bold text-white">
                            {countryInfo.priceEstimate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Action Button */}
                    <div className="relative z-10 mt-5 pt-3 border-t border-slate-800/80">
                      <a
                        href={dynamicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-cyan-950/60 hover:via-slate-800 hover:to-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-white hover:text-cyan-200 text-xs font-mono font-bold flex items-center justify-between transition-all group/btn shadow"
                      >
                        <span className="truncate">{item.ctaText}</span>
                        <div className="flex items-center space-x-1 flex-shrink-0 text-cyan-400">
                          <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </div>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Search size={32} className="mx-auto text-slate-600 mb-2" />
              <div className="text-base font-bold text-white">No matching biological hardware listings</div>
              <p className="text-xs text-slate-500">Try adjusting your search query or switching the active Bio-Suite filter.</p>
            </div>
          )}

          {/* Authoritative Affiliate & Medical Transparency Footer */}
          <div className="mt-12 pt-6 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold uppercase text-[11px]">
              <Info size={14} />
              <span>Transparency & Verified Logistics Protocol</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-5xl">
              123TheNextLevel participates in verified medical & telemetry affiliate networks (including Impact.com, CJ Affiliate, Amazon Associates, DocCheck, and direct clinical laboratory partner portals). Product recommendations are selected solely for clinical efficacy, zero screen-time utility, and biological hardware preservation. Product pricing, regulatory badges (FDA Cleared, CLIA Waived, MHRA, CE 0123), and customs clearance routes are dynamically localized to the selected region. Always consult your qualified physician before initiating new diagnostic or metabolic protocols.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BiologicalHardwareStoreGrid;
