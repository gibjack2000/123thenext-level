import React, { useEffect } from 'react';
import { ArrowLeft, Moon, Sun, Shield, Info, ExternalLink, Timer, Activity, Zap, Brain, Target, ArrowRight, Gauge, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';

export default function SystemicMaintenance() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Systemic Maintenance: Sleep & Recovery | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-rose-500/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=2000"
            alt="Deep Sleep and Systemic Recovery"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/40 via-transparent to-indigo-950/20"></div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #f43f5e 1px, transparent 0)", backgroundSize: "40px 40px" }}>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/health" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-16 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Health Hub</span>
          </Link>
          
          <div className="max-w-5xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-2xl backdrop-blur-md"
            >
              <Moon size={14} className="mr-3 animate-pulse" />
              Protocol Gamma: Systemic Recovery
            </motion.div>
            <h1 className="text-5xl md:text-[clamp(4rem,7vw,9.5rem)] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
               Systemic<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400">
                  Maintenance
               </span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-4xl border-l-4 border-rose-500/50 pl-8 text-left italic">
               "Sleep is not a luxury; it is a non-negotiable metabolic repair window. Without it, every other optimization fails."
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-48">
        {/* The Glymphatic Cleanse */}
        <section className="mb-40">
          <div className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(244,63,94,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-12 mb-16 px-4">
                <div className="inline-flex items-center gap-4 text-rose-400 font-black uppercase tracking-widest text-[10px] bg-rose-500/10 px-6 py-2 rounded-full border border-rose-500/20 mb-8 font-display">
                  <Brain size={14} />
                  Neural Waste Clearance
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                   The Glymphatic Window
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl">
                   During deep sleep, the brain's glymphatic system expands, flushing out metabolic waste products like Beta-Amyloid. Optimization of this window is the primary defense against long-term cognitive decline.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-10 bg-slate-950/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4"
                    >
                       <span className="text-4xl font-display font-black text-rose-400">REM</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display">Neural Sorting</span>
                       <p className="text-sm text-slate-500 leading-relaxed font-medium">Critical for emotional regulation, creative problem solving, and long-term memory consolidation.</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-10 bg-slate-950/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4"
                    >
                       <span className="text-4xl font-display font-black text-indigo-400">DEEP</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display">Physical Repair</span>
                       <p className="text-sm text-slate-500 leading-relaxed font-medium">The window where Growth Hormone peaks and systemic protein synthesis facilitates tissue repair.</p>
                    </motion.div>
                 </div>
                 
                 <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-4 mb-6">
                       <Thermometer size={24} className="text-rose-500" />
                       <h4 className="text-xl font-display font-black uppercase text-white tracking-widest">Thermic Signaling</h4>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed font-medium">
                       Maintaining a core body temperature drop of 1-3°C is required to initiate and maintain high-quality slow-wave sleep.
                    </p>
                 </div>
              </div>

              <div className="lg:col-span-5 relative">
                 <div className="absolute inset-0 bg-rose-500/10 blur-[100px] rounded-full animate-pulse"></div>
                 <img src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200" alt="Sleep Maintenance" className="relative z-10 rounded-[4rem] shadow-2xl grayscale brightness-110 opacity-70 border border-white/10" />
              </div>
            </div>
          </div>
        </section>

        {/* The Maintenance Arsenal */}
        <section className="mb-40">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-rose-400 font-black uppercase tracking-[0.3em] text-xs font-display">Recovery Technology</span>
              <h2 className="text-5xl md:text-[6rem] font-display font-black uppercase tracking-tighter text-white leading-none">
                 The Arsenal
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-rose-500/20 pb-4 font-display">
               Tier-1 Maintenance Tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Eight Sleep Pod 4', brand: 'Eight Sleep', desc: 'Active thermal regulation via AI-driven water cooling to maintain optimal sleeping temperature.', price: '$2295', url: '#' },
              { name: 'Blue Light Shield', brand: 'Ra Optics', desc: 'Precision-tinted lenses to block 450nm melatonin-suppressing light during evening hours.', price: '$145', url: '#' },
              { name: 'Mouth Tape Ultra', brand: 'Hostage Tape', desc: 'Functional mouth taping to force nasal breathing, maximizing nitric oxide and preventing apnea.', price: '$25', url: '#' }
            ].map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 p-10 overflow-hidden group shadow-2xl flex flex-col h-full items-start"
              >
                <div className="w-full h-64 bg-white/5 rounded-[2.5rem] mb-8 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-indigo-500/10 transition-opacity group-hover:opacity-100 opacity-50"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-display font-black uppercase tracking-widest text-xs">Tier-1 Hardware</div>
                </div>
                <h3 className="text-2xl font-display font-black uppercase text-white mb-4 tracking-tight group-hover:text-rose-400 transition-colors">
                  {p.name}
                </h3>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6 font-display">{p.brand}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow font-medium">
                   {p.desc}
                </p>
                <div className="w-full pt-8 border-t border-white/5 flex items-center justify-between">
                   <span className="text-lg font-display font-black">{p.price}</span>
                   <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-white transition-colors">
                      Buy from Amazon <ExternalLink size={14} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Autonomic Link Navigation */}
        <div className="text-center pb-32">
           <Link to="/neurowellness/soft-care" className="inline-flex items-center px-12 py-6 border-2 border-white/10 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:border-rose-500 hover:text-rose-500 transition-all hover:scale-105 font-display group shadow-3xl">
             Explore Somatic Reset <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}
