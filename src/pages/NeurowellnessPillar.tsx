import React, { useEffect } from 'react';
import { Brain, ArrowLeft, ArrowRight, Activity, Shield, Zap, Microscope, Cpu, Heart, Layers, ExternalLink, Waves, Wind, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

export default function NeurowellnessPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `Neurowellness & Cognitive Architecture | 123TheNext Level`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Advanced autonomic engineering, high-fidelity neuro-recovery, and cognitive metabolic optimization.');
    }
  }, []);

  const deepDivePaths = [
    {
      title: "01. Hard-Care",
      desc: "Tech-driven exogenous stimulation. Utilizing VNS and PEMF to bypass conscious resistance.",
      to: "/neurowellness/hard-care",
      icon: Cpu,
      color: "from-blue-500 to-cyan-500",
      tag: "Exogenous Signals"
    },
    {
      title: "02. Soft-Care",
      desc: "Somatic endogenous regulation. Cultivating internal safety through breathwork and grounding.",
      to: "/neurowellness/soft-care",
      icon: Activity,
      color: "from-violet-500 to-indigo-500",
      tag: "Endogenous Calibration"
    },
    {
      title: "03. Metabolism",
      desc: "The Muscle-Brain Axis. Leveraging Irisin and BDNF signaling via metabolic metabolites.",
      to: "/neurowellness/metabolism",
      icon: Microscope,
      color: "from-emerald-500 to-teal-500",
      tag: "Cognitive Integrity"
    }
  ];

  const pillarEssentials = [
    {
      name: "HRV & Sleep Guardian",
      brand: "Oura Ring 4",
      desc: "Clinical-grade tracking of autonomic nervous system balance and recovery readiness.",
      image: "/Products/Oura1.jpg",
      link: "https://amazon.com/dp/B0D4N3L9XW",
      price: "$399"
    },
    {
      name: "Vagal Tone Regulator",
      brand: "Nurosym VNS",
      desc: "Wearable tech that uses targeted micro-impulses to stabilize vagal tone and reduce stress.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      link: "/neurowellness/hard-care",
      price: "$699"
    },
    {
      name: "Thermal Recovery Pod",
      brand: "Eight Sleep / Pod 4",
      desc: "Dynamic thermoregulation to optimize sleep architecture and deep-wave recovery.",
      image: "/Products/eightsleep.jpg",
      link: "https://www.eightsleep.com/",
      price: "$2000+"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000"
            alt="Autonomic Engineering and Neuro-Response"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* High-Fidelity Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-violet-950/20"></div>
        
        {/* Animated Synaptic Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[45rem] h-[45rem] bg-indigo-600 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-[35rem] h-[35rem] bg-violet-500 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Technical Data Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)", backgroundSize: "48px 48px" }}>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">{t('wp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md"
            >
              <Brain size={14} className="mr-3 animate-pulse" />
              Autonomic Calibration: Vagal Dominance
            </motion.div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Neuro<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600">
                Wellness
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-indigo-500/50 pl-8 text-left italic"
            >
              {t('wp_hub_narrative_title')} In 2026, we transition from "mindfulness" to **Autonomic Engineering**, calibrating the nervous system for peak output and rapid recovery.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Navigation Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {deepDivePaths.map((path, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -15 }}
              className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
            >
              <Link to={path.to} className="p-12 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${path.color} flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <path.icon size={32} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">{path.tag}</span>
                <h3 className="text-3xl font-display font-black uppercase text-white mb-6 leading-tight group-hover:text-indigo-400 transition-colors">
                  {path.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium flex-grow">
                  {path.desc}
                </p>
                <div className="pt-8 border-t border-white/5 flex items-center justify-between text-indigo-400 font-black text-[10px] uppercase tracking-widest group-hover:text-white transition-colors">
                  <span>Enter Protocol</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Polyvagal Paradigm Section */}
        <section className="mb-40">
          <div className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-4 text-indigo-400 font-black uppercase tracking-widest text-[10px] bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-500/20 mb-8">
                  <Layers size={14} />
                  The Clinical Foundation
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                  The Polyvagal<br />Paradigm
                </h2>
                <div className="space-y-8 max-w-2xl">
                  {[
                    { title: "Ventral Vagal", text: t('wp_polyvagal_ventral'), color: "bg-emerald-500" },
                    { title: "Sympathetic", text: t('wp_polyvagal_sympathetic'), color: "bg-orange-500" },
                    { title: "Dorsal Vagal", text: t('wp_polyvagal_dorsal'), color: "bg-blue-500" }
                  ].map((circuit) => (
                    <div key={circuit.title} className="flex gap-6 items-start group">
                      <div className={`mt-2 w-3 h-3 rounded-full ${circuit.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-150 transition-transform`} />
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{circuit.title}</h4>
                        <p className="text-slate-400 text-lg leading-relaxed">{circuit.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-[100px] absolute inset-0 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200" 
                  alt="Neural pathways" 
                  className="relative z-10 w-full h-auto rounded-[3rem] shadow-3xl grayscale brightness-110 opacity-60"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <IntelligenceTeaser />

        {/* Pillar Essentials Grid */}
        <section className="mb-40 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs">Clinical Arsenal</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Pillar Essentials
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-indigo-500/20 pb-4">
              Vetted 2026 Neuro-Recovery Tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillarEssentials.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                  <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-black text-[10px] uppercase border border-white/10 shadow-2xl">
                    {product.price}
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">2026 Essential</span>
                    <a href={product.link} target={product.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                      Acquire <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed */}
        <div className="space-y-48">
          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('wp_top_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="wellness" limit={3} featured={true} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('wp_latest_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="wellness" limit={12} />
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pb-48 relative overflow-hidden mt-48">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-px h-24 bg-gradient-to-b from-indigo-500 to-transparent mx-auto mb-16"></div>
            <h3 className="text-4xl md:text-[7rem] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
              Redefining<br />Potential
            </h3>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16 italic max-w-2xl mx-auto">
              "We are no longer victims of our genetic blueprints. Through clinical precision and somatic intelligence, we define our own neurological future."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-6 bg-white text-[#020617] rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl hover:scale-105">
                Clinical Intake Form
              </button>
              <button className="px-12 py-6 border-2 border-white/10 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:border-white transition-all">
                The 2026 Manifesto
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
