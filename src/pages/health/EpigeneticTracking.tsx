import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Dna, Microscope, Zap, Shield, Sparkles, Activity, CheckCircle2, FlaskConical, Target, Info, Calendar, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabId = 'methylation' | 'glycanage' | 'bioage-hub';

interface TabData {
  id: TabId;
  title: string;
  subtitle: string;
  tagline: string;
  overview: string;
  howItWorks: string[];
  metrics: { label: string; value: string; desc: string }[];
  symptoms: string;
  goldenRule: string;
  lifestyleTriggers: string[];
  mythVsReality: { myth: string; reality: string };
}

export default function EpigeneticTracking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get active tab from URL query params, default to 'methylation'
  const activeTab = (searchParams.get('tab') as TabId) || 'methylation';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${
      activeTab === 'methylation'
        ? 'DNA Methylation'
        : activeTab === 'glycanage'
        ? 'GlycanAge Diagnostics'
        : 'Bio-Age Hub'
    } | Epigenetic Tracking | 123TheNext Level`;
  }, [activeTab]);

  const handleTabChange = (tabId: TabId) => {
    setSearchParams({ tab: tabId });
  };

  const data: Record<TabId, TabData> = {
    methylation: {
      id: 'methylation',
      title: 'DNA Methylation',
      subtitle: 'The Biological Speedometer',
      tagline: 'Analyzing chemical switches on your DNA to measure your exact pace of aging.',
      overview: 'DNA methylation is a process where chemical tags (called methyl groups) attach to your DNA. Think of these tags as volume knobs for your genes—they turn certain genes up (like cell repair) and others down (like inflammation) without changing your actual DNA sequence. As you live your life, your diet, exercise, and stress levels change where these tags are placed. By mapping these tags, scientists can read your biological pace of aging.',
      howItWorks: [
        'Sample Collection: A simple blood or saliva sample is collected and processed in the lab.',
        'DNA Extraction: Your genetic material is isolated and converted to reveal methylated sites.',
        'Algorithmic Analysis: Advanced 3rd-generation algorithms (like DunedinPACE) scan specific locations on your genome.',
        'Pace of Aging Output: The clock outputs a speedometer value representing your biological aging speed per calendar year.'
      ],
      metrics: [
        { label: 'Pace of Aging Score', value: '< 1.0', desc: 'Aging slower than chronological time (e.g. 0.8 means you age 0.8 biological years for every calendar year).' },
        { label: 'DunedinPACE Accuracy', value: '99.2%', desc: 'Developed by Duke and Columbia Universities, it is the most reliable clock for short-term lifestyle shifts.' },
        { label: 'Methylation Sites (CpGs)', value: '850K+', desc: 'Calculated using high-resolution genomic microarrays to ensure precision bio-data mapping.' }
      ],
      symptoms: 'You notice feeling physically exhausted after workouts, sluggish mental focus in the afternoon, or skin taking longer to clear up from minor irritation.',
      goldenRule: 'Focus on methylation-support foods (spinach, beetroot, eggs, lentils) and protect your sleep window to keep your body\'s genomic switches optimized.',
      lifestyleTriggers: [
        'Zone 2 Cardiovascular Exercise: Proven to downregulate age-accelerating methylation switches.',
        'Methyl Donors: Incorporating TMG, Folate, and Vitamin B12 in your diet to fuel clean switch placement.',
        'High-Polyunsaturated Fats: Omega-3 fatty acids help support healthy global gene expression.'
      ],
      mythVsReality: {
        myth: 'Our genes dictate exactly how we age, and we cannot change our genetic destiny.',
        reality: 'While your DNA sequence is fixed, your epigenetics (the switches) are highly adaptable. Your daily lifestyle choices actively write and rewrite the methyl tags on your DNA, giving you direct control over your biological aging speed.'
      }
    },
    glycanage: {
      id: 'glycanage',
      title: 'GlycanAge',
      subtitle: 'The Inflammation Clock',
      tagline: 'Measuring antibody sugars to identify low-grade chronic inflammation.',
      overview: 'Glycans are complex sugar molecules that cover the proteins in your body. In GlycanAge testing, scientists look at the glycans attached to your Immunoglobulin G (IgG)—your body\'s most common antibody. These glycans act like stabilizers or triggers for your immune system. Healthy glycans keep the immune system calm, while damaged glycans trigger chronic inflammation. Since chronic inflammation is the core driver of aging ("inflammaging"), your GlycanAge reveals how biologically worn down your immune defense is.',
      howItWorks: [
        'Antibody Filtration: A tiny finger-prick blood sample is processed to isolate the IgG antibodies.',
        'Glycan Cleavage: The sugar chains are chemically separated from the antibodies for analysis.',
        'Chromatography: High-pressure liquid chromatography separates and counts the different glycan shapes.',
        'Inflammation Indexing: An overall biological age score is computed based on how pro-inflammatory your glycans are.'
      ],
      metrics: [
        { label: 'IgG Glycan Profiling', value: '24 structures', desc: 'Evaluates the balance between anti-inflammatory and pro-inflammatory antibody coatings.' },
        { label: 'Biological Window', value: '10-15 Years', desc: 'Glycans can signal cardiovascular and metabolic warning signs up to a decade before clinical onset.' },
        { label: 'Sensitivity to Stress', value: 'Extremely High', desc: 'Responds rapidly to changes in visceral body fat, sleep quality, and severe psychological stress.' }
      ],
      symptoms: 'Experiencing unexplained joint stiffness, morning muscle soreness, frequent mild infections, and overall systemic puffiness or water retention.',
      goldenRule: 'Prioritize gut health and cut down on refined sugars. Since 70% of immune cells are in the gut, a healthy microbiome directly translates to calm, youthful glycans.',
      lifestyleTriggers: [
        'Visceral Fat Reduction: Losing deep abdominal fat is the absolute fastest way to drop your GlycanAge.',
        'Resistance Training: Regular muscle stimulation releases anti-inflammatory cytokines that shield your antibodies.',
        'Gut Microbiome Diversity: Fermented foods and prebiotic fibers feed the gut bacteria that dictate antibody sugar structure.'
      ],
      mythVsReality: {
        myth: 'GlycanAge is the exact same metric as DNA Methylation testing.',
        reality: 'No. DNA methylation measures the aging of your genes and cellular master-code. GlycanAge specifically measures systemic inflammation and the age of your immune system. Combining both gives a complete picture of cellular and defensive aging.'
      }
    },
    'bioage-hub': {
      id: 'bioage-hub',
      title: 'Bio-Age Hub',
      subtitle: 'Integrated Longevity Control',
      tagline: 'Unifying multiple biological age markers into a single, actionable SystemAge score.',
      overview: 'No single biological clock can capture the entirety of human aging. Your brain, cardiovascular system, and immune defense can age at different speeds. The Bio-Age Hub acts as your personal command center, bringing together DNA Methylation (cellular pace), GlycanAge (immunological inflammation), and standard clinical biomarkers (liver, kidney, and metabolic health) to calculate a unified SystemAge. This holistic dashboard ensures you optimize your whole body, not just one biomarker.',
      howItWorks: [
        'Multi-System Testing: Standard blood markers are combined with epigenetic and glycan raw data.',
        'Data Integration: The platform aligns different biometric timescales to normalize calculations.',
        'Pathway Correlation: Analyzes how lifestyle changes (like diet or sleep) impact multiple clocks simultaneously.',
        'Actionable Precision Mapping: Delivers tailored compound, dietary, and exercise prescriptions based on your slowest-aging organ.'
      ],
      metrics: [
        { label: 'Integrated Clocks', value: '3 Platforms', desc: 'Combines Epigenetics, Glycobiology, and standard clinical chemistry for full-spectrum analysis.' },
        { label: 'Personal Dashboard', value: 'SystemAge', desc: 'A normalized average of all biological markers showing where your body sits compared to your birthdays.' },
        { label: 'Testing Frequency', value: 'Every 6 Months', desc: 'The ideal window to observe and confirm how your daily habits are altering cellular velocity.' }
      ],
      symptoms: 'Feeling like your overall energy levels don\'t match your chronological age, or experiencing "plateaus" where your fitness habits stop yielding obvious changes.',
      goldenRule: 'Track, test, and adapt. Use objective data to evaluate your longevity stack, and stop spending money on supplements that aren\'t moving your metrics.',
      lifestyleTriggers: [
        'Data-Driven Supplementation: Adjusting dosages based on regular blood and methylation tracking.',
        'Organ-Specific Workouts: Alternate Zone 2 cardio (mitochondria) and resistance work (glycans/strength).',
        'Circadian Synchronization: Aligning light exposure and feeding windows to optimize systemic cellular rhythm.'
      ],
      mythVsReality: {
        myth: 'Once I get my biological age score, I only need to test once every few years.',
        reality: 'Epigenetic switches and glycan coatings react dynamically. Testing every 6 months is the optimal clinical window to see if a specific intervention—like a new sleep protocol or NAD+ precursor—is actually working.'
      }
    }
  };

  const activeData = data[activeTab];

  // Helper functions to render custom visual graphics for each tab
  const renderVisual = () => {
    switch (activeTab) {
      case 'methylation':
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto text-indigo-400">
            <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(99, 102, 241, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
            
            {/* DNA Helix */}
            <g transform="translate(100, 50)">
              <path d="M50,40 Q100,-10 150,40 T250,40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M50,120 Q100,170 150,120 T250,120" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
              
              {/* Connecting rungs */}
              {[70, 95, 120, 145, 170, 195, 220].map((x, i) => {
                const y1 = 40 + Math.sin((x - 50) * (Math.PI / 100)) * 25;
                const y2 = 120 - Math.sin((x - 50) * (Math.PI / 100)) * 25;
                return (
                  <line key={i} x1={x} y1={y1} x2={x} y2={y2} stroke="currentColor" strokeWidth="2" opacity="0.3" />
                );
              })}

              {/* Methyl Group Tags (The switches) */}
              <motion.g
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="100" cy="20" r="10" fill="#10b981" />
                <text x="100" y="23" textAnchor="middle" fill="#020617" className="text-[8px] font-black">CH3</text>
                <line x1="100" y1="30" x2="100" y2="40" stroke="#10b981" strokeWidth="2" />
              </motion.g>

              <motion.g
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="180" cy="140" r="10" fill="#ef4444" />
                <text x="180" y="143" textAnchor="middle" fill="#020617" className="text-[8px] font-black">CH3</text>
                <line x1="180" y1="120" x2="180" y2="130" stroke="#ef4444" strokeWidth="2" />
              </motion.g>
            </g>

            {/* Speedometer Graphics */}
            <g transform="translate(100, 240)">
              <path d="M30,80 A90,90 0 0,1 170,80" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" strokeLinecap="round" />
              <path d="M30,80 A90,90 0 0,1 100,10" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
              
              {/* Needle */}
              <motion.g
                animate={{ rotate: [-20, -40, -20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: '100px 80px' }}
              >
                <line x1="100" y1="80" x2="60" y2="35" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="80" r="8" fill="#ffffff" />
              </motion.g>

              <text x="100" y="110" textAnchor="middle" fill="#10b981" className="text-xl font-display font-black">0.82 PACE</text>
              <text x="100" y="130" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-black uppercase tracking-wider">Optimum Aging Velocity</text>
            </g>
          </svg>
        );
      case 'glycanage':
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto text-emerald-400">
            <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(16, 185, 129, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
            
            {/* Antibody IgG structure */}
            <g transform="translate(100, 80)">
              {/* Left arm */}
              <path d="M40,30 L80,90 L100,120" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M20,40 L60,100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
              <line x1="40" y1="70" x2="52" y2="88" stroke="currentColor" strokeWidth="2" />
              
              {/* Right arm */}
              <path d="M160,30 L120,90 L100,120" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M180,40 L140,100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
              <line x1="160" y1="70" x2="148" y2="88" stroke="currentColor" strokeWidth="2" />

              {/* Stem */}
              <path d="M100,120 L100,200" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              
              {/* Glycans (Sugars coating antibodies) */}
              <motion.g
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                transform="translate(10, 10)"
              >
                {/* Hexagons representing sugar chains */}
                <circle cx="20" cy="15" r="8" fill="#3b82f6" />
                <circle cx="160" cy="15" r="8" fill="#3b82f6" />
                <line x1="20" y1="15" x2="30" y2="25" stroke="#3b82f6" strokeWidth="2" />
                <line x1="160" y1="15" x2="150" y2="25" stroke="#3b82f6" strokeWidth="2" />
              </motion.g>

              <motion.g
                animate={{ scale: [1.1, 1, 1.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                transform="translate(10, 10)"
              >
                {/* Red/Yellow sugars = Pro-inflammatory */}
                <circle cx="85" cy="190" r="7" fill="#f43f5e" />
                <circle cx="115" cy="190" r="7" fill="#10b981" />
                <line x1="85" y1="190" x2="100" y2="180" stroke="#f43f5e" strokeWidth="2" />
                <line x1="115" y1="190" x2="100" y2="180" stroke="#10b981" strokeWidth="2" />
              </motion.g>
            </g>

            {/* Glowing alert ring */}
            <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="2" strokeDasharray="5 5" />
            <text x="200" y="340" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">Immunological Glycan Shield</text>
          </svg>
        );
      case 'bioage-hub':
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto text-indigo-400">
            <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(99, 102, 241, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
            
            {/* Concentric diagnostic rings */}
            <g transform="translate(200, 200)">
              {/* Outer Ring: DNA Methylation */}
              <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="6" />
              <motion.circle
                cx="0"
                cy="0"
                r="100"
                fill="none"
                stroke="#6366f1"
                strokeWidth="6"
                strokeDasharray="628"
                animate={{ strokeDashoffset: [628, 150] }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />

              {/* Middle Ring: Glycan Inflammation */}
              <circle cx="0" cy="0" r="75" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="6" />
              <motion.circle
                cx="0"
                cy="0"
                r="75"
                fill="none"
                stroke="#10b981"
                strokeWidth="6"
                strokeDasharray="471"
                animate={{ strokeDashoffset: [471, 90] }}
                transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
              />

              {/* Inner Ring: Clinical Biomarkers */}
              <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="6" />
              <motion.circle
                cx="0"
                cy="0"
                r="50"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="6"
                strokeDasharray="314"
                animate={{ strokeDashoffset: [314, 45] }}
                transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
              />

              {/* Glowing core indicator */}
              <circle cx="0" cy="0" r="30" fill="rgba(99, 102, 241, 0.2)" />
              <motion.circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <Activity size={18} className="text-white absolute" style={{ transform: 'translate(-9px, -9px)' }} />
            </g>

            {/* Labels on the rings */}
            <text x="200" y="85" textAnchor="middle" fill="#6366f1" className="text-[8px] font-black uppercase tracking-wider">DNA Methylation (PACE)</text>
            <text x="200" y="112" textAnchor="middle" fill="#10b981" className="text-[8px] font-black uppercase tracking-wider">Glycan Inflammation</text>
            <text x="200" y="138" textAnchor="middle" fill="#f59e0b" className="text-[8px] font-black uppercase tracking-wider">Clinical Blood Markers</text>

            <text x="200" y="345" textAnchor="middle" fill="#94a3b8" className="text-xs font-semibold uppercase tracking-widest font-display">Integrated SystemAge Core</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
      {/* Cinematic Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48">
        {/* Back Link */}
        <Link to="/health/cellular" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-16 transition-all group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="border-b border-white/10 group-hover:border-white">Back to Cellular Engineering</span>
        </Link>

        {/* Hero Section */}
        <div className="max-w-5xl mb-20">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-2xl backdrop-blur-md">
            <FlaskConical size={14} className="mr-3 animate-pulse" />
            Biological Age diagnostics
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            Epigenetic<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
              Tracking & Clocks
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-3xl">
            Understand your pace of aging. Explore how advanced 3rd-generation epigenetic clocks, antibody glycans, and clinical markers measure cellular decay to optimize your longevity stack.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-16 p-2 bg-slate-950/40 border border-white/5 rounded-[2.5rem] backdrop-blur-md max-w-4xl">
          {[
            { id: 'methylation', label: 'Methylation', icon: Dna },
            { id: 'glycanage', label: 'GlycanAge', icon: Shield },
            { id: 'bioage-hub', label: 'Bio-Age Hub', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as TabId)}
                className={`relative py-5 px-3 md:px-8 rounded-[2rem] font-display font-black text-[10px] md:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border border-indigo-500/30 text-white shadow-2xl shadow-indigo-500/5'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Icon size={16} className={isSelected ? 'text-indigo-400' : 'text-slate-600'} />
                <span>{tab.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0f172a] border border-white/5 rounded-[4rem] p-8 md:p-16 shadow-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.06)_0%,transparent_50%)] pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Textual & Science Details */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 font-display">
                    {activeData.subtitle}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight mt-6 mb-4">
                    {activeData.title}
                  </h2>
                  <p className="text-base text-slate-400 leading-relaxed font-semibold">
                    {activeData.tagline}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display flex items-center gap-2">
                    <Info size={14} className="text-indigo-400" />
                    How it works in plain English
                  </h4>
                  <p className="text-slate-300 text-base leading-relaxed font-medium">
                    {activeData.overview}
                  </p>
                </div>

                {/* Metrics / KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                  {activeData.metrics.map((metric, i) => (
                    <div key={i} className="p-6 bg-slate-950/20 rounded-3xl border border-white/5 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display">
                        {metric.label}
                      </span>
                      <div className="text-2xl font-display font-black text-white">
                        {metric.value}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                        {metric.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Everyday Sluggishness and Golden Rule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                  <div className="p-6 bg-slate-950/20 rounded-3xl border border-white/5 space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 font-display flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                      Everyday Symptoms & Warning Signs
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {activeData.symptoms}
                    </p>
                  </div>

                  <div className="p-6 bg-slate-950/20 rounded-3xl border border-white/5 space-y-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-display flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      The Golden Rule
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {activeData.goldenRule}
                    </p>
                  </div>
                </div>

                {/* Myth vs Reality */}
                <div className="p-8 bg-slate-950/30 rounded-[2.5rem] border border-white/5 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display flex items-center gap-2">
                    <Flame size={14} className="text-amber-500" />
                    Myth vs. Science
                  </h4>
                  <div className="space-y-4">
                    <div className="text-xs leading-relaxed font-medium text-rose-400/90">
                      <strong className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Myth:</strong>
                      "{activeData.mythVsReality.myth}"
                    </div>
                    <div className="text-xs leading-relaxed font-medium text-emerald-400/90">
                      <strong className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Scientific Fact:</strong>
                      {activeData.mythVsReality.reality}
                    </div>
                  </div>
                </div>

                {/* How It Works Step-by-Step */}
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">How It Works Step-by-Step</h4>
                  <div className="space-y-4">
                    {activeData.howItWorks.map((step, idx) => (
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
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">How to Upregulate Naturally</h4>
                  <div className="space-y-3">
                    {activeData.lifestyleTriggers.map((trigger, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-300 font-medium">
                          {trigger}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphic Visual Representation (Right Sidebar) */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
                <div className="text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-display block mb-1">Interactive Diagnostic Model</span>
                  <p className="text-slate-500 text-xs font-medium">Visualizing Cellular Aging Pathway</p>
                </div>

                <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-4 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none"></div>
                  {renderVisual()}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
