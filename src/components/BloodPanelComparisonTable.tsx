import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck, Stethoscope, ChevronDown, ChevronUp, Sparkles, Info } from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';

export interface BloodPanelComparisonTableProps {
  className?: string;
  showCards?: boolean;
  defaultExpanded?: boolean;
  selectedRegion?: Market;
  onSelectOption?: (option: 'basic' | 'complete') => void;
}

interface BiomarkerComparisonRow {
  system: string;
  biomarkers: string;
  basicIncluded: boolean;
  basicNote: string;
  completeIncluded: boolean;
  completeNote: string;
  rationale: string;
}

const COMPARISON_ROWS: BiomarkerComparisonRow[] = [
  {
    system: 'Core Lipid Profile',
    biomarkers: 'Total Cholesterol, HDL-C, LDL-C, Triglycerides',
    basicIncluded: true,
    basicNote: 'Included (Standard)',
    completeIncluded: true,
    completeNote: 'Included + Subfractions',
    rationale: 'Baseline circulating lipids & basic cardiovascular screening.'
  },
  {
    system: 'Fasting Blood Glucose',
    biomarkers: 'Fasting Serum Glucose',
    basicIncluded: true,
    basicNote: 'Included',
    completeIncluded: true,
    completeNote: 'Included',
    rationale: 'Acute point-in-time glycemic regulation & insulin response.'
  },
  {
    system: 'Glycated Hemoglobin (HbA1c)',
    biomarkers: 'HbA1c (DCCT / IFCC)',
    basicIncluded: true,
    basicNote: 'Included',
    completeIncluded: true,
    completeNote: 'Included',
    rationale: '90-day mean erythrocyte glycemic exposure and advanced glycation.'
  },
  {
    system: 'Basic Kidney & Liver Panel',
    biomarkers: 'ALT, AST, eGFR, Serum Creatinine, Bilirubin',
    basicIncluded: true,
    basicNote: 'Included',
    completeIncluded: true,
    completeNote: 'Included + Complete Enzymes',
    rationale: 'Vital metabolic clearance, hepatic transaminases, and renal filtration.'
  },
  {
    system: 'Atherogenic Particle Count (ApoB)',
    biomarkers: 'Apolipoprotein B (ApoB), ApoA1, ApoB/ApoA1 Ratio',
    basicIncluded: false,
    basicNote: 'Not in basic panel',
    completeIncluded: true,
    completeNote: 'Included (Clinical Anchor)',
    rationale: 'Gold standard measure of total plaque-causing particle density.'
  },
  {
    system: 'Microvascular Inflammation (hs-CRP)',
    biomarkers: 'High-Sensitivity C-Reactive Protein (Cardio hs-CRP)',
    basicIncluded: false,
    basicNote: 'Not in basic panel',
    completeIncluded: true,
    completeNote: 'Included (Ultra-Low Target)',
    rationale: 'Detects silent systemic and vascular endothelial inflammation.'
  },
  {
    system: 'Thyroid & Endocrine Cascade',
    biomarkers: 'TSH, Free T3, Free T4, Reverse T3',
    basicIncluded: false,
    basicNote: 'Not in basic panel',
    completeIncluded: true,
    completeNote: 'Included (Full Cascade)',
    rationale: 'Regulates basal metabolic rate, mitochondrial heat, and cellular turnover.'
  },
  {
    system: 'Full Sex & Longevity Hormones',
    biomarkers: 'Total & Free Testosterone, SHBG, DHEA-S, Estradiol',
    basicIncluded: false,
    basicNote: 'Not in basic panel',
    completeIncluded: true,
    completeNote: 'Included',
    rationale: 'Anabolic signalling, lean mass retention, and neuroprotection.'
  },
  {
    system: 'Micronutrient & Vitamin Reserves',
    biomarkers: '25-OH Vitamin D3, Active B12, Serum Ferritin, Folate',
    basicIncluded: false,
    basicNote: 'Not in basic panel',
    completeIncluded: true,
    completeNote: 'Included (5 Micro-reserves)',
    rationale: 'Methylation velocity, immune surveillance, and iron storage capacity.'
  },
  {
    system: 'Advanced Lipoprotein Subfractions',
    biomarkers: 'Lipoprotein(a) [Lp(a)], Small Dense LDL Particles',
    basicIncluded: false,
    basicNote: 'Not in basic panel',
    completeIncluded: true,
    completeNote: 'Included (Genetic Risk)',
    rationale: 'Identifies genetically predetermined arterial thrombosis & calcification risk.'
  }
];

