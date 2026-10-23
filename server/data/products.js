/**
 * Server-side trusted product catalog.
 * In production, resolve prices and files here, NEVER from client-submitted values.
 */
export const products = [
  {
    id: 'g-fit-1',
    slug: 'beginner-home-workout-plan',
    title: 'Beginner Home Workout Plan',
    price: 19.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_FIT1 || 'price_placeholder_fit1',
    r2Key: 'beginner_home_workout-2026.pdf',
    filePath: 'beginner_home_workout_v1.pdf',
    downloadFilename: 'Beginner-Home-Workout-Plan-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-fit-2',
    slug: 'strength-training-hypertrophy',
    title: 'Hypertrophy & Strength Protocol',
    price: 29.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_FIT2 || 'price_placeholder_fit2',
    r2Key: 'Hypertrophy-Strength-Protocol-2026.pdf',
    filePath: 'hypertrophy_protocol_v1.pdf',
    downloadFilename: 'Hypertrophy-Strength-Protocol-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-fit-3',
    slug: 'mobility-recovery-routine',
    title: 'Daily Mobility & Recovery',
    price: 15.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_FIT3 || 'price_placeholder_fit3',
    r2Key: 'Daily_Mobility_and_Recovery-2026.pdf',
    filePath: 'daily_mobility_v1.pdf',
    downloadFilename: 'Daily-Mobility-and-Recovery-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-nut-1',
    slug: 'healthy-meal-planning-guide',
    title: 'The Master Meal Planning Guide',
    price: 24.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_NUT1 || 'price_placeholder_nut1',
    r2Key: 'The Master_Meal_Planning_Guide-2026.pdf',
    filePath: 'fat_loss_blueprint.pdf',
    downloadFilename: 'The-Master-Meal-Planning-Guide-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-nut-2',
    slug: 'fat-loss-nutrition-blueprint',
    title: 'Fat Loss Nutrition Blueprint',
    price: 29.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_NUT2 || 'price_placeholder_nut2',
    r2Key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
    filePath: 'fat-loss-nutrition-blueprint.pdf',
    downloadFilename: 'Fat-Loss-Nutrition-Blueprint-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-nut-3',
    slug: 'high-protein-recipe-collection',
    title: 'High-Protein Recipe Collection',
    price: 19.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_NUT3 || 'price_placeholder_nut3',
    r2Key: 'High_Protein_Recipe_Collection-2026.pdf',
    filePath: 'high_protein_recipes.pdf',
    downloadFilename: 'High-Protein-Recipe-Collection-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-wel-1',
    slug: 'stress-management-toolkit',
    title: 'Cortisol & Stress Management',
    price: 22.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_WEL1 || 'price_placeholder_wel1',
    r2Key: 'Cortisol_and_Stress_Management-2026.pdf',
    filePath: 'stress-management-toolkit.pdf',
    downloadFilename: 'Cortisol-and-Stress-Management-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-wel-2',
    slug: 'sleep-optimization-protocol',
    title: 'Deep Sleep Optimization',
    price: 25.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_WEL2 || 'price_placeholder_wel2',
    r2Key: 'Deep_Sleep_Optimization-2026.pdf',
    filePath: 'sleep_optimization.pdf',
    downloadFilename: 'Deep-Sleep-Optimization-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-wel-3',
    slug: 'mindfulness-habit-reset',
    title: 'Mindfulness & Habit Reset',
    price: 18.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_WEL3 || 'price_placeholder_wel3',
    r2Key: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
    filePath: 'habit_reset_workbook.pdf',
    downloadFilename: 'Mindfulness-and-Habit-Reset-Workbook-123TheNextLevel.pdf',
    active: true
  },
  {
    id: 'g-bundle-1',
    slug: '3-part-bundle',
    title: '3-Part Digital Master Guides Bundle',
    price: 29.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_BUNDLE1 || 'price_placeholder_bundle1',
    r2Key: null,
    filePath: '',
    active: true
  }
];

export function getProductById(id) {
  return products.find(p => p.id === id && p.active);
}
