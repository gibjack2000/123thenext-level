import React, { useEffect } from 'react';
import { ArrowLeft, Activity, Microscope, Zap, Shield, ExternalLink, Binary, Sparkles, Target, ArrowRight, Search, FlaskConical, Gauge, Clipboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAffiliateLinks } from '../contexts/AffiliateLinksContext';
import { affiliateLinks } from '../config/affiliateLinks';

export default function PreventiveHealth() {
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Biometric Foundation: Diagnostic Archive | 123TheNext Level`;
  }, []);

  const diagnostics = [
    {
      id: 'blood-panel',
      name: 'Advanced Blood Chemistry',
      spec: '70+ Biomarkers',
      desc: 'Comprehensive analysis of metabolic, hormonal, and inflammatory markers to establish a clinical baseline. We recommend venous draw over finger-pricks.',
      metrics: ['ApoB (Heart Health)', 'HbA1c (Diabetes Risk)', 'hs-CRP (Inflammation)', 'Full Hormone Profile'],
      url: '#lola-panels'
    },
    {
      id: 'epigenetic-clock',
      name: 'DunedinPACE Methylation',
      spec: 'Biological Pace of Aging',
      desc: 'The most accurate longitudinal clock measuring exactly how many biological years you age per calendar year.',
      metrics: ['PACE Rate', 'Telomere Length', 'Immune Age'],
      url: '/health/cellular/epigenetic-tracking?tab=methylation'
    },
    {
      id: 'cancer-screening',
      name: 'Galleri® Multi-Cancer',
      spec: 'Early Detection (Stage 0/1)',
      desc: 'Liquid biopsy technology analyzing cell-free DNA to detect signals from 50+ types of cancer.',
      metrics: ['Signal Origin', 'cfDNA Analysis', 'Clinical Sensitivity'],
      url: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-emerald-500/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1579165466511-70e21ad10b05?auto=format&fit=crop&q=80&w=2000"
            alt="Biometric Diagnostics"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 via-transparent to-indigo-950/20"></div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)", backgroundSize: "40px 40px" }}>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/health" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-16 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Health Hub</span>
          </Link>
          
          <div className="max-w-5xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-2xl backdrop-blur-md"
            >
               <Activity size={14} className="mr-3 animate-pulse" />
               Clinical Intelligence Stream: Active
            </motion.div>
            <h1 className="text-5xl md:text-[clamp(4rem,7vw,9.5rem)] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
               Biometric<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">
                  Foundation
               </span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-4xl border-l-4 border-emerald-500/50 pl-8 text-left italic">
               "Hope is not a clinical strategy. We replace guesswork with data to eliminate disease risk before it starts."
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-48">
        {/* Diagnostic Control Center */}
        <section className="mb-40">
          <div className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-12 mb-16 px-4">
                <div className="inline-flex items-center gap-4 text-emerald-400 font-black uppercase tracking-widest text-[10px] bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20 mb-8 font-display">
                  <Search size={14} />
                  Precision oversight
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                   Diagnostic Control
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl">
                   Optimal health is the absence of pathology, confirmed by rigorous testing. Our foundation relies on identifying epigenetic and metabolic shifts long before they manifest clinically.
                </p>
              </div>

              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {diagnostics.map((d) => {
                  const isAnchor = d.url.startsWith('#');
                  const isExternal = d.url.startsWith('http');
                  
                  const buttonProps = isAnchor 
                    ? { href: d.url }
                    : isExternal
                    ? { href: d.url, target: '_blank', rel: 'noopener noreferrer' }
                    : null;

                  const LinkComponent = isAnchor || isExternal ? 'a' : Link;
                  const linkToProp = isAnchor || isExternal ? {} : { to: d.url };

                  return (
                    <motion.div 
                      key={d.id}
                      whileHover={{ y: -10 }}
                      className="bg-slate-900/50 p-10 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col h-full"
                    >
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/20">
                        <Gauge size={24} />
                      </div>
                      <h3 className="text-2xl font-display font-black uppercase text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">
                        {d.name}
                      </h3>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 font-display">{d.spec}</p>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow font-medium">
                        {d.desc}
                      </p>
                      <div className="space-y-3 mb-10">
                        {d.metrics.map(m => (
                          <div key={m} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-300">
                            <div className="w-1 h-1 rounded-full bg-emerald-500" />
                            {m}
                          </div>
                        ))}
                      </div>
                      <LinkComponent 
                        {...buttonProps}
                        {...linkToProp}
                        className="w-full py-4 bg-white/5 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-emerald-600 transition-all border border-white/10 group-hover:border-emerald-500/50 block"
                      >
                        {d.id === 'blood-panel' ? 'View Recommended Panels' : 'View Clinical Specs'}
                      </LinkComponent>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Lola Health Blood Panels Section */}
        <section id="lola-panels" className="mb-40 scroll-mt-24">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs font-display">Lola Health (UK)</span>
              <h2 className="text-5xl md:text-[6rem] font-display font-black uppercase tracking-tighter text-white leading-none">
                 Recommended Tests
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-emerald-500/20 pb-4 font-display">
               Venous Blood Draw Panels
            </p>
          </div>

          <div className="bg-[#0f172a] p-8 md:p-16 rounded-[4rem] border border-white/5 shadow-3xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <FlaskConical size={140} className="text-emerald-400" />
            </div>
            <div className="max-w-4xl space-y-6 relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-black uppercase text-white">Why Venous Draws Matter for Longevity</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Standard finger-prick tests often result in hemolyzed (damaged) blood cells, leading to inaccurate readings or laboratory rejection due to low sample volume. 
                For high-fidelity biomarker tracking, clinical-grade venous blood draws are the gold standard.
                <br /><br />
                We have analyzed <strong>Lola Health</strong> (UK) and recommend their phlebotomy-led testing. Their service includes a professional at-home venous blood collection in the price. Samples are processed in NHS-standard accredited labs and results are reviewed by GMC-registered doctors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'lola-core',
                name: 'Core Health 45',
                brand: 'Lola Health',
                desc: 'A foundational health panel examining 45 key biomarkers. Measures liver & kidney efficiency, cholesterol levels, baseline thyroid function, iron reserves, key vitamins, and inflammation.',
                metrics: ['Liver & Kidney Profile', 'Cholesterol / Lipids', 'Thyroid (TSH)', 'Inflammation (CRP)', 'Full Blood Count (FBC)'],
                url: links.lola_core_health?.url || affiliateLinks.lola_core_health,
                image: '/lola_clinic_core.png'
              },
              {
                id: 'lola-vital',
                name: 'Vital Check 56',
                brand: 'Lola Health',
                desc: 'An advanced mid-tier check scanning 56 critical biomarkers. Adds comprehensive sex hormones and thyroid panels to track endocrine wellness alongside core metabolic organs.',
                metrics: ['Core 45 Biomarkers', 'Reproductive Hormones (Oestrogen/Testosterone)', 'SHBG & Free Androgens', 'Advanced Metabolic Health', 'Bone Health Markers'],
                url: links.lola_vital_check?.url || affiliateLinks.lola_vital_check,
                image: '/lola_clinic_vital.png'
              },
              {
                id: 'lola-peak',
                name: 'Peak Insights 70',
                brand: 'Lola Health',
                desc: 'The gold standard longevity assessment tracking 70 biomarkers. Includes Apolipoprotein B (ApoB) for cardiovascular risk, a full metabolic screen, and extensive hormonal mapping.',
                metrics: ['Vital 56 Biomarkers', 'Apolipoprotein B (ApoB)', 'Active Vitamin B12 / Folate', 'Cardiovascular Risk Profiling', 'Full Endocrinology & Cortisol'],
                url: links.lola_peak_insights?.url || affiliateLinks.lola_peak_insights,
                image: '/lola_clinic_peak.png'
              }
            ].map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-64 relative overflow-hidden bg-white/5">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.75]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                   <div className="absolute bottom-6 left-8">
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md font-display">
                        {p.brand}
                     </span>
                     <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight mt-2">{p.name}</h3>
                   </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                    {p.desc}
                  </p>
                  
                  <div className="space-y-3 mb-10">
                    {p.metrics.map(m => (
                      <div key={m} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {m}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5">
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center w-full py-5 bg-white text-[#020617] rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-2xl font-display"
                    >
                      Order Test Kit <ExternalLink size={14} className="ml-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foundation Essentials */}
        <section className="mb-40">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs font-display">Biometric Hardware</span>
              <h2 className="text-5xl md:text-[6rem] font-display font-black uppercase tracking-tighter text-white leading-none">
                 The Base Arsenal
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-emerald-500/20 pb-4 font-display">
               Tier-1 Diagnostic Tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                id: 'oura', 
                name: 'Oura Ring Gen 3', 
                brand: 'Oura', 
                desc: 'The gold standard in sleep and autonomic tracking. Multi-sensor biometric capture for deep physiological insight.', 
                price: '$299', 
                url: '#' 
              },
              { 
                id: 'insidetracker', 
                name: 'InsideTracker Ultimate', 
                brand: 'InsideTracker', 
                desc: 'Comprehensive blood analysis combined with DNA and wearable data to provide a holistic biological roadmap.', 
                price: '$589', 
                url: '#' 
              },
              { 
                id: 'levels', 
                name: 'Levels CGM', 
                brand: 'Levels Health', 
                desc: 'Real-time metabolic feedback via continuous glucose monitoring to identify and eliminate glycemic variability.', 
                price: '$199/mo', 
                url: '#' 
              }
            ].map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-64 relative overflow-hidden bg-white/5 flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 transition-opacity group-hover:opacity-100 opacity-50"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-display font-black uppercase tracking-widest text-xs">Diagnostic Core</div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6 font-display">{p.brand}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                    {p.desc}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-lg font-display font-black">{p.price}</span>
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors"
                    >
                      Browse Specs <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Integration Callout */}
        <section className="mb-40">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-[#0f172a] p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden group"
             >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-transparent"></div>
                <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white mb-8 leading-none">
                   Systemic<br />Alignment
                </h3>
                <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium italic">
                   Once baseline markers are established, we move to high-resolution cellular maintenance and autonomic optimization.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/health/cellular" className="inline-flex items-center px-8 py-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all font-display">
                    Cellular Protocol <ArrowRight size={14} className="ml-3" />
                  </Link>
                  <Link to="/health/maintenance" className="inline-flex items-center px-8 py-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all font-display">
                    Systemic Recovery <ArrowRight size={14} className="ml-3" />
                  </Link>
                </div>
             </motion.div>
             
             <div className="p-12 md:p-20 rounded-[4rem] border border-white/5 bg-white/[0.02] flex flex-col justify-center items-center text-center">
                <Shield size={64} className="text-emerald-400 mb-8" />
                <h3 className="text-3xl font-display font-black uppercase text-white tracking-tight mb-4">Privacy Standards</h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  All genetic and biometric data is encrypted via zero-knowledge proofs. Your biological blueprint remains your property, always.
                </p>
             </div>
           </div>
        </section>

        {/* Final CTA Navigation */}
        <div className="text-center pb-32">
           <Link to="/health" className="inline-flex items-center px-12 py-6 border-2 border-white/10 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:border-emerald-500 hover:text-emerald-500 transition-all hover:scale-105 font-display group shadow-3xl">
             Back to Health Control Center <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}
