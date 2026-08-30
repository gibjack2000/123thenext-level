import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Disc, Zap, AlertTriangle, Sparkles, Activity, Play, Pause } from 'lucide-react';

interface CDLaserIllustrationProps {
  onInteraction?: () => void;
}

export const CDLaserIllustration: React.FC<CDLaserIllustrationProps> = ({ onInteraction }) => {
  const [scratchLevel, setScratchLevel] = useState<number>(35); // 0 (pristine) to 100 (heavy scratches)
  const [isSpinning, setIsSpinning] = useState<boolean>(true);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);

  // Compute fidelity metrics from scratchLevel
  const readingFidelity = Math.max(18, Math.round(100 - scratchLevel * 0.78));
  const epigeneticNoise = Math.min(94, Math.round(scratchLevel * 0.92));
  const cellularStatus = 
    scratchLevel < 25 
      ? { label: 'High Fidelity (Youthful)', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-500/30' }
      : scratchLevel < 65 
        ? { label: 'Cellular Skipping (Middle Age)', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-500/30' }
        : { label: 'Severe Epigenetic Noise (Advanced Age)', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-500/30' };

  const handleCalibrate = () => {
    setIsCalibrating(true);
    if (onInteraction) onInteraction();
    setTimeout(() => {
      setScratchLevel((prev) => Math.max(5, Math.round(prev * 0.25)));
      setIsCalibrating(false);
    }, 900);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#090d16] via-[#0d1424] to-[#080b12] border border-cyan-500/20 p-5 md:p-7 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Background Ambient Glows & Tech Grid */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      {/* Top Header / Status Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/90 font-semibold">
            Optical Epigenome Scanner // v4.2
          </span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border flex items-center space-x-1.5 ${cellularStatus.bg} ${cellularStatus.color}`}>
          <Activity size={12} className="animate-pulse" />
          <span>{cellularStatus.label}</span>
        </div>
      </div>

      {/* 3D Visual Stage */}
      <div className="relative z-10 my-2 h-72 md:h-80 flex items-center justify-center">
        {/* Isometric 3D Container with Perspective */}
        <div className="relative w-full max-w-[340px] md:max-w-[380px] h-full flex items-center justify-center [perspective:1000px]">
          {/* Laser Emitter Apparatus (Top Left) */}
          <div className="absolute top-2 left-8 md:left-12 z-30 flex flex-col items-center">
            {/* Emitter Housing */}
            <div className="w-10 h-7 rounded-lg bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-cyan-400/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              </div>
            </div>
            <div className="text-[9px] font-mono text-cyan-400/80 mt-1 uppercase tracking-tighter">
              Laser Epireader
            </div>
          </div>

          {/* Precision Electric-Cyan Laser Beam */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
            <defs>
              {/* Cyan Laser Gradient */}
              <linearGradient id="cyanLaser" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
              </linearGradient>
              
              {/* Laser Core */}
              <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Holographic Rainbow Sheen for CD */}
              <linearGradient id="holographicSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                <stop offset="25%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.25" />
                <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
              </linearGradient>

              {/* Data Track Pattern */}
              <radialGradient id="cdTracks" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0a101d" />
                <stop offset="22%" stopColor="#0f1a2c" />
                <stop offset="24%" stopColor="#1e293b" />
                <stop offset="45%" stopColor="#0b1320" />
                <stop offset="75%" stopColor="#1e293b" />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0b0f17" />
              </radialGradient>
            </defs>

            {/* Main Collimated Beam from Emitter (x: 80, y: 35) to Disc Read Point (x: 180, y: 160) */}
            <line
              x1="78"
              y1="34"
              x2="178"
              y2="152"
              stroke="url(#cyanLaser)"
              strokeWidth={scratchLevel > 50 ? "3.5" : "2.5"}
              filter="url(#laserGlow)"
              className="transition-all duration-300"
            />
            {/* Inner High-Intensity Core Line */}
            <line
              x1="78"
              y1="34"
              x2="178"
              y2="152"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeDasharray={scratchLevel > 60 ? "6 3" : "none"}
              className="transition-all duration-200"
            />

            {/* Point of Impact Sparkles & Flare on Disc */}
            <g transform="translate(178, 152)">
              <circle r="7" fill="#22d3ee" opacity="0.4" className="animate-ping" />
              <circle r="3.5" fill="#ffffff" filter="url(#laserGlow)" />
              {/* Reflected Laser Flutter Lines (Shows scratch disruption) */}
              {scratchLevel > 20 && (
                <>
                  <line x1="0" y1="0" x2="-20" y2="-18" stroke="#f59e0b" strokeWidth="1" opacity={scratchLevel / 110} />
                  <line x1="0" y1="0" x2="22" y2="-14" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                  <line x1="0" y1="0" x2="-14" y2="12" stroke="#ef4444" strokeWidth="1.2" opacity={scratchLevel / 90} />
                </>
              )}
            </g>
          </svg>

          {/* 3D Tilted Compact Disc Platform */}
          <div 
            className="relative w-64 h-64 md:w-72 md:h-72 [transform:rotateX(62deg)_rotateZ(25deg)] transition-transform duration-700 select-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Outer Drop Glow Ring */}
            <div className="absolute inset-[-14px] rounded-full border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.25)] pointer-events-none" />

            {/* Rotating CD Body */}
            <div 
              className={`relative w-full h-full rounded-full border border-cyan-400/40 shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden ${
                isSpinning ? 'animate-[spin_7s_linear_infinite]' : ''
              }`}
              style={{
                background: 'radial-gradient(circle, #09101f 0%, #0e1726 40%, #16243b 70%, #061e2f 100%)',
              }}
            >
              {/* Concentric Micro-Tracks (Representing 3 Billion Base Pairs of Genetic Hardware) */}
              <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,#0000_0px,#0000_3px,rgba(34,211,238,0.08)_4px,rgba(34,211,238,0.08)_5px)]" />
              
              {/* Iridescent Rainbow Diffraction Layer */}
              <div 
                className="absolute inset-0 rounded-full opacity-60 mix-blend-screen"
                style={{
                  background: 'conic-gradient(from 45deg at 50% 50%, rgba(6,182,212,0.4), rgba(168,85,247,0.3), rgba(245,158,11,0.35), rgba(34,211,238,0.4), rgba(236,72,153,0.3), rgba(6,182,212,0.4))'
                }}
              />

              {/* Data Track Grooves Highlight Rings */}
              <div className="absolute inset-6 rounded-full border border-cyan-400/30" />
              <div className="absolute inset-12 rounded-full border border-indigo-400/25 border-dashed" />
              <div className="absolute inset-20 rounded-full border border-cyan-300/40" />

              {/* Center Spindle & Transparent Clamping Area */}
              <div className="absolute inset-[32%] rounded-full bg-[#050811] border border-cyan-500/50 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">
                <div className="w-7 h-7 rounded-full bg-[#020408] border border-cyan-300/60 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </div>

              {/* Surface Scratches Layer (Epigenetic Noise) */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{ opacity: scratchLevel / 100 }}
              >
                {/* Visual Jagged Scratch Marks across the disc */}
                <div className="absolute top-[18%] left-[20%] w-36 h-[2px] bg-rose-400/80 rotate-[35deg] blur-[0.4px] shadow-[0_0_4px_#f43f5e]" />
                <div className="absolute top-[48%] left-[10%] w-48 h-[1.5px] bg-amber-300/90 -rotate-[15deg] blur-[0.3px]" />
                <div className="absolute bottom-[24%] right-[15%] w-32 h-[2.5px] bg-rose-500/70 rotate-[78deg] shadow-[0_0_5px_#f43f5e]" />
                <div className="absolute top-[60%] left-[30%] w-28 h-[1.5px] bg-white/80 rotate-[110deg]" />
                <div className="absolute bottom-[38%] left-[18%] w-40 h-[2px] bg-rose-400/75 -rotate-[42deg]" />
              </div>
            </div>

            {/* Depth Base for 3D Disc Rim */}
            <div className="absolute inset-0 rounded-full translate-y-2 -z-10 bg-slate-900 border border-slate-700/60 shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Real-time Hardware vs Software Label Guide */}
      <div className="grid grid-cols-2 gap-2 my-3">
        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-400">
            <Disc size={13} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">DNA Hardware</div>
            <div className="text-[10px] text-slate-400 leading-tight">Digital music on disc (Constant, unmutated data)</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-400">
            <Zap size={13} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">Epigenetic Laser</div>
            <div className="text-[10px] text-slate-400 leading-tight">Software reader (Disrupted by surface scratches)</div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Live Metrics Bar */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
        {/* Scratch Slider Control */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <AlertTriangle size={13} className={scratchLevel > 50 ? 'text-amber-400' : 'text-slate-400'} />
              Epigenetic Scratch Simulator (Cellular Aging):
            </span>
            <span className="font-bold text-cyan-400">{scratchLevel}% Damage</span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={scratchLevel}
              onChange={(e) => {
                setScratchLevel(Number(e.target.value));
                if (onInteraction) onInteraction();
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Pristine Youth (0%)</span>
            <span>Midlife Drift (50%)</span>
            <span>Heavy Noise (100%)</span>
          </div>
        </div>

        {/* Live Gauges Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Read Fidelity</div>
            <div className={`text-base font-bold ${readingFidelity > 75 ? 'text-emerald-400' : readingFidelity > 45 ? 'text-amber-400' : 'text-rose-400'}`}>
              {readingFidelity}%
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Playback Noise</div>
            <div className="text-base font-bold text-amber-400">
              {epigeneticNoise} dB
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">DNA Base Integrity</div>
            <div className="text-base font-bold text-cyan-400">
              100% Intact
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => setIsSpinning(!isSpinning)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {isSpinning ? <Pause size={12} /> : <Play size={12} />}
            <span>{isSpinning ? 'Pause Spindle' : 'Spin Spindle'}</span>
          </button>

          <button
            onClick={handleCalibrate}
            disabled={isCalibrating || scratchLevel <= 10}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sparkles size={13} className={isCalibrating ? 'animate-spin' : ''} />
            <span>{isCalibrating ? 'Polishing...' : 'Clean Disc Surface'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CDLaserIllustration;
