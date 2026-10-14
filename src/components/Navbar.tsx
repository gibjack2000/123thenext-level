import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, Zap, Shield, Heart, Info, ChevronRight, Compass, ChevronDown, Dumbbell, Apple, Users, Sparkles, ShieldCheck, ShoppingBag, BookOpen } from 'lucide-react';
import MarketSelector from './MarketSelector';
import { useMarket } from '../contexts/MarketContext';
import { useT } from '../translations';

import FriendlyWellnessQuizModal from './FriendlyWellnessQuizModal';
import PromoBanner from './PromoBanner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Controlled React state for desktop navigation dropdowns (replaces CSS :hover)
  const [desktopPillarsOpen, setDesktopPillarsOpen] = useState(false);
  const [desktopUpdatesOpen, setDesktopUpdatesOpen] = useState(false);

  // Mobile drawer sub-accordions
  const [mobilePillarsOpen, setMobilePillarsOpen] = useState(false);
  const [mobileSocialOpen, setMobileSocialOpen] = useState(false);
  const [mobileWellnessOpen, setMobileWellnessOpen] = useState(false);
  const [mobileUpdatesOpen, setMobileUpdatesOpen] = useState(false);
  
  // Refs for outside click/touch dismiss listeners
  const pillarsRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const t = useT();
  const { market } = useMarket();

  const isHomepage = location.pathname === '/';

  // Extract region from pathname
  const parts = location.pathname.split('/').filter(Boolean);
  const knownRegions = ['us', 'uk', 'es'];
  let currentRegion = 'us';
  if (parts.length > 0) {
    if (knownRegions.includes(parts[0])) {
      currentRegion = parts[0];
    } else if (parts[0] === 'region' && parts[1] && knownRegions.includes(parts[1])) {
      currentRegion = parts[1];
    }
  }

  // Active country state for Console Header (US, UK, ES) - defaults strictly to US
  const [activeCountry, setActiveCountry] = useState<'US' | 'UK' | 'ES'>(
    market || (currentRegion.toUpperCase() as 'US' | 'UK' | 'ES') || 'US'
  );

  // Sync active country with global market context, location search params, or route region
  useEffect(() => {
    if (market && ['US', 'UK', 'ES'].includes(market)) {
      setActiveCountry(market);
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const countryParam = searchParams.get('country')?.toUpperCase();
    if (countryParam && ['US', 'UK', 'ES'].includes(countryParam)) {
      setActiveCountry(countryParam as 'US' | 'UK' | 'ES');
    } else if (currentRegion && ['us', 'uk', 'es'].includes(currentRegion)) {
      setActiveCountry(currentRegion.toUpperCase() as 'US' | 'UK' | 'ES');
    } else {
      setActiveCountry('US');
    }
  }, [market, location.search, currentRegion]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (location.hash) {
        navigate('/', { replace: true });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
    setDesktopPillarsOpen(false);
    setDesktopUpdatesOpen(false);
  };

  // Scroll state monitoring with window.scrollY > 80 threshold (Active ONLY on Homepage)
  useEffect(() => {
    if (!isHomepage) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  // Auto-close drawer and all dropdowns on route change (Technical Directive #4)
  useEffect(() => {
    setIsOpen(false);
    setDesktopPillarsOpen(false);
    setDesktopUpdatesOpen(false);
    setMobilePillarsOpen(false);
    setMobileSocialOpen(false);
    setMobileWellnessOpen(false);
    setMobileUpdatesOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open to prevent background scrolling on Android/touchscreens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Outside click & touch listener (Technical Directive #3 - pointerdown eliminates touch latency)
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (desktopPillarsOpen && pillarsRef.current && !pillarsRef.current.contains(target)) {
        setDesktopPillarsOpen(false);
      }
      if (desktopUpdatesOpen && updatesRef.current && !updatesRef.current.contains(target)) {
        setDesktopUpdatesOpen(false);
      }
      if (
        isOpen &&
        mobileDrawerRef.current &&
        !mobileDrawerRef.current.contains(target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [desktopPillarsOpen, desktopUpdatesOpen, isOpen]);

  // Explicit tap & click handlers for desktop dropdowns
  const handlePillarsToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDesktopUpdatesOpen(false);
    setDesktopPillarsOpen(prev => !prev);
  };

  const handleUpdatesToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDesktopPillarsOpen(false);
    setDesktopUpdatesOpen(prev => !prev);
  };

  // Country flag emoji derived from activeCountry state
  const countryEmoji = activeCountry === 'US' ? '🇺🇸' : activeCountry === 'UK' ? '🇬🇧' : '🇪🇸';

  const pillars = [
    { name: 'Health', path: '/health', icon: Shield, desc: 'Preventive engineering & longevity' },
    { name: 'Fitness', path: '/fitness', icon: Dumbbell, desc: 'Strength mandate & Vo2 max' },
    { name: 'Nutrition', path: '/nutrition', icon: Apple, desc: 'Metabolic fuel & supplement guides' },
    { name: 'Wellness', path: '/wellness', icon: Heart, desc: 'VNS deep-dive & breathwork' },
    { name: "Women's Health", path: '/womens-health', icon: Heart, desc: 'Ovarian longevity & cognitive preservation' },
    { name: 'Social Fitness & Community', path: '/social-fitness', icon: Users, desc: 'Pickleball & community protocols' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      <PromoBanner />
      {/* ========================================================================= */}
      {/* PHASE 0: CLINICAL COMMAND CONSOLE HEADER (HOMEPAGE ONLY)                 */}
      {/* ========================================================================= */}
      {isHomepage && (
        <div 
          className={`bg-[#020617] text-xs text-slate-300 relative z-50 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 ease-in-out transform-gpu origin-top ${
            isScrolled
              ? 'opacity-0 max-h-0 scale-y-95 py-0 px-3 sm:px-6 pointer-events-none border-b-0'
              : 'opacity-100 max-h-[600px] scale-y-100 py-2.5 sm:py-3 px-3 sm:px-6 pointer-events-auto border-b border-cyan-500/30'
          }`}
        >
        {/* Subtle Ambient Scanline Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto flex flex-col gap-2 relative z-10">
          
          {/* ========================================================================= */}
          {/* TIER 1: UPPER REGISTRY ANNOUNCEMENT BOX (The Peak Hook - Absolute Top)   */}
          {/* ========================================================================= */}
          <div className="relative z-10 p-4 sm:p-6 rounded-xl bg-[#0f172a] border border-slate-800/80 shadow-md backdrop-blur-md text-center md:text-left overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute -top-10 right-0 w-80 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-center md:justify-start gap-2.5 text-cyan-400 font-bold text-xl sm:text-2xl md:text-3xl mb-2 tracking-tight font-display">
              <span className="text-xl sm:text-2xl">⚙️</span>
              <span className="text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)]">THE SOVEREIGN HEALTH STACK — LIVE NOW</span>
            </div>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl lg:text-[24px] leading-snug md:leading-relaxed font-sans mb-3">
              Diagnostic-grade hardware. NSF-certified fuel. Precision supplements. Full-spectrum blood panels.{" "}
              <strong className="text-white font-semibold">Upgrade your biology. Not someday — now.</strong>
            </p>

            {/* Captivating Philosophy Quote */}
            <div className="pt-2.5 border-t border-slate-800/70 flex items-center justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-xs sm:text-sm md:text-base font-sans">
                <span className="text-cyan-400 font-serif text-lg leading-none font-bold select-none">“</span>
                <span className="italic text-slate-200 tracking-wide">
                  The best time to start was yesterday, the second best time is{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 not-italic">
                    Today
                  </span>
                  .
                </span>
                <span className="text-cyan-400 font-serif text-lg leading-none font-bold select-none">”</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TIER 2: MIDDLE STATUS & TELEMETRY ROW (Real-Time Control)                 */}
          {/* ========================================================================= */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pb-2 border-b border-slate-800/60">
            
            {/* 1. Left Column: Telemetry Ticker */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold text-xs tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>● SYSTEM STATUS: ACTIVE</span>
              </div>
              <span className="hidden md:inline text-slate-700">|</span>
              <span className="text-slate-400 font-mono tracking-widest text-[10px] hidden md:inline-block">
                BIOMETRIC PIPELINE: CONNECTED
              </span>
            </div>

            {/* 2. Center Column: Live Regulatory Compliance Readout */}
            <div className="flex items-center gap-2 flex-wrap justify-center font-mono text-[11px]">
              <span className="text-slate-400 text-[11px] font-mono mr-1 hidden md:inline-block">
                Clinical Standards:
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-inner text-[10px]">
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <ShieldCheck size={11} className="text-amber-400" />
                  <span>US (FDA & CLIA)</span>
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-cyan-300 font-bold flex items-center gap-1">
                  <ShieldCheck size={11} className="text-cyan-400" />
                  <span>UK (MHRA)</span>
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-sky-300 font-bold flex items-center gap-1">
                  <ShieldCheck size={11} className="text-sky-400" />
                  <span>ES/EU (CE 0123)</span>
                </span>
              </div>
            </div>

            {/* 3. Right Column: Action Trigger */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/quiz"
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-[11px] font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-1.5 flex-shrink-0"
              >
                <Zap size={11} className="fill-current text-slate-950" />
                <span>Run Systems Check →</span>
              </Link>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* TIER 3: LOWER NAVIGATION BAR (Deep-Linking Category Shortcut Pills)      */}
          {/* ========================================================================= */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-2 pt-0.5 text-center">
            <span className="text-xs font-bold text-slate-100 font-display tracking-tight flex items-center gap-1.5 flex-shrink-0">
              <Sparkles size={12} className="text-cyan-400 hidden sm:inline" />
              <span>Recommended Sovereign Health Stack:</span>
            </span>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Link 
                to={`/store?suite=hardware&country=${activeCountry}`}
                className="px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-200 hover:text-white text-[10.5px] sm:text-[11px] font-mono tracking-tight transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95"
                title="Explore Verified Diagnostic Hardware"
              >
                <span>{countryEmoji}</span>
                <span>🧪 Diagnostic Hardware</span>
              </Link>

              <Link 
                to={`/store?suite=reagents&country=${activeCountry}`}
                className="px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-200 hover:text-white text-[10.5px] sm:text-[11px] font-mono tracking-tight transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95"
                title="Review NSF Certified Cellular Fuels"
              >
                <span>{countryEmoji}</span>
                <span>⚡ NSF Cellular Fuels</span>
              </Link>

              <Link 
                to={`/store?suite=reagents&country=${activeCountry}`}
                className="px-3 py-1 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-200 hover:text-white text-[10.5px] sm:text-[11px] font-mono tracking-tight transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95"
                title="Explore Targeted Longevity Vitamins & Supplements"
              >
                <span>{countryEmoji}</span>
                <span>💊 Targeted Vitamins & Supplements</span>
              </Link>

              <Link 
                to={`/store?suite=blood&country=${activeCountry}`}
                className="px-3 py-1 rounded-full bg-slate-900/90 border border-rose-500/30 text-rose-200 hover:text-white text-[10.5px] sm:text-[11px] font-mono tracking-tight transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95"
                title="Configure Direct Multi-Omic Blood Panels"
              >
                <span>{countryEmoji}</span>
                <span>🩸 Multi-Omic Lab Panels</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN WEBSITE NAVIGATION MENU (Single Sleek Bar with 2-Line Stacked Labels) */}
      {/* ========================================================================= */}
      <div className={`transition-all duration-300 ease-in-out relative z-50 transform-gpu ${
        !isHomepage
          ? 'bg-[#020617]/95 backdrop-blur-2xl border-b border-slate-800/80 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : isScrolled 
            ? 'bg-[#020617]/95 backdrop-blur-2xl border-b border-slate-800/80 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]' 
            : 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/40 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
      }`}>
        <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-3 lg:px-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" onClick={handleHomeClick} className="flex items-center group shrink-0 mr-1.5 xl:mr-3">
              <img 
                src="/assets/logo.png" 
                alt="123 The Next Level Logo" 
                className="w-7 h-7 xl:w-8 xl:h-8 object-contain mr-1.5 group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-display font-black uppercase tracking-tight text-sm sm:text-base xl:text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                123TheNext<span className="text-blue-500">Level</span>
              </span>
            </Link>

            {/* Desktop Navigation with 2-Line Stacked Labels for Large, Bold Typography (xl:flex for 1280px+ viewports) */}
            <div className="hidden xl:flex items-center space-x-1 xl:space-x-1.5 2xl:space-x-2 shrink-0 flex-nowrap">
              {/* Home */}
              <Link 
                to="/" 
                onClick={handleHomeClick} 
                className="min-h-[48px] px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors whitespace-nowrap flex items-center touch-manipulation shrink-0"
              >
                {t('nav_home')}
              </Link>
              
              {/* Dual-Track (Stacked 2 Lines) */}
              <Link 
                to="/dual-track" 
                className="min-h-[48px] px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors flex flex-col items-center justify-center text-center leading-tight whitespace-nowrap touch-manipulation shrink-0"
              >
                <span>Dual</span>
                <span>Track</span>
              </Link>

              {/* Pillars Dropdown Trigger (Controlled React state with explicit tap & click handlers) */}
              <div 
                ref={pillarsRef}
                className="relative shrink-0"
                onMouseEnter={() => setDesktopPillarsOpen(true)}
                onMouseLeave={() => setDesktopPillarsOpen(false)}
              >
                <button 
                  type="button"
                  onClick={handlePillarsToggle}
                  aria-expanded={desktopPillarsOpen}
                  aria-haspopup="true"
                  aria-label="Toggle Optimization Pillars Menu"
                  className={`min-h-[48px] flex items-center px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none whitespace-nowrap touch-manipulation rounded-lg ${
                    desktopPillarsOpen ? 'text-white bg-white/5' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Pillars</span>
                  <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${desktopPillarsOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                </button>
                
                {/* Pillars Dropdown Panel with Controlled React State */}
                <div 
                  role="menu"
                  aria-label="Pillars Menu"
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 pt-2 z-[70] transition-all duration-200 ${
                    desktopPillarsOpen 
                      ? 'opacity-100 visible pointer-events-auto translate-y-0' 
                      : 'opacity-0 invisible pointer-events-none -translate-y-2'
                  }`}
                >
                  <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-xl space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2 px-3 border-b border-slate-900 pb-2">
                      Explore Optimization Pillars
                    </div>
                    {pillars.map(pillar => {
                      const Icon = pillar.icon;
                      return (
                        <Link
                          key={pillar.name}
                          to={pillar.path}
                          onClick={() => setDesktopPillarsOpen(false)}
                          className="min-h-[48px] flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all touch-manipulation"
                        >
                          <Icon size={16} className="text-blue-400 shrink-0" />
                          <div>
                            <div className="text-xs font-black uppercase tracking-wider text-left">{pillar.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 text-left">{pillar.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Blog Updates Dropdown (Stacked 2 Lines - Controlled React state) */}
              <div 
                ref={updatesRef}
                className="relative shrink-0"
                onMouseEnter={() => setDesktopUpdatesOpen(true)}
                onMouseLeave={() => setDesktopUpdatesOpen(false)}
              >
                <button 
                  type="button"
                  onClick={handleUpdatesToggle}
                  aria-expanded={desktopUpdatesOpen}
                  aria-haspopup="true"
                  aria-label="Toggle Blog Updates Menu"
                  className={`min-h-[48px] flex items-center px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none whitespace-nowrap touch-manipulation rounded-lg ${
                    desktopUpdatesOpen ? 'text-white bg-white/5' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="flex flex-col items-center text-center leading-tight">
                    <span>Blog</span>
                    <span>Updates</span>
                  </span>
                  <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${desktopUpdatesOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                </button>
                
                {/* Updates Dropdown Panel */}
                <div 
                  role="menu"
                  aria-label="Research Categories Menu"
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 pt-2 z-[70] transition-all duration-200 ${
                    desktopUpdatesOpen 
                      ? 'opacity-100 visible pointer-events-auto translate-y-0' 
                      : 'opacity-0 invisible pointer-events-none -translate-y-2'
                  }`}
                >
                  <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-xl space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2 px-3 border-b border-slate-900 pb-2">
                      Research Categories
                    </div>
                    
                    <Link
                      to="/updates"
                      onClick={() => setDesktopUpdatesOpen(false)}
                      className="min-h-[48px] flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-black uppercase tracking-wider text-left touch-manipulation"
                    >
                      <Info size={14} className="text-blue-400 shrink-0" />
                      <span>All Updates</span>
                    </Link>

                    {[
                      { name: 'Health', path: '/blog/category/health', desc: 'Cellular & longevity research', icon: Shield },
                      { name: 'Fitness', path: '/blog/category/fitness', desc: 'Training protocols & recovery', icon: Dumbbell },
                      { name: 'Nutrition', path: '/blog/category/nutrition', desc: 'Nutrition & supplement strategy', icon: Apple },
                      { name: 'Wellness', path: '/blog/category/wellness', desc: 'Nervous system & breathwork', icon: Heart }
                    ].map(cat => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          onClick={() => setDesktopUpdatesOpen(false)}
                          className="min-h-[48px] flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-all touch-manipulation"
                        >
                          <Icon size={14} className="text-blue-400 shrink-0" />
                          <div>
                            <div className="text-xs font-black uppercase tracking-wider text-left">{cat.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 text-left">{cat.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* The Anti-Aging Health Revolution (Stacked 2 Lines) */}
              <Link 
                to="/science" 
                className="min-h-[48px] px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors flex flex-col items-center justify-center text-center leading-tight whitespace-nowrap touch-manipulation shrink-0"
                title="The Anti-Aging Health Revolution"
              >
                <span>Anti-Aging</span>
                <span>Revolution</span>
              </Link>

              {/* Sovereign Store (Stacked 2 Lines) */}
              <Link 
                to="/store" 
                className="min-h-[48px] px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-amber-300 hover:text-white transition-all flex flex-col items-center justify-center text-center leading-tight rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] whitespace-nowrap touch-manipulation shrink-0"
                title="Sovereign Express Store"
              >
                <span className="flex items-center gap-1">
                  <span>Sovereign</span>
                  <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 animate-pulse">Express</span>
                </span>
                <span>Store</span>
              </Link>

              {/* Premium Guides (Stacked 2 Lines) */}
              <Link 
                to="/premium-guides" 
                className="min-h-[48px] px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors flex flex-col items-center justify-center text-center leading-tight whitespace-nowrap touch-manipulation shrink-0"
              >
                <span>Premium</span>
                <span>Guides</span>
              </Link>

              {/* Clinical Library (Stacked 2 Lines) */}
              <Link 
                to="/library" 
                className="min-h-[48px] px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors flex flex-col items-center justify-center text-center leading-tight whitespace-nowrap touch-manipulation shrink-0"
                title="The Sovereign Library"
              >
                <span>Clinical</span>
                <span>Library</span>
              </Link>

              {/* Intelligence */}
              <Link 
                to="/intelligence-hub" 
                className="min-h-[48px] px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors whitespace-nowrap flex items-center touch-manipulation shrink-0"
              >
                Intelligence
              </Link>

              {/* Design System (Stacked 2 Lines - shown on ultra-wide viewports) */}
              <Link 
                to="/design-system" 
                className="hidden 2xl:flex min-h-[48px] px-2 xl:px-2.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors flex-col items-center justify-center text-center leading-tight whitespace-nowrap touch-manipulation shrink-0"
              >
                <span>Design</span>
                <span>System</span>
              </Link>

              {/* Vertical divider */}
              <div className="h-5 w-px bg-slate-800 shrink-0 mx-0.5 xl:mx-1"></div>

              {/* Global Market Selector in Navbar */}
              <div className="shrink-0 flex items-center">
                <MarketSelector size="sm" />
              </div>
            </div>

            {/* Mobile & Tablet Header Controls (Active up to xl / 1280px) */}
            <div className="xl:hidden flex items-center gap-2 sm:gap-3 shrink-0">
              <MarketSelector size="sm" />
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="min-h-[48px] min-w-[48px] p-2.5 flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors touch-manipulation cursor-pointer border border-white/5 active:scale-95"
                aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET TOUCH DRAWER (Active up to xl / 1280px - Technical Directive) */}
      {/* ========================================================================= */}
      <div 
        className={`xl:hidden fixed inset-0 z-[110] transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Semi-transparent dark blur backdrop (Tap outside closes drawer) */}
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
          aria-hidden="true"
        />

        {/* Drawer Sheet Container */}
        <div 
          ref={mobileDrawerRef}
          className={`relative z-10 w-full max-w-lg ml-auto h-full bg-slate-950 border-l border-slate-800/80 shadow-2xl flex flex-col overflow-y-auto no-scrollbar transition-transform duration-300 ease-out transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Top Header with Brand and Explicit 48px Close Button */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80">
            <Link 
              to="/" 
              onClick={handleHomeClick} 
              className="flex items-center group min-h-[48px] touch-manipulation"
            >
              <img 
                src="/assets/logo.png" 
                alt="123 The Next Level Logo" 
                className="w-7 h-7 object-contain mr-2"
              />
              <span className="font-display font-black uppercase tracking-tight text-base text-white">
                123TheNext<span className="text-blue-500">Level</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] p-2.5 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors touch-manipulation cursor-pointer border border-white/5"
              aria-label="Close navigation drawer"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col pt-4 pb-12 px-4 sm:px-6 space-y-3">
            {/* Market Selector at the Top of Mobile Drawer with generous 48px touch targets */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                Select Your Market
              </span>
              <MarketSelector size="lg" className="w-full justify-center" />
            </div>

            {/* Flat Link: Home */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-white touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3">
                <HomeIcon size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">{t('nav_home')}</span>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </Link>

            {/* Flat Link: Dual-Track */}
            <Link
              to="/dual-track"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-white touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3">
                <Compass size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">Dual-Track</span>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </Link>

            {/* Flat Link: The Anti-Aging Health Revolution */}
            <Link
              to="/science"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-cyan-400 hover:text-cyan-300 touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-cyan-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">The Anti-Aging Health Revolution</span>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </Link>

            {/* Flat Link: Sovereign Store */}
            <Link
              to="/store"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 hover:from-amber-950/60 rounded-2xl border border-amber-500/30 text-amber-300 hover:text-white touch-manipulation transition-all"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-amber-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">Sovereign Store</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500 text-slate-950 animate-pulse">
                Express
              </span>
            </Link>

            {/* Accordion: Pillars */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobilePillarsOpen(!mobilePillarsOpen)}
                aria-expanded={mobilePillarsOpen}
                className="min-h-[48px] min-w-[48px] w-full px-4 py-3 flex items-center justify-between text-white hover:bg-white/5 transition-all outline-none touch-manipulation cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-blue-400 shrink-0" />
                  <span className="text-sm font-display font-black uppercase tracking-tight">Pillars</span>
                </div>
                <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${mobilePillarsOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {mobilePillarsOpen && (
                <div className="bg-slate-950/80 border-t border-white/5 p-2 space-y-1">
                  {pillars.map(pillar => {
                    const PillarIcon = pillar.icon;
                    return (
                      <Link
                        key={pillar.name}
                        to={pillar.path}
                        onClick={() => setIsOpen(false)}
                        className="min-h-[48px] min-w-[48px] px-3.5 py-3 flex items-center justify-between rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors touch-manipulation"
                      >
                        <div className="flex items-center gap-3">
                          <PillarIcon size={16} className="text-blue-400 shrink-0" />
                          <div className="text-left">
                            <div className="text-xs font-black uppercase tracking-wider">{pillar.name}</div>
                            <div className="text-[10px] text-slate-400 normal-case font-normal mt-0.5">{pillar.desc}</div>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-600" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion: Blog Updates */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileUpdatesOpen(!mobileUpdatesOpen)}
                aria-expanded={mobileUpdatesOpen}
                className="min-h-[48px] min-w-[48px] w-full px-4 py-3 flex items-center justify-between text-white hover:bg-white/5 transition-all outline-none touch-manipulation cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Info size={18} className="text-blue-400 shrink-0" />
                  <span className="text-sm font-display font-black uppercase tracking-tight">Blog Updates</span>
                </div>
                <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${mobileUpdatesOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {mobileUpdatesOpen && (
                <div className="bg-slate-950/80 border-t border-white/5 p-2 space-y-1">
                  <Link
                    to="/updates"
                    onClick={() => setIsOpen(false)}
                    className="min-h-[48px] min-w-[48px] px-3.5 py-3 flex items-center justify-between rounded-xl hover:bg-white/10 text-slate-300 hover:text-white text-xs font-black uppercase tracking-wider touch-manipulation"
                  >
                    <div className="flex items-center gap-3">
                      <Info size={16} className="text-blue-400 shrink-0" />
                      <span>All Updates</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-600" />
                  </Link>
                  {[
                    { name: 'Health', path: '/blog/category/health', desc: 'Cellular & longevity research', icon: Shield },
                    { name: 'Fitness', path: '/blog/category/fitness', desc: 'Training protocols & recovery', icon: Dumbbell },
                    { name: 'Nutrition', path: '/blog/category/nutrition', desc: 'Nutrition & supplement strategy', icon: Apple },
                    { name: 'Wellness', path: '/blog/category/wellness', desc: 'Nervous system & breathwork', icon: Heart }
                  ].map(cat => {
                    const CatIcon = cat.icon;
                    return (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        onClick={() => setIsOpen(false)}
                        className="min-h-[48px] min-w-[48px] px-3.5 py-3 flex items-center justify-between rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors touch-manipulation"
                      >
                        <div className="flex items-center gap-3">
                          <CatIcon size={16} className="text-blue-400 shrink-0" />
                          <div className="text-left">
                            <div className="text-xs font-black uppercase tracking-wider">{cat.name}</div>
                            <div className="text-[10px] text-slate-400 normal-case font-normal mt-0.5">{cat.desc}</div>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-600" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Flat Link: Premium Guides */}
            <Link
              to="/premium-guides"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-white touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">Premium Guides</span>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </Link>

            {/* Flat Link: Clinical Library */}
            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-cyan-950/40 hover:bg-cyan-900/40 rounded-2xl border border-cyan-500/30 text-cyan-300 hover:text-white touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-cyan-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">Clinical Library</span>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </Link>

            {/* Flat Link: Intelligence Hub */}
            <Link
              to="/intelligence-hub"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-white touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">Intelligence</span>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </Link>

            {/* Flat Link: Design System */}
            <Link
              to="/design-system"
              onClick={() => setIsOpen(false)}
              className="min-h-[48px] min-w-[48px] px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-white touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-blue-400 shrink-0" />
                <span className="text-sm font-display font-black uppercase tracking-tight">Design System</span>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5-Minute Trajectory Scan Modal from Header Trigger */}
      <FriendlyWellnessQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        initialState="quiz"
      />
    </nav>
  );
};

export default Navbar;
