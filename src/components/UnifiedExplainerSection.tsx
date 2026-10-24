import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Activity, 
  FileText, 
  Award, 
  ArrowRight, 
  Download, 
  Stethoscope, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  HeartPulse, 
  BookOpen, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from './MarketSelector';

interface UnifiedExplainerSectionProps {
  className?: string;
  id?: string;
}

export const UnifiedExplainerSection: React.FC<UnifiedExplainerSectionProps> = ({
  className = '',
  id = 'unified-longevity-engine',
}) => {
  const { market, setMarket } = useMarket();
  const navigate = useNavigate();

  return (
    <section 
      id={id} 
      className={`relative overflow-hidden bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-8 md:p-12 max-w-7xl mx-auto shadow-2xl my-12 scroll-mt-24 ${className}`}
    >
      {/* Ambient background flares */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-16">
        
        {/* ========================================================================= */}
        {/* STAGE 1: THE PARADIGM SHIFT (Hook & Authority)                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>STAGE 1: THE PARADIGM SHIFT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-white font-black leading-tight">
            THE BIG PICTURE: How Your Longevity Engine Works
          </h2>

          <p className="text-cyan-300 font-semibold text-sm sm:text-base tracking-wide max-w-2xl mx-auto">
            Build the Biological Hardware Today to Run Tomorrow's Epigenetic Software
          </p>

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed font-light text-left space-y-4 shadow-xl">
            <p>
              Traditional medicine is a firefighter: reactive, symptom-obsessed, and mobilized only after organ damage has set in. Modern geroscience proves that <strong className="text-white font-bold">80% to 90% of cellular aging and chronic disease risk is governed by daily lifestyle and metabolic telemetry</strong>—not unalterable inherited DNA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mt-0.5 shrink-0">
                  <TrendingUp size={16} />
                </span>
                <div>
                  <span className="text-white font-bold block text-sm">1.8x Healthy Life Expectancy</span>
                  <span className="text-slate-400 text-xs">Proactive lifestyle engineering expands high-vitality years, preventing late-life frailty.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5 shrink-0">
                  <ShieldCheck size={16} />
                </span>
                <div>
                  <span className="text-white font-bold block text-sm">▼ 30% Chronic Pathology Risk</span>
                  <span className="text-slate-400 text-xs">Continuous biometrics and early vascular defense arrest silent cardiovascular & glycemic decay.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 2: 3 PARALLEL TRACKS (Self-Segmentation)                            */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-950/40 border border-amber-800/50 px-3 py-1 rounded-full">
              STAGE 2: SELF-SEGMENTATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
              3 Parallel Tracks Running Concurrently
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Choose your focus or balance all three to engineer an impenetrable biological shield.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Track 1: Daily Biological Hardware */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg group hover:-translate-y-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Activity size={20} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 font-bold">
                    Track 1
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Daily Biological Hardware
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Workouts, Glycemic Nutrition, Breathing Mindfulness &amp; Sleep Resets. Functional muscle preservation, Zone 2 endurance, and autonomic vagal tone calibration.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                    <span>Home workouts &amp; joint mobility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                    <span>Post-meal glucose mitigation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                    <span>NSDR &amp; nocturnal HRV rebound</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <Link to="/fitness" className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1">
                  <span>Physical Hardware</span>
                  <ArrowRight size={13} />
                </Link>
                <Link to="/wellness" className="text-slate-400 hover:text-white font-medium">
                  Autonomic Reset →
                </Link>
              </div>
            </div>

            {/* Track 2: Diagnostic Radar (The Missing Key) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/40 hover:border-amber-500/70 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg group hover:-translate-y-1 relative">
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-cyan-500 rounded-t-2xl opacity-80" />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/50 font-bold">
                    Track 2 • Missing Key
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Diagnostic Radar
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clinician Co-Pilot Workbook, Level 1 ApoB/HbA1c/hs-CRP &amp; Level 2 56-Biomarker Cellular Map. Turn subjective health guesses into objective clinical telemetry.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    <span>14-day vital telemetry tracking sheet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    <span>Direct GP consultation discussion script</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    <span>Regional partner requisition links</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <Link to="/clinician-copilot" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                  <span>Open Co-Pilot App</span>
                  <ArrowRight size={13} />
                </Link>
                <Link to="/guide" className="text-slate-400 hover:text-white font-medium">
                  Diagnostic Guide →
                </Link>
              </div>
            </div>

            {/* Track 3: Targeted Nutrients & Precision */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg group hover:-translate-y-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Award size={20} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 font-bold">
                    Track 3
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Targeted Nutrients &amp; Precision
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Day 1 Universal Stack (D3+K2, Omega-3 EPA/DHA, Magnesium Glycinate/Malate) + Post-Lab Adjustments. Third-party verified supplements calibrated to your blood panel.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Universal foundational vitamin stack</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>ApoB lipid &amp; vascular endothelia defense</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>NSF-certified clean procurement</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <Link to="/nutrition" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">
                  <span>Nutrition Science</span>
                  <ArrowRight size={13} />
                </Link>
                <Link to="/store" className="text-slate-400 hover:text-white font-medium">
                  Procure Vitamins →
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 3: LOW-FRICTION MICRO-CONVERSIONS (Engagement & Lead Capture)        */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full">
              STAGE 3: LOW-FRICTION MICRO-CONVERSIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
              Zero-Risk Starting Points (100% Free)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Choose your frictionless entry tool to turn speculation into structured personal data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CTA Card 1: 5-Minute Longevity Quiz */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-500/60 flex flex-col justify-between space-y-4 shadow-xl transition-all">
              <div className="space-y-2">
                <span className="text-2xl">🎯</span>
                <h4 className="text-base sm:text-lg font-bold text-white">5-Minute Longevity Quiz</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Diagnose your baseline score across all 6 core protocols. Pinpoint hidden metabolic and recovery blind spots in under 5 minutes.
                </p>
              </div>
              <Link
                to="/quiz"
                className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>🎯 Take the 5-Minute Quiz</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* CTA Card 2: Clinician Co-Pilot Workbook */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 flex flex-col justify-between space-y-4 shadow-xl transition-all">
              <div className="space-y-2">
                <span className="text-2xl">🩺</span>
                <h4 className="text-base sm:text-lg font-bold text-white">Clinician Co-Pilot Workbook</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Free interactive 4-page clinical app and print-ready GP consultation template. Record 14 days of vitals and present exact lab requests.
                </p>
              </div>
              <Link
                to="/clinician-copilot"
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>🩺 Open Clinician Co-Pilot</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* CTA Card 3: Free Blueprint PDF */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 hover:border-indigo-500/60 flex flex-col justify-between space-y-4 shadow-xl transition-all">
              <div className="space-y-2">
                <span className="text-2xl">📘</span>
                <h4 className="text-base sm:text-lg font-bold text-white">Free Longevity Blueprint (PDF)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct open-access download: 28-page geroscience guide, biological decay primer, and 4-week habit tracker with zero paywall.
                </p>
              </div>
              <a
                href="/assets/docs/the-next-level-lifespan-v7.pdf"
                download
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold rounded-xl text-center text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Download size={14} className="text-cyan-400" />
                <span>📘 Download Free Blueprint</span>
              </a>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 4: REVENUE & STOREFRONT FUNNEL (Monetization Hooks)                  */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4 border-t border-slate-900">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-800/50 px-3 py-1 rounded-full">
              STAGE 4: REVENUE &amp; HARDWARE STOREFRONT
            </span>
            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white font-black">
              Procure Clinical Diagnostics &amp; Master Protocols
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
            
            {/* Contextual Banner 1: Clinical Lab Requisitions */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 hover:border-cyan-500/60 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Stethoscope size={16} />
                    <span>Clinical Lab Requisitions</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300 font-bold">
                    Active Region: {market}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white">
                  Multi-Region Clinical Laboratory Draw Network
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Order direct, doctor-free blood requisitions through vetted regional partners with local phlebotomy draws in thousands of patient service centers:
                </p>

                {/* Multi-Market Badges */}
                <div className="space-y-2 pt-1">
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${market === 'US' ? 'bg-cyan-950/60 border-cyan-500/50 text-white font-semibold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <div className="flex items-center gap-2">
                      <FlagUS className="w-4 h-3 shrink-0" />
                      <span>🇺🇸 <strong>US (HealthLabs):</strong> Cellular Biomarker Map &amp; Standalone ApoB / HbA1c</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">Quest / Labcorp</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${market === 'UK' ? 'bg-cyan-950/60 border-cyan-500/50 text-white font-semibold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <div className="flex items-center gap-2">
                      <FlagUK className="w-4 h-3 shrink-0" />
                      <span>🇬🇧 <strong>UK (LOLA Health):</strong> Lola Vital Check 56 Master Panel</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">UK-Wide Phlebotomy</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${market === 'ES' ? 'bg-cyan-950/60 border-cyan-500/50 text-white font-semibold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <div className="flex items-center gap-2">
                      <FlagES className="w-4 h-3 shrink-0" />
                      <span>🇪🇸 <strong>Spain (Melio / SaludOnNet):</strong> Melio Vital Check ES Master Panel</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">Megalab / Unilabs</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/store')}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Local Diagnostic Panels ➔</span>
              </button>
            </div>

            {/* Contextual Banner 2: Premium Master Series */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/30 hover:border-amber-500/60 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <BookOpen size={16} />
                  <span>The Master Longevity Series</span>
                </div>

                <h4 className="text-xl font-bold text-white">
                  9 Comprehensive Digital Master Guides
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Need exact workout schedules, meal plans, or stress protocols? Go beyond high-level theory with our complete library of 9 granular clinical manuals:
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Longevity Home Workout Plan</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Master Meal Planning Guide</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Vagal Tone &amp; Cortisol Reset</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Women's Hormonal Longevity</span>
                  </div>
                </div>

                <p className="text-xs font-medium text-amber-400/90 italic pt-1">
                  Instant digital delivery via Stripe checkout. Complete with downloadable exercise matrices and printable nutrition guides.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/library')}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Unlock Premium Master Guides (£29 / $29) ➔</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default UnifiedExplainerSection;
