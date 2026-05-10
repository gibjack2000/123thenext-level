import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 pt-32 pb-20">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl">
        <XCircle className="w-16 h-16 text-slate-600 mx-auto mb-6" />
        <h1 className="text-3xl font-display font-black text-white mb-4">Checkout Cancelled</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Your payment was cancelled and no charges were made. If you experienced technical difficulties, please try again or contact our support team.
        </p>
        <Link 
          to="/premium-guides" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft size={16} /> Return to Premium Guides
        </Link>
      </div>
    </div>
  );
}
