import React, { useEffect } from 'react';
import { Heart, ArrowLeft, Activity, Shield, Zap, ExternalLink, Dna, Microscope, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

export default function HealthPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('hp_title')} ${t('hp_subtitle')} | 123TheNext Level`;
    // Meta description update (would normally use react-helmet)
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('hp_desc'));
    }
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ', // Example Bio-Age Kit US
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ', // Example Bio-Age Kit UK
    es: 'https://amazon.es/dp/B0CXM1X8PQ', // Example Bio-Age Kit ES
    nad: 'https://amazon.com/dp/B0CLB5X8X9' // Example NAD+ Booster
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        {/* Background Image with slow animation */}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2000"
          alt="Biological Age Testing and Longevity"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        
        {/* High-fidelity Glass/Mesh Overlays */}
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-transparent to-emerald-900/40"></div>
        
        {/* Animated Light Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"
        />

        {/* Technical Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

        {/* Bottom Transition Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-20 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/50 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/20 group-hover:border-white transition-colors">{t('hp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 text-indigo-400 flex items-center justify-center mb-8 shadow-2xl">
              <Activity size={40} className="animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-[clamp(4rem,8vw,10rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.85] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              {t('hp_title')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-none">
                {t('hp_subtitle')}
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            {t('hp_desc')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
        {/* Core Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div
            whileHover={{ y: -10 }}
            className="relative p-10 rounded-[2.5rem] shadow-xl border border-slate-700/30 flex flex-col items-start h-full overflow-hidden group"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200"
                alt="Diagnostics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.3]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/40 to-slate-950/80"></div>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-start">
              <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/30 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <Zap size={32} />
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-[0.02em] text-white mb-4 leading-[1.15]">
                {t('hp_shift_title')}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium">
                {t('hp_shift_desc')}
              </p>
              <div className="mt-auto pt-6 border-t border-white/10 w-full font-bold text-blue-400 flex items-center gap-2">
                <Microscope size={20} />
                <span className="uppercase tracking-widest text-xs">Diagnostic-First Approach</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="relative p-10 rounded-[2.5rem] shadow-xl border border-slate-700/30 flex flex-col items-start h-full overflow-hidden group"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71f1e3c77e?auto=format&fit=crop&q=80&w=1200"
                alt="Bio-Science"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.3]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/40 to-slate-950/80"></div>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-start">
              <div className="w-16 h-16 bg-emerald-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/30 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={32} />
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-[0.02em] text-white mb-4 leading-[1.15]">
                {t('hp_skin_title')}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium">
                {t('hp_skin_desc')}
              </p>
              <p className="text-slate-400 italic mb-6 text-sm">
                {t('hp_skin_detail')}
              </p>
              <div className="mt-auto pt-6 border-t border-white/10 w-full font-bold text-emerald-400 flex items-center gap-2">
                <Shield size={20} />
                <span className="uppercase tracking-widest text-xs">Longevity Biology 2026</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Biological Age Section */}
        <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white mb-32 overflow-hidden relative shadow-2xl shadow-indigo-900/40 group">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1530633173504-89f76977bb42?auto=format&fit=crop&q=80&w=2000"
              alt="DNA and Research"
              className="w-full h-full object-cover opacity-20 transition-transform duration-[20s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-bold text-sm uppercase tracking-widest mb-8">
                <Dna size={16} />
                DNA Methylation
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-6 leading-none">
                {t('hp_bio_age_title')}
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-10">
                {t('hp_bio_age_desc')}
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400 font-black text-xl">
                    HOW
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('hp_how_title')}</h3>
                    <p className="text-slate-400 tracking-wide">{t('hp_how_desc')}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 font-black text-xl">
                    WHY
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('hp_why_title')}</h3>
                    <p className="text-slate-400 tracking-wide">{t('hp_why_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-2xl font-display font-black uppercase tracking-tight text-center mb-4">
                {t('hp_cta_section_title')}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <a 
                  href={affiliateLinks.us} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-tighter hover:scale-[1.02] transition-transform shadow-lg group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded">US</span>
                    {t('hp_cta_kit_us')}
                  </span>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                </a>
                <a 
                  href={affiliateLinks.uk} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-tighter hover:scale-[1.02] transition-transform shadow-lg group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">UK</span>
                    {t('hp_cta_kit_uk')}
                  </span>
                  <ExternalLink size={20} className="text-white/40 group-hover:text-amber-400 transition-colors" />
                </a>
                <a 
                  href={affiliateLinks.es} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-tighter hover:scale-[1.02] transition-transform shadow-lg group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">ES</span>
                    {t('hp_cta_kit_es')}
                  </span>
                  <ExternalLink size={20} className="text-white/40 group-hover:text-amber-400 transition-colors" />
                </a>
                <a 
                  href={affiliateLinks.nad} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-black uppercase tracking-tighter hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all shadow-xl group"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles size={20} className="text-emerald-200" />
                    {t('hp_cta_skincare')}
                  </span>
                  <ExternalLink size={20} className="text-white/40 group-hover:text-white transition-colors" />
                </a>
              </div>
              <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-bold pt-4">
                International Affiliate Fulfillment
              </p>
            </div>
          </div>
        </section>

        <IntelligenceTeaser />

        {/* Blog Content Sections */}
        <div className="space-y-32 mt-32">
          {/* Top Blog Posts */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                  {t('hp_top_posts')}
                </h2>
                <div className="h-2 w-24 bg-indigo-500 mt-4 rounded-full"></div>
              </div>
              <p className="text-slate-500 font-medium max-w-sm text-lg underline decoration-slate-200 underline-offset-8">
                Optimized by AI Longevity Models
              </p>
            </div>
            <BlogSection 
              category="health" 
              limit={3} 
              featured={true}
            />
          </div>

          {/* Latest Blog Posts */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                {t('hp_latest_posts')}
              </h2>
              <div className="h-px bg-slate-200 flex-grow hidden md:block"></div>
            </div>
            <BlogSection 
              category="health" 
              limit={9} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

