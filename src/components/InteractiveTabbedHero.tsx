import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Stethoscope, 
  BookOpen, 
  ArrowRight, 
  Play, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Download 
} from 'lucide-react';
import { HERO_VIDEOS } from '../config/heroVideos';

export type BulletItem = string | {
  title: string;
  subtext?: string;
};

export interface TabCtaButton {
  text: string;
  link: string;
  isDownload?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
}

export interface TabData {
  id: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  bullets: BulletItem[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  ctaButtons?: TabCtaButton[];
  posterImage: string;
}

export const tabsData: TabData[] = [
  {
    id: 'start-here',
    label: '🚀 Start Here',
    badge: 'FREE LONGEVITY TOOLKIT',
    title: 'Begin Your Longevity Journey Today',
    description: 'Not sure where to start? Use our free diagnostic tools, interactive workbooks and step-by-step blueprints to go from guessing to total biological mastery.',
    bullets: [
      {
        title: '5-Minute Wellness Quiz',
        subtext: 'Diagnose your baseline score across all 6 core longevity protocols in under 5 minutes.'
      },
      {
        title: 'The Clinician Co-Pilot: From Guessing to Knowing',
        subtext: 'Interactive 4-page diagnostic roadmap, Day 1 vitamin stack, 14-day vitals log & printable GP consultation template.'
      },
      {
        title: 'Free Longevity Blueprint (PDF)',
        subtext: 'Our open-access geroscience guide, biological age primer, and 4-week habit tracker.'
      }
    ],
    ctaButtons: [
      {
        text: '🎯 Take 5-Minute Quiz',
        link: '/quiz',
        variant: 'primary'
      },
      {
        text: '🩺 Clinician Co-Pilot Workbook',
        link: '/clinician-copilot',
        variant: 'accent'
      },
      {
        text: '📘 Free Longevity Blueprint (PDF)',
        link: '/assets/docs/the-next-level-lifespan-v7.pdf',
        isDownload: true,
        variant: 'secondary'
      }
    ],
    primaryCtaText: '🎯 Take 5-Minute Quiz',
    primaryCtaLink: '/quiz',
    secondaryCtaText: '🩺 Clinician Co-Pilot Workbook',
    secondaryCtaLink: '/clinician-copilot',
    posterImage: '/longevity_blueprint_cover.png'
  },
  {
    id: 'epigenetics',
    label: '🧬 Epigenetics',
    badge: 'GENOMIC SOVEREIGNTY',
    title: 'Protect Your Biological Hardware',
    description: 'Eighty to ninety percent of cellular aging is dictated by daily metabolic and lifestyle choices—not inherited genetics. Shift from emergency firefighting to proactive biological self-mastery.',
    bullets: [
      '1.8x Healthy Life Expectancy Expansion',
      '▼ 30% Chronic Pathology Risk Reduction',
      'Preserve cellular integrity for future Yamanaka factor therapies'
    ],
    primaryCtaText: 'Explore Epigenetic Science →',
    primaryCtaLink: '/science',
    secondaryCtaText: 'Take 5-Minute Quiz →',
    secondaryCtaLink: '/quiz',
    posterImage: '/assets/epigenetic_vitality_hero_v2.jpg'
  },
  {
    id: 'diagnostics',
    label: '🩸 Diagnostics',
    badge: 'HEALTHSPAN & DIAGNOSTIC RADAR',
    title: 'Healthspan & Diagnostic Radar',
    description: 'Use our free Clinician Co-Pilot Workbook to log your 14-day vitals, select your regional blood panels (ApoB, HbA1c, hs-CRP), and co-evaluate your results with your GP.',
    bullets: [
      'Clinical Blood Panels (ApoB, HbA1c, hs-CRP)',
      '14-Day Vitals Log & Telemetry Tracking',
      'Free 4-Page Clinician Co-Pilot Consultation Workbook'
    ],
    primaryCtaText: 'Open Clinician Co-Pilot ➔',
    primaryCtaLink: '/clinician-copilot',
    secondaryCtaText: 'Explore Diagnostic Radar →',
    secondaryCtaLink: '/guide',
    posterImage: '/gp_consultation_cover.png'
  },
  {
    id: 'mental',
    label: '🧠 Mind & Stress',
    badge: 'MIND & STRESS MANAGEMENT',
    title: 'Breathing Resets, Cortisol & Deep Sleep',
    description: 'Restore autonomic balance and master stress. Use daily breathing resets, down-regulate chronic cortisol, and unlock deep, restorative sleep.',
    bullets: [
      'Breathing Resets & Breathwork',
      'Cortisol Down-Regulation & Deep Sleep',
      '10-Minute NSDR Cognitive Reset Protocols'
    ],
    primaryCtaText: 'Explore Mind & Stress Pillar →',
    primaryCtaLink: '/wellness',
    secondaryCtaText: 'Read Autonomic Guide →',
    secondaryCtaLink: '/blog-post-autonomic-engineering',
    posterImage: '/autonomic_engineering_cover.png'
  },
  {
    id: 'performance',
    label: '⚡ Movement',
    badge: 'PERFORMANCE & MOVEMENT',
    title: 'Home Workouts, VO2 Max & Muscle Mass',
    description: 'Build functional physical hardware. Master home workouts, elevate your VO2 Max, and preserve critical muscle mass to protect against age-related frailty.',
    bullets: [
      'Home Workouts & Resistance Protocols',
      'VO2 Max Conditioning & Zone 2 Endurance',
      'Functional Muscle Mass Preservation'
    ],
    primaryCtaText: 'Explore Performance & Movement →',
    primaryCtaLink: '/fitness',
    secondaryCtaText: 'View Workout Guide →',
    secondaryCtaLink: '/beginner_bodyweight_guide_revised-v3.pdf',
    posterImage: '/performance_biodata_cover.png'
  },
  {
    id: 'nutrition',
    label: '🥗 Nutrition',
    badge: 'METABOLIC NUTRITION',
    title: 'Clean Fuel, Energy & Weight Control',
    description: 'Fuel your biological machinery with metabolic precision. Optimize clean fuel, sustain steady daily energy, and maintain weight control without restrictive dieting.',
    bullets: [
      'Clean Fuel & Whole Foods Nutrition',
      'Sustained Steady Energy & Glucose Stability',
      'Targeted NAD+ Precursors & Weight Control'
    ],
    primaryCtaText: 'Explore Metabolic Nutrition →',
    primaryCtaLink: '/nutrition',
    secondaryCtaText: 'View Master Meal Guide →',
    secondaryCtaLink: '/blog-post-metabolic-nutrition',
    posterImage: '/metabolic_nutrition_cover.png'
  },
  {
    id: 'store',
    label: '🛒 Sovereign Store',
    badge: 'VETTED HARDWARE ENGINE',
    title: 'Clinical Tools & Localized Lab Draws',
    description: 'Access carefully procured diagnostic kits, bio-wearables, NSF-certified supplements, and fitness equipment localized for the US, UK, and Spain.',
    bullets: [
      'Direct Lab Draws (HealthLabs US, Lola UK, Melio Spain)',
      'Bluetooth Smart Scales & Wearable Sensors',
      'NSF-Certified Longevity Supplements & Fitness Gear'
    ],
    primaryCtaText: 'Visit Sovereign Storefront →',
    primaryCtaLink: '/store-us',
    secondaryCtaText: 'Explore Express Catalog →',
    secondaryCtaLink: '/sovereign-express-shopping-catalog',
    posterImage: '/next_level_cover.png'
  }
];

export const InteractiveTabbedHero: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('start-here');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentTab = tabsData.find((t) => t.id === activeTabId) || tabsData[0];
  const videoUrl = HERO_VIDEOS[activeTabId as keyof typeof HERO_VIDEOS];

