import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, Play, Activity, ExternalLink, 
  ArrowRight, Star, HeartPulse, RefreshCw, Info,
  CheckCircle2, AlertTriangle, Compass, FileText,
  ChevronDown, ChevronUp, Download, Eye, Award, Sparkles
} from 'lucide-react';

export default function StartHere() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'phase1' | 'phase2' | 'clinician'>('phase1');
  const [activeScript, setActiveScript] = useState<number | null>(null);
  const [showVideoAlert, setShowVideoAlert] = useState<string | null>(null);

  // Animation variants for tab content transition
  const tabContentVariants = {
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

        {/* Elegant Centered 3-Tab Navigation Group */}
        <div className="flex justify-center mb-16 relative z-10">
          <div className="inline-flex p-2 bg-[#060a12]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl gap-2 overflow-x-auto scrollbar-none max-w-full shadow-2xl relative">
            <button
              onClick={() => setActiveTab('phase1')}
              className={`relative px-5 sm:px-6 py-3.5 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2.5 z-10 select-none group outline-none overflow-hidden ${
                activeTab === 'phase1'
                  ? 'text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {activeTab === 'phase1' && (
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
                  activeTab === 'phase1' 
                    ? 'text-cyan-300 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
                    : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                }`} 
              />
              <span>Phase 1: Diagnostic Baseline</span>
            </button>
            
            <button
              onClick={() => setActiveTab('phase2')}
              className={`relative px-5 sm:px-6 py-3.5 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2.5 z-10 select-none group outline-none overflow-hidden ${
                activeTab === 'phase2'
                  ? 'text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {activeTab === 'phase2' && (
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
                  activeTab === 'phase2' 
                    ? 'text-emerald-300 scale-110 rotate-180 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' 
                    : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                }`} 
              />
              <span>Phase 2: Daily Small Wins</span>
            </button>
            
            <button
              onClick={() => setActiveTab('clinician')}
              className={`relative px-5 sm:px-6 py-3.5 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2.5 z-10 select-none group outline-none overflow-hidden ${
                activeTab === 'clinician'
                  ? 'text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {activeTab === 'clinician' && (
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
                  activeTab === 'clinician' 
                    ? 'text-indigo-300 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' 
                    : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                }`} 
              />
              <span>Clinician Partnership Hub</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display Area */}
        <AnimatePresence mode="wait">
          
          {/* TAB A: DIAGNOSTIC BASELINE (PHASE 1) */}
          {activeTab === 'phase1' && (
            <motion.div
              key="phase1"
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
                    <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                      Phase 1: Establish Your Diagnostic Baseline
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light font-light">
                      True preventive medicine is an information-gathering game. Continuous biometric telemetry and epigenetic testing establish an &apos;Early Warning Radar&apos;—diagnosing subclinical physiological shifts early, before they become physical issues, to directly improve long-term longevity and daily quality of life.
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

          {/* TAB B: DAILY SMALL WINS (PHASE 2) */}
          {activeTab === 'phase2' && (
            <motion.div
              key="phase2"
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                      Phase 2 • Autonomic Optimization
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                      Phase 2: Daily Biophysical Inputs • Protecting Your Daily Quality of Life
                    </h2>
                    <p className="text-slate-350 text-sm md:text-base leading-relaxed font-light">
                      Daily behavioral choices are direct software updates for your cells. We combine frictionless, zero-cost behavioral habits with highly accessible, low-cost environmental accelerators to optimize your sleep, strength, and metabolic nutrition from Day 1.
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
                        to="/premium-guides"
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
                        to="/premium-guides"
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
                        to="/premium-guides"
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
                          href="https://123thenextlevel.com/"
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

          {/* TAB C: CLINICIAN PARTNERSHIP HUB */}
          {activeTab === 'clinician' && (
            <motion.div
              key="clinician"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="space-y-12"
            >
              {/* Tab Header Positioning */}
              <div className="text-left space-y-4 max-w-4xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold">
                  Shared Decision Making
                </span>
                <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                  Clinician Integration Hub • Safe, Collaborative Care
                </h2>
                <p className="text-slate-350 text-sm md:text-base leading-relaxed font-light">
                  Raw biometric data is not a diagnosis. We make clinician partnership a mandatory operational protocol. Our printable workbook and GP discussion scripts are designed to help you and your doctor co-evaluate your data safely.
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
                    📥 Download Printable GP-Ready Consultation Template (PDF)
                  </h3>
                  <p className="text-slate-400 text-xs max-w-xl mx-auto leading-relaxed font-light">
                    Our structured, patient-held workbook features dedicated logging grids for personal health history, wearable metric baselines (resting HR, HRV, sleep duration), and lab biomarker results.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="/assets/docs/clinical-baseline-consultation-template.pdf"
                    download="clinical-baseline-consultation-template.pdf"
                    className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Download Consultation Template Workbook
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

      </div>
    </div>
  );
}
