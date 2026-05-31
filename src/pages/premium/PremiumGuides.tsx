import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { guides as fallbackGuides } from '../../data/guides';
import { supabase, hasValidSupabaseConfig } from '../../lib/supabase';
import { PremiumGuide } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { 
  FileText, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Lock, 
  ShoppingCart, 
  Trash2, 
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Download
} from 'lucide-react';

export default function PremiumGuides() {
  const [activeTab, setActiveTab] = useState<'All' | 'Fitness' | 'Nutrition' | 'Wellness'>('All');
  const [selectedGuide, setSelectedGuide] = useState<PremiumGuide | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [guides, setGuides] = useState<PremiumGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchasedGuides, setPurchasedGuides] = useState<Record<string, { purchased: boolean; downloadUrl: string; expiresAt: string }>>({});
  const [showTestBypass, setShowTestBypass] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('test_bypass') === 'true' || import.meta.env.DEV) {
      setShowTestBypass(true);
    }
  }, []);

  useEffect(() => {
    try {
      const savedPurchases = localStorage.getItem('purchased_guides');
      if (savedPurchases) {
        const purchases = JSON.parse(savedPurchases);
        const activePurchases: typeof purchases = {};
        let updated = false;
        Object.keys(purchases).forEach(id => {
          const info = purchases[id];
          if (info && new Date() < new Date(info.expiresAt)) {
            activePurchases[id] = info;
          } else {
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem('purchased_guides', JSON.stringify(activePurchases));
        }
        setPurchasedGuides(activePurchases);
      }
    } catch (e) {
      console.error('Error loading purchases from localStorage:', e);
    }
  }, [selectedGuide]);
  const handleBypassTest = async (guideId: string, slug: string) => {
    try {
      const response = await fetch('/api/test-bypass-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: guideId })
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
        purchases[guideId] = info;
        localStorage.setItem('purchased_guides', JSON.stringify(purchases));
        
        // Trigger download
        const link = document.createElement('a');
        link.href = data.download_link;
        link.setAttribute('download', `${slug}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setPurchasedGuides(purchases);
        setSelectedGuide(null);
      } else {
        alert('Bypass test failed.');
      }
    } catch (e) {
      console.error(e);
      alert('Error testing bypass.');
    }
  };
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    isInCart, 
    cartCount, 
    cartSubtotal, 
    currencySymbol 
  } = useCart();

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

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout page
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

  const handleAddToCart = (guide: any) => {
    addToCart(guide);
    setIsCartOpen(true); // Open cart drawer for instant feedback
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 pb-24 relative overflow-x-hidden">
      
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
            Downloadable, science-backed protocols for fitness, nutrition, and wellness. Combine multiple guides in your cart for a single secure checkout.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-2"><Lock size={14} /> Secure Payment via Stripe</span>
            <span className="flex items-center gap-2"><FileText size={14} /> Instant PDF Delivery</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-6 mb-12 sticky top-20 z-30">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Fitness', 'Nutrition', 'Wellness'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Inline Cart Toggle */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-5 py-2.5 bg-slate-850 hover:bg-slate-800 text-white border border-slate-700/60 rounded-xl transition-all shadow-md group"
          >
            <ShoppingCart size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] font-black bg-blue-600 text-white rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-sm font-bold uppercase tracking-widest">Loading Catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {filteredGuides.map(guide => (
              <div 
                key={guide.id} 
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-slate-750 hover:shadow-2xl hover:shadow-blue-900/5 transition-all flex flex-col h-full relative"
              >
                <Link 
                  to={`/premium-guides/${guide.slug}`}
                  className="aspect-[4/3] relative overflow-hidden bg-slate-800 cursor-pointer block"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                  <img 
                    src={guide.image} 
                    alt={guide.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700">
                      {guide.category}
                    </span>
                    {guide.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-1">
                        <Sparkles size={10} /> Bestseller
                      </span>
                    )}
                  </div>
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <Link 
                    to={`/premium-guides/${guide.slug}`}
                    className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors cursor-pointer line-clamp-1 block"
                  >
                    {guide.title}
                  </Link>
                  <p className="text-sm text-slate-450 mb-6 line-clamp-2 leading-relaxed flex-grow">
                    {(guide as any).shortDescription || guide.short_description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-auto">
                    <span className="text-2xl font-black text-white">
                      {(guide as any).priceDisplay || guide.price_display}
                    </span>
                    <div className="flex gap-2">
                      <Link 
                        to={`/premium-guides/${guide.slug}`}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-755 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center"
                      >
                        Details
                      </Link>
                      {purchasedGuides[guide.id] ? (
                        <button 
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = purchasedGuides[guide.id].downloadUrl;
                            link.setAttribute('download', `${guide.slug}.pdf`);
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-550 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1.5"
                        >
                          <Download size={12} /> Download
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleAddToCart(guide)}
                          disabled={isInCart(guide.id)}
                          className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                            isInCart(guide.id)
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10'
                          }`}
                        >
                          {isInCart(guide.id) ? (
                            <>
                              <CheckCircle2 size={12} /> In Cart
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={12} /> Add to Cart
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Shopping Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-blue-600 hover:bg-blue-500 text-white p-5 rounded-full shadow-2xl shadow-blue-500/35 transition-all hover:scale-105 active:scale-95 group flex items-center gap-2"
        >
          <div className="relative">
            <ShoppingCart size={22} className="group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-3 -right-3 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] font-black bg-emerald-500 border-2 border-blue-600 text-white rounded-full">
              {cartCount}
            </span>
          </div>
        </button>
      )}

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
        
        {/* Panel */}
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="text-blue-500" size={20} />
              <h2 className="text-lg font-black uppercase tracking-widest text-white">Your Cart</h2>
              <span className="text-xs text-slate-500 font-bold">({cartCount} items)</span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                <ShoppingCart size={48} className="text-slate-750 mb-4" />
                <p className="font-bold uppercase tracking-wider text-xs mb-1">Your cart is empty</p>
                <p className="text-xs max-w-xs leading-relaxed">Add premium training guides to build your ultimate protocol library.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex gap-4 items-center group relative overflow-hidden"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate pr-6">{item.title}</h4>
                    <span className="text-xs font-black text-slate-400 block mt-1">{item.priceDisplay}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors flex-shrink-0"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/60 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-black text-slate-550 uppercase tracking-widest block">Subtotal</span>
                  <span className="text-xs text-slate-400 font-medium">VAT and local taxes calculated at checkout</span>
                </div>
                <span className="text-3xl font-black text-white">
                  {currencySymbol}{cartSubtotal.toFixed(2)}
                </span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 group"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Initiating checkout...
                  </>
                ) : (
                  <>
                    <Lock size={14} /> 
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[9px] text-slate-550 font-black uppercase tracking-wider">
                <ShieldCheck size={12} className="text-blue-500" /> Secure 256-bit encrypted checkout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            onClick={() => setSelectedGuide(null)}
          />
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
                <p className="text-sm text-slate-350 leading-relaxed">
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
                    <span className="block text-[10px] font-black text-slate-550 uppercase tracking-widest mb-1">One-time payment</span>
                    <span className="text-3xl font-black text-white">{(selectedGuide as any).priceDisplay || selectedGuide.price_display}</span>
                  </div>
                  {purchasedGuides[selectedGuide.id] ? (
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = purchasedGuides[selectedGuide.id].downloadUrl;
                        link.setAttribute('download', `${selectedGuide.slug}.pdf`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        setSelectedGuide(null);
                      }}
                      className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-550 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg"
                    >
                      <Download size={16} /> Download PDF
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button 
                        onClick={() => {
                          handleAddToCart(selectedGuide);
                          setSelectedGuide(null);
                        }}
                        disabled={isInCart(selectedGuide.id)}
                        className={`w-full sm:w-auto px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg ${
                          isInCart(selectedGuide.id)
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                        }`}
                      >
                        {isInCart(selectedGuide.id) ? (
                          <>
                            <CheckCircle2 size={16} /> Already in Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} /> Add to Cart
                          </>
                        )}
                      </button>
                      {showTestBypass && (
                        <button 
                          onClick={() => handleBypassTest(selectedGuide.id, selectedGuide.slug)}
                          className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 border border-slate-700/60 shadow-md"
                        >
                          <Download size={14} /> Test Download
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-6 text-center sm:text-left">
                   <p className="text-[9px] text-slate-550 font-medium uppercase tracking-wider leading-relaxed">
                     {selectedGuide.disclaimer}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #1e293b;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #334155;
        }
      `}} />
    </div>
  );
}
