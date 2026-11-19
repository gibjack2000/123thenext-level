import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, ArrowRight, X, Sparkles } from 'lucide-react';

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
          title="Return to Black Friday Flash Deal (£39.99)"
        >
          <Flame size={16} className="text-orange-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-amber-300">
            Black Friday Deal <span className="text-white bg-amber-500/30 px-1.5 py-0.5 rounded text-[10px] ml-1">£39.99</span>
          </span>
          <ArrowRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <aside 
      aria-label="Black Friday Deal Reminder"
      className="fixed bottom-3 inset-x-3 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/90 border-2 border-amber-500/80 p-3 sm:p-4 shadow-2xl shadow-amber-500/25 backdrop-blur-md">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-2.5 relative z-10">
          
          {/* Icon + Copy */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <Flame size={20} className="text-slate-950 fill-slate-950" />
            </div>

            <div className="min-w-0 space-y-0.5 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
                  <Sparkles size={11} /> Black Friday Deal Active
                </span>
                <span className="text-[9px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
                  82% OFF
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">
                All 10 Master Execution Books for <span className="text-amber-300 font-black">£39.99</span>
              </p>
              <p className="text-[10px] text-slate-400 hidden sm:block truncate">
                Save £188.97 off £228.96 combined retail
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
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400 hidden xs:inline">
            Wandered off? Jump right back:
          </span>
          <Link
            to="/black-friday"
            className="w-full xs:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md shadow-amber-500/30 flex items-center justify-center gap-1.5 ml-auto cursor-pointer"
          >
            <span>Start My Wellness Journey Today</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </aside>
  );
};

export default BlackFridayStickyReminder;
