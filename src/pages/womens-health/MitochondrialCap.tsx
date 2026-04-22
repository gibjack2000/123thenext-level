import React, { useEffect } from 'react';
import { ArrowLeft, Zap, Target, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

export default function MitochondrialCap() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mitochondrial Cap | 123TheNext Level";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            alt="Mitochondria"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-slate-950 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-purple-300/50 hover:text-purple-300 font-black uppercase tracking-widest transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Women's Health Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-purple-500"></div>
             <span className="text-purple-400 font-black text-xs uppercase tracking-[0.4em]">Diagnostic Baseline</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            Mitochondrial<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-200">Cap</span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-2 border-purple-500 pl-8">
            Your energy isn't just a feeling; it's a measurable output of your cellular powerhouses. We focus on <strong>NAD+ optimization</strong> to maintain structural and cellular integrity, maximizing your overall bio-energy capacity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40 relative z-20">
        
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-black text-xs uppercase tracking-widest">
              <Zap size={14} /> ATP Synthesis Override
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              The Cellular <span className="text-purple-500">Engine</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              Mitochondrial dysfunction is the root cause of chronic fatigue, brain fog, and accelerated metabolic aging. By restoring your NAD+ pools (the co-enzyme responsible for electron transport), we physically repair mitochondrial DNA and drastically expand your metabolic cap.
              This allows your body to clear cellular debris, generate raw ATP, and perform at peak physiological capacity well beyond chronological expectations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-purple-400 mb-1">+40%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">ATP Output Variance</span>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-emerald-400 mb-1">Max</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Cellular Resilience</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-purple-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800"
              alt="Mitochondrial Structure"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
