import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function NutritionPostG() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('npg_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200" 
              alt="Mastering Meal Prep: A Step-by-Step Guide for Busy Weeks" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('npg_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('npg_p1')}
            </p>
            <p className="mb-8">
              {t('npg_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('npg_sec1_title')}</h3>
            <p className="mb-4">
              {t('npg_sec1_p1')}
            </p>
            <p className="mb-8">
              {t('npg_sec1_p2')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('npg_sec2_title')}</h3>
            <p className="mb-4">
              {t('npg_sec2_p')}
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li>
                <strong>{t('npg_sec2_li1_title')}</strong> {t('npg_sec2_li1_desc')} <a href="https://www.amazon.com/s?k=glass+meal+prep+containers" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">{t('npg_sec2_li1_link')}</a>
              </li>
              <li>
                <strong>{t('npg_sec2_li2_title')}</strong> {t('npg_sec2_li2_desc')} <a href="https://www.amazon.com/s?k=8 inch chefs knife" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">{t('npg_sec2_li2_link')}</a>
              </li>
              <li>
                <strong>{t('npg_sec2_li3_title')}</strong> {t('npg_sec2_li3_desc')} <a href="https://www.amazon.com/s?k=instant+pot+multicooker" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">{t('npg_sec2_li3_link')}</a>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('npg_sec3_title')}</h3>
            <p className="mb-4">
              {t('npg_sec3_p')}
            </p>
            <ol className="list-decimal pl-6 space-y-3 mb-8">
              <li>{t('npg_sec3_li1')}</li>
              <li>{t('npg_sec3_li2')}</li>
              <li>{t('npg_sec3_li3')}</li>
              <li>{t('npg_sec3_li4')}</li>
              <li>{t('npg_sec3_li5')}</li>
            </ol>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('npg_conclusion_title')}</h3>
            <p className="mb-8">
              {t('npg_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
