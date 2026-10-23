export interface DigitalGuideProduct {
  id: string;
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
    title: 'Beginner Home Workout Plan',
    priceInCents: 1900, // £19.00
    priceFormatted: '£19.00',
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
  'master-meal-planning': {
    id: 'master-meal-planning',
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
  'cortisol-stress-management': {
    id: 'cortisol-stress-management',
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
  }
};

// Key Aliases for compatibility across legacy routes and URL queries
export const GUIDE_ALIASES: Record<string, string> = {
  'workout-plan': 'beginner-home-workout',
  'beginner-home-workout-plan': 'beginner-home-workout',
  'beginner_home_workout': 'beginner-home-workout',
  'g-fit-1': 'beginner-home-workout',

  'meal-planner': 'master-meal-planning',
  'master-meal-planning-guide': 'master-meal-planning',
  'The Master_Meal_Planning_Guide': 'master-meal-planning',
  'g-nut-1': 'master-meal-planning',

  'stress-management': 'cortisol-stress-management',
  'cortisol-and-stress-management': 'cortisol-stress-management',
  'Cortisol_&_Stress_Management': 'cortisol-stress-management',
  'g-wel-1': 'cortisol-stress-management'
};

export function resolveGuideProduct(guideId: string): DigitalGuideProduct | undefined {
  if (!guideId) return undefined;
  const canonicalId = GUIDE_ALIASES[guideId] || guideId;
  return GUIDE_PRODUCTS[canonicalId] || GUIDE_PRODUCTS[guideId];
}
