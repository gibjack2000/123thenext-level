import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Clock, 
  Share2, 
  Lock, 
  Copy, 
  Check, 
  BookOpen, 
  Layers, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Star,
  ShoppingBag,
  HeartPulse,
  Activity,
  Zap,
  Compass,
  MapPin,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { ALL_10_MASTER_GUIDES } from '../components/BundleOffers';
import { usePaywallBypass, triggerDirectDownload } from '../utils/adminTestMode';
import { useMarket } from '../contexts/MarketContext';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';

// Curated Top Biological Hardware & Diagnostics from the Sovereign Store
const FEATURED_SOVEREIGN_PRODUCTS = [
  {
    id: 'cgm-telemetry',
    name: 'Continuous Glucose Monitor (CGM) Sensor System',
    category: 'Metabolic Diagnostics & Glycemic Telemetry',
    badge: 'Clinical Telemetry',
    image: '/assets/images/clinical-cgm-sensor.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    price: '£59.00 / $75.00',
    benefit: 'Track real-time postprandial glucose spikes and match them to the 12-Week Metabolic Protocol.',
    storeLink: '/hardware-store'
  },
  {
    id: 'withings-sleep',
    name: 'Withings Sleep Tracking Pad & Apnea Analyzer',
    category: 'Circadian Architecture & Autonomic Health',
    badge: 'Under-Mattress Telemetry',
    image: '/assets/images/withingsleep.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=800&auto=format&fit=crop',
    price: '£119.00 / $129.00',
    benefit: 'Lab-grade sleep cycles, HRV recovery, and snoring analysis without wearing a wristband.',
    storeLink: '/store'
  },
  {
    id: 'epigenetic-kit',
    name: 'Clinical Epigenetic Biological Age & Methylation Test',
    category: 'Cellular Age Reversal & DNA Methylation',
    badge: 'CLIA / UKAS Lab Tested',
    image: '/assets/images/clinical-epigenetic-kit.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
    price: '£189.00 / $240.00',
    benefit: 'Calculate your true Horvath biological clock and measure rate of biological aging.',
    storeLink: '/hardware-store'
  },
  {
    id: 'urine-acr',
    name: 'Microalbumin (ACR) Kidney & Endothelial Urine Screen',
    category: 'Microvascular Health & Glomerular Telemetry',
    badge: 'Home Reagent Strip',
    image: '/assets/images/clinical-urine-acr.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop',
    price: '£24.99 / $29.99',
    benefit: 'Detect subclinical vascular inflammation and metabolic leakage years before blood tests show impairment.',
    storeLink: '/store'
  }
];

