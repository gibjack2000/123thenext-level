import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Zap, Activity, ExternalLink, Microscope, AlertTriangle, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function NutritionGLP1() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('np_glp1_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    es: 'https://amazon.es/dp/B0CXM1X8PQ',
    protein: 'https://amazon.com/dp/B01BGOI8C6',
    electrolytes: 'https://amazon.com/dp/B07TJR9W9J',
    magnesium: 'https://amazon.com/dp/B07P5K7DQP'
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-[#0A1A2F]">
        <img
          src="https://images.unsplash.com/photo-1579152276503-31581d96574a?auto=format&fit=crop&q=80&w=2000"
          alt="GLP-1 Clinical Guide"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1A2F]/50 to-[#FDFCFB]"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center mt-12">
          <Link to="/nutrition" className="inline-flex items-center text-white/70 hover:text-white font-bold uppercase tracking-widest text-xs mb-8 transition-colors bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
            <ArrowLeft size={14} className="mr-2" />
            Metabolic Intelligence Standard
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-[10px] uppercase tracking-[0.2em] mb-6"
          >
            Clinical Protocol A: Pharmacological Synergy
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[clamp(3.5rem,7vw,7rem)] font-display font-semibold text-white uppercase tracking-[0.02em] mb-6 leading-[1.15]"
          >
            {t('np_glp1_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100/70 max-w-2xl mx-auto font-medium"
          >
            {t('np_glp1_intro')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* The Muscle Paradox Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 border border-red-100">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-3xl font-display font-semibold uppercase text-slate-800">
                  {t('np_glp1_muscle_loss_title')}
                </h2>
              </div>
              
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 blur-[80px] -mr-32 -mt-32"></div>
                 <p className="text-lg text-slate-600 leading-relaxed relative z-10 mb-8 font-medium">
                   {t('np_glp1_muscle_loss_p')}
                 </p>
                 <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <Shield size={18} className="text-blue-600" />
                       <span className="text-sm font-bold text-slate-700">MPS Activation Tool: Resistance Training</span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-2xl font-display font-black uppercase tracking-tight text-[#2D2D2D]">The Companion Stack</h3>
               <p className="text-slate-500 text-sm">Targeted biological support to mitigate therapy-induced deficiencies.</p>
               
               <div className="space-y-4">
                  {[
                    { name: "Thorne Whey Isolate", desc: "High Bioavailability Protein (2.2g/kg targets)", link: affiliateLinks.protein, icon: Zap },
                    { name: "Creatine HCl (Thorne)", desc: "Cellular energy buffer to prevent muscle loss", link: affiliateLinks.us, icon: Database },
                    { name: "LMNT Electrolytes", desc: "Sodium/Potassium balance during gastric delay", link: affiliateLinks.electrolytes, icon: Activity },
                    { name: "Magnesium Glycinate", desc: "Autonomic regulation and GI motility", link: affiliateLinks.magnesium, icon: Shield }
                  ].map((item, i) => (
                    <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-7 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-300 hover:shadow-lg transition-all group">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                             <item.icon size={20} />
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-900">{item.name}</h4>
                             <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                       </div>
                       <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-600" />
                    </a>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Titration Section */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
              <Activity size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold uppercase text-slate-800">
              {t('np_glp1_titration_title')}
            </h2>
          </div>
          
          <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl">
            {t('np_glp1_titration_p')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { week: "Weeks 1-4", dose: "Initiation", focus: "GI Adaptation", detail: "Focus on fiber & electrolytes" },
              { week: "Weeks 5-8", dose: "Scaling", focus: "Appetite", detail: "Strength training 3x/week" },
              { week: "Weeks 9-12", dose: "Therapeutic", focus: "Lipid Sync", detail: "Monitor HOMA-IR sensitivity" },
              { week: "Weeks 16+", dose: "Maintenance", focus: "Homeostasis", detail: "Metabolic flexibility scan" }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-xl transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4 block">{step.week}</span>
                <h4 className="text-xl font-display font-semibold uppercase mb-2">{step.dose}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Diagnostic Conversion */}
        <div className="bg-[#0A1A2F] rounded-[4rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] animate-pulse"></div>
          <div className="relative z-10">
            <Microscope size={64} className="text-blue-400 mx-auto mb-10" />
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-6 leading-tight">
              Biological Integrity Suite
            </h3>
            <p className="text-blue-100/60 mb-12 max-w-2xl mx-auto italic text-lg">
              "Pharmacological weight loss is a biological debt. You must repay it with precision protein and clinical diagnostics."
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href={affiliateLinks.us} className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-500/20">
                Functional Health Lab <ExternalLink size={16} className="ml-3" />
              </a>
              <a href={affiliateLinks.uk} className="inline-flex items-center justify-center px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[2rem] font-bold uppercase tracking-widest text-xs transition-all backdrop-blur-md">
                InsideTracker UK <ExternalLink size={16} className="ml-3" />
              </a>
            </div>
          </div>
        </div>
        {/* Intelligence Feed */}
        <div className="mt-32 space-y-24">
          <div className="flex items-center gap-6 mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-slate-900 leading-none">
              Intelligence <span className="text-blue-600">Feed</span>
            </h2>
            <div className="h-0.5 bg-blue-100 flex-grow"></div>
          </div>
          <BlogSection category="nutrition" limit={3} />
        </div>
      </div>
    </div>
  );
}
