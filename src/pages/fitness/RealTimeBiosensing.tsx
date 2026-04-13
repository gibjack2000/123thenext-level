import React, { useEffect } from 'react';
import { ArrowLeft, Activity, Microscope, Zap, Info, ExternalLink, Droplets, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';


export default function RealTimeBiosensing() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('rtb_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32">
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600/10 blur-[120px] -mt-64"></div>
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
            {t('rtb_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-emerald-500 pl-8">
            {t('rtb_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Nanopillars Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-xs uppercase tracking-widest">
              <Microscope size={14} /> Sweat-Based Discovery
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('rtb_nanopillars_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('rtb_nanopillars_p')}
            </p>
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-emerald-400 font-black text-2xl">98.4%</span>
                <span className="text-slate-500 text-xs uppercase tracking-widest">Glucose Correlation</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-blue-400 font-black text-2xl">Clinically-Validated</span>
                <span className="text-slate-500 text-xs uppercase tracking-widest">pH Monitoring Level</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800"
              alt="Medical Lab Technology"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Metabolic Detection Section */}
        <section className="bg-slate-900 rounded-[4rem] p-10 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 blur-[100px] -ml-48 -mb-48"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none text-white">
                {t('rtb_metabolic_title')}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                {t('rtb_metabolic_p')}
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Lactate Threshold Monitoring', icon: Activity },
                  { title: 'Hydration Status (Sodium/Potassium)', icon: Droplets },
                  { title: 'Cortisol (Stress) Biomarkers', icon: FlaskConical }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <stat.icon className="text-emerald-400" size={24} />
                    <span className="font-bold uppercase tracking-tight">{stat.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 md:p-12 text-slate-950 space-y-8 shadow-2xl shadow-emerald-500/10">
              <div className="text-center">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">Molecular Suite</h3>
                <p className="text-slate-500 font-medium">Equip Your Private Lab</p>
              </div>
              <div className="space-y-4">
                <a href="https://amazon.com/dp/B0D5N6X8Z2" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-emerald-600 hover:text-white transition-all duration-300">
                  <span className="font-bold uppercase tracking-tight">Insulin Sensitivity Kit</span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href="https://amazon.com/dp/B0D5N6X8Z2" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-emerald-600 hover:text-white transition-all duration-300">
                  <span className="font-bold uppercase tracking-tight">Metabolic Breath Tube</span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href="https://amazon.com/dp/B0D5N6X8Z2" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-emerald-600 text-white rounded-3xl group hover:bg-emerald-700 transition-all font-black uppercase tracking-tighter text-lg shadow-lg shadow-emerald-500/20">
                  Order Biological Age Kit <ExternalLink size={20} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
