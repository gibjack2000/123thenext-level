import React, { useEffect } from 'react';
import { Brain, ArrowLeft, ArrowRight, Activity, Shield, Zap, Microscope, Cpu, Heart, Layers, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function NeurowellnessPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('wp_title_start')}${t('wp_title_end')} | 123TheNext Level`;
  }, [t]);

  const deepDivePaths = [
    {
      title: t('wp_path_a_title'),
      desc: t('wp_path_a_desc'),
      to: "/neurowellness/hard-care",
      icon: Cpu,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: t('wp_path_b_title'),
      desc: t('wp_path_b_desc'),
      to: "/neurowellness/soft-care",
      icon: Activity,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: t('wp_path_c_title'),
      desc: t('wp_path_c_desc'),
      to: "/neurowellness/metabolism",
      icon: Microscope,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Level 1: Master Hub Hero */}
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden bg-slate-950">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-blue-neural-network-33678-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-50"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/70 hover:text-white font-bold uppercase tracking-tight transition-all backdrop-blur-md bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10">
            <ArrowLeft size={16} className="mr-2" />
            {t('wp_back')}
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-xs uppercase tracking-widest mb-8 mx-auto"
          >
            <Shield size={14} className="mr-2" />
            2026 Medicalized Wellness Standard
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[clamp(3.5rem,7vw,8rem)] font-display font-semibold uppercase tracking-[0.02em] text-white mb-6 leading-[1.15]"
          >
            {t('wp_title_start')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]">
              {t('wp_title_end')}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-slate-300 font-medium max-w-4xl mx-auto leading-tight"
          >
            {t('wp_hub_narrative_title')}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t('wp_hub_narrative_p')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 pb-32">
        {/* Navigation Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {deepDivePaths.map((path, idx) => (
            <motion.div 
              key={path.to}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={path.to} className="block group h-full">
                <div className="h-full bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden group-hover:border-blue-500/20 transition-all">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity animate-pulse`} />
                  
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-8 border border-slate-100 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg transition-all duration-500">
                    <path.icon size={32} />
                  </div>
                  
                  <h3 className="text-3xl font-display uppercase tracking-tight text-slate-900 mb-4 leading-none decoration-blue-500 decoration-2 group-hover:underline underline-offset-8">
                    {path.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {path.desc}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-widest gap-2">
                    Enter Protocol <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Level 1 Content: Polyvagal Paradigm */}
        <div className="bg-slate-900 rounded-[4rem] overflow-hidden mb-32 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
          <div className="relative p-12 md:p-24 flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8">
                <Layers size={14} className="mr-2" />
                The Clinical Foundation
              </div>
              <h2 className="text-[clamp(3.5rem,7vw,8rem)] font-display font-semibold uppercase tracking-[0.02em] text-white mb-8 leading-[1.15]">
                {t('wp_polyvagal_title')}
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Ventral Vagal", text: t('wp_polyvagal_ventral'), color: "bg-emerald-500" },
                  { title: "Sympathetic", text: t('wp_polyvagal_sympathetic'), color: "bg-orange-500" },
                  { title: "Dorsal Vagal", text: t('wp_polyvagal_dorsal'), color: "bg-blue-500" }
                ].map((circuit) => (
                  <div key={circuit.title} className="flex gap-6 items-start group">
                    <div className={`mt-2 w-3 h-3 rounded-full ${circuit.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-150 transition-transform`} />
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{circuit.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed">{circuit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
               <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-[100px] absolute inset-0 animate-pulse"></div>
               <img 
                 src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200" 
                 alt="Neural pathways" 
                 className="relative z-10 w-full h-auto rounded-[3rem] shadow-3xl grayscale brightness-110 opacity-80"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>
        </div>

        {/* Movement as Medicine */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-xl border border-slate-100 flex flex-col justify-center">
             <h2 className="text-[clamp(3.5rem,7vw,8rem)] font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-8 leading-[1.15]">
               {t('wp_movement_med_title')}
             </h2>
             <p className="text-xl text-slate-600 leading-relaxed mb-10 italic">
               "{t('wp_movement_med_p')}"
             </p>
             <Link to="/fitness" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-blue-600 transition-all hover:shadow-xl hover:shadow-blue-500/20">
               Explore Performance Data <ArrowRight size={18} className="ml-3" />
             </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white flex flex-col justify-end group">
                <div className="mb-auto w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <h4 className="text-4xl font-display font-semibold uppercase mb-2">Irisin</h4>
                <p className="text-white/70 text-sm font-bold tracking-widest uppercase">The Exercise Hormone</p>
             </div>
             <div className="bg-white border border-slate-200 rounded-[3rem] p-10 flex flex-col justify-end group">
                <div className="mb-auto w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform text-blue-600">
                  <Brain size={24} />
                </div>
                <h4 className="text-4xl font-display font-semibold uppercase mb-2 text-[#2D2D2D]">BDNF</h4>
                <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">Brain Growth Factor</p>
             </div>
          </div>
        </div>

        {/* Intelligence Feed Section */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4">
                <Activity size={14} className="mr-2" />
                Latest Research
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] leading-[0.85]">
                {t('wp_latest_posts')}
              </h2>
            </div>
            <div className="flex gap-4">
               {['How', 'Why', 'Vs', 'For'].map((q) => (
                 <div key={q} className="px-4 py-2 rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   {q}
                 </div>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { q: t('wp_blog_q1'), icon: Activity },
               { q: t('wp_blog_q2'), icon: Microscope },
               { q: t('wp_blog_q3'), icon: Zap },
               { q: t('wp_blog_q4'), icon: Shield }
             ].map((post, idx) => (
               <motion.div 
                 key={idx}
                 whileHover={{ scale: 1.02, y: -5 }}
                 className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col group cursor-pointer"
               >
                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <post.icon size={20} />
                 </div>
                 <p className="text-lg font-bold text-slate-800 leading-snug underline decoration-blue-500/0 group-hover:decoration-blue-500/100 underline-offset-4 transition-all">
                   "{post.q}"
                 </p>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Conversion Layer: The 2026 Arsenal */}
        <div className="bg-white rounded-[5rem] p-12 md:p-24 shadow-3xl border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
          <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-16">
            The Neuro-Optimization Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                 <Activity size={40} />
               </div>
               <h4 className="text-xl font-bold mb-4 uppercase tracking-wider">{t('wp_conv_diagnostic')}</h4>
               <a href="#" className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center hover:scale-110 transition-transform">
                 Shop Diagnostics <ExternalLink size={14} className="ml-2" />
               </a>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 rounded-3xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                 <Zap size={40} />
               </div>
               <h4 className="text-xl font-bold mb-4 uppercase tracking-wider">{t('wp_conv_vns')}</h4>
               <a href="#" className="text-purple-600 font-black text-xs uppercase tracking-widest flex items-center hover:scale-110 transition-transform">
                 Order Neurotech <ExternalLink size={14} className="ml-2" />
               </a>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                 <Heart size={40} />
               </div>
               <h4 className="text-xl font-bold mb-4 uppercase tracking-wider">{t('wp_conv_skincare')}</h4>
               <a href="#" className="text-emerald-600 font-black text-xs uppercase tracking-widest flex items-center hover:scale-110 transition-transform">
                 View Aesthetics <ExternalLink size={14} className="ml-2" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
