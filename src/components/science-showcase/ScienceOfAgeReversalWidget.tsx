import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX, 
  Share2, 
  Check, 
  BookOpen, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  Target
} from 'lucide-react';
import CrisisFirefighterIllustration from './CrisisFirefighterIllustration';
import ProactiveBridgeLaserIllustration from './ProactiveBridgeLaserIllustration';
import RestorativeHorizonIllustration from './RestorativeHorizonIllustration';
import CitationModal from './CitationModal';

export type TabKey = 'crisis-firefighter' | 'ten-year-bridge' | 'restorative-horizon';

interface TabConfig {
  id: TabKey;
  stepNumber: string;
  tabLabel: string;
  shortSubtitle: string;
  title: string;
  badgeText: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: 'rose' | 'cyan' | 'amber';
  quote: string;
  analogyHook: string;
  takeawayBulletPoints?: { title: string; desc: string; iconType: 'rose' | 'cyan' | 'amber' }[];
}

export const tabsData: TabConfig[] = [
  {
    id: 'crisis-firefighter',
    stepNumber: '01',
    tabLabel: 'The Crisis Firefighter',
    shortSubtitle: 'Reactive Care (Traditional Medicine)',
    title: 'The Crisis Firefighter',
    badgeText: 'Stage 1: Reactive Care',
    icon: ShieldAlert,
    accentColor: 'rose',
    quote: "It plays defense, waiting for chronic symptoms to appear after subclinical damage has already accumulated.",
    analogyHook: "Traditional medicine is a brilliant emergency firefighter—excellent for acute trauma, crises, and surgical interventions. But it plays defense, waiting for chronic symptoms to appear. By then, silent subclinical wear-and-tear has already occurred. It is like waiting for a CD to be heavily scratched before trying to play it.",
    takeawayBulletPoints: [
      {
        title: 'Emergency Brilliance',
        desc: 'Unmatched for acute infections, broken bones, trauma, and emergency surgical rescues.',
        iconType: 'rose'
      },
      {
        title: 'The Reactive Blind Spot',
        desc: 'Waits for downstream disease thresholds before sounding sirens, missing decades of silent accumulation.',
        iconType: 'rose'
      },
      {
        title: 'The Scratched CD Dilemma',
        desc: 'Trying to fix organ systems only after decades of unmonitored subclinical epigenetic noise.',
        iconType: 'rose'
      }
    ]
  },
  {
    id: 'ten-year-bridge',
    stepNumber: '02',
    tabLabel: 'The 10-Year Bridge',
    shortSubtitle: 'Proactive Care (Our Core Focus Today)',
    title: 'The 10-Year Bridge',
    badgeText: 'Stage 2: Our Core Focus Today',
    icon: Zap,
    accentColor: 'cyan',
    quote: "Our active mission today: protect and optimize your biological hardware to reach the future.",
    analogyHook: "Because cellular age-reversal is still being perfected in clinical labs, our active mission today is to protect and optimize your biological hardware. Using simple daily checks, sleep telemetry, and metabolic tracking, we keep the CD reader clean and prevent scratches. This proactive phase is the essential physical bridge—buying you the healthy, high-performance decades needed to reach the future.",
    takeawayBulletPoints: [
      {
        title: 'Hardware Preservation Protocol',
        desc: 'Keeping cellular machinery, arteries, mitochondria, and organs 100% pristine and un-scratched.',
        iconType: 'cyan'
      },
      {
        title: 'Daily Actionable Telemetry',
        desc: 'Home biomarker dipsticks, continuous sleep telemetry (HRV, deep-wave), and metabolic zoning.',
        iconType: 'cyan'
      },
      {
        title: 'Buying Vital Decades',
        desc: 'Extending your healthspan by 10–15 years so you arrive in peak condition when age-reversal arrives.',
        iconType: 'cyan'
      }
    ]
  },
  {
    id: 'restorative-horizon',
    stepNumber: '03',
    tabLabel: 'The Restorative Horizon',
    shortSubtitle: 'Future Age Reversal (~10-Year Destination)',
    title: 'The Restorative Horizon',
    badgeText: 'Stage 3: 10-Year Destination',
    icon: Sparkles,
    accentColor: 'amber',
    quote: "You cannot reboot a broken computer; you must preserve your hardware today.",
    analogyHook: "Mainstream cellular reprogramming (using OSK factors to polish away epigenetic scratches and restore youthful factory settings) is coming, but it will take another decade to perfect. You cannot reboot a broken computer; you must preserve your hardware today. Proactive habits now ensure your body is ready to run the restorative software of tomorrow.",
    takeawayBulletPoints: [
      {
        title: 'The OSK Software Reboot',
        desc: 'Nobel Prize-winning factors (Oct4, Sox2, Klf4) safely erase epigenetic scratches without altering DNA.',
        iconType: 'amber'
      },
      {
        title: 'Preserved Hardware Prerequisite',
        desc: 'Future cellular reboot therapies only work if your physical organs and biological hardware are intact.',
        iconType: 'amber'
      },
      {
        title: 'Clinical Horizon (~2036)',
        desc: 'Currently validating in human trials for glaucoma blindness (ER-100) before expanding systemically.',
        iconType: 'amber'
      }
    ]
  }
];

