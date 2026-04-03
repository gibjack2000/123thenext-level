import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function HealthPostA() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('hpa_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
              <img 
                src="/sleeping-kitten.png" 
              alt="The Science of Sleep" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('hpa_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('hpa_p1')}
            </p>
            <p className="mb-8">
              {t('hpa_p2')}
            </p>
            <p className="mb-8 font-semibold">
              {t('hpa_p3')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('hpa_sec1_title')}</h3>
            <p className="mb-4">
              {t('hpa_sec1_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>{t('hpa_sec1_li1')}</strong></li>
              <li><strong>{t('hpa_sec1_li2')}</strong></li>
              <li><strong>{t('hpa_sec1_li3')}</strong></li>
              <li><strong>{t('hpa_sec1_li4')}</strong></li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('hpa_sec2_title')}</h3>
            <p className="mb-4">
              {t('hpa_sec2_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>{t('hpa_sec2_li1')}</strong></li>
              <li><strong>{t('hpa_sec2_li2')}</strong></li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('hpa_sec3_title')}</h3>
            <p className="mb-4">
              {t('hpa_sec3_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>{t('hpa_sec3_li1')}</strong></li>
              <li><strong>{t('hpa_sec3_li2')}</strong></li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('hpa_sec4_title')}</h3>
            <p className="mb-4">
              {t('hpa_sec4_p')}
            </p>
            <div className="mb-8">
              <strong>{t('hpa_sec4_how')}</strong>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>{t('hpa_sec4_step1')}</li>
                <li>{t('hpa_sec4_step2')}</li>
                <li>{t('hpa_sec4_step3')}</li>
                <li>{t('hpa_sec4_step4')}</li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('hpa_tools_title')}</h3>
            <p className="mb-4">
              {t('hpa_tools_p')}
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li>
                <strong>{t('hpa_tool1_title')}</strong> <a href="https://www.google.com/search?q=https://www.amazon.com/s%3Fk%3Dcircadian%2Blighting%2Bbulbs" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 font-bold underline">{t('hpa_tool1_link')}</a>. {t('hpa_tool1_desc')}
              </li>
              <li>
                <strong>{t('hpa_tool2_title')}</strong> <a href="https://www.amazon.com/s?k=mouth+tape+for+sleeping" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 font-bold underline">{t('hpa_tool2_link')}</a>. {t('hpa_tool2_desc')}
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('hpa_conclusion_title')}</h3>
            <p className="mb-8">
              {t('hpa_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
