import React, { useEffect, useState } from 'react';
import { BookOpen, X, CheckCircle2, ShieldCheck, Download, ArrowRight, Activity, FileText, Sparkles } from 'lucide-react';
import BundleOffers from '../components/BundleOffers';
import { usePaywallBypass, getGuidePdfDownloadUrl } from '../utils/adminTestMode';
import { useDownloadGate } from '../components/DownloadGateModal';

interface MasterGuide {
  id: string;
  pillar: string;
  title: string;
  price: string;
  usPrice: string;
  primaryImage: string;
  fallbackImage?: string;
  description: string;
  highlights: string[];
  checkoutUrl: string;
  badge?: string;
  phases?: { phase: string; title: string; bullets: string[] }[];
  tableSchema?: { week: string; metric: string; action: string }[];
}

// Universal Multi-Path Cover Image Resolver
const GuideCoverImage: React.FC<{ primaryImage: string; fallbackImage?: string; altText: string }> = ({
  primaryImage,
  fallbackImage,
  altText
}) => {
  const [src, setSrc] = useState(primaryImage);

  useEffect(() => {
    setSrc(primaryImage);
  }, [primaryImage]);

  return (
    <img
      src={src}
      alt={altText}
      loading="lazy"
      onError={() => {
        if (fallbackImage && src !== fallbackImage) {
          setSrc(fallbackImage);
        }
      }}
      className="w-full h-full object-contain rounded-lg drop-shadow-md group-hover:scale-[1.02] transition-transform duration-500"
    />
  );
};

