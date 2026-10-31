import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Droplet, 
  Scale, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Activity,
  Sparkles,
  Watch
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { useLabRequisition } from './LabRequisitionModal';

export interface Step2DiagnosticChannelsProps {
  selectedRegion?: Market;
  className?: string;
  showComparisonLink?: boolean;
}

interface RegionalChannelData {
  blood: {
    discountNote: string;
    optionA: {
      title: string;
      tier: string;
      price: string;
      summary: string;
      bestFor: string;
      ctaText: string;
      url: string;
    };
    optionB: {
      title: string;
      tier: string;
      price: string;
      summary: string;
      bestFor: string;
      ctaText: string;
      url: string;
    };
  };
  urinalysis: {
    weekly: {
      title: string;
      cadence: string;
      summary: string;
      price: string;
      url: string;
      ctaText: string;
    };
    quarterly: {
      title: string;
      cadence: string;
      summary: string;
      price: string;
      url: string;
      ctaText: string;
    };
  };
  hardware: {
    scales: {
      title: string;
      summary: string;
      productName: string;
      url: string;
    };
    wearables: {
      title: string;
      summary: string;
      productName: string;
      url: string;
    };
  };
}

const REGIONAL_CHANNEL_CONFIG: Record<Market, RegionalChannelData> = {
  UK: {
    blood: {
      discountNote: 'Choose your preferred baseline depth. Both options link via your 15% discount.',
      optionA: {
        title: 'LOLA Core Health 45',
        tier: 'Basic MOT • 45 Essential Biomarkers',
        price: 'From £125.00',
        summary: 'Essential health MOT covering cholesterol & lipid ratios, HbA1c 90-day glucose, liver, kidney, high-sensitivity CRP, vitamin D, active B12, and baseline hormones with at-home phlebotomist visit.',
        bestFor: 'Routine health MOT, introductory metabolic baseline, and periodic biomarker monitoring.',
        ctaText: 'Select Core Health 45 ➔',
        url: 'https://referrals.lolahealth.com/NextLevel15',
      },
      optionB: {
        title: 'LOLA Vital Check 56 (Comprehensive Longevity Baseline)',
        tier: '⭐ Full Protocol Longevity Baseline • 56 Biomarkers',
        price: 'From £155.00',
        summary: 'Advanced multi-omic longevity blood panel tracking 56 essential biomarkers—including ApoB (cardiovascular plaque risk), hs-CRP (systemic inflammation), and HbA1c (glycemic variability). Includes GMC doctor review and optional home phlebotomy visit.',
        bestFor: 'Deep cellular longevity mapping, plaque prevention (ApoB), and hormone cascade analysis.',
        ctaText: 'Select Vital Check 56 ➔',
        url: 'https://snwbl.io/out/NcealZ11',
      },
    },
    urinalysis: {
      weekly: {
        title: 'At-Home 10-Parameter Dipsticks',
        cadence: 'Weekly Option',
        summary: '60-second Sunday bathroom test for pH, hydration, and ketones.',
        price: '£12.99',
        url: 'https://referrals.lolahealth.com/NextLevel15',
        ctaText: 'Order ALLTEST Dipsticks (£12.99) ➔',
      },
      quarterly: {
        title: 'Urinalysis',
        cadence: 'Quarterly Option',
        summary: 'Diagnostic laboratory urine test paired with your quarterly blood draw.',
        price: 'From £65.00',
        url: 'https://referrals.lolahealth.com/NextLevel15',
        ctaText: 'Order LOLA Urinalysis (From £65) ➔',
      },
    },
    hardware: {
      scales: {
        title: 'Smart Scales',
        summary: 'Bioimpedance scales for Visceral Fat Rating (1–12) & Skeletal Muscle Mass %.',
        productName: 'Withings Body Scan / Comp',
        url: 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21',
      },
      wearables: {
        title: 'Continuous Wearables',
        summary: 'Smartwatches / Rings for Nocturnal HRV, Resting HR & Sleep Efficiency.',
        productName: 'Oura Ring Gen4 / Apple Watch',
        url: 'https://www.amazon.co.uk/dp/B0DJBH1625?tag=123znl0f3-21',
      },
    },
  },
  US: {
    blood: {
      discountNote: 'Choose your preferred baseline depth. Direct doctor-free Quest & Labcorp requisitions.',
      optionA: {
        title: 'HealthLabs Standalone Tri-Markers',
        tier: 'Basic Tier',
        price: 'From $39 / marker',
        summary: 'Core lipid profile, fasting glucose, HbA1c, kidney & liver function.',
        bestFor: 'First-time baseline or routine spot-checks.',
        ctaText: 'Select Essential Check ➔',
        url: 'https://www.healthlabs.com/?affiliate=123znl',
      },
      optionB: {
        title: 'HealthLabs Cellular Biomarker Map',
        tier: 'Comprehensive Tier',
        price: '$299.00',
        summary: 'Complete 56-biomarker panel (ApoB, hs-CRP, Thyroid, Vitamin D & Hormones).',
        bestFor: 'Deep cellular longevity mapping & cardiovascular risk re-engineering.',
        ctaText: 'Select Vital Check 56 ➔',
        url: 'https://www.healthlabs.com/?affiliate=123znl',
      },
    },
    urinalysis: {
      weekly: {
        title: 'At-Home 10-Parameter Dipsticks',
        cadence: 'Weekly Option',
        summary: '60-second Sunday bathroom test for pH, hydration, and ketones.',
        price: '$16.99',
        url: 'https://diagnoxhealth.com/products/urinalysis-test',
        ctaText: 'Order Diagnox Urinox-10 ($16.99) ➔',
      },
      quarterly: {
        title: 'Clinical Lab ACR (Microalbumin)',
        cadence: 'Quarterly Option',
        summary: 'Diagnostic laboratory urine test paired with your quarterly blood draw.',
        price: '$69.00',
        url: 'https://www.healthlabs.com/?affiliate=123znl',
        ctaText: 'Order Lab ACR Panel ($69) ➔',
      },
    },
    hardware: {
      scales: {
        title: 'Smart Scales',
        summary: 'Bioimpedance scales for Visceral Fat Rating (1–12) & Skeletal Muscle Mass %.',
        productName: 'Withings Body Scan / Comp',
        url: 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
      },
      wearables: {
        title: 'Continuous Wearables',
        summary: 'Smartwatches / Rings for Nocturnal HRV, Resting HR & Sleep Efficiency.',
        productName: 'Oura Ring Gen4 / Apple Watch',
        url: 'https://www.amazon.com/dp/B0DJBH1625?tag=123znl0e-20',
      },
    },
  },
  ES: {
    blood: {
      discountNote: 'Elija la profundidad basal deseada. Panel directo sin prescripción médica previa.',
      optionA: {
        title: 'Panel Metabólico y Lipídico Básico',
        tier: 'Basic Tier',
        price: '59,00 €',
        summary: 'Core lipid profile, fasting glucose, HbA1c, kidney & liver function.',
        bestFor: 'First-time baseline or routine spot-checks.',
        ctaText: 'Select Essential Check ➔',
        url: 'https://www.melio.es',
      },
      optionB: {
        title: 'Melio Vital Check ES / SaludOnNet 56',
        tier: 'Comprehensive Tier',
        price: '149,00 €',
        summary: 'Complete 56-biomarker panel (ApoB, hs-CRP, Thyroid, Vitamin D & Hormones).',
        bestFor: 'Deep cellular longevity mapping & cardiovascular risk re-engineering.',
        ctaText: 'Select Vital Check 56 ➔',
        url: 'https://www.melio.es',
      },
    },
    urinalysis: {
      weekly: {
        title: 'At-Home 10-Parameter Dipsticks',
        cadence: 'Weekly Option',
        summary: '60-second Sunday bathroom test for pH, hydration, and ketones.',
        price: '14,50 €',
        url: 'https://www.saludonnet.com',
        ctaText: 'Order ALLTEST Dipsticks (14,50 €) ➔',
      },
      quarterly: {
        title: 'Clinical Lab ACR (Microalbumin)',
        cadence: 'Quarterly Option',
        summary: 'Diagnostic laboratory urine test paired with your quarterly blood draw.',
        price: '39,00 €',
        url: 'https://www.saludonnet.com',
        ctaText: 'Order Lab ACR Panel (39,00 €) ➔',
      },
    },
    hardware: {
      scales: {
        title: 'Smart Scales',
        summary: 'Bioimpedance scales for Visceral Fat Rating (1–12) & Skeletal Muscle Mass %.',
        productName: 'Withings Body Scan / Comp',
        url: 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21',
      },
      wearables: {
        title: 'Continuous Wearables',
        summary: 'Smartwatches / Rings for Nocturnal HRV, Resting HR & Sleep Efficiency.',
        productName: 'Oura Ring Gen4 / Apple Watch',
        url: 'https://www.amazon.es/dp/B0DJBH1625?tag=123znl08a-21',
      },
    },
  },
};