export const REGIONAL_BLOOD_TIERS = {
  US: {
    regionName: 'United States',
    flag: '🇺🇸',
    network: 'Quest Diagnostics / Labcorp (4,500+ Draw Centers)',
    basic: {
      name: 'Essential Baseline Blood Panel',
      tierTitle: 'Choice 1: Essential Baseline Blood Panel',
      badge: 'Essential Starter',
      targetAudience: 'Budget-conscious users or first-time baseline spot-checks',
      price: '$89.00',
      actionText: 'Order HealthLabs Essential Panel',
      url: 'https://www.healthlabs.com/?affiliate=123znl',
      partner: 'HealthLabs (Quest / Labcorp)',
      helperText: undefined as string | undefined
    },
    complete: {
      name: 'Comprehensive Cellular Biomarker Map',
      tierTitle: 'Choice 2: Comprehensive Cellular Biomarker Map (56 Biomarkers)',
      badge: 'Clinical Gold Standard',
      targetAudience: 'Deep-dive longevity optimization, cardiovascular risk mapping, and metabolic re-engineering',
      price: '$299.00',
      actionText: 'Book HealthLabs 56-Biomarker Map',
      url: 'https://www.healthlabs.com/?affiliate=123znl',
      partner: 'HealthLabs (Quest / Labcorp)',
      helperText: undefined as string | undefined
    }
  },
  UK: {
    regionName: 'United Kingdom',
    flag: '🇬🇧',
    network: 'UKAS-Accredited Clinic & Phlebotomy Partner Network',
    basic: {
      name: 'LOLA Essential Check',
      tierTitle: 'Option A: Basic Tier',
      badge: 'Basic Tier',
      targetAudience: 'First-time baseline or routine spot-checks',
      price: '£89.00',
      actionText: 'Select Essential Check',
      helperText: "When you arrive on LOLA Health, select: 'LOLA Essential Check' (Core lipids, HbA1c, glucose, kidney & liver).",
      url: 'https://referrals.lolahealth.com/NextLevel15',
      partner: 'LOLA Health UK'
    },
    complete: {
      name: 'LOLA Vital Check 56',
      tierTitle: 'Option B: Comprehensive Tier',
      badge: 'Comprehensive Tier',
      targetAudience: 'Deep cellular longevity mapping & cardiovascular risk re-engineering',
      price: '£149.00',
      actionText: 'Select Vital Check 56',
      helperText: "When you arrive on LOLA Health, select: 'LOLA Vital Check 56' (Full 56-biomarker panel: ApoB, hs-CRP, Vitamin D, Thyroid & Hormones).",
      url: 'https://referrals.lolahealth.com/NextLevel15',
      partner: 'LOLA Health UK'
    }
  },
  ES: {
    regionName: 'Spain / European Union',
    flag: '🇪🇸',
    network: 'Red Eurofins Megalab & Unilabs (160+ Centros en España)',
    basic: {
      name: 'Panel Metabólico y Lipídico Básico',
      tierTitle: 'Choice 1: Essential Baseline Blood Panel',
      badge: 'Essential Starter',
      targetAudience: 'Budget-conscious users or first-time baseline spot-checks',
      price: '59,00 €',
      actionText: 'Reservar Panel Básico ES',
      url: 'https://www.melio.es',
      partner: 'SaludOnNet / Melio ES',
      helperText: undefined as string | undefined
    },
    complete: {
      name: 'Melio Vital Check ES / SaludOnNet Master 56',
      tierTitle: 'Choice 2: Comprehensive Cellular Biomarker Map (56 Biomarkers)',
      badge: 'Clinical Gold Standard',
      targetAudience: 'Deep-dive longevity optimization, cardiovascular risk mapping, and metabolic re-engineering',
      price: '149,00 €',
      actionText: 'Reservar Panel Melio / SaludOnNet 56',
      url: 'https://www.melio.es',
      partner: 'SaludOnNet / Eurofins Megalab',
      helperText: undefined as string | undefined
    }
  }
};

