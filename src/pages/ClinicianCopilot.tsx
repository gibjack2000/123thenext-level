/* ORIGINAL: import React, { useState } from 'react'; */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import Step3GuidingBanner from '../components/Step3GuidingBanner';
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
  // Choice 1: Essential Baseline Blood Panel (Basic Tier)
  lipidProfile: { result: '', action: 'Target Chol <200, LDL <100, Trig <100' },
  fastingGlucose: { result: '', action: 'Target < 85-90 mg/dL (< 5.0 mmol/L)' },
  hba1c: { result: '', action: 'Target < 5.4% (< 36 mmol/mol)' },
  liverKidney: { result: '', action: 'Target ALT <30 U/L, eGFR >90 mL/min' },

  // Choice 2: Comprehensive Cellular Biomarker Map (Complete 56-Biomarker Tier)
  apob: { result: '', action: 'Target < 70 - 80 mg/dL (< 0.7 - 0.8 g/L)' },
  hscrp: { result: '', action: 'Target < 0.5 - 1.0 mg/L (Ultra-low risk)' },
  thyroidHormones: { result: '', action: 'TSH 1.0-2.0, Free T4, Endocrine Balance' },
  micronutrients: { result: '', action: 'Vit D >50 ng/mL, B12 >500 pg/mL, Ferritin 50-150' },
  panel56: { result: '', action: 'Comprehensive 56-Biomarker Map Completed' },
};

