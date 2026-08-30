import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Sun, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Layers,
  HelpCircle
} from 'lucide-react';
import ScienceHeaderIntro from '../components/ScienceHeaderIntro';
import ScienceOfAgeReversalWidget from '../components/ScienceOfAgeReversalWidget';
import BodyHarmonyDashboard from '../components/BodyHarmonyDashboard';
import MorningBalanceCheck from '../components/MorningBalanceCheck';
import BiologicalHardwareStoreGrid from '../components/BiologicalHardwareStoreGrid';
import FriendlyWellnessQuizModal from '../components/FriendlyWellnessQuizModal';

export default function SciencePage() {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The Longevity Horizon: Maintaining Biological Hardware | 123TheNextLevel';
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-white font-sans antialiased selection:bg-cyan-500/30">
      {/* 1. Header and Introductory Section */}
      <ScienceHeaderIntro 
        onScrollToTimeline={() => {
          document.getElementById('three-eras-timeline')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Interactive Three Eras of Medicine Showcase Widget */}
      <div id="three-eras-timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-20 scroll-mt-24">
        <ScienceOfAgeReversalWidget />
      </div>

      {/* 3. Subclinical Pathologies 2x2: Daily Body Harmony Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-20">
        <BodyHarmonyDashboard />
      </div>

      {/* 4. Featured Spotlight: 2-Minute Morning Balance Check Reagent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            Zero Screen-Time Baseline Reagent
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            The Essential Morning Balance Kit
          </h2>
        </div>
        <MorningBalanceCheck />
      </div>

      {/* 5. Biological Hardware Store Catalog (9 Localized Listings) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-20">
        <BiologicalHardwareStoreGrid />
      </div>

      {/* Bottom CTA & Floating Discovery Trigger */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-amber-950/50 border border-cyan-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-cyan-400 font-bold">
              <ShieldCheck size={14} />
              <span>Proactive Longevity Architecture</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Ready to find your personalized biological baseline?
            </h3>
            <p className="text-sm text-slate-300">
              Take 5 minutes to discover your daily energy rhythm, sleep recovery score, and tailored hardware protocol.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider text-center transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sun size={15} />
              <span>Take Free 5-Min Balance Scan</span>
            </button>

            <Link
              to="/dual-track"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
            >
              <span>Explore Dual-Track</span>
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
