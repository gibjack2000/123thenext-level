import React, { useEffect } from 'react';
import { Activity, ArrowLeft, ArrowRight, Wind, Shield, Layers, Users, Heart, Brain, ExternalLink, Sparkles, Waves, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function NeurowellnessSoftCare() {
  const t = useT();

  useEffect(() => {
    document.title = `Soft-Care: Somatic Engineering | 123TheNext Level`;
  }, []);

  const softCareArsenal = [
    {
      name: "Sony WH-1000XM5",
      brand: "Sony",
      desc: "Industry-leading active noise cancellation (ANC) to create a portable sensory deprivation environment for deep neural focus.",
      image: "/Products/sonyhead.jpg",
      link: "https://amazon.com/dp/B09XS7JWHH",
      price: "$398",
      tag: "Sensory Deprivation"
    },
    {
      name: "Bio-Static Grounding Mat",
      brand: "Groundology",
      desc: "Conductive surface designed to neutralize oxidative stress and synchronize with the Earth’s natural frequency through electron transfer.",
      image: "/Products/matt.jpg",
      link: "https://www.groundology.co.uk/",
      price: "$129",
      tag: "Proprioceptive Sync"
    },
    {
      name: "Deep Pressure Blanket",
      brand: "Gravity",
      desc: "Engineered proprioceptive input to trigger immediate serotonin production and downregulate cortisol via deep touch pressure.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
      link: "https://gravityblankets.com/",
      price: "$199",
      tag: "Endogenous Regulation"
    }
  ];

  const techniques = [
    { 
      title: "Physiological Sigh", 
      desc: "The fastest endogenous method to offload CO2 and reset the neural alarm system. Double inhale followed by a long, extended exhale.", 
      icon: Wind,
      tag: "Rapid Offload"
    },
    { 
      title: "Box Breathing", 
      desc: "Tactical breathwork used by elite operators to decouple the stress response from cognitive execution. 4-4-4-4 ratio.", 
      icon: Shield,
      tag: "Tactical Calm"
    },
    { 
      title: "Proprioceptive Sync", 
      desc: "Anchoring that forces the brain to exit a traumatic loop by prioritizing immediate sensory input over internal narrative.", 
      icon: Layers,
      tag: "Sensory Anchor"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-violet-500/30">
      {/* Cinematic Hero */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000"
            alt="Somatic Engineering and Peace"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/40 via-transparent to-indigo-950/20"></div>

        {/* Ethereal Motion Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[45rem] h-[45rem] bg-violet-600 rounded-full blur-[150px] pointer-events-none"
        />
        
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)", backgroundSize: "48px 48px" }}>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/neurowellness" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Hub</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md">
              <Sparkles size={14} className="mr-3 animate-pulse" />
              Somatic Safety Protocols
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Soft-Care<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-600">
                Healing
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-tight max-w-4xl mx-auto italic border-x border-violet-500/30 px-12">
              "The body keeps the score. Soft-Care is the precision process of rewriting the internal narrative through somatic safety and sensory regulation."
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
           {techniques.map((tech, idx) => (
             <motion.div 
               key={tech.title}
               whileHover={{ y: -15 }}
               className="bg-slate-900/50 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 relative group shadow-2xl overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-20 h-20 rounded-3xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-10 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500 border border-violet-500/20">
                  <tech.icon size={36} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500 mb-4 block">{tech.tag}</span>
                <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none">
                  {tech.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {tech.desc}
                </p>
             </motion.div>
           ))}
        </div>

        {/* Sensory Grid */}
        <section className="mb-40 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-violet-500 font-black uppercase tracking-[0.3em] text-xs">Sensory Architecture</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Soft-Care Toolbox
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-violet-500/20 pb-4">
              Environment Baseline Calibration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {softCareArsenal.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7] grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/10 px-4 py-1.5 rounded-full border border-violet-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                  <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-black text-[10px] uppercase border border-white/10 shadow-2xl">
                    {product.price}
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-500/60 mb-4">{product.tag}</span>
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 italic flex items-center gap-2">
                       Pure Vagus <Sparkles size={12} className="text-violet-500" />
                    </span>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-violet-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                      Acquire <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final Somatic Narrative */}
        <div className="text-center pb-48 relative overflow-hidden mt-48">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-px h-24 bg-gradient-to-b from-violet-500 to-transparent mx-auto mb-16"></div>
            <h3 className="text-4xl md:text-[7rem] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
              Return to<br />The Body
            </h3>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16 italic max-w-2xl mx-auto">
              "Resilience is not the absence of stress, but the expansion of the window of tolerance. Soft-Care is the bridge back to baseline."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-6 bg-white text-[#020617] rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-violet-600 hover:text-white transition-all shadow-2xl">
                Somatic Intake
              </button>
              <button className="px-12 py-6 border-2 border-white/10 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:border-white transition-all">
                The 2026 Resilience White Paper
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
