import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Lock, ShieldCheck, Download, Sparkles, BookOpen } from 'lucide-react';
import { DigitalGuides } from '../components/DigitalGuides';

interface PaidDownloadState {
  status: 'idle' | 'verifying' | 'verified' | 'error';
  title?: string;
  downloadUrl?: string;
  errorMessage?: string;
}

export default function LibraryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [freeDownloadTriggered, setFreeDownloadTriggered] = useState(false);
  const [paidDownload, setPaidDownload] = useState<PaidDownloadState>({ status: 'idle' });

  useEffect(() => {
    document.title = "The Sovereign Library | 123TheNextLevel";
    window.scrollTo(0, 0);

    // 1. Check for Free "Idiot's Guide" auto-download
    const isFreeDownload = searchParams.get('download') === 'idiots-guide' || searchParams.get('download') === 'true';
    if (isFreeDownload && !freeDownloadTriggered) {
      setFreeDownloadTriggered(true);
      const timer = setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf';
        link.download = 'idiots-guide-to-the-next-level-lifespan.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
  }, [searchParams, freeDownloadTriggered, paidDownload.status]);

  const freeResources = [
    {
      id: "idiots-guide",
      tag: "Everyday Translator (Free)",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      title: "An Idiot's Guide to the Next Level Lifespan",
      description: "A ruthlessly honest, 5-page translator designed to decode our complex molecular science, explain why living longer is a curse if you are frail, and give you your immediate, zero-cost daily habits.",
      fileUrl: "/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf",
      fileName: "idiots-guide-to-the-next-level-lifespan.pdf",
      coverImage: "/covers/the-next-level-lifespan-cover.png",
      buttonText: "Download Free Guide (PDF)",
      buttonStyle: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/15",
      highlights: ["Simple post-meal hacks", "Circadian breathing rules", "Epigenetics made simple"]
    },
    {
      id: "clinical-workbook",
      tag: "Clinician Co-Pilot Suite (Free)",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      title: "The Clinical Baseline Workbook & GP Consultation Template",
      description: "Cross the bridge from guessing to knowing with this 3-page clinician-ready consultation workbook. Includes our Lola Vital Check 56 biomarker breakdown, laboratory draw checklist, and a printable template to co-evaluate your telemetry with your doctor.",
      fileUrl: "/assets/docs/clinical-baseline-consultation-workbook.pdf",
      fileName: "clinical-baseline-consultation-workbook.pdf",
      coverImage: "/assets/images/shop/gp_consultation_cover.png",
      buttonText: "Download GP Workbook (PDF)",
      buttonStyle: "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/15",
      highlights: ["Printable doctor note template", "Lola Vital Check 56 breakdown", "Actionable consultation questions"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30">

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
            <span>✓ Access Granted — Your Idiot’s Guide is downloading. Access all clinical manuals below:</span>
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
            Your open-access directory to cross the bridge from biological speculation to molecular certainty. Access free clinical co-pilot manuals or unlock actionable paid execution books stored in our private Cloudflare R2 vault.
          </p>
        </div>
      </header>

      {/* SECTION 1: PAID DIGITAL MASTER GUIDES (Locked behind Stripe & Cloudflare R2) */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="space-y-4 text-center sm:text-left mb-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
              ⚡ Actionable Master Execution Books
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
              <Lock size={10} className="text-amber-400" />
              <span>Private R2 Storage</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Digital Master Guides Vault
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Step-by-step PDF execution manuals locked behind Stripe checkout. Direct presigned delivery from Cloudflare R2 immediately upon purchase verification.
          </p>
        </div>

        {/* Embedded DigitalGuides Component */}
        <DigitalGuides />
      </section>

      {/* SECTION 2: FREE OPEN-ACCESS CLINICAL MANUALS */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="space-y-3 text-center sm:text-left mb-10">
          <span className="inline-block text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            📖 Open-Access Clinical Manuals
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Complimentary Translation &amp; Baseline Guides
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Essential reference documents provided with zero cost to help you navigate baseline biomarker testing and core lifestyle principles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {freeResources.map((res) => (
            <div
              key={res.id}
              className="group p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-8 shadow-xl hover:border-slate-700/60 hover:shadow-2xl transition duration-300 relative overflow-hidden"
            >
              <div className="space-y-6">

                {/* Book Cover Container */}
                <div className="relative max-w-[280px] mx-auto w-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
                  <img
                    src={res.coverImage}
                    alt={res.title}
                    className="relative w-full h-auto max-h-[380px] object-contain rounded-2xl border border-slate-800/90 shadow-2xl bg-slate-950"
                  />
                </div>

                {/* Content Block */}
                <div className="space-y-3 text-left">
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${res.tagColor}`}>
                    {res.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">{res.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">{res.description}</p>
                </div>

                {/* Key Checklist Highlights */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What's Inside:</p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {res.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href={res.fileUrl}
                  download={res.fileName}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition duration-200 shadow-md cursor-pointer ${res.buttonStyle}`}
                >
                  <span>{res.buttonText}</span>
                  <span>➔</span>
                </a>
              </div>

            </div>
          ))}
        </div>
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
