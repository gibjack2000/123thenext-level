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
      {/* 1. TOP GUIDANCE BANNER (Above Step Cards)                                 */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-xl p-6 mb-8 shadow-2xl space-y-3 relative overflow-hidden backdrop-blur-md">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-base sm:text-lg font-display font-black text-sky-300 tracking-wide relative z-10 flex items-center gap-2">
          <span>💡 Why Prepare a Clinician Co-Pilot Brief?</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium relative z-10">
          Your General Practitioner typically has just 10 minutes per appointment. Handing them endless phone screens or complex raw lab sheets leads to decision fatigue. The Clinician Co-Pilot automatically translates your blood labs, urine tests, and home wearable telemetry into a standardized 2-Page GP Brief that doctors can scan and act on in seconds.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. STEP CARDS & INTER-CARD HELPER MICROCOPY                               */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* STEP 1 CARD */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-950/90 border border-sky-500/30 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <span className="text-base">🩸</span>
              <h3 className="text-sm sm:text-base font-display font-black text-sky-300 tracking-wide">
                1. Coordinate Your Diagnostics
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <li>
                <span className="text-slate-100 font-semibold">• Blood Panel Choice:</span>{' '}
                <strong className="text-emerald-400">Choice A (Essential Baseline)</strong> OR{' '}
                <strong className="text-cyan-400">Choice B (Vital Check 56)</strong>.
              </li>
              <li>
                <span className="text-slate-100 font-semibold">• Lab Urine Test:</span> Scheduled Urine ACR test alongside your blood draw.
              </li>
              <li>
                <span className="text-slate-100 font-semibold">• Home Urine Test:</span> Weekly 60-second Sunday 10-parameter dipsticks in between.
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

        {/* INTER-CARD CALLOUT (Between Step 1 & Step 2) */}
        <div className="p-4 sm:p-5 rounded-xl bg-sky-950/50 border border-sky-500/40 text-xs sm:text-sm text-sky-100 leading-relaxed shadow-md">
          <strong className="text-sky-300 font-bold">📌 Co-Pilot Coordination Note:</strong> Request your clinical Urine ACR test for the exact same morning as your blood draw. One quick lab visit gives your GP a fully synchronized cardiovascular, metabolic, and renal (kidney) profile.
        </div>

        {/* STEP 2 & STEP 3 CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* STEP 2 CARD */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-950/90 border border-amber-500/30 flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <span className="text-base">💻</span>
                <h3 className="text-sm sm:text-base font-display font-black text-amber-300 tracking-wide">
                  2. Log Telemetry Online
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <li>
                  <span className="text-slate-100 font-semibold">• Form Link:</span> Open{' '}
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
                  <span className="text-slate-100 font-semibold">• Dynamic Toggle:</span> Select{' '}
                  <strong className="text-emerald-400">Choice A</strong> vs{' '}
                  <strong className="text-cyan-400">Choice B</strong> and{' '}
                  <strong className="text-sky-300">Lab ACR</strong> vs{' '}
                  <strong className="text-amber-300">Home Dipsticks</strong> to reveal only relevant input fields.
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
          <div className="p-5 sm:p-6 rounded-xl bg-slate-950/90 border border-teal-500/30 flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <span className="text-base">📄</span>
                <h3 className="text-sm sm:text-base font-display font-black text-teal-300 tracking-wide">
                  3. Export Your GP Brief
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <li>
                  <span className="text-slate-100 font-semibold">• Output:</span> Generate pre-filled{' '}
                  <a
                    href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="clinical-baseline-consultation-template-v2.pdf"
                    className="text-teal-300 hover:text-teal-200 text-xs bg-slate-900 px-1.5 py-0.5 rounded font-mono underline"
                  >
                    clinical-baseline-consultation-template-v2.pdf
                  </a>{' '}
                  or download a blank pen-and-paper template.
                </li>
                <li>
                  <span className="text-slate-100 font-semibold">• Reference Guide:</span> Use{' '}
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
      {/* 3. POST-CARD CLINIC PREPARATION GUIDANCE (Below Cards)                    */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-teal-500/30 rounded-xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base sm:text-lg font-display font-black text-teal-300 tracking-wide flex items-center gap-2 border-b border-slate-800 pb-3">
          <span>🩺 How to Conduct Your 10-Minute GP Consultation</span>
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <li>
            • <strong className="text-white">Hand Page 1 to Your GP</strong>: Pass the printed summary directly to your doctor at the start of the appointment. Page 1 contains your standardized red-flag matrix, key lab averages, and primary discussion points.
          </li>
          <li>
            • <strong className="text-white">Keep Page 2 as Your Checklist</strong>: Hold onto Page 2 during the visit—it lists your 14-day home telemetry trends (HRV, visceral fat, sleep) and personal notes.
          </li>
          <li>
            • <strong className="text-white">Collaborative Care</strong>: Frame the conversation around partnership:{' '}
            <em className="text-teal-200">
              &quot;I&apos;ve logged my baseline health metrics to help us catch any subtle shifts early and optimize my long-term healthspan.&quot;
            </em>
          </li>
        </ul>
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
