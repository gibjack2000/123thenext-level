import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Sparkles, Shield, Zap } from 'lucide-react';
import { useT } from '../translations';
import UniversalQA from '../components/UniversalQA';
const IntelligenceHub: React.FC = () => {
  const t = useT();

  return (
    <div className="min-h-screen bg-slate-grey-950">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-grey-950/40 border-b border-slate-grey-800/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-wellness-cyan/10 border border-wellness-cyan/25 text-wellness-cyan-light font-black text-[10px] uppercase tracking-widest mb-6"
            >
              <Sparkles size={12} className="mr-2 animate-pulse" />
              Central Medicalized intelligence 2026
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8"
            >
              {t('uqa_title')}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-grey-300 font-light leading-relaxed mb-10 animate-fade-in"
            >
              Your consolidated resource for navigating the complex protocols of modern longevity, 
              metabolic health, and performance science. One source of truth for the medicalized wellness revolution.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-grey-900 border border-slate-grey-800 rounded-xl shadow-lg">
                <Shield size={16} className="text-emerald-400" />
                <span className="text-sm font-bold text-slate-grey-200">Clinical Protocols</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-grey-900 border border-slate-grey-800 rounded-xl shadow-lg">
                <Zap size={16} className="text-wellness-amber" />
                <span className="text-sm font-bold text-slate-grey-200">Bio-Hacking Guides</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-grey-900 border border-slate-grey-800 rounded-xl shadow-lg">
                <HelpCircle size={16} className="text-wellness-cyan-light" />
                <span className="text-sm font-bold text-slate-grey-200">Protocol Validation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <UniversalQA />

      {/* Bottom CTA or Disclaimer */}
      <section className="py-20 bg-slate-grey-900 border-t border-slate-grey-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Shield size={48} className="mx-auto text-wellness-cyan mb-8" />
            <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-6">Scientific Accuracy First</h2>
            <p className="text-slate-grey-400 text-lg mb-0 font-light leading-relaxed">
              All intelligence markers in this hub are cross-referenced with 2026 clinical standards. 
              We update this centralized repository weekly to reflect the shifting landscape of 
              Human Performance and Medicalized Wellness.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntelligenceHub;
