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
  Star
} from 'lucide-react';
import { ALL_10_MASTER_GUIDES } from '../components/BundleOffers';
import { usePaywallBypass, triggerDirectDownload, getGuidePdfDownloadUrl } from '../utils/adminTestMode';

export default function BlackFridayPage() {
  const navigate = useNavigate();
  const { isBypassActive } = usePaywallBypass();
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown timer state (Dynamic urgency: counts down to midnight Sunday)
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
        return { hours: 12, minutes: 0, seconds: 0 }; // Loop/reset urgency
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans pb-28">
      
      {/* 1. TOP STICKY URGENCY TICKER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-650 via-amber-600 to-orange-600 text-slate-950 font-black py-2.5 px-4 shadow-xl border-b border-amber-400/30">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span className="tracking-wide uppercase font-black">
              🔥 Black Friday Flash Sale: Save 82% Off The Complete Master Vault
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-950/20 px-3 py-1 rounded-full font-mono text-xs">
              <Clock size={13} />
              <span>Ends in: {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
            <button 
              onClick={handleClaimDeal}
              className="hidden md:inline-flex items-center gap-1 bg-slate-950 hover:bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold transition shadow"
            >
              Claim £39.99 ➔
            </button>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <header className="relative pt-12 pb-16 px-4 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-red-500/15 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg">
            <Flame size={14} className="text-orange-400 animate-pulse" />
            <span>Black Friday Exclusive • Social Flash Deal</span>
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
            Instant access to all 10 Premium Clinical Master Execution Books — covering metabolic re-engineering, muscle hypertrophy, visceral fat stripping, circadian sleep, and mobility.
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
              <div>
                <span className="text-xs text-slate-500 line-through block font-mono">Regular Combined: £220.00</span>
                <span className="text-xs text-amber-400/80 line-through block font-mono">Standard Vault: £69.99</span>
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-2">
                  £39.99
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-1 rounded-full uppercase tracking-wider">
                    Save £180
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
            <span className="text-[11px] text-slate-500">Share with friends or social media</span>
          </div>

        </div>
      </header>

      {/* 3. VISUAL SHOWCASE OF ALL 10 BOOKS */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            Complete Execution Suite
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Everything Inside The 10-Book Master Archive
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Each master guide is a comprehensive, clinically referenced digital execution manual designed for rapid implementation.
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

      {/* 4. COMPARISON BREAKDOWN */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">Unbeatable Value</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Why This Black Friday Deal Is Unprecedented</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 block">Individual Purchase</span>
              <span className="text-2xl font-black text-slate-500 line-through block">£220.00</span>
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

      {/* 5. FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          {[
            {
              q: "How do I receive my guides after ordering?",
              a: "Immediately upon checkout, you can download all 10 guides in one click as a ZIP file, or download each individual PDF directly. A permanent backup copy and receipt are also instantly emailed to you."
            },
            {
              q: "Can I read these on my phone, iPad, or Kindle?",
              a: "Yes! All guides are delivered in DRM-free, high-resolution PDF format, fully compatible with Apple Books, Kindle, Adobe Acrobat, Android PDF viewers, and desktop computers."
            },
            {
              q: "Are the 2026 revisions included in this Black Friday deal?",
              a: "Yes. You receive the latest 2026 geroscience revisions, including the full 12-Week Metabolic Re-Engineering & Visceral Fat Protocol, actionable telemetry sheets, and GP consultation scripts."
            },
            {
              q: "How long does this £39.99 Black Friday pricing last?",
              a: "This is a strictly time-limited flash promotion for Black Friday social campaigns. Once the promotion window closes, the vault returns to its regular £69.99 pricing."
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

      {/* 6. FIXED FLOATING BOTTOM BAR (For Mobile & Desktop Conversion) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/40 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
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
                All 10 Guides
              </span>
            </div>
          </div>

          <button
            onClick={handleClaimDeal}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download size={16} />
            <span>Claim Access ➔</span>
          </button>
        </div>
      </div>

    </div>
  );
}
