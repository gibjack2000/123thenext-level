import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Microscope, 
  Stethoscope, 
  Droplet, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Clock,
  Layers,
  Heart,
  Calendar,
  Building2,
  Home as HomeIcon,
  HelpCircle,
  Info,
  Scale
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';

// Biomarker Science Guide data
interface BiomarkerDetail {
  name: string;
  tag: string;
  optimalTarget: string;
  standardLabRange: string;
  whyItMatters: string;
  clinicalRisk: string;
}

const CORE_BIOMARKERS: BiomarkerDetail[] = [
  {
    name: 'Apolipoprotein B (ApoB)',
    tag: 'Primary Cardiovascular Plaque Driver',
    optimalTarget: '< 70 mg/dL (< 0.7 g/L) • Elite: 50–60 mg/dL',
    standardLabRange: '< 90–100 mg/dL',
    whyItMatters: 'Every atherogenic lipid particle (LDL, VLDL, IDL, Lp(a)) carries exactly one ApoB molecule. Unlike standard LDL-C which only estimates cholesterol weight, ApoB provides an exact physical count of particles that can penetrate and lodge within endothelial artery walls.',
    clinicalRisk: 'Standard medicine treats LDL-C, missing particle discordance. High ApoB drives cumulative lifelong plaque burden and calcification.'
  },
  {
    name: 'Glycated Hemoglobin (HbA1c)',
    tag: '90-Day Metabolic & Glycemic Velocity',
    optimalTarget: '< 5.4% (< 36 mmol/mol) • Elite: 4.8–5.2%',
    standardLabRange: '< 5.7% (Prediabetes cut-off: 5.7–6.4%)',
    whyItMatters: 'Measures the percentage of hemoglobin proteins coated with sugar over the 90–120 day lifespan of red blood cells. Reflects true glycemic stability, glycemic variability, and post-prandial excursions far better than a single fasting glucose fingerstick.',
    clinicalRisk: 'Even "normal" values between 5.5% and 5.9% accelerate cellular glycation (AGEs), stiffening collagen and damaging microvascular filtration beds.'
  },
  {
    name: 'High-Sensitivity C-Reactive Protein (hs-CRP)',
    tag: 'Vascular & Systemic Micro-Inflammation',
    optimalTarget: '< 0.5 mg/L • Elite: < 0.3 mg/L',
    standardLabRange: '< 1.0–3.0 mg/L',
    whyItMatters: 'An acute-phase hepatic protein that surges in response to systemic cytokine activation (IL-6, TNF-alpha). While traditional CRP screens for acute infection, high-sensitivity CRP (hs-CRP) quantifies silent, low-grade vascular inflammation that destabilizes arterial soft plaques.',
    clinicalRisk: 'Elevated hs-CRP indicates ongoing endothelial erosion, accelerating biological aging and increasing all-cause cardiovascular event hazard.'
  },
  {
    name: 'Urine Albumin-to-Creatinine Ratio (Urine ACR)',
    tag: 'Endothelial & Renal Glomerular Filtration Integrity',
    optimalTarget: '< 10 mg/g (< 1.0 mg/mmol) • Clinical Normal: < 30 mg/g',
    standardLabRange: '< 30 mg/g (< 3.0 mg/mmol)',
    whyItMatters: 'The kidney glomerular barrier is lined by delicate endothelial glycocalyx. When microvascular damage or systemic hypertension occurs, albumin proteins leak through into the urine. Urine ACR is the earliest detectable canary in the coalmine for full-body microvascular decay.',
    clinicalRisk: 'Waiting for serum creatinine or eGFR to drop means losing up to 50% of renal nephrons before detection. ACR flags damage years in advance.'
  }
];

