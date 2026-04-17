import React, { useEffect } from 'react';
import { Users, ArrowLeft, Heart, Zap, ExternalLink, Sun, Music, MessageSquare, MapPin, Smile, Thermometer, Ticket, Shield, Target, Activity, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';

export default function SocialFitnessPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('sfp_title_start')} ${t('sfp_title_end')} | 123TheNext Level`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('sfp_description'));
    }
  }, [t]);

  const affiliateLinks = {
    mastermind: 'https://amazon.com/dp/B0CXM1X8PQ',
    hyrox: 'https://hyrox.com',
    bluezones: 'https://www.bluezones.com/',
    communication: 'https://amazon.com/dp/B0CMB6X8Y1'
  };

  const pillarEssentials = [
    {
      name: "High-Performance Mastermind",
      brand: "Elite Network Access",
      desc: "Strategic proximity to high-value individuals to optimize neural coupling and social drive.",
      image: "/Products/mastermind.jpg",
      link: affiliateLinks.mastermind,
      price: "Inquire"
    },
    {
      name: "Collective Performance Event",
      brand: "HYROX / Mass Participation",
      desc: "Shared physiological striving to trigger oxytocin and collective resilience.",
      image: "/Products/hyrox.jpg",
      link: affiliateLinks.hyrox,
      price: "$100+"
    },
    {
      name: "Socio-Biological Architecture",
      brand: "Blue Zones Mastery",
      desc: "Designing your environment and relationships for 100+ year longevity outcomes.",
      image: "/Products/bluezones.jpg",
      link: affiliateLinks.bluezones,
      price: "Access"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-amber-500/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
            alt="Socio-Biological Architecture"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* High-Fidelity Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/40 via-transparent to-orange-950/20"></div>
        
        {/* Animated Social Energy Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[48rem] h-[48rem] bg-amber-600 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-[38rem] h-[38rem] bg-orange-500 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Technical Data Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)", backgroundSize: "52px 52px" }}>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">{t('sfp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md"
            >
              <Share2 size={14} className="mr-3 animate-pulse" />
              Oxytocin Flux: Optimized
            </motion.div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('sfp_title_start')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600">
                {t('sfp_title_end')}
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-amber-500/50 pl-8 text-left"
            >
              {t('sfp_description')} In 2026, social fitness is **survival architecture**. Loneliness is a clinical variable. We engineer high-resolution relationships for longevity.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Hub Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900/50 backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] border border-white/5 flex flex-col justify-between lg:col-span-2 group overflow-hidden relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-amber-400 mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Users size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-8 leading-[1]">
                {t('sfp_path_a_title')}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                {t('sfp_path_a_desc')}
              </p>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 mb-10">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
                   <Target size={14} /> Shared Striving
                 </h4>
                 <p className="text-sm text-slate-500 leading-relaxed font-medium">Collective physical challenges (Pickleball, Hyrox) trigger "The Winner Effect" and neural synchrony across the group.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-amber-400 font-bold text-[10px] uppercase tracking-[0.2em] border-t border-white/5 pt-10">
              <Zap size={16} />
              The Community Operating System
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900/50 backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] border border-white/5 flex flex-col justify-between group overflow-hidden relative shadow-2xl"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-orange-400 mb-10 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Music size={32} />
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-8 leading-none">
                {t('sfp_path_b_title')}
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                {t('sfp_path_b_desc')}
              </p>
              <div className="space-y-4 pt-10 border-t border-white/5">
                {[
                  { label: "Oxytocin Signaling", value: "High" },
                  { label: "Neural Symmetry", value: "Synced" },
                  { label: "Social Drive", value: "Peak" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">{stat.label}</span>
                    <span className="text-sm font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 text-orange-400 font-bold text-[10px] uppercase tracking-[0.2em] pt-10 relative z-10">
              <Activity size={16} />
              Socio-Biological Data
            </div>
          </motion.div>
        </div>

        {/* Collective Catharsis Section */}
        <section className="mb-40">
          <div className="bg-[#0f1710] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(245,158,11,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-12 mb-16 text-center">
                <div className="inline-flex items-center gap-4 text-amber-400 font-black uppercase tracking-widest text-[10px] bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 mb-8">
                  <Shield size={14} />
                  Safe Social Architecture
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                  {t('sfp_catharsis_title')}
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl mx-auto">
                  {t('sfp_catharsis_desc')} Moving beyond digital isolation into physical neural resonance.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 mb-6 border border-amber-500/20">
                      <MessageSquare size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white mb-4">Neural Coupling</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Synchronizing brainwaves through deep, focused communication and shared goals.</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-6 border border-orange-500/20">
                      <MapPin size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white">Blue Zone Habitats</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Creating micro-blue zones in modern cities through intentional community design.</p>
                  </motion.div>
                </div>

                <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <Heart size={24} className="text-amber-400" />
                    <h4 className="text-xl font-display font-bold uppercase text-white">Mortality Impact</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium italic border-l-2 border-amber-500/30 pl-6">
                    "High-quality social connection is linked to a 50% increased chance of longevity. It is more significant than smoking cessation or BMI."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-slate-950 p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Zap size={120} className="text-amber-400" />
                  </div>
                  <div className="relative z-10 space-y-10">
                    <h3 className="text-2xl font-display font-black uppercase text-amber-400">Networking Hub</h3>
                    
                    <div className="space-y-6">
                      {[
                        { key: 'sfp_cta_paddle', link: affiliateLinks.mastermind, label: 'Equipment' },
                        { key: 'sfp_cta_hyrox', link: affiliateLinks.hyrox, label: 'Collective challenge' },
                        { key: 'sfp_cta_recovery', link: affiliateLinks.bluezones, label: 'Shared rituals' },
                        { key: 'sfp_cta_wardrobe', link: affiliateLinks.communication, label: 'Apparel' }
                      ].map((cta, i) => (
                        <a key={i} href={cta.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white hover:text-slate-950 transition-all group/cta">
                          <span className="flex items-center gap-4">
                            <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded group-hover/cta:bg-slate-200 uppercase">{cta.label}</span>
                            <span className="text-xs font-black uppercase tracking-tight leading-none">{t(cta.key as any)}</span>
                          </span>
                          <ExternalLink size={16} className="opacity-40 group-hover/cta:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IntelligenceTeaser />

        {/* Pillar Essentials Grid */}
        <section className="mb-40 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">Social Arsenal</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Pillar Essentials
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-amber-500/20 pb-4">
              Vetted 2026 Social Fitness Tier-1 Tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillarEssentials.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-lg font-display font-black text-white">{product.price}</span>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                      Acquire <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed */}
        <div className="space-y-48">
          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('sfp_top_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="social-fitness" limit={3} featured={true} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('sfp_latest_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="social-fitness" limit={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
