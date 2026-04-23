import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, Zap, Shield, Heart, Info, ChevronRight } from 'lucide-react';
import MarketSelector from './MarketSelector';
import { useT } from '../translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = useT();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_home'), path: '/', icon: HomeIcon },
    { name: t('nav_pillars'), path: '/#pillars', icon: Zap },
    { name: t('nav_blog'), path: '/#blog', icon: Info },
    { name: 'Intelligence', path: '/intelligence-hub', icon: Shield },
  ];

  // Determine if we are in a product context (region or category page)
  const isProductContext = location.pathname.startsWith('/region') || 
                           location.pathname.startsWith('/category') ||
                           ['/us', '/uk', '/es'].some(r => location.pathname.startsWith(r));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 py-3' 
        : 'bg-transparent py-6'
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
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-4 w-px bg-white/10 mx-4"></div>
            
            {/* Global Market Selector in Navbar */}
            <MarketSelector className="bg-white/5 p-1.5 rounded-xl border border-white/5" />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-[90] bg-slate-950 transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col h-full pt-24 px-6">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-blue-600 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl text-blue-400">
                    <link.icon size={20} />
                  </div>
                  <span className="text-xl font-display font-black uppercase tracking-tight text-white">{link.name}</span>
                </div>
                <ChevronRight size={20} className="text-slate-600" />
              </a>
            ))}
          </div>
          
          <div className="mt-auto pb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-6 text-center">Global Market Access</p>
            <div className="flex justify-center">
               <MarketSelector className="bg-white/5 p-4 rounded-3xl border border-white/5" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
