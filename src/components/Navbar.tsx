import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, Zap, Shield, Heart, Info, ChevronRight, Compass, ChevronDown, Dumbbell, Apple, Users } from 'lucide-react';
import MarketSelector from './MarketSelector';
import { useT } from '../translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobilePillarsOpen, setMobilePillarsOpen] = useState(false);
  const [mobileSocialOpen, setMobileSocialOpen] = useState(false);
  const [mobileWellnessOpen, setMobileWellnessOpen] = useState(false);
  
  const location = useLocation();
  const t = useT();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobilePillarsOpen(false);
    setMobileSocialOpen(false);
    setMobileWellnessOpen(false);
  }, [location]);

  const pillars = [
    { name: 'Health', path: '/health', icon: Shield, desc: 'Preventive engineering & longevity' },
    { name: 'Fitness', path: '/fitness', icon: Dumbbell, desc: 'Strength mandate & Vo2 max' },
    { name: 'Nutrition', path: '/nutrition', icon: Apple, desc: 'Metabolic fuel & supplement guides' },
    { name: 'Wellness', path: '/wellness', icon: Heart, desc: 'VNS deep-dive & breathwork', hasSubmenu: true },
    { name: "Women's Health", path: '/womens-health', icon: Heart, desc: 'Ovarian longevity & cognitive preservation' },
    { name: 'Social Fitness & Community', path: '/social-fitness', icon: Users, desc: 'Pickleball & community protocols', hasSubmenu: true },
  ];

  const wellnessSubmenu = [
    { name: 'Cultivate Your Life Practice', path: '/#life-practice' },
  ];

  const socialSubmenu = [
    { name: 'Pickleball Ecosystem', path: '/social-fitness/pickleball' },
    { name: 'Festivalization Wave', path: '/social-fitness/festivals' },
    { name: 'Social Recovery', path: '/social-fitness/recovery' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      {/* Header Bar Background & Content */}
      <div className={`transition-all duration-500 relative z-50 ${
        scrolled 
          ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 py-3' 
          : 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4 lg:bg-transparent lg:border-none lg:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl text-white mr-3 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                <Zap size={20} strokeWidth={2.5} />
              </div>
              <span className="font-display font-black uppercase tracking-tighter text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
                123TheNext<span className="text-blue-500">Level</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Home */}
              <Link to="/" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                {t('nav_home')}
              </Link>
              
              {/* Start Here */}
              <Link to="/start-here" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Start Here
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
                      if (pillar.hasSubmenu) {
                        const submenuItems = pillar.name.startsWith('Wellness') ? wellnessSubmenu : socialSubmenu;
                        const submenuTitle = pillar.name.startsWith('Wellness') ? 'Wellness Practices' : 'Social & Community';
                        
                        return (
                          <div key={pillar.name} className="relative group/sub">
                            <Link
                              to={pillar.path}
                              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <Icon size={16} className="text-blue-400" />
                                <div>
                                  <div className="text-[11px] font-black uppercase tracking-wider text-left">{pillar.name}</div>
                                  <div className="text-[9px] text-slate-500 mt-0.5 text-left">{pillar.desc}</div>
                                </div>
                              </div>
                              <ChevronRight size={12} className="text-slate-500" />
                            </Link>

                            {/* Submenu flyout */}
                            <div className="absolute left-full top-0 hidden group-hover/sub:block pl-3 w-72 z-50">
                              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-1">
                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-500 mb-2 px-3 border-b border-slate-900 pb-2">{submenuTitle}</div>
                                {submenuItems.map(item => (
                                  item.path.startsWith('/#') ? (
                                    <a
                                      key={item.name}
                                      href={item.path}
                                      className="block px-3 py-2.5 text-[10px] text-left font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    >
                                      {item.name}
                                    </a>
                                  ) : (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      className="block px-3 py-2.5 text-[10px] text-left font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    >
                                      {item.name}
                                    </Link>
                                  )
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }
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
              <Link to="/updates" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Updates
              </Link>
              <Link to="/premium-guides" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Premium Guides
              </Link>
              <Link to="/intelligence-hub" className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                Intelligence
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
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <HomeIcon size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">{t('nav_home')}</span>
            </Link>

            {/* Flat Link Start Here */}
            <Link
              to="/start-here"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <Compass size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">Start Here</span>
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
                    if (pillar.hasSubmenu) {
                      const isWellness = pillar.name.startsWith('Wellness');
                      const isOpenState = isWellness ? mobileWellnessOpen : mobileSocialOpen;
                      const setOpenState = isWellness ? setMobileWellnessOpen : setMobileSocialOpen;
                      const submenuItems = isWellness ? wellnessSubmenu : socialSubmenu;
                      
                      return (
                        <div key={pillar.name} className="space-y-1">
                          <button
                            onClick={() => setOpenState(!isOpenState)}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <PillarIcon size={14} className="text-blue-400" />
                              <span>{pillar.name}</span>
                            </div>
                            <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpenState ? 'rotate-180' : ''}`} />
                          </button>

                          {isOpenState && (
                            <div className="pl-6 py-1 space-y-1 border-l border-white/5 ml-4">
                              {submenuItems.map(item => (
                                item.path.startsWith('/#') ? (
                                  <a
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-white text-left"
                                  >
                                    {item.name}
                                  </a>
                                ) : (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-white text-left"
                                  >
                                    {item.name}
                                  </Link>
                                )
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
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

            {/* Flat Link Updates */}
            <Link
              to="/updates"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-white"
            >
              <Info size={16} className="text-blue-400" />
              <span className="text-base font-display font-black uppercase tracking-tight">Updates</span>
            </Link>

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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
