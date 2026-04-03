import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function HealthPostC() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('hpc_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200" 
              alt="5 Daily Habits That Support Vitality" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('hpc_title')}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-bold uppercase tracking-wider">
              {t('hpc_category')}
            </span>
            <span className="text-slate-500 font-medium">{t('hpc_read_time')}</span>
          </div>

          <div className="prose prose-lg prose-rose max-w-none text-slate-600">
            <p className="lead text-2xl text-slate-500 mb-8 font-medium">
              {t('hpc_lead')}
            </p>

            <p>
              {t('hpc_p1')}
            </p>

            <p>
              {t('hpc_p2')}
            </p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpc_sec1_title')}</h3>
            <p>
              {t('hpc_sec1_p')}
            </p>

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpc_sec2_title')}</h3>
            <p>
              {t('hpc_sec2_p')}
            </p>

            <div className="my-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 italic text-center">
              {t('hpc_sec2_img_text')}
            </div>

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpc_sec3_title')}</h3>
            <p>
              {t('hpc_sec3_p')}
            </p>

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpc_sec4_title')}</h3>
            <p>
              {t('hpc_sec4_p')}
            </p>

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpc_sec5_title')}</h3>
            <p>
              {t('hpc_sec5_p')}
            </p>

            <div className="my-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 italic text-center">
              {t('hpc_sec5_img_text')}
            </div>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpc_tools_title')}</h3>
            <p>
              {t('hpc_tools_p')}
            </p>

            <ul className="space-y-4 my-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>{t('hpc_tool1_title')}</strong> {t('hpc_tool1_desc')} <a href="https://www.google.com/search?q=https://www.amazon.com/s%3Fk%3Dpure%2Bshilajit%2Bresin" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline font-medium">{t('hpc_tool1_link')}</a>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>{t('hpc_tool2_title')}</strong> {t('hpc_tool2_desc')} <a href="https://www.amazon.com/s?k=blue+light+blocking+glasses" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline font-medium">{t('hpc_tool2_link')}</a>.</span>
              </li>
            </ul>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">{t('hpc_conclusion_title')}</h3>
            <p>
              {t('hpc_conclusion_p1')}
            </p>
            <p>
              {t('hpc_conclusion_p2')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
