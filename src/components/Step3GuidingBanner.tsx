import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Download, 
  ExternalLink, 
  Stethoscope
} from 'lucide-react';

interface Step3GuidingBannerProps {
  id?: string;
  className?: string;
  onExportPdf?: () => void;
  onScrollToForm?: () => void;
  isExportingPdf?: boolean;
}

export const Step3GuidingBanner: React.FC<Step3GuidingBannerProps> = ({
  id,
  className = '',
  onScrollToForm,
}) => {
  return (
    <section 
      id={id} 
      className={`scroll-mt-28 space-y-6 ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER                                                         */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
          03
        </span>
        <div>
          <span className="text-[11px] font-mono uppercase text-sky-400 tracking-widest font-bold flex items-center gap-1.5">
            <Stethoscope size={13} />
            <span>PHYSICIAN PARTNERSHIP</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
            Step 3: The Clinician Co-Pilot — From Guessing to Knowing
          </h2>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. GUIDING EXPLANATION BANNER (POSITION #1 TOP COMPONENT)                 */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-xl p-6 mb-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* DIAGNOSTIC OPTIONS CLARIFICATION */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-sky-300 font-bold text-sm sm:text-base font-display tracking-wide">
            <span className="text-base sm:text-lg">💡</span>
            <span>Understanding Your Diagnostic Options First</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            We recommend choosing one of two clinical blood panels depending on how deep you want to go before logging your data:
          </p>

          <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
              <strong className="text-emerald-400 font-bold">• Choice A: Essential Baseline Check</strong> — A targeted entry-level panel covering core lipids, fasting glucose, HbA1c (90-day sugar trend), and basic organ function.
            </li>
            <li className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30">
              <strong className="text-cyan-400 font-bold">• Choice B: Comprehensive Cellular Map (Vital Check 56)</strong> — Our deep-dive gold standard covering 56 biomarkers, including ApoB (vascular plaque risk), hs-CRP (inflammation), thyroid, hormones, and micronutrients.
            </li>
          </ul>
        </div>

        {/* 3-STEP WORKFLOW SUMMARY */}
        <div className="space-y-3 pt-2 relative z-10 border-t border-slate-800">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
            How to Prepare Your GP Brief in 3 Steps:
          </h3>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300">
            <li className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5 leading-relaxed">
              <strong className="text-sky-400 font-bold block">1. 📖 Read &amp; Learn:</strong>
              <span className="text-xs text-slate-300 font-light block">
                Use <em>The Next Level Lifespan Educational Workbook (PDF)</em> to decode target ranges.
              </span>
            </li>

            <li className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5 leading-relaxed">
              <strong className="text-amber-400 font-bold block">2. 💻 Log Your Panel:</strong>
              <span className="text-xs text-slate-300 font-light block">
                Open the online form (<code className="text-amber-300 text-[11px] bg-slate-900 px-1 py-0.5 rounded">/clinician-copilot</code>), select Choice A (Essential) or Choice B (Vital 56), and enter your lab numbers alongside your weekly home urine test and smart scale telemetry.
              </span>
            </li>

            <li className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5 leading-relaxed">
              <strong className="text-teal-400 font-bold block">3. 📄 Export for Your GP:</strong>
              <span className="text-xs text-slate-300 font-light block">
                Click to generate your pre-filled 2-Page GP Consultation Brief (or download a blank template) for your doctor appointment.
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ACTION BUTTONS CONTAINER (PLACED AFTER THE EXPLANATION)                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Button 1: Open Online Logging Form (/clinician-copilot) */}
        {onScrollToForm ? (
          <button
            type="button"
            onClick={onScrollToForm}
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <FileText size={16} />
            <span>Open Online Logging Form (/clinician-copilot)</span>
          </button>
        ) : (
          <Link
            to="/clinician-copilot"
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99]"
          >
            <FileText size={16} />
            <span>Open Online Logging Form (/clinician-copilot)</span>
          </Link>
        )}

        {/* Button 2: Download 2-Page GP Brief Template (PDF) */}
        <a
          href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="clinical-baseline-consultation-template-v2.pdf"
          className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Download size={16} />
          <span>Download 2-Page GP Brief Template (PDF)</span>
        </a>

        {/* Button 3: Download Educational Workbook (PDF) */}
        <a
          href="/assets/docs/the-next-level-lifespan-2026.pdf?v=2026-revised"
          target="_blank"
          rel="noopener noreferrer"
          download="the-next-level-lifespan-2026.pdf"
          className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99]"
        >
          <BookOpen size={16} />
          <span>Download Educational Workbook (PDF)</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </section>
  );
};

export default Step3GuidingBanner;
