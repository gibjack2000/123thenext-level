import React, { useEffect } from 'react';
import { ArrowLeft, Cpu, Shield, Zap, Info, ExternalLink, BarChart3, Binary, Activity, Gauge, Disc, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';

export default function WearableWar() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('fww_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32">
      {/* Header */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[120px] -mt-64"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/fitness" className="inline-flex items-center text-white/50 hover:text-white font-black uppercase tracking-tighter transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tight leading-none mb-8"
          >
            {t('fww_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-blue-500 pl-8">
            {t('fww_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Hardware vs Software Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black text-xs uppercase tracking-widest">
              <Shield size={14} /> 2026 Hardware Integrity
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('fww_form_factor_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('fww_form_factor_p')}
            </p>
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 space-y-4">
              <div className="flex items-center gap-4 text-emerald-400">
                <BarChart3 size={24} />
                <span className="font-black uppercase tracking-tighter">99.2% Heart Rhythm Accuracy</span>
              </div>
              <p className="text-sm text-slate-500">Clinical validation confirms ring-based digital artery sensing outperforms wrist-based optical sensors in low-perfusion environments.</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800"
              alt="Wearable Technology"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Software Brains Section */}
        <section className="bg-slate-900 rounded-[4rem] p-10 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-black text-xs uppercase tracking-widest mb-8">
                <Binary size={14} /> AI Coaching Layer
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none mb-8">
                {t('fww_software_title')}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                {t('fww_software_p')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Oura AI Advisor', focus: 'Contextual Readiness', icon: Zap },
                { name: 'WHOOP Coach', focus: 'Strain Calibration', icon: BarChart3 },
                { name: 'Apple Vitals', focus: 'Clinical Safety', icon: Shield }
              ].map((ai, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <ai.icon className="text-indigo-400 mb-6" size={24} />
                  <h4 className="font-black uppercase tracking-tighter text-white mb-2">{ai.name}</h4>
                  <p className="text-slate-500 text-sm italic">{ai.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Healthspan Metric Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=800"
              alt="Data Analysis"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-xs uppercase tracking-widest">
              <Info size={14} /> Biological Pace
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('fww_healthspan_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('fww_healthspan_p')}
            </p>
            <div className="flex gap-4">
              <a href="https://amazon.com/dp/B0CXM1X8PQ" target="_blank" rel="noopener noreferrer" className="flex-grow flex items-center justify-between p-6 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-all">
                Order Your Tracker <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
