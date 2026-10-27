import { jsPDF } from 'jspdf';

export interface GpTemplateData {
  // Header
  patientName?: string;
  dob?: string;
  consultDate?: string;
  gpName?: string;
  clinicName?: string;
  regionalPathway?: 'US' | 'UK' | 'ES' | '';

  // Section 1: Risk Profile & Health Goals
  familyHistory?: {
    earlyCvd?: boolean;
    type2Diabetes?: boolean;
    hypertension?: boolean;
    ckd?: boolean;
  };
  lifestyle?: {
    zone2MinPerWeek?: string;
    strengthSessionsPerWeek?: string;
    nutritionPlan?: string;
  };
  medicationsSupplements?: {
    vitaminD3K2?: boolean;
    omega3?: boolean;
    magnesium?: boolean;
    prescriptions?: string;
  };
  patientGoals?: string;

  // Section 2: 14-Day Wearable & Body Composition Telemetry Log
  telemetry?: {
    rhr?: { avg?: string; lowest?: string; highest?: string; trend?: string };
    hrv?: { avg?: string; lowest?: string; highest?: string; trend?: string };
    bp?: { avg?: string; lowest?: string; highest?: string; trend?: string };
    sleep?: { avg?: string; lowest?: string; highest?: string; trend?: string };
  };
  bodyComposition?: {
    visceralFatRating?: string;
    bodyFatPct?: string;
    skeletalMuscleMass?: string;
  };

  // Section 3: Blood Panel Results (Essential Basic & Comprehensive 56-Biomarker)
  phlebotomyMethod?: 'clinic' | 'mobile' | '';
  bloodResults?: {
    // Choice 1: Essential Baseline Panel
    fastingGlucose?: { result?: string; action?: string };
    lipidProfile?: { result?: string; action?: string };
    liverKidney?: { result?: string; action?: string };
    hba1c?: { result?: string; action?: string };

    // Choice 2: Comprehensive 56-Biomarker Cellular Map
    apob?: { result?: string; action?: string };
    hscrp?: { result?: string; action?: string };
    thyroidHormones?: { result?: string; action?: string };
    micronutrients?: { result?: string; action?: string };
    panel56?: { result?: string; action?: string };
  };

  // Section 4: Dual Urinalysis Log
  urinalysis?: {
    labAcr?: { result?: string; remarks?: string };
    labMicroalbumin?: { result?: string; remarks?: string };
    labSediment?: { result?: string; remarks?: string };
    homePh?: { result?: string; remarks?: string };
    homeSg?: { result?: string; remarks?: string };
    homeKetones?: { result?: string; remarks?: string };
    home7Clear?: boolean;
    home7Notes?: string;
  };

  // Section 5: Clinician Collaborative Care Directives
  doctorNotes?: string;
  agreedRequisitions?: {
    level1TriMarkers?: boolean;
    level2Panel56?: boolean;
    urineAcrSediment?: boolean;
    cacScanReferral?: boolean;
    lifestyleAdjustment?: boolean;
  };
  retestTimeline?: '30' | '60' | '90' | '180' | '';
  nextAppointment?: string;
  clinicianPrintName?: string;
  clinicianDate?: string;
  patientConfirmed?: boolean;
  patientDate?: string;
}

/**
 * Builds the 2-page GP Consultation Template V2 PDF.
 * If data is provided, it populates all fields (Mode A: Auto-Filled Digital Export).
 * If data is omitted or blank, it outputs clean lines, checkboxes, and empty tables for hand completion (Mode B).
 */
