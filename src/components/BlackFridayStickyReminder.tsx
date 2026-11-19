import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ArrowRight, X, Sparkles } from 'lucide-react';

const BF_PRICE = '£39.99';
const BF_DISCOUNT_PERCENT = '82% OFF';
const BF_SAVINGS_TEXT = 'Save £188.97 off £228.96 combined retail';

export const BlackFridayStickyReminder: React.FC = () => {
  const location = useLocation();
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasVisitedDeal, setHasVisitedDeal] = useState(false);

  // Detect when user is on or has visited the Black Friday landing page
  useEffect(() => {
    const isBfUrl = 
      location.pathname === '/black-friday' ||
      location.pathname === '/blackfriday' ||
      location.pathname === '/bf' ||
      location.pathname === '/deals/black-friday';

    if (isBfUrl) {
      try {
        sessionStorage.setItem('has_visited_bf_deal', 'true');
        localStorage.setItem('has_visited_bf_deal', 'true');
      } catch {}
      setHasVisitedDeal(true);
    } else {
      try {
        const stored = sessionStorage.getItem('has_visited_bf_deal') || localStorage.getItem('has_visited_bf_deal');
        // During the Black Friday promotional window, keep active for all visitors or visited visitors
        if (stored === 'true') {
          setHasVisitedDeal(true);
        } else {
          // Also active as a universal promotion reminder during Black Friday
          setHasVisitedDeal(true);
        }
      } catch {
        setHasVisitedDeal(true);
      }
    }
  }, [location.pathname]);

  // Hide when already on the Black Friday page or during Black Friday checkout
  const isAlreadyOnDeal = 
    location.pathname === '/black-friday' ||
    location.pathname === '/blackfriday' ||
    location.pathname === '/bf' ||
    location.pathname === '/deals/black-friday' ||
    (location.pathname === '/checkout' && location.search.includes('black-friday'));

  if (isAlreadyOnDeal || !hasVisitedDeal) {
    return null;
  }

  // If user dismissed the full bar, show a sleek floating miniature pill so they can still return anytime
  if (isDismissed) {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-in fade-in duration-300">
        <Link
          to="/black-friday"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-950/95 border-2 border-amber-500/80 hover:border-amber-400 text-white shadow-2xl shadow-amber-500/30 transition-all transform hover:scale-105 backdrop-blur-md"
          title={`Start My Wellness Journey — 10 Wellness Books (${BF_PRICE})`}
        >
          <Heart size={15} className="text-amber-400 fill-amber-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-amber-300">
            Black Friday Deal <span className="text-white bg-amber-500/30 px-1.5 py-0.5 rounded text-[10px] ml-1">{BF_PRICE}</span>
          </span>
          <ArrowRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <aside 
      aria-label="Black Friday Wellness Deal Reminder"
      className="fixed bottom-3 inset-x-3 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-lg z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/90 border-2 border-amber-500/80 p-3.5 sm:p-4 shadow-2xl shadow-amber-500/25 backdrop-blur-md">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          
          {/* Icon + Copy */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30 mt-0.5">
              <Heart size={19} className="text-slate-950 fill-slate-950" />
            </div>

            <div className="min-w-0 space-y-1 text-left">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
                  <Sparkles size={11} /> Black Friday Deal Active
                </span>
                <span className="text-[9px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
                  {BF_DISCOUNT_PERCENT}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                All 10 Wellness Books for <span className="text-amber-300 font-black">{BF_PRICE}</span>
              </p>
              <p className="text-[10.5px] text-slate-300 font-medium leading-tight">
                Sleep better. Get your energy back. Build healthier habits.
              </p>
              <p className="text-[10px] text-amber-400/90 font-semibold tracking-wide">
                {BF_SAVINGS_TEXT}
              </p>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition cursor-pointer shrink-0"
            title="Minimize reminder"
            aria-label="Minimize Black Friday reminder"
          >
            <X size={15} />
          </button>
        </div>

        {/* Action Button Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-[11px] text-slate-300 font-medium leading-snug sm:max-w-[210px] text-left">
            Still thinking it over? Your healthier habits are one click away:
          </span>
          <div className="relative group shrink-0">
            {/* Dynamic Changing Glow Motion Aura (Behind Button) */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse pointer-events-none" />

            {/* Glowing CTA Button */}
            <Link
              to="/black-friday"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl whitespace-nowrap cursor-pointer active:scale-[0.99] cta-glow-pulse"
            >
              {/* Subtle Kinetic Light Beam Sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none cta-shimmer-sweep" />

              <span className="relative z-10">Start My Wellness Journey</span>
              <ArrowRight size={14} className="relative z-10 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scoped Keyframe Styles for Dynamic Changing Glow & Shimmer */}
        <style>{`
          @keyframes ctaGlowPulse {
            0%, 100% {
              box-shadow: 0 0 14px 2px rgba(245, 158, 11, 0.45), 0 4px 20px rgba(249, 115, 22, 0.3);
            }
            50% {
              box-shadow: 0 0 28px 6px rgba(245, 158, 11, 0.85), 0 0 45px 10px rgba(249, 115, 22, 0.5);
            }
          }
          @keyframes ctaShimmerSweep {
            0% {
              transform: translateX(-150%) skewX(-20deg);
            }
            35%, 100% {
              transform: translateX(250%) skewX(-20deg);
            }
          }
          .cta-glow-pulse {
            animation: ctaGlowPulse 2.8s ease-in-out infinite;
          }
          .cta-shimmer-sweep {
            animation: ctaShimmerSweep 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>

      </div>
    </aside>
  );
};

export default BlackFridayStickyReminder;