  // Reset playback and error states when switching tabs
  useEffect(() => {
    setIsPlaying(false);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeTabId, videoUrl]);

  // Hover Handlers
  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {
        // Fallback if browser blocks unmuted playback
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const handleContainerClick = () => {
    if (!isPlaying) {
      handleMouseEnter();
    } else {
      handleMouseLeave();
    }
  };

  const isStreamable = Boolean(videoUrl && videoUrl.includes('streamable.com'));
  const streamableBaseUrl = isStreamable
    ? (videoUrl.includes('/e/')
        ? videoUrl.split('?')[0]
        : videoUrl.replace('streamable.com/', 'streamable.com/e/').split('?')[0])
    : '';

  const resourceCards = [
    {
      id: 'quiz',
      title: '5-Minute Wellness Quiz',
      subtext: 'Diagnose your baseline score across all 6 core longevity protocols in under 5 minutes.',
      meta: '⏱ 5 min',
      badge: 'FREE',
      link: '/quiz',
      icon: Target,
      iconColor: 'text-[#00D4E6]',
      iconBg: 'bg-[#00D4E6]/10 border-[#00D4E6]/30',
      borderHover: 'hover:border-[#00D4E6]/60',
      glowHover: 'hover:shadow-[0_0_28px_rgba(0,212,230,0.2)]',
    },
    {
      id: 'copilot',
      title: 'The Clinician Co-Pilot: From Guessing to Knowing',
      subtext: 'Interactive 4-page diagnostic roadmap, Day 1 vitamin stack, 14-day vitals log & printable GP consultation template.',
      meta: '4 pages · printable',
      badge: 'FREE',
      link: '/clinician-copilot',
      icon: Stethoscope,
      iconColor: 'text-[#8B5CF6]',
      iconBg: 'bg-[#8B5CF6]/10 border-[#8B5CF6]/30',
      borderHover: 'hover:border-[#8B5CF6]/60',
      glowHover: 'hover:shadow-[0_0_28px_rgba(139,92,246,0.2)]',
    },
    {
      id: 'blueprint',
      title: 'Free Longevity Blueprint (PDF)',
      subtext: 'Our open-access geroscience guide, biological age primer, and 4-week habit tracker.',
      meta: 'PDF · instant download',
      badge: 'FREE',
      link: '/assets/docs/the-next-level-lifespan-v7.pdf',
      isDownload: true,
      icon: BookOpen,
      iconColor: 'text-cyan-300',
      iconBg: 'bg-cyan-500/10 border-cyan-400/30',
      borderHover: 'hover:border-cyan-400/60',
      glowHover: 'hover:shadow-[0_0_28px_rgba(6,182,212,0.2)]',
    },
  ];

  return (
    <section 
      className="relative text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #050816 0%, #0A1128 55%, #051c27 100%)'
      }}
    >
      {/* Motion & Interaction Styles */}
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroDriftSlow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.008);
          }
        }

        @keyframes pulseCyanRing {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.15;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.7;
          }
        }

        .hero-fade-1 { animation: heroFadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 0ms both; }
        .hero-fade-2 { animation: heroFadeUp 550ms cubic-bezier(0.16, 1, 0.3, 1) 80ms both; }
        .hero-fade-3 { animation: heroFadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) 160ms both; }
        .hero-fade-4 { animation: heroFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 240ms both; }
        .hero-fade-video { animation: heroFadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both; }

        .hero-drift {
          animation: heroDriftSlow 20s ease-in-out infinite;
        }

        .pulse-ring {
          animation: pulseCyanRing 2.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-1,
          .hero-fade-2,
          .hero-fade-3,
          .hero-fade-4,
          .hero-fade-video,
          .hero-drift,
          .pulse-ring {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Ambient Blurred Glow: Cyan behind heading */}
      <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[520px] h-[360px] bg-[#00D4E6]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Ambient Blurred Glow: Violet behind video panel */}
      <div className="absolute top-24 right-1/4 translate-x-1/4 w-[520px] h-[360px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Faint Biology Motif (Hexagonal Molecular Grid & DNA Nodes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06] hero-drift">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="hex-bio-grid" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
              <path d="M30 0 L60 17.3 L60 52 L30 69.3 L0 52 L0 17.3 Z" fill="none" stroke="#00D4E6" strokeWidth="1" />
              <path d="M30 69.3 L60 86.6 L60 121.3 L30 138.6 L0 121.3 L0 86.6 Z" fill="none" stroke="#8B5CF6" strokeWidth="1" />
              <circle cx="30" cy="0" r="2.5" fill="#00D4E6" />
              <circle cx="60" cy="17.3" r="2" fill="#8B5CF6" />
              <circle cx="30" cy="69.3" r="2.5" fill="#00D4E6" />
              <circle cx="0" cy="17.3" r="2" fill="#8B5CF6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-bio-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Floating Quote */}
        <p className="text-[#00D4E6] text-sm sm:text-base font-medium italic tracking-wide mb-3">
          “The best time to start was yesterday. The second best time is today.”
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white leading-tight font-display">
          You Are the Software Engineer of Your Own Biology.
        </h1>

        {/* Scrollable Tab Navigation Bar */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-8 no-scrollbar border-b border-slate-800/80">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer touch-manipulation focus-visible:ring-2 focus-visible:ring-[#00D4E6] focus:outline-none min-h-[44px] ${
                activeTabId === tab.id
                  ? 'bg-gradient-to-r from-[#00D4E6] to-[#8B5CF6] text-slate-950 shadow-lg shadow-cyan-500/25 scale-105 font-bold'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-5">
            {currentTab.id === 'start-here' ? (
              /* Custom Redesigned Start Here View */
              <>
                {/* Small Cyan Pill Eyebrow */}
                <div className="hero-fade-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#00D4E6] uppercase bg-[#00D4E6]/10 border border-[#00D4E6]/30 px-3.5 py-1 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4E6] animate-pulse" />
                    <span>FREE LONGEVITY TOOLKIT</span>
                  </span>
                </div>

                {/* Larger Heading with Cyan-to-Violet Gradient on "Longevity Journey" */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-display hero-fade-2">
                  Begin Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4E6] via-cyan-300 to-[#8B5CF6]">
                    Longevity Journey
                  </span>{' '}
                  Today
                </h2>

                {/* Higher-Contrast, Tightened Intro */}
                <p className="text-slate-200/90 text-sm sm:text-base leading-relaxed font-light max-w-xl hero-fade-3">
                  Not sure where to start? Use our free diagnostic tools, interactive workbooks and step-by-step blueprints to go from guessing to total biological mastery.
                </p>

                {/* 3 Glassmorphic Resource Cards */}
                <div className="space-y-3 pt-1 hero-fade-3">
                  {resourceCards.map((card) => {
                    const IconComponent = card.icon;
                    const cardMarkup = (
                      <div
                        className={`group relative rounded-[18px] p-4 sm:p-5 bg-white/[0.035] hover:bg-white/[0.06] border border-white/10 ${card.borderHover} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${card.glowHover} flex items-start gap-3.5 sm:gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#00D4E6] focus:outline-none min-h-[44px]`}
                      >
                        {/* Glowing Circular Icon Badge */}
                        <div className={`w-11 h-11 rounded-full ${card.iconBg} border flex-shrink-0 flex items-center justify-center ${card.iconColor} shadow-md group-hover:scale-105 transition-transform mt-0.5`}>
                          <IconComponent size={20} />
                        </div>

                        {/* Card Content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                                {card.title}
                              </h3>
                              <span className="text-[10px] font-mono font-extrabold tracking-wider text-[#00D4E6] uppercase bg-[#00D4E6]/15 border border-[#00D4E6]/30 px-2 py-0.5 rounded-full">
                                {card.badge}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono font-medium text-slate-400 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                              {card.meta}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                            {card.subtext}
                          </p>
                        </div>

                        {/* Sliding Arrow Indicator */}
                        <div className="self-center flex-shrink-0 text-slate-500 group-hover:text-[#00D4E6] group-hover:translate-x-1.5 transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    );

                    return card.isDownload ? (
                      <a
                        key={card.id}
                        href={card.link}
                        download
                        className="block no-underline"
                        aria-label={`${card.title} - ${card.meta}`}
                      >
                        {cardMarkup}
                      </a>
                    ) : (
                      <Link
                        key={card.id}
                        to={card.link}
                        className="block no-underline"
                        aria-label={`${card.title} - ${card.meta}`}
                      >
                        {cardMarkup}
                      </Link>
                    );
                  })}
                </div>

                {/* Primary Call to Action & Trust Line */}
                <div className="pt-2 space-y-3 hero-fade-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <Link
                      to="/quiz"
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-slate-950 text-sm sm:text-base bg-gradient-to-r from-[#00D4E6] via-cyan-300 to-[#8B5CF6] hover:from-cyan-300 hover:to-purple-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#00D4E6] focus:outline-none min-h-[44px] group"
                      aria-label="Take the Free 5-Minute Quiz"
                    >
                      <span>Take the Free 5-Minute Quiz</span>
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </Link>

                    <a
                      href="/assets/docs/the-next-level-lifespan-v7.pdf"
                      download
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-[#00D4E6] underline-offset-4 transition-colors min-h-[44px]"
                      aria-label="Download the Blueprint (PDF)"
                    >
                      <Download size={15} className="text-[#00D4E6]" />
                      <span>Download the Blueprint (PDF)</span>
                    </a>
                  </div>

                  <p className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Free · No credit card · Under 5 minutes</span>
                  </p>
                </div>
              </>
            ) : (
              /* Standard Tab View for Protocol Tabs */
              <>
                <span className="inline-block text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-md">
                  {currentTab.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {currentTab.title}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {currentTab.description}
                </p>

                <ul className="space-y-3 pt-1">
                  {currentTab.bullets.map((bullet, idx) => {
                    if (typeof bullet === 'string') {
                      return (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-300">
                          <span className="text-cyan-400 mr-2.5 font-bold mt-0.5 flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-300 group">
                        <span className="text-cyan-400 mr-2.5 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <div className="leading-snug">
                          <strong className="text-white font-bold block sm:inline">{bullet.title}</strong>
                          {bullet.subtext && (
                            <span className="text-slate-400 text-xs block sm:inline sm:ml-1.5 leading-relaxed">
                              {bullet.subtext}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
                  {currentTab.ctaButtons && currentTab.ctaButtons.length > 0 ? (
                    currentTab.ctaButtons.map((cta, idx) => {
                      let btnStyle = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium';
                      if (cta.variant === 'primary') {
                        btnStyle = 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20';
                      } else if (cta.variant === 'accent') {
                        btnStyle = 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20';
                      }

                      const commonClasses = `py-3 px-4 sm:px-5 rounded-xl text-center text-xs sm:text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 min-h-[44px] ${btnStyle}`;

                      if (cta.isDownload || cta.link.endsWith('.pdf')) {
                        return (
                          <a
                            key={idx}
                            href={cta.link}
                            download
                            className={commonClasses}
                          >
                            {cta.text}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={idx}
                          to={cta.link}
                          className={commonClasses}
                        >
                          {cta.text}
                        </Link>
                      );
                    })
                  ) : (
                    <>
                      {currentTab.primaryCtaText && currentTab.primaryCtaLink && (
                        <Link
                          to={currentTab.primaryCtaLink}
                          className="py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-center text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 min-h-[44px]"
                        >
                          {currentTab.primaryCtaText}
                        </Link>
                      )}
                      {currentTab.secondaryCtaText && currentTab.secondaryCtaLink && (
                        currentTab.secondaryCtaLink.endsWith('.pdf') ? (
                          <a
                            href={currentTab.secondaryCtaLink}
                            download
                            className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium rounded-xl text-center text-sm transition-all active:scale-95 min-h-[44px]"
                          >
                            {currentTab.secondaryCtaText}
                          </a>
                        ) : (
                          <Link
                            to={currentTab.secondaryCtaLink}
                            className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium rounded-xl text-center text-sm transition-all active:scale-95 min-h-[44px]"
                          >
                            {currentTab.secondaryCtaText}
                          </Link>
                        )
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Column: Redesigned Video Panel */}
          <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleContainerClick}
            className="lg:col-span-6 relative rounded-[22px] p-1.5 bg-gradient-to-br from-[#00D4E6]/30 via-slate-800/80 to-[#8B5CF6]/30 border border-[#00D4E6]/30 shadow-[0_0_50px_rgba(0,212,230,0.2)] group cursor-pointer overflow-hidden transition-all duration-300 hero-fade-video"
          >
            {/* Floating Corner Chip 1: Top-Left (Biological Age) */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-lg shadow-black/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Biological Age: 38 ↓</span>
              </div>
            </div>

            {/* Floating Corner Chip 2: Bottom-Right (Vitals) */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-[#00D4E6]/40 text-[#00D4E6] text-xs font-semibold shadow-lg shadow-black/50">
                <CheckCircle2 size={13} className="text-[#00D4E6]" />
                <span>Vitals: Optimal ✓</span>
              </div>
            </div>

            {/* Sound Toggle Button (Top-Right) */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
              className={`absolute top-4 right-4 z-30 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-all pointer-events-auto min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[#00D4E6] focus:outline-none ${
                isMuted
                  ? 'bg-slate-950/85 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
                  : 'bg-slate-950/90 border border-[#00D4E6]/60 text-[#00D4E6] shadow-[0_0_15px_rgba(0,212,230,0.35)]'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX size={15} className="text-slate-400" />
                  <span>🔇 Muted</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} className="text-[#00D4E6] animate-pulse" />
                  <span>🔊 Sound On</span>
                </>
              )}
            </button>

            {/* Video or Poster Container */}
            <div className="relative aspect-video w-full rounded-[18px] overflow-hidden bg-black">
              {videoUrl && !videoError ? (
                isStreamable ? (
                  /* Streamable Hover Player */
                  <iframe
                    src={`${streamableBaseUrl}?autoplay=${isPlaying ? 1 : 0}&muted=${isMuted ? 1 : 0}&loop=1`}
                    className="w-full h-full border-0 rounded-[18px] pointer-events-none"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={currentTab.title}
                  />
                ) : (
                  /* Direct Video Player */
                  <video
                    ref={videoRef}
                    key={videoUrl}
                    loop
                    playsInline
                    muted={isMuted}
                    preload="auto"
                    poster={currentTab.posterImage}
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-cover rounded-[18px]"
                  >
                    <source src={videoUrl} type="video/mp4" onError={() => setVideoError(true)} />
                  </video>
                )
              ) : null}

              {/* Cinematic Poster Overlay when Not Playing */}
              {!isPlaying && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center transition-all bg-gradient-to-t from-[#050816]/95 via-[#0A1128]/70 to-[#050816]/60 backdrop-blur-[1px]">
                  {/* Real Poster Frame background image */}
                  <img
                    src={currentTab.posterImage || '/longevity_blueprint_cover.png'}
                    alt={currentTab.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity pointer-events-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/longevity_blueprint_cover.png';
                    }}
                  />

                  {/* Pulsing Play Button */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950/80 border-2 border-[#00D4E6] flex items-center justify-center backdrop-blur-md shadow-[0_0_35px_rgba(0,212,230,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(0,212,230,0.65)] transition-all duration-300">
                      <span className="absolute -inset-2 rounded-full border border-[#00D4E6]/50 pulse-ring pointer-events-none" />
                      <Play size={26} className="text-[#00D4E6] fill-[#00D4E6] ml-1" />
                    </div>

                    <div className="px-4 py-1.5 rounded-full bg-slate-950/90 border border-white/15 backdrop-blur-md shadow-lg">
                      <span className="text-xs sm:text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                        <span>Watch the intro</span>
                        <span className="text-[#00D4E6] text-[11px] font-normal">· Hover or Tap</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveTabbedHero;
