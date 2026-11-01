import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Comprehensive High-Intent Topic Pitch Pool (8-10 per category)
const PITCH_POOLS = {
  health: [
    {
      title: "ApoB vs. LDL-C: Why Standard NHS & US Physicals Miss Early Atherosclerosis",
      slug: "apob-vs-ldl-c-atherosclerosis-risk",
      targetKeyword: "ApoB vs LDL cholesterol longevity",
      summary: "Why particle count (ApoB) provides 3x greater predictive accuracy for vascular calcification than standard calculated LDL, and how to requisition it."
    },
    {
      title: "The Epigenetic Clock Mandate: How DNA Methylation Predicts Biological Age",
      slug: "epigenetic-clock-dna-methylation-biological-age",
      targetKeyword: "epigenetic biological age testing kit",
      summary: "A clinical guide to DunedinPACE and Horvath clocks, tracking cellular rejuvenation rates against chronological years."
    },
    {
      title: "High-Sensitivity CRP & Homocysteine: The Silent Systemic Vascular Inflammatory Map",
      slug: "hs-crp-homocysteine-vascular-inflammation",
      targetKeyword: "hs-CRP optimal longevity reference range",
      summary: "Elevated micro-inflammation accelerates arterial stiffness. How to interpret sub-clinical ranges under 0.5 mg/L with targeted methylation support."
    },
    {
      title: "Renal Micro-Filtration: Why Spot Urine ACR Is Superior to Serum Creatinine",
      slug: "urine-acr-early-kidney-endothelial-damage",
      targetKeyword: "urine albumin creatinine ratio ACR normal range",
      summary: "Detect endothelial permeability and glomerular micro-leakage 5 years before conventional serum eGFR drops."
    },
    {
      title: "Digital Acoustic Telemetry: Spotting Sub-Clinical Valvular Murmurs with AI Stethoscopes",
      slug: "ai-digital-stethoscope-phonocardiogram-heart-sounds",
      targetKeyword: "digital AI stethoscope cardiac telemetry",
      summary: "How portable dual-sensor acoustic ECG captures murmurs, S3 gallops, and micro-arrhythmias with FDA-grade precision from home."
    },
    {
      title: "Coronary Artery Calcium (CAC) Scoring: Zero-Score Longevity vs Early Soft Plaque",
      slug: "coronary-artery-calcium-cac-scan-interpretation",
      targetKeyword: "coronary artery calcium score zero interpretation",
      summary: "Understanding Agatston scoring, radiation safety thresholds, and when to request low-dose non-contrast cardiac CT."
    },
    {
      title: "Liver Elastography & FibroScan: Detecting Metabolic Steatohepatitis Before Fibrosis",
      slug: "fibroscan-liver-elastography-fatty-liver-biomarkers",
      targetKeyword: "fatty liver CAP score fibroscan normal ranges",
      summary: "A non-invasive acoustic shear-wave guide to measuring hepatic fat fraction and defending metabolic detoxification."
    },
    {
      title: "Full-Body MRI vs Targeted Screening: Incidentaloma Management in Asymptomatic Adults",
      slug: "full-body-mri-screening-longevity-incidentalomas",
      targetKeyword: "full body MRI preventive health pros cons",
      summary: "The clinical utility of diffusion-weighted imaging, false-positive mitigation, and structured physician triage."
    }
  ],
  fitness: [
    {
      title: "Zone 2 vs. VO2 Max Polarization: The Norwegian Protocol for Mitochondrial Biogenesis",
      slug: "zone-2-vo2max-norwegian-mitochondrial-protocol",
      targetKeyword: "zone 2 cardio protocol vo2 max longevity",
      summary: "The 80/20 training distribution that stimulates lactate clearance enzymes, preserves resting cardiac stroke volume, and elevates lifespan."
    },
    {
      title: "Mechanical Tension & Sarcopenia Defense: The Hypertrophy Blueprint After Age 35",
      slug: "sarcopenia-defense-hypertrophy-progressive-overload",
      targetKeyword: "resistance training sarcopenia muscle preservation",
      summary: "How to program multi-joint resistance training to safeguard type II muscle fibers, bone mineral density, and basal metabolic rate."
    },
    {
      title: "Nocturnal HRV Decoupling: Autonomic Strain Tracking with Biometric Wearables",
      slug: "nocturnal-hrv-autonomic-strain-wearables",
      targetKeyword: "overtraining heart rate variability recovery",
      summary: "Distinguishing between parasympathetic saturation and central nervous system burnout using overnight rMSSD telemetry."
    },
    {
      title: "Contrast Heat-Cold Protocols: Vasodilation, Heat Shock Proteins & Nitric Oxide",
      slug: "sauna-cold-plunge-heat-shock-proteins-recovery",
      targetKeyword: "sauna cold plunge longevity protocol",
      summary: "The biochemical cascade of 80°C Finnish sauna exposure followed by 10°C cold water immersion on arterial compliance and HSP70 induction."
    },
    {
      title: "Grip Strength as a Biomarker: Forearm Dynamometry & All-Cause Mortality Correlation",
      slug: "grip-strength-dynamometer-biological-biomarker",
      targetKeyword: "grip strength longevity biomarker",
      summary: "Why grip strength tracks total body neuromuscular integrity and biological aging more reliably than systolic blood pressure."
    },
    {
      title: "Eccentric Overload & Tendon Stiffness: The Patellar & Achilles Longevity Protocol",
      slug: "eccentric-tendon-loading-patellar-achilles-stiffness",
      targetKeyword: "eccentric training tendon remodeling collagen",
      summary: "Stimulating tenocyte cellular collagen synthesis through controlled 4-second eccentric tempo loading to prevent tendon rupture."
    },
    {
      title: "Cadence & Heart Rate Decoupling: Detecting Cardiac Aerobic Drift in Endurance Training",
      slug: "cardiac-drift-aerobic-decoupling-hydration-zones",
      targetKeyword: "aerobic decoupling heart rate drift threshold",
      summary: "How rising heart rate at fixed power output signals core thermal load, plasma volume drops, and autonomic fatigue."
    },
    {
      title: "Intermittent Hypoxic Training (IHT): Upregulating EPO and Capillary Density Naturally",
      slug: "intermittent-hypoxic-training-epo-capillary-density",
      targetKeyword: "hypoxic breathing training athletic endurance",
      summary: "HIF-1alpha transcriptional induction, systemic oxygen delivery adaptation, and mitochondrial efficiency gains."
    }
  ],
  nutrition: [
    {
      title: "Fasting Insulin vs. HOMA-IR: Spotting Pancreatic Stress Before Pre-Diabetes",
      slug: "fasting-insulin-homa-ir-metabolic-syndrome",
      targetKeyword: "fasting insulin optimal levels vs normal range",
      summary: "Fasting glucose stays normal while insulin levels soar for a decade. How to calculate true homeostatic sensitivity before beta-cell fatigue."
    },
    {
      title: "Continuous Glucose Monitoring (CGM) for Non-Diabetics: Post-Prandial Glycemic Spikes",
      slug: "cgm-non-diabetic-glucose-spikes-longevity",
      targetKeyword: "continuous glucose monitor healthy adults",
      summary: "Analyzing glycemic variability, AUC (area under the curve), and how 15-minute post-meal walks flatten excursion peaks."
    },
    {
      title: "Sirtuin Activation & NAD+ Dynamics: Nicotinamide Riboside vs. Resveratrol Stacks",
      slug: "sirtuin-pathway-nad-precursors-mitochondria",
      targetKeyword: "NAD supplements longevity cellular repair",
      summary: "How intracellular NAD+ synthesis fuels PARP DNA repair and mitochondrial sirtuin deacetylation for metabolic homeostasis."
    },
    {
      title: "Omega-3 Index Optimization: Reaching the 8% Cardiovascular Protection Threshold",
      slug: "omega-3-index-rbc-epa-dha-cardiovascular",
      targetKeyword: "omega 3 index blood test optimal level",
      summary: "Why standard fish oil pills under-dose EPA/DHA and how erythrocyte membrane saturation buffers against ventricular arrhythmias."
    },
    {
      title: "Visceral Adiposity Reversal: Targeted Protocols to Strip Deep Ectopic Organ Fat",
      slug: "visceral-fat-reversal-protocol-bioimpedance",
      targetKeyword: "how to reduce visceral organ fat fast",
      summary: "The distinction between subcutaneous and deep hepatic-omental fat, mapped using multi-frequency segmental bioimpedance analysis."
    },
    {
      title: "Continuous Ketone Monitoring (CKM): Glycemic vs Ketogenic Flux for Neurological Clarity",
      slug: "continuous-ketone-monitoring-ckm-brain-energy",
      targetKeyword: "continuous ketone monitor beta-hydroxybutyrate",
      summary: "Real-time BHB tracking and brain-energy rescue for metabolic longevity and cognitive resilience."
    },
    {
      title: "ApoE4 Genotype Dietary Modulation: Saturated Fat Thresholds & Choline Repletion",
      slug: "apoe4-diet-saturated-fat-choline-longevity",
      targetKeyword: "apoe4 diet saturated fat brain health",
      summary: "Personalized lipid engineering for ApoE4 carriers: navigating saturated fatty acid thresholds and phosphatidylcholine synthesis."
    },
    {
      title: "Electrolyte Osmolality in Heat Stress: Sodium-to-Potassium Ratios for Aldosterone Defense",
      slug: "electrolyte-osmolality-sodium-potassium-ratio",
      targetKeyword: "optimal electrolyte ratio hydration longevity",
      summary: "Balancing mineral concentrations to prevent renin-aldosterone spikes and sustain cellular hydration under physical demand."
    }
  ],
  wellness: [
    {
      title: "Non-Invasive Vagus Nerve Stimulation (nVNS): Resetting Parasympathetic Tone in 12 Minutes",
      slug: "non-invasive-vagus-nerve-stimulation-vns",
      targetKeyword: "transcutaneous vagus nerve stimulation anxiety hrv",
      summary: "Ear-cymba and cervical auricular stimulation mechanisms that activate acetylcholine release to dampen systemic inflammatory signaling."
    },
    {
      title: "Sleep Architecture Engineering: Deep SWS Delta Waves & Glymphatic Waste Clearance",
      slug: "slow-wave-sleep-glymphatic-brain-detox",
      targetKeyword: "how to increase slow wave deep sleep",
      summary: "Optimizing bedroom ambient cooling (18°C), blackout darkness, and sensory cues to trigger cerebral spinal fluid brain cleansing."
    },
    {
      title: "Somatic Breathwork & CO2 Tolerance: The 4-7-8 and Box Breathing Neurological Shift",
      slug: "somatic-breathwork-co2-tolerance-nervous-system",
      targetKeyword: "box breathing vagal tone co2 tolerance",
      summary: "How prolonging the exhalation phase shifts the baroreceptor reflex and increases parasympathetic dominance within 180 seconds."
    },
    {
      title: "Targeted Magnesium L-Threonate: Crossing the Blood-Brain Barrier for Synaptic Density",
      slug: "magnesium-l-threonate-brain-barrier-sleep-hrv",
      targetKeyword: "magnesium l-threonate benefits for brain and sleep",
      summary: "Why standard magnesium citrate fails to enter the CSF, and how Magtein elevates hippocampal synaptic plasticity and REM density."
    },
    {
      title: "Circadian Retinal Zeitgebers: 10,000 Lux Morning Photobiology & Melatonin Synthesis",
      slug: "circadian-rhythm-lux-morning-sunlight-melatonin",
      targetKeyword: "morning light circadian rhythm sleep architecture",
      summary: "The exact neurological timing for melanopsin activation to anchor the suprachiasmatic nucleus and boost nocturnal melatonin release."
    },
    {
      title: "Transcranial Photobiomodulation (tPBM): 810nm Near-Infrared Cortical Energy Transfer",
      slug: "transcranial-photobiomodulation-red-light-brain",
      targetKeyword: "transcranial photobiomodulation cognitive longevity",
      summary: "Stimulating cytochrome c oxidase in cortical mitochondria to elevate ATP production and microvascular perfusion."
    },
    {
      title: "Bilateral Eye Movement Desensitization: Amygdala Downregulation During Chronic Work Stress",
      slug: "bilateral-eye-movement-stress-amygdala-reset",
      targetKeyword: "bilateral stimulation stress vagal tone",
      summary: "The neurobiological mechanism behind horizontal saccades in reducing subjective distress and dampening sympathetic hyper-arousal."
    },
    {
      title: "Sensory Deprivation Flotation: Theta Brainwave Inducement and Cortisol Clearance",
      slug: "sensory-deprivation-float-tank-theta-waves-cortisol",
      targetKeyword: "float tank sensory deprivation stress cortisol",
      summary: "How eliminating graviceptive and sensory input triggers spontaneous 4-8Hz theta EEG states and flushes systemic glucocorticoids."
    }
  ]
};