export default function PremiumGuidesPage() {
  const [selectedTocGuide, setSelectedTocGuide] = useState<MasterGuide | null>(null);
  const { isBypassActive } = usePaywallBypass();
  const { triggerGuideAction } = useDownloadGate();

  const handleCheckoutClick = (e: React.MouseEvent, guide: MasterGuide) => {
    e.preventDefault();
    const isSubscribed = Boolean(localStorage.getItem('subscribed_email'));
    if (isSubscribed) {
      window.location.href = guide.checkoutUrl;
    } else {
      triggerGuideAction(
        {
          id: guide.id,
          title: guide.title,
          price: guide.price,
          checkoutUrl: guide.checkoutUrl,
          type: 'premium',
        },
        'premium'
      );
    }
  };

  useEffect(() => {
    document.title = "Premium Master Guides | 123TheNextLevel";
    window.scrollTo(0, 0);
  }, []);

  const masterGuides: MasterGuide[] = [
    {
      id: "metabolic-master-guide",
      pillar: "Metabolic Health & Body Composition",
      title: "12-Week Metabolic & Visceral Fat Protocol",
      price: "£19.00",
      usPrice: "$25.00 • €22.00",
      primaryImage: "/assets/images/metabolic_nutrition_cover_New.png",
      fallbackImage: "/covers/metabolic_nutrition_cover_New.png",
      description: "A phased biometric blueprint to strip deep visceral organ fat, optimize glycemic control, and preserve skeletal muscle mass.",
      badge: "PREMIUM GUIDE",
      highlights: [
        "Visceral Fat Rating & Smart Scale Calibration",
        "Targeted Protein & Resistance Workout Schedules",
        "14-Day Telemetry Logging & GP Leave-Behind Export"
      ],
      checkoutUrl: "/checkout?product=metabolic-master-guide",
      phases: [
        {
          phase: "Phase 1 (Weeks 1–4)",
          title: "Foundation, Glycemic Blunting & Baseline Scale Calibration",
          bullets: [
            "Fasted morning bioimpedance calibration & Visceral Fat Rating (1–12) benchmark",
            "Post-prandial glucose blunting protocols (apple cider vinegar, 15-min post-meal walks)",
            "Baseline nutrition audit & non-caloric fluid hydration targets"
          ]
        },
        {
          phase: "Phase 2 (Weeks 5–8)",
          title: "Muscle Preservation, Leucine Timing & Resistance Overload",
          bullets: [
            "Targeted protein thresholding (1.6g–2.2g/kg lean body mass) & leucine pulsing",
            "Progressive resistance hypertrophy split to defend metabolic resting rate",
            "Targeted visceral lipid oxidation & intermittent carbohydrate cycling"
          ]
        },
        {
          phase: "Phase 3 (Weeks 9–12)",
          title: "Consolidation, 14-Day Telemetry Sheets & GP Consultation Brief",
          bullets: [
            "14-day continuous biometric telemetry logging (Resting HR, Nocturnal HRV, Sleep)",
            "Sunday 10-parameter urinalysis tracking & Day 90 blood draw coordination",
            "Clinician leave-behind 1-page summary export for GP shared decision-making"
          ]
        }
      ],
      tableSchema: [
        { week: "Weeks 1–4", metric: "Visceral Fat baseline (1–12) + Fasting Glucose", action: "Daily bioimpedance weigh-in, post-meal glucose stabilization" },
        { week: "Weeks 5–8", metric: "Lean Muscle Mass (kg) + Waist-to-Height Ratio", action: "Progressive overload lifting split, leucine-timed meals" },
        { week: "Weeks 9–12", metric: "14-Day Telemetry Log + ApoB / HbA1c Lab Draw", action: "Print clinician summary sheet & co-evaluate with physician" }
      ]
    },
    {
      id: "workout-plan",
      pillar: "Fitness",
      title: "Beginner Home Workout Plan",
      price: "£0.30",
      usPrice: "$24.00",
      primaryImage: "/covers/beginner-home-workout-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
      description: "A 4-week zero-equipment protocol to build foundational strength and mobility from home.",
      badge: "PREMIUM GUIDE",
      highlights: [
        "4-Week Progressive Bodyweight Schedule",
        "VO2 Max Conditioning & Zone 2 Endurance",
        "Functional Joint Mobility & Muscle Preservation"
      ],
      checkoutUrl: "/checkout?product=workout-plan"
    },
    {
      id: "hypertrophy-strength",
      pillar: "Fitness",
      title: "Hypertrophy & Strength Protocol",
      price: "£29.00",
      usPrice: "$38.00",
      primaryImage: "/covers/hypertrophy-strength-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      description: "An evidence-based 8-week progressive overload system to break through plateaus and build dense skeletal muscle.",
      highlights: [
        "8-Week Periodized Hypertrophy Program",
        "Plateau-Breaking Volume & Intensity Guide",
        "Rep-in-Reserve (RIR) Progression Framework"
      ],
      checkoutUrl: "/checkout?product=hypertrophy-strength"
    },
    {
      id: "mobility-recovery",
      pillar: "Fitness",
      title: "Daily Mobility & Recovery Routine",
      price: "£15.00",
      usPrice: "$19.00",
      primaryImage: "/covers/daily-mobility-recovery-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      description: "A science-backed 15-minute blueprint for desk workers, athletes, and movers to restore joint kinematics and spine health.",
      highlights: [
        "15-Minute Daily Desk-Worker Flow",
        "Thoracic & Hip Mobility Protocols",
        "Active Recovery & Joint Longevity Sequence"
      ],
      checkoutUrl: "/checkout?product=mobility-recovery"
    },
    {
      id: "meal-planner",
      pillar: "Nutrition",
      title: "The Master Meal Planning Guide",
      price: "£24.00",
      usPrice: "$29.00",
      primaryImage: "/covers/master-meal-planning-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      description: "A systematic approach to weekly meal prep, grocery shopping, and macro-balancing that fits real, busy life.",
      highlights: [
        "Glucose Spike Mitigation Recipes",
        "Microbiome Diversity Grocery Checklist",
        "Anti-Inflammatory Meal Preparation"
      ],
      checkoutUrl: "/checkout?product=meal-planner"
    },
    {
      id: "fat-loss-blueprint",
      pillar: "Nutrition",
      title: "The Fat Loss Nutrition Blueprint",
      price: "£29.00",
      usPrice: "$38.00",
      primaryImage: "/covers/fat-loss-nutrition-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop",
      description: "Your science-based path to sustainable body recomposition and fat loss without metabolic slowdown or muscle loss.",
      highlights: [
        "Metabolic Rate Preservation Protocols",
        "Protein Satiety & Deficit Calculation",
        "Diet Break & Maintenance Transition Plan"
      ],
      checkoutUrl: "/checkout?product=fat-loss-blueprint"
    },
    {
      id: "high-protein-recipes",
      pillar: "Nutrition",
      title: "High-Protein Recipe Collection",
      price: "£19.00",
      usPrice: "$24.00",
      primaryImage: "/covers/high-protein-recipe-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      description: "Clinical & behavioural culinary systems for satiety, muscle preservation, and practical high-protein kitchen mastery.",
      highlights: [
        "30+ High-Protein Meal Formulations",
        "Macro-Engineered Satiety Index Recipes",
        "Batch-Cooking & Freezing Prep Framework"
      ],
      checkoutUrl: "/checkout?product=high-protein-recipes"
    },
    {
      id: "stress-management",
      pillar: "Wellness",
      title: "Cortisol & Stress Management",
      price: "£22.00",
      usPrice: "$28.00",
      primaryImage: "/covers/cortisol-stress-management-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
      description: "Actionable protocols to lower cortisol, manage chronic stress, and restore autonomic nervous system balance.",
      highlights: [
        "10-Minute NSDR Audio & Written Scripts",
        "Vagal Tone Exercises to Boost Nocturnal HRV",
        "Circadian Light & Adrenal Reset Guide"
      ],
      checkoutUrl: "/checkout?product=stress-management"
    },
    {
      id: "sleep-optimization",
      pillar: "Wellness",
      title: "Deep Sleep Optimization Protocol",
      price: "£25.00",
      usPrice: "$32.00",
      primaryImage: "/covers/deep-sleep-optimization-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
      description: "A 28-day actionable blueprint to maximize deep slow-wave sleep, optimize REM cycles, and eliminate nocturnal waking.",
      highlights: [
        "28-Day Actionable Sleep Architect Blueprint",
        "Thermal & Adenosine Cycle Timing Guide",
        "Nocturnal Awakening Rescue Protocol"
      ],
      checkoutUrl: "/checkout?product=sleep-optimization"
    },
    {
      id: "habit-reset",
      pillar: "Wellness",
      title: "Mindfulness & Habit Reset Workbook",
      price: "£18.00",
      usPrice: "$24.00",
      primaryImage: "/covers/mindfulness-habit-reset-cover.png",
      fallbackImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop",
      description: "A structured 21-day interactive journal to dismantle compulsive dopamine loops and build automatic longevity habits.",
      highlights: [
        "21-Day Guided Exercise Prompt Sheets",
        "Dopamine Detox & Cue-Routine Audits",
        "Friction-Based Habit Stacking Framework"
      ],
      checkoutUrl: "/checkout?product=habit-reset"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* Header */}
      <header className="relative py-20 border-b border-slate-900 bg-slate-950 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            ⚡ Actionable Master Execution Books
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Pillar Master Guides Catalog
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Translate high-level geroscience into simple daily execution. Download complete, step-by-step PDF books with workout plans, meal guides, and autonomic resets.
          </p>
        </div>
      </header>

      {/* 6-Card Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {isBypassActive && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/50 text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-emerald-950/40 animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white block">
                  ⚙️ Admin Test Mode: Paywall Bypass Active
                </span>
                <span className="text-xs text-emerald-300/90 font-medium">
                  Direct &ldquo;Test Download (Free Bypass)&rdquo; buttons are enabled across all 10 Master Guides &amp; bundles.
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-900/60 border border-emerald-700/60 text-emerald-200 px-3 py-1 rounded-full whitespace-nowrap">
              Admin Restricted Session
            </span>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masterGuides.map((guide) => (
            <div 
              key={guide.id}
              className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-cyan-500/40 hover:shadow-2xl transition duration-300 relative overflow-hidden"
            >
              <div className="space-y-5">
                
                {/* 3D Cover Image with Universal Multi-Path Resolver & PREMIUM GUIDE Badge */}
                <div className="aspect-[3/4] w-full rounded-xl bg-slate-950/90 border border-slate-800/80 overflow-hidden relative shadow-xl flex items-center justify-center p-2 group-hover:border-cyan-500/40 transition-colors">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg backdrop-blur-md">
                      {guide.badge || "PREMIUM GUIDE"}
                    </span>
                  </div>
                  <GuideCoverImage 
                    primaryImage={guide.primaryImage} 
                    fallbackImage={guide.fallbackImage} 
                    altText={guide.title} 
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                    {guide.pillar}
                  </span>
                  <h3 className="text-lg font-black text-white leading-snug">
                    {guide.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-amber-400">{guide.price}</span>
                    <span className="text-xs text-slate-500">({guide.usPrice})</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {guide.description}
                  </p>
                </div>

                <ul className="space-y-2 border-t border-slate-800 pt-4">
                  {guide.highlights.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">⚡</span> {item}
                    </li>
                  ))}
                </ul>

              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                {isBypassActive ? (
                  <a
                    href={getGuidePdfDownloadUrl(guide.id)}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Download size={14} className="text-slate-950" />
                    <span>Test Download (Free Bypass)</span>
                  </a>
                ) : (
                  <a
                    href={guide.checkoutUrl}
                    onClick={(e) => handleCheckoutClick(e, guide)}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-center block bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {guide.id === 'metabolic-master-guide' ? `Get Master Guide (${guide.price}) ➔` : `Buy Digital Master Book (${guide.price}) ➔`}
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedTocGuide(guide)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen size={13} className="text-cyan-400" />
                  <span>View Table of Contents ➔</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BUNDLES SHOWCASE */}
        <BundleOffers source="guides" />

      </main>

      {/* Table of Contents Preview Drawer / Modal */}
      {selectedTocGuide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
          onClick={() => setSelectedTocGuide(null)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800/80 flex items-start justify-between gap-4 bg-slate-950/40">
              <div className="flex items-center gap-4">
                <div className="w-14 h-18 shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                  <img 
                    src={selectedTocGuide.primaryImage} 
                    alt={selectedTocGuide.title} 
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      PREVIEW DRAWER
                    </span>
                    <span className="text-xs font-bold text-cyan-400">
                      {selectedTocGuide.pillar}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-1 leading-snug">
                    {selectedTocGuide.title}
                  </h3>
                  <div className="text-xs text-amber-400 font-bold mt-0.5">
                    {selectedTocGuide.price} <span className="text-slate-400 font-normal">({selectedTocGuide.usPrice})</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTocGuide(null)}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                aria-label="Close table of contents preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <div>
                <p className="text-slate-400 leading-relaxed font-sans">
                  {selectedTocGuide.description}
                </p>
              </div>

              {/* 3-Phase Overview */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-wider">
                  <Activity size={15} />
                  <span>3-Phase Protocol Architecture</span>
                </div>

                <div className="space-y-3">
                  {(selectedTocGuide.phases || [
                    {
                      phase: "Phase 1 (Weeks 1–4)",
                      title: "Foundations & Baseline Telemetry Calibration",
                      bullets: [
                        "Fasted morning bioimpedance calibration & Visceral Fat Rating (1–12) benchmark",
                        "Post-prandial glucose blunting protocols & baseline nutrition audit",
                        "Autonomic rest cadence and hydration optimization"
                      ]
                    },
                    {
                      phase: "Phase 2 (Weeks 5–8)",
                      title: "Targeted Interventions & Metabolic Overload",
                      bullets: [
                        "Targeted protein thresholding & lean muscle mass preservation split",
                        "Zone 2 cardio and resistance pacing to burn visceral lipid stores",
                        "Continuous metric tracking and mid-cycle calibration"
                      ]
                    },
                    {
                      phase: "Phase 3 (Weeks 9–12)",
                      title: "Consolidation & Clinician Leave-Behind Export",
                      bullets: [
                        "14-day continuous biometric telemetry logging (Resting HR, Nocturnal HRV, Sleep)",
                        "Sunday 10-parameter urinalysis tracking & Day 90 blood draw coordination",
                        "Clinician leave-behind 1-page summary export for GP shared decision-making"
                      ]
                    }
                  ]).map((phase, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">
                          {phase.phase}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Weeks {pIdx * 4 + 1}–{(pIdx + 1) * 4}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{phase.title}</h4>
                      <ul className="space-y-1 pt-1">
                        {phase.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-cyan-400 font-bold shrink-0">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biometric Logging Table Structures */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <FileText size={15} />
                  <span>Biometric Logging & Telemetry Schedule Schema</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                        <th className="py-2.5 px-3">Timeline</th>
                        <th className="py-2.5 px-3">Biometric Target</th>
                        <th className="py-2.5 px-3">Protocol Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 font-sans">
                      {(selectedTocGuide.tableSchema || [
                        { week: "Weeks 1–4", metric: "Visceral Fat baseline (1–12) + Fasting Glucose", action: "Daily bioimpedance weigh-in, post-meal glucose stabilization" },
                        { week: "Weeks 5–8", metric: "Lean Muscle Mass (kg) + Waist-to-Height Ratio", action: "Progressive overload lifting split, leucine-timed meals" },
                        { week: "Weeks 9–12", metric: "14-Day Telemetry Log + ApoB / HbA1c Lab Draw", action: "Print clinician summary sheet & co-evaluate with physician" }
                      ]).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                          <td className="py-2 px-3 font-mono text-cyan-400 whitespace-nowrap">{row.week}</td>
                          <td className="py-2 px-3 text-slate-200">{row.metric}</td>
                          <td className="py-2 px-3 text-slate-400">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-cyan-300">
                  <ShieldCheck size={14} /> Instant PDF Download & Lifetime Re-Access
                </span>
                <p className="text-[11px] text-slate-400">
                  Includes full vector tables, weekly logging charts, protein targets, and clinician export template.
                </p>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedTocGuide(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
              >
                Close Preview
              </button>

              {isBypassActive ? (
                <a
                  href={getGuidePdfDownloadUrl(selectedTocGuide.id)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Test Download (Free Bypass)</span>
                </a>
              ) : (
                <a
                  href={selectedTocGuide.checkoutUrl}
                  onClick={(e) => {
                    const g = selectedTocGuide;
                    setSelectedTocGuide(null);
                    handleCheckoutClick(e, g);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Master Guide ({selectedTocGuide.price})</span>
                  <ArrowRight size={14} />
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
