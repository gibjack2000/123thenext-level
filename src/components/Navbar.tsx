import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMarket, Market } from '../contexts/MarketContext';
import { TickerTapeBanner } from './TickerTapeBanner';
import { FlagUS, FlagUK, FlagES } from './MarketSelector';

export const Navbar: React.FC = () => {
  const { market, setMarket } = useMarket();
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'uk' | 'es'>(
    (market?.toLowerCase() as 'us' | 'uk' | 'es') || 'us'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPillarsOpen, setIsPillarsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Sync with global MarketContext if changed externally
  useEffect(() => {
    if (market && ['US', 'UK', 'ES'].includes(market)) {
      setSelectedRegion(market.toLowerCase() as 'us' | 'uk' | 'es');
    }
  }, [market]);

  const handleRegionChange = (region: 'us' | 'uk' | 'es') => {
    const marketUpper = region.toUpperCase() as Market;
    setSelectedRegion(region);
    setMarket(marketUpper);
    setIsMobileMenuOpen(false);

    // Only redirect to /store-[region] if already on a storefront page
    if (location.pathname.startsWith('/store')) {
      navigate(`/store-${region}`);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      
      {/* 1. Stacked 2-Line Moving Ticker Tape */}
      <TickerTapeBanner />

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Mission Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              123<span className="text-cyan-400">TheNextLevel</span>
            </span>
          </Link>
          <span className="hidden xl:inline-block text-[10px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Geroscience Portal
          </span>
        </div>

        {/* Master Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-semibold uppercase tracking-wider">
          <Link 
            to="/" 
            className={`transition-colors ${location.pathname === '/' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Start Here
          </Link>

          <Link 
            to="/overview" 
            className={`transition-colors ${location.pathname === '/overview' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            The Big Picture
          </Link>

          {/* COMPLETE 6-PILLAR DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPillarsOpen(true)}
            onMouseLeave={() => setIsPillarsOpen(false)}
          >
            <button 
              type="button"
              className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-1 transition-colors py-2 cursor-pointer"
            >
              Pillars (6) <span className="text-[10px]">▾</span>
            </button>

            {isPillarsOpen && (
              <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 space-y-1 z-50 animate-fade-in">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Core Longevity Protocols
                </div>
                <Link
                  to="/science"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🧬 Pillar 1: Epigenetics & Longevity
                </Link>
                <Link
                  to="/guide"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🩸 Pillar 2: Diagnostics & Telemetry
                </Link>
                <Link
                  to="/wellness"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🧠 Pillar 3: Autonomic & Wellness
                </Link>
                <Link
                  to="/fitness"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  ⚡ Pillar 4: Performance & Bio-Data
                </Link>
                <Link
                  to="/nutrition"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🥗 Pillar 5: Metabolic Nutrition
                </Link>
                <Link
                  to="/blog-post-womens-health"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🌸 Pillar 6: Women's Health & Ovary-Span
                </Link>
                <Link
                  to="/blog-post-socio-architecture"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🏛️ Socio-Biological Architecture
                </Link>
              </div>
            )}
          </div>

          <Link 
            to="/library#free-pdfs" 
            className={`transition-colors ${['/free-pdfs', '/library'].includes(location.pathname) ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            📁 Free PDFs
          </Link>

          <Link 
            to="/clinician-copilot" 
            className={`transition-colors ${location.pathname === '/clinician-copilot' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            🩺 Clinician Co-Pilot
          </Link>

          <Link 
            to="/premium-guides" 
            className={`transition-colors ${location.pathname === '/premium-guides' ? 'text-amber-400 font-bold' : 'text-amber-400/90 hover:text-amber-300'}`}
          >
            ⚡ Premium Guides
          </Link>

          <Link 
            to="/blog" 
            className={`transition-colors ${location.pathname === '/blog' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            📚 Blogs
          </Link>

          <Link 
            to={`/store-${market?.toLowerCase() || selectedRegion}`} 
            className={`transition-colors ${location.pathname.startsWith('/store') ? 'text-cyan-400 font-bold font-black' : 'text-slate-300 hover:text-white'}`}
          >
            🛒 Store
          </Link>
        </nav>

        {/* Regional Selector Pills (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs shadow-inner">
            <button
              type="button"
              onClick={() => handleRegionChange('us')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                market === 'US' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="United States Market (US)"
              aria-label="Switch to United States Market"
              aria-pressed={market === 'US'}
            >
              <FlagUS className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">US</span>
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('uk')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                market === 'UK' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="United Kingdom Market (UK)"
              aria-label="Switch to United Kingdom Market"
              aria-pressed={market === 'UK'}
            >
              <FlagUK className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">UK</span>
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('es')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                market === 'ES' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Spain / EU Market (ES)"
              aria-label="Switch to Spain / EU Market"
              aria-pressed={market === 'ES'}
            >
              <FlagES className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">ES</span>
            </button>
          </div>

          <Link
            to="/quiz"
            className="py-2 px-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap active:scale-95"
          >
            5-Min Quiz ➔
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
        </button>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 text-sm animate-fade-in">
          <Link to="/" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🚀 Start Here</Link>
          <Link to="/overview" onClick={closeMobileMenu} className="block text-cyan-400 font-bold py-1">🌐 The Big Picture</Link>
          <Link to="/science" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🧬 Epigenetics & Longevity</Link>
          <Link to="/guide" onClick={closeMobileMenu} className="block text-cyan-400 font-bold py-1">🩸 Diagnostics & Telemetry</Link>
          <Link to="/wellness" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🧠 Autonomic & Wellness</Link>
          <Link to="/fitness" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">⚡ Performance & Bio-Data</Link>
          <Link to="/nutrition" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🥗 Metabolic Nutrition</Link>
          <Link to="/blog-post-womens-health" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🌸 Women's Health</Link>
          <Link to="/library#free-pdfs" onClick={closeMobileMenu} className="block text-cyan-400 font-bold py-1">📁 Free PDFs ($0 Download)</Link>
          <Link to="/clinician-copilot" onClick={closeMobileMenu} className="block text-amber-400 font-bold py-1">🩺 Clinician Co-Pilot</Link>
          <Link to="/premium-guides" onClick={closeMobileMenu} className="block text-amber-400/90 font-bold py-1">⚡ Premium Guides (9 Books)</Link>
          <Link to="/blog" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">📚 Blogs & Science Library</Link>
          <Link to={`/store-${market?.toLowerCase() || selectedRegion}`} onClick={closeMobileMenu} className="block text-cyan-400 font-bold py-1">🛒 Sovereign Store</Link>
          
          <div className="pt-2">
            <Link
              to="/quiz"
              onClick={closeMobileMenu}
              className="block w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg text-center transition-all shadow-md shadow-cyan-500/20"
            >
              Take 5-Min Wellness Quiz ➔
            </Link>
          </div>

          {/* Regional Selector Pills (Mobile Drawer) */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Select Market Region:</span>
            <div className="flex gap-2 text-xs font-bold">
              <button 
                type="button"
                onClick={() => handleRegionChange('us')} 
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 cursor-pointer ${market === 'US' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400'}`}
              >
                <FlagUS className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">US</span>
              </button>
              <button 
                type="button"
                onClick={() => handleRegionChange('uk')} 
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 cursor-pointer ${market === 'UK' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400'}`}
              >
                <FlagUK className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">UK</span>
              </button>
              <button 
                type="button"
                onClick={() => handleRegionChange('es')} 
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 cursor-pointer ${market === 'ES' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400'}`}
              >
                <FlagES className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">ES</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
