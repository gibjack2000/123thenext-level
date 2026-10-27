import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, CheckCircle2, ShieldCheck, Stethoscope, ArrowRight, Droplets, AlertCircle } from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import BloodPanelComparisonTable from './BloodPanelComparisonTable';

export interface DiagnosticPathwaySelectorProps {
  initialMarket?: Market;
  showRegionTabs?: boolean;
  selectedPathway?: 'level1' | 'level2' | null;
  onSelectPathway?: (pathway: 'level1' | 'level2') => void;
  className?: string;
  showCopilotLink?: boolean;
}

export interface RegionalPathwayData {
  regionName: string;
  flag: string;
  partnerName: string;
  badge: string;
  level1: {
    partnerName: string;
    description: string;
    price: string;
    requisitionUrl: string;
    actionText?: string;
    helperText?: string;
  };
  level2: {
    partnerName: string;
    description: string;
    price: string;
    requisitionUrl: string;
    actionText?: string;
    helperText?: string;
  };
  urinalysis: {
    name: string;
    partnerName: string;
    badge: string;
    description: string;
    details: string;
    price: string;
    requisitionUrl: string;
  };
  fluidTelemetry: {
    name: string;
    directUrl: string;
    badge: string;
    description: string;
    price: string;
  };
}

export const FLUID_TELEMETRY_BIOMARKERS = [
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
] as const;

