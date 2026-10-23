import React, { useEffect, useState } from 'react';

interface MasterGuide {
  id: string;
  pillar: string;
  title: string;
  price: string;
  usPrice: string;
  primaryImage: string;
  fallbackImage?: string;
  description: string;
  highlights: string[];
  checkoutUrl: string;
}

// Universal Multi-Path Cover Image Resolver
const GuideCoverImage: React.FC<{ primaryImage: string; fallbackImage?: string; altText: string }> = ({
  primaryImage,
  fallbackImage,
  altText
}) => {
  const [src, setSrc] = useState(primaryImage);

  return (
    <img
      src={src}
      alt={altText}
      onError={() => {
        if (fallbackImage && src !== fallbackImage) {
          setSrc(fallbackImage);
        }
      }}
      className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
    />
  );
};

export default function PremiumGuidesPage() {
  useEffect(() => {
    document.title = "Premium Master Guides | 123TheNextLevel";
    window.scrollTo(0, 0);
  }, []);

  const masterGuides: MasterGuide[] = [
    {
      id: "workout-plan",
      pillar: "Fitness",
      title: "Beginner Home Workout Plan",
      price: "£19.00",
      usPrice: "$24.00",
      primaryImage: "/covers/beginner-home-workout-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
      description: "A 4-week zero-equipment protocol to build foundational strength and mobility from home.",
      highlights: [
        "4-Week Progressive Bodyweight Schedule",
        "VO2 Max Conditioning & Zone 2 Endurance",
        "Functional Joint Mobility & Muscle Preservation"
      ],
      checkoutUrl: "/checkout?product=workout-plan"
    },
    {
      id: "hypertrophy-strength",
      pillar: "Fitness",
      title: "Hypertrophy & Strength Protocol",
      price: "£29.00",
      usPrice: "$38.00",
      primaryImage: "/covers/hypertrophy-strength-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      description: "An evidence-based 8-week progressive overload system to break through plateaus and build dense skeletal muscle.",
      highlights: [
        "8-Week Periodized Hypertrophy Program",
        "Plateau-Breaking Volume & Intensity Guide",
        "Rep-in-Reserve (RIR) Progression Framework"
      ],
      checkoutUrl: "/checkout?product=hypertrophy-strength"
    },
    {
      id: "mobility-recovery",
      pillar: "Fitness",
      title: "Daily Mobility & Recovery Routine",
      price: "£15.00",
      usPrice: "$19.00",
      primaryImage: "/covers/daily-mobility-recovery-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      description: "A science-backed 15-minute blueprint for desk workers, athletes, and movers to restore joint kinematics and spine health.",
      highlights: [
        "15-Minute Daily Desk-Worker Flow",
        "Thoracic & Hip Mobility Protocols",
        "Active Recovery & Joint Longevity Sequence"
      ],
      checkoutUrl: "/checkout?product=mobility-recovery"
    },
    {
      id: "meal-planner",
      pillar: "Nutrition",
      title: "The Master Meal Planning Guide",
      price: "£24.00",
      usPrice: "$29.00",
      primaryImage: "/covers/master-meal-planning-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      description: "A systematic approach to weekly meal prep, grocery shopping, and macro-balancing that fits real, busy life.",
      highlights: [
        "Glucose Spike Mitigation Recipes",
        "Microbiome Diversity Grocery Checklist",
        "Anti-Inflammatory Meal Preparation"
      ],
      checkoutUrl: "/checkout?product=meal-planner"
    },
    {
      id: "fat-loss-blueprint",
      pillar: "Nutrition",
      title: "The Fat Loss Nutrition Blueprint",
      price: "£29.00",
      usPrice: "$38.00",
      primaryImage: "/covers/fat-loss-nutrition-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop",
      description: "Your science-based path to sustainable body recomposition and fat loss without metabolic slowdown or muscle loss.",
      highlights: [
        "Metabolic Rate Preservation Protocols",
        "Protein Satiety & Deficit Calculation",
        "Diet Break & Maintenance Transition Plan"
      ],
      checkoutUrl: "/checkout?product=fat-loss-blueprint"
    },
    {
      id: "high-protein-recipes",
      pillar: "Nutrition",
      title: "High-Protein Recipe Collection",
      price: "£19.00",
      usPrice: "$24.00",
      primaryImage: "/covers/high-protein-recipe-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      description: "Clinical & behavioural culinary systems for satiety, muscle preservation, and practical high-protein kitchen mastery.",
      highlights: [
        "30+ High-Protein Meal Formulations",
        "Macro-Engineered Satiety Index Recipes",
        "Batch-Cooking & Freezing Prep Framework"
      ],
      checkoutUrl: "/checkout?product=high-protein-recipes"
    },
    {
      id: "stress-management",
      pillar: "Wellness",
      title: "Cortisol & Stress Management",
      price: "£22.00",
      usPrice: "$28.00",
      primaryImage: "/covers/cortisol-stress-management-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
      description: "Actionable protocols to lower cortisol, manage chronic stress, and restore autonomic nervous system balance.",
      highlights: [
        "10-Minute NSDR Audio & Written Scripts",
        "Vagal Tone Exercises to Boost Nocturnal HRV",
        "Circadian Light & Adrenal Reset Guide"
      ],
      checkoutUrl: "/checkout?product=stress-management"
    },
    {
      id: "sleep-optimization",
      pillar: "Wellness",
      title: "Deep Sleep Optimization Protocol",
      price: "£25.00",
      usPrice: "$32.00",
      primaryImage: "/covers/deep-sleep-optimization-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
      description: "A 28-day actionable blueprint to maximize deep slow-wave sleep, optimize REM cycles, and eliminate nocturnal waking.",
      highlights: [
        "28-Day Actionable Sleep Architect Blueprint",
        "Thermal & Adenosine Cycle Timing Guide",
        "Nocturnal Awakening Rescue Protocol"
      ],
      checkoutUrl: "/checkout?product=sleep-optimization"
    },
    {
      id: "habit-reset",
      pillar: "Wellness",
      title: "Mindfulness & Habit Reset Workbook",
      price: "£18.00",
      usPrice: "$24.00",
      primaryImage: "/covers/mindfulness-habit-reset-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop",
      description: "A structured 21-day interactive journal to dismantle compulsive dopamine loops and build automatic longevity habits.",
      highlights: [
        "21-Day Guided Exercise Prompt Sheets",
        "Dopamine Detox & Cue-Routine Audits",
        "Friction-Based Habit Stacking Framework"
      ],
      checkoutUrl: "/checkout?product=habit-reset"
    },
    {
      id: "lifespan-blueprint",
      pillar: "Epigenetics",
      title: "The Next Level Lifespan Blueprint",
      price: "£22.00",
      usPrice: "$28.00",
      primaryImage: "/covers/the-next-level-lifespan-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
      description: "Upgrade your cellular hardware today to run tomorrow’s age-reversal software: sirtuin activation, autophagy, and DNA protection.",
      highlights: [
        "Sirtuin & NAD+ Replenishment Regimen",
        "Autophagy Optimization & Fasting Thresholds",
        "Epigenetic Age-Reversal Action Suite"
      ],
      checkoutUrl: "/checkout?product=lifespan-blueprint"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* Header */}
      <header className="relative py-20 border-b border-slate-900 bg-slate-950 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            ⚡ Actionable Master Execution Books
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Pillar Master Guides Catalog
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Translate high-level geroscience into simple daily execution. Download complete, step-by-step PDF books with workout plans, meal guides, and autonomic resets.
          </p>
        </div>
      </header>

      {/* 6-Card Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masterGuides.map((guide) => (
            <div 
              key={guide.id}
              className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-cyan-500/40 hover:shadow-2xl transition duration-300 relative overflow-hidden"
            >
              <div className="space-y-5">
                
                {/* 3D Cover Image with Universal Multi-Path Resolver */}
                <div className="aspect-[4/5] w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative shadow-lg">
                  <GuideCoverImage 
                    primaryImage={guide.primaryImage} 
                    fallbackImage={guide.fallbackImage} 
                    altText={guide.title} 
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                    {guide.pillar}
                  </span>
                  <h3 className="text-lg font-black text-white leading-snug">
                    {guide.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-amber-400">{guide.price}</span>
                    <span className="text-xs text-slate-500">({guide.usPrice})</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {guide.description}
                  </p>
                </div>

                <ul className="space-y-2 border-t border-slate-800 pt-4">
                  {guide.highlights.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">⚡</span> {item}
                    </li>
                  ))}
                </ul>

              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={guide.checkoutUrl}
                  className="w-full py-3.5 rounded-xl text-xs font-bold text-center block bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/15"
                >
                  Buy Digital Master Book ({guide.price}) ➔
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 55% OFF MASTER BUNDLE BANNER */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-md inline-block">
              🔥 EXCLUSIVE SUBSCRIBER BUNDLE (SAVE OVER 55%)
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Get the Complete 6-Pillar Master Suite
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Unlock all 6 specialized digital execution books (Workout Plan + Meal Planner + Stress Management + Epigenetics + Women's Health + Socio-Architecture) for one deeply discounted price.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
            <div className="text-center md:text-right">
              <span className="text-xs text-slate-500 line-through block">Regular Price: £128.00</span>
              <span className="text-3xl md:text-4xl font-black text-cyan-400">£49.00</span>
              <span className="text-xs text-slate-400 block">$59.00 / 55,00€</span>
            </div>
            <a
              href="/checkout?bundle=all-six-master-guides"
              className="py-4 px-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-cyan-500/20 transition-all"
            >
              Get All 6 Master Books (£49.00) ➔
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
