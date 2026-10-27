/**
 * 123TheNextLevel Guides & Clinical Publications Registry
 * Clean separation of Complimentary Free Guides and Premium Digital Master Guides.
 */

export interface ComplimentaryGuide {
  id: string;
  tag: string;
  tagColor: string;
  priceBadge: string;
  price: string;
  title: string;
  subtitle?: string;
  shortTitle: string;
  description: string;
  fileUrl: string;
  fileName: string;
  coverImage: string;
  primaryCtaText: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  highlights: string[];
}

export interface PremiumMasterGuide {
  id: string;
  slug: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Wellness' | 'Metabolic Health & Body Composition';
  shortDescription: string;
  longDescription: string;
  priceDisplay: string;
  priceInCents: number;
  stripePriceId: string;
  checkoutUrl: string;
  image: string;
  fileName: string;
  featured: boolean;
  tags: string[];
  included: string[];
  audience: string;
  disclaimer: string;
}

// ============================================================================
// SECTION 1: Complimentary Translation & Baseline Guides (100% Free PDFs — $0.00)
// ============================================================================
export const COMPLIMENTARY_FREE_GUIDES: ComplimentaryGuide[] = [
  {
    id: 'idiots-guide',
    tag: 'Everyday Translator (100% Free • $0)',
    tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    priceBadge: '$0.00 FREE',
    price: '$0.00',
    title: "An Idiot's Guide to the Next Level Lifespan",
    shortTitle: "An Idiot's Guide",
    description: 'A ruthlessly honest, 5-page translator designed to decode our complex molecular science, explain why living longer is a curse if you are frail, and give you your immediate, zero-cost daily habits.',
    fileUrl: '/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf',
    fileName: 'idiots-guide-to-the-next-level-lifespan.pdf',
    coverImage: '/covers/the-next-level-lifespan-cover.png',
    primaryCtaText: 'Download Free Guide (PDF)',
    highlights: [
      'Simple post-meal hacks & glucose stabilization',
      'Circadian breathing rules & autonomic tone',
      'Epigenetics & age-reversal made simple',
      'Zero-cost immediate daily longevity habits checklist'
    ]
  },
  {
    id: 'clinician-copilot',
    tag: 'Clinician Co-Pilot Suite (100% Free • $0)',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    priceBadge: '$0.00 FREE',
    price: '$0.00',
    title: 'The Clinician Co-Pilot: From Guessing to Knowing',
    subtitle: 'A Progressive Diagnostic Roadmap & Printable GP Consultation Workbook',
    shortTitle: 'The Clinician Co-Pilot',
    description: 'Cross the bridge from guessing to knowing with this clinician-ready consultation workbook. Includes our Lola Vital Check 56 biomarker breakdown, laboratory draw checklist, and a printable template to co-evaluate your telemetry with your doctor.',
    fileUrl: '/assets/docs/clinical-baseline-consultation-workbook.pdf',
    fileName: 'clinical-baseline-consultation-workbook.pdf',
    coverImage: '/assets/images/shop/gp_consultation_cover.png',
    primaryCtaText: '📥 Download Free PDF',
    secondaryCtaText: '✏️ Interactive Online Workbook ➔',
    secondaryCtaLink: '/clinician-copilot',
    highlights: [
      'Printable doctor note & consultation template',
      'Lola Vital Check 56 biomarker breakdown',
      'Laboratory draw checklist & reference targets',
      'Actionable clinician co-pilot discussion questions'
    ]
  }
];

