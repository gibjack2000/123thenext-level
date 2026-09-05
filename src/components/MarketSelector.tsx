import React from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useMarket, Market } from '../contexts/MarketContext';

// Self-contained, offline-resilient SVG Flags for US, UK, and Spain (ES)
const FlagUS = ({ className = "w-5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-sm flex-shrink-0`} xmlns="http://www.w3.org/2000/svg">
    <path fill="#bd3d44" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203h640M0 277h640M0 350.8h640M0 424.6h640"/>
    <path fill="#192f5d" d="M0 0h256v258.5H0z"/>
    <g fill="#fff">
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <polygon
            key={`s1-${row}-${col}`}
            points="0,-5 1.5,-1.5 5,-1.5 2.2,0.8 3.3,4.2 0,2.3 -3.3,4.2 -2.2,0.8 -5,-1.5 -1.5,-1.5"
            transform={`translate(${col * 42.6 + 21.3}, ${row * 48 + 24}) scale(1.3)`}
          />
        ))
      )}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <polygon
            key={`s2-${row}-${col}`}
            points="0,-5 1.5,-1.5 5,-1.5 2.2,0.8 3.3,4.2 0,2.3 -3.3,4.2 -2.2,0.8 -5,-1.5 -1.5,-1.5"
            transform={`translate(${col * 42.6 + 42.6}, ${row * 48 + 48}) scale(1.3)`}
          />
        ))
      )}
    </g>
  </svg>
);

const FlagUK = ({ className = "w-5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-sm flex-shrink-0`} xmlns="http://www.w3.org/2000/svg">
    <clipPath id="uk-clip-ms">
      <path d="M0 0v480h640V0z"/>
    </clipPath>
    <g clipPath="url(#uk-clip-ms)">
      <path fill="#012169" d="M0 0v480h640V0z"/>
      <path stroke="#fff" strokeWidth="60" d="m0 0 640 480m0-480L0 480"/>
      <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480m0-480L0 480" clipPath="url(#uk-clip-ms)"/>
      <path stroke="#fff" strokeWidth="100" d="M320 0v480zM0 240h640z"/>
      <path stroke="#C8102E" strokeWidth="60" d="M320 0v480zM0 240h640z"/>
    </g>
  </svg>
);

const FlagES = ({ className = "w-5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-sm flex-shrink-0`} xmlns="http://www.w3.org/2000/svg">
    <path fill="#c60b1e" d="M0 0h640v480H0z"/>
    <path fill="#ffc400" d="M0 120h640v240H0z"/>
    <g transform="translate(140, 240)">
      <rect x="-24" y="-36" width="48" height="72" rx="10" fill="#c60b1e" stroke="#ffc400" strokeWidth="3"/>
      <circle cx="0" cy="-8" r="10" fill="#ffc400"/>
      <path d="M-12 12h24M0 4v20" stroke="#ffc400" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const REGIONS: { id: 'us' | 'uk' | 'es'; name: string; label: string; flagEmoji: string; FlagComponent: React.ComponentType<{ className?: string }> }[] = [
  { id: 'us', name: 'United States', label: 'US', flagEmoji: '🇺🇸', FlagComponent: FlagUS },
  { id: 'uk', name: 'United Kingdom', label: 'UK', flagEmoji: '🇬🇧', FlagComponent: FlagUK },
  { id: 'es', name: 'España / EU', label: 'ES', flagEmoji: '🇪🇸', FlagComponent: FlagES }
];

interface MarketSelectorProps {
  currentCategory?: string;
  className?: string;
}

export default function MarketSelector({ currentCategory, className = "" }: MarketSelectorProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { market, setMarket } = useMarket();
  
  // Extract region from pathname since useParams is empty outside of <Routes>
  const parts = location.pathname.split('/').filter(Boolean);
  const knownRegions = ['us', 'uk', 'es'];
  let pathRegion: string | undefined = undefined;
  
  if (parts.length > 0) {
    if (knownRegions.includes(parts[0])) {
      pathRegion = parts[0];
    } else if (parts[0] === 'region' && parts[1] && knownRegions.includes(parts[1])) {
      pathRegion = parts[1];
    }
  }

  // Active market determination based on pathname, search parameters, or global market context
  const isStore = location.pathname.startsWith('/store');
  const storeCountry = searchParams.get('country')?.toLowerCase();
  
  const activeRegionId: 'us' | 'uk' | 'es' = (
    isStore && storeCountry && ['us', 'uk', 'es'].includes(storeCountry)
      ? storeCountry
      : pathRegion || (market ? market.toLowerCase() : 'us')
  ) as 'us' | 'uk' | 'es';

  const handleSelectMarket = (rId: 'us' | 'uk' | 'es') => {
    const marketUpper = rId.toUpperCase() as Market;
    setMarket(marketUpper);

    // Smart contextual navigation based on the active page
    if (isStore) {
      navigate(`/store?country=${marketUpper}`);
    } else if (location.pathname.startsWith('/start-here')) {
      navigate(`/start-here?country=${marketUpper}`);
    } else if (pathRegion) {
      if (parts[0] === 'region') {
        navigate(`/region/${rId}`);
      } else {
        const categoryPart = currentCategory || parts[1] || '';
        navigate(categoryPart ? `/${rId}/${categoryPart}` : `/${rId}`);
      }
    } else if (currentCategory) {
      navigate(`/${rId}/${currentCategory}`);
    } else {
      navigate(`/${rId}`);
    }
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-slate-400 select-none mr-0.5 hidden xl:inline">
        MARKET:
      </span>
      <div className="flex items-center gap-1 bg-slate-950/90 p-0.5 rounded-xl border border-slate-800/90 shadow-inner">
        {REGIONS.map((r) => {
          const isActive = activeRegionId === r.id;
          const FlagComp = r.FlagComponent;
          
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelectMarket(r.id)}
              className={`group relative flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700 hover:bg-slate-800/60'
              }`}
              title={r.name}
              aria-label={`Select ${r.name} Market`}
            >
              <FlagComp className="w-3.5 h-2.5" />
              <span className="text-[10.5px] font-bold tracking-wider">{r.label}</span>
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

