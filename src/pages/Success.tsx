import React, { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    document.title = "Access Granted | 123TheNextLevel";
    
    // Auto-trigger the download of our exact non-colliding PDF filename
    const downloadTimer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf'; 
      link.download = 'idiots-guide-to-the-next-level-lifespan.pdf';
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
            Your PDF has triggered automatically. While it downloads, complete these two critical onboarding tasks to cross the bridge from biological speculation to molecular certainty:
          </p>
        </div>

        {/* Dual Onboarding Strategy Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          
          {/* Card 1: Clinical Baseline Consultation Workbook */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl hover:border-amber-500/30 transition duration-300">
            <div className="space-y-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                Clinician Co-Pilot Suite
              </span>
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">🩺</span> GP Consultation Workbook
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">
                Ready to take clinical action? Download our 3-page clinician-ready workbook to interpret your blood panels (Lola Vital Check 56) and co-evaluate your biomarkers with your doctor:
              </p>
              <div className="pt-2">
                <a 
                  href="/assets/docs/clinical-baseline-consultation-workbook.pdf" 
                  download="clinical-baseline-consultation-workbook.pdf"
                  className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 transition"
                >
                  ➜ Download: GP Consultation Workbook (PDF)
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-500">
              Print this template before your next annual physical or lab draw.
            </div>
          </div>

          {/* Card 2: Establish Your Baseline Score (Wellness Quiz) */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl hover:border-cyan-500/30 transition duration-300">
            <div className="space-y-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                Required Onboarding Step
              </span>
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">🎯</span> Take the 5-Minute Wellness Quiz
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">
                To bypass the variance of home-use biological telemetry and eliminate guessing, establish your true health score across our six core protocols.
              </p>
              <p className="text-xs text-slate-500">
                Take the high-fidelity quiz to generate a structured biological scorecard that you can directly print and co-evaluate alongside your doctor.
              </p>
            </div>
            <div>
              <a href="/quiz" className="inline-flex items-center justify-center w-full px-5 py-4 rounded-xl text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-cyan-500/10 cursor-pointer">
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
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">1. Performance &amp; Strength</h4>
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
              <p className="text-sm font-bold text-slate-200 mt-1">Cortisol &amp; Stress Management</p>
              <span className="text-xs text-slate-500 block mt-1">Regularly £22.00</span>
            </div>
          </div>

          {/* Bundle Discount Offer */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/10 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-slate-400">Unlock the complete 3-Part Master Guide Bundle</p>
              <p className="text-2xl font-black text-white">Save over 55% — Only £29.00</p>
            </div>
            <a href="https://123thenextlevel.com/premium-guides" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-lg text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/15 transition-all duration-200 cursor-pointer">
              Upgrade My Onboarding Plan
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
