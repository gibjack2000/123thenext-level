import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, Download, Mail, ShieldCheck, Sparkles, Loader2, FileText, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export type GateMode = 'free' | 'premium';

export interface GuideGateItem {
  id?: string;
  title: string;
  fileUrl?: string;
  fileName?: string;
  checkoutUrl?: string;
  price?: string;
  priceDisplay?: string;
  type?: GateMode;
  [key: string]: any;
}

export interface GateModalRequest {
  item: GuideGateItem;
  mode?: GateMode;
}

export type DownloadItem = GuideGateItem;

interface DownloadGateContextType {
  triggerGatedDownload: (item: GuideGateItem) => void;
  triggerGuideAction: (guide: GuideGateItem, mode?: GateMode) => void;
  openGateModal: (request: GateModalRequest) => void;
  isOpen: boolean;
  closeModal: () => void;
  currentRequest: GateModalRequest | null;
  currentDownload: GuideGateItem | null;
}

const DownloadGateContext = createContext<DownloadGateContextType | undefined>(undefined);

/**
 * Direct file download trigger via dynamically created anchor
 */
export function executeDirectDownload(fileUrl: string, fileName?: string) {
  try {
    const link = document.createElement('a');
    link.href = fileUrl;
    const name = fileName || fileUrl.split('/').pop()?.split('?')[0] || '123TheNextLevel-Guide.pdf';
    link.download = name;
    link.setAttribute('download', name);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 200);
  } catch (err) {
    console.error('[DownloadGate] Error triggering direct download:', err);
    window.open(fileUrl, '_blank');
  }
}

/**
 * Check whether user has already subscribed anywhere during this session or prior visits
 */
export function isUserSubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const email = localStorage.getItem('subscribed_email');
    return Boolean(email && email.includes('@'));
  } catch {
    return false;
  }
}

/**
 * Helper to proceed to checkout route safely
 */
export function proceedToCheckout(checkoutUrl?: string, guideId?: string) {
  const target = checkoutUrl || (guideId ? `/checkout?product=${guideId}` : '/checkout');
  window.location.href = target;
}

/**
 * Universal Download & Guide Gate Provider
 */
export const DownloadGateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<GateModalRequest | null>(null);

  const openGateModal = (request: GateModalRequest) => {
    setCurrentRequest(request);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentRequest(null);
  };

  const triggerGuideAction = (guide: GuideGateItem, explicitMode?: GateMode) => {
    const mode: GateMode = explicitMode || guide.type || (guide.checkoutUrl ? 'premium' : 'free');

    // 1. If already subscribed, bypass modal and immediately proceed
    if (isUserSubscribed()) {
      if (mode === 'free' && guide.fileUrl) {
        executeDirectDownload(guide.fileUrl, guide.fileName);
      } else if (mode === 'premium') {
        proceedToCheckout(guide.checkoutUrl, guide.id);
      } else if (guide.fileUrl) {
        executeDirectDownload(guide.fileUrl, guide.fileName);
      }
      return;
    }

    // 2. Otherwise open modal interceptor
    openGateModal({ item: guide, mode });
  };

  const triggerGatedDownload = (item: GuideGateItem) => {
    triggerGuideAction(item, item.type || 'free');
  };

  // Expose global window helper for easy access outside React tree if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nextLevelTriggerGatedDownload = triggerGatedDownload;
      (window as any).nextLevelTriggerGuideAction = triggerGuideAction;
    }
  }, []);

  return (
    <DownloadGateContext.Provider
      value={{
        triggerGatedDownload,
        triggerGuideAction,
        openGateModal,
        isOpen,
        closeModal,
        currentRequest,
        currentDownload: currentRequest ? currentRequest.item : null,
      }}
    >
      {children}
      <DownloadGateModal />
    </DownloadGateContext.Provider>
  );
};

/**
 * Hook to consume the universal download and guide gate
 */
export function useDownloadGate() {
  const context = useContext(DownloadGateContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      triggerGatedDownload: (item: GuideGateItem) => {
        if (item.fileUrl) executeDirectDownload(item.fileUrl, item.fileName);
      },
      triggerGuideAction: (guide: GuideGateItem, mode: GateMode = 'free') => {
        if (mode === 'free' && guide.fileUrl) {
          executeDirectDownload(guide.fileUrl, guide.fileName);
        } else {
          proceedToCheckout(guide.checkoutUrl, guide.id);
        }
      },
      openGateModal: () => {},
      isOpen: false,
      closeModal: () => {},
      currentRequest: null,
      currentDownload: null,
    };
  }
  return context;
}

/**
 * The Modal Interceptor UI Component
 */
