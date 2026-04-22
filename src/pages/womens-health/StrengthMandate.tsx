import React, { useEffect } from 'react';
import { ArrowLeft, Dumbbell, Zap, Shield, Info, ExternalLink, Activity, Trophy, CheckCircle2, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

const PERFORMANCE_LAB = [
  {
    id: 'dumbbells',
    name: 'Cast Iron Strength Kit',
    category: 'Mechanical Loading',
    desc: 'Indispensable for stimulating bone density reserves and sarcomere hypertrophy.',
    image: '/Products/dumbell.jpg',
    link: 'https://amazon.com/dp/B0030HV9S2'
  },
  {
    id: 'vibration-plate',
    name: 'Clinical Vibration Plate',
    category: 'Somatic Stimulus',
    desc: 'Enhances lymphatic drainage and bone morphogenic protein signaling.',
    image: '/Products/vibration.jpg',
    link: 'https://amazon.com/dp/B07P7D8H9G'
  },
  {
    id: 'resistance-bands',
    name: 'Precision Resistance Suite',
    category: 'Variable Loading',
    desc: 'Optimal for eccentric control and multi-planar structural stability.',
    image: '/Products/4straps.jpg',
    link: 'https://amazon.com/dp/B01AVDVHTI'
  }
];

export default function StrengthMandate() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('sm_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Dynamic Header */}
      <div className="relative py-32 md:py-48 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549476012-0a42608c89d6?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="Strength Training"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-slate-950 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-blue-300/50 hover:text-blue-300 font-black uppercase tracking-widest transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Women's Health Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-blue-500"></div>
             <span className="text-blue-400 font-black text-xs uppercase tracking-[0.4em]">Protocol Path B</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            Strength<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-200 uppercase">Mandate</span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-2 border-blue-500 pl-8">
            Muscle is the most important <strong>endocrine organ</strong> in the female body. The mandate is simple: <strong>Heavy Resistance Training (HRT)</strong> is not optional—it is a clinical requirement for cardiorespiratory fitness, bone density, and metabolic flexibility.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40 relative z-20">
        
        {/* The Endocrine Muscle Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black text-xs uppercase tracking-widest">
              <Target size={14} /> Myokine Signal Synthesis
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              The Muscle-Brain <span className="text-blue-500">Axis</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              Every heavy lift releases <strong>myokines</strong>—signaling proteins like Irisin and BDNF that cross the blood-brain barrier to promote cognitive health. As estrogen fluctuations occur, muscle mass preservation (preventing sarcopenia) becomes the primary shield against metabolic dysfunction.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-blue-400 mb-1">+22%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Insulin Sensitivity Flux</span>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-emerald-400 mb-1">Peak</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Autonomic Homeostasis</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="https://images.unsplash.com/photo-1541534741688-6078c64b5cc5?auto=format&fit=crop&q=80&w=800"
              alt="Woman Strength Training"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

        {/* Performance Lab Section */}
        <section className="mb-40">
          <div className="text-center mb-20 text-white">
            <div className="inline-flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
              <Sparkles size={16} /> Technical Arsenal
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">The Performance <span className="text-blue-500">Lab</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PERFORMANCE_LAB.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-slate-900 border border-white/5 rounded-[3rem] p-8 flex flex-col group shadow-2xl"
              >
                <div className="aspect-square rounded-[2rem] overflow-hidden mb-8 bg-slate-800 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">{item.category}</div>
                  <h4 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-2 leading-tight">{item.name}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{item.desc}</p>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-white hover:bg-blue-600 text-slate-950 hover:text-white rounded-2xl text-center font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  Acquire Hardware <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Loading Protocol Card */}
        <section className="rounded-[4rem] p-12 md:p-24 bg-gradient-to-br from-blue-900/40 to-slate-900 border border-white/5 relative overflow-hidden">
           <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
             <div className="order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
                  alt="Strength Protocol"
                  className="rounded-[3rem] shadow-2xl border border-white/5"
                />
             </div>
             <div className="order-1 lg:order-2 space-y-10">
               <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-400 font-black text-xs uppercase tracking-widest">
                 <Trophy size={14} /> 2026 Strength Standard
               </div>
               <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                 The Resistance <span className="text-blue-500">Framework</span>
               </h2>
               <p className="text-xl text-slate-400 leading-relaxed font-medium">
                 Stop "toning." Start <strong>rebuilding</strong>. Our protocols focus on high-mechanical tension and explosive concentric actions to maintain fast-twitch fiber integrity as you age.
               </p>
               
               <div className="space-y-4">
                  {[
                    "Compound Displacement Mastery",
                    "Hypertrophy Rep Cycles",
                    "Neuromuscular Force Production",
                    "Structural Symmetry Analysis"
                  ].map(step => (
                    <div key={step} className="flex items-center gap-4 text-white font-bold uppercase tracking-tight text-sm">
                       <CheckCircle2 size={18} className="text-blue-500" />
                       {step}
                    </div>
                  ))}
               </div>
               
               <a href={links.strength.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/40">
                  Shop Protocol Hardware <ExternalLink size={20} />
               </a>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
}
