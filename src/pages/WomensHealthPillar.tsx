import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Target, Zap, ExternalLink, Dna, Microscope, Dumbbell, Brain, Activity, FlaskConical, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

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
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden bg-rose-950 text-white">
        {/* Cinematic Backdrop Layer */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20 scale-105"
            referrerPolicy="no-referrer"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-box-jumps-in-a-gym-4853-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-rose-900/40 to-rose-950"></div>
        </div>

        {/* Floating Cellular/Hormonal Light Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, 80, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-20 w-[45rem] h-[45rem] bg-rose-500/10 rounded-full blur-[160px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.3, 1, 1.3],
            x: [0, -80, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-[35rem] h-[35rem] bg-orange-400/10 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Technical Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white transition-colors">{t('whp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 text-rose-300 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 backdrop-blur-md shadow-2xl">
              <span className="flex items-center gap-3">
                <Microscope size={14} className="animate-pulse" />
                Clinical Standard: 2026 Ovary-Span
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('whp_title_start')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-rose-500">
                {t('whp_title_end')}
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-rose-100/50 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-rose-500/30 pl-8 text-left italic"
            >
              {t('whp_description')} In 2026, we transition beyond menopause "management" into the **"Ovary-Span" paradigm**, treating ovarian health as the primary driver of systemic longevity for the female physiology.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 pb-32">
        {/* Navigational Paths: Ovary-Span Framework */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <Link to="/womens-health/longevity" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-rose-100 h-full flex flex-col justify-between hover:border-rose-300 transition-colors"
            >
              <div>
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-8 border border-rose-100">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900 mb-4">
                  {t('whp_path_a_title')}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {t('whp_path_a_desc')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest pt-6 border-t border-rose-50">
                Command Centre <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/womens-health/performance" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-rose-900 p-10 rounded-[3rem] shadow-xl text-white h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-rose-300 mb-8 border border-white/10">
                  <Dumbbell size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4">
                  {t('whp_path_b_title')}
                </h3>
                <p className="text-rose-100/70 leading-relaxed mb-6">
                  {t('whp_path_b_desc')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/10">
                Functional Edge <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/womens-health/metabolic" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-rose-100 h-full flex flex-col justify-between hover:border-rose-300 transition-colors"
            >
              <div>
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-8 border border-rose-100">
                  <Brain size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900 mb-4">
                  {t('whp_path_c_title')}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {t('whp_path_c_desc')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest pt-6 border-t border-rose-50">
                Cognitive Fuel <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>
        </div>

        <IntelligenceTeaser />


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
                {[
                  { key: 'whp_cta_test_us', link: affiliateLinks.us, label: 'Diagnostic' },
                  { key: 'whp_cta_test_uk', link: affiliateLinks.uk, label: 'Diagnostic' },
                  { key: 'whp_cta_test_es', link: affiliateLinks.es, label: 'Diagnostic' },
                  { key: 'whp_cta_creatine', link: 'https://amazon.com/dp/B0CXM1X8PQ', label: 'Cognitive' },
                  { key: 'whp_cta_nad', link: 'https://amazon.com/dp/B0D5N6X8Z2', label: 'Cellular' },
                  { key: 'whp_cta_epigenetic', link: 'https://amazon.com/dp/B0D5N6X8Z2', label: 'Longevity' },
                  { key: 'whp_cta_strength', link: affiliateLinks.strength, label: 'Performance' },
                  { key: 'whp_cta_memberships', link: '#', label: 'Community' }
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
