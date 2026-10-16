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
  if (primaryImage.startsWith('http://') || primaryImage.startsWith('https://')) {
    return (
      <img
        src={primaryImage}
        alt={altText}
        className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
      />
    );
  }

  const possiblePaths = [
    `/assets/images/shop/${primaryImage}`,
    `/assets/images/blog/${primaryImage}`,
    `/covers/${primaryImage}`,
    `/assets/images/${primaryImage}`,
    `/assets/${primaryImage}`,
    `/${primaryImage}`,
    `/blog-covers/${primaryImage}`
  ];

  if (fallbackImage) {
    possiblePaths.push(
      `/assets/images/shop/${fallbackImage}`,
      `/assets/images/blog/${fallbackImage}`,
      `/covers/${fallbackImage}`,
      `/assets/images/${fallbackImage}`,
      `/assets/${fallbackImage}`,
      `/${fallbackImage}`
    );
  }

  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  return (
    <img
      src={possiblePaths[currentPathIndex]}
      alt={altText}
      onError={() => {
        if (currentPathIndex < possiblePaths.length - 1) {
          setCurrentPathIndex(prev => prev + 1);
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
      primaryImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
      fallbackImage: "performance_biodata_cover.png",
      description: "A 4-week zero-equipment protocol to build foundational strength and mobility from home.",
      highlights: [
        "12-Week Progressive Bodyweight Schedule",
        "VO2 Max Conditioning & Zone 2 Endurance",
        "Functional Joint Mobility & Muscle Preservation"
      ],
      checkoutUrl: "/checkout?product=workout-plan"
    },
    {
      id: "meal-planner",
      pillar: "Nutrition",
      title: "The Master Meal Planning Guide",
      price: "£24.00",
      usPrice: "$29.00",
      primaryImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      fallbackImage: "metabolic_nutrition_cover.png",
      description: "A systematic approach to weekly meal prep, grocery shopping, and macro-balancing.",
      highlights: [
        "Glucose Spike Mitigation Recipes",
        "Microbiome Diversity Grocery Checklist",
        "Anti-Inflammatory Meal Preparation"
      ],
      checkoutUrl: "/checkout?product=meal-planner"
    },
    {
      id: "stress-management",
      pillar: "Wellness",
      title: "Cortisol & Stress Management",
      price: "£22.00",
      usPrice: "$28.00",
      primaryImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
      fallbackImage: "autonomic_engineering_cover.png",
      description: "Actionable protocols to lower cortisol, manage chronic stress, and restore nervous system balance.",
      highlights: [
        "10-Minute NSDR Audio & Written Scripts",
        "Vagal Tone Exercises to Boost Nocturnal HRV",
        "Circadian Light & Sleep Architecture Guide"
      ],
      checkoutUrl: "/checkout?product=stress-management"
    },
    {
      id: "epigenetics-guide",
      pillar: "Epigenetics",
      title: "Cellular Reprogramming & Epigenetic Longevity",
      price: "£22.00",
      usPrice: "$28.00",
      primaryImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
      fallbackImage: "healthspan_longevity_cover.png",
      description: "Learn how to activate sirtuins, induce cellular autophagy, and protect your DNA from environmental methylation decay.",
      highlights: [
        "Sirtuin & NAD+ Activation Protocols",
        "Autophagy Thresholds & Intermittent Fasting",
        "Yamanaka Factor Science & Epigenetic Clocks"
      ],
      checkoutUrl: "/checkout?product=epigenetics-guide"
    },
    {
      id: "womens-health-guide",
      pillar: "Women's Health",
      title: "Women's Healthspan & Ovarian Longevity",
      price: "£22.00",
      usPrice: "$28.00",
      primaryImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
      fallbackImage: "womens_health_cover.png",
      description: "Muscle-centric medicine, endocrine baseline tracking, AMH profiling, and bone density preservation.",
      highlights: [
        "Endocrine Health & Hormonal Balance",
        "Strength-Over-Thinness Muscle Building",
        "Ovarian Reserve & Biological Age Tracking"
      ],
      checkoutUrl: "/checkout?product=womens-health-guide"
    },
    {
      id: "socio-architecture-guide",
      pillar: "Socio-Architecture",
      title: "Socio-Biological Architecture & Connection Blueprint",
      price: "£19.00",
      usPrice: "$24.00",
      primaryImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      fallbackImage: "socio_architecture_cover.png",
      description: "Micro-community vitals, neural coupling mechanics, and psychoneuroimmunology protocols to lower inflammation.",
      highlights: [
        "Micro-Community Health Formation",
        "Neural Coupling & Stress Reduction",
        "Environmental & Lifestyle Design"
      ],
      checkoutUrl: "/checkout?product=socio-architecture-guide"
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
