import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Dna, Microscope, Zap, Shield, Sparkles, RefreshCw, Flame, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TopicId = 'autophagy' | 'nad' | 'sirtuins' | 'senescent' | 'mitochondria' | 'biogenesis';

interface TopicData {
  id: TopicId;
  title: string;
  simpleTitle: string;
  tagline: string;
  summary: string;
  stepMechanics: string[];
  lifestyleTriggers: string[];
  clinicalSignificance: string;
  renderInfographic: () => React.ReactNode;
}

export default function CellularGlossary() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  
  // Resolve valid topic or default to 'autophagy'
  const activeTopic: TopicId = ['autophagy', 'nad', 'sirtuins', 'senescent', 'mitochondria', 'biogenesis'].includes(topicId || '')
    ? (topicId as TopicId)
    : 'autophagy';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${topics[activeTopic].title} | Cellular Glossary | 123TheNext Level`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', topics[activeTopic].tagline);
    }
  }, [activeTopic]);

  const handleSelectTopic = (id: TopicId) => {
    navigate(`/health/cellular/glossary/${id}`);
  };

  const topics: Record<TopicId, TopicData> = {
    autophagy: {
      id: 'autophagy',
      title: 'Autophagy',
      simpleTitle: 'The Cellular Recycling System',
      tagline: 'Clearing damaged parts and recycling them into fresh cellular energy.',
      summary: 'Autophagy is your body\'s natural cleanup crew. Think of your cells as busy factories. Over time, some machinery breaks down or gets damaged. Autophagy is the process where the cell automatically gathers this broken machinery, breaks it down into raw materials, and uses them to rebuild brand-new, efficient parts.',
      stepMechanics: [
        'Waste Detection: The cell identifies worn-out organelles, proteins, or pathogens that are no longer functioning.',
        'Enclosure (Autophagosome): A double-membrane bubble wraps around the waste material to separate it.',
        'Fusion (Lysosome): This bubble merges with a lysosome, which is full of natural digestive enzymes.',
        'Recycling: The waste is broken down into basic amino acids and nutrients, which are released back to fuel new cell growth.'
      ],
      lifestyleTriggers: [
        'Intermittent Fasting: 16 to 18 hours of fasting signals the body to begin consuming cellular waste.',
        'High-Intensity Interval Training (HIIT): Triggers acute cellular stress that accelerates trash cleanup.',
        'Spermidine-Rich Foods: Green peas, aged cheese, and mushrooms contain spermidine, a natural autophagy helper.'
      ],
      clinicalSignificance: 'Maintaining high levels of autophagy helps clear out the biological waste associated with cognitive decline, cardiovascular disease, and cellular aging.',
      renderInfographic: () => (
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
          {/* Outer cell container */}
          <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(99, 102, 241, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          
          {/* Autophagosome Bubble (Recycling Bag) */}
          <motion.g
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="150" cy="180" r="50" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="150" cy="180" r="44" fill="rgba(99, 102, 241, 0.1)" />
            {/* Damaged cell trash inside */}
            <path d="M140,170 L160,190 M160,170 L140,190" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
            <circle cx="145" cy="185" r="4" fill="#f43f5e" />
          </motion.g>

          {/* Lysosome (Enzyme Bag) */}
          <motion.g
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="270" cy="180" r="35" fill="none" stroke="#10b981" strokeWidth="3" />
            <circle cx="270" cy="180" r="30" fill="rgba(16, 185, 129, 0.1)" />
            {/* Digestive dots */}
            <circle cx="260" cy="175" r="2" fill="#10b981" />
            <circle cx="275" cy="170" r="2" fill="#10b981" />
            <circle cx="270" cy="190" r="2" fill="#10b981" />
          </motion.g>

          {/* Fusion path indicator */}
          <path d="M195,180 L230,180" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="225,175 235,180 225,185" fill="rgba(255, 255, 255, 0.2)" />
          
          <text x="200" y="320" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">Fusion & Recycling</text>
        </svg>
      )
    },
    nad: {
      id: 'nad',
      title: 'NAD+',
      simpleTitle: 'The Cellular Energy Fuel',
      tagline: 'Recharging biological batteries to keep DNA repair active.',
      summary: 'NAD+ is a natural coenzyme found in every cell of your body. Think of it as the electricity that powers your cellular battery. Without enough NAD+, your cellular factories lose energy, sirtuins (the DNA repair crew) stop working, and cell repair grinds to a halt.',
      stepMechanics: [
        'Fuel Input: Your body absorbs precursor compounds (like NMN, NR, or food nutrients).',
        'Conversion: Enzymes convert these compounds into active NAD+ molecules.',
        'Mitochondrial Respiration: NAD+ donates electrons in your mitochondria to generate ATP (usable cellular energy).',
        'Repair Activation: Elevated NAD+ powers Sirtuins to identify and fix genomic damage.'
      ],
      lifestyleTriggers: [
        'Temperature Stress: Cold plunges or hot saunas stimulate pathways that trigger NAD+ synthesis.',
        'Aerobic Exercise: Increases the body\'s demand for energy, triggering natural NAD+ upregulation.',
        'Precursor Supplementation: High-quality NMN or NR intake directly boosts dwindling NAD+ levels.'
      ],
      clinicalSignificance: 'Declining NAD+ levels are directly associated with physical fatigue, decreased cardiovascular capacity, and cellular damage accumulation.',
      renderInfographic: () => (
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
          <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(245, 158, 11, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          
          {/* Battery Outer Outline */}
          <rect x="130" y="100" width="140" height="200" rx="20" fill="none" stroke="#f59e0b" strokeWidth="4" />
          <rect x="175" y="80" width="50" height="20" rx="5" fill="#f59e0b" />
          
          {/* Charging blocks */}
          <motion.rect
            x="145" y="250" width="110" height="35" rx="5" fill="#ef4444"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.rect
            x="145" y="205" width="110" height="35" rx="5" fill="#f59e0b"
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
          <motion.rect
            x="145" y="160" width="110" height="35" rx="5" fill="#10b981"
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
          
          {/* Lightning Bolt */}
          <motion.path
            d="M200,140 L185,190 L205,190 L195,240 L215,180 L195,180 Z"
            fill="#f59e0b"
            animate={{ scale: [1, 1.15, 1], y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <text x="200" y="340" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">Cell Battery Recharge</text>
        </svg>
      )
    },
    sirtuins: {
      id: 'sirtuins',
      title: 'Sirtuins',
      simpleTitle: 'The DNA Repair Crew',
      tagline: 'Activating protective enzymes to repair genes and reduce cellular stress.',
      summary: 'Sirtuins are a family of seven special helper proteins inside your cells. Think of them as the cellular antivirus software. When your cell\'s DNA code becomes damaged by pollution, stress, or age, Sirtuins rush to patch the gaps, ensuring the genetic instructions remain clean and readable.',
      stepMechanics: [
        'Stress Signal: The cell detects genomic instability or oxidative stress.',
        'NAD+ Binding: Sirtuins bind with NAD+ (they cannot function without this energy coenzyme).',
        'Gene Silencing: Sirtuins wind DNA tightly to protect vulnerable genes from mutation.',
        'Deacetylation: They strip away chemical tags on proteins to accelerate cellular survival protocols.'
      ],
      lifestyleTriggers: [
        'Caloric Restriction: Periodic fasting triggers SIRT1 and SIRT3 activation.',
        'Resveratrol & Polyphenols: Found in blueberries, cocoa, and grape skins, helping to activate sirtuin proteins.',
        'Thermal Exposure: Sauna use triggers cellular heat-shock proteins that assist sirtuin functionality.'
      ],
      clinicalSignificance: 'Active sirtuins suppress inflammation, regulate healthy metabolism, and safeguard DNA integrity from age-related degradation.',
      renderInfographic: () => (
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
          <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(99, 102, 241, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          
          {/* DNA Strands */}
          <g>
            {/* Wave 1 */}
            <path d="M80,200 Q140,120 200,200 T320,200" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="4" />
            {/* Wave 2 */}
            <path d="M80,200 Q140,280 200,200 T320,200" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="4" />
            
            {/* Connecting bars */}
            {[105, 130, 155, 180, 220, 245, 270, 295].map((x) => {
              // Calculate y positions for waves
              const wave1Y = 200 + Math.sin((x - 80) * (Math.PI / 120)) * 80;
              const wave2Y = 200 - Math.sin((x - 80) * (Math.PI / 120)) * 80;
              return (
                <line key={x} x1={x} y1={wave1Y} x2={x} y2={wave2Y} stroke="#3b82f6" strokeWidth="2" />
              );
            })}

            {/* Damaged Area */}
            <circle cx="200" cy="200" r="12" fill="#ef4444" opacity="0.3" />
            <line x1="200" y1="160" x2="200" y2="240" stroke="#ef4444" strokeWidth="3" strokeDasharray="3 3" />
          </g>

          {/* Sirtuin Shield (Antivirus Guard) */}
          <motion.g
            animate={{ y: [-15, 10, -15], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="200" cy="200" r="30" fill="rgba(59, 130, 246, 0.2)" stroke="#60a5fa" strokeWidth="3" />
            <Shield size={24} className="text-blue-400 absolute" style={{ transform: 'translate(188px, 188px)' }} />
          </motion.g>

          <text x="200" y="330" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">DNA Repair Shield Active</text>
        </svg>
      )
    },
    senescent: {
      id: 'senescent',
      title: 'Senescent Cells',
      simpleTitle: 'The Zombie Cells',
      tagline: 'Selective clearing of damaged cells that release inflammatory signals.',
      summary: 'Senescent cells are cells that have reached the end of their lifespan but refuse to die. Because of this, scientists call them "zombie cells." Instead of working normally, they hover in the body, sending out toxic inflammatory chemicals that accelerate aging and damage surrounding healthy tissue.',
      stepMechanics: [
        'Cellular Arrest: Stress, DNA damage, or telomere shortening triggers a cell to stop dividing.',
        'Zombie State: The cell undergoes chromatin remodeling, becoming resistant to natural cell death (apoptosis).',
        'Toxic Release (SASP): The zombie cell constantly secretes cytokines and inflammatory signals.',
        'Contagion Effect: These toxic chemicals damage and age surrounding healthy cells.'
      ],
      lifestyleTriggers: [
        'Quercetin & Fisetin intake: Natural senolytic compounds found in apples, onions, and strawberries that assist the body in clearing zombie cells.',
        'High-Intensity Workouts: Enhances immune cell activity to seek out and destroy senescent cells.',
        'Caloric Fasting: Deprives zombie cells of energy resources, triggering programmed cell death.'
      ],
      clinicalSignificance: 'Accumulated zombie cells drive chronic systemic inflammation (inflammaging), which stiffens arteries and degrades joints.',
      renderInfographic: () => (
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
          <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(239, 68, 68, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          
          {/* Healthy Cell */}
          <circle cx="120" cy="180" r="45" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="120" cy="180" r="15" fill="rgba(59, 130, 246, 0.3)" />
          <text x="120" y="250" textAnchor="middle" fill="#60a5fa" className="text-[10px] font-black uppercase tracking-widest font-display">Healthy</text>

          {/* Senescent Zombie Cell */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Irregular blob shape */}
            <path
              d="M240,150 C265,135 285,150 300,165 C315,180 305,210 290,225 C275,240 245,235 235,215 C225,195 215,165 240,150 Z"
              fill="rgba(239, 68, 68, 0.1)"
              stroke="#f43f5e"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
            {/* Damaged Nucleus */}
            <path d="M260,185 Q275,170 280,195 T265,200 Z" fill="rgba(239, 68, 68, 0.3)" />
          </motion.g>

          {/* Inflammatory Toxic Secretions */}
          <motion.g
            animate={{ x: [-10, 10, -10], y: [-5, 5, -5], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <circle cx="210" cy="160" r="4" fill="#ef4444" />
            <circle cx="205" cy="200" r="3" fill="#ef4444" />
            <circle cx="220" cy="225" r="5" fill="#ef4444" />
          </motion.g>

          <text x="270" y="270" textAnchor="middle" fill="#f43f5e" className="text-[10px] font-black uppercase tracking-widest font-display">Zombie (Senescent)</text>
          <text x="200" y="340" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">Zombie Cell Inflammatory Secretions</text>
        </svg>
      )
    },
    mitochondria: {
      id: 'mitochondria',
      title: 'Mitochondria',
      simpleTitle: 'The Cellular Powerplants',
      tagline: 'Converting food and oxygen into ATP energy molecules.',
      summary: 'Mitochondria are tiny powerhouses inside your cells. Think of them as the engines of your body. They take the nutrients from the food you eat and the oxygen you breathe, and convert them into chemical fuel (called ATP) that your muscles and brain use to perform every action.',
      stepMechanics: [
        'Glucose & Oxygen Delivery: Nutrients enter the cell cytoplasm.',
        'Electron Transport Chain: Protons travel across the inner folding membrane (cristae).',
        'ATP Synthase: A microscopic protein motor spins to create ATP molecules.',
        'Energy Distribution: ATP is dispatched to fuel cellular repairs, thinking, and movement.'
      ],
      lifestyleTriggers: [
        'Zone 2 Cardio: Steady state exercise (like brisk walking or slow cycling) increases energy demands, forcing cells to build healthier mitochondria.',
        'Coenzyme Q10 (CoQ10): Helps protect and grease the microscopic gears of the mitochondrial engine.',
        'Cold Showers: Triggers brown fat activation, burning glucose to generate thermal heat.'
      ],
      clinicalSignificance: 'Degraded mitochondria cause cellular fatigue, leading to muscle weakness, cognitive decline, and metabolic sluggishness.',
      renderInfographic: () => (
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
          <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(244, 63, 94, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          
          {/* Mitochondria Outline */}
          <g transform="translate(100, 100)">
            <rect x="0" y="0" width="200" height="200" rx="100" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" strokeWidth="4" />
            
            {/* Cristae (inner folds) */}
            <motion.path
              d="M30,100 C50,60 80,140 100,100 C120,60 150,140 170,100"
              fill="none"
              stroke="#fb7185"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ strokeDashoffset: [0, 20] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              strokeDasharray="10 5"
            />
          </g>

          {/* ATP Sparks */}
          <motion.g
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="80" cy="140" r="10" fill="rgba(251, 113, 133, 0.2)" />
            <polygon points="80,132 83,138 89,140 83,142 80,148 77,142 71,140 77,138" fill="#f43f5e" />
            
            <circle cx="310" cy="180" r="12" fill="rgba(251, 113, 133, 0.2)" />
            <polygon points="310,170 314,177 322,180 314,183 310,190 306,183 298,180 306,177" fill="#f43f5e" />
          </motion.g>

          <text x="200" y="340" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">ATP Energy Generation</text>
        </svg>
      )
    },
    biogenesis: {
      id: 'biogenesis',
      title: 'Biogenesis',
      simpleTitle: 'Growing New Powerplants',
      tagline: 'Stimulating cells to grow brand new mitochondria to double your energy.',
      summary: 'Mitochondrial Biogenesis is the biological process of growing brand-new energy engines in your cells. Think of it like adding more solar panels to your home. When you challenge your body through exercise, the cells realize they need more electricity, so they build more energy-producing powerplants.',
      stepMechanics: [
        'Energy Depletion: Intense exercise drains cellular ATP reserves.',
        'Signal Activation (AMPK): The cell activates a master enzyme signaling an energy emergency.',
        'Gene Transcription (PGC-1α): DNA triggers the creation of new mitochondrial proteins.',
        'Growth and Division: Existing mitochondria split and grow, doubling the energy production capacity.'
      ],
      lifestyleTriggers: [
        'Zone 2 Endurance Training: Long, low-intensity training session (like cycling or running) is the premier trigger.',
        'Cold Exposure: Tells the body to produce new mitochondria to generate heat.',
        'PQQ supplementation: Clinically shown to trigger mitochondrial biogenesis at the cellular level.'
      ],
      clinicalSignificance: 'Increasing mitochondrial count directly enhances cellular stamina, accelerates workout recovery, and protects organ health from age-related degradation.',
      renderInfographic: () => (
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
          <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(16, 185, 129, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
          
          {/* Main cell body */}
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" strokeDasharray="5 5" />
          
          {/* Mitochondrion splitting */}
          <motion.g
            animate={{ scale: [0.95, 1, 0.95] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {/* Mother */}
            <circle cx="150" cy="180" r="30" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
            <path d="M135,180 Q150,165 165,180" fill="none" stroke="#10b981" strokeWidth="2" />
            
            {/* Daughter */}
            <circle cx="250" cy="220" r="30" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
            <path d="M235,220 Q250,205 265,220" fill="none" stroke="#10b981" strokeWidth="2" />
          </motion.g>

          {/* Division sparks */}
          <motion.g
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path d="M195,190 L205,210" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="200" cy="200" r="4" fill="#f59e0b" />
          </motion.g>
          
          <text x="200" y="340" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">Mitochondrial Division</text>
        </svg>
      )
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48">
        
        {/* Navigation back link */}
        <Link to="/health/cellular/deep-dive" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-16 transition-all group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="border-b border-white/10 group-hover:border-white">Back to Lab Deep Dive</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left sidebar - Topic navigation menu */}
          <div className="lg:col-span-4 space-y-4">
            <div className="px-6 py-4">
              <span className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] font-display block mb-2">Cellular Dictionary</span>
              <h2 className="text-2xl font-display font-black uppercase text-white tracking-tight">Core Pathways</h2>
            </div>
            
            <div className="space-y-2">
              {(Object.keys(topics) as TopicId[]).map((key) => {
                const topic = topics[key];
                const isSelected = activeTopic === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectTopic(key)}
                    className={`w-full p-6 rounded-3xl text-left border flex items-center justify-between transition-all group ${
                      isSelected 
                        ? 'bg-slate-900 border-indigo-500/30 text-white shadow-2xl shadow-indigo-500/5' 
                        : 'bg-slate-900/20 border-white/5 text-slate-400 hover:bg-slate-900/40 hover:border-white/10'
                    }`}
                  >
                    <div>
                      <h4 className="font-display font-black uppercase text-sm tracking-tight text-white mb-1">
                        {topic.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-medium block truncate max-w-[200px]">
                        {topic.simpleTitle}
                      </span>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-300 ${isSelected ? 'translate-x-1 text-indigo-400' : 'opacity-20 group-hover:opacity-100'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel - Detailed information & SVG Infographic */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0f172a] border border-white/5 rounded-[4rem] p-8 md:p-16 shadow-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.06)_0%,transparent_50%)] pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
                  
                  {/* Detailed Description */}
                  <div className="md:col-span-7 space-y-10">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-display font-black text-[9px] uppercase tracking-wider mb-6">
                        <Microscope size={12} />
                        Biomarker Breakdown
                      </div>
                      
                      <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-white leading-none mb-4">
                        {topics[activeTopic].title}
                      </h1>
                      <h3 className="text-base text-indigo-400 font-display font-bold uppercase tracking-widest">
                        {topics[activeTopic].simpleTitle}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Overview</h4>
                      <p className="text-slate-300 text-base leading-relaxed font-medium">
                        {topics[activeTopic].summary}
                      </p>
                    </div>

                    {/* Step Mechanics */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">How It Works Step-by-Step</h4>
                      <div className="space-y-4">
                        {topics[activeTopic].stepMechanics.map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black font-display text-indigo-400 flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lifestyle Triggers */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Natural Activation Triggers</h4>
                      <div className="space-y-3">
                        {topics[activeTopic].lifestyleTriggers.map((trigger, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-300 font-medium">
                              {trigger}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clinical Importance */}
                    <div className="p-6 bg-slate-950/40 rounded-3xl border border-white/5 space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display">Longevity Metric</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {topics[activeTopic].clinicalSignificance}
                      </p>
                    </div>

                  </div>

                  {/* Infographic Visual representation */}
                  <div className="md:col-span-5 flex flex-col justify-center items-center gap-8 border-t md:border-t-0 md:border-l border-white/5 pt-12 md:pt-0 md:pl-12">
                    <div className="text-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-display block mb-1">Interactive Diagram</span>
                      <p className="text-slate-500 text-xs font-medium">Cellular Pathway Visualization</p>
                    </div>
                    
                    <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-4 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none"></div>
                      {topics[activeTopic].renderInfographic()}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
