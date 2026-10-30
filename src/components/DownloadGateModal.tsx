import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, Download, Mail, ShieldCheck, Sparkles, Loader2, FileText, CheckCircle2 } from 'lucide-react';

export interface DownloadItem {
  fileUrl: string;
  fileName?: string;
  title: string;
}

interface DownloadGateContextType {
  triggerGatedDownload: (item: DownloadItem) => void;
  isOpen: boolean;
  closeModal: () => void;
  currentDownload: DownloadItem | null;
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
    return !!(email && email.includes('@'));
  } catch {
    return false;
  }
}

/**
 * Universal Download Gate Provider
 */
export const DownloadGateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDownload, setCurrentDownload] = useState<DownloadItem | null>(null);

  const triggerGatedDownload = (item: DownloadItem) => {
    // 1. If already subscribed, bypass modal and immediately trigger file download
    if (isUserSubscribed()) {
      executeDirectDownload(item.fileUrl, item.fileName);
      return;
    }

    // 2. Otherwise open modal interceptor
    setCurrentDownload(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentDownload(null);
  };

  // Expose global window helper for easy access outside React tree if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nextLevelTriggerGatedDownload = triggerGatedDownload;
    }
  }, []);

  return (
    <DownloadGateContext.Provider
      value={{
        triggerGatedDownload,
        isOpen,
        closeModal,
        currentDownload,
      }}
    >
      {children}
      <DownloadGateModal />
    </DownloadGateContext.Provider>
  );
};

/**
 * Hook to consume the universal download gate
 */
export function useDownloadGate() {
  const context = useContext(DownloadGateContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      triggerGatedDownload: (item: DownloadItem) => {
        if (isUserSubscribed()) {
          executeDirectDownload(item.fileUrl, item.fileName);
        } else {
          executeDirectDownload(item.fileUrl, item.fileName);
        }
      },
      isOpen: false,
      closeModal: () => {},
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
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  if (!context || !context.isOpen || !context.currentDownload) {
    return null;
  }

  const { currentDownload, closeModal } = context;
  const pdfTitle = currentDownload.title || 'Clinical Guide';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // 1. Sync to MailerLite (Group 201226349911737620) & Supabase Leads
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          firstName: '',
          source: 'pdf_download_gate',
          pdfTitle: pdfTitle,
          downloadName: currentDownload.fileName || currentDownload.fileUrl,
          groupId: '201226349911737620',
        }),
      });
    } catch (err) {
      console.warn('[DownloadGate] Subscription request non-blocking error:', err);
    }

    // 2. Persist email so user is never prompted again anywhere on site
    try {
      localStorage.setItem('subscribed_email', cleanEmail);
    } catch (e) {}

    setSuccess(true);

    // 3. Trigger immediate file download
    executeDirectDownload(currentDownload.fileUrl, currentDownload.fileName);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(false);
      setEmail('');
      closeModal();
    }, 600);
  };

  const handleSkip = () => {
    // Optional skip path: immediately trigger download without subscribing
    executeDirectDownload(currentDownload.fileUrl, currentDownload.fileName);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

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
          <FileText size={13} />
          <span>Clinical Telemetry PDF</span>
        </div>

        {/* Headline */}
        <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
          Instant Download Access
        </h3>

        {/* Subheadline with PDF Title */}
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Enter your email to receive your copy of{' '}
          <strong className="text-cyan-300 font-semibold">{pdfTitle}</strong> and get our weekly biomarker updates.
        </p>

        {/* Form */}
        {success ? (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2 animate-fade-in">
            <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
            <p className="text-sm font-bold text-white">Download Dispatched!</p>
            <p className="text-xs text-emerald-400/90 font-medium">
              Your file is downloading now. Check your inbox for updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Preparing Download...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Download Now</span>
                </>
              )}
            </button>

            {/* Optional Skip Link */}
            <div className="text-center pt-1.5">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-slate-500 hover:text-slate-400 underline font-medium transition-colors cursor-pointer"
              >
                Download without subscribing
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
    triggerGatedDownload({ fileUrl, fileName, title });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default DownloadGateModal;
