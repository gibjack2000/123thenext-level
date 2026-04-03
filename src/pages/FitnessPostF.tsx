import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function FitnessPostF() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('fpf_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" 
              alt="Overcoming Workout Plateaus" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('fpf_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('fpf_p1')}
            </p>
            <p className="mb-8">
              {t('fpf_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpf_sec1_title')}</h3>
            <p className="mb-4">
              {t('fpf_sec1_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>{t('fpf_sec1_li1')}</li>
              <li>{t('fpf_sec1_li2')}</li>
              <li>{t('fpf_sec1_li3')}</li>
            </ul>
            <p className="mb-4 text-slate-500 italic">
              {t('fpf_sec1_note')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpf_sec2_title')}</h3>
            <p className="mb-4">
              {t('fpf_sec2_p')}
            </p>
            <div className="mb-8">
              <strong>{t('fpf_sec2_tool_title')}</strong> 
              <p className="mt-2">
                <a href="https://www.amazon.com/s?k=fractional+weight+plates" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpf_sec2_tool_link')}</a>. {t('fpf_sec2_tool_desc')}
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpf_sec3_title')}</h3>
            <p className="mb-4">
              {t('fpf_sec3_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>{t('fpf_sec3_li1_title')}</strong> {t('fpf_sec3_li1_desc')}</li>
              <li><strong>{t('fpf_sec3_li2_title')}</strong> {t('fpf_sec3_li2_desc')}</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpf_sec4_title')}</h3>
            <p className="mb-4">
              {t('fpf_sec4_p')}
            </p>
            <div className="mb-8">
              <strong>{t('fpf_sec4_supp_title')}</strong>
              <p className="mt-2">
                <a href="https://www.amazon.com/s?k=creatine+monohydrate+powder" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpf_sec4_supp_link')}</a>. {t('fpf_sec4_supp_desc')}
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpf_conclusion_title')}</h3>
            <p className="mb-8">
              {t('fpf_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
