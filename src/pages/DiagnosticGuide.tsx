import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Activity, Shield, Download, FileText, CheckCircle2, 
  Microscope, Stethoscope, Gauge, Droplet, ArrowRight, 
  ExternalLink, Lock, AlertCircle, Sparkles, ChevronRight
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';
import Track1Diagnostics from '../components/Track1Diagnostics';

export const DiagnosticGuide: React.FC = () => {
  const { market, setMarket } = useMarket();
  const [activeRegion, setActiveRegion] = useState<'UK' | 'US' | 'ES'>((market as 'UK' | 'US' | 'ES') || 'UK');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Phase 1 Diagnostic Suite: Biomarker Baseline | 123TheNextLevel';
  }, []);

  useEffect(() => {
    if (market && ['US', 'UK', 'ES'].includes(market)) {
      setActiveRegion(market as 'UK' | 'US' | 'ES');
    }
  }, [market]);

  const handleRegionSwitch = (reg: 'UK' | 'US' | 'ES') => {
    setActiveRegion(reg);
    setMarket(reg as Market);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER: Phase 1 Diagnostic Onboarding */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Activity size={14} className="animate-pulse" />
            <span>PHASE 1 ONBOARDING: ESTABLISH CLINICAL BASELINE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
            The Phase 1{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Diagnostic Suite
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
            Traditional medicine waits for symptoms. True geroscience uses an <strong>Early Warning Radar</strong>. 
            Before modifying your nutrition, exercise, or supplement stack, establish your verifiable, clinical-grade biomarker baseline.
          </p>

          {/* Quick Actions & Market Toggle Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            {/* Regional Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs">
              <span className="px-3 text-slate-400 text-[11px] font-semibold uppercase tracking-wider hidden sm:inline">Region:</span>
              <button
                type="button"
                onClick={() => handleRegionSwitch('UK')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeRegion === 'UK' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUK className="w-4 h-3 pointer-events-none" /> <span>UK (£149)</span>
              </button>
              <button
                type="button"
                onClick={() => handleRegionSwitch('US')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeRegion === 'US' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUS className="w-4 h-3 pointer-events-none" /> <span>US ($299)</span>
              </button>
              <button
                type="button"
                onClick={() => handleRegionSwitch('ES')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeRegion === 'ES' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagES className="w-4 h-3 pointer-events-none" /> <span>ES (149€)</span>
              </button>
            </div>

            {/* Clinician Co-Pilot Link */}
            <Link
              to="/clinician-copilot"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <FileText size={14} />
              <span>Clinician Co-Pilot &amp; GP Script (PDF Included)</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION A: DIRECT CLINICAL BLOOD PANELS & LAB DRAWS */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest font-bold">SECTION A: CLINICAL BLOOD DRAW NETWORKS</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
                Gold-Standard Venous Phlebotomy
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              We mandate venous draws over finger-pricks to prevent cell hemolysis and guarantee clinical accuracy for ApoB, HbA1c, and hs-CRP.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1: UK - Lola Vital Check 56 */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeRegion === 'UK' 
                ? 'bg-slate-900/80 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40' 
                : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    🇬🇧 United Kingdom
                  </span>
                  <span className="text-xl font-display font-black text-white">£149.00</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    Lola Vital Check 56
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    56-Biomarker Longevity Blood Map • Phlebotomy Home Collection (£237) or Walk-In Clinic (£149)
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>ApoB:</strong> Direct cardiovascular particle count</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>HbA1c:</strong> 90-day glycemic control index</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>hs-CRP:</strong> Systemic vascular inflammation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Full Liver, Kidney, Lipid & Thyroid Hormone Profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>NHS-standard UKAS accredited lab & GMC doctor review</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href="https://snwbl.io/out/NcealZ11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Book Lola Vital Check (UK)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Card 2: US - HealthLabs 56-Biomarker Panel */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeRegion === 'US' 
                ? 'bg-slate-900/80 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40' 
                : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    🇺🇸 United States
                  </span>
                  <span className="text-xl font-display font-black text-white">$299.00</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    HealthLabs 56-Biomarker Panel
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    4,500+ CLIA-Certified Partner Facilities (Quest Diagnostics & Labcorp)
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>ApoB + Comprehensive Lipids:</strong> Atherogenic risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>Fasting Glucose & HbA1c:</strong> Metabolic baseline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>High-Sensitivity CRP:</strong> Low-grade inflammation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Complete Blood Count (CBC) + Comprehensive Metabolic Panel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Doctor requisition included; zero insurance billing friction</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href="https://www.healthlabs.com/?affiliate=123znl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Order HealthLabs Draw (US)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Card 3: ES - Melio Cellular Map */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeRegion === 'ES' 
                ? 'bg-slate-900/80 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40' 
                : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    🇪🇸 Spain / España
                  </span>
                  <span className="text-xl font-display font-black text-white">149,00€</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    Melio Cellular Biomarker Map
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    56 Biomarkers • Certified Megalab Clinical Partner Centers across Spain
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>ApoB y Perfil Lipídico Avanzado:</strong> Riesgo cardiovascular</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>HbA1c y Glucosa Basal:</strong> Sensibilidad a la insulina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>Proteína C Reactiva Ultrasensible (hs-CRP):</strong> Inflamación</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Perfil Hepático, Renal, Hormonal y Mineral Completo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Laboratorio acreditado ISO y consulta médica digital incluida</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href="https://www.melio.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Reservar Análisis Melio (ES)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SECTION B: CONTINUOUS PHYSIOLOGICAL SENSORS & TELEMETRY GEAR */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest font-bold">SECTION B: CONTINUOUS PHYSIOLOGICAL SENSORS</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
              Curated Diagnostic Hardware & Telemetry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gear 1: Continuous Glucose Monitors (CGMs) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-teal-950 border border-teal-800 text-teal-300 font-bold">
                    Interstitial Glycemic Telemetry
                  </span>
                  <span className="text-sm font-mono text-slate-400 font-bold">From £79 / $89 / 79€</span>
                </div>

                <h3 className="text-xl font-display font-black uppercase text-white">
                  Continuous Glucose Monitors (CGMs)
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Direct biosensor mapping 24/7 interstitial glucose volatility. Discover glycemic spikes, post-prandial crashes, and autonomic stress responses in real time.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>🇬🇧 UK: Abbott Lingo Biosensor</span>
                    <a href="https://hellolingo.co.uk" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-bold">
                      Visit Lingo UK <ExternalLink size={11} />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>🇪🇸 ES: Dexcom ONE+ Sistema MCG</span>
                    <a href="https://www.dexcom.com/es-ES" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-bold">
                      Visitar Dexcom ES <ExternalLink size={11} />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>🇺🇸 US: Abbott Lingo OTC Sensor</span>
                    <a href="https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-bold">
                      Order on Amazon US <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>

              <Link
                to="/store"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>View Full Sovereign Hardware Catalog ➔</span>
              </Link>
            </div>

            {/* Gear 2: Eko CORE 500 Digital AI Stethoscope */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold">
                    FDA-Cleared 3-Lead ECG
                  </span>
                  <span className="text-sm font-mono text-slate-400 font-bold">£379 / $429</span>
                </div>

                <h3 className="text-xl font-display font-black uppercase text-white">
                  Eko CORE 500™ Digital AI Stethoscope
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  A high-fidelity digital stethoscope featuring an integrated full-color 3-lead ECG screen, 40x sound amplification, and real-time AI murmur and arrhythmia analysis.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Real-time phonocardiogram and electrocardiogram waveform streaming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Co-evaluate recorded acoustic & electrical cardiac signals with your doctor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Clinician-validated acoustic filtering and ambient noise cancellation</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.ekohealth.com/products/core-500-digital-stethoscope"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Order on Eko Health Official ↗</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SECTION C: DOWNLOADABLE GP CONSULTATION TEMPLATE */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <FileText size={14} />
              <span>CLINICAL CO-PILOT TOOLKIT</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
              THE CLINICIAN CO-PILOT: FROM GUESSING TO KNOWING
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Bridge the gap between consumer health telemetry and clinical evaluation. This 4-page printable workbook organizes your blood draw metrics, resting telemetry, and specific proactive questions for your GP or primary care physician.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              to="/clinician-copilot"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer"
            >
              <span>Open Clinician Co-Pilot ➔</span>
            </Link>
            <a
              href="/assets/docs/clinical-baseline-consultation-workbook.pdf"
              download="clinical-baseline-consultation-workbook.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
            <Link
              to="/store"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Explore Sovereign Store ➔</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. SECTION D: INTERACTIVE 10-PARAMETER URINALYSIS & BLOOD LOGGING */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest font-bold">SECTION D: INTERACTIVE AT-HOME URINALYSIS SUITE</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
              Virtual Chemical Reagent Pad Analyzer
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Match your 10-parameter urine test strip colors directly on-screen, log blood pressure telemetry, and export a clinician-ready PDF report instantly.
            </p>
          </div>

          <Track1Diagnostics />
        </div>

      </div>
    </div>
  );
};

export default DiagnosticGuide;
