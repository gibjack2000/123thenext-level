import React, { useEffect } from 'react';
import { Cpu, ArrowLeft, ArrowRight, Activity, Zap, Shield, ExternalLink, Microscope, Target, Binary, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function NeurowellnessHardCare() {
  const t = useT();

  useEffect(() => {
    document.title = `Hard-Care: Autonomic Engineering | 123TheNext Level`;
  }, []);

  const hardCareArsenal = [
    {
      name: "Oura Ring 5",
      brand: "Oura",
      desc: "The gold standard for tracking sleep architecture and high-fidelity HRV recovery metrics with clinical precision.",
      image: "/Products/Oura1.jpg",
      link: "https://amazon.com/dp/B0D4N3L9XW",
      price: "$399",
      tag: "Biometric Baseline"
    },
    {
      name: "Nurosym VNS",
      brand: "Nurosym",
      desc: "Clinically-validated transcutaneous vagus nerve stimulator for rapid autonomic nervous system resets and stress attenuation.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      link: "https://nurosym.com/",
      price: "$699",
      tag: "Vagal Tonality"
    },
    {
      name: "Apollo Neuro",
      brand: "Apollo",
      desc: "Wearable touch therapy that uses gentle vibrations to help your body recover from stress and improve focus through haptic signaling.",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600",
      link: "https://apolloneuro.com/",
      price: "$349",
      tag: "Haptic Regulation"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-blue-500/30">
      {/* Cinematic Hero */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
            alt="Cybernetic Neuro-Architecture"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-indigo-950/20"></div>

        {/* High-Fidelity Technical Overlays */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[45rem] h-[45rem] bg-blue-600 rounded-full blur-[150px] pointer-events-none"
        />
        
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }}>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/neurowellness" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Hub</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md">
              <Cpu size={14} className="mr-3 animate-pulse" />
              Exogenous Signal Architecture
            </div>
            
            <h1 className="text-6xl md:text-[8rem] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Hard-Care<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
                Protocols
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl leading-relaxed border-l-4 border-blue-500/50 pl-8 italic">
              "Bypassing the conscious mind to calibrate the autonomic nervous system. Hard-Care utilizes clinical-grade hardware to force physiological transitions."
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Clinical Deep Dive */}
        <div className="bg-slate-900/50 backdrop-blur-3xl p-12 md:p-24 rounded-[4rem] border border-white/5 shadow-3xl mb-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.08)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-4 text-blue-400 font-black uppercase tracking-widest text-[10px] bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20 mb-8">
                <Binary size={14} />
                Mechanism of Action
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white mb-8 leading-[0.9]">
                Autonomic<br />Hacking
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed mb-12">
                When the nervous system reaches a state of chronic hyper-arousal, traditional "top-down" interventions like meditation often fail. Hard-Care implements "bottom-up" exogenous signals (electrical, haptic, and magnetic) to provide the brain with new safety evidence, effectively rewriting the autonomic operating system.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Link to="/neurowellness/vns" className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500/50 hover:bg-blue-950/20 transition-all group/sub block relative">
                  <h4 className="text-blue-400 font-black uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                    Vagal Stimulation
                    <ArrowRight size={14} className="group-hover/sub:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">Directing signals to the concha of the ear to synchronize brain-wave patterns. <span className="text-blue-400 underline block mt-2 font-bold">Read Deep Dive &rarr;</span></p>
                </Link>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="text-blue-400 font-black uppercase tracking-widest text-xs mb-2">HRV Expansion</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">Using tech to identify the precise 'resonant frequency' for each individual profile to maximize recovery.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200" 
                alt="Neuro-Monitoring Interface" 
                className="relative z-10 w-full h-auto rounded-[3rem] shadow-3xl grayscale brightness-125 opacity-70"
              />
            </div>
          </div>
        </div>

        {/* The Arsenal Grid */}
        <section className="mb-40 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs">Tech Arsenal</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Hard-Care Elements
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-blue-500/20 pb-4">
              Authorized Peripheral Devices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {hardCareArsenal.map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                className="group relative flex flex-col h-full"
              >
                {/* Protocol Box Container */}
                <div className="relative flex-1 bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden flex flex-col shadow-2xl transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-blue-500/10">
                  
                  {/* Visual Background Element */}
                  <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]"></div>
                  </div>

                  {/* Image Container */}
                  <div className="h-80 relative overflow-hidden bg-[#020617]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale brightness-[0.5] group-hover:grayscale-0 group-hover:brightness-[0.8]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Brand Badge */}
                    <div className="absolute bottom-6 left-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                        {product.brand}
                      </span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-8 right-8">
                      <div className="px-5 py-2 rounded-full bg-[#020617]/80 backdrop-blur-md text-white font-black text-[11px] uppercase border border-white/10 shadow-2xl group-hover:border-blue-500/50 transition-colors">
                        {product.price}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-10 flex flex-col flex-1 relative z-10">
                    <div className="mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/60 mb-4 block">{product.tag}</span>
                      <h3 className="text-3xl font-display font-black uppercase text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-3 group-hover:text-slate-200 transition-colors">
                        {product.desc}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors flex items-center gap-2">
                          Validated <Shield size={12} />
                        </span>
                      </div>
                      <a 
                        href={product.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group/btn flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.2em] bg-blue-600 px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl"
                      >
                        Acquire <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Decorative Background Glow */}
                <div className="absolute -inset-4 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-[4rem] blur-2xl transition-all duration-700 -z-10"></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final Technical Narrative */}
        <div className="text-center pb-48 relative overflow-hidden mt-48">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-px h-24 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-16"></div>
            <h3 className="text-4xl md:text-[7rem] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
              Forge Your<br />Frequency
            </h3>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16 italic max-w-2xl mx-auto">
              "We no longer wait for the environment to change. We change our environment by dictating the neurological signals our bodies receive."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-6 bg-white text-[#020617] rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                Clinical Diagnostics
              </button>
              <button className="px-12 py-6 border-2 border-white/10 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:border-white transition-all">
                The 2026 Tech Stack
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
