import React, { useState, useEffect } from 'react';
import { guides as fallbackGuides } from '../../data/guides';
import { supabase, hasValidSupabaseConfig } from '../../lib/supabase';
import { PremiumGuide } from '../../types';
import { FileText, CheckCircle2, X, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export default function PremiumGuides() {
  const [activeTab, setActiveTab] = useState<'All' | 'Fitness' | 'Nutrition' | 'Wellness'>('All');
  const [selectedGuide, setSelectedGuide] = useState<PremiumGuide | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [guides, setGuides] = useState<PremiumGuide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuides() {
      if (!hasValidSupabaseConfig || !supabase) {
        setGuides(fallbackGuides as unknown as PremiumGuide[]);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from('premium_guides').select('*').order('created_at', { ascending: false });
        if (error && error.code !== '42P01') throw error;
        
        // Transform the snake_case from DB into camelCase used by the UI, or just use DB type if possible
        // Actually, fallbackGuides are camelCase. The DB is snake_case.
        // Let's normalize everything to the PremiumGuide type
        const mappedData = data ? data.map(d => ({
          ...d,
          shortDescription: d.short_description,
          longDescription: d.long_description,
          priceDisplay: d.price_display,
          stripePriceId: d.stripe_price_id
        })) : [];
        
        setGuides(mappedData.length > 0 ? mappedData : (fallbackGuides as unknown as PremiumGuide[]));
      } catch (err) {
        console.error('Error fetching guides:', err);
        setGuides(fallbackGuides as unknown as PremiumGuide[]);
      } finally {
        setLoading(false);
      }
    }
    fetchGuides();
  }, []);

  const filteredGuides = activeTab === 'All' 
    ? guides 
    : guides.filter(g => g.category === activeTab);

  const featuredGuides = guides.filter(g => g.featured);

  const handleCheckout = async (priceId: string, guideId: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, guideId }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert('Failed to initiate checkout. Please try again later.');
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
    <div className="min-h-screen bg-slate-950 text-slate-300 pb-24">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} /> Premium Digital Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight leading-tight mb-6">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Next Level</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Downloadable, science-backed protocols for fitness, nutrition, and wellness. No fluff—just actionable strategies designed for high performance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-2"><Lock size={14} /> Secure Payment via Stripe</span>
            <span className="flex items-center gap-2"><FileText size={14} /> Instant PDF Delivery</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-6 mb-12 sticky top-20 z-30">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-2xl">
          {['All', 'Fitness', 'Nutrition', 'Wellness'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map(guide => (
            <div 
              key={guide.id} 
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-slate-700 transition-colors flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedGuide(guide)}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700">
                    {guide.category}
                  </span>
                  {guide.featured && (
                    <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{guide.title}</h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed flex-1">
                  {(guide as any).shortDescription || guide.short_description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-auto">
                  <span className="text-xl font-black text-white">{(guide as any).priceDisplay || guide.price_display}</span>
                  <button 
                    className="px-5 py-2.5 bg-slate-800 text-white hover:bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-12">Why Choose Our Protocols?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Evidence-Based</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Grounded in the latest clinical research and sports science. No fads.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Highly Actionable</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Structured templates and routines you can implement immediately.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Lifetime Access</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Download your PDF once and keep it forever across all your devices.</p>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            onClick={() => setSelectedGuide(null)}
          ></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setSelectedGuide(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-slate-950/50 text-slate-400 hover:text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-800">
              <img 
                src={selectedGuide.image} 
                alt={selectedGuide.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 to-transparent"></div>
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 text-[9px] font-black uppercase tracking-widest rounded">
                    {selectedGuide.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                    <FileText size={12} /> PDF Download
                  </span>
                </div>
                <h2 className="text-3xl font-display font-black text-white mb-4">{selectedGuide.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {(selectedGuide as any).longDescription || selectedGuide.long_description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">What's Included</h4>
                  <ul className="space-y-2">
                    {selectedGuide.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Who it's for</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedGuide.audience}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">One-time payment</span>
                    <span className="text-3xl font-black text-white">{(selectedGuide as any).priceDisplay || selectedGuide.price_display}</span>
                  </div>
                  <button 
                    onClick={() => handleCheckout((selectedGuide as any).stripePriceId || selectedGuide.stripe_price_id, selectedGuide.id)}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Lock size={16} /> Buy Now securely
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-6 text-center sm:text-left">
                   <p className="text-[9px] text-slate-500 font-medium uppercase tracking-wider leading-relaxed">
                     {selectedGuide.disclaimer}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Global Style for scrollbar in modal */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
