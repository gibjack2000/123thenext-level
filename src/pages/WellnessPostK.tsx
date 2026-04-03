import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function WellnessPostK() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('wpk_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200" 
              alt="How to Set Boundaries and Protect Energy" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('wpk_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('wpk_p1')}
            </p>
            <p className="mb-8">
              {t('wpk_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpk_item1_title')}</h3>
            <p className="mb-4">
              {t('wpk_item1_p1')}
            </p>
            <p className="mb-8 text-slate-500 italic">
              {t('wpk_item1_p2')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpk_item2_title')}</h3>
            <p className="mb-4">
              {t('wpk_item2_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li>{t('wpk_item2_li1_start')}<strong>{t('wpk_item2_li1_strong')}</strong>{t('wpk_item2_li1_end')}</li>
              <li>{t('wpk_item2_li2_start')}<strong>{t('wpk_item2_li2_strong')}</strong>{t('wpk_item2_li2_end')}</li>
              <li>{t('wpk_item2_li3_start')}<strong>{t('wpk_item2_li3_strong')}</strong>{t('wpk_item2_li3_end')}</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpk_item3_title')}</h3>
            <p className="mb-4">
              {t('wpk_item3_p')}
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8 text-slate-600">
              <li>
                <strong>{t('wpk_item3_li1_strong')}</strong>{t('wpk_item3_li1_end')}
              </li>
              <li>
                <strong>{t('wpk_item3_li2_strong')}</strong> <a href="https://www.amazon.com/s?k=time+locking+container+for+phone" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-bold underline">{t('wpk_item3_li2_link')}</a>{t('wpk_item3_li2_end')}
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpk_item4_title')}</h3>
            <p className="mb-4">
              {t('wpk_item4_p1')}
            </p>
            <p className="mb-8">
              {t('wpk_item4_p2')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpk_conclusion_title')}</h3>
            <p className="mb-8">
              {t('wpk_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
