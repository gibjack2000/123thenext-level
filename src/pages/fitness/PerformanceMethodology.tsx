import React, { useEffect } from 'react';
import { ArrowLeft, Zap, Thermometer, Shield, Info, ExternalLink, Timer, TrendingUp, Sun, Snowflake, Target, Gauge, Activity, BookOpen, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useT } from '../../translations';

export default function PerformanceMethodology() {
  const t = useT();
  const [activeProtocol, setActiveProtocol] = React.useState<'deconditioning' | 'grayzone' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('hpm_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CMB6X8Y1',
    uk: 'https://amazon.co.uk/dp/B0CMB6X8Y1',
    sauna: 'https://amazon.com/dp/B0CMB6X8Y1',
    plunge: 'https://amazon.com/dp/B0CXM1X8PQ'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.12),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/fitness" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Fitness Hub</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Cardiovascular Precision
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            {t('hpm_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-indigo-500/50 pl-8 text-left"
          >
            {t('hpm_intro')} In plain English, we divide cardiorespiratory training into two extremes: 80% low-intensity Zone 2 work to build energy engines, and 20% high-intensity Zone 5 work to boost peak heart capacity.
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
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">What is Polarized Training?</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Polarized training is the gold standard for developing elite cardiorespiratory fitness. By keeping 80% of your workouts at a low-intensity, steady rate (Zone 2) and 20% at maximum intensity (Zone 5), you avoid the 'gray zone' of moderate fatigue.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                This approach allows your cells to build massive networks of healthy <strong>mitochondria</strong> (cellular powerplants) without stressing your autonomic nervous system. Zone 2 builds the endurance engine, while Zone 5 trains your heart's stroke volume and VO2 max.
              </p>
            </div>

            {/* Everyday Symptoms of Deconditioning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setActiveProtocol('deconditioning')}
                className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4 hover:bg-indigo-955/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer group"
              >
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 font-display flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  Aerobic Deconditioning
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1 font-bold">•</span>
                    Running out of breath going up a single flight of stairs.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1 font-bold">•</span>
                    Heart rate staying elevated for a long time after stopping work.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1 font-bold">•</span>
                    Feeling physically exhausted from basic daily activities.
                  </li>
                </ul>
                <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 mt-4 inline-block">Open Protocol Details →</span>
              </div>

              <div 
                onClick={() => setActiveProtocol('grayzone')}
                className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4 hover:bg-violet-955/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer group"
              >
                <h4 className="text-xs font-black uppercase tracking-widest text-violet-400 font-display flex items-center gap-2 group-hover:text-violet-300 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                  Gray Zone Fatigue
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Constant muscle stiffness that never fully recovers.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Catching colds easily (suppressed immune function).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1 font-bold">•</span>
                    Your fitness plateauing despite working out hard every day.
                  </li>
                </ul>
                <span className="text-[9px] font-mono uppercase tracking-widest text-violet-400 mt-4 inline-block">Open Protocol Details →</span>
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
                  <strong>Keep easy sessions easy, and hard sessions hard.</strong> Build your metabolic engine in Zone 2 (easy enough to hold a conversation), and expand heart capacity in Zone 5. Avoid the gray zone of moderate stress.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "To build cardiovascular fitness, you must push yourself to sweat and pant heavily in every single workout."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Working moderately hard all the time exhausts your nervous system without triggering mitochondrial growth. Elite athletes do 80% of their work in low-intensity zones because it stimulates the growth of new cell engines while preserving raw recovery.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 font-display block mb-1">Interactive Balance</span>
              <p className="text-slate-500 text-xs font-medium">80/20 Polarized Training Ratio Scale</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(99, 102, 241, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* Scale beam */}
                <path d="M 50,220 L 350,220" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="4" />
                {/* Fulcrum (Triangle at center) */}
                <polygon points="200,220 185,250 215,250" fill="#94a3b8" />
                <text x="200" y="275" textAnchor="middle" fill="#94a3b8" className="text-[8px] font-black uppercase tracking-widest font-display">Aerobic Homeostasis</text>

                {/* Left side: 80% Volume - Zone 2 (Steady wave block) */}
                <g transform="translate(100, 160)">
                  <motion.rect 
                    x="-35" y="-30" width="70" height="60" rx="10" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="0" y="-38" textAnchor="middle" fill="#10b981" className="text-[10px] font-black font-display">80% VOLUME</text>
                  <text x="0" y="5" textAnchor="middle" fill="#ffffff" className="text-[11px] font-bold">ZONE 2</text>
                  <text x="0" y="18" textAnchor="middle" fill="#10b981" className="text-[8px] font-medium tracking-wide">Aerobic Base</text>
                </g>

                {/* Right side: 20% Volume - Zone 5 (Sharp spike block) */}
                <g transform="translate(300, 160)">
                  <motion.rect 
                    x="-35" y="-30" width="70" height="60" rx="10" fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="2"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="0" y="-38" textAnchor="middle" fill="#6366f1" className="text-[10px] font-black font-display">20% VOLUME</text>
                  <text x="0" y="5" textAnchor="middle" fill="#ffffff" className="text-[11px] font-bold">ZONE 5</text>
                  <text x="0" y="18" textAnchor="middle" fill="#6366f1" className="text-[8px] font-medium tracking-wide">Peak Output</text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Polarized Base to Peak Scale</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                The massive Zone 2 base supports high-intensity Zone 5 intervals, protecting recovery pathways while safely lifting maximum physical performance.
              </p>
            </div>
          </div>

        </div>

        {/* 80/20 Polarized Protocol */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <Timer size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              The 80/20 Protocol
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            {t('hpm_polarized_p')} Keeping training polarized develops clean cellular aerobic capacity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "Step 1", title: "Establish Limits", metric: "Map Heart Rates", detail: "Find your Zone 2 heart rate limit (typically 180 minus age) and your Zone 5 maximum heart rate threshold." },
              { phase: "Step 2", title: "Aerobic Base", metric: "80% Zone 2 Volume", detail: "Perform low-intensity cardio 3-4 times a week, staying strictly below your Zone 2 heart rate limit." },
              { phase: "Step 3", title: "Peak Output", metric: "20% Zone 5 Spikes", detail: "Complete 1 session of high-intensity intervals weekly, pushing your heart rate to maximum limits." },
              { phase: "Step 4", title: "Thermic Reset", metric: "Sauna & Cold plunging", detail: "Saunas trigger cellular repair, while cold plunges lower systemic inflammation post-exercise." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-indigo-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4 block">{step.phase}</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-indigo-400 transition-colors">{step.title}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{step.metric}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Recovery Thermodynamics */}
        <section className="bg-slate-900/50 border border-white/5 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-3xl mb-32">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black text-xs uppercase tracking-widest mb-8">
                <Thermometer size={14} /> Recovery Thermodynamics
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none mb-8">
                {t('hpm_recovery_title')}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                {t('hpm_recovery_p')} Strategic cold and heat application modulates your nervous system to speed repair.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0f172a] p-10 rounded-[3rem] border border-white/5 hover:bg-slate-900 transition-colors group relative">
                <Link to="/fitness/recovery/cold-immersion" className="absolute inset-0 z-20 cursor-pointer" />
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform relative z-10">
                  <Snowflake size={32} />
                </div>
                <h4 className="text-2xl font-display font-black uppercase text-white mb-4 relative z-10">Cold Immersion</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic relative z-10">Autonomic Norepinephrine Release</p>
                <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-500/20 relative z-10">
                  Avoid immediately after muscle hypertrophy sessions
                </div>
              </div>

              <div className="bg-[#0f172a] p-10 rounded-[3rem] border border-white/5 hover:bg-slate-900 transition-colors group relative">
                <Link to="/fitness/recovery/infrared-sauna" className="absolute inset-0 z-20 cursor-pointer" />
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform relative z-10">
                  <Sun size={32} />
                </div>
                <h4 className="text-2xl font-display font-black uppercase text-white mb-4 relative z-10">Infrared Sauna</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic relative z-10">HSP Cellular Folding Repair</p>
                <div className="p-4 bg-orange-500/10 rounded-xl text-orange-400 text-xs font-black uppercase tracking-widest border border-orange-500/20 relative z-10">
                  Ideal for evening metabolic conditioning
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Thermic Arsenal Stack */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">Thermic Arsenal</span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                The Recovery Stack
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-indigo-500/20 pb-4">
              Tier-1 Recovery Thermodynamics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Clearlight Infrared Sauna", desc: "Infrared heat therapy targeting deep cellular repair, mitochondrial health, and cardiorespiratory load.", link: affiliateLinks.sauna, label: "Infrared Sauna", highlight: "Heat Shock Proteins" },
              { name: "Plunge Cold Tub", desc: "High-precision commercial ice bath designed for daily autonomic resetting and systemic inflammation control.", link: affiliateLinks.plunge, label: "Cold Plunge", highlight: "Norepinephrine Reset" }
            ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[3rem] hover:border-indigo-500/30 hover:shadow-2xl transition-all group gap-6">
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-black uppercase text-indigo-400 tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.highlight}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-black uppercase text-white group-hover:text-indigo-400 transition-colors">{item.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 self-end md:self-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <ExternalLink size={18} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32">
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
                term: "Polarized Training",
                meaning: "A cardiorespiratory training method where 80% of volume is kept at a low-intensity (Zone 2) and 20% at a high-intensity (Zone 5), avoiding moderate stress."
              },
              {
                term: "Zone 2 Aerobic",
                meaning: "Steady cardiovascular training where muscles burn fat and oxygen for fuel, driving the growth of clean, efficient mitochondrial powerplants."
              },
              {
                term: "Zone 5 Peak",
                meaning: "Maximum capacity workouts pushing heart rate above 90%, developing heart stroke volume and maximum oxygen absorption (VO2 Max)."
              },
              {
                term: "Heat Shock Proteins (HSPs)",
                meaning: "Special helper proteins made by cells in response to heat stress (like saunas) that repair folded and damaged protein structures."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-indigo-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Protocol Details Modal */}
      <AnimatePresence>
        {activeProtocol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-955/90 backdrop-blur-md"
            onClick={() => setActiveProtocol(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-indigo-500/30 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProtocol(null)}
                className="absolute top-8 right-8 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer focus:outline-none"
              >
                <X size={20} />
              </button>

              {activeProtocol === 'deconditioning' ? (
                <div>
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20">
                    <Activity size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    Aerobic Deconditioning
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-8 block">
                    Mitochondrial Rebuilding & Basic Aerobic Progression
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Aerobic deconditioning occurs when inactivity reduces your mitochondrial density and lungs' oxygen capacity, leading to rapid shortness of breath and high resting heart rates. Rebuilding requires slow, progressive load.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Nasal-Only Low Strain", desc: "Begin with 20 minutes of daily nasal-only breathing walks, keeping your pace slow enough to maintain a conversation." },
                      { step: "02", title: "Gradual Volume Scaling", desc: "Increase your total walking/cycling time by 10% each week, aiming to hit a baseline of 120 minutes weekly before introducing intensity." },
                      { step: "03", title: "Autonomic Pulse Checks", desc: "Track how quickly your heart rate drops to rest after finishing. A faster drop indicates a restoring cardiovascular response." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
                        <div>
                          <h4 className="text-white font-bold uppercase text-sm mb-1">{step.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-violet-500/10 rounded-3xl flex items-center justify-center text-violet-400 mb-8 border border-violet-500/20">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    Gray Zone Fatigue
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-8 block">
                    Moderate Fatigue Recovery & Training Calibration
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Gray zone fatigue is caused by spending too much time in moderate-intensity workouts, which stresses the autonomic system without triggering either the endurance benefits of Zone 2 or the peak gains of Zone 5.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Polarized Load Split", desc: "Enforce a strict training boundary: keep 80% of weekly sessions under 140 BPM, and limit 20% to short, maximum-intensity intervals." },
                      { step: "02", title: "Autonomic Nervous Rest", desc: "Dedicate 2 full days per week to active recovery, focusing on structural mobility and deep tissue blood flow without heart rate spikes." },
                      { step: "03", title: "Inflammatory Biomarker Audit", desc: "Monitor joints for chronic soreness. Suppressing moderate gray-zone training allows systemic inflammation markers to drop." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
                        <div>
                          <h4 className="text-white font-bold uppercase text-sm mb-1">{step.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
