import React, { useEffect } from 'react';
import { Dumbbell, ArrowLeft, Cpu, Activity, Zap, ExternalLink, Timer, TrendingUp, BarChart3, Target, Gauge, Shield, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

export default function FitnessPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('fp_title')} ${t('fp_subtitle')} | 123TheNext Level`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('fp_desc'));
    }
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    es: 'https://amazon.es/dp/B0CXM1X8PQ',
    whoop: 'https://amazon.com/dp/B0CXM1X8PQ',
    rogue: 'https://amazon.com/dp/B0CLB5X8X9',
    creatine: 'https://amazon.com/dp/B0CXM1X8PQ'
  };

  const pillarEssentials = [
    {
      name: "Force Production Arsenal",
      brand: "Rogue / Iron Neck",
      desc: "Tactical equipment for maximizing isometric tension and force-velocity output.",
      image: "/Products/rogue.jpg",
      link: affiliateLinks.rogue,
      price: "$145+"
    },
    {
      name: "Autonomic Recovery Tracker",
      brand: "Whoop 4.0 / Oura Gen3",
      desc: "Real-time strain vs. recovery monitoring via high-resolution HRV analysis.",
      image: "/Products/whoop.jpg",
      link: affiliateLinks.whoop,
      price: "$299"
    },
    {
      name: "Performance Substrate",
      brand: "Thorne / Momentous",
      desc: "Clinical-grade Creatine Monohydrate for ATP regeneration and neuro-shielding.",
      image: "/Products/creatine.jpg",
      link: affiliateLinks.creatine,
      price: "$45+"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-blue-500/30">
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
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000"
            alt="Clinical Performance and Biomechanics"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* High-Fidelity Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-cyan-950/20"></div>
        
        {/* Animated Biometric Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[45rem] h-[45rem] bg-blue-600 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-[35rem] h-[35rem] bg-cyan-500 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }}>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">{t('fp_back')}</span>
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
              className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md"
            >
              <Gauge size={14} className="mr-3 animate-pulse" />
              Mitochondrial Efficiency: Optimized
            </motion.div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('fp_title')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                {t('fp_subtitle')}
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-cyan-500/50 pl-8 text-left"
            >
              {t('fp_desc')} In 2026, we view muscle not just as tissue, but as an **endocrine organ**. We optimize for mitochondrial density and force-velocity precision.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Core Methodology Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          {[
            { 
              icon: <Cpu size={32} />, 
              title: t('fp_path_a_title'), 
              desc: t('fp_path_a_desc'), 
              link: "/fitness/wearables", 
              color: "text-blue-400" 
            },
            { 
              icon: <Activity size={32} />, 
              title: t('fp_path_b_title'), 
              desc: t('fp_path_b_desc'), 
              link: "/fitness/biosensing", 
              color: "text-emerald-400" 
            },
            { 
              icon: <Zap size={32} />, 
              title: t('fp_path_c_title'), 
              desc: t('fp_path_c_desc'), 
              link: "/fitness/methodology", 
              color: "text-indigo-400" 
            }
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-slate-900/50 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/5 flex flex-col justify-between group overflow-hidden relative shadow-2xl h-full"
            >
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center ${card.color} mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                  {card.icon}
                </div>
                <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                  {card.desc}
                </p>
              </div>
              <Link to={card.link} className={`flex items-center gap-3 ${card.color} font-bold text-[10px] uppercase tracking-[0.2em] border-t border-white/5 pt-10 group/link`}>
                Protocol Archive <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Intensity Command Center */}
        <section className="mb-40">
          <div className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(6,182,212,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-12 mb-16 text-center">
                <div className="inline-flex items-center gap-4 text-cyan-400 font-black uppercase tracking-widest text-[10px] bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 mb-8">
                  <Target size={14} />
                  Adaptive Resistance & Force Production
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                  {t('fp_vo2_title')}
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl mx-auto">
                  {t('fp_vo2_desc')} Maximizing **Mitochondrial Respiration** is the ultimate offensive strategy against senescence.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                      <Timer size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white mb-4">{t('fp_recovery_title')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('fp_recovery_desc')}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                      <BarChart3 size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white mb-4">{t('fp_metric_title')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('fp_metric_desc')}</p>
                  </motion.div>
                </div>

                <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield size={24} className="text-indigo-400" />
                    <h4 className="text-xl font-display font-bold uppercase text-white">The Myokine Signal</h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                    "Intensive resistance training triggers the release of muscle-derived peptides (myokines) that regulate metabolic health and prevent neurodegeneration."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-slate-950 p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Dumbbell size={120} className="text-cyan-400" />
                  </div>
                  <div className="relative z-10 space-y-10">
                    <h3 className="text-2xl font-display font-black uppercase text-cyan-400">Tactical Control</h3>
                    
                    <div className="space-y-6">
                      {[
                        { key: 'fp_cta_oura', link: affiliateLinks.whoop, label: 'Tracking' },
                        { key: 'fp_cta_whoop', link: affiliateLinks.whoop, label: 'AI Coach' },
                        { key: 'fp_cta_coldplunge', link: affiliateLinks.us, label: 'Recovery' },
                        { key: 'fp_cta_sauna', link: affiliateLinks.us, label: 'Thermic' }
                      ].map((cta, i) => (
                        <a key={i} href={cta.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white hover:text-slate-950 transition-all group/cta">
                          <span className="flex items-center gap-4">
                            <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded group-hover/cta:bg-slate-200 uppercase">{cta.label}</span>
                            <span className="text-xs font-black uppercase tracking-tight leading-none">{t(cta.key as any)}</span>
                          </span>
                          <ExternalLink size={16} className="opacity-40 group-hover/cta:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
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
              <span className="text-cyan-500 font-black uppercase tracking-[0.3em] text-xs">Performance Arsenal</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Pillar Essentials
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-cyan-500/20 pb-4">
              Vetted 2026 Strength Tier-1 Tools
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
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-lg font-display font-black text-white">{product.price}</span>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
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
                {t('fp_top_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="fitness" limit={3} featured={true} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('fp_latest_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="fitness" limit={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

