import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  HeartPulse, 
  Microscope,
  Stethoscope,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useMarket } from '../contexts/MarketContext';

export default function ClinicianCoPilot() {
  const { market } = useMarket();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Form states for interactive client-side entry before print/export
  const [patientData, setPatientData] = useState({
    name: '',
    dob: '',
    date: new Date().toLocaleDateString('en-CA'),
    gpName: '',
    clinicName: '',
    symptoms: '',
    medicines: '',
    allergies: '',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 print:bg-white print:text-black">
      {/* Print Specific CSS Overrides */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm 12mm 10mm 12mm;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-page {
            page-break-after: always;
            break-after: page;
            margin-bottom: 0 !important;
            padding: 0 !important;
          }
          .print-page:last-child {
            page-break-after: avoid;
            break-after: avoid;
          }
          .print-box-amber {
            border: 1.5px solid #d97706 !important;
            background-color: #fffbeb !important;
            color: #000000 !important;
          }
          .print-box-cyan {
            border: 1.5px solid #0891b2 !important;
            background-color: #ecfeff !important;
            color: #000000 !important;
          }
          .print-table th {
            background-color: #0f172a !important;
            color: #ffffff !important;
          }
          .print-table td {
            border: 1px solid #94a3b8 !important;
            color: #000000 !important;
          }
          input, textarea {
            border-bottom: 1px solid #334155 !important;
            background: transparent !important;
            color: #000000 !important;
          }
        }
      `}</style>

      {/* Top Breadcrumb & Action Header (Screen only) */}
      <section className="no-print pt-24 pb-8 border-b border-slate-900 bg-slate-950/90 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link 
              to="/" 
              className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={13} className="mr-1.5" />
              Back to Home
            </Link>
            <h1 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-black flex items-center gap-2.5">
              <span>The Clinician Co-Pilot Suite</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest font-bold">
                100% Free • $0
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              title="Print directly or save as PDF via your browser print dialog"
            >
              <Printer size={15} />
              <span>Print Worksheet</span>
            </button>

            <a
              href="/assets/docs/clinical-baseline-consultation-workbook.pdf"
              download="clinical-baseline-consultation-workbook.pdf"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download size={15} />
              <span>Download Printable PDF</span>
            </a>
          </div>
        </div>

        {downloadSuccess && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300 animate-fadeIn">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span><strong>Download Started!</strong> The official 4-page Clinical Consultation Workbook PDF is now in your downloads folder.</span>
            </div>
          </div>
        )}
      </section>

      {/* Hero Explainer Banner (Screen only) */}
      <section className="no-print max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold flex items-center gap-1.5">
                <Stethoscope size={13} />
                Physician-Partnered Framework
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Lola 56 • HealthLabs • Quest • Melio
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-white font-black leading-tight">
              From Speculation to Molecular Certainty: Cross the Bridge with Your Doctor
            </h2>

            <p className="text-slate-350 text-sm sm:text-base font-light leading-relaxed">
              Most people begin their longevity journey by guessing: taking unverified supplements, buying high-dose vitamins, or worrying over single isolated wearable spikes. The Clinician Co-Pilot provides the exact 4-page clinical bridge to replace guesswork with data: a 14-day vital signs baseline, Level 1 core tri-marker requisition (ApoB, HbA1c, hs-CRP), physical exam checklists, and collaborative doctor discussion scripts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/store"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                <span>View Regional Clinical Blood Panels ({market})</span>
                <ChevronRight size={14} />
              </Link>
              <Link
                to="/health-quiz"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4"
              >
                <span>Take 5-Minute Longevity Baseline Quiz</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main 4-Page Document Sheet Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 print:space-y-0 print:p-0">
        
        {/* ========================================================================= */}
        {/* PAGE 1: Day 1 Foundational Nutrients & Baseline Vitals */}
        {/* ========================================================================= */}
        <article className="print-page bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:rounded-none">
          {/* Document Header */}
          <header className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border-b-4 border-cyan-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide uppercase">
                THE CLINICIAN CO-PILOT: FROM GUESSING TO KNOWING
              </h2>
              <p className="text-cyan-300 text-xs font-medium">
                A Progressive Diagnostic Roadmap &amp; Printable GP Consultation Workbook
              </p>
              <span className="inline-block mt-1 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                100% FREE OPEN-ACCESS PDF
              </span>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="font-black text-cyan-400 text-sm tracking-tight">123TheNextLevel</div>
              <div className="text-[10px] text-slate-400 font-mono">123TheNextLevel.com</div>
              <div className="text-[10px] text-cyan-300 font-semibold">🎁 Clinician Co-Pilot Suite</div>
            </div>
          </header>

          {/* Section: Day 1 Foundational Nutrients */}
          <div className="mt-6 space-y-3">
            <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase border-l-4 border-cyan-600 pl-3">
              Day 1: Foundational Nutrients &amp; Baseline Vitals
            </h3>
            <h4 className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
              The Paradigm Shift: From Speculation to Molecular Certainty
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              Most people begin a health journey by buying a cupboard of supplements: a high-dose vitamin here, an “energy” stack there. The problem is that nobody can know which nutrients their body lacks, which it has in excess, and which may interact with a medicine or condition they already have. Without a baseline blood test, every high-dose product is a guess, and guesses cost money. A person with normal ferritin who buys iron pays for a product that does nothing and may cause harm. A person already replete in vitamin D who doubles the dose gains little and risks excess calcium. Money spent on speculation is money not spent on measurement.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              The biological risk is larger than the financial one. Iron accumulates when it is not needed. Fat-soluble vitamins are stored rather than excreted. Some supplements change how medicines such as blood thinners, thyroid replacement or blood-pressure drugs behave. The principle of this workbook is simple: <strong>measure first, then target.</strong> Your GP is your co-pilot, and this document helps you arrive with data rather than hunches.
            </p>

            {/* Safety First Principle Callout */}
            <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-300 text-slate-800 text-xs sm:text-sm leading-relaxed">
              <strong className="text-cyan-800 font-bold uppercase">THE “SAFETY FIRST” PRINCIPLE.</strong> While you wait for test results, establish a small, low-risk, universal nutritional foundation at conventional, label-directed doses. These four nutrients support nearly everyone, are widely tolerated, and do not pre-empt what your results might show. Therapeutic or high-dose protocols wait for laboratory evidence.
            </div>
          </div>

          {/* Universal Baseline Stack Table */}
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              The Day 1 Universal Baseline Stack
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-2.5 font-bold uppercase tracking-wider w-1/4">Nutrient</th>
                    <th className="p-2.5 font-bold uppercase tracking-wider">Biological role and why it is in the stack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  <tr className="bg-slate-50/60">
                    <td className="p-2.5 font-bold text-slate-900 align-top">1. Vitamin D3 + K2 (MK-7)</td>
                    <td className="p-2.5 text-slate-700 leading-relaxed">
                      Vitamin D3 is converted to calcitriol, which binds the nuclear vitamin D receptor and regulates genes involved in calcium absorption, bone mineralisation, and immune and muscle function. Vitamin K2 (MK-7) activates calcium-handling proteins, osteocalcin in bone and matrix Gla protein in artery walls, helping direct calcium into skeletal tissue and supporting vascular compliance (arterial flexibility). Together they support calcium homeostasis. <em className="text-slate-500">Note: K2 interacts with warfarin; see safety box.</em>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 align-top">2. Omega-3 (high-concentration EPA/DHA)</td>
                    <td className="p-2.5 text-slate-700 leading-relaxed">
                      EPA and DHA are built into cell membranes, where they influence membrane fluidity and receptor function. They are precursors to specialised pro-resolving mediators (resolvins, protectins) that help switch off inflammation. They also lower circulating triglycerides and support cardiovascular and brain health. Choose a product that states its EPA+DHA content per serving, not just “fish oil”.
                    </td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-2.5 font-bold text-slate-900 align-top">3. Magnesium glycinate / malate</td>
                    <td className="p-2.5 text-slate-700 leading-relaxed">
                      Magnesium is a cofactor in over 300 enzyme reactions. It supports autonomic nervous system balance and calms excitatory NMDA receptor activity, which helps the nervous system settle. Glycinate is well tolerated and favoured for sleep onset and architecture; malate supports muscular recovery and energy metabolism. Both are gentler on the gut than oxide or citrate.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900 align-top">4. Bio-available daily micronutrient matrix</td>
                    <td className="p-2.5 text-slate-700 leading-relaxed">
                      A well-formulated multi-nutrient supplying B-vitamins (as methylated or coenzyme forms), zinc, selenium and trace minerals, which act as cofactors in mitochondrial ATP production and baseline enzyme function. Choose one <em>without</em> high-dose iron unless a blood test shows you need it.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 14-Day Baseline Vitals Protocol */}
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              14-Day Baseline Vitals Protocol
            </h3>
            <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5 leading-relaxed">
              <li><strong>Morning resting heart rate:</strong> on waking, before caffeine, sit quietly for 5 minutes, then count or record your pulse for 60 seconds.</li>
              <li><strong>Blood pressure:</strong> same time daily, seated, back supported, feet flat, arm at heart level, after 5 minutes’ rest. Take two readings one minute apart and record both. Avoid caffeine and exercise for 30 minutes before.</li>
              <li><strong>Hydration:</strong> note your water intake (glasses) and first-morning urine colour (1 = pale straw, 3 = amber, 5 = dark). Record patterns, not single days.</li>
            </ul>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-center border-collapse text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-2 font-bold uppercase w-12">Day</th>
                    <th className="p-2 font-bold uppercase">Resting HR (bpm)</th>
                    <th className="p-2 font-bold uppercase">BP reading 1</th>
                    <th className="p-2 font-bold uppercase">BP reading 2</th>
                    <th className="p-2 font-bold uppercase">Water (glasses)</th>
                    <th className="p-2 font-bold uppercase">Urine colour (1–5)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 font-mono">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <tr key={day} className="h-7 hover:bg-slate-50">
                      <td className="p-1 font-bold bg-slate-100 border-r border-slate-300 text-slate-900">{day}</td>
                      <td className="p-1 border-r border-slate-300"></td>
                      <td className="p-1 border-r border-slate-300"></td>
                      <td className="p-1 border-r border-slate-300"></td>
                      <td className="p-1 border-r border-slate-300"></td>
                      <td className="p-1"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-slate-500 italic mt-1 text-left">
                Days 8–14: continue on the Page 4 worksheet or a copy of this table.
              </p>
            </div>
          </div>

          {/* Clinician Safety Notice */}
          <div className="mt-5 p-3.5 rounded-xl bg-amber-50 border border-amber-400 text-slate-900 text-[11px] sm:text-xs leading-relaxed space-y-1">
            <div className="font-bold text-amber-800 uppercase flex items-center gap-1.5">
              <AlertTriangle size={13} className="text-amber-600" />
              <span>⚠ Clinician Safety Notice</span>
            </div>
            <p>
              Day 1 nutrients provide <strong>universal support only</strong>. They are not a treatment. Targeted therapeutic doses, including <strong>iron, high-dose vitamin D3, B12 injections, and metabolic or hormonal activators</strong>, must await laboratory confirmation and your doctor’s advice. Tell your GP before starting any supplement if you take <strong>blood thinners (warfarin and similar), blood-pressure or diabetes medicines</strong>, have kidney disease, are pregnant or breastfeeding, or have a bleeding disorder. High-dose omega-3 can increase bleeding tendency; magnesium accumulates in reduced kidney function; vitamin K2 opposes warfarin. If you develop chest pain, severe breathlessness, fainting or a BP of 180/120 or above, seek urgent medical care. This document is educational and does not replace medical advice.
            </p>
          </div>

          <footer className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 font-mono">
            <span>123TheNextLevel.com · Clinician Co-Pilot Suite</span>
            <span>Page 1 of 4</span>
          </footer>
        </article>

        {/* ========================================================================= */}
        {/* PAGE 2: The Progressive Diagnostic Roadmap */}
        {/* ========================================================================= */}
        <article className="print-page bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:rounded-none">
          <header className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border-b-4 border-cyan-600 flex justify-between items-center">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide uppercase">
                THE PROGRESSIVE DIAGNOSTIC ROADMAP
              </h2>
              <p className="text-cyan-300 text-xs font-medium">
                Level 1 vs. Level 2 Testing Framework
              </p>
            </div>
            <div className="font-black text-cyan-400 text-sm">123TheNextLevel</div>
          </header>

          {/* Level 1 Tri-Marker Anchor */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900 uppercase border-l-4 border-cyan-600 pl-3">
                LEVEL 1: The Core Tri-Marker Anchor
              </h3>
              <span className="bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                HIGH PRIORITY
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Three tests give the most information for the least cost and effort. Start here, then decide with your GP whether Level 2 is warranted.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1.5 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">1. ApoB (Apolipoprotein B)</strong>
                <p className="leading-relaxed">
                  Every atherogenic particle (LDL, VLDL, IDL, Lp(a)) carries exactly one ApoB molecule, so ApoB is a direct <strong>count of the particles</strong> that can enter and lodge in artery walls. Standard LDL-C only measures the cholesterol <em>mass</em> carried, which can look normal when particles are numerous but small, a pattern common in insulin resistance and high triglycerides. This discordance is why ApoB is a better predictor of plaque risk than LDL-C or total cholesterol, and why guidelines increasingly endorse it.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1.5 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">2. HbA1c (Glycated Haemoglobin)</strong>
                <p className="leading-relaxed">
                  Glucose attaches to haemoglobin in proportion to blood sugar, and red cells live about 90–120 days, so HbA1c reflects your <strong>average glucose over roughly three months</strong>. It identifies pre-diabetes and early insulin resistance before a fasting glucose turns abnormal. Chronic high glucose also drives formation of advanced glycation end-products (AGEs), which stiffen collagen and vessels. Anaemia and some haemoglobin variants can distort results, so interpret with your GP.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1.5 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">3. hs-CRP (High-Sensitivity CRP)</strong>
                <p className="leading-relaxed">
                  The liver produces C-reactive protein in response to inflammatory signals. The high-sensitivity assay detects the <strong>low-grade, subclinical inflammation</strong> linked to vascular risk, metabolic strain and chronic immune stress. Single values rise with infection, injury or hard exercise, so avoid testing when unwell, and repeat if a result is high (above about 3 mg/L).
                </p>
              </div>
            </div>
          </div>

          {/* Level 2 Multi-System Panel */}
          <div className="mt-6 space-y-2">
            <h3 className="text-base font-black text-slate-900 uppercase border-l-4 border-cyan-600 pl-3">
              LEVEL 2: Comprehensive Multi-System Panel (56 Biomarkers)
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              For example, the Lola Vital Check 56 (UK) or the HealthLabs Cellular Map (US). Ask your GP which markers are available through your health system and which need a private panel.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-2 font-bold uppercase w-1/5">System</th>
                    <th className="p-2 font-bold uppercase w-2/5">Biomarkers</th>
                    <th className="p-2 font-bold uppercase">What it tells you</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  <tr className="bg-slate-50/60">
                    <td className="p-2 font-bold text-slate-900">Lipid sub-fractions</td>
                    <td className="p-2 text-slate-800">ApoB, ApoA1, Triglycerides, HDL-C, Direct LDL-C</td>
                    <td className="p-2 text-slate-700">Atherogenic particle burden against protective HDL particles; ApoB:ApoA1 ratio refines risk.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">Metabolic &amp; glycaemic</td>
                    <td className="p-2 text-slate-800">Fasting glucose, HbA1c, Fasting insulin</td>
                    <td className="p-2 text-slate-700">Short and long-term glucose control; insulin shows resistance years before glucose rises.</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-2 font-bold text-slate-900">Inflammatory &amp; vascular</td>
                    <td className="p-2 text-slate-800">hs-CRP, Homocysteine, Fibrinogen</td>
                    <td className="p-2 text-slate-700">Inflammation, B-vitamin methylation status, clotting tendency.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">Organ function &amp; enzymes</td>
                    <td className="p-2 text-slate-800">ALT, AST, GGT, eGFR, Creatinine, Electrolytes (Na, K, Cl)</td>
                    <td className="p-2 text-slate-700">Liver stress, kidney filtration, hydration and electrolyte balance.</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-2 font-bold text-slate-900">Hormonal &amp; endocrine</td>
                    <td className="p-2 text-slate-800">Total &amp; Free Testosterone, Estradiol, DHEA-S, SHBG</td>
                    <td className="p-2 text-slate-700">Sex-hormone status, adrenal reserve, and how much hormone is bioavailable.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">Thyroid cascade</td>
                    <td className="p-2 text-slate-800">TSH, Free T3, Free T4</td>
                    <td className="p-2 text-slate-700">Pituitary signal, active hormone, and storage hormone; metabolic rate and energy.</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-2 font-bold text-slate-900">Micronutrients &amp; storage</td>
                    <td className="p-2 text-slate-800">Vitamin D3 (25-OH), B12, Serum iron, Ferritin, Folate</td>
                    <td className="p-2 text-slate-700">Confirms whether the Day 1 stack is needed, and whether iron or B12 dosing is justified.</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[10px] text-slate-500 italic mt-1">
                The seven rows above list the key markers; full kits add related full blood count, lipid and mineral values to reach 56.
              </p>
            </div>
          </div>

          {/* Progressive Pathway Checklist */}
          <div className="mt-5 space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Your Progressive Pathway
            </h3>
            <table className="w-full text-left border-collapse text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-2 font-bold uppercase w-10 text-center">✓</th>
                  <th className="p-2 font-bold uppercase">Step</th>
                  <th className="p-2 font-bold uppercase w-36">Date booked</th>
                  <th className="p-2 font-bold uppercase w-36">Result received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                <tr className="h-7 hover:bg-slate-50">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-medium text-slate-800">Level 1: ApoB, HbA1c, hs-CRP</td>
                  <td className="p-2 border-r border-slate-300"></td>
                  <td className="p-2"></td>
                </tr>
                <tr className="h-7 hover:bg-slate-50 bg-slate-50/40">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-medium text-slate-800">Review results with GP; decide on Level 2</td>
                  <td className="p-2 border-r border-slate-300"></td>
                  <td className="p-2"></td>
                </tr>
                <tr className="h-7 hover:bg-slate-50">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-medium text-slate-800">Level 2: Full 56-biomarker panel</td>
                  <td className="p-2 border-r border-slate-300"></td>
                  <td className="p-2"></td>
                </tr>
                <tr className="h-7 hover:bg-slate-50 bg-slate-50/40">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-medium text-slate-800">Targeted protocol agreed with GP</td>
                  <td className="p-2 border-r border-slate-300"></td>
                  <td className="p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Testing Tips */}
          <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-300 text-slate-900 text-xs leading-relaxed">
            <strong className="text-amber-800 font-bold uppercase">TESTING TIPS:</strong> Fast 8–12 hours (water allowed) for glucose, insulin and triglycerides. Test in the morning. Pause biotin supplements 48 hours before, as it can distort some immunoassays (including thyroid), and tell the phlebotomist about all medicines. Reference ranges vary by lab; always interpret with a clinician.
          </div>

          <footer className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 font-mono">
            <span>123TheNextLevel.com · Clinician Co-Pilot Suite</span>
            <span>Page 2 of 4</span>
          </footer>
        </article>

        {/* ========================================================================= */}
        {/* PAGE 3: Annual GP Physical Exam & Continuous Bio-Telemetry */}
        {/* ========================================================================= */}
        <article className="print-page bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:rounded-none">
          <header className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border-b-4 border-cyan-600 flex justify-between items-center">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide uppercase">
                ANNUAL GP PHYSICAL EXAM &amp; CONTINUOUS BIO-TELEMETRY
              </h2>
              <p className="text-cyan-300 text-xs font-medium">
                In-Person Physical Diagnostics &amp; Hardware Telemetry
              </p>
            </div>
            <div className="font-black text-cyan-400 text-sm">123TheNextLevel</div>
          </header>

          {/* Section A: Physical Exam Protocol */}
          <div className="mt-6 space-y-2">
            <h3 className="text-base font-black text-slate-900 uppercase border-l-4 border-cyan-600 pl-3">
              Section A: The Annual GP Physical Examination Protocol
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Blood tests cannot replace a hands-on examination. Use this checklist to understand what a thorough check involves and to tick off what your GP covers.
            </p>

            <table className="w-full text-left border-collapse text-xs border border-slate-300 mt-2">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-2 font-bold uppercase w-10 text-center">✓</th>
                  <th className="p-2 font-bold uppercase w-1/4">Examination</th>
                  <th className="p-2 font-bold uppercase">What your GP is assessing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                <tr className="hover:bg-slate-50">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-bold text-slate-900">Cardiopulmonary auscultation</td>
                  <td className="p-2 text-slate-700 leading-relaxed">
                    Stethoscope check of the S1 (“lub”, valve closure at the start of contraction) and S2 (“dub”) heart sounds, rhythm regularity, and any murmurs, extra sounds or irregular beats. Lung fields are listened to front and back for wheeze, crackles or reduced air entry.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50/60">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-bold text-slate-900">Peripheral vascular assessment</td>
                  <td className="p-2 text-slate-700 leading-relaxed">
                    Pulses at the wrist, groin, behind the knee and foot; skin temperature and colour; capillary refill; ankle swelling; carotid check for bruits.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-bold text-slate-900">Resting blood pressure</td>
                  <td className="p-2 text-slate-700 leading-relaxed">
                    Properly cuffed, seated, ideally repeated, and compared against your 14-day home readings to spot white-coat or masked hypertension.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50/60">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-bold text-slate-900">Abdominal palpation</td>
                  <td className="p-2 text-slate-700 leading-relaxed">
                    Gentle assessment of tenderness, organ enlargement (liver, spleen), masses or aortic pulsation.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2 text-center border-r border-slate-300"><span className="inline-block w-3.5 h-3.5 border border-slate-900"></span></td>
                  <td className="p-2 font-bold text-slate-900">Lymph node assessment</td>
                  <td className="p-2 text-slate-700 leading-relaxed">
                    Neck, armpit and groin nodes checked for size, tenderness and mobility.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section B: 14-Day Continuous Bio-Telemetry */}
          <div className="mt-6 space-y-3">
            <h3 className="text-base font-black text-slate-900 uppercase border-l-4 border-cyan-600 pl-3">
              Section B: 14-Day Continuous Bio-Telemetry (Hardware Integration)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">Wearable vitals</strong>
                <p className="leading-relaxed">
                  <strong>Heart rate variability (HRV)</strong> is the beat-to-beat variation that reflects vagal (parasympathetic) tone and recovery capacity. Compare <em>your own</em> trend rather than other people’s numbers. <strong>Resting HR</strong> reveals fitness and stress load. <strong>Sleep architecture</strong> records light, deep and REM proportions; consumer devices are estimates, not clinical sleep studies.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">Segmental body composition</strong>
                <p className="leading-relaxed">
                  A multi-frequency BIA scale passes a safe low-level current through the body to estimate <strong>visceral fat</strong>, <strong>muscle mass distribution</strong> by limb and trunk, and <strong>hydration balance</strong>. Weigh at the same time under the same conditions (morning, fasted, after the bathroom), as hydration shifts readings.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">Continuous glucose monitoring (CGM)</strong>
                <p className="leading-relaxed">
                  A small skin sensor records glucose every few minutes, mapping <strong>postprandial spikes</strong> and <strong>glycaemic variability</strong> (how widely glucose swings). Useful alongside HbA1c to learn which meals suit you. Discuss with your GP, especially if you have symptoms.
                </p>
              </div>
            </div>

            {/* Telemetry Log Table */}
            <table className="w-full text-center border-collapse text-xs border border-slate-300 mt-2">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-2 font-bold uppercase text-left">Metric to log (14 days)</th>
                  <th className="p-2 font-bold uppercase w-1/4">Week 1 average</th>
                  <th className="p-2 font-bold uppercase w-1/4">Week 2 average</th>
                  <th className="p-2 font-bold uppercase w-1/4">Trend (↑ ↓ →)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-mono">
                {[
                  { name: 'HRV (ms)', unit: 'ms' },
                  { name: 'Resting HR (bpm)', unit: 'bpm' },
                  { name: 'Deep sleep / REM (min)', unit: 'min' },
                  { name: 'Visceral fat score', unit: 'score' },
                  { name: 'Muscle mass (kg)', unit: 'kg' },
                  { name: 'Peak post-meal glucose (mmol/L)', unit: 'mmol/L' }
                ].map((row, i) => (
                  <tr key={i} className="h-7 hover:bg-slate-50">
                    <td className="p-2 text-left font-sans font-medium text-slate-900 border-r border-slate-300">{row.name}</td>
                    <td className="p-1 border-r border-slate-300"></td>
                    <td className="p-1 border-r border-slate-300"></td>
                    <td className="p-1"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section C: Epigenetic Cellular Age Testing */}
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-black text-slate-900 uppercase border-l-4 border-cyan-600 pl-3">
              Section C: Epigenetic Cellular Age Testing
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Chronological age counts birthdays; <strong>biological age</strong> estimates how your cells are actually ageing. Whole-methylome gDNA testing reads DNA methylation, the chemical tags on your DNA that switch genes on and off, at hundreds of thousands of sites, then compares your pattern with population reference data to estimate a biological age. Because methylation responds to sleep, nutrition, movement and stress, it can serve as a long-term benchmark: test at baseline, then repeat no sooner than every 6–12 months. Results are research-grade estimates, not a diagnosis, so use them as a trend and not a verdict.
            </p>
          </div>

          {/* Interpreting Telemetry Box */}
          <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-300 text-slate-900 text-xs leading-relaxed">
            <strong className="text-amber-800 font-bold uppercase">INTERPRETING TELEMETRY:</strong> Wearable and CGM data are indicative, not diagnostic. Bring trends and questions to your GP rather than acting on single readings. Persistent chest symptoms, palpitations, fainting or a consistently high resting HR warrant medical review regardless of device data.
          </div>

          <footer className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 font-mono">
            <span>123TheNextLevel.com · Clinician Co-Pilot Suite</span>
            <span>Page 3 of 4</span>
          </footer>
        </article>

        {/* ========================================================================= */}
        {/* PAGE 4: Patient-Held Clinical Record & Co-Evaluation Worksheet */}
        {/* ========================================================================= */}
        <article className="print-page bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:rounded-none">
          <header className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border-b-4 border-cyan-600 flex justify-between items-center">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide uppercase">
                PATIENT-HELD CLINICAL RECORD &amp; CO-EVALUATION WORKSHEET
              </h2>
              <p className="text-cyan-300 text-xs font-medium">
                Printable GP Consultation Template &amp; Doctor Script
              </p>
            </div>
            <div className="font-black text-cyan-400 text-sm">123TheNextLevel</div>
          </header>

          {/* Patient / GP Demographic Fields */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium border-b border-slate-200 pb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">Patient name:</span>
                <input 
                  type="text" 
                  value={patientData.name}
                  onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                  placeholder="Enter full name..."
                  className="flex-1 border-b border-slate-400 py-0.5 outline-none font-bold text-slate-900"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">Date of birth:</span>
                <input 
                  type="text" 
                  value={patientData.dob}
                  onChange={(e) => setPatientData({ ...patientData, dob: e.target.value })}
                  placeholder="YYYY-MM-DD"
                  className="flex-1 border-b border-slate-400 py-0.5 outline-none text-slate-900 font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">Date:</span>
                <input 
                  type="text" 
                  value={patientData.date}
                  onChange={(e) => setPatientData({ ...patientData, date: e.target.value })}
                  className="flex-1 border-b border-slate-400 py-0.5 outline-none text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">GP name:</span>
                <input 
                  type="text" 
                  value={patientData.gpName}
                  onChange={(e) => setPatientData({ ...patientData, gpName: e.target.value })}
                  placeholder="Dr..."
                  className="flex-1 border-b border-slate-400 py-0.5 outline-none text-slate-900 font-medium"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">Clinic name:</span>
                <input 
                  type="text" 
                  value={patientData.clinicName}
                  onChange={(e) => setPatientData({ ...patientData, clinicName: e.target.value })}
                  placeholder="Health Centre..."
                  className="flex-1 border-b border-slate-400 py-0.5 outline-none text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Block 1: 14-Day Wearable Vitals & Symptom Summary */}
          <div className="mt-5 space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-3 border-cyan-600 pl-2">
              Block 1: 14-Day Wearable Vitals &amp; Symptom Summary
            </h3>
            <table className="w-full text-left border-collapse text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-2 font-bold uppercase w-1/4">Measure</th>
                  <th className="p-2 font-bold uppercase w-1/6">Average</th>
                  <th className="p-2 font-bold uppercase w-1/6">Lowest</th>
                  <th className="p-2 font-bold uppercase w-1/6">Highest</th>
                  <th className="p-2 font-bold uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-mono">
                {['Resting HR (bpm)', 'HRV (ms)', 'Blood pressure (mmHg)', 'Sleep (hours)'].map((m, i) => (
                  <tr key={i} className="h-6 hover:bg-slate-50">
                    <td className="p-1.5 font-sans font-medium text-slate-900 border-r border-slate-300">{m}</td>
                    <td className="p-1 border-r border-slate-300"></td>
                    <td className="p-1 border-r border-slate-300"></td>
                    <td className="p-1 border-r border-slate-300"></td>
                    <td className="p-1"></td>
                  </tr>
                ))}
                <tr>
                  <td className="p-1.5 font-sans font-medium text-slate-900 border-r border-slate-300">
                    Key symptoms (fatigue, pain, mood…)
                  </td>
                  <td colSpan={4} className="p-1">
                    <input 
                      type="text" 
                      value={patientData.symptoms} 
                      onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })} 
                      placeholder="e.g. Afternoon energy crash, waking at 3am..."
                      className="w-full font-sans text-xs outline-none bg-transparent"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Block 2: Current Lifestyle & Day 1 Supplement Log */}
          <div className="mt-5 space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-3 border-cyan-600 pl-2">
              Block 2: Current Lifestyle &amp; Day 1 Supplement Log
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" defaultChecked />
                  <span><strong>Vitamin D3 + K2</strong> &nbsp; dose: ________</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" defaultChecked />
                  <span><strong>Omega-3 EPA/DHA</strong> &nbsp; dose: ________</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" defaultChecked />
                  <span><strong>Magnesium glycinate/malate</strong> &nbsp; dose: ________</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" defaultChecked />
                  <span><strong>Micronutrient matrix</strong> &nbsp; dose: ________</span>
                </label>
                <div className="pt-1 text-slate-600">
                  Started on: _____________________
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="block text-slate-900 mb-1">Current medicines &amp; other supplements:</strong>
                  <div className="border-b border-slate-300 h-5"></div>
                  <div className="border-b border-slate-300 h-5 mt-1"></div>
                  <div className="border-b border-slate-300 h-5 mt-1"></div>
                </div>
                <div className="pt-1">
                  <strong>Allergies:</strong> ____________________________________
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Requisition Checklist for GP */}
          <div className="mt-5 space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-3 border-cyan-600 pl-2">
              Block 3: Requisition Checklist for GP
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-cyan-50/50 p-3 rounded-xl border border-cyan-200">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" />
                  <span><strong>ApoB</strong> (Level 1 Cardiovascular Particle Count)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" />
                  <span><strong>HbA1c</strong> (Level 1 3-Month Glycemic Average)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" />
                  <span><strong>hs-CRP</strong> (Level 1 Subclinical Vascular Inflammation)</span>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" />
                  <span><strong>Full 56-biomarker requisition</strong> (Level 2 Panel)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-600" />
                  <span><strong>Vitamin D, B12, ferritin</strong> (if not in panel)</span>
                </label>
                <div className="text-slate-700">
                  Other: _______________________________
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Collaborative Doctor Discussion Script */}
          <div className="mt-5 space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-3 border-cyan-600 pl-2">
              Block 4: Collaborative Doctor Discussion Script
            </h3>
            <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-300 text-xs text-slate-800 space-y-2 leading-relaxed">
              <p>
                <strong className="text-cyan-900">1. Open with partnership.</strong> “I’ve been tracking my blood pressure, heart rate and sleep for two weeks, and I’d like to understand my baseline. Could we look at this data together?”
              </p>
              <p>
                <strong className="text-cyan-900">2. Ask for the evidence-based tests.</strong> “I’ve read that ApoB, HbA1c and hs-CRP give a clearer picture of cardiovascular and metabolic risk than a standard cholesterol check. Would these be appropriate for me, and if not, what would you recommend instead?”
              </p>
              <p>
                <strong className="text-cyan-900">3. Agree the plan.</strong> “Whatever you decide, could you explain what would change your advice, how often we should retest, and whether my supplements are safe alongside my medicines?”
              </p>
            </div>
          </div>

          {/* Block 5: Clinician Directive */}
          <div className="mt-5 p-4 rounded-xl border-2 border-slate-900 space-y-3">
            <div className="bg-slate-900 text-white text-center font-bold text-xs py-1 uppercase tracking-wider rounded">
              CLINICIAN NOTES &amp; COLLABORATIVE CARE DIRECTIVES
            </div>
            <div className="space-y-3 pt-2">
              <div className="border-b border-slate-400 h-4"></div>
              <div className="border-b border-slate-400 h-4"></div>
              <div className="border-b border-slate-400 h-4"></div>
              <div className="border-b border-slate-400 h-4"></div>
              <div className="border-b border-slate-400 h-4"></div>
              <div className="border-b border-slate-400 h-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-xs">
              <div className="border-t border-slate-400 pt-1 text-slate-600">
                Clinician signature:
              </div>
              <div className="border-t border-slate-400 pt-1 text-slate-600">
                Print name:
              </div>
              <div className="border-t border-slate-400 pt-1 text-slate-600">
                Date:
              </div>
            </div>
          </div>

          <footer className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Educational tool only; not a substitute for professional medical advice. © 123TheNextLevel.com</span>
            <span>Page 4 of 4</span>
          </footer>
        </article>

      </main>

      {/* Screen Bottom CTA Banner (Screen only) */}
      <section className="no-print max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <HeartPulse size={24} />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-black">
              Ready to Order Your Clinical Lab Panels?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Access CLIA-certified venous blood draws and direct-to-consumer longevity panels in the United States (HealthLabs), United Kingdom (Lola Vital Check 56), and Spain (Melio).
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/store"
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
            >
              Browse Regional Clinical Storefront →
            </Link>
            <Link
              to="/health-quiz"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all border border-slate-700"
            >
              Take 5-Min Longevity Baseline Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
