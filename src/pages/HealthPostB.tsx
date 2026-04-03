import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function HealthPostB() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('hpb_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=1200" 
              alt="Understanding Your Immune System" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('hpb_title')}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-bold uppercase tracking-wider">
              {t('hpb_category')}
            </span>
            <span className="text-slate-500 font-medium">{t('hpb_read_time')}</span>
          </div>

          <div className="prose prose-lg prose-rose max-w-none text-slate-600">
            <p className="lead text-2xl text-slate-500 mb-8 font-medium">
              {t('hpb_lead')}
            </p>

            <p>
              {t('hpb_p1')}
            </p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpb_sec1_title')}</h3>
            <p>
              {t('hpb_sec1_p')}
            </p>

            <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">{t('hpb_sec1_sub1_title')}</h4>
            <p>
              {t('hpb_sec1_sub1_p')}
            </p>

            <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">{t('hpb_sec1_sub2_title')}</h4>
            <p>
              {t('hpb_sec1_sub2_p')}
            </p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpb_sec2_title')}</h3>
            <p>
              {t('hpb_sec2_p1')}
            </p>
            <p>
              {t('hpb_sec2_p2')}
            </p>
            <p>
              {t('hpb_sec2_p3')}
            </p>

            <div className="my-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 italic">
              {t('hpb_sec2_img_text')}
            </div>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpb_sec3_title')}</h3>
            <p>
              {t('hpb_sec3_p')}
            </p>

            <ul className="space-y-4 my-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>{t('hpb_sec3_li1_title')}</strong> {t('hpb_sec3_li1_desc')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>{t('hpb_sec3_li2_title')}</strong> {t('hpb_sec3_li2_desc')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>{t('hpb_sec3_li3_title')}</strong> {t('hpb_sec3_li3_desc')}</span>
              </li>
            </ul>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpb_sec4_title')}</h3>
            <p>
              {t('hpb_sec4_p')}
            </p>

            <ul className="space-y-4 my-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>{t('hpb_sec4_li1_title')}</strong> {t('hpb_sec4_li1_desc')} <a href="https://www.google.com/search?q=https://www.amazon.com/s%3Fk%3Dprobiotic%2Bsupplement%2Bfor%2Bimmune%2Bsupport" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline font-medium">{t('hpb_sec4_li1_link')}</a>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>{t('hpb_sec4_li2_title')}</strong> {t('hpb_sec4_li2_desc')} <a href="https://www.amazon.com/s?k=vitamin+d3+k2" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline font-medium">{t('hpb_sec4_li2_link')}</a>.</span>
              </li>
            </ul>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpb_conclusion_title')}</h3>
            <p>
              {t('hpb_conclusion_p1')}
            </p>
            <p>
              {t('hpb_conclusion_p2')}
            </p>
            <p>
              {t('hpb_conclusion_p3')}
            </p>

            <div className="mt-12 p-8 bg-rose-50 rounded-2xl border border-rose-100 italic text-slate-700 font-medium text-center">
              {t('hpb_cta')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
