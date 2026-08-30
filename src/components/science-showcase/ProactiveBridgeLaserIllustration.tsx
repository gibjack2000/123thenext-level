import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Zap, ShieldCheck, Moon, Activity, Disc, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProactiveBridgeLaserIllustrationProps {
  onInteraction?: () => void;
}

export const ProactiveBridgeLaserIllustration: React.FC<ProactiveBridgeLaserIllustrationProps> = ({ onInteraction }) => {
  // Bridge timeline: Year 0 (Today) to Year 10 (Future Horizon)
  const [bridgeYear, setBridgeYear] = useState<number>(5);
  const [activeTelemetry, setActiveTelemetry] = useState<'daily' | 'sleep' | 'metabolic'>('daily');

  const hardwareIntegrity = 100;
  const scratchesPrevented = Math.min(100, Math.round(92 + (bridgeYear / 10) * 8));
  const decadesBought = (bridgeYear * 1.4).toFixed(1);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#080d18] via-[#0b1322] to-[#070b14] border border-cyan-500/30 p-5 md:p-7 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Dynamic Cyan Laser Atmospheric Glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      {/* Top Header / Status Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-300 font-bold">
            Paradigm 02 // The 10-Year Proactive Bridge (Our Core Mission Today)
          </span>
        </div>
        <div className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 flex items-center space-x-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
          <ShieldCheck size={12} className="text-cyan-400" />
          <span>Hardware Protection: Active</span>
        </div>
      </div>

      {/* Clean Precise Alignment Laser Path Stage */}
      <div className="relative z-10 my-2 h-72 md:h-80 flex items-center justify-center">
        <div className="relative w-full max-w-[360px] md:max-w-[400px] h-full flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 380 260" fill="none">
            <defs>
              {/* Electric Cyan Laser Beam Gradient */}
              <linearGradient id="bridgeLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
              </linearGradient>

              {/* Laser Path Tunnel Glow */}
              <filter id="laserBeamGlow" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Bridge Deck Isometric Grid */}
              <linearGradient id="bridgeDeck" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0b1322" />
                <stop offset="50%" stopColor="#0f1f38" />
                <stop offset="100%" stopColor="#0b1322" />
              </linearGradient>
            </defs>

            {/* 3D Isometric Bridge Deck Platform */}
            <polygon
              points="30,170 350,170 320,225 60,225"
              fill="url(#bridgeDeck)"
              stroke="#1e293b"
              strokeWidth="1.5"
            />
            {/* Bridge Guidance Lines */}
            <line x1="30" y1="170" x2="350" y2="170" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <line x1="60" y1="225" x2="320" y2="225" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />

            {/* Emitter Station (Year 0 - Today) */}
            <g transform="translate(45, 120)">
              <rect x="-15" y="-20" width="30" height="40" rx="8" fill="#0c1626" stroke="#06b6d4" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="6" fill="#22d3ee" className="animate-pulse" />
              <text x="0" y="32" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                TODAY (YR 0)
              </text>
            </g>

            {/* Destination Target Station (Year 10 - Future Reversal Port) */}
            <g transform="translate(335, 120)">
              <rect x="-15" y="-20" width="30" height="40" rx="8" fill="#0c1626" stroke="#06b6d4" strokeWidth="1.5" />
              {/* Preserved Spotless CD Disc in Holder */}
              <circle cx="0" cy="0" r="10" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
              <text x="0" y="32" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                YR 10 HORIZON
              </text>
            </g>

            {/* THE ALIGNMENT LASER PATH (Pristine, Pure, Collimated) */}
            <line
              x1="45"
              y1="120"
              x2="335"
              y2="120"
              stroke="url(#bridgeLaser)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#laserBeamGlow)"
            />
            {/* Ultra-pure core beam */}
            <line
              x1="45"
              y1="120"
              x2="335"
              y2="120"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* 3 Telemetry Optical Alignment Collimators along the Laser Path */}
            {/* Collimator 1: Daily Biomarker Checks (x: 120) */}
            <g transform="translate(120, 120)">
              <circle r="16" fill="#081426" stroke="#22d3ee" strokeWidth="1.5" opacity="0.9" />
              <circle r="19" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="animate-[spin_8s_linear_infinite]" />
              <circle r="4" fill="#38bdf8" />
              <text x="0" y="-24" fill="#e0f2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                DAILY TELEMETRY
              </text>
              <text x="0" y="-16" fill="#7dd3fc" fontSize="6.5" textAnchor="middle" fontFamily="monospace">
                Biomarkers
              </text>
            </g>

            {/* Collimator 2: Sleep Telemetry & Restoration (x: 190) */}
            <g transform="translate(190, 120)">
              <circle r="16" fill="#081426" stroke="#22d3ee" strokeWidth="1.5" opacity="0.9" />
              <circle r="19" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="animate-[spin_8s_linear_infinite]" />
              <circle r="4" fill="#38bdf8" />
              <text x="0" y="24" fill="#e0f2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                SLEEP ARCHITECTURE
              </text>
              <text x="0" y="32" fill="#7dd3fc" fontSize="6.5" textAnchor="middle" fontFamily="monospace">
                HRV / Deep Wave
              </text>
            </g>

            {/* Collimator 3: Metabolic Tracking & Zone 2 (x: 260) */}
            <g transform="translate(260, 120)">
              <circle r="16" fill="#081426" stroke="#22d3ee" strokeWidth="1.5" opacity="0.9" />
              <circle r="19" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="animate-[spin_8s_linear_infinite]" />
              <circle r="4" fill="#38bdf8" />
              <text x="0" y="-24" fill="#e0f2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                METABOLIC PACE
              </text>
              <text x="0" y="-16" fill="#7dd3fc" fontSize="6.5" textAnchor="middle" fontFamily="monospace">
                Mitochondrial Buffer
              </text>
            </g>

            {/* Active Year Progress Cursor along the laser path */}
            {(() => {
              const currentX = 45 + (bridgeYear / 10) * 290;
              return (
                <g transform={`translate(${currentX}, 120)`}>
                  <circle r="12" fill="#06b6d4" opacity="0.4" className="animate-ping" />
                  <circle r="6" fill="#ffffff" stroke="#0891b2" strokeWidth="2" />
                  <line x1="0" y1="8" x2="0" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                  <rect x="-24" y="70" width="48" height="18" rx="4" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
                  <text x="0" y="82" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    YEAR {bridgeYear}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* 3 Telemetry Pillars Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3 font-sans">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400 mt-0.5">
            <Activity size={13} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Daily Biomarkers</div>
            <div className="text-[10px] text-slate-400 leading-tight">Simple home checks prevent silent subclinical drift.</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400 mt-0.5">
            <Moon size={13} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Sleep Telemetry</div>
            <div className="text-[10px] text-slate-400 leading-tight">Deep-wave restoration repairs micro-cellular stress.</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400 mt-0.5">
            <Target size={13} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Metabolic Tracking</div>
            <div className="text-[10px] text-slate-400 leading-tight">Keeps the CD reader pristine & hardware un-scratched.</div>
          </div>
        </div>
      </div>

      {/* Interactive 10-Year Bridge Timeline Scrubber */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Zap size={13} className="text-cyan-400" />
              10-Year Physical Bridge Progress (Protecting Hardware):
            </span>
            <span className="font-bold text-cyan-300 font-mono">Year {bridgeYear} of 10</span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={bridgeYear}
              onChange={(e) => {
                setBridgeYear(Number(e.target.value));
                if (onInteraction) onInteraction();
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Today (Active Mission)</span>
            <span>Mid-Bridge (Year 5)</span>
            <span>Destination: Age Reversal Ready (Year 10)</span>
          </div>
        </div>

        {/* Live Gauges */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">CD Scratches Prevented</div>
            <div className="text-base font-bold text-cyan-300">
              {scratchesPrevented}%
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Healthy Decades Bought</div>
            <div className="text-base font-bold text-emerald-400">
              +{decadesBought} Yrs
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Hardware Preserved</div>
            <div className="text-base font-bold text-cyan-300">
              100% Spotless
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProactiveBridgeLaserIllustration;
