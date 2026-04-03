import React from 'react';
import { ArrowLeft, UserCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function GoodMoralPerson() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('gmp_back')}
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 blur-[80px] rounded-full -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-inner">
              <img 
                src="/assets2/foundations/moral_integrity.png" 
                alt="Moral Person" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold uppercase tracking-wider mb-6 border border-amber-100">
              <UserCheck size={16} className="mr-2" />
              {t('gmp_badge')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-8 leading-tight">
              {t('gmp_title')} <br />
              <span className="text-amber-500">{t('gmp_subtitle')}</span>
            </h1>

            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="text-xl font-medium text-slate-700 mb-6 leading-relaxed">
                {t('gmp_intro')}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">{t('gmp_decision_title')}</h2>
              <p className="mb-6">
                {t('gmp_decision_p')}
              </p>
              
              <div className="bg-slate-50 p-8 my-8 rounded-2xl border border-slate-100 italic">
                <h4 className="font-bold text-slate-900 mb-2 not-italic">{t('gmp_reflect_title')}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-0">
                  {t('gmp_reflect_p')}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">{t('gmp_integrity_title')}</h2>
              <p className="mb-6">
                {t('gmp_integrity_p')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">1</span>
                  <span><strong>{t('gmp_step1_title')}</strong> {t('gmp_step1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">2</span>
                  <span><strong>{t('gmp_step2_title')}</strong> {t('gmp_step2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">3</span>
                  <span><strong>{t('gmp_step3_title')}</strong> {t('gmp_step3')}</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 italic">{t('gmp_insight_title')}</h2>
              <p className="mb-8">
                {t('gmp_insight_p')}
              </p>

              <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 text-amber-400 flex items-center justify-center">
                  <Sparkles size={20} className="mr-2" />
                  {t('gmp_note_title')}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
                  {t('gmp_note_p')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
