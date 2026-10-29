import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  Dna, 
  Scale, 
  Heart, 
  Layers, 
  ChevronRight, 
  Clock, 
  Flame, 
  Stethoscope, 
  BookOpen, 
  ShoppingBag,
  Info
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { useCart } from '../contexts/CartContext';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';

interface HardwareItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  rating: string;
  description: string;
  us: { url: string; price: string };
  uk: { url: string; price: string };
  es: { url: string; price: string };
}

const HARDWARE_PICKS: HardwareItem[] = [
  {
    id: 'withings-body-scan',
    name: 'Withings Body Scan Segmental Scale',
    category: 'Gold-Standard Bioimpedance Telemetry',
    badge: 'FDA Cleared & CE Marked',
    rating: '4.9/5 • Clinical Grade',
    description: 'Segmental multi-frequency bioelectrical impedance with retractable handlebar electrodes. Accurately enumerates Visceral Fat Rating (1–12), torso and limb skeletal muscle distribution, vascular arterial age (pulse wave velocity), and 6-lead ECG rhythm.',
    us: {
      url: 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
      price: '$399.95'
    },
    uk: {
      url: 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21',
      price: '£349.99'
    },
    es: {
      url: 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21',
      price: '399,95€'
    }
  },
  {
    id: 'renpho-smart-scale',
    name: 'Renpho Bluetooth Precision Smart Scale',
    category: 'Accessible Precision Bioimpedance',
    badge: 'High Value Pick',
    rating: '4.7/5 • 300,000+ Reviews',
    description: 'High-precision 4-electrode bioimpedance platform measuring body fat percentage, visceral fat level, skeletal muscle mass, and subcutaneous adipose distribution with automated Apple Health & Google Fit cloud synchronization.',
    us: {
      url: 'https://www.amazon.com/dp/B01N1UX8RW?tag=123znl0e-20',
      price: '$24.99'
    },
    uk: {
      url: 'https://www.amazon.co.uk/dp/B0F18PQH6N?tag=123znl0f3-21',
      price: '£28.99'
    },
    es: {
      url: 'https://www.amazon.es/dp/B01N1UX8RW?tag=123znl08a-21',
      price: '29,99€'
    }
  },
  {
    id: 'continuous-autonomics',
    name: 'Oura Ring Gen4 / Apple Watch Series 10',
    category: 'Continuous Autonomic Biomarker Sensors',
    badge: 'Medical Telemetry',
    rating: '4.8/5 • 24/7 Biosensing',
    description: 'Nocturnal photoplethysmography capturing 14-day rolling averages for Resting Heart Rate (RHR), Heart Rate Variability (HRV rMSSD), sleep architecture (Deep + REM duration), and blood oxygen saturation (SpO2).',
    us: {
      url: 'https://www.amazon.com/dp/B0DJBH1625?tag=123znl0e-20',
      price: '$399.00'
    },
    uk: {
      url: 'https://www.amazon.co.uk/dp/B0DJBH1625?tag=123znl0f3-21',
      price: '£379.00'
    },
    es: {
      url: 'https://www.amazon.es/dp/B0DJBH1625?tag=123znl08a-21',
      price: '399,00€'
    }
  }
];

