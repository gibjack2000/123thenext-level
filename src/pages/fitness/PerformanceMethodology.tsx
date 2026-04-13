import React, { useEffect } from 'react';
import { ArrowLeft, Zap, Thermometer, Shield, Info, ExternalLink, Timer, TrendingUp, Sun, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';


export default function PerformanceMethodology() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('hpm_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32">
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] -mt-64"></div>
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
            {t('hpm_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-indigo-500 pl-8">
            {t('hpm_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* 80/20 Rule Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 font-black text-xs uppercase tracking-[0.2em]">
              <TrendingUp size={16} /> Cardiovascular Precision
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('hpm_polarized_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('hpm_polarized_p')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center">
                <span className="block text-4xl font-black text-emerald-400 mb-2">80%</span>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Zone 2 Aerobic</span>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center">
                <span className="block text-4xl font-black text-indigo-400 mb-2">20%</span>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Zone 5 Peak</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-indigo-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
              alt="Elite Training"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Strategic Recovery Section */}
        <section className="bg-slate-900 rounded-[4rem] p-10 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black text-xs uppercase tracking-widest mb-8">
                <Thermometer size={14} /> Recovery Thermodynamics
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none mb-8">
                {t('hpm_recovery_title')}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                {t('hpm_recovery_p')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Snowflake size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Cold Immersion</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">Strategic Alertness Signaling</p>
                <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-500/20">
                  Avoid immediate post-hypertrophy sessions
                </div>
              </div>

              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform">
                  <Sun size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Infrared Sauna</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">HSP Cellular Repair</p>
                <div className="p-4 bg-orange-500/10 rounded-xl text-orange-400 text-xs font-black uppercase tracking-widest border border-orange-500/20">
                  Ideal for evening cardiovascular conditioning
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate Footer */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-12 md:p-24 rounded-[4rem] border border-white/10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
            Ready to Optimize?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://amazon.com/dp/B0CMB6X8Y1" target="_blank" rel="noopener noreferrer" className="px-10 py-6 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-tighter hover:bg-indigo-500 hover:text-white transition-all shadow-xl">
              Shop Recovery Tech <ExternalLink size={18} className="inline ml-2" />
            </a>
            <a href="https://amazon.com/dp/B0CXM1X8PQ" target="_blank" rel="noopener noreferrer" className="px-10 py-6 bg-slate-800 text-white rounded-3xl font-black uppercase tracking-tighter hover:bg-white hover:text-slate-950 transition-all border border-white/10">
              View Tracking Suite <ExternalLink size={18} className="inline ml-2" />
            </a>
          </div>
        </div>


      </div>
    </div>
  );
}
