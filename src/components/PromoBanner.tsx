import React from 'react';

export default function PromoBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-b border-cyan-500/15 py-2.5 px-4 text-center relative z-50">
      <p className="text-xs md:text-sm font-semibold tracking-wide text-slate-100 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest">
          🎁 100% Free Onboarding
        </span>
        <span>
          Confused by longevity science? Read our 5-page translator & diagnose your score instantly. 
        </span>
        <a 
          href="/#onboarding-gateway" 
          className="text-cyan-400 hover:text-cyan-300 font-bold underline transition"
        >
          Access Free Toolkit ➔
        </a>
      </p>
    </div>
  );
}
