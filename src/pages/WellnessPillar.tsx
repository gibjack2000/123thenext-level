import React, { useEffect } from 'react';
import { Sparkles, ArrowLeft, Sun, ThermometerSnowflake, Moon, Eye, ExternalLink, Brain, Waves, RefreshCw, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function WellnessPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('wp_title_start')} ${t('wp_title_end')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0D4N3L9XW', // Example Recovery Pod US
    uk: 'https://amazon.co.uk/dp/B0D4N3L9XW', // Example Recovery Pod UK
    es: 'https://amazon.es/dp/B0D4N3L9XW', // Example Recovery Pod ES
    nootropics: 'https://amazon.com/dp/B00V4L7J5E' // Example Neuro Stack
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-indigo-950">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000"
          alt="Bio-Harmonization and Neuro-Recovery"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-950/40 to-slate-50"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/70 hover:text-white font-bold uppercase tracking-tight transition-all backdrop-blur-md bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10">
            <ArrowLeft size={16} className="mr-2" />
            {t('wp_back')}
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-bold text-xs uppercase tracking-widest mb-8 mx-auto"
          >
            <Brain size={14} className="mr-2" />
            Neural State: Re-Regulating
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter text-white mb-4 leading-[0.85]"
          >
            {t('wp_title_start')}<br />
            <span className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]">
              {t('wp_title_end')}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-indigo-100/80 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            {t('wp_description')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Core Wellness Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-indigo-100 flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100">
                <Sun size={32} />
              </div>
              <h2 className="text-4xl font-display font-black uppercase tracking-tight text-slate-900 mb-6 leading-none">
                {t('wp_circadian_title')}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {t('wp_circadian_desc')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
              <Eye size={16} />
              Light Hygiene Log
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-indigo-100 flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100">
                <ThermometerSnowflake size={32} />
              </div>
              <h2 className="text-4xl font-display font-black uppercase tracking-tight text-slate-900 mb-6 leading-none">
                {t('wp_hormetic_title')}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {t('wp_hormetic_desc')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
              <Zap size={16} />
              Resilience Index
            </div>
          </motion.div>
        </div>

        {/* Deep Dive Section */}
        <section className="bg-indigo-900 rounded-[4rem] p-10 md:p-20 text-white mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-800/50 blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9]">
                {t('wp_recovery_title')}
              </h2>
              <p className="text-xl text-indigo-50/80 leading-relaxed">
                {t('wp_recovery_desc')}
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400">
                    <Waves size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('wp_nature_title')}</h3>
                    <p className="text-indigo-100/60 text-sm leading-relaxed">{t('wp_nature_desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Integration Card */}
            <div className="bg-white rounded-[3rem] p-10 md:p-12 text-slate-900 shadow-2xl space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">
                  {t('wp_cta_section_title')}
                </h3>
                <p className="text-slate-500 font-medium">Neural Reset Tools</p>
              </div>

              <div className="space-y-4">
                <a href={affiliateLinks.us} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  <span className="font-bold flex items-center gap-4">
                    <span className="text-xs bg-slate-200 group-hover:bg-indigo-500 px-3 py-1 rounded-full">USA</span>
                    {t('wp_cta_sauna_us')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.uk} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  <span className="font-bold flex items-center gap-4">
                    <span className="text-xs bg-slate-200 group-hover:bg-indigo-500 px-3 py-1 rounded-full">UK</span>
                    {t('wp_cta_sauna_uk')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.es} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  <span className="font-bold flex items-center gap-4">
                    <span className="text-xs bg-slate-200 group-hover:bg-indigo-500 px-3 py-1 rounded-full">ES</span>
                    {t('wp_cta_sauna_es')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.nootropics} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-indigo-600 text-white rounded-3xl group hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                  <span className="font-bold flex items-center gap-4">
                    <RefreshCw size={20} />
                    {t('wp_cta_nootropics')}
                  </span>
                  <ExternalLink className="opacity-60 group-hover:opacity-100" size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Wellness Articles */}
        <div className="space-y-32">
          <div>
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                {t('wp_top_posts')}
              </h2>
              <div className="h-0.5 bg-slate-200 flex-grow"></div>
            </div>
            <BlogSection category="wellness" limit={3} featured={true} />
          </div>

          <div>
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                {t('wp_latest_posts')}
              </h2>
              <div className="h-0.5 bg-slate-200 flex-grow"></div>
            </div>
            <BlogSection category="wellness" limit={9} />
          </div>
        </div>
      </div>
    </div>
  );
}

