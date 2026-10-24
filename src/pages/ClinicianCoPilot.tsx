import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  HeartPulse, 
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { useMarket } from '../contexts/MarketContext';

// Interfaces for structured interactive form state
interface VitalsRow {
  day: number;
  restingHr: string;
  hrv: string;
  bp: string;
  sleep: string;
  notes: string;
}

interface SummaryVitalsRow {
  measure: string;
  average: string;
  lowest: string;
  highest: string;
  notes: string;
}

interface PathwayStep {
  step: string;
  checked: boolean;
  bookedDate: string;
  resultDate: string;
}

interface TelemetryRow {
  name: string;
  week1: string;
  week2: string;
  trend: string;
}

interface SupplementItem {
  name: string;
  checked: boolean;
  dose: string;
}

// Initial state definitions for clean reset
const initialPatientData = {
  name: '',
  dob: '',
  date: new Date().toLocaleDateString('en-CA'),
  gpName: '',
  clinicName: '',
  symptoms: '',
  medicines: '',
  allergies: '',
  doctorNotes: '',
  personalQuestions: '',
  clinicianPrintName: '',
  clinicianDate: new Date().toLocaleDateString('en-CA'),
  otherRequisition: '',
  supplementStartDate: '',
};

const initialVitalsRows: VitalsRow[] = Array.from({ length: 14 }, (_, i) => ({
  day: i + 1,
  restingHr: '',
  hrv: '',
  bp: '',
  sleep: '',
  notes: '',
}));

const initialSummaryVitals: SummaryVitalsRow[] = [
  { measure: 'Resting HR (bpm)', average: '', lowest: '', highest: '', notes: '' },
  { measure: 'HRV (ms)', average: '', lowest: '', highest: '', notes: '' },
  { measure: 'Blood pressure (mmHg)', average: '', lowest: '', highest: '', notes: '' },
  { measure: 'Sleep (hours)', average: '', lowest: '', highest: '', notes: '' },
];

const initialSupplements: SupplementItem[] = [
  { name: 'Vitamin D3 + K2 (MK-7)', checked: true, dose: '' },
  { name: 'Omega-3 EPA/DHA', checked: true, dose: '' },
  { name: 'Magnesium glycinate / malate', checked: true, dose: '' },
  { name: 'Micronutrient matrix', checked: true, dose: '' },
];

const initialRequisitions = {
  apob: false,
  hba1c: false,
  hscrp: false,
  panel56: false,
  vitaminsD_B12_ferritin: false,
  other: false,
};

const initialPathwaySteps: PathwayStep[] = [
  { step: 'Level 1: ApoB, HbA1c, hs-CRP', checked: false, bookedDate: '', resultDate: '' },
  { step: 'Review results with GP; decide on Level 2', checked: false, bookedDate: '', resultDate: '' },
  { step: 'Level 2: Full 56-biomarker panel', checked: false, bookedDate: '', resultDate: '' },
  { step: 'Targeted protocol agreed with GP', checked: false, bookedDate: '', resultDate: '' },
];

const initialExamChecks: boolean[] = [false, false, false, false, false];

const initialTelemetryRows: TelemetryRow[] = [
  { name: 'HRV (ms)', week1: '', week2: '', trend: '' },
  { name: 'Resting HR (bpm)', week1: '', week2: '', trend: '' },
  { name: 'Deep sleep / REM (min)', week1: '', week2: '', trend: '' },
  { name: 'Visceral fat score', week1: '', week2: '', trend: '' },
  { name: 'Muscle mass (kg)', week1: '', week2: '', trend: '' },
  { name: 'Peak post-meal glucose (mmol/L)', week1: '', week2: '', trend: '' },
];

