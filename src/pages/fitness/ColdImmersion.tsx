import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Zap, Activity, ExternalLink, Microscope, AlertTriangle, Snowflake, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import JargonTooltip from '../../components/JargonTooltip';

export default function ColdImmersion() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Cold Immersion Recovery | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    plunge: 'https://amazon.com/dp/B0CXM1X8PQ',
    polar: 'https://amazon.com/dp/B07PM1GY1F'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/fitness/methodology" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Methodology</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Autonomic Recovery: Cryotherapy
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            Cold Immersion
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-blue-500/50 pl-8 text-left"
          >
            In plain English, cold plunging triggers a powerful hormone release that acts as a physical reset, reducing muscular swelling and boosting metabolic alertness.
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
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">Understanding Cold Therapy</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Cold immersion (ice bathing) exposes the body to water ranging from 40°F to 55°F (4°C to 12°C). This sudden environmental change forces your cardiovascular system to contract blood vessels in your limbs, sending blood to protect your vital organs.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                At the same time, your brain releases a huge wave of <strong><JargonTooltip termKey="norepinephrine">Norepinephrine</JargonTooltip></strong> (a stress-handling chemical) and dopamine. This biochemical surge triggers acute mental focus, reduces muscle inflammation, and activates healthy brown fat to burn energy for heat.
              </p>
            </div>

            {/* Everyday Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-cyan-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  Physical Recovery Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 font-bold">•</span>
                    Severe muscle soreness (DOMS) 1-2 days after lifting.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 font-bold">•</span>
                    Swollen joints or hot, inflamed muscle tissue.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 font-bold">•</span>
                    Slow recovery indicators like depressed HRV averages.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  Cognitive Stress Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Mental fatigue, morning brain fog, or low motivation.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Feeling physically heavy and sluggish.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Struggling with focus and mood regulation during stress.
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
                  <strong>Avoid cold plunging immediately after lifting weights.</strong> Wait at least 4 to 6 hours post-workout. Cold exposure halts the natural muscle inflammation that serves as the biological signal for building strength and size.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "Submerging in cold water directly freezes and dissolves your body fat tissue."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Cold does not melt fat cells directly. Instead, it activates <strong>Brown Fat (BAT)</strong> cells which are full of mitochondria. Brown fat acts like a cellular furnace, burning glucose and normal white fat to produce body heat, boosting metabolism.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">Vasoconstriction & Norepinephrine Release</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(59, 130, 246, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* 1. Contracting Blood Vessel */}
                <g transform="translate(200, 150)">
                  {/* Outer vessel walls narrowing */}
                  <motion.path 
                    d="M-150,-20 C-50,-5 50,-5 150,-20" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="2"
                  />
                  <motion.path 
                    d="M-150,20 C-50,5 50,5 150,20" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="2"
                  />
                  <path d="M-150,-10 L150,-10 M-150,10 L150,10" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="16" strokeLinecap="round" />
                  
                  {/* Narrowing arrows */}
                  <motion.g
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <polygon points="0,-18 5,-23 -5,-23" fill="#3b82f6" />
                    <polygon points="0,18 5,23 -5,23" fill="#3b82f6" />
                  </motion.g>
                  
                  <text x="0" y="-30" textAnchor="middle" fill="#3b82f6" className="text-[9px] font-black uppercase tracking-widest font-display">Vascular Narrowing</text>
                </g>

                {/* 2. Floating Norepinephrine Hormones (Blue circles) */}
                <motion.g
                  animate={{ y: [-10, 10, -10], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle cx="120" cy="240" r="5" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1" />
                  <circle cx="280" cy="240" r="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1" />
                  <circle cx="200" cy="260" r="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1" />
                </motion.g>

                {/* Shivering indicator (Cold stress) */}
                <g transform="translate(200, 310)">
                  <motion.rect 
                    x="-60" y="-15" width="120" height="30" rx="10" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1.5"
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  />
                  <text x="0" y="4" textAnchor="middle" fill="#60a5fa" className="text-[10px] font-black uppercase tracking-widest font-display">Brown Fat Active</text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Vaso-constriction Signaling</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Cold exposure constricts peripheral blood vessels, shunting blood flow to core organs while releasing norepinephrine to reduce muscle swelling and inflammation.
              </p>
            </div>
          </div>

        </div>

        {/* Cold Plunge Protocol */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Snowflake size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Cold Plunge Protocol
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            A safe, progressive roadmap designed to build cold tolerance and maximize metabolic benefits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "Step 1: Tempering", focus: "50-55°F / 10-12°C", metric: "1-2 Minutes", detail: "Begin at moderate temperatures. Focus strictly on controlled nasal breathing to bypass the panic gasp response." },
              { phase: "Step 2: Adaptation", focus: "45-50°F / 7-10°C", metric: "2-3 Minutes", detail: "Slowly decrease water temperature. Keep submersions under 3 minutes, which is ample to trigger recovery." },
              { phase: "Step 3: Metabolic", focus: "40-45°F / 4-7°C", metric: "Brown Fat Load", detail: "Enter the metabolic zone. Allow your body to shiver and warm up naturally post-plunge to trigger BAT combustion." },
              { phase: "Step 4: Maintenance", focus: "11 Mins / Week", metric: "Weekly Accumulation", detail: "Reach weekly goals. Break down your exposure into 3-4 sessions weekly, avoiding post-lifting windows." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4 block">{step.phase}</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-blue-400 transition-colors">{step.focus}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{step.metric}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Jargon Buster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "Autonomic Nervous System",
                meaning: "The body's automatic control network regulating processes like heart rate, breathing, and response to environmental stressors (cold/heat)."
              },
              {
                term: "Norepinephrine",
                meaning: "A critical stress hormone and neurotransmitter released during cold exposure that contracts blood vessels, speeds up focus, and silences systemic inflammation."
              },
              {
                term: "Vasoconstriction",
                meaning: "The biological narrowing of blood vessels, which pushes blood flow back to core vital organs while reducing swelling in limbs."
              },
              {
                term: "Brown Adipose Tissue (BAT)",
                meaning: "A healthy, mitochondria-dense fat tissue that burns glucose and normal white fat to produce body heat under cold stress."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-blue-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
