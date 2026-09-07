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
      id: "clinical-bible",
      tag: "Advanced Geroscience",
      tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      title: "The Longevity Blueprint",
      description: "Our academic master manual written for high-performers. Dive deep into Yamanaka cellular factors, autophagy mechanics, biological age control, and clinical biomarker baselines.",
      fileUrl: "/assets/docs/longevity-blueprint.pdf",
      fileName: "longevity-blueprint.pdf",
      coverImage: null, // Fallback stylized card
      buttonText: "Download Clinical Bible",
      buttonStyle: "bg-slate-900 text-slate-100 hover:bg-slate-850 border border-slate-800",
      highlights: ["NAD+ modulation pathways", "Autophagy thresholds", "ApoB cardiovascular risk"]
    },
    {
      id: "diagnostic-blueprint",
      tag: "Diagnostic Testing Suite",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      title: "Phase 1 Onboarding & Diagnostic Guide",
      description: "Cross the bridge from guessing to knowing. This comprehensive suite details how to run whole-methylome epigenetic testing, interpret blood panels (Lola Vital Check 56), and includes a template for your doctor.",
      fileUrl: "/assets/docs/phase1-diagnostic-guide.pdf",
      fileName: "phase1-diagnostic-guide.pdf",
      coverImage: null, // Fallback stylized card
      buttonText: "Download Onboarding Guide",
      buttonStyle: "bg-slate-900 text-slate-100 hover:bg-slate-850 border border-slate-800",
      highlights: ["Methylation tracking rules", "Lola Vital Check 56 breakdown", "Printable clinician note template"]
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

                {/* Text Block */}
                <div className="space-y-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold border ${res.tagColor} uppercase tracking-wider`}>
                    {res.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {res.description}
                  </p>
                </div>

                {/* Key Bullet Highlights */}
                <ul className="space-y-2 border-t border-slate-800 pt-4">
                  {res.highlights.map((h, index) => (
                    <li key={index} className="flex items-center text-xs text-slate-400">
                      <span className="text-cyan-500 mr-2">⚡</span> {h}
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/60">
                <a
                  href={res.fileUrl}
                  download={res.fileName}
                  className={`inline-flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-200 ${res.buttonStyle}`}
                >
                  📥 {res.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Bridge Checklist */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">Universal Protocol Flow</span>
            <h3 className="text-2xl font-black text-white">How to execute these manuals safely:</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="h-8 w-8 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-xs flex items-center justify-center border border-cyan-500/20">1</div>
              <h4 className="text-sm font-bold text-slate-200">Establish the Baseline</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Use the <strong>Phase 1 Onboarding Guide</strong> and a localized 10-parameter morning balance check strip to map your biological hardware.
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/20">2</div>
              <h4 className="text-sm font-bold text-slate-200">Reboot Daily Software</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Execute the simple circadian daily movement, breathing, and fasting guidelines laid out in the <strong>Idiot's Guide</strong>.
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/20">3</div>
              <h4 className="text-sm font-bold text-slate-200">Collaborate with Clinicians</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Print out the logs and take them directly to your general practitioner to coordinate a clinical plan of action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sticky Multi-Funnel Anchor */}
      <section className="max-w-4xl mx-auto px-6 pb-24 pt-8">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 border border-cyan-500/10 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/[0.01] pointer-events-none" />
          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">Eliminate the Speculation</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Unsure where to begin?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              To bypass the complexity of advanced medical diagnostic jargon, spend 5 minutes taking our high-fidelity, 12-question scorecard to measure your baseline score across our six core protocols.
            </p>
          </div>
          <div className="pt-2 relative z-10">
            <button
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:scale-[1.01] transition duration-200 shadow-lg shadow-cyan-500/15 cursor-pointer"
            >
              Take the 5-Minute Wellness Quiz Now ➔
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
