import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Sparkles, Database, Brain, ArrowRight } from 'lucide-react';
import { useT } from '../translations';
import UniversalQA from '../components/UniversalQA';

export default function IntelligenceHub() {
  const t = useT();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 overflow-hidden bg-slate-900">
        {/* Abstract Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent_70%)] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#6366f1,transparent_70%)] blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold tracking-[0.2em] uppercase mb-8 border border-blue-500/20"
          >
            <Database size={16} className="mr-2" />
            The Knowledge Source
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-white mb-8 leading-none">
            Intelligence <br /><span className="text-blue-500">Center</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            The 2026 translation layer for high-performance medicine. Moving from subjective feelings to objective biological data.
          </p>
        </div>
      </div>

      <div className="relative z-10 -mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">AI Integration</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Advanced biometric interpretation powered by federated learning models.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Evidence-Based</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Every insight is linked to peer-reviewed clinical data and real-time biosensing.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <HelpCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Q&A</h3>
              <p className="text-slate-500 text-sm leading-relaxed">The "translation layer" for interpreting biological markers and performance metrics.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-24">
        <UniversalQA />
      </div>

      {/* Call to Action */}
      <div className="bg-slate-50 py-24 mb-24 mx-4 md:mx-12 rounded-[3.5rem] border border-slate-100 text-center overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-slate-900 mb-8 leading-none">
            Ready to <span className="text-blue-600">Optimize?</span>
          </h2>
          <p className="text-lg text-slate-500 mb-12 font-medium">
            Explore our curated research and clinical-grade protocols to build your high-performance future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 shadow-2xl shadow-slate-900/20 flex items-center justify-center">
              View All Pillars
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
              Our Methodology
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
