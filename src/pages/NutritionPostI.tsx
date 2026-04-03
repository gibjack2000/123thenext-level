import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../translations';

export default function NutritionPostI() {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {t('npi_back')}
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200" 
              alt="10 Blood-Sugar-Friendly Snacks" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            {t('npi_title')}
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              {t('npi_p1')}
            </p>
            <p className="mb-8">
              {t('npi_p2')}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('npi_rule_title')}</h3>
            <p className="mb-8 pb-6 border-b border-slate-200">
              {t('npi_rule_p')}
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item1_title')}</strong>
                <p>{t('npi_item1_p')}</p>
                <div className="mt-2 text-sm">
                  <a href="https://www.amazon.com/s?k=natural+almond+butter+no+sugar" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">{t('npi_item1_link')}</a>
                </div>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item2_title')}</strong>
                <p>{t('npi_item2_p')}</p>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item3_title')}</strong>
                <p>{t('npi_item3_p')}</p>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item4_title')}</strong>
                <p>{t('npi_item4_p')}</p>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item5_title')}</strong>
                <p>{t('npi_item5_p')}</p>
                <div className="mt-2 text-sm">
                  <a href="https://www.amazon.com/s?k=unsalted+mixed+nuts+snack+packs" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">{t('npi_item5_link')}</a>
                </div>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item6_title')}</strong>
                <p>{t('npi_item6_p')}</p>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item7_title')}</strong>
                <p>{t('npi_item7_p')}</p>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item8_title')}</strong>
                <p>{t('npi_item8_p')}</p>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item9_title')}</strong>
                <p>{t('npi_item9_p')}</p>
              </div>

              <div>
                <strong className="text-slate-900 text-xl block mb-2">{t('npi_item10_title')}</strong>
                <p>{t('npi_item10_p')}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('npi_conclusion_title')}</h3>
            <p className="mb-8">
              {t('npi_conclusion_p')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
