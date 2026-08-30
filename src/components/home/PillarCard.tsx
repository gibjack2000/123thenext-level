import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { useT } from '../../translations';

interface PillarCardProps {
  to: string;
  image: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  bullets: string[];
  description: string;
  hoverBorderColor: string;
  hoverShadowColor: string;
  subLink?: {
    text: string;
    to: string;
  };
}

export default function PillarCard({
  to,
  image,
  icon: Icon,
  iconColor,
  title,
  bullets,
  description,
  hoverBorderColor,
  hoverShadowColor,
  subLink,
}: PillarCardProps) {
  const t = useT();
  const navigate = useNavigate();
  const isExternal = to.startsWith('http') || to.startsWith('#');

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    if (isExternal) {
      window.location.href = to;
    } else {
      navigate(to);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative p-10 pb-12 rounded-3xl shadow-xl border border-slate-700/50 overflow-hidden group flex flex-col h-full transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${hoverBorderColor} ${hoverShadowColor} backdrop-blur-sm cursor-pointer`}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75 contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Deeper gradient overlay for improved text legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-slate-900/80 group-hover:via-slate-900/30 transition-all duration-500"></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-14 h-14 bg-white/10 ${iconColor} backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={28} />
        </div>
        
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.9] group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        
        <ul className="space-y-4 mb-8 text-slate-100 font-bold text-sm tracking-wide">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className={`w-1.5 h-1.5 rounded-full ${iconColor.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`}></span>
              {bullet}
            </li>
          ))}
        </ul>
        
        <p className="text-slate-300 mb-6 leading-relaxed font-medium text-lg lg:pr-4">
          {description}
        </p>

        {subLink && (
          <div className="mb-8 pt-4 border-t border-white/10">
            <Link
              to={subLink.to}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-all group/sub py-1"
            >
              <span className="underline underline-offset-4 decoration-cyan-500/40 group-hover/sub:decoration-cyan-300">
                {subLink.text}
              </span>
            </Link>
          </div>
        )}
        
        <div className="mt-auto text-white font-black uppercase tracking-widest text-xs flex items-center group-hover:translate-x-2 transition-transform duration-300 underline-offset-8 decoration-2 hover:underline">
          <Link to={to} className="inline-flex items-center">
            {t('pillar_learn_more')} <ArrowRight size={16} className="ml-2 text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
