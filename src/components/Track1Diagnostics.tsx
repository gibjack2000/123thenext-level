import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Shield, Activity, Heart, Clock, Download, CheckCircle2, 
  Info, Lock, AlertTriangle, Droplet, RefreshCw, Calendar, FileText 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import UrinalysisInstructions from './UrinalysisInstructions';
import { useBloodPressure } from '../hooks/useBloodPressure';

// 1. DATA MODEL & SCHEMA
export interface UrinalysisReadings {
  glucose: 'Negative' | 'Trace' | 'Positive';
  ketones: 'Negative' | 'Trace' | 'Small' | 'Moderate' | 'Large';
  bilirubin: 'Negative' | 'Small' | 'Moderate' | 'Large';
  nitrite: 'Negative' | 'Positive';
  urobilinogen: '0.2' | '1.0' | '2.0' | '4.0' | '8.0';
  protein: 'Negative' | 'Trace' | 'Positive';
  ph: '5.0' | '6.0' | '6.5' | '7.0' | '8.0';
  blood: 'Negative' | 'Trace' | 'Positive';
  specific_gravity: '1.005' | '1.010' | '1.015' | '1.020' | '1.025' | '1.030';
  leukocytes: 'Negative' | 'Trace' | 'Positive';
}

export interface BloodworkReadings {
  apob: string; // ApoB (mg/dL)
  hba1c: string; // HbA1c (%)
  hscrp: string; // hs-CRP (mg/L)
}

// Initial/default optimal values
const DEFAULT_URINALYSIS: UrinalysisReadings = {
  glucose: 'Negative',
  ketones: 'Negative',
  bilirubin: 'Negative',
  nitrite: 'Negative',
  urobilinogen: '0.2',
  protein: 'Negative',
  ph: '6.5',
  blood: 'Negative',
  specific_gravity: '1.015',
  leukocytes: 'Negative',
};

const DEFAULT_BLOODWORK: BloodworkReadings = {
  apob: '75',
  hba1c: '5.1',
  hscrp: '0.8',
};

// Types & Config for each Urinalysis parameter
interface ParameterConfig {
  label: string;
  name: keyof UrinalysisReadings;
  options: string[];
  optimalValue: string;
  colors: Record<string, string>; // Hex colors for the virtual dipstick pad
  desc: string;
}

const URINALYSIS_CONFIG: Record<keyof UrinalysisReadings, ParameterConfig> = {
  glucose: {
    label: 'Glucose (GLU)',
    name: 'glucose',
    options: ['Negative', 'Trace', 'Positive'],
    optimalValue: 'Negative',
    colors: {
      Negative: '#0ea5e9', // Light blue
      Trace: '#10b981',    // Light green
      Positive: '#854d0e', // Brown
    },
    desc: 'Metabolic marker for glucose spills when blood concentration exceeds renal threshold.'
  },
  ketones: {
    label: 'Ketones (KET)',
    name: 'ketones',
    options: ['Negative', 'Trace', 'Small', 'Moderate', 'Large'],
    optimalValue: 'Negative',
    colors: {
      Negative: '#fed7aa', // Light buff
      Trace: '#fda4af',    // Light pink
      Small: '#f43f5e',    // Rose pink
      Moderate: '#db2777', // Magenta
      Large: '#701a75',    // Deep purple
    },
    desc: 'Indicates fat-burning velocity / glycogen depletion. Monitor for ketoacidosis in diabetics.'
  },
  bilirubin: {
    label: 'Bilirubin (BIL)',
    name: 'bilirubin',
    options: ['Negative', 'Small', 'Moderate', 'Large'],
    optimalValue: 'Negative',
    colors: {
      Negative: '#ffedd5', // Light cream
      Small: '#fed7aa',    // Peach orange
      Moderate: '#f97316', // Orange
      Large: '#c2410c',    // Red-brown
    },
    desc: 'Derived from red blood cell breakdown. Detectable levels signal potential liver or biliary duct issues.'
  },
  nitrite: {
    label: 'Nitrite (NIT)',
    name: 'nitrite',
    options: ['Negative', 'Positive'],
    optimalValue: 'Negative',
    colors: {
      Negative: '#f8fafc', // White
      Positive: '#f43f5e', // Hot pink
    },
    desc: 'Screens for presence of gram-negative bacteria, serving as an early indicator of urinary tract infection.'
  },
  urobilinogen: {
    label: 'Urobilinogen (URO)',
    name: 'urobilinogen',
    options: ['0.2', '1.0', '2.0', '4.0', '8.0'],
    optimalValue: '0.2',
    colors: {
      '0.2': '#fef08a', // Light yellow
      '1.0': '#fde047', // Warm yellow
      '2.0': '#facc15', // Gold
      '4.0': '#f59e0b', // Amber
      '8.0': '#d97706', // Dark amber/orange
    },
    desc: 'Evaluates liver function, red blood cell turnover rate, and biliary tract patency.'
  },
  protein: {
    label: 'Protein (PRO)',
    name: 'protein',
    options: ['Negative', 'Trace', 'Positive'],
    optimalValue: 'Negative',
    colors: {
      Negative: '#eab308', // Yellow
      Trace: '#84cc16',    // Chartreuse
      Positive: '#0891b2', // Teal-blue
    },
    desc: 'Screens for glomerular filtration barrier integrity. Persistent leakage suggests renal strain.'
  },
  ph: {
    label: 'pH Balance',
    name: 'ph',
    options: ['5.0', '6.0', '6.5', '7.0', '8.0'],
    optimalValue: '6.5',
    colors: {
      '5.0': '#f97316', // Orange
      '6.0': '#eab308', // Yellow-orange
      '6.5': '#84cc16', // Yellow-green
      '7.0': '#22c55e', // Green
      '8.0': '#0891b2', // Blue-green
    },
    desc: 'Urine acid-base status reflecting blood acid clearance, diet, and metabolic state.'
  },
  blood: {
    label: 'Blood (BLO)',
    name: 'blood',
    options: ['Negative', 'Trace', 'Positive'],
    optimalValue: 'Negative',
    colors: {
      Negative: '#f59e0b', // Gold yellow
      Trace: '#15803d',    // Green speckled (approx)
      Positive: '#0f172a', // Extremely dark blue-green
    },
    desc: 'Screens for micro-vascular blood leakage. Highly sensitive for renal stones, trauma, or infection.'
  },
  specific_gravity: {
    label: 'Specific Gravity (SG)',
    name: 'specific_gravity',
    options: ['1.005', '1.010', '1.015', '1.020', '1.025', '1.030'],
    optimalValue: '1.015',
    colors: {
      '1.005': '#1e3a8a', // Dark blue
      '1.010': '#0284c7', // Sky blue
      '1.015': '#0d9488', // Teal
      '1.020': '#16a34a', // Green
      '1.025': '#ca8a04', // Olive-yellow
      '1.030': '#d97706', // Orange
    },
    desc: 'Measures concentration of dissolved solutes to assess cellular hydration and renal concentrating capacity.'
  },
  leukocytes: {
    label: 'Leukocytes (LEU)',
    name: 'leukocytes',
    options: ['Negative', 'Trace', 'Positive'],
    optimalValue: 'Negative',
    colors: {
      Negative: '#f8fafc', // Off-white
      Trace: '#c084fc',    // Light lavender
      Positive: '#581c87', // Deep purple
    },
    desc: 'Detects white blood cells, indicating an active immune response or inflammatory process.'
  }
};

