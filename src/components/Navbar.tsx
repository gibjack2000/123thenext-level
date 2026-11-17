import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { useCart } from '../contexts/CartContext';
import { TickerTapeBanner } from './TickerTapeBanner';
import { FlagUS, FlagUK, FlagES } from './MarketSelector';

export const Navbar: React.FC = () => {
  const { market, setMarket } = useMarket();
  const { cartCount, openCart } = useCart();
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'uk' | 'es'>(
    (market?.toLowerCase() as 'us' | 'uk' | 'es') || 'us'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPillarsOpen, setIsPillarsOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isMobileGuidesOpen, setIsMobileGuidesOpen] = useState(false);
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

    // Always navigate to the selected country storefront
    navigate(`/store-${region}`);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      
      {/* 1. Stacked 2-Line Moving Ticker Tape */}
      <TickerTapeBanner />

      {/* 2. Main Navigation Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 lg:gap-3 xl:gap-6">
        
        {/* Logo & Mission Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group" onClick={closeMobileMenu}>
            <img 
              src="/assets/logo-icon.png" 
              alt="123TheNextLevel Logo" 
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow group-hover:scale-105 transition-transform duration-300 shrink-0" 
            />
            <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              123<span className="text-cyan-400 logo-brand-accent">TheNextLevel</span>
            </span>
          </Link>
          <span className="geroscience-badge hidden 2xl:inline-block text-[10px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
            Geroscience Portal
          </span>
        </div>

        {/* Master Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 2xl:gap-4.5 text-[11px] xl:text-xs font-semibold uppercase tracking-wider shrink min-w-0 justify-center">
          <Link 
            to="/start-here" 
            className={`whitespace-nowrap transition-colors py-2 px-1 rounded-md ${location.pathname === '/start-here' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Start Here
          </Link>

          <Link 
            to="/overview" 
            className={`whitespace-nowrap transition-colors py-2 px-1 rounded-md ${location.pathname === '/overview' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            <span className="lg:hidden xl:inline">The </span>Big Picture
          </Link>

          {/* COMPLETE 6-PILLAR DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPillarsOpen(true)}
            onMouseLeave={() => setIsPillarsOpen(false)}
          >
            <button 
              type="button"
              className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-1 transition-colors py-2 px-1 rounded-md cursor-pointer whitespace-nowrap"
            >
              <span>Pillars <span className="hidden xl:inline">(6)</span></span> <span className="text-[10px]">▾</span>
            </button>

            {isPillarsOpen && (
              <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 space-y-1 z-50 animate-fade-in normal-case tracking-normal">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/80 pb-1 mb-1">
                  Core Longevity Protocols
                </div>
                <Link
                  to="/science"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🧬 Pillar 1: Epigenetics &amp; Longevity
                </Link>
                <Link
                  to="/clinician-copilot"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🩸 Pillar 2: Diagnostics &amp; Co-Pilot
                </Link>
                <Link
                  to="/wellness"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  🧠 Pillar 3: Autonomic &amp; Wellness
                </Link>
                <Link
                  to="/fitness"
                  onClick={() => setIsPillarsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  ⚡ Pillar 4: Performance &amp; Bio-Data
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
                  🌸 Pillar 6: Women's Health &amp; Ovary-Span
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

          {/* CLINICIAN CO-PILOT DIRECT LINK */}
          <Link 
            to="/clinician-copilot" 
            className={`whitespace-nowrap transition-colors py-2 px-1 rounded-md flex items-center gap-1 ${
              location.pathname === '/clinician-copilot' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Co-Pilot</span>
          </Link>

          {/* LIBRARY DROPDOWN (Includes Free PDFs) */}
          <div 
            className="relative"
            onMouseEnter={() => setIsLibraryOpen(true)}
            onMouseLeave={() => setIsLibraryOpen(false)}
          >
            <Link 
              to="/library"
              className={`whitespace-nowrap transition-colors flex items-center gap-1 py-2 px-1 rounded-md cursor-pointer ${
                location.pathname === '/library' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Library</span> <span className="text-[10px]">▾</span>
            </Link>

            {isLibraryOpen && (
              <div 
                className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2.5 space-y-1.5 z-50 animate-fade-in normal-case tracking-normal"
              >
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1 mb-1">
                  Research &amp; Downloads
                </div>
                <Link
                  to="/library"
                  onClick={() => setIsLibraryOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  📁 Complete Scientific Archive
                </Link>
                <Link
                  to="/library#free-pdfs"
                  onClick={() => setIsLibraryOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:bg-slate-800 transition-all flex items-center justify-between"
                >
                  <span>📄 Free PDF Protocols</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">$0 FREE</span>
                </Link>
              </div>
            )}
          </div>

          {/* CLINICAL BLOOD TEST GUIDES & PREMIUM PROTOCOLS DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsGuidesOpen(true)}
            onMouseLeave={() => setIsGuidesOpen(false)}
          >
            <button 
              type="button"
              className={`whitespace-nowrap font-semibold hover:text-emerald-400 flex items-center gap-1 transition-colors py-2 px-1 rounded-md cursor-pointer ${
                location.pathname.startsWith('/guides') || location.pathname === '/premium-guides' ? 'text-emerald-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Guides</span> <span className="text-[10px]">▾</span>
            </button>

            {isGuidesOpen && (
              <div 
                className="absolute top-full right-0 w-80 rounded-xl shadow-2xl p-2.5 space-y-1.5 z-50 animate-fade-in normal-case tracking-normal"
                style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
              >
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-1">
                  <span>Clinical Guides</span>
                  <a href="/guides/" className="text-emerald-400 hover:underline normal-case text-[11px] font-semibold">Directory Hub →</a>
                </div>
                
                {/* 1. UK NHS Blood Test Guide */}
                <a
                  href="/guides/uk-preventative-blood-tests/"
                  onClick={() => setIsGuidesOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/70 transition-all group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      🇬🇧 UK NHS Blood Test Guide
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                  </div>
                  <span className="block text-[11px] text-slate-400 mt-0.5 font-normal">
                    Doctor Scripts &amp; NICE Rules
                  </span>
                </a>

                {/* 2. US Preventative Blood Test Guide */}
                <a
                  href="/guides/us-doctor-blood-tests/"
                  onClick={() => setIsGuidesOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/70 transition-all group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      🇺🇸 US Preventative Blood Test Guide
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                  </div>
                  <span className="block text-[11px] text-slate-400 mt-0.5 font-normal">
                    PCPs, Billing &amp; Labs
                  </span>
                </a>

                {/* 3. Spain Expat Health Guide */}
                <a
                  href="/guides/spain-preventative-blood-tests/"
                  onClick={() => setIsGuidesOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/70 transition-all group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      🇪🇸 Spain Expat Health Guide
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                  </div>
                  <span className="block text-[11px] text-slate-400 mt-0.5 font-normal">
                    English Guide: Doctors &amp; Mutuas
                  </span>
                </a>

                {/* Featured: Premium Protocols & Workbooks */}
                <div className="pt-1.5 mt-1 border-t border-slate-800/80">
                  <div className="px-3 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center justify-between">
                    <span>⚡ Master Protocols</span>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">9 Guides</span>
                  </div>
                  <Link
                    to="/premium-guides"
                    onClick={() => setIsGuidesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/70 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 group-hover:text-amber-200 transition-colors flex items-center gap-1.5">
                        ⚡ Premium Longevity Guides
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                    </div>
                    <span className="block text-[11px] text-slate-400 mt-0.5 font-normal">
                      Metabolic, Epigenetic &amp; Cellular Workbooks
                    </span>
                  </Link>
                </div>

                <div className="pt-1.5 mt-1 border-t border-slate-800">
                  <a
                    href="/guides/"
                    onClick={() => setIsGuidesOpen(false)}
                    className="block px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50 transition-all text-center"
                  >
                    📖 View All Guides &amp; Pillar Directory →
                  </a>
                </div>
              </div>
            )}
          </div>

          <Link 
            to="/blog" 
            className={`whitespace-nowrap transition-colors py-2 px-1 rounded-md ${location.pathname === '/blog' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Blog
          </Link>

          <Link 
            to={`/store-${market?.toLowerCase() || selectedRegion}`} 
            className={`whitespace-nowrap transition-colors py-2 px-1 rounded-md font-bold ${location.pathname.startsWith('/store') ? 'text-cyan-400 font-black' : 'text-slate-300 hover:text-white'}`}
          >
            Store
          </Link>
        </nav>

        {/* Regional Selector Pills (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs shadow-inner shrink-0">
            <button
              type="button"
              onClick={() => handleRegionChange('us')}
              className={`px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-full font-bold transition-all flex items-center gap-1 xl:gap-1.5 cursor-pointer ${
                market === 'US' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="United States Store (US)"
              aria-label="Go to United States Store"
              aria-pressed={market === 'US'}
            >
              <FlagUS className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">US</span>
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('uk')}
              className={`px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-full font-bold transition-all flex items-center gap-1 xl:gap-1.5 cursor-pointer ${
                market === 'UK' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="United Kingdom Store (UK)"
              aria-label="Go to United Kingdom Store"
              aria-pressed={market === 'UK'}
            >
              <FlagUK className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">UK</span>
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('es')}
              className={`px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-full font-bold transition-all flex items-center gap-1 xl:gap-1.5 cursor-pointer ${
                market === 'ES' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Spain / EU Store (ES)"
              aria-label="Go to Spain / EU Store"
              aria-pressed={market === 'ES'}
            >
              <FlagES className="w-4 h-3 pointer-events-none" /> <span className="pointer-events-none">ES</span>
            </button>
          </div>

          <Link
            to="/quiz"
            className="py-1.5 px-2.5 xl:py-2 xl:px-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap active:scale-95 shrink-0"
          >
            <span className="hidden xl:inline">5-Min </span>Quiz ➔
          </Link>

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={openCart}
            aria-label="View Shopping Cart"
            className="relative px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group shrink-0"
          >
            <ShoppingCart size={15} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider hidden 2xl:inline">Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black bg-emerald-400 text-slate-950 rounded-full shadow animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Header Right */}
        <div className="flex items-center gap-1 sm:gap-1.5 lg:hidden shrink-0">
          {/* Mobile 3-Flag Country Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-0.5 text-[10px] shadow-sm">
            <button
              type="button"
              onClick={() => handleRegionChange('us')}
              className={`p-1 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                market === 'US' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 opacity-70 hover:opacity-100'
              }`}
              title="United States (US)"
              aria-label="Switch to US Market"
            >
              <FlagUS className="w-3.5 h-2.5 pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('uk')}
              className={`p-1 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                market === 'UK' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 opacity-70 hover:opacity-100'
              }`}
              title="United Kingdom (UK)"
              aria-label="Switch to UK Market"
            >
              <FlagUK className="w-3.5 h-2.5 pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('es')}
              className={`p-1 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                market === 'ES' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 opacity-70 hover:opacity-100'
              }`}
              title="Spain / EU (ES)"
              aria-label="Switch to Spain / EU Market"
            >
              <FlagES className="w-3.5 h-2.5 pointer-events-none" />
            </button>
          </div>

          <button
            type="button"
            onClick={openCart}
            aria-label="View Shopping Cart"
            className="relative p-2 text-slate-300 hover:text-white cursor-pointer"
          >
            <ShoppingCart size={19} className="text-cyan-400" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] font-black bg-emerald-400 text-slate-950 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 text-sm animate-fade-in">
          {cartCount > 0 && (
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                openCart();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">🛒 View Cart</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-emerald-400 text-slate-950">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </button>
          )}
          <Link to="/" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🏠 Home</Link>
          <Link to="/start-here" onClick={closeMobileMenu} className="block text-cyan-400 font-bold py-1">🚀 Start Here</Link>
          <Link to="/overview" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🌐 The Big Picture</Link>
          <Link to="/clinician-copilot" onClick={closeMobileMenu} className="block text-amber-400 font-bold py-1">🩺 Diagnostics & Co-Pilot</Link>
          <Link to="/library" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">📁 Library</Link>
          <Link to="/library#free-pdfs" onClick={closeMobileMenu} className="block text-cyan-400 font-bold py-1">📄 Free PDFs ($0 Download)</Link>
          <Link to="/premium-guides" onClick={closeMobileMenu} className="block text-amber-400/90 font-bold py-1">⚡ Premium Guides (9 Books)</Link>

          {/* Collapsible Guides Section in Mobile Drawer */}
          <div className="py-1.5 border-y border-slate-800/80 my-1">
            <button
              type="button"
              onClick={() => setIsMobileGuidesOpen(!isMobileGuidesOpen)}
              className="w-full flex items-center justify-between text-slate-200 font-bold py-1.5 text-left cursor-pointer"
            >
              <span className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400">📖 Clinical Guides</span>
              <span className="text-xs text-slate-400">{isMobileGuidesOpen ? '▴' : '▾'}</span>
            </button>
            {isMobileGuidesOpen && (
              <div 
                className="pl-3 pr-2 py-2 space-y-2 text-xs rounded-xl mt-1"
                style={{ backgroundColor: '#111827', border: '1px solid #1f2937' }}
              >
                <a 
                  href="/guides/uk-preventative-blood-tests/" 
                  onClick={closeMobileMenu} 
                  className="block py-1 text-slate-200 hover:text-emerald-400 transition-colors"
                >
                  <div className="font-bold flex items-center gap-1.5 text-white">🇬🇧 UK NHS Blood Test Guide</div>
                  <div className="text-[11px] text-slate-400">Doctor Scripts &amp; NICE Rules</div>
                </a>
                <a 
                  href="/guides/us-doctor-blood-tests/" 
                  onClick={closeMobileMenu} 
                  className="block py-1 text-slate-200 hover:text-emerald-400 transition-colors border-t border-slate-800/60 pt-1.5"
                >
                  <div className="font-bold flex items-center gap-1.5 text-white">🇺🇸 US Preventative Blood Test Guide</div>
                  <div className="text-[11px] text-slate-400">PCPs, Billing &amp; Labs</div>
                </a>
                <a 
                  href="/guides/spain-preventative-blood-tests/" 
                  onClick={closeMobileMenu} 
                  className="block py-1 text-slate-200 hover:text-emerald-400 transition-colors border-t border-slate-800/60 pt-1.5"
                >
                  <div className="font-bold flex items-center gap-1.5 text-white">🇪🇸 Spain Expat Health Guide</div>
                  <div className="text-[11px] text-slate-400">English Guide: Doctors &amp; Mutuas</div>
                </a>
                <div className="pt-1.5 border-t border-slate-800">
                  <a 
                    href="/guides/" 
                    onClick={closeMobileMenu} 
                    className="block py-1 text-emerald-400 hover:underline font-bold text-[11px]"
                  >
                    📖 View All Guides Directory →
                  </a>
                </div>
              </div>
            )}
          </div>
          <Link to="/science" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🧬 Epigenetics & Longevity</Link>
          <Link to="/wellness" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🧠 Autonomic & Wellness</Link>
          <Link to="/fitness" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">⚡ Performance & Bio-Data</Link>
          <Link to="/nutrition" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🥗 Metabolic Nutrition</Link>
          <Link to="/blog-post-womens-health" onClick={closeMobileMenu} className="block text-slate-300 hover:text-cyan-400 py-1 font-medium">🌸 Women's Health</Link>
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

          {/* Admin Control Quick Links (Mobile Drawer) */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-slate-500">Admin Portals:</span>
            <div className="flex gap-2">
              <Link to="/admin" onClick={closeMobileMenu} className="hover:text-cyan-400 underline decoration-slate-700">Admin</Link>
              <span className="text-slate-700">•</span>
              <Link to="/admin/blogs" onClick={closeMobileMenu} className="hover:text-cyan-400 underline decoration-slate-700">Blog Admin</Link>
              <span className="text-slate-700">•</span>
              <Link to="/superadmin" onClick={closeMobileMenu} className="hover:text-cyan-400 underline decoration-slate-700">SuperAdmin</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
