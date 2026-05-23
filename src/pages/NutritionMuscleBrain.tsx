import React, { useEffect } from 'react';
import { ArrowLeft, Brain, Zap, Activity, ExternalLink, Dumbbell, Workflow, CheckCircle2, Shield, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function NutritionMuscleBrain() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('np_mb_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    creatine: 'https://amazon.com/dp/B000GP0NYM',
    protein: 'https://amazon.com/dp/B01BGOI8C6',
    omega3: 'https://amazon.com/dp/B002CQU55K',
    nootropic: 'https://amazon.com/dp/B07P5K7DQP'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/nutrition" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Metabolic Nutrition</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Endocrine Signaling: Master Level
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            {t('np_mb_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-indigo-500/50 pl-8 text-left"
          >
            {t('np_mb_intro')} In plain English, your muscles act as a remote control for your brain. Working your muscles releases chemical messengers that directly repair brain cells and clear mental fog.
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
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">What is the Muscle-Brain Axis?</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Skeletal muscle is your body's largest endocrine organ. When you contract a muscle against resistance, it acts as a molecular pump manufacturing hundreds of small proteins called <strong>myokines</strong>.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                One key myokine, called <strong>Irisin</strong>, is released into the blood and possesses the unique ability to cross the blood-brain barrier. Once inside the brain, Irisin stimulates the release of <strong>BDNF (Brain-Derived Neurotrophic Factor)</strong>—a compound that acts as a natural fertilizer for your hippocampus, driving memory formation, learning speed, and neuroprotection.
              </p>
            </div>

            {/* Everyday Symptoms of Imbalance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  Cognitive Sluggishness
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1 font-bold">•</span>
                    Persistent brain fog and difficulty focusing on tasks.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1 font-bold">•</span>
                    Slower verbal recall and difficulty memorizing details.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1 font-bold">•</span>
                    Mild afternoon anxiety combined with physical lethargy.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-violet-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                  Physical Signal Indicators
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Poor muscle recovery and slow progress in strength training.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Loss of grip strength and basic skeletal coordination.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Mental fatigue and mood drops after long desk sessions.
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
                  <strong>Contract to clear the mind.</strong> Physical movement is the primary language of the nervous system. Challenge your muscle tissue against physical resistance to activate the secretome pathways that keep your brain young.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "The mental benefits of exercise are simply due to sweating and getting more oxygenated blood to your brain."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Blood flow helps, but the main driver of brain plasticity is chemical signaling. Muscle fibers actively manufacture specific hormones (like Irisin) during contraction that unlock cognitive growth pathways which blood flow alone cannot trigger.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">Myokine Transmission & Neurogenesis</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(99, 102, 241, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* 1. Muscle Contraction (Source) */}
                <g transform="translate(80, 120)">
                  {/* Contracting muscle fibers */}
                  <motion.path 
                    d="M-30,-20 L30,-20 M-30,0 L30,0 M-30,20 L30,20" 
                    stroke="#818cf8" strokeWidth="4" strokeLinecap="round"
                    animate={{ scaleX: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <rect x="-40" y="-30" width="80" height="60" rx="10" fill="rgba(99, 102, 241, 0.1)" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                  <text x="0" y="45" textAnchor="middle" fill="#818cf8" className="text-[9px] font-black uppercase tracking-widest font-display">Muscle Contraction</text>
                </g>

                {/* 2. Blood-Brain Barrier (BBB) representation */}
                <g transform="translate(200, 200)">
                  <line x1="0" y1="-120" x2="0" y2="120" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3" strokeDasharray="6 4" />
                  <text x="-5" y="-130" textAnchor="end" fill="#94a3b8" className="text-[8px] font-black uppercase tracking-widest font-display">Blood</text>
                  <text x="5" y="-130" textAnchor="start" fill="#94a3b8" className="text-[8px] font-black uppercase tracking-widest font-display">Brain</text>
                </g>

                {/* Bloodstream pathway with flowing Irisin */}
                <motion.g
                  animate={{ x: [0, 120], opacity: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="80" cy="180" r="5" fill="#a78bfa" />
                  <circle cx="60" cy="200" r="4" fill="#a78bfa" />
                </motion.g>

                {/* 3. Brain (Target) */}
                <g transform="translate(300, 280)">
                  {/* Neuron hub */}
                  <circle cx="0" cy="0" r="20" fill="rgba(167, 139, 250, 0.1)" stroke="#a78bfa" strokeWidth="2" />
                  {/* Dendrites */}
                  <line x1="0" y1="0" x2="-25" y2="-25" stroke="#a78bfa" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="25" y2="-25" stroke="#a78bfa" strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="0" y2="-35" stroke="#a78bfa" strokeWidth="1.5" />
                  
                  {/* Glowing BDNF sparks */}
                  <motion.polygon 
                    points="0,-45 -3,-38 -10,-40 -5,-35 -8,-28 0,-32 8,-28 5,-35 10,-40 3,-38" fill="#10b981"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <text x="0" y="35" textAnchor="middle" fill="#10b981" className="text-[9px] font-black uppercase tracking-widest font-display">BDNF Activation</text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Irisin Crossing the BBB</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Physical work releases myokines like Irisin into the bloodstream, crossing the blood-brain barrier to fertilizer pathways that rebuild neural integrity and trigger BDNF.
              </p>
            </div>
          </div>

        </div>

        {/* The Neuro-Pillar Protocol */}
        <section className="bg-slate-900/50 border border-white/5 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-3xl mb-32">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <Workflow size={28} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
                The Signaling Protocol
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                {t('np_mb_creatine_p')} Saturation ensures constant ATP backup to neurons during intense focus, reducing systemic brain fatigue.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">Hippocampus Load</span>
                <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">Energy Buffer</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <a href={affiliateLinks.creatine} target="_blank" rel="noopener noreferrer" className="p-10 bg-[#0f172a] hover:bg-slate-900 border border-white/5 rounded-[3rem] group transition-all shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-display font-black uppercase leading-tight text-white group-hover:text-indigo-400 transition-colors">
                    {t('np_mb_creatine_title')}
                  </h3>
                  <ExternalLink size={20} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-5xl font-display font-black text-indigo-400">5.0G</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Daily Target Saturation</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Verified pure Monohydrate creates an essential backup energy reservoir in brain tissues, eliminating afternoon focus drops.
                </p>
              </a>

              <div className="grid grid-cols-2 gap-6">
                <a href={affiliateLinks.omega3} target="_blank" rel="noopener noreferrer" className="p-8 bg-slate-900/50 hover:bg-slate-900 border border-white/5 rounded-[2.5rem] group transition-all text-center">
                  <Brain size={32} className="text-indigo-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-display font-black uppercase text-sm text-white">Alpha-EPA</h4>
                  <p className="text-xs text-slate-500 mt-1">Neuro-inflammatory shield</p>
                </a>
                <a href={affiliateLinks.protein} target="_blank" rel="noopener noreferrer" className="p-8 bg-slate-900/50 hover:bg-slate-900 border border-white/5 rounded-[2.5rem] group transition-all text-center">
                  <Dumbbell size={32} className="text-indigo-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-display font-black uppercase text-sm text-white">Bio-Whey</h4>
                  <p className="text-xs text-slate-500 mt-1">Myokine precursor stack</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32 mt-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <BookOpen size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Jargon Buster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                term: "Endocrine Organ",
                meaning: "An organ or tissue (like muscles or glands) that manufactures chemical messengers (hormones) and sends them into the bloodstream to trigger actions in other parts of the body."
              },
              {
                term: "Myokines",
                meaning: "Special signaling proteins produced and released by skeletal muscle fibers when they contract during exercise. They communicate directly with other organs, including the brain."
              },
              {
                term: "BDNF (Brain-Derived Neurotrophic Factor)",
                meaning: "A vital protein that acts as 'miracle-grow' for your brain. It helps grow new neurons, protects existing ones, and supports synaptic plasticity (building memory)."
              },
              {
                term: "Blood-Brain Barrier (BBB)",
                meaning: "A highly protective security membrane lining the blood vessels in the brain. It keeps toxins and pathogens out of your central nervous system while allowing specific health-promoting molecules (like Irisin) to enter."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-indigo-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed */}
        <div className="mt-48 space-y-24">
          <div className="flex items-center gap-6 mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              Intelligence <span className="text-indigo-500">Feed</span>
            </h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>
          <BlogSection category="nutrition" limit={3} />
        </div>

      </div>
    </div>
  );
}
