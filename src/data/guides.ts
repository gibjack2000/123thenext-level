export interface Guide {
  id: string;
  slug: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Wellness';
  shortDescription: string;
  longDescription: string;
  priceDisplay: string;
  stripePriceId: string;
  image: string;
  fileName: string; // The PDF filename to be delivered
  featured: boolean;
  tags: string[];
  included: string[];
  audience: string;
  disclaimer: string;
}

export const guides: Guide[] = [
  {
    id: 'g-fit-1',
    slug: 'beginner-home-workout-plan',
    title: 'Beginner Home Workout Plan',
    category: 'Fitness',
    shortDescription: 'A 4-week zero-equipment protocol to build foundational strength and mobility from home.',
    longDescription: 'This comprehensive 4-week protocol is designed specifically for beginners. It focuses on functional movement patterns, core stability, and progressive overload using only your body weight. Whether you are returning from an injury or just starting your fitness journey, this guide provides the structured roadmap you need.',
    priceDisplay: '£19.00',
    stripePriceId: 'price_placeholder_fit1', // REPLACE WITH REAL STRIPE PRICE ID
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
    longDescription: 'Ready to break through plateaus? This 8-week structured hypertrophy protocol is built on the latest sports science. It divides your training into distinct mesocycles, focusing on volume accumulation followed by intensity blocks to maximize muscle protein synthesis and nervous system adaptation.',
    priceDisplay: '£29.00',
    stripePriceId: 'price_placeholder_fit2',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
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
    longDescription: 'True fitness requires mobility. This guide provides short, actionable 15-minute routines you can perform daily to counteract the effects of sitting, alleviate joint stiffness, and prime your central nervous system for both training and deep rest.',
    priceDisplay: '£15.00',
    stripePriceId: 'price_placeholder_fit3',
    image: 'https://images.unsplash.com/photo-1552825980-86a073a65239?q=80&w=800&auto=format&fit=crop',
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
    longDescription: 'Take the stress out of eating well. This guide teaches you a systematic, time-saving approach to meal prep. Learn how to batch-cook macronutrients, build balanced plates automatically, and navigate the grocery store with high-efficiency templates.',
    priceDisplay: '£24.00',
    stripePriceId: 'price_placeholder_nut1',
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
    longDescription: 'Forget crash diets. This blueprint focuses on energy balance, metabolic health, and sustainable habit formation. Understand the physiology of fat loss, how to calculate your personalized caloric target, and how to cycle your carbohydrates for maximum metabolic flexibility.',
    priceDisplay: '£29.00',
    stripePriceId: 'price_placeholder_nut2',
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
    disclaimer: 'Not intended as medical advice or a treatment for eating disorders. Consult a registered dietitian for personalized clinical needs.'
  },
  {
    id: 'g-nut-3',
    slug: 'high-protein-recipe-collection',
    title: 'High-Protein Recipe Collection',
    category: 'Nutrition',
    shortDescription: '50+ delicious, easy-to-make recipes designed to hit your protein targets.',
    longDescription: 'Struggling to hit your daily protein goals? This collection features over 50 chef-crafted, high-protein recipes that don\'t taste like "diet food." From savory breakfasts to macro-friendly desserts, every recipe includes full nutritional breakdowns and takes under 30 minutes to prepare.',
    priceDisplay: '£19.00',
    stripePriceId: 'price_placeholder_nut3',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=800&auto=format&fit=crop',
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
    longDescription: 'Chronic stress is the enemy of high performance. This toolkit provides science-backed protocols to actively down-regulate your nervous system. Learn how to map your stress triggers, implement physiological sighs, and build a resilient autonomic nervous system.',
    priceDisplay: '£22.00',
    stripePriceId: 'price_placeholder_wel1',
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
    longDescription: 'Sleep is your ultimate performance enhancer. This guide breaks down the neurobiology of sleep and provides a strict, effective protocol for aligning your circadian rhythm. From morning sunlight exposure to evening temperature drops, learn how to engineer the perfect night of rest.',
    priceDisplay: '£25.00',
    stripePriceId: 'price_placeholder_wel2',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
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
    longDescription: 'Change your habits, change your life. This 21-day interactive workbook uses principles of cognitive behavioral therapy and neuroplasticity to help you decouple from negative loops and build sustainable, health-promoting routines without relying on willpower alone.',
    priceDisplay: '£18.00',
    stripePriceId: 'price_placeholder_wel3',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop',
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
