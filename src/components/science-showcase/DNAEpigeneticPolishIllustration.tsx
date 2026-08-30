import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Dna, ArrowRight, ShieldCheck, CheckCircle2, FlaskConical, ExternalLink, RefreshCw, Eye } from 'lucide-react';

interface DNAEpigeneticPolishIllustrationProps {
  onInteraction?: () => void;
  onOpenCitation?: () => void;
}

export const DNAEpigeneticPolishIllustration: React.FC<DNAEpigeneticPolishIllustrationProps> = ({ 
  onInteraction,
  onOpenCitation 
}) => {
  // Polish progress: 0 (Aged, heavily methylated) to 100 (Youthful, polished pristine)
  const [polishProgress, setPolishProgress] = useState<number>(85);
  const [isAutoPolishing, setIsAutoPolishing] = useState<boolean>(false);
  const [activeFactor, setActiveFactor] = useState<'all' | 'oct4' | 'sox2' | 'klf4'>('all');

  // Calculate live biological age based on progress
  const biologicalAge = Math.round(72 - (polishProgress / 100) * 48); // 72 -> 24 years
  const cellularIdentity = Math.min(100, Math.round(42 + (polishProgress / 100) * 58)); // 42% -> 100%

  const handleTriggerPolish = () => {
    setIsAutoPolishing(true);
    if (onInteraction) onInteraction();
    let current = 0;
    setPolishProgress(0);
    const interval = setInterval(() => {
      current += 4;
      if (current >= 100) {
        setPolishProgress(100);
        setIsAutoPolishing(false);
        clearInterval(interval);
      } else {
        setPolishProgress(current);
      }
    }, 45);
  };

  // Generate DNA rungs
  const dnaRungs = [
    { id: 1, base: 'A-T', offset: 0.1 },
    { id: 2, base: 'G-C', offset: 0.35 },
    { id: 3, base: 'T-A', offset: 0.6 },
    { id: 4, base: 'C-G', offset: 0.85 },
    { id: 5, base: 'A-T', offset: 0.2 },
    { id: 6, base: 'G-C', offset: 0.5 },
    { id: 7, base: 'C-G', offset: 0.75 },
    { id: 8, base: 'T-A', offset: 0.95 },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0a0d18] via-[#0d1424] to-[#070a12] border border-amber-500/20 p-5 md:p-7 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      {/* Top Status Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
            Yamanaka Reprogramming Matrix // OSK Protocol
          </span>
        </div>
        <button
          onClick={onOpenCitation}
          className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-amber-500/30 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 transition-colors flex items-center space-x-1.5 cursor-pointer group"
        >
          <Eye size={12} className="text-amber-400 group-hover:scale-110 transition-transform" />
          <span>ER-100 Trial Data [120]</span>
        </button>
      </div>

      {/* 3D DNA Helix Microscopic Chamber */}
      <div className="relative z-10 my-2 h-72 md:h-80 flex items-center justify-center">
        {/* Dynamic Glowing OSK Golden Particle Wave */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse at ${polishProgress}% 50%, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.1) 45%, transparent 75%)`
          }}
        />

        {/* Animated Sweep Line for OSK Polish */}
        {isAutoPolishing && (
          <motion.div
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent pointer-events-none z-30 blur-sm"
            style={{ left: `${polishProgress - 12}%` }}
          />
        )}

        {/* High-Contrast 3D Vector DNA Double Helix */}
        <div className="relative w-full max-w-[360px] h-full flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 360 260" fill="none">
            <defs>
              {/* Pristine Youthful Cyan Strand Gradient */}
              <linearGradient id="pristineStrand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
              </linearGradient>

              {/* Aged Methylated Dark Strand */}
              <linearGradient id="agedStrand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#475569" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.7" />
              </linearGradient>

              {/* Golden OSK Wave Particle Gradient */}
              <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="1" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>
              
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Helical Grid Glow */}
            <rect x="20" y="20" width="320" height="220" rx="16" fill="#060913" stroke="#1e293b" strokeWidth="1" />

            {/* DNA Strand Wave A (Sine Wave) */}
            <path
              d="M 40 130 C 80 50, 120 50, 160 130 C 200 210, 240 210, 280 130 C 300 90, 320 90, 340 130"
              stroke={polishProgress > 50 ? "url(#pristineStrand)" : "url(#agedStrand)"}
              strokeWidth={polishProgress > 50 ? "4" : "3"}
              strokeLinecap="round"
              filter={polishProgress > 50 ? "url(#glowFilter)" : "none"}
              className="transition-all duration-500"
            />

            {/* DNA Strand Wave B (Cosine Inverse Wave) */}
            <path
              d="M 40 130 C 80 210, 120 210, 160 130 C 200 50, 240 50, 280 130 C 300 170, 320 170, 340 130"
              stroke={polishProgress > 50 ? "url(#pristineStrand)" : "url(#agedStrand)"}
              strokeWidth={polishProgress > 50 ? "4" : "3"}
              strokeLinecap="round"
              filter={polishProgress > 50 ? "url(#glowFilter)" : "none"}
              className="transition-all duration-500"
            />

            {/* Nucleotide Base Pair Rungs */}
            {[
              { x: 60, y1: 95, y2: 165, name: 'A-T', methylated: true },
              { x: 100, y1: 75, y2: 185, name: 'C-G', methylated: true },
              { x: 140, y1: 105, y2: 155, name: 'G-C', methylated: false },
              { x: 180, y1: 155, y2: 105, name: 'T-A', methylated: true },
              { x: 220, y1: 185, y2: 75, name: 'A-T', methylated: true },
              { x: 260, y1: 165, y2: 95, name: 'C-G', methylated: true },
              { x: 300, y1: 110, y2: 150, name: 'G-C', methylated: false },
            ].map((rung, index) => {
              // Check if polished past this rung's X position
              const rungProgress = ((rung.x - 40) / 280) * 100;
              const isPolished = polishProgress >= rungProgress;

              return (
                <g key={index} className="transition-all duration-300">
                  {/* The Connection Rung */}
                  <line
                    x1={rung.x}
                    y1={rung.y1}
                    x2={rung.x}
                    y2={rung.y2}
                    stroke={isPolished ? '#22d3ee' : '#475569'}
                    strokeWidth={isPolished ? '2.5' : '1.5'}
                    strokeDasharray={isPolished ? 'none' : '3 2'}
                  />

                  {/* Nucleotide Dots */}
                  <circle
                    cx={rung.x}
                    cy={rung.y1}
                    r={isPolished ? 5 : 3.5}
                    fill={isPolished ? '#06b6d4' : '#64748b'}
                    filter={isPolished ? 'url(#glowFilter)' : 'none'}
                  />
                  <circle
                    cx={rung.x}
                    cy={rung.y2}
                    r={isPolished ? 5 : 3.5}
                    fill={isPolished ? '#10b981' : '#64748b'}
                    filter={isPolished ? 'url(#glowFilter)' : 'none'}
                  />

                  {/* Methyl Group "Scratches" (Disappear when polished) */}
                  {rung.methylated && !isPolished && (
                    <g transform={`translate(${rung.x + 4}, ${(rung.y1 + rung.y2) / 2})`}>
                      <circle r="6" fill="#ef4444" opacity="0.85" className="animate-pulse" />
                      <text x="0" y="3" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                        -CH₃
                      </text>
                    </g>
                  )}

                  {/* Golden Stardust Burst when Polishing happens */}
                  {isPolished && (
                    <g transform={`translate(${rung.x}, ${(rung.y1 + rung.y2) / 2})`}>
                      <circle r="4" fill="url(#goldGlow)" opacity="0.9" />
                      <circle r="1.5" fill="#ffffff" />
                    </g>
                  )}
                </g>
              );
            })}

            {/* Active Golden OSK Wavefront Line */}
            {polishProgress > 0 && polishProgress < 100 && (
              <g transform={`translate(${40 + (polishProgress / 100) * 280}, 130)`}>
                <line x1="0" y1="-85" x2="0" y2="85" stroke="#fbbf24" strokeWidth="2.5" filter="url(#glowFilter)" />
                <circle r="8" fill="#f59e0b" opacity="0.6" className="animate-ping" />
                <circle r="4" fill="#ffffff" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Biological Clock Live Gauge & Yamanaka Factors Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
        {/* Bio Age Dial Card */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Epigenetic Biological Age</div>
            <div className="text-2xl font-black text-amber-400 font-mono tracking-tight flex items-baseline gap-1">
              {biologicalAge} <span className="text-xs text-slate-400 font-normal">years old</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
            {polishProgress}%
          </div>
        </div>

        {/* Reprogramming Factors Selector */}
        <div className="md:col-span-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase mb-1">
            <span>Reprogramming Cues (Nobel Prize Subset)</span>
            <span className="text-emerald-400">Safe Trio (Excludes Myc)</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: 'oct4', name: 'Oct4', role: 'Pluripotency Pioneer' },
              { id: 'sox2', name: 'Sox2', role: 'Chromatin Uncoiler' },
              { id: 'klf4', name: 'Klf4', role: 'Epigenetic Restorer' },
            ].map((f) => (
              <div 
                key={f.id} 
                className="flex-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/30 flex items-center justify-between"
              >
                <span className="text-xs font-mono font-bold text-amber-300">{f.name}</span>
                <CheckCircle2 size={12} className="text-emerald-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Polish Slider & Rejuvenate Button */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Sparkles size={13} className="text-amber-400" />
              Epigenetic Scratch Polish (OSK Expression Sweep):
            </span>
            <span className="font-bold text-amber-400">{polishProgress}% Cleared</span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={polishProgress}
              onChange={(e) => {
                setPolishProgress(Number(e.target.value));
                if (onInteraction) onInteraction();
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Aged Cell (Methylation Noise)</span>
            <span>OSK Induction</span>
            <span>Youthful Factory Setting</span>
          </div>
        </div>

        {/* Fact Card & Human Clinical Trial Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-sans">
            <ShieldCheck size={16} className="text-cyan-400 flex-shrink-0" />
            <span>Underlying DNA Sequence remains <strong>100% unaltered</strong>.</span>
          </div>

          <button
            onClick={handleTriggerPolish}
            disabled={isAutoPolishing}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={13} className={isAutoPolishing ? 'animate-spin' : ''} />
            <span>{isAutoPolishing ? 'Reprogramming...' : 'Reboot to Factory Youth'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DNAEpigeneticPolishIllustration;