export const REGIONAL_PATHWAYS: Record<Market, RegionalPathwayData> = {
  US: {
    regionName: 'United States',
    flag: '🇺🇸',
    partnerName: 'HealthLabs',
    badge: 'CLIA Certified & CAP Accredited • Quest / Labcorp Network',
    level1: {
      partnerName: 'HealthLabs Standalone Tri-Markers',
      description: 'A la carte direct requisition for ApoB, HbA1c, and hs-CRP through Quest Diagnostics or Labcorp without physician referral.',
      price: 'From $39 / marker',
      requisitionUrl: 'https://www.healthlabs.com/?affiliate=123znl',
    },
    level2: {
      partnerName: 'HealthLabs Cellular Biomarker Map',
      description: 'Complete 56-biomarker venous blood panel covering full lipid cascade, hormonal, thyroid, organ, and micronutrient sub-fractions via 4,500+ draw centers.',
      price: '$299.00',
      requisitionUrl: 'https://www.healthlabs.com/?affiliate=123znl',
    },
    urinalysis: {
      name: 'HealthLabs Comprehensive Urinalysis & Microalbumin Panel',
      partnerName: 'HealthLabs (Quest / Labcorp)',
      badge: 'CLIA / CAP Clinical Urine Panel',
      description: 'Doctor-free comprehensive urine analysis for microalbumin-to-creatinine ratio (ACR), proteinuria, and renal filtration efficiency.',
      details: '14-parameter Quest/Labcorp clinical urine analysis screening microvascular health, ACR, pH, ketones, and renal filtration.',
      price: '$69.00',
      requisitionUrl: 'PASTE_YOUR_HEALTHLABS_CJ_URINALYSIS_LINK',
    },
    fluidTelemetry: {
      name: 'Diagnox Urinox-10 Medical-Grade Urinalysis Strips',
      directUrl: 'https://diagnoxhealth.com/products/urinalysis-test',
      badge: 'FDA Cleared | 10-Parameter Clinical Grade',
      description: 'FDA-cleared 10-parameter rapid urinalysis reagent strips for weekly tracking of microvascular health, proteinuria, pH, ketones, glucose, and renal function.',
      price: '$16.99 (100 Strips)',
    },
  },
  UK: {
    regionName: 'United Kingdom',
    flag: '🇬🇧',
    partnerName: 'LOLA Health',
    badge: 'UKAS Accredited & ISO Certified Phlebotomy Network',
    level1: {
      partnerName: 'LOLA Essential Check',
      description: 'Core lipids, HbA1c, glucose, kidney & liver.',
      price: '£89.00',
      requisitionUrl: 'https://referrals.lolahealth.com/NextLevel15',
      actionText: 'Order LOLA Essential Check (£89) ➔',
      helperText: "When you arrive on LOLA Health, select: 'LOLA Essential Check' (Core lipids, HbA1c, glucose, kidney & liver).",
    },
    level2: {
      partnerName: 'LOLA Vital Check 56',
      description: 'Full 56-biomarker panel: ApoB, hs-CRP, Vitamin D, Thyroid & Hormones.',
      price: '£149.00',
      requisitionUrl: 'https://referrals.lolahealth.com/NextLevel15',
      actionText: 'Order LOLA Vital Check 56 (£149) ➔',
      helperText: "When you arrive on LOLA Health, select: 'LOLA Vital Check 56' (Full 56-biomarker panel: ApoB, hs-CRP, Vitamin D, Thyroid & Hormones).",
    },
    urinalysis: {
      name: 'Lola Urinalysis & Microvascular ACR Panel',
      partnerName: 'LOLA Health',
      badge: 'UKAS Certified Fluid Telemetry',
      description: 'Home sample kit and partner clinic assessment tracking albumin-to-creatinine ratio and renal metabolic performance.',
      details: 'UKAS-certified urine panel measuring Albumin-to-Creatinine ratio (ACR), proteinuria, and kidney metabolic safety.',
      price: '£49.00',
      requisitionUrl: 'https://referrals.lolahealth.com/NextLevel15',
    },
    fluidTelemetry: {
      name: 'ALLTEST 10-Parameter Clinical Urinalysis Dipsticks UK',
      directUrl: 'https://referrals.lolahealth.com/NextLevel15',
      badge: 'CE Medical Marked | UKAS Aligned',
      description: 'CE Medical Marked 10-parameter urinalysis dipsticks monitoring kidney filtration integrity, microalbuminuria, acid-base balance, and systemic hydration.',
      price: '£12.99 (100 Strips)',
    },
  },
  ES: {
    regionName: 'Spain / European Union',
    flag: '🇪🇸',
    partnerName: 'SaludOnNet / Eurofins',
    badge: 'CE Marked • Red Megalab & Unilabs Partner Network',
    level1: {
      partnerName: 'Panel Cardiovascular & Metabólico Nivel 1',
      description: 'Análisis selectivo directo de ApoB, HbA1c y proteína C-reactiva ultrasensible en centros asociados Megalab o Unilabs.',
      price: '79,00 €',
      requisitionUrl: 'https://www.melio.es',
    },
    level2: {
      partnerName: 'Melio Vital Check ES / SaludOnNet Master Panel',
      description: 'Panel venoso integral de 56 biomarcadores celulares con informe médico digital y revisión de rango óptimo de longevidad.',
      price: '149,00 €',
      requisitionUrl: 'https://www.melio.es',
    },
    urinalysis: {
      name: 'SaludOnNet / Eurofins Análisis Completo de Orina con Sedimento',
      partnerName: 'SaludOnNet / Eurofins Megalab',
      badge: 'Marcado CE & ISO 15189',
      description: 'Panel clínico completo de orina con sedimento y ratio albúmina/creatinina en más de 160 laboratorios autorizados.',
      details: 'CE Marked & ISO 15189 certified clinical urine sediment panel across 160+ Eurofins Megalab centers in Spain.',
      price: '39,00 €',
      requisitionUrl: 'PASTE_YOUR_SALUDONNET_AWIN_LINK',
    },
    fluidTelemetry: {
      name: 'ALLTEST Tiras Reactivas de Orina 10 Parámetros ES',
      directUrl: '[PASTE_YOUR_SALUDONNET_AWIN_LINK]',
      badge: 'Marcado CE Médico | Red Eurofins / Unilabs',
      description: 'Tiras reactivas clínicas de 10 parámetros para el seguimiento semanal de función renal, pH, cetonas, glucosa y microalbuminuria en España.',
      price: '14,50 € (100 Tiras)',
    },
  },
};

