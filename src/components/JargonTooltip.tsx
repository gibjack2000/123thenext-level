import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, X } from 'lucide-react';
import { jargonDatabase } from '../data/jargon';

interface JargonTooltipProps {
  termKey: string;
  children?: React.ReactNode;
}

export default function JargonTooltip({ termKey, children }: JargonTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipSide, setTooltipSide] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Normalize key
  const normalizedKey = termKey.toLowerCase().trim();
  const definition = jargonDatabase[normalizedKey];

  // Adjust tooltip side on open based on viewport clearance
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      if (spaceAbove < 240) {
        setTooltipSide('bottom');
      } else {
        setTooltipSide('top');
      }
    }
  }, [isOpen]);

  // Click outside to close (essential for mobile/tablet)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!definition) {
    // Fallback if key not found
    return <span className="font-semibold">{children || termKey}</span>;
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <span className="relative inline-block" ref={triggerRef}>
      <span
        onClick={handleToggle}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-help border-b border-dashed border-indigo-400/80 hover:text-indigo-300 transition-all font-semibold select-none group/trigger relative py-0.5"
      >
        {children || definition.term}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: tooltipSide === 'top' ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltipSide === 'top' ? -10 : 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute left-1/2 -translate-x-1/2 z-50 w-72 md:w-80 p-5 rounded-3xl bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 shadow-3xl text-left pointer-events-auto select-text ${
              tooltipSide === 'top' 
                ? 'bottom-full mb-3' 
                : 'top-full mt-3'
            }`}
          >
            {/* Visual Indicator arrow */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0f172a] border border-white/10 rotate-45 z-[-1] ${
                tooltipSide === 'top' 
                  ? 'bottom-[-6px] border-t-0 border-l-0' 
                  : 'top-[-6px] border-b-0 border-r-0'
              }`}
            />

            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 flex items-center gap-1.5">
                <BookOpen size={10} />
                {definition.category} Jargon
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-slate-500 hover:text-white transition-colors p-1 md:hidden"
              >
                <X size={14} />
              </button>
            </div>

            <h4 className="text-lg font-display font-black uppercase text-white mb-2 leading-none">
              {definition.term}
            </h4>
            
            <p className="text-slate-300 text-xs leading-relaxed font-semibold mb-4 border-l-2 border-indigo-500/50 pl-3">
              {definition.simpleDefinition}
            </p>

            <p className="text-slate-400 text-[11px] leading-relaxed font-medium mb-4">
              {definition.detailedExplanation}
            </p>

            <div className="pt-3 border-t border-white/5 flex gap-2 items-start text-emerald-400">
              <Sparkles size={12} className="flex-shrink-0 mt-0.5" />
              <p className="text-[10px] leading-normal font-bold">
                {definition.practicalTip}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
