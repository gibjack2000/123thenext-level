import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Target, Zap, ExternalLink, Dna, Microscope, Dumbbell, Brain, Activity, FlaskConical, LifeBuoy, Heart, Sparkles, CheckCircle2, Droplets, Baby, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';
import { useAffiliateLinks } from '../contexts/AffiliateLinksContext';

export default function WomensHealthPillar() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    document.title = `${t('whp_title_start')} ${t('whp_title_end')} | 123TheNext Level`;
    window.scrollTo(0, 0);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Advanced Women's Health & Performance protocols for 2026. Focusing on Ovarian Longevity, Strength Mandates, and Neuro-Metabolic Shielding.");
    }
  }, [t]);

  const pillarEssentials = [
    {
      id: 'oura-ring',
      name: 'Oura Ring Gen3 Horizon',
      brand: 'Biometric Feedback',
      desc: 'The gold standard for female cycle tracking, HRV monitoring, and autonomic nervous system data.',
      image: links.whp_oura?.image || '/Products/Oura1.jpg',
      link: links.whp_oura?.url || 'https://www.amazon.com/Oura-Ring-Gen3-Horizon-Stealth/dp/B0D4N3L9XW',
      price: '$299+'
    },
    {
      id: 'thorne-creatine',
      name: 'Thorne Creatine Monohydrate',
      brand: 'Neurometabolic Fuel',
      desc: 'Clinical-grade creatine for cognitive shielding during the menopausal transition and muscle mass preservation.',
      image: links.whp_creatine?.image || '/Products/thorne.jpg',
      link: links.whp_creatine?.url || 'https://www.amazon.com/Thorne-Research-Creatine-Monohydrate-Amino/dp/B00028M0ZK',
      price: '$45+'
    },
    {
      id: 'withings-body-smart',
      name: 'Withings Body Smart Scale',
      brand: 'Metabolic Diagnostics',
      desc: 'Advanced body composition tracking to monitor visceral fat and muscle mass deltas.',
      image: links.whp_scale?.image || '/Products/withings.jpg',
      link: links.whp_scale?.url || 'https://www.amazon.com/Withings-Body-Smart-Composition-Monitor/dp/B0BYZ9TBM5',
      price: '$99+'
    },
    {
      id: 'thorne-multi',
      name: 'Thorne Women\'s Multi 50+',
      brand: 'Endocrine Support',
      desc: 'High-fidelity micronutrient foundation engineered for hormone synthesis and systemic metabolic stability.',
      image: links.whp_multivitamin?.image || 'https://images.unsplash.com/photo-1584017945516-7013148f9361?q=80&w=600',
      link: links.whp_multivitamin?.url || 'https://www.amazon.com/Thorne-Basic-Nutrients-Day-Multivitamin/dp/B00FOTMGTU',
      price: '$45+'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-rose-500/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale brightness-50"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-box-jumps-in-a-gym-4853-large.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* High-Fidelity Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/40 via-transparent to-purple-950/20"></div>
        
        {/* Animated Hormonal Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[45rem] h-[45rem] bg-rose-600 rounded-full blur-[150px] pointer-events-none z-0"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-48 -left-20 w-[35rem] h-[35rem] bg-purple-500 rounded-full blur-[120px] pointer-events-none opacity-[0.1] z-0"
        />

        {/* Technical Data Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #f43f5e 1px, transparent 0)", backgroundSize: "52px 52px" }}>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Protocols Hub</span>
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
              className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-rose-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md"
            >
              <Microscope size={14} className="mr-3 animate-pulse" />
              Clinical Protocol: WH-2026.4
            </motion.div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Women's Health<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-rose-600">
                & Performance
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-rose-500/50 pl-8 text-left"
            >
              In 2026, we introduce the **Ovary-Span Framework**—treating ovarian health as the primary endocrine master-clock for systemic longevity and cognitive performance.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        {/* Navigational Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            {
              path: "/womens-health/longevity",
              title: "Ovarian Longevity",
              desc: "Anti-fibrotic protocols and endocrine maintenance for systemic health protection.",
              bg: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200",
              accent: "rose"
            },
            {
              path: "/womens-health/performance",
              title: "Strength Mandate",
              desc: "The clinical necessity of mechanical loading and muscle as an endocrine organ.",
              bg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
              accent: "blue"
            },
            {
              path: "/womens-health/metabolic",
              title: "Cognitive Metabolic",
              desc: "The brain-fuel axis: CGM-driven precision and neuro-metabolic shielding.",
              bg: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1200",
              accent: "purple"
            }
          ].map((card, i) => (
            <Link key={i} to={card.path} className="group relative overflow-hidden rounded-[4rem] aspect-[4/5] border border-white/5 shadow-2xl transition-all duration-700 hover:scale-[1.02]">
              <div className="absolute inset-0 scale-105 group-hover:scale-110 transition-transform duration-1000">
                <img src={card.bg} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 grayscale-[0.5] group-hover:grayscale-0" alt={card.title} />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-900/20 to-transparent group-hover:from-${card.accent}-950/40 transition-colors duration-700`} />
              </div>
              
              <div className="absolute inset-x-10 bottom-10 text-left">
                <div className={`w-14 h-14 rounded-2xl bg-${card.accent}-500/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-8 shadow-inner`}>
                  {i === 0 ? <Activity size={28} className="text-rose-400" /> : i === 1 ? <Dumbbell size={28} className="text-blue-400" /> : <Brain size={28} className="text-purple-400" />}
                </div>
                <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-4 leading-tight group-hover:text-rose-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                  {card.desc}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 group-hover:text-white transition-colors">
                  Initialize Protocol <ExternalLink size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Blueprint Narrative */}
        <section className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group mb-40">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(244,63,94,0.08)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-12 mb-16 text-center">
              <div className="inline-flex items-center gap-4 text-rose-400 font-black uppercase tracking-widest text-[10px] bg-rose-500/10 px-6 py-2 rounded-full border border-rose-500/20 mb-8">
                <Shield size={14} />
                Endocrine Precision Standards
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                Bio-Diagnostic Baseline
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl mx-auto">
                Standard health tracking is built on male-centric data. Our 2026 protocols leverage high-resolution female bio-data to map actual biological progress.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { path: "/womens-health/epigenetic-age", icon: <Dna />, title: "Epigenetic Age", desc: "Biological vs. Chronological mapping focused on ovarian markers." },
                  { path: "/womens-health/mitochondrial-cap", icon: <Zap />, title: "Mitochondrial Cap", desc: "NAD+ optimization for structural and cellular integrity." },
                  { path: "/womens-health/hrv-resilience", icon: <Activity />, title: "HRV Resilience", desc: "Real-time autonomic mapping for cycle-synced cycles." },
                  { path: "/womens-health/bone-density", icon: <LifeBuoy />, title: "Bone Density", desc: "Mechanical loading protocols to prevent osteopenia." }
                ].map((item, i) => (
                  <Link key={i} to={item.path}>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-8 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10 h-full cursor-pointer"
                    >
                      <div className="text-rose-400 mb-6">{item.icon}</div>
                      <h4 className="text-xl font-display font-bold uppercase text-white mb-4">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-950 p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Droplets size={120} className="text-rose-400" />
                </div>
                <div className="relative z-10 space-y-10">
                  <h3 className="text-2xl font-display font-black uppercase text-rose-400">Diagnostic Suite</h3>
                  
                  <div className="space-y-6">
                    {[
                      { key: 'whp_cta_test_us', link: links.us, label: 'Endocrine' },
                      { key: 'whp_cta_epigenetic', link: links.epigenetic, label: 'Cellular' },
                      { key: 'whp_cta_nad', link: links.nad, label: 'Metabolic' },
                      { key: 'whp_cta_test_uk', link: links.uk, label: 'Endocrine' }
                    ].map((item, i) => (
                      <a key={i} href={item.link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white hover:text-slate-950 transition-all group/cta">
                        <span className="flex items-center gap-4">
                          <span className="w-32 text-center text-[9px] font-black bg-white/10 px-2 py-0.5 rounded group-hover/cta:bg-slate-200 uppercase">{item.label}</span>
                          <span className="text-xs font-black uppercase tracking-tight leading-none">{t(item.key as any)}</span>
                        </span>
                        <ExternalLink size={16} className="opacity-40 group-hover/cta:opacity-100" />
                      </a>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-rose-400 font-black text-[10px] uppercase tracking-[0.2em] justify-center">
                    <CheckCircle2 size={14} /> ISO-2026 Certified Roadmap
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
              <span className="text-rose-500 font-black uppercase tracking-[0.3em] text-xs">The Clinical Arsenal</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Pillar Essentials
              </h2>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-rose-500/20 pb-4">
                Vetted 2026 Women's Health Tier-1 Tools
              </p>
              <div className="flex items-center gap-3 mt-4 text-[10px] font-black uppercase tracking-tighter text-slate-400">
                <Globe size={12} className="text-rose-500/50" />
                <span>Regional Arsenals:</span>
                <div className="flex gap-2 ml-2">
                  {[
                    { id: 'us', name: 'US', flag: 'https://flagcdn.com/w80/us.png' },
                    { id: 'uk', name: 'UK', flag: 'https://flagcdn.com/w80/gb.png' },
                    { id: 'es', name: 'ES', flag: 'https://flagcdn.com/w80/es.png' }
                  ].map((market) => (
                    <Link
                      key={market.id}
                      to={`/${market.id}`}
                      className="group relative flex items-center justify-center w-10 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-rose-500/50 hover:bg-rose-500/5 transition-all duration-300"
                      title={`${market.name} Market`}
                    >
                      <img 
                        src={market.flag} 
                        alt={market.name} 
                        className="w-5 h-auto rounded-sm grayscale group-hover:grayscale-0 transition-all" 
                      />
                    </Link>
                  ))}
                </div>
                <span className="text-slate-500 italic ml-2">Local inventory sync active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillarEssentials.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="aspect-square relative overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8]" />
                  <div className="absolute inset-x-6 bottom-6">
                    <span className="text-[9px] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-display font-bold uppercase text-white mb-4 group-hover:text-rose-400 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-lg font-display font-black text-white">{product.price}</span>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-rose-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                      Buy from Amazon <ExternalLink size={14} />
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
                Featured Briefings
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="womens-health" limit={3} featured={true} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                Research Feed
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="womens-health" limit={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
