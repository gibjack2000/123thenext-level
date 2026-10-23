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
    filePath: 'beginner_home_workout-2026.pdf',
    downloadFilename: 'beginner_home_workout-2026.pdf',
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
    filePath: 'Hypertrophy-Strength-Protocol-2026.pdf',
    downloadFilename: 'Hypertrophy-Strength-Protocol-2026.pdf',
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
    filePath: 'Daily_Mobility_and_Recovery-2026.pdf',
    downloadFilename: 'Daily_Mobility_and_Recovery-2026.pdf',
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
    filePath: 'The Master_Meal_Planning_Guide-2026.pdf',
    downloadFilename: 'The Master_Meal_Planning_Guide-2026.pdf',
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
    filePath: 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
    downloadFilename: 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
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
    filePath: 'High_Protein_Recipe_Collection-2026.pdf',
    downloadFilename: 'High_Protein_Recipe_Collection-2026.pdf',
    active: true
  },
  {
    id: 'g-wel-1',
    slug: 'stress-management-toolkit',
    title: 'Cortisol & Stress Management',
    price: 22.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_WEL1 || 'price_placeholder_wel1',
    r2Key: 'Cortisol_&_Stress_Management-2026.pdf',
    filePath: 'Cortisol_&_Stress_Management-2026.pdf',
    downloadFilename: 'Cortisol_&_Stress_Management-2026.pdf',
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
    filePath: 'Deep_Sleep_Optimization-2026.pdf',
    downloadFilename: 'Deep_Sleep_Optimization-2026.pdf',
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
    filePath: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
    downloadFilename: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
    active: true
  },
  {
    id: 'g-epi-1',
    slug: 'the-next-level-lifespan',
    title: 'The Next Level Lifespan Blueprint',
    price: 22.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_EPI1 || 'price_placeholder_epi1',
    r2Key: 'the-next-level-lifespan.pdf',
    filePath: 'the-next-level-lifespan.pdf',
    downloadFilename: 'the-next-level-lifespan.pdf',
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
  },
  {
    id: 'g-bundle-6',
    slug: 'all-six-master-guides',
    title: 'Complete 6-Pillar Master Suite (All 6 Master Books)',
    price: 49.00,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_BUNDLE6 || 'price_placeholder_bundle6',
    r2Key: null,
    filePath: '',
    active: true
  },
  {
    id: 'g-bundle-9',
    slug: 'all-nine-master-guides',
    title: 'Complete 9-Book Master Longevity Vault (All 9 Books)',
    price: 59.99,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_BUNDLE9 || 'price_placeholder_bundle9',
    r2Key: null,
    filePath: '',
    active: true
  }
];

export function getProductById(id) {
  return products.find(p => p.id === id && p.active);
}
