import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMarket } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from './MarketSelector';

export default function Header() {
  const navigate = useNavigate();
  const { market, setMarket } = useMarket();

  return (
    <header className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4 border-b border-slate-900">
      
      {/* Brand Logo & Name */}
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate('/')}>
        <img 
          src="/assets/logo-icon.png" 
          alt="123TheNextLevel Logo" 
          className="h-9 w-9 object-contain drop-shadow group-hover:scale-105 transition-transform duration-300 shrink-0" 
        />
        <span className="font-semibold text-base tracking-tight text-slate-200 group-hover:text-cyan-400 transition-colors">123TheNextLevel</span>
      </div>

      {/* Main Navigation Links */}
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-400">
        <Link to="/overview" className="min-h-[48px] flex items-center hover:text-cyan-400 transition-colors touch-manipulation">
          🌐 The Big Picture
        </Link>
        <Link to="/start-here" className="min-h-[48px] flex items-center hover:text-cyan-400 transition-colors touch-manipulation">
          🚀 Start Here
        </Link>
        <Link to="/clinician-copilot" className="min-h-[48px] flex items-center hover:text-cyan-400 transition-colors touch-manipulation">
          🩺 Clinician Co-Pilot
        </Link>
        <Link to="/library" className="min-h-[48px] flex items-center hover:text-cyan-400 transition-colors touch-manipulation">
          📁 Library
        </Link>
        <Link to="/free-pdfs" className="min-h-[48px] flex items-center hover:text-cyan-400 transition-colors touch-manipulation">
          📄 Free PDFs
        </Link>
        <Link to="/premium-guides" className="min-h-[48px] flex items-center hover:text-amber-400 text-amber-400/90 transition-colors touch-manipulation">
          ⚡ Premium Guides
        </Link>
        <Link to="/quiz" className="min-h-[48px] flex items-center text-slate-350 hover:text-cyan-400 transition-colors touch-manipulation">
          ⚡ 5-Min Quiz
        </Link>
        <Link 
          to="/store" 
          className="min-h-[48px] relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 font-bold touch-manipulation"
        >
          <span>🛒 Store</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm shadow-amber-500/30 animate-pulse">
            Express
          </span>
        </Link>
      </nav>

      {/* Right Controls: Market Switcher Bar & Primary Conversion Button */}
      <div className="flex items-center gap-3">
        {/* Market Switcher Button Bar */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs shadow-inner">
          <button
            type="button"
            onClick={() => setMarket('US')}
            className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              market === 'US'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
            title="United States Market (US)"
            aria-label="Switch to United States Market"
            aria-pressed={market === 'US'}
          >
            <FlagUS className="w-4 h-3 pointer-events-none" />
            <span className="pointer-events-none">US</span>
          </button>
          <button
            type="button"
            onClick={() => setMarket('UK')}
            className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              market === 'UK'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
            title="United Kingdom Market (UK)"
            aria-label="Switch to United Kingdom Market"
            aria-pressed={market === 'UK'}
          >
            <FlagUK className="w-4 h-3 pointer-events-none" />
            <span className="pointer-events-none">UK</span>
          </button>
          <button
            type="button"
            onClick={() => setMarket('ES')}
            className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              market === 'ES'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Spain / EU Market (ES)"
            aria-label="Switch to Spain / EU Market"
            aria-pressed={market === 'ES'}
          >
            <FlagES className="w-4 h-3 pointer-events-none" />
            <span className="pointer-events-none">ES</span>
          </button>
        </div>

        {/* Primary Conversion Button */}
        <Link 
          to="/quiz" 
          className="min-h-[40px] px-4 py-2 rounded-full text-xs font-extrabold tracking-wide uppercase bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/10 transition inline-flex items-center touch-manipulation"
        >
          5-Min Quiz
        </Link>
      </div>

    </header>
  );
}
