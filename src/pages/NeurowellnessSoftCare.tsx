import React from 'react';
import { Activity, ArrowLeft, ArrowRight, Wind, Shield, Layers, Users, Heart, Brain, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';

export default function NeurowellnessSoftCare() {
  const t = useT();

  const techniques = [
    { title: t('wp_soft_sigh'), desc: "Inhale deeply through the nose, followed by a second short inhale to fully inflate the alveoli, then a long, slow exhale. Repeat 1-3 times.", icon: Wind },
    { title: t('wp_soft_box'), desc: "Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Essential for elite performance and cognitive control under pressure.", icon: Shield },
    { title: t('wp_soft_grounding'), desc: "Identify 5 things you can see, 4 feel, 3 hear, 2 smell, and 1 taste. Anchors the nervous system to the immediate environment.", icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/silk.png')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Link to="/neurowellness" className="absolute top-0 left-4 sm:left-6 lg:left-8 inline-flex items-center text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest text-xs transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Master Hub
          </Link>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-200 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-10"
          >
            Protocol B: Soft-Care Somatics
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-8 leading-[0.85]">
            Somatic<br />
            <span className="text-indigo-600 drop-shadow-sm">Healing</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-600 font-medium leading-tight max-w-4xl mx-auto">
            {t('wp_soft_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
                <h3 className="text-3xl font-display font-semibold uppercase tracking-[0.02em] text-[#2D2D2D] mb-6 leading-none">
                  {tech.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {tech.desc}
                </p>
             </motion.div>
           ))}
        </div>

        {/* Backlash Section: Over-Optimization */}
        <div className="relative bg-indigo-950 rounded-[5rem] overflow-hidden p-12 md:p-24 text-white shadow-3xl">
           <img 
             src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
             alt="Somatic release" 
             className="absolute inset-0 w-full h-full object-cover opacity-20"
           />
           <div className="relative z-10 flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-3/5">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 font-bold text-xs uppercase tracking-widest mb-10">
                   <Users size={14} className="mr-2" />
                   The 2026 Cultural Shift
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-semibold uppercase tracking-[0.02em] leading-none mb-10">
                  {t('wp_soft_backlash_title')}
                </h2>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl font-medium">
                  {t('wp_soft_backlash_p')}
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                   <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 font-bold uppercase tracking-widest text-xs">
                      Somatic Release Classes
                   </div>
                   <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 font-bold uppercase tracking-widest text-xs">
                      Collective Energy Sync
                   </div>
                   <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 font-bold uppercase tracking-widest text-xs">
                      Sensor-Free Windows
                   </div>
                </div>
              </div>
              <div className="w-full lg:w-2/5 text-center p-12 bg-white/5 backdrop-blur-xl rounded-[4rem] border border-white/10">
                 <Heart size={80} className="mx-auto text-indigo-400 mb-8 animate-pulse" />
                 <h4 className="text-2xl font-display font-black uppercase mb-6">Restoration Over Ranking</h4>
                 <p className="text-sm text-indigo-200/70 uppercase font-black tracking-widest">Priority: Safety & Joy</p>
              </div>
           </div>
        </div>

        {/* Affiliate / Call to Action */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-12 rounded-[4rem] border border-indigo-100 flex items-center gap-8 group">
              <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                 <Brain size={40} />
              </div>
              <div>
                 <h4 className="text-2xl font-display font-black uppercase text-slate-900 mb-2">Neuro-Recovery Apps</h4>
                 <p className="text-slate-500 text-sm mb-4 font-medium uppercase tracking-widest">2026 Editor's Choice</p>
                 <a href="#" className="inline-flex items-center text-indigo-600 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
                    View Subscriptions <ExternalLink size={14} className="ml-2" />
                 </a>
              </div>
           </div>
           <div className="bg-white p-12 rounded-[4rem] border border-indigo-100 flex items-center gap-8 group">
              <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                 <Wind size={40} />
              </div>
              <div>
                 <h4 className="text-2xl font-display font-black uppercase text-slate-900 mb-2">Air Quality Calibration</h4>
                 <p className="text-slate-500 text-sm mb-4 font-medium uppercase tracking-widest">Environmental Safety</p>
                 <a href="#" className="inline-flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
                    Explore Detectors <ExternalLink size={14} className="ml-2" />
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
