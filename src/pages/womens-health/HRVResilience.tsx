import React, { useEffect } from 'react';
import { ArrowLeft, Activity, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

export default function HRVResilience() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "HRV Resilience | 123TheNext Level";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            alt="ECG Monitor"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-slate-950 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-emerald-300/50 hover:text-emerald-300 font-black uppercase tracking-widest transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Women's Health Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-emerald-500"></div>
             <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em]">Diagnostic Baseline</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            HRV<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">Resilience</span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-2 border-emerald-500 pl-8">
            The Autonomic Nervous System is the master switch for stress recovery and hormonal baseline. We use <strong>Heart Rate Variability (HRV)</strong> as real-time autonomic mapping for precisely cycle-synced lifestyle protocols.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40 relative z-20">
        
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-xs uppercase tracking-widest">
              <HeartPulse size={14} /> Autonomic Tracking
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              The Nervous System <span className="text-emerald-500">Decode</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              A high HRV indicates a robust, adaptable autonomic nervous system that rapidly shifts between "fight-or-flight" and "rest-and-digest." By tracking this daily, particularly synchronized with the infradian rhythm of female cycles, we deploy highly tailored physical exertion and cognitive tasks.
              This prevents systemic burnout and creates extreme neuro-hormonal resilience.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-emerald-400 mb-1">Elite</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Recovery Threshold</span>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-blue-400 mb-1">0%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Overtraining Risk</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1554162483-39d73ab60920?auto=format&fit=crop&q=80&w=800"
              alt="Heart Rate Monitor"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
