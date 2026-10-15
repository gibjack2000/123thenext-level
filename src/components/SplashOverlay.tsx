import React, { useState, useEffect, useRef, useCallback } from 'react';

const PAIN_POINTS = [
  {
    number: "01",
    headline: "A Final Warning About Your Health: You Have the Power to Change It",
    detail: "50% of incidental cardiovascular strain, lung nodules, and metabolic decline go completely undetected in reactive healthcare until emergency crisis. Your biological trajectory is not written in stone—daily cellular stimulus, targeted geroscience, and biomarker monitoring give you the sovereign power to halt degradation and rewrite your biological age today.",
    badge: "🚨 FINAL HEALTHSPAN WARNING",
    stormPhase: "Critical Biological Warning",
    ambientLight: "rgba(15, 23, 42, 0.82)",
    isEmergency: true
  },
  {
    number: "02",
    headline: "Accelerated Decay & The Broken 'Sick-Care' Trap",
    detail: "Traditional medicine waits for irreversible organ damage before offering treatment. After age 30, muscle mass and mitochondrial efficiency decline up to 8% per decade without targeted mechanical stimulus. Sarcopenia is the silent precursor to metabolic dysfunction and lost autonomy. Proactive cellular maintenance and early diagnostics extinguish the fire before it starts.",
    badge: "📉 SICK-CARE VS CELLULAR POWER",
    stormPhase: "Heavy Thunder Rolls",
    ambientLight: "rgba(2, 6, 23, 0.65)",
    isEmergency: false
  },
  {
    number: "03",
    headline: "The Biological Age Choice: Your Future Starts Now",
    detail: "90% of how quickly you age is dictated by daily cellular software signals—not static genetics. Your daily habits, nutrients, and environmental cues rewrite your DNA reader continuously. You can manage your cellular baseline and vital hardware today—or manage chronic illness and loss of independence tomorrow. The power to reverse your biological trajectory starts now.",
    badge: "⏳ THE TIME WINDOW",
    stormPhase: "Clear Dawn Light Breaking",
    ambientLight: "rgba(2, 6, 23, 0.25)",
    isEmergency: false
  }
];

