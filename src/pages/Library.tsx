import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LibraryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  useEffect(() => {
    document.title = "The Sovereign Library | 123TheNextLevel";
    window.scrollTo(0, 0);

    const isDownload = searchParams.get('download') === 'idiots-guide' || searchParams.get('download') === 'true';
    if (isDownload && !downloadTriggered) {
      setDownloadTriggered(true);
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
  }, [searchParams, downloadTriggered]);

  const resources = [
    {
      id: "idiots-guide",
      tag: "Everyday Translator",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      title: "An Idiot's Guide to the Next Level Lifespan",
      description: "A ruthlessly honest, 5-page translator designed to decode our complex molecular science, explain why living longer is a curse if you are frail, and give you your immediate, zero-cost daily habits.",
      fileUrl: "/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf",
      fileName: "idiots-guide-to-the-next-level-lifespan.pdf",
      coverImage: "/assets/images/shop/next_level_cover.png",
      buttonText: "Download Free Guide (PDF)",
      buttonStyle: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/15",
      highlights: ["Simple post-meal hacks", "Circadian breathing rules", "Epigenetics made simple"]
    },
    {
      id: "clinical-workbook",
      tag: "Clinician Co-Pilot Suite",
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

      {/* Access Granted Notification Banner */}
      {downloadTriggered && (
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
            🏛️ Sovereign Clinical Registry
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            The Next Level Library
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your open-access directory to cross the bridge from biological speculation to molecular certainty. Master your daily habits, prepare your biomarker panel, and execute your protocols in partnership with your doctor.
          </p>
        </div>
      </header>

      {/* 2-Column Directory Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {resources.map((res) => (
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

      {/* Critical Pathway Recommendation Bar */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
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
