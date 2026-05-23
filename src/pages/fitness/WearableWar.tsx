import React, { useEffect } from 'react';
import { ArrowLeft, Cpu, Shield, Zap, Info, ExternalLink, BarChart3, Binary, Activity, Gauge, Disc, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';

export default function WearableWar() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('fww_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    whoop: 'https://amazon.com/dp/B0CXM1X8PQ',
    polar: 'https://amazon.com/dp/B07PM1GY1F'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none z-0"></div>
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
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            2026 Hardware Integrity
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            {t('fww_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-blue-500/50 pl-8 text-left"
          >
            {t('fww_intro')} In plain English, we look beyond the marketing hype to understand how wearable sensors actually read your body's recovery signals to optimize your daily stress.
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
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">Navigating Wearable Technology</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Modern smart rings and wristbands gather high-resolution biometrics directly from your skin. However, a tracker is only as good as the software translating that raw data.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                The core metric for physical recovery is <strong>Heart Rate Variability (HRV)</strong>. HRV measures the tiny, millisecond differences in time between each heartbeat. When you are well-rested, your heartbeat spacing is highly variable and unpredictable (high HRV). When your nervous system is exhausted, your heart beats like a rigid metronome (low HRV).
              </p>
            </div>

            {/* Everyday Symptoms of Overtraining */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-rose-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                  Signs of Overtraining
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    A sudden, persistent drop in your daily HRV scores.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    Resting heart rate (RHR) rising 5-10 beats above baseline.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    Feeling physically heavy and sluggish during warmups.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  Poor Sleep Indicators
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Lacking restorative Deep and REM sleep stages.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    High wake-up count during the night (fragmented sleep).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Waking up feeling unrefreshed and mentally cloudy.
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
                  <strong>Let the nervous system command.</strong> If your weekly average HRV drops more than 15% below your rolling baseline, swap out intensive strength or anaerobic training for light aerobic mobility or sleep.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "A perfectly steady, metronome-like resting heart rate is a sign of high fitness."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    The opposite is true. A healthy, recovered heart constantly adjusts spacing to meet micro-demands. High variation (high HRV) shows metabolic adaptability. A perfectly rigid pulse indicates chronic stress and autonomic exhaustion.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 font-display block mb-1">Interactive Telemetry</span>
              <p className="text-slate-500 text-xs font-medium">Capillary Light Pulse & HRV Waveforms</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(59, 130, 246, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* Capillary vessel with flowing red blood cell pulses */}
                <path d="M 30,120 L 370,120" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="16" strokeLinecap="round" />
                <motion.g
                  animate={{ x: [-80, 320] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="100" cy="120" r="5" fill="#f87171" />
                  <circle cx="140" cy="120" r="5" fill="#f87171" />
                  <circle cx="200" cy="120" r="5" fill="#f87171" />
                </motion.g>

                {/* Optical sensor light beam (PPG) */}
                <g transform="translate(200, 60)">
                  <polygon points="190,0 210,0 225,50 175,50" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                  <circle cx="200" cy="5" r="4" fill="#3b82f6" />
                  <text x="200" y="-10" textAnchor="middle" fill="#3b82f6" className="text-[8px] font-black uppercase tracking-widest font-display">Optical PPG Beam</text>
                </g>

                {/* HRV ECG Waveform with unequal spacing (Healthy variability) */}
                <g transform="translate(50, 240)">
                  <path d="M 0,0 L 40,0 L 45,-15 L 50,20 L 55,-35 L 60,0 L 120,0 L 125,-15 L 130,20 L 135,-35 L 140,0 L 220,0 L 225,-15 L 230,20 L 235,-35 L 240,0 L 300,0" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Spacing indicator overlays */}
                  <line x1="55" y1="20" x2="135" y2="20" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="135" y1="20" x2="235" y2="20" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="95" y="32" textAnchor="middle" fill="#94a3b8" className="text-[7px] font-bold">800ms</text>
                  <text x="185" y="32" textAnchor="middle" fill="#94a3b8" className="text-[7px] font-bold">1000ms</text>
                  <text x="150" y="-55" textAnchor="middle" fill="#10b981" className="text-[9px] font-black uppercase tracking-widest font-display">High HRV (Healthy)</text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Real-Time Pulse Interval Sensing</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                PPG sensors emit light to track capillary dilation. Software measures millisecond intervals between pulses, generating your autonomic recovery scores.
              </p>
            </div>
          </div>

        </div>

        {/* HRV Tracking Protocol */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Activity size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              HRV Tracking Protocol
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            A structured framework designed to translate daily sensor readings into optimal physical performance and long-term joint health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { phase: "Phase 1: Baseline", focus: "Weeks 1-2", metric: "Establish Ranges", detail: "Wear your tracker consistently. Establish your baseline resting heart rate (RHR) and average HRV without changing your training habits." },
              { phase: "Phase 2: Sleep Sync", focus: "Weeks 3-4", metric: "Staging Targets", detail: "Focus on sleep architecture. Aim for 90+ minutes of combined deep and REM sleep. Match your sleep performance to daily stress scores." },
              { phase: "Phase 3: Strain Match", focus: "Weeks 5-8", metric: "Calibrate Load", detail: "Match workout intensity to recovery. On high-HRV days, push hypertrophy or VO2 max. On low-HRV days, prioritize active mobility." },
              { phase: "Phase 4: Optimization", focus: "Weeks 12+", metric: "Adaptability Index", detail: "Assess progress. Look for long-term drops in resting heart rate and positive shifts in baseline HRV curves under stress." }
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

        {/* Hardware & Recovery Stack */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">Vetted Telemetry</span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                The Hardware Stack
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-blue-500/20 pb-4">
              Tier-1 Biometric Telemetry Tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Whoop Strap 4.0", desc: "Wrist/arm sensor offering continuous strain monitoring and sleep stage evaluation based on clinical HRV modeling.", link: affiliateLinks.whoop, label: "Whoop", highlight: "Continuous Strain" },
              { name: "Polar H10 Chest Strap", desc: "Gold standard electrocardiogram (ECG) chest strap for ultra-precise heart rate and raw HRV recording.", link: affiliateLinks.polar, label: "Polar H10", highlight: "ECG Precision" }
            ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[3rem] hover:border-blue-500/30 hover:shadow-2xl transition-all group gap-6">
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-black uppercase text-blue-400 tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.highlight}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-black uppercase text-white group-hover:text-blue-400 transition-colors">{item.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 self-end md:self-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
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
                term: "HRV (Heart Rate Variability)",
                meaning: "The millisecond differences in timing between consecutive heartbeats. Higher variability indicates a well-rested autonomic nervous system ready for strain; lower variability signals chronic stress."
              },
              {
                term: "Autonomic Nervous System",
                meaning: "The background control network regulating automated functions (heart rate, breathing, digestion), divided into Sympathetic (action/stress) and Parasympathetic (repair/rest)."
              },
              {
                term: "Optical Sensing (PPG)",
                meaning: "Photoplethysmography. Light-emitting sensors that track volume changes in capillary vessels to calculate heart rate and pulse curves."
              },
              {
                term: "Contextual Readiness",
                meaning: "A summary metric combining sleep staging, HRV, rest, and activity metrics to calculate daily stress-bearing capacity."
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
