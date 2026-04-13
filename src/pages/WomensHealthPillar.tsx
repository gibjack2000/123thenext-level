import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Target, Zap, ExternalLink, Dna, Microscope, Dumbbell, Brain, Activity, FlaskConical, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function WomensHealthPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('whp_title_start')} ${t('whp_title_end')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ', // Example Ovarian Test US
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ', // Example Ovarian Test UK
    es: 'https://amazon.es/dp/B0CXM1X8PQ', // Example Ovarian Test ES
    strength: 'https://amazon.com/dp/B0CLB5X8X9', // Example Strength Rack
    menopause: 'https://amazon.com/dp/B0CMB6X8Y1' // Example Menopause Stack
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[75vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-rose-950">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          referrerPolicy="no-referrer"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-box-jumps-in-a-gym-4853-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/90 via-rose-950/40 to-slate-50"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/70 hover:text-white font-bold uppercase tracking-tight transition-all backdrop-blur-md bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10">
            <ArrowLeft size={16} className="mr-2" />
            {t('whp_back')}
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 font-bold text-xs uppercase tracking-widest mb-8 mx-auto"
          >
            <Microscope size={14} className="mr-2" />
            Clinical Standard: 2026 Ovary-Span
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[clamp(3.5rem,7vw,8rem)] font-display font-semibold uppercase tracking-[0.02em] text-white mb-4 leading-[1.15]"
          >
            {t('whp_title_start')}<br />
            <span className="text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]">
              {t('whp_title_end')}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-rose-100/80 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            {t('whp_description')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Cornerstone Section: Ovary-Span */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          <motion.div 
            whileHover={{ y: -10 }}
            className="lg:col-span-2 bg-white p-12 rounded-[3.5rem] shadow-xl border border-rose-100 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Dna size={200} />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-8 border border-rose-100">
                <Target size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold uppercase tracking-[0.02em] text-slate-900 mb-6 leading-[1.15]">
                {t('whp_ovary_title')}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl">
                {t('whp_ovary_desc')}
              </p>
            </div>
            <div className="flex items-center gap-4 text-rose-600 font-bold text-sm uppercase tracking-widest border-t border-rose-50 pt-8">
              <Activity size={16} />
              Biomarker Feedback Loop
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-rose-900 p-12 rounded-[3.5rem] shadow-xl text-white flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-rose-300 mb-8 border border-white/10">
                <Dumbbell size={32} />
              </div>
              <h2 className="text-3xl font-display font-semibold uppercase tracking-[0.02em] mb-6 leading-tight">
                {t('whp_strength_title')}
              </h2>
              <p className="text-rose-100/70 text-lg leading-relaxed mb-8">
                {t('whp_strength_desc')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm uppercase tracking-widest">
              <Zap size={16} />
              Power Ratio: Optimized
            </div>
          </motion.div>
        </div>

        {/* AnswerThePublic QA Integration */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-[0.02em] text-slate-900 mb-4 px-4 py-2 border-b-4 border-rose-500 inline-block leading-[1.15]">
              2026 Core Protocols
            </h2>
            <p className="text-slate-500 font-medium">Answering the rising global demand for specialized female bio-optimisation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { q: t('whp_qa_nutrition_q'), a: t('whp_qa_nutrition_a'), icon: FlaskConical },
              { q: t('whp_qa_strength_q'), a: t('whp_qa_strength_a'), icon: Dumbbell },
              { q: t('whp_qa_test_q'), a: t('whp_qa_test_a'), icon: Microscope }
            ].map((qa, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <qa.icon className="text-rose-500 mb-6" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">{qa.q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{qa.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Interventions & Shop */}
        <section className="bg-slate-900 rounded-[4rem] p-10 md:p-20 text-white mb-32 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/10 blur-[120px] -ml-48 -mb-48"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-[0.02em] leading-[1.15]">
                {t('whp_clinical_title')}
              </h2>
              <p className="text-xl text-rose-100/60 leading-relaxed">
                {t('whp_clinical_desc')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <Brain className="text-rose-400 mb-4" size={24} />
                  <h4 className="font-bold mb-2 uppercase text-xs tracking-widest text-rose-300">Cognitive Shield</h4>
                  <p className="text-white/60 text-sm">Creatine monohydrate protocols for brain energy and menopause cognitive decline.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <Zap className="text-rose-400 mb-4" size={24} />
                  <h4 className="font-bold mb-2 uppercase text-xs tracking-widest text-rose-300">Cellular Youth</h4>
                  <p className="text-white/60 text-sm">NAD+ precursors for mitochondrial resilience and skin-structural regeneration.</p>
                </div>
              </div>
            </div>

            {/* Shop Integration Card */}
            <div className="bg-white rounded-[3rem] p-10 md:p-12 text-slate-900 shadow-2xl space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">
                  {t('whp_cta_section_title')}
                </h3>
                <p className="text-slate-500 font-medium">Precision Intervention Tools</p>
              </div>

              <div className="space-y-4">
                <a href={affiliateLinks.us} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-rose-600 hover:text-white transition-all duration-300">
                  <span className="font-bold flex items-center gap-4">
                    <span className="text-xs bg-slate-200 group-hover:bg-rose-500 px-3 py-1 rounded-full text-slate-600 group-hover:text-white">USA</span>
                    {t('whp_cta_test_us')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.uk} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-rose-600 hover:text-white transition-all duration-300">
                  <span className="font-bold flex items-center gap-4">
                    <span className="text-xs bg-slate-200 group-hover:bg-rose-500 px-3 py-1 rounded-full text-slate-600 group-hover:text-white">UK</span>
                    {t('whp_cta_test_uk')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.es} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-rose-600 hover:text-white transition-all duration-300">
                  <span className="font-bold flex items-center gap-4">
                    <span className="text-xs bg-slate-200 group-hover:bg-rose-500 px-3 py-1 rounded-full text-slate-600 group-hover:text-white">ES</span>
                    {t('whp_cta_test_es')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.strength} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-rose-600 text-white rounded-3xl group hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20">
                  <span className="font-bold flex items-center gap-4">
                    <Dumbbell size={20} />
                    {t('whp_cta_strength')}
                  </span>
                  <ExternalLink className="opacity-60 group-hover:opacity-100" size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Women's Health Articles */}
        <div className="space-y-32">
          <div>
            <div className="flex items-center gap-6 mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                {t('whp_top_posts')}
              </h2>
              <div className="h-0.5 bg-rose-100 flex-grow"></div>
            </div>
            <BlogSection category="womens-health" limit={3} featured={true} />
          </div>

          <div>
            <div className="flex items-center gap-6 mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                {t('whp_latest_posts')}
              </h2>
              <div className="h-0.5 bg-rose-100 flex-grow"></div>
            </div>
            <BlogSection category="womens-health" limit={9} />
          </div>
        </div>
      </div>
    </div>
  );
}
