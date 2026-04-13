import React, { useEffect } from 'react';
import { Users, ArrowLeft, Heart, Zap, ExternalLink, Sun, Music, MessageSquare, MapPin, Smile, Thermometer, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function SocialFitnessPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('sfp_title_start')} ${t('sfp_title_end')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ', // Example Pickleball US
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ', // Example Pickleball UK
    es: 'https://amazon.es/dp/B0CXM1X8PQ', // Example Pickleball ES
    festivals: 'https://hyrox.com', // Example Festival
    recovery: 'https://amazon.com/dp/B0CMB6X8Y1' // Example Group Recovery Tool
  };

  return (
    <div className="min-h-screen bg-orange-50/30 text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[75vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-orange-500">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/social-fitness-bg.png"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          referrerPolicy="no-referrer"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-walking-on-a-sunny-day-4852-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/90 via-orange-500/40 to-orange-50/30"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/70 hover:text-white font-bold uppercase tracking-tight transition-all backdrop-blur-md bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10">
            <ArrowLeft size={16} className="mr-2" />
            {t('sfp_back')}
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-widest mb-8 mx-auto backdrop-blur-sm"
          >
            <Users size={14} className="mr-2" />
            The Wellness Renaissance 2026
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[clamp(3.5rem,7vw,8rem)] font-display font-semibold uppercase tracking-[0.02em] text-white mb-4 leading-[1.15]"
          >
            {t('sfp_title_start')}<br />
            <span className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)]">
              {t('sfp_title_end')}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            {t('sfp_description')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Core Narrative Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-orange-100 flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-8 border border-orange-100">
                <Music size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-6 leading-[1.15]">
                {t('sfp_festival_title')}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {t('sfp_festival_desc')}
              </p>
            </div>
            <div className="flex items-center gap-4 text-orange-600 font-bold text-sm uppercase tracking-widest border-t border-orange-50 pt-8">
              <Smile size={16} />
              Joy Density: Maximum
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900 p-12 rounded-[3.5rem] shadow-xl text-white flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-8 border border-white/10">
                <Sun size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold uppercase tracking-[0.02em] mb-6 leading-none">
                {t('sfp_pickleball_title')}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {t('sfp_pickleball_desc')}
              </p>
            </div>
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-widest border-t border-white/5 pt-8 w-full">
              <MapPin size={16} />
              Active Aging Ecosystem
            </div>
          </motion.div>
        </div>

        {/* AnswerThePublic QA Integration */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-[0.02em] text-slate-900 mb-4 px-4 py-2 border-b-4 border-yellow-500 inline-block leading-[1.15]">
              Community Intelligence
            </h2>
            <p className="text-slate-500 font-medium">Navigating the return of biological necessity: Connection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { q: t('sfp_qa_find_q'), a: t('sfp_qa_find_a'), icon: MapPin },
              { q: t('sfp_qa_why_q'), a: t('sfp_qa_why_a'), icon: Heart },
              { q: t('sfp_qa_what_q'), a: t('sfp_qa_what_a'), icon: Ticket }
            ].map((qa, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <qa.icon className="text-orange-500 mb-6" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">{qa.q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{qa.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Collective Catharsis & Shop */}
        <section className="bg-orange-600 rounded-[4rem] p-10 md:p-20 text-white mb-32 relative overflow-hidden shadow-2xl shadow-orange-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-[0.02em] leading-[1.15]">
                {t('sfp_catharsis_title')}
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                {t('sfp_catharsis_desc')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
                  <Thermometer className="text-yellow-300 mb-4" size={24} />
                  <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Social Heat</h4>
                  <p className="text-white/70 text-sm">Group sauna sessions for shared physiological reset and emotional safety.</p>
                </div>
                <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
                  <Smile className="text-yellow-300 mb-4" size={24} />
                  <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Somatic Sync</h4>
                  <p className="text-white/70 text-sm">Group breathwork and emotional release events for collective catharsis.</p>
                </div>
              </div>
            </div>

            {/* Shop/CTA Module */}
            <div className="bg-white rounded-[3rem] p-10 md:p-12 text-slate-900 shadow-2xl space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">
                  {t('sfp_cta_section_title')}
                </h3>
                <p className="text-slate-500 font-medium">Equipping the Collective</p>
              </div>

              <div className="space-y-4">
                <a href={affiliateLinks.us} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-sm">
                  <span className="font-bold flex items-center gap-4">
                    <span className="text-xs bg-slate-200 group-hover:bg-orange-500 px-3 py-1 rounded-full text-slate-600 group-hover:text-white">Gear</span>
                    {t('sfp_cta_pickleball')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.festivals} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-sm">
                  <span className="font-bold flex items-center gap-4">
                    <Ticket className="text-orange-500 group-hover:text-orange-200" size={20} />
                    {t('sfp_cta_festivals')}
                  </span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={affiliateLinks.recovery} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-orange-600 text-white rounded-3xl group hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20">
                  <span className="font-bold flex items-center gap-4 text-lg">
                    <Users size={24} />
                    {t('sfp_cta_recovery')}
                  </span>
                  <ExternalLink className="opacity-60 group-hover:opacity-100" size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Community Articles */}
        <div className="space-y-32">
          <div>
            <div className="flex items-center gap-6 mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                {t('sfp_top_posts')}
              </h2>
              <div className="h-0.5 bg-orange-200 flex-grow"></div>
            </div>
            <BlogSection category="social-fitness" limit={3} featured={true} />
          </div>

          <div>
            <div className="flex items-center gap-6 mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                {t('sfp_latest_posts')}
              </h2>
              <div className="h-0.5 bg-orange-200 flex-grow"></div>
            </div>
            <BlogSection category="social-fitness" limit={9} />
          </div>
        </div>
      </div>
    </div>
  );
}