export const SplashOverlay: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);
  const [isMounted, setIsMounted] = useState(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !sessionStorage.getItem('hasSeen123Splash');
    }
    return true;
  });

  // Sound Engine & Mute State (Unmuted by default)
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  isMutedRef.current = isMuted;

  // Dedicated Dramatic Soundtrack Audio instance
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);

  // Dynamic Lightning Flash & Tremor states
  const [lightningFlashLevel, setLightningFlashLevel] = useState<0 | 1 | 2>(0);
  const [isShaking, setIsShaking] = useState(false);
  const [lightningPathIndex, setLightningPathIndex] = useState(0);

  // Background Image Path Fallbacks for awakeningstorm.png
  const possiblePaths = [
    '/assets/images/shop/awakeningstorm.png',
    '/assets/images/awakeningstorm.png',
    '/assets/awakeningstorm.png',
    '/assets/images/blog/awakeningstorm.png'
  ];
  const [bgPathIndex, setBgPathIndex] = useState(0);

  // Active SFX audio instances for clean disposal
  const activeAudiosRef = useRef<HTMLAudioElement[]>([]);

  // Robust HTML5 Audio Player with volume scaling
  const playSoundFile = useCallback((src: string, volume: number = 0.95) => {
    if (isMutedRef.current) return;
    try {
      const audio = new Audio(src);
      audio.volume = Math.max(0, Math.min(1, volume));
      activeAudiosRef.current.push(audio);

      audio.onended = () => {
        activeAudiosRef.current = activeAudiosRef.current.filter((a) => a !== audio);
      };

      audio.play().catch(() => {
        // Handled cleanly
      });
    } catch {
      // Audio playback fallback
    }
  }, []);

  // Trigger lightning strike with visual flash, screen tremor, and thunder roll
  const triggerLightningStrike = useCallback((intensity: number) => {
    // 1. Play thunder audio
    playSoundFile('/assets/audio/thunder.wav', Math.max(0.4, intensity * 0.95));

    // 2. Multi-stage visual lightning flashes
    setLightningPathIndex(Math.floor(Math.random() * 3));
    setLightningFlashLevel(2);
    setIsShaking(true);

    setTimeout(() => {
      setLightningFlashLevel(0);
    }, 70);

    setTimeout(() => {
      setLightningFlashLevel(1);
    }, 120);

    setTimeout(() => {
      setLightningFlashLevel(0);
    }, 220);

    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  }, [playSoundFile]);

  // Check sessionStorage on mount
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeen123Splash');
    if (hasSeenSplash) {
      setIsMounted(false);
    }
  }, []);

  // Trigger lightning sound with thunder roll on EVERY new warning once started!
  useEffect(() => {
    if (!isMounted || isDismissing || !hasStarted) return;

    const intensityLevels = [1.0, 0.85, 0.70];
    const intensity = intensityLevels[currentIndex] ?? 0.85;

    // Trigger visual lightning + thunderclap on warning change
    const strikeTimer = setTimeout(() => {
      triggerLightningStrike(intensity);
    }, 100);

    // If Frame 1, also trigger ominous warning Braaam horn and heartbeat
    if (currentIndex === 0) {
      playSoundFile('/assets/audio/warning-horn.wav', 1.0);
    }

    return () => clearTimeout(strikeTimer);
  }, [currentIndex, isMounted, isDismissing, hasStarted, triggerLightningStrike, playSoundFile]);

  // 30-second sequence timer (10 seconds per step, cycling through all 3 curated warnings)
  useEffect(() => {
    if (!isMounted || isDismissing || !hasStarted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < PAIN_POINTS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          handleDismiss();
          return prev;
        }
      });
    }, 10000); // 10 seconds per frame = 30 seconds total length

    return () => clearInterval(interval);
  }, [isMounted, isDismissing, hasStarted]);

  // Start Experience button click handler (launches dramatic soundtrack & thunder!)
  const handleStartExperience = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setHasStarted(true);

    // 1. Launch continuous dramatic cinematic score in background (31s duration)
    try {
      const music = new Audio('/assets/audio/dramatic-soundtrack.wav');
      music.volume = 0.82;
      musicAudioRef.current = music;
      if (!isMutedRef.current) {
        music.play().catch(() => {});
      }
    } catch {
      // Audio playback fallback
    }

    // 2. Fire initial lightning strike, thunderclap, and warning horn
    triggerLightningStrike(1.0);
    playSoundFile('/assets/audio/warning-horn.wav', 1.0);
  };

  const handleDismiss = () => {
    setIsDismissing(true);

    // Fade out and stop background dramatic music
    if (musicAudioRef.current) {
      try {
        musicAudioRef.current.pause();
      } catch {
        // ignore
      }
      musicAudioRef.current = null;
    }

    // Stop SFX audios
    activeAudiosRef.current.forEach((audio) => {
      try {
        audio.pause();
      } catch {
        // ignore
      }
    });
    activeAudiosRef.current = [];

    try {
      sessionStorage.setItem('hasSeen123Splash', 'true');
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsMounted(false);
    }, 1000); // 1-second cloud-clearing dissolve transition
  };

  // Toggle Mute button handler
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (nextMuted) {
        // Mute both background music and active SFX
        musicAudioRef.current?.pause();
        activeAudiosRef.current.forEach((audio) => {
          try {
            audio.pause();
          } catch {
            // ignore
          }
        });
      } else {
        // Resume dramatic music and fire sample thunder
        musicAudioRef.current?.play().catch(() => {});
        triggerLightningStrike(0.9);
      }
      return nextMuted;
    });
  };

  if (!isMounted) return null;

  const current = PAIN_POINTS[currentIndex];
  const progressRatio = hasStarted ? currentIndex / (PAIN_POINTS.length - 1) : 0;

  return (
    <>
      <style>{`
        /* Cinematic dramatic storm drift & scale */
        @keyframes stormDriftAndZoom {
          0% {
            transform: scale(1.0) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.14) translate3d(-1.5%, -1.2%, 0);
          }
          100% {
            transform: scale(1.0) translate3d(0, 0, 0);
          }
        }

        /* Thunder shockwave / screen tremor on strike */
        @keyframes thunderShockwave {
          0% { transform: translate3d(0, 0, 0) scale(1.0); }
          15% { transform: translate3d(-5px, 3px, 0) scale(1.025); }
          30% { transform: translate3d(5px, -3px, 0) scale(1.02); }
          45% { transform: translate3d(-3px, -2px, 0) scale(1.015); }
          60% { transform: translate3d(3px, 2px, 0) scale(1.008); }
          80% { transform: translate3d(-1px, 1px, 0) scale(1.0); }
          100% { transform: translate3d(0, 0, 0) scale(1.0); }
        }

        /* Smooth text cross-fade between pain points */
        @keyframes splashTextCrossFade {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1.0);
          }
        }

        /* Radiating dawn sun rays breaking through clouds */
        @keyframes dawnRayGlow {
          0%, 100% { opacity: 0.15; transform: rotate(0deg) scale(1.0); }
          50% { opacity: 0.35; transform: rotate(3deg) scale(1.05); }
        }

        /* Heartbeat ECG wave stroke dash pulse */
        @keyframes ecgPulse {
          0% { stroke-dashoffset: 400; opacity: 0.4; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -400; opacity: 0.4; }
        }

        .animate-storm-drift {
          animation: stormDriftAndZoom 24s ease-in-out infinite alternate;
          will-change: transform;
        }

        .animate-thunder-shake {
          animation: thunderShockwave 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        .splash-cross-fade {
          animation: splashTextCrossFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-dawn-rays {
          animation: dawnRayGlow 8s ease-in-out infinite;
        }

        .animate-ecg {
          stroke-dasharray: 400;
          animation: ecgPulse 2.4s ease-in-out infinite;
        }
      `}</style>

      {/* Main Overlay Wrapper: Fully obscuring the website initially, then dissolving cleanly */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-6 md:p-12 transition-all duration-1000 select-none overflow-hidden ${
          isDismissing 
            ? 'opacity-0 scale-110 blur-3xl pointer-events-none' 
            : 'opacity-100 scale-100'
        } ${isShaking ? 'animate-thunder-shake' : ''}`}
      >
        {/* Animated Awakening Storm Background Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Base Awakening Storm Image */}
          <img
            src={possiblePaths[bgPathIndex]}
            alt="Awakening Storm"
            className="w-full h-full object-cover object-center animate-storm-drift transform-gpu transition-all duration-1000"
            style={{
              filter: `brightness(${0.82 + progressRatio * 0.48}) contrast(${1.25 - progressRatio * 0.25}) saturate(${1.0 + progressRatio * 0.3})`
            }}
            onError={() => {
              if (bgPathIndex < possiblePaths.length - 1) {
                setBgPathIndex((prev) => prev + 1);
              }
            }}
          />

          {/* Dynamic Cloud Darkness Wash: Heavy emergency tint at start, gradually clearing */}
          <div 
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at center, ${hasStarted ? current.ambientLight : 'rgba(15, 23, 42, 0.85)'} 0%, rgba(2, 6, 23, ${0.88 - progressRatio * 0.40}) 100%)`
            }}
          />

          {/* Frame 1 Emergency Ambient Red/Crimson Pulse */}
          {hasStarted && currentIndex === 0 && (
            <div className="absolute inset-0 bg-rose-950/25 mix-blend-color-burn animate-pulse pointer-events-none" />
          )}

          {/* Golden & Azure Dawn Rays Breaking Through Clouds on Final Step */}
          {hasStarted && progressRatio >= 0.8 && (
            <div 
              className="absolute inset-0 animate-dawn-rays pointer-events-none transition-opacity duration-1000"
              style={{
                opacity: 0.65,
                background: 'radial-gradient(circle at 50% 30%, rgba(251, 191, 36, 0.25) 0%, rgba(6, 182, 212, 0.18) 45%, transparent 75%)'
              }}
            />
          )}

          {/* Branching SVG Lightning Bolts */}
          {lightningFlashLevel > 0 && (
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-95 transition-opacity duration-75"
              viewBox="0 0 1000 1000" 
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="lightningGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur1" />
                  <feGaussianBlur stdDeviation="16" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {lightningPathIndex === 0 && (
                <>
                  <path
                    d="M 520,0 L 490,180 L 530,220 L 480,390 L 520,440 L 460,650 L 500,720 L 440,950"
                    stroke="#ffffff"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#lightningGlow)"
                  />
                  <path
                    d="M 490,180 L 430,260 L 450,340 M 480,390 L 420,460 L 390,530 M 520,440 L 580,510 L 610,600"
                    stroke="#a5f3fc"
                    strokeWidth="2.5"
                    fill="none"
                    filter="url(#lightningGlow)"
                  />
                </>
              )}

              {lightningPathIndex === 1 && (
                <>
                  <path
                    d="M 320,0 L 360,190 L 330,280 L 390,440 L 350,560 L 410,720 L 370,900"
                    stroke="#ffffff"
                    strokeWidth="4.5"
                    fill="none"
                    filter="url(#lightningGlow)"
                  />
                  <path
                    d="M 360,190 L 420,270 L 460,330 M 390,440 L 460,520 L 480,610 M 350,560 L 290,630 L 270,720"
                    stroke="#67e8f9"
                    strokeWidth="2.5"
                    fill="none"
                    filter="url(#lightningGlow)"
                  />
                </>
              )}

              {lightningPathIndex === 2 && (
                <>
                  <path
                    d="M 710,0 L 680,170 L 730,290 L 670,470 L 720,620 L 660,820 L 700,970"
                    stroke="#ffffff"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#lightningGlow)"
                  />
                  <path
                    d="M 680,170 L 610,240 L 580,330 M 670,470 L 600,540 L 570,640 M 720,620 L 790,700 L 820,790"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    fill="none"
                    filter="url(#lightningGlow)"
                  />
                </>
              )}
            </svg>
          )}

          {/* Lightning Flash Sheet Overlay */}
          {lightningFlashLevel > 0 && (
            <div 
              className={`absolute inset-0 transition-opacity pointer-events-none mix-blend-overlay ${
                lightningFlashLevel === 2 
                  ? 'bg-white/80 duration-75' 
                  : 'bg-cyan-200/45 duration-150'
              }`}
            />
          )}

          {/* Atmospheric Electric Cyan Energy Rim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />
        </div>

        {/* Top Header: Logo, Mute Button & Skip Button */}
        <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full animate-ping shadow-[0_0_12px] ${
              hasStarted && currentIndex === 0 ? 'bg-rose-400 shadow-rose-400/80' : 'bg-cyan-400 shadow-cyan-400/80'
            }`} />
            <span className="text-xs font-black tracking-widest text-slate-200 uppercase drop-shadow">
              123<span className={hasStarted && currentIndex === 0 ? 'text-rose-400' : 'text-cyan-400'}>THENEXTLEVEL</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dedicated Mute / Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all flex items-center gap-2 shadow-xl backdrop-blur-md cursor-pointer ${
                isMuted
                  ? 'bg-rose-950/60 border-rose-500/60 text-rose-300 hover:bg-rose-900/60 shadow-rose-900/40'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-white shadow-slate-950/60'
              }`}
              title={isMuted ? "Click to unmute sound" : "Click to mute sound"}
            >
              <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
              <span>{isMuted ? 'Unmute Sound' : 'Mute Sound'}</span>
            </button>

            {/* Skip / Enter Portal Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="px-4 py-2 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-2xl backdrop-blur-md flex items-center gap-2 group cursor-pointer"
            >
              <span>Enter Portal ➔</span>
              <span className="text-[10px] text-slate-400 group-hover:text-cyan-400">(Skip)</span>
            </button>
          </div>
        </div>

        {/* Center Content: Start Gate OR 3-Step Sequence (10s each = 30s total) */}
        {!hasStarted ? (
          /* Initial Start Gate with Tongue-in-Cheek Message */
          <div className="relative z-10 max-w-2xl mx-auto w-full my-auto text-center space-y-6 px-4">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>⚡ Sovereign Healthspan Diagnostics ⚡</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                Press here to seriously improve your <span className="text-cyan-400 underline decoration-cyan-500/60 underline-offset-8">Health</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-medium">
                A 30-second cinematic briefing with acoustic thunder, dramatic orchestral score, high-stakes medical reality, and the sovereign protocols to rewrite your biological destiny.
              </p>
            </div>

            {/* Primary START Button (Unlocks Audio on Click!) */}
            <div className="pt-4 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={handleStartExperience}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-black text-base md:text-lg tracking-wider uppercase shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_rgba(6,182,212,0.9)] transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="text-xl group-hover:animate-bounce">⚡</span>
                <span>BEGIN EMERGENCY PROTOCOL</span>
                <span className="text-xl">➔</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-cyan-400 hover:underline cursor-pointer transition-colors pt-2"
              >
                Or skip directly to 123TheNextLevel website ➔
              </button>
            </div>
          </div>
        ) : (
          /* Center Flashing Warning Sequence (3 Steps, 10s each = 30s total) */
          <div className="relative z-10 max-w-3xl mx-auto w-full my-auto text-center space-y-5">
            
            {/* Progress Dots with Clearing Status */}
            <div className="flex flex-col items-center gap-2 mb-1">
              <div className="flex items-center justify-center gap-2">
                {PAIN_POINTS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentIndex 
                        ? idx === 0 
                          ? 'w-12 bg-rose-500 shadow-lg shadow-rose-500/80' 
                          : 'w-12 bg-cyan-400 shadow-lg shadow-cyan-400/80' 
                        : idx < currentIndex
                          ? 'w-5 bg-cyan-800/60'
                          : 'w-3 bg-slate-700/80'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-[10px] tracking-widest uppercase font-semibold ${
                currentIndex === 0 ? 'text-rose-400/90' : 'text-cyan-400/80'
              }`}>
                Status: {current.stormPhase} (10s Reading Window)
              </span>
            </div>

            {/* Glowing Warning Badge & Step Counter */}
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md transition-all ${
              currentIndex === 0
                ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.35)] animate-pulse'
                : 'bg-amber-500/15 border border-amber-500/35 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
            }`}>
              <span>{current.badge}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">{current.number} / 03</span>
            </div>

            {/* Biometric EKG Heartbeat Pulse Waveform (Featured on Frame 01) */}
            {currentIndex === 0 && (
              <div className="flex flex-col items-center justify-center gap-1.5 py-1">
                <svg className="w-56 h-7 text-rose-400 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" viewBox="0 0 240 40" fill="none">
                  <path
                    className="animate-ecg"
                    d="M 0,20 L 45,20 L 55,20 L 64,4 L 75,36 L 84,10 L 93,26 L 100,20 L 140,20 L 149,20 L 158,4 L 169,36 L 178,10 L 187,26 L 194,20 L 240,20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[10px] font-bold tracking-widest text-rose-400/80 uppercase">
                  Biometric Telemetry: Urgent Intervention Window Active
                </span>
              </div>
            )}

            {/* Flashing Headline & Detail with Cross-Fade */}
            <div key={currentIndex} className="splash-cross-fade space-y-4 min-h-[170px] flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                {current.headline}
              </h2>
              <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-medium">
                {current.detail}
              </p>
            </div>

            <p className={`text-xs font-bold drop-shadow uppercase tracking-widest ${
              currentIndex === 0 ? 'text-rose-400' : 'text-cyan-300'
            }`}>
              {currentIndex === 0 
                ? '⚡ You are not helpless. Reclaim command of your biology today.'
                : 'Biological aging increases silently every day. Proactive health starts now.'}
            </p>
          </div>
        )}

        {/* Footer & Secondary Skip Link */}
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700/60 pt-4 text-slate-300 text-[11px] backdrop-blur-sm">
          <span>🔒 Sovereign Geroscience Diagnostics & Protocol Portal</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline cursor-pointer transition-colors"
          >
            Click to clear storm & enter 123TheNextLevel immediately ➔
          </button>
        </div>
      </div>
    </>
  );
};

export default SplashOverlay;