// ============================================================================
// SECTION 2: Premium Digital Master Guides (Paid Master Series)
// Master Guides intact with checkout integration links
// ============================================================================
export const PREMIUM_MASTER_GUIDES: PremiumMasterGuide[] = [
  {
    id: 'g-met-1',
    slug: 'metabolic-master-guide',
    title: 'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
    category: 'Metabolic Health & Body Composition',
    shortDescription: 'A phased biometric blueprint to strip deep visceral organ fat, optimize glycemic control, and preserve skeletal muscle mass.',
    longDescription: 'A comprehensive, phased biometric blueprint to strip deep visceral organ fat, optimize glycemic control, and preserve skeletal muscle mass through calibrated bioimpedance telemetry, progressive overload, and clinician leave-behind protocols.',
    priceDisplay: '£19.00 / $25.00 / €22.00',
    priceInCents: 1900,
    stripePriceId: 'price_metabolic_master_guide',
    checkoutUrl: '/checkout?guide=metabolic-master-guide',
    image: '/assets/images/metabolic_nutrition_cover_New.png',
    fileName: 'metabolic-master-guide.pdf',
    featured: true,
    tags: ['Metabolic Health', 'Visceral Fat', 'Bioimpedance', 'Body Composition', 'Wearables'],
    included: [
      'Visceral Fat Rating & Smart Scale Calibration',
      'Targeted Protein & Resistance Workout Schedules',
      '14-Day Telemetry Logging & GP Leave-Behind Export',
      'Sunday Urinalysis & Day 90 Blood Draw Cadence Matrix'
    ],
    audience: 'Individuals targeting stubborn visceral organ adiposity, insulin resistance, or optimizing lean muscle mass.',
    disclaimer: 'This is an educational guide and does not substitute clinical medical advice or individualized diagnostic care.'
  },
  {
    id: 'g-fit-1',
    slug: 'beginner-home-workout-plan',
    title: 'Beginner Home Workout Plan',
    category: 'Fitness',
    shortDescription: 'A 4-week zero-equipment protocol to build foundational strength and mobility from home.',
    longDescription: 'This comprehensive 4-week protocol is designed specifically for beginners. It focuses on functional movement patterns, core stability, and progressive overload using only your body weight.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_fit1',
    checkoutUrl: '/checkout?guide=beginner-home-workout-plan', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_1]
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    fileName: 'beginner_home_workout_v1.pdf',
    featured: true,
    tags: ['Bodyweight', 'Beginner', 'Home Workout', 'Strength'],
    included: [
      '4-week progressive workout schedule',
      'Step-by-step exercise glossary with form cues',
      'Warm-up and cooldown routines',
      'Progress tracking worksheets'
    ],
    audience: 'Individuals looking to start strength training without gym access or equipment.',
    disclaimer: 'Consult with a physician before beginning any new exercise program. This guide is for educational purposes only.'
  },
  {
    id: 'g-fit-2',
    slug: 'strength-training-hypertrophy',
    title: 'Hypertrophy & Strength Protocol',
    category: 'Fitness',
    shortDescription: 'An advanced 8-week gym-based guide focusing on muscle hypertrophy and progressive overload.',
    longDescription: 'Ready to break through plateaus? This 8-week structured hypertrophy protocol is built on the latest sports science to maximize muscle protein synthesis and nervous system adaptation.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_fit2',
    checkoutUrl: '/checkout?guide=strength-training-hypertrophy', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_2]
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    fileName: 'hypertrophy_protocol_v1.pdf',
    featured: false,
    tags: ['Gym', 'Hypertrophy', 'Advanced', 'Muscle Building'],
    included: [
      '8-week periodized training blocks',
      'RPE (Rate of Perceived Exertion) guidelines',
      'Detailed volume and intensity metrics',
      'Rest and recovery optimization strategies'
    ],
    audience: 'Intermediate to advanced lifters looking to maximize muscle growth and break plateaus.',
    disclaimer: 'This program involves heavy resistance training. Prior lifting experience is recommended. Not medical advice.'
  },
  {
    id: 'g-fit-3',
    slug: 'mobility-recovery-routine',
    title: 'Daily Mobility & Recovery',
    category: 'Fitness',
    shortDescription: '15-minute daily routines to enhance joint health, reduce stiffness, and accelerate recovery.',
    longDescription: 'True fitness requires mobility. This guide provides short, actionable 15-minute routines you can perform daily to counteract sitting, alleviate stiffness, and prime your central nervous system.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_fit3',
    checkoutUrl: '/checkout?guide=mobility-recovery-routine', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_3]
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    fileName: 'daily_mobility_v1.pdf',
    featured: false,
    tags: ['Mobility', 'Recovery', 'Longevity', 'Joint Health'],
    included: [
      'Morning activation routines',
      'Evening down-regulation stretches',
      'Desk-worker posture corrections',
      'Breathing protocols for parasympathetic shifts'
    ],
    audience: 'Anyone experiencing stiffness, desk workers, or athletes looking to improve active recovery.',
    disclaimer: 'If you have existing joint injuries or chronic pain, consult a physical therapist before use.'
  },
  {
    id: 'g-nut-1',
    slug: 'healthy-meal-planning-guide',
    title: 'The Master Meal Planning Guide',
    category: 'Nutrition',
    shortDescription: 'A systematic approach to weekly meal prep, grocery shopping, and macro-balancing.',
    longDescription: 'Take the stress out of eating well. This guide teaches you a systematic approach to meal prep: batch-cook macronutrients, balance plates automatically, and use high-efficiency grocery templates.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_nut1',
    checkoutUrl: '/checkout?guide=healthy-meal-planning-guide', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_4]
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    fileName: 'fat_loss_blueprint.pdf',
    featured: true,
    tags: ['Meal Prep', 'Efficiency', 'Macros', 'Whole Foods'],
    included: [
      'Mix-and-match macro cheat sheets',
      'Printable grocery lists',
      'Storage and reheating guidelines',
      'Time-saving batch cooking schedules'
    ],
    audience: 'Busy professionals and parents looking to streamline their weekly nutrition without sacrificing quality.',
    disclaimer: 'This guide provides general nutritional information and is not intended to treat medical conditions.'
  },
  {
    id: 'g-nut-2',
    slug: 'fat-loss-nutrition-blueprint',
    title: 'Fat Loss Nutrition Blueprint',
    category: 'Nutrition',
    shortDescription: 'Evidence-based strategies for sustainable fat loss without extreme restriction.',
    longDescription: 'Forget crash diets. This blueprint focuses on energy balance, metabolic health, and sustainable habit formation. Understand the physiology of fat loss and how to calculate your personalized targets.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_nut2',
    checkoutUrl: '/checkout?guide=fat-loss-nutrition-blueprint', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_5]
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    fileName: 'fat-loss-nutrition-blueprint.pdf',
    featured: false,
    tags: ['Weight Loss', 'Metabolism', 'Energy Balance', 'Science-Based'],
    included: [
      'Calorie and macro calculation formulas',
      'Strategies for overcoming weight loss plateaus',
      'Hunger management and satiety indexes',
      'Dining out and travel survival guides'
    ],
    audience: 'Individuals seeking a sustainable, science-based approach to body recomposition.',
    disclaimer: 'Not intended as medical advice or a treatment for eating disorders. Consult a registered dietitian for clinical needs.'
  },
  {
    id: 'g-nut-3',
    slug: 'high-protein-recipe-collection',
    title: 'High-Protein Recipe Collection',
    category: 'Nutrition',
    shortDescription: '50+ delicious, easy-to-make recipes designed to hit your protein targets.',
    longDescription: "Struggling to hit your daily protein goals? This collection features over 50 chef-crafted, high-protein recipes that don't taste like diet food. All recipes take under 30 minutes to prepare.",
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_nut3',
    checkoutUrl: '/checkout?guide=high-protein-recipe-collection', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_6]
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    fileName: 'high_protein_recipes.pdf',
    featured: false,
    tags: ['Recipes', 'High Protein', 'Muscle Building', 'Quick Meals'],
    included: [
      '50+ high-protein recipes',
      'Full macronutrient breakdowns per serving',
      'Plant-based and omnivore options',
      'Ingredient substitution guide'
    ],
    audience: 'Anyone struggling to consume adequate protein for muscle growth or satiety.',
    disclaimer: 'Recipes contain common allergens. Review ingredient lists carefully if you have food allergies.'
  },
  {
    id: 'g-wel-1',
    slug: 'stress-management-toolkit',
    title: 'Cortisol & Stress Management',
    category: 'Wellness',
    shortDescription: 'Actionable protocols to lower cortisol, manage chronic stress, and restore nervous system balance.',
    longDescription: 'Chronic stress is the enemy of high performance. This toolkit provides science-backed protocols to actively down-regulate your nervous system through NSDR and autonomic regulation.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_wel1',
    checkoutUrl: '/checkout?guide=stress-management-toolkit', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_7]
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    fileName: 'stress-management-toolkit.pdf',
    featured: true,
    tags: ['Stress', 'Cortisol', 'Mental Health', 'Nervous System'],
    included: [
      'Daily stress-mapping worksheets',
      'Actionable breathwork protocols',
      'Vagus nerve stimulation techniques',
      'Boundary setting and time-blocking templates'
    ],
    audience: 'High-achievers, parents, and anyone experiencing chronic burnout or daily anxiety.',
    disclaimer: 'This is an educational guide, not a replacement for professional psychological therapy or psychiatric care.'
  },
  {
    id: 'g-wel-2',
    slug: 'sleep-optimization-protocol',
    title: 'Deep Sleep Optimization',
    category: 'Wellness',
    shortDescription: 'A blueprint for fixing your circadian rhythm and maximizing REM and deep sleep stages.',
    longDescription: 'Sleep is your ultimate performance enhancer. This guide breaks down the neurobiology of sleep and provides a strict protocol for aligning your circadian rhythm and thermal curves.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_wel2',
    checkoutUrl: '/checkout?guide=sleep-optimization-protocol', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_8]
    image: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?q=80&w=800&auto=format&fit=crop',
    fileName: 'sleep_optimization.pdf',
    featured: false,
    tags: ['Sleep', 'Circadian Rhythm', 'Recovery', 'Biohacking'],
    included: [
      'Ideal sleep environment checklist',
      'Supplementation protocols (Magnesium, Theanine, etc.)',
      'Caffeine and light-exposure timing charts',
      'Pre-sleep wind-down routines'
    ],
    audience: 'Individuals suffering from poor sleep architecture, insomnia, or grogginess.',
    disclaimer: 'If you suffer from clinical sleep apnea or chronic insomnia, consult a sleep medicine physician.'
  },
  {
    id: 'g-wel-3',
    slug: 'mindfulness-habit-reset',
    title: 'Mindfulness & Habit Reset',
    category: 'Wellness',
    shortDescription: 'A 21-day workbook to break bad habits and hardwire positive behavioral changes.',
    longDescription: 'Change your habits, change your life. This 21-day interactive workbook uses principles of neuroplasticity and behavioral design to help you build sustainable longevity habits.',
    priceDisplay: '£29.00 / $29.00',
    priceInCents: 2900,
    stripePriceId: 'price_placeholder_wel3',
    checkoutUrl: '/checkout?guide=mindfulness-habit-reset', // [PLACEHOLDER_PREMIUM_GUIDE_CHECKOUT_URL_9]
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop',
    fileName: 'habit_reset_workbook.pdf',
    featured: false,
    tags: ['Habits', 'Mindfulness', 'Psychology', 'Workbook'],
    included: [
      '21 days of journal prompts',
      'Habit loop identification exercises',
      'Dopamine detox strategies',
      'Identity-based goal setting frameworks'
    ],
    audience: 'Anyone feeling "stuck" in a rut looking to rebuild their daily routines from the ground up.',
    disclaimer: 'For educational self-improvement only. Not a clinical psychological intervention.'
  }
];