const CATEGORY_META = {
  health: {
    label: "Healthspan Intelligence",
    feedUrl: "/blog/category/health",
    parent_guide: "/guides/uk-preventative-blood-tests/",
    products: {
      us: {
        name: "Quest Diagnostics Cardiovascular Longevity & ApoB Particle Panel",
        asin_or_sku: "QUEST-APOB-778",
        rating: "4.9",
        reviews: "14.2k+",
        market_price: "$49.00",
        url: "https://www.amazon.com/dp/B00068U48C?tag=123znl0e-20"
      },
      uk: {
        name: "LOLA Health Preventive Cardiovascular & Blood Chemistry Panel",
        asin_or_sku: "LOLA-CV-902",
        rating: "4.9",
        reviews: "4.1k+",
        market_price: "£39.00",
        url: "https://www.amazon.co.uk/dp/B08N5N68K6?tag=123znl0e-21"
      },
      es: {
        name: "Melio Salud Perfil Cardiovascular Avanzado con ApoB y PCR ultrasensible",
        asin_or_sku: "MELIO-CARDIO-ES",
        rating: "4.8",
        reviews: "2.3k+",
        market_price: "€45.00",
        url: "https://www.amazon.es/dp/B07R4C9R69?tag=123znl0e-21"
      }
    },
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  },
  fitness: {
    label: "Performance Protocols",
    feedUrl: "/blog/category/fitness",
    parent_guide: "/guides/uk-preventative-blood-tests/",
    products: {
      us: {
        name: "Concept2 RowErg Precision Dynamic Cardio Ergometer",
        asin_or_sku: "B00NH9WEUA",
        rating: "4.9",
        reviews: "18.5k+",
        market_price: "$990.00",
        url: "https://www.amazon.com/dp/B00NH9WEUA?tag=123znl0e-20"
      },
      uk: {
        name: "WHOOP 4.0 Wireless Recovery & Strain Telemetry Tracker",
        asin_or_sku: "WHOOP-4-UK",
        rating: "4.8",
        reviews: "8.7k+",
        market_price: "£229.00",
        url: "https://www.amazon.co.uk/dp/B09V7Y1659?tag=123znl0e-21"
      },
      es: {
        name: "Garmin Forerunner 265 Sensor Cardíaco con VAM y Lactato",
        asin_or_sku: "B0BSLYW5P9",
        rating: "4.8",
        reviews: "3.2k+",
        market_price: "€449.99",
        url: "https://www.amazon.es/dp/B0BSLYW5P9?tag=123znl0e-21"
      }
    },
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  },
  nutrition: {
    label: "Metabolic Intelligence",
    feedUrl: "/blog/category/nutrition",
    parent_guide: "/guides/uk-preventative-blood-tests/",
    products: {
      us: {
        name: "Nutrisense Continuous Glucose Biosensor System (CGM 14-Day)",
        asin_or_sku: "NUTRI-CGM-14",
        rating: "4.8",
        reviews: "9.4k+",
        market_price: "$175.00",
        url: "https://www.amazon.com/dp/B07P88H4NL?tag=123znl0e-20"
      },
      uk: {
        name: "FreeStyle Libre 2 Continuous Glucose Monitoring Sensor",
        asin_or_sku: "LIBRE2-UK",
        rating: "4.9",
        reviews: "11.2k+",
        market_price: "£52.50",
        url: "https://www.amazon.co.uk/dp/B07P88H4NL?tag=123znl0e-21"
      },
      es: {
        name: "Tanita BC-730 Báscula de Composición Corporal Segmental",
        asin_or_sku: "B008DWX1MG",
        rating: "4.7",
        reviews: "4.8k+",
        market_price: "€49.90",
        url: "https://www.amazon.es/dp/B008DWX1MG?tag=123znl0e-21"
      }
    },
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  },
  wellness: {
    label: "Neurowellness Research",
    feedUrl: "/blog/category/wellness",
    parent_guide: "/guides/uk-preventative-blood-tests/",
    products: {
      us: {
        name: "Withings Sleep Analyzer Under-Mattress Sleep Lab Pad",
        asin_or_sku: "B078Z1B34S",
        rating: "4.8",
        reviews: "5.6k+",
        market_price: "$129.95",
        url: "https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20"
      },
      uk: {
        name: "Soundcore by Anker Space One Active Noise Cancelling Headset",
        asin_or_sku: "B0C6T3R35X",
        rating: "4.8",
        reviews: "7.8k+",
        market_price: "£69.99",
        url: "https://www.amazon.co.uk/dp/B0C3HCD34R?tag=123znl0e-21"
      },
      es: {
        name: "Manta Sauna de Infrarrojo Lejano Térmico RejuvaWrap",
        asin_or_sku: "B09PSKN6X3",
        rating: "4.8",
        reviews: "1.9k+",
        market_price: "€289.99",
        url: "https://www.amazon.es/dp/B09PSKN6X3?tag=123znl0e-21"
      }
    },
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  }
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateWeeklyTopicPitches() {
  const generatedAt = new Date().toISOString();
  const weekNumber = getWeekNumber(new Date());
  const year = new Date().getFullYear();
  const timestamp = Date.now();

  const allPitches = [];

  for (const [categoryKey, topics] of Object.entries(PITCH_POOLS)) {
    const meta = CATEGORY_META[categoryKey];
    // Randomly select 5 unique topics per category for variety
    const selectedTopics = shuffle(topics).slice(0, 5);
    
    selectedTopics.forEach((topic, idx) => {
      allPitches.push({
        id: `pitch-${categoryKey}-${year}-w${weekNumber}-${timestamp}-${idx + 1}`,
        category: categoryKey,
        categoryLabel: meta.label,
        categoryUrl: meta.feedUrl,
        title: topic.title,
        slug: topic.slug,
        targetKeyword: topic.targetKeyword,
        summary: topic.summary,
        parent_guide: meta.parent_guide,
        products: meta.products,
        regionalProducts: meta.regionalProducts,
        status: "pending_selection",
        draftStatus: "not_drafted",
        published: false,
        createdAt: generatedAt
      });
    });
  }

  const payload = {
    metadata: {
      batchId: `batch-${year}-w${weekNumber}-${timestamp}`,
      year,
      weekNumber,
      totalCount: allPitches.length,
      generatedAt,
      portalUrl: "https://123thenextlevel.com/automation-admin",
      categories: ["health", "fitness", "nutrition", "wellness"]
    },
    pitches: allPitches
  };

  // Ensure content/pitches exists
  const projectRoot = path.resolve(__dirname, '..');
  const contentPitchesDir = path.join(projectRoot, 'content', 'pitches');
  const publicPitchesDir = path.join(projectRoot, 'public', 'content', 'pitches');

  [contentPitchesDir, publicPitchesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const contentFilePath = path.join(contentPitchesDir, 'weekly-pitches.json');
  const publicFilePath = path.join(publicPitchesDir, 'weekly-pitches.json');

  fs.writeFileSync(contentFilePath, JSON.stringify(payload, null, 2), 'utf8');
  fs.writeFileSync(publicFilePath, JSON.stringify(payload, null, 2), 'utf8');

  console.log(`✅ Successfully generated ${allPitches.length} weekly topic pitches!`);
  console.log(`📁 Saved to: ${contentFilePath}`);
  console.log(`🌐 Public mirror: ${publicFilePath}`);

  return payload;
}

function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

// Direct execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateWeeklyTopicPitches();
}
