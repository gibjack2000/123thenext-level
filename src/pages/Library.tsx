import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Lock, ShieldCheck, Download, Sparkles, BookOpen, ArrowDown, FileText, Check, ArrowRight } from 'lucide-react';
import { DigitalGuides } from '../components/DigitalGuides';
import { COMPLIMENTARY_FREE_GUIDES, PREMIUM_MASTER_GUIDES } from '../config/guides';
import NewsletterOptIn from '../components/NewsletterOptIn';
import { useDownloadGate } from '../components/DownloadGateModal';

interface PaidDownloadState {
  status: 'idle' | 'verifying' | 'verified' | 'error';
  title?: string;
  downloadUrl?: string;
  errorMessage?: string;
}

export default function LibraryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { triggerGatedDownload } = useDownloadGate();
  const [freeDownloadTriggered, setFreeDownloadTriggered] = useState(false);
  const [paidDownload, setPaidDownload] = useState<PaidDownloadState>({ status: 'idle' });
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Free PDFs & Master Guides Library | 123TheNextLevel";

    // 1. Check for Free "Idiot's Guide" auto-download from onboarding lead capture
    const isFreeDownload = searchParams.get('download') === 'idiots-guide' || searchParams.get('download') === 'true';
    if (isFreeDownload && !freeDownloadTriggered) {
      setFreeDownloadTriggered(true);
      const timer = setTimeout(() => {
        triggerDirectDownload(
          '/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf',
          'idiots-guide-to-the-next-level-lifespan.pdf',
          "An Idiot's Guide to the Next Level Lifespan"
        );
      }, 800);
      return () => clearTimeout(timer);
    }

    // 2. Check for Paid Master Guide return from Stripe (success=true, session_id, guideId)
    const isPaymentSuccess = searchParams.get('success') === 'true';
    const sessionId = searchParams.get('session_id');
    const guideId = searchParams.get('guideId') || searchParams.get('product') || '';

    if (isPaymentSuccess && sessionId && paidDownload.status === 'idle') {
      setPaidDownload({ status: 'verifying' });

      const verifyAndDownload = async () => {
        try {
          const response = await fetch('/api/get-presigned-guide', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId, guideId })
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || 'Payment verification failed');
          }

          const data = await response.json();
          if (data.downloadUrl) {
            setPaidDownload({
              status: 'verified',
              title: data.title || 'Digital Master Guide',
              downloadUrl: data.downloadUrl
            });

            // Automatically trigger PDF download
            const link = document.createElement('a');
            link.href = data.downloadUrl;
            link.setAttribute('download', data.filename || `${guideId || 'guide'}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            throw new Error('No download URL returned from server');
          }
        } catch (err: any) {
          console.error('[Library] Payment verification error:', err);
          setPaidDownload({
            status: 'error',
            errorMessage: err.message || 'Unable to verify payment with Stripe.'
          });
        }
      };

      verifyAndDownload();
    }

    // 3. Anchor & Hash scrolling navigation
    if (location.hash === '#premium-guides' || location.hash === '#premium') {
      const el = document.getElementById('premium-guides');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    } else if (location.hash === '#free-pdfs' || location.pathname === '/free-pdfs') {
      const el = document.getElementById('free-pdfs');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [searchParams, location, freeDownloadTriggered, paidDownload.status]);

  const triggerDirectDownload = (fileUrl: string, fileName: string, title: string) => {
    triggerGatedDownload({
      fileUrl,
      fileName,
      title,
    });
    setDownloadToast(title);
    setTimeout(() => {
      setDownloadToast(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30">

      {/* Instant Direct Download Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 border-2 border-emerald-500/80 p-4 rounded-2xl shadow-2xl shadow-emerald-500/20 animate-bounce flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} className="text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-emerald-300 uppercase tracking-wider">
              ✓ Direct $0 Download Started!
            </p>
            <p className="text-xs text-slate-300 truncate">
              {downloadToast} has been sent to your downloads folder.
            </p>
          </div>
        </div>
      )}

      {/* 1. Payment Verification & Auto-Download Notification Bar */}
      {paidDownload.status === 'verifying' && (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-b border-blue-500/30 py-4 px-4 text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-cyan-300">
            <span className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span>Verifying Stripe payment authorization & unlocking Cloudflare R2 vault...</span>
          </div>
        </div>
      )}

      {paidDownload.status === 'verified' && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/50 py-4 px-4 text-center shadow-xl animate-fadeIn">
          <div className="max-w-4xl mx-auto space-y-1">
            <p className="text-sm sm:text-base font-black text-emerald-300 flex items-center justify-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>🎉 Payment verified! Your download has started.</span>
            </p>
            <p className="text-xs text-slate-300">
              {paidDownload.title ? `Purchased: ${paidDownload.title}` : 'Your digital PDF guide is downloading.'} •{' '}
              {paidDownload.downloadUrl && (
                <a 
                  href={paidDownload.downloadUrl} 
                  download 
                  className="underline text-emerald-400 hover:text-emerald-300 font-bold ml-1 inline-flex items-center gap-1"
                >
                  <Download size={12} />
                  <span>Click here if your download didn't start automatically</span>
                </a>
              )}
            </p>
          </div>
        </div>
      )}

      {paidDownload.status === 'error' && (
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-b border-rose-500/40 py-3.5 px-4 text-center">
          <p className="text-xs sm:text-sm font-bold text-rose-300">
            ⚠️ {paidDownload.errorMessage || 'Could not verify download authorization with Stripe.'}
          </p>
        </div>
      )}

      {/* Free Guide Download Notification */}
      {freeDownloadTriggered && paidDownload.status === 'idle' && (
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-b border-cyan-500/30 py-3.5 px-4 text-center">
          <p className="text-xs sm:text-sm font-bold text-cyan-300 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>✓ Direct Access Granted — Your Idiot’s Guide is downloading now. Access all manuals below:</span>
          </p>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest">
            🏛️ Sovereign Clinical Registry &amp; Vault
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            The Next Level Library
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your open-access directory to cross the bridge from biological speculation to molecular certainty. Get our 2 complimentary open-access clinical documents with instant $0 direct download, or unlock all 9 specialized Master Guides stored in our private Cloudflare R2 vault.
          </p>

          {/* Quick-Jump Section Navigator */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#free-pdfs"
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>📁 2 Free Open-Access PDFs ($0.00)</span>
              <ArrowDown size={14} />
            </a>
            <a
              href="#premium-guides"
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>⚡ 9 Premium Master Guides (£29 / $29)</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* SECTION 1: COMPLIMENTARY TRANSLATION & BASELINE GUIDES ($0.00) */}
      {/* ============================================================== */}
      <section id="free-pdfs" className="max-w-6xl mx-auto px-6 pt-16 pb-16 scroll-mt-24">
        <div className="space-y-4 text-center sm:text-left mb-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full">
              🎁 Section 1: Complimentary Translation &amp; Baseline Guides
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
              <span>100% Free PDFs — $0.00</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
              <span>No Paywall • Direct Download</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Complimentary Translation &amp; Baseline Guides (100% Free)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Download our two foundational clinical manuals immediately at zero cost ($0.00). Save the PDFs directly to your device or launch the interactive online workbook to co-evaluate your telemetry with your doctor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: An Idiot's Guide to the Next Level Lifespan */}
          <div className="group p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 flex flex-col justify-between space-y-8 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/5 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="relative max-w-[280px] mx-auto w-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500/25 to-indigo-500/25 blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
                <img
                  src="/covers/the-next-level-lifespan-cover.png"
                  alt="An Idiot's Guide to the Next Level Lifespan"
                  className="relative w-full h-auto max-h-[380px] object-contain rounded-2xl border border-slate-800/90 shadow-2xl bg-slate-950"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950/90 border border-cyan-500/40 text-cyan-300 shadow-lg backdrop-blur-md">
                    $0.00 FREE
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                    Everyday Translator (100% Free • $0)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                    $0.00
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  An Idiot's Guide to the Next Level Lifespan
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  A ruthlessly honest, 5-page translator designed to decode our complex molecular science, explain why living longer is a curse if you are frail, and give you your immediate, zero-cost daily habits.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-left">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What's Inside:</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Simple post-meal hacks &amp; glucose stabilization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Circadian breathing rules &amp; autonomic tone</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Epigenetics &amp; age-reversal made simple</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>Zero-cost immediate daily longevity habits checklist</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 relative z-10 space-y-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  triggerDirectDownload(
                    '/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf?v=2026-revised',
                    'idiots-guide-to-the-next-level-lifespan.pdf',
                    "An Idiot's Guide to the Next Level Lifespan"
                  );
                }}
                className="w-full py-4 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 shadow-lg cursor-pointer bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Download size={16} />
                <span>Download Free Guide (PDF)</span>
                <span>➔</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono text-center">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>Instant Direct PDF • Zero Cost ($0.00) • Unrestricted Open-Access</span>
              </div>
            </div>
          </div>

          {/* Card 2: The Clinician Co-Pilot: From Guessing to Knowing */}
          <div className="group p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 hover:border-amber-500/60 flex flex-col justify-between space-y-8 shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="relative max-w-[280px] mx-auto w-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-500/25 to-orange-500/25 blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
                <img
                  src="/assets/images/shop/gp_consultation_cover.png"
                  alt="The Clinician Co-Pilot: From Guessing to Knowing"
                  className="relative w-full h-auto max-h-[380px] object-contain rounded-2xl border border-slate-800/90 shadow-2xl bg-slate-950"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950/90 border border-amber-500/40 text-amber-300 shadow-lg backdrop-blur-md">
                    $0.00 FREE
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider bg-amber-500/10 text-amber-400 border-amber-500/20">
                    Clinician Co-Pilot Suite (100% Free • $0)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                    $0.00
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  The Clinician Co-Pilot: From Guessing to Knowing
                </h3>

                <p className="text-xs font-semibold text-amber-400/90 tracking-wide">
                  Clinician Co-Pilot Workbook &amp; GP Consultation Partnership
                </p>
                
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Use our free Clinician Co-Pilot Workbook to log your 14-day vitals, select your regional blood panels (ApoB, HbA1c, hs-CRP), and co-evaluate your results with your GP.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-left">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What's Inside:</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>14-day baseline vital telemetry tracking log</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Regional blood panel checklist (ApoB, HbA1c, hs-CRP)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Direct GP consultation partnership discussion script</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Printable 4-page clinical workbook &amp; digital inputs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dual CTAs for Card 2 */}
            <div className="pt-4 border-t border-slate-800/80 relative z-10 space-y-2.5">
              {/* Primary Button */}
              <Link
                to="/clinician-copilot"
                className="w-full py-4 px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 shadow-lg cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Open Clinician Co-Pilot ➔</span>
              </Link>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  triggerDirectDownload(
                    '/assets/docs/clinical-baseline-consultation-workbook.pdf',
                    'clinical-baseline-consultation-workbook.pdf',
                    "The Clinician Co-Pilot Workbook"
                  );
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/30 text-cyan-300 hover:text-white cursor-pointer"
              >
                <Download size={14} />
                <span>📥 Download Blank PDF ($0)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono text-center">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>Instant Direct PDF • Zero Cost ($0.00) • Unrestricted Open-Access</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Newsletter Opt-In Callout: Free Idiot's Guide & Longevity Blueprint Delivery */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <NewsletterOptIn source="library_inline_callout" variant="card" />
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: ALL 9 PREMIUM MASTER GUIDES (PAID MASTER SERIES)    */}
      {/* ============================================================== */}
      <section id="premium-guides" className="max-w-6xl mx-auto px-6 pt-16 pb-16 border-t border-slate-900 scroll-mt-24">
        <div className="space-y-4 text-center sm:text-left mb-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
              ⚡ Section 2: Premium Digital Master Guides (All 9 Guides Intact)
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-full">
              <span>Paid Master Series — £29 / $29</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
              <Lock size={10} className="text-amber-400" />
              <span>Private R2 Storage Vault</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Digital Master Guides Vault
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed pt-1">
                All 9 comprehensive geroscience execution manuals locked behind Stripe checkout. Direct presigned delivery from Cloudflare R2 edge servers immediately upon purchase verification.
              </p>
            </div>
            
            <Link
              to="/premium-guides"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto"
            >
              <span>View Full Catalog Page</span>
              <span>➔</span>
            </Link>
          </div>
        </div>

        {/* Embedded DigitalGuides Component Rendering ALL 9 Master Guides Intact */}
        <DigitalGuides showVaultBanner={true} />
      </section>

      {/* E-Commerce Sovereign Store Callout Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-black uppercase tracking-widest">
              <span>🛒 Sovereign Hardware &amp; Clinical Fuel</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight uppercase leading-tight">
              Procure Your Complete <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Health Stack</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Pair your clinical knowledge with direct-to-consumer molecular fuels and diagnostic hardware. Browse our verified Amazon Associate catalog and clinical partner test kits mapped across US 🇺🇸, UK 🇬🇧, and Spain 🇪🇸.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                💊 NAD+ Sirtuin Stacks
              </span>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                📊 Continuous Glucose Monitors (CGM)
              </span>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                🩺 3-Lead Digital ECG Stethoscopes
              </span>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                🩸 Multi-Omic Blood Panels
              </span>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full lg:w-auto flex flex-col gap-3">
            <button
              onClick={() => navigate('/store')}
              className="w-full lg:w-auto py-4 px-8 rounded-xl text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>Enter Sovereign Store (50+)</span>
              <span>➔</span>
            </button>
            <p className="text-[10px] text-slate-500 text-center font-mono">
              Live Currency: USD ($) • GBP (£) • EUR (€)
            </p>
          </div>
        </div>
      </section>

      {/* Critical Pathway Recommendation Bar */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-3 text-left max-w-xl relative z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
              Diagnostic Pre-Requisite
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Establish Your Baseline Score
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
              Clinical manuals are useless if you are operating on guesswork. Take our 5-minute diagnostic to establish your exact baseline across our 6 longevity protocols.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate('/quiz')}
              className="w-full md:w-auto py-4 px-8 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:scale-[1.02] transition duration-200 shadow-xl shadow-cyan-500/10 cursor-pointer"
            >
              Take Free 5-Min Quiz Now ➔
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
