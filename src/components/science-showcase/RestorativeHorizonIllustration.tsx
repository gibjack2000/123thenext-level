import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Dna, RefreshCw, ShieldCheck, CheckCircle2, Award, Clock, ArrowRight } from 'lucide-react';

interface RestorativeHorizonIllustrationProps {
  onInteraction?: () => void;
  onOpenCitation?: () => void;
}

export const RestorativeHorizonIllustration: React.FC<RestorativeHorizonIllustrationProps> = ({ 
  onInteraction,
  onOpenCitation 
}) => {
  // Restorative wave progress: 0 to 100%
  const [waveProgress, setWaveProgress] = useState<number>(80);
  const [isSweeping, setIsSweeping] = useState<boolean>(false);

  const biologicalAge = Math.round(72 - (waveProgress / 100) * 48); // 72 -> 24 yrs
  const factorySettingsRestored = Math.min(100, Math.round(50 + (waveProgress / 100) * 50));

  const handleTriggerWave = () => {
    setIsSweeping(true);
    if (onInteraction) onInteraction();
    let current = 0;
    setWaveProgress(0);
    const interval = setInterval(() => {
      current += 4;
      if (current >= 100) {
        setWaveProgress(100);
        setIsSweeping(false);
        clearInterval(interval);
      } else {
        setWaveProgress(current);
      }
    }, 40);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#130e16] via-[#101424] to-[#080b14] border border-amber-500/30 p-5 md:p-7 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Golden Stardust Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      {/* Top Header / Status Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
            Paradigm 03 // The Restorative Horizon (~10-Year Destination)
          </span>
        </div>
        <button
          onClick={onOpenCitation}
          className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-amber-500/40 bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.2)]"
        >
          <Award size={12} className="text-amber-400" />
          <span>Nobel OSK Research [120]</span>
        </button>
      </div>

      {/* Gentle Golden Wave Particle Stage */}
      <div className="relative z-10 my-2 h-72 md:h-80 flex items-center justify-center">
        <div className="relative w-full max-w-[360px] md:max-w-[400px] h-full flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 380 260" fill="none">
            <defs>
              {/* Gentle Golden Restorative Particle Wave Gradient */}
              <linearGradient id="goldenWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
              </linearGradient>

              {/* Preserved Hardware Strand Gradient */}
              <linearGradient id="restoredStrand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>

              <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Preserved Biological Hardware Matrix (Preserved by 10-Year Bridge) */}
            <path
              d="M 30 130 C 70 70, 110 70, 150 130 C 190 190, 230 190, 270 130 C 310 70, 350 70, 370 130"
              stroke="url(#restoredStrand)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#goldGlowFilter)"
              className="transition-all duration-500"
            />
            <path
              d="M 30 130 C 70 190, 110 190, 150 130 C 190 70, 230 70, 270 130 C 310 190, 350 190, 370 130"
              stroke="url(#restoredStrand)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#goldGlowFilter)"
              className="transition-all duration-500"
            />

            {/* Nucleotide Base Rungs & Clean Reversal Particles */}
            {[
              { x: 50, y1: 105, y2: 155 },
              { x: 90, y1: 80, y2: 180 },
              { x: 130, y1: 110, y2: 150 },
              { x: 170, y1: 170, y2: 90 },
              { x: 210, y1: 180, y2: 80 },
              { x: 250, y1: 150, y2: 110 },
              { x: 290, y1: 85, y2: 175 },
              { x: 330, y1: 100, y2: 160 },
            ].map((node, i) => {
              const nodeProgress = ((node.x - 30) / 320) * 100;
              const isWaved = waveProgress >= nodeProgress;
              return (
                <g key={i} className="transition-all duration-300">
                  <line
                    x1={node.x}
                    y1={node.y1}
                    x2={node.x}
                    y2={node.y2}
                    stroke={isWaved ? '#fbbf24' : '#06b6d4'}
                    strokeWidth={isWaved ? '2.5' : '1.5'}
                  />
                  <circle cx={node.x} cy={node.y1} r={isWaved ? 5 : 3.5} fill={isWaved ? '#fef08a' : '#22d3ee'} filter="url(#goldGlowFilter)" />
                  <circle cx={node.x} cy={node.y2} r={isWaved ? 5 : 3.5} fill={isWaved ? '#f59e0b' : '#10b981'} filter="url(#goldGlowFilter)" />
                </g>
              );
            })}

            {/* GENTLE GOLDEN WAVE OF RESTORATIVE PARTICLES */}
            <g transform={`translate(${30 + (waveProgress / 100) * 320}, 130)`}>
              {/* Sweeping Golden Wave Crest */}
              <path
                d="M -25 -80 C 15 -40, 15 40, -25 80"
                stroke="url(#goldenWave)"
                strokeWidth="4"
                fill="none"
                filter="url(#goldGlowFilter)"
              />
              <circle r="14" fill="#f59e0b" opacity="0.35" className="animate-ping" />
              <circle r="6" fill="#ffffff" />
              <line x1="0" y1="-85" x2="0" y2="85" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 2" />
            </g>

            {/* Floating Golden Stardust Particles */}
            {[
              { cx: 70, cy: 60, r: 2 },
              { cx: 120, cy: 200, r: 2.5 },
              { cx: 180, cy: 45, r: 2 },
              { cx: 240, cy: 220, r: 2.5 },
              { cx: 300, cy: 50, r: 3 },
            ].map((p, idx) => (
              <circle
                key={idx}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill="#fef08a"
                opacity={waveProgress > 40 ? 0.8 : 0.2}
                className="animate-pulse"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Reboot Metaphor Strip */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 my-3 flex items-start space-x-2.5">
        <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-amber-400">
          <Sparkles size={13} />
        </div>
        <div className="text-xs text-slate-300 leading-snug">
          <strong className="text-white">The Core Truth:</strong> "You cannot reboot a broken computer; you must preserve your hardware today." Proactive bridge habits ensure your physical body is pristine and ready for tomorrow's software.
        </div>
      </div>

      {/* Interactive Restorative Wave Scrubber */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Sparkles size={13} className="text-amber-400" />
              Gentle Golden Wave (OSK Cellular Reprogramming):
            </span>
            <span className="font-bold text-amber-300">{waveProgress}% Polished</span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={waveProgress}
              onChange={(e) => {
                setWaveProgress(Number(e.target.value));
                if (onInteraction) onInteraction();
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Preserved Hardware</span>
            <span>OSK Particle Wave</span>
            <span>Youthful Factory Reboot</span>
          </div>
        </div>

        {/* Live Gauges & Action Button */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Epigenetic Clock</div>
            <div className="text-base font-bold text-amber-400">
              {biologicalAge} Yrs
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Factory Reset</div>
            <div className="text-base font-bold text-emerald-400">
              {factorySettingsRestored}%
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Hardware Ready</div>
            <div className="text-base font-bold text-cyan-300">
              100% Ready
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Clock size={14} className="text-amber-400" />
            <span>Target Lab Horizon: ~2036 Mainstream Rollout</span>
          </div>

          <button
            onClick={handleTriggerWave}
            disabled={isSweeping}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={13} className={isSweeping ? 'animate-spin' : ''} />
            <span>{isSweeping ? 'Rebooting...' : 'Simulate Future Reboot'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestorativeHorizonIllustration;
