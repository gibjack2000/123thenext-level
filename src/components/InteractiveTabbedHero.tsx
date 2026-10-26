import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    badge: 'RECOMMENDED ONBOARDING LAUNCHPAD',
    title: 'Begin Your Longevity Journey Today',
    description: 'Unsure where to start? Access our free diagnostic tools, interactive workbooks, and step-by-step blueprints designed to take you from guessing to total biological mastery.',
    bullets: [
      {
        title: '🎯 5-Minute Wellness Quiz',
        subtext: 'Diagnose your baseline score across all 6 core longevity protocols in under 5 minutes.'
      },
      {
        title: '🩸 The Clinician Co-Pilot: From Guessing to Knowing',
        subtext: 'Interactive 4-page diagnostic roadmap, Day 1 vitamin stack, 14-day vitals log & printable GP consultation template.'
      },
      {
        title: '📘 Free Longevity Blueprint (PDF)',
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
      if (!nextMuted && videoRef.current.paused) {
        setIsPlaying(true);
        videoRef.current.play().catch(() => {});
      }
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
  const isCloudinaryEmbed = Boolean(videoUrl && videoUrl.includes('player.cloudinary.com'));
  const streamableBaseUrl = isStreamable
    ? (videoUrl.includes('/e/')
        ? videoUrl.split('?')[0]
        : videoUrl.replace('streamable.com/', 'streamable.com/e/').split('?')[0])
    : '';

  return (
    <section className="relative bg-slate-950 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Floating Quote */}
        <p className="text-cyan-400 text-sm sm:text-base font-medium italic tracking-wide mb-3">
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
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer touch-manipulation ${
                activeTabId === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105 font-bold'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-5">
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

                  const commonClasses = `py-3 px-4 sm:px-5 rounded-xl text-center text-xs sm:text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 ${btnStyle}`;

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
                      className="py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-center text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                    >
                      {currentTab.primaryCtaText}
                    </Link>
                  )}
                  {currentTab.secondaryCtaText && currentTab.secondaryCtaLink && (
                    currentTab.secondaryCtaLink.endsWith('.pdf') ? (
                      <a
                        href={currentTab.secondaryCtaLink}
                        download
                        className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium rounded-xl text-center text-sm transition-all active:scale-95"
                      >
                        {currentTab.secondaryCtaText}
                      </a>
                    ) : (
                      <Link
                        to={currentTab.secondaryCtaLink}
                        className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium rounded-xl text-center text-sm transition-all active:scale-95"
                      >
                        {currentTab.secondaryCtaText}
                      </Link>
                    )
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Column: Hover-Triggered Media Frame with Sound Control */}
          <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleContainerClick}
            className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 p-1.5 shadow-2xl shadow-cyan-950/30 group cursor-pointer"
          >
            {videoUrl && !videoError ? (
              isStreamable || isCloudinaryEmbed ? (
                /* Embed Player (Streamable or Cloudinary Player) */
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={
                      isCloudinaryEmbed
                        ? `${videoUrl}&autoplay=${isPlaying ? 'true' : 'false'}&muted=${isMuted ? 'true' : 'false'}`
                        : `${streamableBaseUrl}?autoplay=${isPlaying ? 1 : 0}&muted=${isMuted ? 1 : 0}&loop=1`
                    }
                    className="w-full h-full border-0 rounded-xl pointer-events-none"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={currentTab.title}
                  />

                  {/* Sound Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute top-3 right-3 z-20 bg-slate-950/80 hover:bg-slate-900 text-cyan-400 p-2 rounded-full border border-slate-700 transition-all text-xs font-bold flex items-center gap-1.5 px-3 pointer-events-auto"
                  >
                    {isMuted ? '🔇 Unmute' : '🔊 Sound On'}
                  </button>

                  {!isPlaying && (
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center transition-all">
                      <span className="bg-cyan-500/90 text-slate-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        ▶ Hover or Tap to Play with Sound
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                /* Direct MP4 Player with Hover & Sound Toggle */
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    key={videoUrl}
                    src={videoUrl}
                    loop
                    playsInline
                    muted={isMuted}
                    preload="auto"
                    poster={currentTab.posterImage}
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-cover rounded-xl"
                  >
                    <source src={videoUrl} type="video/mp4" onError={() => setVideoError(true)} />
                  </video>

                  {/* Sound Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute top-3 right-3 z-20 bg-slate-950/80 hover:bg-slate-900 text-cyan-400 p-2 rounded-full border border-slate-700 transition-all text-xs font-bold flex items-center gap-1.5 px-3 pointer-events-auto"
                  >
                    {isMuted ? '🔇 Unmute' : '🔊 Sound On'}
                  </button>

                  {!isPlaying && (
                    <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-cyan-500/90 text-slate-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        ▶ Hover or Tap to Play with Sound
                      </span>
                    </div>
                  )}
                </div>
              )
            ) : (
              /* Fallback Static Poster */
              <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                <img
                  src={currentTab.posterImage}
                  alt={currentTab.title}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/covers/healthspan_longevity_cover.png';
                  }}
                />
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border border-slate-800">
                  Preview Active
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none rounded-xl" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveTabbedHero;
