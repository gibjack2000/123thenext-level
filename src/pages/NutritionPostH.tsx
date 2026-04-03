import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function NutritionPostH() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('nph_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200" 
              alt="Understanding Macronutrients" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('nph_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('nph_p1')}
            </p>
            <p className="mb-8">
              {t('nph_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('nph_prot_title')}</h3>
            <p className="mb-4">
              {t('nph_prot_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li><strong>{t('nph_prot_cal')}</strong></li>
              <li><strong>{t('nph_prot_intake')}</strong></li>
              <li><strong>{t('nph_prot_sources')}</strong></li>
              <li>
                <strong>{t('nph_prot_supp_title')}</strong> {t('nph_prot_supp_desc')} <a href="https://www.amazon.com/s?k=whey+protein+isolate" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">{t('nph_prot_supp_link')}</a>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('nph_carb_title')}</h3>
            <p className="mb-4">
              {t('nph_carb_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li><strong>{t('nph_carb_cal')}</strong></li>
              <li><strong>{t('nph_carb_fiber')}</strong></li>
              <li><strong>{t('nph_carb_sources')}</strong></li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('nph_fat_title')}</h3>
            <p className="mb-4">
              {t('nph_fat_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li><strong>{t('nph_fat_cal')}</strong></li>
              <li><strong>{t('nph_fat_rule')}</strong></li>
              <li><strong>{t('nph_fat_sources')}</strong></li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('nph_track_title')}</h3>
            <p className="mb-4">
              {t('nph_track_p')}
            </p>
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <strong>{t('nph_track_tool_title')}</strong>
              <p className="mt-2">
                {t('nph_track_tool_desc')} <a href="https://www.amazon.com/s?k=digital+kitchen+scale+food" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">{t('nph_track_tool_link')}</a>
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('nph_conclusion_title')}</h3>
            <p className="mb-8">
              {t('nph_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
