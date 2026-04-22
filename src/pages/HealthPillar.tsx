import React, { useEffect } from 'react';
import { Heart, ArrowLeft, Activity, Shield, Zap, ExternalLink, Dna, Microscope, Sparkles, Binary, FlaskConical, Target, Search, Moon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

export default function HealthPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('hp_title')} ${t('hp_subtitle')} | 123TheNext Level`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('hp_desc'));
    }
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    es: 'https://amazon.es/dp/B0CXM1X8PQ',
    nad: 'https://amazon.com/dp/B0CLB5X8X9',
    withings: 'https://amazon.com/dp/B071Z9V24Q',
    oura: 'https://amazon.com/dp/B0CXM1X8PQ'
  };

  const pillarEssentials = [
    {
      name: "Biological Age Arsenal",
      brand: "TruDiagnostic / InsideTracker",
      desc: "Measure the biological pace of aging through DNA methylation (clocks).",
      image: "/Products/withings.jpg", // Representing tracking/data
      link: affiliateLinks.us,
      price: "$299+"
    },
    {
      name: "Cellular Recharging Stack",
      brand: "Thorne / Elysium",
      desc: "NAD+ precursors to trigger SIRT1 activation and DNA repair.",
      image: "/Products/thorne.jpg",
      link: affiliateLinks.nad,
      price: "$85+"
    },
    {
      name: "Bio-Response Biomarkers",
      brand: "Precision Minerals",
      desc: "Magnesium & Vitamin D3/K2 for systemic homeostasis.",
      image: "/Products/vitd3.jpg",
      link: affiliateLinks.us,
      price: "$35+"
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
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2000"
            alt="Biological Age Testing and Longevity"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* High-Fidelity Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-emerald-950/20"></div>
        
        {/* Animated Genetic Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[40rem] h-[40rem] bg-indigo-600 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-emerald-500 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Technical Data Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)", backgroundSize: "48px 48px" }}>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">{t('hp_back')}</span>
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
              <Activity size={14} className="mr-3 animate-pulse" />
              Real-Time Biometric Calibration: Active
            </motion.div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('hp_title')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-emerald-400">
                {t('hp_subtitle')}
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-indigo-500/50 pl-8 text-left"
            >
              {t('hp_desc')} In 2026, we move beyond "lifestyle" into **precision biological intervention**, silencing aging genes and maximizing Healthspan through clinical bio-data.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Sub-Hub Entry Points: The 2026 Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900/50 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 flex flex-col justify-between group overflow-hidden relative shadow-2xl h-full"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-indigo-400 mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Search size={32} />
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[1]">
                Biometric<br />Foundation
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium italic">
                 Proactive diagnostic monitoring to identify sub-clinical risks before they manifest as chronic disease.
              </p>
              <Link to="/health/preventive" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:text-white transition-colors font-display">
                 Enter Diagnostic Archive <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900/50 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 flex flex-col justify-between group overflow-hidden relative shadow-2xl h-full"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-blue-400 mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Dna size={32} />
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[1]">
                Cellular<br />Engineering
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium italic">
                 Epigenetic maintenance focusing on NAD+ homeostasis, senolytic clearance, and mitochondrial density.
              </p>
              <Link to="/health/cellular" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors font-display">
                 Enter Molecular Lab <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900/50 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 flex flex-col justify-between group overflow-hidden relative shadow-2xl h-full"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-rose-400 mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Moon size={32} />
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-6 leading-[1]">
                Systemic<br />Maintenance
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium italic">
                 Optimizing the glymphatic window and autonomic recovery through thermic signaling and deep sleep engineering.
              </p>
              <Link to="/health/maintenance" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-400 group-hover:text-white transition-colors font-display">
                 Enter Recovery Suite <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>


        {/* Bio-Age Command Center */}
        <section className="mb-40">
          <div className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-12 mb-16 text-center">
                <div className="inline-flex items-center gap-4 text-indigo-400 font-black uppercase tracking-widest text-[10px] bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-500/20 mb-8">
                  <Target size={14} />
                  Clinically Validated Diagnostic Control
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                  {t('hp_bio_age_title')}
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl mx-auto">
                  {t('hp_bio_age_desc')} We utilize 3rd-generation epigenetic clocks to calculate your **Pace of Aging** with 99.2% accuracy.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                      <Binary size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white mb-4">{t('hp_how_title')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('hp_how_desc')}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                      <Activity size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white mb-4">{t('hp_why_title')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('hp_why_desc')}</p>
                  </motion.div>
                </div>

                <Link to="/health/preventive" className="flex items-center justify-between p-8 bg-[#1e293b] text-white rounded-[2.5rem] hover:bg-indigo-600 transition-all font-bold uppercase tracking-widest text-xs group shadow-xl">
                  <span>Enter Diagnostic Archive</span>
                  <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-slate-950 p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Dna size={120} className="text-indigo-400" />
                  </div>
                  <div className="relative z-10 space-y-10">
                    <h3 className="text-2xl font-display font-black uppercase text-indigo-400">2026 Partner Suite</h3>
                    
                    <div className="space-y-6">
                      {[
                        { label: t('hp_cta_kit_us'), link: affiliateLinks.us, country: "US" },
                        { label: t('hp_cta_kit_uk'), link: affiliateLinks.uk, country: "UK" },
                        { label: t('hp_cta_kit_es'), link: affiliateLinks.es, country: "ES" }
                      ].map((cta, i) => (
                        <a key={i} href={cta.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white hover:text-slate-950 transition-all group/cta">
                          <span className="flex items-center gap-4">
                            <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded group-hover/cta:bg-slate-200">{cta.country}</span>
                            <span className="text-xs font-black uppercase tracking-tight leading-none">{cta.label}</span>
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
              <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs">Clinical Arsenal</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Pillar Essentials
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-indigo-500/20 pb-4">
              Vetted 2026 Longevity Tier-1 Products
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
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.9]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-lg font-display font-black text-white">{product.price}</span>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
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
                {t('hp_top_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="health" limit={3} featured={true} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('hp_latest_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="health" limit={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