const URINE_DIPSTICK_METRICS = [
  { parameter: 'pH (Acid-Base)', target: '6.0 – 7.5', clinicalNote: 'Reflects dietary acid load, hydration buffering, and uric acid crystallization risk.' },
  { parameter: 'Specific Gravity (Hydration)', target: '1.010 – 1.020', clinicalNote: 'Direct index of renal tubular concentrating ability and cellular fluid status.' },
  { parameter: 'Ketones (Acetoacetate)', target: 'Negative to Trace', clinicalNote: 'Verifies fasting duration, metabolic switching, and carbohydrate restriction.' },
  { parameter: 'Protein (Microalbumin)', target: 'Negative', clinicalNote: 'Early acute warning of glomerular barrier leakage or exercise-induced proteinuria.' },
  { parameter: 'Leukocytes (WBCs)', target: 'Negative', clinicalNote: 'Detects asymptomatic pyuria, immune cell recruitment, or micro-inflammation.' },
  { parameter: 'Nitrites', target: 'Negative', clinicalNote: 'Indicates nitrate-reducing bacteria, confirming or ruling out silent urinary tract infection.' },
  { parameter: 'Blood / Erythrocytes', target: 'Negative', clinicalNote: 'Screens for microhematuria, nephron inflammation, or stone formation.' },
  { parameter: 'Glucose', target: 'Negative', clinicalNote: 'Verifies whether blood sugar has exceeded the renal threshold (>180 mg/dL).' },
  { parameter: 'Urobilinogen', target: '0.2 – 1.0 mg/dL (Normal)', clinicalNote: 'Measures bilirubin degradation in the intestine and enterohepatic recirculation.' },
  { parameter: 'Bilirubin', target: 'Negative', clinicalNote: 'Flags early biliary obstruction or hepatic metabolism dysfunction.' }
];

