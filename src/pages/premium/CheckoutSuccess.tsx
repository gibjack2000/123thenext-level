import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FileText, CheckCircle2, Download, AlertCircle, ArrowLeft } from 'lucide-react';
import { guides } from '../../data/guides';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const guideId = searchParams.get('guide_id');
  
  const guide = guides.find(g => g.id === guideId);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(true); // Defaulting to true for demonstration. In production, this should await a backend check.

  // In a real production environment, you would:
  // 1. Send the sessionId to your backend.
  // 2. The backend calls stripe.checkout.sessions.retrieve(sessionId).
  // 3. If payment_status is 'paid', return a short-lived signed URL or base64 PDF.
  // DO NOT link directly to public PDFs if you want to protect your assets.

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 pt-32 pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-lg w-full text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-2xl font-display font-black text-white mb-4">Verification Required</h1>
          <p className="text-slate-400 mb-8">We received your payment, but couldn't identify the specific guide. Please contact support with your receipt.</p>
          <Link to="/premium-guides" className="text-blue-400 hover:text-blue-300 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Return to Guides
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          
          {/* Header */}
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-10 text-center">
            <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-2">Payment Successful</h1>
            <p className="text-emerald-400 font-medium">Thank you for your purchase. Your premium guide is ready.</p>
          </div>

          <div className="p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
              <div className="w-48 flex-shrink-0 relative rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                <img src={guide.image} alt={guide.title} className="w-full aspect-[3/4] object-cover" />
                <div className="absolute bottom-3 left-3 z-20">
                  <span className="px-2 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest rounded">
                    {guide.category}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">{guide.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {guide.shortDescription}
                </p>
                
                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Secure Download</h3>
                  
                  {isVerifying ? (
                    <div className="flex items-center justify-center md:justify-start gap-3 text-slate-400">
                      <div className="w-5 h-5 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
                      <span className="text-sm font-medium">Verifying session...</span>
                    </div>
                  ) : isVerified ? (
                    <div className="space-y-4">
                      <button 
                        onClick={() => alert('In production, this triggers the secure PDF download.')}
                        className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                      >
                        <Download size={18} />
                        Download PDF Guide
                      </button>
                      <p className="text-[10px] text-slate-500 font-medium">
                        File: {guide.fileName} (PDF format)
                      </p>
                    </div>
                  ) : (
                    <div className="text-red-400 text-sm font-medium">
                      Verification failed. Please contact support.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 mt-8">
              <h3 className="text-lg font-bold text-white mb-4">What happens next?</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-300 font-bold text-sm">1</div>
                  <p className="text-slate-400 text-sm pt-1">Download your guide using the button above and save it to a safe location on your device.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-300 font-bold text-sm">2</div>
                  <p className="text-slate-400 text-sm pt-1">A receipt from Stripe has been sent to the email address you provided during checkout.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-300 font-bold text-sm">3</div>
                  <p className="text-slate-400 text-sm pt-1">You have unlimited access to this file. If you lose it, contact support with your receipt.</p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Footer Navigation */}
          <div className="bg-slate-950 p-6 flex justify-center border-t border-slate-800">
            <Link to="/premium-guides" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 transition-colors">
              <ArrowLeft size={14} /> Back to Premium Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
