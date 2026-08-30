import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, AlertCircle, HeartPulse, Flame, Disc, CheckCircle, Clock } from 'lucide-react';

interface CrisisFirefighterIllustrationProps {
  onInteraction?: () => void;
}

export const CrisisFirefighterIllustration: React.FC<CrisisFirefighterIllustrationProps> = ({ onInteraction }) => {
  // Timeline slider: 0 (Early Subclinical wear, asymptomatic) to 100 (Late Acute Crisis)
  const [timelinePoint, setTimelinePoint] = useState<number>(75);
  const [isAlertTriggered, setIsAlertTriggered] = useState<boolean>(true);

  const isCrisisState = timelinePoint >= 60;
  const subclinicalWear = Math.round(timelinePoint * 0.95);
  const reactiveInterventionPower = isCrisisState ? 98 : 35;

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#110c14] via-[#0f111a] to-[#080a10] border border-rose-500/25 p-5 md:p-7 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Ambient Red Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #f43f5e 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />

      {/* Top Header / Status Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isCrisisState ? 'bg-rose-500 animate-ping' : 'bg-slate-500'}`} />
          <span className="text-[11px] font-mono uppercase tracking-widest text-rose-400 font-semibold">
            Paradigm 01 // Reactive Emergency Model
          </span>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border flex items-center space-x-1.5 ${
          isCrisisState 
            ? 'bg-rose-950/60 border-rose-500/40 text-rose-300' 
            : 'bg-slate-900 border-slate-700 text-slate-400'
        }`}>
          <ShieldAlert size={12} className={isCrisisState ? 'animate-pulse' : ''} />
          <span>{isCrisisState ? 'Acute Crisis Deployed (Late)' : 'Silent Wear Accumulating'}</span>
        </div>
      </div>

      {/* 3D Stylized Low-Profile Red Emergency Shield Stage */}
      <div className="relative z-10 my-2 h-72 md:h-80 flex items-center justify-center">
        <div className="relative w-full max-w-[340px] md:max-w-[380px] h-full flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 360 260" fill="none">
            <defs>
              {/* Emergency Red Shield Gradient */}
              <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#be123c" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#090d16" stopOpacity="0.8" />
              </linearGradient>

              {/* Glowing Laser Alert Ring */}
              <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Subclinical Noise Gradient */}
              <linearGradient id="wearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>

            {/* Background Radar Sweeper Rings */}
            <circle cx="180" cy="130" r="110" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="180" cy="130" r="80" stroke="#1e293b" strokeWidth="1" />
            <circle cx="180" cy="130" r="50" stroke="#334155" strokeWidth="1" />

            {/* Radar Crosshairs */}
            <line x1="70" y1="130" x2="290" y2="130" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="180" y1="20" x2="180" y2="240" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />

            {/* Stylized Low-Profile Emergency Shield (Machined Vector) */}
            <g transform="translate(180, 125)">
              {/* Outer Defense Halo */}
              <path
                d="M 0 -85 L 65 -50 L 65 25 C 65 65, 30 85, 0 100 C -30 85, -65 65, -65 25 L -65 -50 Z"
                fill="url(#shieldFill)"
                stroke={isCrisisState ? '#f43f5e' : '#475569'}
                strokeWidth={isCrisisState ? '2.5' : '1.5'}
                filter={isCrisisState ? 'url(#redGlow)' : 'none'}
                className="transition-all duration-500"
              />

              {/* Inner Shield Core Layer */}
              <path
                d="M 0 -70 L 50 -40 L 50 20 C 50 52, 22 68, 0 80 C -22 68, -50 52, -50 20 L -50 -40 Z"
                fill="#070a12"
                stroke={isCrisisState ? '#fb7185' : '#334155'}
                strokeWidth="1.5"
              />

              {/* Emergency Cross / Pulse Beacon at Core */}
              <g>
                {/* Vertical Bar */}
                <rect x="-6" y="-32" width="12" height="64" rx="4" fill={isCrisisState ? '#f43f5e' : '#475569'} />
                {/* Horizontal Bar */}
                <rect x="-26" y="-12" width="52" height="24" rx="4" fill={isCrisisState ? '#f43f5e' : '#475569'} />

                {/* Central Vital Sparkle */}
                {isCrisisState && (
                  <circle cx="0" cy="0" r="14" fill="#ffffff" opacity="0.3" className="animate-ping" />
                )}
                <circle cx="0" cy="0" r="4" fill="#ffffff" />
              </g>

              {/* Late Detection Warning Rays */}
              {isCrisisState && (
                <>
                  <line x1="0" y1="-85" x2="0" y2="-105" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
                  <line x1="65" y1="-50" x2="85" y2="-65" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
                  <line x1="-65" y1="-50" x2="-85" y2="-65" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
                </>
              )}
            </g>

            {/* Silent Wear Progression Bar at Bottom of Stage */}
            <g transform="translate(40, 235)">
              <rect x="0" y="0" width="280" height="6" rx="3" fill="#1e293b" />
              <rect 
                x="0" 
                y="0" 
                width={(timelinePoint / 100) * 280} 
                height="6" 
                rx="3" 
                fill="url(#wearGradient)" 
                className="transition-all duration-300"
              />
              <text x="0" y="-5" fill="#64748b" fontSize="8" fontFamily="monospace">
                SILENT SUBCLINICAL ACCUMULATION
              </text>
              <text x="280" y="-5" fill={isCrisisState ? "#f43f5e" : "#64748b"} fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                CRISIS THRESHOLD
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Metaphor Analogy Strip */}
      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 my-3 flex items-start space-x-2.5">
        <div className="w-6 h-6 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-rose-400">
          <Disc size={13} />
        </div>
        <div className="text-xs text-slate-300 leading-snug">
          <strong className="text-white">The Analogy:</strong> Traditional medicine is like waiting for a CD to become heavily scratched before trying to play it. It extinguishes the fire brilliantly, but does not prevent the scratches.
        </div>
      </div>

      {/* Interactive Disease Progression Slider */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <AlertCircle size={13} className={isCrisisState ? 'text-rose-400' : 'text-slate-400'} />
              Disease Timeline vs. Late Intervention:
            </span>
            <span className={`font-bold ${isCrisisState ? 'text-rose-400' : 'text-slate-400'}`}>
              {timelinePoint < 40 ? 'Early Silent Wear (Years 0-10)' : timelinePoint < 70 ? 'Midlife Subclinical Drift' : 'Late Acute Emergency'}
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={timelinePoint}
              onChange={(e) => {
                setTimelinePoint(Number(e.target.value));
                if (onInteraction) onInteraction();
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Silent Wear (Asymptomatic)</span>
            <span>Subclinical Damage</span>
            <span>Emergency Room Intervention</span>
          </div>
        </div>

        {/* Live Gauges */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Acute Crisis Care</div>
            <div className="text-base font-bold text-emerald-400">
              100% Elite
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Silent Wear Prevention</div>
            <div className="text-base font-bold text-rose-400">
              0% (Reactive)
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase">Hardware Damage</div>
            <div className={`text-base font-bold ${subclinicalWear > 60 ? 'text-rose-400' : 'text-amber-400'}`}>
              {subclinicalWear}% Accumulated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisFirefighterIllustration;
