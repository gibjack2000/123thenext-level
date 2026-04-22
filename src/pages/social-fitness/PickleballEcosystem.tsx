import React, { useEffect } from 'react';
import { ArrowLeft, Sun, Users, Activity, ExternalLink, MapPin, Trophy, Shield, Zap, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';

export default function PickleballEcosystem() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('pb_title')} | 123TheNext Level`;
  }, [t]);

  const pickleballArsenal = [
    {
      name: "Selkirk Vanguard Control",
      brand: "Pro Performance",
      desc: "Engineered for maximum proprioceptive feedback and high-fidelity ball control.",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=400",
      asin: "B0CMP1X8PQ"
    },
    {
      name: "JOOLA Perseus CFS",
      brand: "Elite Tournament",
      desc: "Hyper-responsive carbon surface for peak kinetic energy transfer and spin optimization.",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=401",
      asin: "B0D5N6X8Z2"
    },
    {
      name: "Skechers Viper Court",
      brand: "Joint Health",
      desc: "Arch-fit technology designed specifically for the lateral load profiles of 2026 court play.",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=402",
      asin: "B0CMB6X8Y1"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30">
      {/* Header: Cinematic Tech Overlay */}
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-orange-600/10 blur-[120px] -mt-64"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,140,94,0.05)_0%,transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/social-fitness" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Hub</span>
          </Link>
          
          <div className="flex flex-col items-start gap-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black text-[10px] uppercase tracking-widest"
            >
              <Zap size={14} /> Neural Coupling: Court Optimized
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-display font-black uppercase tracking-tight leading-[0.85] text-white"
            >
              Pickleball<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Ecosystem</span>
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-orange-500 pl-8">
              {t('pb_intro')} We leverage court-based play as a diagnostic and therapeutic tool for social health and cardiovascular resilience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40">
        {/* Advantage Section: Biological Striving */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
                Biological<br />Belonging
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {t('pb_advantage_p')} Performance play triggers the HPA axis in a way that promotes "The Winner Effect," increasing social drive and lowering sub-clinical stress markers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Neural Co-Regulation', desc: 'Real-time eye contact and movement synchronization lowers cortisol.', icon: Activity },
                { title: 'Cardiovascular Elasticity', desc: 'HIIT-equivalent intervals disguised as strategic social play.', icon: Target }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-[3rem] border border-white/10 flex items-start gap-6 group hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/20 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-black uppercase tracking-tight text-white mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-500/10 rounded-[4rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200"
              alt="Pickleball Court Performance"
              className="relative rounded-[3rem] border border-white/5 shadow-3xl grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* The Pickleball Arsenal: Product Grid */}
        <section className="pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">Essential Gear</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                The Arsenal
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pickleballArsenal.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8] grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <a href={`https://amazon.com/dp/${product.asin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/btn">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover/btn:text-orange-400 transition-colors">Buy from Amazon</span>
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover/btn:bg-orange-500 group-hover/btn:text-white transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA: Navigation */}
        <section className="bg-gradient-to-tr from-orange-600/20 to-amber-600/5 rounded-[4rem] p-12 md:p-24 border border-white/5 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              Continue Your Social Striving
            </h2>
            <p className="text-xl text-slate-400 font-medium">
              Explore the rest of the Social Fitness architecture or return to the central hub.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/social-fitness/festivals" className="px-10 py-6 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-tight hover:bg-orange-500 hover:text-white transition-all shadow-xl">
              Festivalization Protokol <ArrowRight className="inline ml-2" size={20} />
            </Link>
            <Link to="/social-fitness" className="px-10 py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-tight hover:bg-slate-800 transition-all border border-white/10">
              Return to Hub
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
