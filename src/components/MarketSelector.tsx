import React from 'react';
import { Link, useParams } from 'react-router-dom';

const REGIONS = [
  { id: 'us', name: 'United States', flag: '🇺🇸' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'es', name: 'España', flag: '🇪🇸' }
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
              className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-600 shadow-lg shadow-blue-900/40 ring-2 ring-blue-400/50' 
                  : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-500'
              }`}
              title={r.name}
            >
              <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0'}`}>
                {r.flag}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
