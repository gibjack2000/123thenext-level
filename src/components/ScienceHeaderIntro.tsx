import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, ShieldAlert, Cpu, Orbit } from 'lucide-react';

interface ScienceHeaderIntroProps {
  onScrollToTimeline?: () => void;
}

export const ScienceHeaderIntro: React.FC<ScienceHeaderIntroProps> = ({ onScrollToTimeline }) => {
  const handleScroll = () => {
    if (onScrollToTimeline) {
      onScrollToTimeline();
    } else {
      const element = document.getElementById('three-eras-timeline');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#090d16] text-white font-sans">
      {/* ============================================================ */}
      {/* Glowing Ambient Mesh & Dual Cyan-Gold Cellular Pathways Grid */}
      {/* ============================================================ */}
      {/* Faint Cellular Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px' 
        }} 
      />

      {/* Electric-Cyan & Warm Gold Ambient Pathway Auroras */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-cyan-500/12 via-amber-500/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Glowing Pathway Traces (SVG lines) */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyanGoldFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M 0 160 Q 300 120 600 200 T 1200 180" fill="none" stroke="url(#cyanGoldFlow)" strokeWidth="1" strokeDasharray="4 6" />
        <path d="M 100 0 Q 400 300 800 240 T 1400 320" fill="none" stroke="url(#cyanGoldFlow)" strokeWidth="1" strokeDasharray="8 8" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Centered Header Badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-cyan-300">
              [THE LONGEVITY HORIZON] • 10-YEAR PROACTIVE BRIDGE
            </span>
          </motion.div>
        </div>

        {/* 2. Main Headline (Bold Sans-Serif, High-Contrast Slate-100) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center space-y-4 mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-100 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 mb-2">
              The Longevity Horizon
            </span>
            Upgrade the Hardware Before You Wait for the Software.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mt-4">
            A unified geroscience manifesto: The breakthroughs of 2036 — cellular reprogramming, senescence reversal, the works — won't save a body that can't run them. Real longevity starts now, in the vessels, the metabolism, the mitochondria. Preserve the machine today, or there's nothing left to upgrade tomorrow.
          </p>
        </motion.div>

        {/* 3. Reassuring, Human-First Introductory Text (3 Progressive Anchors) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Paragraph 1: Honoring Reactive Care */}
          <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-950/60 border border-slate-800/80 border-l-4 border-l-rose-500/70 shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-rose-400 font-bold mb-2.5">
              <ShieldAlert size={14} className="text-rose-400" />
              <span>The Firefighter of Healthcare (Reactive Care)</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed font-sans">
              Traditional modern medicine has served us remarkably well. It is the firefighter of healthcare—brilliant at crisis management, emergency interventions, and acute disease. Because of these reactive systems, human life expectancy has doubled over the past century. But reactive care is a defensive game; it waits for symptoms to appear before playing defense with your life. By the time chronic illness is clinically flagged, silent subclinical erosion has already occurred.
            </p>
          </div>

          {/* Paragraph 2: Today's Proactive Focus */}
          <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-950/60 border border-cyan-500/30 border-l-4 border-l-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.12)] backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-cyan-300 font-bold mb-2.5">
              <Cpu size={14} className="text-cyan-400" />
              <span>Our Active Mission Today (The Proactive Bridge)</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed font-sans">
              True health optimization requires an active, forward-looking strategy. We focus on Proactive Care—the active preservation of your cellular and physiological hardware today. Through continuous metabolic tracking, sleep autonomic engineering, and targeted biochemical baselines, we maintain our biological systems in real-time. This active phase is your essential physical bridge.
            </p>
          </div>

          {/* Paragraph 3: The Age Reversal Destination */}
          <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900/80 via-amber-950/20 to-slate-950/60 border border-amber-500/30 border-l-4 border-l-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.1)] backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold mb-2.5">
              <Orbit size={14} className="text-amber-400" />
              <span>The 10-Year Horizon (Cellular Age Reversal)</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed font-sans">
              While breakthrough cellular reprogramming—the science of actively resetting cellular memory back to factory settings—is currently being perfected in clinical laboratories (with therapies like ER-100), it will take another 10 years to become safe and mainstream. You cannot run futuristic software on a broken computer. We optimize our health today so that we stick around long enough, and in peak physiological condition, to receive the age-reversal therapies on the horizon.
            </p>
          </div>
        </motion.div>

        {/* 4. Simple Interactive Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-14 sm:mt-16"
        >
          <button
            type="button"
            onClick={handleScroll}
            className="group flex flex-col items-center space-y-2 text-cyan-400/80 hover:text-cyan-300 transition-colors cursor-pointer focus:outline-none"
            aria-label="Scroll to Three Eras of Medicine timeline"
          >
            <span className="text-xs sm:text-sm font-mono tracking-wider font-semibold uppercase text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
              Explore the Three Eras of Medicine Below
            </span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all">
              <ChevronDown 
                size={18} 
                className="text-cyan-400 group-hover:text-cyan-200 animate-bounce" 
              />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default ScienceHeaderIntro;
