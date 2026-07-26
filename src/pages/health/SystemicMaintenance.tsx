import React, { useEffect } from 'react';
import { ArrowLeft, Moon, Sun, Shield, Info, ExternalLink, Timer, Activity, Zap, Brain, Target, ArrowRight, Gauge, Thermometer, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useT } from '../../translations';

export default function SystemicMaintenance() {
  const t = useT();
  const [activeProtocol, setActiveProtocol] = React.useState<'rem' | 'deep' | 'thermic' | null>(null);

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
                    <div 
                      onClick={() => setActiveProtocol('rem')}
                      className="p-10 bg-slate-955/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4 hover:bg-rose-955/10 hover:border-rose-500/30 transition-all duration-300 cursor-pointer group justify-between"
                    >
                      <div>
                         <span className="text-4xl font-display font-black text-rose-400 group-hover:text-rose-300 transition-colors">REM</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display block mt-1">Neural Sorting</span>
                         <p className="text-sm text-slate-400 leading-relaxed font-medium mt-2">Critical for emotional regulation, creative problem solving, and long-term memory consolidation.</p>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-rose-400 mt-4 inline-block group-hover:text-rose-300 transition-colors">Open Protocol Details →</span>
                    </div>
                    <div 
                      onClick={() => setActiveProtocol('deep')}
                      className="p-10 bg-slate-955/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4 hover:bg-indigo-955/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer group justify-between"
                    >
                      <div>
                         <span className="text-4xl font-display font-black text-indigo-400 group-hover:text-indigo-300 transition-colors">DEEP</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display block mt-1">Physical Repair</span>
                         <p className="text-sm text-slate-400 leading-relaxed font-medium mt-2">The window where Growth Hormone peaks and systemic protein synthesis facilitates tissue repair.</p>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 mt-4 inline-block group-hover:text-indigo-300 transition-colors">Open Protocol Details →</span>
                    </div>
                 </div>
                 
                 <div 
                   onClick={() => setActiveProtocol('thermic')}
                   className="p-10 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden hover:bg-rose-955/10 hover:border-rose-500/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                 >
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                         <Thermometer size={24} className="text-rose-500 group-hover:text-rose-400 transition-colors" />
                         <h4 className="text-xl font-display font-black uppercase text-white tracking-widest">Thermic Signaling</h4>
                      </div>
                      <p className="text-slate-400 text-base leading-relaxed font-medium">
                         Maintaining a core body temperature drop of 1-3°C is required to initiate and maintain high-quality slow-wave sleep.
                      </p>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-rose-400 mt-6 inline-block group-hover:text-rose-300 transition-colors">Open Protocol Details →</span>
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

      {/* Protocol Details Modal */}
      <AnimatePresence>
        {activeProtocol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-955/90 backdrop-blur-md"
            onClick={() => setActiveProtocol(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-rose-500/30 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-rose-500/10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProtocol(null)}
                className="absolute top-8 right-8 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer focus:outline-none"
              >
                <X size={20} />
              </button>

              {activeProtocol === 'rem' ? (
                <div>
                  <div className="w-16 h-16 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-400 mb-8 border border-rose-500/20">
                    <Brain size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    REM Sleep Protocol
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-8 block">
                    Glymphatic Tau Clearance & Neural Sorting
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    REM sleep is the primary neurological phase for emotional regulation, creative consolidation, and metabolic clearing of waste proteins like Tau.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Target Sleep Architecture", desc: "Maintain a stable 8-hour sleep window, allowing REM density to naturally accumulate in the final hours of the sleep cycle." },
                      { step: "02", title: "Circadian Light Shielding", desc: "Utilize high-fidelity blue-blocking glasses or enforce zero-screen habits 2 hours before bed to prevent phase delays." },
                      { step: "03", title: "Neurotransmitter Optimization", desc: "Ensure adequate dietary intake of tryptophan and active B6 to support serotonin-to-melatonin conversion." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
                        <div>
                          <h4 className="text-white font-bold uppercase text-sm mb-1">{step.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeProtocol === 'deep' ? (
                <div>
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20">
                    <Moon size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    DEEP Sleep Protocol
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-8 block">
                    Growth Hormone peak & Systemic Protein Repair
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Slow-wave (Deep) sleep is the primary physiological recovery window where human growth hormone (hGH) peaks, supporting physical tissue repair and immunological wellness.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Target Thermal Comfort", desc: "Cool the ambient sleeping surface to 64-68°F (17-20°C) to facilitate the core temperature drop required to initiate slow-wave sleep." },
                      { step: "02", title: "Glycemic Buffer Windows", desc: "Avoid heavy carbohydrates or calorie-dense meals within 3 hours of sleep to prevent insulin spikes from suppressing hGH secretion." },
                      { step: "03", title: "Environmental Light Audit", desc: "Maintain bedroom darkness below 0.2 lux and sound levels below 40 decibels to prevent micro-arousals during slow-wave cycles." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
                        <div>
                          <h4 className="text-white font-bold uppercase text-sm mb-1">{step.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-400 mb-8 border border-rose-500/20">
                    <Thermometer size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    Thermic Signaling
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-8 block">
                    Parasympathetic Transition & Core Temp Regulation
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Thermal cues (such as deliberate pre-sleep cooling and evening heating) manipulate blood flow and vascular tone to accelerate parasympathetic autonomic dominance.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Pre-Sleep Thermal Dips", desc: "Take a warm shower or bath 90 minutes before bed. Subsequent rapid heat dissipation from the skin forces core temperatures down." },
                      { step: "02", title: "Autonomic Activation Dips", desc: "Pair thermal recovery with slow diaphragmatic 6-second exhalations to shift the nervous system into rest-and-digest mode." },
                      { step: "03", title: "Microvascular Conditioning", desc: "Use regular contrast heat/cold exposure to maintain vascular dilation elasticity and lower resting systemic blood pressures." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
                        <div>
                          <h4 className="text-white font-bold uppercase text-sm mb-1">{step.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
