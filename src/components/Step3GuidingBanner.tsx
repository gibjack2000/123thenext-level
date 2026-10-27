import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Activity, 
  FileText, 
  FileDown, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
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
  onExportPdf,
  onScrollToForm,
  isExportingPdf = false,
}) => {
  return (
    <section 
      id={id} 
      className={`scroll-mt-28 space-y-6 ${className}`}
    >
      {/* SECTION HEADER & STEP BADGE */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-sm shrink-0">
          03
        </span>
        <div>
          <span className="text-[11px] font-mono uppercase text-amber-400 tracking-widest font-bold flex items-center gap-1.5">
            <Stethoscope size={13} />
            <span>PHYSICIAN PARTNERSHIP</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
            Step 3: The Clinician Co-Pilot — From Guessing to Knowing
          </h2>
        </div>
      </div>

      {/* COMPREHENSIVE GUIDING INTRO BANNER COPY */}
      <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/30 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal relative z-10">
          Raw biometric data isn&apos;t a diagnosis—it becomes actionable when translated into a structured clinical summary for your doctor.
        </p>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light relative z-10">
          Whether you selected <strong className="text-emerald-400 font-bold">Blood Test Choice A (LOLA Essential Check)</strong> for a targeted baseline or <strong className="text-cyan-400 font-bold">Blood Test Choice B (LOLA Vital Check 56)</strong> for full cellular mapping—paired with your weekly home urine dipsticks or quarterly lab ACR—combine your numbers with your 14-day smart scale and wearable telemetry in 3 simple steps:
        </p>
      </div>

      {/* 3-STEP QUICK-GUIDE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: 📖 1. Read & Decode */}
        <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-slate-900 via-sky-950/50 to-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#0ea5e9] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-sky-700 rounded-full filter blur-2xl opacity-20 pointer-events-none" />

          {/* Watermark seal */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 300">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-400">
              <rect x="50" y="40" width="90" height="130" rx="4" />
              <line x1="65" y1="65" x2="125" y2="65" strokeWidth="2" />
              <line x1="65" y1="85" x2="125" y2="85" />
              <line x1="65" y1="105" x2="115" y2="105" />
              <line x1="65" y1="125" x2="125" y2="125" />
              <rect x="160" y="40" width="90" height="130" rx="4" />
              <line x1="175" y1="65" x2="235" y2="65" strokeWidth="2" />
              <line x1="175" y1="85" x2="235" y2="85" />
              <line x1="175" y1="105" x2="225" y2="105" />
              <line x1="175" y1="125" x2="235" y2="125" />
              <circle cx="150" cy="225" r="32" strokeDasharray="3,3" />
              <circle cx="150" cy="225" r="25" />
              <path d="M150,212 L150,238 M137,225 L163,225" strokeWidth="2.5" />
            </g>
          </svg>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                STEP 1 • EDUCATIONAL GUIDE
              </span>
              <BookOpen size={18} className="text-cyan-400" />
            </div>

            <div>
              <h3 className="text-lg font-display font-black uppercase text-white flex items-center gap-2">
                <span>📖 1. Read &amp; Decode</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                Study <em>The Next Level Lifespan</em> Educational Workbook (PDF) to understand clinical target ranges for both Essential &amp; Vital 56 biomarkers.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-200">Asset: the-next-level-lifespan.pdf</div>
              <div>Reference target ranges for Choice A &amp; Choice B</div>
            </div>
          </div>

          <div className="relative z-10">
            <a
              href="/assets/docs/the-next-level-lifespan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group-hover:bg-cyan-500 group-hover:text-slate-950"
            >
              <BookOpen size={14} />
              <span>Read Workbook (PDF)</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* CARD 2: 💻 2. Log Your Telemetry */}
        <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-slate-900 via-sky-950/50 to-slate-950 border border-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl ring-1 ring-amber-500/20">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#0ea5e9] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#f59e0b] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 300">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
              <rect x="50" y="40" width="90" height="130" rx="4" />
              <line x1="65" y1="65" x2="125" y2="65" strokeWidth="2" />
              <line x1="65" y1="85" x2="125" y2="85" />
              <line x1="65" y1="105" x2="115" y2="105" />
              <line x1="65" y1="125" x2="125" y2="125" />
              <rect x="160" y="40" width="90" height="130" rx="4" />
              <line x1="175" y1="65" x2="235" y2="65" strokeWidth="2" />
              <line x1="175" y1="85" x2="235" y2="85" />
              <line x1="175" y1="105" x2="225" y2="105" />
              <line x1="175" y1="125" x2="235" y2="125" />
              <circle cx="150" cy="225" r="32" strokeDasharray="3,3" />
              <circle cx="150" cy="225" r="25" />
              <path d="M150,212 L150,238 M137,225 L163,225" strokeWidth="2.5" />
            </g>
          </svg>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-amber-950 border border-amber-800 text-amber-400 font-bold">
                STEP 2 • TELEMETRY LOGGER
              </span>
              <Activity size={18} className="text-amber-400" />
            </div>

            <div>
              <h3 className="text-lg font-display font-black uppercase text-white flex items-center gap-2">
                <span>💻 2. Log Your Telemetry</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                Select whether you completed <strong className="text-emerald-300 font-semibold">Choice A (Essential)</strong> or <strong className="text-cyan-300 font-semibold">Choice B (Vital 56)</strong> in the online form (<code className="text-amber-300 text-[11px] bg-slate-900 px-1 py-0.5 rounded">/clinician-copilot</code>) and enter your 14-day wearable/scale averages and urine metrics.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-emerald-300 flex items-center gap-1">
                <ShieldCheck size={12} /> 100% LocalStorage Privacy
              </div>
              <div>Dynamic pathology field expansion • Guest Mode</div>
            </div>
          </div>

          <div className="relative z-10">
            {onScrollToForm ? (
              <button
                type="button"
                onClick={onScrollToForm}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <FileText size={14} />
                <span>Open Online Form →</span>
              </button>
            ) : (
              <Link
                to="/clinician-copilot#interactive-form"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
              >
                <FileText size={14} />
                <span>Open Online Form →</span>
              </Link>
            )}
          </div>
        </div>

        {/* CARD 3: 📄 3. Export or Print for GP */}
        <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-slate-900 via-sky-950/50 to-slate-950 border border-slate-800 hover:border-teal-500/50 hover:shadow-[0_0_25px_rgba(20,184,166,0.15)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#0ea5e9] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#14b8a6] rounded-full filter blur-2xl opacity-20 pointer-events-none" />

          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 300">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-400">
              <rect x="50" y="40" width="90" height="130" rx="4" />
              <line x1="65" y1="65" x2="125" y2="65" strokeWidth="2" />
              <line x1="65" y1="85" x2="125" y2="85" />
              <line x1="65" y1="105" x2="115" y2="105" />
              <line x1="65" y1="125" x2="125" y2="125" />
              <rect x="160" y="40" width="90" height="130" rx="4" />
              <line x1="175" y1="65" x2="235" y2="65" strokeWidth="2" />
              <line x1="175" y1="85" x2="235" y2="85" />
              <line x1="175" y1="105" x2="225" y2="105" />
              <line x1="175" y1="125" x2="235" y2="125" />
              <circle cx="150" cy="225" r="32" strokeDasharray="3,3" />
              <circle cx="150" cy="225" r="25" />
              <path d="M150,212 L150,238 M137,225 L163,225" strokeWidth="2.5" />
            </g>
          </svg>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-teal-950 border border-teal-800 text-teal-400 font-bold">
                STEP 3 • CLINICAL BRIEF
              </span>
              <FileDown size={18} className="text-teal-400" />
            </div>

            <div>
              <h3 className="text-lg font-display font-black uppercase text-white flex items-center gap-2">
                <span>📄 3. Export or Print for GP</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                Click to generate your pre-filled <strong>2-Page GP Consultation Brief</strong> (<code className="text-cyan-300 text-[11px] bg-slate-900 px-1 py-0.5 rounded">clinical-baseline-consultation-template-v2.pdf</code>), or download a blank template if you prefer to complete it by hand with a pen.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-200">Asset: clinical-baseline-consultation-template-v2.pdf</div>
              <div>Dual Mode: Auto-filled vector PDF or printable blank</div>
            </div>
          </div>

          <div className="space-y-2 relative z-10">
            {onExportPdf ? (
              <button
                type="button"
                onClick={onExportPdf}
                disabled={isExportingPdf}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-75 disabled:cursor-wait"
              >
                <Download size={13} />
                <span>{isExportingPdf ? 'Compiling PDF...' : 'Export Pre-Filled GP Brief (PDF)'}</span>
              </button>
            ) : (
              <Link
                to="/clinician-copilot"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <Download size={13} />
                <span>Export Pre-Filled (via Form)</span>
              </Link>
            )}

            <a
              href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
              download="clinical-baseline-consultation-template-v2.pdf"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] uppercase tracking-wider transition-all"
            >
              <span>✏️ Download Blank Template (PDF)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Step3GuidingBanner;
