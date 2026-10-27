/**
 * Unified Digital Guide Product Registry for Node.js Backend
 * Maps guide product IDs to pricing in cents (GBP pence) and Cloudflare R2 file keys.
 */
export const GUIDE_PRODUCTS = {
  'beginner-home-workout': {
    id: 'beginner-home-workout',
    productId: 'g-fit-1',
    title: 'Beginner Home Workout Plan',
    priceInCents: 30, // 30p test price
    priceFormatted: '£0.30',
    r2FileKey: 'beginner_home_workout-2026.pdf'
  },
  'hypertrophy-strength': {
    id: 'hypertrophy-strength',
    productId: 'g-fit-2',
    title: 'Hypertrophy & Strength Protocol',
    priceInCents: 2900, // £29.00
    priceFormatted: '£29.00',
    r2FileKey: 'Hypertrophy-Strength-Protocol-2026.pdf'
  },
  'mobility-recovery': {
    id: 'mobility-recovery',
    productId: 'g-fit-3',
    title: 'Daily Mobility & Recovery Routine',
    priceInCents: 1500, // £15.00
    priceFormatted: '£15.00',
    r2FileKey: 'Daily_Mobility_and_Recovery-2026.pdf'
  },
  'master-meal-planning': {
    id: 'master-meal-planning',
    productId: 'g-nut-1',
    title: 'The Master Meal Planning Guide',
    priceInCents: 2400, // £24.00
    priceFormatted: '£24.00',
    r2FileKey: 'The Master_Meal_Planning_Guide-2026.pdf'
  },
  'fat-loss-nutrition': {
    id: 'fat-loss-nutrition',
    productId: 'g-nut-2',
    title: 'Fat Loss Nutrition Blueprint',
    priceInCents: 2900, // £29.00
    priceFormatted: '£29.00',
    r2FileKey: 'Fat-Loss-Nutrition-Blueprint-2026.pdf'
  },
  'high-protein-recipes': {
    id: 'high-protein-recipes',
    productId: 'g-nut-3',
    title: 'High-Protein Recipe Collection',
    priceInCents: 1900, // £19.00
    priceFormatted: '£19.00',
    r2FileKey: 'High_Protein_Recipe_Collection-2026.pdf'
  },
  'cortisol-stress-management': {
    id: 'cortisol-stress-management',
    productId: 'g-wel-1',
    title: 'Cortisol & Stress Management Protocol',
    priceInCents: 2200, // £22.00
    priceFormatted: '£22.00',
    r2FileKey: 'Cortisol_&_Stress_Management-2026.pdf'
  },
  'sleep-optimization': {
    id: 'sleep-optimization',
    productId: 'g-wel-2',
    title: 'Deep Sleep Optimization Protocol',
    priceInCents: 2500, // £25.00
    priceFormatted: '£25.00',
    r2FileKey: 'Deep_Sleep_Optimization-2026.pdf'
  },
  'mindfulness-habit-reset': {
    id: 'mindfulness-habit-reset',
    productId: 'g-wel-3',
    title: 'Mindfulness & Habit Reset Workbook',
    priceInCents: 1800, // £18.00
    priceFormatted: '£18.00',
    r2FileKey: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf'
  },
  'the-next-level-lifespan': {
    id: 'the-next-level-lifespan',
    productId: 'g-epi-1',
    title: 'The Next Level Lifespan Blueprint',
    priceInCents: 2200, // £22.00
    priceFormatted: '£22.00',
    r2FileKey: 'the-next-level-lifespan.pdf'
  },
  'g-bundle-6': {
    id: 'g-bundle-6',
    productId: 'g-bundle-6',
    title: 'Complete 6-Pillar Master Suite (All 6 Master Books)',
    priceInCents: 4900, // £49.00
    priceFormatted: '£49.00',
    r2FileKey: 'all-six-master-guides.zip'
  },
  'g-bundle-9': {
    id: 'g-bundle-9',
    productId: 'g-bundle-9',
    title: 'Complete 9-Book Master Longevity Vault (All 9 Books)',
    priceInCents: 5999, // £59.99
    priceFormatted: '£59.99',
    r2FileKey: 'all-nine-master-guides.zip'
  },
  'metabolic-master-guide': {
    id: 'metabolic-master-guide',
    productId: 'g-met-1',
    title: 'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
    priceInCents: 1900, // £19.00
    priceFormatted: '£19.00',
    r2FileKey: 'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf'
  }
};

export const GUIDE_ALIASES = {
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

export function resolveGuideProduct(guideId) {
  if (!guideId) return null;
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
  return null;
}
