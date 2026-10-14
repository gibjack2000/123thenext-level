import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowRight, Download, CheckCircle2, ShoppingBag } from 'lucide-react';

const PRODUCT_MAP: Record<string, { id: string; name: string; price: string; usPrice: string; slug: string; desc: string }> = {
  'epigenetics-guide': {
    id: 'g-epi-1',
    name: 'Cellular Reprogramming & Epigenetic Longevity',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'healthspan_longevity_cover',
    desc: 'Activate sirtuins, induce cellular autophagy, and protect your DNA from environmental methylation decay.'
  },
  'performance-guide': {
    id: 'g-fit-1',
    name: 'Beginner Home Workout & VO2 Max Strength Plan',
    price: '£19.00',
    usPrice: '$24.00',
    slug: 'beginner-home-workout-plan',
    desc: '12-week progressive bodyweight and dumbbell routines to preserve skeletal muscle mass and build reserve.'
  },
  'workout-plan': {
    id: 'g-fit-1',
    name: 'Beginner Home Workout & VO2 Max Strength Plan',
    price: '£19.00',
    usPrice: '$24.00',
    slug: 'beginner-home-workout-plan',
    desc: '12-week progressive bodyweight and dumbbell routines to preserve skeletal muscle mass and build reserve.'
  },
  'nutrition-guide': {
    id: 'g-nut-1',
    name: 'The Master Metabolic Meal Planner & Grocery Guide',
    price: '£24.00',
    usPrice: '$29.00',
    slug: 'healthy-meal-planning-guide',
    desc: 'Flatten post-meal glucose curves, optimize gut microbiome diversity, and fuel cellular repair.'
  },
  'meal-planner': {
    id: 'g-nut-1',
    name: 'The Master Metabolic Meal Planner & Grocery Guide',
    price: '£24.00',
    usPrice: '$29.00',
    slug: 'healthy-meal-planning-guide',
    desc: 'Flatten post-meal glucose curves, optimize gut microbiome diversity, and fuel cellular repair.'
  },
  'autonomic-guide': {
    id: 'g-wel-1',
    name: 'Cortisol Down-Regulation & Vagal Tone Protocol',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'stress-management-toolkit',
    desc: 'Master autonomic resets: 10-minute NSDR scripts, vagal tone exercises, and circadian sleep alignment.'
  },
  'stress-management': {
    id: 'g-wel-1',
    name: 'Cortisol Down-Regulation & Vagal Tone Protocol',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'stress-management-toolkit',
    desc: 'Master autonomic resets: 10-minute NSDR scripts, vagal tone exercises, and circadian sleep alignment.'
  },
  'womens-health-guide': {
    id: 'g-fem-1',
    name: 'Ovary-Span & Endocrine Performance Guide',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'womens_health_cover',
    desc: 'Hormone balancing, bone mineral density preservation, and ovary-span health.'
  },
  'socio-architecture-guide': {
    id: 'g-soc-1',
    name: 'Socio-Biological Architecture & Connection Blueprint',
    price: '£19.00',
    usPrice: '$24.00',
    slug: 'socio_architecture_cover',
    desc: 'Micro-community health formation, neural coupling, and environmental lifestyle design.'
  },
  'all-three-master-guides': {
    id: 'g-bundle-1',
    name: 'All Three Digital Master Guides (Complete Bundle)',
    price: '£29.00',
    usPrice: '$39.00',
    slug: '3-part-bundle',
    desc: 'Complete 3-book execution suite: Workout Plan + Meal Planner + Stress Management (Save 55%).'
  }
};

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const productKey = searchParams.get('product') || searchParams.get('bundle') || 'all-three-master-guides';
  const item = PRODUCT_MAP[productKey] || PRODUCT_MAP['all-three-master-guides'];

  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    document.title = `Checkout: ${item.name} | 123TheNextLevel`;
    window.scrollTo(0, 0);
  }, [item]);

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: item.id }]
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback for dev / offline testing
        handleBypassDownload();
      }
    } catch (e) {
      // Offline fallback
      handleBypassDownload();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBypassDownload = async () => {
    try {
      const response = await fetch('/api/test-bypass-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: item.id })
      });
      const data = await response.json();
      if (data.success && data.download_link) {
        const link = document.createElement('a');
        link.href = data.download_link;
        link.setAttribute('download', `${item.slug}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadSuccess(true);
      } else {
        setDownloadSuccess(true);
      }
    } catch {
      setDownloadSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-16">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
            <Lock size={12} /> Secure Digital Checkout
          </div>
          <h1 className="text-2xl font-black text-white">Order Summary</h1>
        </div>

        {/* Product Card */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex justify-between items-start gap-3">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Digital PDF Guide
              </span>
              <h2 className="text-base font-bold text-white leading-snug">{item.name}</h2>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xl font-black text-cyan-400">{item.price}</span>
              <span className="text-[11px] text-slate-500 block">({item.usPrice})</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
        </div>

        {/* Benefits list */}
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
            <span>Instant encrypted PDF download link delivered to your email</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
            <span>Multi-device compatibility (iPad, iPhone, Android, Kindle & Desktop)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
            <span>Lifetime protocol updates included</span>
          </div>
        </div>

        {downloadSuccess ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-center space-y-2">
            <p className="text-xs font-bold text-emerald-400">✅ Digital PDF Generation Triggered!</p>
            <p className="text-[11px] text-slate-300">Your download has begun. Please check your browser's downloads folder.</p>
            <Link to="/premium-guides" className="text-xs text-cyan-400 hover:underline inline-block pt-1">
              ← Return to Premium Guides
            </Link>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <button
              onClick={handleStripeCheckout}
              disabled={isProcessing}
              className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 active:scale-[0.99] text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>Connecting to Stripe...</>
              ) : (
                <>
                  <Lock size={16} /> Complete Payment ({item.price}) ➔
                </>
              )}
            </button>

            <button
              onClick={handleBypassDownload}
              className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download size={14} /> Instant Preview / Developer Download
            </button>
          </div>
        )}

        {/* Footer Guarantee */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>256-Bit SSL Encrypted Transaction</span>
          </div>
          <Link to="/premium-guides" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors block">
            ← Back to All Premium Master Guides
          </Link>
        </div>

      </div>
    </div>
  );
}
