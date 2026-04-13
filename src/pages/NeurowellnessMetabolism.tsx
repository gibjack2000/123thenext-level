import React from 'react';
import { Microscope, ArrowLeft, ArrowRight, Activity, Zap, Shield, Beaker, Brain, ExternalLink, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function NeurowellnessMetabolism() {
  const t = useT();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 bg-emerald-950 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-circular-blue-and-green-ink-swirl-30462-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-950/70 to-slate-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/neurowellness" className="inline-flex items-center text-emerald-400 hover:text-white font-bold uppercase tracking-widest text-xs mb-12 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Neurowellness Hub
          </Link>
          
          <div className="max-w-4xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-6"
            >
              Protocol C: The Metabolic Link
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-display font-semibold uppercase tracking-[0.02em] text-white mb-8 leading-none">
              The Muscle-<br />
              <span className="text-emerald-500">Brain Axis</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100/60 font-medium leading-relaxed mb-10">
              {t('wp_meta_intro')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* The Myokine Revolution */}
        <div className="bg-white rounded-[4rem] shadow-2xl border border-emerald-100 overflow-hidden mb-32">
           <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-emerald-50">
              <div className="p-12 lg:p-20 lg:w-3/5">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-10">
                   Molecular Intelligence
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-8 leading-none">
                  {t('wp_meta_myokine_title')}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-12">
                  {t('wp_meta_myokine_p')}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">IRN</div>
                      <h4 className="font-display font-semibold uppercase text-xl text-[#2D2D2D]">Irisin Signal</h4>
                      <p className="text-sm text-slate-500 font-medium">Secreted by skeletal muscle during aerobic effort, Irisin crosses the blood-brain barrier to upregulate BDNF production in the hippocampus.</p>
                   </div>
                   <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">BDN</div>
                      <h4 className="font-display font-semibold uppercase text-xl text-[#2D2D2D]">BDNF Response</h4>
                      <p className="text-sm text-slate-500 font-medium">Commonly called "Fertilizer for the Brain," this protein supports the survival of existing neurons and encourages the growth of new ones.</p>
                   </div>
                </div>
              </div>
              <div className="p-12 lg:p-20 lg:w-2/5 bg-emerald-50/30 flex flex-col justify-center">
                 <div className="relative aspect-square mb-12">
                   <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[80px] animate-pulse"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800" 
                     alt="Brain scan" 
                     className="relative z-10 w-full h-full object-cover rounded-full border-8 border-white shadow-2xl grayscale"
                     referrerPolicy="no-referrer"
                   />
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Clinical Verification</p>
                    <p className="text-slate-800 font-medium">Muscle is the ultimate cognitive insurance policy.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Creatine for Cognitive Energy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
           <div className="bg-slate-900 p-12 md:p-20 rounded-[4rem] text-white flex flex-col justify-center shadow-3xl">
              <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-[0.02em] mb-8 leading-tight">
                {t('wp_meta_creatine_title')}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed mb-10">
                {t('wp_meta_creatine_p')}
              </p>
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Researcher" />
                      </div>
                    ))}
                 </div>
                 <p className="text-xs font-black uppercase tracking-widest text-emerald-400 italic">Peer Reviewed Protocol</p>
              </div>
           </div>
           <div className="bg-emerald-100/30 p-12 md:p-20 rounded-[4rem] border border-emerald-100 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/5 blur-[100px] group-hover:bg-emerald-500/10 transition-colors"></div>
              <Beaker size={64} className="text-emerald-600 mb-10 group-hover:rotate-12 transition-transform duration-500" />
              <h3 className="text-3xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-6">
                Brain ATP Recycling
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                Just as muscle uses phosphocreatine to recycle energy, the brain leverages the same mechanism to power through intensive cognitive loads and mitigate the effects of sleep deprivation.
              </p>
              <a href="#" className="inline-flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest hover:translate-x-3 transition-transform">
                Read Metabolism Research <ArrowRight size={16} className="ml-2" />
              </a>
           </div>
        </div>

        {/* Diagnostic Conversion */}
        <div className="text-center py-24 bg-white rounded-[5rem] shadow-3xl border border-emerald-50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
           <h3 className="text-3xl md:text-5xl font-display font-semibold uppercase tracking-[0.02em] mb-8">
             Benchmark Your Brain Metabolism
           </h3>
           <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
             Understanding the <strong>Muscle-Brain Axis</strong> is the first step. Measuring it is the second. Access 2026 cognitive diagnostics.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
             <Link to="/nutrition" className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all hover:shadow-xl hover:shadow-emerald-500/20">
               Metabolic Precision <ArrowRight size={18} className="ml-2 inline" />
             </Link>
             <button className="px-10 py-5 border-2 border-slate-200 text-slate-900 rounded-2xl font-bold uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-600 transition-all">
               Clinical Store <ExternalLink size={18} className="ml-2 inline" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
