/**
 * Unified Digital Guide Product Registry for Node.js Backend
 * Maps guide product IDs to pricing in cents (GBP pence) and Cloudflare R2 file keys.
 */
export const GUIDE_PRODUCTS = {
  'beginner-home-workout': {
    id: 'beginner-home-workout',
    title: 'Beginner Home Workout Plan',
    priceInCents: 1900, // £19.00
    priceFormatted: '£19.00',
    r2FileKey: 'beginner_home_workout-2026.pdf'
  },
  'master-meal-planning': {
    id: 'master-meal-planning',
    title: 'The Master Meal Planning Guide',
    priceInCents: 2400, // £24.00
    priceFormatted: '£24.00',
    r2FileKey: 'The Master_Meal_Planning_Guide-2026.pdf'
  },
  'cortisol-stress-management': {
    id: 'cortisol-stress-management',
    title: 'Cortisol & Stress Management Protocol',
    priceInCents: 2200, // £22.00
    priceFormatted: '£22.00',
    r2FileKey: 'Cortisol_&_Stress_Management-2026.pdf'
  }
};

export const GUIDE_ALIASES = {
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

export function resolveGuideProduct(guideId) {
  if (!guideId) return null;
  const canonicalId = GUIDE_ALIASES[guideId] || guideId;
  return GUIDE_PRODUCTS[canonicalId] || GUIDE_PRODUCTS[guideId] || null;
}
