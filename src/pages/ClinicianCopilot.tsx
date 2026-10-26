/* ORIGINAL: import React, { useState } from 'react'; */
import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  FileDown,
  Loader2,
  ExternalLink,
  Globe,
  Activity,
  ShieldCheck,
  FileText,
  Edit3,
  BookOpen
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import DiagnosticPathwaySelector, { REGIONAL_PATHWAYS } from '../components/DiagnosticPathwaySelector';
import DualTrackSelector from '../components/DualTrackSelector';
import { buildGpConsultationTemplatePdf, GpTemplateData } from '../utils/generateGpTemplatePdf';

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
  unit: string;
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
  patientGoals: '',
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
  { measure: 'Resting Heart Rate (RHR)', unit: 'bpm', average: '', lowest: '', highest: '', notes: 'Stable baseline' },
  { measure: 'Nocturnal Heart Rate Variability (HRV)', unit: 'ms (rMSSD)', average: '', lowest: '', highest: '', notes: 'High vagal tone' },
  { measure: 'Blood Pressure (Morning & Evening Avg)', unit: 'mmHg', average: '', lowest: '', highest: '', notes: 'Normal (<120/80)' },
  { measure: 'Total Sleep Duration & Regularity', unit: 'hrs / night', average: '', lowest: '', highest: '', notes: 'Deep+REM: 90min' },
];

const initialSupplements: SupplementItem[] = [
  { name: 'Vitamin D3 + K2 (MK-7)', checked: true, dose: '5000 IU' },
  { name: 'Omega-3 EPA/DHA', checked: true, dose: '2000 mg' },
  { name: 'Magnesium glycinate / malate', checked: true, dose: '400 mg' },
  { name: 'Multivitamin / Micronutrient matrix', checked: true, dose: '1 dose' },
];

const initialFamilyHistory = {
  earlyCvd: false,
  type2Diabetes: false,
  hypertension: false,
  ckd: false,
};

const initialLifestyle = {
  zone2MinPerWeek: '150',
  strengthSessionsPerWeek: '3',
  nutritionPlan: 'Mediterranean / Whole Food',
};

const initialBloodResults = {
  apob: { result: '', action: 'Target < 70 mg/dL' },
  hba1c: { result: '', action: 'Target < 5.4%' },
  hscrp: { result: '', action: 'Target < 0.5 mg/L' },
  panel56: { result: '', action: 'Full cellular profile' },
};

const initialUrinalysisData = {
  labAcr: { result: '', remarks: '< 30 mg/g (< 3 mg/mmol)' },
  labMicroalbumin: { result: '', remarks: 'Negative / < 20 mg/L' },
  labSediment: { result: '', remarks: 'Clear / No casts' },
  homePh: { result: '', remarks: 'Optimal 6.0 - 7.5' },
  homeSg: { result: '', remarks: 'Optimal 1.010 - 1.020' },
  homeKetones: { result: '', remarks: 'Negative / Trace' },
  home7Clear: true,
  home7Notes: 'All 7 Parameters Clear',
};

const initialRequisitions = {
  apob: false,
  hba1c: false,
  hscrp: false,
  panel56: false,
  vitaminsD_B12_ferritin: false,
  urinalysis_acr: false,
  rapid_fluid_telemetry: false,
  other: false,
};

