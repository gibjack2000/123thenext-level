import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Target, Zap, ExternalLink, Dna, Microscope, Dumbbell, Brain, Activity, FlaskConical, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';
import { useAffiliateLinks } from '../contexts/AffiliateLinksContext';

export default function WomensHealthPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('whp_title_start')} ${t('whp_title_end')} | 123TheNext Level`;
  }, [t]);

  const { links } = useAffiliateLinks();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden bg-rose-950">
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
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            {t('whp_description')} In 2026, we transition beyond menopause "management" into the **"Ovary-Span" paradigm**, treating ovarian health as the primary driver of systemic longevity for the female physiology.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 pb-32">
        {/* Navigational Paths: Ovary-Span Framework */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <Link to="/womens-health/longevity" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-10 rounded-[3rem] shadow-xl h-full flex flex-col justify-between overflow-hidden border border-rose-100/20 hover:border-rose-300/50 transition-colors"
            >
              {/* Background Image and Overlays */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)' }}
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/40" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-rose-300 mb-8 border border-white/20">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4 drop-shadow-md">
                  {t('whp_path_a_title')}
                </h3>
                <p className="text-white/80 leading-relaxed mb-6 font-medium">
                  {t('whp_path_a_desc')}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/20">
                Command Centre <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/womens-health/performance" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-10 rounded-[3rem] shadow-xl h-full flex flex-col justify-between overflow-hidden border border-white/10 transition-colors"
            >
              {/* Background Image and Overlays */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534367507873-d2d7e249a3f2?q=80&w=1470&auto=format&fit=crop)' }}
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-rose-950/95 via-rose-950/50 to-rose-950/40" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-rose-300 mb-8 border border-white/20">
                  <Dumbbell size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4 drop-shadow-md">
                  {t('whp_path_b_title')}
                </h3>
                <p className="text-rose-100/80 leading-relaxed mb-6 font-medium">
                  {t('whp_path_b_desc')}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/10">
                Functional Edge <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/womens-health/metabolic" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-10 rounded-[3rem] shadow-xl h-full flex flex-col justify-between overflow-hidden border border-rose-100/20 hover:border-rose-300/50 transition-colors"
            >
              {/* Background Image and Overlays */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop)' }}
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/40" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-rose-300 mb-8 border border-white/20">
                  <Brain size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4 drop-shadow-md">
                  {t('whp_path_c_title')}
                </h3>
                <p className="text-white/80 leading-relaxed mb-6 font-medium">
                  {t('whp_path_c_desc')}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/20">
                Cognitive Fuel <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>
        </div>

        <IntelligenceTeaser />


        {/* Clinical Interventions & Shop */}
        <section className="relative bg-slate-900 rounded-[4rem] p-10 md:p-20 text-white mb-32 overflow-hidden border border-white/5">
          {/* Background Image and Overlays */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579154273151-54415510665d?q=80&w=1470&auto=format&fit=crop)' }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-rose-950/40" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/20 blur-[120px] -ml-48 -mb-48"></div>
          
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
                {[
                  { key: 'whp_cta_test_us', link: links.us, label: 'Diagnostic' },
                  { key: 'whp_cta_test_uk', link: links.uk, label: 'Diagnostic' },
                  { key: 'whp_cta_test_es', link: links.es, label: 'Diagnostic' },
                  { key: 'whp_cta_creatine', link: links.creatine, label: 'Cognitive' },
                  { key: 'whp_cta_nad', link: links.nad, label: 'Cellular' },
                  { key: 'whp_cta_epigenetic', link: links.epigenetic, label: 'Longevity' },
                  { key: 'whp_cta_strength', link: links.strength, label: 'Performance' },
                  { key: 'whp_cta_memberships', link: links.memberships, label: 'Community' }
                ].map((item, idx) => (
                  <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-rose-600 hover:text-white transition-all duration-300">
                    <span className="font-bold flex items-center gap-4">
                      <span className="text-[10px] bg-slate-200 group-hover:bg-rose-500 px-2 py-0.5 rounded-full text-slate-600 group-hover:text-white uppercase font-black">{item.label}</span>
                      <span className="text-sm md:text-base">{t(item.key as any)}</span>
                    </span>
                    <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                  </a>
                ))}
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
