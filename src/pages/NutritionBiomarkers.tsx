import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Activity, BarChart3, Droplets, Zap, Shield, Microscope, ExternalLink, Database, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function NutritionBiomarkers() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('np_bio_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    insidetracker: 'https://www.insidetracker.com/',
    ketomojo: 'https://keto-mojo.com/',
    levels: 'https://www.levels.com/'
  };


  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-emerald-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none z-0"></div>
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
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Precision Metric Standard: HOMA-IR
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            {t('np_bio_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-emerald-500/50 pl-8 text-left"
          >
            {t('np_bio_intro')} In plain English, we shift from general wellness advice to personalized blood data tracking. By monitoring real biomarkers, you can make perfect choices for your health.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-32">
        
        {/* Digital PDF Availability (always available) */}
        <div className="mt-8 text-center">
          <a
            href="/digital-guide.pdf"
            className="inline-flex items-center px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-black uppercase tracking-widest text-sm transition-colors"
          >
            Download Digital PDF
          </a>
        </div>



        {/* Core Layout: Overview & Interactive Infographic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          
          {/* Detailed Explanations */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Plain English Overview */}
            <div className="bg-slate-900/50 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 blur-[80px] -mr-24 -mt-24"></div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">What is Biomarker Tracking?</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Biomarkers are measurable biological markers in your blood that show how well your internal systems are running. Rather than relying on guesswork, we track vital values like Fasting Glucose, Fasting Insulin, and HbA1c to map your true metabolic health.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                Using fasting glucose and fasting insulin levels, we calculate your <strong>HOMA-IR (Homeostatic Model Assessment of Insulin Resistance)</strong>. This score tells us exactly how hard your pancreas is working to clear sugars from your blood. Keeping HOMA-IR low is the absolute secret to weight management and longevity.
              </p>
            </div>

            {/* Everyday Symptoms of Imbalance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sugar & Carb Spikes
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Severe sleepiness or brain fog 1-2 hours after carb-heavy meals.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Waking up in the middle of the night feeling warm or sweating.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1 font-bold">•</span>
                    Constant physical cravings for sweets, starches, or caffeine.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-teal-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Insulin Resistance Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1 font-bold">•</span>
                    Inability to lose weight even when counting calories strictly.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1 font-bold">•</span>
                    Increased fat accumulation around the midsection.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1 font-bold">•</span>
                    Feeling hungry or low-energy shortly after eating meals.
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
                  <strong>Measure, don't guess.</strong> Calculate your HOMA-IR score annually, keeping it below 1.0. Use temporary Continuous Glucose Monitors (CGMs) to learn which specific foods trigger high blood sugar volatility in your body.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "A normal fasting glucose reading means your metabolic systems are in perfect working order."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Your body can hide insulin resistance for 10-15 years by producing double or triple the necessary insulin to force glucose into cells. Testing fasting insulin and calculating HOMA-IR is the only way to catch metabolic strain early.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">HOMA-IR Formula & Insulin Sensitivity</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(16, 185, 129, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* Blood vessel shape */}
                <path d="M 20,200 L 380,200" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="80" strokeLinecap="round" />
                <path d="M 20,200 L 380,200" stroke="#020617" strokeWidth="76" strokeLinecap="round" />
                
                {/* Flowing glucose (Amber circles) */}
                <motion.g
                  animate={{ x: [-100, 260] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="120" cy="185" r="5" fill="#f59e0b" />
                  <circle cx="150" cy="215" r="5" fill="#f59e0b" />
                  <circle cx="200" cy="190" r="5" fill="#f59e0b" />
                </motion.g>

                {/* Flowing insulin (Emerald hexagons/dots) */}
                <motion.g
                  animate={{ x: [-120, 240] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="140" cy="205" r="4" fill="#10b981" />
                  <circle cx="180" cy="175" r="4" fill="#10b981" />
                  <circle cx="230" cy="210" r="4" fill="#10b981" />
                </motion.g>

                {/* Formula display block overlay */}
                <g transform="translate(200, 100)">
                  <rect x="-110" y="-30" width="220" height="60" rx="15" fill="rgba(15, 23, 42, 0.95)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
                  <text x="0" y="-10" textAnchor="middle" fill="#ffffff" className="text-[10px] font-black tracking-widest font-display">HOMA-IR INDEX</text>
                  <text x="0" y="15" textAnchor="middle" fill="#10b981" className="text-[9px] font-bold uppercase tracking-tight">Glucose × Insulin / 405</text>
                </g>

                {/* Status indicator */}
                <g transform="translate(200, 310)">
                  <rect x="-60" y="-15" width="120" height="30" rx="10" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
                  <text x="0" y="4" textAnchor="middle" fill="#10b981" className="text-[10px] font-black uppercase tracking-widest font-display">Healthy: &lt; 1.0</text>
                </g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Active Insulin Sensitivity Mapping</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Glucose and Insulin travel through blood vessels. The HOMA-IR formula computes the ratio of these values; a lower score represents metabolic flexibility.
              </p>
            </div>
          </div>

        </div>

        {/* HOMA-IR Standard Details */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <BarChart3 size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              {t('np_bio_standard_title')}
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            {t('np_bio_standard_p')} Evaluating blood markers side-by-side provides a complete map of health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "HbA1c Tracker", target: "Target: < 5.2%", desc: "Indicates your average blood sugar levels over the past 3 months. Essential for tracking long-term metabolic control." },
              { title: "Fasting Insulin", target: "Target: < 6.0 uIU/mL", desc: "Reveals how much hormone your pancreas secretes at rest. High insulin signals early cell resistance." },
              { title: "hs-CRP Baseline", target: "Target: < 0.5 mg/L", desc: "A sensitive marker for low-grade systemic inflammation. Higher values point to chronic vascular stress." }
            ].map((metric, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 block">Biomarker Metric</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-emerald-400 transition-colors">{metric.title}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{metric.target}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{metric.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Continuous Lab (CGM section) */}
        <section className="bg-slate-900/50 border border-white/5 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-3xl mb-32">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-8">
                <Activity size={28} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none mb-6">
                {t('np_bio_wearable_title')}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium mb-10">
                {t('np_bio_wearable_p')} Continuous tracking reveals immediate feedback loops, letting you adjust habits without delay.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href={affiliateLinks.levels} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
                  Connect CGM (Levels) <ExternalLink size={12} className="ml-2" />
                </a>
                <a href={affiliateLinks.ketomojo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all backdrop-blur-md">
                  Keto-Mojo Dual Meter <ExternalLink size={12} className="ml-2" />
                </a>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full translate-x-10 translate-y-10 group-hover:scale-110 transition-transform"></div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Data Analytics" className="rounded-[3rem] relative z-10 shadow-2xl border border-white/5 opacity-85 hover:opacity-100 transition-all duration-700" />
            </div>
          </div>
        </section>

        {/* Jargon Buster */}
        <section className="mb-32 mt-32">
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
                term: "Biomarker",
                meaning: "A biological marker (like glucose, insulin, or cholesterol) measured in your blood or tissues that acts as a objective health indicator of your body's systems."
              },
              {
                term: "Epigenetics",
                meaning: "The study of how your environment and habits (like nutrition, sleep, and exercise) act as a volume control dial on your genes, deciding which gene instructions are active and which stay silent, without changing your actual DNA code."
              },
              {
                term: "Insulin Resistance",
                meaning: "A condition where your body's cells become resistant or 'deaf' to the signal of insulin. As a result, your pancreas is forced to produce excess insulin to clear sugar from your blood."
              },
              {
                term: "HOMA-IR",
                meaning: "Homeostatic Model Assessment of Insulin Resistance. A simple calculated score (Fasting Glucose × Fasting Insulin / 405) that measures metabolic resistance. A lower score (under 1.0) is the target for longevity."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-emerald-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed */}
        <div className="mt-48 space-y-24">
          <div className="flex items-center gap-6 mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              Intelligence <span className="text-emerald-500">Feed</span>
            </h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>
          <BlogSection category="nutrition" limit={3} />
        </div>

      </div>
    </div>
  );
}
