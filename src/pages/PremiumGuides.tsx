import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function PremiumGuidesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Premium Digital Master Guides | 123TheNextLevel";
    window.scrollTo(0, 0);
  }, []);

  const paidBooks = [
    {
      id: "workout-plan",
      productId: "g-fit-1",
      tag: "Protocol 1: Physical Hardware",
      title: "Beginner Home Workout & Longevity Strength Plan",
      price: "£19.00",
      usPrice: "$24.00",
      description: "Complete 12-week bodyweight and dumbbell progressive routine designed to increase VO2 max, preserve lean muscle mass, and prevent age-related frailty.",
      highlights: [
        "12-Week Progressive Training Schedule",
        "Zero-Gym Equipment Adaptations",
        "Targeted VO2 Max & Zone 2 Conditioning"
      ],
      checkoutUrl: "/checkout?product=workout-plan"
    },
    {
      id: "meal-planner",
      productId: "g-nut-1",
      tag: "Protocol 2: Metabolic Fuel",
      title: "The Master Metabolic Meal Planner & Grocery Guide",
      price: "£24.00",
      usPrice: "$29.00",
      description: "A clinical guide to flattening post-meal glucose spikes, supporting gut microbiome diversity, and building anti-inflammatory meal templates.",
      highlights: [
        "Low-Glycemic Spike Meal Recipes",
        "Microbiome & Gut-Lining Grocery Checklist",
        "Intermittent Fasting & Autophagy Protocols"
      ],
      checkoutUrl: "/checkout?product=meal-planner"
    },
    {
      id: "stress-management",
      productId: "g-wel-1",
      tag: "Protocol 3: Autonomic Reset",
      title: "Cortisol & Stress Management Master Protocol",
      price: "£22.00",
      usPrice: "$28.00",
      description: "Science-backed autonomic nervous system resets: 10-minute NSDR scripts, vagal tone breathing exercises, and circadian sleep engineering.",
      highlights: [
        "10-Minute NSDR Audio & Written Scripts",
        "Vagal Tone Exercises to Boost Nocturnal HRV",
        "Circadian Light & Cortisol Alignment Guide"
      ],
      checkoutUrl: "/checkout?product=stress-management"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* Hero Banner */}
      <header className="relative py-16 border-b border-slate-900 bg-slate-950 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            ⚡ Actionable Master Execution Books
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Premium Digital Master Guides
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Translate high-level geroscience into day-by-day routines. Download complete, step-by-step PDF books to execute home workouts, metabolic meal plans, and autonomic resets.
          </p>
        </div>
      </header>

      {/* Main Catalog Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* Individual Books Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {paidBooks.map((book) => (
            <div key={book.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-cyan-500/30 transition-all shadow-xl">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                  {book.tag}
                </span>
                <h3 className="text-lg font-bold text-white">{book.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-400">{book.price}</span>
                  <span className="text-xs text-slate-500">({book.usPrice})</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{book.description}</p>
                
                <ul className="space-y-1.5 pt-2">
                  {book.highlights.map((item, i) => (
                    <li key={i} className="text-[11px] text-slate-300 flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={book.checkoutUrl}
                className="w-full py-3 rounded-xl text-xs font-bold text-center bg-slate-950 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-md"
              >
                Buy Digital PDF ({book.price}) ➔
              </a>
            </div>
          ))}
        </div>

        {/* 55% OFF MASTER BUNDLE BANNER */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-md inline-block">
              🔥 SPECIAL NEW SUBSCRIBER BUNDLE (SAVE OVER 55%)
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Get All Three Digital Master Guides
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Unlock the complete 3-book execution suite: Beginner Home Workout Plan (£19) + Master Meal Planner (£24) + Stress Management Protocol (£22) — regularly £65.00 total.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
            <div className="text-center md:text-right">
              <span className="text-xs text-slate-500 line-through block">Value: £65.00</span>
              <span className="text-3xl md:text-4xl font-black text-cyan-400">£29.00</span>
              <span className="text-xs text-slate-400 block">$39.00 / 35,00€</span>
            </div>
            <a
              href="/checkout?bundle=all-three-master-guides"
              className="py-4 px-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-cyan-500/20 transition-all"
            >
              Get Complete Bundle (£29.00) ➔
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}

export const PremiumGuides = PremiumGuidesPage;
export default PremiumGuidesPage;
