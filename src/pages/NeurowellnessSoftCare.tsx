import React from 'react';
import { Activity, ArrowLeft, ArrowRight, Wind, Shield, Layers, Users, Heart, Brain, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function NeurowellnessSoftCare() {
  const t = useT();

  const techniques = [
    { 
      title: "Physiological Sigh", 
      desc: "The fastest exogenous method to offload CO2 and reset the neural alarm system. Double inhale followed by a long, extended exhale.", 
      icon: Wind 
    },
    { 
      title: "Box Breathing", 
      desc: "Tactical breathwork used by elite operators to decouple the stress response from cognitive execution. 4-4-4-4 ratio.", 
      icon: Shield 
    },
    { 
      title: "5-4-3-2-1 Grounding", 
      desc: "Proprioceptive anchoring that forces the brain to exit a traumatic loop by prioritizing immediate sensory input over internal narrative.", 
      icon: Layers 
    }
  ];

  const products = [
    {
      id: 'sony-xm5',
      name: 'Sony WH-1000XM5',
      desc: 'Industry-leading noise cancellation to create a portable sensory deprivation environment for deep focus.',
      price: '$398',
      image: '/Products/sonyhead.jpg',
      url: '#'
    },
    {
      id: 'grounding-mat',
      name: 'Bio-Static Grounding Mat',
      desc: 'Conductive surface designed to neutralize oxidative stress and synchronize with the Earth’s natural frequency.',
      price: '$129',
      image: '/Products/matt.jpg',
      url: '#'
    },
    {
      id: 'weighted-blanket',
      name: 'Deep Pressure Blanket',
      desc: 'Engineered proprioceptive input to trigger immediate serotonin production and downregulate cortisol.',
      price: '$199',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300',
      url: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/silk.png')] opacity-30"></div>
        
        {/* Soft Ethereal Orbs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Link to="/neurowellness" className="absolute top-0 left-4 sm:left-6 lg:left-8 inline-flex items-center text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-[0.2em] text-[10px] transition-all group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Master Hub
          </Link>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-200 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-12 shadow-sm"
          >
            Protocol B: Soft-Care Somatics
          </motion.div>
          <h1 className="text-6xl md:text-[9rem] font-display font-black uppercase tracking-tighter text-[#2D2D2D] mb-8 leading-[0.85]">
            Somatic<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Healing</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-600 font-medium leading-tight max-w-4xl mx-auto italic border-x border-indigo-100 px-12">
            "The body keeps the score. Soft-Care is the process of rewriting the internal narrative through somatic safety and sensory regulation."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
        {/* Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {techniques.map((tech, idx) => (
             <motion.div 
               key={tech.title}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="bg-white p-12 rounded-[4rem] shadow-xl border border-indigo-50 relative group hover:-translate-y-4 transition-all duration-500"
             >
                <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-10 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <tech.icon size={36} />
                </div>
                <h3 className="text-3xl font-display font-semibold uppercase tracking-tight text-[#2D2D2D] mb-6 leading-none">
                  {tech.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {tech.desc}
                </p>
             </motion.div>
           ))}
        </div>

        {/* Sensory Architecture: Product Showcase */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-[#2D2D2D] mb-6 tracking-tight">Sensory Architecture</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Environment is the primary driver of internal state. These tools optimize your immediate biology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-[3rem] p-8 border border-indigo-50 shadow-xl hover:-translate-y-4 hover:shadow-3xl transition-all duration-500 flex flex-col group">
                <div className="aspect-[4/3] rounded-[2rem] bg-indigo-50/30 mb-8 overflow-hidden relative">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-indigo-600 font-bold text-xs uppercase shadow-sm">
                     {p.price}
                   </div>
                </div>
                <h3 className="text-2xl font-display font-bold uppercase text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{p.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{p.desc}</p>
                <div className="pt-6 border-t border-slate-50">
                   <a href={p.url} className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all group/btn shadow-lg">
                     View Details <ExternalLink size={12} className="ml-2 group-hover/btn:scale-125 transition-transform" />
                   </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backlash Section: Over-Optimization */}
        <div className="relative bg-indigo-950 rounded-[5rem] overflow-hidden p-12 md:p-24 text-white shadow-3xl mb-32">
           <img 
             src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
             alt="Somatic release" 
             className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-[10s] hover:scale-110"
           />
           <div className="relative z-10 flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-3/5">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 font-bold text-[10px] uppercase tracking-[0.2em] mb-10">
                   <Users size={14} className="mr-2" />
                   The 2026 Cultural Shift
                </div>
                <h2 className="text-4xl md:text-8xl font-display font-semibold uppercase tracking-tighter leading-none mb-10">
                  Resilience Over<br />Ranking
                </h2>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl font-medium border-l border-white/20 pl-8">
                  The over-optimization era is ending. Soft-Care prioritizes "The Window of Tolerance"—expanding your capacity to handle stress rather than just tracking it. It’s about returning to the body.
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                   {['Somatic Release', 'Vagus Reset', 'Proprioceptive Sync'].map(tag => (
                     <div key={tag} className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 font-black uppercase tracking-widest text-[10px]">
                        {tag}
                     </div>
                   ))}
                </div>
              </div>
              <div className="w-full lg:w-2/5 text-center p-12 bg-white/5 backdrop-blur-xl rounded-[4rem] border border-white/10 shadow-2xl">
                 <Heart size={80} className="mx-auto text-indigo-400 mb-8 animate-pulse" />
                 <h4 className="text-3xl font-display font-black uppercase mb-6 tracking-tight">Restoration</h4>
                 <p className="text-xs text-indigo-200/70 uppercase font-black tracking-[0.3em]">Safety is the Goal</p>
              </div>
           </div>
        </div>

        {/* Integration Call to Action */}
        <div className="text-center pb-32">
           <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-slate-900 mb-8">
             Cultivate Internal Safety
           </h3>
           <Link to="/neurowellness/hard-care" className="inline-flex items-center px-12 py-6 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all hover:scale-105 shadow-xl">
             Explore Clinical Tech <ArrowRight size={18} className="ml-3" />
           </Link>
        </div>
      </div>
    </div>
  );
}
