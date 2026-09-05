import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, Zap, Shield, Heart, Info, ChevronRight, Compass, ChevronDown, Dumbbell, Apple, Users, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';
import MarketSelector from './MarketSelector';
import { useT } from '../translations';

import FriendlyWellnessQuizModal from './FriendlyWellnessQuizModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobilePillarsOpen, setMobilePillarsOpen] = useState(false);
  const [mobileSocialOpen, setMobileSocialOpen] = useState(false);
  const [mobileWellnessOpen, setMobileWellnessOpen] = useState(false);
  const [mobileUpdatesOpen, setMobileUpdatesOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const t = useT();

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

  // Active country state for Console Header (US, UK, ES)
  const [activeCountry, setActiveCountry] = useState<'US' | 'UK' | 'ES'>(
    (currentRegion.toUpperCase() as 'US' | 'UK' | 'ES') || 'US'
  );

  // Sync active country with location search params or route region
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const countryParam = searchParams.get('country')?.toUpperCase();
    if (countryParam && ['US', 'UK', 'ES'].includes(countryParam)) {
      setActiveCountry(countryParam as 'US' | 'UK' | 'ES');
    } else if (currentRegion && ['us', 'uk', 'es'].includes(currentRegion)) {
      setActiveCountry(currentRegion.toUpperCase() as 'US' | 'UK' | 'ES');
    }
  }, [location.search, currentRegion]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (location.hash) {
        navigate('/', { replace: true });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobilePillarsOpen(false);
    setMobileSocialOpen(false);
    setMobileWellnessOpen(false);
    setMobileUpdatesOpen(false);
  }, [location]);

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
          <div className="relative z-10 p-3 sm:p-4 rounded-xl bg-[#0f172a] border border-slate-800/80 shadow-md backdrop-blur-md text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-cyan-400 font-bold text-xs sm:text-sm mb-1 tracking-tight font-display">
              <span>⚙️</span>
              <span className="text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">CLINICAL REGISTRY: Now Active</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-[12.5px] leading-relaxed font-sans">
              <strong className="text-white font-semibold">Recommended Sovereign Health Stack</strong> — a curated arsenal of certified diagnostic hardware, NSF-certified cellular fuel stacks, targeted vitamins and supplements, and multi-omic blood panels, built for one purpose: keeping your biological hardware running strong across the 10-year critical path.
            </p>
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

            {/* 2. Center Column: Clickable Flag Buttons & Regulatory Badge */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-slate-400 text-[11px] font-mono mr-1 hidden md:inline-block">
                Marketplace Country:
              </span>

              {/* 3 Clickable Country Marketplace Dedicated Page Links */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-inner">
                {/* US Marketplace Button */}
                <Link
                  to="/us"
                  onClick={() => setActiveCountry('US')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    activeCountry === 'US'
                      ? 'bg-cyan-950/80 border border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/60 opacity-100 scale-105'
                      : 'bg-slate-900/40 border border-transparent text-slate-400 opacity-50 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0 hover:bg-slate-800/60'
                  }`}
                  title="Explore Dedicated US Marketplace Storefront"
                >
                  <span className="text-xs">🇺🇸</span>
                  <span>US Marketplace</span>
                </Link>

                {/* UK Marketplace Button */}
                <Link
                  to="/uk"
                  onClick={() => setActiveCountry('UK')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    activeCountry === 'UK'
                      ? 'bg-cyan-950/80 border border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/60 opacity-100 scale-105'
                      : 'bg-slate-900/40 border border-transparent text-slate-400 opacity-50 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0 hover:bg-slate-800/60'
                  }`}
                  title="Explore Dedicated UK Marketplace Storefront"
                >
                  <span className="text-xs">🇬🇧</span>
                  <span>UK Marketplace</span>
                </Link>

                {/* ES Marketplace Button */}
                <Link
                  to="/es"
                  onClick={() => setActiveCountry('ES')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    activeCountry === 'ES'
                      ? 'bg-cyan-950/80 border border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/60 opacity-100 scale-105'
                      : 'bg-slate-900/40 border border-transparent text-slate-400 opacity-50 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0 hover:bg-slate-800/60'
                  }`}
                  title="Explore Dedicated España / EU Marketplace Storefront"
                >
                  <span className="text-xs">🇪🇸</span>
                  <span>España / EU Marketplace</span>
                </Link>
              </div>

              {/* Corresponding Regulatory Shield Badge with Smooth Fade-in */}
              <div className="transition-all duration-300">
                {activeCountry === 'US' && (
                  <div className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-400/60 text-amber-300 text-[9px] font-mono font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)] flex items-center gap-1 animate-fade-in">
                    <ShieldCheck size={11} className="text-amber-400 flex-shrink-0" />
                    <span>US: FDA & CLIA COMPLIANT</span>
                  </div>
                )}
                {activeCountry === 'UK' && (
                  <div className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-[9px] font-mono font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)] flex items-center gap-1 animate-fade-in">
                    <ShieldCheck size={11} className="text-cyan-400 flex-shrink-0" />
                    <span>UK: MHRA REGISTERED</span>
                  </div>
                )}
                {activeCountry === 'ES' && (
                  <div className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-[9px] font-mono font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)] flex items-center gap-1 animate-fade-in">
                    <ShieldCheck size={11} className="text-cyan-400 flex-shrink-0" />
                    <span>ES/EU: CE 0123 MARKED</span>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Right Column: Action Trigger */}
            <div className="flex items-center flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsQuizOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-[11px] font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-1.5 flex-shrink-0"
              >
                <Zap size={11} className="fill-current text-slate-950" />
                <span>Run Systems Check →</span>
              </button>
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
      {/* MAIN WEBSITE NAVIGATION MENU (Permanently visible at top, adaptive)      */}
      {/* ========================================================================= */}
      <div className={`transition-all duration-300 ease-in-out relative z-50 transform-gpu ${
        !isHomepage
          ? 'bg-[#020617] backdrop-blur-2xl border-b border-slate-800/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : isScrolled 
            ? 'bg-[#020617] backdrop-blur-2xl border-b border-slate-800/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]' 
            : 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 lg:bg-transparent lg:border-none lg:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" onClick={handleHomeClick} className="flex items-center group shrink-0 mr-8">
              <img 
                src="/assets/logo.png" 
                alt="123 The Next Level Logo" 
                className="w-9 h-9 object-contain mr-3 group-hover:scale-110 transition-transform duration-500"
              />
              <span className="font-display font-black uppercase tracking-tighter text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
                123TheNext<span className="text-blue-500">Level</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Home */}
              <Link to="/" onClick={handleHomeClick} className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                {t('nav_home')}
              </Link>
              
              {/* Start Here */}
              <Link to="/dual-track" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Dual-Track
              </Link>

              {/* Pillars Dropdown Trigger */}
              <div className="relative group py-2">
                <button className="flex items-center px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors cursor-pointer outline-none">
                  Pillars
                  <ChevronDown size={10} className="ml-1.5 transition-transform group-hover:rotate-180 duration-300" />
                </button>
                
                {/* Pillars Dropdown Panel */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block w-80 pt-3 z-50">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-1">
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-500 mb-2 px-3 border-b border-slate-900 pb-2">Explore Optimization Pillars</div>
                    {pillars.map(pillar => {
                      const Icon = pillar.icon;
                      return (
                        <Link
                          key={pillar.name}
                          to={pillar.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all"
                        >
                          <Icon size={16} className="text-blue-400" />
                          <div>
                            <div className="text-[11px] font-black uppercase tracking-wider text-left">{pillar.name}</div>
                            <div className="text-[9px] text-slate-500 mt-0.5 text-left">{pillar.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Remaining flat links */}
              {/* Updates Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors cursor-pointer outline-none">
                  Blog Updates
                  <ChevronDown size={10} className="ml-1.5 transition-transform group-hover:rotate-180 duration-300" />
                </button>
                
                {/* Updates Dropdown Panel */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block w-72 pt-3 z-50">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-1">
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-500 mb-2 px-3 border-b border-slate-900 pb-2">Research Categories</div>
                    
                    <Link
                      to="/updates"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all text-[11px] font-black uppercase tracking-wider text-left"
                    >
                      <Info size={14} className="text-blue-400" />
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
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all"
                        >
                          <Icon size={14} className="text-blue-400" />
                          <div>
                            <div className="text-[11px] font-black uppercase tracking-wider text-left">{cat.name}</div>
                            <div className="text-[9px] text-slate-500 mt-0.5 text-left">{cat.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <Link to="/science" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 transition-colors">
                The Anti-Aging Health Revolution
              </Link>
              <Link to="/store" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 hover:text-cyan-300 transition-colors">
                Store
              </Link>
              <Link to="/premium-guides" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Premium Guides
              </Link>
              <Link to="/intelligence-hub" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Intelligence
              </Link>
              <Link to="/design-system" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Design System
              </Link>
              
              <div className="h-4 w-px bg-white/10 mx-4"></div>
              
              {/* Global Market Selector in Navbar */}
              <MarketSelector className="bg-white/5 p-1.5 rounded-xl border border-white/5" />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors animate-fade-in"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-slate-950 transition-all duration-500 overflow-y-auto ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col pt-24 pb-12 px-6">
          {/* Market Selector at the Top of Mobile Menu */}
          <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Select Your Market</span>
            <MarketSelector className="justify-center" />
          </div>

          <div className="space-y-3">
            {/* Flat Link Home */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <HomeIcon size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">{t('nav_home')}</span>
            </Link>

            {/* Flat Link Start Here */}
            <Link
              to="/dual-track"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <Compass size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">Dual-Track</span>
            </Link>

            {/* Flat Link The Anti-Aging Health Revolution */}
            <Link
              to="/science"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-cyan-400 hover:text-cyan-300"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">The Anti-Aging Health Revolution</span>
            </Link>

            {/* Flat Link Store */}
            <Link
              to="/store"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-cyan-950/40 rounded-2xl border border-cyan-500/30 text-cyan-300 hover:text-white"
            >
              <ShoppingBag size={16} className="text-cyan-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">Sovereign Store</span>
            </Link>

            {/* Accordion: Pillars */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setMobilePillarsOpen(!mobilePillarsOpen)}
                className="w-full flex items-center justify-between p-4 text-white hover:bg-white/5 transition-all outline-none"
              >
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-blue-400" />
                  <span className="text-base font-display font-black uppercase tracking-tight">Pillars</span>
                </div>
                <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${mobilePillarsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobilePillarsOpen && (
                <div className="bg-slate-950/60 border-t border-white/5 p-3 space-y-1">
                  {pillars.map(pillar => {
                    const PillarIcon = pillar.icon;
                    return (
                      <Link
                        key={pillar.name}
                        to={pillar.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider"
                      >
                        <PillarIcon size={14} className="text-blue-400" />
                        <span>{pillar.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion: Updates */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setMobileUpdatesOpen(!mobileUpdatesOpen)}
                className="w-full flex items-center justify-between p-4 text-white hover:bg-white/5 transition-all outline-none"
              >
                <div className="flex items-center gap-3">
                  <Info size={16} className="text-blue-400" />
                  <span className="text-base font-display font-black uppercase tracking-tight">Blog Updates</span>
                </div>
                <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${mobileUpdatesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileUpdatesOpen && (
                <div className="bg-slate-950/60 border-t border-white/5 p-3 space-y-1">
                  <Link
                    to="/updates"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider"
                  >
                    <Info size={14} className="text-blue-400" />
                    <span>All Updates</span>
                  </Link>
                  {[
                    { name: 'Health', path: '/blog/category/health', icon: Shield },
                    { name: 'Fitness', path: '/blog/category/fitness', icon: Dumbbell },
                    { name: 'Nutrition', path: '/blog/category/nutrition', icon: Apple },
                    { name: 'Wellness', path: '/blog/category/wellness', icon: Heart }
                  ].map(cat => {
                    const PillarIcon = cat.icon;
                    return (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider"
                      >
                        <PillarIcon size={14} className="text-blue-400" />
                        <span>{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Flat Link Premium Guides */}
            <Link
              to="/premium-guides"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <Shield size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">Premium Guides</span>
            </Link>

            {/* Flat Link Intelligence Hub */}
            <Link
              to="/intelligence-hub"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <Shield size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">Intelligence</span>
            </Link>

            {/* Flat Link Design System */}
            <Link
              to="/design-system"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">Design System</span>
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
