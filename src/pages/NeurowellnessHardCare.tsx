import React from 'react';
import { Cpu, ArrowLeft, ArrowRight, Activity, Zap, Shield, Search, ExternalLink, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function NeurowellnessHardCare() {
  const t = useT();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/neurowellness" className="inline-flex items-center text-white/60 hover:text-white font-bold uppercase tracking-widest text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Master Hub
          </Link>
          
          <div className="max-w-4xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-300 font-bold text-[10px] uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(96,165,250,0.1)]"
            >
              Protocol A: Hard-Care Tech
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-display font-semibold uppercase tracking-[0.02em] text-white mb-8 leading-none">
              Programming<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-300 drop-shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                Homeostasis
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-10">
              {t('wp_hard_intro')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Vagus Nerve Stimulation Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-8 leading-tight">
              The VNS Revolution
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Transcutaneous Electrical Nerve Stimulation (TENS) of the auricular branch of the Vagus Nerve is the frontline tool of 2026 for bypassing the conscious mind's resistance to calm.
            </p>
            <div className="space-y-6">
               <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-blue-500">
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Afferent Signaling</h4>
                  <p className="text-slate-600">Directly stimulating the nerve sends signals back to the brainstem, which project to the hippocampus and amygdala, effectively 'turning off' the biological alarm system.</p>
               </div>
               <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-indigo-500">
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Autonomic Recalibration</h4>
                  <p className="text-slate-600">Regular use increases Heart Rate Variability (HRV) and expands the 'window of tolerance,' making you more resilient to acute future stressors.</p>
               </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
             <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" alt="Neurotech device" className="relative z-10 rounded-[3rem] shadow-2xl" />
          </div>
        </div>

        {/* Wearable War Section */}
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white shadow-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
              <h2 className="text-4xl md:text-7xl font-display font-semibold uppercase tracking-[0.02em] leading-none">
                {t('wp_hard_comparison_title')}
              </h2>
              <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-slate-400 font-bold text-sm uppercase tracking-widest">
                 Live-Data Feed Active
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "Oura Ring 4", desc: t('wp_hard_oura'), icon: Activity, metric: "Sleep Architecture" },
                 { title: "WHOOP 5.0", desc: t('wp_hard_whoop'), icon: Zap, metric: "Autonomic Strain" },
                 { title: "Apple Ultra 2", desc: t('wp_hard_apple'), icon: BarChart3, metric: "Clinical Baseline" }
               ].map((item) => (
                 <div key={item.title} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
                   <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
                     <item.icon size={28} />
                   </div>
                   <h4 className="text-2xl font-display font-semibold uppercase mb-4">{item.title}</h4>
                   <p className="text-slate-400 leading-relaxed mb-8">{item.desc}</p>
                   <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Key Metric:</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.metric}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 text-center max-w-3xl mx-auto px-4">
           <div className="w-20 h-20 rounded-[2rem] bg-blue-500/10 flex items-center justify-center text-blue-600 mx-auto mb-10 shadow-lg shadow-blue-500/10">
             <Zap size={32} />
           </div>
           <h3 className="text-3xl md:text-5xl font-display font-semibold uppercase tracking-[0.02em] mb-8">
             Upgrade Your Bio-Data Integration
           </h3>
           <p className="text-lg text-slate-600 mb-12">
             Don't just track your state—program it. Access our curated selection of 2026 neurotech and precision wearables.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-500 transition-all hover:scale-105 shadow-xl shadow-blue-500/20">
               Shop Neurotech <ExternalLink size={18} className="ml-2 inline" />
             </button>
             <button className="px-10 py-5 bg-slate-100 text-slate-900 rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center">
               View All Reports <Search size={18} className="ml-2" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
