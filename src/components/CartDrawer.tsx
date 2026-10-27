import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { 
  ShoppingCart, 
  ShoppingBag, 
  X, 
  Trash2, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cartItems, 
    removeFromCart, 
    clearCart,
    cartCount, 
    cartSubtotal, 
    currencySymbol,
    isCartOpen,
    closeCart,
    openCart
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    setCheckoutError(null);

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
        window.location.href = data.url; // Redirect directly to Stripe Checkout
      } else {
        throw new Error(data.error || 'Failed to initiate secure checkout session');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setCheckoutError(err.message || 'Unable to connect to Stripe checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* 1. FLOATING CART PILL (Visible across pages whenever cart has items and drawer is closed) */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-24 right-6 z-40 print:hidden animate-fade-in">
          <button
            onClick={openCart}
            aria-label="Open Cart"
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-slate-950 border-2 border-emerald-500/70 hover:border-emerald-400 text-white shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Glowing Backdrop */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-60 blur-md group-hover:opacity-90 transition-all duration-300 animate-pulse pointer-events-none" />

            {/* Cart Icon with Counter Badge */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-md">
              <ShoppingCart size={16} className="group-hover:rotate-6 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] font-black bg-cyan-400 text-slate-950 rounded-full border-2 border-slate-950 shadow">
                {cartCount}
              </span>
            </div>

            {/* Price Details */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-tight uppercase text-white font-display">
                  Cart ({cartCount})
                </span>
                <span className="text-xs font-black text-amber-300 font-mono">
                  {currencySymbol}{cartSubtotal.toFixed(2)}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold leading-none">
                Checkout Now ➔
              </span>
            </div>
          </button>
        </div>
      )}

      {/* 2. SLIDE-OUT CART DRAWER */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay */}
        <div 
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={closeCart}
        />

        {/* Drawer Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 transform ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="text-base font-display font-black uppercase tracking-wider text-white">
                  Your Cart
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  {cartCount} {cartCount === 1 ? 'digital manual' : 'digital manuals'}
                </span>
              </div>
            </div>

            <button 
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content / Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingCart size={32} />
                </div>
                <div className="space-y-1">
                  <p className="font-bold uppercase tracking-wider text-sm text-slate-300">
                    Your cart is empty
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Add our specialized clinical manuals and blueprints to build your personal longevity library.
                  </p>
                </div>
                <Link
                  to="/premium-guides"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Explore Master Guides</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                  <span className="font-mono uppercase text-[10px] tracking-wider text-slate-400">
                    Selected Guides ({cartCount})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-rose-400 hover:text-rose-300 hover:underline transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl flex gap-3.5 items-center group relative overflow-hidden transition-all shadow-md"
                  >
                    {item.image && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0 space-y-0.5">
                      {item.category && (
                        <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                          {item.category}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-white truncate leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-xs font-black text-amber-400 font-mono block">
                        {item.priceDisplay}
                      </span>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors shrink-0 cursor-pointer"
                      title="Remove item"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md space-y-4">
              
              {checkoutError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2">
                  <AlertCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{checkoutError}</p>
                    <Link
                      to="/checkout"
                      onClick={closeCart}
                      className="text-cyan-400 hover:underline block font-bold"
                    >
                      Try alternative checkout page ➔
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    Total Due
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Instant PDF download token upon completion
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-mono">
                    {currencySymbol}{cartSubtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                    <span>Initiating Stripe Checkout...</span>
                  </>
                ) : (
                  <>
                    <Lock size={14} /> 
                    <span>Proceed to Secure Checkout ({currencySymbol}{cartSubtotal.toFixed(2)}) ➔</span>
                  </>
                )}
              </button>

              {/* Secondary fallback link */}
              <div className="text-center pt-1">
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>Or use Direct Order Summary Page</span>
                  <ArrowRight size={11} />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-cyan-400" /> Stripe 256-Bit SSL
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FileText size={12} className="text-emerald-400" /> Instant PDF Access
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
