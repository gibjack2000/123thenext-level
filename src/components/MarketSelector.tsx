import React from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useMarket, Market } from '../contexts/MarketContext';

// Self-contained, offline-resilient SVG Flags for US, UK, and Spain (ES)
export const FlagUS = ({ className = "w-5 h-3.5" }: { className?: string }) => (
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

export const FlagUK = ({ className = "w-5 h-3.5" }: { className?: string }) => (
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

export const FlagES = ({ className = "w-5 h-3.5" }: { className?: string }) => (
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
  size?: 'sm' | 'md' | 'lg';
}

export default function MarketSelector({ currentCategory, className = "", size = "md" }: MarketSelectorProps) {
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

  // Active market determination based on global context, pathname, or search parameters
  const isStore = location.pathname.startsWith('/store');
  const storeCountry = searchParams.get('country')?.toLowerCase();
  
  const activeRegionId: 'us' | 'uk' | 'es' = (
    market ? market.toLowerCase() : (
      isStore && storeCountry && ['us', 'uk', 'es'].includes(storeCountry)
        ? storeCountry
        : pathRegion || 'us'
    )
  ) as 'us' | 'uk' | 'es';

  const handleSelectMarket = (rId: 'us' | 'uk' | 'es') => {
    const marketUpper = rId.toUpperCase() as Market;
    setMarket(marketUpper);

    // Smart contextual navigation based on the active page
    if (isStore) {
      navigate(`/store-${rId}`);
    } else if (location.pathname.startsWith('/start-here')) {
      navigate(`/start-here?country=${marketUpper}`);
    } else if (location.pathname === '/clinician-copilot' || location.pathname.startsWith('/library') || location.pathname.startsWith('/blog/') || location.pathname.startsWith('/premium-guides/') || location.pathname === '/health-quiz') {
      // Remain on current view while regional diagnostics and products auto-switch in place
    } else if (pathRegion) {
      if (parts[0] === 'region') {
        navigate(`/region/${rId}`);
      } else {
        const remaining = parts.slice(1).join('/');
        navigate(remaining ? `/${rId}/${remaining}` : `/${rId}`);
      }
    } else if (currentCategory) {
      navigate(`/${rId}/${currentCategory}`);
    } else {
      // On Homepage (/) and general browsing
      navigate(`/store-${rId}`);
    }
  };

  const isLarge = size === 'lg';

  return (
    <div className={`flex items-center gap-1 xl:gap-1.5 shrink-0 ${className}`}>
      {!isLarge && (
        <span className="text-[10px] xl:text-[11px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400 select-none mr-0.5 hidden 2xl:inline">
          MARKET:
        </span>
      )}
      <div className={`flex items-center gap-1 sm:gap-1.5 bg-slate-950/90 p-1 rounded-xl border border-slate-800/90 shadow-inner shrink-0 ${isLarge ? 'w-full justify-center' : ''}`}>
        {REGIONS.map((r) => {
          const isActive = (market?.toLowerCase() || activeRegionId) === r.id;
          const FlagComp = r.FlagComponent;
          
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelectMarket(r.id)}
              className={`group relative flex items-center justify-center gap-1.5 rounded-lg font-mono font-bold transition-all duration-300 cursor-pointer shrink-0 touch-manipulation active:scale-95 ${
                isLarge
                  ? 'min-h-[48px] min-w-[48px] px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm flex-1'
                  : 'min-h-[44px] min-w-[44px] px-2.5 sm:px-3 py-2 text-xs sm:text-xs'
              } ${
                isActive 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md scale-105' 
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700 hover:bg-slate-800/60'
              }`}
              title={r.name}
              aria-label={`Select ${r.name} Market`}
              aria-pressed={isActive}
            >
              <FlagComp className={isLarge ? "w-5 h-3.5 sm:w-6 sm:h-4" : "w-4 h-3 sm:w-4.5 sm:h-3.5"} />
              <span className="tracking-tight">{r.label}</span>
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-950 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
