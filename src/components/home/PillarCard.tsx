import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';

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
}: PillarCardProps) {
  const isExternal = to.startsWith('http') || to.startsWith('#');
  const Component = isExternal ? 'a' : Link;
  const props = isExternal ? { href: to } : { to };

  return (
    <Component
      {...props as any}
      className={`relative p-10 pb-12 rounded-3xl shadow-xl border border-slate-700/50 overflow-hidden group flex flex-col h-full transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${hoverBorderColor} ${hoverShadowColor} backdrop-blur-sm`}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-110 contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-14 h-14 bg-white/10 ${iconColor} backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={28} />
        </div>
        
        <h3 className="text-3xl font-display uppercase tracking-tight text-white mb-4 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        
        <ul className="space-y-3 mb-6 text-slate-200/90 font-medium">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start">
              <span className={`${iconColor} mr-2 font-bold`}>•</span>
              {bullet}
            </li>
          ))}
        </ul>
        
        <p className="text-slate-200 mb-8 leading-relaxed font-medium">
          {description}
        </p>
        
        <div className="mt-auto text-white font-bold flex items-center group-hover:translate-x-2 transition-transform duration-300">
          Learn more <ArrowRight size={18} className="ml-2" />
        </div>
      </div>
    </Component>
  );
}
