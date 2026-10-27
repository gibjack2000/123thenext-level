import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { guides } from '../../data/guides';
import { useCart } from '../../contexts/CartContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShoppingCart, 
  Download, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { usePaywallBypass, getGuidePdfDownloadUrl } from '../../utils/adminTestMode';

interface PurchaseInfo {
  purchased: boolean;
  downloadUrl: string;
  expiresAt: string;
}

export default function PremiumGuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, isInCart, openCart, cartCount, cartSubtotal, currencySymbol } = useCart();
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [directCheckoutLoading, setDirectCheckoutLoading] = useState(false);
  const { isBypassActive } = usePaywallBypass();
  const slugAliases: Record<string, string> = {
    // Fitness
    'beginner-home-workout': 'beginner-home-workout-plan',
    'workout-plan': 'beginner-home-workout-plan',
    'hypertrophy-strength': 'strength-training-hypertrophy',
    'hypertrophy-protocol': 'strength-training-hypertrophy',
    'daily-mobility-recovery': 'mobility-recovery-routine',
    'mobility-recovery': 'mobility-recovery-routine',

    // Nutrition
    'master-meal-planning': 'healthy-meal-planning-guide',
    'master-meal-planning-guide': 'healthy-meal-planning-guide',
    'meal-planner': 'healthy-meal-planning-guide',
    'fat-loss-blueprint': 'fat-loss-nutrition-blueprint',
    'fat-loss-nutrition': 'fat-loss-nutrition-blueprint',
    'high-protein-recipes': 'high-protein-recipe-collection',

    // Wellness
    'cortisol-stress-management': 'stress-management-toolkit',
    'cortisol-stress-management-protocol': 'stress-management-toolkit',
    'stress-management': 'stress-management-toolkit',
    'deep-sleep-optimization': 'sleep-optimization-protocol',
    'sleep-optimization': 'sleep-optimization-protocol',
    'mindfulness-habit-reset-workbook': 'mindfulness-habit-reset',
    'habit-reset-workbook': 'mindfulness-habit-reset',
  };

  const normalizedSlug = slug ? slug.toLowerCase().trim() : '';
  const resolvedSlug = slugAliases[normalizedSlug] || normalizedSlug;
  const guide = guides.find(g => g.slug === resolvedSlug || g.id === normalizedSlug || g.slug === normalizedSlug);


  useEffect(() => {
    if (!guide) return;
    
    // Check localStorage to see if this guide was purchased and token is still active
    try {
      const savedPurchases = localStorage.getItem('purchased_guides');
      if (savedPurchases) {
        const purchases = JSON.parse(savedPurchases);
        const info = purchases[guide.id];
        if (info && info.purchased) {
          // Verify if token is still valid (not expired)
          if (new Date() < new Date(info.expiresAt)) {
            setPurchaseInfo(info);
          } else {
            // Remove expired token
            delete purchases[guide.id];
            localStorage.setItem('purchased_guides', JSON.stringify(purchases));
          }
        }
      }
    } catch (e) {
      console.error('Error loading purchases from localStorage:', e);
    }
  }, [guide]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center justify-center p-6 pt-32">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight">Guide Not Found</h1>
          <p className="text-slate-455 mb-8 text-sm leading-relaxed">
            The guide you are looking for does not exist or has been moved.
          </p>
          <Link to="/premium-guides" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-colors shadow-lg">
            <ArrowLeft size={14} className="mr-2" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (!purchaseInfo?.downloadUrl) return;
    setDownloading(true);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = purchaseInfo.downloadUrl;
    link.setAttribute('download', `${guide.slug}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setDownloading(false), 2000);
  };

  const getRemainingTime = () => {
    if (!purchaseInfo?.expiresAt) return '';
    const diffMs = new Date(purchaseInfo.expiresAt).getTime() - Date.now();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    if (diffHours <= 0) return 'Expired';
    return `${diffHours} hours remaining`;
  };

  const handleBypassTest = async () => {
    setDownloading(true);
    try {
      const response = await fetch('/api/test-bypass-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: guide.id })
      });
      const data = await response.json();
      if (data.success && data.download_link) {
        const savedPurchases = localStorage.getItem('purchased_guides');
        let purchases: any = {};
        if (savedPurchases) {
          try { purchases = JSON.parse(savedPurchases); } catch (e) {}
        }
        const info = {
          purchased: true,
          downloadUrl: data.download_link,
          expiresAt: data.expires_at
        };
        purchases[guide.id] = info;
        localStorage.setItem('purchased_guides', JSON.stringify(purchases));
        
        // Trigger download
        const link = document.createElement('a');
        link.href = data.download_link;
        link.setAttribute('download', `${guide.slug}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setPurchaseInfo(info);
      } else {
        alert('Bypass checkout test failed: ' + (data.error || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Network error testing download bypass.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 pb-24 pt-32 relative overflow-x-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-20">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link to="/premium-guides" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-black uppercase tracking-widest text-xs transition-colors">
            <ArrowLeft size={16} /> Back to Premium Guides
          </Link>

          {cartCount > 0 && (
            <button
              type="button"
              onClick={openCart}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-cyan-400 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer group"
            >
              <ShoppingCart size={14} className="group-hover:scale-110 transition-transform" />
              <span>View Cart ({cartCount}) • {currencySymbol}{cartSubtotal.toFixed(2)}</span>
            </button>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image & Call to Action (Buy/Download) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] w-full relative bg-slate-800">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700">
                    {guide.category}
                  </span>
                  {guide.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-1">
                      <Sparkles size={10} /> Bestseller
                    </span>
                  )}
                </div>
              </div>

              {/* Transaction Box */}
              <div className="p-8 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
                
                {purchaseInfo ? (
                  /* Download Interface */
                  <div className="space-y-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck size={12} /> Purchased & Verified
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Instant PDF Access</h4>
                      <p className="text-slate-450 text-[11px] font-medium uppercase tracking-wider text-emerald-500/80">
                        {getRemainingTime()}
                      </p>
                    </div>

                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-550 disabled:bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/10"
                    >
                      {downloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={14} />
                          <span>Download PDF Guide</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                      Token allows maximum of 3 downloads. Save your file locally.
                    </p>
                  </div>
                ) : (
                  /* Purchase Interface */
                  <div className="space-y-6">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="block text-[9px] font-black text-slate-550 uppercase tracking-widest mb-0.5">Price</span>
                        <span className="text-3xl font-black text-white">{guide.priceDisplay}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                        <Lock size={12} /> One-time Buy
                      </span>
                    </div>

                    <div className="space-y-3">
                      {isBypassActive && (
                        <div className="p-3 bg-emerald-950/60 border border-emerald-550/40 rounded-2xl space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block text-center">
                            ⚙️ Admin Test Mode Active
                          </span>
                          <a
                            href={getGuidePdfDownloadUrl(guide.slug || guide.id)}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 cursor-pointer"
                          >
                            <Download size={16} />
                            <span>Test Download (Free Bypass)</span>
                          </a>
                        </div>
                      )}

                      {isInCart(guide.id) ? (
                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={openCart}
                            className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 cursor-pointer active:scale-98"
                          >
                            <ShoppingCart size={16} />
                            <span>View Cart &amp; Checkout ({currencySymbol}{cartSubtotal.toFixed(2)}) ➔</span>
                          </button>
                          <p className="text-[11px] text-center text-emerald-400 font-semibold leading-relaxed">
                            ✓ Added to your cart. Click above to complete checkout.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(guide);
                              openCart();
                            }}
                            className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25 bg-blue-600 hover:bg-blue-500 text-white cursor-pointer active:scale-98"
                          >
                            <ShoppingCart size={16} />
                            <span>Add to Cart ({guide.priceDisplay})</span>
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              setDirectCheckoutLoading(true);
                              try {
                                const response = await fetch('/api/create-checkout-session', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    guideId: guide.id,
                                    items: [{ id: guide.id, title: guide.title, priceDisplay: guide.priceDisplay }]
                                  }),
                                });
                                const data = await response.json();
                                if (data.url) {
                                  window.location.href = data.url;
                                } else {
                                  addToCart(guide);
                                  openCart();
                                }
                              } catch {
                                addToCart(guide);
                                openCart();
                              } finally {
                                setDirectCheckoutLoading(false);
                              }
                            }}
                            disabled={directCheckoutLoading}
                            className="w-full py-3 rounded-xl border border-slate-750 hover:border-slate-650 bg-slate-850/80 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                          >
                            {directCheckoutLoading ? (
                              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <Lock size={12} className="text-amber-400" />
                            )}
                            <span>Instant 1-Click Buy ({guide.priceDisplay})</span>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-[9px] text-slate-555 font-black uppercase tracking-wider">
                      <ShieldCheck size={12} className="text-blue-500" /> Secure Payment via Stripe
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Details */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header Details */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                  {guide.category}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <FileText size={14} /> Digital PDF Guide
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight mb-6">
                {guide.title}
              </h1>
              <p className="text-lg text-slate-350 leading-relaxed font-light">
                {guide.longDescription}
              </p>
            </div>

            {/* Inclusions */}
            <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-3xl">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">What's Included in This Protocol</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guide.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience & Disclaimer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-3">Who It's Engineered For</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {guide.audience}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-3">Disclaimer & Terms</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-medium">
                  {guide.disclaimer}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
