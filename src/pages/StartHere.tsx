import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Activity, Heart, Clock, ArrowRight, 
  FileText, Download, CheckCircle2, Info, Lock 
} from 'lucide-react';

export default function StartHere() {
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'habits' | 'clinician'>('diagnostics');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-wellness-cyan/30 font-sans pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-wellness-cyan/10 border border-wellness-cyan/30 text-wellness-cyan-light font-bold mb-4">
            Performance Architecture
          </span>
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white font-black leading-tight">
            The Dual-Track Performance Framework
          </h1>
          <p className="text-slate-grey-450 text-sm md:text-base mt-3 leading-relaxed font-light">
            A systematic, evidence-based approach to longevity. Establish your biological baseline through quarterly clinical-grade data, and optimize cellular aging pace with targeted daily inputs.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 relative z-10">
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-2xl gap-1 overflow-x-auto scrollbar-none max-w-full">
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-5 py-3 rounded-xl font-display uppercase tracking-wider text-[11px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'diagnostics'
                  ? 'bg-gradient-to-r from-wellness-cyan to-indigo-600 text-white shadow-lg shadow-wellness-cyan/10'
                  : 'text-slate-grey-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              Phase 1: Diagnostic Baseline
            </button>
            <button
              onClick={() => setActiveTab('habits')}
              className={`px-5 py-3 rounded-xl font-display uppercase tracking-wider text-[11px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'habits'
                  ? 'bg-gradient-to-r from-wellness-cyan to-indigo-600 text-white shadow-lg shadow-wellness-cyan/10'
                  : 'text-slate-grey-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              Phase 2: Daily Small Wins
            </button>
            <button
              onClick={() => setActiveTab('clinician')}
              className={`px-5 py-3 rounded-xl font-display uppercase tracking-wider text-[11px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'clinician'
                  ? 'bg-gradient-to-r from-wellness-cyan to-indigo-600 text-white shadow-lg shadow-wellness-cyan/10'
                  : 'text-slate-grey-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              Clinician Integration Hub
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="relative z-10 transition-all duration-300">
          
          {/* TAB A: DIAGNOSTICS */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-8 rounded-3xl bg-[#0f172a]/80 border border-slate-800 shadow-xl space-y-6 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider block mb-1">[ STEP 1 ]</span>
                    <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                      Phase 1 • Establishing Your Biophysical Baseline
                    </h2>
                    <p className="text-slate-grey-300 text-xs sm:text-sm leading-relaxed font-light">
                      True longevity planning requires objective measurement. Establishing a biological baseline transitions you from guessing to knowing, laying the quantitative foundation before any clinical optimization protocols begin.
                    </p>
                  </div>

                  {/* Detailed Video 2 Placeholder */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/10 hover:border-cyan-500/25 transition-all relative overflow-hidden flex flex-col md:flex-row gap-4 items-center group/vid-placeholder">
                    <div className="w-16 h-16 rounded-xl bg-slate-950 flex items-center justify-center flex-shrink-0 border border-slate-800 relative group-hover/vid-placeholder:border-wellness-cyan/30 transition-all">
                      <span className="absolute inset-0 rounded-xl bg-wellness-cyan/5 animate-pulse"></span>
                      <svg className="w-6 h-6 fill-current text-wellness-cyan/60 group-hover/vid-placeholder:text-wellness-cyan transition-colors" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-display uppercase tracking-wider text-white font-bold">
                        Building the Optimized Human (Upcoming Briefing)
                      </h4>
                      <p className="text-[11px] text-slate-grey-455 leading-relaxed font-light">
                        This upcoming 60-second clinical briefing will guide you through ordering diagnostic kits, tracking baselines, and preparing for your GP partnership.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Detail Blocks (Biomarker Glossary) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/50">
                  {/* Epigenetics */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-9 h-9 rounded-xl bg-wellness-cyan/10 border border-wellness-cyan/20 flex items-center justify-center text-wellness-cyan-light">
                        <Heart size={18} />
                      </div>
                      <h3 className="text-sm font-display uppercase tracking-wider text-white font-bold">
                        Epigenetic Biological Age Testing (gDNA)
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-grey-450 leading-relaxed font-light">
                        Whole-methylome gDNA sequencing analyzes specific cellular methylation patterns across your genome to track cellular aging velocity over time.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-900">
                      <Link to="/health" className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-wellness-cyan hover:underline">
                        Order Home Epigenetic Testing Kit →
                      </Link>
                    </div>
                  </div>

                  {/* Biomarker Glossary - Blood panel */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-9 h-9 rounded-xl bg-wellness-cyan/10 border border-wellness-cyan/20 flex items-center justify-center text-wellness-cyan-light">
                        <Activity size={18} />
                      </div>
                      <h3 className="text-sm font-display uppercase tracking-wider text-white font-bold">
                        Lola Vital Check 56 Blood Panel
                      </h3>
                      <div className="space-y-2.5 text-[11px] sm:text-xs text-slate-grey-455 font-light">
                        <div>
                          <strong className="text-slate-300 block font-semibold">ApoB (Apolipoprotein B)</strong>
                          Directly counts atherogenic plaque-forming particles to evaluate subclinical cardiovascular risk.
                        </div>
                        <div>
                          <strong className="text-slate-300 block font-semibold">HbA1c (Glycated Hemoglobin)</strong>
                          Measures average glycemic control over the past 90 days to screen for insulin sensitivity.
                        </div>
                        <div>
                          <strong className="text-slate-300 block font-semibold">hs-CRP (High-Sensitivity CRP)</strong>
                          An ultra-sensitive inflammatory marker signaling low-grade systemic vascular inflammation tracking.
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-900">
                      <Link to="/intelligence-hub" className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-wellness-cyan hover:underline">
                        Book Partner Lab Clinical Draw →
                      </Link>
                    </div>
                  </div>

                  {/* Wearable Telemetry */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-9 h-9 rounded-xl bg-wellness-cyan/10 border border-wellness-cyan/20 flex items-center justify-center text-wellness-cyan-light">
                        <Clock size={18} />
                      </div>
                      <h3 className="text-sm font-display uppercase tracking-wider text-white font-bold">
                        Continuous Telemetry Baselines
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-grey-450 leading-relaxed font-light">
                        Continuous monitoring maps sleep duration, average resting heart rate (RHR), and nocturnal Heart Rate Variability (HRV) trends to establish baseline recovery and stress tolerance curves.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-900 text-[10px] sm:text-xs text-slate-grey-500 font-mono">
                      VETTED HARDWARE DETAILS BELOW
                    </div>
                  </div>
                </div>

                {/* Continuous Biometric Logging / Vetted Hardware Hub */}
                <div className="pt-6 border-t border-slate-800/80 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    Vetted Continuous Telemetry Hardware
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Apple Watch Series 10 */}
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-855 hover:border-wellness-cyan/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white uppercase">Apple Watch Series 10 [GPS 46mm case]</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-wellness-cyan/15 text-wellness-cyan font-bold">4.7★ Rating</span>
                        </div>
                        <p className="text-[11px] text-slate-grey-455 font-light leading-relaxed">
                          The gold standard for continuous, passive heart rate and nocturnal Heart Rate Variability (HRV) telemetry.
                        </p>
                      </div>
                      <a
                        href="https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-wellness-cyan text-[10px] sm:text-xs font-bold uppercase tracking-wider text-wellness-cyan transition-all"
                      >
                        Buy on Amazon →
                      </a>
                    </div>

                    {/* Ovarian Test UK */}
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-855 hover:border-wellness-cyan/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white uppercase">Ovarian Test UK</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-wellness-cyan/15 text-wellness-cyan font-bold">5.0★ Rating</span>
                        </div>
                        <p className="text-[11px] text-slate-grey-455 font-light leading-relaxed">
                          Focused biology-specific screening for female athletic and endocrine performance.
                        </p>
                      </div>
                      <a
                        href="https://www.amazon.com/SUPFINE-Compatible-Protection-Translucent-Anti-Fingerprint/dp/B0G3NVZLVJ?ref=dlx_deals_dg_dcl_B0G3NVZLVJ_dt_sl14_b7_pi&pf_rd_r=PJF6ECN5EE7CRH82WJRJ&pf_rd_p=1e04acd0-30fe-482c-b054-5487f3e9a5b7&th=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-wellness-cyan text-[10px] sm:text-xs font-bold uppercase tracking-wider text-wellness-cyan transition-all"
                      >
                        Buy on Amazon →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Privacy Banner */}
                <div className="p-4 border border-wellness-cyan/20 bg-wellness-cyan/5 rounded-2xl flex gap-3 items-start text-left mt-6">
                  <Shield size={16} className="text-wellness-cyan flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-wellness-cyan-light font-bold tracking-wider block">
                      Clinical Privacy Protocol
                    </span>
                    <p className="text-[11px] text-slate-grey-300 font-light leading-relaxed">
                      Data privacy is absolute. We do not collect or accept uploads of your medical results. You maintain 100% control of your physical biomarkers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB B: HABITS */}
          {activeTab === 'habits' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-8 rounded-3xl bg-[#0f172a]/80 border border-slate-800 shadow-xl space-y-6 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-wellness-amber uppercase tracking-wider block mb-1">[ STEP 2 ]</span>
                    <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                      Phase 2 • Daily Behavioral & Autonomic Inputs
                    </h2>
                    <p className="text-slate-grey-300 text-xs sm:text-sm leading-relaxed font-light">
                      Continuous diagnostics only matter if they drive daily action. We translate complex biometric feedback loops into high-yield, zero-cost lifestyle habits. Phase 2 daily habits are the direct, zero-cost "inputs" used to improve the clinical biomarker baselines measured in Phase 1.
                    </p>
                  </div>

                  {/* Detailed Video 3 Placeholder */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/10 hover:border-cyan-500/25 transition-all relative overflow-hidden flex flex-col md:flex-row gap-4 items-center group/vid-placeholder">
                    <div className="w-16 h-16 rounded-xl bg-slate-950 flex items-center justify-center flex-shrink-0 border border-slate-800 relative group-hover/vid-placeholder:border-wellness-cyan/30 transition-all">
                      <span className="absolute inset-0 rounded-xl bg-wellness-cyan/5 animate-pulse"></span>
                      <svg className="w-6 h-6 fill-current text-wellness-cyan/60 group-hover/vid-placeholder:text-wellness-cyan transition-colors" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-display uppercase tracking-wider text-white font-bold">
                        Start Here, Start Now (Upcoming Coaching Briefing)
                      </h4>
                      <p className="text-[11px] text-slate-grey-450 leading-relaxed font-light">
                        This upcoming 65-second coaching session details how to execute your zero-cost biophysical habits on Day 1 without waiting for lab results.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mechanical Description */}
                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-2">
                  <span className="text-[10px] font-mono text-wellness-amber uppercase tracking-wider font-bold block">
                    Epigenetic Velocity Mechanism
                  </span>
                  <p className="text-xs sm:text-sm text-slate-grey-300 leading-relaxed font-light">
                    Daily behavioral inputs directly regulate your autonomic state. Scientific consensus confirms that <strong>80-90% of cellular aging velocity is driven by lifestyle choices</strong> and environmental inputs rather than raw genetics. Small daily practices modulate gene expression to support healthspan.
                  </p>
                </div>

                {/* Habit Protocols */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Mobility Walks */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-wellness-cyan font-bold block">[ PROTOCOL 1 ]</span>
                      <h3 className="text-sm font-display uppercase tracking-wider text-white font-bold">
                        10-Minute Mobility Walks
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-grey-455 leading-relaxed font-light">
                        Preserves joint lubrication, increases vascular elasticity, and builds structural cardiovascular efficiency. Simple, low-intensity movement acts as a constant baseline metabolic signal.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-900 space-y-3 text-[11px]">
                      {/* Direct Product */}
                      <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-850 hover:border-wellness-cyan/15 transition-all">
                        <p className="text-slate-grey-400 font-light leading-relaxed">
                          Upgrade your functional strength progress with the <Link to="/premium-guides" className="text-wellness-cyan font-bold hover:underline">Beginner Home Workout Plan (£19.00)</Link>—our 4-week zero-equipment protocol to build foundational joint stability.
                        </p>
                      </div>

                      {/* Vetted Extensions */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-450 block font-bold">Vetted Equipment extensions</span>
                        <div className="flex flex-col gap-1.5">
                          <a
                            href="https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-between items-center p-2 rounded bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 text-slate-grey-300 hover:text-white transition-all"
                          >
                            <span className="font-medium">Cocept2 Remo Indoor Model D Black Rower</span>
                            <span className="text-[10px] text-wellness-cyan font-bold">4.9★</span>
                          </a>
                          <a
                            href="https://www.amazon.co.uk/dp/B076QJY2FN?tag=123znl0f3-21"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-between items-center p-2 rounded bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 text-slate-grey-300 hover:text-white transition-all"
                          >
                            <span className="font-medium">Amazon Basics Cast Iron Kettlebell</span>
                            <span className="text-[10px] text-wellness-cyan font-bold">4.8★</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Breathing Mindfulness */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-wellness-cyan font-bold block">[ PROTOCOL 2 ]</span>
                      <h3 className="text-sm font-display uppercase tracking-wider text-white font-bold">
                        Breathing Mindfulness & Cortisol Control
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-grey-455 leading-relaxed font-light">
                        Stimulates the vagus nerve to down-regulate sympathetic fight-or-flight states, immediately reducing baseline cortisol, achieving vagus nerve stimulation, and promoting HRV gains.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-900 space-y-3 text-[11px]">
                      {/* Direct Product */}
                      <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-850 hover:border-wellness-cyan/15 transition-all">
                        <p className="text-slate-grey-400 font-light leading-relaxed">
                          Build the ultimate bedtime routine and master your circadian sleep architecture with our <Link to="/premium-guides" className="text-wellness-cyan font-bold hover:underline">Cortisol & Stress Management Guide (£22.00)</Link>.
                        </p>
                      </div>

                      {/* Sleep & Relaxation Accelerators */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-450 block font-bold">Sleep & Relaxation Accelerators</span>
                        <div className="flex flex-col gap-1.5">
                          <a
                            href="https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col p-2.5 rounded bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 text-slate-grey-300 hover:text-white transition-all text-left gap-1"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span className="font-bold text-slate-200">Sony WH-CH720N Noise-Canceling Headphones</span>
                              <span className="text-[10px] text-wellness-cyan font-bold">4.9★</span>
                            </div>
                            <span className="text-[10px] text-slate-grey-455 font-light leading-relaxed">
                              Block out environmental sensory pollution for deep-sleep preparation, NSDR neuro-resets, and vagal breathing exercises.
                            </span>
                          </a>
                          <a
                            href="https://www.amazon.com/dp/B01698E3A6?tag=123znl08-20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-between items-center p-2 rounded bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 text-slate-grey-300 hover:text-white transition-all"
                          >
                            <span className="font-medium">basaho Classic Zafu Meditation Cushion</span>
                            <span className="text-[10px] text-wellness-cyan font-bold">4.8★</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glycemic Snacking */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-wellness-cyan font-bold block">[ PROTOCOL 3 ]</span>
                      <h3 className="text-sm font-display uppercase tracking-wider text-white font-bold">
                        Glycemic Snacking & Metabolic Nutrition
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-grey-455 leading-relaxed font-light">
                        Focuses on glucose stabilization and preserving insulin sensitivity, prioritizing low-glycemic cellular fueling to protect metabolic health and prevent glycemic spikes.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-900 space-y-3 text-[11px]">
                      {/* Direct Product */}
                      <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-850 hover:border-wellness-cyan/15 transition-all">
                        <p className="text-slate-grey-400 font-light leading-relaxed">
                          Master your metabolic kitchen workflows with <Link to="/premium-guides" className="text-wellness-cyan font-bold hover:underline">The Master Meal Planning Guide (£24.00)</Link>.
                        </p>
                      </div>

                      {/* Metabolic & Vitamin Accelerators */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-450 block font-bold">Metabolic & Vitamin Accelerators</span>
                        <div className="flex flex-col gap-1.5">
                          <a
                            href="https://www.amazon.com/s?k=ZEBORA+Marine+Collagen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col p-2.5 rounded bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 text-slate-grey-300 hover:text-white transition-all text-left gap-1"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span className="font-bold text-slate-200">Zebora Marine Collagen</span>
                              <span className="text-[10px] text-wellness-cyan font-bold">4.8★</span>
                            </div>
                            <span className="text-[10px] text-slate-grey-455 font-light leading-relaxed">
                              Expert-recommended daily marine collagen to support gut integrity, tissue recovery, and cellular structure.
                            </span>
                          </a>
                          <a
                            href="https://www.amazon.com/s?k=Owala+FreeSip+Water+Bottles"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col p-2.5 rounded bg-slate-900/30 hover:bg-slate-900/60 border border-slate-850 text-slate-grey-300 hover:text-white transition-all text-left gap-1"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span className="font-bold text-slate-200">Owala Insulated Bottles</span>
                              <span className="text-[10px] text-wellness-cyan font-bold">4.9★</span>
                            </div>
                            <span className="text-[10px] text-slate-grey-455 font-light leading-relaxed">
                              Maintain optimal metabolic hydration throughout your fasting and feeding windows.
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB C: CLINICIAN HUB */}
          {activeTab === 'clinician' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-8 rounded-3xl bg-[#0f172a]/80 border border-slate-800 shadow-xl space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider block mb-1">[ CLINICAL OVERWATCH ]</span>
                  <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                    Clinician Collaboration • Shared Decision Making
                  </h2>
                  <p className="text-slate-grey-300 text-xs sm:text-sm leading-relaxed mt-2 font-light">
                    We bridge the gap between tracking frameworks and medical oversight, ensuring a safe, supervised pathway.
                  </p>
                </div>

                {/* Philosophy Copy */}
                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-2">
                  <span className="text-[10px] font-mono text-slate-grey-450 uppercase tracking-wider font-bold block">
                    Core Philosophy
                  </span>
                  <p className="text-xs sm:text-sm text-slate-grey-300 leading-relaxed font-light">
                    "Proactive medicine is a partnership. Raw metrics are not a diagnosis; they are a clinical map. Shared decision-making is a mandatory safety protocol of our platform."
                  </p>
                </div>

                {/* Styled GP-Ready Consultation Template PDF Card */}
                <div className="p-6 rounded-2xl border border-wellness-cyan/20 bg-wellness-cyan/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-display uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      📥 Printable GP-Ready Consultation Template (PDF)
                    </h3>
                    <p className="text-xs text-slate-grey-400 font-light mt-1">
                      Download the official workbook to record and discuss your quarterly metrics with your GP.
                    </p>
                  </div>
                  <a
                    href="/assets/docs/clinical-baseline-consultation-template.pdf"
                    download="clinical-baseline-consultation-template.pdf"
                    className="inline-flex items-center gap-2.5 py-3.5 px-6 bg-gradient-to-r from-wellness-cyan to-indigo-600 hover:from-wellness-cyan-light hover:to-indigo-500 text-white border border-wellness-cyan/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-wellness-cyan/15 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <Download size={14} />
                    <span>Download PDF</span>
                  </a>
                </div>

                {/* Integration Steps */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                    Integration Steps:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-wellness-cyan/10 border border-wellness-cyan/30 text-wellness-cyan-light flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Print the workbook template</h4>
                        <p className="text-[11px] text-slate-grey-450 mt-1 font-light leading-relaxed">
                          Download and print the consultation workbook template to log your health overview.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-wellness-cyan/10 border border-wellness-cyan/30 text-wellness-cyan-light flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Log your 7-day wearable biometrics</h4>
                        <p className="text-[11px] text-slate-grey-450 mt-1 font-light leading-relaxed">
                          Track your resting heart rate, sleep duration, and nocturnal HRV trends.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-wellness-cyan/10 border border-wellness-cyan/30 text-wellness-cyan-light flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Schedule a GP Consultation</h4>
                        <p className="text-[11px] text-slate-grey-450 mt-1 font-light leading-relaxed">
                          Consult with your local healthcare professional to co-evaluate and validate your baseline diagnostics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Global Wellness Quiz Action Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-wellness-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-wellness-cyan/10 text-wellness-cyan-light text-[10px] font-black uppercase tracking-widest border border-wellness-cyan/25">
              Intake Assessment
            </span>
            <h2 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-black">
              Compute Your Baseline Longevity Score
            </h2>
            <p className="text-slate-grey-300 text-xs sm:text-sm font-light leading-relaxed">
              Complete our structured, clinical-grade intake questionnaire to evaluate your current habits and diagnostics. Receive a prioritized roadmap addressing your active physiological pillars.
            </p>
            <div className="pt-2">
              <Link
                to="/health-quiz"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-wellness-cyan to-indigo-600 hover:from-wellness-cyan-light hover:to-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-xl shadow-wellness-cyan/15 border border-wellness-cyan/20 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span>Take the 5-Minute Wellness Quiz to Build Your Roadmap</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