// ============================================================================
// SECTION 3: Premium Master Protocol Bundles (Curated Multi-Book Vaults)
// ============================================================================
export interface BundleOfferConfig {
  id: string;
  name: string;
  badge: string;
  priceDisplay: string;
  priceInCents: number;
  prices: {
    GBP: string;
    USD: string;
    EUR: string;
  };
  description: string;
  highlights: string[];
  checkoutUrl: string;
}

export const BUNDLE_OFFERS: Record<string, BundleOfferConfig> = {
  'bundle-pick-3': {
    id: 'bundle-pick-3',
    name: 'Pick Any 3 Master Guides',
    badge: 'Custom Trio Bundle',
    priceDisplay: '£29.99 / $29.99 / €29.99',
    priceInCents: 2999,
    prices: {
      GBP: '£29.99',
      USD: '$29.99',
      EUR: '29,99€'
    },
    description: 'Choose any 3 of our 10 Premium Master Guides to build your tailored longevity and healthspan protocol.',
    highlights: [
      'Choose any 3 of our 10 Premium Master Guides',
      'Over 50% savings vs individual pricing',
      'Interactive custom protocol selection',
      'Instant PDF downloads & lifetime access'
    ],
    checkoutUrl: '/checkout?bundle=bundle-pick-3'
  },
  'bundle-complete-vault-10': {
    id: 'bundle-complete-vault-10',
    name: 'Complete 10-Guide Master Vault',
    badge: 'Complete Vault Access',
    priceDisplay: '£59.99 / $59.99 / €59.99',
    priceInCents: 5999,
    prices: {
      GBP: '£59.99',
      USD: '$59.99',
      EUR: '59,99€'
    },
    description: 'Instant access to all 10 Premium Master Guides — covering body composition, metabolic nutrition, autonomic engineering, women\'s health, home fitness, and clinical telemetry.',
    highlights: [
      'All 10 Premium Master Execution Books included',
      'Best Value — Maximum Savings (Over 70% Off)',
      'Includes 12-Week Metabolic & Visceral Fat Protocol',
      '1-Click Instant Unlock & ZIP Archive access'
    ],
    checkoutUrl: '/checkout?bundle=bundle-complete-vault-10'
  }
};

// Compatibility exports
export const guides = PREMIUM_MASTER_GUIDES;
export default {
  COMPLIMENTARY_FREE_GUIDES,
  PREMIUM_MASTER_GUIDES,
  BUNDLE_OFFERS,
  guides
};
