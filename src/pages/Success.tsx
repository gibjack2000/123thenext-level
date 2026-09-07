import React, { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    document.title = "Onboarding | 123TheNextLevel";
    
    // Auto-trigger the download of our exact PDF filename
    const downloadTimer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/assets/docs/Finalthe-next-level-lifespan.pdf'; 
      link.download = 'Finalthe-next-level-lifespan.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);

    return () => clearTimeout(downloadTimer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30">
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center space-y-12">
        
        {/* Onboarding Header */}
        <div className="space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest">
            ✓ Access Granted
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Your Idiot’s Guide is downloading...
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Your PDF has triggered automatically. While it downloads, you must add these two critical onboarding tasks to your immediate schedule to cross the bridge from guessing to knowing:
          </p>
        </div>

        {/* Dual Onboarding Strategy Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          
          {/* Card 1: Advanced Clinical Bibles */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl hover:border-cyan-500/25 transition duration-300">
            <div className="space-y-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                Advanced Clinical Manuals
              </span>
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">📚</span> Unlock Advanced Manuals
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">
                Ready to dig deeper? We have unlocked our medical-grade master manuals for high-performers who want the exact clinical mechanisms, ApoB tracking structures, and biological baselines:
              </p>
              <div className="pt-2 space-y-2">
                <a 
                  href="/assets/docs/longevity-blueprint.pdf" 
                  download="longevity-blueprint.pdf"
                  className="inline-flex items-center text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  ➜ Download: The Longevity Blueprint (PDF)
                </a>
                <br />
                <a 
                  href="/assets/docs/phase1-diagnostic-guide.pdf" 
                  download="phase1-diagnostic-guide.pdf"
                  className="inline-flex items-center text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  ➜ Download: Phase 1 Onboarding Blueprint (PDF)
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-500">
              Complete these to establish your ultimate biological roadmap.
            </div>
          </div>

          {/* Card 2: Establish Your Baseline Score (Wellness Quiz) */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl hover:border-cyan-500/25 transition duration-300">
            <div className="space-y-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                Required Onboarding Step
              </span>
              <h2 className="text-xl font-bold text-amber-400 flex items-center">
                <span className="mr-2">🎯</span> Take the 5-Minute Wellness Quiz
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">
                To bypass the variance of home-use biological telemetry and eliminate guessing, you must establish your true health score across our six core protocols.
              </p>
              <p className="text-xs text-slate-500">
                Take the high-fidelity quiz to generate a structured biological scorecard that you can directly print and co-evaluate alongside your doctor.
              </p>
            </div>
            <div>
              <a href="/quiz" className="inline-flex items-center justify-center w-full px-5 py-4 rounded-xl text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-cyan-500/10">
                Take the 5-Minute Quiz Now
              </a>
            </div>
          </div>

        </div>

        {/* The Starter Bundle Upsell */}
        <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-left space-y-6 shadow-2xl">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">Immediate Momentum Upgrade</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Ready to execute your 4-week onboarding habits?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your free blueprint provides the high-level roadmap. Our <strong>Premium Digital Master Guides</strong> deliver your day-by-day execution—unlocking muscle-preserving home workouts, metabolic meal planners, and circadian stress management protocols.
            </p>
          </div>

          {/* Product Cards Mini-Grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">1. Performance & Strength</h4>
              <p className="text-sm font-bold text-slate-200 mt-1">Beginner Home Workout Plan</p>
              <span className="text-xs text-slate-500 block mt-1">Regularly £19.00</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2. Metabolic Nutrition</h4>
              <p className="text-sm font-bold text-slate-200 mt-1">The Master Meal Planner</p>
              <span className="text-xs text-slate-500 block mt-1">Regularly £24.00</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3. Autonomic Engineering</h4>
              <p className="text-sm font-bold text-slate-200 mt-1">Cortisol & Stress Management</p>
              <span className="text-xs text-slate-500 block mt-1">Regularly £22.00</span>
            </div>
          </div>

          {/* Bundle Discount Offer */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/10 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-slate-400">Unlock the complete 3-Part Master Guide Bundle</p>
              <p className="text-2xl font-black text-white">Save over 55% — Only £29.00</p>
            </div>
            <a href="https://123thenextlevel.com/premium-guides" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-lg text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/15 transition-all duration-200">
              Upgrade My Onboarding Plan
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
