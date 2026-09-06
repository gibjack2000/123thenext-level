import React, { useState } from 'react';

export type Region = 'US' | 'UK' | 'ES';

export interface RegionData {
  badge: string;
  tagline: string;
  description: string;
  buttonText: string;
  amazonUrl: string;
  bullets: string[];
}

export const REGION_MAP: Record<Region, RegionData> = {
  US: {
    badge: 'FDA Cleared & CLIA Waived',
    tagline: 'Your Simple 2-Minute Morning Balance Check',
    description: 'A plain paper, dip-and-read visual chemical test tracking 10 critical bio-indicators in under 2 minutes. Requires zero digital setup, app sync, screen time, or Bluetooth pairing. Instantly flags early kidney stress, metabolic ketones, and hydration imbalances, delivering peace of mind without the digital noise.',
    buttonText: 'Order on Amazon (US)',
    amazonUrl: 'https://www.amazon.com/s?k=10+parameter+urine+test+strips&tag=123znl0e-20',
    bullets: [
      'Tracks 10 parameters (Glucose, Ketones, pH, Protein, Nitrites, and more)',
      'Provides a clinical-grade baseline for your fluid and kidney health at home',
      'No complex apps, screens, or Bluetooth syncing required',
      'Pairs perfectly with our simple morning wellness routine'
    ]
  },
  UK: {
    badge: 'MHRA Registered',
    tagline: 'Your Simple 2-Minute Morning Balance Check',
    description: 'An MHRA-registered, clinical-grade home testing reagent tracking 10 critical bio-indicators in under 2 minutes. Requires zero digital setup, app sync, screen time, or Bluetooth pairing. Instantly flags early kidney stress, metabolic ketones, and hydration imbalances, delivering peace of mind without the digital noise.',
    buttonText: 'Order on Amazon (UK)',
    amazonUrl: 'https://www.amazon.co.uk/s?k=10+parameter+urine+test+strips&tag=123znl0f3-21',
    bullets: [
      'Tracks 10 parameters (Glucose, Ketones, pH, Protein, Nitrites, and more)',
      'Provides a clinical-grade baseline for your fluid and kidney health at home',
      'No complex apps, screens, or Bluetooth syncing required',
      'Pairs perfectly with our simple morning wellness routine'
    ]
  },
  ES: {
    badge: 'Certificado CE 0123',
    tagline: 'Tu Control Sencillo de Equilibrio de 2 Minutos',
    description: 'Una tira reactiva química visual de papel común que registra 10 indicadores críticos en menos de 2 minutos. No requiere configuración digital, sincronización de aplicaciones, tiempo de pantalla ni emparejamiento Bluetooth. Alerta instantáneamente sobre el esfuerzo renal, cetonas metabólicas y desequilibrios de hidratación, ofreciendo tranquilidad sin ruido digital.',
    buttonText: 'Comprar en Amazon (ES)',
    amazonUrl: 'https://www.amazon.es/s?k=tiras+analisis+orina+10+parametros&tag=123znl08a-21',
    bullets: [
      'Analiza 10 parámetros vitales (glucosa, cetonas, pH, proteínas, nitritos y más)',
      'Establece una línea de base clínica para tu salud renal y de fluidos en casa',
      'Sin necesidad de aplicaciones complejas, pantallas ni Bluetooth',
      'Se integra fácilmente con tu rutina de bienestar matutina'
    ]
  }
};

export const MorningBalanceCheck: React.FC = () => {
  const [region, setRegion] = useState<Region>('US');
  const current = REGION_MAP[region];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-700">
      {/* Dynamic Header & Tab Selector */}
      <div className="p-6 sm:p-8 border-b border-slate-900 bg-slate-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            {current.badge}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            {region === 'ES' ? 'El Kit de Equilibrio Esencial' : 'The Essential Balance Kit'}
          </h3>
        </div>

        {/* Toggle Controls */}
        <div className="flex items-center gap-1.5 bg-[#060a12] p-1.5 border border-slate-800/90 rounded-2xl self-stretch sm:self-auto shadow-xl">
          {(['US', 'UK', 'ES'] as Region[]).map((r) => {
            const isSelected = region === r;
            const flag = r === 'US' ? '🇺🇸' : r === 'UK' ? '🇬🇧' : '🇪🇸';
            const label = r === 'ES' ? 'España' : r;
            
            const getActiveStyles = () => {
              if (r === 'US') return 'bg-gradient-to-r from-cyan-950/90 via-slate-900 to-blue-950/90 text-cyan-300 border-cyan-400/70 shadow-[0_0_18px_rgba(6,182,212,0.35)]';
              if (r === 'UK') return 'bg-gradient-to-r from-indigo-950/90 via-slate-900 to-sky-950/90 text-indigo-300 border-indigo-400/70 shadow-[0_0_18px_rgba(99,102,241,0.35)]';
              return 'bg-gradient-to-r from-amber-950/90 via-slate-900 to-rose-950/90 text-amber-300 border-amber-400/70 shadow-[0_0_18px_rgba(245,158,11,0.35)]';
            };

            return (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border ${
                  isSelected
                    ? `${getActiveStyles()}`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border-transparent'
                }`}
              >
                <span>{flag}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Product Visual Mockup */}
        <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 group overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.08),transparent_60%)]" />

          {/* Decorative Reagent Strip Art */}
          <div className="relative w-12 h-64 bg-slate-800/80 border border-slate-700/50 rounded-lg shadow-inner flex flex-col justify-between py-4 px-2 group-hover:scale-105 transition-transform duration-500">
            {/* 10 Color Reagent Pads */}
            <div className="w-full h-3 rounded bg-amber-500/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-cyan-400/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-teal-500/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-emerald-500/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-yellow-400/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-orange-500/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-rose-500/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-fuchsia-500/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-violet-500/80 shadow-sm" />
            <div className="w-full h-3 rounded bg-indigo-500/80 shadow-sm" />
          </div>

          <p className="text-xs text-slate-500 mt-4 tracking-wide group-hover:text-cyan-400/80 transition-colors duration-300">
            {region === 'ES' ? 'Tira de Análisis Clínico URS-10' : 'URS-10 Clinical Reagent Strip'}
          </p>
        </div>

        {/* Product Details & Copy */}
        <div className="flex flex-col h-full justify-between gap-6">
          <div>
            <h4 className="text-lg font-semibold text-slate-100 tracking-tight">
              {current.tagline}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">
              {current.description}
            </p>
          </div>

          {/* Value Highlights */}
          <ul className="space-y-3">
            {current.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <svg className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Action Trigger */}
          <div className="pt-4 border-t border-slate-900/60">
            <a
              href={current.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-sm sm:text-base rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
            >
              <span>{current.buttonText}</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <p className="text-[10px] text-slate-500 mt-3 text-center tracking-wide leading-relaxed">
              {region === 'ES'
                ? '* Enlace de afiliado oficial de Amazon España. Su compra apoya directamente nuestra investigación de longevidad sin costo adicional.'
                : `* Official Amazon ${region} affiliate link. Your purchase directly supports our longevity research at zero additional cost to you.`}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MorningBalanceCheck;
