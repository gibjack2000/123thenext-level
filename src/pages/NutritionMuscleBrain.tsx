import React, { useEffect } from 'react';
import { ArrowLeft, Brain, Zap, Activity, ExternalLink, Activity as MuscleIcon, Dumbbell, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function NutritionMuscleBrain() {
  const t = useT();

  useEffect(() => {
    document.title = `${t('np_mb_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    creatine: 'https://amazon.com/dp/B000GP0NYM',
    protein: 'https://amazon.com/dp/B01BGOI8C6',
    omega3: 'https://amazon.com/dp/B002CQU55K',
    nootropic: 'https://amazon.com/dp/B07P5K7DQP'
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-indigo-950">
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000"
          alt="Muscle Brain Axis"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-soft-light"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/90 via-transparent to-[#FAFAFA]"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center mt-12">
          <Link to="/nutrition" className="inline-flex items-center text-white/60 hover:text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-12 transition-all bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
            <ArrowLeft size={12} className="mr-2" />
            Biological Signaling Hub
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 font-bold text-[10px] uppercase tracking-widest mb-8"
          >
            Endocrine Signaling: Master Level
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[clamp(3.5rem,7vw,7rem)] font-display font-semibold text-white uppercase tracking-[0.02em] mb-6 leading-[1.15]"
          >
            {t('np_mb_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-indigo-100/70 max-w-4xl mx-auto leading-tight"
          >
            {t('np_mb_intro')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* The Myokine Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40 items-center">
           <div className="space-y-12">
              <div className="inline-flex items-center gap-4 text-indigo-600 font-black uppercase tracking-widest text-[10px] bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                 <Workflow size={16} />
                 The Molecular Machinery
              </div>
              <h2 className="text-5xl md:text-[clamp(3.5rem,7vw,8rem)] font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] leading-[1.15]">
                {t('np_mb_myokine_title')}
              </h2>
              <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                {t('np_mb_myokine_p')}
              </p>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { title: "Irisin (FNDC5)", effect: "Crosses the BBB to activate PGC-1α and neurogenesis.", level: "High Output" },
                   { title: "BDNF", effect: "Brain-Derived Neurotrophic Factor / Synaptic Plasticity.", level: "Active" },
                   { title: "Cathepsin B", effect: "Upregulated during endurance load for cognitive memory.", level: "Peak" }
                 ].map((signal, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                         <div>
                            <span className="font-bold text-slate-800 block text-lg">{signal.title}</span>
                            <span className="text-slate-500 text-sm italic">{signal.effect}</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="relative group">
              <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] rounded-full translate-x-10 translate-y-10 group-hover:scale-110 transition-transform"></div>
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" alt="Muscle Activity" className="rounded-[4rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute -bottom-10 -right-10 bg-[#2D2D2D] p-10 rounded-[3rem] shadow-2xl border border-white/5 max-w-xs hidden xl:block z-20">
                 <Brain className="text-indigo-400 mb-6" size={40} />
                 <p className="text-sm font-bold text-white leading-relaxed uppercase tracking-tight">
                   "Every repetition is a biochemical signal to the hippocampus. Movement is the primary language of the nervous system."
                 </p>
              </div>
           </div>
        </div>

        {/* Creatine & Neuro Stack */}
        <section className="bg-white rounded-[5rem] p-12 md:p-24 border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.05)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
                  <Zap size={40} />
               </div>
               <h2 className="text-4xl md:text-[clamp(3rem,6.5vw,7.5rem)] font-display font-semibold uppercase tracking-[0.02em] leading-[1.15] text-[#2D2D2D]">
                 The <span className="text-indigo-600">Neuro-Pillar</span> Protocol
               </h2>
               <div className="space-y-6">
                  <p className="text-xl text-slate-500 leading-relaxed font-medium">
                    {t('np_mb_creatine_p')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <span className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Pre-Frontal Cortex Load</span>
                     <span className="px-6 py-2 bg-slate-50 text-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">ATP Regeneration</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
               <a href={affiliateLinks.creatine} target="_blank" rel="noopener noreferrer" className="p-10 bg-[#2D2D2D] text-white rounded-[3.5rem] group hover:bg-indigo-600 transition-all shadow-xl">
                  <div className="flex justify-between items-start mb-10">
                     <h3 className="text-3xl font-display font-semibold uppercase leading-tight">{t('np_mb_creatine_title')}</h3>
                     <ExternalLink size={24} className="opacity-40 group-hover:opacity-100" />
                  </div>
                  <div className="flex items-baseline gap-4 mb-4">
                     <span className="text-5xl font-black uppercase tracking-tight">5.0G</span>
                     <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Daily Clinical Dose</span>
                  </div>
                  <p className="text-slate-400 group-hover:text-indigo-100 text-sm leading-relaxed">Verified Thorne Monohydrate for neurological energetic buffering.</p>
               </a>

               <div className="grid grid-cols-2 gap-6">
                  <a href={affiliateLinks.omega3} target="_blank" rel="noopener noreferrer" className="p-8 bg-white border border-slate-100 rounded-[3rem] group hover:border-indigo-400 transition-all shadow-lg">
                     <Brain size={32} className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform" />
                     <h4 className="font-bold text-slate-900 mb-2">Alpha-EPA</h4>
                     <p className="text-xs text-slate-500">Neuro-inflammatory shield.</p>
                  </a>
                  <a href={affiliateLinks.protein} target="_blank" rel="noopener noreferrer" className="p-8 bg-white border border-slate-100 rounded-[3rem] group hover:border-indigo-400 transition-all shadow-lg">
                     <Dumbbell size={32} className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform" />
                     <h4 className="font-bold text-slate-900 mb-2">Bio-Whey</h4>
                     <p className="text-xs text-slate-500">Myokine precursor stack.</p>
                  </a>
               </div>
            </div>
          </div>
        </section>
        {/* Intelligence Feed */}
        <div className="mt-32 space-y-24">
          <div className="flex items-center gap-6 mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-slate-900 leading-none">
              Intelligence <span className="text-indigo-600">Feed</span>
            </h2>
            <div className="h-0.5 bg-indigo-100 flex-grow"></div>
          </div>
          <BlogSection category="nutrition" limit={3} />
        </div>
      </div>
    </div>
  );
}
