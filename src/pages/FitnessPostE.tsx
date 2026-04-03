import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function FitnessPostE() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('fpe_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Improve Your Mobility in 10 Minutes" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('fpe_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('fpe_p1')}
            </p>
            <p className="mb-8">
              {t('fpe_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpe_diff_title')}</h3>
            <p className="mb-8">
              {t('fpe_diff_p')}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpe_flow_title')}</h3>
            <p className="mb-4">
              {t('fpe_flow_p')}
            </p>
            
            <div className="space-y-6 mb-8">
              <div>
                <strong className="text-slate-900 text-lg">{t('fpe_move1_title')}</strong>
                <p className="mt-1">
                  {t('fpe_move1_p')}
                </p>
              </div>
              <div>
                <strong className="text-slate-900 text-lg">{t('fpe_move2_title')}</strong>
                <p className="mt-1">
                  {t('fpe_move2_p')}
                </p>
              </div>
              <div>
                <strong className="text-slate-900 text-lg">{t('fpe_move3_title')}</strong>
                <p className="mt-1">
                  {t('fpe_move3_p')}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpe_tools_title')}</h3>
            <p className="mb-4">
              {t('fpe_tools_p')}
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li>
                <strong>{t('fpe_tool1_title')}</strong> {t('fpe_tool1_desc')} <a href="https://www.amazon.com/s?k=high+density+foam+roller" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpe_tool1_link')}</a>
              </li>
              <li>
                <strong>{t('fpe_tool2_title')}</strong> {t('fpe_tool2_desc')} <a href="https://www.amazon.com/s?k=lacrosse+massage+ball" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpe_tool2_link')}</a>
              </li>
              <li>
                <strong>{t('fpe_tool3_title')}</strong> {t('fpe_tool3_desc')} <a href="https://www.amazon.com/s?k=cork+yoga+blocks" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">{t('fpe_tool3_link')}</a>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('fpe_conclusion_title')}</h3>
            <p className="mb-8">
              {t('fpe_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
