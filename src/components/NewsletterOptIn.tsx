import React, { useState } from 'react';
import { Mail, User, ShieldCheck, Sparkles, Loader2, CheckCircle2, AlertCircle, ArrowRight, Download } from 'lucide-react';

export interface NewsletterOptInProps {
  source?: string;
  variant?: 'card' | 'footer' | 'inline' | 'compact';
  className?: string;
  onSuccess?: () => void;
}

export const NewsletterOptIn: React.FC<NewsletterOptInProps> = ({
  source = 'newsletter_optin',
  variant = 'card',
  className = '',
  onSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          source: source,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus('success');
        try {
          localStorage.setItem('subscribed_email', email.trim().toLowerCase());
        } catch (e) {}
        if (onSuccess) onSuccess();
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to subscribe at this moment. Please try again.');
      }
    } catch (err: any) {
      console.error('[NewsletterOptIn] Error:', err);
      setStatus('error');
      setErrorMessage('Unable to subscribe at this moment. Please try again.');
    }
  };

  // 1. COMPACT / FOOTER VARIANT
  if (variant === 'footer') {
    return (
      <div className={`w-full ${className}`}>
        {status === 'success' ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-emerald-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">✓ You're in! Check your inbox for your Blueprint download link.</p>
                <p className="text-xs text-emerald-400/90 mt-0.5 font-medium">Free Idiot's Guide & Longevity Blueprint dispatched.</p>
              </div>
            </div>
            <a
              href="/docs/the-next-level-lifespan.pdf"
              download="the-next-level-lifespan.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <Download size={13} />
              <span>Instant Download</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:max-w-[200px]">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <User size={14} />
                </span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name (optional)"
                  disabled={status === 'loading'}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl py-3 pl-10 pr-3 text-xs font-medium placeholder-slate-500 outline-none transition-all disabled:opacity-50"
                />
              </div>

              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  disabled={status === 'loading'}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl py-3 pl-10 pr-3 text-xs font-medium placeholder-slate-500 outline-none transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] border border-cyan-400/30 hover:border-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {status === 'loading' ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-cyan-300" />
                    <span>Connecting to protocol...</span>
                  </span>
                ) : (
                  <span>Get Instant Access</span>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-rose-400 text-xs font-medium pt-1">
                <AlertCircle size={13} className="shrink-0" />
                <span>{errorMessage || 'Unable to subscribe at this moment. Please try again.'}</span>
              </div>
            )}
          </form>
        )}
      </div>
    );
  }

  // 2. FULL CLINICAL CARD & INLINE CALLOUT VARIANT (Default)
  return (
    <div
      className={`relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-cyan-500/25 p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl overflow-hidden text-left ${className}`}
    >
      {/* High-tech ambient corner accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono uppercase tracking-wider">
          <Sparkles size={12} className="text-cyan-400 animate-pulse" />
          <span>Clinical Telemetry & Longevity Dispatch</span>
        </div>

        {/* Headlines */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
            Join the{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              Proactive Longevity Protocol
            </span>
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            Get the Free Idiot's Guide to Biological Age, High-Level Blueprint PDF, and weekly biomarker telemetry insights.
          </p>
        </div>

        {/* State Handler */}
        {status === 'success' ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 sm:p-7 text-emerald-200 space-y-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400">
                <CheckCircle2 size={22} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-base font-bold text-white">
                  ✓ You're in! Check your inbox for your Blueprint download link.
                </h4>
                <p className="text-xs sm:text-sm text-emerald-300/90 font-medium">
                  We've registered your email to the 123TheNextLevel Main Leads registry.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="/docs/the-next-level-lifespan.pdf"
                download="the-next-level-lifespan.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <Download size={14} />
                <span>Download Your Free Blueprint Now</span>
              </a>
              <span className="text-[11px] text-slate-400 font-mono">PDF format • Instant local download</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* First Name Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                  First Name <span className="text-slate-500 text-[10px]">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <User size={15} />
                  </span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Alexander"
                    disabled={status === 'loading'}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-600 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email Address Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Mail size={15} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    disabled={status === 'loading'}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-600 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMessage || 'Unable to subscribe at this moment. Please try again.'}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-slate-950" />
                    <span>Connecting to protocol...</span>
                  </>
                ) : (
                  <>
                    <span>Get Instant Access</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Zero Spam • Instant PDF Delivery • 1-Click Unsubscribe</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterOptIn;

