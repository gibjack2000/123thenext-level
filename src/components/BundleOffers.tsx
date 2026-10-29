import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Download, 
  Layers, 
  BookOpen, 
  Flame,
  Check,
  AlertCircle
} from 'lucide-react';
import { usePaywallBypass, downloadMultipleGuides } from '../utils/adminTestMode';

export interface BundleMasterGuide {
  id: string;
  productId: string;
  title: string;
  pillar: string;
  coverImage: string;
  fallbackImage?: string;
  priceFormatted: string;
  shortDesc: string;
  fileKey: string;
}

export const ALL_10_MASTER_GUIDES: BundleMasterGuide[] = [
  {
    id: 'metabolic-master-guide',
    productId: 'g-met-1',
    title: 'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
    pillar: 'Metabolic Health & Body Composition',
    coverImage: '/assets/images/metabolic_nutrition_cover_New.png',
    fallbackImage: '/covers/metabolic_nutrition_cover_New.png',
    priceFormatted: '£19.00',
    shortDesc: 'A phased biometric blueprint to strip deep visceral organ fat and optimize glycemic control.',
    fileKey: 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf'
  },
  {
    id: 'beginner-home-workout',
    productId: 'g-fit-1',
    title: 'Beginner Home Workout Plan',
    pillar: 'Fitness & Physical Integrity',
    coverImage: '/covers/beginner-home-workout-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£0.30',
    shortDesc: 'A 4-week zero-equipment protocol to build foundational strength and mobility from home.',
    fileKey: 'beginner_home_workout-2026.pdf'
  },
  {
    id: 'hypertrophy-strength',
    productId: 'g-fit-2',
    title: 'Hypertrophy & Strength Protocol',
    pillar: 'Fitness & Physical Integrity',
    coverImage: '/covers/hypertrophy-strength-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£29.00',
    shortDesc: 'An evidence-based 8-week progressive overload system to build dense skeletal muscle.',
    fileKey: 'Hypertrophy-Strength-Protocol-2026.pdf'
  },
  {
    id: 'mobility-recovery',
    productId: 'g-fit-3',
    title: 'Daily Mobility & Recovery Routine',
    pillar: 'Fitness & Physical Integrity',
    coverImage: '/covers/daily-mobility-recovery-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£15.00',
    shortDesc: 'A 15-minute daily restorative mobility routine to eliminate joint pain and stiffness.',
    fileKey: 'Daily_Mobility_and_Recovery-2026.pdf'
  },
  {
    id: 'master-meal-planning',
    productId: 'g-nut-1',
    title: 'The Master Meal Planning Guide',
    pillar: 'Metabolic Nutrition',
    coverImage: '/covers/the-master-meal-planning-guide-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£24.00',
    shortDesc: 'Batch-cooking protocols and macronutrient calculators to streamline longevity nutrition.',
    fileKey: 'The Master_Meal_Planning_Guide-2026.pdf'
  },
  {
    id: 'fat-loss-nutrition',
    productId: 'g-nut-2',
    title: 'Fat Loss Nutrition Blueprint',
    pillar: 'Metabolic Nutrition',
    coverImage: '/covers/fat-loss-nutrition-blueprint-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£29.00',
    shortDesc: 'Caloric periodization, refeed strategies, and hormonal protection for steady fat loss.',
    fileKey: 'Fat-Loss-Nutrition-Blueprint-2026.pdf'
  },
  {
    id: 'high-protein-recipes',
    productId: 'g-nut-3',
    title: 'High-Protein Recipe Collection',
    pillar: 'Metabolic Nutrition',
    coverImage: '/covers/high-protein-recipe-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£19.00',
    shortDesc: '50 chef-crafted, high-protein recipes optimized for satiety and muscle protein synthesis.',
    fileKey: 'High_Protein_Recipe_Collection-2026.pdf'
  },
  {
    id: 'cortisol-stress-management',
    productId: 'g-wel-1',
    title: 'Cortisol & Stress Management Protocol',
    pillar: 'Autonomic & Neural Balance',
    coverImage: '/covers/cortisol-stress-management-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£22.00',
    shortDesc: 'NSDR, physiological sigh protocols, and cortisol mapping to balance the autonomic system.',
    fileKey: 'Cortisol_&_Stress_Management-2026.pdf'
  },
  {
    id: 'sleep-optimization',
    productId: 'g-wel-2',
    title: 'Deep Sleep Optimization Protocol',
    pillar: 'Autonomic & Neural Balance',
    coverImage: '/covers/deep-sleep-optimization-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£25.00',
    shortDesc: 'Circadian lighting rules, sleep architecture optimization, and slow-wave sleep expansion.',
    fileKey: 'Deep_Sleep_Optimization-2026.pdf'
  },
  {
    id: 'mindfulness-habit-reset',
    productId: 'g-wel-3',
    title: 'Mindfulness & Habit Reset Workbook',
    pillar: 'Autonomic & Neural Balance',
    coverImage: '/covers/mindfulness-habit-reset-cover.png',
    fallbackImage: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop',
    priceFormatted: '£18.00',
    shortDesc: 'A 21-day neuroplasticity workbook to rewire dopamine baselines and lock in longevity habits.',
    fileKey: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf'
  }
];

