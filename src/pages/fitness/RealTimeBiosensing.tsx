import React, { useEffect } from 'react';
import { ArrowLeft, Activity, Microscope, Zap, Info, ExternalLink, Droplets, FlaskConical, Binary, Sparkles, Target, BookOpen, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';

export default function RealTimeBiosensing() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('rtb_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0D5N6X8Z2',
    uk: 'https://amazon.co.uk/dp/B0D5N6X8Z2',
    levels: 'https://www.levels.com/',
    ketomojo: 'https://keto-mojo.com/'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-emerald-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/fitness" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Fitness Hub</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Sweat-Based Discovery
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            {t('rtb_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-emerald-500/50 pl-8 text-left"
          >
            {t('rtb_intro')} In plain English, biosensors pull tiny drops of sweat from your pores to track real-time biological markers like lactate, sodium levels, and stress hormones.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-32">
        
        {/* Core Layout: Overview & Interactive Infographic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          
          {/* Detailed Explanations */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Plain English Overview */}
            <div className="bg-slate-900/50 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">What is Real-Time Biosensing?</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                While heart rate trackers measure structural load, biosensors read biochemistry. They analyze biological fluids on the surface of your skin to check your metabolic and hydration status without blood tests.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                During exercise, your muscle metabolism changes. By drawing sweat into a microchannel patch, biosensors use specialized enzymes to read <strong>Lactate</strong> (fatigue accumulation), <strong>Electrolytes</strong> (sodium/potassium ratios for muscle firing), and <strong>Cortisol</strong> (stress load).
              </p>
            </div>

            {/* Everyday Symptoms of Metabolic Stress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Lactate Accumulation Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Intense muscle burn accompanied by rapid loss of power.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Breathing heavily while struggling to maintain speed.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Prolonged muscle soreness lasting days after exercise.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  Hydration & Cortisol Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Sudden muscle cramps, dry mouth, or salt crust on skin.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Dull post-workout headaches indicating sodium depletion.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Waking up tired or staying in a hyper-wired stress loop.
                  </li>
                </ul>
              </div>
            </div>

            {/* The Golden Rule & Myth vs Reality */}
            <div className="p-8 md:p-12 bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 space-y-8">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 font-display flex items-center gap-2">
                  <Shield size={16} />
                  The Golden Rule
                </h4>
                <p className="text-base text-slate-300 font-medium leading-relaxed">
                  <strong>Fuel matching sweat rates.</strong> Leverage sweat biosensors to identify your unique sodium excretion levels, and stay below your lactate threshold during aerobic sessions to optimize mitochondrial recovery.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "Lactic acid is a metabolic waste product that serves no function other than causing muscle fatigue."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Lactate is not waste; it is a vital energy shuttle. Your cells recycle lactate back into glucose to fuel your brain and heart under high physical stress. The fatigue is caused by hydrogen ions (acid) that build up alongside lactate.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">Sweat Microchannel Absorption & Chemical Sensing</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(16, 185, 129, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* 1. Skin surface with sweat pores */}
                <path d="M 30,280 L 370,280" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" strokeLinecap="round" />
                <text x="50" y="300" fill="#94a3b8" className="text-[8px] font-black uppercase tracking-widest font-display">Skin Surface</text>

                {/* Pulsing sweat droplets forming on pores */}
                <motion.g
                  animate={{ y: [-15, 0], opacity: [0, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                >
                  <circle cx="150" cy="275" r="4" fill="#3b82f6" />
                  <circle cx="250" cy="275" r="4" fill="#3b82f6" />
                </motion.g>

                {/* 2. Sensor Patch Frame */}
                <g transform="translate(100, 80)">
                  <rect x="0" y="0" width="200" height="160" rx="20" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" strokeWidth="2" />
                  
                  {/* Microchannel lines drawing sweat */}
                  <path d="M 50,160 Q 50,100 100,80" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="3" />
                  <path d="M 150,160 Q 150,100 100,80" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="3" />
                  
                  {/* Flowing sweat molecules (Lactate: Green, Sodium: Yellow) */}
                  <motion.g
                    animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <circle cx="100" cy="80" r="4" fill="#10b981" />
                    <circle cx="100" cy="80" r="3.5" fill="#f59e0b" />
                  </motion.g>

                  {/* Reading light node scanning */}
                  <motion.circle 
                    cx="100" cy="80" r="12" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                  <text x="100" y="45" textAnchor="middle" fill="#10b981" className="text-[10px] font-black uppercase tracking-widest font-display">Enzyme Analysis</text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Sweat Capillary Molecular Sensing</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Pores excrete sweat molecules into microchannels. The enzyme-coated reading terminal scans concentrations of lactate and sodium, broadcasting real-time fatigue states.
              </p>
            </div>
          </div>

        </div>

        {/* Biosensing Protocol */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Microscope size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Biosensing Protocol
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            How to use non-invasive sweat telemetry to identify your exact physical recovery limits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "Step 1", title: "Stress Mapping", metric: "Cortisol baseline", detail: "Wear a hormone analysis patch at rest to map daily cortisol levels, showing systemic neurological stress." },
              { phase: "Step 2", title: "Sweat Profiling", metric: "Sodium Excretion", detail: "Perform a baseline workout. Use a sweat patch to measure how much sodium and potassium you lose per hour of activity." },
              { phase: "Step 3", title: "Lactate Threshold", metric: "Fatigue Boundary", detail: "Perform a step test to locate the heart rate threshold where lactate accumulation spikes, defining your aerobic limit." },
              { phase: "Step 4", title: "Intra-Workout Calibration", metric: "Glycemic Timing", detail: "Use real-time sweat and glucose telemetry to consume fuel and electrolytes before glycogen reserves drain." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 block">{step.phase}</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-emerald-400 transition-colors">{step.title}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{step.metric}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Molecular Suite Stack */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs">Vetted Biochemistry</span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                The Molecular Suite
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-emerald-500/20 pb-4">
              Tier-1 Biosensing & Fluid Lab Tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Continuous Glucose Tracker (Levels)", desc: "Wearable sensor providing real-time visibility into postprandial glycemic spikes and daily glucose stability.", link: affiliateLinks.levels, label: "CGM", highlight: "Glucose Telemetry" },
              { name: "Keto-Mojo Dual Meter", desc: "Dual glucose and blood ketone testing system to measure exact metabolic flexibility and ketosis levels.", link: affiliateLinks.ketomojo, label: "Dual Meter", highlight: "Substrate Balance" }
            ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[3rem] hover:border-emerald-500/30 hover:shadow-2xl transition-all group gap-6">
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-black uppercase text-emerald-400 tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.highlight}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-black uppercase text-white group-hover:text-emerald-400 transition-colors">{item.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 self-end md:self-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <ExternalLink size={18} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Jargon Buster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "Biosensors",
                meaning: "Miniaturized electronic sensors worn on the skin that read chemical molecules (like lactate, glucose, or cortisol) directly from sweat or body fluids."
              },
              {
                term: "Lactate Threshold",
                meaning: "The exercise intensity level where lactic acid begins to accumulate in your blood faster than your body can clear it, resulting in rapid muscular fatigue."
              },
              {
                term: "Nanopillars",
                meaning: "Microscopic, column-like structures on sensor patches that draw sweat molecules to electrodes using capillary forces, requiring zero skin punctures."
              },
              {
                term: "Cortisol",
                meaning: "The primary hormone secreted by your adrenal glands in response to physical or psychological stress, regulating energy output and systemic immune responses."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-emerald-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