export default function DiagnosticsSuite() {
  const { market, setMarket } = useMarket();
  const [activeRegion, setActiveRegion] = useState<'US' | 'UK' | 'ES'>(
    (market as 'US' | 'UK' | 'ES') || 'US'
  );
  const [selectedBloodChoice, setSelectedBloodChoice] = useState<'clinic' | 'mobile'>('clinic');
  const [selectedUrineChoice, setSelectedUrineChoice] = useState<'type1' | 'type2'>('type1');
  const [expandedBiomarker, setExpandedBiomarker] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Precision Diagnostics Suite & Telemetry Guide | 123TheNextLevel';
  }, []);

  useEffect(() => {
    if (market && ['US', 'UK', 'ES'].includes(market)) {
      setActiveRegion(market as 'US' | 'UK' | 'ES');
    }
  }, [market]);

  const handleRegionSwitch = (reg: 'US' | 'UK' | 'ES') => {
    setActiveRegion(reg);
    setMarket(reg as Market);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-28 pb-24 relative overflow-hidden">
      
      {/* Background radial glow & geometric grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[45%] right-[-5%] w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Activity size={14} className="animate-pulse" />
            <span>PRECISION TESTING &amp; DIAGNOSTIC RADAR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
            The Complete{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Diagnostics Suite
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
            Geroscience rejects the passive model of waiting for disease diagnosis. Establish your verifiable biomarker baseline through gold-standard venous draws, quarterly renal urine analysis, and rapid home fluid telemetry.
          </p>

          {/* Regional Selector Tabs (US, UK, ES) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1.5 shadow-xl">
              <span className="px-3 text-slate-400 text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                Healthcare System:
              </span>
              <button
                type="button"
                onClick={() => handleRegionSwitch('US')}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  activeRegion === 'US'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUS className="w-4 h-3 pointer-events-none" />
                <span>United States (Quest / Labcorp)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRegionSwitch('UK')}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  activeRegion === 'UK'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUK className="w-4 h-3 pointer-events-none" />
                <span>United Kingdom (UKAS / LOLA)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRegionSwitch('ES')}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  activeRegion === 'ES'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagES className="w-4 h-3 pointer-events-none" />
                <span>Spain / EU (Eurofins / Megalab)</span>
              </button>
            </div>

            {/* Direct Form CTA */}
            <Link
              to="/clinician-copilot"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <FileText size={14} />
              <span>Log Numbers in Co-Pilot Form →</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION A: 🩸 2 BLOOD DRAW CHOICES                                     */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest font-bold">SECTION 1: CLINICAL PHLEBOTOMY ARCHITECTURE</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
                🩸 Two Blood Draw Choices: In-Person Clinic vs At-Home Phlebotomy
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              We exclusively specify clinical <strong>venous draws</strong> over finger-prick lancets to eliminate interstitial fluid dilution and erythrocyte hemolysis.
            </p>
          </div>

          {/* Phlebotomy Method Selector Tabs */}
          <div className="flex border-b border-slate-800 gap-2">
            <button
              onClick={() => setSelectedBloodChoice('clinic')}
              className={`pb-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                selectedBloodChoice === 'clinic'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Building2 size={15} />
              <span>Choice 1: In-Person Walk-In Clinic Draw (Most Economical)</span>
            </button>
            <button
              onClick={() => setSelectedBloodChoice('mobile')}
              className={`pb-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                selectedBloodChoice === 'mobile'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <HomeIcon size={15} />
              <span>Choice 2: At-Home / Mobile Phlebotomist Visit (Maximum Convenience)</span>
            </button>
          </div>

          {/* Regional Cards based on Choice */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* US Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeRegion === 'US'
                ? 'bg-slate-900/90 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    🇺🇸 United States
                  </span>
                  <span className="text-xl font-display font-black text-white">
                    {selectedBloodChoice === 'clinic' ? '$299.00' : '$319.00'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    {selectedBloodChoice === 'clinic'
                      ? 'HealthLabs Quest / Labcorp In-Person Draw'
                      : 'HealthLabs Mobile Phlebotomy / LetsGetChecked Home Visit'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedBloodChoice === 'clinic'
                      ? '4,500+ CLIA-certified draw centers across all 50 US states. No doctor prescription needed.'
                      : 'A licensed certified phlebotomist travels directly to your home or office for painless venous collection.'}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>ApoB + Full Lipid Cascade:</strong> Absolute atherogenic particle count</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>Fasting Glucose &amp; HbA1c:</strong> 90-day glycemic variance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>hs-CRP:</strong> Systemic vascular micro-inflammation index</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Complete 56-Biomarker Metabolic, Liver &amp; Kidney Panel</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://www.healthlabs.com/?affiliate=123znl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Order HealthLabs Panel (US)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* UK Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeRegion === 'UK'
                ? 'bg-slate-900/90 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    🇬🇧 United Kingdom
                  </span>
                  <span className="text-xl font-display font-black text-white">
                    {selectedBloodChoice === 'clinic' ? '£149.00' : '£237.00'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    {selectedBloodChoice === 'clinic'
                      ? 'LOLA Health Vital Check 56 (Partner Clinic)'
                      : 'LOLA Mobile Phlebotomist / Medichecks Home Nurse Visit'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedBloodChoice === 'clinic'
                      ? 'Walk into partner clinics across London, Manchester, Birmingham, Edinburgh, and Belfast.'
                      : 'A GMC-registered nurse visits your private residence for gold-standard venous tube collection.'}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>ApoB:</strong> Total atherogenic particle enumeration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>HbA1c &amp; Fasting Glucose:</strong> Insulin sensitivity profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>High-Sensitivity CRP:</strong> Low-grade vascular inflammation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>UKAS accredited laboratory with GMC physician oversight</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
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

            {/* ES Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeRegion === 'ES'
                ? 'bg-slate-900/90 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                    🇪🇸 Spain / EU
                  </span>
                  <span className="text-xl font-display font-black text-white">
                    {selectedBloodChoice === 'clinic' ? '149,00 €' : '179,00 €'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    {selectedBloodChoice === 'clinic'
                      ? 'Melio España / Eurofins Megalab Clínica'
                      : 'SaludOnNet Extracción a Domicilio / Enfermero Privado'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedBloodChoice === 'clinic'
                      ? 'Más de 160 centros de extracción Eurofins Megalab y Unilabs en Madrid, Barcelona, Valencia y toda España.'
                      : 'Servicio de enfermería profesional a domicilio para extracción venosa estéril sin desplazamientos.'}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>ApoB:</strong> Partículas aterogénicas directas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>HbA1c &amp; Glucosa Basal:</strong> Control metabólico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>hs-CRP:</strong> Inflamación vascular ultrasensible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Marcado CE y certificación ISO 15189 con informe médico digital</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://www.melio.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Reservar Análisis Melio / Megalab (ES)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION B: 🧪 2 URINALYSIS ASSESSMENTS                                 */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-teal-400 tracking-widest font-bold">SECTION 2: FLUID TELEMETRY &amp; RENAL MICROVASCULAR SCREENING</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
              🧪 Two Urinalysis Assessments: Quarterly Pathology Lab ACR vs Weekly At-Home Dipstick
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Urine provides immediate chemical insight into systemic acid-base regulation, ketosis, and the delicate endothelial filtration barriers of the kidneys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* TYPE 1: Quarterly Pathology Lab ACR */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-teal-950 border border-teal-800 text-teal-300 font-bold">
                    ASSESSMENT TYPE 1 • QUARTERLY (90 DAYS)
                  </span>
                  <span className="text-xs font-mono text-slate-400">Pathology Lab Venous / Cup</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    Pathology Lab Albumin-to-Creatinine Ratio (ACR) &amp; Sediment
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    Analyzed in an accredited medical laboratory (Quest, LOLA, Eurofins). Quantifies microscopic albumin protein leakage relative to creatinine clearance and screens microscopic sediment for casts, crystals, and erythrocytes.
                  </p>
                </div>

                <div className="space-y-2.5 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-semibold">Optimal Geroscience Target:</span>
                    <span className="font-mono text-teal-400 font-bold">&lt; 10 mg/g (&lt; 1.0 mg/mmol)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Clinical Disease Threshold:</span>
                    <span className="font-mono text-slate-300">&lt; 30 mg/g (&lt; 3.0 mg/mmol)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Cadence:</span>
                    <span className="font-mono text-slate-300">Every 90 Days (Quarterly)</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-teal-400 shrink-0" />
                    <span>Detects endothelial glycocalyx erosion 5–10 years before eGFR drops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-teal-400 shrink-0" />
                    <span>Microscopic sediment checks for silent renal casts or hematuria</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 mb-2 font-mono">
                  {activeRegion === 'US' && '🇺🇸 Requisition: HealthLabs ACR Microalbumin Panel ($69)'}
                  {activeRegion === 'UK' && '🇬🇧 Requisition: LOLA Health Urinalysis & ACR (£49)'}
                  {activeRegion === 'ES' && '🇪🇸 Requisition: SaludOnNet / Eurofins Análisis con Sedimento (39€)'}
                </div>
                <a
                  href={
                    activeRegion === 'US' 
                      ? 'https://www.healthlabs.com/?affiliate=123znl'
                      : activeRegion === 'UK'
                      ? 'https://referrals.lolahealth.com/NextLevel15'
                      : 'https://www.saludonnet.com'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Order Quarterly Lab Urinalysis ({activeRegion})</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* TYPE 2: Weekly At-Home 10-Parameter Dipstick */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                    ASSESSMENT TYPE 2 • WEEKLY (EVERY 7 DAYS)
                  </span>
                  <span className="text-xs font-mono text-slate-400">Rapid Home Dipstick (60s)</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    Weekly At-Home 10-Parameter Rapid Reagent Strips
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    Medical-grade chemical reagent strips (Diagnox Urinox-10 / ALLTEST). Dipped in mid-stream urine and read at exactly 60 seconds against a calibrated color block. Verifies daily hydration, acid load, and acute metabolic habits.
                  </p>
                </div>

                <div className="space-y-2.5 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-semibold">Reagents Tested:</span>
                    <span className="font-mono text-cyan-400 font-bold">10 Clinical Chemical Pads</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Read Time:</span>
                    <span className="font-mono text-slate-300">60 Seconds Flat</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Kit Supply:</span>
                    <span className="font-mono text-slate-300">100 Strips (Up to 2-Year Supply)</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Real-time feedback on hydration (SG) and dietary acid load (pH)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Zero-latency alert for sudden proteinuria or microscopic hematuria</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 mb-2 font-mono">
                  {activeRegion === 'US' && '🇺🇸 Product: Diagnox Urinox-10 Medical Strips ($16.99)'}
                  {activeRegion === 'UK' && '🇬🇧 Product: ALLTEST 10-Parameter Dipsticks (£12.99)'}
                  {activeRegion === 'ES' && '🇪🇸 Product: ALLTEST Tiras Reactivas 10 Parámetros (14,50€)'}
                </div>
                <a
                  href={
                    activeRegion === 'US' 
                      ? 'https://diagnoxhealth.com/products/urinalysis-test'
                      : activeRegion === 'UK'
                      ? 'https://referrals.lolahealth.com/NextLevel15'
                      : 'https://www.saludonnet.com'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Order 10-Parameter Reagent Strips ({activeRegion})</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: 24/7 BODY COMPOSITION, WEARABLES & VISCERAL FAT TELEMETRY       */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-bold">
              SECTION 3: CONTINUOUS HARDWARE &amp; BIOIMPEDANCE BASELINES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
              ⚖️ 24/7 Body Composition, Wearables &amp; Visceral Fat Telemetry
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Continuous Hardware &amp; Bioimpedance Baselines (Paid Optional Tier). Detect hidden organ adiposity, prevent age-related sarcopenia, and track 14-day rolling autonomic recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Premium Bioimpedance Scale */}
            <div className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                    PREMIUM BIOIMPEDANCE
                  </span>
                  <span className="text-xs font-mono text-slate-400">Segmental 8-Lead</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    Withings Body Scan / Body Comp
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    Gold-standard 8-electrode bioelectrical impedance with handlebar. Directly isolates Visceral Fat Rating (1–12), segment-by-segment skeletal muscle mass %, and pulse wave arterial stiffness.
                  </p>
                </div>

                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-semibold">Key Telemetry:</span>
                    <span className="font-mono text-amber-400">Visceral Fat Level (1–12)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Clinical Metrics:</span>
                    <span className="font-mono text-slate-300">Muscle % • Arterial Age</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={
                    activeRegion === 'US'
                      ? 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20'
                      : activeRegion === 'UK'
                      ? 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21'
                      : 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Examine Scale ({activeRegion})</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* 2. Accessible Bioimpedance Scale */}
            <div className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                    ACCESSIBLE SMART SCALE
                  </span>
                  <span className="text-xs font-mono text-slate-400">4-Electrode BIA</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    Renpho / Etekcity Bluetooth Smart Scale
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    High-accuracy home bioimpedance platform tracking body fat %, skeletal muscle mass, subcutaneous fat, and visceral fat grade with seamless cloud sync to Apple Health and Google Fit.
                  </p>
                </div>

                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-semibold">Key Telemetry:</span>
                    <span className="font-mono text-cyan-400">Body Fat % • Muscle Mass</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Integration:</span>
                    <span className="font-mono text-slate-300">Instant App Sync</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={
                    activeRegion === 'US'
                      ? 'https://www.amazon.com/dp/B01N1UX8RW?tag=123znl0e-20'
                      : activeRegion === 'UK'
                      ? 'https://www.amazon.co.uk/dp/B0F18PQH6N?tag=123znl0f3-21'
                      : 'https://www.amazon.es/dp/B01N1UX8RW?tag=123znl08a-21'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Examine Scale ({activeRegion})</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* 3. Continuous Autonomic Wearables */}
            <div className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-teal-950 border border-teal-800 text-teal-300 font-bold">
                    AUTONOMIC WEARABLES
                  </span>
                  <span className="text-xs font-mono text-slate-400">24/7 Biosensors</span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black uppercase text-white">
                    Oura Ring Gen4 / Apple Watch
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                    Continuous nocturnal photoplethysmography providing medical-grade 14-day rolling baselines for Nocturnal HRV (rMSSD), Resting Heart Rate (RHR), and deep slow-wave sleep efficiency.
                  </p>
                </div>

                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-semibold">Key Telemetry:</span>
                    <span className="font-mono text-teal-400">Nocturnal HRV • Resting HR</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Clinical Value:</span>
                    <span className="font-mono text-slate-300">Autonomic Tone Index</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={
                    activeRegion === 'US'
                      ? 'https://www.amazon.com/dp/B0DJBH1625?tag=123znl0e-20'
                      : activeRegion === 'UK'
                      ? 'https://www.amazon.co.uk/dp/B0DJBH1625?tag=123znl0f3-21'
                      : 'https://www.amazon.es/dp/B0DJBH1625?tag=123znl08a-21'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Examine Wearable ({activeRegion})</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

          </div>

          {/* Section 3 Dual CTAs */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-display font-black uppercase text-white">
                Learn the Science &amp; Download the Phased Protocol
              </h4>
              <p className="text-xs text-slate-400">
                Understand the TOFI trap or get the full 12-week body re-engineering schedule.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/library/body-composition"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Read Free Body Comp Guide</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/store/metabolic-master-guide"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-teal-400 hover:from-amber-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
              >
                <span>Get 12-Week Protocol (£19)</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION D: 🔬 BIOMARKER SCIENCE GUIDE                                   */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-indigo-400 tracking-widest font-bold">SECTION 4: EVIDENCE-BASED REFERENCE MANUAL</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
              🔬 Biomarker Science Guide: Target Ranges &amp; Clinical Rationale
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Traditional reference ranges only flag overt disease states. Geroscience benchmarks target optimal physiological youth and vascular resilience.
            </p>
          </div>

          {/* 4 Core Biomarkers Detailed Cards */}
          <div className="space-y-4">
            {CORE_BIOMARKERS.map((bio, index) => {
              const isOpen = expandedBiomarker === index;
              return (
                <div
                  key={bio.name}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedBiomarker(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-lg text-white uppercase">{bio.name}</span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {bio.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono pt-1">
                        <span className="text-cyan-400 font-bold">Target: {bio.optimalTarget}</span>
                        <span className="text-slate-500 hidden sm:inline">•</span>
                        <span className="text-slate-400 hidden sm:inline">Lab Range: {bio.standardLabRange}</span>
                      </div>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                      <span className="text-sm font-bold">{isOpen ? '−' : '+'}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 text-xs sm:text-sm space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-300 font-mono uppercase text-xs">Biological Mechanism &amp; Rationale:</h4>
                        <p className="text-slate-300 font-light leading-relaxed">{bio.whyItMatters}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 text-xs">
                        <strong className="text-rose-400 block font-mono uppercase mb-0.5">Clinical Risk of Ignoring:</strong>
                        {bio.clinicalRisk}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 10-Parameter Dipstick Metrics Table */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-black uppercase text-white">
                The 10-Parameter Home Urinalysis Reference Matrix
              </h3>
              <span className="text-xs font-mono text-cyan-400">60-Second Color Match</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-slate-300 border-b border-slate-800 font-mono uppercase text-[11px]">
                    <th className="p-3.5 font-bold w-1/4">Reagent Parameter</th>
                    <th className="p-3.5 font-bold w-1/4">Optimal Target</th>
                    <th className="p-3.5 font-bold">Clinical Significance &amp; Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-light">
                  {URINE_DIPSTICK_METRICS.map((row) => (
                    <tr key={row.parameter} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans">{row.parameter}</td>
                      <td className="p-3.5 font-mono text-cyan-300 font-semibold">{row.target}</td>
                      <td className="p-3.5 leading-relaxed">{row.clinicalNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PRIMARY CTA CALLOUT BANNER                                             */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border border-cyan-500/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>STEP 3 ONBOARDING INTEGRATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
              Have Your Lab Numbers or Dipstick Results?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Log your ApoB, HbA1c, hs-CRP, and daily urine parameters in our 100% Guest-Mode client-side hub. Auto-saved locally on your device with instant 2-page GP Consultation Template PDF export.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              to="/clinician-copilot"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <FileText size={16} />
              <span>📄 Log Your Numbers in the Clinician Co-Pilot Form →</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