export default function BodyCompositionArticle() {
  const { market, setMarket } = useMarket();
  const { addToCart, openCart } = useCart();
  const [activeRegion, setActiveRegion] = useState<'US' | 'UK' | 'ES'>(
    (market as 'US' | 'UK' | 'ES') || 'US'
  );
  const [activeVisceralTier, setActiveVisceralTier] = useState<number>(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Beyond BMI: Why Visceral Fat & Bioimpedance Rule Longevity | 123TheNextLevel';
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

  const handleQuickAddProtocol = () => {
    addToCart({
      id: 'metabolic-master-guide',
      slug: 'metabolic-master-guide',
      title: 'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
      priceDisplay: activeRegion === 'US' ? '$25.00' : activeRegion === 'ES' ? '22,00 €' : '£19.00',
      stripePriceId: 'price_metabolic_master_guide',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop',
      category: 'Nutrition'
    });
    openCart();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-28 pb-36 relative overflow-hidden">
      
      {/* Background radial glow & structural grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* ========================================================================= */}
        {/* BREADCRUMB & METADATA                                                     */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/library" className="hover:text-cyan-400 transition-colors">Library</Link>
          <ChevronRight size={12} />
          <Link to="/clinician-copilot" className="hover:text-cyan-400 transition-colors">Diagnostics &amp; Co-Pilot</Link>
          <ChevronRight size={12} />
          <span className="text-cyan-400 font-bold">Body Composition</span>
        </div>

        {/* ========================================================================= */}
        {/* HERO TITLE & CLINICAL ABSTRACT                                            */}
        {/* ========================================================================= */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Scale size={14} className="text-cyan-400" />
            <span>PRECISION GEROSCIENCE WHITE PAPER • OPEN ACCESS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
            Beyond BMI:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              Why Visceral Fat and Bioimpedance Biomarkers Rule Longevity
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Body Mass Index (BMI) was engineered in 1832 as a statistical population tool—not an individual clinical biomarker. Today, modern geroscience reveals that subcutaneous limb fat is virtually harmless compared to the toxic, hormonally destructive secretome of <strong>Visceral Adipose Tissue (VAT)</strong> wrapping around your heart, liver, and intestines.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800">
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-cyan-400" /> 12 Min Clinical Read</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Dna size={13} className="text-teal-400" /> Evidence Grade A</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-emerald-400" /> Peer-Reviewed Geroscience</span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 1: THE TOFI TRAP ("THIN OUTSIDE, FAT INSIDE")                      */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono font-bold flex items-center justify-center text-sm">
              01
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-rose-400 tracking-widest font-bold">THE EPIDEMIOLOGICAL BLINDSPOT</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                The TOFI Trap: Why "Normal" Weight Kills
              </h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base font-light">
            <p>
              In contemporary primary care, millions of patients are congratulated by their general practitioners simply because their BMI lands within the "normal" window of 18.5 to 24.9 kg/m². Yet comprehensive DEXA and MRI cadaver studies reveal a terrifying clinical reality: <strong>up to 30% of normal-weight individuals suffer from the TOFI phenotype (Thin Outside, Fat Inside)</strong>.
            </p>
            <p>
              A TOFI patient presents with slender arms, narrow calves, and a modest waistline, concealing severe visceral adiposity embedded inside the peritoneal cavity and interspersed directly within hepatic parenchyma (fatty liver) and the pancreas. Because BMI cannot differentiate between dense, metabolically active skeletal muscle and inflammatory visceral fat, standard medicine declares these patients healthy—right up until they suffer a myocardial infarction or ischemic stroke.
            </p>
          </div>

          {/* Contrast Matrix Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold uppercase text-xs font-mono">
                <AlertTriangle size={15} />
                <span>The Legacy BMI Metric (Broken)</span>
              </div>
              <ul className="space-y-2 text-xs text-rose-200">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Treats a 90kg muscular athlete and a 90kg sedentary diabetic identically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Blind to ectopic fat accumulation in the liver and pericardium.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Fails to measure age-related sarcopenia (loss of skeletal muscle reserve).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs font-mono">
                <CheckCircle2 size={15} />
                <span>Bioimpedance Telemetry (Geroscience Standard)</span>
              </div>
              <ul className="space-y-2 text-xs text-cyan-200">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Isolates Visceral Fat Rating (1–12) deep in the peritoneal cavity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Quantifies Skeletal Muscle Mass % to prevent frailty and insulin resistance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Monitors cellular hydration via extracellular vs. intracellular water ratio.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: PATHOPHYSIOLOGICAL MECHANISM                                   */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-sm">
              02
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-400 tracking-widest font-bold">ENDOCRINE &amp; VASCULAR BIOLOGY</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                How Visceral Fat Destroys Longevity: The Tri-Marker Cascade
              </h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base font-light">
            <p>
              Unlike benign subcutaneous adipose tissue (the pinchable fat directly beneath the skin), <strong>visceral fat operates as an aggressive, uncontrolled endocrine organ</strong>. Because visceral fat is anatomically drained directly by the portal venous system, every molecule it secretes pours straight into the liver before entering the general circulation.
            </p>
          </div>

          {/* 3 Biomarker Biological Intersections */}
          <div className="space-y-4">
            
            {/* 1. hs-CRP */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-rose-400" />
                  <h3 className="font-display font-black text-white uppercase text-base">
                    1. Systemic Micro-Inflammation (hs-CRP)
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-950 text-rose-300 border border-rose-800">
                  Target: &lt; 0.5 mg/L
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Hypertrophic visceral adipocytes suffer from chronic hypoxia, triggering macrophage infiltration and pumping inflammatory cytokines (Interleukin-6, TNF-alpha) directly into hepatic circulation. The liver responds by synthesizing massive quantities of <strong>high-sensitivity C-reactive protein (hs-CRP)</strong>, causing low-grade arterial erosion that destabilizes cardiovascular soft plaques.
              </p>
            </div>

            {/* 2. HbA1c */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplet size={16} className="text-amber-400" />
                  <h3 className="font-display font-black text-white uppercase text-base">
                    2. Portal Vein Free Fatty Acid Overload &amp; Insulin Resistance (HbA1c)
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-950 text-amber-300 border border-amber-800">
                  Target: &lt; 5.4%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Visceral adipocytes possess a high lipolytic rate, continually dumping free fatty acids (FFAs) into the portal vein. This floods the liver, inducing non-alcoholic fatty liver disease (NAFLD/MASLD), downregulating insulin receptors, and forcing beta-cells in the pancreas to overproduce insulin. Over 90 days, this accelerated glycation manifests as creeping <strong>HbA1c</strong>, stiffening capillaries and microvascular beds.
              </p>
            </div>

            {/* 3. ApoB */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-cyan-400" />
                  <h3 className="font-display font-black text-white uppercase text-base">
                    3. Hepatic VLDL Overproduction &amp; Atherogenic Particle Count (ApoB)
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Target: &lt; 70 mg/dL
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                The massive flux of portal fatty acids forces the liver to assemble and secrete large quantities of triglyceride-rich Very-Low-Density Lipoproteins (VLDL). As these particles metabolize in the blood, they transform into dense LDL particles, each bearing an atherogenic <strong>ApoB</strong> protein capable of penetrating and trapping itself inside endothelial arterial linings.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: BIOIMPEDANCE TECHNOLOGY & RATING MATRIX                         */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono font-bold flex items-center justify-center text-sm">
              03
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-teal-400 tracking-widest font-bold">BIOPHYSICAL MEASUREMENT</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Bioimpedance Technology: Decoding the 1–12 Scale
              </h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base font-light">
            <p>
              Multi-frequency Bioelectrical Impedance Analysis (BIA) functions by sending safe, imperceptible micro-currents through the body. Because water-dense skeletal muscle conducts electricity with low resistance, while dense anhydrous fat tissue creates high impedance, algorithms calculate somatic tissue distribution in seconds.
            </p>
          </div>

          {/* Interactive Visceral Fat Level Explainer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-display font-black uppercase text-white text-lg">
                The Clinical Visceral Fat Rating Matrix (Levels 1 to 12)
              </h3>
              <span className="text-xs font-mono text-cyan-400">Click a tier to inspect clinical status</span>
            </div>

            {/* Tier Selector Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setActiveVisceralTier(1)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeVisceralTier === 1
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-mono uppercase font-bold">Level 1 – 4</div>
                <div className="text-sm sm:text-base font-black text-white mt-1">Optimal Youth</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveVisceralTier(2)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeVisceralTier === 2
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-mono uppercase font-bold">Level 5 – 8</div>
                <div className="text-sm sm:text-base font-black text-white mt-1">Warning Zone</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveVisceralTier(3)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeVisceralTier === 3
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-mono uppercase font-bold">Level 9 – 12</div>
                <div className="text-sm sm:text-base font-black text-white mt-1">Critical Risk</div>
              </button>
            </div>

            {/* Tier Details Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm">
              {activeVisceralTier === 1 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase font-mono text-xs">
                    <CheckCircle2 size={14} />
                    <span>Level 1–4: Geroscience Gold-Standard (Sub-Clinical Resilience)</span>
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Zero significant ectopic organ fat accumulation. Minimal inflammatory cytokine leakage into the portal vein. High hepatic insulin sensitivity, low resting hs-CRP (&lt;0.5 mg/L), and optimal vascular compliance.
                  </p>
                </div>
              )}
              {activeVisceralTier === 2 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold uppercase font-mono text-xs">
                    <AlertTriangle size={14} />
                    <span>Level 5–8: Subclinical Metabolic Warning (Early Organ Lipotoxicity)</span>
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Early visceral adipose hypertrophy. Increased free fatty acid delivery to the liver begins elevating post-prandial glucose variability and hepatic triglycerides. Early endothelial strain detectable via urine microalbumin.
                  </p>
                </div>
              )}
              {activeVisceralTier === 3 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold uppercase font-mono text-xs">
                    <AlertTriangle size={14} />
                    <span>Level 9–12: High Endocrine Danger (Metabolic Syndrome Accelerant)</span>
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Severe visceral envelopment of abdominal viscera. Chronic high systemic inflammation, hepatic steatosis (fatty liver), impaired beta-cell insulin response, elevated ApoB, and dramatic escalation in 10-year cardiovascular risk.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: CURATED HARDWARE RECOMMENDATIONS                               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm">
                04
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-widest font-bold">VERIFIED REQUISITION HARDWARE</span>
                <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                  Curated Bioimpedance &amp; Wearable Hardware
                </h2>
              </div>
            </div>

            {/* Regional Selector Pills */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs">
              <button
                type="button"
                onClick={() => handleRegionSwitch('US')}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRegion === 'US' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUS className="w-3.5 h-2.5" />
                <span>US</span>
              </button>
              <button
                type="button"
                onClick={() => handleRegionSwitch('UK')}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRegion === 'UK' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagUK className="w-3.5 h-2.5" />
                <span>UK</span>
              </button>
              <button
                type="button"
                onClick={() => handleRegionSwitch('ES')}
                className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRegion === 'ES' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlagES className="w-3.5 h-2.5" />
                <span>ES</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HARDWARE_PICKS.map((hw) => {
              const regionData = activeRegion === 'US' ? hw.us : activeRegion === 'UK' ? hw.uk : hw.es;
              return (
                <div
                  key={hw.id}
                  className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-5 group shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
                        {hw.badge}
                      </span>
                      <span className="text-base font-display font-black text-white">
                        {regionData.price}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-display font-black uppercase text-white leading-tight">
                        {hw.name}
                      </h3>
                      <p className="text-[11px] font-mono text-cyan-400 mt-1">{hw.category}</p>
                    </div>

                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {hw.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <a
                      href={regionData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                    >
                      <span>Check Availability ({activeRegion})</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CLINICIAN CO-PILOT INTEGRATION CALLOUT                          */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/30 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Stethoscope size={22} />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-400 tracking-widest font-bold">
                COMPONENT 4 • PRIMARY CARE BRIEFING INTEGRATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                Log Your Scale &amp; Wearable Telemetry in the Clinician Co-Pilot
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
            Don’t keep your biometric metrics trapped inside a proprietary smartphone app. When stepping into your GP consultation, bring verified 14-day averages. Our 100% Guest-Mode client-side logger now includes dedicated fields for <strong>Visceral Fat Rating (1–12)</strong>, <strong>Body Fat %</strong>, <strong>Skeletal Muscle Mass %</strong>, and <strong>14-Day Nocturnal HRV</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              to="/clinician-copilot"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
            >
              <FileText size={15} />
              <span>Open Clinician Co-Pilot Form →</span>
            </Link>
            <span className="text-xs font-mono text-slate-400">
              100% Client-Side • Exports to 2-Page Vector PDF
            </span>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 6. STICKY UPGRADE BANNER AT BOTTOM                                        */}
      {/* ========================================================================= */}
      <aside aria-label="12-Week Protocol Upgrade" className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-cyan-500/40 p-4 shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 hidden sm:flex">
              <Zap size={18} />
            </div>
            <div>
              <h4 className="text-sm font-display font-black uppercase text-white leading-tight">
                Ready to strip visceral fat and build lean muscle in 12 weeks?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                The Phased Biometric Reset: Bioimpedance calibration, muscle protein timing, and GP brief.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/store/metabolic-master-guide"
              className="text-xs text-slate-300 hover:text-white font-mono underline hidden md:inline"
            >
              Learn More
            </Link>
            <button
              type="button"
              onClick={handleQuickAddProtocol}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag size={14} />
              <span>Download 12-Week Protocol (£19 / $25 / €22)</span>
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
}
