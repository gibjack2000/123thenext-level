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
      color: "from-blue-600/20 to-cyan-600/20",
      accent: "blue",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
      tag: "Exogenous Signals"
    },
    {
      title: "02. Soft-Care",
      desc: "Somatic endogenous regulation. Cultivating internal safety through breathwork and grounding.",
      to: "/neurowellness/soft-care",
      icon: Activity,
      color: "from-violet-600/20 to-indigo-600/20",
      accent: "violet",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200",
      tag: "Endogenous Calibration"
    },
    {
      title: "03. Metabolism",
      desc: "The Muscle-Brain Axis. Leveraging Irisin and BDNF signaling via metabolic metabolites.",
      to: "/neurowellness/metabolism",
      icon: Microscope,
      color: "from-emerald-600/20 to-teal-600/20",
      accent: "emerald",
      image: "https://images.unsplash.com/photo-1532187863486-abf9d39d998e?auto=format&fit=crop&q=80&w=1200",
      tag: "Cognitive Integrity"
    }
  ];

  const pillarEssentials = [
    {
      name: "HRV & Sleep Guardian",
      brand: "Oura Ring 5",
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
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

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
              className="relative aspect-[4/5] md:aspect-auto md:h-[600px] rounded-[3.5rem] overflow-hidden group shadow-2xl flex flex-col"
            >
              {/* Background Image with Parallax-like effect */}
              <motion.div 
                className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110"
              >
                <img 
                  src={path.image} 
                  alt={path.title}
                  className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-[0.6] transition-all duration-700"
                />
                {/* Technical Scanlines Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700"
                     style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "100% 4px" }}>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] group-hover:via-[#020617]/30 transition-all duration-700`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-50 group-hover:opacity-30 transition-all duration-700`}></div>
              </motion.div>

              {/* Glass Overlay */}
              <div className="absolute inset-0 z-10 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-700"></div>

              {/* Scanline/Noise Overlay */}
              <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-200"></div>

              <Link to={path.to} className="absolute inset-0 z-20 cursor-pointer" />
              <div className="relative z-10 p-12 flex flex-col h-full justify-end">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col h-full"
                >
                  <div className={`w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:bg-indigo-500 transition-all duration-500 shadow-2xl`}>
                    <path.icon size={32} />
                  </div>
                  
                  <div className="mt-auto">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4 block group-hover:text-white transition-colors">{path.tag}</span>
                    <h3 className="text-4xl font-display font-black uppercase text-white mb-6 leading-tight drop-shadow-2xl">
                      {path.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium line-clamp-3 group-hover:text-white transition-colors">
                      {path.desc}
                    </p>
                    <div className="pt-8 border-t border-white/10 flex items-center justify-between text-indigo-400 font-black text-[10px] uppercase tracking-widest group-hover:text-white transition-all z-30">
                      <span className="flex items-center gap-2">
                        Enter Protocol
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </span>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-[3.5rem] transition-colors pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Polyvagal Paradigm Section */}
        <section className="mb-40">
          <div className="bg-[#0f172a]/50 backdrop-blur-3xl p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.1)_0%,transparent_50%)]"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-4 text-indigo-400 font-black uppercase tracking-widest text-[10px] bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-500/20 mb-8 backdrop-blur-md">
                  <Layers size={14} />
                  The Clinical Foundation
                </div>
                <h2 className="text-4xl md:text-8xl font-display font-black uppercase tracking-tight text-white leading-[0.85] mb-12">
                  The Polyvagal<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Paradigm</span>
                </h2>
                <div className="space-y-10 max-w-2xl">
                  {[
                    { title: "Ventral Vagal", text: t('wp_polyvagal_ventral'), color: "bg-emerald-500", glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]" },
                    { title: "Sympathetic", text: t('wp_polyvagal_sympathetic'), color: "bg-orange-500", glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]" },
                    { title: "Dorsal Vagal", text: t('wp_polyvagal_dorsal'), color: "bg-blue-500", glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]" }
                  ].map((circuit) => (
                    <div key={circuit.title} className="flex gap-8 items-start group">
                      <div className={`mt-2 w-4 h-4 rounded-full ${circuit.color} ${circuit.glow} group-hover:scale-150 transition-all duration-500 flex-shrink-0`} />
                      <div className="border-l border-white/5 pl-8 group-hover:border-indigo-500/30 transition-colors">
                        <h4 className="text-2xl font-display font-black text-white mb-3 uppercase tracking-wider">{circuit.title}</h4>
                        <p className="text-slate-400 text-lg leading-relaxed group-hover:text-slate-200 transition-colors">{circuit.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-500/30 to-blue-500/30 rounded-full blur-[120px] absolute inset-0 animate-pulse"></div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[3.2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200" 
                    alt="Neural pathways" 
                    className="relative z-10 w-full h-auto rounded-[3rem] shadow-3xl grayscale brightness-125 opacity-40 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillarEssentials.map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                className="group relative flex flex-col h-full"
              >
                {/* Product Card Container */}
                <div className="relative flex-1 bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden flex flex-col shadow-2xl transition-all duration-500 group-hover:border-indigo-500/30 group-hover:shadow-indigo-500/10">
                  
                  {/* Image Container */}
                  <div className="h-80 relative overflow-hidden bg-[#020617]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-[0.9]" 
                    />
                    {/* Technical Scanlines Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
                         style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "100% 4px" }}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Brand Badge */}
                    <div className="absolute bottom-6 left-8">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                        {product.brand}
                      </span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-8 right-8">
                      <div className="px-5 py-2 rounded-full bg-[#020617]/80 backdrop-blur-md text-white font-black text-[11px] uppercase border border-white/10 shadow-2xl group-hover:border-indigo-500/50 transition-colors">
                        {product.price}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-10 flex flex-col flex-1 relative">
                    <div className="mb-6">
                      <h3 className="text-3xl font-display font-black uppercase text-white mb-4 leading-tight group-hover:text-indigo-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        {product.desc}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">2026 Ready</span>
                      </div>
                      <a 
                        href={product.link} 
                        target={product.link.startsWith('http') ? "_blank" : "_self"} 
                        rel="noopener noreferrer" 
                        className="group/btn flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.2em] bg-indigo-600 px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl"
                      >
                        Acquire <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Decorative Background Glow */}
                <div className="absolute -inset-4 bg-indigo-500/0 group-hover:bg-indigo-500/5 rounded-[4rem] blur-2xl transition-all duration-700 -z-10"></div>
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
