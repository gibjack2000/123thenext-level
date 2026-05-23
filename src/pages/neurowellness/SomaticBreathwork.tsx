import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Zap, Activity, ExternalLink, Microscope, AlertTriangle, Wind, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import JargonTooltip from '../../components/JargonTooltip';

export default function SomaticBreathwork() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Somatic Breathwork & Grounding | 123TheNext Level`;
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-violet-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(139,92,246,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/neurowellness/soft-care" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Soft-Care Healing</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Endogenous Calibration: Somatic Safety
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            Somatic Breathwork
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-violet-500/50 pl-8 text-left"
          >
            In plain English, somatic breathwork uses structured breathing patterns to manually downregulate your nervous system. By changing how you breathe, you send direct safety signals to your brain stem, instantly stopping anxiety loops.
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
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">Breathing to Calm the Nervous System</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Your brain stem monitors the amount of carbon dioxide (CO2) in your bloodstream. When you get stressed, your breathing speeds up and becomes shallow, trapping CO2 and triggering a feeling of suffocation and anxiety. 
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                Using techniques like the <strong><JargonTooltip termKey="vagal">Physiological Sigh</JargonTooltip></strong> (two rapid inhales through the nose, followed by a long, relaxed exhale through the mouth) forces tiny air sacs in your lungs (alveoli) to re-inflate. This allows your blood to dump excess CO2 quickly, which immediately signals the <JargonTooltip termKey="vagal">vagus nerve</JargonTooltip> to slow down your heart rate and quieten your mind.
              </p>
            </div>

            {/* Everyday Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-violet-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                  Signs of Breathing Dysfunction
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Frequent sighing or yawning throughout the work day.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Breathing primarily through your mouth instead of your nose.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Holding your breath unconsciously when checking emails.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-purple-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                  Mental Alarm Clues
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    Sudden spikes in ambient anxiety with no clear trigger.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    Difficulty falling asleep due to a racing, hyperactive mind.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1 font-bold">•</span>
                    Sensory overload or feeling overwhelmed by noises/screens.
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
                  <strong>Lengthen the Exhale.</strong> When you inhale, your heart rate speeds up. When you exhale, your diaphragm moves up, making your heart smaller and slowing down blood flow; your brain stem senses this and commands the vagus nerve to slow down your heart. To trigger deep calm, ensure your exhales are twice as long as your inhales.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "To calm down, you should take deep, massive belly breaths to flood your blood with oxygen."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Taking massive breaths and exhaling too quickly actually depletes carbon dioxide, constricting blood vessels and reducing oxygen delivery to the brain. True relaxation comes from slowing down your breathing rate and extending your exhales, which keeps CO2 balanced and relaxes neural pathways.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">Lung Expansion & HRV Synchronization</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(139, 92, 246, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* Lungs outline expanding and contracting */}
                <g transform="translate(200, 180)">
                  {/* Left lung */}
                  <motion.path 
                    d="M-5,-60 C-40,-60 -70,-30 -70,20 C-70,50 -50,70 -30,70 C-10,70 -5,40 -5,20 Z" 
                    fill="rgba(139, 92, 246, 0.15)" 
                    stroke="#8b5cf6" 
                    strokeWidth="2.5"
                    animate={{
                      scale: [0.9, 1.15, 1.15, 0.9],
                      x: [0, -5, -5, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Right lung */}
                  <motion.path 
                    d="M5,-60 C40,-60 70,-30 70,20 C70,50 50,70 30,70 C10,70 5,40 5,20 Z" 
                    fill="rgba(139, 92, 246, 0.15)" 
                    stroke="#8b5cf6" 
                    strokeWidth="2.5"
                    animate={{
                      scale: [0.9, 1.15, 1.15, 0.9],
                      x: [0, 5, 5, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Trachea */}
                  <path d="M 0 -90 L 0 -60" stroke="#8b5cf6" strokeWidth="6" strokeLinecap="round" />
                  
                  {/* Air intake animation (circles entering lungs) */}
                  <motion.circle 
                    r="4" 
                    fill="#a78bfa"
                    animate={{
                      cx: [0, 0, -30],
                      cy: [-85, -55, 0],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.circle 
                    r="4" 
                    fill="#a78bfa"
                    animate={{
                      cx: [0, 0, 30],
                      cy: [-85, -55, 0],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </g>

                {/* Exhale marker and text indicator */}
                <g transform="translate(200, 310)">
                  <motion.text 
                    x="0" 
                    y="0" 
                    textAnchor="middle" 
                    fill="#c084fc" 
                    className="text-[10px] font-black uppercase tracking-widest font-display"
                    animate={{
                      opacity: [0.3, 1, 1, 0.3],
                      scale: [0.95, 1.05, 1.05, 0.95]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    Vagus Nerve Engaged
                  </motion.text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Resonant Breathing Loop</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Extending your exhale expands the duration of your heart rate deceleration, stimulating the vagus nerve and overriding survival reflexes.
              </p>
            </div>
          </div>

        </div>

        {/* Breath Protocols */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 border border-violet-500/20">
              <Wind size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Somatic Breath Protocols
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            Two scientifically proven techniques to manage physiological stress in real time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-900/50 border border-white/5 rounded-[3rem] hover:border-violet-500/30 transition-all group shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-4 block">Immediate Stress Relief</span>
              <h3 className="text-2xl font-display font-black uppercase text-white mb-6 group-hover:text-violet-400 transition-colors">The Physiological Sigh</h3>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center text-xs font-black flex-shrink-0">1</span>
                  Take a deep, rapid inhale through your nose to expand your chest.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center text-xs font-black flex-shrink-0">2</span>
                  Take a second, quick "sniff" inhale immediately to fully inflate your lungs' air sacs.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center text-xs font-black flex-shrink-0">3</span>
                  Exhale slowly through your mouth, letting your entire body relax. Repeat 3-5 times.
                </li>
              </ul>
            </div>

            <div className="p-10 bg-slate-900/50 border border-white/5 rounded-[3rem] hover:border-violet-500/30 transition-all group shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-4 block">Tactical Performance Focus</span>
              <h3 className="text-2xl font-display font-black uppercase text-white mb-6 group-hover:text-purple-400 transition-colors">Box Breathing</h3>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs font-black flex-shrink-0">1</span>
                  Inhale quietly through your nose for a count of 4 seconds.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs font-black flex-shrink-0">2</span>
                  Hold your breath with your lungs full for a count of 4 seconds.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs font-black flex-shrink-0">3</span>
                  Exhale smoothly through your mouth for a count of 4 seconds. Hold empty for 4 seconds.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 border border-violet-500/20">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Jargon Buster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "Physiological Sigh",
                meaning: "A natural reflex breathing pattern consisting of two inhales followed by an extended exhale, used by the body to re-inflate collapsed air sacs in the lungs."
              },
              {
                term: "Alveoli",
                meaning: "Tiny, balloon-like air sacs at the ends of your bronchial tubes where oxygen and carbon dioxide are exchanged with your blood."
              },
              {
                term: "Carbon Dioxide Tolerance",
                meaning: "Your body's ability to handle elevated levels of CO2 in the blood. Higher tolerance means you are less reactive to stress and experience fewer panic symptoms."
              },
              {
                term: "Endogenous safety",
                meaning: "The body's self-generated signals of safety, manufactured internally through physical states (breath, posture, heart rate) rather than external changes."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-violet-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
