import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { guides } from '../../data/guides';
import { useCart } from '../../contexts/CartContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShoppingCart, 
  Download, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface PurchaseInfo {
  purchased: boolean;
  downloadUrl: string;
  expiresAt: string;
}

export default function PremiumGuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, isInCart } = useCart();
  
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Find the guide in our catalog
  const guide = guides.find(g => g.slug === slug);

  useEffect(() => {
    if (!guide) return;
    
    // Check localStorage to see if this guide was purchased and token is still active
    try {
      const savedPurchases = localStorage.getItem('purchased_guides');
      if (savedPurchases) {
        const purchases = JSON.parse(savedPurchases);
        const info = purchases[guide.id];
        if (info && info.purchased) {
          // Verify if token is still valid (not expired)
          if (new Date() < new Date(info.expiresAt)) {
            setPurchaseInfo(info);
          } else {
            // Remove expired token
            delete purchases[guide.id];
            localStorage.setItem('purchased_guides', JSON.stringify(purchases));
          }
        }
      }
    } catch (e) {
      console.error('Error loading purchases from localStorage:', e);
    }
  }, [guide]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center justify-center p-6 pt-32">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight">Guide Not Found</h1>
          <p className="text-slate-455 mb-8 text-sm leading-relaxed">
            The guide you are looking for does not exist or has been moved.
          </p>
          <Link to="/premium-guides" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-colors shadow-lg">
            <ArrowLeft size={14} className="mr-2" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (!purchaseInfo?.downloadUrl) return;
    setDownloading(true);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = purchaseInfo.downloadUrl;
    link.setAttribute('download', `${guide.slug}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setDownloading(false), 2000);
  };

  const getRemainingTime = () => {
    if (!purchaseInfo?.expiresAt) return '';
    const diffMs = new Date(purchaseInfo.expiresAt).getTime() - Date.now();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    if (diffHours <= 0) return 'Expired';
    return `${diffHours} hours remaining`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 pb-24 pt-32 relative overflow-x-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-20">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Navigation */}
        <Link to="/premium-guides" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-black uppercase tracking-widest text-xs mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Premium Guides
        </Link>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image & Call to Action (Buy/Download) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] w-full relative bg-slate-800">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700">
                    {guide.category}
                  </span>
                  {guide.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-1">
                      <Sparkles size={10} /> Bestseller
                    </span>
                  )}
                </div>
              </div>

              {/* Transaction Box */}
              <div className="p-8 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
                
                {purchaseInfo ? (
                  /* Download Interface */
                  <div className="space-y-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck size={12} /> Purchased & Verified
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Instant PDF Access</h4>
                      <p className="text-slate-450 text-[11px] font-medium uppercase tracking-wider text-emerald-500/80">
                        {getRemainingTime()}
                      </p>
                    </div>

                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-550 disabled:bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/10"
                    >
                      {downloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={14} />
                          <span>Download PDF Guide</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                      Token allows maximum of 3 downloads. Save your file locally.
                    </p>
                  </div>
                ) : (
                  /* Purchase Interface */
                  <div className="space-y-6">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="block text-[9px] font-black text-slate-550 uppercase tracking-widest mb-0.5">Price</span>
                        <span className="text-3xl font-black text-white">{guide.priceDisplay}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                        <Lock size={12} /> One-time Buy
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(guide)}
                      disabled={isInCart(guide.id)}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2.5 shadow-lg ${
                        isInCart(guide.id)
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/15'
                      }`}
                    >
                      {isInCart(guide.id) ? (
                        <>
                          <CheckCircle2 size={14} />
                          <span>Already in Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={14} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[9px] text-slate-550 font-black uppercase tracking-wider">
                      <ShieldCheck size={12} className="text-blue-500" /> Secure Payment via Stripe
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Details */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header Details */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                  {guide.category}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <FileText size={14} /> Digital PDF Guide
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight mb-6">
                {guide.title}
              </h1>
              <p className="text-lg text-slate-350 leading-relaxed font-light">
                {guide.longDescription}
              </p>
            </div>

            {/* Inclusions */}
            <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-3xl">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">What's Included in This Protocol</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guide.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience & Disclaimer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-3">Who It's Engineered For</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {guide.audience}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-slate-550 uppercase tracking-widest mb-3">Disclaimer & Terms</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-medium">
                  {guide.disclaimer}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
