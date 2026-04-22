import React, { useEffect } from 'react';
import { ArrowLeft, Dumbbell, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

export default function BoneDensity() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bone Density | 123TheNext Level";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541534741688-6078c64b5cc5?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            alt="Strength Training"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-slate-950 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-blue-300/50 hover:text-blue-300 font-black uppercase tracking-widest transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Women's Health Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-blue-500"></div>
             <span className="text-blue-400 font-black text-xs uppercase tracking-[0.4em]">Diagnostic Baseline</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            Bone<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-200">Density</span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-2 border-blue-500 pl-8">
            Osteopenia is an engineering failure, not a biological inevitability. We deploy rigorous <strong>mechanical loading protocols</strong> designed to maximize bone morphogenic density prior to and throughout the menopause transition.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40 relative z-20">
        
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black text-xs uppercase tracking-widest">
              <Dumbbell size={14} /> Osteogenic Loading
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              The Structural <span className="text-blue-500">Mandate</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              Bones require extreme axial loading to trigger osteoblast synthesis. As estrogen drops, the protective hormonal shield over bone tissue vanishes. The only clinically proven defense is heavy, multi-planar resistance training.
              By applying calculated stress through deadlifts, squats, and plyometrics, we physically force the skeleton to thicken, preventing frailty decades before it becomes visible on a DEXA scan.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-blue-400 mb-1">DEXA</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Verified Density Accrual</span>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-rose-400 mb-1">0%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Osteopenia Tolerance</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
              alt="Heavy Lifting"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