interface BundleOffersProps {
  className?: string;
  source?: 'guides' | 'store' | 'library';
}

export const BundleOffers: React.FC<BundleOffersProps> = ({ 
  className = '',
  source = 'guides' 
}) => {
  const navigate = useNavigate();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedGuideIds, setSelectedGuideIds] = useState<string[]>([
    'metabolic-master-guide',
    'hypertrophy-strength',
    'sleep-optimization'
  ]);
  const [pickerWarning, setPickerWarning] = useState<string | null>(null);
  const { isBypassActive } = usePaywallBypass();

  const toggleGuideSelection = (id: string) => {
    setPickerWarning(null);
    if (selectedGuideIds.includes(id)) {
      setSelectedGuideIds(prev => prev.filter(item => item !== id));
    } else {
      if (selectedGuideIds.length >= 3) {
        setPickerWarning('You have selected 3 guides. Please deselect one first to add a different guide.');
        return;
      }
      setSelectedGuideIds(prev => [...prev, id]);
    }
  };

  const handleProceedPick3Checkout = () => {
    if (selectedGuideIds.length !== 3) {
      setPickerWarning('Please select exactly 3 guides to proceed with the Custom Trio Bundle.');
      return;
    }
    const query = new URLSearchParams({
      bundle: 'bundle-pick-3',
      guides: selectedGuideIds.join(','),
      source: source
    }).toString();
    navigate(`/checkout?${query}`);
  };

  const handleCompleteVaultCheckout = () => {
    const query = new URLSearchParams({
      bundle: 'bundle-complete-vault-10',
      source: source
    }).toString();
    navigate(`/checkout?${query}`);
  };

  const isCompleteTrio = selectedGuideIds.length === 3;

  return (
    <section className={`space-y-8 ${className}`} aria-label="Premium Master Guide Bundles">
      
      {/* Bundles Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Sparkles size={12} /> Curated Protocol Bundles
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
          Accelerate Your Longevity Protocol With A Master Bundle
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Bundle multiple actionable execution books to synchronize your body composition, metabolic nutrition, and autonomic nervous system.
        </p>
      </div>

      {/* 2-Column Responsive Bundle Showcase Grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        
        {/* ========================================================================= */}
        {/* BUNDLE 1: "Pick Any 3 Master Guides" (£29.99 / $29.99 / €29.99)           */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Custom Trio Bundle
              </span>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                Save Over 50%
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2 text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Pick Any 3 Master Guides
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Choose any 3 of our 10 Premium Master Guides to build your tailored longevity and healthspan protocol.
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 line-through block">Combined Value: up to £77.00</span>
                <span className="text-3xl sm:text-4xl font-black text-cyan-400">£29.99</span>
                <span className="text-[11px] text-slate-400 block pt-0.5">$29.99 USD • 29,99€ EUR</span>
              </div>
              <span className="text-right text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1.5 rounded-xl">
                Just £10 / Guide
              </span>
            </div>

            {/* Feature Bullets */}
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4 text-left">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                <span>Interactive selector: Choose any 3 of the 10 Master Execution Books</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                <span>Includes the new 12-Week Metabolic &amp; Visceral Fat Protocol</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                <span>Instant high-resolution PDF downloads &amp; lifetime updates</span>
              </li>
            </ul>

            {/* Quick preview of currently selected 3 guides */}
            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2 text-left">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span>Selected Trio Preview ({selectedGuideIds.length}/3):</span>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                >
                  Change Selection
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedGuideIds.map(id => {
                  const g = ALL_10_MASTER_GUIDES.find(item => item.id === id);
                  return (
                    <span 
                      key={id} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-700 text-slate-200"
                    >
                      <Check size={11} className="text-cyan-400" />
                      <span className="truncate max-w-[180px]">{g?.title || id}</span>
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Primary CTA */}
          <div className="pt-6 relative z-10">
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className={`w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${
                isBypassActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <Layers size={16} />
              <span>{isBypassActive ? 'Select & Test Download 3 Guides (Free Bypass) ➔' : 'Select Your 3 Guides (£29.99) ➔'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BUNDLE 2: "Complete 10-Guide Master Vault" (£59.99 / $59.99 / €59.99)      */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-900 border-2 border-amber-500/50 hover:border-amber-400 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Most Popular Badge Pill */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xl flex items-center gap-1.5">
              👑 MOST POPULAR • BEST VALUE
            </span>
          </div>

          <div className="space-y-6 relative z-10 pt-2">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Complete Vault Access
              </span>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                ⚡ Save Over 70%
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2 text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Complete 10-Guide Master Vault
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Instant access to all 10 Premium Master Guides — covering body composition, metabolic nutrition, autonomic engineering, women's health, home fitness, and clinical telemetry.
              </p>
            </div>

            {/* Visual Display of ALL 10 Guide Thumbnails */}
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1">
                <span className="text-amber-400 flex items-center gap-1">
                  <Flame size={12} /> All 10 Covers Included
                </span>
                <span>Instant 1-Click ZIP + 10 PDFs</span>
              </div>

              {/* 10-Cover Visual Fan / Micro Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 items-center justify-center">
                {ALL_10_MASTER_GUIDES.map((g) => (
                  <div 
                    key={g.id}
                    title={g.title}
                    className="aspect-[3/4] rounded-md bg-slate-900 border border-slate-700/80 overflow-hidden relative shadow-md group/thumb hover:scale-110 hover:border-amber-400 transition-transform duration-300"
                  >
                    <img 
                      src={g.coverImage} 
                      alt={g.title}
                      loading="lazy"
                      onError={(e) => {
                        if (g.fallbackImage) {
                          (e.currentTarget as HTMLImageElement).src = g.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 line-through block">Combined Value: £220.00</span>
                <span className="text-3xl sm:text-4xl font-black text-amber-400">£59.99</span>
                <span className="text-[11px] text-slate-400 block pt-0.5">$59.99 USD • 59,99€ EUR</span>
              </div>
              <span className="text-right text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-800/40 px-3 py-1.5 rounded-xl">
                Just £5.99 / Guide
              </span>
            </div>

            {/* Feature Bullets */}
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4 text-left">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                <span>All 10 High-Res PDF Master Execution Books unlocked instantly</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                <span>1-Click ZIP Archive (`all-ten-master-guides.zip`) for zero popup blockers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                <span>Includes 2026 revisions, printable telemetry sheets &amp; GP leave-behind protocols</span>
              </li>
            </ul>

          </div>

          {/* Primary CTA */}
          <div className="pt-6 relative z-10">
            {isBypassActive ? (
              <button
                type="button"
                onClick={() => {
                  downloadMultipleGuides(ALL_10_MASTER_GUIDES.map(g => g.id));
                }}
                className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={16} />
                <span>Test Download Complete 10 Vault (Free Bypass)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteVaultCheckout}
                className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all shadow-xl shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={16} />
                <span>Unlock All 10 Guides (£59.99 / $59.99 / €59.99) ➔</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: Custom 3-Guide Selector Modal                          */}
      {/* ========================================================================= */}
      {isPickerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bundle-picker-title"
        >
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/90 flex items-start justify-between gap-4">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Custom Trio Bundle
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isCompleteTrio 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    Selected: {selectedGuideIds.length} / 3
                  </span>
                </div>
                <h3 id="bundle-picker-title" className="text-xl sm:text-2xl font-black text-white">
                  Choose Your 3 Master Execution Guides
                </h3>
                <p className="text-xs text-slate-400">
                  Select any 3 specialized protocols for £29.99 (Saves over 50% vs £77 individual pricing).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close guide selection modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Validation warning banner if needed */}
            {pickerWarning && (
              <div className="bg-amber-950/70 border-b border-amber-500/40 px-5 py-2.5 text-xs text-amber-200 flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-400 shrink-0" />
                <span>{pickerWarning}</span>
              </div>
            )}

            {/* Modal Scrollable Guide Grid */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {ALL_10_MASTER_GUIDES.map((guide) => {
                  const isSelected = selectedGuideIds.includes(guide.id);
                  return (
                    <div
                      key={guide.id}
                      onClick={() => toggleGuideSelection(guide.id)}
                      className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer select-none ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/10 scale-[1.01]'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      {/* Thumbnail Cover */}
                      <div className="w-16 h-22 sm:w-20 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-md">
                        <img 
                          src={guide.coverImage} 
                          alt={guide.title}
                          loading="lazy"
                          onError={(e) => {
                            if (guide.fallbackImage) {
                              (e.currentTarget as HTMLImageElement).src = guide.fallbackImage;
                            }
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info & Checkbox */}
                      <div className="flex-1 min-w-0 space-y-1.5 text-left">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block truncate">
                            {guide.pillar}
                          </span>
                          
                          {/* Animated Checkbox Indicator */}
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                            isSelected 
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/30' 
                              : 'border-slate-700 bg-slate-900'
                          }`}>
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </div>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                          {guide.title}
                        </h4>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {guide.shortDesc}
                        </p>

                        <div className="pt-1 flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 line-through">
                            {guide.priceFormatted}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400">
                            Included in Trio
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Sticky Footer */}
            <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-300 block">
                  {isCompleteTrio 
                    ? '✓ 3 Guides selected! Ready to proceed.' 
                    : `Please choose ${3 - selectedGuideIds.length} more guide${selectedGuideIds.length === 2 ? '' : 's'}.`}
                </span>
                <span className="text-[11px] text-slate-500">
                  Total price: <strong className="text-cyan-400">£29.99</strong> ($29.99 / 29,99€)
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>

                {isBypassActive ? (
                  <button
                    type="button"
                    disabled={!isCompleteTrio}
                    onClick={() => {
                      downloadMultipleGuides(selectedGuideIds);
                      setIsPickerOpen(false);
                    }}
                    className={`w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                      isCompleteTrio
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    <Download size={15} />
                    <span>Test Download Selected 3 (Free Bypass)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!isCompleteTrio}
                    onClick={handleProceedPick3Checkout}
                    className={`w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                      isCompleteTrio
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    <span>Proceed to Checkout (£29.99 / $29.99 / €29.99)</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default BundleOffers;