const initialPathwaySteps: PathwayStep[] = [
  { step: 'Level 1: ApoB, HbA1c, hs-CRP', checked: false, bookedDate: '', resultDate: '' },
  { step: 'Review results with GP; decide on Level 2 & Urinalysis', checked: false, bookedDate: '', resultDate: '' },
  { step: 'Level 2: Full 56-biomarker panel + Urine ACR', checked: false, bookedDate: '', resultDate: '' },
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

// Multi-Region Diagnostic URLs & Affiliate Data
const DIAGNOSTIC_REGIONS = {
  US: {
    regionName: 'United States',
    flag: '🇺🇸',
    partnerName: 'HealthLabs',
    badge: 'CLIA Certified & CAP Accredited (Quest / Labcorp)',
    affiliateUrl: 'https://www.healthlabs.com/?affiliate=123znl',
    optionA: {
      name: 'Option A: Complete 56-Biomarker Cellular Map Panel',
      description: 'Comprehensive venous blood panel measuring ApoB, ApoA1, full lipid particle cascade, metabolic markers, hormone status, organ function, and vitamin levels via 4,500+ local Quest Diagnostics or Labcorp draw centers.',
      price: '$299.00',
      actionText: 'Book 56-Biomarker Map via HealthLabs'
    },
    optionB: {
      name: 'Option B: Standalone Tri-Markers (ApoB, HbA1c, hs-CRP)',
      description: 'A la carte direct requisition for the core Level 1 longevity anchor markers without physician referral required.',
      price: 'From $39.00 / test',
      actionText: 'Order Standalone Level 1 Markers'
    },
    urinalysis: {
      name: 'HealthLabs Comprehensive Urinalysis & Microalbumin Panel',
      description: '14-parameter Quest/Labcorp clinical urine analysis screening microvascular health, ACR, pH, ketones, and renal filtration.',
      price: '$69.00',
      actionText: 'Order HealthLabs Urinalysis & ACR Panel',
      url: 'PASTE_YOUR_HEALTHLABS_CJ_URINALYSIS_LINK'
    },
    fluidTelemetry: {
      name: 'Diagnox Urinox-10 Medical-Grade Urinalysis Strips',
      description: 'FDA-cleared 10-parameter rapid urinalysis reagent strips for weekly tracking of microvascular health, proteinuria, pH, ketones, glucose, and renal function.',
      price: '$16.99',
      badge: 'FDA Cleared | 10-Parameter Clinical Grade',
      actionText: 'Order Diagnox Urinox-10 Strips',
      url: 'https://diagnoxhealth.com/products/urinalysis-test'
    }
  },
  UK: {
    regionName: 'United Kingdom',
    flag: '🇬🇧',
    partnerName: 'LOLA Health',
    badge: 'UKAS Accredited & ISO Certified Phlebotomy',
    affiliateUrl: 'https://snwbl.io/out/NcealZ11',
    optionA: {
      name: 'Lola Vital Check 56 Blood Panel',
      description: 'Official UKAS-accredited venous draw panel covering 56 essential geroscience biomarkers with clinic partner access across England, Scotland, Wales, and Northern Ireland.',
      price: '£149.00',
      actionText: 'Order Lola Vital Check 56 (UK)'
    },
    optionB: {
      name: 'Lola Core Longevity Biomarkers',
      description: 'Targeted baseline check covering ApoB, high-sensitivity CRP, HbA1c, and key lipid-metabolic sub-fractions.',
      price: '£89.00',
      actionText: 'Order Core Lola Check'
    },
    urinalysis: {
      name: 'Lola Urinalysis & Microvascular ACR Panel',
      description: 'UKAS-certified urine panel measuring Albumin-to-Creatinine ratio (ACR), proteinuria, and kidney metabolic safety.',
      price: '£49.00',
      actionText: 'Order Lola Urinalysis & ACR Panel',
      url: 'https://referrals.lolahealth.com/NextLevel15'
    },
    fluidTelemetry: {
      name: 'ALLTEST 10-Parameter Clinical Urinalysis Dipsticks UK',
      description: 'CE Medical Marked 10-parameter urinalysis dipsticks monitoring kidney filtration integrity, microalbuminuria, acid-base balance, and systemic hydration.',
      price: '£12.99',
      badge: 'CE Medical Marked | UKAS Aligned',
      actionText: 'Order ALLTEST Dipsticks UK',
      url: 'https://referrals.lolahealth.com/NextLevel15'
    }
  },
  ES: {
    regionName: 'Spain / European Union',
    flag: '🇪🇸',
    partnerName: 'SaludOnNet / Eurofins',
    badge: 'CE Marked • Red Megalab & Unilabs Partner',
    affiliateUrl: 'https://www.melio.es',
    optionA: {
      name: 'Melio Vital Check ES / SaludOnNet Master Panel',
      description: 'Direct-access venous panel through Laboratorios Megalab or Unilabs across Spain and the EU, covering 56 cellular longevity biomarkers with rapid digital results.',
      price: '149,00 €',
      actionText: 'Reservar Panel Melio / SaludOnNet ES'
    },
    optionB: {
      name: 'Panel Cardiovascular & Metabólico Nivel 1',
      description: 'Análisis selectivo de ApoB, HbA1c y proteína C-reactiva de alta sensibilidad (hs-CRP) en laboratorio clínico local.',
      price: '79,00 €',
      actionText: 'Reservar Análisis Nivel 1 ES'
    },
    urinalysis: {
      name: 'SaludOnNet / Eurofins Análisis Completo de Orina con Sedimento',
      description: 'CE Marked & ISO 15189 certified clinical urine sediment panel across 160+ Eurofins Megalab centers in Spain.',
      price: '39,00 €',
      actionText: 'Pedir Análisis Orina Eurofins',
      url: 'PASTE_YOUR_SALUDONNET_AWIN_LINK'
    },
    fluidTelemetry: {
      name: 'ALLTEST Tiras Reactivas de Orina 10 Parámetros ES',
      description: 'Tiras reactivas clínicas de 10 parámetros para el seguimiento semanal de función renal, pH, cetonas, glucosa y microalbuminuria en España.',
      price: '14,50 €',
      badge: 'Marcado CE Médico | Red Eurofins / Unilabs',
      actionText: 'Pedir Tiras Urinarias ALLTEST ES',
      url: 'PASTE_YOUR_SALUDONNET_AWIN_LINK'
    }
  }
};

const STORAGE_KEY = 'nextlevel_clinician_copilot_guest_data_v2';

export default function ClinicianCopilot() {
  const { market, setMarket } = useMarket();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [resetToast, setResetToast] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfExportSuccess, setPdfExportSuccess] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Regional Pathway Selection (US, UK, ES)
  const [selectedPathway, setSelectedPathway] = useState<'US' | 'UK' | 'ES'>('US');

  // Stateful client-side interactive form states
  const [patientData, setPatientData] = useState(initialPatientData);
  const [familyHistory, setFamilyHistory] = useState(initialFamilyHistory);
  const [lifestyle, setLifestyle] = useState(initialLifestyle);
  const [summaryVitals, setSummaryVitals] = useState<SummaryVitalsRow[]>(initialSummaryVitals);
  const [supplements, setSupplements] = useState<SupplementItem[]>(initialSupplements);
  const [phlebotomyMethod, setPhlebotomyMethod] = useState<'clinic' | 'mobile'>('clinic');
  const [bloodResults, setBloodResults] = useState(initialBloodResults);
  const [urinalysisData, setUrinalysisData] = useState(initialUrinalysisData);
  const [requisitions, setRequisitions] = useState(initialRequisitions);
  const [agreedDirectives, setAgreedDirectives] = useState({
    cacScanReferral: false,
    lifestyleAdjustment: true,
  });
  const [retestTimeline, setRetestTimeline] = useState<'30' | '60' | '90' | '180' | ''>('90');
  const [nextAppointmentDate, setNextAppointmentDate] = useState('');
  const [patientConfirmed, setPatientConfirmed] = useState(true);

  // Optional extended workbook logs
  const [vitalsRows, setVitalsRows] = useState<VitalsRow[]>(initialVitalsRows);
  const [pathwaySteps, setPathwaySteps] = useState<PathwayStep[]>(initialPathwaySteps);
  const [examChecks, setExamChecks] = useState<boolean[]>(initialExamChecks);
  const [telemetryRows, setTelemetryRows] = useState<TelemetryRow[]>(initialTelemetryRows);
  const [agreedPathway, setAgreedPathway] = useState<{
    level1: boolean;
    level2: boolean;
  }>({
    level1: true,
    level2: false,
  });

  // 100% GUEST MODE: Load saved localStorage telemetry on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.patientData) setPatientData(parsed.patientData);
        if (parsed.familyHistory) setFamilyHistory(parsed.familyHistory);
        if (parsed.lifestyle) setLifestyle(parsed.lifestyle);
        if (parsed.summaryVitals) setSummaryVitals(parsed.summaryVitals);
        if (parsed.supplements) setSupplements(parsed.supplements);
        if (parsed.phlebotomyMethod) setPhlebotomyMethod(parsed.phlebotomyMethod);
        if (parsed.bloodResults) setBloodResults(parsed.bloodResults);
        if (parsed.urinalysisData) setUrinalysisData(parsed.urinalysisData);
        if (parsed.requisitions) setRequisitions(parsed.requisitions);
        if (parsed.agreedDirectives) setAgreedDirectives(parsed.agreedDirectives);
        if (parsed.retestTimeline) setRetestTimeline(parsed.retestTimeline);
        if (parsed.nextAppointmentDate !== undefined) setNextAppointmentDate(parsed.nextAppointmentDate);
        if (parsed.selectedPathway) setSelectedPathway(parsed.selectedPathway);
        if (parsed.patientConfirmed !== undefined) setPatientConfirmed(parsed.patientConfirmed);
        if (parsed.updatedAt) {
          const date = new Date(parsed.updatedAt);
          setLastSavedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (err) {
      console.warn('Could not load guest form data from localStorage:', err);
    }
  }, []);

  // 100% GUEST MODE: Auto-save all interactive form state locally to browser localStorage
  useEffect(() => {
    try {
      const bundle = {
        patientData,
        familyHistory,
        lifestyle,
        summaryVitals,
        supplements,
        phlebotomyMethod,
        bloodResults,
        urinalysisData,
        requisitions,
        agreedDirectives,
        retestTimeline,
        nextAppointmentDate,
        selectedPathway,
        patientConfirmed,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.warn('Could not auto-save guest form data to localStorage:', err);
    }
  }, [
    patientData, familyHistory, lifestyle, summaryVitals, supplements,
    phlebotomyMethod, bloodResults, urinalysisData, requisitions,
    agreedDirectives, retestTimeline, nextAppointmentDate, selectedPathway, patientConfirmed
  ]);

  // Updaters
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

  const handleDownloadBlank = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // Clear all local form data and wipe localStorage
  const handleClearLocalData = () => {
    if (window.confirm("🗑️ Purge Local Form Data?\n\nAre you sure you want to clear your local form data? All entered vitals, blood numbers, urine logs, and clinician notes will be permanently removed from this device.")) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Could not purge localStorage:', err);
      }
      setPatientData(initialPatientData);
      setFamilyHistory(initialFamilyHistory);
      setLifestyle(initialLifestyle);
      setSummaryVitals(initialSummaryVitals);
      setSupplements(initialSupplements);
      setBloodResults(initialBloodResults);
      setUrinalysisData(initialUrinalysisData);
      setRequisitions(initialRequisitions);
      setAgreedDirectives({ cacScanReferral: false, lifestyleAdjustment: true });
      setRetestTimeline('90');
      setNextAppointmentDate('');
      setPatientConfirmed(true);
      setVitalsRows(initialVitalsRows);
      setPathwaySteps(initialPathwaySteps);
      setExamChecks(initialExamChecks);
      setTelemetryRows(initialTelemetryRows);
      setAgreedPathway({ level1: true, level2: false });
      setLastSavedTime(null);
      setResetToast(true);
      setTimeout(() => setResetToast(false), 3500);
    }
  };

  // MODE A: Export Completed GP Template (Populated Vector PDF)
  const handleExportCompletedPdf = () => {
    setIsExportingPdf(true);
    try {
      const templateData: GpTemplateData = {
        patientName: patientData.name || 'Sample Patient',
        dob: patientData.dob,
        consultDate: patientData.date,
        gpName: patientData.gpName,
        clinicName: patientData.clinicName,
        regionalPathway: selectedPathway,
        familyHistory: {
          earlyCvd: familyHistory.earlyCvd,
          type2Diabetes: familyHistory.type2Diabetes,
          hypertension: familyHistory.hypertension,
          ckd: familyHistory.ckd,
        },
        lifestyle: {
          zone2MinPerWeek: lifestyle.zone2MinPerWeek,
          strengthSessionsPerWeek: lifestyle.strengthSessionsPerWeek,
          nutritionPlan: lifestyle.nutritionPlan,
        },
        medicationsSupplements: {
          vitaminD3K2: supplements.find(s => s.name.includes('Vitamin D3'))?.checked,
          omega3: supplements.find(s => s.name.includes('Omega-3'))?.checked,
          magnesium: supplements.find(s => s.name.includes('Magnesium'))?.checked,
          prescriptions: patientData.medicines,
        },
        patientGoals: patientData.patientGoals || patientData.personalQuestions,
        telemetry: {
          rhr: {
            avg: summaryVitals[0]?.average || '',
            lowest: summaryVitals[0]?.lowest || '',
            highest: summaryVitals[0]?.highest || '',
            trend: summaryVitals[0]?.notes || '',
          },
          hrv: {
            avg: summaryVitals[1]?.average || '',
            lowest: summaryVitals[1]?.lowest || '',
            highest: summaryVitals[1]?.highest || '',
            trend: summaryVitals[1]?.notes || '',
          },
          bp: {
            avg: summaryVitals[2]?.average || '',
            lowest: summaryVitals[2]?.lowest || '',
            highest: summaryVitals[2]?.highest || '',
            trend: summaryVitals[2]?.notes || '',
          },
          sleep: {
            avg: summaryVitals[3]?.average || '',
            lowest: summaryVitals[3]?.lowest || '',
            highest: summaryVitals[3]?.highest || '',
            trend: summaryVitals[3]?.notes || '',
          },
        },
        phlebotomyMethod: phlebotomyMethod,
        bloodResults: {
          apob: bloodResults.apob,
          hba1c: bloodResults.hba1c,
          hscrp: bloodResults.hscrp,
          panel56: bloodResults.panel56,
        },
        urinalysis: {
          labAcr: urinalysisData.labAcr,
          labMicroalbumin: urinalysisData.labMicroalbumin,
          labSediment: urinalysisData.labSediment,
          homePh: urinalysisData.homePh,
          homeSg: urinalysisData.homeSg,
          homeKetones: urinalysisData.homeKetones,
          home7Clear: urinalysisData.home7Clear,
          home7Notes: urinalysisData.home7Notes,
        },
        doctorNotes: patientData.doctorNotes,
        agreedRequisitions: {
          level1TriMarkers: requisitions.apob || requisitions.hba1c || requisitions.hscrp || agreedPathway.level1,
          level2Panel56: requisitions.panel56 || agreedPathway.level2,
          urineAcrSediment: requisitions.urinalysis_acr,
          cacScanReferral: agreedDirectives.cacScanReferral,
          lifestyleAdjustment: agreedDirectives.lifestyleAdjustment,
        },
        retestTimeline: retestTimeline,
        nextAppointment: nextAppointmentDate,
        clinicianPrintName: patientData.clinicianPrintName,
        clinicianDate: patientData.clinicianDate,
        patientConfirmed: patientConfirmed,
        patientDate: patientData.date,
      };

      const doc = buildGpConsultationTemplatePdf(templateData);
      doc.save('clinical-baseline-consultation-template-v2-completed.pdf');
      setPdfExportSuccess(true);
      setTimeout(() => setPdfExportSuccess(false), 5000);
    } catch (err) {
      console.error('Error exporting completed PDF:', err);
      window.print();
    } finally {
      setIsExportingPdf(false);
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
            box-shadow: none !important;
            border: 1px solid #94a3b8 !important;
            margin: 0 !important;
            padding: 10mm !important;
            page-break-after: always !important;
            break-after: page !important;
            background: #ffffff !important;
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

      {/* ========================================================================= */}
      {/* TOP STICKY BAR: DUAL PDF EXPORT & 100% GUEST MODE CTAs                     */}
      {/* 1. "📄 Export Pre-Filled GP Template (PDF)"                                */}
      {/* 2. "✏️ Download Blank Printable Template (PDF)"                            */}
      {/* 3. "🗑️ Clear Local Form Data"                                             */}
      {/* ========================================================================= */}
      <section className="no-print pt-24 pb-6 border-b border-slate-900 bg-slate-950/95 backdrop-blur-md sticky top-16 z-30 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link 
              to="/" 
              className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={13} className="mr-1.5" />
              Back to Home
            </Link>
            <h1 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-black flex items-center gap-2.5 flex-wrap">
              <span>The Clinician Co-Pilot Suite</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest font-bold flex items-center gap-1">
                <ShieldCheck size={12} />
                100% Guest Mode • Zero Server Writes
              </span>
              {lastSavedTime && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                  Auto-saved locally at {lastSavedTime}
                </span>
              )}
            </h1>
          </div>

          {/* Explicit Action Buttons (Top) */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Dual PDF Export CTA 1: Pre-Filled GP Template (PDF) */}
            <button
              onClick={handleExportCompletedPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:via-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-wait"
              title="Compiles your localStorage inputs into a completed vector PDF"
            >
              <FileDown size={15} />
              <span>📄 Export Pre-Filled GP Template (PDF)</span>
            </button>

            {/* Dual PDF Export CTA 2: Download Blank Printable Template (PDF) */}
            <a
              href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="clinical-baseline-consultation-template-v2.pdf"
              onClick={handleDownloadBlank}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              title="Downloads the clean 2-page blank PDF for hand completion with a pen"
            >
              <FileText size={15} />
              <span>✏️ Download Blank Printable Template (PDF)</span>
            </a>

            {/* Read Workbook PDF */}
            <a
              href="/assets/docs/the-next-level-lifespan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 hover:bg-cyan-950/20 text-slate-200 hover:text-cyan-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              title="Opens the Lifespan Educational Workbook PDF in a new tab"
            >
              <BookOpen size={14} className="text-cyan-400" />
              <span className="hidden xl:inline">Workbook</span>
            </a>

            {/* Clear Local Form Data Button */}
            <button
              onClick={handleClearLocalData}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-rose-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              title="Instantly purges all localStorage form data on this device"
            >
              <RotateCcw size={13} />
              <span>🗑️ Clear Local Form Data</span>
            </button>
          </div>
        </div>

        {/* Real-time PDF Export Loading Banner */}
        {isExportingPdf && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
            <div className="p-3 bg-slate-900/95 border border-cyan-500/50 rounded-xl flex items-center gap-2.5 text-xs text-cyan-300 animate-pulse shadow-lg">
              <Loader2 size={16} className="animate-spin text-cyan-400 shrink-0" />
              <span><strong>Generating Pre-Filled GP Template...</strong> Compiling your localStorage telemetry into a print-ready vector PDF.</span>
            </div>
          </div>
        )}

        {/* PDF Downloaded Success Toast */}
        {pdfExportSuccess && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
            <div className="p-3 bg-emerald-950/90 border border-emerald-500/60 rounded-xl flex items-center gap-2.5 text-xs text-emerald-200 animate-fadeIn shadow-lg shadow-emerald-500/10">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span><strong>Export Complete!</strong> Your pre-filled GP Consultation Template has been compiled and saved as <code>clinical-baseline-consultation-template-v2-completed.pdf</code>.</span>
            </div>
          </div>
        )}

        {downloadSuccess && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
            <div className="p-3 bg-amber-950/80 border border-amber-500/50 rounded-xl flex items-center gap-2.5 text-xs text-amber-200 animate-fadeIn">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span><strong>Blank Template Download Started!</strong> <code>clinical-baseline-consultation-template-v2.pdf</code> is ready for pen-and-paper writing.</span>
            </div>
          </div>
        )}

        {resetToast && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl flex items-center gap-2.5 text-xs text-rose-200 animate-fadeIn">
              <RotateCcw size={16} className="text-rose-400 shrink-0" />
              <span><strong>Local Guest Data Purged!</strong> Browser localStorage has been completely cleared and form restored to blank state.</span>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 2-DOCUMENT CLINICAL SYSTEM ARCHITECTURE OVERVIEW                          */}
      {/* ========================================================================= */}
      <section className="no-print max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
              <Stethoscope size={12} className="text-cyan-400" />
              <span>THE 2-DOCUMENT CLINICAL SYSTEM ARCHITECTURE</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight uppercase">
              Separating Patient Education from Doctor Execution
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Standard 10-minute GP appointments fail when patients bring 40-page generic wellness binders. Our 2-document clinical architecture solves this by strictly separating comprehensive patient self-education from concise physician execution.
            </p>
          </div>

          {/* 2 Architecture Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* DOCUMENT 1: Patient Diagnostic & Onboarding Blueprint */}
            <div className="rounded-3xl p-6 sm:p-7 bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/60 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/60">
                    DOCUMENT 1 • EDUCATIONAL WORKBOOK (PDF)
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    Role: Patient Education
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-display font-black text-white tracking-tight">
                    The Next-Level Lifespan Blueprint Workbook
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-light">
                    Your complete patient-facing intelligence manual by J.C. Storganau. Covers epigenetic science, the 3-stage lifespan progression, and why hardware optimization comes before longevity software.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Epigenetic Longevity:</strong> Why epigenetics means living longer isn&apos;t the point — living meaningfully is.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Day 1 Interventions:</strong> 10-minute post-meal walks, metabolic fasting, and autonomic resets.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>3-Month Dynamic Roadmap:</strong> Structured timeline from baseline panels to active biometric telemetry.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="/assets/docs/the-next-level-lifespan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-bold text-center transition flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />
                  <span>📘 Read Educational Workbook (PDF)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* DOCUMENT 2: GP Consultation Template V2 */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 border-2 border-amber-500/50 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800/60">
                    DOCUMENT 2 • DUAL-MODE 2-PAGE TEMPLATE
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-bold">
                    Role: Doctor Execution
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-display font-black text-white tracking-tight">
                    The GP Consultation Template V2 (Dual-Mode)
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-light">
                    The ultra-concise 2-page leave-behind matching the exact 5-section schema below. Available in Mode A (auto-filled digital export) and Mode B (blank printable template for hand completion).
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Mode A (Auto-Filled Digital Export):</strong> Exports your live web form inputs directly into a finished PDF.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Mode B (Blank Printable Template):</strong> Clean underlines and checkboxes for pen-and-paper writing.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>5 Matching Sections:</strong> Header, Risk Profile, Telemetry, Blood Panel, and Dual Urinalysis.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Document 2 */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10">
                <button
                  onClick={handleExportCompletedPdf}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <FileDown size={14} />
                  <span>📄 Export Completed PDF</span>
                </button>
                <a
                  href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="clinical-baseline-consultation-template-v2.pdf"
                  onClick={handleDownloadBlank}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <FileText size={14} />
                  <span>✏️ Download Blank PDF</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MULTI-REGION DUAL-TRACK DIAGNOSTIC RADAR & REQUISITION SELECTOR           */}
      {/* ========================================================================= */}
      <section className="no-print max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 space-y-8">
        <DualTrackSelector className="shadow-2xl" />

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <DiagnosticPathwaySelector
              showRegionTabs={true}
              selectedPathway={agreedPathway.level2 ? 'level2' : agreedPathway.level1 ? 'level1' : null}
              onSelectPathway={(pathway) => {
                if (pathway === 'level1') {
                  setAgreedPathway({ level1: true, level2: false });
                  setRequisitions((prev) => ({ ...prev, apob: true, hba1c: true, hscrp: true }));
                } else {
                  setAgreedPathway({ level1: false, level2: true });
                  setRequisitions((prev) => ({ ...prev, panel56: true }));
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* THE 2-PAGE GP CONSULTATION TEMPLATE V2 (EXACT 5-SECTION MATCHING SCHEMA)  */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="no-print bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Edit3 size={16} className="text-cyan-400 shrink-0" />
            <span className="text-slate-300">
              <strong>Interactive Clinical Form:</strong> Enter your telemetry below to pre-fill the digital export, or download blank to complete by hand.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCompletedPdf}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider text-[11px] transition shadow cursor-pointer"
            >
              Export PDF Now
            </button>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* TEMPLATE PAGE 1: Header, Section 1, Section 2, Section 3              */}
        {/* --------------------------------------------------------------------- */}
        <article id="gp-template-page-1" className="print-page bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200">
          
          {/* Header Banner */}
          <header className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border-b-4 border-cyan-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide uppercase">
                THE CLINICIAN CO-PILOT: 2-PAGE GP CONSULTATION TEMPLATE V2
              </h2>
              <p className="text-cyan-300 text-xs font-medium">
                Patient-Held Diagnostic Baseline &amp; In-Clinic Collaborative Care Directive
              </p>
              <span className="inline-block mt-1 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                DOCUMENT 2 • DUAL-MODE A/B SPECIFICATION
              </span>
            </div>
            <div className="flex items-center sm:justify-end gap-2 shrink-0">
              <img src="/assets/logo-icon.png" alt="123TheNextLevel Logo" className="w-8 h-8 object-contain" />
              <div className="text-left sm:text-right">
                <div className="font-black text-cyan-400 text-sm tracking-tight">123TheNextLevel</div>
                <div className="text-[10px] text-slate-400 font-mono">123TheNextLevel.com</div>
              </div>
            </div>
          </header>

          {/* Demographic Header Fields */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-bold shrink-0">Patient Name:</span>
                <input 
                  type="text"
                  value={patientData.name}
                  onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 text-slate-900 font-bold outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-bold shrink-0">DOB:</span>
                <input 
                  type="text"
                  value={patientData.dob}
                  onChange={(e) => setPatientData({ ...patientData, dob: e.target.value })}
                  placeholder="YYYY-MM-DD"
                  className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 text-slate-900 font-mono outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-bold shrink-0">Date of Consult:</span>
                <input 
                  type="text"
                  value={patientData.date}
                  onChange={(e) => setPatientData({ ...patientData, date: e.target.value })}
                  className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 text-slate-900 font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-bold shrink-0">GP / Doctor:</span>
                <input 
                  type="text"
                  value={patientData.gpName}
                  onChange={(e) => setPatientData({ ...patientData, gpName: e.target.value })}
                  placeholder="Dr..."
                  className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 text-slate-900 outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-bold shrink-0">Clinic / Practice:</span>
                <input 
                  type="text"
                  value={patientData.clinicName}
                  onChange={(e) => setPatientData({ ...patientData, clinicName: e.target.value })}
                  placeholder="Medical Center name..."
                  className="w-full bg-white border border-slate-200 focus:border-cyan-500 rounded px-2 py-1 text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Regional Pathway Selector */}
            <div className="flex items-center gap-3 pt-1 border-t border-slate-200 flex-wrap">
              <span className="text-slate-600 font-bold">Regional Pathway:</span>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="pathway" 
                  checked={selectedPathway === 'US'} 
                  onChange={() => setSelectedPathway('US')}
                  className="w-4 h-4 text-cyan-600 accent-cyan-600"
                />
                <span className="font-semibold text-slate-800">🇺🇸 US (Quest / Labcorp)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="pathway" 
                  checked={selectedPathway === 'UK'} 
                  onChange={() => setSelectedPathway('UK')}
                  className="w-4 h-4 text-cyan-600 accent-cyan-600"
                />
                <span className="font-semibold text-slate-800">🇬🇧 UK (UKAS ISO 15189)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="pathway" 
                  checked={selectedPathway === 'ES'} 
                  onChange={() => setSelectedPathway('ES')}
                  className="w-4 h-4 text-cyan-600 accent-cyan-600"
                />
                <span className="font-semibold text-slate-800">🇪🇸 Spain / EU (Eurofins Megalab)</span>
              </label>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 1: Risk Profile & Health Goals                            */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-5 space-y-3">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 1: RISK PROFILE &amp; HEALTH GOALS
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Personal &amp; Family Medical History</span>
            </div>

            {/* Family History */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <strong className="block text-slate-800">Family Cardiovascular &amp; Metabolic History:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={familyHistory.earlyCvd}
                    onChange={(e) => setFamilyHistory({ ...familyHistory, earlyCvd: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Early CVD (Heart Attack / Stroke &lt; 55/65)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={familyHistory.type2Diabetes}
                    onChange={(e) => setFamilyHistory({ ...familyHistory, type2Diabetes: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Type 2 Diabetes / Insulin Resistance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={familyHistory.hypertension}
                    onChange={(e) => setFamilyHistory({ ...familyHistory, hypertension: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Hypertension / Vascular Disease</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={familyHistory.ckd}
                    onChange={(e) => setFamilyHistory({ ...familyHistory, ckd: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Chronic Kidney Disease (CKD) / Microalbuminuria</span>
                </label>
              </div>
            </div>

            {/* Current Daily Protocols */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-600 font-bold block">Zone 2 Cardio (min/wk):</span>
                <input 
                  type="text" 
                  value={lifestyle.zone2MinPerWeek}
                  onChange={(e) => setLifestyle({ ...lifestyle, zone2MinPerWeek: e.target.value })}
                  placeholder="e.g. 150"
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono text-slate-900"
                />
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-600 font-bold block">Strength Sessions (/wk):</span>
                <input 
                  type="text" 
                  value={lifestyle.strengthSessionsPerWeek}
                  onChange={(e) => setLifestyle({ ...lifestyle, strengthSessionsPerWeek: e.target.value })}
                  placeholder="e.g. 3"
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono text-slate-900"
                />
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-600 font-bold block">Nutrition Framework:</span>
                <input 
                  type="text" 
                  value={lifestyle.nutritionPlan}
                  onChange={(e) => setLifestyle({ ...lifestyle, nutritionPlan: e.target.value })}
                  placeholder="e.g. Low glycemic, Mediterranean"
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-900"
                />
              </div>
            </div>

            {/* Medications & Baseline Supplements */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <strong className="block text-slate-800">Medications &amp; Baseline Daily Protocols:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-2 border-b border-slate-200">
                {supplements.slice(0, 3).map((s, idx) => (
                  <label key={s.name} className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={s.checked}
                      onChange={(e) => updateSupplement(idx, 'checked', e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                    />
                    <span className="font-semibold text-slate-800">{s.name}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-600 font-bold block mb-1">Prescriptions &amp; Other Medicines:</span>
                  <input 
                    type="text"
                    value={patientData.medicines}
                    onChange={(e) => setPatientData({ ...patientData, medicines: e.target.value })}
                    placeholder="List all active prescriptions and dosages..."
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-900"
                  />
                </div>
                <div>
                  <span className="text-slate-600 font-bold block mb-1">Primary Patient Goals for Consult:</span>
                  <input 
                    type="text"
                    value={patientData.patientGoals}
                    onChange={(e) => setPatientData({ ...patientData, patientGoals: e.target.value })}
                    placeholder="e.g. Optimize cardiovascular risk, check renal microalbuminuria..."
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 2: 14-Day Wearable Telemetry Log                          */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-6 space-y-2.5">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 2: 14-DAY WEARABLE TELEMETRY LOG (HOME BIOSENSORS)
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">14-Night Rolling Averages</span>
            </div>

            <table className="w-full text-left border-collapse text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-2 font-bold uppercase w-1/3">Biometric Parameter</th>
                  <th className="p-2 font-bold uppercase w-1/6 text-center">14-Day Average</th>
                  <th className="p-2 font-bold uppercase w-1/6 text-center">Lowest</th>
                  <th className="p-2 font-bold uppercase w-1/6 text-center">Highest</th>
                  <th className="p-2 font-bold uppercase">Clinical Trend / Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-mono">
                {summaryVitals.map((row, idx) => (
                  <tr key={row.measure} className="h-8 hover:bg-slate-50">
                    <td className="p-2 font-sans font-medium text-slate-900 border-r border-slate-300">
                      {row.measure} <span className="text-slate-500 text-[10px]">({row.unit})</span>
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={row.average}
                        onChange={(e) => updateSummaryVitals(idx, 'average', e.target.value)}
                        placeholder="—"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={row.lowest}
                        onChange={(e) => updateSummaryVitals(idx, 'lowest', e.target.value)}
                        placeholder="—"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={row.highest}
                        onChange={(e) => updateSummaryVitals(idx, 'highest', e.target.value)}
                        placeholder="—"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-center font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={row.notes}
                        onChange={(e) => updateSummaryVitals(idx, 'notes', e.target.value)}
                        placeholder="e.g. Stable baseline"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-sans text-xs outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 3: Blood Panel Results                                    */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-6 space-y-2.5">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 3: VENOUS BLOOD PANEL RESULTS (CORE TRI-MARKERS &amp; EXTENDED)
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Venous Pathology</span>
            </div>

            {/* Phlebotomy Method */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 text-xs">
              <span className="text-slate-700 font-bold">Phlebotomy Method:</span>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="phlebotomy" 
                  checked={phlebotomyMethod === 'clinic'} 
                  onChange={() => setPhlebotomyMethod('clinic')}
                  className="w-4 h-4 text-cyan-600 accent-cyan-600"
                />
                <span>Accredited Walk-In Clinic Draw (Quest / Labcorp / Megalab / Unilabs)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="phlebotomy" 
                  checked={phlebotomyMethod === 'mobile'} 
                  onChange={() => setPhlebotomyMethod('mobile')}
                  className="w-4 h-4 text-cyan-600 accent-cyan-600"
                />
                <span>Mobile Nurse Home Phlebotomy</span>
              </label>
            </div>

            {/* Blood Panel Results Table */}
            <table className="w-full text-left border-collapse text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-2 font-bold uppercase w-2/5">Biomarker &amp; Clinical Rationale</th>
                  <th className="p-2 font-bold uppercase w-1/4">Longevity Target Range</th>
                  <th className="p-2 font-bold uppercase w-1/6">Patient Lab Result</th>
                  <th className="p-2 font-bold uppercase">Requisition Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                <tr className="hover:bg-slate-50">
                  <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                    <strong>Apolipoprotein B (ApoB)</strong> - Total atherogenic particle count
                  </td>
                  <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                    &lt; 70 - 80 mg/dL (&lt; 0.7 - 0.8 g/L)
                  </td>
                  <td className="p-1 border-r border-slate-300">
                    <input 
                      type="text"
                      value={bloodResults.apob.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, apob: { ...bloodResults.apob, result: e.target.value } })}
                      placeholder="e.g. 68 mg/dL"
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                    />
                  </td>
                  <td className="p-1">
                    <input 
                      type="text"
                      value={bloodResults.apob.action}
                      onChange={(e) => setBloodResults({ ...bloodResults, apob: { ...bloodResults.apob, action: e.target.value } })}
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                    />
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                    <strong>Glycated Hemoglobin (HbA1c)</strong> - 90-day glycemic exposure
                  </td>
                  <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                    &lt; 5.4 - 5.6% (&lt; 36 mmol/mol)
                  </td>
                  <td className="p-1 border-r border-slate-300">
                    <input 
                      type="text"
                      value={bloodResults.hba1c.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, hba1c: { ...bloodResults.hba1c, result: e.target.value } })}
                      placeholder="e.g. 5.2%"
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                    />
                  </td>
                  <td className="p-1">
                    <input 
                      type="text"
                      value={bloodResults.hba1c.action}
                      onChange={(e) => setBloodResults({ ...bloodResults, hba1c: { ...bloodResults.hba1c, action: e.target.value } })}
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                    />
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                    <strong>High-Sensitivity CRP (hs-CRP)</strong> - Systemic vascular inflammation
                  </td>
                  <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                    &lt; 0.5 - 1.0 mg/L (Ultra-low risk)
                  </td>
                  <td className="p-1 border-r border-slate-300">
                    <input 
                      type="text"
                      value={bloodResults.hscrp.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, hscrp: { ...bloodResults.hscrp, result: e.target.value } })}
                      placeholder="e.g. 0.4 mg/L"
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                    />
                  </td>
                  <td className="p-1">
                    <input 
                      type="text"
                      value={bloodResults.hscrp.action}
                      onChange={(e) => setBloodResults({ ...bloodResults, hscrp: { ...bloodResults.hscrp, action: e.target.value } })}
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                    />
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                    <strong>Full 56-Biomarker Master Panel</strong> - Multi-organ cellular map
                  </td>
                  <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                    Quest / LOLA 56 / Melio Master
                  </td>
                  <td className="p-1 border-r border-slate-300">
                    <input 
                      type="text"
                      value={bloodResults.panel56.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, panel56: { ...bloodResults.panel56, result: e.target.value } })}
                      placeholder="e.g. Completed / Normal"
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                    />
                  </td>
                  <td className="p-1">
                    <input 
                      type="text"
                      value={bloodResults.panel56.action}
                      onChange={(e) => setBloodResults({ ...bloodResults, panel56: { ...bloodResults.panel56, action: e.target.value } })}
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer className="mt-6 pt-3 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Document 2: The GP Consultation Template V2 • Page 1 of 2 • Pre-Appointment Baseline Summary • © 123TheNextLevel.com</span>
            <span>Page 1 of 2</span>
          </footer>
        </article>

        {/* --------------------------------------------------------------------- */}
        {/* TEMPLATE PAGE 2: Section 4, Section 5                                 */}
        {/* --------------------------------------------------------------------- */}
        <article id="gp-template-page-2" className="print-page bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200">
          
          {/* Header Page 2 */}
          <header className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl border-b-4 border-cyan-600 flex justify-between items-center">
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide uppercase">
                THE CLINICIAN CO-PILOT: 2-PAGE GP CONSULTATION TEMPLATE V2
              </h2>
              <p className="text-cyan-300 text-[11px] font-medium">
                Page 2: Dual Urinalysis Telemetry &amp; Clinician Collaborative Care Directives
              </p>
            </div>
            <div className="text-right text-[11px] font-mono text-slate-300">
              <div>{patientData.name ? `Patient: ${patientData.name}` : 'Patient: —'}</div>
              <div>{patientData.date ? `Date: ${patientData.date}` : ''}</div>
            </div>
          </header>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 4: Dual Urinalysis Log                                    */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-5 space-y-4">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 4: DUAL URINALYSIS TELEMETRY (WEEKLY HOME STRIPS &amp; QUARTERLY LAB)
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Renal Microvascular Integrity</span>
            </div>

            {/* Form Entry A: Weekly At-Home 10-Parameter Dipstick Log */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  Form Entry A: Weekly At-Home 10-Parameter Dipstick Log (pH, Hydration, Ketones)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Diagnox Urinox-10 / ALLTEST Clinical Dipsticks</span>
              </div>

              <table className="w-full text-left border-collapse text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-2 font-bold uppercase w-2/5">Rapid Reagent Parameter</th>
                    <th className="p-2 font-bold uppercase w-1/4">Target Optimal Range</th>
                    <th className="p-2 font-bold uppercase w-1/6">Weekly Rolling Average</th>
                    <th className="p-2 font-bold uppercase">Acute Daily Habit Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                      <strong>Urine pH (Acid-Base Homeostasis)</strong>
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      6.0 - 7.5 (Optimal metabolic buffer)
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={urinalysisData.homePh.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homePh: { ...urinalysisData.homePh, result: e.target.value } })}
                        placeholder="e.g. 6.8"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.homePh.remarks}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homePh: { ...urinalysisData.homePh, remarks: e.target.value } })}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                      <strong>Specific Gravity (Cellular Hydration)</strong>
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      1.010 - 1.020 (Euhydrated state)
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={urinalysisData.homeSg.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeSg: { ...urinalysisData.homeSg, result: e.target.value } })}
                        placeholder="e.g. 1.015"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.homeSg.remarks}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeSg: { ...urinalysisData.homeSg, remarks: e.target.value } })}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                      <strong>Ketone Excretion (Acetoacetate)</strong>
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      Negative to Trace (or diet target)
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={urinalysisData.homeKetones.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeKetones: { ...urinalysisData.homeKetones, result: e.target.value } })}
                        placeholder="e.g. Negative"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.homeKetones.remarks}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeKetones: { ...urinalysisData.homeKetones, remarks: e.target.value } })}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                      <strong>Other 7 Parameters Status</strong> (Leuk, Nit, Prot, Blood, Gluc, Urob, Bili)
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      All 7 Parameters Negative / Normal
                    </td>
                    <td className="p-2 border-r border-slate-300">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={urinalysisData.home7Clear}
                          onChange={(e) => setUrinalysisData({ ...urinalysisData, home7Clear: e.target.checked })}
                          className="w-4 h-4 text-cyan-600 accent-cyan-600"
                        />
                        <span className="text-[11px] font-bold text-slate-800">Clear / Normal</span>
                      </label>
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.home7Notes}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, home7Notes: e.target.value })}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Form Entry B: Quarterly Laboratory Urinalysis */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  Form Entry B: Quarterly Laboratory Urinalysis (ACR, Microalbumin, Sediment)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Quest / Labcorp / UKAS / Eurofins Megalab</span>
              </div>

              <table className="w-full text-left border-collapse text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-2 font-bold uppercase w-2/5">Laboratory Marker</th>
                    <th className="p-2 font-bold uppercase w-1/4">Clinical Reference Benchmark</th>
                    <th className="p-2 font-bold uppercase w-1/6">Pathology Result</th>
                    <th className="p-2 font-bold uppercase">Clinical Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                      <strong>Urine Albumin-to-Creatinine Ratio (ACR)</strong>
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      &lt; 30 mg/g (&lt; 3 mg/mmol)
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={urinalysisData.labAcr.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labAcr: { ...urinalysisData.labAcr, result: e.target.value } })}
                        placeholder="e.g. 1.2 mg/mmol"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.labAcr.remarks}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labAcr: { ...urinalysisData.labAcr, remarks: e.target.value } })}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                      <strong>Microalbuminuria &amp; Total Proteinuria</strong>
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      Negative / &lt; 20 mg/L
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={urinalysisData.labMicroalbumin.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labMicroalbumin: { ...urinalysisData.labMicroalbumin, result: e.target.value } })}
                        placeholder="e.g. Negative"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.labMicroalbumin.remarks}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labMicroalbumin: { ...urinalysisData.labMicroalbumin, remarks: e.target.value } })}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                      <strong>Microscopic Urine Sediment Analysis</strong>
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      No cellular casts, RBCs or crystals
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={urinalysisData.labSediment.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labSediment: { ...urinalysisData.labSediment, result: e.target.value } })}
                        placeholder="e.g. Clear / Negative"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.labSediment.remarks}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labSediment: { ...urinalysisData.labSediment, remarks: e.target.value } })}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 5: Clinician Collaborative Care Directives                */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-6 space-y-3">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 5: CLINICIAN COLLABORATIVE CARE DIRECTIVES (IN-CLINIC DOCTOR NOTES)
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Physician Sign-Off &amp; Action Plan</span>
            </div>

            {/* Formatted Doctor Notes Box */}
            <div className="p-3.5 rounded-xl border-2 border-cyan-600/40 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-900">Clinician Consultation Notes &amp; Assessment Directives:</span>
                <span className="text-[10px] text-slate-500 font-mono">Record confirmed diagnoses, rx modifications, referrals</span>
              </div>
              <textarea 
                value={patientData.doctorNotes}
                onChange={(e) => setPatientData({ ...patientData, doctorNotes: e.target.value })}
                placeholder="Doctor to record clinical impressions, prescription adjustments, specialty referrals, or diagnostic recommendations during consultation..."
                rows={4}
                className="w-full bg-white border border-slate-300 focus:border-cyan-600 rounded-lg p-2.5 text-xs text-slate-900 outline-none resize-none"
              />
            </div>

            {/* Agreed Clinical Requisitions Checkboxes */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <strong className="block text-slate-800">Agreed Clinical Requisitions &amp; Directives:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.apob || agreedPathway.level1}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRequisitions(prev => ({ ...prev, apob: checked, hba1c: checked, hscrp: checked }));
                      setAgreedPathway(prev => ({ ...prev, level1: checked }));
                    }}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Level 1: ApoB, HbA1c, hs-CRP</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.panel56 || agreedPathway.level2}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRequisitions(prev => ({ ...prev, panel56: checked }));
                      setAgreedPathway(prev => ({ ...prev, level2: checked }));
                    }}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Level 2: 56-Biomarker Master Draw</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={requisitions.urinalysis_acr}
                    onChange={(e) => setRequisitions(prev => ({ ...prev, urinalysis_acr: e.target.checked }))}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Urine ACR &amp; Sediment Panel</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={agreedDirectives.cacScanReferral}
                    onChange={(e) => setAgreedDirectives(prev => ({ ...prev, cacScanReferral: e.target.checked }))}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Coronary Artery Calcium (CAC) Scan Referral</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none col-span-1 sm:col-span-2">
                  <input 
                    type="checkbox" 
                    checked={agreedDirectives.lifestyleAdjustment}
                    onChange={(e) => setAgreedDirectives(prev => ({ ...prev, lifestyleAdjustment: e.target.checked }))}
                    className="w-4 h-4 rounded text-cyan-600 accent-cyan-600"
                  />
                  <span>Lifestyle Protocol Adjustment (Zone 2 Cardio / Nutrition)</span>
                </label>
              </div>
            </div>

            {/* Follow-up Recheck Timeline */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-800">Agreed Follow-Up Recheck Timeline:</span>
                {(['30', '60', '90', '180'] as const).map((days) => (
                  <label key={days} className="flex items-center gap-1.5 cursor-pointer select-none bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    <input 
                      type="radio" 
                      name="timeline" 
                      checked={retestTimeline === days} 
                      onChange={() => setRetestTimeline(days)}
                      className="w-3.5 h-3.5 text-cyan-600 accent-cyan-600"
                    />
                    <span>{days === '180' ? '6 Months' : days === '90' ? '90 Days (Quarterly)' : `${days} Days`}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 shrink-0">Next Appointment:</span>
                <input 
                  type="text" 
                  value={nextAppointmentDate}
                  onChange={(e) => setNextAppointmentDate(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="bg-white border border-slate-200 rounded px-2 py-1 font-mono text-xs outline-none"
                />
              </div>
            </div>

            {/* Signatures */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <div className="font-bold text-slate-800">Clinician Signature / Stamp:</div>
                <div className="h-8 border-b border-dashed border-slate-300"></div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Print Name:</span>
                    <input 
                      type="text"
                      value={patientData.clinicianPrintName}
                      onChange={(e) => setPatientData({ ...patientData, clinicianPrintName: e.target.value })}
                      placeholder="Dr..."
                      className="w-full bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Date:</span>
                    <input 
                      type="text"
                      value={patientData.clinicianDate}
                      onChange={(e) => setPatientData({ ...patientData, clinicianDate: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="font-bold text-slate-800">Patient Confirmation:</div>
                <label className="flex items-center gap-2 pt-1 text-[11px] text-slate-600 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={patientConfirmed}
                    onChange={(e) => setPatientConfirmed(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 accent-cyan-600"
                  />
                  <span>I confirm this record accurately reflects my logged telemetry.</span>
                </label>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Patient Signature:</span>
                    <div className="h-6 border-b border-dashed border-slate-300"></div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Date:</span>
                    <input 
                      type="text"
                      value={patientData.date}
                      onChange={(e) => setPatientData({ ...patientData, date: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <footer className="mt-6 pt-3 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Document 2: The GP Consultation Template V2 • Page 2 of 2 • Pre-Appointment Baseline Summary • © 123TheNextLevel.com</span>
            <span>Page 2 of 2</span>
          </footer>
        </article>
      </section>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: 3 REQUIRED CTAs & STOREFRONT REDIRECTION                  */}
      {/* 1. "📄 Export My Completed GP Template (PDF)"                             */}
      {/* 2. "✏️ Download Blank Template to Fill by Hand (PDF)"                     */}
      {/* 3. "📘 Read Educational Workbook (PDF)"                                   */}
      {/* ========================================================================= */}
      <section className="no-print max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <HeartPulse size={28} />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-tight text-white font-black">
              Ready for Your Clinical Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Choose your preferred method below: generate your auto-filled digital PDF now, download the blank template to fill out with a pen, or review the comprehensive educational manual.
            </p>
          </div>

          {/* 4 Explicit Action Buttons (Bottom) */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            {/* CTA 1: Pre-Filled GP Template */}
            <button
              onClick={handleExportCompletedPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:via-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-75"
            >
              <FileDown size={16} />
              <span>📄 Export Pre-Filled GP Template (PDF)</span>
            </button>

            {/* CTA 2: Download Blank Printable Template */}
            <a
              href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="clinical-baseline-consultation-template-v2.pdf"
              onClick={handleDownloadBlank}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <FileText size={16} />
              <span>✏️ Download Blank Printable Template (PDF)</span>
            </a>

            {/* CTA 3: Read Educational Workbook */}
            <a
              href="/assets/docs/the-next-level-lifespan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-slate-700 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <BookOpen size={16} className="text-cyan-400" />
              <span>📘 Read Educational Workbook (PDF)</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>

            {/* CTA 4: Clear Local Form Data */}
            <button
              onClick={handleClearLocalData}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-rose-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <RotateCcw size={14} />
              <span>🗑️ Clear Local Form Data</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4 text-xs">
            <Link
              to="/store"
              className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider transition"
            >
              Order Regional Lab Panels &amp; Urinalysis Kits →
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              to="/health-quiz"
              className="text-slate-400 hover:text-slate-200 font-bold uppercase tracking-wider transition"
            >
              Take 5-Min Longevity Baseline Quiz →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
