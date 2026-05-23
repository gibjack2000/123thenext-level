import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Zap, Activity, ExternalLink, Microscope, AlertTriangle, Dumbbell, BookOpen, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import JargonTooltip from '../../components/JargonTooltip';

export default function MuscleBrainAxis() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `The Muscle-Brain Axis & BDNF | 123TheNext Level`;
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-emerald-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/neurowellness/metabolism" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Metabolic Metabolism</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Endocrine Signaling: The Myokine Cascade
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            Muscle-Brain Axis
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-emerald-500/50 pl-8 text-left"
          >
            In plain English, physical movement turns your skeletal muscles into chemical factories. Contracting muscles release special hormones that travel through your blood, cross into your brain, and act as a fertilizer to build new connections.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-32">
        
        {/* Core Layout: Overview & Interactive Infographic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          
          {/* Detailed Explanations */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Plain English Overview */}
            <div className="bg-slate-900/50 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">How Muscles Talk to the Brain</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                For a long time, scientists thought skeletal muscle was just a system of pulleys and levers to move your bones. Today, we know muscle is a powerful <JargonTooltip termKey="endocrine">endocrine organ</JargonTooltip>. When muscles contract during exercise, they manufacture and release hundreds of signaling proteins called <strong><JargonTooltip termKey="myokines">myokines</JargonTooltip></strong>.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                One key myokine, <strong><JargonTooltip termKey="irisin">Irisin</JargonTooltip></strong>, crosses the highly protective blood-brain barrier. Once inside the brain, Irisin stimulates the production of <strong><JargonTooltip termKey="bdnf">BDNF (Brain-Derived Neurotrophic Factor)</JargonTooltip></strong>. BDNF is often referred to by neuroscientists as "miracle-grow for the brain" because it protects existing brain cells, supports the growth of new synapses, and is the absolute prerequisite for learning and memory formation.
              </p>
            </div>

            {/* Everyday Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Signs of Low Myokine Activation
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Stubborn afternoon brain fog and mental fatigue.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Difficulty retaining new information or learning skills.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Feeling anxious or sluggish after several days of inactivity.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-teal-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Cognitive Performance Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1 font-bold">•</span>
                    Rapid verbal recall and fluid speech after physical workouts.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1 font-bold">•</span>
                    Sharp mental alertness and creative problem-solving capability.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1 font-bold">•</span>
                    High emotional resilience and lower baseline stress markers.
                  </li>
                </ul>
              </div>
            </div>

            {/* The Golden Rule & Myth vs Reality */}
            <div className="p-8 md:p-12 bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 space-y-8">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 font-display flex items-center gap-2">
                  <Shield size={16} />
                  The Golden Rule
                </h4>
                <p className="text-base text-slate-300 font-medium leading-relaxed">
                  <strong>Contract to Create.</strong> If you need to write code, design a system, or solve a difficult problem, do not sit still for hours. Perform a brief set of squats, a brisk walk, or physical resistance work to trigger myokine release. This floods your brain with BDNF, making your brain physically more receptive to new information.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "Brain training apps and mental puzzles are the best way to grow new brain connections."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Mental puzzles only improve specific puzzle-solving skills. The biological trigger to grow new physical neurons (neurogenesis) is almost entirely driven by chemical signals like BDNF. The most powerful way to release BDNF is through skeletal muscle contraction, making physical exercise the ultimate brain trainer.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">Myokine Synthesis & BBB Crossing</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(16, 185, 129, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* 1. Muscle fibers contracting */}
                <g transform="translate(80, 100)">
                  <motion.path 
                    d="M-20,-10 L20,-10 M-25,0 L25,0 M-20,10 L20,10" 
                    stroke="#10b981" strokeWidth="4" strokeLinecap="round"
                    animate={{ scaleX: [0.85, 1.1, 0.85] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <rect x="-35" y="-20" width="70" height="40" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
                  <text x="0" y="32" textAnchor="middle" fill="#34d399" className="text-[8px] font-black uppercase tracking-widest font-display">Muscle</text>
                </g>

                {/* 2. Blood-Brain Barrier (Dashed Line) */}
                <g transform="translate(200, 200)">
                  <line x1="0" y1="-120" x2="0" y2="120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="-8" y="-125" textAnchor="end" fill="#94a3b8" className="text-[8px] font-black uppercase tracking-widest font-display">Blood</text>
                  <text x="8" y="-125" textAnchor="start" fill="#94a3b8" className="text-[8px] font-black uppercase tracking-widest font-display">Brain</text>
                </g>

                {/* Flowing Myokine Particles (Irisin) */}
                <motion.g
                  animate={{ x: [0, 120], opacity: [0, 1, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="80" cy="160" r="5" fill="#34d399" filter="drop-shadow(0 0 4px #34d399)" />
                  <circle cx="95" cy="180" r="4.5" fill="#34d399" filter="drop-shadow(0 0 4px #34d399)" />
                  <circle cx="70" cy="200" r="3.5" fill="#34d399" filter="drop-shadow(0 0 4px #34d399)" />
                </motion.g>

                {/* 3. Hippocampus Neuron with BDNF */}
                <g transform="translate(300, 260)">
                  {/* Neural node */}
                  <circle cx="0" cy="0" r="15" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
                  <line x1="0" y1="0" x2="-20" y2="-20" stroke="#10b981" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="20" y2="-20" stroke="#10b981" strokeWidth="1.5" />
                  
                  {/* Glowing BDNF stars */}
                  <motion.polygon 
                    points="0,-35 -2,-30 -8,-32 -4,-28 -6,-22 0,-25 6,-22 4,-28 8,-32 2,-30" fill="#f59e0b"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <text x="0" y="28" textAnchor="middle" fill="#34d399" className="text-[8px] font-black uppercase tracking-widest font-display">BDNF Signal</text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Myokine Crossing Mechanism</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Contracting muscles manufacture Irisin, sending it through the bloodstream to cross the blood-brain barrier and trigger BDNF production, fertilizing hippocampus networks.
              </p>
            </div>
          </div>

        </div>

        {/* Activation Protocols */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Dumbbell size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Myokine Activation Protocol
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            How to structure physical exercises specifically to maximize cognitive growth factors like BDNF.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { phase: "Protocol 1: Resistance", focus: "Hypertrophy Lift", metric: "3-4x Weekly", detail: "Focus on compound skeletal movements (squats, deadlifts, chest press). Skeletal muscle mass is directly correlated to your overall myokine capacity. Aim for moderate loads of 8-12 repetitions." },
              { phase: "Protocol 2: Endurance", focus: "Zone-2 Cardio", metric: "150 Mins / Week", detail: "Maintain low-intensity steady-state cardio (like jogging or cycling) where you can still talk but not sing. Zone-2 exercise stimulates long-term brain capillary growth, bringing more Irisin to brain tissue." },
              { phase: "Protocol 3: Acute Focus", focus: "Exercise Snacking", metric: "Hourly Deskside", detail: "Break up long sitting sessions. Perform 20 air squats or a 2-minute wall sit every 60-90 minutes. This contracts large muscle groups in your legs, releasing an immediate wave of myokines to clear brain fog." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 block">{step.phase}</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-emerald-400 transition-colors">{step.focus}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{step.metric}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Jargon Buster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "Myokine",
                meaning: "A type of cytokine (signaling protein) synthesized and released by muscle cells during physical contraction, acting as a hormone in the body."
              },
              {
                term: "Irisin",
                meaning: "A specific contraction-induced myokine that acts as a key chemical messenger, crossing the blood-brain barrier to trigger neurogenesis and metabolic health."
              },
              {
                term: "BDNF",
                meaning: "Brain-Derived Neurotrophic Factor. A protein that promotes the survival of nerve cells (neurons) and supports the growth and maintenance of new connections."
              },
              {
                term: "Hippocampus",
                meaning: "A complex brain structure embedded deep into the temporal lobe, playing a major role in learning, consolidation of memory, and spatial navigation."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-emerald-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
