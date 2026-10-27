import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, Play, Activity, ExternalLink, 
  ArrowRight, Star, HeartPulse, RefreshCw, Info,
  CheckCircle2, AlertTriangle, Compass, FileText,
  ChevronDown, ChevronUp, Download, Eye, Award, Sparkles
} from 'lucide-react';
import { UnifiedExplainerSection } from '../components/UnifiedExplainerSection';
import DualTrackSelector from '../components/DualTrackSelector';

export default function Start_Now_Old() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'step1' | 'step2' | 'step3' | 'phase1' | 'phase2' | 'clinician'>('step1');
  const [activeScript, setActiveScript] = useState<number | null>(null);
  const [showVideoAlert, setShowVideoAlert] = useState<string | null>(null);

  // Animation variants for tab content transition
  const tabContentVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  const toggleScript = (idx: number) => {
    setActiveScript(activeScript === idx ? null : idx);
  };

  const handleVideoPlaceholderClick = (briefingTitle: string) => {
    setShowVideoAlert(briefingTitle);
    setTimeout(() => {
      setShowVideoAlert(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans pt-28 pb-20 relative overflow-hidden">
      {/* Background grid-lines styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0"></div>
      
      {/* Radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Floating Notification for Briefing Playback */}
      <AnimatePresence>
        {showVideoAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm p-4 bg-slate-900 border border-cyan-500/30 text-white rounded-2xl shadow-2xl flex items-start gap-3 backdrop-blur-md"
          >
            <Info className="text-cyan-400 shrink-0 mt-0.5" size={18} />
            <div className="text-left space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">Briefing Pending</h4>
              <p className="text-[11px] text-slate-350 leading-relaxed font-light">
                The spoken briefing <strong>&quot;{showVideoAlert}&quot;</strong> is currently in clinical production and will be deployed shortly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Workspace Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold mb-4 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
            <Activity size={12} className="animate-pulse" />
            Client Starting Line
          </span>
          <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-white font-black leading-none mb-3">
            The Dual-Track Blueprint
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Your onboarding path to human longevity. Balance clinical baseline telemetry with actionable daily habits to rewrite your biological decay rate.
          </p>
        </div>

        {/* 4-Stage High-Converting Funnel: Unified Longevity Engine Explainer */}
        <UnifiedExplainerSection className="mb-14" />

        {/* Glowing Callout Banner: Sovereign Storefront Integration */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.12)] backdrop-blur-xl relative overflow-hidden group text-left">
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 group-hover:bg-cyan-500/15 transition-colors" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold tracking-wider uppercase">
                <Sparkles size={14} className="text-cyan-400 animate-pulse" />
                <span>Localized Biological Hardware & Diagnostics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-black">
                Ready to transition from guessing to knowing?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Explore our country-localized Sovereign Storefront to review FDA, MHRA, and CE compliant home testing reagents, medical-grade telemetry, and comprehensive cellular blood baselines tailored specifically for the US, UK, and Spanish markets.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => navigate('/store')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Sovereign Storefront →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Elegant Centered 3-Tab Navigation Group: The 3-Step Start Now Roadmap */}
        <div className="flex justify-center mb-16 relative z-10">
          <div className="inline-flex p-2 bg-[#060a12]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl gap-2 overflow-x-auto scrollbar-none max-w-full shadow-2xl relative">
            
            {/* STEP 1: Establish Zero-Cost Daily Micro-Habits */}
            <button
              onClick={() => setActiveTab('step1')}
              className={`relative px-4 sm:px-6 py-3.5 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2.5 z-10 select-none group outline-none overflow-hidden ${
                activeTab === 'step1' || activeTab === 'phase2'
                  ? 'text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {(activeTab === 'step1' || activeTab === 'phase2') && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/80 border border-emerald-400/70 rounded-xl overflow-hidden -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.3),transparent_70%)] pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400" />
                </motion.div>
              )}
              <RefreshCw 
                size={15} 
                className={`transition-all duration-500 ${
                  activeTab === 'step1' || activeTab === 'phase2'
                    ? 'text-emerald-300 scale-110 rotate-180 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' 
                    : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                }`} 
              />
              <span>Step 1: Daily Micro-Habits</span>
            </button>
            
            {/* STEP 2: Engage Dual-Track Diagnostics */}
            <button
              onClick={() => setActiveTab('step2')}
              className={`relative px-4 sm:px-6 py-3.5 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2.5 z-10 select-none group outline-none overflow-hidden ${
                activeTab === 'step2' || activeTab === 'phase1'
                  ? 'text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {(activeTab === 'step2' || activeTab === 'phase1') && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-950/90 via-slate-900 to-sky-950/80 border border-cyan-400/70 rounded-xl overflow-hidden -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.3),transparent_70%)] pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400" />
                </motion.div>
              )}
              <Activity 
                size={15} 
                className={`transition-all duration-300 ${
                  activeTab === 'step2' || activeTab === 'phase1'
                    ? 'text-cyan-300 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
                    : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                }`} 
              />
              <span>Step 2: Dual-Track Diagnostics</span>
            </button>
            
            {/* STEP 3: Optimize the 6 Pillars */}
            <button
              onClick={() => setActiveTab('step3')}
              className={`relative px-4 sm:px-6 py-3.5 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2.5 z-10 select-none group outline-none overflow-hidden ${
                activeTab === 'step3' || activeTab === 'clinician'
                  ? 'text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {(activeTab === 'step3' || activeTab === 'clinician') && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/80 border border-indigo-400/70 rounded-xl overflow-hidden -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.3),transparent_70%)] pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400" />
                </motion.div>
              )}
              <Shield 
                size={15} 
                className={`transition-all duration-300 ${
                  activeTab === 'step3' || activeTab === 'clinician'
                    ? 'text-indigo-300 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' 
                    : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                }`} 
              />
              <span>Step 3: Optimize the 6 Pillars</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display Area */}
        <AnimatePresence mode="wait">
          
          {/* TAB A: STEP 2 • ENGAGE DUAL-TRACK DIAGNOSTICS */}
          {(activeTab === 'step2' || activeTab === 'phase1') && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="space-y-12"
            >
              {/* Early Warning Radar Clinical Paradigm + Video Placeholder Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Text & Paradigm Info */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4 text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                      Step 2 of 3-Step Roadmap • Dual-Track Engine
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                      Step 2: Engage Dual-Track Diagnostics
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light font-light">
                      True preventive medicine is an information-gathering game. Continuous biometric telemetry, rapid in-home urine test strips, and quarterly accredited venous blood panels establish an &apos;Early Warning Radar&apos;—diagnosing subclinical physiological shifts early before they develop into chronic diseases.
                    </p>
                  </div>

                  {/* Privacy Callout Card */}
                  <div className="p-5 border border-cyan-500/20 bg-slate-900/40 backdrop-blur-md rounded-2xl flex items-start gap-4 shadow-lg shadow-cyan-950/10">
                    <div className="p-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl mt-0.5">
                      <Lock size={16} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                        Absolute Data Privacy
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        We never collect, process, or ask you to upload your sensitive medical reports. Your clinical baselines remain entirely patient-held, private, and under your 100% control.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Video Playback Placeholder */}
                <div className="lg:col-span-5 flex items-stretch">
                  <div className="w-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900/30 border border-cyan-500/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    <div className="space-y-4 relative z-10 text-left">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400 block">
                        [ Streaming Protocol ]
                      </span>
                      <h3 className="text-lg font-display uppercase tracking-tight text-white font-black">
                        Building the Optimized Human (Upcoming Briefing)
                      </h3>
                    </div>

                    {/* Central Glowing Electric-Cyan Play Button Trigger */}
                    <div className="my-8 flex items-center justify-center relative z-10">
                      <div className="absolute w-20 h-20 rounded-full bg-cyan-500/10 animate-ping"></div>
                      <div 
                        onClick={() => handleVideoPlaceholderClick("Building the Optimized Human")}
                        className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-400/30 cursor-pointer"
                      >
                        <Play size={24} className="ml-1 text-white fill-white drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]" />
                      </div>
                    </div>

                    <div className="space-y-2 relative z-10 text-left">
                      <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                        <strong>60s Spoken Clinical Briefing •</strong> Learn how to calculate epigenetic decay velocity, analyze subclinical blood markers, and set up continuous sleep telemetry to co-process with your local GP.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 Engine: DualTrackSelector Component */}
              <DualTrackSelector className="shadow-2xl my-8" />

              {/* Biomarker Diagnostics Glossary (Interactive Cards) */}
              <div className="space-y-6">
                <div className="border-b border-slate-900 pb-4 text-left">
                  <h3 className="text-lg font-display uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    Biomarker Diagnostics Glossary
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {/* Card 1: Epigenetic Testing */}
                  <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                    <div className="space-y-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                        Epigenetic age velocity
                      </span>
                      <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">
                        Epigenetic Cellular Age Testing
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        Chronological age is just a calendar metric. Measuring genomic methylation calculates true biological age velocity versus calendar age to determine rate of decay.
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => navigate('/store')}
                        className="inline-flex justify-center items-center w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-center cursor-pointer"
                      >
                        Order Home Epigenetic Testing Kit →
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Lola Blood Panel */}
                  <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                    <div className="space-y-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                        Clinical Bio-Markers
                      </span>
                      <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">
                        The Lola Vital Check 56 & Peak Insights 70
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        Traditional medicine waits for symptoms. We track early warning indicators: ApoB (atherogenic plaque risk), HbA1c (90-day glycemic average), and hs-CRP (systemic inflammation tracking) to prevent cardiovascular issues before they emerge.
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => navigate('/store')}
                        className="inline-flex justify-center items-center w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      >
                        Secure Partner Lab Clinical Draw (£237) →
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Continuous Telemetry & Wearables */}
                  <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                    <div className="space-y-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                        Continuous Logging
                      </span>
                      <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">
                        Continuous Telemetry & Wearables
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        Continuous logging teaches machine learning algorithms your unique biometric baselines—allowing early detection of autonomic shifts (resting HR, overnight Heart Rate Variability, deep sleep cycles).
                      </p>
                    </div>

                    {/* Vetted Affiliate Products List */}
                    <div className="space-y-3 pt-2">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-xs flex flex-col justify-between h-auto gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white text-[11px] truncate">Apple Watch Series 10 [GPS 46mm]</span>
                          <span className="text-amber-400 text-[10px] flex items-center gap-0.5 shrink-0"><Star size={10} className="fill-amber-400" /> 4.7</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">The gold standard for continuous heart rate and nocturnal Heart Rate Variability (HRV) telemetry.</p>
                        <a
                          href="https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono uppercase text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-1 transition-colors"
                        >
                          Shop Amazon Affiliate Link →
                        </a>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-xs flex flex-col justify-between h-auto gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white text-[11px] truncate">Ovarian Test UK [Biology-Specific Screening]</span>
                          <span className="text-amber-400 text-[10px] flex items-center gap-0.5 shrink-0"><Star size={10} className="fill-amber-400" /> 5.0</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">Focused endocrine screening for female performance and reproductive longevity.</p>
                        <a
                          href="https://www.amazon.com/SUPFINE-Compatible-Protection-Translucent-Anti-Fingerprint/dp/B0G3NVZLVJ?ref=dlx_deals_dg_dcl_B0G3NVZLVJ_dt_sl14_b7_pi&pf_rd_r=PJF6ECN5EE7CRH82WJRJ&pf_rd_p=1e04acd0-30fe-482c-b054-5487f3e9a5b7&th=1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono uppercase text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-1 transition-colors"
                        >
                          Shop Amazon Affiliate Link →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB B: STEP 1 • ZERO-COST DAILY MICRO-HABITS */}
          {(activeTab === 'step1' || activeTab === 'phase2') && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="space-y-12"
            >
              {/* Tab Header Positioning + Video 3 Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Heading & Content */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                      Step 1 of 3-Step Roadmap • Foundational Micro-Habits
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                      Step 1: Establish Zero-Cost Daily Micro-Habits
                    </h2>
                    <p className="text-slate-350 text-sm md:text-base leading-relaxed font-light">
                      Daily behavioral choices are direct software updates for your cells. Before purchasing diagnostic blood panels, master your frictionless zero-cost habits: 10-minute post-meal walks, autonomic breathing resets for sleep, and glycemic snacking shifts.
                    </p>
                  </div>

                  {/* Vetted Brand Banner */}
                  <div className="p-4 border border-cyan-500/10 bg-slate-900/20 backdrop-blur-md rounded-2xl flex items-center gap-3">
                    <Award size={16} className="text-cyan-400 flex-shrink-0" />
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      Every tool, guide, and biochemical accelerator listed below has been rigorously vetted for biological activity and vascular safety parameters.
                    </p>
                  </div>
                </div>

                {/* Right Column: Video 3 Placeholder */}
                <div className="lg:col-span-5 flex items-stretch">
                  <div className="w-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900/30 border border-cyan-500/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    <div className="space-y-4 relative z-10 text-left">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400 block">
                        [ Performance Briefing ]
                      </span>
                      <h3 className="text-lg font-display uppercase tracking-tight text-white font-black">
                        Start Here, Start Now (Coaching Briefing)
                      </h3>
                    </div>

                    {/* Central Play Button */}
                    <div className="my-8 flex items-center justify-center relative z-10">
                      <div className="absolute w-20 h-20 rounded-full bg-cyan-500/10 animate-ping"></div>
                      <div 
                        onClick={() => handleVideoPlaceholderClick("Start Here, Start Now")}
                        className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-400/30 cursor-pointer"
                      >
                        <Play size={24} className="ml-1 text-white fill-white drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]" />
                      </div>
                    </div>

                    <div className="space-y-2 relative z-10 text-left">
                      <p className="text-[11px] text-slate-400 leading-relaxed font-light font-light">
                        <strong>Upcoming 65-second coaching session</strong> detailing how to execute your frictionless biophysical habits on Day 1, and how to accelerate your sleep, strength, and metabolic nutrition using our vetted daily vitamin, collagen, and low-cost toolkits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-Column Onboarding Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                
                {/* CARD 1: Mobility & Strength */}
                <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                  <div className="space-y-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                      Movement & Strength
                    </span>
                    <h3 className="text-base font-display uppercase tracking-tight text-white font-bold">
                      10-Minute Mobility Walks
                    </h3>
                    <div className="space-y-2 text-xs leading-relaxed text-slate-350">
                      <p className="font-semibold text-slate-200">Daily Win:</p>
                      <p className="font-light">Post-meal walking to clear systemic cortisol and flatten blood sugar spikes.</p>
                    </div>
                    
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-[11px] leading-relaxed">
                      <span className="font-semibold text-white block">Direct Digital Product:</span>
                      <p className="text-slate-400 font-light">
                        Deploy our Beginner Home Workout Plan (£19.00) — a 4-week zero-equipment routine to build baseline structural joint and lean mass health.
                      </p>
                      <Link 
                        to="/premium-guides/beginner-home-workout-plan"
                        className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:underline uppercase font-mono tracking-wider pt-1"
                      >
                        Acquire Guide <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">Vetted Affiliate Tool</span>
                      <p className="text-[10px] text-slate-300 leading-normal font-light">
                        <strong>Amazon Basics Cast Iron Kettlebell:</strong> The ultimate, low-cost home strength extension.
                      </p>
                      <a
                        href="https://www.amazon.co.uk/dp/B076QJY2FN?tag=123znl0f3-21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 tracking-wider uppercase pt-1"
                      >
                        Shop Amazon Affiliate Link →
                      </a>
                    </div>
                  </div>
                </div>

                {/* CARD 2: Recovery & Sleep */}
                <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                  <div className="space-y-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                      Nervous System & Recovery
                    </span>
                    <h3 className="text-base font-display uppercase tracking-tight text-white font-bold">
                      Breathing Mindfulness & Sleep Resets
                    </h3>
                    <div className="space-y-2 text-xs leading-relaxed text-slate-350">
                      <p className="font-semibold text-slate-200">Daily Win:</p>
                      <p className="font-light">Activating deep autonomic resets to stimulate the vagus nerve, manage nightly cortisol, and elevate overnight Heart Rate Variability (HRV).</p>
                    </div>

                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-[11px] leading-relaxed">
                      <span className="font-semibold text-white block">Direct Digital Product:</span>
                      <p className="text-slate-400 font-light">
                        Master your circadian sleep architecture with our Cortisol & Stress Management Guide (£22.00).
                      </p>
                      <Link 
                        to="/premium-guides/stress-management-toolkit"
                        className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:underline uppercase font-mono tracking-wider pt-1"
                      >
                        Acquire Guide <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900 space-y-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">Low-Cost Affiliate Tools</span>
                    
                    <div className="space-y-2.5 text-[10px]">
                      <div className="space-y-1">
                        <p className="text-slate-300 leading-normal font-light">
                          <strong>Sony WH-CH720N Noise-Canceling Headphones:</strong> Block out environmental sensory pollution for resets.
                        </p>
                        <a
                          href="https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 uppercase tracking-wider block"
                        >
                          Shop on Amazon →
                        </a>
                      </div>

                      <div className="space-y-1">
                        <p className="text-slate-300 leading-normal font-light">
                          <strong>basaho Classic Zafu Meditation Cushion:</strong> Ergonomic support for structural mindfulness resets.
                        </p>
                        <a
                          href="https://www.amazon.co.uk/dp/B01B81R34U?tag=123znl0a-21&"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 uppercase tracking-wider block"
                        >
                          Shop on Amazon →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 3: Glycemic Snacking & Metabolic Nutrition */}
                <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                  <div className="space-y-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      Nutrition & Food Prep
                    </span>
                    <h3 className="text-base font-display uppercase tracking-tight text-white font-bold">
                      Glycemic Snacking & Metabolism
                    </h3>
                    <div className="space-y-2 text-xs leading-relaxed text-slate-350">
                      <p className="font-semibold text-slate-200">Daily Win:</p>
                      <p className="font-light">Strategic, low-glycemic dietary choices to stabilize cellular energy and protect insulin sensitivity.</p>
                    </div>

                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-[11px] leading-relaxed">
                      <span className="font-semibold text-white block">Direct Digital Product:</span>
                      <p className="text-slate-400 font-light">
                        Structure your weekly grocery and macro workflows with The Master Meal Planning Guide (£24.00).
                      </p>
                      <Link 
                        to="/premium-guides/healthy-meal-planning-guide"
                        className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:underline uppercase font-mono tracking-wider pt-1"
                      >
                        Acquire Guide <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900 space-y-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">Vetted Kitchen & Accelerator Tools</span>
                    
                    <div className="space-y-2 text-[10px]">
                      {/* Kitchen Gadgets */}
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
                        <span className="text-white font-semibold">Ninja Foodi Dual Zone Air Fryer</span>
                        <p className="text-slate-400 text-[9px] leading-normal font-light">The gold standard for preparing low-oil, metabolic family meals.</p>
                        <a
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 uppercase block tracking-wider pt-0.5"
                        >
                          Shop on Amazon →
                        </a>
                      </div>

                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
                        <span className="text-white font-semibold">Moulinex Easy Fry & Grill (4.2L)</span>
                        <p className="text-slate-400 text-[9px] leading-normal font-light">Compact kitchen tool for single-person glycemic meal prep.</p>
                        <a
                          href="https://www.amazon.co.uk/dp/B09FQBKFQ6?tag=123znl08a-21"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 uppercase block tracking-wider pt-0.5"
                        >
                          Shop on Amazon →
                        </a>
                      </div>

                      {/* Biochemical Accelerators */}
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
                        <span className="text-white font-semibold">Zebora Marine Collagen</span>
                        <p className="text-slate-400 text-[9px] leading-normal font-light">Vetted supplement for gut-mitochondrial axis.</p>
                        <a
                          href="https://www.amazon.com/dp/B07Z8G2G2M?tag=123znl0e-20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 uppercase block tracking-wider pt-0.5"
                        >
                          Shop Affiliate Link →
                        </a>
                      </div>

                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
                        <span className="text-white font-semibold">Owala Insulated Water Bottle</span>
                        <p className="text-slate-400 text-[9px] leading-normal font-light">Maintain cellular hydration during eating windows.</p>
                        <a
                          href="https://www.amazon.com/dp/B085DV8C54?tag=123znl0e-20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 uppercase block tracking-wider pt-0.5"
                        >
                          Shop Affiliate Link →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB C: STEP 3 • OPTIMIZE THE 6 PILLARS */}
          {(activeTab === 'step3' || activeTab === 'clinician') && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="space-y-12"
            >
              {/* Tab Header Positioning */}
              <div className="text-left space-y-4 max-w-4xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold">
                  Step 3 of 3-Step Roadmap • Shared Decision Making
                </span>
                <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                  Step 3: Optimize the 6 Pillars Based on Hard Diagnostic Proof
                </h2>
                <p className="text-slate-350 text-sm md:text-base leading-relaxed font-light">
                  Raw biometric data is not a diagnosis. We make clinician partnership a mandatory operational protocol. Take your 2-page GP Consultation Template (PDF V2) to your doctor to review your 14-day vitals log and calibrate the 6 longevity pillars with absolute clinical certainty.
                </p>
              </div>

              {/* Primary Action Callout Card (Center-Aligned) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-cyan-500/10 backdrop-blur-md text-center max-w-3xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent pointer-events-none"></div>
                
                <div className="mx-auto w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-lg">
                  <Download size={24} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-display uppercase tracking-tight text-white font-black">
                    📥 Download Printable GP Consultation Template (PDF V2)
                  </h3>
                  <p className="text-slate-400 text-xs max-w-xl mx-auto leading-relaxed font-light">
                    Our structured, patient-held 2-page leave-behind features dedicated logging grids for personal health history, 14-day wearable metric baselines (resting HR, HRV, BP), and physician requisitions.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/clinician-copilot"
                    className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Open Clinician Co-Pilot Suite →
                  </Link>
                  <a
                    href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="clinical-baseline-consultation-template-v2.pdf"
                    className="inline-flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download PDF V2</span>
                  </a>
                </div>
              </div>

              {/* GP Integration Steps (3-Column Layout) */}
              <div className="space-y-6">
                <div className="border-b border-slate-900 pb-3 text-left">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Protocol Workflow
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">Step 1</span>
                    <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">1. Download & Print</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Print the baseline workbook template before your clinical appointment so you have a physical copy to reference.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">Step 2</span>
                    <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">2. Log Wearable Metrics</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Log 7 days of resting vital signs (HRV, deep sleep cycles, resting HR) from your smartwatch or scale onto the grid sheets.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">Step 3</span>
                    <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">3. Schedule Consultation</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Book an appointment with your general practitioner to co-evaluate and validate your diagnostic data collaboratively.
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinician Discussion Scripts (Interactive Accordion) */}
              <div className="space-y-6">
                <div className="border-b border-slate-900 pb-3 text-left">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <Compass size={14} className="text-indigo-400" />
                    Clinician Discussion Scripts
                  </h3>
                </div>

                <div className="max-w-4xl mx-auto space-y-3.5 text-left">
                  {/* Script 1 Accordion */}
                  <div className="border border-slate-900 rounded-2xl bg-slate-900/20 overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleScript(1)}
                      className="w-full p-5 flex items-center justify-between hover:bg-slate-900/40 text-left transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-display uppercase tracking-wider text-white font-bold">
                        Script A: How to Introduce Your Baseline
                      </span>
                      {activeScript === 1 ? <ChevronUp size={16} className="text-cyan-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {activeScript === 1 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="p-5 bg-slate-950/80 border-t border-slate-900 text-xs sm:text-sm leading-relaxed text-slate-300 font-light italic font-serif">
                            &ldquo;Doctor, I am tracking my lifestyle biometrics proactively to prevent chronic disease. I have logged my baseline wearable telemetry and would like to coordinate a Lola Vital Check 56 panel to establish my metabolic and vascular indicators.&rdquo;
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Script 2 Accordion */}
                  <div className="border border-slate-900 rounded-2xl bg-slate-900/20 overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleScript(2)}
                      className="w-full p-5 flex items-center justify-between hover:bg-slate-900/40 text-left transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-display uppercase tracking-wider text-white font-bold">
                        Script B: On Data Sovereignty & Collaboration
                      </span>
                      {activeScript === 2 ? <ChevronUp size={16} className="text-cyan-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {activeScript === 2 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="p-5 bg-slate-950/80 border-t border-slate-900 text-xs sm:text-sm leading-relaxed text-slate-300 font-light italic font-serif">
                            &ldquo;I maintain full ownership of my clinical results. I would like us to use this patient-held template as a collaborative care directive to track my healthy life expectancy over time.&rdquo;
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 3 PARALLEL TRACKS TO LONGEVITY (STRICT ADDITIVE SECTION)                  */}
        {/* ========================================================================= */}
        <section className="mt-20 pt-16 border-t border-slate-900 relative">
          {/* Ambient background flares */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold shadow-sm">
              <Sparkles size={12} className="text-cyan-400 animate-pulse" />
              <span>3 PARALLEL TRACKS TO LONGEVITY</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-white font-black">
              The Three Parallel Tracks to Biological Sovereignty
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
              True healthy life expectancy expansion is not linear. Maximum biological longevity requires running three parallel protocols simultaneously—daily physical hardware, continuous diagnostic radar, and targeted cellular nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Track 1: Performance & Movement */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1 relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Activity size={22} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 font-bold">
                    Track 1
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display uppercase tracking-tight font-black text-white group-hover:text-cyan-300 transition-colors">
                    Performance &amp; Movement
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400/90 mt-1">
                    Home Workouts, VO2 Max &amp; Muscle Mass
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Build functional muscle density, condition Zone 2 mitochondrial capacity, and stabilize postprandial glucose excursions through structured home routines.
                </p>

                {/* Highlighted Mind & Stress Management Focus */}
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <HeartPulse size={14} className="text-cyan-400 shrink-0" />
                    <span>Mind &amp; Stress Management (Core Input)</span>
                  </div>
                  <p className="text-[11px] text-slate-350 leading-relaxed">
                    Breathing resets (cyclic physiological sighing, box breathing) and Non-Sleep Deep Rest (NSDR) are prioritized as essential physiological drivers directly measured to up-regulate parasympathetic vagal tone, accelerate nocturnal HRV rebound, and suppress chronic cortisol.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <Link to="/fitness" className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1">
                  <span>Physical Protocols</span>
                  <ArrowRight size={13} />
                </Link>
                <Link to="/wellness" className="text-slate-400 hover:text-white font-medium">
                  Mind &amp; Stress Pillar →
                </Link>
              </div>
            </div>

            {/* Track 2: Healthspan & Diagnostic Radar */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/40 hover:border-amber-500/70 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1 relative group">
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-cyan-500 rounded-t-3xl opacity-80" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                    <FileText size={22} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-800/50 text-amber-300 font-bold">
                    Track 2 • The Key
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display uppercase tracking-tight font-black text-white group-hover:text-amber-300 transition-colors">
                    Healthspan &amp; Diagnostic Radar
                  </h3>
                  <p className="text-xs font-semibold text-amber-400/90 mt-1">
                    Clinician Co-Pilot Workbook &amp; GP Consultation Partnership
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Use our free Clinician Co-Pilot Workbook to log your 14-day vitals, select your regional blood panels (ApoB, HbA1c, hs-CRP), and co-evaluate your results with your GP.
                </p>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Shield size={14} className="text-amber-400 shrink-0" />
                    <span>Collaborative Physician Directives</span>
                  </div>
                  <p className="text-[11px] text-slate-350 leading-relaxed">
                    Deploy our 4-page interactive workbook and word-for-word physician scripts to turn your GP into a proactive longevity partner, logging 14-day vital telemetry before every consultation.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
                <Link
                  to="/clinician-copilot"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Open Clinician Co-Pilot ➔</span>
                </Link>
                <a
                  href="/assets/docs/clinical-baseline-consultation-workbook.pdf"
                  download
                  className="text-center text-[11px] text-slate-400 hover:text-white transition-colors py-1"
                >
                  Download Blank PDF ($0)
                </a>
              </div>
            </div>

            {/* Track 3: Metabolic Nutrition */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1 relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Award size={22} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-300 font-bold">
                    Track 3
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display uppercase tracking-tight font-black text-white group-hover:text-emerald-300 transition-colors">
                    Metabolic Nutrition
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400/90 mt-1">
                    Clean Fuel, Energy &amp; Weight Control
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Fuel cellular autophagy and protect vascular endothelia with clean, third-party NSF-certified nutraceuticals matched directly to your biological age and metabolic rate.
                </p>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Day 1 Universal Baseline Stack</span>
                  </div>
                  <p className="text-[11px] text-slate-350 leading-relaxed">
                    Begin with the core foundation: Vitamin D3 + K2 (MK-7), pure molecularly distilled Omega-3 EPA/DHA, and bioavailable Magnesium Glycinate/Malate, adjusting dosages only when supported by follow-up blood panel results.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <Link to="/nutrition" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">
                  <span>Metabolic Nutrition</span>
                  <ArrowRight size={13} />
                </Link>
                <Link to="/store" className="text-slate-400 hover:text-white font-medium">
                  Procure Stack →
                </Link>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
