import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, Play, Activity, ExternalLink, 
  ArrowRight, Star, HeartPulse, RefreshCw, Info,
  CheckCircle2, AlertTriangle, Compass, FileText
} from 'lucide-react';

export default function StartHere() {
  const [activeTab, setActiveTab] = useState<'phase1' | 'phase2' | 'clinician'>('phase1');

  // Animation variants for tab content transition
  const tabContentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans pt-28 pb-20 relative overflow-hidden">
      {/* Background grid-lines styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0"></div>
      
      {/* Radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Workspace Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Elegant Centered 3-Tab Navigation Group */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-slate-900/60 backdrop-blur-xl border border-slate-900 rounded-2xl gap-1.5 overflow-x-auto scrollbar-none max-w-full shadow-2xl relative">
            <button
              onClick={() => setActiveTab('phase1')}
              className={`px-5 py-3 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'phase1'
                  ? 'bg-slate-950 text-cyan-400 border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-450 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Activity size={14} className={activeTab === 'phase1' ? 'text-cyan-400' : 'text-slate-500'} />
              Phase 1: Diagnostic Baseline
            </button>
            
            <button
              onClick={() => setActiveTab('phase2')}
              className={`px-5 py-3 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'phase2'
                  ? 'bg-slate-950 text-cyan-400 border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-450 hover:text-slate-200 border border-transparent'
              }`}
            >
              <RefreshCw size={14} className={activeTab === 'phase2' ? 'text-cyan-400' : 'text-slate-500'} />
              Phase 2: Daily Small Wins
            </button>
            
            <button
              onClick={() => setActiveTab('clinician')}
              className={`px-5 py-3 rounded-xl font-display uppercase tracking-wider text-[10px] sm:text-xs font-black transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'clinician'
                  ? 'bg-slate-950 text-cyan-400 border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-450 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Shield size={14} className={activeTab === 'clinician' ? 'text-cyan-400' : 'text-slate-500'} />
              Clinician Partnership Hub
            </button>
          </div>
        </div>

        {/* Tab Content Display Area */}
        <AnimatePresence mode="wait">
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
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
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
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-400/30 cursor-pointer">
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
                      <p className="text-xs text-slate-300 leading-relaxed font-light font-light">
                        Chronological age is just a calendar metric. Measuring genomic methylation calculates true biological age velocity versus calendar age to determine rate of decay.
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <Link
                        to="/health"
                        className="inline-flex justify-center items-center w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-center cursor-pointer"
                      >
                        Order Home Epigenetic Testing Kit →
                      </Link>
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
                      <a
                        href="https://referrals.lolahealth.com/NextLevel15"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      >
                        Secure Partner Lab Clinical Draw (£237) →
                      </a>
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

          {activeTab === 'phase2' && (
            <motion.div
              key="phase2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="space-y-8"
            >
              {/* Phase 2: Beautiful Dark Routing Placeholder */}
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/30 border border-slate-900 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none"></div>
                
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-xl">
                  <RefreshCw size={32} className="animate-spin-slow" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400">
                    Phase 2 Workspace • Simple Daily Habits
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                    Frictionless Day 1 Wins
                  </h2>
                  <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed font-light">
                    Establish physical and autonomic switches you can execute this second with zero equipment and zero cost. Tap into baseline cardiovascular efficiency, stress down-regulation, and glycemic snacking protocol details.
                  </p>
                </div>

                <div className="p-4 border border-amber-500/10 bg-slate-950/60 rounded-2xl text-xs text-slate-350 leading-relaxed font-light max-w-xl mx-auto flex items-start gap-3">
                  <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-left text-[11px] text-slate-400 leading-normal">
                    This section will carry detailed step-by-step guidelines for 10-Minute Mobility Walks, Vagal Tone Breathing Mindfulness audio tracks, and Glycemic Snacking choices.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('phase1')}
                    className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-slate-700 hover:border-slate-650 cursor-pointer"
                  >
                    ← Back to Phase 1: Diagnostic Baseline
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'clinician' && (
            <motion.div
              key="clinician"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="space-y-8"
            >
              {/* Clinician Partnership Hub: Beautiful Dark Routing Placeholder */}
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/30 border border-slate-900 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none"></div>
                
                <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-xl">
                  <Shield size={32} />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-400">
                    Clinician integration hub
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                    Clinician Partnership Hub
                  </h2>
                  <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed font-light">
                    Collaborate with your local medical practitioner using pre-formatted templates and shared decision-making guidelines to co-evaluate diagnostic biomarker datasets safely and effectively.
                  </p>
                </div>

                <div className="p-4 border border-indigo-500/10 bg-slate-950/60 rounded-2xl text-xs text-slate-350 leading-relaxed font-light max-w-xl mx-auto flex items-start gap-3">
                  <FileText size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-left text-[11px] text-slate-400 leading-normal">
                    This section will host printable consultation checklists, guideline documents for shared biometric assessment, and clinical communication templates to bring directly to your next GP visit.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="/assets/docs/clinical-baseline-consultation-template.pdf"
                    download="clinical-baseline-consultation-template.pdf"
                    className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
                  >
                    📥 Download Consultation Template PDF Directly
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
