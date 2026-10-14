import React from 'react';
import { Link } from 'react-router-dom';

export const TickerTapeBanner: React.FC = () => {
  const tickerItems = (
    <>
      <span className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        GEROSCIENCE PIPELINE ONLINE
      </span>

      <span className="text-slate-700">|</span>

      <a 
        href="/the-next-level-lifespan-v7.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
      >
        <span>📘</span> Free 28-Page Longevity Blueprint PDF Available
      </a>

      <span className="text-slate-700">|</span>

      <span className="text-slate-300">
        🩸 Direct Clinical Lab Draws: <strong className="text-white">HealthLabs (US)</strong> • <strong className="text-white">Lola (UK)</strong> • <strong className="text-white">Melio (ES)</strong>
      </span>

      <span className="text-slate-700">|</span>

      <Link
        to="/quiz"
        className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold flex items-center gap-1"
      >
        🎯 5-Min Wellness Quiz Baseline ➔
      </Link>
    </>
  );

  return (
    <div className="group relative w-full h-8 bg-slate-950 border-b border-slate-800/80 text-[11px] font-semibold text-slate-300 overflow-hidden select-none flex items-center">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between relative">
        
        {/* Soft edge fade masks for smooth entrance/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 md:right-48 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

        {/* 1. Continuous Smooth Scrolling Marquee (pauses on hover) */}
        <div className="flex-1 overflow-hidden h-full flex items-center">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
            
            {/* Track 1 */}
            <div className="flex items-center gap-8 px-6 whitespace-nowrap">
              {tickerItems}
            </div>

            {/* Track 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-8 px-6 whitespace-nowrap" aria-hidden="true">
              {tickerItems}
            </div>

          </div>
        </div>

        {/* 2. Right CTA Link (Static & Clean on Desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0 pl-4 pr-2 border-l border-slate-800/80 bg-slate-950 z-20 h-full">
          <a 
            href="/the-next-level-lifespan-v7.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold flex items-center gap-1"
          >
            Download Blueprint (PDF) ➔
          </a>
        </div>

      </div>
    </div>
  );
};

export default TickerTapeBanner;
