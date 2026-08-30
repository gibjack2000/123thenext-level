import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle, 
  Award,
  Disc,
  Target,
  Clock,
  Sun,
  HeartHandshake
} from 'lucide-react';
import ScienceOfAgeReversalWidget from '../components/ScienceOfAgeReversalWidget';
import BodyHarmonyDashboard from '../components/BodyHarmonyDashboard';
import BiologicalHardwareStoreGrid from '../components/BiologicalHardwareStoreGrid';
import FriendlyWellnessQuizModal from '../components/FriendlyWellnessQuizModal';

export default function AgeReversalShowcase() {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The 10-Year Bridge & The Science of Age Reversal | 123TheNextLevel';
  }, []);

  return (
    <div className="min-h-screen bg-[#060911] text-white font-sans antialiased selection:bg-cyan-500/30">
      {/* Hero Header Section */}
      <div className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Cinematic Ambient Glows & Mesh Backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)', backgroundSize: '32px 32px' }} 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            to="/health/cellular" 
            className="inline-flex items-center text-slate-400 hover:text-cyan-300 font-mono text-xs uppercase tracking-wider mb-8 transition-colors group"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Cellular Engineering Hub</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono uppercase tracking-[0.25em] font-semibold shadow-lg"
            >
              <Target size={12} className="text-cyan-400" />
              <span>Healthcare Evolution Roadmap</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
              The 10-Year Bridge & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">
                The Science of Age Reversal
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
              Understand the shift from reactive crisis medicine to daily proactive hardware preservation—the essential bridge buying you the healthy, high-performance decades needed to reach the future.
            </p>

            {/* Quick Friendly Quiz Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsQuizModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400/20 via-cyan-500/20 to-emerald-500/10 hover:from-amber-400/30 hover:via-cyan-500/30 border border-cyan-400/40 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all cursor-pointer group"
              >
                <Sun size={18} className="text-amber-300 animate-[spin_20s_linear_infinite]" />
                <span>Check Your Daily Biological Balance (Free 5-Min Quiz)</span>
                <ArrowRight size={14} className="text-cyan-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-20">
        <ScienceOfAgeReversalWidget />
      </div>

      {/* Subclinical Pathologies 2x2: Daily Body Harmony Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-20">
        <BodyHarmonyDashboard />
      </div>

      {/* Biological Hardware Store Catalog (9 Localized Listings) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-20">
        <BiologicalHardwareStoreGrid />
      </div>

      {/* Deep-Dive Educational Pillars */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-850">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
            The Three Stages of Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            How Healthcare Evolves to Age Reversal
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A progressive narrative bridging current clinical realities with future biotechnology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Reactive Care */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                <ShieldAlert size={24} />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                  Stage 01: Reactive Care
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-rose-300 transition-colors">
                  The Crisis Firefighter
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Traditional medicine is a brilliant emergency responder for acute crises and surgery. But because it plays defense, silent subclinical damage accumulates unnoticed for decades before clinical sirens sound.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-mono text-rose-400">
              <span>Emergency Trauma & Surgery Focus</span>
            </div>
          </div>

          {/* Card 2: Proactive Care */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.1)] hover:border-cyan-500/60 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                <Zap size={24} />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Stage 02: Our Core Focus Today
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-200 transition-colors">
                  The 10-Year Bridge
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our active mission today is protecting your biological hardware. Using daily checks, sleep telemetry, and metabolic tracking, we prevent scratches on the CD reader, buying the vital decades needed to reach the future.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-mono text-cyan-400">
              <span>Active Daily Habit & Telemetry Systems</span>
            </div>
          </div>

          {/* Card 3: Restorative Horizon */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Stage 03: 10-Year Destination
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                  The Restorative Horizon
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Mainstream cellular reprogramming (OSK factors) will safely polish away epigenetic scratches and reboot youthful factory settings. Preserving your hardware today guarantees your body is ready to run tomorrow's software.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-mono text-amber-400">
              <span>OSK Reprogramming & Human Trials (~2036)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-850">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
            Clarity & Reassurance
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Demystifying the 10-Year Bridge
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Clear answers on why proactive hardware preservation is our core mission today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-cyan-400 flex-shrink-0" />
              Why can't we just wait for age-reversal therapies to arrive?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              "You cannot reboot a broken computer." If organ systems undergo severe structural scarring, calcification, or advanced sarcopenia, future epigenetic software cannot restore lost physical architecture. Protecting the hardware today is the non-negotiable prerequisite.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-amber-400 flex-shrink-0" />
              What exactly are the OSK factors in Stage 3?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              Oct4, Sox2, and Klf4 are natural transcription factors discovered by Nobel laureate Shinya Yamanaka. In Harvard clinical models and ER-100 human glaucoma trials, temporary expression of these three factors safely erases DNA methylation marks without modifying genetic sequence.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-cyan-400 flex-shrink-0" />
              What daily habits constitute "The 10-Year Bridge"?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              Three pillars: (1) Daily biomarker telemetry via home urinalysis and blood markers, (2) Sleep architecture optimization to enable glymphatic cellular clean-up, and (3) Dynamic hormesis (intermittent fasting, cold plunges, and targeted resistance training).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-rose-400 flex-shrink-0" />
              Does proactive care replace traditional medicine?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
              No. Traditional medicine is indispensable for acute trauma, emergency crises, infections, and surgical interventions. Proactive care operates upstream, preventing the silent chronic wear-and-tear that leads to crisis thresholds.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Footer Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-850">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-amber-950/50 border border-cyan-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-cyan-400 font-bold">
              <ShieldCheck size={14} />
              <span>Active Proactive Protocol</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Start building your 10-Year Physical Bridge today
            </h3>
            <p className="text-sm text-slate-300">
              Explore our full Cellular Engineering directory, protocol trackers, and validated biomarker diagnostics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider text-center transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sun size={15} />
              <span>Take Free 5-Min Balance Scan</span>
            </button>

            <Link
              to="/dual-track"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
            >
              <span>Explore Dual-Track Protocol</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Friendly 5-Minute Wellness Quiz Modal */}
      <FriendlyWellnessQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
}
