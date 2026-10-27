export interface DigitalGuideProduct {
  id: string;
  productId?: string;
  title: string;
  priceInCents: number; // GBP in pence
  priceFormatted: string;
  r2FileKey: string;
  pillar?: string;
  description?: string;
  coverImage?: string;
  highlights?: string[];
}

export const GUIDE_PRODUCTS: Record<string, DigitalGuideProduct> = {
  'beginner-home-workout': {
    id: 'beginner-home-workout',
    productId: 'g-fit-1',
    title: 'Beginner Home Workout Plan',
    priceInCents: 30, // 30p test price
    priceFormatted: '£0.30',
    r2FileKey: 'beginner_home_workout-2026.pdf',
    pillar: 'Fitness',
    description: 'A 4-week zero-equipment protocol to build foundational strength, preserve skeletal muscle mass, and optimize joint mobility from home.',
    coverImage: '/covers/beginner-home-workout-cover.png',
    highlights: [
      '4-Week Progressive Bodyweight Schedule',
      'Zero Equipment Required (Home-Ready)',
      'Joint Longevity & Recovery Routines'
    ]
  },
  'hypertrophy-strength': {
    id: 'hypertrophy-strength',
    productId: 'g-fit-2',
    title: 'Hypertrophy & Strength Protocol',
    priceInCents: 2900, // £29.00
    priceFormatted: '£29.00',
    r2FileKey: 'Hypertrophy-Strength-Protocol-2026.pdf',
    pillar: 'Strength',
    description: 'An evidence-based 8-week progressive overload system to break through plateaus and build dense skeletal muscle.',
    coverImage: '/covers/hypertrophy-strength-cover.png',
    highlights: [
      '8-Week Periodized Muscle Building Plan',
      'Progressive Overload Tracking Templates',
      'Mechanical Tension & Sarcoplasmic Hypertrophy Blueprint'
    ]
  },
  'mobility-recovery': {
    id: 'mobility-recovery',
    productId: 'g-fit-3',
    title: 'Daily Mobility & Recovery Routine',
    priceInCents: 1500, // £15.00
    priceFormatted: '£15.00',
    r2FileKey: 'Daily_Mobility_and_Recovery-2026.pdf',
    pillar: 'Joint & Spine',
    description: 'A science-backed 15-minute blueprint for desk workers and athletes to restore joint kinematics and decompress the spine.',
    coverImage: '/covers/daily-mobility-recovery-cover.png',
    highlights: [
      '15-Minute Daily Decompression Routine',
      'Thoracic & Hip Mobility Sequences',
      'Joint Lubrication & Fascial Release'
    ]
  },
  'master-meal-planning': {
    id: 'master-meal-planning',
    productId: 'g-nut-1',
    title: 'The Master Meal Planning Guide',
    priceInCents: 2400, // £24.00
    priceFormatted: '£24.00',
    r2FileKey: 'The Master_Meal_Planning_Guide-2026.pdf',
    pillar: 'Nutrition',
    description: 'A systematic approach to weekly meal prep, grocery shopping, and macro-balancing designed to optimize metabolic health and sustained energy.',
    coverImage: '/covers/master-meal-planning-cover.png',
    highlights: [
      'Glucose Spike Mitigation Strategies',
      'Microbiome Diversity Grocery Checklist',
      'Practical Batch-Cooking Framework'
    ]
  },
  'fat-loss-nutrition': {
    id: 'fat-loss-nutrition',
    productId: 'g-nut-2',
    title: 'Fat Loss Nutrition Blueprint',
    priceInCents: 2900, // £29.00
    priceFormatted: '£29.00',
    r2FileKey: 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
    pillar: 'Metabolism',
    description: 'A sustainable, science-based fat loss protocol that spares lean muscle tissue while targeting visceral fat deposits.',
    coverImage: '/covers/fat-loss-nutrition-cover.png',
    highlights: [
      'Non-Linear Caloric Deficit Cycling',
      'Visceral Adipose Targeting Principles',
      'Appetite Satiety Index Food Charts'
    ]
  },
  'high-protein-recipes': {
    id: 'high-protein-recipes',
    productId: 'g-nut-3',
    title: 'High-Protein Recipe Collection',
    priceInCents: 1900, // £19.00
    priceFormatted: '£19.00',
    r2FileKey: 'High_Protein_Recipe_Collection-2026.pdf',
    pillar: 'Diet',
    description: '45+ chef-crafted, high-protein meal and snack formulas designed to hit optimal leucine thresholds per serving.',
    coverImage: '/covers/high-protein-recipe-cover.png',
    highlights: [
      '30g+ Protein Per Serving Guarantee',
      'Leucine Threshold Optimizations',
      'Under 25-Minute Quick Prep Recipes'
    ]
  },
  'cortisol-stress-management': {
    id: 'cortisol-stress-management',
    productId: 'g-wel-1',
    title: 'Cortisol & Stress Management Protocol',
    priceInCents: 2200, // £22.00
    priceFormatted: '£22.00',
    r2FileKey: 'Cortisol_&_Stress_Management-2026.pdf',
    pillar: 'Wellness',
    description: 'Clinical protocols to lower resting cortisol, manage chronic autonomic stress, and restore heart rate variability (HRV) balance.',
    coverImage: '/covers/cortisol-stress-management-cover.png',
    highlights: [
      '10-Minute NSDR Autonomic Scripts',
      'Vagal Tone Stimulations for Higher HRV',
      'Circadian Light & Adrenal Reset Rules'
    ]
  },
  'sleep-optimization': {
    id: 'sleep-optimization',
    productId: 'g-wel-2',
    title: 'Deep Sleep Optimization Protocol',
    priceInCents: 2500, // £25.00
    priceFormatted: '£25.00',
    r2FileKey: 'Deep_Sleep_Optimization-2026.pdf',
    pillar: 'Recovery',
    description: 'A 28-day actionable blueprint to maximize deep slow-wave sleep, optimize REM cycles, and eliminate nocturnal waking.',
    coverImage: '/covers/deep-sleep-optimization-cover.png',
    highlights: [
      'Thermal & Melatonin Curve Timing',
      'Glymphatic Brain Waste Clearance System',
      'Sleep Architecture Audit Worksheets'
    ]
  },
  'mindfulness-habit-reset': {
    id: 'mindfulness-habit-reset',
    productId: 'g-wel-3',
    title: 'Mindfulness & Habit Reset Workbook',
    priceInCents: 1800, // £18.00
    priceFormatted: '£18.00',
    r2FileKey: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
    pillar: 'Habits',
    description: 'A structured 21-day interactive journal to dismantle compulsive loops and build automatic longevity habits.',
    coverImage: '/covers/mindfulness-habit-reset-cover.png',
    highlights: [
      'Dopamine Baseline Restoration Protocol',
      'Behavioral Cue & Habit Stacking Framework',
      '21-Day Guided Audio-Companion Journal'
    ]
  },
  'the-next-level-lifespan': {
    id: 'the-next-level-lifespan',
    productId: 'g-epi-1',
    title: 'The Next Level Lifespan Blueprint',
    priceInCents: 2200, // £22.00
    priceFormatted: '£22.00',
    r2FileKey: 'the-next-level-lifespan.pdf',
    pillar: 'Longevity',
    description: 'Upgrade your cellular hardware today to run tomorrow’s age-reversal software: sirtuin activation, autophagy, and DNA protection.',
    coverImage: '/covers/the-next-level-lifespan-cover.png',
    highlights: [
      'Epigenetic Age Reversal Strategies',
      'Autophagy Activation Schedules',
      'Cellular Senescence Clearance Protocols'
    ]
  },
  'g-bundle-6': {
    id: 'g-bundle-6',
    productId: 'g-bundle-6',
    title: 'Complete 6-Pillar Master Suite (All 6 Master Books)',
    priceInCents: 4900,
    priceFormatted: '£49.00',
    r2FileKey: 'all-six-master-guides.zip',
    pillar: 'Bundle'
  },
  'g-bundle-9': {
    id: 'g-bundle-9',
    productId: 'g-bundle-9',
    title: 'Complete 9-Book Master Longevity Vault (All 9 Books)',
    priceInCents: 5999,
    priceFormatted: '£59.99',
    r2FileKey: 'all-nine-master-guides.zip',
    pillar: 'Bundle'
  },
  'metabolic-master-guide': {
    id: 'metabolic-master-guide',
    productId: 'g-met-1',
    title: 'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
    priceInCents: 1900, // £19.00
    priceFormatted: '£19.00',
    r2FileKey: 'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf',
    pillar: 'Metabolism',
    description: 'Stop Guessing Your Weight. Re-Engineer Your Internal Biology in 12 Weeks. A phased clinical protocol integrating bioimpedance scales, continuous autonomic wearables, and quarterly venous blood tests.',
    coverImage: '/covers/metabolic-master-guide-cover.png',
    highlights: [
      '12-Week Phased Metabolic Reset Roadmap',
      'Bioimpedance & Visceral Fat Rating (1–12) Targeting',
      'Printable 14-Day Hardware Telemetry Worksheets',
      'Sunday Urinalysis & Day 90 Blood Draw Cadence'
    ]
  }
};

