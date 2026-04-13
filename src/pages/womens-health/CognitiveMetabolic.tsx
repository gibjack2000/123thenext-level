import React, { useEffect } from 'react';
import { ArrowLeft, Brain, Zap, Shield, Info, ExternalLink, Activity, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import UniversalQA from '../../components/UniversalQA';

export default function CognitiveMetabolic() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('cm_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32">
      {/* Header */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-rose-600/10 blur-[120px] -mt-64"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-white/50 hover:text-white font-black uppercase tracking-tighter transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tight leading-none mb-8"
          >
            {t('cm_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-rose-500 pl-8">
            {t('cm_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Creatine Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-black text-xs uppercase tracking-widest">
              <Brain size={14} /> Cognitive Longevity
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('cm_creatine_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('cm_creatine_p')}
            </p>
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 space-y-3">
              <div className="flex items-center gap-4 text-emerald-400">
                <Beaker size={24} />
                <span className="font-black uppercase tracking-tighter">Neuro-Metabolic Bridge</span>
              </div>
              <p className="text-sm text-slate-500 italic">"Creatine monohydrate is our primary target for age-related cognitive shielding in the menopausal transition."</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
              alt="Woman Meditating"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* NAD+ Section */}
        <section className="bg-rose-900 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-rose-900/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400/10 blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {t('cm_nad_title')}
              </h2>
              <p className="text-xl text-rose-100/70 leading-relaxed">
                {t('cm_nad_p')}
              </p>
              
              <div className="space-y-4">
                <a href="https://amazon.com/dp/B0D5N6X8Z2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 p-6 bg-white text-rose-950 rounded-3xl group font-black uppercase tracking-tighter hover:bg-rose-100 transition-all">
                  Order Mitochondrial Suite <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className="bg-white/5 rounded-[3rem] p-8 border border-white/10 backdrop-blur-xl">
              <h4 className="text-sm font-black uppercase tracking-widest text-rose-300 mb-8">Targeted Indicators</h4>
              <div className="space-y-6">
                {[
                  { name: 'Mitochondrial Reserve', percentage: 94 },
                  { name: 'Dermal Resilience', percentage: 88 },
                  { name: 'Metabolic Flexibility', percentage: 91 }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                      <span>{stat.name}</span>
                      <span>{stat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${stat.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <UniversalQA />
      </div>
    </div>
  );
}
