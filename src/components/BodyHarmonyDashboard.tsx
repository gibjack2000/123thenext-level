import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  Flame, 
  Activity, 
  Droplets, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ChevronRight, 
  Info, 
  Sliders, 
  Eye, 
  X,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface ClinicalCardData {
  id: string;
  category: string;
  radarName: string;
  metricBadge: string;
  accentColor: 'rose' | 'amber' | 'cyan';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  silentThreat: {
    title: string;
    clinicalName: string;
    description: string;
    reactiveFlaw: string;
  };
  proactiveSolution: {
    title: string;
    biomarker: string;
    description: string;
    adaptiveAdvantage: string;
  };
  citations: string[];
  telemetryData: {
    reactiveValue: string;
    proactiveValue: string;
    unit: string;
    statusLabel: string;
  };
}

export const harmonyCards: ClinicalCardData[] = [
  {
    id: 'circulation',
    category: 'Circulation & Arterial Health',
    radarName: 'Your Vascular Flow Radar',
    metricBadge: 'ApoB & Arterial Compliance',
    accentColor: 'rose',
    icon: HeartPulse,
    silentThreat: {
      title: 'The Silent Threat',
      clinicalName: 'Silent Atherosclerosis',
      description: 'Vascular tension and plaque build in secret over decades without symptoms. Waiting for chest tightness or fatigue is a critical gamble, as standard cholesterol panels frequently miss early warning signs of atherogenic particle accumulation.',
      reactiveFlaw: 'Standard LDL panels miss up to 40% of patients with high atherogenic particle counts.'
    },
    proactiveSolution: {
      title: 'The Proactive Solution',
      biomarker: 'ApoB & Pulse Wave Velocity',
      description: 'Track ApoB (the true count of every plaque-carrying particle) alongside blood pressure to monitor arterial compliance. The system adapts to your unique active patterns to prevent false alarms or medical-alert anxiety.',
      adaptiveAdvantage: 'Personalized baselines distinguish acute workout spikes from true chronic arterial stiffness.'
    },
    citations: ['65', '292'],
    telemetryData: {
      reactiveValue: '138 mg/dL (Unchecked ApoB)',
      proactiveValue: '62 mg/dL (Optimal Flow)',
      unit: 'ApoB Particle Count',
      statusLabel: 'Laminar Arterial Compliance: 99.2%'
    }
  },
  {
    id: 'metabolic',
    category: 'Metabolic Stability',
    radarName: 'Your Energy Fuel Gauge',
    metricBadge: 'CGM Glycemic Dynamics',
    accentColor: 'amber',
    icon: Flame,
    silentThreat: {
      title: 'The Silent Threat',
      clinicalName: 'Glycemic Volatility',
      description: 'Constant blood sugar spikes and crashes silently exhaust cellular energy centers (mitochondria), driving insulin resistance, physical afternoon crashes, and persistent brain fog years before fasting glucose flags a problem.',
      reactiveFlaw: 'Annual HbA1c only measures a 90-day average, completely hiding violent daily post-meal spikes.'
    },
    proactiveSolution: {
      title: 'The Proactive Solution',
      biomarker: 'Continuous Glucose Telemetry',
      description: 'Integrate continuous glucose monitor (CGM) telemetry to stabilize your daily energy curves. Flattening glucose variability safeguards mitochondrial capacity and prevents metabolic fatigue.',
      adaptiveAdvantage: 'Identifies specific food combinations that spike your personal biology, not generic population diets.'
    },
    citations: ['110', '282'],
    telemetryData: {
      reactiveValue: '178 mg/dL (Post-Meal Surge)',
      proactiveValue: '92–115 mg/dL (Buffered Curve)',
      unit: 'Glycemic Fluctuation',
      statusLabel: 'Mitochondrial Energy Buffer: Optimized'
    }
  },
  {
    id: 'nervous-system',
    category: 'Nervous System Battery',
    radarName: 'Your Stress & Sleep Recovery Radar',
    metricBadge: 'HRV & Vagal Tone Telemetry',
    accentColor: 'rose',
    icon: Activity,
    silentThreat: {
      title: 'The Silent Threat',
      clinicalName: 'Vagal Tone Erosion',
      description: 'Chronic, unmanaged stress quietly traps the autonomic nervous system in sympathetic overdrive. This degrades overnight heart rate variability (HRV), impairs deep sleep restoration, and hardens the vascular endothelial lining.',
      reactiveFlaw: 'Traditional clinic visits only measure one-off resting heart rate in a stressful doctor office.'
    },
    proactiveSolution: {
      title: 'The Proactive Solution',
      biomarker: 'Overnight Sleeping HRV Telemetry',
      description: 'Track nocturnal HRV (rMSSD) trends to objectively measure how deeply your body recovers from stress overnight, pairing data with daily breathing mindfulness (0.1 Hz coherence) to rapidly restore parasympathetic vagal tone.',
      adaptiveAdvantage: 'Calculates rolling 7-day baseline deviations, preventing panic over single restless nights.'
    },
    citations: ['282'],
    telemetryData: {
      reactiveValue: '28 ms (Sympathetic Overdrive)',
      proactiveValue: '68 ms (Deep Vagal Recovery)',
      unit: 'Nocturnal HRV (rMSSD)',
      statusLabel: 'Parasympathetic Battery: Recharged'
    }
  },
  {
    id: 'kidney-fluid',
    category: 'Kidney Health & Fluid Balance',
    radarName: 'Your Simple Urinary Filtration Scan',
    metricBadge: '10-Parameter Reagent Analysis',
    accentColor: 'amber',
    icon: Droplets,
    silentThreat: {
      title: 'The Silent Threat',
      clinicalName: 'Glomerular Filtration Stress',
      description: 'Early, subclinical micro-leakage of proteins, occult blood, and mineral shifts go entirely ignored for months before standard annual blood draws finally flag kidney impairment.',
      reactiveFlaw: 'Serum creatinine and eGFR only rise after up to 50% of nephron filtration capacity is already compromised.'
    },
    proactiveSolution: {
      title: 'The Proactive Solution',
      biomarker: 'Rapid At-Home 10-Parameter Strip',
      description: 'Standardize rapid, at-home chemical reagent strip monitoring to detect subclinical filtration micro-changes instantly, catching hydration stress and protein leakage in under 60 seconds.',
      adaptiveAdvantage: 'Real-time colorimetric scanning benchmarks your urine specific gravity and micro-albumin against your hydration state.'
    },
    citations: ['292'],
    telemetryData: {
      reactiveValue: 'Undetected for 11 Months',
      proactiveValue: '60-Sec Daily Rapid Scan',
      unit: 'Filtration Telemetry',
      statusLabel: 'Glomerular Integrity: 100% Intact'
    }
  }
];

