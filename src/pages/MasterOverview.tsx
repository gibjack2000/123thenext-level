import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Activity, 
  FileText, 
  Award, 
  ArrowRight, 
  Download, 
  Stethoscope, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  HeartPulse, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Dna, 
  Zap, 
  Compass, 
  ShieldAlert, 
  ExternalLink 
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';

interface PillarCardData {
  id: string;
  number: number;
  name: string;
  theme: string;
  icon: string;
  shortDesc: string;
  deepDive: {
    coreMetric: string;
    actionableHabit: string;
    clinicalTarget: string;
  };
  link: string;
  tagColor: string;
}

const PILLARS_DATA: PillarCardData[] = [
  {
    id: 'performance',
    number: 1,
    name: 'Performance & Movement',
    theme: 'Focus: Home Workouts, VO2 Max & Muscle Mass',
    icon: '⚡',
    shortDesc: 'Build functional physical hardware. Master progressive home workouts, elevate cardiorespiratory VO2 Max, and preserve critical muscle mass to protect against age-related frailty.',
    deepDive: {
      coreMetric: 'Peak VO2 Max (ml/kg/min) & Grip Strength Dyno',
      actionableHabit: '3x Weekly Zone 2 Cardio (45 mins) + 2x Compound Heavy Resistance Training',
      clinicalTarget: 'Top 10th percentile cardiorespiratory fitness for biological age'
    },
    link: '/fitness',
    tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60'
  },
  {
    id: 'nutrition',
    number: 2,
    name: 'Metabolic Nutrition',
    theme: 'Focus: Clean Fuel, Energy & Weight Control',
    icon: '🥗',
    shortDesc: 'Fuel your biological machinery with clean energy. Optimize whole-food nutrition, sustain steady all-day energy, and achieve healthy weight control without restrictive dieting.',
    deepDive: {
      coreMetric: 'Continuous Glucose AUC & Fasting Insulin (µIU/mL)',
      actionableHabit: '10-minute post-prandial walks, fiber-first meal order, and 14-hour overnight fasts',
      clinicalTarget: 'Fasting glucose <85 mg/dL; HbA1c <5.2%; Fasting insulin <4.5 µIU/mL'
    },
    link: '/nutrition',
    tagColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60'
  },
  {
    id: 'wellness',
    number: 3,
    name: 'Mind & Stress Management',
    theme: 'Focus: Breathing Resets, Cortisol & Deep Sleep',
    icon: '🧠',
    shortDesc: 'Restore autonomic calm and build stress resilience. Deploy structured breathing resets, suppress chronic cortisol, and maximize restorative deep sleep.',
    deepDive: {
      coreMetric: 'Overnight RMSSD HRV (ms) & Deep Sleep Architecture (%)',
      actionableHabit: '10-minute daily NSDR (Non-Sleep Deep Rest) & cyclic physiological sighing',
      clinicalTarget: 'Nightly HRV trending at or above historical rolling 30-day baseline'
    },
    link: '/wellness',
    tagColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60'
  },
  {
    id: 'social',
    number: 4,
    name: 'Connection & Social Wellbeing',
    theme: 'Focus: Relationships, Purpose & Community',
    icon: '🏛️',
    shortDesc: 'Cultivate human connection as an essential longevity pillar. Nurture supportive relationships, intentional life purpose, and reciprocal community bonds.',
    deepDive: {
      coreMetric: 'Social Reciprocity Index & Cortisol Diurnal Slope',
      actionableHabit: 'Weekly collaborative group workouts & intentional reciprocal accountability circles',
      clinicalTarget: 'Sustained parasympathetic social engagement and positive diurnal rhythm'
    },
    link: '/blog-post-socio-architecture',
    tagColor: 'text-blue-400 bg-blue-950/60 border-blue-800/60'
  },
  {
    id: 'womens-health',
    number: 5,
    name: "Women's Health & Hormones",
    theme: 'Focus: Hormonal Balance & Long-Term Vitality',
    icon: '🌸',
    shortDesc: 'Evidence-based medicine calibrated to female biology. Balance reproductive hormones, safeguard ovarian reserve, and protect cardiovascular, cognitive, and bone vitality across all life stages.',
    deepDive: {
      coreMetric: 'Estradiol-to-Progesterone ratio & DEXA T-Score',
      actionableHabit: 'Cycle-synced resistance volume, creatine monohydrate, and bioidentical endocrine support',
      clinicalTarget: 'Optimal lipid/glycemic resilience through perimenopause transition'
    },
    link: '/blog-post-womens-health',
    tagColor: 'text-rose-400 bg-rose-950/60 border-rose-800/60'
  },
  {
    id: 'science',
    number: 6,
    name: 'Healthspan & Diagnostic Radar',
    theme: 'Clinician Co-Pilot Workbook & GP Consultation Partnership',
    icon: '🩸',
    shortDesc: 'Use our free Clinician Co-Pilot Workbook to log your 14-day vitals, select your regional blood panels (ApoB, HbA1c, hs-CRP), and co-evaluate your results with your GP.',
    deepDive: {
      coreMetric: 'ApoB (<70 mg/dL), hs-CRP (<0.5 mg/L), DNA Methylation Pace',
      actionableHabit: '14-Day Vitals Log, Clinician Co-Pilot Workbook & Bi-annual blood draws',
      clinicalTarget: 'DunedinPACE biological decay rate <0.80 years aged per calendar year'
    },
    link: '/clinician-copilot',
    tagColor: 'text-amber-400 bg-amber-950/60 border-amber-800/60'
  }
];

