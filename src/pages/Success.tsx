import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  ShoppingBag, 
  Download 
} from 'lucide-react';

export default function Success() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckoutBundle = async () => {
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
              id: 'g-bundle-1',
              title: '3-Part Digital Master Guides Bundle',
              price: 29.00,
              category: 'Wellness',
              priceDisplay: '£29.00',
              stripePriceId: 'price_placeholder_bundle1'
            }
          ]
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout page
      } else {
        alert('Failed to initiate checkout. Please try again.');
        console.error('Checkout error:', data);
      }
    } catch (err) {
      console.error('Network error during checkout:', err);
      alert('Network error. Please check your connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 pt-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            <CheckCircle2 size={14} /> Access Granted
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight leading-[1.1]">
            Your Longevity Blueprint <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">is downloading.</span>
          </h1>
          
          <p className="text-slate-400 text-base sm:text-lg max-w-[60ch] mx-auto leading-relaxed">
            Please check your browser's downloads folder. While your blueprint downloads, you are required to complete the two critical onboarding tasks detailed below.
          </p>
        </div>

        {/* Two Mandatory Tasks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
          
          {/* Card 1: Local Practitioner Mandate (Amber-bordered Double-Bezel) */}
          <div className="group relative rounded-[2rem] bg-amber-500/5 p-1 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="bg-slate-900/90 rounded-[calc(2rem-0.25rem)] p-8 space-y-6 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs uppercase tracking-widest">
                    <AlertTriangle size={16} /> Task 01
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">MANDATORY</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-display font-black uppercase text-white tracking-tight">
                  Establish Your Local Physician Partnership
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  <strong>123TheNextLevel</strong> is an independent global educational platform. Because we serve members across the US, UK, and Spain, we do not refer to or partner with specific localized clinics. 
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Wearables and at-home blood panels only generate raw physiological data. You must add "establishing a partnership with a qualified local healthcare practitioner" to your immediate to-do list. Only a licensed physician can interpret your clinical biomarkers, bypass device variations, and safely verify these general protocols against your unique clinical history.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>autonomic safety</span>
                <span className="text-amber-500 font-black">ACTION REQUIRED</span>
              </div>
            </div>
          </div>

          {/* Card 2: Scorecard Mandate (Cyan-accented Double-Bezel) */}
          <div className="group relative rounded-[2rem] bg-cyan-500/5 p-1 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="bg-slate-900/90 rounded-[calc(2rem-0.25rem)] p-8 space-y-6 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-xs uppercase tracking-widest">
                    <Activity size={16} /> Task 02
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">RECOMMENDED</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-display font-black uppercase text-white tracking-tight">
                  Establish Your Baseline Scorecard
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Optimizing biological age requires a precise baseline assessment. We have engineered a high-fidelity diagnostic scorecard to evaluate your current markers.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Take our comprehensive 12-question diagnostic quiz to identify biological vulnerabilities across nutrition, cardiovascular fitness, recovery, and cognitive resilience.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6">
                <Link 
                  to="/health-quiz" 
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98] duration-200"
                >
                  Start Diagnostic Quiz <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Monetization Section (3-Part Digital Master Guides Bundle) */}
        <div className="relative rounded-[2rem] bg-slate-900 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32" />
          
          <div className="relative z-10 space-y-8">
            <div className="text-center sm:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={12} /> Companion Protocol System
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight">
                Enhance Your Blueprint with the <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">3-Part Master Companion Bundle</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-[65ch]">
                The Longevity Blueprint sets your calendar; executing it requires step-by-step guidance. Get the complete daily companion protocol system covering Fitness, Nutrition, and Stress Management at a bundle discount.
              </p>
            </div>

            {/* List of included guides */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80">
              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800/60 text-left space-y-2">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Part 01 • Fitness</span>
                <h4 className="text-sm font-bold text-white uppercase line-clamp-1">Beginner Home Workout</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">4-week strength & mobility protocol needing zero gym equipment.</p>
              </div>
              
              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800/60 text-left space-y-2">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Part 02 • Nutrition</span>
                <h4 className="text-sm font-bold text-white uppercase line-clamp-1">Master Meal Planner</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">A structured macro-balanced grocery and weekly prep blueprint.</p>
              </div>

              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800/60 text-left space-y-2">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Part 03 • Wellness</span>
                <h4 className="text-sm font-bold text-white uppercase line-clamp-1">Cortisol & Stress</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">Science-backed vagal tuning protocols to drop chronic stress.</p>
              </div>
            </div>

            {/* Checkout Area */}
            <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <span className="text-sm text-slate-450 line-through">£65.00</span>
                  <span className="text-3xl font-black text-white">£29.00</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1 font-bold">ONE-TIME SECURE PAYMENT • SAVE 55%</span>
              </div>

              <button 
                onClick={handleCheckoutBundle}
                disabled={isProcessing}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10 group cursor-pointer border border-blue-500/20 active:scale-[0.98]"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Initiating checkout...
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} /> 
                    <span>Get 3-Part Companion Bundle</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 pt-2 text-[9px] text-slate-500 uppercase tracking-widest font-mono">
              <Lock size={10} /> Payments processed securely via Stripe. Instant PDF delivery.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
