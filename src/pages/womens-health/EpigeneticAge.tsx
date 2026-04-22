import React, { useEffect } from 'react';
import { ArrowLeft, Dna, Activity, Shield, Info, Sparkles, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

export default function EpigeneticAge() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Epigenetic Age | 123TheNext Level";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-rose-500/30">
      {/* Dynamic Header */}
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            alt="DNA Structure"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/80 via-slate-950 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-rose-300/50 hover:text-rose-300 font-black uppercase tracking-widest transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Women's Health Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-rose-500"></div>
             <span className="text-rose-400 font-black text-xs uppercase tracking-[0.4em]">Diagnostic Baseline</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            Epigenetic<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-200">Age</span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-2 border-rose-500 pl-8">
            Your chronological age is a legal number; your <strong>biological age</strong> is the real-time speed of your cellular decay. We use advanced DNA methylation mapping to quantify and reverse the actual pace of your ovarian and systemic aging.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40 relative z-20">
        
        {/* Core Mechanism Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-black text-xs uppercase tracking-widest">
              <Network size={14} /> Methylation Mapping
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              Rewriting The <span className="text-rose-500">Code</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              Over time, environmental stressors, hormonal fluctuations, and poor metabolic inputs cause chemical tags (methyl groups) to attach to your DNA, literally turning off your youth-promoting genes. 
              By measuring these specific markers, we establish your precise <strong>Epigenetic Age</strong>—allowing us to track how protocols like NAD+ loading, resistance training, and specific phytoestrogens actively reverse your biological clock.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-rose-400 mb-1">-5.2</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Years Reversible Target</span>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-emerald-400 mb-1">True</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Biological Metric</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-rose-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800"
              alt="DNA Testing"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
