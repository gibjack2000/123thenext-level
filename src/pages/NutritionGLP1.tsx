import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Zap, Activity, ExternalLink, Microscope, AlertTriangle, Database, CheckCircle2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';

export default function NutritionGLP1() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('np_glp1_title')} | 123TheNext Level`;
  }, [t]);

  const affiliateLinks = {
    us: 'https://amazon.com/dp/B0CXM1X8PQ',
    uk: 'https://amazon.co.uk/dp/B0CXM1X8PQ',
    protein: 'https://amazon.com/dp/B01BGOI8C6',
    electrolytes: 'https://amazon.com/dp/B07TJR9W9J',
    magnesium: 'https://amazon.com/dp/B07P5K7DQP'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none z-0"></div>
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
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Clinical Protocol A: Pharmacological Synergy
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none"
          >
            {t('np_glp1_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-blue-500/50 pl-8 text-left"
          >
            {t('np_glp1_intro')} In plain English, GLP-1 medications mimic natural hormones to slow digestion and reduce hunger. However, they require careful nutritional management to prevent the loss of active, healthy muscle tissue.
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
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">What is GLP-1?</h2>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                GLP-1 (Glucagon-Like Peptide-1) is a natural metabolic hormone produced by your gut in response to food. It acts as an chemical messenger that tells your brain you are full, improves insulin response in the pancreas, and slows down gastric emptying (how fast your stomach digests meals).
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-medium">
                Modern clinical therapies (like semaglutide and tirzepatide) activate GLP-1 receptors at much higher levels to assist with weight management. However, when appetite is heavily suppressed, people often struggle to eat enough nutrients, triggering a metabolic state where the body breaks down muscle instead of fat.
              </p>
            </div>

            {/* Everyday Symptoms of Imbalance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-rose-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                  Signs of Muscle Loss
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    Rapid strength drop during simple daily movements.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    Noticeable loss of muscle definition and tone.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    Feeling weak or experiencing an afternoon physical crash.
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 font-display flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  Digestive Distress Signs
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Persistent nausea, bloating, or heavy stomach acid.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Severe fatigue stemming from total nutrient aversion.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 font-bold">•</span>
                    Dehydration symptoms like leg cramps and headaches.
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
                  <strong>Repay the biological debt first.</strong> Command your body to preserve muscle by eating at least 1.6 to 2.2 grams of high-quality protein per kilogram of body weight daily, combined with lifting weights at least 3 times a week.
                </p>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-display">Myth vs. Reality</h4>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium text-rose-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-rose-500">Common Misconception</span>
                    "GLP-1 medications are smart drugs that selectively target fat cells, leaving your structural muscle completely safe."
                  </div>
                  <div className="text-sm leading-relaxed font-medium text-emerald-300/90">
                    <span className="text-[10px] uppercase font-black tracking-wider block mb-1 text-emerald-500">The Biological Reality</span>
                    Without heavy resistance training and targeted protein supplementation, up to 25% to 40% of the weight lost on GLP-1 is skeletal muscle tissue. This slow metabolic burn makes keeping weight off much harder in the future.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Infographic Panel */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-12">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 font-display block mb-1">Interactive Pathway</span>
              <p className="text-slate-500 text-xs font-medium">GLP-1 Cellular Synergy & Muscle Protection</p>
            </div>
            
            <div className="w-full flex justify-center items-center bg-slate-950/30 rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden aspect-square">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              
              {/* React SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] mx-auto">
                {/* Outer frame */}
                <rect x="10" y="10" width="380" height="380" rx="40" fill="rgba(59, 130, 246, 0.02)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
                
                {/* 1. Stomach representation (Gastric Delay) */}
                <g transform="translate(100, 100)">
                  {/* Stomach shape outline */}
                  <path d="M-40,0 C-40,-30 10,-50 40,-20 C60,-20 80,10 50,40 C30,60 -20,60 -40,30 C-50,20 -40,10 -40,0 Z" fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" strokeWidth="2" />
                  {/* Food particles slowly flowing */}
                  <motion.circle 
                    cx="0" cy="10" r="4" fill="#fbbf24"
                    animate={{ y: [-5, 15, -5], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.circle 
                    cx="15" cy="5" r="3" fill="#fbbf24"
                    animate={{ y: [10, -10, 10], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="5" y="-35" textAnchor="middle" fill="#3b82f6" className="text-[9px] font-black uppercase tracking-widest font-display">Gastric Delay</text>
                </g>

                {/* Connection lines */}
                <path d="M160,165 L240,240" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* 2. Muscle fiber under load (MPS Protection) */}
                <g transform="translate(260, 260)">
                  {/* Parallel muscle fibers */}
                  <rect x="-40" y="-15" width="80" height="10" rx="3" fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" strokeWidth="1.5" />
                  <rect x="-40" y="0" width="80" height="10" rx="3" fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" strokeWidth="1.5" />
                  <rect x="-40" y="15" width="80" height="10" rx="3" fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" strokeWidth="1.5" />
                  
                  {/* Active protection shield */}
                  <motion.circle 
                    cx="0" cy="5" r="30" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Glowing amino acids input */}
                  <motion.g
                    animate={{ x: [-20, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <circle cx="-15" cy="-25" r="3" fill="#10b981" />
                    <circle cx="15" cy="-25" r="3" fill="#10b981" />
                  </motion.g>
                  <text x="0" y="45" textAnchor="middle" fill="#10b981" className="text-[9px] font-black uppercase tracking-widest font-display">Muscle Preservation</text>
                </g>

                {/* Floating GLP-1 hormone messengers */}
                <motion.g
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle cx="280" cy="80" r="5" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5" />
                  <circle cx="80" cy="280" r="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5" />
                </motion.g>
                
                <text x="200" y="360" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold uppercase tracking-widest font-display">Target: Avoid Catabolic Muscle Loss</text>
              </svg>
            </div>
            
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 text-center w-full">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Interactive Summary</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Slowing gastric motility regulates satiety, while amino acid saturation and physical load act as a shield to prevent the body from digesting muscle tissue.
              </p>
            </div>
          </div>

        </div>

        {/* Titration & Safety Roadmap */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Activity size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              {t('np_glp1_titration_title')}
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-4xl font-medium">
            {t('np_glp1_titration_p')} The transition must be carefully calibrated to balance steady weight loss while actively preventing metabolic downregulation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { week: "Weeks 1-4", dose: "Initiation Phase", focus: "GI Adaptation", detail: "Slowly adapt to gastric delays. Prioritize cellular hydration with high-quality electrolytes and eat small, high-density protein portions." },
              { week: "Weeks 5-8", dose: "Titration Scaling", focus: "Appetite Sync", detail: "Appetite drops. Establish a mandatory 3x/week strength routine. Force protein targets (minimum 1.6g/kg) even when not hungry." },
              { week: "Weeks 9-12", dose: "Therapeutic Plate", focus: "Body Composition", detail: "Ensure weight loss is fat loss. Monitor progress using body fat calipers or DXA scans. If strength declines, increase protein." },
              { week: "Weeks 16+", dose: "Homeostatic Peak", focus: "Metabolic Mastery", detail: "Shift from weight loss to long-term health. Re-calibrate metabolic flexibility, test fasting insulin, and plan titration safety." }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 hover:shadow-2xl transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4 block">{step.week}</span>
                <h4 className="text-xl font-display font-black uppercase text-white mb-2 group-hover:text-blue-400 transition-colors">{step.dose}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">{step.focus}</span>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Companion Stack (Clinical Arsenal) */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">Targeted Intervention</span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                The Companion Stack
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-blue-500/20 pb-4">
              Clinically Vetted Nutritional Supports
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Thorne Whey Protein Isolate", desc: "Premium, highly bioavailable protein to hit cellular synthesis goals when overall appetite is low.", link: affiliateLinks.protein, label: "Whey Isolate", highlight: "Protein Synthesis" },
              { name: "Clinical Creatine HCl (Thorne)", desc: "Cellular energy buffer to prevent fast-twitch muscle fiber breakdown and maintain strength outputs.", link: affiliateLinks.us, label: "Creatine HCl", highlight: "ATP Buffer" },
              { name: "LMNT Electrolytes Stack", desc: "Hydration and autonomic support to replenish sodium, potassium, and magnesium during caloric delays.", link: affiliateLinks.electrolytes, label: "Electrolytes", highlight: "Mineral Balance" },
              { name: "Pure Magnesium Glycinate", desc: "Supports deep nervous system relaxation, cardiovascular sleep quality, and healthy bowel motility.", link: affiliateLinks.magnesium, label: "Magnesium", highlight: "Autonomic motility" }
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

        {/* Diagnostic Action */}
        <div className="bg-gradient-to-tr from-slate-950 via-[#0a1428] to-slate-950 rounded-[4rem] p-12 md:p-24 border border-white/5 shadow-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none animate-pulse"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <Microscope size={64} className="text-blue-400 mx-auto" />
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              Biological Integrity Suite
            </h3>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium italic">
              "Losing body weight without diagnostic tracking is flying blind. You must measure skeletal muscle index and hormone baselines to stay metabolically young."
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a href={affiliateLinks.us} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-500/20">
                Functional Health Lab <ExternalLink size={14} className="ml-3" />
              </a>
              <a href={affiliateLinks.uk} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all backdrop-blur-md">
                InsideTracker UK <ExternalLink size={14} className="ml-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Jargon Buster */}
        <section className="mb-32 mt-32">
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
                term: "GLP-1 (Glucagon-Like Peptide-1)",
                meaning: "A natural hormone made by your gut that signals to the brain that you are full, while slowing down how fast your stomach empties."
              },
              {
                term: "Satiety",
                meaning: "The scientific term for feeling satisfied and full after eating, helping to naturalize appetite control."
              },
              {
                term: "Muscle Catabolism",
                meaning: "A biological state where the body breaks down muscle tissue for energy instead of using stored fat. This typically happens during extreme calorie deficits if not enough protein is consumed."
              },
              {
                term: "Titration",
                meaning: "The process of slowly scaling or adjusting the dosage of a compound over time to allow your digestive and metabolic systems to adapt and prevent side effects."
              }
            ].map((jargon, i) => (
              <div key={i} className="p-8 bg-slate-900/40 rounded-[2rem] border border-white/5 space-y-2">
                <h4 className="text-lg font-display font-black uppercase text-blue-400">{jargon.term}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{jargon.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed */}
        <div className="mt-48 space-y-24">
          <div className="flex items-center gap-6 mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              Intelligence <span className="text-blue-500">Feed</span>
            </h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>
          <BlogSection category="nutrition" limit={3} />
        </div>

      </div>
    </div>
  );
}
