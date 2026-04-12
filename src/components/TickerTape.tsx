import React from 'react';
import { Sparkles } from 'lucide-react';

const QUOTES = [
  "DON'T COMPETE, DOMINATE. GET TO THE NEXT LEVEL.",
  "CONSISTENCY IS THE KEY TO EVERY SUCCESS.",
  "EVERY DAY IS AN OPPORTUNITY TO BE 1% BETTER.",
  "THE NEXT LEVEL REQUIRES A NEW VERSION OF YOU.",
  "LIMITS ARE JUST ILLUSIONS CREATED BY THE COMFORT ZONE.",
  "FOCUS ON THE GOAL, NOT THE OBSTACLE.",
  "YOUR ONLY COMPETITION IS THE PERSON YOU WERE YESTERDAY.",
  "EXCELLENCE IS NOT AN ACT, BUT A HABIT.",
  "DREAM BIG. WORK HARD. STAY FOCUSED.",
  "THE JOURNEY TO THE TOP STARTS WITH A SINGLE STEP.",
  "WINNERS NEVER QUIT, AND QUITTERS NEVER WIN.",
  "STRENGHT DOESN'T COME FROM WHAT YOU CAN DO. IT COMES FROM OVERCOMING WHAT YOU ONCE THOUGHT YOU COULDN'T."
];

export default function TickerTape() {
  const tickerItems = [...QUOTES, ...QUOTES]; // Double for seamless loop

  return (
    <div className="w-full bg-slate-950 text-white border-b border-white/10 overflow-hidden py-3 relative z-50">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set of quotes */}
        <div className="flex items-center gap-16 text-[1rem] font-display uppercase tracking-[0.25em] font-bold px-8">
          {tickerItems.map((quote, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-6 text-blue-400">
                <Sparkles size={18} className="text-blue-500 animate-pulse" />
                <span className="text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">{quote}</span>
              </span>
              <span className="text-slate-800 font-black opacity-40">/</span>
            </React.Fragment>
          ))}
        </div>
        {/* Identical second set for seamless restart */}
        <div className="flex items-center gap-16 text-[1rem] font-display uppercase tracking-[0.25em] font-bold px-8">
          {tickerItems.map((quote, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-6 text-blue-400">
                <Sparkles size={18} className="text-blue-500 animate-pulse" />
                <span className="text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">{quote}</span>
              </span>
              <span className="text-slate-800 font-black opacity-40">/</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