export default function BlackFridayPage() {
  const navigate = useNavigate();
  const { market } = useMarket();
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic urgency countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 48,
    seconds: 32
  });

  useEffect(() => {
    document.title = "🔥 Black Friday Deal: Complete 10-Guide Longevity Master Vault for £39.99 | 123TheNextLevel";
    window.scrollTo(0, 0);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyShareLink = () => {
    const url = window.location.origin + '/black-friday';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimDeal = () => {
    navigate('/checkout?bundle=bundle-black-friday-10&source=black-friday');
  };

  const activeMarket = (market || 'us').toLowerCase();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans pb-32">
      
      {/* ========================================================================= */}
      {/* 1. TOP STICKY URGENCY TICKER                                              */}
      {/* ========================================================================= */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-650 via-amber-600 to-orange-600 text-slate-950 font-black py-2.5 px-4 shadow-xl border-b border-amber-400/30">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span className="tracking-wide uppercase font-black">
              🔥 Black Friday Funnel: Save 82% Off Master Vault + Sovereign Gear Integration
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-950/20 px-3 py-1 rounded-full font-mono text-xs">
              <Clock size={13} />
              <span>Ends in: {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
            <button 
              onClick={handleClaimDeal}
              className="hidden md:inline-flex items-center gap-1 bg-slate-950 hover:bg-slate-900 text-white px-3.5 py-1 rounded-full text-xs font-bold transition shadow cursor-pointer"
            >
              Claim £39.99 ➔
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION: THE FLASH SALE HOOK                                     */}
      {/* ========================================================================= */}
      <header className="relative pt-12 pb-16 px-4 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-red-500/15 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg">
            <Flame size={14} className="text-orange-400 animate-pulse" />
            <span>Black Friday Exclusive • Social Viral Deal</span>
            <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.5 rounded font-black">82% OFF</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            The Complete 10-Guide <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Longevity & Healthspan Vault
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instant access to all 10 Premium Clinical Master Execution Books — covering metabolic re-engineering, visceral fat stripping, hypertrophy, circadian sleep, and mobility.
          </p>

          {/* Social Proof Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400" />
              ))}
              <span className="font-bold text-slate-200 ml-1">4.9/5 Rating</span>
            </div>
            <span className="text-slate-600">•</span>
            <span>1,400+ Longevity Protocols Downloaded</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} /> 2026 Revisions Included
            </span>
          </div>

          {/* Primary Price Callout Box */}
          <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-900 border-2 border-amber-500/60 shadow-2xl shadow-amber-500/15 space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="text-left">
                <span className="text-xs text-slate-500 line-through block font-mono">Combined Retail: £228.96</span>
                <span className="text-xs text-amber-400/80 line-through block font-mono">Standard Vault: £69.99</span>
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-2">
                  £39.99
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-1 rounded-full uppercase tracking-wider">
                    Save £188.97
                  </span>
                </span>
                <span className="text-xs text-slate-400 font-mono block pt-1">$39.99 USD • 39,99€ EUR</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                  £3.99 / Book
                </span>
              </div>
            </div>

            {/* Claim CTA Button */}
            <button
              onClick={handleClaimDeal}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:via-orange-400 hover:to-amber-400 text-slate-950 font-black text-base uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={20} />
              <span>Claim Black Friday Access (£39.99)</span>
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-amber-400" /> Secure Checkout
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Download size={12} className="text-cyan-400" /> Instant 1-Click ZIP + 10 PDFs
              </span>
            </div>
          </div>

          {/* Social Share Action Pill */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Link Copied for Sharing!' : 'Copy Black Friday Deal Link'}</span>
            </button>
            <span className="text-[11px] text-slate-500">Share with friends or social followers</span>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. VISUAL GALLERY: ALL 10 BOOKS WITH COVERS                               */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            Complete Execution Suite
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Everything Inside The 10-Book Master Archive
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Each master guide is a comprehensive, clinically referenced digital execution manual designed for immediate implementation.
          </p>
        </div>

        {/* 10-Book Responsive Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ALL_10_MASTER_GUIDES.map((book, idx) => (
            <div 
              key={book.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-3.5 space-y-3 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              {/* Cover Image */}
              <div className="aspect-[3/4] rounded-xl bg-slate-950 overflow-hidden relative border border-slate-800 group-hover:border-amber-500/40 transition">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  loading="lazy"
                  onError={(e) => {
                    if (book.fallbackImage) {
                      (e.currentTarget as HTMLImageElement).src = book.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-950/80 border border-slate-700 text-slate-300 backdrop-blur-sm">
                  Book #{idx + 1}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-400 text-slate-950 shadow">
                  PDF Included
                </span>
              </div>

              {/* Book Details */}
              <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400/90 block truncate uppercase tracking-wider">
                    {book.pillar}
                  </span>
                  <h3 className="text-xs font-black text-white line-clamp-2 leading-snug">
                    {book.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {book.shortDesc}
                </p>
              </div>

              {/* Value indicator */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 line-through">Value: {book.priceFormatted}</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={11} /> Unlocked
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. THE FUNNEL BRIDGE: "START HERE" ON-RAMP                                */}
      {/* "Yesterday was the best time to start, today is the second best time"     */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border-2 border-cyan-500/40 p-8 sm:p-12 shadow-2xl overflow-hidden text-center space-y-6">
          
          {/* Subtle Ambient Ray */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Golden Quote Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Compass size={14} className="text-cyan-400" />
            <span>Foundational Clinical Mindset</span>
          </div>

          {/* The Inspiring Quote */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black text-white italic tracking-tight leading-tight">
              &ldquo;Yesterday was the best time to start. <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent not-italic font-black">
                Today is the second best time.&rdquo;
              </span>
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Biological aging and cellular senescence compound every single day. Waiting for a new week or another month leaves your metabolic health to chance. Take command of your telemetry today.
            </p>
          </div>

          {/* 3-Step Practical Action Roadmap */}
          <div className="grid sm:grid-cols-3 gap-4 text-left pt-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-xs">
                01
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Take Your Diagnostic Baseline</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Complete our interactive clinical quiz to pinpoint your organ-specific biological bottlenecks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xs">
                02
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Unlock The Master Guides</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Arm yourself with all 10 clinical execution books at the £39.99 Black Friday flash rate.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xs">
                03
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Execute Dual-Track Protocols</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Deploy physical Sovereign hardware and track biometric telemetry with real GP-aligned sheets.
              </p>
            </div>
          </div>

          {/* Direct Route to Start Here Page */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/start-here"
              className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition shadow-xl shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Compass size={16} />
              <span>Explore The "Start Here" On-Ramp ➔</span>
            </Link>
            <Link
              to="/health-quiz"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2"
            >
              <span>Take Free Longevity Quiz (2 Min)</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SOVEREIGN APOTHECARY & SHOP SHOWCASE (THE HARDWARE STACK)              */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <ShoppingBag size={13} />
            <span>Sovereign Biological Hardware & Diagnostics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            The Software (Our Guides) + The Hardware (Sovereign Gear)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            A guide tells you what to execute; Sovereign hardware measures the cellular change. Pair your 10-Book Master Archive with lab-grade, FDA/MHRA/CE compliant diagnostics.
          </p>
        </div>

        {/* Regional Storefront Quick Jump Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MapPin size={15} className="text-amber-400 shrink-0" />
            <span>Sovereign Regional Hubs with Localized Medical Reagents:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Link 
              to="/store-us"
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-700 text-xs font-bold text-white flex items-center gap-2 transition"
            >
              <FlagUS className="w-4 h-3 rounded-[2px]" />
              <span>US Store (FDA/CLIA)</span>
            </Link>
            <Link 
              to="/store-uk"
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-700 text-xs font-bold text-white flex items-center gap-2 transition"
            >
              <FlagUK className="w-4 h-3 rounded-[2px]" />
              <span>UK Store (MHRA/UKAS)</span>
            </Link>
            <Link 
              to="/store-es"
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-700 text-xs font-bold text-white flex items-center gap-2 transition"
            >
              <FlagES className="w-4 h-3 rounded-[2px]" />
              <span>ES / EU Store (CE)</span>
            </Link>
          </div>
        </div>

        {/* Curated Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_SOVEREIGN_PRODUCTS.map((prod) => (
            <div 
              key={prod.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Product Visual */}
              <div className="aspect-[4/3] rounded-xl bg-slate-950 overflow-hidden relative border border-slate-800">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  loading="lazy"
                  onError={(e) => {
                    if (prod.fallbackImage) {
                      (e.currentTarget as HTMLImageElement).src = prod.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-950/80 border border-slate-700 text-emerald-400 backdrop-blur-sm">
                  {prod.badge}
                </span>
              </div>

              {/* Text Info */}
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {prod.category}
                </span>
                <h4 className="text-xs font-black text-white leading-snug">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {prod.benefit}
                </p>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white">{prod.price}</span>
                <Link
                  to={prod.storeLink}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 text-xs font-bold border border-emerald-500/30 transition flex items-center gap-1"
                >
                  <span>Procure</span>
                  <ExternalLink size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sovereign Store Catalog CTA */}
        <div className="text-center pt-2">
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition shadow"
          >
            <ShoppingBag size={14} className="text-emerald-400" />
            <span>Browse Full Sovereign Longevity Store (50+ Clinical Products) ➔</span>
          </Link>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. COMPARISON TABLE: VALUE BREAKDOWN                                      */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">Unbeatable Value</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Why This Black Friday Deal Is Unprecedented</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 block">Individual Purchase</span>
              <span className="text-2xl font-black text-slate-500 line-through block">£228.96</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buying each of the 10 clinical execution books separately across our digital store.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 block">Regular Bundle Vault</span>
              <span className="text-2xl font-black text-slate-400 line-through block">£69.99</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our standard bulk discount package already saving over 70% off retail list prices.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-950 border-2 border-amber-500 shadow-xl space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                Black Friday
              </div>
              <span className="text-xs font-bold text-amber-400 block">Exclusive Flash Price</span>
              <span className="text-3xl font-black text-white block">£39.99</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                All 10 books in 1-Click ZIP + 10 individual PDFs. Just £3.99 per book!
              </p>
            </div>
          </div>

          {/* Features Checkmarks */}
          <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>Instant 1-Click ZIP Archive (`all-ten-master-guides.zip`)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>10 High-Resolution, Searchable PDF Master Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>Includes 2026 Revisions & Telemetry Log Sheets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>Lifetime Updates & Cross-Device Compatibility</span>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="pt-2 text-center">
            <button
              onClick={handleClaimDeal}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl transition shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              Get All 10 Master Guides for £39.99 ➔
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FAQ SECTION                                                            */}
      {/* ========================================================================= */}
      <section className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          {[
            {
              q: "How do I receive my guides after ordering?",
              a: "Immediately upon checkout, you can download all 10 guides in one click as a ZIP file, or download each individual PDF directly. A permanent backup copy and receipt are also instantly emailed to your delivery address."
            },
            {
              q: "Can I read these on my phone, iPad, or Kindle?",
              a: "Yes! All guides are delivered in DRM-free, high-resolution PDF format, fully compatible with Apple Books, Kindle, Adobe Acrobat, Android PDF viewers, and desktop computers."
            },
            {
              q: "How does the Sovereign Store hardware integrate with the guides?",
              a: "Our guides provide the exact science, clinical dosages, and daily behavioral protocols. The Sovereign Store provides the matched biological hardware (CGMs, Withings sleep trackers, epigenetic age kits, and microalbumin reagents) so you can quantify your cellular results."
            },
            {
              q: "Where should I start if I am new to longevity?",
              a: "Visit our dedicated '/start-here' page or take the free 2-minute Longevity Health Quiz. As our core philosophy states: 'Yesterday was the best time to start, today is the second best time.' Taking your first baseline is step one."
            },
            {
              q: "How long does this £39.99 Black Friday pricing last?",
              a: "This is a strictly time-limited flash promotion for social media campaigns. Once the promotion window closes, the vault returns to its regular £69.99 pricing."
            }
          ].map((faq, idx) => (
            <div 
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} 
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FIXED FLOATING BOTTOM BAR (DUAL ACTION FUNNEL)                        */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/40 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/80">
                Black Friday Flash Sale
              </span>
              <span className="text-xs text-slate-400 line-through hidden sm:inline">£69.99</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-white">£39.99</span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">($39.99 USD • 39,99€ EUR)</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                All 10 Guides Unlocked
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/start-here"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-bold rounded-xl transition"
            >
              <Compass size={14} />
              <span>Start Here Guide</span>
            </Link>
            <button
              onClick={handleClaimDeal}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Download size={16} />
              <span>Claim £39.99 Deal ➔</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
