import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Download, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Star 
} from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Access Granted | 123TheNextLevel";
    window.scrollTo(0, 0);

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
      
      {/* Background ambient neon flares */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10 space-y-12">
        
        {/* Onboarding Status Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-md">
            <CheckCircle2 size={14} className="text-emerald-400 animate-pulse" />
            <span>Registration Confirmed • Access Granted</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
            Your Free Lifespan Blueprint <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Is Downloading Automatically
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Your PDF download has triggered. If it didn't start, use the direct button below. Review your complete 2-track onboarding suite below to eliminate guesswork:
          </p>
        </div>

        {/* 2-COLUMN VIEWPORT: Free Downloads (Left) & Premium Master Upgrades (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ======================================================== */}
          {/* COLUMN 1: FREE CLINICAL ONBOARDING DOWNLOADS (6 Cols)     */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Track 1 • Included Free
                </span>
                <span className="text-xs text-slate-400 font-mono">100% Free Open Access</span>
              </div>

              {/* Free Resource 1: Idiot's Guide */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850 space-y-4 hover:border-cyan-500/30 transition">
                <div className="flex items-start gap-4">
                  <img 
                    src="/assets/images/shop/next_level_cover.png" 
                    alt="An Idiot's Guide to the Next Level Lifespan"
                    className="w-16 h-24 object-contain rounded-lg border border-slate-800 bg-slate-900 shrink-0 shadow-lg"
                  />
                  <div className="space-y-1 text-left">
                    <h3 className="text-base font-bold text-white leading-tight">
                      An Idiot's Guide to the Next Level Lifespan
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      5-page ruthless translator turning complex molecular science and epigenetic markers into instant daily habits.
                    </p>
                  </div>
                </div>

                <a 
                  href="/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf"
                  download="idiots-guide-to-the-next-level-lifespan.pdf"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-2 transition shadow-md shadow-cyan-500/10 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Free Guide (PDF)</span>
                </a>
              </div>

              {/* Free Resource 2: GP Consultation Workbook */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850 space-y-4 hover:border-amber-500/30 transition">
                <div className="flex items-start gap-4">
                  <img 
                    src="/assets/images/shop/gp_consultation_cover.png" 
                    alt="Clinical Baseline Workbook"
                    className="w-16 h-24 object-contain rounded-lg border border-slate-800 bg-slate-900 shrink-0 shadow-lg"
                  />
                  <div className="space-y-1 text-left">
                    <h3 className="text-base font-bold text-white leading-tight">
                      Clinical Baseline &amp; GP Consultation Template
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      3-page clinician co-pilot template to evaluate blood draws (Lola Vital Check 56) and collaborate with your doctor.
                    </p>
                  </div>
                </div>

                <a 
                  href="/assets/docs/clinical-baseline-consultation-workbook.pdf"
                  download="clinical-baseline-consultation-workbook.pdf"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download GP Workbook (PDF)</span>
                </a>
              </div>

              {/* Free Quiz Callout */}
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 flex items-center justify-between gap-4 text-left">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">Need your baseline score?</p>
                  <p className="text-[11px] text-slate-400">Diagnose your 6 longevity protocol scores in 5 minutes.</p>
                </div>
                <Link
                  to="/health-quiz"
                  className="shrink-0 px-3 py-2 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition"
                >
                  Start Quiz ➔
                </Link>
              </div>

            </div>

            <p className="text-[11px] text-slate-500 italic text-center">
              🔒 Open-access PDFs are permanently saved to your device.
            </p>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: PREMIUM UPGRADES & MASTER GUIDES (6 Cols)       */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-amber-500/5 relative overflow-hidden">
            
            {/* Top Glowing Tag */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider shadow-md">
              ⚡ Instant Execution Upgrade
            </div>

            <div className="space-y-5 text-left">
              
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Track 2 • Daily Execution System
                </span>
                <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                  Premium Digital Master Guides
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your free blueprint provides the high-level roadmap. Our <strong>Master Execution Guides</strong> deliver your day-by-day protocol—unlocking home strength routines, metabolic meal plans, and circadian stress resets.
                </p>
              </div>

              {/* 3 Premium Module Mini-Cards */}
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Module 1 • Muscle Mandate</span>
                    <h4 className="text-xs font-bold text-white">Beginner Home Workout &amp; Osteogenic Plan</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">£19.00</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Module 2 • Metabolic Fuel</span>
                    <h4 className="text-xs font-bold text-white">The Master Mediterranean Meal Planner</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">£24.00</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Module 3 • Autonomic Reset</span>
                    <h4 className="text-xs font-bold text-white">Cortisol, Sleep &amp; Circadian Regulation</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">£22.00</span>
                </div>
              </div>

              {/* Special Bundle Discount Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/25 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">Complete 3-Part Master Bundle</p>
                  <p className="text-lg font-black text-white">Only £29.00 <span className="text-xs text-slate-400 line-through font-normal">£65.00</span></p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-widest">
                  Save 55%
                </span>
              </div>

            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <Link
                to="/premium-guides"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.01] cursor-pointer"
              >
                <span>Unlock Master Bundle (£29)</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                to="/store"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={13} className="text-cyan-400" />
                <span>Or Browse Sovereign Hardware Store (50+)</span>
              </Link>
            </div>

          </div>

        </div>

        {/* Global Assurance Footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 pt-6 border-t border-slate-900 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span>Peer-Reviewed Clinical Geroscience</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-400" />
            <span>Instant Digital PDF Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-indigo-400" />
            <span>Zero-Risk 30-Day Guarantee</span>
          </div>
        </div>

      </main>
    </div>
  );
}
