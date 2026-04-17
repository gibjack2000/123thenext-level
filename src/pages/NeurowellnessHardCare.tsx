import React from 'react';
import { Cpu, ArrowLeft, ArrowRight, Activity, Zap, Shield, Search, ExternalLink, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

  const products = [
    {
      id: 'oura-4',
      name: 'Oura Ring 4',
      desc: 'The gold standard for tracking sleep architecture and high-fidelity HRV recovery metrics.',
      price: '$399',
      image: '/Products/Oura1.jpg',
      url: 'https://amazon.com/dp/B0CKZPR5WJ' // Dummy Amazon link
    },
    {
      id: 'nurosym',
      name: 'Nurosym VNS',
      desc: 'Clinically-validated transcutaneous vagus nerve stimulator for rapid autonomic nervous system resets.',
      price: '$699',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300',
      url: '#'
    },
    {
      id: 'apple-ultra',
      name: 'Apple Watch Ultra 2',
      desc: 'Robust clinical baseline monitoring with specialized integration for endurance and HRV tracking.',
      price: '$799',
      image: '/Products/apple10.jpg',
      url: '#'
    }
  ];

export default function NeurowellnessHardCare() {
  const t = useT();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-indigo-600/30"></div>
        </div>
        
        {/* Animated Cyber Blobs */}
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/neurowellness" className="inline-flex items-center text-white/40 hover:text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-16 transition-all group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Master Hub access
          </Link>
          
          <div className="max-w-5xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-300 font-bold text-[10px] uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(96,165,250,0.1)]"
            >
              Protocol A: Hard-Care Tech
            </motion.div>
            <h1 className="text-5xl md:text-[8rem] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
              Programming<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-300 drop-shadow-[0_0_30px_rgba(96,165,250,0.3)]">
                Homeostasis
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed mb-12 max-w-3xl border-l-2 border-blue-500/30 pl-8 italic">
              "When the nervous system is stuck in protection mode, conscious effort is not enough. We must use exogenous signals to force a reset."
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
        {/* VNS Definition Block */}
        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6">
                Clinical Definition
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-[#2D2D2D] mb-8 leading-tight">
                Vagal Tone Reset
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Transcutaneous Vagus Nerve Stimulation (tVNS) represents the frontier of neuro-regulation. By applying targeted electrical micro-impulses to the concha of the ear, we activate the auricular branch of the vagus nerve, sending immediate inhibitory signals to the fight-or-flight centers of the brain.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-2 uppercase text-sm tracking-wide">Biological Outcome</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Systemic reduction in cortisol, increased parasympathetic dominance, and synchronization of brain-wave patterns.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-2 uppercase text-sm tracking-wide">HRV Impact</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Consistent usage results in a 15-25% baseline increase in Heart Rate Variability within 6 weeks.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
               <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" alt="VNS Device Application" className="relative z-10 rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" />
               <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                      <Zap size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Current Phase</p>
                      <p className="text-xl font-display font-bold uppercase">Reset Protocol</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* The Arsenal: Indispensable Product Links */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-[#2D2D2D] mb-6 tracking-tight">The 2026 Arsenal</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">The tools required to measure, manage, and master your autonomic nervous system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl hover:-translate-y-4 hover:shadow-3xl transition-all duration-500 flex flex-col group">
                <div className="aspect-[4/3] rounded-[2rem] bg-slate-50 mb-8 overflow-hidden relative">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-xs uppercase shadow-sm">
                     {p.price}
                   </div>
                </div>
                <h3 className="text-2xl font-display font-bold uppercase text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">{p.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{p.desc}</p>
                <div className="pt-6 border-t border-slate-50">
                   <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all group/btn shadow-lg"
                   >
                     Order Equipment <ExternalLink size={12} className="ml-2 group-hover/btn:scale-125 transition-transform" />
                   </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wearable War / Detailed Comparison */}
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white shadow-3xl overflow-hidden relative mb-32">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                  Intelligence Feed
                </div>
                <h2 className="text-4xl md:text-8xl font-display font-semibold uppercase tracking-tighter leading-none">
                  Wearable<br />Wars
                </h2>
              </div>
              <p className="text-slate-400 max-w-sm text-lg leading-relaxed text-right md:text-left">
                Tracking is not enough. We analyze how 2026 hardware translates raw biometric noise into actionable performance signals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "Oura Ring 4", desc: "The master of sleep architecture. Its infrared PPG sensors now offer 99% clinical correlation for REM and Deep Sleep cycles.", icon: Activity, metric: "Sleep / HRV Stability" },
                 { title: "WHOOP 5.0", desc: "Built for recovery. Its strain-to-recovery algorithm is the industry leader for athletes managing intense CNS fatigue.", icon: Zap, metric: "Autonomic Strain" },
                 { title: "Apple Ultra 2", desc: "The ultimate clinical proxy. Offers the most robust ecosystem for third-party neuro-app integration and cellular fallback.", icon: BarChart3, metric: "General Baseline" }
               ].map((item) => (
                 <div key={item.title} className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden">
                   <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-10 border border-blue-500/20 group-hover:scale-110 transition-transform">
                     <item.icon size={32} />
                   </div>
                   <h4 className="text-3xl font-display font-semibold uppercase mb-6 tracking-tight">{item.title}</h4>
                   <p className="text-slate-400 leading-relaxed mb-10 text-sm">{item.desc}</p>
                   <div className="pt-8 border-t border-white/10 flex flex-col gap-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Clinical Focus:</span>
                       <span className="text-lg font-display font-bold uppercase">{item.metric}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-4xl mx-auto pb-32">
           <div className="w-24 h-24 rounded-[2.5rem] bg-blue-500/10 flex items-center justify-center text-blue-600 mx-auto mb-12 shadow-2xl shadow-blue-500/20 border border-blue-500/20">
             <Cpu size={40} />
           </div>
           <h3 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-slate-900 mb-8">
             Systemic Stability<br />is a Choice.
           </h3>
           <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto leading-relaxed italic">
             Ready to deploy your internal defense systems? Our curated selection represents the only tech we trust to be part of the 123TheNext Level ecosystem.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button className="px-12 py-6 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all hover:scale-105 shadow-[0_20px_40px_rgba(37,99,235,0.25)]">
               Explore Full Catalog <ExternalLink size={18} className="ml-3 inline" />
             </button>
             <button className="px-12 py-6 bg-slate-100 text-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">
               Clinical White Paper
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
