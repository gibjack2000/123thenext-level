import React from 'react';
import { Link } from 'react-router-dom';

const TICKER_ITEMS = [
  {
    badge: "🎁 100% Free Onboarding",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    text: "Confused by longevity science? Read our 5-page translator & diagnose your score instantly.",
    cta: "Access Free Toolkit ➔",
    href: "/#onboarding-gateway",
    isInternal: false
  },
  {
    badge: "⚡ 5-Min Diagnostic",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    text: "Diagnose your baseline biological score across our 6 core longevity protocols.",
    cta: "Take Free Quiz ➔",
    href: "/quiz",
    isInternal: true
  },
  {
    badge: "📚 Clinical Library",
    badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    text: "Full access to Advanced Geroscience Bibles, ApoB tracking & clinician note templates.",
    cta: "Open Library ➔",
    href: "/library",
    isInternal: true
  },
  {
    badge: "🧬 Molecular Translation",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    text: "Turn complex Yamanaka factors, NAD+ biology & VO2 max metrics into simple daily habits.",
    cta: "Get Idiot's Guide PDF ➔",
    href: "/#onboarding-gateway",
    isInternal: false
  }
];

export default function PromoBanner() {
  const renderItem = (item: typeof TICKER_ITEMS[0], idx: number, prefix: string) => (
    <div 
      key={`${prefix}-${idx}`} 
      className="flex items-center gap-2.5 sm:gap-3 shrink-0 px-4 sm:px-6 py-1 whitespace-nowrap"
    >
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black border uppercase tracking-wider shadow-sm ${item.badgeColor}`}>
        {item.badge}
      </span>
      
      <span className="text-xs md:text-sm font-medium text-slate-200">
        {item.text}
      </span>

      {item.isInternal ? (
        <Link 
          to={item.href}
          className="text-xs md:text-sm font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors cursor-pointer"
        >
          {item.cta}
        </Link>
      ) : (
        <a 
          href={item.href}
          className="text-xs md:text-sm font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors cursor-pointer"
        >
          {item.cta}
        </a>
      )}

      <span className="text-cyan-500/30 font-bold ml-2 sm:ml-4 select-none">✦</span>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-b border-cyan-500/20 py-2 relative z-50 overflow-hidden group">
      
      {/* Soft gradient edge fade masks for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling marquee track (pauses on hover) */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
        
        {/* Track 1 */}
        <div className="flex items-center">
          {TICKER_ITEMS.map((item, idx) => renderItem(item, idx, 'track1'))}
        </div>

        {/* Track 2 (Duplicate for seamless continuous loop) */}
        <div className="flex items-center" aria-hidden="true">
          {TICKER_ITEMS.map((item, idx) => renderItem(item, idx, 'track2'))}
        </div>

      </div>
    </div>
  );
}