export default function ClinicianCoPilot() {
  const { market } = useMarket();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [resetToast, setResetToast] = useState(false);

  // Stateful client-side interactive form states
  const [patientData, setPatientData] = useState(initialPatientData);
  const [vitalsRows, setVitalsRows] = useState<VitalsRow[]>(initialVitalsRows);
  const [summaryVitals, setSummaryVitals] = useState<SummaryVitalsRow[]>(initialSummaryVitals);
  const [supplements, setSupplements] = useState<SupplementItem[]>(initialSupplements);
  const [requisitions, setRequisitions] = useState(initialRequisitions);
  const [pathwaySteps, setPathwaySteps] = useState<PathwayStep[]>(initialPathwaySteps);
  const [examChecks, setExamChecks] = useState<boolean[]>(initialExamChecks);
  const [telemetryRows, setTelemetryRows] = useState<TelemetryRow[]>(initialTelemetryRows);

  // Field updaters
  const updateVitalsRow = (index: number, field: keyof VitalsRow, value: string) => {
    setVitalsRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateSummaryVitals = (index: number, field: keyof SummaryVitalsRow, value: string) => {
    setSummaryVitals((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateSupplement = (index: number, field: keyof SupplementItem, value: any) => {
    setSupplements((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updatePathwayStep = (index: number, field: keyof PathwayStep, value: any) => {
    setPathwaySteps((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateExamCheck = (index: number, checked: boolean) => {
    setExamChecks((prev) => {
      const next = [...prev];
      next[index] = checked;
      return next;
    });
  };

  const updateTelemetryRow = (index: number, field: keyof TelemetryRow, value: string) => {
    setTelemetryRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Actions
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all form fields? All entered vitals, notes, and checkboxes will be cleared back to the blank template.")) {
      setPatientData(initialPatientData);
      setVitalsRows(initialVitalsRows);
      setSummaryVitals(initialSummaryVitals);
      setSupplements(initialSupplements);
      setRequisitions(initialRequisitions);
      setPathwaySteps(initialPathwaySteps);
      setExamChecks(initialExamChecks);
      setTelemetryRows(initialTelemetryRows);
      setResetToast(true);
      setTimeout(() => setResetToast(false), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 print:bg-white print:text-black">
      {/* Print Specific CSS Overrides */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm 10mm 8mm 10mm;
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
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
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
            border: none !important;
            background: transparent !important;
            color: #000000 !important;
            box-shadow: none !important;
            padding: 0 !important;
            resize: none !important;
            outline: none !important;
          }
          input::placeholder, textarea::placeholder {
            color: transparent !important;
            opacity: 0 !important;
          }
          input[type="checkbox"] {
            -webkit-appearance: checkbox !important;
            appearance: checkbox !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            accent-color: #0891b2 !important;
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

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500/60 hover:bg-rose-950/20 text-slate-300 hover:text-rose-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              title="Reset all form fields back to a blank template"
            >
              <RotateCcw size={14} />
              <span>Reset / Clear Form</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              title="Print directly or save as completed PDF via your browser print dialog"
            >
              <Printer size={15} />
              <span>Print / Save Completed Record</span>
            </button>

            <a
              href="/assets/docs/clinical-baseline-consultation-workbook.pdf"
              download="clinical-baseline-consultation-workbook.pdf"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download size={15} />
              <span>Download Blank PDF ($0)</span>
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

        {resetToast && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
            <div className="p-3 bg-cyan-950/80 border border-cyan-500/50 rounded-xl flex items-center gap-2.5 text-xs text-cyan-300 animate-fadeIn">
              <RotateCcw size={16} className="text-cyan-400 shrink-0" />
              <span><strong>Form Cleared!</strong> All fields, 14-day telemetry rows, and notes have been reset to blank template values.</span>
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
              Every field, vitals cell, and symptom box below is <strong>interactive and editable</strong> right in your browser. Type your 14-day vitals, record your supplement doses, check your requisition markers, and click <strong>"Print / Save Completed Record"</strong> to produce a clean, crisp, borderless document for your GP appointment.
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

          {/* Page 1 Patient Quick Header Bar */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium shrink-0">Patient:</span>
              <input 
                type="text"
                value={patientData.name}
                onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                placeholder="Full name..."
                className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-slate-900 font-bold outline-none print:border-none print:bg-transparent print:p-0"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium shrink-0">DOB:</span>
              <input 
                type="text"
                value={patientData.dob}
                onChange={(e) => setPatientData({ ...patientData, dob: e.target.value })}
                placeholder="YYYY-MM-DD"
                className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-slate-900 font-mono outline-none print:border-none print:bg-transparent print:p-0"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium shrink-0">Date:</span>
              <input 
                type="text"
                value={patientData.date}
                onChange={(e) => setPatientData({ ...patientData, date: e.target.value })}
                className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-slate-900 font-mono outline-none print:border-none print:bg-transparent print:p-0"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium shrink-0">GP:</span>
              <input 
                type="text"
                value={patientData.gpName}
                onChange={(e) => setPatientData({ ...patientData, gpName: e.target.value })}
                placeholder="Dr..."
                className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-slate-900 outline-none print:border-none print:bg-transparent print:p-0"
              />
            </div>
          </div>

          {/* Section: Day 1 Foundational Nutrients */}
          <div className="mt-5 space-y-3">
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
          <div className="mt-5 space-y-2">
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
          <div className="mt-5 space-y-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              14-Day Baseline Vitals &amp; Telemetry Protocol (Fully Editable)
            </h3>
            <ul className="text-xs text-slate-700 space-y-1 list-disc pl-5 leading-relaxed">
              <li><strong>Morning resting HR:</strong> on waking, before caffeine, sit quietly for 5 minutes, then record your pulse for 60 seconds.</li>
              <li><strong>HRV (ms):</strong> beat-to-beat variability recorded via your wearable or sensor during restful overnight sleep.</li>
              <li><strong>Blood pressure:</strong> seated, back supported, arm at heart level after 5 minutes’ rest. Record systolic/diastolic (e.g. 118/76).</li>
              <li><strong>Sleep &amp; Notes:</strong> log total sleep hours and any hydration, caffeine, or stress observations.</li>
            </ul>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-center border-collapse text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-1.5 font-bold uppercase w-10">Day</th>
                    <th className="p-1.5 font-bold uppercase w-1/5">Resting HR (bpm)</th>
                    <th className="p-1.5 font-bold uppercase w-1/5">HRV (ms)</th>
                    <th className="p-1.5 font-bold uppercase w-1/5">Blood Pressure (mmHg)</th>
                    <th className="p-1.5 font-bold uppercase w-1/6">Sleep (hrs)</th>
                    <th className="p-1.5 font-bold uppercase">Hydration &amp; Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 font-mono">
                  {vitalsRows.map((row, i) => (
                    <tr key={row.day} className={`h-6.5 hover:bg-slate-50 ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                      <td className="p-1 font-bold bg-slate-100 border-r border-slate-300 text-slate-900 text-xs">
                        {row.day}
                      </td>
                      <td className="p-0.5 border-r border-slate-300">
                        <input
                          type="text"
                          value={row.restingHr}
                          onChange={(e) => updateVitalsRow(i, 'restingHr', e.target.value)}
                          placeholder="e.g. 58"
                          className="w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-center font-mono text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black print:text-center"
                        />
                      </td>
                      <td className="p-0.5 border-r border-slate-300">
                        <input
                          type="text"
                          value={row.hrv}
                          onChange={(e) => updateVitalsRow(i, 'hrv', e.target.value)}
                          placeholder="e.g. 62"
                          className="w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-center font-mono text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black print:text-center"
                        />
                      </td>
                      <td className="p-0.5 border-r border-slate-300">
                        <input
                          type="text"
                          value={row.bp}
                          onChange={(e) => updateVitalsRow(i, 'bp', e.target.value)}
                          placeholder="e.g. 118/76"
                          className="w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-center font-mono text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black print:text-center"
                        />
                      </td>
                      <td className="p-0.5 border-r border-slate-300">
                        <input
                          type="text"
                          value={row.sleep}
                          onChange={(e) => updateVitalsRow(i, 'sleep', e.target.value)}
                          placeholder="e.g. 7.5"
                          className="w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-center font-mono text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black print:text-center"
                        />
                      </td>
                      <td className="p-0.5">
                        <input
                          type="text"
                          value={row.notes}
                          onChange={(e) => updateVitalsRow(i, 'notes', e.target.value)}
                          placeholder="e.g. 8 glasses, well rested"
                          className="w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-left font-sans text-xs focus:ring-1 focus:ring-cyan-500 outline-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Your Progressive Pathway (Interactive Tracking)
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
                {pathwaySteps.map((step, idx) => (
                  <tr key={idx} className={`h-8 hover:bg-slate-50 ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                    <td className="p-2 text-center border-r border-slate-300">
                      <input 
                        type="checkbox"
                        checked={step.checked}
                        onChange={(e) => updatePathwayStep(idx, 'checked', e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer"
                      />
                    </td>
                    <td className="p-2 font-medium text-slate-800">{step.step}</td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={step.bookedDate}
                        onChange={(e) => updatePathwayStep(idx, 'bookedDate', e.target.value)}
                        placeholder="YYYY-MM-DD"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={step.resultDate}
                        onChange={(e) => updatePathwayStep(idx, 'resultDate', e.target.value)}
                        placeholder="Status / Date"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    </td>
                  </tr>
                ))}
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
                {[
                  {
                    title: 'Cardiopulmonary auscultation',
                    desc: 'Stethoscope check of the S1 (“lub”) and S2 (“dub”) heart sounds, rhythm regularity, murmurs, extra sounds or irregular beats. Lung fields listened to front and back for wheeze, crackles or reduced air entry.'
                  },
                  {
                    title: 'Peripheral vascular assessment',
                    desc: 'Pulses at the wrist, groin, behind the knee and foot; skin temperature and colour; capillary refill; ankle swelling; carotid check for bruits.'
                  },
                  {
                    title: 'Resting blood pressure',
                    desc: 'Properly cuffed, seated, ideally repeated, and compared against your 14-day home readings to spot white-coat or masked hypertension.'
                  },
                  {
                    title: 'Abdominal palpation',
                    desc: 'Gentle assessment of tenderness, organ enlargement (liver, spleen), masses or aortic pulsation.'
                  },
                  {
                    title: 'Lymph node assessment',
                    desc: 'Neck, armpit and groin nodes checked for size, tenderness and mobility.'
                  }
                ].map((item, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50 ${idx % 2 === 1 ? 'bg-slate-50/60' : ''}`}>
                    <td className="p-2 text-center border-r border-slate-300">
                      <input 
                        type="checkbox"
                        checked={examChecks[idx]}
                        onChange={(e) => updateExamCheck(idx, e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer"
                      />
                    </td>
                    <td className="p-2 font-bold text-slate-900">{item.title}</td>
                    <td className="p-2 text-slate-700 leading-relaxed">{item.desc}</td>
                  </tr>
                ))}
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
                  <strong>Heart rate variability (HRV)</strong> is beat-to-beat variation reflecting vagal tone. Compare your own trend rather than others'. <strong>Resting HR</strong> reveals fitness and stress. <strong>Sleep architecture</strong> maps light, deep, and REM proportions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">Segmental body composition</strong>
                <p className="leading-relaxed">
                  A multi-frequency BIA scale estimates <strong>visceral fat</strong>, <strong>muscle mass distribution</strong>, and <strong>hydration balance</strong>. Weigh at the same time under standard conditions (morning, fasted, post-bathroom).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 space-y-1 text-xs text-slate-800">
                <strong className="text-cyan-900 font-bold block uppercase text-[11px]">Continuous glucose monitoring (CGM)</strong>
                <p className="leading-relaxed">
                  A skin sensor tracks interstitial glucose, mapping <strong>postprandial spikes</strong> and <strong>glycaemic variability</strong>. Useful alongside HbA1c to identify specific glucose excursions.
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
                {telemetryRows.map((row, i) => (
                  <tr key={i} className="h-7 hover:bg-slate-50">
                    <td className="p-2 text-left font-sans font-medium text-slate-900 border-r border-slate-300">{row.name}</td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={row.week1}
                        onChange={(e) => updateTelemetryRow(i, 'week1', e.target.value)}
                        placeholder="e.g. 64"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={row.week2}
                        onChange={(e) => updateTelemetryRow(i, 'week2', e.target.value)}
                        placeholder="e.g. 68"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={row.trend}
                        onChange={(e) => updateTelemetryRow(i, 'trend', e.target.value)}
                        placeholder="↑ / ↓ / →"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    </td>
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
                  className="flex-1 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 outline-none font-bold text-slate-900 transition-colors print:border-none print:bg-transparent print:p-0"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">Date of birth:</span>
                <input 
                  type="text" 
                  value={patientData.dob}
                  onChange={(e) => setPatientData({ ...patientData, dob: e.target.value })}
                  placeholder="YYYY-MM-DD"
                  className="flex-1 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 outline-none text-slate-900 font-mono transition-colors print:border-none print:bg-transparent print:p-0"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">Date:</span>
                <input 
                  type="text" 
                  value={patientData.date}
                  onChange={(e) => setPatientData({ ...patientData, date: e.target.value })}
                  className="flex-1 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 outline-none text-slate-900 font-mono transition-colors print:border-none print:bg-transparent print:p-0"
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
                  className="flex-1 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 outline-none text-slate-900 font-medium transition-colors print:border-none print:bg-transparent print:p-0"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-slate-600">Clinic name:</span>
                <input 
                  type="text" 
                  value={patientData.clinicName}
                  onChange={(e) => setPatientData({ ...patientData, clinicName: e.target.value })}
                  placeholder="Health Centre..."
                  className="flex-1 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 outline-none text-slate-900 font-medium transition-colors print:border-none print:bg-transparent print:p-0"
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
                {summaryVitals.map((row, i) => (
                  <tr key={row.measure} className="h-7 hover:bg-slate-50">
                    <td className="p-1.5 font-sans font-medium text-slate-900 border-r border-slate-300">{row.measure}</td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text" 
                        value={row.average} 
                        onChange={(e) => updateSummaryVitals(i, 'average', e.target.value)}
                        placeholder="—"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0 print:text-center"
                      />
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text" 
                        value={row.lowest} 
                        onChange={(e) => updateSummaryVitals(i, 'lowest', e.target.value)}
                        placeholder="—"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0 print:text-center"
                      />
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text" 
                        value={row.highest} 
                        onChange={(e) => updateSummaryVitals(i, 'highest', e.target.value)}
                        placeholder="—"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-center font-mono text-xs outline-none print:border-none print:bg-transparent print:p-0 print:text-center"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text" 
                        value={row.notes} 
                        onChange={(e) => updateSummaryVitals(i, 'notes', e.target.value)}
                        placeholder="e.g. baseline stable"
                        className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-1 py-0.5 text-left font-sans text-xs outline-none print:border-none print:bg-transparent print:p-0"
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="p-1.5 font-sans font-medium text-slate-900 border-r border-slate-300 align-top">
                    Key symptoms (fatigue, pain, mood…)
                  </td>
                  <td colSpan={4} className="p-1.5">
                    <textarea 
                      value={patientData.symptoms} 
                      onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })} 
                      placeholder="e.g. Afternoon energy crash around 3pm, difficulty falling asleep, waking unrefreshed, occasional post-meal palpitations..."
                      rows={2}
                      className="w-full bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded-lg p-1.5 font-sans text-xs outline-none text-slate-900 resize-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black"
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
              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {supplements.map((s, idx) => (
                  <div key={s.name} className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={s.checked}
                        onChange={(e) => updateSupplement(idx, 'checked', e.target.checked)}
                        className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer"
                      />
                      <span className="font-bold text-slate-900">{s.name}</span>
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-slate-500">dose:</span>
                      <input 
                        type="text"
                        value={s.dose}
                        onChange={(e) => updateSupplement(idx, 'dose', e.target.value)}
                        placeholder="e.g. 2000 IU"
                        className="w-24 bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-xs font-mono outline-none text-slate-900 print:border-none print:bg-transparent print:p-0 print:w-auto"
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-slate-700">
                  <span className="shrink-0 font-medium">Started on:</span>
                  <input 
                    type="text"
                    value={patientData.supplementStartDate}
                    onChange={(e) => setPatientData({ ...patientData, supplementStartDate: e.target.value })}
                    placeholder="YYYY-MM-DD"
                    className="flex-1 bg-white border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-xs font-mono outline-none text-slate-900 print:border-none print:bg-transparent print:p-0"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <strong className="block text-slate-900 mb-1">Current medicines &amp; other supplements:</strong>
                  <textarea
                    value={patientData.medicines}
                    onChange={(e) => setPatientData({ ...patientData, medicines: e.target.value })}
                    placeholder="List all current prescription medications, doses, and other over-the-counter supplements..."
                    rows={3}
                    className="w-full bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded-lg p-2 text-xs font-medium text-slate-900 outline-none resize-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <strong className="shrink-0 text-slate-900">Allergies:</strong>
                  <input 
                    type="text"
                    value={patientData.allergies}
                    onChange={(e) => setPatientData({ ...patientData, allergies: e.target.value })}
                    placeholder="e.g. Penicillin, NSAIDs, none known"
                    className="flex-1 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 text-xs font-medium text-slate-900 outline-none transition-colors print:border-none print:bg-transparent print:p-0"
                  />
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
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.apob}
                    onChange={(e) => setRequisitions({ ...requisitions, apob: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer" 
                  />
                  <span><strong>ApoB</strong> (Level 1 Cardiovascular Particle Count)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.hba1c}
                    onChange={(e) => setRequisitions({ ...requisitions, hba1c: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer" 
                  />
                  <span><strong>HbA1c</strong> (Level 1 3-Month Glycemic Average)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.hscrp}
                    onChange={(e) => setRequisitions({ ...requisitions, hscrp: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer" 
                  />
                  <span><strong>hs-CRP</strong> (Level 1 Subclinical Vascular Inflammation)</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.panel56}
                    onChange={(e) => setRequisitions({ ...requisitions, panel56: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer" 
                  />
                  <span><strong>Full 56-biomarker requisition</strong> (Level 2 Panel)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.vitaminsD_B12_ferritin}
                    onChange={(e) => setRequisitions({ ...requisitions, vitaminsD_B12_ferritin: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 accent-cyan-600 cursor-pointer" 
                  />
                  <span><strong>Vitamin D, B12, ferritin</strong> (if not in panel)</span>
                </label>
                <div className="flex items-center gap-1.5 pt-1 text-slate-700">
                  <span className="shrink-0 font-medium">Other:</span>
                  <input 
                    type="text"
                    value={patientData.otherRequisition}
                    onChange={(e) => setPatientData({ ...patientData, otherRequisition: e.target.value })}
                    placeholder="Additional requested tests..."
                    className="flex-1 bg-white border border-cyan-300 focus:border-cyan-600 rounded px-1.5 py-0.5 text-xs outline-none text-slate-900 print:border-none print:bg-transparent print:p-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Collaborative Doctor Discussion Script & Personal Questions */}
          <div className="mt-5 space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-l-3 border-cyan-600 pl-2">
              Block 4: Collaborative Doctor Discussion Script &amp; Personal Notes
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

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-900 mb-1">
                My Personal Questions &amp; Priorities for My GP:
              </label>
              <textarea
                value={patientData.personalQuestions}
                onChange={(e) => setPatientData({ ...patientData, personalQuestions: e.target.value })}
                placeholder="Type specific concerns or family medical history you wish to discuss (e.g. paternal history of early cardiac events, requests for CAC scoring, statin tolerance, hormone panel)..."
                rows={2}
                className="w-full bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 focus:border-cyan-500 rounded-lg p-2 text-xs font-medium text-slate-900 outline-none resize-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black"
              />
            </div>
          </div>

          {/* Block 5: Clinician Directive & Notes */}
          <div className="mt-5 p-4 rounded-xl border-2 border-slate-900 space-y-3">
            <div className="bg-slate-900 text-white text-center font-bold text-xs py-1 uppercase tracking-wider rounded">
              CLINICIAN NOTES &amp; COLLABORATIVE CARE DIRECTIVES
            </div>
            <div className="pt-1">
              <textarea
                value={patientData.doctorNotes}
                onChange={(e) => setPatientData({ ...patientData, doctorNotes: e.target.value })}
                placeholder="Clinician to record clinical impressions, diagnostic conclusions, agreed retest timeline, and medication instructions..."
                rows={4}
                className="w-full bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-slate-400 rounded-lg p-2 text-xs font-medium text-slate-900 outline-none resize-none transition-colors print:border-none print:bg-transparent print:p-0 print:shadow-none print:text-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="border-t border-slate-400 pt-1 text-slate-600 flex flex-col gap-1">
                <span className="font-medium text-[11px]">Clinician signature:</span>
                <div className="h-6 border-b border-dashed border-slate-300 print:border-slate-400"></div>
              </div>
              <div className="border-t border-slate-400 pt-1 text-slate-600 flex flex-col gap-1">
                <span className="font-medium text-[11px]">Print name:</span>
                <input 
                  type="text" 
                  value={patientData.clinicianPrintName}
                  onChange={(e) => setPatientData({ ...patientData, clinicianPrintName: e.target.value })}
                  placeholder="Dr..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-xs text-slate-900 font-medium outline-none print:border-none print:bg-transparent print:p-0"
                />
              </div>
              <div className="border-t border-slate-400 pt-1 text-slate-600 flex flex-col gap-1">
                <span className="font-medium text-[11px]">Date:</span>
                <input 
                  type="text" 
                  value={patientData.clinicianDate}
                  onChange={(e) => setPatientData({ ...patientData, clinicianDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded px-1.5 py-0.5 text-xs text-slate-900 font-mono outline-none print:border-none print:bg-transparent print:p-0"
                />
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
