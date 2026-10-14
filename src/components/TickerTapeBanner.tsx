import React from 'react';
import { Link } from 'react-router-dom';

export const TickerTapeBanner: React.FC = () => {
  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 text-[11px] font-semibold text-slate-300 py-1.5 px-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left / Scrolling Ticker Content */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            GEROSCIENCE PIPELINE ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">
            📘 Free 28-Page Longevity Blueprint PDF Available
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">
            🩸 Direct Clinical Lab Draws: <strong className="text-white">HealthLabs (US)</strong> • <strong className="text-white">Lola (UK)</strong> • <strong className="text-white">Melio (ES)</strong>
          </span>
        </div>

        {/* Right CTA Link (Static & Clean) */}
        <div className="hidden md:flex items-center gap-3 shrink-0 pl-4 border-l border-slate-800">
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