export const MasterOverview: React.FC = () => {
  const { market, setMarket } = useMarket();
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<string | null>('performance');

  const toggleExpand = (id: string) => {
    setExpandedCard(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-28 pb-20 relative overflow-hidden">
      
      {/* Background gridlines styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
      
      {/* Ambient background flares */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">

        {/* ========================================================================= */}
        {/* SECTION A: HERO BANNER                                                    */}
        {/* ========================================================================= */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span>THE MASTER BLUEPRINT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight uppercase">
            THE BIG PICTURE:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
              How Your Longevity Engine Works
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A Unified Blueprint Connecting Daily Habits, Clinical Biomarkers, and Epigenetic Reversal
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Human aging is not an unavoidable lottery of decay. It is an engineering challenge governed by clear biological feedback loops. By keeping your physical hardware pristine through daily discipline and diagnostic telemetry today, you secure the vitality required to run tomorrow’s cellular rejuvenation software.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/quiz"
              className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
            >
              <span>🎯 Take 5-Minute Quiz</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/clinician-copilot"
              className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <span>🩺 Clinician Co-Pilot Workbook</span>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION B: THE 3-TIER SYSTEM ARCHITECTURE                                  */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold bg-indigo-950/40 border border-indigo-800/50 px-3 py-1 rounded-full">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-white font-black">
              The 3-Tier Longevity Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl mx-auto">
              How the biological layers connect from ground-level daily choices up to cellular reprogramming.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* Tier 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Activity size={24} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300 font-bold">
                    Tier 1 • Foundation
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-display uppercase tracking-tight font-black text-white group-hover:text-cyan-300 transition-colors">
                    Daily Biological Hardware
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400/90 mt-1">
                    Physical Frame, Metabolic Fuel &amp; Electrical Tone
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  The chassis of human longevity. Includes high-capacity VO2 max conditioning, skeletal muscle mass preservation, postprandial glucose spike mitigation, vagal tone calibration via breathing mindfulness, and reciprocal social architectures.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Integrated Pillars:</span>
                  <p className="text-slate-350 text-[11px] leading-relaxed">
                    Performance &amp; Movement • Metabolic Nutrition • Mind &amp; Stress Management • Connection &amp; Social Wellbeing
                  </p>
                </div>
              </div>
              <Link to="/fitness" className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5">
                <span>Explore Hardware Protocols</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-rose-500/30 hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                    <HeartPulse size={24} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-950 border border-rose-800/60 text-rose-300 font-bold">
                    Tier 2 • Calibration
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-display uppercase tracking-tight font-black text-white group-hover:text-rose-300 transition-colors">
                    Biology-Specific Calibration
                  </h3>
                  <p className="text-xs font-semibold text-rose-400/90 mt-1">
                    Women's Health &amp; Hormones • Balance &amp; Long-Term Vitality
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Precision biological calibration tailored to sex-specific endocrine pathways. Protects hormonal balance, maintains estrogen-progesterone neuroprotection, shields bone mineral density, and stabilizes metabolic rate through all life stages.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">Integrated Pillars:</span>
                  <p className="text-slate-350 text-[11px] leading-relaxed">
                    Women's Health &amp; Hormones • Hormonal Balance &amp; Long-Term Vitality
                  </p>
                </div>
              </div>
              <Link to="/blog-post-womens-health" className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5">
                <span>Explore Endocrine Science</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Dna size={24} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-950 border border-amber-800/60 text-amber-300 font-bold">
                    Tier 3 • The Horizon
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-display uppercase tracking-tight font-black text-white group-hover:text-amber-300 transition-colors">
                    Diagnostic Radar &amp; Epigenetics
                  </h3>
                  <p className="text-xs font-semibold text-amber-400/90 mt-1">
                    Healthspan &amp; Diagnostic Radar • Clinical Blood Panels &amp; Biological Age
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Continuous objective telemetry replacing blind hope. Tracking core tri-markers (ApoB, HbA1c, hs-CRP) and full cellular panels, paired with epigenetic methylation clocks to ensure clean cellular hardware ready for future age-reversal breakthroughs.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Integrated Pillars:</span>
                  <p className="text-slate-350 text-[11px] leading-relaxed">
                    Healthspan &amp; Diagnostic Radar • Clinician Co-Pilot • Biological Age Clocks
                  </p>
                </div>
              </div>
              <Link to="/science" className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5">
                <span>Explore Epigenetic Engine</span>
                <ArrowRight size={13} />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION C: THE 6-PILLAR INTERCONNECTION MATRIX                            */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-800/50 px-3 py-1 rounded-full">
              INTERCONNECTION MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-white font-black">
              The 6 Core Longevity Protocols
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl mx-auto">
              Tap any pillar to reveal clinical targets, actionable daily habits, and primary diagnostic metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {PILLARS_DATA.map((pillar) => {
              const isExpanded = expandedCard === pillar.id;

              return (
                <div 
                  key={pillar.id}
                  className={`p-6 rounded-3xl bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between space-y-5 shadow-xl ${
                    isExpanded 
                      ? 'border-cyan-500/70 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                        {pillar.icon}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-bold ${pillar.tagColor}`}>
                        Pillar {pillar.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {pillar.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        {pillar.theme}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {pillar.shortDesc}
                    </p>

                    {/* Expandable Deep Dive Area */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-800 space-y-2.5 text-xs text-slate-300 animate-fadeIn">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                            Key Biomarker / Metric:
                          </span>
                          <span className="text-white text-xs">{pillar.deepDive.coreMetric}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                            Daily Action Habit:
                          </span>
                          <span className="text-slate-350 text-xs">{pillar.deepDive.actionableHabit}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                            Clinical Target:
                          </span>
                          <span className="text-slate-350 text-xs">{pillar.deepDive.clinicalTarget}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleExpand(pillar.id)}
                      className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Less Detail' : 'View Clinical Metrics'}</span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    <Link
                      to={pillar.link}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>{pillar.link === '/clinician-copilot' ? 'Open Clinician Co-Pilot' : 'Pillar Deep Dive'}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION D: MULTI-MARKET DIAGNOSTIC GUIDANCE                               */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 text-left shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Stethoscope size={13} className="text-cyan-400" />
                <span>LOCALIZED CLINICAL PHLEBOTOMY RADAR</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
                Direct-Access Diagnostic Blood Panels
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Skip gatekeeping and long appointment queues. Procure physician-reviewed blood baselines through accredited phlebotomy networks localized for your country.
              </p>
            </div>

            {/* Market Switcher Selector */}
            <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 rounded-full p-1.5 shrink-0 shadow-inner">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold px-2">Active:</span>
              <button
                type="button"
                onClick={() => setMarket('US')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  market === 'US' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUS className="w-3.5 h-2.5" />
                <span>US</span>
              </button>
              <button
                type="button"
                onClick={() => setMarket('UK')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  market === 'UK' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUK className="w-3.5 h-2.5" />
                <span>UK</span>
              </button>
              <button
                type="button"
                onClick={() => setMarket('ES')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  market === 'ES' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagES className="w-3.5 h-2.5" />
                <span>ES</span>
              </button>
            </div>
          </div>

          {/* 3 Regional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* US Card */}
            <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              market === 'US' 
                ? 'bg-slate-950 border-cyan-500/60 shadow-xl shadow-cyan-500/10' 
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlagUS className="w-5 h-3.5" />
                    <span className="font-bold text-white text-sm">United States</span>
                  </div>
                  {market === 'US' && (
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800 font-bold uppercase">
                      Current Market
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white">HealthLabs Direct Lab Access</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Doctor-free blood orders drawn at over 4,500 Quest Diagnostics and Labcorp locations across the US.
                </p>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    <span>Comprehensive Cellular Biomarker Map</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    <span>Standalone ApoB, HbA1c &amp; hs-CRP Requisitions</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://www.healthlabs.com/?affiliate=123znl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
              >
                <span>View US Requisitions</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* UK Card */}
            <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              market === 'UK' 
                ? 'bg-slate-950 border-cyan-500/60 shadow-xl shadow-cyan-500/10' 
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlagUK className="w-5 h-3.5" />
                    <span className="font-bold text-white text-sm">United Kingdom</span>
                  </div>
                  {market === 'UK' && (
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800 font-bold uppercase">
                      Current Market
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white">LOLA Health Vital Check 56</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nationwide home phlebotomy visits and partner clinic network covering all 56 essential longevity biomarkers.
                </p>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    <span>Lola Vital Check 56 Biomarker Master Panel</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    <span>Home Phlebotomy &amp; Clinical Analysis</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://snwbl.io/out/NcealZ11"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
              >
                <span>View UK Panels</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Spain Card */}
            <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              market === 'ES' 
                ? 'bg-slate-950 border-cyan-500/60 shadow-xl shadow-cyan-500/10' 
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlagES className="w-5 h-3.5" />
                    <span className="font-bold text-white text-sm">Spain &amp; EU</span>
                  </div>
                  {market === 'ES' && (
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800 font-bold uppercase">
                      Current Market
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white">Melio / SaludOnNet España</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Megalab and Unilabs network across Madrid, Barcelona, Valencia, and nationwide clinical centers.
                </p>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    <span>Melio Vital Check ES Complete Longevity Draw</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    <span>SaludOnNet Direct Diagnostic Requisitions</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://www.melio.es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
              >
                <span>View Spain Requisitions</span>
                <ExternalLink size={13} />
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION E: FRICTIONLESS NEXT-STEP ACTIONS                                  */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
              NEXT-STEP TRAJECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-white font-black">
              Start Transforming Your Biology Right Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Zero risk, zero paywalls. Select your preferred onboarding action to transition immediately from guessing to total biological certainty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
            {/* Button 1 */}
            <Link
              to="/quiz"
              className="w-full sm:w-auto py-4 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>🎯 Take 5-Minute Quiz</span>
              <ArrowRight size={14} />
            </Link>

            {/* Button 2 */}
            <Link
              to="/clinician-copilot"
              className="w-full sm:w-auto py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>🩺 Clinician Co-Pilot Workbook</span>
              <ArrowRight size={14} />
            </Link>

            {/* Button 3 */}
            <a
              href="/assets/docs/the-next-level-lifespan-v7.pdf"
              download
              className="w-full sm:w-auto py-4 px-6 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold rounded-xl text-center text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Download size={14} className="text-cyan-400" />
              <span>📘 Free Longevity Blueprint (PDF)</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-500 font-mono italic">
            🔒 Backed by clinical peer-reviewed geroscience. No credit card required.
          </p>
        </section>

      </div>
    </div>
  );
};

export default MasterOverview;