const initialUrinalysisData = {
  labAcr: { result: '', remarks: '< 30 mg/g (< 3 mg/mmol)' },
  labMicroalbumin: { result: '', remarks: 'Negative / < 20 mg/L' },
  labCreatinine: { result: '', remarks: 'Normal Creatinine' },
  labSediment: { result: '', remarks: 'Clear / No casts' },
  homePh: { result: '', remarks: 'Optimal 6.0 - 7.5' },
  homeSg: { result: '', remarks: 'Optimal 1.010 - 1.020' },
  homeKetones: { result: '', remarks: 'Negative / Trace' },
  homeProtein: { result: '', remarks: 'Negative / Normal' },
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

const initialBodyComposition = {
  visceralFatRating: '',
  bodyFatPct: '',
  skeletalMuscleMass: '',
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
      name: 'Choice 2: Comprehensive Cellular Biomarker Map (56 Biomarkers)',
      badge: 'Clinical Gold Standard',
      description: 'Comprehensive 56-biomarker venous blood panel measuring ApoB, hs-CRP, full lipid cascade, hormone cascade, thyroid panel, and micronutrients via Quest / Labcorp.',
      price: '$299.00',
      actionText: 'Book 56-Biomarker Map via HealthLabs'
    },
    optionB: {
      name: 'Choice 1: Essential Baseline Blood Panel',
      badge: 'Essential Starter',
      description: 'Core baseline metabolic & lipid profile measuring Total Cholesterol, HDL, LDL, Triglycerides, Fasting Glucose, HbA1c, and basic kidney/liver markers.',
      price: 'From $39.00 / test',
      actionText: 'Order Essential Starter Panel'
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
      name: 'LOLA Core Health 45',
      badge: '45 Essential Biomarkers • UKAS Accredited',
      description: "Select 'Core Health 45' on LOLA Health for an essential health MOT. Comprehensive 45-biomarker direct-to-consumer blood panel covering cholesterol & lipid ratios, HbA1c 90-day glucose, liver, kidney, high-sensitivity CRP, vitamin D, active B12, and baseline hormones.",
      price: 'From £125.00',
      actionText: 'Order LOLA Core Health 45 (From £125) ➔'
    },
    optionB: {
      name: 'LOLA Vital Check 56 (Comprehensive Longevity Baseline)',
      badge: '⭐ Recommended Longevity Baseline • 56 Biomarkers',
      description: "On the LOLA Health website, select 'Vital Check 56' and choose 'Phlebotomist for a Home Visit'. Advanced multi-omic longevity blood panel tracking 56 essential biomarkers—including ApoB (cardiovascular plaque risk), hs-CRP (systemic inflammation), and HbA1c (glycemic variability). Its GMC-reviewed digital report feeds directly into the GP Consultation Template.",
      price: 'From £155.00',
      actionText: 'Order LOLA Vital Check 56 (From £155) ➔'
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
      name: 'Choice 2: Comprehensive Cellular Biomarker Map (Melio / SaludOnNet 56)',
      badge: 'Clinical Gold Standard',
      description: 'Panel venoso integral de 56 biomarcadores celulares (ApoB, hs-CRP, tiroides, cascada hormonal, micronutrientes) en laboratorios Megalab / Unilabs.',
      price: '149,00 €',
      actionText: 'Reservar Panel Melio / SaludOnNet ES'
    },
    optionB: {
      name: 'Choice 1: Essential Baseline Blood Panel (SaludOnNet / Melio ES)',
      badge: 'Essential Starter',
      description: 'Panel metabólico y lipídico esencial (colesterol total, HDL, LDL, triglicéridos, glucosa en ayunas, HbA1c y función renal/hepática básica).',
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);
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
  const [bodyComposition, setBodyComposition] = useState(initialBodyComposition);
  const [supplements, setSupplements] = useState<SupplementItem[]>(initialSupplements);
  const [phlebotomyMethod, setPhlebotomyMethod] = useState<'clinic' | 'mobile'>('clinic');
  const [bloodResults, setBloodResults] = useState(initialBloodResults);
  const [bloodPanelTierFilter, setBloodPanelTierFilter] = useState<'basic' | 'complete' | 'all'>('basic');
  const [urineDiagnosticOption, setUrineDiagnosticOption] = useState<'lab_acr' | 'weekly_dipstick' | 'both' | 'none'>('both');
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
        if (parsed.bodyComposition) setBodyComposition(parsed.bodyComposition);
        if (parsed.supplements) setSupplements(parsed.supplements);
        if (parsed.phlebotomyMethod) setPhlebotomyMethod(parsed.phlebotomyMethod);
        if (parsed.bloodResults) setBloodResults({ ...initialBloodResults, ...parsed.bloodResults });
        if (parsed.bloodPanelTierFilter) setBloodPanelTierFilter(parsed.bloodPanelTierFilter);
        if (parsed.urineDiagnosticOption) setUrineDiagnosticOption(parsed.urineDiagnosticOption);
        if (parsed.urinalysisData) setUrinalysisData({ ...initialUrinalysisData, ...parsed.urinalysisData });
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
        bodyComposition,
        supplements,
        phlebotomyMethod,
        bloodResults,
        bloodPanelTierFilter,
        urineDiagnosticOption,
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
    patientData, familyHistory, lifestyle, summaryVitals, bodyComposition, supplements,
    phlebotomyMethod, bloodResults, bloodPanelTierFilter, urineDiagnosticOption, urinalysisData, requisitions,
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
      setBodyComposition(initialBodyComposition);
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
      setBloodPanelTierFilter('basic');
      setUrineDiagnosticOption('both');
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
        bodyComposition: {
          visceralFatRating: bodyComposition.visceralFatRating,
          bodyFatPct: bodyComposition.bodyFatPct,
          skeletalMuscleMass: bodyComposition.skeletalMuscleMass,
        },
        phlebotomyMethod: phlebotomyMethod,
        bloodResults: {
          fastingGlucose: bloodResults.fastingGlucose,
          lipidProfile: bloodResults.lipidProfile,
          liverKidney: bloodResults.liverKidney,
          hba1c: bloodResults.hba1c,
          apob: bloodResults.apob,
          hscrp: bloodResults.hscrp,
          thyroidHormones: bloodResults.thyroidHormones,
          micronutrients: bloodResults.micronutrients,
          panel56: bloodResults.panel56,
        },
        urinalysis: {
          labAcr: urinalysisData.labAcr,
          labMicroalbumin: urinalysisData.labMicroalbumin,
          labCreatinine: urinalysisData.labCreatinine,
          labSediment: urinalysisData.labSediment,
          homePh: urinalysisData.homePh,
          homeSg: urinalysisData.homeSg,
          homeKetones: urinalysisData.homeKetones,
          homeProtein: urinalysisData.homeProtein,
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
      doc.save('clinical-baseline-consultation-template-v2.pdf');
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
      {/* 1. SECTION TITLE & MOTIVATIONAL HERO BANNER                               */}
      {/* ========================================================================= */}
      <div className="no-print border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 pt-8 pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Utility Bar: Back to Home + Guest Mode Badge + Clear Data */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={13} className="mr-1.5" />
              Back to Home
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest font-bold flex items-center gap-1">
                <ShieldCheck size={12} />
                100% Guest Mode • Zero Server Writes
              </span>
              {lastSavedTime && (
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-medium">
                  Auto-saved locally at {lastSavedTime}
                </span>
              )}
              <button
                type="button"
                onClick={handleClearLocalData}
                disabled={isExportingPdf}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-rose-300 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                title="Purge all localStorage form data on this device"
              >
                <RotateCcw size={11} />
                <span>🗑️ Clear Local Form Data</span>
              </button>
            </div>
          </div>

          {/* Main Hub Title & Subtitle */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[11px] font-mono uppercase tracking-widest font-bold">
              <Stethoscope size={13} />
              <span>Consolidated Diagnostics &amp; Clinician Co-Pilot</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
              Clinician Co-Pilot Hub: From Guessing to Knowing
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-medium">
              Transform your raw cellular data into a standardized 2-Page GP Consultation Brief for your next doctor appointment.
            </p>
          </div>

          {/* Motivational Why Callout */}
          <div className="bg-slate-900/90 border border-sky-500/30 rounded-xl p-6 mb-8 shadow-2xl space-y-3 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-base sm:text-lg font-display font-black text-sky-300 tracking-wide relative z-10">
              🔥 Why Establish Your Diagnostic Baseline Today?
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed relative z-10">
              <li>
                • 80% to 90% of cellular aging and chronic disease risk is governed by daily lifestyle and metabolic telemetry—not raw genetics.
              </li>
              <li>
                • Reactive &apos;sick-care&apos; waits for symptoms, organ strain, or emergencies. Proactive health catches subtle biomarker drifts years before symptoms appear.
              </li>
              <li>
                • Your GP only has 10 minutes. Handing them raw lab printouts causes decision fatigue. The Clinician Co-Pilot translates your blood, urine, and scale metrics into a 2-page clinical summary your doctor can review in 30 seconds.
              </li>
            </ul>
          </div>

          {/* Real-time PDF Export / Download / Reset Status Toasts */}
          {isExportingPdf && (
            <div className="p-3 bg-slate-900/95 border border-cyan-500/50 rounded-xl flex items-center gap-2.5 text-xs text-cyan-300 animate-pulse shadow-lg">
              <Loader2 size={16} className="animate-spin text-cyan-400 shrink-0" />
              <span><strong>Generating Pre-Filled GP Brief...</strong> Compiling your telemetry into <code>clinical-baseline-consultation-template-v2.pdf</code>.</span>
            </div>
          )}

          {pdfExportSuccess && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-500/60 rounded-xl flex items-center gap-2.5 text-xs text-emerald-200 animate-fadeIn shadow-lg shadow-emerald-500/10">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span><strong>Export Complete!</strong> Your pre-filled GP Consultation Brief has been saved as <code>clinical-baseline-consultation-template-v2.pdf</code>.</span>
            </div>
          )}

          {downloadSuccess && (
            <div className="p-3 bg-amber-950/80 border border-amber-500/50 rounded-xl flex items-center gap-2.5 text-xs text-amber-200 animate-fadeIn">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span><strong>Blank Template Download Started!</strong> <code>clinical-baseline-consultation-template-v2.pdf</code> is ready for pen-and-paper writing.</span>
            </div>
          )}

          {resetToast && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl flex items-center gap-2.5 text-xs text-rose-200 animate-fadeIn">
              <RotateCcw size={16} className="text-rose-400 shrink-0" />
              <span><strong>Local Guest Data Purged!</strong> Browser localStorage has been completely cleared and form restored to blank state.</span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STAGE 1: CHOOSE & COORDINATE YOUR DIAGNOSTICS                          */}
      {/* ========================================================================= */}
      <div id="stage-1" className="no-print max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold flex items-center justify-center text-xs shrink-0">
            01
          </span>
          <div>
            <span className="text-[11px] font-mono uppercase text-sky-400 tracking-widest font-bold block">
              STAGE 1 OF 3 • DIAGNOSTIC SELECTION HUB
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
              Stage 1: Choose &amp; Coordinate Your Diagnostics
            </h2>
          </div>
        </div>

        {/* A. BLOOD DIAGNOSTICS (CHOOSE ONE) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-sky-500/30 space-y-5 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <h3 className="text-sm sm:text-base font-display font-black uppercase text-sky-300 tracking-wide flex items-center gap-2">
              <span>🩸 A. Blood Diagnostics (Choose One)</span>
            </h3>
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30 font-bold">
              Quarterly Venous Lab Draw
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Choice A */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-emerald-500/40 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-display font-black uppercase text-emerald-300">
                  • Choice A: Essential Baseline Check
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Core Baseline
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Scope:</strong> Core lipids (Cholesterol, HDL, LDL, Triglycerides), Fasting Glucose, HbA1c (90-day glycemic trend), and basic kidney/liver filtration.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-emerald-300">Ideal For:</strong> Targeted yearly check-ins and baseline screening.
              </p>
            </div>

            {/* Choice B */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-cyan-500/40 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-display font-black uppercase text-cyan-300">
                  • Choice B: Comprehensive Cellular Map (LOLA Vital Check 56)
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Gold Standard (56)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Scope:</strong> Gold-standard 56-biomarker panel including ApoB (cardiovascular plaque risk), hs-CRP (cellular inflammation), Thyroid panel (TSH, Free T3/T4), Vitamin D3, Ferritin, and full Sex Hormones.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-cyan-300">Ideal For:</strong> Complete biological age mapping and deep-dive performance optimization.
              </p>
            </div>
          </div>

          {/* Direct Affiliate Order Buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Order Accredited Regional Blood &amp; Urine Lab Panels:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://referrals.lolahealth.com/NextLevel15"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20"
              >
                <span>UK 🇬🇧 (LOLA Health 15% Off)</span>
                <ExternalLink size={12} />
              </a>
              <a
                href="https://www.healthlabs.com/?affiliate=123znl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20"
              >
                <span>US 🇺🇸 (HealthLabs)</span>
                <ExternalLink size={12} />
              </a>
              <a
                href="https://www.melio.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
              >
                <span>ES 🇪🇸 (SaludOnNet/Melio)</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* B. COORDINATED URINALYSIS SCHEDULE & C. 14-DAY HARDWARE TELEMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* B. COORDINATED URINALYSIS SCHEDULE */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-teal-500/30 space-y-3 shadow-xl">
            <h3 className="text-sm sm:text-base font-display font-black uppercase text-teal-300 tracking-wide border-b border-slate-800 pb-2.5">
              🧪 B. Coordinated Urinalysis Schedule
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <li>
                • <strong className="text-white">Scheduled Lab Test (Quarterly):</strong> Request a clinical Urine ACR (Albumin-to-Creatinine Ratio) during the <strong className="text-teal-300">EXACT SAME clinic appointment as your blood draw</strong>. Submitting your urine sample alongside your blood draw gives your GP a synchronized kidney and cardiovascular profile in one visit.
              </li>
              <li>
                • <strong className="text-white">In-Between Home Dipsticks (Weekly):</strong> Run a 60-second Sunday 10-parameter urine strip at home to track hydration, pH balance, and ketone levels between quarterly blood draws.
              </li>
            </ul>
          </div>

          {/* C. 14-DAY HARDWARE TELEMETRY */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-display font-black uppercase text-amber-300 tracking-wide border-b border-slate-800 pb-2.5">
                ⌚ C. 14-Day Hardware Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                • <strong className="text-white">Smart Scale &amp; Wearables:</strong> Capture 14-day rolling averages for <strong className="text-amber-300">Visceral Fat Rating (1–12 scale)</strong>, <strong className="text-amber-300">Skeletal Muscle Mass %</strong>, <strong className="text-amber-300">Nocturnal HRV (ms)</strong>, and <strong className="text-amber-300">Resting Heart Rate (bpm)</strong>.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Need diagnostic strips or smart scales?</span>
              <Link
                to="/store"
                className="text-amber-300 hover:text-amber-200 font-bold uppercase tracking-wider underline"
              >
                Browse Hardware Store ➔
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. STAGE 2: INTERACTIVE TELEMETRY LOGGING FORM                            */}
      {/* ========================================================================= */}
      <section id="interactive-form" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="no-print flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-xs shrink-0">
              02
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-400 tracking-widest font-bold block">
                STAGE 2 OF 3 • 100% LOCAL BROWSER AUTO-SAVE
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
                Stage 2: Interactive Telemetry Logging Form
              </h2>
            </div>
          </div>
          <a
            href="#stage-3-export"
            className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold uppercase tracking-wider text-xs transition"
          >
            Jump to Stage 3 Export ↓
          </a>
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

          {/* ----------------------------------------------------------------- */}
          {/* STAGE 2 INTERACTIVE QUESTION SEQUENCE (Q1 -> Q2 -> Q3)             */}
          {/* ----------------------------------------------------------------- */}
          <div className="no-print mt-4 space-y-4">

            {/* =============================================================== */}
            {/* QUESTION 1 (Blood Panel Toggle)                                 */}
            {/* =============================================================== */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-sky-500/50 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold flex items-center justify-center text-sm font-mono">
                    Q1
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-display font-black uppercase text-white tracking-wide">
                      Which blood panel did you complete?
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Toggle reveals only the relevant biomarker input fields for your chosen test tier
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold bg-slate-800 text-sky-300 border border-sky-500/30">
                    {bloodPanelTierFilter === 'basic' ? 'Choice A: Essential Baseline' : bloodPanelTierFilter === 'complete' ? 'Choice B: Vital Check 56' : 'All Fields Visible'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Choice A Card */}
                <div
                  onClick={() => setBloodPanelTierFilter('basic')}
                  className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    bloodPanelTierFilter === 'basic'
                      ? 'bg-emerald-950/60 border-emerald-400 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    id="blood-choice-a"
                    name="bloodPanelSelectorTop"
                    checked={bloodPanelTierFilter === 'basic'}
                    onChange={() => setBloodPanelTierFilter('basic')}
                    className="mt-1 w-4 h-4 text-emerald-500 accent-emerald-500 shrink-0 cursor-pointer"
                  />
                  <label htmlFor="blood-choice-a" className="space-y-1.5 cursor-pointer flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-tight">
                        Choice A: Essential Baseline
                      </span>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Core Lipids, HbA1c, Fasting Glucose
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Core lipids (Cholesterol, HDL, LDL, Triglycerides), Fasting Glucose, HbA1c (90-day glycemic trend), and basic kidney/liver filtration.
                    </p>
                  </label>
                </div>

                {/* Choice B Card */}
                <div
                  onClick={() => setBloodPanelTierFilter('complete')}
                  className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    bloodPanelTierFilter === 'complete'
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    id="blood-choice-b"
                    name="bloodPanelSelectorTop"
                    checked={bloodPanelTierFilter === 'complete'}
                    onChange={() => setBloodPanelTierFilter('complete')}
                    className="mt-1 w-4 h-4 text-cyan-500 accent-cyan-500 shrink-0 cursor-pointer"
                  />
                  <label htmlFor="blood-choice-b" className="space-y-1.5 cursor-pointer flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-tight">
                        Choice B: Vital Check 56
                      </span>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Full 56-Biomarker Panel
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Gold-standard 56-biomarker panel including ApoB, hs-CRP, Thyroid panel, Vitamin D3, Ferritin, and full Sex Hormones.
                    </p>
                  </label>
                </div>
              </div>

              {/* Dynamic Blood Inputs Expansion inside Q1 */}
              <div className="pt-2 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-300 font-bold">
                    {bloodPanelTierFilter === 'basic'
                      ? '🩸 Enter Choice A (Essential Baseline) Blood Numbers:'
                      : '🩸 Enter Choice B (LOLA Vital Check 56 / Quest 56) Blood Numbers:'}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    Automated Lab Telemetry ➔ GP Template
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                  Aligned directly with <strong>LOLA Vital Check 56</strong> (UK) &amp; Quest Diagnostics (US) digital lab reports. Entered values automatically populate into the printable GP Consultation Template below.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Core Lipids (Chol/LDL/Trig)</label>
                    <input
                      type="text"
                      value={bloodResults.lipidProfile.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, lipidProfile: { ...bloodResults.lipidProfile, result: e.target.value } })}
                      placeholder="e.g. Chol 185, LDL 92"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">HbA1c (% or mmol/mol)</label>
                    <input
                      type="text"
                      value={bloodResults.hba1c.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, hba1c: { ...bloodResults.hba1c, result: e.target.value } })}
                      placeholder="e.g. 5.2% (33 mmol/mol)"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Fasting Glucose</label>
                    <input
                      type="text"
                      value={bloodResults.fastingGlucose.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, fastingGlucose: { ...bloodResults.fastingGlucose, result: e.target.value } })}
                      placeholder="e.g. 84 mg/dL (4.7 mmol/L)"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">Kidney &amp; Liver (eGFR/ALT)</label>
                    <input
                      type="text"
                      value={bloodResults.liverKidney.result}
                      onChange={(e) => setBloodResults({ ...bloodResults, liverKidney: { ...bloodResults.liverKidney, result: e.target.value } })}
                      placeholder="e.g. eGFR >90, ALT 21"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                    />
                  </div>
                </div>

                {(bloodPanelTierFilter === 'complete' || bloodPanelTierFilter === 'all') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-cyan-300 font-bold">ApoB (mg/dL or g/L)</label>
                      <input
                        type="text"
                        value={bloodResults.apob.result}
                        onChange={(e) => setBloodResults({ ...bloodResults, apob: { ...bloodResults.apob, result: e.target.value } })}
                        placeholder="e.g. 68 mg/dL (0.68 g/L)"
                        className="w-full bg-slate-900 border border-cyan-500/40 focus:border-cyan-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-cyan-300 font-bold">hs-CRP (mg/L)</label>
                      <input
                        type="text"
                        value={bloodResults.hscrp.result}
                        onChange={(e) => setBloodResults({ ...bloodResults, hscrp: { ...bloodResults.hscrp, result: e.target.value } })}
                        placeholder="e.g. 0.4 mg/L"
                        className="w-full bg-slate-900 border border-cyan-500/40 focus:border-cyan-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-cyan-300 font-bold">Thyroid &amp; Hormones (TSH/T4)</label>
                      <input
                        type="text"
                        value={bloodResults.thyroidHormones.result}
                        onChange={(e) => setBloodResults({ ...bloodResults, thyroidHormones: { ...bloodResults.thyroidHormones, result: e.target.value } })}
                        placeholder="e.g. TSH 1.4 mIU/L"
                        className="w-full bg-slate-900 border border-cyan-500/40 focus:border-cyan-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-cyan-300 font-bold">Vit D, B12 &amp; Ferritin</label>
                      <input
                        type="text"
                        value={bloodResults.micronutrients.result}
                        onChange={(e) => setBloodResults({ ...bloodResults, micronutrients: { ...bloodResults.micronutrients, result: e.target.value } })}
                        placeholder="e.g. Vit D 58, B12 680"
                        className="w-full bg-slate-900 border border-cyan-500/40 focus:border-cyan-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* =============================================================== */}
            {/* QUESTION 2 (Urine Diagnostic Toggle)                            */}
            {/* =============================================================== */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-teal-500/50 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold flex items-center justify-center text-sm font-mono">
                    Q2
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-display font-black uppercase text-white tracking-wide">
                      Which urine test did you complete?
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Expands input fields for ACR ratio (mg/mmol) or Dipstick pH/Hydration accordingly
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold bg-slate-800 text-teal-300 border border-teal-500/30 self-start sm:self-center">
                  {urineDiagnosticOption === 'both'
                    ? 'Both (Lab ACR + Weekly Dipsticks)'
                    : urineDiagnosticOption === 'lab_acr'
                      ? 'Scheduled Lab ACR'
                      : urineDiagnosticOption === 'weekly_dipstick'
                        ? 'Weekly Home Dipstick'
                        : 'None yet'}
                </span>
              </div>

              {/* 4 Urine Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                {[
                  {
                    id: 'lab_acr' as const,
                    label: 'Scheduled Lab ACR',
                    sub: 'Same visit as blood draw',
                  },
                  {
                    id: 'weekly_dipstick' as const,
                    label: 'Weekly Home Dipstick',
                    sub: '60-sec Sunday strip',
                  },
                  {
                    id: 'both' as const,
                    label: 'Both',
                    sub: 'Lab ACR + Home Dipstick',
                  },
                  {
                    id: 'none' as const,
                    label: 'None yet',
                    sub: 'Skip urine inputs',
                  },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setUrineDiagnosticOption(opt.id)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                      urineDiagnosticOption === opt.id
                        ? 'bg-teal-950/60 border-teal-400 shadow-md ring-1 ring-teal-400/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-teal-500/40 hover:bg-slate-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urineDiagnosticSelector"
                      checked={urineDiagnosticOption === opt.id}
                      onChange={() => setUrineDiagnosticOption(opt.id)}
                      className="mt-0.5 w-4 h-4 text-teal-400 accent-teal-400 shrink-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block leading-snug">
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {opt.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Expansion: Scheduled Lab ACR Fields */}
              {(urineDiagnosticOption === 'lab_acr' || urineDiagnosticOption === 'both') && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-300 font-bold">
                    🧪 Scheduled Lab Urine ACR Fields (Completed During Blood Draw Visit):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-sky-300 font-bold">
                        ACR Ratio (mg/mmol or mg/g)
                      </label>
                      <input
                        type="text"
                        value={urinalysisData.labAcr.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labAcr: { ...urinalysisData.labAcr, result: e.target.value } })}
                        placeholder="e.g. 1.2 mg/mmol (< 3.0)"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-sky-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-sky-300 font-bold">
                        Microalbumin (mg/L)
                      </label>
                      <input
                        type="text"
                        value={urinalysisData.labMicroalbumin.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labMicroalbumin: { ...urinalysisData.labMicroalbumin, result: e.target.value } })}
                        placeholder="e.g. < 20 mg/L (Negative)"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-sky-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-sky-300 font-bold">
                        Creatinine (mmol/L)
                      </label>
                      <input
                        type="text"
                        value={urinalysisData.labCreatinine.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, labCreatinine: { ...urinalysisData.labCreatinine, result: e.target.value } })}
                        placeholder="e.g. 8.5 mmol/L"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-sky-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Expansion: Weekly Home Dipstick Fields */}
              {(urineDiagnosticOption === 'weekly_dipstick' || urineDiagnosticOption === 'both') && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-teal-300 font-bold">
                    💧 Weekly Home Dipstick Fields (pH, Hydration / Specific Gravity, Ketones, Protein):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-teal-300 font-bold">
                        Dipstick pH (Target 6.0–7.5)
                      </label>
                      <input
                        type="text"
                        value={urinalysisData.homePh.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homePh: { ...urinalysisData.homePh, result: e.target.value } })}
                        placeholder="e.g. 6.8"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-teal-300 font-bold">
                        Hydration / Specific Gravity
                      </label>
                      <input
                        type="text"
                        value={urinalysisData.homeSg.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeSg: { ...urinalysisData.homeSg, result: e.target.value } })}
                        placeholder="e.g. 1.015"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-teal-300 font-bold">
                        Ketones
                      </label>
                      <input
                        type="text"
                        value={urinalysisData.homeKetones.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeKetones: { ...urinalysisData.homeKetones, result: e.target.value } })}
                        placeholder="e.g. Negative / Trace"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-teal-300 font-bold">
                        Protein
                      </label>
                      <input
                        type="text"
                        value={urinalysisData.homeProtein.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeProtein: { ...urinalysisData.homeProtein, result: e.target.value } })}
                        placeholder="e.g. Negative"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =============================================================== */}
            {/* QUESTION 3 (Hardware Telemetry)                                 */}
            {/* =============================================================== */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/50 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center text-sm font-mono">
                    Q3
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-display font-black uppercase text-white tracking-wide">
                      14-Day Hardware Telemetry
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Enter your smart scale body composition and wearable autonomic recovery averages
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold bg-slate-800 text-amber-300 border border-amber-500/30 self-start sm:self-center">
                  Smart Scale + Wearable Sync
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-amber-300 font-bold">
                    Visceral Fat Rating (1–12)
                  </label>
                  <input
                    type="text"
                    value={bodyComposition.visceralFatRating}
                    onChange={(e) => setBodyComposition({ ...bodyComposition, visceralFatRating: e.target.value })}
                    placeholder="e.g. 5 (Target ≤ 9)"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-amber-300 font-bold">
                    Skeletal Muscle %
                  </label>
                  <input
                    type="text"
                    value={bodyComposition.skeletalMuscleMass}
                    onChange={(e) => setBodyComposition({ ...bodyComposition, skeletalMuscleMass: e.target.value })}
                    placeholder="e.g. 41.5%"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-amber-300 font-bold">
                    Nocturnal HRV (ms)
                  </label>
                  <input
                    type="text"
                    value={summaryVitals[1]?.average || ''}
                    onChange={(e) => updateSummaryVitals(1, 'average', e.target.value)}
                    placeholder="e.g. 58 ms"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-amber-300 font-bold">
                    Resting HR (bpm)
                  </label>
                  <input
                    type="text"
                    value={summaryVitals[0]?.average || ''}
                    onChange={(e) => updateSummaryVitals(0, 'average', e.target.value)}
                    placeholder="e.g. 54 bpm"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1">
                  <label className="block text-[10px] font-mono uppercase text-amber-300 font-bold">
                    Sleep Efficiency %
                  </label>
                  <input
                    type="text"
                    value={summaryVitals[3]?.average || ''}
                    onChange={(e) => updateSummaryVitals(3, 'average', e.target.value)}
                    placeholder="e.g. 88% / 7.5 hrs"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

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
          {/* SECTION 2: 14-Day Wearable & Body Composition Telemetry Log       */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-6 space-y-4">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 2: 14-DAY WEARABLE &amp; BODY COMPOSITION TELEMETRY (HOME BIOSENSORS)
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">14-Night Rolling Averages &amp; BIA</span>
            </div>

            {/* Dedicated Body Composition & Hardware Telemetry Quick Controls */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-1.5">
                  <Activity size={14} className="text-cyan-600" />
                  <span>Body Composition &amp; Hardware Telemetry Controls</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Syncs directly with Section 2 Consultation Vector PDF
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                {/* 1. Visceral Fat Rating Dropdown */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    Visceral Fat Level (1–12):
                  </label>
                  <select
                    value={bodyComposition.visceralFatRating}
                    onChange={(e) => setBodyComposition({ ...bodyComposition, visceralFatRating: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-medium outline-none focus:border-cyan-500"
                  >
                    <option value="">— Select Level —</option>
                    <option value="1">Level 1 (Optimal Youth)</option>
                    <option value="2">Level 2 (Optimal Youth)</option>
                    <option value="3">Level 3 (Optimal Youth)</option>
                    <option value="4">Level 4 (Optimal Youth)</option>
                    <option value="5">Level 5 (Early Warning)</option>
                    <option value="6">Level 6 (Early Warning)</option>
                    <option value="7">Level 7 (Early Warning)</option>
                    <option value="8">Level 8 (Early Warning)</option>
                    <option value="9">Level 9 (High Endocrine Risk)</option>
                    <option value="10">Level 10 (High Endocrine Risk)</option>
                    <option value="11">Level 11 (High Endocrine Risk)</option>
                    <option value="12">Level 12 (High Endocrine Risk)</option>
                  </select>
                </div>

                {/* 2. Body Fat % */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    Body Fat Percentage (%):
                  </label>
                  <input
                    type="text"
                    value={bodyComposition.bodyFatPct}
                    onChange={(e) => setBodyComposition({ ...bodyComposition, bodyFatPct: e.target.value })}
                    placeholder="e.g. 17.5"
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono outline-none focus:border-cyan-500"
                  />
                </div>

                {/* 3. Skeletal Muscle Mass % */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    Skeletal Muscle Mass (%):
                  </label>
                  <input
                    type="text"
                    value={bodyComposition.skeletalMuscleMass}
                    onChange={(e) => setBodyComposition({ ...bodyComposition, skeletalMuscleMass: e.target.value })}
                    placeholder="e.g. 36.8"
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono outline-none focus:border-cyan-500"
                  />
                </div>

                {/* 4. 14-Day Resting HR Average */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    14-Day Resting HR (bpm):
                  </label>
                  <input
                    type="text"
                    value={summaryVitals[0]?.average || ''}
                    onChange={(e) => updateSummaryVitals(0, 'average', e.target.value)}
                    placeholder="e.g. 54"
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono outline-none focus:border-cyan-500"
                  />
                </div>

                {/* 5. 14-Day Nocturnal HRV Average */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    14-Day Nocturnal HRV (ms):
                  </label>
                  <input
                    type="text"
                    value={summaryVitals[1]?.average || ''}
                    onChange={(e) => updateSummaryVitals(1, 'average', e.target.value)}
                    placeholder="e.g. 68"
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
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

                {/* Bioimpedance Rows */}
                <tr className="h-8 hover:bg-slate-50">
                  <td className="p-2 font-sans font-medium text-slate-900 border-r border-slate-300">
                    Visceral Fat Rating <span className="text-slate-500 text-[10px]">(Level 1–12)</span>
                  </td>
                  <td className="p-1 border-r border-slate-300 text-center font-mono font-bold text-slate-800">
                    {bodyComposition.visceralFatRating ? `Rating ${bodyComposition.visceralFatRating}` : '—'}
                  </td>
                  <td className="p-1 border-r border-slate-300 text-center text-slate-400">—</td>
                  <td className="p-1 border-r border-slate-300 text-center text-slate-400">—</td>
                  <td className="p-1 text-[11px] font-sans text-slate-700">
                    {bodyComposition.visceralFatRating
                      ? Number(bodyComposition.visceralFatRating) <= 4
                        ? 'Optimal (Level 1–4)'
                        : Number(bodyComposition.visceralFatRating) <= 8
                        ? 'Warning (Level 5–8)'
                        : 'High Risk (Level 9–12)'
                      : 'Target: Level 1–4'}
                  </td>
                </tr>

                <tr className="h-8 hover:bg-slate-50">
                  <td className="p-2 font-sans font-medium text-slate-900 border-r border-slate-300">
                    Body Fat Percentage <span className="text-slate-500 text-[10px]">(%)</span>
                  </td>
                  <td className="p-1 border-r border-slate-300 text-center font-mono font-bold text-slate-800">
                    {bodyComposition.bodyFatPct ? `${bodyComposition.bodyFatPct}%` : '—'}
                  </td>
                  <td className="p-1 border-r border-slate-300 text-center text-slate-400">—</td>
                  <td className="p-1 border-r border-slate-300 text-center text-slate-400">—</td>
                  <td className="p-1 text-[11px] font-sans text-slate-700">
                    Target: M 10–20% • F 18–28%
                  </td>
                </tr>

                <tr className="h-8 hover:bg-slate-50">
                  <td className="p-2 font-sans font-medium text-slate-900 border-r border-slate-300">
                    Skeletal Muscle Mass <span className="text-slate-500 text-[10px]">(%)</span>
                  </td>
                  <td className="p-1 border-r border-slate-300 text-center font-mono font-bold text-slate-800">
                    {bodyComposition.skeletalMuscleMass ? `${bodyComposition.skeletalMuscleMass}%` : '—'}
                  </td>
                  <td className="p-1 border-r border-slate-300 text-center text-slate-400">—</td>
                  <td className="p-1 border-r border-slate-300 text-center text-slate-400">—</td>
                  <td className="p-1 text-[11px] font-sans text-slate-700">
                    Sarcopenia Guard: M &gt;33% • F &gt;28%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 3: Lab Visit Results (Blood + Urine ACR)                  */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-6 space-y-2.5">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 3: LAB VISIT RESULTS (BLOOD + URINE ACR)
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Synchronized Blood &amp; Renal Pathology</span>
            </div>

            {/* Regional Affiliate Links & Lab Urinalysis Coordination Reminder (Screen-Only) */}
            <div className="no-print p-3 rounded-xl bg-sky-950/10 border border-sky-600/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-slate-900">🩸 Synchronized Lab Visit:</strong> Request your clinical <strong>Urine ACR (Microalbumin)</strong> test during the exact same lab visit as your blood draw.
              </div>
              <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                <a
                  href="https://referrals.lolahealth.com/NextLevel15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold transition shadow-xs"
                >
                  <span>🇬🇧 UK: LOLA Health</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href="https://www.healthlabs.com/?affiliate=123znl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-700 hover:bg-cyan-600 text-white text-[10px] font-bold transition shadow-xs"
                >
                  <span>🇺🇸 US: HealthLabs</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href="https://www.melio.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold transition shadow-xs"
                >
                  <span>🇪🇸 ES: SaludOnNet / Melio</span>
                  <ExternalLink size={10} />
                </a>
              </div>
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

            {/* Interactive Tier Filter Controls (Screen-Only) */}
            <div className="no-print flex flex-wrap items-center justify-between gap-2 bg-slate-100 p-2.5 rounded-xl border border-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-800">
                  Active Panel Filter:
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-slate-200 text-slate-700">
                  {bloodPanelTierFilter === 'basic' ? 'Choice A: Essential Baseline Panel' : bloodPanelTierFilter === 'complete' ? 'Choice B: Comprehensive Vital Check 56' : 'All Biomarkers (9)'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setBloodPanelTierFilter('basic')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    bloodPanelTierFilter === 'basic'
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40'
                      : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-300" />
                  <span>Choice A: Essential Baseline Panel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBloodPanelTierFilter('complete')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    bloodPanelTierFilter === 'complete'
                      ? 'bg-cyan-700 text-white shadow-sm ring-2 ring-cyan-400/40'
                      : 'bg-white text-cyan-900 border border-cyan-300 hover:bg-cyan-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-300" />
                  <span>Choice B: Comprehensive Vital Check 56 Panel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBloodPanelTierFilter('all')}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    bloodPanelTierFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  All (9)
                </button>
              </div>
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
                {/* CHOICE A: ESSENTIAL BASELINE BLOOD PANEL (CORE TIER) */}
                {(bloodPanelTierFilter === 'all' || bloodPanelTierFilter === 'basic' || bloodPanelTierFilter === 'complete') && (
                  <>
                    <tr className="bg-emerald-50/80 border-t-2 border-emerald-400">
                      <td colSpan={4} className="p-1.5 px-2 text-[11px] font-bold text-emerald-950 uppercase tracking-wide flex items-center justify-between">
                        <span>CHOICE A: Essential Baseline Panel (Core 4 Biomarkers)</span>
                        <span className="bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                          Core Baseline
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                        <strong>Core Lipid Profile</strong> - Total Chol, HDL, LDL, Triglycerides
                      </td>
                      <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                        Chol &lt; 200, LDL &lt; 100, Trig &lt; 100 mg/dL
                      </td>
                      <td className="p-1 border-r border-slate-300">
                        <input 
                          type="text"
                          value={bloodResults.lipidProfile.result}
                          onChange={(e) => setBloodResults({ ...bloodResults, lipidProfile: { ...bloodResults.lipidProfile, result: e.target.value } })}
                          placeholder="e.g. Total 185, LDL 92"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                        />
                      </td>
                      <td className="p-1">
                        <input 
                          type="text"
                          value={bloodResults.lipidProfile.action}
                          onChange={(e) => setBloodResults({ ...bloodResults, lipidProfile: { ...bloodResults.lipidProfile, action: e.target.value } })}
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                        <strong>Fasting Blood Glucose</strong> - Acute glycemic regulation
                      </td>
                      <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                        &lt; 85 - 90 mg/dL (&lt; 4.7 - 5.0 mmol/L)
                      </td>
                      <td className="p-1 border-r border-slate-300">
                        <input 
                          type="text"
                          value={bloodResults.fastingGlucose.result}
                          onChange={(e) => setBloodResults({ ...bloodResults, fastingGlucose: { ...bloodResults.fastingGlucose, result: e.target.value } })}
                          placeholder="e.g. 84 mg/dL"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                        />
                      </td>
                      <td className="p-1">
                        <input 
                          type="text"
                          value={bloodResults.fastingGlucose.action}
                          onChange={(e) => setBloodResults({ ...bloodResults, fastingGlucose: { ...bloodResults.fastingGlucose, action: e.target.value } })}
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
                        <strong>Basic Kidney &amp; Liver Markers</strong> - ALT, AST, eGFR, Creatinine
                      </td>
                      <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                        ALT &lt; 30 U/L, eGFR &gt; 90 mL/min
                      </td>
                      <td className="p-1 border-r border-slate-300">
                        <input 
                          type="text"
                          value={bloodResults.liverKidney.result}
                          onChange={(e) => setBloodResults({ ...bloodResults, liverKidney: { ...bloodResults.liverKidney, result: e.target.value } })}
                          placeholder="e.g. eGFR 102, ALT 22"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                        />
                      </td>
                      <td className="p-1">
                        <input 
                          type="text"
                          value={bloodResults.liverKidney.action}
                          onChange={(e) => setBloodResults({ ...bloodResults, liverKidney: { ...bloodResults.liverKidney, action: e.target.value } })}
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                        />
                      </td>
                    </tr>
                  </>
                )}

                {/* DYNAMIC COLLAPSED NOTICE WHEN CHOICE A IS ACTIVE */}
                {bloodPanelTierFilter === 'basic' && (
                  <tr className="bg-slate-50 border-t border-dashed border-slate-300 no-print">
                    <td colSpan={4} className="p-3 text-center text-slate-500 text-[11px] font-sans">
                      <span className="font-medium text-slate-600">Choice B (Comprehensive Vital Check 56) fields collapsed so you aren't confused by empty fields.</span>
                      <button
                        type="button"
                        onClick={() => setBloodPanelTierFilter('complete')}
                        className="text-cyan-700 hover:text-cyan-900 font-bold underline ml-2 cursor-pointer"
                      >
                        Switch to Choice B to Expand 56-Biomarker Inputs (ApoB, hs-CRP, Thyroid, Micronutrients) ➔
                      </button>
                    </td>
                  </tr>
                )}

                {/* CHOICE B: COMPREHENSIVE CELLULAR BIOMARKER MAP (COMPLETE TIER) */}
                {(bloodPanelTierFilter === 'all' || bloodPanelTierFilter === 'complete') && (
                  <>
                    <tr className="bg-cyan-50/80 border-t-2 border-cyan-400">
                      <td colSpan={4} className="p-1.5 px-2 text-[11px] font-bold text-cyan-950 uppercase tracking-wide flex items-center justify-between">
                        <span>CHOICE B: LOLA Vital Check 56 / 56-Biomarker Master Panel (GMC Doctor Reviewed)</span>
                        <span className="bg-cyan-600 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                          Full 56-Biomarker Map
                        </span>
                      </td>
                    </tr>

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
                        <strong>Thyroid &amp; Hormones</strong> - TSH, Free T3/T4, Endocrine cascade
                      </td>
                      <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                        TSH 1.0 - 2.0 mIU/L, Optimal Free T4
                      </td>
                      <td className="p-1 border-r border-slate-300">
                        <input 
                          type="text"
                          value={bloodResults.thyroidHormones.result}
                          onChange={(e) => setBloodResults({ ...bloodResults, thyroidHormones: { ...bloodResults.thyroidHormones, result: e.target.value } })}
                          placeholder="e.g. TSH 1.4 mIU/L"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                        />
                      </td>
                      <td className="p-1">
                        <input 
                          type="text"
                          value={bloodResults.thyroidHormones.action}
                          onChange={(e) => setBloodResults({ ...bloodResults, thyroidHormones: { ...bloodResults.thyroidHormones, action: e.target.value } })}
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                        <strong>Micronutrient Reserve</strong> - Vitamin D, B12, Serum Ferritin
                      </td>
                      <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                        Vit D &gt; 50 ng/mL, B12 &gt; 500 pg/mL
                      </td>
                      <td className="p-1 border-r border-slate-300">
                        <input 
                          type="text"
                          value={bloodResults.micronutrients.result}
                          onChange={(e) => setBloodResults({ ...bloodResults, micronutrients: { ...bloodResults.micronutrients, result: e.target.value } })}
                          placeholder="e.g. Vit D 58, B12 680"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                        />
                      </td>
                      <td className="p-1">
                        <input 
                          type="text"
                          value={bloodResults.micronutrients.action}
                          onChange={(e) => setBloodResults({ ...bloodResults, micronutrients: { ...bloodResults.micronutrients, action: e.target.value } })}
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
                  </>
                )}

                {/* SYNCHRONIZED LABORATORY URINALYSIS (COLLECTED AT SAME LAB VISIT AS BLOOD DRAW) */}
                {(urineDiagnosticOption === 'lab_acr' || urineDiagnosticOption === 'both') && (
                  <>
                    <tr className="bg-sky-50/90 border-t-2 border-sky-400">
                      <td colSpan={4} className="p-1.5 px-2 text-[11px] font-bold text-sky-950 uppercase tracking-wide flex items-center justify-between">
                        <span>SYNCHRONIZED LAB URINALYSIS: Urine ACR, Microalbumin &amp; Creatinine (Collected at Same Lab Visit)</span>
                        <span className="bg-sky-600 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                          Same-Visit Urine Sample
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                        <strong>Microalbumin (mg/L)</strong> - Renal endothelial barrier integrity
                      </td>
                      <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                        Negative / &lt; 20 mg/L
                      </td>
                      <td className="p-1 border-r border-slate-300">
                        <input 
                          type="text"
                          value={urinalysisData.labMicroalbumin.result}
                          onChange={(e) => setUrinalysisData({ ...urinalysisData, labMicroalbumin: { ...urinalysisData.labMicroalbumin, result: e.target.value } })}
                          placeholder="e.g. Negative / < 20 mg/L"
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
                        <strong>Creatinine (mmol/L)</strong> - Urinary concentration &amp; filtration reference
                      </td>
                      <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                        Normal Creatinine / Clear Sediment
                      </td>
                      <td className="p-1 border-r border-slate-300">
                        <input 
                          type="text"
                          value={urinalysisData.labCreatinine.result}
                          onChange={(e) => setUrinalysisData({ ...urinalysisData, labCreatinine: { ...urinalysisData.labCreatinine, result: e.target.value } })}
                          placeholder="e.g. 8.5 mmol/L"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                        />
                      </td>
                      <td className="p-1">
                        <input 
                          type="text"
                          value={urinalysisData.labCreatinine.remarks}
                          onChange={(e) => setUrinalysisData({ ...urinalysisData, labCreatinine: { ...urinalysisData.labCreatinine, remarks: e.target.value } })}
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="p-2 text-slate-900 font-medium border-r border-slate-300">
                        <strong>Albumin-to-Creatinine Ratio (ACR)</strong> - Early microvascular &amp; glomerular filter check
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
                  </>
                )}
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
          {/* SECTION 4: Weekly Home Dipstick Telemetry                         */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-5 space-y-4">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider">
                SECTION 4: WEEKLY AT-HOME 10-PARAMETER DIPSTICK TELEMETRY (HYDRATION &amp; PH)
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">Weekly Home Strip Log</span>
            </div>

            {/* Form Entry A: Weekly At-Home 10-Parameter Dipstick Log */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  Weekly Sunday 60-Second 10-Parameter Dipstick Log (pH, Specific Gravity, Ketones)
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
                      <strong>Protein &amp; Microvascular Dipstick Status</strong> (Prot, Leuk, Nit, Blood, Gluc, Urob, Bili)
                    </td>
                    <td className="p-2 font-bold text-cyan-800 border-r border-slate-300">
                      Negative / Normal
                    </td>
                    <td className="p-1 border-r border-slate-300">
                      <input 
                        type="text"
                        value={urinalysisData.homeProtein.result}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeProtein: { ...urinalysisData.homeProtein, result: e.target.value } })}
                        placeholder="e.g. Negative"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="p-1">
                      <input 
                        type="text"
                        value={urinalysisData.homeProtein.remarks}
                        onChange={(e) => setUrinalysisData({ ...urinalysisData, homeProtein: { ...urinalysisData.homeProtein, remarks: e.target.value } })}
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
      {/* 4. STAGE 3: EXPORT YOUR 2-PAGE GP CONSULTATION BRIEF                      */}
      {/* ========================================================================= */}
      <section id="stage-3-export" className="no-print max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono font-bold flex items-center justify-center text-xs shrink-0">
            03
          </span>
          <div>
            <span className="text-[11px] font-mono uppercase text-teal-400 tracking-widest font-bold block">
              STAGE 3 OF 3 • DOCTOR CONSULTATION OUTPUT
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-tight">
              Stage 3: Export Your 2-Page GP Consultation Brief
            </h2>
          </div>
        </div>

        {/* Export Generator Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-teal-500/40 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-display uppercase tracking-tight text-white font-black">
              Generate or Download Your 2-Page GP Brief
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Map all entered blood, urine, and 14-day hardware telemetry directly into <code className="text-teal-300">clinical-baseline-consultation-template-v2.pdf</code>, or download a blank printable version for pen-and-paper completion.
            </p>
          </div>

          {/* Primary & Secondary Export Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* PRIMARY ACTION: Generate Pre-Filled 2-Page GP Brief (PDF) */}
            <button
              type="button"
              onClick={handleExportCompletedPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:via-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-75"
            >
              <FileDown size={18} />
              <span>Generate Pre-Filled 2-Page GP Brief (PDF)</span>
            </button>

            {/* SECONDARY ACTION: Download Blank Pen-and-Paper Template */}
            <a
              href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="clinical-baseline-consultation-template-v2.pdf"
              onClick={handleDownloadBlank}
              className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <FileText size={17} />
              <span>Download Blank Pen-and-Paper Template</span>
            </a>

            {/* Educational Workbook Reference */}
            <a
              href="/assets/docs/the-next-level-lifespan-2026.pdf?v=2026-revised"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-slate-700 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <BookOpen size={16} className="text-cyan-400" />
              <span>Read Educational Workbook (PDF)</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>

          {/* CLINICAL APPOINTMENT GUIDANCE CONTAINER (Below Export Buttons) */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-950/90 border border-sky-500/30 space-y-3">
            <h4 className="text-sm sm:text-base font-display font-black text-sky-300 tracking-wide">
              🩺 How to Use Your Brief in Your 10-Minute Appointment:
            </h4>
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed list-decimal list-inside">
              <li>
                <strong className="text-white">Hand Page 1 to Your GP:</strong> Pass the printed summary to your doctor as soon as you sit down. It displays your standardized red-flag matrix, key lab averages, and main discussion points.
              </li>
              <li>
                <strong className="text-white">Keep Page 2 as Your Personal Checklist:</strong> Hold Page 2 during the visit—it lists your 14-day home telemetry trends (HRV, visceral fat, sleep) and personal notes.
              </li>
              <li>
                <strong className="text-white">Frame as Partnership:</strong> Start with:{' '}
                <em className="text-teal-300">
                  &apos;I&apos;ve logged my baseline health metrics so we can catch subtle shifts early and keep my long-term health on track.&apos;
                </em>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
