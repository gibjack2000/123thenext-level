import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Flame, Snowflake, Dumbbell, Shield, ArrowUpDown, Clock, CheckCircle, Info } from 'lucide-react';

interface HormesisWaveChartProps {
  onInteraction?: () => void;
}

export const HormesisWaveChart: React.FC<HormesisWaveChartProps> = ({ onInteraction }) => {
  // Wave phase cursor: 0 to 100
  const [cycleCursor, setCycleCursor] = useState<number>(30); // 0-45: Adversity, 45-55: Neutral/Shift, 55-100: Abundance
  const [cycleMode, setCycleMode] = useState<'daily' | 'block'>('daily');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Compute physiological state based on cursor position
  const isAdversity = cycleCursor < 48;
  const isAbundance = cycleCursor >= 52;
  const isTransition = !isAdversity && !isAbundance;

  // Calculate live biochemical pathways
  const autophagyFlux = isAdversity 
    ? Math.round(96 - (cycleCursor / 48) * 35) 
    : Math.max(12, Math.round(45 - ((cycleCursor - 48) / 52) * 33));

  const sirtuinActivity = isAdversity 
    ? Math.round(92 - (cycleCursor / 48) * 30) 
    : Math.max(15, Math.round(40 - ((cycleCursor - 48) / 52) * 25));

  const mtorActivation = isAbundance 
    ? Math.round(45 + ((cycleCursor - 52) / 48) * 51) 
    : Math.max(8, Math.round(35 - (cycleCursor / 48) * 27));

  const proteinSynthesis = isAbundance 
    ? Math.round(50 + ((cycleCursor - 52) / 48) * 46) 
    : Math.max(10, Math.round(30 - (cycleCursor / 48) * 20));

  const handleRunSimulation = () => {
    setIsSimulating(true);
    if (onInteraction) onInteraction();
    let pos = 0;
    setCycleCursor(0);
    const interval = setInterval(() => {
      pos += 2;
      if (pos > 100) {
        setCycleCursor(100);
        setIsSimulating(false);
        clearInterval(interval);
      } else {
        setCycleCursor(pos);
      }
    }, 40);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#090e18] via-[#0d1526] to-[#070a13] border border-cyan-500/20 p-5 md:p-7 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Dynamic Ambient Backdrops */}
      <div 
        className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none transition-opacity duration-500"
        style={{ opacity: isAdversity ? 0.8 : 0.2 }}
      />
      <div 
        className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none transition-opacity duration-500"
        style={{ opacity: isAbundance ? 0.8 : 0.2 }}
      />

      {/* Top Status Strip & Protocol Toggle */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-cyan-400 font-bold">Adversity</span>
            <span className="text-slate-500">⇄</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400 font-bold">Abundance</span>
          </div>
        </div>

        {/* Cadence Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setCycleMode('daily')}
            className={`px-3 py-1 rounded-lg transition-all ${
              cycleMode === 'daily' 
                ? 'bg-slate-800 text-cyan-300 font-bold shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            24h Intermittent (16:8)
          </button>
          <button
            onClick={() => setCycleMode('block')}
            className={`px-3 py-1 rounded-lg transition-all ${
              cycleMode === 'block' 
                ? 'bg-slate-800 text-amber-300 font-bold shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Seasonal Hormetic Block
          </button>
        </div>
      </div>

      {/* Dynamic Dual-Axis Wave Visualization Area */}
      <div className="relative z-10 my-2 h-64 md:h-72 flex flex-col justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" fill="none">
          <defs>
            {/* Deep Cyan Adversity Valley Gradient */}
            <linearGradient id="adversityFill" x1="0" y1="100" x2="0" y2="190" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0e7490" stopOpacity="0.02" />
            </linearGradient>

            {/* Warm Amber Abundance Peak Gradient */}
            <linearGradient id="abundanceFill" x1="0" y1="10" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.02" />
            </linearGradient>

            {/* Wave Line Stroke Gradient */}
            <linearGradient id="waveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="35%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="65%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Baseline & Thresholds */}
          <line x1="20" y1="100" x2="380" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <text x="25" y="94" fill="#64748b" fontSize="8" fontFamily="monospace">EQUILIBRIUM BASELINE</text>
          
          {/* Top Label: Abundance Peak Zone */}
          <text x="375" y="24" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="monospace">
            ▲ ABUNDANCE PEAK (mTOR / Mass)
          </text>
          
          {/* Bottom Label: Adversity Valley Zone */}
          <text x="25" y="185" fill="#22d3ee" fontSize="9" fontWeight="bold" textAnchor="start" fontFamily="monospace">
            ▼ ADVERSITY VALLEY (Autophagy / Cleanse)
          </text>

          {/* Adversity Wave Area (Valley, x: 20 to 200, dipping down to y: 165) */}
          <path
            d="M 20 100 C 65 100, 75 165, 110 165 C 145 165, 155 100, 200 100 Z"
            fill="url(#adversityFill)"
          />

          {/* Abundance Wave Area (Peak, x: 200 to 380, rising up to y: 35) */}
          <path
            d="M 200 100 C 245 100, 255 35, 290 35 C 325 35, 335 100, 380 100 Z"
            fill="url(#abundanceFill)"
          />

          {/* The Continuous Dual-Axis Harmonic Wave Line */}
          <path
            d="M 20 100 C 65 100, 75 165, 110 165 C 145 165, 155 100, 200 100 C 245 100, 255 35, 290 35 C 325 35, 335 100, 380 100"
            stroke="url(#waveStroke)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            filter="url(#waveGlow)"
          />

          {/* Key Milestone Nodes on the Curve */}
          {/* Node 1: Fasting / Sirtuins Peak Valley (x: 110, y: 165) */}
          <g transform="translate(110, 165)">
            <circle r="7" fill="#06b6d4" opacity="0.3" className="animate-ping" />
            <circle r="4.5" fill="#22d3ee" />
            <text x="0" y="20" fill="#22d3ee" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              AUTOPHAGY FLUX
            </text>
          </g>

          {/* Node 2: Muscle & mTOR Peak (x: 290, y: 35) */}
          <g transform="translate(290, 35)">
            <circle r="7" fill="#f59e0b" opacity="0.3" className="animate-ping" />
            <circle r="4.5" fill="#fbbf24" />
            <text x="0" y="-12" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              mTOR ANABOLISM
            </text>
          </g>

          {/* Interactive Cursor Indicator Node */}
          {(() => {
            // Compute coordinate along bezier approximation
            const t = cycleCursor / 100;
            const curX = 20 + t * 360;
            let curY = 100;
            if (t < 0.5) {
              // Valley curve
              const localT = t / 0.5;
              curY = 100 + Math.sin(localT * Math.PI) * 65;
            } else {
              // Peak curve
              const localT = (t - 0.5) / 0.5;
              curY = 100 - Math.sin(localT * Math.PI) * 65;
            }

            return (
              <g transform={`translate(${curX}, ${curY})`}>
                <line x1="0" y1={-curY + 20} x2="0" y2={180 - curY} stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                <circle r="9" fill={t < 0.5 ? "#06b6d4" : "#f59e0b"} opacity="0.4" className="animate-ping" />
                <circle r="5.5" fill="#ffffff" stroke={t < 0.5 ? "#06b6d4" : "#d97706"} strokeWidth="2" />
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Dynamic Phase Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
        {/* Left: Adversity Status */}
        <div className={`p-3.5 rounded-xl border transition-all duration-300 ${
          isAdversity 
            ? 'bg-cyan-950/40 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
            : 'bg-slate-900/40 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Snowflake size={13} />
              </div>
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Adversity Phase
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">
              Autophagy Cleanse
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-slate-400">Sirtuins & AMPK:</span>
              <span className="text-cyan-300 font-bold">{sirtuinActivity}% Active</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-slate-400">Autophagy Protein Sweep:</span>
              <span className="text-cyan-300 font-bold">{autophagyFlux}% Max Flux</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 leading-tight">
              3-day fasting & cold exposure sweep away misfolded aggregates and repair DNA.
            </p>
          </div>
        </div>

        {/* Right: Abundance Status */}
        <div className={`p-3.5 rounded-xl border transition-all duration-300 ${
          isAbundance 
            ? 'bg-amber-950/40 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
            : 'bg-slate-900/40 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Dumbbell size={13} />
              </div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Abundance Phase
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-500/30">
              Rebuilding Mass
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-slate-400">mTOR Anabolic Target:</span>
              <span className="text-amber-300 font-bold">{mtorActivation}% Active</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-slate-400">Muscle & Bone Rebuilding:</span>
              <span className="text-amber-300 font-bold">{proteinSynthesis}% Rate</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 leading-tight">
              Targeted resistance training & plant-forward protein safeguard bone density and VO2 Max.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Hormesis Timeline Scrubber */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Activity size={13} className={isAdversity ? 'text-cyan-400' : 'text-amber-400'} />
              {cycleMode === 'daily' ? 'Circadian Wave Scrubber (Hour 0 to 24):' : 'Seasonal Hormesis Wave (Day 1 to 7):'}
            </span>
            <span className={`font-bold font-mono ${isAdversity ? 'text-cyan-400' : 'text-amber-400'}`}>
              {cycleMode === 'daily' 
                ? `Hour ${Math.round((cycleCursor / 100) * 24)}:00` 
                : `Day ${Math.max(1, Math.ceil((cycleCursor / 100) * 7))}`}
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={cycleCursor}
              onChange={(e) => {
                setCycleCursor(Number(e.target.value));
                if (onInteraction) onInteraction();
              }}
              className="w-full h-2 bg-gradient-to-r from-cyan-600 via-slate-700 to-amber-600 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Fasting & Cold (Adversity)</span>
            <span>Metabolic Shift</span>
            <span>Hypertrophy & Feeding (Abundance)</span>
          </div>
        </div>

        {/* Action Button & Wisdom Summary */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Shield size={15} className="text-cyan-400 flex-shrink-0" />
            <span>Dual-track cycling prevents both cellular clogging and muscle atrophy.</span>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Clock size={13} className={isSimulating ? 'animate-spin' : ''} />
            <span>{isSimulating ? 'Simulating Cycle...' : 'Simulate 24h Hormesis Rhythm'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HormesisWaveChart;
