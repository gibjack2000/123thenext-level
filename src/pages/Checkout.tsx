import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Lock, ShieldCheck, Download, CheckCircle2, FileText, RefreshCw, ExternalLink } from 'lucide-react';
import { 
  handleSecureGuideDownload, 
  triggerBrowserDownload, 
  PresignedDownloadItem 
} from '../services/guideDownloadService';

interface BundleGuideItem {
  id: string;
  title: string;
  file: string;
  pillar?: string;
}

interface ProductInfo {
  id: string;
  name: string;
  price: string;
  usPrice: string;
  slug: string;
  desc: string;
  guides?: BundleGuideItem[];
}

const NINE_BOOK_VAULT_GUIDES: BundleGuideItem[] = [
  { id: 'workout-plan', title: 'Beginner Home Workout Plan', file: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
  { id: 'hypertrophy-strength', title: 'Hypertrophy & Strength Protocol', file: 'Hypertrophy-Strength-Protocol-2026.pdf', pillar: 'Muscle Architecture' },
  { id: 'mobility-recovery', title: 'Daily Mobility & Recovery Routine', file: 'Daily_Mobility_and_Recovery-2026.pdf', pillar: 'Joint & Kinematics' },
  { id: 'meal-planner', title: 'The Master Meal Planning Guide', file: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
  { id: 'fat-loss-blueprint', title: 'The Fat Loss Nutrition Blueprint', file: 'Fat-Loss-Nutrition-Blueprint-2026.pdf', pillar: 'Metabolism' },
  { id: 'high-protein-recipes', title: 'High-Protein Recipe Collection', file: 'High_Protein_Recipe_Collection-2026.pdf', pillar: 'Culinary Fuel' },
  { id: 'stress-management', title: 'Cortisol & Stress Management', file: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Stress & Autonomic' },
  { id: 'sleep-optimization', title: 'Deep Sleep Optimization Protocol', file: 'Deep_Sleep_Optimization-2026.pdf', pillar: 'Sleep & Recovery' },
  { id: 'habit-reset', title: 'Mindfulness & Habit Reset Workbook', file: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf', pillar: 'Habits & Mind' }
];

const SIX_PILLAR_GUIDES: BundleGuideItem[] = [
  { id: 'workout-plan', title: 'Beginner Home Workout Plan', file: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
  { id: 'meal-planner', title: 'The Master Meal Planning Guide', file: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
  { id: 'stress-management', title: 'Cortisol & Stress Management', file: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' },
  { id: 'lifespan-blueprint', title: 'The Next Level Lifespan Blueprint', file: 'the-next-level-lifespan.pdf', pillar: 'Epigenetics / Longevity' },
  { id: 'hypertrophy-strength', title: 'Hypertrophy & Strength Protocol', file: 'Hypertrophy-Strength-Protocol-2026.pdf', pillar: 'Muscle Architecture' },
  { id: 'mobility-recovery', title: 'Daily Mobility & Recovery Routine', file: 'Daily_Mobility_and_Recovery-2026.pdf', pillar: 'Joint & Kinematics' }
];

const THREE_PILLAR_GUIDES: BundleGuideItem[] = [
  { id: 'workout-plan', title: 'Beginner Home Workout Plan', file: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
  { id: 'meal-planner', title: 'The Master Meal Planning Guide', file: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
  { id: 'stress-management', title: 'Cortisol & Stress Management', file: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' }
];

const PRODUCT_MAP: Record<string, ProductInfo> = {
  // --- BUNDLES ---
  'all-nine-master-guides': {
    id: 'g-bundle-9',
    name: 'Complete 9-Book Master Longevity Vault (All 9 Books)',
    price: '£59.99',
    usPrice: '$75.00',
    slug: 'all-nine-master-guides',
    desc: 'The complete 9-book master archive: Fitness Trio + Nutrition Trio + Restorative Wellness Trio in high-res PDF. Includes instant 1-Click ZIP Archive.',
    guides: NINE_BOOK_VAULT_GUIDES
  },
  'all-9-master-guides': {
    id: 'g-bundle-9',
    name: 'Complete 9-Book Master Longevity Vault (All 9 Books)',
    price: '£59.99',
    usPrice: '$75.00',
    slug: 'all-nine-master-guides',
    desc: 'The complete 9-book master archive: Fitness Trio + Nutrition Trio + Restorative Wellness Trio in high-res PDF. Includes instant 1-Click ZIP Archive.',
    guides: NINE_BOOK_VAULT_GUIDES
  },
  'g-bundle-9': {
    id: 'g-bundle-9',
    name: 'Complete 9-Book Master Longevity Vault (All 9 Books)',
    price: '£59.99',
    usPrice: '$75.00',
    slug: 'all-nine-master-guides',
    desc: 'The complete 9-book master archive: Fitness Trio + Nutrition Trio + Restorative Wellness Trio in high-res PDF. Includes instant 1-Click ZIP Archive.',
    guides: NINE_BOOK_VAULT_GUIDES
  },
  'all-six-master-guides': {
    id: 'g-bundle-6',
    name: 'Complete 6-Pillar Master Suite (All 6 Master Books)',
    price: '£49.00',
    usPrice: '$59.00',
    slug: 'all-six-master-guides',
    desc: 'Complete 6-book execution suite: Workout Plan + Meal Planner + Stress Management + Epigenetics Blueprint + Hypertrophy + Mobility Routine (Save over 55%).',
    guides: SIX_PILLAR_GUIDES
  },
  'all-6-master-guides': {
    id: 'g-bundle-6',
    name: 'Complete 6-Pillar Master Suite (All 6 Master Books)',
    price: '£49.00',
    usPrice: '$59.00',
    slug: 'all-six-master-guides',
    desc: 'Complete 6-book execution suite: Workout Plan + Meal Planner + Stress Management + Epigenetics Blueprint + Hypertrophy + Mobility Routine (Save over 55%).',
    guides: SIX_PILLAR_GUIDES
  },
  'g-bundle-6': {
    id: 'g-bundle-6',
    name: 'Complete 6-Pillar Master Suite (All 6 Master Books)',
    price: '£49.00',
    usPrice: '$59.00',
    slug: 'all-six-master-guides',
    desc: 'Complete 6-book execution suite: Workout Plan + Meal Planner + Stress Management + Epigenetics Blueprint + Hypertrophy + Mobility Routine (Save over 55%).',
    guides: SIX_PILLAR_GUIDES
  },
  'all-three-master-guides': {
    id: 'g-bundle-1',
    name: 'All Three Digital Master Guides (Complete Bundle)',
    price: '£29.00',
    usPrice: '$39.00',
    slug: '3-part-bundle',
    desc: 'Complete 3-book execution suite: Workout Plan + Meal Planner + Stress Management (Save 55%).',
    guides: THREE_PILLAR_GUIDES
  },
  'g-bundle-1': {
    id: 'g-bundle-1',
    name: 'All Three Digital Master Guides (Complete Bundle)',
    price: '£29.00',
    usPrice: '$39.00',
    slug: '3-part-bundle',
    desc: 'Complete 3-book execution suite: Workout Plan + Meal Planner + Stress Management (Save 55%).',
    guides: THREE_PILLAR_GUIDES
  },

  // --- INDIVIDUAL GUIDES ---
  'workout-plan': {
    id: 'g-fit-1',
    name: 'Beginner Home Workout Plan',
    price: '£19.00',
    usPrice: '$24.00',
    slug: 'beginner_home_workout-2026',
    desc: '4-Week Bodyweight Foundation & Recovery Guide to preserve skeletal muscle mass and build foundational strength from home.'
  },
  'performance-guide': {
    id: 'g-fit-1',
    name: 'Beginner Home Workout Plan',
    price: '£19.00',
    usPrice: '$24.00',
    slug: 'beginner_home_workout-2026',
    desc: '4-Week Bodyweight Foundation & Recovery Guide to preserve skeletal muscle mass and build foundational strength from home.'
  },
  'hypertrophy-strength': {
    id: 'g-fit-2',
    name: 'Hypertrophy & Strength Protocol',
    price: '£29.00',
    usPrice: '$38.00',
    slug: 'Hypertrophy-Strength-Protocol-2026',
    desc: 'An evidence-based 8-week progressive overload system to break through plateaus and build dense skeletal muscle.'
  },
  'mobility-recovery': {
    id: 'g-fit-3',
    name: 'Daily Mobility & Recovery Routine',
    price: '£15.00',
    usPrice: '$19.00',
    slug: 'Daily_Mobility_and_Recovery-2026',
    desc: 'A science-backed 15-minute blueprint for desk workers and athletes to restore joint kinematics and decompress the spine.'
  },
  'meal-planner': {
    id: 'g-nut-1',
    name: 'The Master Meal Planning Guide',
    price: '£24.00',
    usPrice: '$29.00',
    slug: 'The Master_Meal_Planning_Guide-2026',
    desc: 'A systematic approach to weekly meal prep, grocery shopping, and macro-balancing that fits real life.'
  },
  'nutrition-guide': {
    id: 'g-nut-1',
    name: 'The Master Meal Planning Guide',
    price: '£24.00',
    usPrice: '$29.00',
    slug: 'The Master_Meal_Planning_Guide-2026',
    desc: 'A systematic approach to weekly meal prep, grocery shopping, and macro-balancing that fits real life.'
  },
  'fat-loss-blueprint': {
    id: 'g-nut-2',
    name: 'The Fat Loss Nutrition Blueprint',
    price: '£29.00',
    usPrice: '$38.00',
    slug: 'Fat-Loss-Nutrition-Blueprint-2026',
    desc: 'Your science-based path to sustainable fat loss without metabolic adaptation, muscle wasting, or starvation.'
  },
  'high-protein-recipes': {
    id: 'g-nut-3',
    name: 'High-Protein Recipe Collection',
    price: '£19.00',
    usPrice: '$24.00',
    slug: 'High_Protein_Recipe_Collection-2026',
    desc: 'Clinical & behavioural culinary systems for satiety, muscle preservation, and practical kitchen mastery.'
  },
  'stress-management': {
    id: 'g-wel-1',
    name: 'Cortisol & Stress Management',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'Cortisol_&_Stress_Management-2026',
    desc: 'Actionable protocols to lower cortisol, manage chronic stress, and restore nervous system balance.'
  },
  'autonomic-guide': {
    id: 'g-wel-1',
    name: 'Cortisol & Stress Management',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'Cortisol_&_Stress_Management-2026',
    desc: 'Actionable protocols to lower cortisol, manage chronic stress, and restore nervous system balance.'
  },
  'sleep-optimization': {
    id: 'g-wel-2',
    name: 'Deep Sleep Optimization Protocol',
    price: '£25.00',
    usPrice: '$32.00',
    slug: 'Deep_Sleep_Optimization-2026',
    desc: 'A 28-day actionable blueprint to maximize deep slow-wave sleep, optimize REM cycles, and fix nocturnal waking.'
  },
  'habit-reset': {
    id: 'g-wel-3',
    name: 'Mindfulness & Habit Reset Workbook',
    price: '£18.00',
    usPrice: '$24.00',
    slug: 'Mindfulness_and_Habit_Reset_Workbook-2026',
    desc: 'A structured 21-day interactive journal to dismantle compulsive loops and build automatic longevity habits.'
  },
  'lifespan-blueprint': {
    id: 'g-epi-1',
    name: 'The Next Level Lifespan Blueprint',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'the-next-level-lifespan',
    desc: 'Upgrade your cellular hardware today to run tomorrow’s age-reversal software: sirtuin activation, autophagy, and DNA protection.'
  },
  'epigenetics-guide': {
    id: 'g-epi-1',
    name: 'The Next Level Lifespan Blueprint',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'the-next-level-lifespan',
    desc: 'Upgrade your cellular hardware today to run tomorrow’s age-reversal software: sirtuin activation, autophagy, and DNA protection.'
  },
  'womens-health-guide': {
    id: 'g-fem-1',
    name: 'Ovary-Span & Endocrine Performance Guide',
    price: '£22.00',
    usPrice: '$28.00',
    slug: 'Daily_Mobility_and_Recovery-2026',
    desc: 'Hormone balancing, bone mineral density preservation, and ovary-span health.'
  },
  'socio-architecture-guide': {
    id: 'g-soc-1',
    name: 'Socio-Biological Architecture & Connection Blueprint',
    price: '£19.00',
    usPrice: '$24.00',
    slug: 'Mindfulness_and_Habit_Reset_Workbook-2026',
    desc: 'Micro-community health formation, neural coupling, and environmental lifestyle design.'
  }
};

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const rawKey = searchParams.get('product') || searchParams.get('bundle') || 'all-six-master-guides';
  const item = PRODUCT_MAP[rawKey] || PRODUCT_MAP['all-six-master-guides'];

  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadItems, setDownloadItems] = useState<PresignedDownloadItem[]>([]);
  const [zipDownloadUrl, setZipDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    document.title = `Checkout: ${item.name} | 123TheNextLevel`;
    window.scrollTo(0, 0);
  }, [item]);

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    setCheckoutError(null);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guideId: item.slug || item.id,
          items: [{ id: item.id }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to initiate secure checkout session');
      }

      const data = await response.json();
      if (data.url) {
        // Redirect directly to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'No checkout URL returned from Stripe');
      }
    } catch (err: any) {
      console.error('Stripe checkout error:', err);
      setCheckoutError(err.message || 'Unable to connect to Stripe checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAllAgain = () => {
    if (downloadItems.length === 0) return;
    downloadItems.forEach((item, index) => {
      setTimeout(() => {
        triggerBrowserDownload(item.downloadUrl, item.filename);
      }, index * 450);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-16">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
            <Lock size={12} /> Secure Digital Checkout
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Order Summary</h1>
        </div>

        {/* Product Card */}
        <div className="p-5 sm:p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                {item.guides ? '🔥 Complete Bundle Suite' : 'Digital PDF Guide'}
              </span>
              <h2 className="text-lg font-black text-white leading-snug">{item.name}</h2>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-cyan-400">{item.price}</span>
              <span className="text-[11px] text-slate-500 block">({item.usPrice})</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>

          {/* Included guides in this bundle */}
          {item.guides && item.guides.length > 0 && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Included Execution Books ({item.guides.length}):
              </span>
              <div className="grid grid-cols-1 gap-2">
                {item.guides.map((g, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold text-sm">⚡</span>
                      <span className="font-semibold text-white">{g.title}</span>
                    </div>
                    {g.pillar && (
                      <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                        {g.pillar}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Value Proposition bullets */}
        <div className="space-y-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
            <span>Direct instant Cloudflare R2 presigned download links</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
            <span>Multi-device compatibility (iPad, iPhone, Android, Kindle & Desktop)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
            <span>Lifetime protocol updates & 2026 geroscience revisions included</span>
          </div>
        </div>

        {/* SUCCESS / DOWNLOAD HUB STATE */}
        {downloadSuccess ? (
          <div className="p-5 sm:p-6 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-4 shadow-xl">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <CheckCircle2 size={16} /> All Master Books Ready!
              </span>
              <p className="text-xs text-slate-300">
                Choose to download everything in one click as a ZIP bundle, or download individual PDF books:
              </p>
            </div>

            {/* 1-CLICK ZIP DOWNLOAD BUTTON (BEST EXPERIENCE) */}
            {zipDownloadUrl && (
              <div className="p-3 bg-gradient-to-r from-cyan-950/70 to-slate-900 border border-cyan-500/40 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block text-center">
                  ⚡ Recommended (1 Click • Zero Popup Blockers)
                </span>
                <a
                  href={zipDownloadUrl}
                  download="Complete_6_Pillar_Master_Suite-2026.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={18} /> Download All 6 Master Books (ZIP Archive • 9.2 MB)
                </a>
              </div>
            )}

            {/* Individual Download Buttons Hub */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
                <span>Or Download Individual PDF Guides:</span>
                {downloadItems.length > 1 && (
                  <button
                    onClick={handleDownloadAllAgain}
                    className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw size={11} /> Auto-download all 6
                  </button>
                )}
              </div>

              {(downloadItems.length > 0 ? downloadItems : (item.guides || [])).map((doc: any, idx: number) => {
                const downloadUrl = doc.downloadUrl || '#';
                const filename = doc.filename || doc.file || `${doc.id}.pdf`;
                const title = doc.title || doc.name || `Book #${idx + 1}`;

                return (
                  <div 
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText size={16} className="text-cyan-400 shrink-0" />
                      <div className="truncate">
                        <span className="text-xs font-bold text-white block truncate">{title}</span>
                        <span className="text-[10px] text-slate-500 font-mono block truncate">{filename}</span>
                      </div>
                    </div>

                    <a
                      href={downloadUrl}
                      download={filename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 border border-slate-700"
                    >
                      <Download size={12} /> PDF
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center border-t border-slate-800/80">
              <Link to="/premium-guides" className="text-xs text-cyan-400 hover:underline">
                ← Return to Premium Guides
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {checkoutError && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
                ⚠️ {checkoutError}
              </div>
            )}
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