export default function Track1Diagnostics() {
  const [readings, setReadings] = useState<UrinalysisReadings>(DEFAULT_URINALYSIS);
  const [bloodwork, setBloodwork] = useState<BloodworkReadings>(DEFAULT_BLOODWORK);
  const [activeParam, setActiveParam] = useState<keyof UrinalysisReadings>('glucose');
  const [sessionId, setSessionId] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error' | 'local_cached'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // STAGE 1: Blood Pressure State & Custom Hook integration
  const { logs: bpLogs, loading: bpLoading, error: bpError, saveBPLog, fetchBPLogs, classifyBloodPressure } = useBloodPressure();
  const [bpInput, setBpInput] = useState({
    systolic: 120,
    diastolic: 80,
    pulse: 65,
    sleepHours: 7.5,
    hrvMs: 55,
    notes: ''
  });

  // Hydrate session ID from localStorage or generate a new one
  useEffect(() => {
    let id = localStorage.getItem('urinalysis_session_id');
    if (!id) {
      id = 'US-' + Math.random().toString(36).substring(2, 11).toUpperCase();
      localStorage.setItem('urinalysis_session_id', id);
    }
    setSessionId(id);
    
    // Load saved readings if they exist
    const saved = localStorage.getItem('urinalysis_readings');
    if (saved) {
      try {
        setReadings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cached readings:', e);
      }
    }

    const savedBlood = localStorage.getItem('bloodwork_readings');
    if (savedBlood) {
      try {
        setBloodwork(JSON.parse(savedBlood));
      } catch (e) {
        console.error('Failed to parse cached bloodwork:', e);
      }
    }

    const savedBPInput = localStorage.getItem('bp_input_cache');
    if (savedBPInput) {
      try {
        setBpInput(JSON.parse(savedBPInput));
      } catch (e) {
        console.error('Failed to parse cached BP inputs:', e);
      }
    }
  }, []);

  // Determine if a specific value is abnormal
  const isValueAbnormal = (param: keyof UrinalysisReadings, val: string): boolean => {
    if (param === 'ph') {
      return val === '5.0' || val === '8.0';
    }
    if (param === 'specific_gravity') {
      return val === '1.005' || val === '1.030';
    }
    if (param === 'urobilinogen') {
      return ['2.0', '4.0', '8.0'].includes(val);
    }
    return val !== 'Negative';
  };

  // Biological Pathway status computations
  const getPathwayStatus = (pathway: string) => {
    switch (pathway) {
      case 'glycemic': {
        const glAb = isValueAbnormal('glucose', readings.glucose);
        const ktAb = readings.ketones === 'Large' || readings.ketones === 'Moderate';
        if (glAb) return { state: 'alert', text: 'Impaired glycemic clearance detected. Core glycemic pathways under heavy workload.' };
        if (ktAb) return { state: 'warning', text: 'Elevated ketone levels indicating deep ketogenic fuel shift. Monitor hydration.' };
        return { state: 'optimal', text: 'Optimal metabolic flexibility. Stable glycemic baselines and normal lipid substrate utilization.' };
      }
      case 'renal': {
        const prAb = isValueAbnormal('protein', readings.protein);
        const sgAb = isValueAbnormal('specific_gravity', readings.specific_gravity);
        if (prAb) return { state: 'alert', text: 'Renal leakage detected (Proteinuria risk). Suggests glomerular filter under stress.' };
        if (sgAb) return { state: 'warning', text: readings.specific_gravity === '1.030' ? 'Systemic hydration depletion detected. Renal concentration active.' : 'Dilute solute profile. Elevated fluid load or low concentrating capacity.' };
        return { state: 'optimal', text: 'Glomerular filtration barrier intact. Fluid and electrolyte concentration ratios are well-regulated.' };
      }
      case 'immune': {
        const ntAb = isValueAbnormal('nitrite', readings.nitrite);
        const lkAb = isValueAbnormal('leukocytes', readings.leukocytes);
        if (ntAb && lkAb) return { state: 'alert', text: 'High alert: Concomitant Nitrites and Leukocytes detected. Strong signal of UTI.' };
        if (ntAb || lkAb) return { state: 'warning', text: 'Elevated leukocyte or nitrite counts. Early warning for localized genitourinary micro-inflammation.' };
        return { state: 'optimal', text: 'Sterile urinary tract. Immunological defensive parameters show zero active pathogen load.' };
      }
      case 'hepatic': {
        const bilAb = isValueAbnormal('bilirubin', readings.bilirubin);
        const uroAb = isValueAbnormal('urobilinogen', readings.urobilinogen);
        if (bilAb) return { state: 'alert', text: 'Abnormal Bilirubin clearance detected. Biliary drainage or liver recycling under review.' };
        if (uroAb) return { state: 'warning', text: 'Elevated Urobilinogen baseline. Suggests increased red cell turnover or liver congestion.' };
        return { state: 'optimal', text: 'Liver metabolic clearance and biliary enterohepatic recycling loops functioning optimally.' };
      }
      case 'ph_vascular': {
        const phAb = isValueAbnormal('ph', readings.ph);
        const blAb = isValueAbnormal('blood', readings.blood);
        if (blAb) return { state: 'alert', text: 'Hematuria detected (Trace/Positive blood). Suggests renal/vascular barrier micro-lesion.' };
        if (phAb) return { state: 'warning', text: readings.ph === '5.0' ? 'Acidotic drift (pH 5.0). Monitor purine metabolism and uric acid risk.' : 'Alkalotic drift (pH 8.0). Consider dietary shifting or urea-splitting bacteria.' };
        return { state: 'optimal', text: 'Acid-base clearing mechanisms in normal ranges. Micro-vascular boundaries fully intact.' };
      }
      default:
        return { state: 'optimal', text: 'Biological baseline functional.' };
    }
  };

  const handleParamSelect = (param: keyof UrinalysisReadings, value: string) => {
    const updated = { ...readings, [param]: value };
    setReadings(updated);
    localStorage.setItem('urinalysis_readings', JSON.stringify(updated));
  };

  const handleBloodworkChange = (marker: keyof BloodworkReadings, value: string) => {
    const updated = { ...bloodwork, [marker]: value };
    setBloodwork(updated);
    localStorage.setItem('bloodwork_readings', JSON.stringify(updated));
  };

  const handleBPInputChange = (field: string, val: any) => {
    const updated = { ...bpInput, [field]: val };
    setBpInput(updated);
    localStorage.setItem('bp_input_cache', JSON.stringify(updated));
  };

  const handleLogBP = async () => {
    const result = await saveBPLog(
      bpInput.systolic,
      bpInput.diastolic,
      bpInput.pulse,
      bpInput.sleepHours,
      bpInput.hrvMs,
      bpInput.notes
    );
    if (result) {
      setSaveStatus('success');
      setStatusMessage('Cardiovascular and telemetry log synced with Supabase.');
      setTimeout(() => setSaveStatus('idle'), 4000);
    } else if (bpError) {
      setSaveStatus('local_cached');
      setStatusMessage(`Log stored locally. (${bpError})`);
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  const handleSaveUrinalysis = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setStatusMessage('');

    try {
      if (!supabase) {
        setSaveStatus('local_cached');
        setStatusMessage('Supabase not configured. Urinalysis saved securely to local cache.');
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from('urinalysis_readings')
        .upsert({
          session_id: sessionId,
          glucose: readings.glucose,
          ketones: readings.ketones,
          bilirubin: readings.bilirubin,
          nitrite: readings.nitrite,
          urobilinogen: readings.urobilinogen,
          protein: readings.protein,
          ph: readings.ph,
          blood: readings.blood,
          specific_gravity: readings.specific_gravity,
          leukocytes: readings.leukocytes,
          updated_at: new Date().toISOString()
        }, { onConflict: 'session_id' });

      if (error) {
        console.error('Supabase save error:', error);
        setSaveStatus('local_cached');
        setStatusMessage('Supabase network error. Readings cached in secure local storage.');
      } else {
        setSaveStatus('success');
        setStatusMessage('Urinalysis baseline successfully synchronized with your encrypted cloud portal.');
      }
    } catch (err) {
      console.error('Network exception saving readings:', err);
      setSaveStatus('local_cached');
      setStatusMessage('Exception thrown. Readings saved locally.');
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  };

  // Compile GP Consultation template and trigger PDF download (Two-Page Layout)
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const rowHeight = 8;
    
    // ==========================================
    // PAGE 1: HEADER & BLOODWORK & CARDIOVASCULAR
    // ==========================================
    doc.setFillColor(15, 23, 42); // slate-900 background for header banner
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("LOLA DUAL-TRACK LONGEVITY ARCHITECTURE", 15, 16);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("GP CONSULTATION BRIEFING - CLINICAL BIOMARKERS REPORT", 15, 24);
    
    doc.setTextColor(148, 163, 184); // slate-400
    doc.setFontSize(8);
    doc.text(`PATIENT SESSION ID: ${sessionId}`, 15, 32);
    doc.text(`GENERATED: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 130, 32);
    
    // Introduction for the GP
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("TO THE CONSULTING PHYSICIAN:", 15, 52);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const introText = [
      "This document provides structured, patient-logged at-home biometric markers aligned with the Lola Longevity",
      "and Human Performance Framework. The metrics below contain self-logged 10-parameter urinalysis readings alongside",
      "the patient's current bloodwork biomarkers. These findings represent a baseline reference point to support",
      "shared decision-making regarding metabolic, hepatic, cardiovascular, and renal optimization strategies."
    ];
    doc.text(introText, 15, 58);
    
    // Section 1: Bloodwork Biomarkers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("1. METABOLIC & CARDIOVASCULAR BLOOD MARKERS", 15, 85);
    
    // Draw table headers
    doc.setFillColor(241, 245, 249); // light gray table header
    doc.rect(15, 90, 180, 8, 'F');
    doc.setDrawColor(203, 213, 225); // light gray border
    doc.line(15, 90, 195, 90);
    doc.line(15, 98, 195, 98);
    
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text("BIOMARKER PANEL", 18, 95);
    doc.text("PATIENT VALUE", 75, 95);
    doc.text("OPTIMAL REFERENCE RANGE", 115, 95);
    doc.text("STATUS", 175, 95);
    
    // Draw table rows
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    
    const checkBloodworkStatus = (marker: string, valStr: string) => {
      const val = parseFloat(valStr);
      if (isNaN(val)) return 'N/A';
      if (marker === 'apob') {
        return val < 80 ? 'Optimal' : val < 100 ? 'Borderline' : 'Elevated Risk';
      }
      if (marker === 'hba1c') {
        return val < 5.4 ? 'Optimal' : val < 5.7 ? 'Sub-Optimal' : 'Impaired';
      }
      if (marker === 'hscrp') {
        return val < 1.0 ? 'Optimal' : val < 2.0 ? 'Low-grade Inflam' : 'Elevated Inflam';
      }
      return 'Logged';
    };

    const bloodRows = [
      { name: "ApoB (Apolipoprotein B)", val: `${bloodwork.apob} mg/dL`, range: "< 80 mg/dL (Cardiovascular baseline)", status: checkBloodworkStatus('apob', bloodwork.apob) },
      { name: "HbA1c (Glycated Hemoglobin)", val: `${bloodwork.hba1c} %`, range: "4.0% - 5.3% (Insulin sensitivity)", status: checkBloodworkStatus('hba1c', bloodwork.hba1c) },
      { name: "hs-CRP (High-Sensitivity C-Reactive Protein)", val: `${bloodwork.hscrp} mg/L`, range: "< 1.0 mg/L (Systemic vascular inflammation)", status: checkBloodworkStatus('hscrp', bloodwork.hscrp) }
    ];
    
    bloodRows.forEach((r, i) => {
      const y = 98 + (i * rowHeight);
      doc.line(15, y + rowHeight, 195, y + rowHeight);
      doc.text(r.name, 18, y + 5.5);
      doc.text(r.val, 75, y + 5.5);
      doc.text(r.range, 115, y + 5.5);
      
      // Color code status in PDF
      if (r.status.includes('Optimal')) doc.setTextColor(22, 163, 74); // green
      else if (r.status.includes('Elevated') || r.status.includes('Impaired')) doc.setTextColor(220, 38, 38); // red
      else doc.setTextColor(217, 119, 6); // yellow
      doc.setFont('helvetica', 'bold');
      doc.text(r.status, 175, y + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
    });

    // Section 2: Cardiovascular & Arterial Tension Telemetry
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("2. CARDIOVASCULAR & ARTERIAL TENSION TELEMETRY", 15, 140);
    
    // Draw table headers for BP
    doc.setFillColor(241, 245, 249);
    doc.rect(15, 145, 180, 8, 'F');
    doc.line(15, 145, 195, 145);
    doc.line(15, 153, 195, 153);
    
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text("CARDIOVASCULAR TELEMETRY", 18, 150);
    doc.text("PATIENT VALUE", 75, 150);
    doc.text("CLINICAL THRESHOLDS", 115, 150);
    doc.text("STATUS", 175, 150);
    
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    
    const classification = classifyBloodPressure(bpInput.systolic, bpInput.diastolic);
    
    const bpRows = [
      { name: "Systolic Blood Pressure", val: `${bpInput.systolic} mmHg`, range: "Optimal <120 / Elevated 120-129 / High 130+", status: classification.status },
      { name: "Diastolic Blood Pressure", val: `${bpInput.diastolic} mmHg`, range: "Optimal <80 / Elevated <80 / High 80+", status: classification.status },
      { name: "Pulse (Resting Heart Rate)", val: `${bpInput.pulse} BPM`, range: "Optimal 60-80 BPM (Vagal baseline)", status: bpInput.pulse >= 55 && bpInput.pulse <= 75 ? "Optimal" : "Logged" },
      { name: "Sleep Duration (7-Day Avg)", val: `${bpInput.sleepHours} Hours`, range: "Optimal 7.0 - 9.0 Hours/night", status: bpInput.sleepHours >= 7.0 && bpInput.sleepHours <= 9.0 ? "Optimal" : "Review" },
      { name: "Nocturnal HRV (7-Day Avg)", val: `${bpInput.hrvMs} ms`, range: "Optimal > 50 ms (Autonomic tone)", status: bpInput.hrvMs >= 50 ? "Optimal" : "Review" }
    ];
    
    bpRows.forEach((r, i) => {
      const y = 153 + (i * rowHeight);
      doc.line(15, y + rowHeight, 195, y + rowHeight);
      doc.text(r.name, 18, y + 5.5);
      doc.text(r.val, 75, y + 5.5);
      doc.text(r.range, 115, y + 5.5);
      
      if (r.status.includes('Optimal')) doc.setTextColor(22, 163, 74);
      else if (r.status.includes('Hypertension') || r.status.includes('Warning') || r.status.includes('Review')) doc.setTextColor(220, 38, 38);
      else doc.setTextColor(217, 119, 6);
      doc.setFont('helvetica', 'bold');
      doc.text(r.status, 175, y + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
    });

    // Clinical comments on vascular & telemetry tension
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text("Clinical Notes on Cardiovascular & Telemetry Baseline:", 15, 208);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text([
      `Arterial tension reading of ${bpInput.systolic}/${bpInput.diastolic} mmHg is classified as ${classification.status.toUpperCase()}.`,
      `Pulse profile of ${bpInput.pulse} BPM, sleep duration of ${bpInput.sleepHours} hours, and nocturnal HRV of ${bpInput.hrvMs} ms`,
      `represent the patient's autonomic recovery and vagal baseline over the tracking period.`,
      "Persistent elevated metrics warrant verification via automated 24-hour ambulatory monitoring (ABPM)."
    ], 15, 214);

    // ==========================================
    // PAGE 2: URINALYSIS & CLINICIAN ACTION PLAN
    // ==========================================
    doc.addPage();
    
    // Page 2 header banner
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 20, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("LOLA DUAL-TRACK LONGEVITY ARCHITECTURE", 15, 12);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text("Page 2 - 10-Parameter At-Home Urinalysis & Recommendations", 120, 12);
    
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("3. 10-PARAMETER URINALYSIS METRIC RECORD", 15, 35);
    
    // Draw table headers for Urinalysis
    doc.setFillColor(241, 245, 249);
    doc.rect(15, 40, 180, 8, 'F');
    doc.line(15, 40, 195, 40);
    doc.line(15, 48, 195, 48);
    
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text("URINALYSIS PARAMETER", 18, 45);
    doc.text("CURRENT READING", 75, 45);
    doc.text("OPTIMAL VALUE", 120, 45);
    doc.text("PATHWAY CORRELATION", 150, 45);

    // Draw rows for urinalysis
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    const uriParams = Object.keys(URINALYSIS_CONFIG) as Array<keyof UrinalysisReadings>;
    uriParams.forEach((param, i) => {
      const cfg = URINALYSIS_CONFIG[param];
      const val = readings[param];
      const y = 48 + (i * rowHeight);
      
      doc.line(15, y + rowHeight, 195, y + rowHeight);
      doc.text(cfg.label, 18, y + 5.5);
      
      // Color abnormal text red/orange
      const abn = isValueAbnormal(param, val);
      if (abn) {
        doc.setTextColor(220, 38, 38);
        doc.setFont('helvetica', 'bold');
        doc.text(`${val} [Abnormal]`, 75, y + 5.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
      } else {
        doc.text(val, 75, y + 5.5);
      }
      
      doc.text(cfg.optimalValue, 120, y + 5.5);
      
      // Pathway mapping labels
      let pathName = 'Metabolism';
      if (['protein', 'specific_gravity'].includes(param)) pathName = 'Renal / Hydration';
      else if (['nitrite', 'leukocytes'].includes(param)) pathName = 'Immune Defense';
      else if (['bilirubin', 'urobilinogen'].includes(param)) pathName = 'Hepatic / Liver';
      else if (['ph', 'blood'].includes(param)) pathName = 'pH / Vascular';
      doc.text(pathName, 150, y + 5.5);
    });

    // Section 4: System Action Prompts
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("4. CLINICIAN BASELINE ACTION RECOMMENDATIONS", 15, 145);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    
    // Check flags for recommendations
    let issues: string[] = [];
    if (isValueAbnormal('glucose', readings.glucose)) issues.push("- Review glucose disposal: consider Oral Glucose Tolerance Test (OGTT) or CGM validation.");
    if (parseFloat(bloodwork.apob) > 90) issues.push("- ApoB level is elevated: recommend review of ApoB/ApoA1 ratios, LDL-P count, and cardiovascular plaque risk.");
    if (parseFloat(bloodwork.hba1c) > 5.5) issues.push("- HbA1c is borderline/impaired: metabolic and nutritional carbohydrate clearance should be evaluated.");
    if (isValueAbnormal('protein', readings.protein)) issues.push("- Urinary protein detected: verify kidney health via eGFR and Urine Albumin-to-Creatinine Ratio (UACR).");
    if (isValueAbnormal('nitrite', readings.nitrite) || isValueAbnormal('leukocytes', readings.leukocytes)) {
      issues.push("- Leukocyte/Nitrite signals: rule out subclinical or asymptomatic urinary tract infection (UTI) via culture.");
    }
    if (isValueAbnormal('blood', readings.blood)) issues.push("- Hematuria detected: investigate possible urinary micro-bleeding, kidney stones, or physical exercise-induced hemolysis.");
    if (bpInput.systolic >= 130 || bpInput.diastolic >= 80) {
      issues.push("- Blood pressure flagged as Hypertension Stage 1/2: suggest validation via home cuff monitoring and GP review.");
    }

    if (issues.length === 0) {
      issues.push("- All tracked biomarkers fall within optimal parameters. Maintain current daily habits.");
      issues.push("- Plan next baseline panel draw in 90 days (Quarterly clinical baseline standard).");
    }

    issues.forEach((issue, idx) => {
      doc.text(issue, 15, 155 + (idx * 6));
    });

    // Footer signature
    doc.setDrawColor(226, 232, 240);
    doc.line(15, 275, 195, 275);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.text("Lola Human Performance Architecture is a baseline assessment framework. This document does not constitute direct medical advice or diagnoses.", 15, 280);

    doc.save("clinical-baseline-consultation-template-v2.pdf");
  };

  const getPathwayColor = (state: string) => {
    switch (state) {
      case 'alert': return 'border-rose-500 bg-rose-500/10 shadow-[0_0_12px_rgba(244,63,94,0.15)] text-rose-400 animate-pulse';
      case 'warning': return 'border-amber-500/50 bg-amber-500/5 shadow-[0_0_10px_rgba(245,158,11,0.1)] text-amber-400';
      default: return 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400';
    }
  };

  const getBadgeColor = (state: string) => {
    switch (state) {
      case 'alert': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'warning': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-8 pt-8 border-t border-slate-800/85">
      {/* 1. Instruction Manual at the top */}
      <UrinalysisInstructions />

      {/* Save Status Banner */}
      {saveStatus !== 'idle' && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
          saveStatus === 'success' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300' : 
          saveStatus === 'local_cached' ? 'border-amber-500/30 bg-amber-500/5 text-amber-300' :
          'border-rose-500/30 bg-rose-500/5 text-rose-300'
        }`}>
          <CheckCircle2 size={16} className={saveStatus === 'success' ? 'text-emerald-400' : 'text-amber-400'} />
          <span className="text-xs font-light">{statusMessage}</span>
        </div>
      )}

      {/* 2. Main split-screen grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL (Span 5): Vascular & Blood Pressure Logging Widget */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 text-left space-y-5 relative">
            <div>
              <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider block">[ CARDIOVASCULAR BASELINE ]</span>
              <h4 className="text-sm font-display uppercase tracking-wider text-white font-bold mt-0.5">Vascular & Blood Pressure Logging</h4>
              <p className="text-xs text-slate-grey-455 leading-relaxed font-light mt-1">
                Input your current arterial tension metrics and resting pulse rate.
              </p>
            </div>

            {/* Glowing Digital Telemetry Screen */}
            {(() => {
              const classification = classifyBloodPressure(bpInput.systolic, bpInput.diastolic);
              return (
                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-inner">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">ARTERIAL PRESSURE</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className={`text-2xl sm:text-3xl font-display font-black tracking-tight ${
                          classification.status.includes('Hypertension') ? 'text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.4)] animate-pulse' :
                          classification.status === 'Elevated' ? 'text-yellow-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.3)]' :
                          'text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]'
                        }`}>
                          {bpInput.systolic} / {bpInput.diastolic}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-medium">mmHg</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">RESTING PULSE</span>
                      <div className="flex items-center gap-2 mt-0.5 justify-end">
                        <span className="text-2xl sm:text-3xl font-display font-black text-white font-mono tracking-tight">{bpInput.pulse}</span>
                        <span className="text-[10px] font-mono text-slate-500">BPM</span>
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`p-3 rounded-xl border text-[11px] font-mono flex items-start gap-2 ${
                    classification.status.includes('Hypertension') ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' :
                    classification.status === 'Elevated' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300' :
                    'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  }`}>
                    <Info size={14} className="flex-shrink-0 mt-0.5 text-slate-400" />
                    <div>
                      <strong className="block uppercase tracking-wider">{classification.status}</strong>
                      <span className="text-[10px] text-slate-grey-300 font-light mt-0.5 block leading-normal">{classification.description}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* BP Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-450 uppercase tracking-wider block">Systolic</label>
                <input
                  type="number"
                  value={bpInput.systolic}
                  onChange={(e) => handleBPInputChange('systolic', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-cyan-500/10 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="120"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-450 uppercase tracking-wider block">Diastolic</label>
                <input
                  type="number"
                  value={bpInput.diastolic}
                  onChange={(e) => handleBPInputChange('diastolic', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-cyan-500/10 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="80"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-450 uppercase tracking-wider block">Pulse</label>
                <input
                  type="number"
                  value={bpInput.pulse}
                  onChange={(e) => handleBPInputChange('pulse', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-cyan-500/10 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="65"
                />
              </div>
            </div>

            {/* Wearable Telemetry Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-450 uppercase tracking-wider block">Sleep Duration (Hrs)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bpInput.sleepHours}
                  onChange={(e) => handleBPInputChange('sleepHours', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-cyan-500/10 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="7.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-450 uppercase tracking-wider block">Nocturnal HRV (ms)</label>
                <input
                  type="number"
                  value={bpInput.hrvMs}
                  onChange={(e) => handleBPInputChange('hrvMs', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-cyan-500/10 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="55"
                />
              </div>
            </div>

            <button
              onClick={handleLogBP}
              disabled={bpLoading}
              className="w-full py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-wellness-cyan/40 text-wellness-cyan text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-950/40"
            >
              <Activity size={12} className={bpLoading ? 'animate-spin' : ''} />
              <span>{bpLoading ? 'Syncing...' : 'Log Vascular Readings'}</span>
            </button>

            {/* Scrollable historical list of previous logs fetched from Supabase */}
            <div className="border-t border-slate-900 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-450 uppercase tracking-wider">Vascular History</span>
                <span className="text-[9px] font-mono text-slate-600">{bpLogs.length} Records</span>
              </div>
              
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1.5 no-scrollbar">
                {bpLogs.length === 0 ? (
                  <div className="p-4 text-center rounded-xl bg-slate-950/20 border border-dashed border-slate-900 text-[10px] font-mono text-slate-600 uppercase">
                    No vascular telemetry logged yet
                  </div>
                ) : (
                  bpLogs.map((log, idx) => {
                    const statusClass = classifyBloodPressure(log.systolic_mmhg, log.diastolic_mmhg);
                    return (
                      <div key={log.id || idx} className="p-3 rounded-xl bg-slate-950 border border-slate-900/60 flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-white">
                              {log.systolic_mmhg} / {log.diastolic_mmhg}
                            </span>
                            <span className="text-[8px] font-mono text-slate-500">mmHg</span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded border font-mono uppercase ${statusClass.colorClass.split(' ')[0]} ${statusClass.colorClass.split(' ')[1]}`}>
                              {statusClass.status.replace(' Hypertension', '')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 flex-wrap">
                            <Calendar size={10} />
                            <span>{log.logged_at ? new Date(log.logged_at).toLocaleDateString() : 'Just now'}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                            <Activity size={10} className="text-rose-500" />
                            <span>{log.pulse_bpm} BPM</span>
                            {log.sleep_hours !== undefined && log.sleep_hours !== null && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                                <span>💤 {log.sleep_hours}h</span>
                              </>
                            )}
                            {log.hrv_ms !== undefined && log.hrv_ms !== null && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                                <span>⚡ {log.hrv_ms}ms</span>
                              </>
                            )}
                          </div>
                        </div>
                        <span className="text-[8px] font-mono text-slate-600 uppercase">#{bpLogs.length - idx}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Collated Bloodwork Metrics Card */}
          <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 text-left space-y-5">
            <div>
              <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider block">[ BLOOD PANEL MOCKUP ]</span>
              <h4 className="text-sm font-display uppercase tracking-wider text-white font-bold mt-0.5">Physician-Vetted Lab Biomarkers</h4>
              <p className="text-xs text-slate-grey-450 leading-relaxed font-light mt-1">
                Maintain ApoB, HbA1c, and hs-CRP parameters to output next to baseline diagnostics.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">ApoB (mg/dL)</label>
                <input
                  type="number"
                  value={bloodwork.apob}
                  onChange={(e) => handleBloodworkChange('apob', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="75"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">HbA1c (%)</label>
                <input
                  type="text"
                  value={bloodwork.hba1c}
                  onChange={(e) => handleBloodworkChange('hba1c', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="5.1"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">hs-CRP (mg/L)</label>
                <input
                  type="text"
                  value={bloodwork.hscrp}
                  onChange={(e) => handleBloodworkChange('hscrp', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-wellness-cyan rounded-xl p-3 text-xs text-white outline-none transition-all font-mono"
                  placeholder="0.8"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL (Span 7): Urinalysis Reagent Logger & Biological System Impact Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 space-y-6 text-left relative">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider block">[ LOGGING MATRIX ]</span>
                <h4 className="text-sm font-display uppercase tracking-wider text-white font-bold mt-0.5">Interactive Test Strip Logger</h4>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                <Info size={12} />
                <span>Compare colors to bottle chart</span>
              </div>
            </div>

            {/* Logger interface with Virtual Dipstick Sidecar */}
            <div className="flex gap-6 items-start">
              
              {/* Virtual physical urine strip */}
              <div className="flex-shrink-0 flex flex-col items-center select-none bg-slate-950 p-3 rounded-2xl border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <div className="text-[8px] font-mono text-slate-600 mb-1.5 uppercase font-bold tracking-widest">STRIP</div>
                <div className="w-6 min-h-[360px] bg-slate-900/60 rounded-full border border-slate-800/30 p-1 flex flex-col justify-between items-center gap-2 relative shadow-inner">
                  <div className="absolute top-2 bottom-2 w-2.5 bg-slate-300 rounded-full -z-10 shadow-sm opacity-90"></div>
                  
                  {(Object.keys(URINALYSIS_CONFIG) as Array<keyof UrinalysisReadings>).map((paramName) => {
                    const cfg = URINALYSIS_CONFIG[paramName];
                    const selectedVal = readings[paramName];
                    const padColor = cfg.colors[selectedVal] || '#cccccc';
                    const isActive = activeParam === paramName;
                    
                    return (
                      <div
                        key={paramName}
                        onClick={() => setActiveParam(paramName)}
                        className={`w-4 h-4 rounded shadow-md cursor-pointer transition-all duration-300 relative group flex items-center justify-center ${
                          isActive 
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-125 z-10' 
                            : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: padColor }}
                      >
                        {isValueAbnormal(paramName, selectedVal) && (
                          <span className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></span>
                        )}
                        <div className="absolute left-6 ml-2 hidden group-hover:block bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[8px] font-mono text-white whitespace-nowrap uppercase tracking-wider z-20 shadow-xl">
                          {cfg.label}: {selectedVal}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[8px] font-mono text-slate-600 mt-1.5 uppercase font-bold tracking-widest">BODY</div>
              </div>

              {/* Selector details section */}
              <div className="flex-grow space-y-5">
                
                {/* Parameter quick-nav tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-850 pb-4">
                  {(Object.keys(URINALYSIS_CONFIG) as Array<keyof UrinalysisReadings>).map((paramName) => {
                    const isSelected = activeParam === paramName;
                    const isAb = isValueAbnormal(paramName, readings[paramName]);
                    
                    return (
                      <button
                        key={paramName}
                        onClick={() => setActiveParam(paramName)}
                        className={`px-2.5 py-1 text-[9px] font-mono rounded uppercase tracking-wider transition-all duration-155 select-none cursor-pointer border ${
                          isSelected
                            ? 'bg-wellness-cyan/10 border-wellness-cyan text-wellness-cyan font-bold'
                            : isAb
                              ? 'bg-yellow-500/5 border-yellow-500/30 text-yellow-500 hover:border-yellow-500/60'
                              : 'bg-slate-900 border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {paramName.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>

                {/* Focus selection card */}
                {(() => {
                  const cfg = URINALYSIS_CONFIG[activeParam];
                  const currentVal = readings[activeParam];
                  
                  return (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider font-bold">Active Diagnostic Parameter</span>
                        <h5 className="text-base font-display uppercase tracking-wide text-white font-bold flex items-center gap-2">
                          <span>{cfg.label}</span>
                          {isValueAbnormal(activeParam, currentVal) && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-yellow-500 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                              <AlertTriangle size={10} />
                              <span>Threshold Crossed</span>
                            </span>
                          )}
                        </h5>
                        <p className="text-xs text-slate-grey-455 leading-relaxed font-light pt-1">{cfg.desc}</p>
                      </div>

                      {/* Chips */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {cfg.options.map((opt) => {
                          const isSelected = currentVal === opt;
                          const abn = isValueAbnormal(activeParam, opt);
                          
                          return (
                            <button
                              key={opt}
                              onClick={() => handleParamSelect(activeParam, opt)}
                              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? abn
                                    ? 'border-yellow-500/60 bg-yellow-500/10 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.12)] animate-pulse'
                                    : 'border-wellness-cyan/60 bg-wellness-cyan/10 text-wellness-cyan-light font-bold shadow-[0_0_10px_rgba(6,182,212,0.12)]'
                                  : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <div className="text-[11px] font-mono uppercase tracking-wider">{opt}</div>
                              <div className="flex items-center gap-1.5 mt-2">
                                <span 
                                  className="w-2.5 h-2.5 rounded-full border border-slate-950 inline-block shadow-inner"
                                  style={{ backgroundColor: cfg.colors[opt] }}
                                />
                                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                                  {opt === cfg.optimalValue ? 'Optimal' : 'Elevated'}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Biological System Impact Map */}
            <div className="border-t border-slate-850 pt-5 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider block">[ PATHWAY BASELINES ]</span>
                <h5 className="text-xs font-display uppercase tracking-wider text-white font-bold">Real-Time Biological System Impact Map</h5>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Glycemic */}
                {(() => {
                  const status = getPathwayStatus('glycemic');
                  return (
                    <div className={`p-4 rounded-xl border transition-all duration-300 ${getPathwayColor(status.state)}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white">Glycemic / Metabolic</span>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${getBadgeColor(status.state)}`}>
                          {status.state}
                        </span>
                      </div>
                      <p className="text-[10px] font-light leading-relaxed mt-2 text-slate-300">{status.text}</p>
                    </div>
                  );
                })()}

                {/* Renal */}
                {(() => {
                  const status = getPathwayStatus('renal');
                  return (
                    <div className={`p-4 rounded-xl border transition-all duration-300 ${getPathwayColor(status.state)}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white">Renal / Filtration</span>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${getBadgeColor(status.state)}`}>
                          {status.state}
                        </span>
                      </div>
                      <p className="text-[10px] font-light leading-relaxed mt-2 text-slate-300">{status.text}</p>
                    </div>
                  );
                })()}

                {/* Immune */}
                {(() => {
                  const status = getPathwayStatus('immune');
                  return (
                    <div className={`p-4 rounded-xl border transition-all duration-300 ${getPathwayColor(status.state)}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white">Immune Defense</span>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${getBadgeColor(status.state)}`}>
                          {status.state}
                        </span>
                      </div>
                      <p className="text-[10px] font-light leading-relaxed mt-2 text-slate-300">{status.text}</p>
                    </div>
                  );
                })()}

                {/* Hepatic */}
                {(() => {
                  const status = getPathwayStatus('hepatic');
                  return (
                    <div className={`p-4 rounded-xl border transition-all duration-300 ${getPathwayColor(status.state)}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white">Hepatic & Liver</span>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${getBadgeColor(status.state)}`}>
                          {status.state}
                        </span>
                      </div>
                      <p className="text-[10px] font-light leading-relaxed mt-2 text-slate-300">{status.text}</p>
                    </div>
                  );
                })()}

                {/* pH & Vascular */}
                {(() => {
                  const status = getPathwayStatus('ph_vascular');
                  return (
                    <div className={`p-4 rounded-xl border transition-all duration-300 ${getPathwayColor(status.state)} sm:col-span-2`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white">pH & Vascular Tension</span>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${getBadgeColor(status.state)}`}>
                          {status.state}
                        </span>
                      </div>
                      <p className="text-[10px] font-light leading-relaxed mt-2 text-slate-300">{status.text}</p>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-850">
              <button
                onClick={handleSaveUrinalysis}
                disabled={isSaving}
                className="flex-grow py-3 bg-gradient-to-r from-wellness-cyan to-wellness-cyan-dark hover:from-wellness-cyan-light hover:to-wellness-cyan text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-wellness-cyan/15"
              >
                <RefreshCw size={12} className={isSaving ? 'animate-spin' : ''} />
                <span>{isSaving ? 'Syncing...' : 'Collate & Save Readings'}</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="py-3 px-5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-wellness-cyan/40 text-wellness-cyan text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-950/40"
              >
                <Download size={14} />
                <span>GP Template v2 (PDF)</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
