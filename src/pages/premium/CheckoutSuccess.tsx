import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { 
  FileText, 
  CheckCircle2, 
  Download, 
  AlertCircle, 
  ArrowLeft,
  Mail,
  ShieldCheck,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

interface PurchasedProduct {
  id: string;
  title: string;
  slug: string;
}

interface OrderSummary {
  payment_status: string;
  customer_email: string;
  products: PurchasedProduct[];
  download_links: Record<string, string>;
  amount_total: number;
  currency: string;
}

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderSummary() {
      if (!sessionId) {
        setError('Missing session ID. Please refer to your confirmation email or contact support.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Call backend API to retrieve verified order details and safe download tokens
        const response = await fetch(`/api/order-summary?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to retrieve order summary. The server may be verifying your payment.');
        }

        const data = await response.json();
        
        if (data.payment_status === 'paid') {
          setOrderSummary(data);
          clearCart(); // Clear the cart since purchase is completed
        } else {
          setError(`Payment status is '${data.payment_status}'. If this is an error, please reload or contact support.`);
        }
      } catch (err: any) {
        console.error('Error fetching order summary:', err);
        setError(err.message || 'Error communicating with server.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrderSummary();
  }, [sessionId]);

  const triggerDownload = (url: string, fileName: string) => {
    // Initiate direct browser download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 pt-32 pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-6"></div>
          <h1 className="text-xl font-display font-black text-white uppercase tracking-wider mb-2">Verifying Purchase</h1>
          <p className="text-slate-400 text-sm leading-relaxed">Securing payment details and generating your download links. Just a moment...</p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error || !orderSummary) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 pt-32 pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight">Order Verification</h1>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed">
            {error || 'We received your payment, but couldn\'t verify it in our database yet. Please wait a few seconds and refresh, or contact support.'}
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-505 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-colors shadow-lg"
            >
              Refresh Verification
            </button>
            <Link to="/premium-guides" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors">
              <ArrowLeft size={14} /> Return to Guides
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Success State
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          
          {/* Header Banner */}
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-10 text-center">
            <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_35px_rgba(16,185,129,0.3)] animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-2">Payment Confirmed</h1>
            <p className="text-emerald-400 font-medium">Thank you for your purchase! Your digital assets have been generated securely.</p>
          </div>

          <div className="p-10">
            {/* Customer Details Box */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 text-slate-400 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[9px] font-black text-slate-550 uppercase tracking-widest block mb-0.5">Delivered to</span>
                  <span className="text-white font-bold text-sm block truncate max-w-xs">{orderSummary.customer_email}</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <span className="text-[9px] font-black text-slate-550 uppercase tracking-widest block mb-0.5">Amount Paid</span>
                <span className="text-xl font-black text-white uppercase">
                  {orderSummary.currencySymbol || orderSummary.currency.toUpperCase()} {orderSummary.amount_total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* List of Purchased Guides */}
            <h2 className="text-lg font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <ShoppingBag size={18} className="text-blue-500" /> Purchased Guides ({orderSummary.products.length})
            </h2>

            <div className="space-y-4 mb-10">
              {orderSummary.products.map(product => {
                const downloadUrl = orderSummary.download_links[product.id];
                return (
                  <div 
                    key={product.id}
                    className="bg-slate-950 border border-slate-850 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:border-slate-800"
                  >
                    <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <FileText size={22} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">{product.title}</h4>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          Format: PDF Guide
                        </span>
                      </div>
                    </div>

                    {downloadUrl ? (
                      <button 
                        onClick={() => triggerDownload(downloadUrl, `${product.slug}.pdf`)}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/10"
                      >
                        <Download size={14} />
                        Download PDF
                      </button>
                    ) : (
                      <span className="text-xs text-amber-500 font-bold uppercase tracking-widest flex items-center gap-1 border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 rounded-xl">
                        Generating...
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Steps / Gating Instructions */}
            <div className="border-t border-slate-800 pt-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> Download & Access Information
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-xs">1</div>
                  <p className="text-slate-400 text-xs pt-1 leading-relaxed">
                    **Token Expiration**: For security, your download links are only active for **72 hours** and allow a maximum of **3 downloads** per token. Please save your file immediately.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-xs">2</div>
                  <p className="text-slate-400 text-xs pt-1 leading-relaxed">
                    **Receipt**: A detailed purchase receipt has been dispatched to your email by Stripe. Keep it as proof of purchase.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-xs">3</div>
                  <p className="text-slate-400 text-xs pt-1 leading-relaxed">
                    **Support**: If you hit the download limit or need the links refreshed, please submit a request to support with your Stripe session ID: `CS_...{sessionId?.slice(-8)}`.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Footer Navigation */}
          <div className="bg-slate-950 p-6 flex justify-center border-t border-slate-800">
            <Link to="/premium-guides" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-[9px] flex items-center gap-2 transition-all">
              <ArrowLeft size={12} /> Back to Premium Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
