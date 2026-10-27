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
import BloodPanelComparisonTable from '../components/BloodPanelComparisonTable';
import Step2DiagnosticChannels from '../components/Step2DiagnosticChannels';
import Step3GuidingBanner from '../components/Step3GuidingBanner';

export default function StartHere() {
  const { market, setMarket } = useMarket();
  const navigate = useNavigate();

  // Region selection state for Step 0 Quiz dual-hook
  const [selectedRegion, setSelectedRegion] = useState<'US' | 'UK' | 'ES'>(
    (market as 'US' | 'UK' | 'ES') || 'US'
  );

  // Channel 1 Blood Tier selector (Basic vs Complete)
  const [channel1Tier, setChannel1Tier] = useState<'basic' | 'complete'>('complete');

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
            Five Steps. Zero Guesswork.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Real Results You Can Measure.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            Begin with free daily habits. Build up to home tracking and clinical testing. Finish with a plan your doctor can act on. Your roadmap starts here.
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
              Step 4: Pillars &amp; Reading Hub
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
            <div className="p-7 sm:p-8 rounded-3xl backdrop-blur-md bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/50 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-2xl">
              {/* Content-Specific Ambient Glows: Deep Electric Cyan & Violet */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#06b6d4] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#8b5cf6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Subtle digital grid / DNA helix vector watermark */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="step0-grid-a" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-cyan-400" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#step0-grid-a)" />
                <g className="text-cyan-400" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <path d="M 0,40 Q 60,10 120,40 T 240,40 T 360,40 T 480,40 T 600,40" opacity="0.8" />
                  <path d="M 0,40 Q 60,70 120,40 T 240,40 T 360,40 T 480,40 T 600,40" opacity="0.8" />
                  <line x1="60" y1="25" x2="60" y2="55" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="180" y1="25" x2="180" y2="55" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="300" y1="25" x2="300" y2="55" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="420" y1="25" x2="420" y2="55" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="540" y1="25" x2="540" y2="55" strokeWidth="1" strokeDasharray="2,2" />
                </g>
              </svg>
              
              <div className="space-y-4 relative z-10">
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

              <div className="relative z-10">
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
            <div className="p-7 sm:p-8 rounded-3xl backdrop-blur-md bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-2xl">
              {/* Content-Specific Ambient Glows: Electric Violet & Emerald */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#8b5cf6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#10b981] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Blueprint grid & handbook vector watermark */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="step0-grid-b" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-emerald-400" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#step0-grid-b)" />
                <g className="text-emerald-400" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <rect x="40" y="30" width="120" height="160" rx="4" />
                  <line x1="60" y1="60" x2="140" y2="60" />
                  <line x1="60" y1="85" x2="140" y2="85" />
                  <line x1="60" y1="110" x2="120" y2="110" />
                </g>
              </svg>

              <div className="space-y-4 relative z-10">
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

              <div className="relative z-10">
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
            <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-teal-950/50 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
              {/* Content-Specific Ambient Glows: Warm Emerald & Solar Amber */}
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#10b981] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Soft organic pulse waves / breath wave vector graphics */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 400 300">
                <path d="M0,150 C80,110 120,190 200,150 C280,110 320,190 400,150 L400,300 L0,300 Z" fill="currentColor" className="text-emerald-400" />
                <path d="M0,130 C70,160 140,100 200,130 C270,160 330,100 400,130" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400" />
                <path d="M0,170 C90,140 130,200 200,170 C270,140 310,200 400,170" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400" />
              </svg>

              <div className="space-y-4 relative z-10">
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

              <div className="pt-3 border-t border-slate-800 space-y-2.5 relative z-10">
                {/* Recommended Reading */}
                <Link
                  to="/premium-guides/healthy-meal-planning-guide"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/40 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                      <BookOpen size={14} />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                        Recommended Reading
                      </span>
                      <span className="text-white font-bold group-hover:text-cyan-200 transition-colors truncate block">
                        Master Meal Planning Guide
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>

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
            <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-teal-950/50 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
              {/* Content-Specific Ambient Glows: Warm Emerald & Solar Amber */}
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#10b981] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Soft organic pulse waves / breath wave vector graphics */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 400 300">
                <path d="M0,150 C80,110 120,190 200,150 C280,110 320,190 400,150 L400,300 L0,300 Z" fill="currentColor" className="text-emerald-400" />
                <path d="M0,130 C70,160 140,100 200,130 C270,160 330,100 400,130" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400" />
                <path d="M0,170 C90,140 130,200 200,170 C270,140 310,200 400,170" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400" />
              </svg>

              <div className="space-y-4 relative z-10">
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

              <div className="pt-3 border-t border-slate-800 space-y-2.5 relative z-10">
                {/* Recommended Reading */}
                <Link
                  to="/premium-guides/beginner-home-workout-plan"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-teal-950/40 border border-teal-500/30 hover:border-teal-400 hover:bg-teal-900/40 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                      <BookOpen size={14} />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold block">
                        Recommended Reading
                      </span>
                      <span className="text-white font-bold group-hover:text-teal-200 transition-colors truncate block">
                        Beginner Home Workout Plan
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-teal-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>

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
            <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-teal-950/50 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
              {/* Content-Specific Ambient Glows: Warm Emerald & Solar Amber */}
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#10b981] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Soft organic pulse waves / breath wave vector graphics */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 400 300">
                <path d="M0,150 C80,110 120,190 200,150 C280,110 320,190 400,150 L400,300 L0,300 Z" fill="currentColor" className="text-emerald-400" />
                <path d="M0,130 C70,160 140,100 200,130 C270,160 330,100 400,130" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400" />
                <path d="M0,170 C90,140 130,200 200,170 C270,140 310,200 400,170" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400" />
              </svg>

              <div className="space-y-4 relative z-10">
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

              <div className="pt-3 border-t border-slate-800 space-y-2.5 relative z-10">
                {/* Recommended Reading */}
                <Link
                  to="/premium-guides/stress-management-toolkit"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/40 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                      <BookOpen size={14} />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                        Recommended Reading
                      </span>
                      <span className="text-white font-bold group-hover:text-purple-200 transition-colors truncate block">
                        Cortisol &amp; Stress Management Protocol
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-purple-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>

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

          <div className="p-8 sm:p-10 rounded-3xl backdrop-blur-md bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/40 border border-indigo-500/30 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 shadow-2xl relative overflow-hidden space-y-8">
            {/* Ambient Radial Glows: Sapphire Blue & Electric Indigo */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#0284c7] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#6366f1] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

            {/* Background Overlay: Concentric diagnostic radar watermark */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50%" cy="50%" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-indigo-400" />
              <circle cx="50%" cy="50%" r="160" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400" />
              <circle cx="50%" cy="50%" r="240" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" className="text-cyan-400" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.75" className="text-indigo-400" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="0.75" className="text-indigo-400" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              
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
                      1
                    </span>
                    <div>
                      <strong className="text-white block font-semibold">Channel 1: Phlebotomy Venous Blood Draws (90d)</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        ApoB (atherogenic particle count), HbA1c (glycated hemoglobin), hs-CRP (micro-inflammation), and Urine ACR.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0 font-mono font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <div>
                      <strong className="text-white block font-semibold">Channel 2: Urinalysis &amp; Fluid Telemetry (Weekly)</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        10-parameter medical test strips (Diagnox / ALLTEST): pH, hydration/SG, ketones, microalbumin, nitrites.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 font-mono font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <div>
                      <strong className="text-white block font-semibold">Channel 3: 24/7 Body Comp &amp; Biosensors (Continuous)</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Bioimpedance scale (visceral fat 1–12, muscle %) + nocturnal wearables (HRV, resting HR).
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

          {/* Dedicated 3-Channel Diagnostic Architecture Cards */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Choose Your Diagnostics • 3 Integrated Clinical Channels
              </span>
              <span className="text-xs font-mono text-cyan-400">Region: {selectedRegion}</span>
            </div>

            <Step2DiagnosticChannels 
              selectedRegion={selectedRegion as Market} 
              showComparisonLink={true}
            />

            {/* Step 2 Dedicated Dual Blood Draw Architecture & Comparison Table */}
            <div id="step-2-comparison" className="scroll-mt-28 pt-8 border-t border-slate-800 space-y-5">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    STEP 2 ARCHITECTURE: CHOOSE YOUR DIAGNOSTICS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                    Two Distinct Blood Draw Options: Basic vs. Complete Panel
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
                    Select between the budget-conscious Essential Baseline Blood Panel (Essential Starter) or the comprehensive 56-Biomarker Cellular Map (Clinical Gold Standard).
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  <span className="text-emerald-400 font-bold">Active Region:</span>
                  <span>{selectedRegion === 'US' ? '🇺🇸 United States' : selectedRegion === 'UK' ? '🇬🇧 United Kingdom' : '🇪🇸 Spain / EU'}</span>
                </div>
              </div>

              <BloodPanelComparisonTable 
                showCards={false}
                defaultExpanded={true}
                selectedRegion={selectedRegion as Market}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 3: THE CLINICIAN CO-PILOT: FROM GUESSING TO KNOWING                  */}
        {/* ========================================================================= */}
        <Step3GuidingBanner id="step-3" />

        {/* ========================================================================= */}
        {/* STEP 4: Pillar Optimization & Recommended Reading Hub                     */}
        {/* ========================================================================= */}
        <section id="step-4" className="scroll-mt-28 space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono font-bold flex items-center justify-center text-sm">
              04
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-pink-400 tracking-widest font-bold">SYSTEMIC EXPANSION &amp; EXECUTION MANUALS</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Step 4: Pillar Optimization &amp; Recommended Reading Hub
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl font-light">
            Once baseline telemetry and clinical collaboration are activated, systematically scale your biological hardware. Accelerate each domain with our curated Premium Master Guides and explore our 6 core longevity pillars below:
          </p>

          {/* CURATED 3-CARD RECOMMENDED READING GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-amber-400" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Curated Recommended Reading • Premium Master Guides
                </h3>
              </div>
              <Link
                to="/premium-guides"
                className="text-xs text-slate-400 hover:text-white font-mono flex items-center gap-1 transition-colors"
              >
                <span>Browse All Guides</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* GUIDE 1: Beginner Home Workout Plan */}
              <div className="rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all overflow-hidden flex flex-col justify-between group shadow-lg shadow-black/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop"
                    alt="Beginner Home Workout Plan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950/90 border border-cyan-800 text-cyan-300 font-bold backdrop-blur-sm">
                    Pillar 1 • Movement
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base font-display font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                      Beginner Home Workout Plan
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      4-week zero-equipment protocol focusing on functional bodyweight movement, core stabilization, and progressive overload to counter sarcopenia.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-300 font-bold">
                      Digital Master PDF
                    </span>
                    <Link
                      to="/premium-guides/beginner-home-workout-plan"
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* GUIDE 2: The Master Meal Planning Guide */}
              <div className="rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 transition-all overflow-hidden flex flex-col justify-between group shadow-lg shadow-black/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
                    alt="The Master Meal Planning Guide"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-teal-950/90 border border-teal-800 text-teal-300 font-bold backdrop-blur-sm">
                    Pillar 2 • Nutrition
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base font-display font-black uppercase text-white group-hover:text-teal-400 transition-colors">
                      The Master Meal Planning Guide
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Systematic framework for batch-cooking macronutrients, stabilizing post-meal blood glucose, and grocery shopping with zero stress.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-teal-300 font-bold">
                      Digital Master PDF
                    </span>
                    <Link
                      to="/premium-guides/healthy-meal-planning-guide"
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* GUIDE 3: Cortisol & Stress Management Protocol */}
              <div className="rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all overflow-hidden flex flex-col justify-between group shadow-lg shadow-black/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                    alt="Cortisol & Stress Management Protocol"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-purple-950/90 border border-purple-800 text-purple-300 font-bold backdrop-blur-sm">
                    Pillar 3 • Neurowellness
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base font-display font-black uppercase text-white group-hover:text-purple-400 transition-colors">
                      Cortisol &amp; Stress Management
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Science-backed somatic protocols, acute physiological sighs, and non-invasive vagus nerve resets to protect nocturnal HRV and lower inflammation.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-300 font-bold">
                      Digital Master PDF
                    </span>
                    <Link
                      to="/premium-guides/stress-management-toolkit"
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 6 CORE PILLAR HUBS SUBHEADER & GRID */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-pink-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">
                The 6 Core Geroscience Pillar Hubs
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* PILLAR 1: Fitness */}
            <Link
              to="/fitness"
              className="p-6 rounded-3xl backdrop-blur-md bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-emerald-950/40 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-2xl"
            >
              {/* Content-Specific Ambient Glows: Multi-Spectrum Gold, Teal & Rose */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-[#14b8a6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-[#f43f5e] rounded-full filter blur-2xl opacity-15 pointer-events-none" />

              {/* Background Overlay: Subtle 6-node hex grid connecting the 6 longevity pillars */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 240">
                <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-amber-400">
                  <polygon points="150,30 230,75 230,165 150,210 70,165 70,75" strokeDasharray="4,4" />
                  <line x1="150" y1="120" x2="150" y2="30" />
                  <line x1="150" y1="120" x2="230" y2="75" />
                  <line x1="150" y1="120" x2="230" y2="165" />
                  <line x1="150" y1="120" x2="150" y2="210" />
                  <line x1="150" y1="120" x2="70" y2="165" />
                  <line x1="150" y1="120" x2="70" y2="75" />
                  <circle cx="150" cy="30" r="5" fill="#f59e0b" />
                  <circle cx="230" cy="75" r="5" fill="#14b8a6" />
                  <circle cx="230" cy="165" r="5" fill="#8b5cf6" />
                  <circle cx="150" cy="210" r="5" fill="#f43f5e" />
                  <circle cx="70" cy="165" r="5" fill="#06b6d4" />
                  <circle cx="70" cy="75" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="120" r="3" fill="currentColor" />
                </g>
              </svg>

              <div className="space-y-2 relative z-10">
                <div className="text-2xl">⚡</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                  Pillar 1: Movement &amp; Bio-Data
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zone 2 mitochondrial density, hypertrophic resistance training, wearable biosensing, and cold/heat thermogenesis.
                </p>
              </div>
              <div className="text-xs text-cyan-400 font-bold flex items-center gap-1 relative z-10">
                <span>Explore Fitness Pillar</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 2: Nutrition */}
            <Link
              to="/nutrition"
              className="p-6 rounded-3xl backdrop-blur-md bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-emerald-950/40 border border-slate-800 hover:border-teal-500/50 hover:shadow-[0_0_25px_rgba(20,184,166,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-2xl"
            >
              {/* Content-Specific Ambient Glows: Multi-Spectrum Gold, Teal & Rose */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-[#14b8a6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-[#f43f5e] rounded-full filter blur-2xl opacity-15 pointer-events-none" />

              {/* Background Overlay: Subtle 6-node hex grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 240">
                <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-teal-400">
                  <polygon points="150,30 230,75 230,165 150,210 70,165 70,75" strokeDasharray="4,4" />
                  <line x1="150" y1="120" x2="150" y2="30" />
                  <line x1="150" y1="120" x2="230" y2="75" />
                  <line x1="150" y1="120" x2="230" y2="165" />
                  <line x1="150" y1="120" x2="150" y2="210" />
                  <line x1="150" y1="120" x2="70" y2="165" />
                  <line x1="150" y1="120" x2="70" y2="75" />
                  <circle cx="150" cy="30" r="5" fill="#f59e0b" />
                  <circle cx="230" cy="75" r="5" fill="#14b8a6" />
                  <circle cx="230" cy="165" r="5" fill="#8b5cf6" />
                  <circle cx="150" cy="210" r="5" fill="#f43f5e" />
                  <circle cx="70" cy="165" r="5" fill="#06b6d4" />
                  <circle cx="70" cy="75" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="120" r="3" fill="currentColor" />
                </g>
              </svg>

              <div className="space-y-2 relative z-10">
                <div className="text-2xl">🥗</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-teal-400 transition-colors">
                  Pillar 2: Metabolic Nutrition
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Continuous glucose monitoring, glycemic stability, micronutrient density, and muscle-sparing fasting protocols.
                </p>
              </div>
              <div className="text-xs text-teal-400 font-bold flex items-center gap-1 relative z-10">
                <span>Explore Nutrition Pillar</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 3: Neurowellness */}
            <Link
              to="/neurowellness"
              className="p-6 rounded-3xl backdrop-blur-md bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-emerald-950/40 border border-slate-800 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-2xl"
            >
              {/* Content-Specific Ambient Glows: Multi-Spectrum Gold, Teal & Rose */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-[#14b8a6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-[#8b5cf6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Subtle 6-node hex grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 240">
                <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-purple-400">
                  <polygon points="150,30 230,75 230,165 150,210 70,165 70,75" strokeDasharray="4,4" />
                  <line x1="150" y1="120" x2="150" y2="30" />
                  <line x1="150" y1="120" x2="230" y2="75" />
                  <line x1="150" y1="120" x2="230" y2="165" />
                  <line x1="150" y1="120" x2="150" y2="210" />
                  <line x1="150" y1="120" x2="70" y2="165" />
                  <line x1="150" y1="120" x2="70" y2="75" />
                  <circle cx="150" cy="30" r="5" fill="#f59e0b" />
                  <circle cx="230" cy="75" r="5" fill="#14b8a6" />
                  <circle cx="230" cy="165" r="5" fill="#8b5cf6" />
                  <circle cx="150" cy="210" r="5" fill="#f43f5e" />
                  <circle cx="70" cy="165" r="5" fill="#06b6d4" />
                  <circle cx="70" cy="75" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="120" r="3" fill="currentColor" />
                </g>
              </svg>

              <div className="space-y-2 relative z-10">
                <div className="text-2xl">🧠</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-purple-400 transition-colors">
                  Pillar 3: Neurowellness &amp; Autonomics
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Non-invasive vagus nerve stimulation (VNS), deep sleep architecture, somatic breathwork, and neuro-resilience.
                </p>
              </div>
              <div className="text-xs text-purple-400 font-bold flex items-center gap-1 relative z-10">
                <span>Explore Neurowellness Pillar</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 4: Women's Health */}
            <Link
              to="/womens-health"
              className="p-6 rounded-3xl backdrop-blur-md bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-emerald-950/40 border border-slate-800 hover:border-pink-500/50 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-2xl"
            >
              {/* Content-Specific Ambient Glows: Multi-Spectrum Gold, Teal & Rose */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-[#14b8a6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-[#f43f5e] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Subtle 6-node hex grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 240">
                <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-pink-400">
                  <polygon points="150,30 230,75 230,165 150,210 70,165 70,75" strokeDasharray="4,4" />
                  <line x1="150" y1="120" x2="150" y2="30" />
                  <line x1="150" y1="120" x2="230" y2="75" />
                  <line x1="150" y1="120" x2="230" y2="165" />
                  <line x1="150" y1="120" x2="150" y2="210" />
                  <line x1="150" y1="120" x2="70" y2="165" />
                  <line x1="150" y1="120" x2="70" y2="75" />
                  <circle cx="150" cy="30" r="5" fill="#f59e0b" />
                  <circle cx="230" cy="75" r="5" fill="#14b8a6" />
                  <circle cx="230" cy="165" r="5" fill="#8b5cf6" />
                  <circle cx="150" cy="210" r="5" fill="#f43f5e" />
                  <circle cx="70" cy="165" r="5" fill="#06b6d4" />
                  <circle cx="70" cy="75" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="120" r="3" fill="currentColor" />
                </g>
              </svg>

              <div className="space-y-2 relative z-10">
                <div className="text-2xl">🌸</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-pink-400 transition-colors">
                  Pillar 4: Women's Longevity
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ovarian healthspan preservation, peri-menopause metabolic shifts, bone mineral density, and hormone balance.
                </p>
              </div>
              <div className="text-xs text-pink-400 font-bold flex items-center gap-1 relative z-10">
                <span>Explore Women's Health</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 5: Social Fitness */}
            <Link
              to="/social-fitness"
              className="p-6 rounded-3xl backdrop-blur-md bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-emerald-950/40 border border-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-2xl"
            >
              {/* Content-Specific Ambient Glows: Multi-Spectrum Gold, Teal & Rose */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-[#14b8a6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-[#f43f5e] rounded-full filter blur-2xl opacity-15 pointer-events-none" />

              {/* Background Overlay: Subtle 6-node hex grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 240">
                <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-amber-400">
                  <polygon points="150,30 230,75 230,165 150,210 70,165 70,75" strokeDasharray="4,4" />
                  <line x1="150" y1="120" x2="150" y2="30" />
                  <line x1="150" y1="120" x2="230" y2="75" />
                  <line x1="150" y1="120" x2="230" y2="165" />
                  <line x1="150" y1="120" x2="150" y2="210" />
                  <line x1="150" y1="120" x2="70" y2="165" />
                  <line x1="150" y1="120" x2="70" y2="75" />
                  <circle cx="150" cy="30" r="5" fill="#f59e0b" />
                  <circle cx="230" cy="75" r="5" fill="#14b8a6" />
                  <circle cx="230" cy="165" r="5" fill="#8b5cf6" />
                  <circle cx="150" cy="210" r="5" fill="#f43f5e" />
                  <circle cx="70" cy="165" r="5" fill="#06b6d4" />
                  <circle cx="70" cy="75" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="120" r="3" fill="currentColor" />
                </g>
              </svg>

              <div className="space-y-2 relative z-10">
                <div className="text-2xl">🏛️</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-amber-400 transition-colors">
                  Pillar 5: Socio-Biological Architecture
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Community wellness dynamics, pickleball ecosystems, cortisol-buffering social circles, and longevity tribes.
                </p>
              </div>
              <div className="text-xs text-amber-400 font-bold flex items-center gap-1 relative z-10">
                <span>Explore Social Fitness</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* PILLAR 6: Sovereign Store */}
            <Link
              to="/store"
              className="p-6 rounded-3xl backdrop-blur-md bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-emerald-950/40 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-2xl"
            >
              {/* Content-Specific Ambient Glows: Multi-Spectrum Gold, Teal & Rose */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 -right-10 w-32 h-32 bg-[#14b8a6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
              <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-[#06b6d4] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

              {/* Background Overlay: Subtle 6-node hex grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 240">
                <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-cyan-400">
                  <polygon points="150,30 230,75 230,165 150,210 70,165 70,75" strokeDasharray="4,4" />
                  <line x1="150" y1="120" x2="150" y2="30" />
                  <line x1="150" y1="120" x2="230" y2="75" />
                  <line x1="150" y1="120" x2="230" y2="165" />
                  <line x1="150" y1="120" x2="150" y2="210" />
                  <line x1="150" y1="120" x2="70" y2="165" />
                  <line x1="150" y1="120" x2="70" y2="75" />
                  <circle cx="150" cy="30" r="5" fill="#f59e0b" />
                  <circle cx="230" cy="75" r="5" fill="#14b8a6" />
                  <circle cx="230" cy="165" r="5" fill="#8b5cf6" />
                  <circle cx="150" cy="210" r="5" fill="#f43f5e" />
                  <circle cx="70" cy="165" r="5" fill="#06b6d4" />
                  <circle cx="70" cy="75" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="120" r="3" fill="currentColor" />
                </g>
              </svg>

              <div className="space-y-2 relative z-10">
                <div className="text-2xl">🛒</div>
                <h3 className="text-base font-display font-black uppercase text-white group-hover:text-cyan-400 transition-colors">
                  Pillar 6: Sovereign Longevity Store
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Curated regional medical gear: Quest, LOLA, Eurofins blood panels, 10-parameter dipsticks, and digital stethoscopes.
                </p>
              </div>
              <div className="text-xs text-cyan-400 font-bold flex items-center gap-1 relative z-10">
                <span>Visit Sovereign Store</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            </div>
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
