import React, { useEffect } from 'react';
import { ArrowLeft, Dna, Microscope, Zap, Shield, ExternalLink, Binary, Sparkles, Target, ArrowRight, FlaskConical, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function CellularEngineering() {
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
      image: '/Products/thorne.jpg',
      url: 'https://renuebyscience.com/'
    },
    {
      id: 'spermidine',
      name: 'Primeadine Spermidine',
      brand: 'Oxford Healthspan',
      desc: 'Plant-derived autophagy inducer clinically proven to trigger cellular renewal and maintain youthful phenotype.',
      price: '$95',
      image: '/Products/vitd3.jpg',
      url: '#'
    },
    {
      id: 'quercetin',
      name: 'Liposomal Quercetin',
      brand: 'Quicksilver Scientific',
      desc: 'High-bioavailability senolytic and antioxidant to clear senescent cells and reduce systemic inflammation.',
      price: '$52',
      image: '/Products/thorne.jpg',
      url: '#'
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
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-10 bg-slate-950/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4"
                    >
                       <span className="text-4xl font-display font-black text-indigo-400">NAD+</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display">Sirtuin Activation</span>
                       <p className="text-sm text-slate-500 leading-relaxed font-medium">Critical for DNA repair and cellular energy. NAD+ levels decline by 50% every 20 years without intervention.</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-10 bg-slate-950/50 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col gap-4"
                    >
                       <span className="text-4xl font-display font-black text-emerald-400">mTOR</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-display">Growth Regulation</span>
                       <p className="text-sm text-slate-500 leading-relaxed font-medium">Strategically inhibiting mTOR through periodic fasting triggers the switch from growth to repair mode.</p>
                    </motion.div>
                 </div>
                 
                 <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-4 mb-6">
                       <Shield size={24} className="text-emerald-500" />
                       <h4 className="text-xl font-display font-black uppercase text-white tracking-widest">Senolytic Oversight</h4>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed font-medium">
                       Clearing "zombie cells" (senescent cells) that secrete inflammatory signals is the next tactical step in systemic longevity management.
                    </p>
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
               className="bg-[#0f172a] p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden group"
             >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-transparent"></div>
                <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white mb-8 leading-none">
                   ATP<br />Generation
                </h3>
                <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium italic">
                   Mitochondria are the powerplants of our biology. Enhancing their density through PGC-1α induction is the primary goal of cellular exercise.
                </p>
                <Link to="/fitness" className="inline-flex items-center text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors group">
                  Browse Fitness Methodology <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
             </motion.div>
             
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white/[0.02] p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-2xl flex flex-col justify-center items-start group"
             >
                <FlaskConical size={64} className="text-indigo-400 mb-10 group-hover:rotate-12 transition-transform duration-700" />
                <h3 className="text-3xl font-display font-black uppercase text-white tracking-tight mb-6">
                   Epigenetic Tracking
                </h3>
                <p className="text-lg text-slate-500 leading-relaxed mb-10 font-medium">
                   We use DunedinPACE and other 3rd-generation clocks to verify that our interventions are effectively slowing the pace of aging.
                </p>
                <div className="flex flex-wrap gap-4">
                   {['Methylation', 'GlycanAge', 'Bio-Age Hub'].map(tag => (
                     <div key={tag} className="px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-widest font-display">
                        {tag}
                     </div>
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
    </div>
  );
}
