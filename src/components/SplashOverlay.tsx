import React, { useState, useEffect, useRef, useCallback } from 'react';

const PAIN_POINTS = [
  {
    number: "01",
    headline: "Silent Physiological Deterioration",
    detail: "50% of incidental lung nodules and cardiac strain go completely undetected in reactive healthcare until emergency crisis. Proactive cellular maintenance and early diagnostics give you the sovereign power to halt degradation.",
    badge: "⚠️ SILENT CRISIS",
    stormPhase: "Critical Biological Warning",
    ambientLight: "rgba(30, 8, 15, 0.35)",
    isEmergency: true
  },
  {
    number: "02",
    headline: "Accelerated Sarcopenia & Frailty",
    detail: "After age 30, muscle mass and mitochondrial efficiency decline up to 8% per decade without targeted mechanical stimulus. Sarcopenia is the silent precursor to metabolic dysfunction and lost autonomy.",
    badge: "📉 MUSCLE LOSS RADAR",
    stormPhase: "Heavy Thunder Rolls",
    ambientLight: "rgba(25, 8, 15, 0.30)",
    isEmergency: false
  },
  {
    number: "03",
    headline: "The Broken 'Sick-Care' Framework",
    detail: "Traditional medicine waits for irreversible organ damage before offering treatment. Proactive care stops the fire before it starts with targeted cellular maintenance and biomarkers.",
    badge: "💸 REACTIVE COST",
    stormPhase: "Electromagnetic Tension",
    ambientLight: "rgba(20, 8, 15, 0.28)",
    isEmergency: false
  },
  {
    number: "04",
    headline: "Epigenetic Software Corruption",
    detail: "90% of how quickly you age is dictated by daily cellular software signals—not static genetics. Your habits rewrite your DNA reader daily.",
    badge: "🧬 EPIGENETIC REALITY",
    stormPhase: "System Recalibration",
    ambientLight: "rgba(15, 10, 20, 0.25)",
    isEmergency: false
  },
  {
    number: "05",
    headline: "The Biological Age Choice",
    detail: "You can manage your cellular baseline and vital hardware today—or manage chronic illness and loss of independence tomorrow. The power to reverse your biological trajectory starts now.",
    badge: "⏳ THE TIME WINDOW",
    stormPhase: "Dawn Horizon Emerging",
    ambientLight: "rgba(10, 15, 23, 0.20)",
    isEmergency: false
  },
  {
    number: "06",
    headline: "Small Consistent Gains for Your Health Journey",
    detail: "Transformation happens through consistency. Our curated apothecary and gear are selected to remove friction from your daily routines—making small health wins effortless.",
    badge: "🌿 LOW-FRICTION TOOLS",
    stormPhase: "Clear Dawn Light Breaking",
    ambientLight: "rgba(2, 6, 23, 0.15)",
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

  // Background Image Path Fallbacks for awakeningstorm.png (Desktop Landscape)
  const possiblePaths = [
    '/assets/images/shop/awakeningstorm.png',
    '/assets/images/awakeningstorm.png',
    '/assets/awakeningstorm.png',
    '/assets/images/blog/awakeningstorm.png'
  ];
  const [bgPathIndex, setBgPathIndex] = useState(0);

  // Background Image Path Fallbacks for awakeningstorm-mobile.png (Mobile 9:16 Portrait)
  const possibleMobilePaths = [
    '/assets/awakeningstorm-mobile.png',
    '/assets/images/awakeningstorm-mobile.png',
    '/assets/images/shop/awakeningstorm-mobile.png',
    '/assets/awakeningstorm-mobile.jpg'
  ];
  const [bgMobilePathIndex, setBgMobilePathIndex] = useState(0);

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

  // Dismiss handler
  const handleDismiss = useCallback(() => {
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
  }, []);

  // Step navigation controls
  const handleNext = useCallback(() => {
    if (currentIndex < PAIN_POINTS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleDismiss();
    }
  }, [currentIndex, handleDismiss]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleSelectStep = useCallback((index: number) => {
    if (index >= 0 && index < PAIN_POINTS.length) {
      setCurrentIndex(index);
    }
  }, []);

  // 10-second timer per step, resetting cleanly if user switches manually
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
    }, 8000); // 8 seconds per slide as requested

    return () => clearInterval(interval);
  }, [isMounted, isDismissing, hasStarted, currentIndex, handleDismiss]);

  // Touch swipe support for mobile navigation
  const touchStartXRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;
    if (diffX > 45) {
      // Swiped left -> next
      handleNext();
    } else if (diffX < -45) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartXRef.current = null;
  };

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

        /* Mobile-calibrated drift & scale to ensure nodes stay framed */
        @keyframes stormDriftAndZoomMobile {
          0% {
            transform: scale(1.0) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.05) translate3d(-0.6%, -0.6%, 0);
          }
          100% {
            transform: scale(1.0) translate3d(0, 0, 0);
          }
        }

        .animate-storm-drift {
          animation: stormDriftAndZoom 24s ease-in-out infinite alternate;
          will-change: transform;
        }

        @media (max-width: 767px) {
          .animate-storm-drift {
            animation: stormDriftAndZoomMobile 20s ease-in-out infinite alternate;
          }
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

        /* Dynamic Urgency Quote Chromatic Shimmer */
        @keyframes urgentQuoteCycle {
          0%, 100% {
            color: #ffffff;
            text-shadow: 0 0 14px rgba(255, 255, 255, 0.95), 0 0 28px rgba(244, 63, 94, 0.6);
          }
          33% {
            color: #fef08a;
            text-shadow: 0 0 16px rgba(254, 240, 138, 0.95), 0 0 32px rgba(245, 158, 11, 0.7);
          }
          66% {
            color: #a5f3fc;
            text-shadow: 0 0 16px rgba(165, 243, 252, 0.95), 0 0 32px rgba(6, 182, 212, 0.7);
          }
        }

        /* High-Urgency Emergency Strobe / Color Flash for 'Zero excuses. Zero delays. Make today Day One.' */
        @keyframes urgentWarningFlash {
          0%, 100% {
            color: #ffffff;
            text-shadow: 0 0 12px rgba(255, 255, 255, 1), 0 0 25px rgba(244, 63, 94, 0.95), 0 0 45px rgba(225, 29, 72, 0.75);
          }
          20% {
            color: #ff3b5c;
            text-shadow: 0 0 16px rgba(255, 59, 92, 1), 0 0 35px rgba(225, 29, 72, 0.95), 0 0 55px rgba(159, 18, 57, 0.85);
          }
          40% {
            color: #fbbf24;
            text-shadow: 0 0 16px rgba(251, 191, 36, 1), 0 0 35px rgba(245, 158, 11, 0.95), 0 0 55px rgba(217, 119, 6, 0.85);
          }
          60% {
            color: #22d3ee;
            text-shadow: 0 0 16px rgba(34, 211, 238, 1), 0 0 35px rgba(6, 182, 212, 0.95), 0 0 55px rgba(14, 165, 233, 0.85);
          }
          80% {
            color: #f43f5e;
            text-shadow: 0 0 16px rgba(244, 63, 94, 1), 0 0 35px rgba(225, 29, 72, 0.95), 0 0 55px rgba(190, 18, 60, 0.85);
          }
        }

        /* Dynamic Border & Glow Shift for Emergency Badge */
        @keyframes urgentBadgeBorder {
          0%, 100% {
            border-color: rgba(244, 63, 94, 0.7);
            box-shadow: 0 0 25px rgba(244, 63, 94, 0.45), inset 0 0 14px rgba(244, 63, 94, 0.25);
          }
          33% {
            border-color: rgba(251, 191, 36, 0.8);
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.5), inset 0 0 14px rgba(251, 191, 36, 0.3);
          }
          66% {
            border-color: rgba(34, 211, 238, 0.8);
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.5), inset 0 0 14px rgba(34, 211, 238, 0.3);
          }
        }

        /* Cardiac Heartbeat Pulse Motion */
        @keyframes cardiacPulse {
          0%, 100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.035);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.02);
          }
          60% {
            transform: scale(1);
          }
        }

        .animate-urgent-quote {
          animation: urgentQuoteCycle 4s ease-in-out infinite;
        }

        .animate-urgent-flash {
          animation: urgentWarningFlash 2.4s ease-in-out infinite;
        }

        .animate-urgent-badge {
          animation: urgentBadgeBorder 2.4s ease-in-out infinite, cardiacPulse 2.4s ease-in-out infinite;
        }

        /* Procedural Volumetric Smoky Cloud Keyframes */
        @keyframes smokeRollFloor {
          0% {
            transform: translate3d(-3%, 2%, 0) scale(1.0);
          }
          50% {
            transform: translate3d(3%, -2%, 0) scale(1.08);
          }
          100% {
            transform: translate3d(-3%, 2%, 0) scale(1.0);
          }
        }

        @keyframes smokeBillowLeft {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1.0);
          }
          33% {
            transform: translate3d(3%, -2%, 0) rotate(2deg) scale(1.07);
          }
          66% {
            transform: translate3d(-2%, 2%, 0) rotate(-1.5deg) scale(0.96);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1.0);
          }
        }

        @keyframes smokeBillowRight {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1.0);
          }
          33% {
            transform: translate3d(-3%, 2%, 0) rotate(-2deg) scale(1.06);
          }
          66% {
            transform: translate3d(2%, -3%, 0) rotate(1.5deg) scale(0.97);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1.0);
          }
        }

        @keyframes mistRisingStreamer {
          0% {
            transform: translate3d(-2%, 6%, 0) scale(0.95);
            opacity: 0.15;
          }
          50% {
            transform: translate3d(2%, -4%, 0) scale(1.1);
            opacity: 0.45;
          }
          100% {
            transform: translate3d(-2%, 6%, 0) scale(0.95);
            opacity: 0.15;
          }
        }

        .animate-smoke-floor {
          animation: smokeRollFloor 22s ease-in-out infinite;
          will-change: transform;
        }

        .animate-smoke-left {
          animation: smokeBillowLeft 28s ease-in-out infinite;
          will-change: transform;
        }

        .animate-smoke-right {
          animation: smokeBillowRight 32s ease-in-out infinite;
          will-change: transform;
        }

        .animate-mist-rising {
          animation: mistRisingStreamer 18s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Main Overlay Fixed Screen Container: Pins 100% of viewport without collapsing */}
      <div
        className={`fixed inset-0 z-[100] bg-slate-950 w-full w-screen h-full h-screen min-h-[100vh] min-h-[100dvh] transition-all duration-1000 select-none overflow-hidden ${
          isDismissing 
            ? 'opacity-0 scale-110 blur-3xl pointer-events-none' 
            : 'opacity-100 scale-100'
        } ${isShaking ? 'animate-thunder-shake' : ''}`}
      >
        {/* Animated Awakening Storm Background Layer (Fixed full screen, responsive mobile 9:16 portrait + desktop 16:9 landscape) */}
        <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          {/* Base Awakening Storm Image (Responsive: 9:16 portrait on mobile, 16:9 landscape on desktop) */}
          <picture className="w-full h-full block">
            <source
              media="(max-width: 767px)"
              srcSet={possibleMobilePaths[bgMobilePathIndex]}
            />
            <img
              src={possiblePaths[bgPathIndex]}
              alt="Awakening Storm"
              className="w-full h-full object-cover object-center animate-storm-drift transform-gpu transition-all duration-1000"
              style={{
                filter: `brightness(${1.12 + progressRatio * 0.28}) contrast(${1.12 - progressRatio * 0.12}) saturate(${1.2 + progressRatio * 0.2})`
              }}
              onError={() => {
                if (bgPathIndex < possiblePaths.length - 1) {
                  setBgPathIndex((prev) => prev + 1);
                }
                if (bgMobilePathIndex < possibleMobilePaths.length - 1) {
                  setBgMobilePathIndex((prev) => prev + 1);
                }
              }}
            />
          </picture>

          {/* SVG Definitions for Procedural Atmospheric Cloud Turbulence & Warp */}
          <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <defs>
              <filter id="cloudDisplacementFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="3" seed="9" result="noise">
                  <animate attributeName="baseFrequency" dur="24s" values="0.012 0.016; 0.018 0.022; 0.010 0.014; 0.012 0.016" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="flankTurbulenceFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.009 0.013" numOctaves="3" seed="15" result="noiseFlank">
                  <animate attributeName="baseFrequency" dur="30s" values="0.009 0.013; 0.015 0.019; 0.008 0.011; 0.009 0.013" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noiseFlank" scale="28" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Animated Atmospheric Smoky Clouds & Mist Layers */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* 1. Rolling Floor Cumulus Smoke & Electric Base Vapor */}
            <div 
              className={`absolute -bottom-[10%] -left-[15%] w-[130%] h-[55%] animate-smoke-floor transform-gpu transition-all duration-300 pointer-events-none ${
                lightningFlashLevel > 0 ? 'brightness-175 opacity-90' : 'opacity-70'
              }`}
              style={{
                filter: 'url(#cloudDisplacementFilter) blur(18px)',
                background: `
                  radial-gradient(ellipse at 50% 85%, rgba(6, 182, 212, 0.42) 0%, rgba(14, 165, 233, 0.18) 40%, transparent 72%),
                  radial-gradient(circle at 30% 70%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.12) 48%, transparent 70%),
                  radial-gradient(circle at 72% 75%, rgba(56, 189, 248, 0.32) 0%, rgba(2, 6, 23, 0.6) 55%, transparent 78%),
                  radial-gradient(ellipse at 50% 95%, rgba(2, 6, 23, 0.85) 0%, rgba(15, 23, 42, 0.5) 50%, transparent 80%)
                `,
                mixBlendMode: 'screen'
              }}
            />

            {/* 2. Deep Floor Cloud Shadows (Creates thick volumetric darkness rolling between glowing crests) */}
            <div 
              className="absolute -bottom-[5%] -left-[10%] w-[120%] h-[45%] animate-smoke-floor transform-gpu pointer-events-none opacity-50"
              style={{
                filter: 'url(#cloudDisplacementFilter) blur(22px)',
                background: `
                  radial-gradient(ellipse at 40% 80%, rgba(2, 6, 23, 0.95) 0%, rgba(15, 23, 42, 0.55) 45%, transparent 75%),
                  radial-gradient(ellipse at 65% 85%, rgba(10, 15, 30, 0.9) 0%, transparent 70%)
                `,
                mixBlendMode: 'multiply'
              }}
            />

            {/* 3. Left Flank Billowing Storm Clouds (Gold Backlit & Thunder Deepening) */}
            <div 
              className={`absolute top-[18%] -left-[18%] w-[58%] h-[75%] animate-smoke-left transform-gpu transition-all duration-300 pointer-events-none ${
                lightningFlashLevel > 0 ? 'brightness-160 opacity-85' : 'opacity-65'
              }`}
              style={{
                filter: 'url(#flankTurbulenceFilter) blur(16px)',
                background: `
                  radial-gradient(ellipse at 35% 55%, rgba(251, 191, 36, 0.32) 0%, rgba(245, 158, 11, 0.15) 38%, transparent 72%),
                  radial-gradient(ellipse at 20% 40%, rgba(6, 182, 212, 0.28) 0%, rgba(3, 105, 161, 0.1) 45%, transparent 68%),
                  radial-gradient(circle at 45% 70%, rgba(254, 240, 138, 0.22) 0%, transparent 60%)
                `,
                mixBlendMode: 'screen'
              }}
            />

            {/* 4. Right Flank Billowing Storm Clouds (Neon Cyan & Golden Lightning Fringe) */}
            <div 
              className={`absolute top-[18%] -right-[18%] w-[58%] h-[75%] animate-smoke-right transform-gpu transition-all duration-300 pointer-events-none ${
                lightningFlashLevel > 0 ? 'brightness-160 opacity-85' : 'opacity-65'
              }`}
              style={{
                filter: 'url(#flankTurbulenceFilter) blur(16px)',
                background: `
                  radial-gradient(ellipse at 65% 55%, rgba(251, 191, 36, 0.30) 0%, rgba(245, 158, 11, 0.14) 40%, transparent 72%),
                  radial-gradient(ellipse at 80% 42%, rgba(56, 189, 248, 0.32) 0%, rgba(14, 165, 233, 0.12) 46%, transparent 70%),
                  radial-gradient(circle at 55% 68%, rgba(6, 182, 212, 0.24) 0%, transparent 62%)
                `,
                mixBlendMode: 'screen'
              }}
            />

            {/* 5. Rising Atmospheric Core Mist / Vapor Streamers (Rising gently up the body) */}
            <div 
              className="absolute bottom-[20%] left-[25%] w-[50%] h-[55%] animate-mist-rising transform-gpu pointer-events-none"
              style={{
                filter: 'blur(24px)',
                background: `
                  radial-gradient(ellipse at 50% 60%, rgba(165, 243, 252, 0.22) 0%, rgba(56, 189, 248, 0.10) 45%, transparent 75%),
                  radial-gradient(ellipse at 50% 40%, rgba(254, 240, 138, 0.14) 0%, transparent 65%)
                `,
                mixBlendMode: 'color-dodge'
              }}
            />
          </div>

          {/* Cinematic Red / Crimson Hue Layers: Imbues the image with vivid red vitality without darkening */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-color transition-opacity duration-1000"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.72) 0%, rgba(225, 29, 72, 0.65) 50%, rgba(190, 18, 60, 0.72) 100%)',
              opacity: hasStarted ? Math.max(0.35, 0.85 - progressRatio * 0.5) : 0.85
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-1000"
            style={{
              background: 'radial-gradient(ellipse at 50% 45%, rgba(244, 63, 94, 0.35) 0%, rgba(225, 29, 72, 0.2) 55%, transparent 80%)',
              opacity: hasStarted ? Math.max(0.2, 0.6 - progressRatio * 0.4) : 0.6
            }}
          />

          {/* Soft Atmospheric Vignette (keeps image bright and clearly visible) */}
          <div 
            className="absolute inset-0 transition-all duration-1000 pointer-events-none"
            style={{
              background: hasStarted
                ? `radial-gradient(ellipse at center, ${current.ambientLight} 0%, rgba(2, 6, 23, ${0.68 - progressRatio * 0.35}) 100%)`
                : 'radial-gradient(ellipse at center, rgba(30, 8, 15, 0.15) 0%, rgba(15, 5, 10, 0.38) 60%, rgba(2, 6, 23, 0.62) 100%)'
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

          {/* Atmospheric Perimeter Shading (Subtle top & bottom framing, keeping center bright) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40 pointer-events-none" />
        </div>

        {/* Interactive Content Layer: Full height flex column with touch swipe & safe-area paddings */}
        <div
          onTouchStart={hasStarted ? handleTouchStart : undefined}
          onTouchEnd={hasStarted ? handleTouchEnd : undefined}
          className="relative z-10 w-full h-full flex flex-col justify-between overflow-x-hidden overflow-y-auto p-3.5 sm:p-6 md:p-12"
          style={{
            paddingTop: 'max(0.875rem, env(safe-area-inset-top, 0.875rem))',
            paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom, 0.875rem))',
            paddingLeft: 'max(0.875rem, env(safe-area-inset-left, 0.875rem))',
            paddingRight: 'max(0.875rem, env(safe-area-inset-right, 0.875rem))'
          }}
        >
          {/* Top Header: Logo, Mute Button & Skip Button */}
        <div className="shrink-0 relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-ping shrink-0 shadow-[0_0_12px] ${
              hasStarted && currentIndex === 0 ? 'bg-rose-400 shadow-rose-400/80' : 'bg-cyan-400 shadow-cyan-400/80'
            }`} />
            <span className="text-[11px] sm:text-xs font-black tracking-wider sm:tracking-widest text-slate-200 uppercase drop-shadow truncate">
              123<span className={hasStarted && currentIndex === 0 ? 'text-rose-400' : 'text-cyan-400'}>THENEXTLEVEL</span>
            </span>

            {/* First-Frame Store Header Pill (Prominent & Visible across all viewports) */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1 rounded-full bg-slate-900/90 border border-emerald-400/50 text-emerald-300 text-[10px] sm:text-xs font-bold backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.35)] ml-1 sm:ml-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-black tracking-wide whitespace-nowrap">🌿 Sovereign Apothecary</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline text-slate-300 font-normal">Curated tools for small daily wins</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dedicated Mute / Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1.5 sm:gap-2 shadow-xl backdrop-blur-md cursor-pointer ${
                isMuted
                  ? 'bg-rose-950/60 border-rose-500/60 text-rose-300 hover:bg-rose-900/60 shadow-rose-900/40'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-white shadow-slate-950/60'
              }`}
              title={isMuted ? "Click to unmute sound" : "Click to mute sound"}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              <span className="text-xs sm:text-sm">{isMuted ? '🔇' : '🔊'}</span>
              <span className="hidden xs:inline sm:inline">{isMuted ? 'Unmute' : 'Mute'}</span>
              <span className="hidden md:inline"> Sound</span>
            </button>

            {/* Skip / Enter Portal Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-white text-[11px] sm:text-xs font-bold transition-all shadow-2xl backdrop-blur-md flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
            >
              <span className="hidden sm:inline">Enter Portal</span>
              <span className="sm:hidden">Skip</span>
              <span>➔</span>
              <span className="hidden md:inline text-[10px] text-slate-400 group-hover:text-cyan-400">(Skip)</span>
            </button>
          </div>
        </div>

        {/* Center Content Wrapper */}
        <div className="relative z-10 max-w-3xl mx-auto w-full my-auto py-3 sm:py-6 flex flex-col justify-center min-h-0">
          {!hasStarted ? (
            /* Initial Start Gate */
            <div className="w-full text-center space-y-4 sm:space-y-6 px-2 sm:px-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-md">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>⚡ Sovereign Healthspan Diagnostics ⚡</span>
              </div>

              <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  Press here to seriously improve your <span className="text-cyan-400 underline decoration-cyan-500/60 underline-offset-4 sm:underline-offset-8">Health</span>
                </h1>
                
                {/* High-Urgency Callout Section with Color-Flashing Alert Typography & Cardiac Pulse */}
                <div className="pt-1 sm:pt-2 flex flex-col items-center gap-2.5 sm:gap-3.5">
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] px-2 max-w-xl animate-urgent-quote">
                    &ldquo;The best time to start was yesterday. The second best time is today.&rdquo;
                  </p>
                  
                  {/* Flashing Emergency Telemetry Badge */}
                  <div className="inline-flex items-center justify-center flex-wrap gap-1.5 sm:gap-2.5 px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-2xl sm:rounded-full bg-slate-950/80 border border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.4)] backdrop-blur-md animate-urgent-badge">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                    <span className="font-black text-xs sm:text-sm md:text-base tracking-wider sm:tracking-widest uppercase animate-urgent-flash">
                      Zero excuses. Zero delays. Make today Day One.
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary START Button (Unlocks Audio on Click!) */}
              <div className="pt-2 sm:pt-4 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handleStartExperience}
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full xs:w-auto max-w-sm sm:max-w-none px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-black text-xs sm:text-base md:text-lg tracking-wider uppercase shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_rgba(6,182,212,0.9)] transform hover:scale-105 active:scale-95 cursor-pointer text-center"
                >
                  <span className="text-base sm:text-xl group-hover:animate-bounce">⚡</span>
                  <span className="truncate">Click Here to Make Today Day 1</span>
                  <span className="text-base sm:text-xl">➔</span>
                </button>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-[11px] sm:text-xs text-slate-400 hover:text-cyan-400 hover:underline cursor-pointer transition-colors pt-1"
                >
                  Or skip directly to 123TheNextLevel website ➔
                </button>
              </div>
            </div>
          ) : (
            /* Warning Sequence (3 Steps, 10s each = 30s total) */
            <div className="w-full text-center space-y-3 sm:space-y-4 md:space-y-5 px-1 sm:px-4">
              
              {/* Progress Dots with Clearing Status */}
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {PAIN_POINTS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectStep(idx);
                      }}
                      className="py-2 px-1 focus:outline-none cursor-pointer group"
                      aria-label={`Jump to point ${item.number}`}
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          idx === currentIndex 
                            ? idx === 0 
                              ? 'w-10 sm:w-12 bg-rose-500 shadow-lg shadow-rose-500/80' 
                              : 'w-10 sm:w-12 bg-cyan-400 shadow-lg shadow-cyan-400/80' 
                            : idx < currentIndex
                              ? 'w-4 sm:w-5 bg-cyan-800/60 group-hover:bg-cyan-600'
                              : 'w-2.5 sm:w-3 bg-slate-700/80 group-hover:bg-slate-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className={`text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase font-semibold ${
                  currentIndex === 0 ? 'text-rose-400/90' : 'text-cyan-400/80'
                }`}>
                  Status: {current.stormPhase}
                </span>
              </div>

              {/* Glowing Warning Badge & Step Counter */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest backdrop-blur-md transition-all ${
                currentIndex === 0
                  ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.35)] animate-pulse'
                  : currentIndex === PAIN_POINTS.length - 1
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.35)]'
                    : 'bg-amber-500/15 border border-amber-500/35 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
              }`}>
                <span className="truncate">{current.badge}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">{current.number} / {String(PAIN_POINTS.length).padStart(2, '0')}</span>
              </div>

              {/* Biometric EKG Heartbeat Pulse Waveform (Featured on Frame 01) */}
              {currentIndex === 0 && (
                <div className="flex flex-col items-center justify-center gap-1 py-0.5 sm:py-1">
                  <svg className="w-40 sm:w-56 h-5 sm:h-7 text-rose-400 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" viewBox="0 0 240 40" fill="none">
                    <path
                      className="animate-ecg"
                      d="M 0,20 L 45,20 L 55,20 L 64,4 L 75,36 L 84,10 L 93,26 L 100,20 L 140,20 L 149,20 L 158,4 L 169,36 L 178,10 L 187,26 L 194,20 L 240,20"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest text-rose-400/80 uppercase">
                    Biometric Telemetry: Urgent Intervention Window Active
                  </span>
                </div>
              )}

              {/* Flashing Headline & Detail with Cross-Fade */}
              <div key={currentIndex} className="splash-cross-fade space-y-2.5 sm:space-y-4 min-h-0 sm:min-h-[160px] flex flex-col justify-center">
                <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-snug sm:leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] px-2">
                  {current.headline}
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-normal sm:font-medium px-2">
                  {current.detail}
                </p>

                {/* Climax Apothecary Spotlight on Slide 06 */}
                {currentIndex === PAIN_POINTS.length - 1 && (
                  <div className="pt-1 sm:pt-2 flex flex-col items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-md animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                      <span className="text-xs sm:text-sm font-black text-emerald-300 tracking-wide uppercase">
                        🌿 Sovereign Apothecary • Curated Longevity Gear Active
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quote & Subtext */}
              <p className={`text-[10px] sm:text-xs font-bold drop-shadow uppercase tracking-wider sm:tracking-widest px-2 ${
                currentIndex === 0 ? 'text-rose-400' : currentIndex === PAIN_POINTS.length - 1 ? 'text-emerald-300' : 'text-cyan-300'
              }`}>
                {currentIndex === 0 
                  ? '⚡ You are not helpless. Reclaim command of your biology today.'
                  : currentIndex === PAIN_POINTS.length - 1
                    ? '🌿 Small daily wins compound into sovereign healthspan longevity.'
                    : 'Biological aging increases silently every day. Proactive health starts now.'}
              </p>

              {/* Step Navigation Controls for Mobile & Desktop */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  disabled={currentIndex === 0}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border flex items-center gap-1 ${
                    currentIndex === 0
                      ? 'opacity-30 border-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white cursor-pointer shadow-md'
                  }`}
                  aria-label="Previous warning"
                >
                  <span>←</span>
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border shadow-lg cursor-pointer flex items-center gap-1.5 ${
                    currentIndex === 0
                      ? 'bg-rose-950/80 hover:bg-rose-900 border-rose-500/60 text-rose-200 hover:text-white'
                      : 'bg-cyan-950/80 hover:bg-cyan-900 border-cyan-500/60 text-cyan-200 hover:text-white'
                  }`}
                  aria-label={currentIndex === PAIN_POINTS.length - 1 ? 'Enter website' : 'Next warning'}
                >
                  <span>{currentIndex === PAIN_POINTS.length - 1 ? 'Enter Portal' : 'Next Warning'}</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Prominent High-Visibility Sovereign Apothecary & Gear Showcase Footer Bar */}
        <div className="shrink-0 relative z-10 max-w-6xl mx-auto w-full my-1 sm:my-2 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-teal-950/80 border border-emerald-400/50 shadow-[0_0_35px_rgba(16,185,129,0.25)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.35)] shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="text-emerald-300 font-black text-xs sm:text-sm tracking-wider uppercase">
                🌿 Sovereign Apothecary &amp; Gear
              </span>
            </div>
            <p className="text-slate-100 font-medium text-xs sm:text-sm leading-relaxed drop-shadow">
              Simple, friction-reducing tools to support your daily habits and stack small health wins.
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span>Shop Quick Wins</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default SplashOverlay;
