import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function FitnessPostD() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('fpd_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200" 
              alt="A Beginner's Guide to Strength Training at Home" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('fpd_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('fpd_p1')}
            </p>
            <p className="mb-8">
              {t('fpd_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpd_sec1_title')}</h3>
            <p className="mb-4">
              {t('fpd_sec1_p')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>{t('fpd_sec1_li1').split(':')[0]}:</strong>{t('fpd_sec1_li1').split(':')[1]}</li>
              <li><strong>{t('fpd_sec1_li2').split(':')[0]}:</strong>{t('fpd_sec1_li2').split(':')[1]}</li>
              <li><strong>{t('fpd_sec1_li3').split(':')[0]}:</strong>{t('fpd_sec1_li3').split(':')[1]}</li>
              <li><strong>{t('fpd_sec1_li4').split(':')[0]}:</strong>{t('fpd_sec1_li4').split(':')[1]}</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpd_sec2_title')}</h3>
            <p className="mb-4">
              {t('fpd_sec2_p')}
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li>
                <strong>{t('fpd_sec2_li1_title')}</strong> {t('fpd_sec2_li1_desc')} <a href="https://www.amazon.com/s?k=adjustable+dumbbells" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpd_sec2_li1_link')}</a>
              </li>
              <li>
                <strong>{t('fpd_sec2_li2_title')}</strong> {t('fpd_sec2_li2_desc')} <a href="https://www.amazon.com/s?k=heavy+resistance+bands" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpd_sec2_li2_link')}</a>
              </li>
              <li>
                <strong>{t('fpd_sec2_li3_title')}</strong> {t('fpd_sec2_li3_desc')} <a href="https://www.amazon.com/s?k=adjustable+weight+bench" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpd_sec2_li3_link')}</a>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpd_sec3_title')}</h3>
            <p className="mb-4">
              {t('fpd_sec3_p')}
            </p>
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-2">{t('fpd_sec3_sample_title')}</strong>
              <ul className="list-decimal pl-6 space-y-1">
                <li>{t('fpd_sec3_sample_li1')}</li>
                <li>{t('fpd_sec3_sample_li2')}</li>
                <li>{t('fpd_sec3_sample_li3')}</li>
                <li>{t('fpd_sec3_sample_li4')}</li>
                <li>{t('fpd_sec3_sample_li5')}</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpd_sec4_title')}</h3>
            <p className="mb-8">
              {t('fpd_sec4_p')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpd_conclusion_title')}</h3>
            <p className="mb-8">
              {t('fpd_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
