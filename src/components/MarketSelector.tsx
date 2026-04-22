import React from 'react';
import { Link, useParams } from 'react-router-dom';

const REGIONS = [
  { id: 'us', name: 'United States', flag: 'https://flagcdn.com/w80/us.png' },
  { id: 'uk', name: 'United Kingdom', flag: 'https://flagcdn.com/w80/gb.png' },
  { id: 'es', name: 'España', flag: 'https://flagcdn.com/w80/es.png' }
];

interface MarketSelectorProps {
  currentCategory?: string;
  className?: string;
}

export default function MarketSelector({ currentCategory, className = "" }: MarketSelectorProps) {
  const { region } = useParams<{ region: string }>();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mr-2">Market:</span>
      <div className="flex gap-2">
        {REGIONS.map((r) => {
          const isActive = region === r.id;
          const targetPath = currentCategory ? `/${r.id}/${currentCategory}` : `/${r.id}`;
          
          return (
            <Link
              key={r.id}
              to={targetPath}
              className={`group relative flex items-center justify-center w-12 h-10 rounded-xl transition-all duration-500 overflow-hidden ${
                isActive 
                  ? 'bg-blue-600/20 shadow-lg shadow-blue-900/40 ring-2 ring-blue-500' 
                  : 'bg-slate-800/30 hover:bg-slate-800 border border-white/5 hover:border-blue-500/50'
              }`}
              title={r.name}
            >
              <img 
                src={r.flag} 
                alt={r.name} 
                className={`w-7 h-auto rounded-sm transition-all duration-500 ${isActive ? 'scale-110 brightness-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`}
              />
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
