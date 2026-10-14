import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMarket, Market } from '../contexts/MarketContext';

export const Navbar: React.FC = () => {
  const { market, setMarket } = useMarket();
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'uk' | 'es'>(
    (market?.toLowerCase() as 'us' | 'uk' | 'es') || 'us'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Sync with global MarketContext if changed externally
  useEffect(() => {
    if (market && ['US', 'UK', 'ES'].includes(market)) {
      setSelectedRegion(market.toLowerCase() as 'us' | 'uk' | 'es');
    }
  }, [market]);

  const handleRegionChange = (region: 'us' | 'uk' | 'es') => {
    setSelectedRegion(region);
    setMarket(region.toUpperCase() as Market);
    // Regional routing update logic for storefront
    if (location.pathname.startsWith('/store')) {
      navigate(`/store-${region}`);
    }
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LEFT: Brand Logo & Mission Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              123<span className="text-cyan-400">TheNextLevel</span>
            </span>
          </Link>
          <span className="hidden md:inline-block text-[10px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Geroscience Portal
          </span>
        </div>

        {/* CENTER: Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          <Link 
            to="/" 
            className={`transition-colors ${location.pathname === '/' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Start Here
          </Link>
          <Link 
            to="/science" 
            className={`transition-colors ${location.pathname === '/science' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Science
          </Link>
          <Link 
            to="/guide" 
            className={`transition-colors ${location.pathname === '/guide' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Diagnostics
          </Link>
          <Link 
            to="/wellness" 
            className={`transition-colors ${location.pathname === '/wellness' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Autonomic
          </Link>
          <Link 
            to={`/store-${selectedRegion}`} 
            className={`transition-colors ${location.pathname.startsWith('/store') ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            Store
          </Link>
        </nav>

        {/* RIGHT: Market Selector & Quiz CTA */}
        <div className="hidden sm:flex items-center gap-4">
          
          {/* Regional Selector Pills */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs">
            <button
              type="button"
              onClick={() => handleRegionChange('us')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                selectedRegion === 'us' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇺🇸 US
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('uk')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                selectedRegion === 'uk' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇬🇧 UK
            </button>
            <button
              type="button"
              onClick={() => handleRegionChange('es')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                selectedRegion === 'es' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇪🇸 ES
            </button>
          </div>

          {/* Primary Action Button */}
          <Link
            to="/quiz"
            className="py-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            5-Min Quiz ➔
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
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
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <Link to="/" onClick={closeMobileMenu} className="block text-slate-300 font-medium py-1 hover:text-cyan-400 transition-colors">Start Here</Link>
          <Link to="/science" onClick={closeMobileMenu} className="block text-slate-300 font-medium py-1 hover:text-cyan-400 transition-colors">Science</Link>
          <Link to="/guide" onClick={closeMobileMenu} className="block text-slate-300 font-medium py-1 hover:text-cyan-400 transition-colors">Diagnostics</Link>
          <Link to="/wellness" onClick={closeMobileMenu} className="block text-slate-300 font-medium py-1 hover:text-cyan-400 transition-colors">Autonomic</Link>
          <Link to={`/store-${selectedRegion}`} onClick={closeMobileMenu} className="block text-slate-300 font-medium py-1 hover:text-cyan-400 transition-colors">Store</Link>
          
          <div className="pt-2">
            <Link
              to="/quiz"
              onClick={closeMobileMenu}
              className="block w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg text-center transition-all shadow-md shadow-cyan-500/20"
            >
              Take 5-Min Wellness Quiz ➔
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Select Region:</span>
            <div className="flex gap-2 text-xs">
              <button 
                type="button" 
                onClick={() => handleRegionChange('us')} 
                className={`px-2 py-1 rounded font-bold cursor-pointer ${selectedRegion === 'us' ? 'text-cyan-400 bg-slate-900 border border-slate-800' : 'text-slate-400'}`}
              >
                🇺🇸 US
              </button>
              <button 
                type="button" 
                onClick={() => handleRegionChange('uk')} 
                className={`px-2 py-1 rounded font-bold cursor-pointer ${selectedRegion === 'uk' ? 'text-cyan-400 bg-slate-900 border border-slate-800' : 'text-slate-400'}`}
              >
                🇬🇧 UK
              </button>
              <button 
                type="button" 
                onClick={() => handleRegionChange('es')} 
                className={`px-2 py-1 rounded font-bold cursor-pointer ${selectedRegion === 'es' ? 'text-cyan-400 bg-slate-900 border border-slate-800' : 'text-slate-400'}`}
              >
                🇪🇸 ES
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
