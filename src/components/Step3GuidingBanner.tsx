import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isStandaloneCopilot = location.pathname === '/clinician-copilot';

  const handleOpenInteractiveForm = (e: React.MouseEvent) => {
    if (isStandaloneCopilot || onScrollToForm) {
      e.preventDefault();
      if (onScrollToForm) {
        onScrollToForm();
      } else {
        const el = document.getElementById('gp-template-page-1');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      id={id} 
      className={`scroll-mt-28 space-y-6 ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. CONTEXTUAL SECTION HEADER                                              */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        {isStandaloneCopilot ? (
          <span className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
            <Stethoscope size={18} />
          </span>
        ) : (
          <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
            03
          </span>
        )}
        <div>
          <span className="text-[11px] font-mono uppercase text-sky-400 tracking-widest font-bold flex items-center gap-1.5">
            <Stethoscope size={13} />
            <span>PHYSICIAN PARTNERSHIP &amp; CLINICAL COORDINATION</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
            {isStandaloneCopilot
              ? 'Clinician Co-Pilot Hub: From Guessing to Knowing'
              : 'Step 3: Clinician Co-Pilot — From Guessing to Knowing'}
          </h2>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTRO EXPLANATION BANNER & 3 NUMBERED ACTION CARDS                     */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-xl p-6 mb-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Intro Lead Paragraph */}
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium relative z-10">
          Raw biometric data isn&apos;t a diagnosis—it becomes powerful when translated into a structured clinical summary for your doctor. Follow this streamlined 3-step process to prepare for your 10-minute GP consultation:
        </p>

        {/* 3 Clean Numbered Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10">
          
          {/* STEP 1 CARD */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-sky-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <span className="text-base">🩸</span>
                <h3 className="text-sm sm:text-base font-display font-black text-sky-300 tracking-wide">
                  1. Coordinate Your Diagnostics
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li>
                  <span className="text-slate-100 font-semibold">• Blood Draw Choice:</span> Select <strong className="text-emerald-400">Choice A (LOLA Essential Check)</strong> for a targeted baseline OR <strong className="text-cyan-400">Choice B (LOLA Vital Check 56)</strong> for full cellular mapping.
                </li>
                <li className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-slate-200">
                  <span className="text-sky-300 font-bold">• Lab Urinalysis Coordination:</span> <strong>Request your clinical Urine ACR (Microalbumin) test during the exact same laboratory visit as your blood draw.</strong> Submitting your urine sample alongside your blood draw gives your GP a synchronized cardiovascular, metabolic, and renal (kidney) assessment in one visit.
                </li>
                <li>
                  <span className="text-slate-100 font-semibold">• Weekly Home Testing:</span> Continue your 60-second Sunday 10-parameter dipstick for continuous hydration and pH monitoring.
                </li>
              </ul>
            </div>

            {/* Regional Affiliate Quick-Links */}
            <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Book Lab Draw + Urine ACR:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <a
                  href="https://referrals.lolahealth.com/NextLevel15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold transition"
                >
                  <span>🇬🇧 UK: LOLA Health</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href="https://www.healthlabs.com/?affiliate=123znl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold transition"
                >
                  <span>🇺🇸 US: HealthLabs</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href="https://www.melio.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 text-amber-300 text-[10px] font-bold transition"
                >
                  <span>🇪🇸 ES: SaludOnNet / Melio</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* STEP 2 CARD */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-amber-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <span className="text-base">💻</span>
                <h3 className="text-sm sm:text-base font-display font-black text-amber-300 tracking-wide">
                  2. Log Telemetry Online
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li>
                  • Open the interactive form at{' '}
                  <Link
                    to="/clinician-copilot#gp-template-page-1"
                    onClick={handleOpenInteractiveForm}
                    className="text-amber-300 hover:text-amber-200 font-mono font-bold underline cursor-pointer"
                  >
                    /clinician-copilot
                  </Link>
                  .
                </li>
                <li>
                  • Toggle your blood test tier (<strong className="text-emerald-400">Choice A</strong> vs. <strong className="text-cyan-400">Choice B</strong>) so the form displays only your relevant biomarker fields.
                </li>
                <li>
                  • Enter your lab results (Blood + Urine ACR), weekly dipstick averages, and 14-day smart scale / wearable metrics.
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400 font-mono">
                🔒 100% Guest Mode
              </span>
              <Link
                to="/clinician-copilot#gp-template-page-1"
                onClick={handleOpenInteractiveForm}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[10px] font-bold transition cursor-pointer"
              >
                <span>{isStandaloneCopilot ? 'Jump to Form ↓' : 'Open Form ➔'}</span>
              </Link>
            </div>
          </div>

          {/* STEP 3 CARD */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-teal-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <span className="text-base">📄</span>
                <h3 className="text-sm sm:text-base font-display font-black text-teal-300 tracking-wide">
                  3. Export GP Consultation Brief
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li>
                  • Click to generate your pre-filled <strong className="text-white">2-Page GP Consultation Brief</strong> (
                  <a
                    href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="clinical-baseline-consultation-template-v2.pdf"
                    className="text-teal-300 hover:text-teal-200 text-[11px] bg-slate-900 px-1 py-0.5 rounded font-mono underline"
                  >
                    clinical-baseline-consultation-template-v2.pdf
                  </a>
                  ).
                </li>
                <li>
                  • Alternatively, download a blank PDF template to complete by hand before your doctor appointment.
                </li>
                <li>
                  • Reference{' '}
                  <a
                    href="/assets/docs/the-next-level-lifespan-2026.pdf?v=2026-revised"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200 italic underline"
                  >
                    The Next Level Lifespan Educational Workbook (PDF)
                  </a>{' '}
                  at home to decode optimal longevity ranges.
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-teal-400 font-mono">
              ✓ Built for standard 10-minute GP appointments
            </div>
          </div>

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
            <span>Jump to Online Logging Form ↓</span>
          </button>
        ) : (
          <Link
            to="/clinician-copilot#gp-template-page-1"
            onClick={handleOpenInteractiveForm}
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
    </div>
  );
};

export default Step3GuidingBanner;
