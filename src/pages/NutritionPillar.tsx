import React, { useEffect } from 'react';
import { Apple, ArrowLeft, Droplets, Zap, Shield, ExternalLink, Activity, Brain, BarChart3, FlaskConical, Database, Microscope, Search, Dna } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import UniversalQA from '../components/UniversalQA';

export default function NutritionPillar() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('np_title_start')} ${t('np_title_end')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    es: 'https://amazon.es/dp/B0CXM1X8PQ',
    supps: 'https://amazon.com/dp/B0CMB6X8Y1',
    nad: 'https://amazon.com/dp/B08XLP8J1K',
    agekit: 'https://www.insidetracker.com/'
  };

  const deepDivePaths = [
    {
      title: t('np_path_a_title'),
      desc: t('np_path_a_desc'),
      icon: Shield,
      path: '/nutrition/glp1',
      color: 'blue'
    },
    {
      title: t('np_path_b_title'),
      desc: t('np_path_b_desc'),
      icon: Brain,
      path: '/nutrition/muscle-brain',
      color: 'indigo'
    },
    {
      title: t('np_path_c_title'),
      desc: t('np_path_c_desc'),
      icon: Activity,
      path: '/nutrition/biomarkers',
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans antialiased">
      {/* Hero Section */}
      <div className="relative pt-32 pb-64 md:pt-48 md:pb-80 flex items-center justify-center overflow-hidden bg-[#0A1F1C]">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2000"
          alt="Metabolic Precision"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F1C]/95 via-[#0A1F1C]/40 to-stone-50"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/70 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-all backdrop-blur-md bg-white/5 px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/10">
            <ArrowLeft size={16} className="mr-2" />
            {t('np_back')}
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-[10px] uppercase tracking-[0.2em] mb-12 mx-auto shadow-2xl shadow-emerald-500/10"
          >
            <Droplets size={14} className="mr-3" />
            Standard of Care: Precision Bio-Fueling
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-[clamp(3rem,6vw,6rem)] font-display font-black uppercase tracking-tight text-white mb-6 leading-[1.05] drop-shadow-2xl"
          >
            {t('np_title_start')}<br />
            <span className="text-emerald-400">
              {t('np_title_end')}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-emerald-100/60 font-medium max-w-4xl mx-auto leading-relaxed"
          >
            {t('np_description')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-40 pb-32">
        {/* Level 1 Narrative Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-emerald-100 flex flex-col justify-between lg:col-span-2 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 blur-[60px] -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mb-10 border border-emerald-100">
                <Microscope size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-[#2D2D2D] mb-8 leading-[1.1]">
                {t('np_hub_narrative_title')}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium italic">
                {t('np_hub_narrative_p')}
              </p>
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 mb-10">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-4">Functional Mechanism: SIRT1 Activation</h4>
                 <p className="text-sm text-slate-600 leading-relaxed">Specific nutrient timing and phytonutrient Density (Resveratrol, Quercetin) are leveraged to trigger SIRT1, the "Master Longevity Gene," promoting DNA repair and mitochondrial biogenesis.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] border-t border-emerald-50 pt-10">
              <Zap size={16} />
              The Nutrigenomic Protocol
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#2D2D2D] p-12 md:p-16 rounded-[4rem] shadow-2xl text-white flex flex-col justify-between relative overflow-hidden group"
          >
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-600/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-emerald-400 mb-10 border border-white/10">
                <BarChart3 size={32} />
              </div>
              <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-8 leading-[1.1]">
                {t('np_metabolic_health_title')}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                {t('np_metabolic_health_p')}
              </p>
              <div className="space-y-4">
                 {[
                   { label: "Insulin Sensitivity", value: "Peak" },
                   { label: "Glucose Volatility", value: "Minimal" },
                   { label: "Mitochondrial Flux", value: "High" }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{stat.label}</span>
                      <span className="font-bold">{stat.value}</span>
                   </div>
                 ))}
              </div>
            </div>
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] pt-10 relative z-10">
              <Activity size={16} />
              Clinical Bio-Data
            </div>
          </motion.div>
        </div>

        {/* Mediterranean Metabolic Blueprint Section */}
        <section className="mb-40">
          <div className="bg-[#fcfaf7] p-8 md:p-20 rounded-[4rem] md:rounded-[5rem] border border-orange-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.03)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch">
                <div className="lg:col-span-7 space-y-10">
                  <div className="inline-flex items-center gap-4 text-orange-700 font-black uppercase tracking-widest text-[10px] bg-orange-50 px-6 py-2 rounded-full border border-orange-100">
                    <Shield size={14} />
                    Clinically Validated Operating System
                  </div>
                  <h2 className="text-3xl md:text-[clamp(2.2rem,4.5vw,4.2rem)] font-display font-black uppercase tracking-tight text-[#2D2D2D] leading-[1.05] whitespace-pre-line">
                    {t('np_med_title')}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
                    {t('np_med_desc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white rounded-[3rem] border border-orange-50 shadow-sm transition-transform hover:scale-[1.02]">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-700 mb-4 flex items-center gap-2">
                         <Dna size={16} className="text-orange-500" /> {t('np_med_epigenetic_title')}
                       </h4>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">{t('np_med_epigenetic_desc')}</p>
                    </div>
                    <div className="p-8 bg-white rounded-[3rem] border border-orange-50 shadow-sm transition-transform hover:scale-[1.02]">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-700 mb-4 flex items-center gap-2">
                         <Activity size={16} className="text-orange-500" /> {t('np_med_big3_title')}
                       </h4>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">{t('np_med_big3_desc')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-5 w-full">
                   <div className="bg-[#2D2D2D] p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden group border border-white/5 h-full flex flex-col justify-between min-h-[500px]">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                         <Zap size={80} className="text-orange-400" />
                      </div>
                      <div className="relative z-10 space-y-12 h-full flex flex-col justify-between">
                        <div className="space-y-10">
                          <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight leading-tight text-orange-400">2026 Clinical Synergies</h3>
                          <div className="space-y-10">
                             <div className="flex gap-8 items-start">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-400 border border-white/10 shrink-0 shadow-inner"><Shield size={24} /></div>
                                <div className="space-y-2">
                                   <strong className="text-white text-xs uppercase tracking-widest block font-black">GLP-1 Companion</strong>
                                   <p className="text-sm text-slate-400 leading-relaxed font-medium">{t('np_med_synergy_glp1')}</p>
                                </div>
                             </div>
                             <div className="flex gap-8 items-start">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-400 border border-white/10 shrink-0 shadow-inner"><Brain size={24} /></div>
                                <div className="space-y-2">
                                   <strong className="text-white text-xs uppercase tracking-widest block font-black">Cognitive Fueling</strong>
                                   <p className="text-sm text-slate-400 leading-relaxed font-medium">{t('np_med_synergy_neuro')}</p>
                                </div>
                             </div>
                          </div>
                        </div>
                        
                        <a href={affiliateLinks.agekit} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 md:p-8 bg-orange-600 text-white rounded-[2.5rem] hover:bg-orange-700 transition-all font-bold uppercase tracking-widest text-[9px] md:text-xs group/btn shadow-[0_20px_40px_-10px_rgba(234,88,12,0.3)] w-full mt-auto overflow-hidden">
                           <span className="flex-1 leading-tight text-left pr-4 whitespace-nowrap overflow-hidden text-ellipsis">{t('np_med_diagnostic_cta')}</span>
                           <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform shrink-0" />
                        </a>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cellular Recharging (NAD+) Section */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
           <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform"></div>
              <img src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200" alt="Mitochondrial Vitality" className="rounded-[4rem] relative z-10 shadow-2xl opacity-90" />
              <div className="absolute -top-10 -right-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 max-w-xs z-20">
                 <FlaskConical className="text-blue-600 mb-6" size={40} />
                 <p className="text-xs font-black uppercase tracking-widest text-slate-800 leading-tight">
                   Mitochondrial energy buffering: The primary aging defense in 2026.
                 </p>
              </div>
           </div>
           <div className="order-1 lg:order-2 space-y-12">
              <div className="inline-flex items-center gap-4 text-blue-600 font-black uppercase tracking-widest text-[10px] bg-blue-50 px-6 py-2 rounded-full border border-blue-100">
                 <Shield size={16} />
                 Energy Flux Optimization
              </div>
              <h2 className="text-4xl md:text-[clamp(2.5rem,4.5vw,5rem)] font-display font-bold uppercase tracking-tight text-[#2D2D2D] leading-[1.05] mb-8">
                {t('np_cellular_title')}
              </h2>
              <p className="text-2xl text-slate-500 leading-relaxed font-medium italic">
                {t('np_cellular_p')}
              </p>
              <div className="grid grid-cols-1 gap-4">
                 <a href={affiliateLinks.nad} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-8 bg-[#2D2D2D] text-white rounded-[3rem] group hover:bg-blue-600 transition-all shadow-xl">
                    <div className="flex items-center gap-6">
                       <Zap size={32} className="text-blue-400 group-hover:text-white" />
                       <div>
                          <span className="block text-xl font-display font-bold uppercase tracking-tight">{t('np_cta_nad')}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-100">Thorne ResveraCel Stack</span>
                       </div>
                    </div>
                    <ExternalLink size={24} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                 </a>
              </div>
           </div>
        </section>

        <UniversalQA />


        {/* Deep Dive Grid (Path A, B, C) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {deepDivePaths.map((path, i) => (
            <Link key={i} to={path.path} className="group">
              <motion.div 
                whileHover={{ y: -15, scale: 1.02 }}
                className="bg-white p-12 rounded-[4rem] shadow-xl border border-slate-100 hover:border-emerald-300 transition-all h-full flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                   <path.icon size={120} />
                </div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-10 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm`}>
                    <path.icon size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase mb-6 text-[#2D2D2D] leading-[1.1] tracking-tight group-hover:text-emerald-600 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                    {path.desc}
                  </p>
                </div>
                <div className="flex items-center text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] gap-3 relative z-10">
                  Enter Architecture <ExternalLink size={16} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Affiliate & Precision Diagnostics */}
        <section className="bg-[#1A1A1A] rounded-[5rem] p-12 md:p-24 lg:p-32 text-white mb-40 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.15)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-[clamp(2.5rem,5vw,4.5rem)] font-display font-black uppercase tracking-tight leading-[1.05]">
                {t('np_cta_section_title')}
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
                High-resolution diagnostic protocols for identifying your unique biological set-point.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: FlaskConical, text: t('np_conv_insulin'), desc: "SIRT-Active Analysis" },
                  { icon: Droplets, text: t('np_conv_sensors'), desc: "Real-Time Flux Monitoring" },
                  { icon: Database, text: t('np_conv_creatine'), desc: "ATP Regeneration Protocol" },
                  { icon: Shield, text: t('np_conv_nad'), desc: "Mitochondrial Restoration" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-3 p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all">
                    <item.icon size={24} className="text-emerald-400 mb-2" />
                    <div>
                       <span className="text-xs font-bold uppercase tracking-widest leading-tight block mb-1">{item.text}</span>
                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[4rem] p-10 md:p-16 text-slate-900 shadow-2xl space-y-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-center relative z-10">
                 <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8 border border-emerald-100">
                   <Activity size={32} />
                 </div>
                  <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight mb-4">
                  Clinical Bio-Access
                </h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Standard 2026 Partner Integration</p>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                   <a href={affiliateLinks.agekit} target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-emerald-600 hover:text-white transition-all text-center flex flex-col justify-center min-h-[140px]">
                      <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">US Market</span>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight leading-tight">{t('np_cta_age_us')}</span>
                   </a>
                   <a href={affiliateLinks.agekit} target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-emerald-600 hover:text-white transition-all text-center flex flex-col justify-center min-h-[140px]">
                      <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">UK Market</span>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight leading-tight">{t('np_cta_age_uk')}</span>
                   </a>
                   <a href={affiliateLinks.agekit} target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-emerald-600 hover:text-white transition-all text-center flex flex-col justify-center min-h-[140px]">
                      <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">ES Market</span>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight leading-tight">{t('np_cta_age_es')}</span>
                   </a>
                </div>

                <a href={affiliateLinks.supps} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-10 bg-emerald-600 text-white rounded-[3rem] group/item hover:bg-[#2D2D2D] transition-all shadow-2xl shadow-emerald-600/20">
                  <span className="font-bold flex items-center gap-6">
                    <Zap size={32} className="text-emerald-300 group-hover/item:text-emerald-500 transition-colors" />
                    <div>
                       <span className="text-2xl uppercase font-display font-bold leading-none block">{t('np_cta_supps')}</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300/60 group-hover/item:text-emerald-500/60">Thorne Performance Pack</span>
                    </div>
                  </span>
                  <ExternalLink className="opacity-60 group-hover/item:opacity-100 transition-opacity" size={24} />
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <a href={affiliateLinks.nad} target="_blank" rel="noopener noreferrer" className="p-8 bg-slate-900 text-white rounded-[3rem] flex items-center justify-between group hover:bg-blue-600 transition-all">
                      <div className="flex items-center gap-4">
                         <FlaskConical size={20} className="text-blue-400" />
                         <span className="text-sm font-bold uppercase tracking-tight">{t('np_cta_nad')}</span>
                      </div>
                      <ExternalLink size={16} className="opacity-40" />
                   </a>
                   <a href={affiliateLinks.us} target="_blank" rel="noopener noreferrer" className="p-8 bg-slate-50 border border-slate-100 text-slate-900 rounded-[3rem] flex items-center justify-between group hover:bg-emerald-600 hover:text-white transition-all">
                      <div className="flex items-center gap-4">
                         <Shield size={20} className="text-emerald-600 group-hover:text-white" />
                         <span className="text-sm font-bold uppercase tracking-tight">{t('np_cta_creatine_brain')}</span>
                      </div>
                      <ExternalLink size={16} className="opacity-40" />
                   </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Feed */}
        <div className="space-y-48">
          <div className="relative">
            <div className="flex items-center gap-10 mb-24">
              <h2 className="text-5xl md:text-[clamp(3.5rem,6vw,6rem)] font-display font-black uppercase tracking-tight text-[#2D2D2D] leading-[1.05]">
                {t('np_top_posts')}
              </h2>
              <div className="h-[2px] bg-emerald-100 flex-grow mt-10"></div>
            </div>
            <BlogSection category="nutrition" limit={3} featured={true} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-10 mb-24">
              <h2 className="text-5xl md:text-[clamp(3.5rem,6vw,6rem)] font-display font-black uppercase tracking-tight text-[#2D2D2D] leading-[1.05]">
                {t('np_latest_posts')}
              </h2>
              <div className="h-[2px] bg-emerald-100 flex-grow mt-10"></div>
            </div>
            <BlogSection category="nutrition" limit={9} />
          </div>
        </div>
      </div>
    </div>
  );
}
