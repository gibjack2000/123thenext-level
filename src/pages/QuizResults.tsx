import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Shield, HeartPulse, ChevronRight, ClipboardCheck, ArrowLeft
} from 'lucide-react';
import { ProductRecommendation, RECOMMENDATIONS_MAP } from '../data/productRecommendations';
import { useMarket } from '../contexts/MarketContext';
import { useAffiliateLinks } from '../contexts/AffiliateLinksContext';

export default function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { market: globalMarket } = useMarket();
  const { links } = useAffiliateLinks();

  // Extract results from query string
  const queryParams = new URLSearchParams(location.search);
  const score = parseInt(queryParams.get('score') || '68', 10);
  const rawPillar = queryParams.get('pillar') || 'fitness';
  const rawMarket = queryParams.get('market') || globalMarket;

  const market = (['US', 'UK', 'ES'].includes(rawMarket.toUpperCase()) 
    ? rawMarket.toUpperCase() 
    : 'US') as 'US' | 'UK' | 'ES';

  // Dynamically calculate the lowest scoring pillar from query string scores payload if available
  const getLowestPillar = () => {
    const scoresParam = queryParams.get('scores');
    if (scoresParam) {
      try {
        const scores = JSON.parse(decodeURIComponent(scoresParam));
        let lowest = 'fitness';
        let lowestVal = Infinity;
        
        const pillarsList = ['health', 'fitness', 'nutrition', 'wellness', 'womens-health', 'social-fitness'];
        
        pillarsList.forEach(p => {
          if (scores[p] !== undefined) {
            const val = Number(scores[p]);
            if (val < lowestVal) {
              lowestVal = val;
              lowest = p;
            }
          }
        });
        return lowest;
      } catch (e) {
        console.error('Failed to parse scores from URL query:', e);
      }
    }
    // Fallback to the pillar query parameter
    return rawPillar.toLowerCase();
  };

  const pillar = getLowestPillar();

  // Determine the display name for the lowest pillar
  const getPillarDisplayName = (p: string) => {
    switch (p) {
      case 'health': return 'Healthspan & Longevity';
      case 'fitness': return 'Performance & Strength';
      case 'nutrition': return 'Metabolic Nutrition';
      case 'wellness': return 'Wellness & Autonomic Engineering';
      case 'womens-health': return "Women's Hormonal Health";
      case 'social-fitness': return 'Socio-Biological Architecture';
      default: return 'Performance Framework';
    }
  };

  // Determine direct digital guide product based on lowest pillar and market
  const getDigitalGuide = (p: string, m: 'US' | 'UK' | 'ES') => {
    const formatPrice = (usd: number, gbp: number, eur: number) => {
      if (m === 'US') return `$${usd.toFixed(2)}`;
      if (m === 'UK') return `£${gbp.toFixed(2)}`;
      return `${eur.toFixed(2)} €`.replace('.', ',');
    };
    const getPriceVal = (usd: number, gbp: number, eur: number) => {
      if (m === 'US') return usd;
      if (m === 'UK') return gbp;
      return eur;
    };

    switch (p) {
      case 'fitness':
        return {
          title: "Beginner Home Workout Plan",
          price: formatPrice(25.00, 19.00, 22.00),
          priceVal: getPriceVal(25.00, 19.00, 22.00),
          id: "guide-fitness-home",
          desc: "A 4-week zero-equipment routine designed to rebuild structural joint and lean mass health.",
          badge: "Direct Monetization Protocol"
        };
      case 'nutrition':
        return {
          title: "The Master Meal Planning Guide",
          price: formatPrice(29.00, 24.00, 28.00),
          priceVal: getPriceVal(29.00, 24.00, 28.00),
          id: "guide-nutrition-meal",
          desc: "Structure your weekly grocery, macro profiles, and glycemic prep workflows.",
          badge: "Direct Monetization Protocol"
        };
      case 'health':
        return {
          title: "The Longevity Baseline Protocol",
          price: formatPrice(32.00, 25.00, 29.00),
          priceVal: getPriceVal(32.00, 25.00, 29.00),
          id: "guide-health-longevity",
          desc: "Understand your blood markers, cardiovascular thresholds, and cellular age markers.",
          badge: "Direct Monetization Protocol"
        };
      case 'womens-health':
        return {
          title: "Women's Endocrine & Hormonal Guide",
          price: formatPrice(35.00, 27.00, 32.00),
          priceVal: getPriceVal(35.00, 27.00, 32.00),
          id: "guide-womens-hormonal",
          desc: "Master estrogen-progesterone cycles, metabolic pacing, and bone density preservation.",
          badge: "Direct Monetization Protocol"
        };
      case 'social-fitness':
        return {
          title: "Socio-Biological Architecture Blueprint",
          price: formatPrice(25.00, 19.00, 22.00),
          priceVal: getPriceVal(25.00, 19.00, 22.00),
          id: "guide-social-blueprint",
          desc: "Build active communities, group training rhythms, and social wellness architectures.",
          badge: "Direct Monetization Protocol"
        };
      case 'wellness':
      default:
        return {
          title: "Cortisol & Stress Management Guide",
          price: formatPrice(27.00, 22.00, 25.00),
          priceVal: getPriceVal(27.00, 22.00, 25.00),
          id: "guide-wellness-stress",
          desc: "Master your circadian sleep architecture, vagal tone resets, and overnight HRV.",
          badge: "Direct Monetization Protocol"
        };
    }
  };

  const digitalGuide = getDigitalGuide(pillar, market);

  // Dynamically resolve market-specific telemetry and hardware
  const getTelemetryHardware = (m: 'US' | 'UK' | 'ES') => {
    const products = RECOMMENDATIONS_MAP[m] || [];
    if (m === 'US') {
      const appleWatch = products.find(p => p.id === 'us-apple-watch-10' || p.name.includes('Apple Watch'));
      return appleWatch || {
        id: "us-apple-watch-10",
        name: "Apple Watch Series 10 [GPS 46mm case]",
        rating: 4.7,
        description: "The gold standard for continuous heart rate, blood oxygen tracking, and nocturnal Heart Rate Variability (HRV) telemetry.",
        priceText: "$399.00",
        dealUrl: "https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl08-20",
        badgeText: "Continuous Telemetry",
        imagePlaceholder: "/assets/products/apple-watch-10.jpg",
        pillar: "fitness"
      };
    } else if (m === 'UK') {
      const lola = products.find(p => p.id === 'uk-lola-vital-check-56' || p.name.includes('Lola Vital Check'));
      return lola || {
        id: "uk-lola-vital-check-56",
        name: "Lola Vital Check 56",
        rating: 5.0,
        description: "Clinical-grade 56-marker blood panel co-evaluated with your general practitioner to map biological baselines.",
        priceText: "£237.00",
        dealUrl: "https://referrals.lolahealth.com/NextLevel15",
        badgeText: "Clinical Diagnostics",
        imagePlaceholder: "/assets/products/lola-check-56.jpg",
        pillar: "health"
      };
    } else { // ES
      const scale = products.find(p => p.id === 'es-smart-scale' || p.name.includes('Báscula'));
      return scale || {
        id: "es-smart-scale",
        name: "Báscula Inteligente Bluetooth 8 Electrodos",
        rating: 5.0,
        description: "Báscula de composición corporal de precisión que monitoriza grasa visceral y masa muscular segmentada.",
        priceText: "89,99 €",
        dealUrl: "https://www.amazon.es/dp/B0GW8GWK1Q?tag=123znl08a-21",
        badgeText: "Mapeo de Composición",
        imagePlaceholder: "/assets/products/smart-scale-es.jpg",
        pillar: "health"
      };
    }
  };

  const hardwareProduct = getTelemetryHardware(market);

  // Dynamically resolve market-specific metabolic and environmental accelerator
  const getAcceleratorProduct = (p: string, m: 'US' | 'UK' | 'ES', affiliateLinks: any) => {
    if (p === 'nutrition') {
      if (m === 'US') {
        return {
          name: "Ninja Foodi Dual Zone 7.6L AF300UK",
          rating: 4.8,
          description: "The gold standard for preparing low-oil, nutrient-dense glycemic family meals.",
          priceText: "$199.00",
          dealUrl: "https://www.amazon.com/dp/B08HM5T3H5?tag=123znl08-20",
          badgeText: "Glycemic Kitchen Prep",
          imagePlaceholder: "/assets/products/ninja-airfryer.jpg"
        };
      } else if (m === 'UK') {
        const prod = RECOMMENDATIONS_MAP.UK.find(item => item.id === 'uk-ninja-airfryer');
        return prod || {
          name: "Ninja Foodi Dual Zone 7.6L AF300UK",
          rating: 4.8,
          description: "Dual-drawer hot air cooking tool for low-oil, nutrient-dense glycemic family meal prep and metabolic control.",
          priceText: "£199.00",
          dealUrl: "https://123thenextlevel.com/shop/ninja-af300",
          badgeText: "Glycemic Meal Prep",
          imagePlaceholder: "/assets/products/ninja-airfryer.jpg"
        };
      } else { // ES
        return {
          name: "Moulinex Easy Fry & Grill 4.2L",
          rating: 4.7,
          description: "An accessible, compact kitchen tool for single-person glycemic meal prep.",
          priceText: "89,99 €",
          dealUrl: "https://www.amazon.es/dp/B09FQBKFQ6?tag=123znl08a-21",
          badgeText: "Glycemic Kitchen Prep",
          imagePlaceholder: "/assets/products/moulinex-airfryer.jpg"
        };
      }
    } else {
      // Show Zebora Marine Collagen
      const mLower = m.toLowerCase() as 'us' | 'uk' | 'es';
      const affiliateUrl = affiliateLinks.quiz?.['marine-collagen']?.[mLower] || 
                           (m === 'US' ? 'https://www.amazon.com/s?k=ZEBORA+Marine+Collagen' :
                            m === 'UK' ? 'https://www.amazon.co.uk/s?k=ZEBORA+Marine+Collagen' :
                                         'https://www.amazon.es/s?k=ZEBORA+Marine+Collagen');

      return {
        name: "Zebora Marine Collagen",
        rating: 4.8,
        description: "Expert-vetted daily supplement to support the gut-mitochondrial axis and cellular structure.",
        priceText: m === 'US' ? "$28.99" : m === 'UK' ? "£24.99" : "26,99 €",
        dealUrl: affiliateUrl,
        badgeText: "Cellular Nutrition",
        imagePlaceholder: "/assets/products/qunol-coq10.jpg"
      };
    }
  };

  const acceleratorProduct = getAcceleratorProduct(pillar, market, links);

  const handleCheckoutGuide = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: digitalGuide.id,
              title: digitalGuide.title,
              price: digitalGuide.priceVal,
              category: getPillarDisplayName(pillar),
              priceDisplay: digitalGuide.price,
              stripePriceId: 'price_placeholder_digital_guide'
            }
          ]
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to initiate checkout. Please try again.');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Network error. Check connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Determine score health category
  const getScoreHealthCategory = (sc: number) => {
    if (sc >= 75) return { text: 'THRIVING', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' };
    if (sc >= 50) return { text: 'BUILDING', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' };
    return { text: 'PRIORITY FOCUS', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' };
  };

  const healthCat = getScoreHealthCategory(score);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans pt-28 pb-20 relative overflow-hidden">
      {/* Background grid styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0"></div>
      
      {/* Radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation link back to quiz */}
        <div className="text-left mb-8">
          <Link
            to="/health-quiz"
            className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-0.5 transition-transform" />
            Retake Baseline Assessment
          </Link>
        </div>

        {/* Results Card Container */}
        <div className="bg-slate-950 border border-cyan-500/10 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] space-y-12">
          
          {/* Header Section: Score Ring and Information */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-8">
            <div className="md:col-span-4 flex justify-center">
              {/* Animated/Rendered Circular Score Ring */}
              <div className="relative w-40 h-40 flex items-center justify-center bg-slate-900/60 rounded-full border border-slate-800 shadow-inner">
                <svg className="w-36 h-36 -rotate-90">
                  <circle cx="72" cy="72" r="64" className="stroke-slate-950 fill-none" strokeWidth="8" />
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="64" 
                    className="stroke-cyan-500 fill-none transition-all duration-1000 ease-out" 
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 64}
                    strokeDashoffset={2 * Math.PI * 64 - (score / 100) * (2 * Math.PI * 64)}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-display font-black text-white">{score}</span>
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Score</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${healthCat.border} ${healthCat.color} ${healthCat.bg}`}>
                  <ClipboardCheck size={10} />
                  Status: {healthCat.text}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono bg-slate-900 text-slate-400 border border-slate-800 font-bold uppercase tracking-wider">
                  Region: {market}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white font-black leading-none">
                Your Health Baseline Report
              </h1>
              
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                Thank you for completing our diagnostic assessment. Your answers have established a clinical overview profile. We have compiled your target recommendations below to start optimizing your biophysical parameters immediately.
              </p>
            </div>
          </div>

          {/* High-Trust Framing Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/10 text-left space-y-3 shadow-[0_0_30px_rgba(6,182,212,0.02)]">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="text-cyan-400 shrink-0" size={18} />
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                Your Biophysical Accelerator Toolkit • Early Warning Protection
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-light">
              Based on your personalized biomarkers, our clinical algorithm has flagged <strong className="text-cyan-400 font-bold">{getPillarDisplayName(pillar)}</strong> as your primary path to optimization. We have curated your essential baseline hardware, targeted daily vitamins, and metabolic food preparation tools available directly in your market to diagnose subclinical risks early and protect your cellular longevity.
            </p>
          </div>

          {/* Three-Tier Product Reconstruction Grid */}
          <div className="space-y-6">
            <h3 className="text-base font-display uppercase tracking-wider text-white font-bold flex items-center gap-2 text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              Pillar Accelerator Tools
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {/* Column 1: Direct Monetization Digital Guide */}
              <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-950 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                <div className="space-y-4">
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold block w-fit">
                    {digitalGuide.badge}
                  </span>
                  <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">
                    {digitalGuide.title}
                  </h4>
                  <p className="text-xs text-slate-450 leading-relaxed font-light">
                    {digitalGuide.desc}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="border-t border-slate-900 pt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">{digitalGuide.price}</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">One-Time Secure Download</span>
                  </div>
                  <button
                    onClick={handleCheckoutGuide}
                    disabled={isProcessing}
                    className="inline-flex justify-center items-center w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  >
                    {isProcessing ? 'Processing Checkout...' : 'Secure Digital Delivery →'}
                  </button>
                </div>
              </div>

              {/* Column 2: Local Hardware & Telemetry */}
              {hardwareProduct && (
                <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-950 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                  <div className="space-y-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold block w-fit">
                      {hardwareProduct.badgeText}
                    </span>
                    <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">
                      {hardwareProduct.name}
                    </h4>
                    <p className="text-xs text-slate-450 leading-relaxed font-light">
                      {hardwareProduct.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-t border-slate-900 pt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{hardwareProduct.priceText}</span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Local Hardware</span>
                    </div>
                    <a
                      href={hardwareProduct.dealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-cyan-500/30 text-center cursor-pointer"
                    >
                      Acquire Local Telemetry Hardware →
                    </a>
                  </div>
                </div>
              )}

              {/* Column 3: Local Accelerator (Kitchen/Vitamins) */}
              {acceleratorProduct && (
                <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-950 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 text-left shadow-xl space-y-6">
                  <div className="space-y-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold block w-fit">
                      {acceleratorProduct.badgeText}
                    </span>
                    <h4 className="text-base font-display uppercase tracking-tight text-white font-bold">
                      {acceleratorProduct.name}
                    </h4>
                    <p className="text-xs text-slate-450 leading-relaxed font-light">
                      {acceleratorProduct.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-t border-slate-900 pt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{acceleratorProduct.priceText}</span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Biophysical Accelerator</span>
                    </div>
                    <a
                      href={acceleratorProduct.dealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-cyan-500/30 text-center cursor-pointer"
                    >
                      Acquire Daily Accelerator →
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Privacy Callout */}
          <div className="p-4 border border-cyan-500/10 bg-slate-950 rounded-2xl text-xs text-slate-300 text-center leading-relaxed font-light max-w-3xl mx-auto flex gap-3.5 items-start">
            <Shield size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-left text-[11px] text-slate-400 leading-relaxed">
              We respect your data. Your health scores remain fully client-side and browser-held unless you choose to request email delivery of your plan.
            </p>
          </div>

          {/* Center centered High-End Shop Banner */}
          <div className="p-8 border border-cyan-500/10 bg-slate-950 rounded-2xl text-xs text-slate-350 text-center leading-relaxed font-light max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
            <span className="text-center text-[13px] text-slate-300 leading-relaxed font-light max-w-2xl">
              🛍 <strong>Looking for more?</strong> Explore over 100+ expert-recommended tools, circadian sleep aids, and daily vitamin protocols custom-vetted for your market inside our Curated essentials shop.
            </span>
            <a
              href="https://123thenextlevel.com/#shop"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors shrink-0 group"
            >
              Browse the Full Shop <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
