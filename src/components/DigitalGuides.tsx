import React, { useState } from 'react';
import { Lock, ShieldCheck, Download, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { GUIDE_PRODUCTS, DigitalGuideProduct } from '../data/guide-registry';

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

  const guidesList: DigitalGuideProduct[] = Object.values(GUIDE_PRODUCTS);

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
                <div className="relative aspect-[4/5] max-w-[260px] mx-auto w-full flex items-center justify-center rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700/80 text-[10px] font-bold text-slate-300 backdrop-blur-md">
                    <Lock size={10} className="text-amber-400" />
                    <span>R2 Vault</span>
                  </div>

                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    onError={(e) => {
                      // Fallback placeholder image if cover path fails
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      (Locked in Cloudflare R2)
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

              {/* Dynamic Purchase Trigger Button */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <button
                  type="button"
                  onClick={() => handleBuyNow(guide.id)}
                  disabled={isLoading}
                  className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Opening Stripe Checkout...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={14} className="text-cyan-200" />
                      <span>Buy Now — {guide.priceFormatted}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
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

      {/* Complete 9-Book Master Longevity Vault Promo */}
      {showVaultBanner && (
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase tracking-widest">
              <span>👑 Complete Master Vault (Save Over 70%)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Want All 9 Digital Master Execution Books?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlock the entire library: 3 Fitness Blueprints + 3 Nutrition Manuals + 3 Autonomic Wellness Systems in high-res PDF. Includes instant 1-Click ZIP Archive (`Complete_9_Book_Master_Vault-2026.zip`).
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto flex flex-col items-center lg:items-end gap-3">
            <div className="text-center lg:text-right">
              <span className="text-xs text-slate-500 line-through block">Combined Value: £200.00</span>
              <span className="text-3xl sm:text-4xl font-black text-amber-400">£59.99</span>
              <span className="text-[11px] text-slate-400 block">$75.00 / 69,00€</span>
            </div>
            <a
              href="/checkout?bundle=all-nine-master-guides"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <span>Get All 9 Books (£59.99)</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
