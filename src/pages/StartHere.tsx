import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Compass, 
  HelpCircle, 
  Download, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Dna, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  Heart, 
  ExternalLink, 
  Sparkles, 
  Flame, 
  Droplet, 
  Scale, 
  Layers, 
  Eye, 
  BookOpen,
  ChevronRight,
  TrendingUp,
  Clock,
  Printer
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';

export default function StartHere() {
  const { market, setMarket } = useMarket();
  const navigate = useNavigate();

  // Region selection state for Step 0 Quiz dual-hook
  const [selectedRegion, setSelectedRegion] = useState<'US' | 'UK' | 'ES'>(
    (market as 'US' | 'UK' | 'ES') || 'US'
  );

  const handleRegionSelect = (reg: 'US' | 'UK' | 'ES') => {
    setSelectedRegion(reg);
    setMarket(reg as Market);
  };

  const handleStartQuiz = () => {
    // Navigate to quiz with pre-selected market
    navigate(`/health-quiz?region=${selectedRegion.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-28 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* ========================================================================= */}
        {/* PAGE HERO HEADER                                                          */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            <Compass size={14} className="animate-spin text-cyan-400" style={{ animationDuration: '10s' }} />
            <span>5-STEP ONBOARDING ROADMAP</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
            From Zero-Cost Habits to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Precision Geroscience
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            Longevity isn’t a mystery; it’s an operational protocol. Follow this sequential, 5-step roadmap to eliminate guesswork, establish home and clinical telemetry, and align with your physician.
          </p>

          {/* Quick Step Anchor Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <a href="#step-0" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all">
              Step 0: Dual-Hook
            </a>
            <span className="text-slate-600">→</span>
            <a href="#step-1" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all">
              Step 1: Day 1 Action
            </a>
            <span className="text-slate-600">→</span>
            <a href="#step-2" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all">
              Step 2: Diagnostic Radar
            </a>
            <span className="text-slate-600">→</span>
            <a href="#step-3" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all">
              Step 3: Clinician Co-Pilot
            </a>
            <span className="text-slate-600">→</span>
            <a href="#step-4" className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all">
              Step 4: 6 Pillars
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 0: Zero-Cost Onboarding Dual-Hook                                    */}
        {/* ========================================================================= */}
        <section id="step-0" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm">
              00
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-widest font-bold">START AT ZERO COST</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Step 0: The Dual-Hook Onboarding
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OPTION A: 5-Minute Longevity Baseline Quiz */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    OPTION A • INTERACTIVE
                  </span>
                  <span className="text-xs font-mono text-slate-400">Time: ~5 mins</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white flex items-center gap-2">
                    <span>🎯 Take the 5-Minute Longevity Baseline Quiz</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    Establish your personalized biological score across cardiovascular risk, metabolic control, sleep architecture, and autonomic recovery. Receive immediate regional recommendations.
                  </p>
                </div>

                {/* Regional Pre-Selection Selector */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <label className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
                    1. Select Your Healthcare Region:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRegionSelect('US')}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedRegion === 'US'
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <FlagUS className="w-4 h-3 pointer-events-none" />
                      <span>US</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRegionSelect('UK')}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedRegion === 'UK'
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <FlagUK className="w-4 h-3 pointer-events-none" />
                      <span>UK</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRegionSelect('ES')}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        selectedRegion === 'ES'
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <FlagES className="w-4 h-3 pointer-events-none" />
                      <span>ES / EU</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Baseline Quiz ({selectedRegion})</span>
                  <ArrowRight size={15} />
                </button>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-slate-400">100% Free • No registration required</span>
                </div>
              </div>
            </div>

            {/* OPTION B: Free Guide PDF Download */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
                    OPTION B • FOUNDATION MANUAL
                  </span>
                  <span className="text-xs font-mono text-slate-400">Format: 42-Page PDF</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white flex items-center gap-2">
                    <span>📖 Download 'An Idiot's Guide to the Next Level Lifespan'</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    The zero-fluff starter handbook translating cellular aging, Yamanaka rejuvenation biology, metabolic timing, and continuous fluid telemetry into everyday plain English.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Hardware vs. Software longevity biology explained simply</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>The 3 crucial blood markers your GP likely skipped (ApoB, HbA1c, hs-CRP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Immediate Day 1 nutrition, walk, and vagus nerve protocols</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="/assets/docs/Finalthe-next-level-lifespan.pdf"
                  download="Finalthe-next-level-lifespan.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download Free Guide (PDF)</span>
                </a>
                <div className="text-center mt-2 flex items-center justify-center gap-3 text-[10px] text-slate-400">
                  <a 
                    href="/assets/docs/Finalthe-next-level-lifespan.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 underline flex items-center gap-1"
                  >
                    <Eye size={11} /> Read in Browser
                  </a>
                  <span>•</span>
                  <span>Instant $0 Direct Access</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 1: The Day 1 Action Plan (3 Core Protocols)                          */}
        {/* ========================================================================= */}
        <section id="step-1" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono font-bold flex items-center justify-center text-sm">
              01
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-teal-400 tracking-widest font-bold">IMMEDIATE LIFESTYLE FOUNDATION</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Step 1: The Day 1 Action Plan
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl font-light">
            Before ordering blood panels or wearing sensors, activate these three zero-cost foundational habits today. Each intervention delivers an immediate acute benefit alongside a 30-year epigenetic compounding return.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CARD 1: Diet & Metabolic Nutrition */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Droplet size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">Metabolism</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    🥗 Diet &amp; Metabolic Nutrition
                  </h3>
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
                    <strong className="text-cyan-300 block font-mono text-[11px] uppercase">Essential Action:</strong>
                    Low-glycemic snacking, 8–10 glasses water, 0.6–0.8g/lb protein timing.
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  {/* Danger of Inaction */}
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400 text-[11px] uppercase tracking-wider mb-1">
                      <AlertTriangle size={13} className="shrink-0" />
                      <span>🛑 Danger of Inaction</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Uncontrolled post-meal glucose spikes cause chronic insulin surges and endothelial vessel damage.&quot;
                    </p>
                  </div>

                  {/* Short-Term Payback */}
                  <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-800/40 text-teal-200">
                    <div className="flex items-center gap-1.5 font-bold text-teal-400 text-[11px] uppercase tracking-wider mb-1">
                      <Zap size={13} className="shrink-0" />
                      <span>⚡ Short-Term Payback</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Eliminates afternoon energy crashes, brain fog, and insulin fatigue.&quot;
                    </p>
                  </div>

                  {/* Long-Term Epigenetic Payback */}
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-200">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-400 text-[11px] uppercase tracking-wider mb-1">
                      <Dna size={13} className="shrink-0" />
                      <span>🧬 Long-Term Epigenetic Payback</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Protects vascular linings and preserves 30-year insulin sensitivity.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <Link
                  to="/nutrition"
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>🥗 View Full Metabolic Nutrition Protocol</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* CARD 2: Exercise & Post-Meal Mobility */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-teal-400 uppercase font-bold tracking-wider">Mobility</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    🚶 Exercise &amp; Post-Meal Mobility
                  </h3>
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
                    <strong className="text-teal-300 block font-mono text-[11px] uppercase">Essential Action:</strong>
                    10-minute post-meal walks, beginner bodyweight foundation (box squats, hip hinges, RPE 5–7).
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  {/* Danger of Inaction */}
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400 text-[11px] uppercase tracking-wider mb-1">
                      <AlertTriangle size={13} className="shrink-0" />
                      <span>🛑 Danger of Inaction</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Sedentary post-meal sitting leaves blood sugar elevated, straining the pancreas and starving joint cartilage.&quot;
                    </p>
                  </div>

                  {/* Short-Term Payback */}
                  <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-800/40 text-teal-200">
                    <div className="flex items-center gap-1.5 font-bold text-teal-400 text-[11px] uppercase tracking-wider mb-1">
                      <Zap size={13} className="shrink-0" />
                      <span>⚡ Short-Term Payback</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Activates GLUT4 muscle receptors to clear up to 30% of glucose directly without heavy insulin demand.&quot;
                    </p>
                  </div>

                  {/* Long-Term Epigenetic Payback */}
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-200">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-400 text-[11px] uppercase tracking-wider mb-1">
                      <Dna size={13} className="shrink-0" />
                      <span>🧬 Long-Term Epigenetic Payback</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Drives mitochondrial biogenesis and protects against sarcopenia and physical frailty.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <Link
                  to="/fitness"
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>🚶 View Full Movement &amp; Fitness Protocol</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* CARD 3: Meditation & Autonomic Resets */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">Autonomics</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    🫁 Meditation &amp; Autonomic Resets
                  </h3>
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
                    <strong className="text-purple-300 block font-mono text-[11px] uppercase">Essential Action:</strong>
                    10-minute vagus nerve breathing or NSDR neuro-resets.
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  {/* Danger of Inaction */}
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400 text-[11px] uppercase tracking-wider mb-1">
                      <AlertTriangle size={13} className="shrink-0" />
                      <span>🛑 Danger of Inaction</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Unmanaged daily stress keeps cortisol chronically elevated, suppressing nocturnal HRV and sleep quality.&quot;
                    </p>
                  </div>

                  {/* Short-Term Payback */}
                  <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-800/40 text-teal-200">
                    <div className="flex items-center gap-1.5 font-bold text-teal-400 text-[11px] uppercase tracking-wider mb-1">
                      <Zap size={13} className="shrink-0" />
                      <span>⚡ Short-Term Payback</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Rapidly down-regulates acute cortisol, shifting the autonomic nervous system into rest-and-repair.&quot;
                    </p>
                  </div>

                  {/* Long-Term Epigenetic Payback */}
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-200">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-400 text-[11px] uppercase tracking-wider mb-1">
                      <Dna size={13} className="shrink-0" />
                      <span>🧬 Long-Term Epigenetic Payback</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      &quot;Blunts systemic micro-inflammation (lowering hs-CRP) and protects telomere integrity.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <Link
                  to="/neurowellness"
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>🫁 View Full Neurowellness Protocol</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 2: The Diagnostic Radar (Analytics & Telemetry Overview)              */}
        {/* ========================================================================= */}
        <section id="step-2" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono font-bold flex items-center justify-center text-sm">
              02
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-indigo-400 tracking-widest font-bold">BIOMARKER RADAR</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Step 2: The Diagnostic Radar (Analytics &amp; Telemetry)
              </h2>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/30 border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <Activity size={13} className="text-indigo-400" />
                  <span>Continuous Dual-Track Verification</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white leading-tight">
                  Stop Flying Blind: Move from Annual Snapshots to Telemetry
                </h3>

                {/* Danger of Inaction Callout */}
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/50 text-rose-200 text-xs leading-relaxed">
                  <div className="font-bold text-rose-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1">
                    <AlertTriangle size={14} className="shrink-0" />
                    <span>🛑 Danger of Inaction:</span>
                  </div>
                  &quot;One annual doctor visit leaves you blind 364 days a year while silent cardiovascular plaque and renal decay accumulate.&quot;
                </div>

                {/* Proactive Telemetry Payback Callout */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-xs leading-relaxed">
                  <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1">
                    <Sparkles size={14} className="shrink-0" />
                    <span>⚡ Proactive Telemetry Payback:</span>
                  </div>
                  &quot;Weekly 10-parameter home urine strips verify daily habits, while quarterly lab blood draws catch subclinical risks up to a decade before symptoms appear.&quot;
                </div>
              </div>

              {/* Visual Architecture Box */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
                  The Dual-Track Diagnostic Radar Matrix
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 font-mono font-bold flex items-center justify-center text-xs">
                      W
                    </span>
                    <div>
                      <strong className="text-white block font-semibold">Weekly Home Fluid Telemetry (60s)</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        10-parameter medical test strips (Diagnox / ALLTEST): pH, hydration/SG, ketones, microalbumin, nitrites.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0 font-mono font-bold flex items-center justify-center text-xs">
                      Q
                    </span>
                    <div>
                      <strong className="text-white block font-semibold">Quarterly Phlebotomy Venous Draw (90d)</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        ApoB (atherogenic particle count), HbA1c (glycated hemoglobin), hs-CRP (micro-inflammation), and Urine ACR.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/diagnostics"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 hover:from-cyan-400 hover:via-teal-300 hover:to-indigo-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                  >
                    <span>🔬 Explore Full Testing &amp; Diagnostics Suite →</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 3: THE CLINICIAN CO-PILOT: FROM GUESSING TO KNOWING                  */}
        {/* ========================================================================= */}
        <section id="step-3" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-sm">
              03
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-400 tracking-widest font-bold">PHYSICIAN PARTNERSHIP</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Step 3: The Clinician Co-Pilot: From Guessing to Knowing
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl font-light">
            Bring structured, verifiable data into your doctor’s office. Rather than entering a 10-minute consultation unprepared, leverage 3 synchronized assets to turn your GP into a longevity partner.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* PATH 1: READ */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    PATHWAY 1 • READ
                  </span>
                  <BookOpen size={18} className="text-cyan-400" />
                </div>

                <div>
                  <h3 className="text-lg font-display font-black uppercase text-white">
                    1. Educational Workbook
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    Deep dive into biomarker reference ranges, the geroscience philosophy, and the script questions designed for evidence-based primary care discussions.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-200">Asset: the-next-level-lifespan.pdf</div>
                  <div>Format: High-Res Master PDF</div>
                </div>
              </div>

              <div>
                <a
                  href="/assets/docs/the-next-level-lifespan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Eye size={14} />
                  <span>Read Workbook (PDF)</span>
                </a>
              </div>
            </div>

            {/* PATH 2: LOG */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 ring-1 ring-amber-500/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-amber-950 border border-amber-800 text-amber-400 font-bold">
                    PATHWAY 2 • LOG
                  </span>
                  <Activity size={18} className="text-amber-400" />
                </div>

                <div>
                  <h3 className="text-lg font-display font-black uppercase text-white">
                    2. Interactive Web Form
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    100% Guest-Mode client-side telemetry logger. Input blood results, weekly dipstick averages, resting vitals, and physician directives with local auto-save.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-emerald-300 flex items-center gap-1">
                    <ShieldCheck size={12} /> 100% LocalStorage Privacy
                  </div>
                  <div>Zero database storage • Guest Mode</div>
                </div>
              </div>

              <div>
                <Link
                  to="/clinician-copilot"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
                >
                  <FileText size={14} />
                  <span>Open Interactive Logger →</span>
                </Link>
              </div>
            </div>

            {/* PATH 3: EXPORT / PRINT */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-teal-950 border border-teal-800 text-teal-400 font-bold">
                    PATHWAY 3 • EXPORT / PRINT
                  </span>
                  <Printer size={18} className="text-teal-400" />
                </div>

                <div>
                  <h3 className="text-lg font-display font-black uppercase text-white">
                    3. GP Consultation Template V2
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    The 2-page clinical artifact. Compile your logged data into a pre-filled vector PDF in your browser, or download the blank template to write on with a pen.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-200">Asset: clinical-baseline-consultation-template-v2.pdf</div>
                  <div>Dual Mode: Pre-filled export or blank printout</div>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/clinician-copilot"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <Download size={13} />
                  <span>Export Pre-Filled (via Form)</span>
                </Link>
                <a
                  href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
                  download="clinical-baseline-consultation-template-v2.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] uppercase tracking-wider transition-all"
                >
                  <span>✏️ Download Blank Template (PDF)</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 4: Pillar Optimization                                               */}
        {/* ========================================================================= */}
        <section id="step-4" className="scroll-mt-28 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono font-bold flex items-center justify-center text-sm">
              04
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-pink-400 tracking-widest font-bold">SYSTEMIC EXPANSION</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Step 4: Pillar Optimization (The 6 Core Hubs)
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl font-light">
            Once baseline telemetry and medical collaboration are activated, systematically optimize each domain across our 6 specialized geroscience hubs:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* PILLAR 1: Fitness */}
            <Link
              to="/fitness"
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="text-2xl">⚡</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                  Pillar 1: Movement &amp; Bio-Data
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zone 2 mitochondrial density, hypertrophic resistance training, wearable biosensing, and cold/heat thermogenesis.
                </p>
              </div>
              <div className="text-xs text-cyan-400 font-bold flex items-center gap-1">
                <span>Explore Fitness Pillar</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 2: Nutrition */}
            <Link
              to="/nutrition"
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="text-2xl">🥗</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-teal-400 transition-colors">
                  Pillar 2: Metabolic Nutrition
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Continuous glucose monitoring, glycemic stability, micronutrient density, and muscle-sparing fasting protocols.
                </p>
              </div>
              <div className="text-xs text-teal-400 font-bold flex items-center gap-1">
                <span>Explore Nutrition Pillar</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 3: Neurowellness */}
            <Link
              to="/neurowellness"
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="text-2xl">🧠</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-purple-400 transition-colors">
                  Pillar 3: Neurowellness &amp; Autonomics
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Non-invasive vagus nerve stimulation (VNS), deep sleep architecture, somatic breathwork, and neuro-resilience.
                </p>
              </div>
              <div className="text-xs text-purple-400 font-bold flex items-center gap-1">
                <span>Explore Neurowellness Pillar</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 4: Women's Health */}
            <Link
              to="/womens-health"
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="text-2xl">🌸</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-pink-400 transition-colors">
                  Pillar 4: Women's Longevity
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ovarian healthspan preservation, peri-menopause metabolic shifts, bone mineral density, and hormone balance.
                </p>
              </div>
              <div className="text-xs text-pink-400 font-bold flex items-center gap-1">
                <span>Explore Women's Health</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 5: Social Fitness */}
            <Link
              to="/social-fitness"
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="text-2xl">🏛️</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-amber-400 transition-colors">
                  Pillar 5: Socio-Biological Architecture
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Community wellness dynamics, pickleball ecosystems, cortisol-buffering social circles, and longevity tribes.
                </p>
              </div>
              <div className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <span>Explore Social Fitness</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 6: Sovereign Store */}
            <Link
              to="/store"
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="text-2xl">🛒</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                  Pillar 6: Sovereign Longevity Store
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Curated regional medical gear: Quest, LOLA, Eurofins blood panels, 10-parameter dipsticks, and digital stethoscopes.
                </p>
              </div>
              <div className="text-xs text-cyan-400 font-bold flex items-center gap-1">
                <span>Visit Sovereign Store</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM SUMMARY FOOTER BANNER                                              */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <CheckCircle2 size={14} />
            <span>PROTOCOL STATUS: ZERO GUESSWORK</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
            Ready to Take Your Diagnostic Telemetry to the Next Level?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Begin with Step 0 above. Complete the 5-Minute Quiz or download the free Foundation Manual. Establish your numbers, log them into the Clinician Co-Pilot, and step into proactive longevity medicine.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/diagnostics"
              className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Order Clinical Diagnostics Suite →
            </Link>
            <Link
              to="/clinician-copilot"
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-slate-700"
            >
              Launch Clinician Co-Pilot Form →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