export function buildGpConsultationTemplatePdf(data: GpTemplateData = {}): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primaryDark = [15, 23, 42] as const;    // slate-900
  const cyanAccent = [8, 145, 178] as const;    // cyan-600
  const textDark = [30, 41, 59] as const;       // slate-800
  const textMuted = [100, 116, 139] as const;   // slate-500
  const lineGray = [203, 213, 225] as const;    // slate-300
  const bgLight = [248, 250, 252] as const;     // slate-50
  const valueColor = [14, 116, 144] as const;   // cyan-700 / filled value color

  // Helper to draw a checkbox (empty or checked)
  const drawCheckbox = (x: number, y: number, checked: boolean = false) => {
    doc.setDrawColor(...lineGray);
    doc.setLineWidth(0.3);
    doc.rect(x, y, 2.5, 2.5);
    if (checked) {
      doc.setFillColor(...cyanAccent);
      doc.rect(x + 0.4, y + 0.4, 1.7, 1.7, 'F');
    }
  };

  // Helper to draw an underline and print filled text if present
  const drawFieldUnderline = (
    label: string,
    value: string | undefined,
    labelX: number,
    labelY: number,
    lineStartX: number,
    lineEndX: number,
    underlineY: number
  ) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...textDark);
    doc.text(label, labelX, labelY);

    doc.setDrawColor(...lineGray);
    doc.setLineWidth(0.3);
    doc.line(lineStartX, underlineY, lineEndX, underlineY);

    if (value && value.trim().length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...valueColor);
      doc.text(value.trim(), lineStartX + 1, underlineY - 0.7);
    }
  };

  // =========================================================================
  // PAGE 1: Header, Section 1, Section 2, Section 3
  // =========================================================================

  // Top Header Banner
  doc.setFillColor(...primaryDark);
  doc.roundedRect(margin, margin, contentWidth, 18, 2, 2, 'F');

  doc.setFillColor(...cyanAccent);
  doc.rect(margin, margin + 16.5, contentWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('THE CLINICIAN CO-PILOT: 2-PAGE GP CONSULTATION TEMPLATE V2', margin + 4, margin + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(165, 243, 252);
  doc.text('Patient-Held Diagnostic Baseline & In-Clinic Collaborative Care Directive', margin + 4, margin + 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('123TheNextLevel.com', pageWidth - margin - 4, margin + 7.5, { align: 'right' });
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Clinical Telemetry & Baseline System', pageWidth - margin - 4, margin + 12, { align: 'right' });

  // Header Info Box (Patient & GP Demographics)
  let y = margin + 22;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...lineGray);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, 'FD');

  // Row 1: Patient Name, DOB, Date of Consult
  drawFieldUnderline('Patient Name:', data.patientName, margin + 3, y + 5, margin + 22, margin + 75, y + 5.5);
  drawFieldUnderline('DOB:', data.dob, margin + 80, y + 5, margin + 88, margin + 125, y + 5.5);
  drawFieldUnderline('Date of Consult:', data.consultDate, margin + 130, y + 5, margin + 152, margin + contentWidth - 3, y + 5.5);

  // Row 2: GP Name, Clinic Name
  drawFieldUnderline('GP / Doctor:', data.gpName, margin + 3, y + 10.5, margin + 20, margin + 75, y + 11);
  drawFieldUnderline('Clinic / Practice:', data.clinicName, margin + 80, y + 10.5, margin + 104, margin + contentWidth - 3, y + 11);

  // Row 3: Regional Pathway
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...textDark);
  doc.text('Regional Pathway:', margin + 3, y + 15.5);

  drawCheckbox(margin + 28, y + 13, data.regionalPathway === 'US');
  doc.setFont('helvetica', data.regionalPathway === 'US' ? 'bold' : 'normal');
  doc.setFontSize(7);
  doc.setTextColor(data.regionalPathway === 'US' ? valueColor[0] : textDark[0], data.regionalPathway === 'US' ? valueColor[1] : textDark[1], data.regionalPathway === 'US' ? valueColor[2] : textDark[2]);
  doc.text('US (Quest/Labcorp)', margin + 32, y + 15.2);

  drawCheckbox(margin + 68, y + 13, data.regionalPathway === 'UK');
  doc.setFont('helvetica', data.regionalPathway === 'UK' ? 'bold' : 'normal');
  doc.setTextColor(data.regionalPathway === 'UK' ? valueColor[0] : textDark[0], data.regionalPathway === 'UK' ? valueColor[1] : textDark[1], data.regionalPathway === 'UK' ? valueColor[2] : textDark[2]);
  doc.text('UK (UKAS Pathology)', margin + 72, y + 15.2);

  drawCheckbox(margin + 112, y + 13, data.regionalPathway === 'ES');
  doc.setFont('helvetica', data.regionalPathway === 'ES' ? 'bold' : 'normal');
  doc.setTextColor(data.regionalPathway === 'ES' ? valueColor[0] : textDark[0], data.regionalPathway === 'ES' ? valueColor[1] : textDark[1], data.regionalPathway === 'ES' ? valueColor[2] : textDark[2]);
  doc.text('Spain / EU (Eurofins Megalab)', margin + 116, y + 15.2);

  // =========================================================================
  // SECTION 1: Risk Profile & Health Goals
  // =========================================================================
  y += 22;
  doc.setFillColor(...primaryDark);
  doc.rect(margin, y, contentWidth, 5.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SECTION 1: RISK PROFILE & HEALTH GOALS', margin + 3, y + 4);

  y += 7.5;
  doc.setTextColor(...textDark);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Family Cardiovascular & Metabolic History:', margin, y);

  drawCheckbox(margin + 62, y - 2.5, !!data.familyHistory?.earlyCvd);
  doc.setFont('helvetica', data.familyHistory?.earlyCvd ? 'bold' : 'normal');
  doc.setFontSize(7);
  doc.setTextColor(data.familyHistory?.earlyCvd ? valueColor[0] : textDark[0], data.familyHistory?.earlyCvd ? valueColor[1] : textDark[1], data.familyHistory?.earlyCvd ? valueColor[2] : textDark[2]);
  doc.text('Early CVD (Heart Attack / Stroke < 55/65)', margin + 66, y - 0.5);

  drawCheckbox(margin + 128, y - 2.5, !!data.familyHistory?.type2Diabetes);
  doc.setFont('helvetica', data.familyHistory?.type2Diabetes ? 'bold' : 'normal');
  doc.setTextColor(data.familyHistory?.type2Diabetes ? valueColor[0] : textDark[0], data.familyHistory?.type2Diabetes ? valueColor[1] : textDark[1], data.familyHistory?.type2Diabetes ? valueColor[2] : textDark[2]);
  doc.text('Type 2 Diabetes / Insulin Resistance', margin + 132, y - 0.5);

  y += 4.5;
  drawCheckbox(margin + 62, y - 2.5, !!data.familyHistory?.hypertension);
  doc.setFont('helvetica', data.familyHistory?.hypertension ? 'bold' : 'normal');
  doc.setFontSize(7);
  doc.setTextColor(data.familyHistory?.hypertension ? valueColor[0] : textDark[0], data.familyHistory?.hypertension ? valueColor[1] : textDark[1], data.familyHistory?.hypertension ? valueColor[2] : textDark[2]);
  doc.text('Hypertension / Vascular Disease', margin + 66, y - 0.5);

  drawCheckbox(margin + 128, y - 2.5, !!data.familyHistory?.ckd);
  doc.setFont('helvetica', data.familyHistory?.ckd ? 'bold' : 'normal');
  doc.setTextColor(data.familyHistory?.ckd ? valueColor[0] : textDark[0], data.familyHistory?.ckd ? valueColor[1] : textDark[1], data.familyHistory?.ckd ? valueColor[2] : textDark[2]);
  doc.text('Chronic Kidney Disease (CKD) / Microalbuminuria', margin + 132, y - 0.5);

  // Protocols & Lifestyle
  y += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...textDark);
  doc.text('Current Protocols & Lifestyle:', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Zone 2 Cardio:', margin + 40, y);
  doc.line(margin + 60, y + 0.5, margin + 78, y + 0.5);
  if (data.lifestyle?.zone2MinPerWeek) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...valueColor);
    doc.text(data.lifestyle.zone2MinPerWeek, margin + 61, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
  }

  doc.text('min/wk | Strength Sessions:', margin + 80, y);
  doc.line(margin + 115, y + 0.5, margin + 130, y + 0.5);
  if (data.lifestyle?.strengthSessionsPerWeek) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...valueColor);
    doc.text(data.lifestyle.strengthSessionsPerWeek, margin + 116, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
  }

  doc.text('/wk | Nutrition Plan:', margin + 132, y);
  doc.line(margin + 158, y + 0.5, margin + contentWidth, y + 0.5);
  if (data.lifestyle?.nutritionPlan) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...valueColor);
    doc.text(data.lifestyle.nutritionPlan, margin + 159, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
  }

  // Medications & Supplements
  y += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...textDark);
  doc.text('Medications & Baseline Supplements:', margin, y);

  drawCheckbox(margin + 52, y - 2.5, !!data.medicationsSupplements?.vitaminD3K2);
  doc.setFont('helvetica', data.medicationsSupplements?.vitaminD3K2 ? 'bold' : 'normal');
  doc.setFontSize(7);
  doc.setTextColor(data.medicationsSupplements?.vitaminD3K2 ? valueColor[0] : textDark[0], data.medicationsSupplements?.vitaminD3K2 ? valueColor[1] : textDark[1], data.medicationsSupplements?.vitaminD3K2 ? valueColor[2] : textDark[2]);
  doc.text('Vitamin D3 + K2', margin + 56, y - 0.5);

  drawCheckbox(margin + 83, y - 2.5, !!data.medicationsSupplements?.omega3);
  doc.setFont('helvetica', data.medicationsSupplements?.omega3 ? 'bold' : 'normal');
  doc.setTextColor(data.medicationsSupplements?.omega3 ? valueColor[0] : textDark[0], data.medicationsSupplements?.omega3 ? valueColor[1] : textDark[1], data.medicationsSupplements?.omega3 ? valueColor[2] : textDark[2]);
  doc.text('Omega-3 EPA/DHA', margin + 87, y - 0.5);

  drawCheckbox(margin + 120, y - 2.5, !!data.medicationsSupplements?.magnesium);
  doc.setFont('helvetica', data.medicationsSupplements?.magnesium ? 'bold' : 'normal');
  doc.setTextColor(data.medicationsSupplements?.magnesium ? valueColor[0] : textDark[0], data.medicationsSupplements?.magnesium ? valueColor[1] : textDark[1], data.medicationsSupplements?.magnesium ? valueColor[2] : textDark[2]);
  doc.text('Magnesium', margin + 124, y - 0.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...textDark);
  doc.text('Prescriptions:', margin + 145, y - 0.5);
  doc.line(margin + 165, y + 0.5, margin + contentWidth, y + 0.5);
  if (data.medicationsSupplements?.prescriptions) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...valueColor);
    doc.text(data.medicationsSupplements.prescriptions, margin + 166, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textDark);
  }

  // Primary Patient Goals
  y += 5.5;
  drawFieldUnderline('Primary Patient Goals:', data.patientGoals, margin, y, margin + 33, margin + contentWidth, y + 0.5);

  // =========================================================================
  // SECTION 2: 14-Day Wearable Telemetry Log
  // =========================================================================
  y += 7.5;
  doc.setFillColor(...primaryDark);
  doc.rect(margin, y, contentWidth, 5.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SECTION 2: 14-DAY WEARABLE & BODY COMPOSITION TELEMETRY (HOME BIOSENSORS)', margin + 3, y + 4);

  y += 7.5;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  doc.setTextColor(...textMuted);
  doc.text('Averaged over 14 consecutive nights prior to appointment to establish non-situational biophysical baseline:', margin, y);

  // Table Header
  y += 2.5;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...lineGray);
  doc.rect(margin, y, contentWidth, 5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(...textDark);
  doc.text('Biometric Parameter', margin + 2, y + 3.5);
  doc.text('14-Day Average', margin + 60, y + 3.5);
  doc.text('Lowest Recorded', margin + 92, y + 3.5);
  doc.text('Highest Recorded', margin + 124, y + 3.5);
  doc.text('Clinical Classification / Trend', margin + 152, y + 3.5);

  const telemetryRows = [
    {
      name: 'Resting Heart Rate (RHR)',
      unit: 'bpm',
      val: data.telemetry?.rhr,
      defaultTrend: '[ ] Stable  [ ] Elevated  [ ] Declining'
    },
    {
      name: 'Nocturnal Heart Rate Variability (HRV)',
      unit: 'ms (rMSSD)',
      val: data.telemetry?.hrv,
      defaultTrend: '[ ] High Vagal Tone  [ ] Suppressed'
    },
    {
      name: 'Blood Pressure (Morning & Evening Avg)',
      unit: 'mmHg',
      val: data.telemetry?.bp,
      defaultTrend: '[ ] Normal (<120/80)  [ ] Elevated'
    },
    {
      name: 'Total Sleep Duration & Regularity',
      unit: 'hrs / night',
      val: data.telemetry?.sleep,
      defaultTrend: 'Deep + REM Avg: _______ min'
    },
    {
      name: 'Visceral Fat Rating (Bioimpedance)',
      unit: 'Level 1–12',
      val: {
        avg: data.bodyComposition?.visceralFatRating ? `Rating ${data.bodyComposition.visceralFatRating}` : '',
        lowest: '',
        highest: '',
        trend: data.bodyComposition?.visceralFatRating
          ? (Number(data.bodyComposition.visceralFatRating) <= 4 ? 'Optimal (1–4)' : Number(data.bodyComposition.visceralFatRating) <= 8 ? 'Warning (5–8)' : 'High Risk (9–12)')
          : '[ ] 1-4 Optimal  [ ] 5-8 Warning  [ ] 9-12 Risk'
      },
      defaultTrend: '[ ] 1-4 Optimal  [ ] 5-8 Warning  [ ] 9-12 Risk'
    },
    {
      name: 'Body Fat Percentage (%)',
      unit: '% Total Mass',
      val: {
        avg: data.bodyComposition?.bodyFatPct ? `${data.bodyComposition.bodyFatPct}%` : '',
        lowest: '',
        highest: '',
        trend: data.bodyComposition?.bodyFatPct ? 'BIA Smart Scale Verified' : 'Standard: M 10-20% | F 18-28%'
      },
      defaultTrend: 'Target: Male 10-20% | Female 18-28%'
    },
    {
      name: 'Skeletal Muscle Mass (%)',
      unit: '% Total Mass',
      val: {
        avg: data.bodyComposition?.skeletalMuscleMass ? `${data.bodyComposition.skeletalMuscleMass}%` : '',
        lowest: '',
        highest: '',
        trend: data.bodyComposition?.skeletalMuscleMass ? 'Sarcopenia Guard Active' : 'Target: Male >33% | Female >28%'
      },
      defaultTrend: 'Target: Male >33% | Female >28%'
    }
  ];

  telemetryRows.forEach((row) => {
    y += 5.5;
    doc.setDrawColor(...lineGray);
    doc.rect(margin, y, contentWidth, 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textDark);
    doc.text(`${row.name} (${row.unit})`, margin + 2, y + 3.8);

    // 14-day average
    doc.line(margin + 62, y + 4, margin + 85, y + 4);
    if (row.val?.avg) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.avg, margin + 64, y + 3.6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    }

    // Lowest
    doc.line(margin + 94, y + 4, margin + 117, y + 4);
    if (row.val?.lowest) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.lowest, margin + 96, y + 3.6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    }

    // Highest
    doc.line(margin + 126, y + 4, margin + 146, y + 4);
    if (row.val?.highest) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.highest, margin + 128, y + 3.6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    }

    // Trend
    doc.setFontSize(6.5);
    if (row.val?.trend) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.trend, margin + 150, y + 3.8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    } else {
      doc.text(row.defaultTrend, margin + 150, y + 3.8);
    }
  });

  // =========================================================================
  // SECTION 3: Blood Panel Results
  // =========================================================================
  y += 10;
  doc.setFillColor(...primaryDark);
  doc.rect(margin, y, contentWidth, 5.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SECTION 3: VENOUS BLOOD PANEL RESULTS (CORE TRI-MARKERS & EXTENDED)', margin + 3, y + 4);

  y += 7.5;
  doc.setTextColor(...textDark);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Phlebotomy Collection Method:', margin, y);

  drawCheckbox(margin + 45, y - 2.5, data.phlebotomyMethod === 'clinic');
  doc.setFont('helvetica', data.phlebotomyMethod === 'clinic' ? 'bold' : 'normal');
  doc.setFontSize(7);
  doc.setTextColor(data.phlebotomyMethod === 'clinic' ? valueColor[0] : textDark[0], data.phlebotomyMethod === 'clinic' ? valueColor[1] : textDark[1], data.phlebotomyMethod === 'clinic' ? valueColor[2] : textDark[2]);
  doc.text('Accredited Walk-In Clinic Draw (Quest / Labcorp / Megalab / Unilabs)', margin + 49, y - 0.5);

  drawCheckbox(margin + 140, y - 2.5, data.phlebotomyMethod === 'mobile');
  doc.setFont('helvetica', data.phlebotomyMethod === 'mobile' ? 'bold' : 'normal');
  doc.setTextColor(data.phlebotomyMethod === 'mobile' ? valueColor[0] : textDark[0], data.phlebotomyMethod === 'mobile' ? valueColor[1] : textDark[1], data.phlebotomyMethod === 'mobile' ? valueColor[2] : textDark[2]);
  doc.text('Mobile Nurse Home Phlebotomy', margin + 144, y - 0.5);

  // Table Header
  y += 3;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...lineGray);
  doc.rect(margin, y, contentWidth, 5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(...textDark);
  doc.text('Biomarker & Clinical Rationale', margin + 2, y + 3.5);
  doc.text('Longevity Target Range', margin + 70, y + 3.5);
  doc.text('Patient Lab Result', margin + 115, y + 3.5);
  doc.text('Requisition Action', margin + 150, y + 3.5);

  const bloodRows: Array<{ name: string; target: string; val?: { result?: string; action?: string }; defaultAction: string }> = [
    {
      name: 'Core Lipid Profile (Total Chol / HDL / LDL / Triglycerides)',
      target: '< 100 mg/dL LDL | Trig < 100 mg/dL',
      val: data.bloodResults?.lipidProfile,
      defaultAction: '[ ] Basic Panel Normal'
    },
    {
      name: 'Fasting Blood Glucose - Glycemic baseline',
      target: '< 85 - 90 mg/dL (< 4.7 - 5.0 mmol/L)',
      val: data.bloodResults?.fastingGlucose,
      defaultAction: '[ ] Within Range  [ ] Monitor'
    },
    {
      name: 'Glycated Hemoglobin (HbA1c) - 90-day glycemic exposure',
      target: '< 5.4 - 5.6% (< 36 mmol/mol)',
      val: data.bloodResults?.hba1c,
      defaultAction: '[ ] Re-test in 90d  [ ] Normal'
    },
    {
      name: 'Apolipoprotein B (ApoB) - Total atherogenic particle count',
      target: '< 70 - 80 mg/dL (< 0.7 - 0.8 g/L)',
      val: data.bloodResults?.apob,
      defaultAction: '[ ] Optimal  [ ] Retest 90d'
    },
    {
      name: 'High-Sensitivity CRP (hs-CRP) - Systemic vascular inflammation',
      target: '< 0.5 - 1.0 mg/L (Ultra-low risk)',
      val: data.bloodResults?.hscrp,
      defaultAction: '[ ] Minimal Risk  [ ] Retest'
    },
    {
      name: data.bloodResults?.liverKidney?.result && !data.bloodResults?.panel56?.result
        ? 'Basic Metabolic Panel (Liver ALT / eGFR / Creatinine)'
        : 'Comprehensive 56-Biomarker Master Panel (Full Multi-Omic Map)',
      target: data.bloodResults?.liverKidney?.result && !data.bloodResults?.panel56?.result
        ? 'ALT < 30 U/L | eGFR > 90 mL/min'
        : 'Quest / LOLA 56 / Melio Master',
      val: data.bloodResults?.liverKidney?.result && !data.bloodResults?.panel56?.result
        ? data.bloodResults?.liverKidney
        : data.bloodResults?.panel56,
      defaultAction: data.bloodResults?.liverKidney?.result && !data.bloodResults?.panel56?.result
        ? '[ ] Renal & Hepatic Clear'
        : '[ ] Full Panel Ordered'
    }
  ];

  bloodRows.forEach((row) => {
    y += 5.0;
    doc.setDrawColor(...lineGray);
    doc.rect(margin, y, contentWidth, 5.0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...textDark);
    doc.text(row.name, margin + 2, y + 3.4);

    doc.setFont('helvetica', 'bold');
    doc.text(row.target, margin + 70, y + 3.4);

    // Patient Lab Result
    doc.line(margin + 117, y + 3.7, margin + 144, y + 3.7);
    if (row.val?.result) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.result, margin + 118, y + 3.3);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    }

    doc.setFontSize(6.3);
    if (row.val?.action) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.action, margin + 148, y + 3.4);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    } else {
      doc.text(row.defaultAction, margin + 148, y + 3.4);
    }
  });

  // Footer Page 1
  doc.setDrawColor(...lineGray);
  doc.line(margin, pageHeight - 8, pageWidth - margin, pageHeight - 8);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textMuted);
  doc.text('Document 2: The GP Consultation Template V2 • Page 1 of 2 • Pre-Appointment Baseline Summary • © 123TheNextLevel.com', margin, pageHeight - 5);
  doc.text('Page 1 of 2', pageWidth - margin, pageHeight - 5, { align: 'right' });

  // =========================================================================
  // PAGE 2: Section 4 (Dual Urinalysis) & Section 5 (Collaborative Directives)
  // =========================================================================
  doc.addPage('a4', 'portrait');

  // Mini Header Page 2
  doc.setFillColor(...primaryDark);
  doc.roundedRect(margin, margin, contentWidth, 12, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('THE CLINICIAN CO-PILOT: 2-PAGE GP CONSULTATION TEMPLATE V2', margin + 4, margin + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(165, 243, 252);
  doc.text('Page 2: Dual Urinalysis Telemetry & Clinician Collaborative Care Directives', margin + 4, margin + 9.5);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  const patientHeader = data.patientName ? `Patient: ${data.patientName}` : 'Patient: __________________________';
  const dateHeader = data.consultDate ? `Date: ${data.consultDate}` : 'Date: _______________';
  doc.text(`${patientHeader}   ${dateHeader}`, pageWidth - margin - 4, margin + 7.5, { align: 'right' });

  // =========================================================================
  // SECTION 4: Dual Urinalysis Log
  // =========================================================================
  y = margin + 16;
  doc.setFillColor(...primaryDark);
  doc.rect(margin, y, contentWidth, 5.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SECTION 4: DUAL URINALYSIS TELEMETRY (QUARTERLY LAB & WEEKLY HOME STRIPS)', margin + 3, y + 4);

  // Type 1: Quarterly Laboratory Urinalysis
  y += 8;
  doc.setTextColor(...textDark);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Type 1: Quarterly Laboratory Urinalysis (Lab-Based • Accredited Clinic Every 90 Days)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...textMuted);
  doc.text('Accredited by Quest/Labcorp (US), UKAS ISO 15189 (UK), or Eurofins Megalab (ES):', margin, y + 3.8);

  // Type 1 Lab Table
  y += 5.5;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...lineGray);
  doc.rect(margin, y, contentWidth, 5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(...textDark);
  doc.text('Laboratory Marker', margin + 2, y + 3.5);
  doc.text('Clinical Reference Benchmark', margin + 65, y + 3.5);
  doc.text('Pathology Result', margin + 115, y + 3.5);
  doc.text('Clinical Remarks', margin + 148, y + 3.5);

  const labUrineRows = [
    {
      name: 'Urine Albumin-to-Creatinine Ratio (ACR)',
      benchmark: '< 30 mg/g (< 3 mg/mmol)',
      val: data.urinalysis?.labAcr,
      defaultRemarks: '[ ] Normal  [ ] Microalbuminuria (30-300)'
    },
    {
      name: 'Microalbuminuria & Total Proteinuria',
      benchmark: 'Negative / < 20 mg/L',
      val: data.urinalysis?.labMicroalbumin,
      defaultRemarks: '[ ] Preserved Renal Endothelial Barrier'
    },
    {
      name: 'Microscopic Urine Sediment Analysis',
      benchmark: 'No cellular casts, RBCs or crystals',
      val: data.urinalysis?.labSediment,
      defaultRemarks: '[ ] Clear Renal Filtration'
    }
  ];

  labUrineRows.forEach((row) => {
    y += 5.5;
    doc.setDrawColor(...lineGray);
    doc.rect(margin, y, contentWidth, 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...textDark);
    doc.text(row.name, margin + 2, y + 3.8);

    doc.setFont('helvetica', 'bold');
    doc.text(row.benchmark, margin + 65, y + 3.8);

    doc.line(margin + 117, y + 4, margin + 142, y + 4);
    if (row.val?.result) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.result, margin + 118, y + 3.6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    }

    doc.setFontSize(6.5);
    if (row.val?.remarks) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.remarks, margin + 146, y + 3.8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    } else {
      doc.text(row.defaultRemarks, margin + 146, y + 3.8);
    }
  });

  // Type 2: Weekly At-Home 10-Parameter Dipstick Summary
  y += 9.5;
  doc.setTextColor(...textDark);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Type 2: Weekly At-Home 10-Parameter Dipstick Summary (Self-Assessed • Every 7 Days)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...textMuted);
  doc.text('Hospital-grade test strips (Diagnox Urinox-10 / ALLTEST CE Marked) evaluating acute weekly response:', margin, y + 3.8);

  y += 5.5;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...lineGray);
  doc.rect(margin, y, contentWidth, 5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(...textDark);
  doc.text('Rapid Reagent Parameter', margin + 2, y + 3.5);
  doc.text('Target Optimal Range', margin + 65, y + 3.5);
  doc.text('Weekly Rolling Average', margin + 112, y + 3.5);
  doc.text('Acute Daily Habit Response', margin + 150, y + 3.5);

  const homeDipstickRows = [
    {
      name: 'Urine pH (Acid-Base Homeostasis)',
      target: '6.0 - 7.5 (Optimal metabolic buffer)',
      val: data.urinalysis?.homePh,
      defaultHabit: 'Vegetable intake, protein acid balance'
    },
    {
      name: 'Specific Gravity (Cellular Hydration)',
      target: '1.010 - 1.020 (Euhydrated state)',
      val: data.urinalysis?.homeSg,
      defaultHabit: 'Fluid timing, electrolyte balance'
    },
    {
      name: 'Ketone Excretion (Acetoacetate)',
      target: 'Negative to Trace (or diet goal)',
      val: data.urinalysis?.homeKetones,
      defaultHabit: 'Carbohydrate restriction, fasting window'
    },
    {
      name: '7 Microvascular Indicators (Protein, Blood, Nitrite, Leuko, Bilirubin, Urobil, Glucose)',
      target: 'All Negative / Normal',
      val: {
        result: data.urinalysis?.home7Clear ? 'All 7 Clear (Normal)' : data.urinalysis?.home7Notes || '',
        remarks: data.urinalysis?.home7Clear ? '✓ All Clear' : data.urinalysis?.home7Notes || ''
      },
      defaultHabit: '[ ] All 7 Clear  [ ] Anomaly Flagged'
    }
  ];

  homeDipstickRows.forEach((row) => {
    y += 5.5;
    doc.setDrawColor(...lineGray);
    doc.rect(margin, y, contentWidth, 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...textDark);
    doc.text(row.name, margin + 2, y + 3.8);

    doc.setFont('helvetica', 'bold');
    doc.text(row.target, margin + 65, y + 3.8);

    doc.line(margin + 114, y + 4, margin + 144, y + 4);
    if (row.val?.result) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.result, margin + 115, y + 3.6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    }

    doc.setFontSize(6.5);
    if (row.val?.remarks) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(row.val.remarks, margin + 148, y + 3.8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textDark);
    } else {
      doc.text(row.defaultHabit, margin + 148, y + 3.8);
    }
  });

  // =========================================================================
  // SECTION 5: Clinician Collaborative Care Directives
  // =========================================================================
  y += 10.5;
  doc.setFillColor(...primaryDark);
  doc.rect(margin, y, contentWidth, 5.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SECTION 5: CLINICIAN COLLABORATIVE CARE DIRECTIVES (IN-CLINIC DOCTOR NOTES)', margin + 3, y + 4);

  // Formatted Doctor Notes Box
  y += 7.5;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...cyanAccent);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentWidth, 36, 1.5, 1.5, 'FD');

  doc.setTextColor(...cyanAccent);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Clinician Consultation Notes & Assessment Directives:', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textMuted);
  doc.setFontSize(6.8);
  doc.text('Record confirmed diagnoses, pharmacological modifications, dietary directives, or specialty referrals:', margin + 3, y + 8.5);

  if (data.doctorNotes && data.doctorNotes.trim().length > 0) {
    // Print wrapped doctor notes
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textDark);
    const splitNotes = doc.splitTextToSize(data.doctorNotes.trim(), contentWidth - 8);
    doc.text(splitNotes, margin + 4, y + 13.5);
  } else {
    // 5 Ruled lines for handwriting
    doc.setDrawColor(...lineGray);
    doc.setLineWidth(0.2);
    for (let lineIndex = 0; lineIndex < 5; lineIndex++) {
      const lineY = y + 14 + lineIndex * 4.5;
      doc.line(margin + 4, lineY, margin + contentWidth - 4, lineY);
    }
  }

  // Agreed Requisitions Checkboxes
  y += 39;
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Agreed Clinical Requisitions & Directives:', margin, y);

  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  drawCheckbox(margin + 2, y - 2.5, !!data.agreedRequisitions?.level1TriMarkers);
  doc.setFont('helvetica', data.agreedRequisitions?.level1TriMarkers ? 'bold' : 'normal');
  doc.setTextColor(data.agreedRequisitions?.level1TriMarkers ? valueColor[0] : textDark[0], data.agreedRequisitions?.level1TriMarkers ? valueColor[1] : textDark[1], data.agreedRequisitions?.level1TriMarkers ? valueColor[2] : textDark[2]);
  doc.text('Level 1: ApoB, HbA1c, hs-CRP', margin + 6, y - 0.5);

  drawCheckbox(margin + 58, y - 2.5, !!data.agreedRequisitions?.level2Panel56);
  doc.setFont('helvetica', data.agreedRequisitions?.level2Panel56 ? 'bold' : 'normal');
  doc.setTextColor(data.agreedRequisitions?.level2Panel56 ? valueColor[0] : textDark[0], data.agreedRequisitions?.level2Panel56 ? valueColor[1] : textDark[1], data.agreedRequisitions?.level2Panel56 ? valueColor[2] : textDark[2]);
  doc.text('Level 2: 56-Biomarker Master Phlebotomy Draw', margin + 62, y - 0.5);

  drawCheckbox(margin + 135, y - 2.5, !!data.agreedRequisitions?.urineAcrSediment);
  doc.setFont('helvetica', data.agreedRequisitions?.urineAcrSediment ? 'bold' : 'normal');
  doc.setTextColor(data.agreedRequisitions?.urineAcrSediment ? valueColor[0] : textDark[0], data.agreedRequisitions?.urineAcrSediment ? valueColor[1] : textDark[1], data.agreedRequisitions?.urineAcrSediment ? valueColor[2] : textDark[2]);
  doc.text('Urine ACR & Sediment Panel', margin + 139, y - 0.5);

  y += 4.5;
  drawCheckbox(margin + 2, y - 2.5, !!data.agreedRequisitions?.cacScanReferral);
  doc.setFont('helvetica', data.agreedRequisitions?.cacScanReferral ? 'bold' : 'normal');
  doc.setTextColor(data.agreedRequisitions?.cacScanReferral ? valueColor[0] : textDark[0], data.agreedRequisitions?.cacScanReferral ? valueColor[1] : textDark[1], data.agreedRequisitions?.cacScanReferral ? valueColor[2] : textDark[2]);
  doc.text('Coronary Artery Calcium (CAC) Scan Referral', margin + 6, y - 0.5);

  drawCheckbox(margin + 75, y - 2.5, !!data.agreedRequisitions?.lifestyleAdjustment);
  doc.setFont('helvetica', data.agreedRequisitions?.lifestyleAdjustment ? 'bold' : 'normal');
  doc.setTextColor(data.agreedRequisitions?.lifestyleAdjustment ? valueColor[0] : textDark[0], data.agreedRequisitions?.lifestyleAdjustment ? valueColor[1] : textDark[1], data.agreedRequisitions?.lifestyleAdjustment ? valueColor[2] : textDark[2]);
  doc.text('Lifestyle Protocol Adjustment (Zone 2 / Nutrition)', margin + 79, y - 0.5);

  // Follow-up Recheck Timeline
  y += 6;
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Agreed Follow-Up Recheck Timeline:', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  drawCheckbox(margin + 55, y - 2.5, data.retestTimeline === '30');
  doc.text('30 Days', margin + 59, y - 0.5);

  drawCheckbox(margin + 78, y - 2.5, data.retestTimeline === '60');
  doc.text('60 Days', margin + 82, y - 0.5);

  drawCheckbox(margin + 101, y - 2.5, data.retestTimeline === '90');
  doc.text('90 Days (Quarterly Cycle)', margin + 105, y - 0.5);

  drawCheckbox(margin + 148, y - 2.5, data.retestTimeline === '180');
  doc.text('6 Months', margin + 152, y - 0.5);

  // Next Scheduled Appointment
  y += 5.5;
  drawFieldUnderline('Next Scheduled Appointment:', data.nextAppointment, margin, y, margin + 46, margin + 120, y + 0.5);

  // Signatures Row
  y += 8;
  doc.setFillColor(...bgLight);
  doc.setDrawColor(...lineGray);
  doc.rect(margin, y, contentWidth, 14, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...textDark);
  doc.text('Clinician Signature / Stamp:', margin + 3, y + 4.5);
  doc.line(margin + 36, y + 4.5, margin + 75, y + 4.5);

  drawFieldUnderline('Print Name:', data.clinicianPrintName, margin + 80, y + 4.5, margin + 96, margin + 130, y + 4.5);
  drawFieldUnderline('Date:', data.clinicianDate, margin + 135, y + 4.5, margin + 144, margin + contentWidth - 3, y + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...textDark);
  doc.text('Patient Signature:', margin + 3, y + 10.5);
  doc.line(margin + 28, y + 10.5, margin + 75, y + 10.5);

  doc.text('I confirm this record accurately reflects my logged telemetry:', margin + 80, y + 10.5);
  drawFieldUnderline('Date:', data.patientDate || data.consultDate, margin + 160, y + 10.5, margin + 168, margin + contentWidth - 3, y + 10.5);

  // Footer Page 2
  doc.setDrawColor(...lineGray);
  doc.line(margin, pageHeight - 8, pageWidth - margin, pageHeight - 8);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textMuted);
  const footerMode = data.patientName ? 'Pre-Filled Digital Consultation Record' : 'Printable Blank Template';
  doc.text(`Document 2: The GP Consultation Template V2 • Page 2 of 2 • ${footerMode} • © 123TheNextLevel.com`, margin, pageHeight - 5);
  doc.text('Page 2 of 2', pageWidth - margin, pageHeight - 5, { align: 'right' });

  return doc;
}
