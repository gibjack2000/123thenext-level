import React, { useEffect } from 'react';
import { Dumbbell, ArrowLeft, Cpu, Activity, Zap, ExternalLink, Timer, TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

export default function FitnessPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('fp_title')} ${t('fp_subtitle')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ', // Example Tracker US
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ', // Example Tracker UK
    es: 'https://amazon.es/dp/B0CXM1X8PQ', // Example Tracker ES
    equip: 'https://amazon.com/dp/B0CLB5X8X9' // Example Strength Tools
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden">
        {/* Cinematic Video with better blending */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20 scale-110"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-dumbbells-in-a-gym-4854-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950"></div>
        </div>
        
        {/* Animated Digital Grid Backdrop */}
        <motion.div 
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-1 opacity-[0.05]" 
          style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></motion.div>
        
        {/* Floating Biosensing UI Elements (SVG) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96 opacity-10"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-none stroke-current" strokeWidth="0.5">
              <circle cx="50" cy="50" r="45" strokeDasharray="5,5" />
              <circle cx="50" cy="50" r="35" strokeDasharray="10,10" />
            </svg>
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"
          />
        </div>

        {/* Technical Noise Layer */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white transition-colors">{t('fp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex flex-col items-center mb-8"
          >
            <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 text-blue-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-4 backdrop-blur-md shadow-2xl">
              <span className="flex items-center gap-2">
                <Activity size={14} className="animate-pulse" />
                Live Biometric Feed Status: Active
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-4 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('fp_title')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500">
                {t('fp_subtitle')}
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-blue-500/50 pl-8 text-left"
          >
            {t('fp_desc')} In 2026, performance is about **quieting biological noise** and achieving autonomic homeostasis through high-resolution biometric data.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 pb-32">
        {/* Navigational Paths: Level 1 Framework */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <Link to="/fitness/wearables" className="group">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-10 rounded-[3rem] shadow-2xl border border-white/10 h-full flex flex-col justify-between overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800"
                  alt="Wearables"
                  className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90"></div>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 backdrop-blur-md">
                  <Cpu size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">
                  {t('fp_path_a_title')}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                  {t('fp_path_a_desc')}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/10">
                Explore The War <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/fitness/biosensing" className="group">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-10 rounded-[3rem] shadow-2xl border border-white/10 h-full flex flex-col justify-between overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1543164904-8fa947690623?auto=format&fit=crop&q=80&w=800"
                  alt="Biosensing"
                  className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90"></div>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/20 backdrop-blur-md">
                  <Activity size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">
                  {t('fp_path_b_title')}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                  {t('fp_path_b_desc')}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/10">
                View Lab-on-Wrist <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>

          <Link to="/fitness/methodology" className="group">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-10 rounded-[3rem] shadow-2xl border border-white/10 h-full flex flex-col justify-between overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
                  alt="Methodology"
                  className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90"></div>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20 backdrop-blur-md">
                  <Zap size={28} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">
                  {t('fp_path_c_title')}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                  {t('fp_path_c_desc')}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest pt-6 border-t border-white/10">
                Protocol Standards <ExternalLink size={12} />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Central Intensity Protocol */}
        <section className="bg-slate-950 rounded-[4rem] p-10 md:p-20 border border-white/5 mb-32 relative overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.1)] group">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1518611012118-29fa113f8ec4?auto=format&fit=crop&q=80&w=2000"
              alt="High Intensity"
              className="w-full h-full object-cover opacity-20 transition-transform duration-[20s] group-hover:scale-110 brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-slate-950/70 to-slate-950"></div>
          </div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 font-black text-sm uppercase tracking-[0.2em]">
                <Zap size={16} />
                Intensity Calibration
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter leading-[0.9] text-white">
                {t('fp_vo2_title')}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {t('fp_vo2_desc')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Timer className="text-blue-400 mb-4" size={28} />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('fp_recovery_title')}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{t('fp_recovery_desc')}</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <BarChart3 className="text-emerald-400 mb-4" size={28} />
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">{t('fp_metric_title')}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{t('fp_metric_desc')}</p>
                </div>
              </div>
            </div>

            {/* Shop Integration */}
            <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 space-y-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter text-white">
                  {t('fp_cta_section_title')}
                </h3>
                <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'fp_cta_oura', link: 'https://amazon.com/dp/B0CXM1X8PQ', label: 'Hardware' },
                  { key: 'fp_cta_whoop', link: 'https://amazon.com/dp/B0CXM1X8PQ', label: 'AI Software' },
                  { key: 'fp_cta_apple', link: 'https://amazon.com/dp/B0CXM1X8PQ', label: 'Hybrid' },
                  { key: 'fp_cta_coldplunge', link: 'https://amazon.com/dp/B0CMB6X8Y1', label: 'Recovery' },
                  { key: 'fp_cta_sauna', link: 'https://amazon.com/dp/B0CMB6X8Y1', label: 'Adaptation' },
                  { key: 'fp_cta_insulin', link: 'https://amazon.com/dp/B0D5N6X8Z2', label: 'Clinical' }
                ].map((item, idx) => (
                  <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-800 rounded-3xl group hover:bg-white hover:text-slate-900 transition-all duration-500">
                    <span className="flex items-center gap-4">
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full group-hover:bg-slate-100 transition-colors uppercase font-black">{item.label}</span>
                      <span className="font-black uppercase tracking-tighter text-sm md:text-base">{t(item.key as any)}</span>
                    </span>
                    <ExternalLink className="opacity-40 group-hover:opacity-100 transition-opacity" size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <IntelligenceTeaser />

        {/* Blog Integration */}
        <div className="space-y-40">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
              <div className="space-y-4">
                <span className="text-blue-500 font-black uppercase tracking-widest text-sm">System Archive</span>
                <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white leading-none">
                  {t('fp_top_posts')}
                </h2>
              </div>
              <div className="h-px bg-white/10 flex-grow hidden lg:block mx-10 mb-6"></div>
              <div className="text-right">
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-2">Performance Models</p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
              </div>
            </div>
            <BlogSection category="fitness" limit={3} featured={true} />
          </div>

          <div>
            <div className="flex items-center gap-8 mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white leading-none whitespace-nowrap">
                {t('fp_latest_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>
            <BlogSection category="fitness" limit={9} />
          </div>
        </div>
      </div>
    </div>
  );
}