export const DownloadGateModal: React.FC = () => {
  const context = useContext(DownloadGateContext);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  if (!context || !context.isOpen || !context.currentRequest) {
    return null;
  }

  const { currentRequest, closeModal } = context;
  const guide = currentRequest.item;
  const mode: GateMode = currentRequest.mode || guide.type || 'free';
  const guideTitle = guide.title || 'Clinical Guide';
  const priceDisplay = guide.price || guide.priceDisplay || '£29.00';

  const isFree = mode === 'free';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanFirstName = firstName.trim();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const guideId = guide.id || (guide.title ? guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '_') : 'guide');
    const source = isFree ? `free_pdf_${guideId}` : `premium_pdf_${guideId}`;

    try {
      // Sync to MailerLite (Group 201226349911737620) & Supabase Leads
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          firstName: cleanFirstName,
          source: source,
          pdfTitle: guideTitle,
          downloadName: guide.fileName || guide.fileUrl || guideId,
          price: priceDisplay,
          groupId: '201226349911737620',
        }),
      });
    } catch (err) {
      console.warn('[DownloadGate] Subscription non-blocking error:', err);
    }

    // Persist email in localStorage so user is never prompted again anywhere on site
    try {
      localStorage.setItem('subscribed_email', cleanEmail);
    } catch (e) {}

    setSuccess(true);

    if (isFree) {
      // Free guide: automatically trigger file download
      if (guide.fileUrl) {
        executeDirectDownload(guide.fileUrl, guide.fileName);
      }
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(false);
        setEmail('');
        setFirstName('');
        closeModal();
      }, 600);
    } else {
      // Paid guide: forward user directly to guide.checkoutUrl
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(false);
        setEmail('');
        setFirstName('');
        closeModal();
        proceedToCheckout(guide.checkoutUrl, guide.id);
      }, 500);
    }
  };

  const handleSkip = () => {
    // Optional skip path: completes respective action without subscribing
    if (isFree) {
      if (guide.fileUrl) {
        executeDirectDownload(guide.fileUrl, guide.fileName);
      }
    } else {
      proceedToCheckout(guide.checkoutUrl, guide.id);
    }
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        {/* Decorative Top Accent Glow */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
            isFree
              ? 'from-emerald-500 via-cyan-500 to-blue-500'
              : 'from-amber-500 via-orange-500 to-cyan-500'
          }`}
        />
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            isFree ? 'bg-cyan-500/10' : 'bg-amber-500/10'
          }`}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-4">
          {isFree ? <FileText size={13} /> : <Lock size={13} className="text-amber-400" />}
          <span>
            {isFree ? 'Clinical Telemetry PDF • $0.00 Free' : `Digital Master Guide • ${priceDisplay}`}
          </span>
        </div>

        {/* Dynamic Headline */}
        <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
          {isFree ? 'Instant Download Access' : `Access ${guideTitle}`}
        </h3>

        {/* Dynamic Subheadline */}
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          {isFree ? (
            <>
              Enter your email to receive your free copy of{' '}
              <strong className="text-cyan-300 font-semibold">{guideTitle}</strong> and join our weekly biomarker updates.
            </>
          ) : (
            <>
              Enter your email to secure your customer profile and proceed to checkout (
              <strong className="text-amber-300 font-semibold">{priceDisplay}</strong>).
            </>
          )}
        </p>

        {/* Form or Success State */}
        {success ? (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2 animate-fade-in">
            <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
            <p className="text-sm font-bold text-white">
              {isFree ? 'Download Dispatched!' : 'Profile Secured!'}
            </p>
            <p className="text-xs text-emerald-400/90 font-medium">
              {isFree
                ? 'Your file is downloading now. Check your inbox for updates.'
                : 'Redirecting to secure Stripe checkout...'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1">
              <label htmlFor="gate-firstname" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                First Name <span className="text-slate-500 text-[10px] font-normal lowercase">(optional)</span>
              </label>
              <input
                id="gate-firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Alex"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="gate-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={17} />
                <input
                  id="gate-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition"
                />
              </div>
              {errorMessage && (
                <p className="text-xs text-rose-400 mt-1">{errorMessage}</p>
              )}
            </div>

            {/* Dynamic CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-5 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 ${
                isFree
                  ? 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 shadow-cyan-500/20'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/25'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isFree ? 'Preparing Download...' : 'Connecting to Checkout...'}</span>
                </>
              ) : isFree ? (
                <>
                  <Download size={16} />
                  <span>Download Free Guide</span>
                </>
              ) : (
                <>
                  <span>Continue to Checkout</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Secondary Low-Contrast Skip Link */}
            <div className="text-center pt-1.5">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-slate-500 hover:text-slate-400 underline font-medium transition-colors cursor-pointer"
              >
                {isFree ? 'Download without subscribing →' : 'Proceed to checkout without subscribing →'}
              </button>
            </div>

            {/* Privacy Microcopy */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono text-center pt-2 border-t border-slate-800/60">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>100% spam-free · Unsubscribe anytime</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

/**
 * Reusable helper button that automatically opens the download gate or directly downloads if subscribed
 */
export const GatedDownloadButton: React.FC<{
  fileUrl: string;
  fileName?: string;
  title: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ fileUrl, fileName, title, className = '', children, onClick }) => {
  const { triggerGatedDownload } = useDownloadGate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    triggerGatedDownload({ fileUrl, fileName, title, type: 'free' });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default DownloadGateModal;
