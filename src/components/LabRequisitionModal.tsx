import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, ExternalLink, Mail, ShieldCheck, Stethoscope, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export interface LabRequisitionItem {
  destinationUrl: string;
  testName: string;
}

interface LabRequisitionContextType {
  triggerLabRequisition: (item: LabRequisitionItem) => void;
  isOpen: boolean;
  closeModal: () => void;
  currentRequisition: LabRequisitionItem | null;
}

const LabRequisitionContext = createContext<LabRequisitionContextType | undefined>(undefined);

/**
 * Check whether user has already subscribed anywhere during this session or prior visits
 */
function isUserSubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const email = localStorage.getItem('subscribed_email');
    return !!(email && email.includes('@'));
  } catch {
    return false;
  }
}

/**
 * Open external lab requisition link safely
 */
function openDestinationUrl(url: string) {
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (err) {
    console.error('[LabRequisition] Failed to open lab destination URL:', err);
    window.location.href = url;
  }
}

/**
 * Lab Requisition Intercept Provider
 */
export const LabRequisitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRequisition, setCurrentRequisition] = useState<LabRequisitionItem | null>(null);

  const triggerLabRequisition = (item: LabRequisitionItem) => {
    // 1. If already subscribed, bypass modal and immediately open destination in a new tab
    if (isUserSubscribed()) {
      openDestinationUrl(item.destinationUrl);
      return;
    }

    // 2. Otherwise open intercept modal
    setCurrentRequisition(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentRequisition(null);
  };

  // Expose global window helper for easy access outside React tree if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nextLevelTriggerLabRequisition = triggerLabRequisition;
    }
  }, []);

  return (
    <LabRequisitionContext.Provider
      value={{
        triggerLabRequisition,
        isOpen,
        closeModal,
        currentRequisition,
      }}
    >
      {children}
      <LabRequisitionModal />
    </LabRequisitionContext.Provider>
  );
};

/**
 * Hook to consume the lab requisition intercept
 */
export function useLabRequisition() {
  const context = useContext(LabRequisitionContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      triggerLabRequisition: (item: LabRequisitionItem) => {
        openDestinationUrl(item.destinationUrl);
      },
      isOpen: false,
      closeModal: () => {},
      currentRequisition: null,
    };
  }
  return context;
}

/**
 * The Modal Interceptor UI Component
 */
export const LabRequisitionModal: React.FC = () => {
  const context = useContext(LabRequisitionContext);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  if (!context || !context.isOpen || !context.currentRequisition) {
    return null;
  }

  const { currentRequisition, closeModal } = context;
  const testName = currentRequisition.testName || 'Clinical Diagnostic Lab Test';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // 1. Persist email so user is never prompted again anywhere on site
    try {
      localStorage.setItem('subscribed_email', cleanEmail);
    } catch (e) {}

    // 2. Fire-and-forget subscription request to MailerLite (Group 201226349911737620) & Supabase Leads
    try {
      fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          firstName: '',
          source: 'clinical_test_requisition',
          testName: testName,
          groupId: '201226349911737620',
        }),
        keepalive: true,
      }).catch((err) => {
        console.warn('[LabRequisition] Lead sync non-blocking error:', err);
      });
    } catch (err) {
      console.warn('[LabRequisition] Network error:', err);
    }

    setSuccess(true);

    // 3. Open destination URL immediately in new tab
    openDestinationUrl(currentRequisition.destinationUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(false);
      setEmail('');
      closeModal();
    }, 400);
  };

  const handleSkip = () => {
    // Skip link: open destination URL directly without subscribing
    openDestinationUrl(currentRequisition.destinationUrl);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-cyan-500" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Clinical Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono font-medium mb-3">
          <Stethoscope size={13} />
          <span>Clinical Diagnostic Requisition</span>
        </div>

        {/* Header */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
          Preparing for Your Clinical Diagnostic Requisition
        </h3>

        {/* Subhead */}
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Enter your email to receive your Pre-Draw Fasting Protocol &amp; Printable GP Consultation Template before visiting the patient center for{' '}
          <strong className="text-rose-300 font-semibold">{testName}</strong>.
        </p>

        {/* Perks List */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-200 font-medium leading-tight">
              12-hour metabolic fasting &amp; supplement washout guide
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-200 font-medium leading-tight">
              Printable 2-Page GP Consultation Template V2
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-200 font-medium leading-tight">
              Post-panel biomarker interpretation roadmap
            </span>
          </div>
        </div>

        {/* Form */}
        {success ? (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2 animate-fade-in">
            <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
            <p className="text-sm font-bold text-white">Opening Lab Partner...</p>
            <p className="text-xs text-emerald-400/90 font-medium">
              Your preparation protocol has been dispatched to your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="requisition-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={17} />
                <input
                  id="requisition-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition"
                />
              </div>
              {errorMessage && (
                <p className="text-xs text-rose-400 mt-1">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:to-pink-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-rose-500/25 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Connecting to Lab Partner...</span>
                </>
              ) : (
                <>
                  <span>Send Preparation Protocol &amp; Proceed to Lab</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            {/* Optional Skip Link */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-slate-400 hover:text-slate-300 underline font-medium transition-colors cursor-pointer"
              >
                Continue directly to lab partner without guide →
              </button>
            </div>

            {/* Privacy Microcopy */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono text-center pt-2 border-t border-slate-800/60">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>100% spam-free · Clinical preparation telemetry only</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LabRequisitionModal;

