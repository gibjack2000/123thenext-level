import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';

export default function FloatingShopFAB() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Hide FAB on dedicated store pages and admin panels
  const isStorePage = location.pathname.startsWith('/store') || 
                      location.pathname.startsWith('/admin') || 
                      location.pathname.startsWith('/super-admin');

  if (isStorePage || !isVisible) {
    return null;
  }

  const handleClick = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('express-shop') || document.getElementById('shop');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/store');
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-40 flex items-center group select-none print:hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Pulsing Glow */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 animate-pulse pointer-events-none" />

      {/* Main FAB Pill Button */}
      <button
        onClick={handleClick}
        aria-label="Open Express Longevity Shop"
        className="relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-slate-950 border border-amber-500/50 text-white shadow-2xl shadow-amber-500/20 hover:border-amber-400 hover:shadow-amber-500/30 transition-all duration-300 transform group-hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Animated Cart / Shopping Bag Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md">
          <ShoppingBag size={16} className="transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black tracking-tight uppercase bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent font-display">
              Express Shop
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Live
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans hidden sm:inline leading-none">
            Supplements &amp; Gear
          </span>
        </div>

        {/* Arrow Action Icon */}
        <div className="pl-1 text-amber-400 group-hover:translate-x-0.5 transition-transform">
          <ArrowRight size={14} />
        </div>
      </button>

      {/* Dismiss Button (Mini close icon on hover) */}
      {isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          title="Dismiss for this session"
          className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center text-[10px] shadow-md transition cursor-pointer"
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
}
