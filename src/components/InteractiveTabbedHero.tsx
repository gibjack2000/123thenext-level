import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HERO_VIDEOS } from '../config/heroVideos';

export interface TabData {
  id: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  posterImage: string;
}

export const tabsData: TabData[] = [
  {
    id: 'start-here',
    label: '🚀 Start Here',
    badge: 'RECOMMENDED ONBOARDING LAUNCHPAD',
    title: 'Begin Your Longevity Journey Today',
    description: 'Unsure where to start? Access our free diagnostic tools, lead magnets, e-books, and step-by-step blueprints designed to take you from guessing to total biological mastery.',
    bullets: [
      '🎯 5-Minute Wellness Quiz: Diagnose your baseline score across all 6 protocols',
      '📘 Free Longevity Blueprint (PDF): 28-page geroscience guide & habit tracker',
      '📚 Free E-Books & Guides: Biological Age Guide, Workout Plan & GP Template'
    ],
    primaryCtaText: 'Take the 5-Minute Quiz →',
    primaryCtaLink: '/quiz',
    secondaryCtaText: 'Download Free Blueprint (PDF) →',
    secondaryCtaLink: '/the-next-level-lifespan-v7.pdf',
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
    posterImage: '/hero_epigenetic_dashboard.png'
  },
  {
    id: 'diagnostics',
    label: '🩸 Diagnostics',
    badge: 'PRECISION BIOMARKERS',
    title: 'From Guessing to Knowing',
    description: 'Establish a scientific biological baseline using clinical-grade blood panels, continuous wearable telemetry, and rapid at-home fluid test strips.',
    bullets: [
      'Lola Vital Check 56 (ApoB, HbA1c, hs-CRP)',
      'Continuous Nocturnal HRV & Sleep Architecture',
      'Collaborative GP Consultation Template included'
    ],
    primaryCtaText: 'Explore Diagnostic Guide →',
    primaryCtaLink: '/guide',
    secondaryCtaText: 'Download GP Template (PDF) →',
    secondaryCtaLink: '/clinical-baseline-consultation-template.pdf',
    posterImage: '/gp_consultation_cover.png'
  },
  {
    id: 'mental',
    label: '🧠 Mental Health',
    badge: 'AUTONOMIC ENGINEERING',
    title: 'Mind-Body Vagal Tone Regulation',
    description: 'True longevity balances physical output with nervous system resilience. Master breathing mindfulness, NSDR neuro-resets, and circadian sleep precision.',
    bullets: [
      'Vagal Tone & Parasympathetic Activation',
      'Cortisol Down-Regulation & Stress Management',
      '10-Minute NSDR Cognitive Reset Protocols'
    ],
    primaryCtaText: 'Explore Wellness & Mental Pillar →',
    primaryCtaLink: '/wellness',
    secondaryCtaText: 'Read Autonomic Guide →',
    secondaryCtaLink: '/blog-post-autonomic-engineering',
    posterImage: '/autonomic_engineering_cover.png'
  },
  {
    id: 'performance',
    label: '⚡ Performance',
    badge: 'PHYSICAL HARDWARE',
    title: 'VO2 Max & Longevity Strength',
    description: 'Optimize aerobic capacity and preserve functional muscle density—the primary biological buffer against age-related frailty.',
    bullets: [
      'VO2 Max Conditioning & Zone 2 Endurance',
      'Functional Muscle Preservation & Mobility',
      'Smart Body Scale Composition Tracking'
    ],
    primaryCtaText: 'Explore Performance & Bio-Data →',
    primaryCtaLink: '/fitness',
    secondaryCtaText: 'View Workout Guide →',
    secondaryCtaLink: '/beginner_bodyweight_guide_revised-v3.pdf',
    posterImage: '/performance_biodata_cover.png'
  },
  {
    id: 'nutrition',
    label: '🥗 Nutrition',
    badge: 'METABOLIC FUEL',
    title: 'Glycemic Stability & Gut Microbiome',
    description: 'Prevent post-meal insulin spikes, preserve gut-lining integrity, and fuel cellular autophagy using NSF-certified nutraceuticals.',
    bullets: [
      'Continuous Glucose Spike Mitigation',
      'Microbiome Diversity & Systemic Immunity',
      'Targeted NAD+ Precursors & Spermidine'
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

            <ul className="space-y-2.5 pt-1">
              {currentTab.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center text-xs sm:text-sm text-slate-300">
                  <span className="text-cyan-400 mr-2.5 font-bold">✓</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to={currentTab.primaryCtaLink}
                className="py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-center text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                {currentTab.primaryCtaText}
              </Link>
              {currentTab.secondaryCtaLink.endsWith('.pdf') ? (
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
              isStreamable ? (
                /* Streamable Hover Player */
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={`${streamableBaseUrl}?autoplay=${isPlaying ? 1 : 0}&muted=${isMuted ? 1 : 0}&loop=1`}
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
                        ▶ Hover or Tap to Play
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
