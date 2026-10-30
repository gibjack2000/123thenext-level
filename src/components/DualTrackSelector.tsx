import React, { useState } from 'react';
import { 
  Calendar, 
  Activity, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Droplets, 
  Clock, 
  ShieldCheck, 
  Download, 
  Stethoscope, 
  Sparkles,
  ArrowRight,
  FlaskConical,
  Zap,
  Info
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from './MarketSelector';
import { useDownloadGate } from './DownloadGateModal';
import { useLabRequisition } from './LabRequisitionModal';

export interface DualTrackSelectorProps {
  className?: string;
  initialMarket?: Market;
  syncGlobalMarket?: boolean;
  showEducationalCard?: boolean;
}

interface RegionalTrackData {
  regionName: string;
  tabLabel: string;
  flagIcon: React.ReactNode;
  track1: {
    title: string;
    network: string;
    badge: string;
    description: string;
    cadence: string;
    affiliateUrl: string;
    actionLabel: string;
    pdfLabel: string;
    pdfUrl: string;
    highlights: string[];
  };
  track2: {
    title: string;
    badge: string;
    description: string;
    cadence: string;
    affiliateUrl: string;
    actionLabel: string;
    highlights: string[];
    biomarkers: string[];
  };
}

const URINE_10_BIOMARKERS = [
  'Leukocytes',
  'Nitrite',
  'Urobilinogen',
  'Protein',
  'pH',
  'Blood',
  'Specific Gravity',
  'Ketones',
  'Bilirubin',
  'Glucose'
];

export const REGIONAL_DUAL_TRACK_DATA: Record<Market, RegionalTrackData> = {
  US: {
    regionName: 'United States',
    tabLabel: 'United States',
    flagIcon: <FlagUS className="w-5 h-3.5" />,
    track1: {
      title: 'HealthLabs Master Blood & Urinalysis Panel',
      network: 'Quest Diagnostics & Labcorp Network',
      badge: 'CLIA / CAP Accredited Phlebotomy',
      description: 'Comprehensive venous blood diagnostic panel paired with microalbumin & creatinine renal filtration analysis. Physician-approved requisitions without clinic wait times.',
      cadence: 'Quarterly (Every 90 Days)',
      affiliateUrl: 'https://www.healthlabs.com/?affiliate=123znl',
      actionLabel: 'Order US Blood & Urinalysis Panel',
      pdfLabel: '📄 Download GP Consultation Template (PDF V2)',
      pdfUrl: '/assets/docs/clinical-baseline-consultation-template-v2.pdf',
      highlights: [
        'ApoB, hs-CRP, HbA1c & 56 Key Biomarkers',
        'Urine Albumin-to-Creatinine Ratio (ACR)',
        '4,500+ Draw Locations Nationwide',
        'Physician-Reviewed Digital Results in 48-72h'
      ]
    },
    track2: {
      title: 'Diagnox Urinox-10 Medical-Grade 10-Parameter Strips',
      badge: 'FDA Cleared',
      description: 'Hospital-grade rapid fluid telemetry reagent strips. Dip for 60 seconds once per week to monitor metabolic state, kidney excretion safety, and systemic hydration.',
      cadence: 'Weekly (Every 7 Days)',
      affiliateUrl: 'https://diagnoxhealth.com/products/urinalysis-test',
      actionLabel: 'Order Diagnox Urinox-10 Strips',
      highlights: [
        'FDA Cleared Reagent Strip Technology',
        'Instant 60-Second Readout Visual Chart',
        'Tracks Ketosis, pH Balance & Protein Spillage',
        '100 Medical-Grade Strips per Cannister'
      ],
      biomarkers: URINE_10_BIOMARKERS
    }
  },
  UK: {
    regionName: 'United Kingdom',
    tabLabel: 'United Kingdom',
    flagIcon: <FlagUK className="w-5 h-3.5" />,
    track1: {
      title: 'LOLA Vital Check 56 & Renal ACR Panel',
      network: 'UKAS Pathology & Partner Phlebotomy Network',
      badge: 'UKAS Accredited & ISO 15189',
      description: "Nationwide British clinical venous phlebotomy panel measuring 56 vital biomarkers plus microvascular renal ACR telemetry with verified lab reports. When you arrive on LOLA Health, select: 'LOLA Vital Check 56' (Full 56-biomarker panel: ApoB, hs-CRP, Vitamin D, Thyroid & Hormones).",
      cadence: 'Quarterly (Every 90 Days)',
      affiliateUrl: 'https://referrals.lolahealth.com/NextLevel15',
      actionLabel: 'Order LOLA Vital Check 56 (£149) ➔',
      pdfLabel: '📄 Download GP Consultation Template (PDF V2)',
      pdfUrl: '/assets/docs/clinical-baseline-consultation-template-v2.pdf',
      highlights: [
        '56-Biomarker Venous Longevity Profile',
        'Urine ACR & Microalbuminuria Screening',
        'Nationwide Clinic or Home Nurse Draw',
        'GMC-Registered Doctor Analysis'
      ]
    },
    track2: {
      title: 'ALLTEST 10-Parameter Clinical Urinalysis Dipsticks UK',
      badge: 'CE Marked',
      description: 'CE Medical Marked 10-parameter urinalysis reagent test dipsticks for rapid at-home screening of kidney filtration integrity, acid-base status, and metabolic hydration.',
      cadence: 'Weekly (Every 7 Days)',
      affiliateUrl: 'https://referrals.lolahealth.com/NextLevel15',
      actionLabel: 'Order ALLTEST Dipsticks UK',
      highlights: [
        'CE Medical Device Certified (MHRA Aligned)',
        'Zero-Friction 60-Second In-Home Protocol',
        'Real-Time Urinary Biomarker Telemetry',
        '100 Single-Use Sealed Dipsticks'
      ],
      biomarkers: URINE_10_BIOMARKERS
    }
  },
  ES: {
    regionName: 'Spain / European Union',
    tabLabel: 'Spain / EU',
    flagIcon: <FlagES className="w-5 h-3.5" />,
    track1: {
      title: 'SaludOnNet / Eurofins Chequeo Completo con Orina',
      network: 'Eurofins Megalab & Red Unilabs España',
      badge: 'Marcado CE & ISO 15189',
      description: 'Chequeo biológico clínico completo con analítica de sangre venosa y análisis completo de orina con sedimento en más de 160 laboratorios autorizados.',
      cadence: 'Trimestral (Cada 90 Días)',
      affiliateUrl: 'PASTE_YOUR_SALUDONNET_AWIN_LINK',
      actionLabel: 'Pedir Chequeo Eurofins Megalab',
      pdfLabel: '📄 Download GP Consultation Template (PDF V2)',
      pdfUrl: '/assets/docs/clinical-baseline-consultation-template-v2.pdf',
      highlights: [
        'Panel Venoso Completo de 56 Biomarcadores',
        'Análisis de Orina con Sedimento y Filtración',
        'Más de 160 Laboratorios en España sin Cita Previa',
        'Informe Clínico Digital y Revisión Médica'
      ]
    },
    track2: {
      title: 'ALLTEST Tiras Reactivas de Orina 10 Parámetros ES',
      badge: 'CE Marked',
      description: 'Tiras reactivas clínicas de 10 parámetros homologadas con marcado CE médico para la monitorización semanal de función renal, cetonas, pH y microalbuminuria en España.',
      cadence: 'Semanal (Cada 7 Días)',
      affiliateUrl: '[PASTE_YOUR_SALUDONNET_AWIN_LINK]',
      actionLabel: 'Pedir Tiras Urinarias ALLTEST ES',
      highlights: [
        'Marcado CE de Producto Sanitario',
        'Lectura Visual Inmediata en 60 Segundos',
        'Seguimiento Domiciliario de Hidratación y Metabolismo',
        'Bote Hermético con 100 Tiras de Reacción'
      ],
      biomarkers: URINE_10_BIOMARKERS
    }
  }
};

export const DualTrackSelector: React.FC<DualTrackSelectorProps> = ({
  className = '',
  initialMarket,
  syncGlobalMarket = true,
  showEducationalCard = true,
}) => {
  const { market: globalMarket, setMarket: setGlobalMarket } = useMarket();
  const [selectedMarket, setSelectedMarket] = useState<Market>(
    initialMarket || (globalMarket as Market) || 'US'
  );
  const { triggerGatedDownload } = useDownloadGate();
  const { triggerLabRequisition } = useLabRequisition();

  const handleTabChange = (marketKey: Market) => {
    setSelectedMarket(marketKey);
    if (syncGlobalMarket && setGlobalMarket) {
      setGlobalMarket(marketKey);
    }
  };

  const currentData = REGIONAL_DUAL_TRACK_DATA[selectedMarket] || REGIONAL_DUAL_TRACK_DATA.US;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 md:p-10 shadow-2xl ${className}`}>
      {/* Background Ambience Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Framework Introduction */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-wider font-bold">
            <Sparkles size={12} className="text-cyan-400" />
            <span>Dual-Track Performance Framework</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight uppercase">
            Synchronized Biological Monitoring Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Eliminate diagnostic blindspots. Pair deep quarterly accredited laboratory baselines with rapid weekly in-home micro-telemetry for a complete, actionable feedback loop.
          </p>
        </div>

        {/* 3 Country Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner shrink-0">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold px-2 hidden sm:inline">
            Region:
          </span>
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {(['US', 'UK', 'ES'] as Market[]).map((marketKey) => {
              const item = REGIONAL_DUAL_TRACK_DATA[marketKey];
              const isActive = selectedMarket === marketKey;
              return (
                <button
                  key={marketKey}
                  type="button"
                  onClick={() => handleTabChange(marketKey)}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 font-black scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                  aria-pressed={isActive}
                >
                  {item.flagIcon}
                  <span>{item.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXPLICIT EDUCATIONAL CARD: THE DUAL-TRACK & DUAL-URINALYSIS ENGINE       */}
      {/* ========================================================================= */}
      {showEducationalCard && (
        <div className="relative z-10 mt-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 shadow-xl space-y-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/60">
              <FlaskConical size={12} className="text-cyan-400" />
              <span>Diagnostic Telemetry Decoupling</span>
            </div>
            <h4 className="text-lg sm:text-xl font-display font-black text-white tracking-tight uppercase">
              The Dual-Track Diagnostic Engine: Why Two Testing Speeds Exist
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-4xl">
              Quarterly clinical labs evaluate deep structural organ safety, while weekly home test strips verify how your daily habits are performing right now. Neither replaces the other.
            </p>
          </div>

          {/* 2-Column Urinalysis Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Left Column: Type 1 Quarterly Laboratory Urinalysis */}
            <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all duration-300 space-y-2.5 relative overflow-hidden group">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    Type 1: Lab-Based
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
                    <Calendar size={11} />
                    Every 90 Days
                  </span>
                </div>
                <h5 className="text-sm font-display font-bold text-white tracking-tight">
                  Type 1: Quarterly Laboratory Urinalysis (Lab-Based)
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  <strong>Purpose:</strong> Evaluates Urine Albumin-to-Creatinine Ratio (ACR), microalbuminuria, and renal sediment at an accredited pathology clinic every 90 days.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] text-cyan-300/90 font-mono">
                  <ShieldCheck size={12} className="text-cyan-400 shrink-0" />
                  <span>Deep structural microvascular &amp; renal filtration validation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Type 2 Weekly At-Home Rapid Dipsticks */}
            <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)] transition-all duration-300 space-y-2.5 relative overflow-hidden group">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Type 2: Self-Assessed
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <Clock size={11} />
                    Every 7 Days (60s)
                  </span>
                </div>
                <h5 className="text-sm font-display font-bold text-white tracking-tight">
                  Type 2: Weekly At-Home Rapid Dipsticks (Self-Assessed)
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  <strong>Purpose:</strong> 60-second bathroom test strips used every 7 days to monitor real-time hydration (specific gravity), pH balance, ketones, and glucose spillovers.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-300/90 font-mono">
                  <Zap size={12} className="text-emerald-400 shrink-0" />
                  <span>Zero-friction feedback loop responding directly to daily habits</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2-Column Responsive Card Grid (The Regional Product Pairs) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-8">
        
        {/* ========================================================================= */}
        {/* TRACK 1: QUARTERLY BIOLOGICAL BASELINE (LAB-BASED)                       */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between rounded-3xl backdrop-blur-md bg-gradient-to-br from-rose-950/60 via-slate-900/90 to-red-950/40 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 p-6 sm:p-7 shadow-2xl relative overflow-hidden group">
          {/* Content-Specific Ambient Glows: Ruby Crimson & Deep Rose */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#e11d48] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-rose-700 rounded-full filter blur-2xl opacity-20 pointer-events-none" />

          {/* Background Overlay: Subtle vascular branch / arterial pulse network SVG watermark */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 300">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rose-400">
              <path d="M150,0 Q140,80 150,150 T150,300" strokeWidth="2.5" />
              <path d="M150,90 Q90,120 40,110" />
              <path d="M150,130 Q210,160 270,140" />
              <path d="M150,190 Q80,220 20,240" />
              <path d="M150,220 Q220,250 280,270" />
              <circle cx="40" cy="110" r="3" fill="currentColor" />
              <circle cx="270" cy="140" r="3" fill="currentColor" />
              <circle cx="20" cy="240" r="3" fill="currentColor" />
              <circle cx="280" cy="270" r="3" fill="currentColor" />
            </g>
          </svg>
          
          <div className="space-y-5 relative z-10">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 shadow-sm">
                <Calendar size={13} className="text-cyan-400" />
                Track 1: Quarterly Biological Baseline (Lab-Based)
              </span>
              <span className="text-[10px] font-mono text-cyan-400/90 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 font-semibold flex items-center gap-1">
                <Clock size={11} className="text-cyan-400" />
                {currentData.track1.cadence}
              </span>
            </div>

            {/* Mandatory Subtext */}
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-l-2 border-cyan-500/60 pl-3">
              Deep macro-diagnostics run every 90 days at accredited pathology clinics to evaluate cardiovascular, metabolic, and renal risk.
            </p>

            {/* Product Pairing Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
                  {currentData.track1.badge}
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-cyan-400" />
                  {currentData.track1.network}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                {currentData.track1.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {currentData.track1.description}
              </p>

              {/* Highlights */}
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-900">
                {currentData.track1.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs: Direct Requisition + Download PDF V2 */}
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-800/80 relative z-10">
            {/* Primary Order Button */}
            <button
              type="button"
              onClick={() => triggerLabRequisition({
                destinationUrl: currentData.track1.affiliateUrl,
                testName: `${currentData.track1.title} (${selectedMarket})`,
              })}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer"
            >
              <span>{currentData.track1.actionLabel}</span>
              <ExternalLink size={14} />
            </button>

            {/* Mandatory PDF Consultation Template V2 Button */}
            <button
              type="button"
              onClick={() => triggerGatedDownload({
                fileUrl: currentData.track1.pdfUrl,
                fileName: 'clinical-baseline-consultation-template-v2.pdf',
                title: '2-Page Clinical Baseline Consultation Template V2',
              })}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-bold text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Download size={14} className="text-cyan-400" />
              <span>{currentData.track1.pdfLabel}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Stethoscope size={11} className="text-cyan-400" />
              <span>Take PDF V2 to your GP consultation for physician alignment</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TRACK 2: WEEKLY MICRO-TELEMETRY (AT-HOME SELF-TEST)                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-between rounded-3xl backdrop-blur-md bg-gradient-to-br from-cyan-950/60 via-slate-900/90 to-blue-950/50 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 p-6 sm:p-7 shadow-2xl relative overflow-hidden group">
          {/* Content-Specific Ambient Glows: Sapphire Blue & Aqua */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#0284c7] rounded-full filter blur-2xl opacity-20 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-cyan-400 rounded-full filter blur-2xl opacity-20 pointer-events-none" />

          {/* Background Overlay: Hydrodynamic ripple / cellular fluid wave SVG watermark */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 300 300">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
              <circle cx="150" cy="150" r="30" strokeDasharray="3,3" />
              <circle cx="150" cy="150" r="60" />
              <circle cx="150" cy="150" r="95" strokeDasharray="5,5" />
              <circle cx="150" cy="150" r="130" />
              <path d="M150,135 C146,143 140,150 140,156 C140,161.5 144.5,166 150,166 C155.5,166 160,161.5 160,156 C160,150 154,143 150,135 Z" fill="currentColor" opacity="0.6" />
            </g>
          </svg>
          
          <div className="space-y-5 relative z-10">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 shadow-sm">
                <Droplets size={13} className="text-emerald-400" />
                Track 2: Weekly Micro-Telemetry (At-Home Self-Test)
              </span>
              <span className="text-[10px] font-mono text-emerald-400/90 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 font-semibold flex items-center gap-1">
                <Clock size={11} className="text-emerald-400" />
                {currentData.track2.cadence}
              </span>
            </div>

            {/* Mandatory Subtext */}
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-l-2 border-emerald-500/60 pl-3">
              Zero-friction 60-second dipstick tests run every 7 days to verify hydration, ketones, pH, and cellular response to daily habits.
            </p>

            {/* Product Pairing Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
                  {currentData.track2.badge}
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Activity size={12} className="text-emerald-400" />
                  10 Medical Parameters • 60-Second Read
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                {currentData.track2.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {currentData.track2.description}
              </p>

              {/* 10-Biomarker Checklist Grid */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 font-bold">
                  <span>10 Reagent Biomarkers Monitored:</span>
                  <span className="text-emerald-400">10/10 Live Metrics</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {currentData.track2.biomarkers.map((marker) => (
                    <span
                      key={marker}
                      className="px-2 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-emerald-300 text-[10px] font-mono flex items-center gap-1 font-medium truncate"
                      title={marker}
                    >
                      <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{marker}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-900">
                {currentData.track2.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs: Direct Product Order */}
          <div className="space-y-3 pt-6 mt-6 border-t border-slate-800/80 relative z-10">
            {/* Primary Order Button */}
            <a
              href={currentData.track2.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group-hover:scale-[1.01]"
            >
              <span>{currentData.track2.actionLabel}</span>
              <ExternalLink size={14} />
            </a>

            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-center">
              <span className="text-[11px] text-emerald-300 font-mono">
                ⚡ 60-Second In-Home Protocol • Zero Lab Appointment Required
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Synchronized Protocol Note */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-cyan-400 shrink-0" />
          <span>
            <strong>Dual-Track Feedback Synergy:</strong> Weekly dips flag acute anomalies early; quarterly venous draws calibrate cellular trajectory.
          </span>
        </div>
        <button
          type="button"
          onClick={() => triggerGatedDownload({
            fileUrl: '/assets/docs/clinical-baseline-consultation-template-v2.pdf',
            fileName: 'clinical-baseline-consultation-template-v2.pdf',
            title: 'Printable GP Consultation Template (PDF V2)',
          })}
          className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 transition cursor-pointer"
        >
          <span>Download Printable GP Template (PDF V2)</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default DualTrackSelector;