export const DiagnosticPathwaySelector: React.FC<DiagnosticPathwaySelectorProps> = ({
  showRegionTabs = true,
  selectedPathway: controlledPathway,
  onSelectPathway,
  className = '',
  showCopilotLink = false,
}) => {
  const { market, setMarket } = useMarket();
  const [internalSelectedPathway, setInternalSelectedPathway] = useState<'level1' | 'level2' | null>(
    controlledPathway || null
  );

  // Directly subscribe to central MarketContext state
  const activeMarket: Market = (market?.toUpperCase() as Market) || 'US';
  const regionData = REGIONAL_PATHWAYS[activeMarket] || REGIONAL_PATHWAYS.US;

  const currentSelected = controlledPathway !== undefined ? controlledPathway : internalSelectedPathway;

  const handleSelect = (pathway: 'level1' | 'level2', url: string) => {
    if (controlledPathway === undefined) {
      setInternalSelectedPathway(pathway);
    }
    if (onSelectPathway) {
      onSelectPathway(pathway);
    }
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Selector Header & Low-Pressure Framing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-wider font-bold">
            <Stethoscope size={12} className="text-cyan-400" />
            <span>Choose Your Starting Point • Low-Pressure Clinical Pathway</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white uppercase tracking-tight">
            Diagnostic Requisition Selector
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-2xl">
            Select the baseline depth that aligns with your clinical goals and budget. Both options provide objective telemetry to review collaboratively with your GP.
          </p>
        </div>

        {/* Region Switcher Tabs with explicit onClick state changes & high-contrast active styling */}
        {showRegionTabs && (
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-2xl p-1 gap-1 shrink-0 self-start md:self-center">
            {(['US', 'UK', 'ES'] as Market[]).map((m) => {
              const label = m === 'US' ? '🇺🇸 United States' : m === 'UK' ? '🇬🇧 United Kingdom' : '🇪🇸 Spain / EU';
              const isActive = activeMarket === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMarket(m)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Regional Provider Banner (Neutral, Informational) */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-lg">{regionData.flag}</span>
          <span className="font-semibold text-white">Accredited Phlebotomy Network ({regionData.regionName}):</span>
          <span className="text-cyan-400 font-mono">{regionData.badge}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Direct Patient Requisition • No Prescription Required</span>
        </div>
      </div>

      {/* Two Side-by-Side Option Cards with Clean Neutral Framing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
        
        {/* ========================================================================= */}
        {/* CARD A: Choice 1: Essential Baseline Blood Panel (Basic Tier)            */}
        {/* ========================================================================= */}
        <div
          className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-gradient-to-b from-slate-900/90 to-slate-950 border ${
            currentSelected === 'level1'
              ? 'border-emerald-400 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20'
              : 'border-slate-800 hover:border-slate-700 shadow-lg'
          }`}
        >
          <div className="space-y-4">
            {/* Card Header & Level Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
                {activeMarket === 'UK' ? 'Essential Baseline Blood Panel (UK 🇬🇧)' : 'Choice 1: Essential Baseline Blood Panel • Essential Starter'}
              </span>
              <span className="text-sm font-mono font-bold text-white">
                {regionData.level1.price}
              </span>
            </div>

            {/* Headline & Core Narrative */}
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
                {activeMarket === 'UK' ? regionData.level1.partnerName : 'Essential Baseline Blood Panel'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <strong className="text-emerald-300 font-medium">Target Audience:</strong> Budget-conscious users or first-time baseline spot-checks. Establishes objective reference points for core lipid fractions, glycemic regulation, and kidney/liver filtration.
              </p>
            </div>

            {/* Biomarker Pill Tags */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Key Biomarkers Covered:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-300 font-mono text-xs font-bold">
                  Core Lipid Profile (Chol/HDL/LDL)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-300 font-mono text-xs font-bold">
                  Fasting Blood Glucose
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-300 font-mono text-xs font-bold">
                  HbA1c (90-Day Glycemic Trend)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-300 font-mono text-xs font-bold">
                  Basic Kidney &amp; Liver (ALT/eGFR)
                </span>
              </div>
            </div>

            {/* Explicit Helper Microcopy when present */}
            {regionData.level1.helperText && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-amber-300 block text-[11px] uppercase tracking-wider mb-0.5">
                    Action Required on LOLA Health:
                  </span>
                  <span>{regionData.level1.helperText}</span>
                </div>
              </div>
            )}

            {/* Partner Details */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 text-xs text-slate-400 space-y-1 font-mono">
              <div className="text-slate-300 font-bold flex items-center justify-between">
                <span>Partner: {regionData.level1.partnerName}</span>
                <span className="text-emerald-400 text-[10px]">Direct Requisition</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                {regionData.level1.description}
              </p>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={regionData.level1.requisitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSelect('level1', regionData.level1.requisitionUrl)}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md group cursor-pointer"
            >
              <span>{regionData.level1.actionText || 'Select Essential Starter Requisition ➔'}</span>
              <ExternalLink size={14} className="text-white group-hover:translate-x-0.5 transition-transform" />
            </a>
            {currentSelected === 'level1' && (
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-emerald-300 font-medium">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Selected as agreed consultation pathway</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD B: Choice 2: Comprehensive Cellular Biomarker Map (Complete Tier)   */}
        {/* ========================================================================= */}
        <div
          className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-gradient-to-b from-slate-900/90 to-slate-950 border ${
            currentSelected === 'level2'
              ? 'border-cyan-400 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/20'
              : 'border-slate-800 hover:border-slate-700 shadow-lg'
          }`}
        >
          <div className="space-y-4">
            {/* Card Header & Level Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-800/50 px-2.5 py-1 rounded-lg">
                {activeMarket === 'UK' ? 'Comprehensive Cellular Biomarker Map (UK 🇬🇧)' : 'Choice 2: Comprehensive Cellular Biomarker Map • Clinical Gold Standard'}
              </span>
              <span className="text-sm font-mono font-bold text-cyan-300">
                {regionData.level2.price}
              </span>
            </div>

            {/* Headline & Core Narrative */}
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
                {activeMarket === 'UK' ? regionData.level2.partnerName : 'Comprehensive Cellular Biomarker Map'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <strong className="text-cyan-300 font-medium">Target Audience:</strong> Deep-dive longevity optimization, cardiovascular risk mapping, and metabolic re-engineering. Full 56-biomarker multi-omic panel covering plaque particles, inflammation, hormones, and micronutrients in a single draw.
              </p>
            </div>

            {/* Biomarker Pill Tags */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Comprehensive 56-Biomarker Systems Included:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px] font-bold">
                  ApoB Plaque Risk
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px] font-bold">
                  hs-CRP Inflammation
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px] font-bold">
                  HbA1c &amp; Glycemic
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-750 text-slate-300 font-mono text-[11px]">
                  Full Lipid Subfractions
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-750 text-slate-300 font-mono text-[11px]">
                  Hormones (Test/DHEA)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-750 text-slate-300 font-mono text-[11px]">
                  Thyroid Panel (TSH/T3/T4)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-750 text-slate-300 font-mono text-[11px]">
                  Micronutrients (Vit D/B12/Ferritin)
                </span>
              </div>
            </div>

            {/* Explicit Helper Microcopy when present */}
            {regionData.level2.helperText && (
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
                <AlertCircle size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-cyan-300 block text-[11px] uppercase tracking-wider mb-0.5">
                    Action Required on LOLA Health:
                  </span>
                  <span>{regionData.level2.helperText}</span>
                </div>
              </div>
            )}

            {/* Partner Details */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 text-xs text-slate-400 space-y-1 font-mono">
              <div className="text-slate-300 font-bold flex items-center justify-between">
                <span>Partner: {regionData.level2.partnerName}</span>
                <span className="text-cyan-400 text-[10px]">Venous Phlebotomy</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                {regionData.level2.description}
              </p>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={regionData.level2.requisitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSelect('level2', regionData.level2.requisitionUrl)}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:via-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/20 group cursor-pointer"
            >
              <span>{regionData.level2.actionText || 'Select Clinical Gold Standard Map ➔'}</span>
              <ExternalLink size={14} className="text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </a>
            {currentSelected === 'level2' && (
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-cyan-300 font-medium">
                <CheckCircle2 size={13} className="text-cyan-400" />
                <span>Selected as agreed consultation pathway</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Basic vs. Complete Comparison Table Accordion */}
      <BloodPanelComparisonTable 
        showCards={false} 
        defaultExpanded={false} 
        selectedRegion={activeMarket}
      />

      {/* ========================================================================= */}
      {/* SECTION: PHASE 1 BASELINE DIAGNOSTICS & FLUID TELEMETRY                     */}
      {/* ========================================================================= */}
      <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/30 border border-cyan-500/30 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Droplets size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                  {regionData.flag} Phase 1 Baseline Diagnostics
                </span>
                <span className="text-[10px] text-cyan-300 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Direct 10-Parameter Rapid Fluid Telemetry
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-display font-black text-white tracking-tight mt-0.5">
                Clinical Urine Analysis &amp; Rapid Fluid Telemetry Requisitions
              </h4>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 self-start sm:self-center bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            {regionData.fluidTelemetry.price}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Clinical Lab Urinalysis Requisition */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-sm">{regionData.urinalysis.name}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold shrink-0">Clinical Lab Draw</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {regionData.urinalysis.details}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Microalbumin (ACR)', 'Proteinuria', 'Urine pH', 'Specific Gravity', 'Renal Filtration'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={regionData.urinalysis.requisitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Order Clinical Urinalysis Requisition ({activeMarket}) ➔</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Direct 10-Parameter Rapid Fluid Telemetry Tool */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-sm">{regionData.fluidTelemetry.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 shrink-0">
                  {regionData.fluidTelemetry.badge}
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {regionData.fluidTelemetry.description}
              </p>

              {/* 10-Biomarker Checklist Chip Grid */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 font-bold">
                  <span>10-Biomarker Checklist Chip Grid</span>
                  <span className="text-cyan-400">10 Parameters</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-0.5">
                  {FLUID_TELEMETRY_BIOMARKERS.map((biomarker) => (
                    <span
                      key={biomarker}
                      className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-300 text-[10px] font-mono flex items-center gap-1 font-medium"
                    >
                      <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{biomarker}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Protocol Note */}
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-[11px] text-cyan-200/90 flex items-start gap-2">
                <AlertCircle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Clinical Protocol:</strong> Dip and read in 60 seconds once per week to monitor systemic hydration, metabolic spillovers, and acid-base shifts between quarterly blood draws.
                </p>
              </div>
            </div>

            <a
              href={regionData.fluidTelemetry.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-cyan-500/30 to-teal-500/20 hover:from-cyan-500 hover:to-teal-400 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md group cursor-pointer"
            >
              <span>Order Direct Fluid Telemetry ({activeMarket}) ➔</span>
              <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Optional Workbook Cross-Link */}
      {showCopilotLink && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-300">
            <strong>Taking your requisition to your GP?</strong> Download or fill the interactive consultation record before your blood draw.
          </div>
          <a
            href="/clinician-copilot"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider shrink-0"
          >
            <span>Open Interactive Co-Pilot Workbook</span>
            <ArrowRight size={13} />
          </a>
        </div>
      )}
    </div>
  );
};

export default DiagnosticPathwaySelector;
