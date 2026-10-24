import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Flame, ShieldCheck, CheckCircle2, Shield, X } from 'lucide-react';

export const DiagnosticRoadmap: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isOnboardingVideoOpen, setIsOnboardingVideoOpen] = useState(false);
  const [isDualTrackVideoOpen, setIsDualTrackVideoOpen] = useState(false);
  const [isDualTrackCardVideoPlaying, setIsDualTrackCardVideoPlaying] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <section className="relative z-10 bg-slate-950 py-16 md:py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* PHASE 1.5: HOMEPAGE MINDSET TRIGGER SECTION */}
        {/* ========================================================================= */}
        <div className="relative z-10" id="mindset-trigger">
          {/* Ambient Background Glows */}
          <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-[450px] h-[300px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-6xl mx-auto text-center space-y-10">
            {/* 1. Centered Header */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <ShieldAlert size={14} className="text-cyan-400" />
                <span>SYSTEMIC ALIGNMENT CHECK</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1] uppercase">
                Still Running the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300">
                  Old Healthcare System?
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
                Traditional medicine is a firefighter — great for emergencies, useless for prevention. It waits for symptoms. By then, the damage is already done.
              </p>
            </div>

            {/* 2. Side-by-Side System Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Left Card: (lg:col-span-5) - The Legacy System */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#220d18] via-[#160d15] to-[#0a070c] border border-rose-500/40 hover:border-rose-500/70 shadow-[0_0_40px_rgba(244,63,94,0.18)] flex flex-col justify-between space-y-6 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]">
                {/* Thematic Ambient Flame & Emergency Hazard Glows */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_left,rgba(244,63,94,0.22),transparent_65%)] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.12),transparent_60%)] pointer-events-none" />
                
                {/* Glowing Top Hazard Alert Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 via-red-400 to-amber-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]" />

                <div className="space-y-5 relative z-10">
                  {/* Top Row: Title & Status Label */}
                  <div className="flex items-center justify-between gap-2 border-b border-rose-950/80 pb-3.5">
                    <div>
                      <span className="text-[10px] font-mono text-rose-400/90 uppercase tracking-widest block font-bold">
                        Reactive Dead-End
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-black text-white flex items-center gap-2 mt-0.5">
                        <span className="text-rose-500">❌</span>
                        <span>THE LEGACY SYSTEM</span>
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[9px] font-mono font-bold uppercase tracking-wider flex-shrink-0 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                      OFF CRITICAL PATH
                    </span>
                  </div>

                  {/* Metric Box */}
                  <div className="p-3.5 rounded-2xl bg-[#2a0d16]/70 border border-rose-500/30 flex items-center justify-between shadow-inner">
                    <div>
                      <div className="text-xl font-display font-black text-rose-400">0% Predictive</div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Waits for System Failure</div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                      <Flame size={18} />
                    </div>
                  </div>

                  {/* Key Bullets as Glassmorphic Alert Cards */}
                  <div className="space-y-3 pt-1">
                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-rose-900/50 hover:border-rose-500/40 transition-colors flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-sm">
                      <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                        ✕
                      </div>
                      <span>Waits for symptoms, not signals</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-rose-900/50 hover:border-rose-500/40 transition-colors flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-sm">
                      <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                        ✕
                      </div>
                      <span>One diagnostic snapshot a year — blind the other 364 days</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-rose-900/50 hover:border-rose-500/40 transition-colors flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-sm">
                      <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                        ✕
                      </div>
                      <span>Rewards treating breakdowns, not preventing them</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-rose-900/50 hover:border-rose-500/40 transition-colors flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-sm">
                      <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                        ✕
                      </div>
                      <span>Damage accumulates silently until the system fails</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-rose-950/80 flex items-center justify-between text-[11px] font-mono text-rose-400/90 relative z-10">
                  <span>Emergency Crisis Care Only</span>
                  <span className="text-rose-400 font-bold">0% Trajectory</span>
                </div>
              </div>

              {/* Right Card: (lg:col-span-7) - The Critical Path */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#072430] via-[#091829] to-[#040e1a] border border-cyan-400/60 hover:border-cyan-300 ring-1 ring-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col justify-between space-y-6 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]">
                {/* Thematic Optical Laser Scan & Vitality Ambient Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.28),transparent_65%)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.18),transparent_60%)] pointer-events-none" />
                
                {/* Glowing Top Optical Laser Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

                <div className="space-y-5 relative z-10">
                  {/* Top Row: Title & Status Label */}
                  <div className="flex items-center justify-between gap-2 border-b border-cyan-950/80 pb-3.5">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block font-bold">
                        The Proactive Path Today
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-black text-white flex items-center gap-2 mt-0.5">
                        <span className="text-emerald-400">✅</span>
                        <span>THE CRITICAL PATH</span>
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-400/25 border border-cyan-400/60 text-cyan-200 text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      ACTIVE PROGRAM
                    </span>
                  </div>

                  {/* Metric Box */}
                  <div className="p-3.5 rounded-2xl bg-cyan-950/50 border border-cyan-400/40 flex items-center justify-between shadow-inner">
                    <div>
                      <div className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-300">
                        1.8x Healthspan
                      </div>
                      <div className="text-[10px] font-mono text-cyan-200/90 uppercase tracking-wider font-semibold">
                        Continuous Hardware Defense & Longevity Trajectory
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.4)]">
                      <ShieldCheck size={22} />
                    </div>
                  </div>

                  {/* Key Bullets as Glassmorphic Cards with Glowing Badges */}
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-950/70 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all flex items-start gap-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <strong className="text-white block font-bold text-sm">Predictive, not reactive</strong>
                        <span className="text-slate-300 text-xs">Monitors early baseline trends before subclinical damage accumulates.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-950/70 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all flex items-start gap-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <strong className="text-white block font-bold text-sm">Tracks daily trends, not annual snapshots</strong>
                        <span className="text-slate-300 text-xs">Continuous metabolic tracking and sleep autonomic engineering in real-time.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-950/70 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all flex items-start gap-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <strong className="text-white block font-bold text-sm">Protect your BODY now — so it's still running when the cure arrives</strong>
                        <span className="text-slate-300 text-xs">Preserves cellular machinery today to safely cross the bridge to tomorrow's age-reversal software.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-cyan-950/80 flex items-center justify-between text-[11px] font-mono text-cyan-300 font-bold relative z-10">
                  <span>Active Daily Biological Sovereignty</span>
                  <span className="text-cyan-400">100% Critical Path</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 2: DUAL-TRACK PERFORMANCE ARCHITECTURE */}
        {/* ========================================================================= */}
        <div className="mt-24 pt-16 border-t border-white/5" id="strategy">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-wellness-amber block mb-2">The Optimization Strategy</span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white leading-tight">
              Dual-Track Performance Framework
            </h2>
            <p className="text-slate-400 text-sm max-w-[60ch] mx-auto mt-2 leading-relaxed">
              Optimizing human healthspan requires balancing precise, high-end quarterly biomarkers with actionable daily micro-habits.
            </p>
          </div>

          {/* The Dual-Track Teaser Card */}
          <div className="bg-slate-950 border border-cyan-500/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden transition-all duration-500 hover:border-cyan-500/20 text-left shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] space-y-8">
            {/* Background gradient radial glow */}
            <div className="absolute -top-48 -right-48 w-96 h-96 bg-wellness-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Symmetrical Header Layout - 2 Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-slate-800/80 pb-8 relative z-10 items-center">
              {/* Column 1: Title and Badges */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-wellness-cyan/10 border border-wellness-cyan/30 text-wellness-cyan-light font-bold">
                    Performance Framework
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold">
                    Vetted Hardware Hub
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display uppercase tracking-tight text-white font-black leading-tight">
                  The Dual-Track Performance Framework
                </h3>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsDualTrackVideoOpen(true)}
                    className="group inline-flex items-center gap-2.5 p-1.5 px-4 rounded-full bg-slate-900/60 border border-slate-800 hover:border-wellness-cyan/50 hover:bg-slate-900 transition-all cursor-pointer shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-wellness-cyan to-indigo-600 flex items-center justify-center text-white relative">
                      <span className="absolute inset-0 rounded-full bg-wellness-cyan/30 animate-ping scale-110"></span>
                      <svg className="w-2.5 h-2.5 ml-0.5 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-white uppercase tracking-wider font-mono">
                      ▶ Watch Clinical Briefing • 60s
                    </span>
                  </button>
                </div>
              </div>

              {/* Column 2: Video Player Integration */}
              <div className="w-full">
                <div 
                  className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video relative group/card-video shadow-lg cursor-pointer"
                  onMouseEnter={() => { if (!isTouchDevice) setIsDualTrackCardVideoPlaying(true); }}
                  onMouseLeave={() => { if (!isTouchDevice) setIsDualTrackCardVideoPlaying(false); }}
                  onClick={() => setIsDualTrackCardVideoPlaying(true)}
                >
                  {isDualTrackCardVideoPlaying ? (
                    <video
                      className="w-full h-full object-cover aspect-video"
                      src="https://res.cloudinary.com/dbhpaqnq8/video/upload/v1785146306/startingline_vefnde.mp4"
                      controls
                      autoPlay
                    />
                  ) : (
                    <div className="w-full h-full relative flex items-center justify-center bg-black group">
                      {/* Cover Image */}
                      <img 
                        src="/assets/stop-guessing.jpg" 
                        alt="Dual-Track Framework Cover" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card-video:scale-105 brightness-[0.7] contrast-[1.05]"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
                      
                      {/* Hover action overlay indicator */}
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-wellness-cyan to-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover/card-video:scale-110 active:scale-95 transition-all duration-300 border border-wellness-cyan/30">
                          <svg className="w-6 h-6 ml-0.5 text-white drop-shadow-[0_2px_6px_rgba(6,182,212,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                          </svg>
                        </div>
                        <span className="text-[10px] font-bold text-slate-300 font-mono tracking-wider uppercase bg-slate-950/60 border border-slate-800 px-3 py-1 rounded-full backdrop-blur-sm">
                          {isTouchDevice ? 'Tap to play briefing' : 'Hover to play briefing'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Centered Written Companion Philosophy Text */}
            <div className="relative z-10 text-center py-2">
              <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed font-light">
                Eighty to ninety percent of how quickly you age is governed by your daily lifestyle choices, not your raw genetics. The Dual-Track Performance Framework balances precise, clinical-grade diagnostics with immediate, daily micro-habits to rewrite your biological trajectory.
              </p>
            </div>

            {/* Side-by-Side Bento Teaser Grid Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
              {/* Left Column: Diagnostics */}
              <div className="space-y-4 p-6 rounded-2xl bg-slate-950/40 border border-slate-900 text-left">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <h4 className="text-sm font-display uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-wellness-cyan"></span>
                    Phase 1: Diagnostic Baseline (Quarterly Map)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Establish your scientific baseline. We map your cellular structures using advanced whole-methylome Epigenetic Age testing and the Lola Vital Check 56 blood panel—designed to be co-evaluated with your local general practitioner.
                </p>
              </div>

              {/* Right Column: Daily Wins */}
              <div className="space-y-4 p-6 rounded-2xl bg-slate-950/40 border border-slate-900 text-left">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <h4 className="text-sm font-display uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-wellness-amber"></span>
                    Phase 2: Simple Daily Habits (Frictionless Wins)
                  </h4>
                </div>
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Your immediate, frictionless Day 1 starting line. Science-backed biophysical and autonomic switches you can execute this second with no equipment, no cost, and no waiting:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-light pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-wellness-cyan font-bold">•</span>
                      <span className="text-slate-300"><strong>10-Minute Mobility Walks</strong> (optimize baseline joint and vascular health)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wellness-cyan font-bold">•</span>
                      <span className="text-slate-300"><strong>Breathing Mindfulness</strong> (instantly down-regulate stress and cortisol)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wellness-cyan font-bold">•</span>
                      <span className="text-slate-300"><strong>Glycemic Snacking</strong> (stabilize blood sugar and protect insulin sensitivity)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy Alignment Bottom Subtitle Banner */}
            <div className="p-4 border border-cyan-500/10 bg-slate-950/60 rounded-2xl text-xs text-slate-300 text-center leading-relaxed font-light max-w-3xl mx-auto relative z-10 flex gap-3.5 items-start">
              <Shield size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-left text-[11px] text-slate-400 leading-relaxed">
                We do not collect, store, or process your sensitive medical data. You retain 100% ownership and control of your biometrics.
              </p>
            </div>

            {/* Decoupled Call to Action (CTA) Bar */}
            <div className="flex flex-col items-center gap-5 pt-2 relative z-30">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Link
                  to="/dual-track"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98] text-center w-full sm:w-auto font-bold cursor-pointer"
                >
                  Explore the Dual-Track Blueprint & Start Day 1 Habits →
                </Link>
              </div>

              {/* Subtle, elegant link to /science */}
              <Link
                to="/science"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-all underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-300 group/bridge-link"
              >
                <span>Discover the Anti-Aging Health Revolution & Molecular Science →</span>
              </Link>
              
              <Link
                to="/clinician-copilot"
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors text-center cursor-pointer"
              >
                🎁 Or, Access the Free Clinician Co-Pilot Workbook &amp; GP Consultation Script →
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Onboarding Video Modal */}
      {isOnboardingVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-slate-700/60 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative">
            <button
              onClick={() => setIsOnboardingVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="aspect-video bg-black flex items-center justify-center">
              <video 
                src="/assets/video/phase-1-onboarding.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-slate-900/60 text-center text-xs text-slate-400 font-mono uppercase tracking-wider">
              Phase 1 Onboarding Briefing: Clinician-First Baseline Setup
            </div>
          </div>
        </div>
      )}

      {/* Dual-Track Video Modal */}
      {isDualTrackVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-slate-700/60 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative">
            <button
              onClick={() => setIsDualTrackVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
             <div className="aspect-video bg-black flex items-center justify-center">
              <video 
                src="https://res.cloudinary.com/dbhpaqnq8/video/upload/v1785146306/startingline_vefnde.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-slate-900/60 text-center text-xs text-slate-400 font-mono uppercase tracking-wider">
              Dual-Track Performance Framework Briefing
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DiagnosticRoadmap;
