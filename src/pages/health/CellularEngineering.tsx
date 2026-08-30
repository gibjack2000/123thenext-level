import React, { useEffect } from 'react';
import { ArrowLeft, Dna, Microscope, Zap, Shield, ExternalLink, Binary, Sparkles, Target, ArrowRight, FlaskConical, Activity, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';
import ScienceOfAgeReversalWidget from '../../components/ScienceOfAgeReversalWidget';

export default function CellularEngineering() {
  const { links } = useAffiliateLinks();
  const [activeProtocol, setActiveProtocol] = React.useState<'nad' | 'mtor' | 'senolytic' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Cellular Engineering: NAD+ & Autophagy | 123TheNext Level`;
  }, []);

  const products = [
    {
      id: 'nad-precursor',
      name: 'NAD+ Complete',
      brand: 'Renue By Science',
      desc: 'Triple-action NAD+ precursor (NMN, NR, NAD+) for maximum systematic bioavailability and cellular energy production.',
      price: '$84',
      image: links.hp_nad_complete?.image || '/Products/thorne.jpg',
      url: links.hp_nad_complete?.url || 'https://renuebyscience.com/'
    },
    {
      id: 'spermidine',
      name: 'Primeadine Spermidine',
      brand: 'Oxford Healthspan',
      desc: 'Plant-derived autophagy inducer clinically proven to trigger cellular renewal and maintain youthful phenotype.',
      price: '$95',
      image: links.hp_spermidine?.image || '/Products/vitd3.jpg',
      url: links.hp_spermidine?.url || 'https://www.amazon.com/dp/B08J5P8D9D'
    },
    {
      id: 'quercetin',
      name: 'Liposomal Quercetin',
      brand: 'Quicksilver Scientific',
      desc: 'High-bioavailability senolytic and antioxidant to clear senescent cells and reduce systemic inflammation.',
      price: '$52',
      image: links.hp_quercetin?.image || '/Products/thorne.jpg',
      url: links.hp_quercetin?.url || 'https://www.amazon.com/dp/B07BFR4QC2'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
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
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=2000"
            alt="Cellular Intelligence"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-emerald-950/20"></div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)", backgroundSize: "40px 40px" }}>
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
               className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-2xl backdrop-blur-md"
            >
              <Dna size={14} className="mr-3 animate-pulse" />
              Protocol Alpha: Genetic Maintenance
            </motion.div>
            <h1 className="text-5xl md:text-[clamp(4rem,7vw,9.5rem)] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
               Cellular<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
                  Engineering
               </span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-4xl border-l-4 border-indigo-500/50 pl-8 text-left italic">
               "We are no longer victims of our genetic code. We are the architects of our epigenetic expression."
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-48">
        {/* Interactive Lab Link Banner */}
        <div className="mb-20 bg-gradient-to-r from-indigo-950/40 via-blue-950/20 to-slate-900/40 border border-indigo-500/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 transition-opacity">
            <Microscope size={120} className="text-indigo-400" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 font-display inline-block">
                Interactive Learning Hub
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-black uppercase text-white leading-tight">
                Confused by the scientific jargon?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                We have translated Cellular Engineering into simple everyday concepts. Access our interactive Lab Guide to learn how Autophagy, NAD+, and Mitochondria actually work in plain English.
              </p>
            </div>
            <Link to="/health/cellular/deep-dive" className="flex items-center gap-3 px-8 py-5 bg-white text-[#020617] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all font-display shadow-2xl flex-shrink-0 group-hover:scale-105">
              Access Plain-English Guide <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* The Science of Age Reversal Interactive Showcase */}
        <section className="mb-32">
          <div className="mb-8 text-center sm:text-left">
            <span className="text-cyan-400 font-mono font-bold uppercase tracking-[0.25em] text-[10px] bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 inline-block mb-3">
              Flagship Interactive Explorer
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white tracking-tight">
              The Science of Age Reversal
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-3xl">
              Toggle between the 3 core principles of cellular rejuvenation, test the epigenetic scratch simulator, and scrub the dynamic hormesis waveform.
            </p>
          </div>
          <ScienceOfAgeReversalWidget />
        </section>

        {/* The Autophagy Frontier */}
        <section className="mb-40">
          <div className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-12 mb-16 px-4">
                <div className="inline-flex items-center gap-4 text-indigo-400 font-black uppercase tracking-widest text-[10px] bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-500/20 mb-8 font-display">
                  <Microscope size={14} />
                  Intracellular Recycling
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                   The Autophagy Frontier
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl">
                   Autophagy—meaning "self-eating"—is the body's natural mechanism of adaptive cellular renewal. By clearing damaged proteins and organelles, we mitigate the primary drivers of biological decay.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div 
                      onClick={() => setActiveProtocol('nad')}
                      className="p-10 bg-slate-950/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4 hover:bg-indigo-955/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer group justify-between"
                    >
                      <div>
                         <span className="text-4xl font-display font-black text-indigo-400 group-hover:text-indigo-300 transition-colors">NAD+</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display block mt-1">Sirtuin Activation</span>
                         <p className="text-sm text-slate-400 leading-relaxed font-medium mt-2">Critical for DNA repair and cellular energy. NAD+ levels decline by 50% every 20 years without intervention.</p>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 mt-4 inline-block group-hover:text-indigo-300 transition-colors">Open Protocol Details →</span>
                    </div>
                    <div 
                      onClick={() => setActiveProtocol('mtor')}
                      className="p-10 bg-slate-950/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4 hover:bg-emerald-955/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group justify-between"
                    >
                      <div>
                         <span className="text-4xl font-display font-black text-emerald-400 group-hover:text-emerald-300 transition-colors">mTOR</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display block mt-1">Growth Regulation</span>
                         <p className="text-sm text-slate-400 leading-relaxed font-medium mt-2">Strategically inhibiting mTOR through periodic fasting triggers the switch from growth to repair mode.</p>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 mt-4 inline-block group-hover:text-emerald-300 transition-colors">Open Protocol Details →</span>
                    </div>
                 </div>
                 
                 <div 
                   onClick={() => setActiveProtocol('senolytic')}
                   className="p-10 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden hover:bg-emerald-955/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                 >
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                         <Shield size={24} className="text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                         <h4 className="text-xl font-display font-black uppercase text-white tracking-widest">Senolytic Oversight</h4>
                      </div>
                      <p className="text-slate-400 text-base leading-relaxed font-medium">
                         Clearing "zombie cells" (senescent cells) that secrete inflammatory signals is the next tactical step in systemic longevity management.
                      </p>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 mt-6 inline-block group-hover:text-emerald-300 transition-colors">Open Protocol Details →</span>
                 </div>
              </div>

              <div className="lg:col-span-5 relative">
                 <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse"></div>
                 <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200" alt="Cellular Imaging" className="relative z-10 rounded-[4rem] shadow-2xl grayscale brightness-110 opacity-70 border border-white/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Compound Arsenal */}
        <section className="mb-40">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs font-display">Epigenetic Facilitators</span>
              <h2 className="text-5xl md:text-[6rem] font-display font-black uppercase tracking-tighter text-white leading-none">
                 The Arsenal
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-indigo-500/20 pb-4 font-display">
              Tier-1 Cellular Compounds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                   <div className="absolute bottom-8 left-8">
                     <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md font-display">
                        {p.brand}
                     </span>
                   </div>
                   <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-black text-[10px] uppercase border border-white/10 font-display">
                     {p.price}
                   </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-hover:text-indigo-400 transition-colors tracking-tight">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                    {p.desc}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center w-full py-5 bg-white text-[#020617] rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-2xl font-display"
                    >
                      Buy from Amazon <ExternalLink size={14} className="ml-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mitochondrial Density Link */}
        <section className="mb-40">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-[#0f172a] p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden group flex flex-col justify-between"
             >
                <div>
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-transparent"></div>
                  <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white mb-8 leading-none">
                     ATP<br />Generation
                  </h3>
                  <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-12 font-medium">
                    <strong>Mitochondria</strong> are the tiny power generators inside our cells that produce <strong>ATP</strong>—the fundamental energy currency that fuels everything from our muscles to our brain. Over time, these cellular engines slow down and decrease in number, causing fatigue and slower physical recovery. 
                    <br /><br />
                    By engaging in targeted "cellular exercise" (such as Zone 2 cardio and interval training), we trigger a master switch protein called <strong>PGC-1α</strong>. This signals your cells to build fresh, highly efficient mitochondria, restoring youthful energy, boosting metabolic health, and protecting your body from biological decay.
                  </p>
                </div>
                <Link to="/fitness" className="inline-flex items-center text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors group">
                  Browse Fitness Methodology <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
             </motion.div>
             
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white/[0.02] p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-2xl flex flex-col justify-between items-start group"
             >
                <div>
                  <FlaskConical size={64} className="text-indigo-400 mb-10 group-hover:rotate-12 transition-transform duration-700" />
                  <h3 className="text-3xl font-display font-black uppercase text-white tracking-tight mb-6">
                     Epigenetic Tracking
                  </h3>
                  <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-10 font-medium">
                    Your calendar age is just a number, but your <strong>biological age</strong> reveals the actual state of your cells and organs. Epigenetic tracking analyzes chemical tags on your DNA (known as methylation) that turn genes on or off based on your daily sleep, diet, and lifestyle choices.
                    <br /><br />
                    Using state-of-the-art biological speedometers like the <strong>DunedinPACE clock</strong>, we measure your exact rate of aging in real-time. This provides absolute scientific proof of whether our longevity protocols are successfully slowing your internal clock—turning health from guesswork into a data-driven science.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                   {[
                     { label: 'Methylation', id: 'methylation' },
                     { label: 'GlycanAge', id: 'glycanage' },
                     { label: 'Bio-Age Hub', id: 'bioage-hub' }
                   ].map(tag => (
                     <Link 
                       key={tag.id} 
                       to={`/health/cellular/epigenetic-tracking?tab=${tag.id}`}
                       className="px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-widest font-display hover:bg-indigo-600 hover:text-white transition-all hover:scale-105 shadow-md"
                     >
                        {tag.label}
                     </Link>
                   ))}
                </div>
             </motion.div>
           </div>
        </section>

        {/* Final CTA Navigation */}
        <div className="text-center pb-32">
           <Link to="/health/preventive" className="inline-flex items-center px-12 py-6 border-2 border-white/10 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:border-indigo-500 hover:text-indigo-500 transition-all hover:scale-105 font-display group shadow-3xl">
             Explore Biometric Diagnostics <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
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

              {activeProtocol === 'nad' ? (
                <div>
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20">
                    <Binary size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    NAD+ Sirtuin Activation
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-8 block">
                    DNA Repair & Intracellular Energy Optimization
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Sirtuins are NAD+-dependent deacetylases regulating DNA repair, metabolic adaptation, and mitochondrial health. Raising systemic NAD+ pools directly activates SIRT1 and SIRT3.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Precursor Supplementation", desc: "Consume 250-500mg liposomal NMN or NR daily in the morning to maintain optimal intracellular pools." },
                      { step: "02", title: "Sirtuin Activation Synergy", desc: "Combine NAD+ precursors with Resveratrol or Pterostilbene to enhance SIRT1 binding efficiency." },
                      { step: "03", title: "Circadian Synchronization", desc: "Align natural NAD+ production pathways by maintaining consistent sleep/wake cycles and morning light exposure." }
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
              ) : activeProtocol === 'mtor' ? (
                <div>
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/20">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    mTOR Growth Regulation
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-8 block">
                    Autophagy Induction & Intracellular Cleanup
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    mTOR (mechanistic target of rapamycin) regulates cellular protein synthesis. Strategically down-regulating mTOR activity switches cells from replication mode into repair and autophagic clearance.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Therapeutic Fasting Windows", desc: "Implement a monthly 24-36 hour water-only fast to suppress circulating insulin and trigger systemic autophagy." },
                      { step: "02", title: "Amino Acid Restriction", desc: "Periodically limit animal protein consumption to temporarily lower circulating methionine and branched-chain amino acids." },
                      { step: "03", title: "Exercise Sequencing", desc: "Utilize high-intensity resistance workouts to locally stimulate mTOR, followed by nutrient-restricted recovery windows." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
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
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/20">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    Senolytic Oversight
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-8 block">
                    Zombie Cell Clearance & SASP Mitigation
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Senescent cells accumulate with age, releasing inflammatory cytokines (SASP) that damage surrounding tissue. Targeted senolytics selectively eliminate these non-functional cells.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Natural Senolytic Stacks", desc: "Integrate plant-based senolytic compounds (such as Quercetin and Fisetin) to induce apoptosis in senescent cells." },
                      { step: "02", title: "Pulsed Hit-and-Run Schedules", desc: "Take senolytic stacks on a pulsed schedule (e.g., 2 consecutive days per month) to clear targets without continuous tissue exposure." },
                      { step: "03", title: "SASP Cytokine Suppression", desc: "Lower systemic inflammatory loads by pairing cellular clearance with a high-polyphenol anti-inflammatory diet." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
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
