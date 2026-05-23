import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Zap, Activity, ExternalLink, Microscope, AlertTriangle, Sun, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import JargonTooltip from '../../components/JargonTooltip';

export default function InfraredSauna() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Infrared Sauna Recovery | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CMB6X8Y1',
    uk: 'https://amazon.co.uk/dp/B0CMB6X8Y1',
    sauna: 'https://amazon.com/dp/B0CMB6X8Y1',
    electrolytes: 'https://amazon.com/dp/B07TJR9W9J'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-orange-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(249,115,22,0.12),transparent_50%)] pointer-events-none z-0"></div>
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
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Autonomic Recovery: Heat Thermodynamics
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            Infrared Sauna
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-orange-500/50 pl-8 text-left"
          >
            In plain English, saunas use heat stress to expand blood vessel elasticity and trigger cellular folding repair proteins that keep your arteries and tissues young.
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
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">Understanding Heat Therapy</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Saunas expose the body to dry heat or infrared wavelengths (160°F to 180°F / 70°C to 80°C). This heat <JargonTooltip termKey="vasodilation">dilates blood vessels</JargonTooltip>, sending oxygen-rich blood deep into muscle tissue and joints.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                At a cellular level, this thermal stress activates <strong><JargonTooltip termKey="hsp">Heat Shock Proteins (HSPs)</JargonTooltip></strong>. Think of HSPs as molecular chaperones. When high heat causes cellular proteins to degrade or unfold, HSPs bind to them, folding them back into their correct shapes to protect cellular function.
              </p>
            </div>

            {/* Everyday Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                  Vascular & Joint Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    Persistent muscle tightness, stiffness, or joint aches.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    Poor blood circulation, cold extremities, or elevated resting pressure.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 font-bold">•</span>
                    Heavy muscle tension that limits training mobility range.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-rose-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                  Autonomic Recovery Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    High sympathetic load (staying in a wired stress loop).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    Difficulty winding down in the evening or poor sleep quality.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    Sluggish muscle recovery and lingering post-workout fatigue.
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
                  <strong>Hydrate before, during, and after.</strong> Drink at least 16 to 24 ounces of electrolyte-rich fluids prior to a sauna session. Sweating drains large volumes of plasma, requiring sodium replenishment to prevent cardiovascular strain.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "Saunas are useful primarily because sweating flushes out heavy toxins and heavy metals."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Sweating flushes out only a trace amount of minerals. The liver and kidneys handle 99% of metabolic detoxification. The true benefit of a sauna is the heat shock proteins and vascular dilation, which triggers protective repair mechanisms that mirror light cardio.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">HSP Activation & Protein Repair</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(249, 115, 22, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* 1. Misfolded Protein (Target) */}
                <g transform="translate(150, 150)">
                  {/* Irregular, bent line representing misfolded shape */}
                  <motion.path 
                    d="M-40,10 C-30,-20 -10,20 10,-10 C30,30 40,-10 60,0" fill="none" stroke="#f87171" strokeWidth="3"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <text x="10" y="-30" textAnchor="middle" fill="#f87171" className="text-[8px] font-black uppercase tracking-widest font-display">Misfolded Protein</text>
                </g>

                {/* 2. Heat Shock Protein (HSP) binding (Orange brackets) */}
                <g transform="translate(200, 200)">
                  <motion.g
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M-50,-20 C-60,0 -60,20 -50,40 M50,-20 C60,0 60,20 50,40" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Glowing energy sparks */}
                    <circle cx="-55" cy="10" r="3" fill="#fdba74" />
                    <circle cx="55" cy="10" r="3" fill="#fdba74" />
                  </motion.g>
                  <text x="0" y="55" textAnchor="middle" fill="#f97316" className="text-[9px] font-black uppercase tracking-widest font-display">HSP Chaperone Shield</text>
                </g>
                
                {/* Heat waves */}
                <motion.g
                  animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <path d="M 50,300 Q 60,280 50,260 T 50,220" fill="none" stroke="#ea580c" strokeWidth="2" />
                  <path d="M 350,300 Q 360,280 350,260 T 350,220" fill="none" stroke="#ea580c" strokeWidth="2" />
                </motion.g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Heat Stress Refolding Cycle</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Thermal stress stimulates heat shock proteins (HSPs). These helper structures bind to degrading cellular proteins, folding them back into their optimal shapes.
              </p>
            </div>
          </div>

        </div>

        {/* Heat Shock Protocol */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/20">
              <Sun size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Heat Shock Protocol
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            How to structure sauna exposure to trigger vascular repair and maximize cardiovascular health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "Step 1", title: "Target Temperature", metric: "160-180°F / 70-80°C", detail: "Use a dry or far-infrared sauna. Ensure the temperature is high enough to elevate your core temperature." },
              { phase: "Step 2", title: "Sauna Duration", metric: "15-20 Minutes", detail: "Keep sessions within this range. Going past 30 minutes increases dehydration risks without boosting HSPs." },
              { phase: "Step 3", title: "Hydrate & Cool", metric: "10-15 Min Reset", detail: "Cool down slowly at room temperature. Sip electrolyte fluids to replace the volume lost through sweat." },
              { phase: "Step 4", title: "Weekly Volume", metric: "4-7 Times Weekly", detail: "Accumulate exposure. Regular sessions provide the strongest reduction in cardiovascular risks." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-orange-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-4 block">{step.phase}</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-orange-400 transition-colors">{step.title}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{step.metric}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/20">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Jargon Buster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "Heat Shock Proteins (HSPs)",
                meaning: "Special helper proteins made by cells in response to heat stress (like saunas) that bind to and repair degraded or misfolded cellular protein structures."
              },
              {
                term: "Vasodilation",
                meaning: "The widening of blood vessels in response to heat, which increases circulation and temporarily lowers blood pressure."
              },
              {
                term: "Hydrostatic Pressure",
                meaning: "The fluid pressure exerted by blood inside vessels. As vessels expand during heat therapy, hydrostatic pressure drops."
              },
              {
                term: "Plasma Volume Expansion",
                meaning: "The increase in blood fluid volume triggered by consistent sauna heat training, helping the heart pump blood more efficiently during future workouts."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-orange-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
