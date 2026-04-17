import React from 'react';
import { Microscope, ArrowLeft, ArrowRight, Activity, Zap, Shield, Beaker, Brain, ExternalLink, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function NeurowellnessMetabolism() {
  const t = useT();

  const products = [
    {
      id: 'thorne-creatine',
      name: 'Thorne Creatine',
      desc: 'The essential metabolite for brain ATP recycling. Peer-reviewed to improve cognitive performance during sleep deprivation.',
      price: '$42',
      image: '/Products/thorne.jpg',
      url: '#'
    },
    {
      id: 'vibration-plate',
      name: 'Whole Body Vibration',
      desc: 'Mechanical stimulation to bypass traditional effort and trigger rapid myokine release (Irisin) for neuroprotection.',
      price: '$249',
      image: '/Products/vibration.jpg',
       url: '#'
    },
    {
      id: 'omega-3',
      name: 'Triple Strength Omega-3',
      desc: 'High-dose DHA/EPA essential for maintaining the integrity of the blood-brain barrier and neural fluidity.',
      price: '$58',
      image: '/Products/omega3.jpg',
      url: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 bg-emerald-950 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-circular-blue-and-green-ink-swirl-30462-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-950/80 to-transparent"></div>
        
        {/* Metabolic Motion Blobs */}
        <div className="absolute top-1/2 right-0 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/neurowellness" className="absolute top-0 left-4 sm:left-6 lg:left-8 inline-flex items-center text-emerald-400 hover:text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-16 transition-all group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Neurowellness Hub
          </Link>
          
          <div className="max-w-5xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-12 shadow-sm"
            >
              Protocol C: The Metabolic Link
            </motion.div>
            <h1 className="text-5xl md:text-[8rem] font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
              Muscle-Brain<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Integration</span>
            </h1>
            <p className="text-xl md:text-3xl text-emerald-100/60 font-medium leading-relaxed mb-12 max-w-4xl border-l border-emerald-500/30 pl-8 italic">
              "We used to think the brain controlled the muscles. Now we know the muscles provide the essential chemical signals to keep the brain alive."
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
        {/* The Myokine Revolution */}
        <div className="bg-white rounded-[4rem] shadow-2xl border border-emerald-100 overflow-hidden mb-32">
           <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-emerald-50">
              <div className="p-12 lg:p-24 lg:w-3/5">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-10">
                   Molecular Intelligence
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-[#2D2D2D] mb-8 leading-none">
                  The Myokine Spark
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-12">
                  Skeletal muscle is an endocrine organ. When it contracts, it releases specialized proteins called myokines. The primary myokine, **Irisin**, has the unique ability to cross the blood-brain barrier and trigger the expression of **BDNF** (Brain-Derived Neurotrophic Factor).
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">IRISIN</div>
                      <h4 className="font-display font-bold uppercase text-2xl text-[#2D2D2D] tracking-tight">The Messenger</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Irisin acts as a molecular bridge, signaling the brain that the physical body is being utilized and demanding higher cognitive resource allocation.</p>
                   </div>
                   <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">BDNF</div>
                      <h4 className="font-display font-bold uppercase text-2xl text-[#2D2D2D] tracking-tight">The Fertilizer</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Commonly called "Fertilizer for the Brain," BDNF supports neural plasticity, memory consolidation, and long-term hippocampal volume.</p>
                   </div>
                </div>
              </div>
              <div className="p-12 lg:p-24 lg:w-2/5 bg-emerald-50/20 flex flex-col justify-center text-center">
                 <div className="relative aspect-square mb-12 max-w-xs mx-auto">
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800" 
                      alt="Cerebral metabolic imaging" 
                      className="relative z-10 w-full h-full object-cover rounded-full border-[12px] border-white shadow-3xl grayscale"
                      referrerPolicy="no-referrer"
                    />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4 italic">Verification Layer 01</p>
                 <h5 className="text-xl font-display font-black uppercase text-slate-900 leading-tight">Muscle is Cognitive<br />Insurance.</h5>
              </div>
           </div>
        </div>

        {/* The Metabolic Arsenal: Product Showcase */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-[#2D2D2D] mb-6 tracking-tight">Metabolic Arsenal</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Precision metabolites and tools designed to fuel the ATP demands of a high-performance brain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-[3rem] p-8 border border-emerald-50 shadow-xl hover:-translate-y-4 hover:shadow-3xl transition-all duration-500 flex flex-col group">
                <div className="aspect-[4/3] rounded-[2rem] bg-emerald-50/50 mb-8 overflow-hidden relative">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-emerald-600 font-bold text-xs uppercase shadow-sm">
                     {p.price}
                   </div>
                </div>
                <h3 className="text-2xl font-display font-bold uppercase text-slate-900 mb-4 tracking-tight group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{p.desc}</p>
                <div className="pt-6 border-t border-slate-50">
                   <a href={p.url} className="flex items-center justify-center w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all group/btn shadow-lg">
                     Verify Source <ExternalLink size={12} className="ml-2 group-hover/btn:scale-125 transition-transform" />
                   </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brain ATP Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
           <div className="bg-slate-950 p-12 md:p-24 rounded-[4rem] text-white flex flex-col justify-center shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent"></div>
              <h2 className="text-4xl md:text-[5rem] font-display font-black uppercase tracking-tighter mb-8 leading-[0.85]">
                ATP<br />Recycling
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-md">
                Just as muscle uses phosphocreatine to recycle energy, the brain leverages the same mechanism to power through intensive cognitive loads and mitigate sleep deprivation.
              </p>
              <Link to="/nutrition" className="inline-flex items-center text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors group">
                Browse Full Nutrition Pillar <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>
           <div className="bg-white p-12 md:p-24 rounded-[4rem] border border-emerald-100 flex flex-col justify-center relative group">
              <Beaker size={64} className="text-emerald-600 mb-10 group-hover:rotate-12 transition-transform duration-700" />
              <h3 className="text-4xl font-display font-bold uppercase tracking-tight text-slate-900 mb-6">
                Clinical Benchmarking
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                Understanding the Muscle-Brain Axis is the prerequisite for performance. Measuring your baseline biomarkers for metabolic health is the next tactical step.
              </p>
              <div className="flex gap-4">
                 <div className="px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-[8px] uppercase tracking-widest">HbA1c</div>
                 <div className="px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-[8px] uppercase tracking-widest">DEXA Scan</div>
                 <div className="px-5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-[8px] uppercase tracking-widest">HRV-B</div>
              </div>
           </div>
        </div>

        {/* Final Conversion Block */}
        <div className="text-center pb-32">
           <Link to="/neurowellness/soft-care" className="inline-flex items-center px-12 py-6 border-2 border-slate-200 text-slate-900 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:border-emerald-600 hover:text-emerald-600 transition-all hover:scale-105">
             Explore Somatic Release <ArrowRight size={18} className="ml-3" />
           </Link>
        </div>
      </div>
    </div>
  );
}
