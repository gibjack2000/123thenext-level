import React, { useEffect } from 'react';

interface MasterGuide {
  id: string;
  pillar: string;
  title: string;
  price: string;
  usPrice: string;
  imageName: string;
  description: string;
  highlights: string[];
  checkoutUrl: string;
}

export default function PremiumGuidesPage() {
  useEffect(() => {
    document.title = "Premium Master Guides | 123TheNextLevel";
    window.scrollTo(0, 0);
  }, []);

  const masterGuides: MasterGuide[] = [
    {
      id: "epigenetics-guide",
      pillar: "Protocol 1: Epigenetics & Longevity",
      title: "Cellular Reprogramming & Epigenetic Longevity",
      price: "£22.00",
      usPrice: "$28.00",
      imageName: "healthspan_longevity_cover.png",
      description: "Learn how to activate sirtuins, induce cellular autophagy, and protect your DNA from environmental methylation decay.",
      highlights: [
        "Sirtuin & NAD+ Activation Protocols",
        "Autophagy Thresholds & Intermittent Fasting",
        "Yamanaka Factor Science & Epigenetic Clocks"
      ],
      checkoutUrl: "/checkout?product=epigenetics-guide"
    },
    {
      id: "performance-guide",
      pillar: "Protocol 2: Physical Hardware",
      title: "Beginner Home Workout & VO2 Max Strength Plan",
      price: "£19.00",
      usPrice: "$24.00",
      imageName: "performance_biodata_cover.png",
      description: "12-week progressive bodyweight and dumbbell routines to preserve skeletal muscle mass and build cardiorespiratory reserve.",
      highlights: [
        "12-Week Progressive Bodyweight Schedule",
        "VO2 Max Conditioning & Zone 2 Endurance",
        "Functional Joint Mobility & Muscle Preservation"
      ],
      checkoutUrl: "/checkout?product=performance-guide"
    },
    {
      id: "nutrition-guide",
      pillar: "Protocol 3: Metabolic Fuel",
      title: "The Master Metabolic Meal Planner & Grocery Guide",
      price: "£24.00",
      usPrice: "$29.00",
      imageName: "metabolic_nutrition_cover.png",
      description: "Flatten post-meal glucose curves, optimize gut microbiome diversity, and fuel cellular repair with low-glycemic templates.",
      highlights: [
        "Glucose Spike Mitigation Recipes",
        "Microbiome Diversity Grocery Checklist",
        "Anti-Inflammatory Meal Preparation"
      ],
      checkoutUrl: "/checkout?product=nutrition-guide"
    },
    {
      id: "autonomic-guide",
      pillar: "Protocol 4: Wellness & Autonomic Reset",
      title: "Cortisol Down-Regulation & Vagal Tone Protocol",
      price: "£22.00",
      usPrice: "$28.00",
      imageName: "autonomic_engineering_cover.png",
      description: "Master autonomic nervous system resets: 10-minute NSDR scripts, vagal tone exercises, and circadian sleep alignment.",
      highlights: [
        "10-Minute NSDR Audio & Written Scripts",
        "Vagal Tone Exercises to Boost Nocturnal HRV",
        "Circadian Light & Sleep Architecture Guide"
      ],
      checkoutUrl: "/checkout?product=autonomic-guide"
    },
    {
      id: "womens-health-guide",
      pillar: "Protocol 5: Women's Performance",
      title: "Ovary-Span & Endocrine Performance Guide",
      price: "£22.00",
      usPrice: "$28.00",
      imageName: "womens_health_cover.png",
      description: "Female-specific longevity protocols focusing on hormone balancing, bone mineral density preservation, and ovary-span health.",
      highlights: [
        "Endocrine Health & Hormonal Balance",
        "Strength-Over-Thinness Muscle Building",
        "Ovarian Reserve & Biological Age Tracking"
      ],
      checkoutUrl: "/checkout?product=womens-health-guide"
    },
    {
      id: "socio-architecture-guide",
      pillar: "Protocol 6: Socio-Architecture",
      title: "Socio-Biological Architecture & Connection Blueprint",
      price: "£19.00",
      usPrice: "$24.00",
      imageName: "socio_architecture_cover.png",
      description: "Build local support micro-communities and harness neural coupling to regulate systemic inflammation and stress.",
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

      {/* 6-Card Grid with Dual-Path Image Fallback */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masterGuides.map((guide) => (
            <div 
              key={guide.id}
              className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-cyan-500/40 hover:shadow-2xl transition duration-300 relative overflow-hidden"
            >
              <div className="space-y-5">
                
                {/* Image Container with Automatic Fallback */}
                <div className="aspect-[4/5] w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative shadow-lg">
                  <img 
                    src={`/assets/images/shop/${guide.imageName}`} 
                    alt={guide.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.src.includes('/assets/images/blog/')) {
                        target.src = `/assets/images/blog/${guide.imageName}`;
                      } else if (!target.src.includes('/covers/')) {
                        target.src = `/covers/${guide.imageName}`;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
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
      </main>
    </div>
  );
}

export const PremiumGuides = PremiumGuidesPage;