export const Step2DiagnosticChannels: React.FC<Step2DiagnosticChannelsProps> = ({
  selectedRegion: propRegion,
  className = '',
  showComparisonLink = true,
}) => {
  const { market } = useMarket();
  const { triggerLabRequisition } = useLabRequisition();
  const activeRegion: Market = propRegion || (market?.toUpperCase() as Market) || 'US';
  const config = REGIONAL_CHANNEL_CONFIG[activeRegion] || REGIONAL_CHANNEL_CONFIG.US;

  // Single blood option selection state (optionA vs optionB)
  const [selectedBloodOption, setSelectedBloodOption] = useState<'A' | 'B'>('B');
  const currentBlood = selectedBloodOption === 'A' ? config.blood.optionA : config.blood.optionB;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* UK 3-Stage Diagnostic Radar Pathway */}
      {activeRegion === 'UK' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🇬🇧</span>
              <h4 className="text-xs sm:text-sm font-display font-black uppercase text-white tracking-wider">
                UK Clinical Longevity Pathway • 3-Stage Diagnostic Radar
              </h4>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800 font-bold uppercase tracking-wider">
              LOLA Health UK
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Step 1: Basic MOT */}
            <div 
              onClick={() => setSelectedBloodOption('A')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                selectedBloodOption === 'A'
                  ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">1. Basic MOT</span>
                <span className="text-[11px] font-mono font-bold text-white">From £125.00</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-200">LOLA Core Health 45</p>
              <p className="text-[10px] text-slate-400 mt-0.5">45 Essential Biomarkers • Routine MOT</p>
            </div>

            {/* Step 2: Full Protocol Longevity Baseline */}
            <div 
              onClick={() => setSelectedBloodOption('B')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                selectedBloodOption === 'B'
                  ? 'bg-cyan-950/50 border-cyan-400 ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-300">2. Longevity Baseline</span>
                <span className="text-[11px] font-mono font-bold text-white">From £155.00</span>
              </div>
              <p className="text-[11px] font-semibold text-white">⭐ LOLA Vital Check 56</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Full 56 Markers • ApoB, hs-CRP &amp; Hormones</p>
            </div>

            {/* Step 3: Biological Age */}
            <a 
              href="https://snwbl.io/out/NcealZ11"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                triggerLabRequisition({
                  destinationUrl: 'https://snwbl.io/out/NcealZ11',
                  testName: 'LOLA TruAge Test (UK 🇬🇧)',
                });
              }}
              className="p-3 rounded-xl border bg-slate-950/70 border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer block group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-300">3. Biological Age</span>
                <span className="text-[11px] font-mono font-bold text-white">From £375.00</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-200 group-hover:text-purple-300 transition-colors flex items-center justify-between">
                <span>LOLA TruAge Test</span>
                <ExternalLink size={11} className="opacity-60 group-hover:opacity-100" />
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">DunedinPACE Methylation &amp; Telomeres</p>
            </a>
          </div>
        </div>
      )}

      {/* 3-Channel Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

        {/* ========================================================================= */}
        {/* CHANNEL 1: 🩸 BLOOD DIAGNOSTICS (Select ONE Option)                       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-rose-950/60 via-slate-900/90 to-red-950/40 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#e11d48] rounded-full filter blur-3xl opacity-15 pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Header Badge & Icon */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-rose-950 border border-rose-800/80 text-rose-300 font-bold">
                CHANNEL 1: 🩸 BLOOD DIAGNOSTICS
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Select ONE Option
              </span>
            </div>

            {/* Sub-header instruction */}
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {config.blood.discountNote}
            </p>

            {/* Clear Toggle Switcher between Option A and Option B */}
            <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800 gap-1">
              <button
                type="button"
                onClick={() => setSelectedBloodOption('A')}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedBloodOption === 'A'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Option A: Basic
              </button>
              <button
                type="button"
                onClick={() => setSelectedBloodOption('B')}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedBloodOption === 'B'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Option B: Complete 56
              </button>
            </div>

            {/* Selected Blood Option Body (Clean, Zero Redundant Badges) */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    {currentBlood.tier}
                  </span>
                  <h4 className="text-lg font-display font-black text-white tracking-tight mt-0.5">
                    {currentBlood.title}
                  </h4>
                </div>
                <span className="text-base font-display font-black text-white shrink-0 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {currentBlood.price}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                <strong className="text-white font-medium">Summary:</strong> {currentBlood.summary}
              </p>

              <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-2 font-light">
                <strong className="text-rose-300 font-medium">Best for:</strong> {currentBlood.bestFor}
              </div>

              {/* Explicit helper instruction when landing on LOLA Health for UK */}
              {activeRegion === 'UK' && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 leading-snug">
                  <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">
                    Action Required on LOLA Health:
                  </span>
                  <span>
                    {selectedBloodOption === 'A'
                      ? "Select 'Core Health 45' on LOLA Health for an essential health MOT."
                      : "On the LOLA Health website, select 'Vital Check 56' and choose 'Phlebotomist for a Home Visit'."}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-3 border-t border-slate-800 relative z-10 space-y-2">
            <button
              type="button"
              onClick={() => triggerLabRequisition({
                destinationUrl: currentBlood.url,
                testName: `${currentBlood.title} (${activeRegion})`,
              })}
              className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                selectedBloodOption === 'A'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  : 'bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <span>{currentBlood.ctaText}</span>
              <ExternalLink size={13} />
            </button>

            {/* Quick Toggle Link */}
            <button
              type="button"
              onClick={() => setSelectedBloodOption(selectedBloodOption === 'A' ? 'B' : 'A')}
              className="w-full text-center text-[10px] text-slate-400 hover:text-slate-300 font-mono py-1 cursor-pointer transition"
            >
              {selectedBloodOption === 'A' 
                ? 'OR switch to Option B (Comprehensive 56) ➔'
                : 'OR switch to Option A (Basic Tier) ➔'}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHANNEL 2: 🧪 URINALYSIS DIAGNOSTICS (Weekly vs. Quarterly)               */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-cyan-950/60 via-slate-900/90 to-blue-950/50 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#0284c7] rounded-full filter blur-3xl opacity-15 pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-teal-950 border border-teal-800/80 text-teal-300 font-bold">
                CHANNEL 2: 🧪 URINALYSIS DIAGNOSTICS
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Weekly vs. Quarterly
              </span>
            </div>

            {/* Sub-header instruction */}
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Continuous metabolic fluid tracking to catch silent shifts early.
            </p>

            {/* Option 1: Weekly Rapid Reagent Strips */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold">
                  {config.urinalysis.weekly.cadence}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {config.urinalysis.weekly.price}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {config.urinalysis.weekly.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {config.urinalysis.weekly.summary}
              </p>
              <div className="pt-1">
                <a
                  href={config.urinalysis.weekly.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-teal-950/80 hover:bg-teal-900 border border-teal-700/60 text-teal-300 text-xs font-bold transition shadow-sm"
                >
                  <span>{config.urinalysis.weekly.ctaText}</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Option 2: Quarterly Clinical Lab ACR */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  {config.urinalysis.quarterly.cadence}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {config.urinalysis.quarterly.price}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {config.urinalysis.quarterly.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {config.urinalysis.quarterly.summary}
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => triggerLabRequisition({
                    destinationUrl: config.urinalysis.quarterly.url,
                    testName: `${config.urinalysis.quarterly.title} (${activeRegion})`,
                  })}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <span>{config.urinalysis.quarterly.ctaText}</span>
                  <ExternalLink size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHANNEL 3: ⌚ HARDWARE & WEARABLE TELEMETRY (Paid Optional Tier)           */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-md bg-gradient-to-br from-violet-950/60 via-slate-900/90 to-fuchsia-950/40 border border-slate-800 hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#a855f7] rounded-full filter blur-3xl opacity-15 pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-amber-950 border border-amber-800/80 text-amber-300 font-bold">
                CHANNEL 3: ⌚ HARDWARE TELEMETRY
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Paid Optional Tier
              </span>
            </div>

            {/* Sub-header instruction */}
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              24/7 autonomic recovery, body composition, and visceral fat telemetry.
            </p>

            {/* Track 1: Smart Scales */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
                  <Scale size={12} />
                  <span>SMART SCALES</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Bioimpedance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {config.hardware.scales.summary}
              </p>
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-300 font-mono text-[11px] truncate pr-2">
                  {config.hardware.scales.productName}
                </span>
                <a
                  href={config.hardware.scales.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-xs flex items-center gap-1 font-bold shrink-0"
                >
                  <span>View Product</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Track 2: Wearables */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-violet-400 font-bold flex items-center gap-1">
                  <Watch size={12} />
                  <span>WEARABLES</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">24/7 Biosensors</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {config.hardware.wearables.summary}
              </p>
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-300 font-mono text-[11px] truncate pr-2">
                  {config.hardware.wearables.productName}
                </span>
                <a
                  href={config.hardware.wearables.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-xs flex items-center gap-1 font-bold shrink-0"
                >
                  <span>View Product</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-slate-800 space-y-2 relative z-10">
            <Link
              to="/library/body-composition"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Read Free Body Comp Guide</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>

      {/* Optional Footnote / Comparison Accordion Anchor */}
      {showComparisonLink && (
        <div className="text-center pt-1">
          <a
            href="#step-2-comparison"
            className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-mono inline-flex items-center gap-1"
          >
            <span>Compare 56-Biomarker Scientific Hierarchy &amp; Clinical Ranges Below ↓</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Step2DiagnosticChannels;