export const BloodPanelComparisonTable: React.FC<BloodPanelComparisonTableProps> = ({
  className = '',
  showCards = true,
  defaultExpanded = true,
  selectedRegion,
  onSelectOption
}) => {
  const { market } = useMarket();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const activeMarket: Market = selectedRegion || (market?.toUpperCase() as Market) || 'US';
  const regionConfig = REGIONAL_BLOOD_TIERS[activeMarket] || REGIONAL_BLOOD_TIERS.US;

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Side-by-Side Dual Option Cards with Clear OR Divider */}
      {showCards && (
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Desktop Central OR Divider Badge */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-700 text-slate-300 font-mono font-bold text-xs items-center justify-center shadow-2xl">
          OR
        </div>
        
        {/* CHOICE 1: ESSENTIAL BASELINE BLOOD PANEL */}
        <div className="rounded-3xl p-6 sm:p-7 bg-slate-900/90 border-2 border-emerald-500/40 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-emerald-400 transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-bold flex items-center gap-1.5 shadow-sm">
                <Sparkles size={12} className="text-emerald-400" />
                <span>{regionConfig.basic.badge}</span>
              </span>
              <span className="text-xl font-display font-black text-white">
                {regionConfig.basic.price}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-semibold">
                {regionConfig.basic.tierTitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight mt-0.5">
                {regionConfig.basic.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <strong className="text-emerald-300 font-medium">Target Audience:</strong> {regionConfig.basic.targetAudience}. Establishes objective reference points for glucose velocity and core blood fats before protocol commitment.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Key Biomarkers Covered:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Core Lipid Profile (Chol/HDL/LDL)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Fasting Blood Glucose</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Glycated Hemoglobin (HbA1c)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>Basic Kidney &amp; Liver (ALT/eGFR)</span>
                </div>
              </div>
            </div>

            {/* Explicit Helper Microcopy when present */}
            {regionConfig.basic.helperText && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <Info size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-amber-300 block text-[11px] uppercase tracking-wider mb-0.5">
                    Action Required on LOLA Health:
                  </span>
                  <span>{regionConfig.basic.helperText}</span>
                </div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div className="text-slate-300 font-bold flex items-center justify-between">
                <span>Fulfillment: {regionConfig.basic.partner}</span>
                <span className="text-emerald-400 text-[10px]">{regionConfig.flag} {activeMarket}</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                Direct walk-in phlebotomy or home kit. Zero physician referral required.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 relative z-10 flex flex-col gap-2">
            <a
              href={regionConfig.basic.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onSelectOption && onSelectOption('basic')}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-600/20 active:scale-[0.98] cursor-pointer"
            >
              <span>{regionConfig.basic.actionText} ➔</span>
              <ExternalLink size={14} className="text-white" />
            </a>
            <span className="text-center text-[10px] text-slate-400 font-mono">
              Low-barrier baseline • Upgradeable anytime
            </span>
          </div>
        </div>

        {/* CHOICE 2: COMPREHENSIVE CELLULAR BIOMARKER MAP */}
        <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900/95 via-slate-900 to-cyan-950/40 border-2 border-cyan-500/60 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all duration-300 ring-1 ring-cyan-500/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-cyan-950/90 border border-cyan-500/60 text-cyan-300 font-bold flex items-center gap-1.5 shadow-sm">
                <Sparkles size={12} className="text-cyan-400" />
                <span>{regionConfig.complete.badge}</span>
              </span>
              <span className="text-xl font-display font-black text-cyan-300">
                {regionConfig.complete.price}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block font-semibold">
                {regionConfig.complete.tierTitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight mt-0.5">
                {regionConfig.complete.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <strong className="text-cyan-300 font-medium">Target Audience:</strong> {regionConfig.complete.targetAudience}. Multi-omic cellular map covering plaque particles, microvascular inflammation, hormones, and micronutrients.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Full 56-Biomarker Suite Highlights:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span><strong>ApoB</strong> Atherogenic Particles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span><strong>hs-CRP</strong> Vascular Inflammation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span><strong>Thyroid Panel</strong> (TSH, Free T3/T4)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span><strong>Full Hormone Cascade</strong> (Test/DHEA)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span><strong>Micronutrients</strong> (Vit D/B12/Ferritin)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span><strong>Advanced Lipids</strong> [Lp(a)/ApoA1]</span>
                </div>
              </div>
            </div>

            {/* Explicit Helper Microcopy when present */}
            {regionConfig.complete.helperText && (
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
                <Info size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-cyan-300 block text-[11px] uppercase tracking-wider mb-0.5">
                    Action Required on LOLA Health:
                  </span>
                  <span>{regionConfig.complete.helperText}</span>
                </div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div className="text-slate-300 font-bold flex items-center justify-between">
                <span>Fulfillment: {regionConfig.complete.partner}</span>
                <span className="text-cyan-400 text-[10px]">{regionConfig.flag} {activeMarket}</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                Accredited clinical venous phlebotomy with physician digital portal review.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 relative z-10 flex flex-col gap-2">
            <a
              href={regionConfig.complete.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onSelectOption && onSelectOption('complete')}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:via-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 active:scale-[0.98] cursor-pointer"
            >
              <span>{regionConfig.complete.actionText} ➔</span>
              <ExternalLink size={14} className="text-slate-950" />
            </a>
            <span className="text-center text-[10px] text-cyan-300 font-mono">
              Complete baseline clarity in a single draw
            </span>
          </div>
        </div>

      </div>
      )}

      {/* Basic vs. Complete Interactive Comparison Table Accordion */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 sm:p-5 flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition-colors text-left cursor-pointer border-b border-slate-800/80"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Stethoscope size={16} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                Basic vs. Complete Comparison Table: Biomarker Breakdown
              </h4>
              <p className="text-xs text-slate-400 font-light">
                Inspect which clinical systems are evaluated in the Essential Starter vs. Clinical Gold Standard.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
              {isExpanded ? 'Collapse Table' : 'Expand Table'}
            </span>
            {isExpanded ? (
              <ChevronUp size={18} className="text-cyan-400" />
            ) : (
              <ChevronDown size={18} className="text-cyan-400" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono uppercase text-[11px]">
                    <th className="p-3 font-bold w-1/4">Clinical System</th>
                    <th className="p-3 font-bold w-1/5 text-emerald-400">
                      Choice 1: Essential Starter
                    </th>
                    <th className="p-3 font-bold w-1/5 text-cyan-400">
                      Choice 2: Gold Standard (56)
                    </th>
                    <th className="p-3 font-bold">Longevity &amp; Diagnostic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-slate-850/50 transition-colors ${
                        !row.basicIncluded ? 'bg-cyan-950/10' : ''
                      }`}
                    >
                      <td className="p-3 font-medium text-white">
                        <div className="font-bold">{row.system}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{row.biomarkers}</div>
                      </td>
                      <td className="p-3">
                        {row.basicIncluded ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                            <CheckCircle2 size={14} className="shrink-0" />
                            <span>{row.basicNote}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 font-mono text-[11px]">
                            — Excluded in Basic
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                          <CheckCircle2 size={14} className="shrink-0 text-cyan-400" />
                          <span>{row.completeNote}</span>
                        </div>
                      </td>
                      <td className="p-3 text-[11px] text-slate-300 leading-relaxed font-light">
                        {row.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>
                  All outbound requisitions fulfill through accredited national laboratories: CLIA/CAP in the US, UKAS in the UK, and ISO 15189 in Spain/EU.
                </span>
              </div>
              <div className="shrink-0 font-mono text-cyan-400 text-[11px]">
                Region: {regionConfig.flag} {regionConfig.regionName}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodPanelComparisonTable;