interface ScienceOfAgeReversalWidgetProps {
  initialTab?: TabKey;
  className?: string;
}

export const ScienceOfAgeReversalWidget: React.FC<ScienceOfAgeReversalWidgetProps> = ({
  initialTab = 'ten-year-bridge', // Focus default on the active 10-year bridge
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [isCitationOpen, setIsCitationOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Synthesize gentle click tones via Web Audio API
  const playSoundEffect = (freq = 440, type: OscillatorType = 'sine') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio context policy safe catch
    }
  };

  const handleTabChange = (newTab: TabKey) => {
    setActiveTab(newTab);
    playSoundEffect(newTab === 'crisis-firefighter' ? 440 : newTab === 'ten-year-bridge' ? 620 : 780);
  };

  const handleCopySummary = () => {
    const activeConfig = tabsData.find((t) => t.id === activeTab);
    if (!activeConfig) return;

    const copyText = `Healthcare Evolution: "${activeConfig.title}"\n\n${activeConfig.analogyHook}\n\nVia 123TheNextLevel Longevity Blueprint`;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    playSoundEffect(880);
    setTimeout(() => setCopied(false), 2500);
  };

  const activeData = tabsData.find((t) => t.id === activeTab) || tabsData[1];
  const currentIndex = tabsData.findIndex((t) => t.id === activeTab);

  const goToNextTab = () => {
    const nextIdx = (currentIndex + 1) % tabsData.length;
    handleTabChange(tabsData[nextIdx].id);
  };

  const goToPrevTab = () => {
    const prevIdx = (currentIndex - 1 + tabsData.length) % tabsData.length;
    handleTabChange(tabsData[prevIdx].id);
  };

  // Keyboard navigation support (1, 2, 3)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleTabChange('crisis-firefighter');
      if (e.key === '2') handleTabChange('ten-year-bridge');
      if (e.key === '3') handleTabChange('restorative-horizon');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* Outer Shell: Double-Bezel Hardware Architecture */}
      <div className="relative rounded-[2rem] bg-slate-900/60 p-2 md:p-3 ring-1 ring-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Glowing Corner Highlights */}
        <div className="absolute top-0 left-12 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
        <div className="absolute bottom-0 right-12 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

        {/* Inner Core Container */}
        <div className="relative rounded-[calc(2rem-0.5rem)] bg-gradient-to-b from-[#080c16] via-[#0c1220] to-[#070a12] border border-slate-800/90 p-5 md:p-8 lg:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden">
          
          {/* Header Bar: Eyebrow + Progressive Story Title + Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-3">
                <Target size={12} className="text-cyan-400" />
                <span>The Healthcare Evolution Roadmap</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                From Reactive Defense to the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">
                  10-Year Bridge
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-400 mt-1 max-w-2xl">
                Understanding how proactive hardware protection today bridges the gap to tomorrow's cellular age-reversal horizon.
              </p>
            </div>

            {/* Utility Pills */}
            <div className="flex items-center space-x-2 self-start lg:self-center">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  soundEnabled 
                    ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={soundEnabled ? 'Mute haptic audio' : 'Enable haptic audio'}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span className="hidden sm:inline">{soundEnabled ? 'Haptics ON' : 'Audio'}</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                title="Copy concept summary"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => setIsCitationOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(217,119,6,0.15)]"
              >
                <BookOpen size={14} />
                <span>Citation [120]</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation Strip (3 Progressive Stages) */}
          <div className="relative mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 rounded-2xl bg-[#060a12]/95 border border-slate-800/90 backdrop-blur-xl shadow-2xl">
              {tabsData.map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComponent = tab.icon;

                const getTabTheme = () => {
                  if (tab.id === 'crisis-firefighter') {
                    return {
                      inactiveBg: 'bg-gradient-to-br from-[#1a0f16]/60 via-[#10121a]/60 to-[#0c0d12]/90 border-rose-950/40 hover:border-rose-500/40 hover:from-rose-950/30',
                      activeGradient: 'bg-gradient-to-br from-[#2a0d16] via-[#1a0f16] to-[#0d0f17]',
                      radialGlow: 'bg-[radial-gradient(ellipse_at_top_left,rgba(244,63,94,0.35),transparent_70%)]',
                      borderColor: 'border-rose-500/70',
                      shadow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]',
                      topBar: 'bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600',
                      iconActive: 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.5)]',
                      badge: 'Stage 01 • Reactive Emergency',
                      badgeColor: 'text-rose-400/90 font-semibold',
                      dotColor: 'bg-rose-500',
                      dotStatic: 'bg-rose-400',
                      activeTextColor: 'text-rose-100',
                    };
                  }
                  if (tab.id === 'ten-year-bridge') {
                    return {
                      inactiveBg: 'bg-gradient-to-br from-[#0a1824]/60 via-[#0b121e]/60 to-[#070e17]/90 border-cyan-950/40 hover:border-cyan-500/40 hover:from-cyan-950/30',
                      activeGradient: 'bg-gradient-to-br from-[#062432] via-[#0b1b2d] to-[#06111f]',
                      radialGlow: 'bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.38),transparent_70%)]',
                      borderColor: 'border-cyan-400/80',
                      shadow: 'shadow-[0_0_35px_rgba(6,182,212,0.35)]',
                      topBar: 'bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500',
                      iconActive: 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
                      badge: 'Stage 02 • 100% Critical Path',
                      badgeColor: 'text-cyan-300 font-bold',
                      dotColor: 'bg-cyan-400',
                      dotStatic: 'bg-cyan-300',
                      activeTextColor: 'text-cyan-100',
                    };
                  }
                  // restorative-horizon
                  return {
                    inactiveBg: 'bg-gradient-to-br from-[#1a140c]/60 via-[#121118]/60 to-[#0b0c13]/90 border-amber-950/40 hover:border-amber-500/40 hover:from-amber-950/30',
                    activeGradient: 'bg-gradient-to-br from-[#2a1a07] via-[#1c140d] to-[#0e0c17]',
                    radialGlow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.38),transparent_70%)]',
                    borderColor: 'border-amber-400/80',
                    shadow: 'shadow-[0_0_35px_rgba(245,158,11,0.35)]',
                    topBar: 'bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600',
                    iconActive: 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
                    badge: 'Stage 03 • OSK Factor Horizon',
                    badgeColor: 'text-amber-300/90 font-semibold',
                    dotColor: 'bg-amber-400',
                    dotStatic: 'bg-amber-300',
                    activeTextColor: 'text-amber-100',
                  };
                };

                const theme = getTabTheme();

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 flex items-center space-x-3 cursor-pointer group z-10 overflow-hidden border ${
                      isActive 
                        ? `${theme.borderColor} ${theme.shadow}` 
                        : `${theme.inactiveBg}`
                    }`}
                  >
                    {/* Active Background Pill Animation */}
                    {isActive && (
                      <motion.div
                        layoutId="activeEvolutionTab"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        className={`absolute inset-0 rounded-xl ${theme.activeGradient} overflow-hidden -z-10`}
                      >
                        {/* Thematic Radial Light Glow */}
                        <div className={`absolute inset-0 ${theme.radialGlow} pointer-events-none`} />
                        
                        {/* Luminous Top Highlighting Beam */}
                        <div className={`absolute top-0 left-0 right-0 h-[2px] ${theme.topBar} shadow-sm`} />
                        
                        {/* Subtle Grid Pattern */}
                        <div 
                          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '16px 16px' }} 
                        />
                      </motion.div>
                    )}

                    {/* Step Number & Icon */}
                    <div className="relative z-10 flex items-center space-x-3 w-full">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all border ${
                        isActive 
                          ? theme.iconActive
                          : 'bg-slate-900/90 border-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:scale-105 group-hover:border-slate-700'
                      }`}>
                        <IconComponent size={19} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest truncate ${
                            isActive ? theme.badgeColor : 'text-slate-400 group-hover:text-slate-300'
                          }`}>
                            {theme.badge}
                          </span>
                          {isActive && (
                            <span className="flex h-2 w-2 relative flex-shrink-0">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.dotColor}`} />
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dotStatic}`} />
                            </span>
                          )}
                        </div>
                        <div className={`text-xs sm:text-sm font-bold truncate tracking-tight transition-colors ${
                          isActive ? `${theme.activeTextColor} font-extrabold` : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {tab.tabLabel}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Main Content Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Educational Editorial Explanation */}
              <div className="lg:col-span-6 space-y-6">
                {/* Concept Header */}
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    <span className={
                      activeData.accentColor === 'rose' 
                        ? 'text-rose-400' 
                        : activeData.accentColor === 'amber' 
                          ? 'text-amber-400' 
                          : 'text-cyan-400'
                    }>
                      {activeData.badgeText}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{activeData.shortSubtitle}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-snug">
                    {activeData.title}
                  </h3>
                </div>

                {/* Primary Analogy Blockquote Card */}
                <div className={`p-5 rounded-2xl bg-slate-950/80 border-l-4 border shadow-lg space-y-4 ${
                  activeData.accentColor === 'rose'
                    ? 'border-l-rose-500 border-slate-800/80'
                    : activeData.accentColor === 'amber'
                      ? 'border-l-amber-500 border-slate-800/80'
                      : 'border-l-cyan-400 border-slate-800/80'
                }`}>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans font-normal">
                    {activeData.analogyHook}
                  </p>
                </div>

                {/* Takeaways & Structural Breakdown Cards */}
                {activeData.takeawayBulletPoints && (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                      Key Takeaways
                    </div>

                    <div className="space-y-2.5">
                      {activeData.takeawayBulletPoints.map((item, index) => (
                        <div
                          key={index}
                          className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-start space-x-3.5 group"
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            item.iconType === 'rose'
                              ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                              : item.iconType === 'amber'
                                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                                : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                          }`}>
                            <span className="text-xs font-mono font-bold">{index + 1}</span>
                          </div>

                          <div className="space-y-1">
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Navigation Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <button
                    onClick={goToPrevTab}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                    <span>Previous Stage</span>
                  </button>

                  <div className="text-xs font-mono text-slate-500">
                    {currentIndex + 1} / {tabsData.length}
                  </div>

                  <button
                    onClick={goToNextTab}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-amber-500/20 hover:from-cyan-500/30 hover:to-amber-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  >
                    <span>Next Stage</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Component Stage */}
              <div className="lg:col-span-6">
                {activeTab === 'crisis-firefighter' && (
                  <CrisisFirefighterIllustration onInteraction={() => playSoundEffect(480)} />
                )}

                {activeTab === 'ten-year-bridge' && (
                  <ProactiveBridgeLaserIllustration onInteraction={() => playSoundEffect(660)} />
                )}

                {activeTab === 'restorative-horizon' && (
                  <RestorativeHorizonIllustration 
                    onInteraction={() => playSoundEffect(740)} 
                    onOpenCitation={() => setIsCitationOpen(true)}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Roadmap Summary Strip */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-400">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/40 border border-slate-900">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
                <ShieldAlert size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Stage 1: Reactive Care</div>
                <div className="text-[11px] text-slate-400">Emergency crisis control (Late defense)</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/40 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-300">Stage 2: The 10-Year Bridge</div>
                <div className="text-[11px] text-slate-400">Our core proactive mission today</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/40 border border-slate-900">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Stage 3: Future Horizon</div>
                <div className="text-[11px] text-slate-400">Cellular OSK software reboot (~2036)</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Citation Modal */}
      <CitationModal isOpen={isCitationOpen} onClose={() => setIsCitationOpen(false)} />
    </div>
  );
};

export default ScienceOfAgeReversalWidget;
