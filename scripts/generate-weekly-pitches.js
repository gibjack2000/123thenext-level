import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 20 High-Intent Clinical & Performance Topic Pitch Pool (5 per category)
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
    }
  ]
};

const CATEGORY_META = {
  health: {
    label: "Healthspan Intelligence",
    feedUrl: "/blog/category/health",
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  },
  fitness: {
    label: "Performance Protocols",
    feedUrl: "/blog/category/fitness",
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  },
  nutrition: {
    label: "Metabolic Intelligence",
    feedUrl: "/blog/category/nutrition",
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  },
  wellness: {
    label: "Neurowellness Research",
    feedUrl: "/blog/category/wellness",
    regionalProducts: {
      US: "/store-us",
      UK: "/store-uk",
      ES: "/es"
    }
  }
};

export function generateWeeklyTopicPitches() {
  const generatedAt = new Date().toISOString();
  const weekNumber = getWeekNumber(new Date());
  const year = new Date().getFullYear();

  const allPitches = [];

  for (const [categoryKey, topics] of Object.entries(PITCH_POOLS)) {
    const meta = CATEGORY_META[categoryKey];
    topics.forEach((topic, idx) => {
      allPitches.push({
        id: `pitch-${categoryKey}-${year}-w${weekNumber}-${idx + 1}`,
        category: categoryKey,
        categoryLabel: meta.label,
        categoryUrl: meta.feedUrl,
        title: topic.title,
        slug: topic.slug,
        targetKeyword: topic.targetKeyword,
        summary: topic.summary,
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
      batchId: `batch-${year}-w${weekNumber}`,
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
