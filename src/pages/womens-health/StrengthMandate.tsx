import React, { useEffect } from 'react';
import { ArrowLeft, Dumbbell, Zap, Shield, Info, ExternalLink, Activity, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import UniversalQA from '../../components/UniversalQA';

export default function StrengthMandate() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('sm_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-32">
      {/* Header */}
      <div className="relative py-32 overflow-hidden bg-rose-900">
        <div className="absolute inset-0 bg-white/5 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
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
            {t('sm_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-rose-100/70 max-w-3xl font-medium leading-relaxed border-l-4 border-rose-400 pl-8">
            {t('sm_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 mt-20">
        {/* Heavy Strength Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-black text-xs uppercase tracking-widest">
              <Dumbbell size={14} /> Mechanical Loading
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('sm_heavy_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('sm_heavy_p')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <span className="block text-3xl font-black text-rose-400 mb-1">+12%</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Bone Density Reserve</span>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <span className="block text-3xl font-black text-blue-400 mb-1">Optimum</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Insulin Sensitivity</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1541534741688-6078c64b5cc5?auto=format&fit=crop&q=80&w=800"
              alt="Woman Strength Training"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Grassroots Revolution Section */}
        <section className="bg-white rounded-[4rem] p-10 md:p-20 text-slate-900 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100 blur-[100px] -mr-48 -mb-48"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
                alt="Women Sports Team"
                className="rounded-[3rem] shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-600/10 border border-rose-600/30 text-rose-600 font-black text-xs uppercase tracking-widest">
                <Trophy size={14} /> 2026 Sports Revolution
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {t('sm_revolution_title')}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('sm_revolution_p')}
              </p>
              
              <div className="flex gap-4">
                <a href="https://amazon.com/dp/B0CLB5X8X9" target="_blank" rel="noopener noreferrer" className="flex-grow flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-tighter hover:bg-rose-600 transition-all text-sm md:text-base">
                  Shop Strength Rack <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <UniversalQA />
      </div>
    </div>
  );
}
