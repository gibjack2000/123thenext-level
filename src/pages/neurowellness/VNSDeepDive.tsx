import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Zap, Activity, ExternalLink, Microscope, AlertTriangle, Heart, BookOpen, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import JargonTooltip from '../../components/JargonTooltip';

export default function VNSDeepDive() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Vagus Nerve Stimulation (tVNS) | 123TheNext Level`;
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/neurowellness/hard-care" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Hard-Care Protocols</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Autonomic Hacking: Exogenous tVNS
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            Vagus Nerve Stimulation
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-blue-500/50 pl-8 text-left"
          >
            In plain English, transcutaneous vagus nerve stimulation sends mild electrical pulses into your ear's nerve endings. This tricks your brain into turning off the survival "fight-or-flight" panic response and immediately activating your healing "rest-and-digest" state.
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
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">What is VNS?</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                The vagus nerve is the information superhighway of your parasympathetic nervous system, running all the way from your brainstem to your heart, lungs, and digestive tract. Under chronic stress, this nerve's activity (<JargonTooltip termKey="vagal">vagal tone</JargonTooltip>) becomes weak, keeping your body locked in a state of alert and inflammation.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                <JargonTooltip termKey="vns">Transcutaneous Vagus Nerve Stimulation (tVNS)</JargonTooltip> uses a specialized ear clip (like the Nurosym VNS) to deliver gentle electrical micro-currents to the auricular branch of the vagus nerve in the outer ear (the concha). These signals travel straight to the brain stem, telling the heart to slow down, reducing vascular resistance, and lowering inflammatory cytokine levels.
              </p>
            </div>

            {/* Everyday Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-cyan-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  Autonomic Strain Indicators
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 font-bold">•</span>
                    Low <JargonTooltip termKey="hrv">heart rate variability (HRV)</JargonTooltip> during restful sleep.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 font-bold">•</span>
                    Elevated resting heart rate and blood pressure under mild stress.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 font-bold">•</span>
                    Feeling constantly "wired but tired" at bedtime.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  Somatic Stress Clues
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Tense, shallow breathing and tightness in the throat or chest.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Irritable bowel or digestive issues triggered by stressful situations.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Chronic physical fatigue paired with hyper-alert racing thoughts.
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
                  <strong>Consistency over Intensity.</strong> You do not need to feel pain or strong muscular twitching in the ear for VNS to work. Set the current just above your sensory threshold (where you feel a gentle tingling) and prioritize regular daily sessions. High intensity can trigger a stress reaction, defeating the purpose.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "Vagus nerve stimulation works instantly like a light switch, removing all anxiety in 5 minutes."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    While some experience a rapid calming wave, the real power of tVNS is cumulative. Regular stimulation rewrites your neural pathways over 2-4 weeks, strengthening the vagal brake (your nervous system's built-in brakes) and expanding your long-term window of stress tolerance.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">Auricular tVNS & Heart Rate Calibration</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(59, 130, 246, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* 1. Ear Auricular Stimulus */}
                <g transform="translate(80, 80)">
                  <rect x="-30" y="-20" width="60" height="40" rx="10" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />
                  <text x="0" y="5" textAnchor="middle" fill="#60a5fa" className="text-[9px] font-black uppercase tracking-widest font-display">Ear Clip</text>
                  <circle cx="0" cy="0" r="15" fill="none" stroke="#3b82f6" strokeWidth="2" className="animate-ping opacity-50" />
                </g>

                {/* 2. Vagal Pathway Trunk */}
                <path d="M 80 80 Q 200 120 200 180 T 200 300" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="4" />
                
                {/* Pulsing signal travelling down the vagus nerve */}
                <motion.circle 
                  r="6" 
                  fill="#3b82f6" 
                  filter="drop-shadow(0 0 8px #3b82f6)"
                  animate={{
                    cx: [80, 160, 200, 200],
                    cy: [80, 110, 180, 300],
                    opacity: [1, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Brain Stem Hub */}
                <g transform="translate(200, 180)">
                  <circle cx="0" cy="0" r="16" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
                  <text x="25" y="4" textAnchor="start" fill="#94a3b8" className="text-[8px] font-black uppercase tracking-widest font-display">Brain Stem</text>
                </g>

                {/* 3. Heart Regulation (Target) */}
                <g transform="translate(200, 300)">
                  <motion.path 
                    d="M 12,0 C 12,-7 6,-12 0,-12 C -6,-12 -12,-7 -12,0 C -12,10 0,18 12,24 C 24,18 36,10 36,0 C 36,-7 30,-12 24,-12 C 18,-12 12,-7 12,0 Z" 
                    fill="rgba(239, 68, 68, 0.2)" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    transform="translate(-12, -6) scale(0.8)"
                    animate={{ scale: [0.75, 0.9, 0.75] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <text x="0" y="25" textAnchor="middle" fill="#ef4444" className="text-[9px] font-black uppercase tracking-widest font-display">Parasympathetic Shift</text>
                </g>
                
                <text x="200" y="365" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Vagal Impulse Cascade</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Mild stimulation of the outer ear travels down the vagal trunk directly into the brain stem, forcing a parasympathetic shift that calms autonomic reactivity.
              </p>
            </div>
          </div>

        </div>

        {/* VNS Protocol */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Volume2 size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Vagus Stimulation Protocol
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            A practical guidelines framework for transcutaneous auricular vagus nerve stimulation (tVNS).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "Step 1: Placement", focus: "Concha / Tragus", metric: "Left Ear Dominant", detail: "Attach the ear clip electrode to the tragus or concha of the left ear. Use the left side as the right vagus nerve maps directly to the heart's pacemaker (SA node)." },
              { phase: "Step 2: Calibration", focus: "Sensory Threshold", metric: "Gentle Tingle", detail: "Slowly increase the current output. Stop the moment you feel a light tapping or prickling sensation. It should remain pleasant and never sting." },
              { phase: "Step 3: Session Duration", focus: "15-30 Minutes", metric: "Twice Daily", detail: "Stimulate for 15-30 minutes per session. Recommended times are early morning to set baseline tone, or before bed to aid deep-wave sleep." },
              { phase: "Step 4: Adaptation", focus: "2-4 Weeks", metric: "Cumulative Effect", detail: "Measure sleep architecture and morning HRV values. Vagal toning results build gradually. Do not exceed 60 minutes of daily exposure." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4 block">{step.phase}</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-blue-400 transition-colors">{step.focus}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{step.metric}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Jargon Buster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "Parasympathetic Nervous System",
                meaning: "The division of the autonomic nervous system responsible for 'rest-and-digest' functions. It slows the heart rate, increases intestinal activity, and relaxes sphincter muscles."
              },
              {
                term: "Vagal Tone",
                meaning: "The activity or strength of the vagus nerve. Higher vagal tone is associated with lower stress levels, improved cardiovascular function, and better emotional regulation."
              },
              {
                term: "tVNS",
                meaning: "Transcutaneous Vagus Nerve Stimulation. A non-invasive technique that uses electrical micro-currents applied to the surface of the skin (usually the ear) to stimulate the vagus nerve."
              },
              {
                term: "Heart Rate Variability (HRV)",
                meaning: "The variation in time between consecutive heartbeats. Higher HRV indicates a resilient, adaptable autonomic nervous system that transitions easily between stress and recovery states."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-blue-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