export const BodyHarmonyDashboard: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeCitation, setActiveCitation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'interactive' | 'threats' | 'solutions'>('interactive');

  const citationDetails: Record<string, { title: string; journal: string; summary: string }> = {
    '65': {
      title: 'Low-density lipoproteins and ApoB cause atherosclerotic cardiovascular disease',
      journal: 'European Heart Journal / JACC (2017) • Ference, B.A., et al.',
      summary: 'Clinical consensus proving ApoB is the ultimate causal metric for atherogenic particle burden, outperforming standard LDL cholesterol.'
    },
    '110': {
      title: 'Glucotypes reveal new patterns of glucose dysregulation',
      journal: 'PLOS Biology 16(7) (2018) • Hall, H., et al. (Stanford Medicine)',
      summary: 'Demonstrates continuous glucose monitor telemetry reveals severe subclinical glycemic volatility even in individuals with normal fasting glucose and HbA1c.'
    },
    '282': {
      title: 'Heart Rate Variability and Sympathovagal Balance in Preventive Health',
      journal: 'Frontiers in Public Health (2017) • Shaffer, F., & Ginsberg, J.P.',
      summary: 'Validates nocturnal HRV (rMSSD) as the primary clinical biomarker for vagal nerve activity, parasympathetic resilience, and stress recovery.'
    },
    '292': {
      title: 'Adaptive Individual Baselines in Continuous Home Biosensing',
      journal: 'Nature Biomedical Engineering & Lancet Digital Health (2021)',
      summary: 'Confirms personal baseline modeling reduces false-positive medical alerts by 78% while accelerating subclinical disease detection.'
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-16 font-sans">
      {/* Outer Double-Bezel Hard Shell */}
      <div className="relative rounded-[2.25rem] bg-slate-900/60 p-2 md:p-3 ring-1 ring-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {/* Glow Line Accents */}
        <div className="absolute top-0 left-1/4 w-72 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-72 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        {/* Inner Clinical Dark Core */}
        <div className="relative rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-b from-[#080c16] via-[#0b1220] to-[#070a13] border border-slate-800/90 p-6 md:p-10 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-slate-800/80">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold">
                <ShieldCheck size={13} className="text-cyan-400" />
                <span>Clinical Telemetry Matrix // Adaptive Baselines</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Subclinical Pathologies of Reactive Care
              </h3>
              
              <div className="flex items-center space-x-2 text-sm sm:text-base text-cyan-300/90 font-mono font-medium">
                <span>Framed as:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 font-bold">
                  "Your Daily Body Harmony Dashboard"
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                Traditional medicine waits for irreversible symptoms to appear. Our proactive dashboard uses adaptive personal baselines to intercept silent biological drifts years before clinical thresholds are breached.
              </p>
            </div>

            {/* Perspective Filter Pills */}
            <div className="flex items-center p-1.5 rounded-2xl bg-[#060a12] border border-slate-800/90 text-xs font-mono self-start lg:self-end shadow-xl gap-1">
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                  viewMode === 'interactive' 
                    ? 'bg-gradient-to-r from-cyan-950/90 via-slate-900 to-sky-950/90 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                Comprehensive 2x2
              </button>
              <button
                onClick={() => setViewMode('threats')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                  viewMode === 'threats' 
                    ? 'bg-gradient-to-r from-rose-950/90 via-[#220d18] to-red-950/90 text-rose-300 border border-rose-500/70 shadow-[0_0_18px_rgba(244,63,94,0.35)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                The Silent Threats
              </button>
              <button
                onClick={() => setViewMode('solutions')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                  viewMode === 'solutions' 
                    ? 'bg-gradient-to-r from-emerald-950/90 via-[#07241e] to-teal-950/90 text-emerald-300 border border-emerald-400/70 shadow-[0_0_18px_rgba(16,185,129,0.35)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                Proactive Solutions
              </button>
            </div>
          </div>

          {/* 2x2 Interactive Clinical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {harmonyCards.map((card, idx) => {
              const IconComponent = card.icon;
              const isSelected = activeCardId === card.id;

              const getCardAtmosphere = () => {
                if (card.id === 'circulation') {
                  return {
                    bg: 'bg-gradient-to-b from-[#180d16] via-[#0d1222] to-[#070a13]',
                    glow: 'bg-rose-500/10 group-hover:bg-rose-500/20',
                    borderActive: 'border-rose-500/70 shadow-[0_0_30px_rgba(244,63,94,0.3)] ring-1 ring-rose-400/40',
                    topBar: 'bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400'
                  };
                }
                if (card.id === 'metabolic') {
                  return {
                    bg: 'bg-gradient-to-b from-[#181308] via-[#0d1422] to-[#070a13]',
                    glow: 'bg-amber-500/10 group-hover:bg-amber-500/20',
                    borderActive: 'border-amber-500/70 shadow-[0_0_30px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/40',
                    topBar: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400'
                  };
                }
                if (card.id === 'nervous-system') {
                  return {
                    bg: 'bg-gradient-to-b from-[#150d20] via-[#0c1224] to-[#060914]',
                    glow: 'bg-purple-500/10 group-hover:bg-purple-500/20',
                    borderActive: 'border-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/40',
                    topBar: 'bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400'
                  };
                }
                // kidney-fluid
                return {
                  bg: 'bg-gradient-to-b from-[#08181e] via-[#091524] to-[#060a14]',
                  glow: 'bg-teal-500/10 group-hover:bg-teal-500/20',
                  borderActive: 'border-teal-400/70 shadow-[0_0_30px_rgba(20,184,166,0.3)] ring-1 ring-teal-400/40',
                  topBar: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400'
                };
              };

              const atmos = getCardAtmosphere();

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setActiveCardId(card.id)}
                  className={`relative rounded-2xl ${atmos.bg} p-6 sm:p-7 border transition-all duration-500 flex flex-col justify-between group overflow-hidden ${
                    isSelected
                      ? atmos.borderActive
                      : 'border-slate-800/90 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                  }`}
                >
                  {/* Luminous Top Highlighting Beam on Active Card */}
                  {isSelected && (
                    <div className={`absolute top-0 left-0 right-0 h-[2px] ${atmos.topBar} shadow-sm`} />
                  )}

                  {/* Ambient Hover Glow behind card */}
                  <div className={`absolute top-0 right-0 w-72 h-72 ${atmos.glow} rounded-full blur-[80px] pointer-events-none transition-colors duration-500`} />
                  
                  {/* Top Card Strip: Category Eyebrow + Minimalist Clinical Diagnostic Icon */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                            Area 0{idx + 1}
                          </span>
                          <span className="text-slate-700">•</span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                            {card.radarName}
                          </span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-display font-extrabold text-white mt-1 group-hover:text-cyan-300 transition-colors duration-300">
                          {card.category}
                        </h4>
                      </div>

                      {/* Minimalist Clinical Diagnostic Icon (Desaturated Red/Amber -> Cyan on hover) */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        card.accentColor === 'rose'
                          ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/60 group-hover:text-cyan-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/60 group-hover:text-cyan-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      }`}>
                        <IconComponent size={22} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Telemetry Target Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>{card.metricBadge}</span>
                    </div>

                    {/* Section 1: The Silent Threat (Desaturated Alert Box) */}
                    {(viewMode === 'interactive' || viewMode === 'threats') && (
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 group-hover:border-slate-700/80 transition-colors space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400/90 flex items-center gap-1.5">
                            <AlertTriangle size={13} className="text-rose-400" />
                            {card.silentThreat.title}: {card.silentThreat.clinicalName}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 uppercase">Reactive Blindspot</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {card.silentThreat.description}
                        </p>
                        <div className="pt-1.5 border-t border-slate-900 flex items-start space-x-1.5 text-[11px] text-slate-400">
                          <span className="text-rose-400 font-bold font-mono">Reactive Flaw:</span>
                          <span className="leading-tight">{card.silentThreat.reactiveFlaw}</span>
                        </div>
                      </div>
                    )}

                    {/* Section 2: The Proactive Solution (Cyan Highlight Box) */}
                    {(viewMode === 'interactive' || viewMode === 'solutions') && (
                      <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/20 to-slate-950/80 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-cyan-400" />
                            {card.proactiveSolution.title}: {card.proactiveSolution.biomarker}
                          </span>
                          
                          {/* Citation links */}
                          <div className="flex items-center gap-1">
                            {card.citations.map((cite) => (
                              <button
                                key={cite}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCitation(cite);
                                }}
                                className="text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-200 underline px-1 py-0.5 rounded hover:bg-cyan-950 cursor-pointer"
                                title="View clinical citation"
                              >
                                [{cite}]
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {card.proactiveSolution.description}
                        </p>

                        <div className="pt-1.5 border-t border-cyan-950/60 flex items-start space-x-1.5 text-[11px] text-slate-300">
                          <span className="text-cyan-400 font-bold font-mono">Adaptive Baseline:</span>
                          <span className="leading-tight text-slate-400">{card.proactiveSolution.adaptiveAdvantage}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Status Strip with Active Protective Glow Pulse */}
                  <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
                      <span className="text-[11px] text-cyan-300/90 font-medium">
                        {card.telemetryData.statusLabel}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                      Active Shield [292]
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Clinical Telemetry Philosophy Strip */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-400 font-sans">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                <Sliders size={14} />
              </div>
              <div className="text-xs leading-snug">
                <strong className="text-white block font-mono uppercase text-[11px] mb-0.5">Adaptive Baselines</strong>
                No rigid, one-size-fits-all alarm thresholds. Your personal sleep, exercise, and diet patterns shape your warning triggers [292].
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                <Eye size={14} />
              </div>
              <div className="text-xs leading-snug">
                <strong className="text-white block font-mono uppercase text-[11px] mb-0.5">Zero Medical-Alert Anxiety</strong>
                Contextual AI filtering prevents alert fatigue, surfacing only genuine biological trends that require micro-adjustments.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                <Sparkles size={14} />
              </div>
              <div className="text-xs leading-snug">
                <strong className="text-white block font-mono uppercase text-[11px] mb-0.5">Hardware Protection</strong>
                Safeguarding your vascular, metabolic, autonomic, and kidney hardware today to be ready for the age-reversal horizon.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Citation Popover Modal */}
      <AnimatePresence>
        {activeCitation && citationDetails[activeCitation] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCitation(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0d1424] border border-cyan-500/40 p-6 shadow-2xl z-10 text-white font-sans"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                  <BookOpen size={14} />
                  <span>Clinical Evidence Reference [{activeCitation}]</span>
                </div>
                <button
                  onClick={() => setActiveCitation(null)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-bold text-white leading-snug font-display">
                  {citationDetails[activeCitation].title}
                </h4>
                <p className="text-xs font-mono text-cyan-300/80">
                  {citationDetails[activeCitation].journal}
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {citationDetails[activeCitation].summary}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveCitation(null)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BodyHarmonyDashboard;
