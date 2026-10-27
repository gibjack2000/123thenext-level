import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Download, 
  ShoppingCart, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Dna, 
  Calendar, 
  Clock, 
  Lock, 
  Heart, 
  Droplet, 
  ChevronRight, 
  Check, 
  Printer, 
  Stethoscope, 
  Flame,
  Award
} from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { useCart } from '../contexts/CartContext';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';
import { usePaywallBypass } from '../utils/adminTestMode';

export default function MetabolicMasterGuidePage() {
  const { market, setMarket } = useMarket();
  const { addToCart, isInCart, openCart, cartCount, cartSubtotal, currencySymbol } = useCart();
  const [activeCurrency, setActiveCurrency] = useState<'GBP' | 'USD' | 'EUR'>('GBP');
  const [downloading, setDownloading] = useState(false);
  const { isBypassActive } = usePaywallBypass();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The 12-Week Metabolic Re-Engineering Protocol | 123TheNextLevel';
  }, []);

  useEffect(() => {
    if (market === 'US') setActiveCurrency('USD');
    else if (market === 'ES') setActiveCurrency('EUR');
    else setActiveCurrency('GBP');
  }, [market]);

  const priceFormatted = activeCurrency === 'USD' ? '$25.00' : activeCurrency === 'EUR' ? '22,00 €' : '£19.00';
  const currencySign = activeCurrency === 'USD' ? '$' : activeCurrency === 'EUR' ? '€' : '£';

  const productData = {
    id: 'metabolic-master-guide',
    slug: 'metabolic-master-guide',
    title: 'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol',
    priceDisplay: priceFormatted,
    stripePriceId: 'price_metabolic_master_guide',
    image: '/assets/images/metabolic_nutrition_cover_New.png',
    category: 'Nutrition'
  };

  const handleAddToCart = () => {
    addToCart(productData);
    openCart();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pt-28 pb-32 relative overflow-hidden">
      
      {/* Background radial glow & structural grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* ========================================================================= */}
        {/* HEADER & TOP NAVIGATION BAR                                               */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link to="/store" className="hover:text-cyan-400 transition-colors">Store</Link>
            <ChevronRight size={12} />
            <Link to="/premium-guides" className="hover:text-cyan-400 transition-colors">Premium Guides</Link>
            <ChevronRight size={12} />
            <span className="text-cyan-400 font-bold">12-Week Protocol</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1 text-xs">
              <button
                type="button"
                onClick={() => { setActiveCurrency('GBP'); setMarket('UK'); }}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  activeCurrency === 'GBP' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                £ GBP
              </button>
              <button
                type="button"
                onClick={() => { setActiveCurrency('USD'); setMarket('US'); }}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  activeCurrency === 'USD' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
              <button
                type="button"
                onClick={() => { setActiveCurrency('EUR'); setMarket('ES'); }}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  activeCurrency === 'EUR' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                € EUR
              </button>
            </div>

            {cartCount > 0 && (
              <button
                type="button"
                onClick={openCart}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 text-xs font-bold hover:bg-slate-850 transition-all cursor-pointer shadow-md"
              >
                <ShoppingCart size={13} />
                <span>Cart ({cartCount}) • {currencySymbol}{cartSubtotal.toFixed(2)}</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO SALES SECTION                                                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Core Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Award size={14} className="text-cyan-400" />
              <span>THE 12-WEEK METABOLIC MASTER GUIDE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
              Stop Guessing Your Weight.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300">
                Re-Engineer Your Internal Biology in 12 Weeks.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Traditional diets obsess over bathroom scale numbers, blindly burning precious skeletal muscle while toxic organ fat remains untouched. This phased protocol bridges hardware bioimpedance, weekly urine chemistry, and quarterly clinical phlebotomy to strip visceral fat and restore metabolic youth.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs font-mono text-cyan-400 block font-bold">WEEKS 1–4</span>
                <span className="text-xs text-white font-semibold">Habits &amp; Calibration</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs font-mono text-teal-400 block font-bold">WEEKS 5–8</span>
                <span className="text-xs text-white font-semibold">Muscle &amp; Protein Timing</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center col-span-2 sm:col-span-1">
                <span className="text-xs font-mono text-emerald-400 block font-bold">WEEKS 9–12</span>
                <span className="text-xs text-white font-semibold">Consolidation &amp; GP Brief</span>
              </div>
            </div>

            {/* Price & Primary CTA Container */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                    One-Time Purchase • Instant Digital Access
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl font-display font-black text-white">{priceFormatted}</span>
                    <span className="text-xs font-mono text-slate-400">({currencySign === '£' ? '£19 GBP' : currencySign === '$' ? '$25 USD' : '€22 EUR'})</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-950 border border-emerald-700 text-emerald-400 font-bold">
                  PDF + Logging Worksheets
                </span>
              </div>

              {isBypassActive ? (
                <a
                  href="/assets/docs/metabolic-master-guide.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 cursor-pointer active:scale-98"
                >
                  <Download size={17} />
                  <span>Test Download (Free Bypass)</span>
                </a>
              ) : isInCart('metabolic-master-guide') ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={openCart}
                    className="w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 cursor-pointer active:scale-98"
                  >
                    <ShoppingCart size={17} />
                    <span>View Cart &amp; Complete Checkout ({currencySymbol}{cartSubtotal.toFixed(2)}) ➔</span>
                  </button>
                  <p className="text-[11px] text-center text-emerald-400 font-semibold leading-relaxed">
                    ✓ Guide in your cart. Instant download link provided immediately upon checkout.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 cursor-pointer active:scale-98"
                >
                  <Download size={17} />
                  <span>Get 12-Week Protocol ({priceFormatted}) ➔</span>
                </button>
              )}

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1"><Lock size={12} className="text-cyan-400" /> Stripe 256-Bit SSL</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Zap size={12} className="text-teal-400" /> Instant Cloud Delivery</span>
                <span>•</span>
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-400" /> 100% Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Mockup Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center p-2">
                <img
                  src="/assets/images/metabolic_nutrition_cover_New.png"
                  alt="Metabolic Master Guide Cover"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-cyan-950/90 text-cyan-300 border border-cyan-800 font-bold backdrop-blur-sm">
                    Clinical Master Document
                  </span>
                  <h3 className="text-base font-display font-black text-white uppercase mt-1">
                    The 12-Week Metabolic Re-Engineering Protocol
                  </h3>
                </div>
              </div>

              {/* What is Included Checklist */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
                  Complete Deliverables Included:
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>12-Week Master PDF:</strong> Phased biological blueprint</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>14-Day Bioimpedance Telemetry Sheet:</strong> Printable PDF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>Visceral Fat Rating Tracker:</strong> 1–12 scale calibration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>Sunday Urinalysis Log:</strong> 10-parameter reagent record</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span><strong>Day 90 GP Consultation Brief:</strong> Pre-filled vector artifact</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 1, 2, 3 PRODUCT HIGHLIGHTS                                        */}
        {/* ========================================================================= */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest font-bold">SYSTEMATIC METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white">
              The 3 Architectural Pillars of the Master Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Built on peer-reviewed geroscience, lipidology, and sports biochemistry. Zero generic advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* HIGHLIGHT 1: Biometric Calibration */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Scale size={20} />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">SECTION 1</span>
              <h3 className="text-xl font-display font-black uppercase text-white">
                Biometric Calibration
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Establish accurate baselines without high laboratory expense. Calibrate home bioimpedance scales (Withings, Renpho), configure smartwatch sleep and nocturnal HRV telemetry, and establish your baseline Sunday 10-parameter urine profile.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <li>• Morning fasting scale measurement rules</li>
                <li>• Hydration variance mitigation techniques</li>
                <li>• Normalizing nocturnal HRV rMSSD averages</li>
              </ul>
            </div>

            {/* HIGHLIGHT 2: The 12-Week Phased Protocol */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center">
                <Activity size={20} />
              </div>
              <span className="text-[10px] font-mono text-teal-400 uppercase font-bold tracking-wider">SECTION 2</span>
              <h3 className="text-xl font-display font-black uppercase text-white">
                The 12-Week Phased Protocol
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                A non-linear periodized strategy designed to spare lean skeletal muscle while targeting stubborn visceral adipose depots. Step-by-step guidance across 3 four-week mesocycles designed for sustainable biological transformation.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <li>• <strong>Weeks 1–4:</strong> Habit grounding &amp; glycemic blunting</li>
                <li>• <strong>Weeks 5–8:</strong> Leucine thresholds &amp; resistance overload</li>
                <li>• <strong>Weeks 9–12:</strong> Data consolidation &amp; metabolic lock-in</li>
              </ul>
            </div>

            {/* HIGHLIGHT 3: Printable Biometric Worksheets */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Printer size={20} />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">SECTION 3</span>
              <h3 className="text-xl font-display font-black uppercase text-white">
                Printable Telemetry Worksheets
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Physical artifacts to bridge digital sensors with your daily life. Includes 14-day rolling biophysical loggers, weekly urinalysis grids, and the standardized clinical briefing sheet ready to present directly to your doctor.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <li>• 14-Day Resting HR &amp; HRV graphing templates</li>
                <li>• Visceral Fat Rating (1–12) velocity chart</li>
                <li>• Section 2 GP Consultation pre-filled export</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* TESTING CADENCE MATRIX DISPLAY                                            */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-indigo-500/30 shadow-2xl space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-indigo-400 tracking-widest font-bold">
              THE VERIFICATION CADENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
              Testing Cadence Matrix: Daily, Weekly &amp; Quarterly
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Synchronizing low-cost continuous home telemetry with high-accuracy quarterly clinical lab verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* DAILY */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  DAILY (60 SECONDS)
                </span>
                <Clock size={16} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-display font-black uppercase text-white">
                Fasting Scale &amp; Smartwatch
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Step on bioimpedance scale upon waking (fasted post-void). Check smartwatch for nocturnal HRV rMSSD, Resting Heart Rate, and total sleep duration.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-400">
                Target: Track 14-day rolling averages
              </div>
            </div>

            {/* WEEKLY */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-text-[10px] font-mono uppercase bg-teal-950 text-teal-300 border border-teal-800 font-bold">
                  WEEKLY (SUNDAYS)
                </span>
                <Droplet size={16} className="text-teal-400" />
              </div>
              <h3 className="text-lg font-display font-black uppercase text-white">
                10-Parameter Urine Reagent
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Rapid 60-second home dipstick (Diagnox / ALLTEST). Verify hydration (Specific Gravity), systemic pH, ketosis status, and acute microalbumin clearance.
              </p>
              <div className="pt-2 text-[11px] font-mono text-teal-400">
                Target: pH 6.0–7.5 • Protein Negative
              </div>
            </div>

            {/* QUARTERLY */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                  QUARTERLY (DAY 90)
                </span>
                <Stethoscope size={16} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-display font-black uppercase text-white">
                Venous Phlebotomy &amp; GP Brief
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Comprehensive venous blood draw (ApoB, HbA1c, hs-CRP) and pathology urine ACR. Walk into your doctor's office with your pre-filled 2-page Clinician Co-Pilot report.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-400">
                Target: ApoB &lt;70 • HbA1c &lt;5.4% • ACR &lt;10
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CONVERSION / CALL-TO-ACTION                                         */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border border-cyan-500/40 shadow-2xl text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>INSTANT SECURE DOWNLOAD DELIVERY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white">
            Take Control of Your Internal Biology Today
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Eliminate visceral organ fat, protect skeletal muscle mass, and walk into your next GP consultation with unquestionable biological data.
          </p>

          <div className="pt-2 max-w-md mx-auto">
            {isBypassActive ? (
              <a
                href="/assets/docs/metabolic-master-guide.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-8 rounded-2xl font-black uppercase tracking-wider text-sm transition-all shadow-xl shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>Test Download (Free Bypass)</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 px-8 rounded-2xl font-black uppercase tracking-wider text-sm transition-all shadow-xl shadow-cyan-500/25 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>Download 12-Week Protocol ({priceFormatted})</span>
              </button>
            )}
            <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-mono text-slate-400">
              <span>Instant PDF Access</span>
              <span>•</span>
              <span>30-Day Money Back Guarantee</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
