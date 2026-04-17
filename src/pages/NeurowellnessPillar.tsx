import React, { useEffect } from 'react';
import { Brain, ArrowLeft, ArrowRight, Activity, Shield, Zap, Microscope, Cpu, Heart, Layers, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

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
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Cinematic Video Layer */}
        <div className="absolute inset-0 z-0 scale-110">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-blue-neural-network-33678-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Deep Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/40 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(67,56,202,0.1),transparent_70%)]"></div>

        {/* Synaptic Motion Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-20 w-[45rem] h-[45rem] bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.3, 1, 1.3],
            x: [0, -100, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-[35rem] h-[35rem] bg-violet-500/10 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Technical Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white transition-colors">{t('wp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 backdrop-blur-md shadow-2xl">
              <span className="flex items-center gap-3">
                <Brain size={14} className="animate-pulse" />
                2026 Medicalized Wellness Standard
              </span>
            </div>
            
            <h1 className="text-5xl md:text-[clamp(4rem,7vw,9rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] break-words drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">

              {t('wp_title_start')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                {t('wp_title_end')}
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-indigo-500/30 pl-8 text-left italic"
            >
              {t('wp_hub_narrative_title')}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="mt-8 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed text-center"
            >
              {t('wp_hub_narrative_p')}
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 pb-32">
        {/* Navigation Pathways */}
        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-xl border border-slate-100 mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-3xl -mr-32 -mt-32 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-8">
              System Overview
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-[#2D2D2D] mb-8 leading-tight">
              Clinical Architecture
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-4xl leading-relaxed">
              Neurowellness is not merely "stress management"—it is the precision calibration of the human nervous system. Our framework integrates three distinct biological layers to transition the body from chronic alert states into high-performance homeostasis.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4 border-l-2 border-slate-100 pl-6 hover:border-blue-500 transition-colors">
                <h4 className="font-display font-bold text-xl uppercase tracking-tight">01. Hard-Care</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Tech-driven exogenous stimulation. Utilizing VNS (Vagus Nerve Stimulation) and PEMF to bypass conscious resistance and reset autonomic tone instantly.</p>
              </div>
              <div className="space-y-4 border-l-2 border-slate-100 pl-6 hover:border-purple-500 transition-colors">
                <h4 className="font-display font-bold text-xl uppercase tracking-tight">02. Soft-Care</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Somatic endogenous regulation. Cultivating internal safety through specialized breathwork, temperature exposure, and proprioceptive grounding.</p>
              </div>
              <div className="space-y-4 border-l-2 border-slate-100 pl-6 hover:border-emerald-500 transition-colors">
                <h4 className="font-display font-bold text-xl uppercase tracking-tight">03. Metabolism</h4>
                <p className="text-slate-500 text-sm leading-relaxed">The Muscle-Brain Axis. Leveraging Irisin and BDNF signaling via resistance training and metabolic metabolites to future-proof cognitive health.</p>
              </div>
            </div>
          </div>
        </div>

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
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-[#2D2D2D] mb-8 leading-[1.15]">
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

        <IntelligenceTeaser />

        {/* Pillar Essentials: Curated Product Integration */}
        <section className="mt-32 mb-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                Clinical Shortlist
              </div>
              <h2 className="text-4xl md:text-8xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
                Pillar<br />Essentials
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-lg leading-relaxed md:text-right border-r-2 border-blue-100 pr-8 italic">
              "The non-negotiable hardware for 2026. Every device in this list is integrated into our master clinical dashboards."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { name: 'Oura Ring 4', category: 'Biometrics', img: '/Products/Oura1.jpg', link: '/neurowellness/hard-care', price: '$399' },
               { name: 'Nurosym VNS', category: 'Neurotech', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300', link: '/neurowellness/hard-care', price: '$699' },
               { name: 'Thorne Creatine', category: 'Metabolism', img: '/Products/thorne.jpg', link: '/neurowellness/metabolism', price: '$42' },
               { name: 'Sony XM5', category: 'Sensory', img: '/Products/sonyhead.jpg', link: '/neurowellness/soft-care', price: '$398' }
             ].map((item) => (
               <Link key={item.name} to={item.link} className="group bg-white border border-slate-100 rounded-[3rem] p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-4">
                  <div className="aspect-square rounded-[2rem] overflow-hidden mb-8 bg-slate-50 relative">
                     <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                     <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-900 font-black text-[10px] uppercase shadow-sm">
                       {item.price}
                     </div>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4">{item.category}</p>
                  <h4 className="text-2xl font-display font-bold uppercase text-slate-900 mb-6 group-hover:text-blue-600 transition-colors tracking-tight">{item.name}</h4>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400 group-hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest">
                    <span>View Protocol</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </div>
               </Link>
             ))}
          </div>
        </section>

        {/* Closing Narrative */}
        <div className="text-center pb-48 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-px h-24 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-16"></div>
            <h3 className="text-4xl md:text-[7rem] font-display font-black uppercase tracking-tighter text-slate-900 mb-8 leading-[0.85]">
              Redefining<br />Human Potential
            </h3>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16 italic max-w-2xl mx-auto">
              "We are no longer victims of our genetic blueprints. Through clinical precision and somatic intelligence, we define our own neurological future."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-2xl hover:scale-105">
                Clinical Intake Form
              </button>
              <button className="px-12 py-6 border-2 border-slate-200 text-slate-900 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:border-slate-900 transition-all">
                The 2026 Manifesto
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
