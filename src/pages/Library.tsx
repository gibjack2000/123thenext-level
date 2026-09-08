import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LibraryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "The Sovereign Library | 123TheNextLevel";
    window.scrollTo(0, 0);
  }, []);

  const resources = [
    {
      id: "idiots-guide",
      tag: "Everyday Translator",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      title: "An Idiot's Guide to the Next Level Lifespan",
      description: "A ruthlessly honest, 5-page translator designed to decode our complex molecular science, explain why living longer is a curse if you are frail, and give you your immediate, zero-cost daily habits.",
      fileUrl: "/assets/docs/Finalthe-next-level-lifespan.pdf",
      fileName: "Finalthe-next-level-lifespan.pdf",
      coverImage: "/assets/images/shop/next_level_cover.png",
      buttonText: "Download Free Guide (PDF)",
      buttonStyle: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/15",
      highlights: ["Simple post-meal hacks", "Circadian breathing rules", "Epigenetics made simple"]
    },
    {
      id: "longevity-diagnostic-blueprint",
      tag: "Advanced Geroscience & Diagnostic Protocols",
      tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      title: "The Longevity Blueprint & Phase 1 Diagnostic Guide",
      description: "Our academic master manual written for high-performers. Dive deep into Yamanaka cellular factors, autophagy mechanics, NAD+ modulation pathways, whole-methylome epigenetic testing, and clinical biomarker baselines.",
      fileUrl: "/assets/docs/the-next-level-lifespan.pdf",
      fileName: "the-next-level-lifespan.pdf",
      coverImage: "/assets/images/shop/longevity_blueprint_cover.png",
      buttonText: "Download Longevity Blueprint (PDF)",
      buttonStyle: "bg-slate-900 text-slate-100 hover:bg-slate-850 border border-slate-800",
      highlights: ["NAD+ modulation pathways", "Autophagy thresholds & ApoB", "Whole-methylome epigenetic testing"]
    },
    {
      id: "clinical-workbook",
      tag: "Clinician Co-Pilot Suite",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      title: "The Clinical Baseline Workbook & GP Consultation Template",
      description: "Cross the bridge from guessing to knowing with this clinician-ready consultation suite. Includes our Lola Vital Check 56 biomarker breakdown, laboratory draw checklist, and a printable template to co-evaluate your telemetry with your doctor.",
      fileUrl: "/assets/docs/clinical-baseline-consultation-template-v2.pdf",
      fileName: "clinical-baseline-consultation-template-v2.pdf",
      coverImage: "/assets/images/shop/gp_consultation_cover.png",
      buttonText: "Download GP Consultation Template (PDF)",
      buttonStyle: "bg-slate-900 text-slate-100 hover:bg-slate-850 border border-slate-800",
      highlights: ["Printable doctor note template", "Lola Vital Check 56 breakdown", "Actionable consultation questions"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30">

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
            Your open-access directory to cross the bridge from biological speculation to molecular certainty. Print these files, track your baseline biomarkers, and execute your protocols in partnership with your doctor.
          </p>
        </div>
      </header>

      {/* Directory Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
          {resources.map((res) => (
            <div
              key={res.id}
              className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-8 shadow-xl hover:border-slate-700/50 hover:shadow-2xl transition duration-300 relative overflow-hidden"
            >
              <div className="space-y-6">

                {/* Book Cover Container */}
                <div className="aspect-[4/5] w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative flex items-center justify-center">
                  {res.coverImage ? (
                    <img
                      src={res.coverImage}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500"
                    />
                  ) : (
                    /* Elegant Fallback Mockup for Non-Image Manuals */
                    <div className="p-6 text-center space-y-4">
                      <div className="h-12 w-12 rounded-lg bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-xl">
                        📓
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clinical Manual</p>
                        <p className="text-sm font-black text-slate-300 line-clamp-2 px-2">{res.title}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="space-y-3 text-left">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${res.tagColor}`}>
                    {res.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">{res.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{res.description}</p>
                </div>

                {/* Key Checklist Highlights */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2 text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What's Inside:</p>
                  <ul className="space-y-1 text-xs text-slate-300">
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
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition duration-200 cursor-pointer ${res.buttonStyle}`}
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
