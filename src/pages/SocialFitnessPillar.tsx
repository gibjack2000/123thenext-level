import React, { useEffect } from 'react';
import { Users, ArrowLeft, Heart, Zap, ExternalLink, Sun, Music, MessageSquare, MapPin, Smile, Thermometer, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

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
    <div className="min-h-screen bg-orange-50/30 text-slate-900 font-sans antialiased">
      {/* Hero Section */}
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden bg-orange-600 text-white">
        {/* Cinematic Backdrop Layer */}
        <div className="absolute inset-0 z-0 scale-110">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/social-fitness-bg.png"
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
            referrerPolicy="no-referrer"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-walking-on-a-sunny-day-4852-large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dynamic Sun-Drenched Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/90 via-orange-500/40 to-orange-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(253,224,71,0.2),transparent_60%)]"></div>

        {/* Floating Community Energy Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            x: [0, 60, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-yellow-400/20 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -60, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 left-10 w-[30rem] h-[30rem] bg-orange-300/20 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Technical Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white transition-colors">{t('sfp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="px-6 py-2 rounded-2xl bg-white/10 border border-white/20 text-white font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 backdrop-blur-md shadow-2xl">
              <span className="flex items-center gap-3">
                <Users size={14} className="animate-pulse" />
                The Wellness Renaissance 2026
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('sfp_title_start')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-400">
                {t('sfp_title_end')}
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/70 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-white/30 pl-8 text-left italic"
            >
              {t('sfp_description')} In 2026, we embrace the **"Renaissance of Connection,"** moving beyond "lonely fitness" into collective energy and nervous system safety.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 pb-32">
        {/* Navigational Paths: Social Fitness Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <Link to="/social-fitness/pickleball" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-orange-100 h-full flex flex-col justify-between hover:border-orange-300 transition-colors"
            >
              <div>
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-8 border border-orange-100">
                  <Sun size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900 mb-4">
                  {t('sfp_path_a_title')}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {t('sfp_path_a_desc')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest pt-6 border-t border-orange-50">
                Active Aging <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/social-fitness/festivals" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-orange-600 p-10 rounded-[3rem] shadow-xl text-white h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-200 mb-8 border border-white/10">
                  <Music size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4">
                  {t('sfp_path_b_title')}
                </h3>
                <p className="text-orange-50 leading-relaxed mb-6">
                  {t('sfp_path_b_desc')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-orange-200 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/10">
                Festivalization <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/social-fitness/recovery" className="group">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-slate-900 p-10 rounded-[3rem] shadow-xl text-white h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400 mb-8 border border-white/10">
                  <Thermometer size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4">
                  {t('sfp_path_c_title')}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {t('sfp_path_c_desc')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/5">
                Shared Ritual <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>
        </div>

        <IntelligenceTeaser />


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
                {[
                  { key: 'sfp_cta_paddle', link: affiliateLinks.us, label: 'Equipment' },
                  { key: 'sfp_cta_hyrox', link: affiliateLinks.festivals, label: 'Mass Event' },
                  { key: 'sfp_cta_recovery', link: affiliateLinks.recovery, label: 'Collective' },
                  { key: 'sfp_cta_wardrobe', link: '#', label: 'Apparel' },
                  { key: 'sfp_cta_group_tech', link: '#', label: 'Tech' }
                ].map((item, idx) => (
                  <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-sm">
                    <span className="font-bold flex items-center gap-4">
                      <span className="text-[10px] bg-slate-200 group-hover:bg-orange-500 px-2 py-0.5 rounded-full text-slate-600 group-hover:text-white uppercase font-black">{item.label}</span>
                      <span className="text-sm md:text-base">{t(item.key as any)}</span>
                    </span>
                    <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                  </a>
                ))}
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
