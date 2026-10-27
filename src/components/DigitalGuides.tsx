import React, { useState } from 'react';
import { Lock, ShieldCheck, Download, Sparkles, CheckCircle2, ArrowRight, BookOpen, X, Activity, FileText } from 'lucide-react';
import { GUIDE_PRODUCTS, DigitalGuideProduct } from '../data/guide-registry';
import BundleOffers from './BundleOffers';
import { usePaywallBypass, getGuidePdfDownloadUrl } from '../utils/adminTestMode';

interface DigitalGuidesProps {
  className?: string;
  showVaultBanner?: boolean;
}

export const DigitalGuides: React.FC<DigitalGuidesProps> = ({ 
  className = '', 
  showVaultBanner = true 
}) => {
  const [loadingGuideId, setLoadingGuideId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [selectedTocGuide, setSelectedTocGuide] = useState<DigitalGuideProduct | null>(null);
  const { isBypassActive } = usePaywallBypass();

  // Explicitly ensure ALL Master Guides are rendered in order (including the new Metabolic Master Protocol)
  const MASTER_GUIDE_KEYS = [
    'metabolic-master-guide',
    'beginner-home-workout',
    'hypertrophy-strength',
    'mobility-recovery',
    'master-meal-planning',
    'fat-loss-nutrition',
    'high-protein-recipes',
    'cortisol-stress-management',
    'sleep-optimization',
    'mindfulness-habit-reset'
  ];

  const guidesList: DigitalGuideProduct[] = MASTER_GUIDE_KEYS
    .map(key => GUIDE_PRODUCTS[key])
    .filter((g): g is DigitalGuideProduct => Boolean(g));

  const handleBuyNow = async (guideId: string) => {
    try {
      setCheckoutError(null);
      setLoadingGuideId(guideId);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guideId })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to initiate secure checkout');
      }

      const data = await response.json();
      if (data.url) {
        // Redirect directly to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (err: any) {
      console.error('[DigitalGuides] Checkout error:', err);
      setCheckoutError(err.message || 'Unable to connect to Stripe checkout. Please try again.');
      setLoadingGuideId(null);
    }
  };

  return (
    <section className={`w-full ${className}`}>
      {checkoutError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs sm:text-sm text-center">
          ⚠️ {checkoutError}
        </div>
      )}

      {isBypassActive && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/50 text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-emerald-950/40 animate-in fade-in">
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

      {/* 3-Column Master Guides Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {guidesList.map((guide) => {
          const isLoading = loadingGuideId === guide.id;

          return (
            <div
              key={guide.id}
              className="group p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl hover:border-cyan-500/40 hover:shadow-2xl transition duration-300 relative overflow-hidden"
            >
              <div className="space-y-5">
                
                {/* Visual Cover Box */}
                <div className="relative aspect-[3/4] max-w-[280px] mx-auto w-full flex items-center justify-center rounded-2xl bg-slate-950/90 border border-slate-800/80 overflow-hidden shadow-2xl p-2 group-hover:scale-[1.02] group-hover:border-cyan-500/40 transition-all duration-500">
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-lg backdrop-blur-md">
                    <span>PREMIUM GUIDE</span>
                  </div>

                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback placeholder image if cover path fails
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-contain rounded-xl drop-shadow-md transition-transform duration-500"
                  />
                </div>

                {/* Content Block */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                      {guide.pillar || 'Master Guide'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded">
                      Instant PDF
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                    {guide.title}
                  </h3>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400">
                      {guide.priceFormatted}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      (Instant Digital Download)
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                    {guide.description}
                  </p>
                </div>

                {/* What's Inside Checklist */}
                {guide.highlights && guide.highlights.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-2 text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What's Inside:</p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {guide.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Dynamic Purchase Trigger & Table of Contents Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                {isBypassActive ? (
                  <a
                    href={getGuidePdfDownloadUrl(guide.id)}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
                  >
                    <Download size={15} className="text-slate-950" />
                    <span>Test Download (Free Bypass)</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBuyNow(guide.id)}
                    disabled={isLoading}
                    className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        <span>Opening Secure Checkout...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} className="text-slate-900" />
                        <span>{guide.id === 'metabolic-master-guide' ? `Get Master Guide (${guide.priceFormatted})` : `Buy Now — ${guide.priceFormatted}`}</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedTocGuide(guide)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen size={13} className="text-cyan-400" />
                  <span>View Table of Contents ➔</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono">
                  <ShieldCheck size={11} className="text-emerald-400" />
                  <span>Stripe 256-Bit SSL • Instant R2 Download</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Table of Contents Preview Drawer / Modal for Digital Guides */}
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
                    src={selectedTocGuide.coverImage} 
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
                    {selectedTocGuide.priceFormatted} <span className="text-slate-400 font-normal">(Instant Vector PDF)</span>
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
                  {[
                    {
                      phase: "Phase 1 (Weeks 1–4)",
                      title: "Foundations, Glycemic Blunting & Scale Calibration",
                      bullets: [
                        "Fasted morning bioimpedance calibration & Visceral Fat Rating (1–12) benchmark",
                        "Post-prandial glucose blunting protocols & baseline nutrition audit",
                        "Autonomic rest cadence and non-caloric fluid hydration targets"
                      ]
                    },
                    {
                      phase: "Phase 2 (Weeks 5–8)",
                      title: "Muscle Preservation, Leucine Timing & Resistance Overload",
                      bullets: [
                        "Targeted protein thresholding (1.6g–2.2g/kg lean body mass) & leucine pulsing",
                        "Progressive resistance hypertrophy split to defend metabolic resting rate",
                        "Targeted visceral lipid oxidation & carbohydrate cycling routines"
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
                  ].map((phase, pIdx) => (
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
                      {[
                        { week: "Weeks 1–4", metric: "Visceral Fat baseline (1–12) + Fasting Glucose", action: "Daily bioimpedance weigh-in, post-meal glucose stabilization" },
                        { week: "Weeks 5–8", metric: "Lean Muscle Mass (kg) + Waist-to-Height Ratio", action: "Progressive overload lifting split, leucine-timed meals" },
                        { week: "Weeks 9–12", metric: "14-Day Telemetry Log + ApoB / HbA1c Lab Draw", action: "Print clinician summary sheet & co-evaluate with physician" }
                      ].map((row, rIdx) => (
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
                  Direct digital download upon Stripe purchase verification. Presigned secure link.
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
                <button
                  type="button"
                  onClick={() => {
                    const gId = selectedTocGuide.id;
                    setSelectedTocGuide(null);
                    handleBuyNow(gId);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Master Guide ({selectedTocGuide.priceFormatted})</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Master Protocol Bundles (Pick 3 for £29.99 or Complete 10 Vault for £59.99) */}
      {showVaultBanner && (
        <div className="mt-14">
          <BundleOffers source="library" />
        </div>
      )}
    </section>
  );
};