// Key Aliases for compatibility across legacy routes and URL queries
export const GUIDE_ALIASES: Record<string, string> = {
  // Fit 1
  'workout-plan': 'beginner-home-workout',
  'beginner-home-workout-plan': 'beginner-home-workout',
  'beginner_home_workout': 'beginner-home-workout',
  'beginner_home_workout-2026': 'beginner-home-workout',
  'beginner_home_workout-2026.pdf': 'beginner-home-workout',
  'g-fit-1': 'beginner-home-workout',

  // Fit 2 (Hypertrophy)
  'hypertrophy-strength': 'hypertrophy-strength',
  'Hypertrophy-Strength-Protocol-2026': 'hypertrophy-strength',
  'Hypertrophy-Strength-Protocol-2026.pdf': 'hypertrophy-strength',
  'strength-training-hypertrophy': 'hypertrophy-strength',
  'g-fit-2': 'hypertrophy-strength',

  // Fit 3 (Mobility)
  'mobility-recovery': 'mobility-recovery',
  'Daily_Mobility_and_Recovery-2026': 'mobility-recovery',
  'Daily_Mobility_and_Recovery-2026.pdf': 'mobility-recovery',
  'mobility-recovery-routine': 'mobility-recovery',
  'g-fit-3': 'mobility-recovery',

  // Nut 1 (Meal planner)
  'meal-planner': 'master-meal-planning',
  'master-meal-planning-guide': 'master-meal-planning',
  'The Master_Meal_Planning_Guide': 'master-meal-planning',
  'The Master_Meal_Planning_Guide-2026': 'master-meal-planning',
  'The Master_Meal_Planning_Guide-2026.pdf': 'master-meal-planning',
  'healthy-meal-planning-guide': 'master-meal-planning',
  'g-nut-1': 'master-meal-planning',

  // Nut 2 (Fat loss)
  'fat-loss-nutrition': 'fat-loss-nutrition',
  'intermittent-fasting': 'fat-loss-nutrition',
  'Fat-Loss-Nutrition-Blueprint-2026': 'fat-loss-nutrition',
  'Fat-Loss-Nutrition-Blueprint-2026.pdf': 'fat-loss-nutrition',
  'fat-loss-nutrition-blueprint': 'fat-loss-nutrition',
  'g-nut-2': 'fat-loss-nutrition',

  // Nut 3 (High protein)
  'high-protein-recipes': 'high-protein-recipes',
  'hydration-electrolytes': 'high-protein-recipes',
  'High_Protein_Recipe_Collection-2026': 'high-protein-recipes',
  'High_Protein_Recipe_Collection-2026.pdf': 'high-protein-recipes',
  'high-protein-recipe-collection': 'high-protein-recipes',
  'g-nut-3': 'high-protein-recipes',

  // Wel 1 (Cortisol)
  'stress-management': 'cortisol-stress-management',
  'cortisol-and-stress-management': 'cortisol-stress-management',
  'Cortisol_&_Stress_Management': 'cortisol-stress-management',
  'Cortisol_&_Stress_Management-2026': 'cortisol-stress-management',
  'Cortisol_&_Stress_Management-2026.pdf': 'cortisol-stress-management',
  'stress-management-toolkit': 'cortisol-stress-management',
  'g-wel-1': 'cortisol-stress-management',

  // Wel 2 (Sleep)
  'sleep-optimization': 'sleep-optimization',
  'Deep_Sleep_Optimization-2026': 'sleep-optimization',
  'Deep_Sleep_Optimization-2026.pdf': 'sleep-optimization',
  'sleep-optimization-protocol': 'sleep-optimization',
  'g-wel-2': 'sleep-optimization',

  // Wel 3 (Habit reset)
  'habit-reset': 'mindfulness-habit-reset',
  'Mindfulness_and_Habit_Reset_Workbook-2026': 'mindfulness-habit-reset',
  'Mindfulness_and_Habit_Reset_Workbook-2026.pdf': 'mindfulness-habit-reset',
  'mindfulness-habit-reset': 'mindfulness-habit-reset',
  'g-wel-3': 'mindfulness-habit-reset',

  // Lifespan
  'lifespan-blueprint': 'the-next-level-lifespan',
  'the-next-level-lifespan': 'the-next-level-lifespan',
  'the-next-level-lifespan.pdf': 'the-next-level-lifespan',
  'epigenetics-guide': 'the-next-level-lifespan',
  'g-epi-1': 'the-next-level-lifespan',

  // Bundles
  'all-six-master-guides': 'g-bundle-6',
  'all-6-master-guides': 'g-bundle-6',
  'all-nine-master-guides': 'g-bundle-9',
  'all-9-master-guides': 'g-bundle-9',

  // Metabolic Master Guide & Visceral Fat Protocol
  'metabolic-master-guide': 'metabolic-master-guide',
  'visceral-fat-protocol': 'metabolic-master-guide',
  '12-week-protocol': 'metabolic-master-guide',
  'metabolic-protocol': 'metabolic-master-guide',
  'the-12-week-metabolic-re-engineering-protocol': 'metabolic-master-guide',
  'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf': 'metabolic-master-guide',
  'The_12_Week_Metabolic_ReEngineering_Protocol.pdf': 'metabolic-master-guide',
  'g-met-1': 'metabolic-master-guide',
};

export function resolveGuideProduct(guideId: string): DigitalGuideProduct | undefined {
  if (!guideId) return undefined;
  const raw = String(guideId).trim();
  const lower = raw.toLowerCase();

  if (GUIDE_PRODUCTS[raw]) return GUIDE_PRODUCTS[raw];
  if (GUIDE_ALIASES[raw] && GUIDE_PRODUCTS[GUIDE_ALIASES[raw]]) return GUIDE_PRODUCTS[GUIDE_ALIASES[raw]];

  for (const [alias, canonical] of Object.entries(GUIDE_ALIASES)) {
    if (alias.toLowerCase() === lower && GUIDE_PRODUCTS[canonical]) {
      return GUIDE_PRODUCTS[canonical];
    }
  }
  for (const [key, prod] of Object.entries(GUIDE_PRODUCTS)) {
    if (key.toLowerCase() === lower || prod.productId?.toLowerCase() === lower) {
      return prod;
    }
  }
  return undefined;
}
