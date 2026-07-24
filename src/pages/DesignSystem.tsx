import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Shield, Zap, Heart, Activity, Thermometer, Compass, Sparkles, Copy, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DesignSystem() {
  const [paradigm, setParadigm] = useState<'sickcare' | 'wellness'>('wellness');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = {
    slateGrey: [
      { name: 'slate-grey-950', hex: '#090c10', desc: 'Primary deep background' },
      { name: 'slate-grey-900', hex: '#0d1117', desc: 'Secondary section background' },
      { name: 'slate-grey-800', hex: '#151a22', desc: 'Card elevation background' },
      { name: 'slate-grey-700', hex: '#1d2430', desc: 'Borders & dividers' },
      { name: 'slate-grey-600', hex: '#293241', desc: 'Muted text & secondary inputs' },
      { name: 'slate-grey-400', hex: '#5c6f8c', desc: 'Placeholder text' },
      { name: 'slate-grey-200', hex: '#cbd5e1', desc: 'Primary body typography' },
    ],
    sickCare: [
      { name: 'sickcare-800', hex: '#0f172a', desc: 'Desaturated clinical background' },
      { name: 'sickcare-500', hex: '#475569', desc: 'Muted traditional medical accent' },
      { name: 'sickcare-400', hex: '#64748b', desc: 'De-energized secondary tone' },
    ],
    wellness: [
      { name: 'wellness-cyan', hex: '#06b6d4', desc: 'High-vitality proactive cyan' },
      { name: 'wellness-cyan-light', hex: '#22d3ee', desc: 'Cyan glow & hover highlight' },
      { name: 'wellness-amber', hex: '#f59e0b', desc: 'Warm morning amber (Longevity)' },
      { name: 'wellness-amber-light', hex: '#fbbf24', desc: 'Amber glow & hover highlight' },
    ]
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-grey-950 text-slate-200 py-24 md:py-32 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-wellness-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-wellness-amber/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link & Header */}
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-slate-grey-400 hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} className="mr-2" />
            Back to Home
          </Link>
          <div className="border-l-2 border-wellness-cyan/80 pl-6 md:pl-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-wellness-cyan block mb-2">Systems Architecture</span>
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white leading-none mb-4">
              Visual Design System
            </h1>
            <p className="text-slate-grey-300 max-w-[65ch] text-base md:text-lg leading-relaxed font-light">
              Built specifically for <strong>123TheNextLevel</strong>. This system outlines the transitions between desaturated traditional sick-care paradigms and high-vitality proactive human performance.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 1: THE PARADIGM SHIFT TRANSITION */}
        {/* ---------------------------------------------------- */}
        <section className="mb-24 pt-12 border-t border-slate-grey-800">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-wellness-amber block mb-2">Core Interaction</span>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              01 // Proactive Longevity Paradigm Transition
            </h2>
            <p className="text-slate-grey-400 text-sm max-w-[60ch] mt-1">
              Toggle the paradigm mode below to witness the shift from traditional reactive diagnostics to active human performance optimization.
            </p>
          </div>

          {/* Paradigm Control Switch */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-grey-900 border border-slate-grey-700 p-1.5 rounded-2xl flex items-center shadow-inner relative">
              <button 
                onClick={() => setParadigm('sickcare')}
                className={`relative px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-500 z-10 ${
                  paradigm === 'sickcare' ? 'text-white' : 'text-slate-grey-400 hover:text-slate-grey-200'
                }`}
              >
                Traditional Sick-Care
              </button>
              <button 
                onClick={() => setParadigm('wellness')}
                className={`relative px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-500 z-10 ${
                  paradigm === 'wellness' ? 'text-white' : 'text-slate-grey-400 hover:text-slate-grey-200'
                }`}
              >
                Proactive Wellness
              </button>

              {/* Indicator Background slider */}
              <motion.div 
                className={`absolute top-1.5 bottom-1.5 rounded-xl ${
                  paradigm === 'sickcare' 
                    ? 'bg-slate-grey-700 border border-slate-grey-600' 
                    : 'bg-gradient-to-r from-wellness-cyan to-indigo-600'
                }`}
                layoutId="activeParadigmBg"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  left: paradigm === 'sickcare' ? '6px' : 'calc(50% + 3px)',
                  width: 'calc(50% - 9px)',
                }}
              />
            </div>
          </div>

          {/* Paradigm Showcase Area */}
          <div className="relative rounded-[2rem] overflow-hidden border border-slate-grey-700 transition-all duration-700 shadow-2xl">
            {/* Background color block driven by paradigm */}
            <motion.div 
              className="absolute inset-0 z-0 transition-colors duration-700"
              animate={{ 
                backgroundColor: paradigm === 'sickcare' ? '#0f172a' : '#0d1117' 
              }}
            />

            {/* Glowing radial dots */}
            <AnimatePresence mode="wait">
              {paradigm === 'wellness' ? (
                <motion.div 
                  key="wellness-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none"
                />
              ) : (
                <motion.div 
                  key="sickcare-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.05 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(100,116,139,0.2)_0%,transparent_65%)] pointer-events-none"
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Content Panel */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] border transition-colors duration-500 bg-slate-grey-900/60 border-slate-grey-700">
                  <motion.span 
                    animate={{ color: paradigm === 'sickcare' ? '#94a3b8' : '#06b6d4' }}
                    className="flex items-center gap-1.5 font-bold"
                  >
                    {paradigm === 'sickcare' ? <Shield size={12} /> : <Zap size={12} />}
                    {paradigm === 'sickcare' ? 'Reactive Paradigm' : 'Proactive Optimization'}
                  </motion.span>
                </div>

                <div className="space-y-3">
                  <motion.h3 
                    layout
                    className="text-3xl md:text-4xl font-display uppercase tracking-tight text-white leading-tight"
                  >
                    {paradigm === 'sickcare' ? (
                      <>Mitigating Symptoms <br /><span className="text-sickcare-400">After the Fact</span></>
                    ) : (
                      <>Engineering Longevity <br /><span className="text-gradient bg-gradient-to-r from-wellness-cyan to-wellness-amber bg-clip-text text-transparent">Before Degeneration</span></>
                    )}
                  </motion.h3>
                  
                  <motion.p 
                    layout
                    className="text-slate-grey-300 text-sm leading-relaxed"
                  >
                    {paradigm === 'sickcare' ? (
                      "Traditional medicine prioritizes treating chronic conditions once symptoms present. Interventions focus on clinical stabilization, symptom suppression, and reactive prescription protocols. The visual identity here is moody, desaturated cool blue representing compliance, caution, and clinical environments."
                    ) : (
                      "Proactive longevity uses actionable epigenetic tracking, real-time biosensing, VO2 max optimization, and autonomic engineering. True wellness builds cellular resilience and optimizes human performance to extend healthspan. Visually represented by electric cyan and energetic morning amber."
                    )}
                  </motion.p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  {paradigm === 'sickcare' ? (
                    <button className="px-6 py-3.5 bg-sickcare-600 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-default shadow">
                      Clinical Stabilization
                    </button>
                  ) : (
                    <>
                      <motion.button 
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3.5 bg-gradient-to-r from-wellness-cyan to-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-wellness-cyan/20 border border-wellness-cyan/20 cursor-pointer"
                      >
                        Optimize Cellular Health
                      </motion.button>
                      <motion.button 
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3.5 bg-slate-grey-800 text-slate-grey-200 hover:text-white border border-slate-grey-700 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        Explore Biomarkers
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              {/* Data Dashboard Panel */}
              <div className="lg:col-span-6 bg-slate-grey-900/60 backdrop-blur border border-slate-grey-700/80 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-grey-700/60 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-grey-300">Biometric Metrics Dashboard</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-wellness-cyan"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-wellness-cyan"></span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Metric 1 */}
                  <div className="p-4 bg-slate-grey-800/40 rounded-xl border border-slate-grey-700">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-400 block mb-1">Paradigm Target</span>
                    <motion.div 
                      key={paradigm === 'sickcare' ? 'reactive' : 'proactive'}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-1.5"
                    >
                      {paradigm === 'sickcare' ? (
                        <span className="text-sickcare-400">Reactive Care</span>
                      ) : (
                        <span className="text-wellness-cyan">Longevity Extension</span>
                      )}
                    </motion.div>
                    <span className="text-[10px] text-slate-grey-300 block mt-1">
                      {paradigm === 'sickcare' ? 'Manage chronic conditions' : 'Reversal of cellular age'}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 bg-slate-grey-800/40 rounded-xl border border-slate-grey-700">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-400 block mb-1">Target Healthspan</span>
                    <motion.div 
                      key={paradigm === 'sickcare' ? '80' : '95'}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-display font-medium text-white"
                    >
                      {paradigm === 'sickcare' ? '76.4 Years' : '92.5+ Years'}
                    </motion.div>
                    <span className="text-[10px] text-slate-grey-300 block mt-1">
                      {paradigm === 'sickcare' ? 'Standard baseline average' : 'Optimized biological maximum'}
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 bg-slate-grey-800/40 rounded-xl border border-slate-grey-700">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-400 block mb-1">Autonomic Focus</span>
                    <motion.div 
                      key={paradigm === 'sickcare' ? 'stabilize' : 'resilience'}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-base font-bold text-white uppercase tracking-tight"
                    >
                      {paradigm === 'sickcare' ? 'Symptomatic control' : 'HRV & Vagus Nerve Engineering'}
                    </motion.div>
                    <span className="text-[10px] text-slate-grey-300 block mt-1">
                      {paradigm === 'sickcare' ? 'Suppress acute reactions' : 'Strengthen parasympathetic tone'}
                    </span>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-4 bg-slate-grey-800/40 rounded-xl border border-slate-grey-700">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-400 block mb-1">Biological Marker Index</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <motion.span 
                        key={paradigm === 'sickcare' ? 'degrade' : 'optimize'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-display font-medium text-white"
                      >
                        {paradigm === 'sickcare' ? 'Baseline' : '-4.2 yrs'}
                      </motion.span>
                    </div>
                    <span className="text-[10px] text-slate-grey-300 block mt-1">
                      {paradigm === 'sickcare' ? 'Standard disease markers' : 'Epigenetic aging speed reduction'}
                    </span>
                  </div>

                </div>

                {/* Progress bar transition */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-mono uppercase text-slate-grey-400">
                    <span>Diagnostic Integrity</span>
                    <span>{paradigm === 'sickcare' ? '45%' : '98%'}</span>
                  </div>
                  <div className="w-full bg-slate-grey-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${
                        paradigm === 'sickcare' 
                          ? 'bg-sickcare-400' 
                          : 'bg-gradient-to-r from-wellness-cyan to-wellness-amber'
                      }`}
                      animate={{ width: paradigm === 'sickcare' ? '45%' : '98%' }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2: COLOR SYSTEMS */}
        {/* ---------------------------------------------------- */}
        <section className="mb-24 pt-12 border-t border-slate-grey-800">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-wellness-cyan block mb-2">Calibrated Palette</span>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              02 // Color Calibration Boards
            </h2>
            <p className="text-slate-grey-400 text-sm max-w-[60ch] mt-1">
              Custom-built hex codes defined inside the Tailwind CSS v4 design engine. Click any color block to copy its hex value.
            </p>
          </div>

          <div className="space-y-8">
            {/* Minimalist Slate-Grey Neutrals */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-grey-300 mb-4 border-b border-slate-grey-800 pb-2">
                Minimalist Slate-Grey Neutrals (Primary Canvas)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {colors.slateGrey.map((color) => (
                  <button 
                    key={color.name}
                    onClick={() => copyToClipboard(color.hex)}
                    className="group bg-slate-grey-900 border border-slate-grey-700/60 p-3 rounded-2xl text-left hover:border-slate-grey-500 transition-all active:scale-[0.98] outline-none"
                  >
                    <div 
                      className="w-full h-16 rounded-xl mb-3 border border-white/5 relative flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 p-1.5 rounded-lg text-white">
                        {copiedColor === color.hex ? <Check size={14} /> : <Copy size={14} />}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-black uppercase text-white block mb-0.5">{color.name}</span>
                    <span className="font-mono text-[9px] text-slate-grey-400 block mb-1">{color.hex}</span>
                    <span className="text-[9px] text-slate-grey-300 leading-tight block">{color.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shift Tones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Sick-Care desaturated blues */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-sickcare-400 mb-4 border-b border-slate-grey-800 pb-2">
                  Traditional Sick-Care (Moody Slate Blues)
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {colors.sickCare.map((color) => (
                    <button 
                      key={color.name}
                      onClick={() => copyToClipboard(color.hex)}
                      className="group bg-slate-grey-900 border border-slate-grey-700/60 p-3 rounded-2xl text-left hover:border-slate-grey-500 transition-all active:scale-[0.98] outline-none"
                    >
                      <div 
                        className="w-full h-16 rounded-xl mb-3 border border-white/5 relative flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 p-1.5 rounded-lg text-white">
                          {copiedColor === color.hex ? <Check size={14} /> : <Copy size={14} />}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-black uppercase text-white block mb-0.5">{color.name}</span>
                      <span className="font-mono text-[9px] text-slate-grey-400 block mb-1">{color.hex}</span>
                      <span className="text-[9px] text-slate-grey-300 leading-tight block">{color.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Proactive Wellness Tones */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-wellness-cyan mb-4 border-b border-slate-grey-800 pb-2">
                  Proactive Wellness (Electric Cyan & Morning Amber)
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {colors.wellness.map((color) => (
                    <button 
                      key={color.name}
                      onClick={() => copyToClipboard(color.hex)}
                      className="group bg-slate-grey-900 border border-slate-grey-700/60 p-3 rounded-2xl text-left hover:border-slate-grey-500 transition-all active:scale-[0.98] outline-none"
                    >
                      <div 
                        className="w-full h-16 rounded-xl mb-3 border border-white/5 relative flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 p-1.5 rounded-lg text-white">
                          {copiedColor === color.hex ? <Check size={14} /> : <Copy size={14} />}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-black uppercase text-white block mb-0.5">{color.name}</span>
                      <span className="font-mono text-[9px] text-slate-grey-400 block mb-1">{color.hex}</span>
                      <span className="text-[9px] text-slate-grey-300 leading-tight block">{color.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* SECTION 3: TYPOGRAPHY */}
        {/* ---------------------------------------------------- */}
        <section className="mb-24 pt-12 border-t border-slate-grey-800">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-wellness-amber block mb-2">Typography scale</span>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              03 // Editorial Typography Pairings
            </h2>
            <p className="text-slate-grey-400 text-sm max-w-[60ch] mt-1">
              Clean pairings utilizing Outfit (Display Headlines) and Plus Jakarta Sans (Sans-Serif Body Copy) for optimal reading rhythm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Display Headlines column */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-grey-300 border-b border-slate-grey-800 pb-2">
                Outfit Display Headlines
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-1">text-6xl tracking-tight leading-none</span>
                  <h4 className="text-5xl md:text-6xl font-display uppercase tracking-tight text-white leading-none">
                    VITALITY EXTENSION
                  </h4>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-1">text-4xl tracking-tight leading-none</span>
                  <h4 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-white leading-none">
                    CELLULAR INTEGRITY PROTOCOLS
                  </h4>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-1">text-2xl tracking-tight leading-none</span>
                  <h4 className="text-xl md:text-2xl font-display uppercase tracking-tight text-white leading-none">
                    Autonomic Stability Frameworks
                  </h4>
                </div>
              </div>
            </div>

            {/* Sans Body columns */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-grey-300 border-b border-slate-grey-800 pb-2">
                Plus Jakarta Sans Body
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-1">text-base text-slate-grey-200 leading-relaxed</span>
                  <p className="text-base text-slate-grey-200 leading-relaxed font-light">
                    The biological process of aging can be modeled as a progressive loss of systemic information. Through targeted autonomic tuning (HRV optimization) and epigenetic tracking, we can restore balance to the system before it registers as clinical disease.
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-1">text-sm text-slate-grey-300 leading-relaxed</span>
                  <p className="text-sm text-slate-grey-300 leading-relaxed font-light">
                    By monitoring cardiac coherence and the vagal tone, the platform provides direct guidance for somatic breathwork sessions. Results are tracked against daily recovery metrics to build stress resilience.
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-1">text-xs font-mono uppercase tracking-widest text-wellness-cyan</span>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-wellness-cyan font-bold">
                    [ OPTIMIZATION PROTOCOL // STAGE 1 ACTIVE ]
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* SECTION 4: INTERACTIVE COMPONENT CATALOG */}
        {/* ---------------------------------------------------- */}
        <section className="mb-24 pt-12 border-t border-slate-grey-800">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-wellness-cyan block mb-2">Component catalog</span>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              04 // Interactive UI Elements
            </h2>
            <p className="text-slate-grey-400 text-sm max-w-[60ch] mt-1">
              Strict compliance with interactive click-states, loading states, and WCAG AA color contrast guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Interactive Buttons */}
            <div className="bg-slate-grey-900 border border-slate-grey-700/60 p-6 rounded-2xl space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-grey-300 border-b border-slate-grey-700/60 pb-2">
                Action Buttons
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-2">Primary CTA (Gradient & Glow)</span>
                  <motion.button 
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full justify-center inline-flex items-center px-5 py-3.5 bg-gradient-to-r from-wellness-cyan to-indigo-600 hover:from-wellness-cyan-light hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-wellness-cyan/15 border border-wellness-cyan/20 cursor-pointer"
                  >
                    Optimize Now
                  </motion.button>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-2">Secondary CTA (Solid Minimalist)</span>
                  <motion.button 
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full justify-center inline-flex items-center px-5 py-3.5 bg-wellness-amber text-slate-grey-950 hover:bg-wellness-amber-light font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Assess Biomarkers
                  </motion.button>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-2">Ghost Border Button</span>
                  <motion.button 
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full justify-center inline-flex items-center px-5 py-3.5 bg-slate-grey-800 border border-slate-grey-700 text-slate-grey-200 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    View Protocols
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Inputs & Form States */}
            <div className="bg-slate-grey-900 border border-slate-grey-700/60 p-6 rounded-2xl space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-grey-300 border-b border-slate-grey-700/60 pb-2">
                Form Inputs & States
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-300 block mb-1">Standard Label</label>
                  <input 
                    type="text" 
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-slate-grey-800 border border-slate-grey-700 rounded-xl text-xs text-white placeholder-slate-grey-400 focus:outline-none focus:border-wellness-cyan transition-colors"
                  />
                  <span className="text-[9px] text-slate-grey-400 block mt-1">Provide your primary analytical contact.</span>
                </div>

                <div>
                  <label className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-300 block mb-1">Focus & Active State</label>
                  <input 
                    type="text" 
                    defaultValue="Vagus Nerve Protocol"
                    className="w-full px-4 py-3 bg-slate-grey-800 border border-wellness-cyan rounded-xl text-xs text-white focus:outline-none"
                  />
                  <span className="text-[9px] text-wellness-cyan block mt-1">Excellent option selected.</span>
                </div>

                <div>
                  <label className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-300 block mb-1">Error State</label>
                  <input 
                    type="text" 
                    defaultValue="invalid-format-entry"
                    className="w-full px-4 py-3 bg-slate-grey-800 border-red-500/50 rounded-xl text-xs text-white focus:outline-none"
                  />
                  <span className="text-[9px] text-red-400 block mt-1">Please enter a valid format sequence.</span>
                </div>
              </div>
            </div>

            {/* Indicators & Badges */}
            <div className="bg-slate-grey-900 border border-slate-grey-700/60 p-6 rounded-2xl space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-grey-300 border-b border-slate-grey-700/60 pb-2">
                Status Indicators & Skeletons
              </h3>

              <div className="space-y-5">
                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-2">Pulse Alert Badge</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-wellness-cyan/10 border border-wellness-cyan/30 text-wellness-cyan">
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-wellness-cyan"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-wellness-cyan"></span>
                      </span>
                      Live Monitoring
                    </span>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-wellness-amber/10 border border-wellness-amber/30 text-wellness-amber">
                      Warning Protocol
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-2">Custom Skeletal Loading State</span>
                  <div className="space-y-2 p-3 bg-slate-grey-800/40 rounded-xl border border-slate-grey-700/40">
                    <div className="h-2.5 bg-slate-grey-700 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-slate-grey-700/60 rounded-full w-1/2 animate-pulse"></div>
                    <div className="h-2 bg-slate-grey-700/40 rounded-full w-5/6 animate-pulse"></div>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-slate-grey-400 block mb-2">Autonomic Metric Dial</span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-slate-grey-700 border-t-wellness-cyan border-r-wellness-cyan animate-spin" />
                    <div>
                      <span className="text-[10px] font-mono text-white block uppercase tracking-wider">Syncing HRV...</span>
                      <span className="text-[9px] text-slate-grey-400 block">Acquiring cardiovascular data</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* SECTION 5: BENTO GRID SHOWCASE */}
        {/* ---------------------------------------------------- */}
        <section className="mb-24 pt-12 border-t border-slate-grey-800">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-wellness-amber block mb-2">Rhythmic Layout</span>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">
              05 // Bento Grid Rhythmic Layout
            </h2>
            <p className="text-slate-grey-400 text-sm max-w-[60ch] mt-1">
              Asymmetrical bento cell configuration for presenting multi-dimensional human performance variables.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cell 1: Hero-style split */}
            <div className="md:col-span-2 bg-slate-grey-900 border border-slate-grey-700/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group min-h-[300px]">
              {/* background visual accent */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-wellness-cyan/5 rounded-full blur-[80px] group-hover:bg-wellness-cyan/10 transition-colors pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-grey-400 block mb-2">[ PLATFORM CORE ]</span>
                <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white leading-tight max-w-[15ch] mb-4">
                  PROACTIVE DIAGNOSTIC BLUEPRINT
                </h3>
                <p className="text-slate-grey-300 text-sm font-light max-w-[45ch]">
                  Move past traditional static doctor checks. We track cellular methylation speed, cardiac coherence indexes, and dynamic oxygen thresholds every day.
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <Link to="/health-quiz" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-wellness-cyan hover:text-wellness-cyan-light transition-colors">
                  Begin Free Assessment <ArrowLeft size={12} className="rotate-180" />
                </Link>
              </div>
            </div>

            {/* Cell 2: Key Metric Card */}
            <div className="bg-slate-grey-900 border border-slate-grey-700/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-wellness-amber/5 rounded-full blur-[50px] pointer-events-none" />
              
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-grey-400 block mb-2">[ LONGEVITY RATIO ]</span>
                <h3 className="text-lg font-display uppercase tracking-tight text-white mb-2">
                  Epigenetic Age Shift
                </h3>
                <p className="text-slate-grey-300 text-xs font-light">
                  Measure DNA methylation benchmarks relative to your actual birth date metrics.
                </p>
              </div>

              <div className="pt-8">
                <span className="text-4xl md:text-5xl font-display font-medium text-wellness-amber leading-none block mb-1">
                  -5.8 YRS
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-grey-400">
                  Target cellular variance ceiling
                </span>
              </div>
            </div>

            {/* Cell 3: Interactive Diagnostic Metric */}
            <div className="bg-slate-grey-900 border border-slate-grey-700/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-grey-400 block mb-2">[ NERVE TUNING ]</span>
                <h3 className="text-lg font-display uppercase tracking-tight text-white mb-2">
                  Autonomic Tuning
                </h3>
                <p className="text-slate-grey-300 text-xs font-light">
                  Real-time Vagus nerve stimulation metrics combined with specialized somatic breathing exercises.
                </p>
              </div>

              <div className="pt-8">
                <div className="flex items-center justify-between border-b border-slate-grey-700/60 pb-2 mb-2">
                  <span className="text-[10px] font-mono uppercase text-slate-grey-300">Vagal Activity</span>
                  <span className="text-[10px] font-mono text-wellness-cyan font-bold">84 ms HRV</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-grey-300">Stress Reserve</span>
                  <span className="text-[10px] font-mono text-wellness-cyan font-bold">Optimal</span>
                </div>
              </div>
            </div>

            {/* Cell 4: Large Horizontal Callout */}
            <div className="md:col-span-2 bg-slate-grey-900 border border-slate-grey-700/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group gap-6">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-wellness-cyan/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="space-y-2 relative z-10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-grey-400 block">[ SYSTEM STATUS ]</span>
                <h3 className="text-xl font-display uppercase tracking-tight text-white leading-tight">
                  Epigenetic tracking sequence is active
                </h3>
                <p className="text-slate-grey-300 text-xs font-light max-w-[45ch]">
                  Our diagnostic nodes automatically verify daily inputs against Supreme Court validated privacy standards.
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="px-5 py-3 bg-slate-grey-800 border border-slate-grey-700 hover:border-wellness-cyan text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                >
                  Verify Device Node
                </motion.div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
