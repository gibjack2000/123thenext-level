import React, { useEffect } from 'react';
import { ArrowLeft, Activity, BarChart3, Droplets, Zap, Shield, Microscope, ExternalLink, Database, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function NutritionBiomarkers() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('np_bio_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    insidetracker: 'https://www.insidetracker.com/',
    ketomojo: 'https://keto-mojo.com/',
    levels: 'https://www.levels.com/'
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
          alt="Biomarker Mastery"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-[#F8F9FA]"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center mt-12">
          <Link to="/nutrition" className="inline-flex items-center text-white/50 hover:text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-12 transition-all bg-white/5 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/10">
            <ArrowLeft size={12} className="mr-2" />
            Biological Data Lab
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-[10px] uppercase tracking-widest mb-8"
          >
            Precision Metric Standard: HOMA-IR
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[clamp(3.5rem,7vw,7rem)] font-display font-semibold text-white uppercase tracking-[0.02em] mb-8 leading-[1.15]"
          >
            {t('np_bio_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto font-medium"
          >
            {t('np_bio_intro')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-32">
        {/* The HOMA-IR Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48 items-center">
           <div className="space-y-12">
              <div className="inline-flex items-center gap-4 text-emerald-600 font-black uppercase tracking-widest text-[10px] bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100">
                 <Shield size={16} />
                 The Gold Standard
              </div>
              <h2 className="text-5xl md:text-[clamp(3.5rem,7vw,8rem)] font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] leading-[1.15]">
                {t('np_bio_standard_title')}
              </h2>
              <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                {t('np_bio_standard_p')}
              </p>
              
              <div className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] group-hover:bg-emerald-500/10 transition-colors"></div>
                 <div className="relative z-10 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Biological Target</h3>
                    <div className="text-5xl font-display font-bold text-[#2D2D2D]">HOMA-IR &lt; 1.0</div>
                    <p className="text-sm text-slate-500 italic">"The leading indicator of metabolic flexibility and insulin sensitivity."</p>
                    <a href={affiliateLinks.insidetracker} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-6 bg-slate-900 text-white rounded-[2rem] hover:bg-emerald-600 transition-all group/btn">
                       <span className="font-bold uppercase tracking-widest text-[10px]">Order High-Precision Panel</span>
                       <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                 </div>
              </div>
           </div>
           
           <div className="space-y-8">
              {[
                { title: "HbA1c Mastery", desc: "Long-term glucose signaling (target < 5.2%)", icon: Activity },
                { title: "Fasting Insulin", desc: "The silent marker of metabolic stress", icon: Zap },
                { title: "hs-CRP", desc: "Systemic inflammatory baseline", icon: Microscope }
              ].map((metric, i) => (
                <div key={i} className="flex gap-8 p-10 bg-white rounded-[3rem] border border-slate-100 items-center hover:border-emerald-200 transition-all shadow-lg hover:shadow-xl group">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <metric.icon size={28} />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{metric.title}</h4>
                      <p className="text-slate-500 font-medium">{metric.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Continuous Lab Section */}
        <section className="bg-[#2D2D2D] rounded-[5rem] p-12 md:p-32 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                 <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white mb-10 shadow-2xl shadow-emerald-500/40">
                    <Activity size={40} />
                 </div>
                 <h2 className="text-5xl md:text-[clamp(4rem,8vw,9rem)] font-display font-semibold uppercase tracking-[0.02em] leading-[1.15] mb-10">
                   {t('np_bio_wearable_title')}
                 </h2>
                 <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium">
                   {t('np_bio_wearable_p')}
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6">
                    <a href={affiliateLinks.levels} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all">
                       Connect CGM (Levels) <ExternalLink size={14} className="ml-3" />
                    </a>
                    <a href={affiliateLinks.ketomojo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all backdrop-blur-md">
                       Keto-Mojo Dual Meter <ExternalLink size={14} className="ml-3" />
                    </a>
                 </div>
              </div>
              
              <div className="relative">
                 <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full animate-pulse"></div>
                 <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Data Analytics" className="rounded-[4rem] relative z-10 shadow-2xl border border-white/5 opacity-80" />
                 <div className="absolute -top-10 -left-10 bg-emerald-600 p-8 rounded-[2.5rem] shadow-2xl z-20 hidden xl:block">
                    <Workflow className="text-white mb-4" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Bio-Sync Active</p>
                 </div>
              </div>
           </div>
        </section>
        {/* Intelligence Feed */}
        <div className="mt-32 space-y-24">
          <div className="flex items-center gap-6 mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-slate-900 leading-none">
              Intelligence <span className="text-emerald-600">Feed</span>
            </h2>
            <div className="h-0.5 bg-emerald-100 flex-grow"></div>
          </div>
          <BlogSection category="nutrition" limit={3} />
        </div>
      </div>
    </div>
  );
}
