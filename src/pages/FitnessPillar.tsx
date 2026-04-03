import React from 'react';
import { Dumbbell, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import BlogSection from '../components/BlogSection';
import { useT } from '../translations';

export default function FitnessPillar() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=2000"
          alt="Fitness"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-50"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <Link to="/#blog" className="absolute top-10 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/70 hover:text-white font-medium transition-colors backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl border border-white/20">
            <ArrowLeft size={16} className="mr-2" />
            {t('fp_back')}
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 text-blue-400 mb-6 mx-auto"
          >
            <Dumbbell size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display uppercase tracking-tight text-white mb-6 leading-none drop-shadow-lg"
          >
            {t('fp_title')} <span className="text-blue-500">{t('fp_subtitle')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow"
          >
            {t('fp_desc')}
          </motion.p>
        </div>
      </div>

      {/* Blog Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        {/* Top Blog Posts */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-slate-900">
              {t('fp_top_posts')}
            </h2>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          <BlogSection 
            category="fitness" 
            limit={3} 
            featured={true}
          />
        </div>

        {/* Latest Blog Posts */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-slate-900">
              {t('fp_latest_posts')}
            </h2>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          <BlogSection 
            category="fitness" 
            limit={9} 
          />
        </div>
      </div>
    </div>
  );
}
