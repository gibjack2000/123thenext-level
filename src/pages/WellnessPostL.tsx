import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function WellnessPostL() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('wpl_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="/sleeping-kitten.png" 
              alt="The Importance of Rest: Doing Nothing" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('wpl_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('wpl_p1')}
            </p>
            <p className="mb-8">
              {t('wpl_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpl_item1_title')}</h3>
            <p className="mb-4">
              {t('wpl_item1_p1')}
            </p>
            <p className="mb-8">
              {t('wpl_item1_p2')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpl_item2_title')}</h3>
            <p className="mb-4">
              {t('wpl_item2_p')}
            </p>
            <div className="space-y-4 mb-8">
              <p>{t('wpl_item2_sub')}</p>
              <ul className="list-disc pl-6 space-y-4 text-slate-600">
                <li>
                  <strong>{t('wpl_item2_li1_strong')}</strong>{t('wpl_item2_li1_end')}
                </li>
                <li>
                  <strong>{t('wpl_item2_li2_strong')}</strong>{t('wpl_item2_li2_mid')}
                  <a href="https://www.amazon.com/s?k=adult+jigsaw+puzzles+1000+pieces" target="_blank" rel="noopener noreferrer" className="ml-1 text-purple-600 hover:text-purple-700 font-bold underline">{t('wpl_item2_li2_link')}</a>{t('wpl_item2_li2_end')}
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpl_item3_title')}</h3>
            <p className="mb-4">
              {t('wpl_item3_p')}
            </p>
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <strong>{t('wpl_item3_box_title')}</strong>
              <p className="mt-2 text-slate-600">
                {t('wpl_item3_box_p')}
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('wpl_conclusion_title')}</h3>
            <p className="mb-8">
              {t('wpl_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
