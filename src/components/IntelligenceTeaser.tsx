import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useT } from '../translations';

const IntelligenceTeaser: React.FC = () => {
  const t = useT();

  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-6 border border-white/5"
            >
              <Sparkles size={12} className="mr-2" />
              Intelligence Hub 2026
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6"
            >
              {t('uqa_subtitle')}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg font-medium leading-relaxed mb-10 max-w-xl"
            >
              Stop guessing. Start knowing. Access our consolidated intelligence hub for the latest in clinical longevity gaps, metabolic optimization, and verified performance hardware.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/intelligence-hub"
                className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-indigo-600/20 group"
              >
                Enter Intelligence Hub
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-sm relative"
            >
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <div className="w-full bg-white/10 border-none rounded-2xl py-4 pl-12 pr-4 text-white/50 font-medium">
                  {t('uqa_search_placeholder')}
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  'How to test biological age at home?',
                  'GLP-1 safety & muscle preservation',
                  'VO2 Max longevity standards 2026'
                ].map((q, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl text-white/60 text-sm font-bold opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-forwards" style={{ animationDelay: `${(i+4)*150}ms` }}>
                    <div className="flex items-center gap-3">
                      <HelpCircle size={16} className="text-indigo-400/50" />
                      {q}
                    </div>
                    <ArrowRight size={14} className="text-white/20" />
                  </div>
                ))}
              </div>
              
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent rounded-b-[3rem] flex items-end justify-center pb-10">
                <span className="text-indigo-400 text-xs font-black uppercase tracking-widest animate-pulse">
                  + 42 more intelligence markers
                </span>
              </div>
            </motion.div>
            
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 blur-[100px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceTeaser;
