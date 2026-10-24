import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Activity, Stethoscope, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

export interface OnboardingLaunchpadProps {
  className?: string;
  showHeader?: boolean;
}

export const OnboardingLaunchpad: React.FC<OnboardingLaunchpadProps> = ({
  className = '',
  showHeader = true,
}) => {
  return (
    <section 
      id="onboarding-launchpad" 
      className={`relative overflow-hidden bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-8 md:p-12 max-w-7xl mx-auto shadow-2xl my-12 scroll-mt-28 ${className}`}
    >
      {/* Ambient background flares */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
              <Sparkles size={13} className="text-cyan-400 animate-pulse" />
              <span>RECOMMENDED ONBOARDING LAUNCHPAD</span>
            </div>

            {/* Subtitle */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Begin Your Longevity Journey Today
            </h2>

            {/* Lead Text */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
              Unsure where to start? Access our free diagnostic tools, interactive workbooks, and step-by-step blueprints designed to take you from guessing to total biological mastery.
            </p>
          </div>
        )}

        {/* 3 Core Entry Points Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Item 1: 5-Minute Wellness Quiz */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/50 shadow-xl flex flex-col justify-between space-y-6 group transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Activity size={22} />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 font-bold">
                  Quick Assessment
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  🎯 5-Minute Wellness Quiz
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Diagnose your baseline score across all 6 core longevity protocols in under 5 minutes.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>Immediate 6-protocol baseline score</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>Pinpoints metabolic & recovery gaps</span>
                </li>
              </ul>
            </div>

            <Link
              to="/quiz"
              className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>🎯 Take 5-Minute Quiz</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Item 2: The Clinician Co-Pilot */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/50 shadow-xl flex flex-col justify-between space-y-6 group transition-all duration-300 hover:-translate-y-1 relative">
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-t-2xl opacity-75" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Stethoscope size={22} />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 font-bold">
                  Interactive Workbook
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  🩸 The Clinician Co-Pilot: From Guessing to Knowing
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Interactive 4-page diagnostic roadmap, Day 1 vitamin stack, 14-day vitals log & printable GP consultation template.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                  <span>4-page live editable clinical workbook</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                  <span>Print-ready GP consultation template</span>
                </li>
              </ul>
            </div>

            <Link
              to="/clinician-copilot"
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>🩺 Clinician Co-Pilot Workbook</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Item 3: Free Longevity Blueprint (PDF) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-indigo-500/50 shadow-xl flex flex-col justify-between space-y-6 group transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                  <BookOpen size={22} />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800/50 font-bold">
                  Instant Download
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  📘 Free Longevity Blueprint (PDF)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Our open-access geroscience guide, biological age primer, and 4-week habit tracker.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400 flex-shrink-0" />
                  <span>28-page open-access geroscience blueprint</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-400 flex-shrink-0" />
                  <span>4-week biological decay habit tracker</span>
                </li>
              </ul>
            </div>

            <a
              href="/assets/docs/the-next-level-lifespan-v7.pdf"
              download
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold rounded-xl text-center text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Download size={14} className="text-cyan-400" />
              <span>📘 Free Longevity Blueprint (PDF)</span>
            </a>
          </div>

        </div>

        {/* Global Quick Action Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-slate-300">Zero Paywall • 100% Free Open-Access Clinical Resources</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              to="/quiz" 
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
            >
              Take Quiz →
            </Link>
            <span className="text-slate-600">•</span>
            <Link 
              to="/clinician-copilot" 
              className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
            >
              Open Clinician Co-Pilot →
            </Link>
            <span className="text-slate-600">•</span>
            <a 
              href="/assets/docs/the-next-level-lifespan-v7.pdf" 
              download 
              className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
            >
              Download PDF Blueprint →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OnboardingLaunchpad;
