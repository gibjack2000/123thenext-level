import React, { useEffect } from 'react';
import { ArrowLeft, Brain, Zap, Shield, Info, ExternalLink, Activity, Target, CheckCircle2, FlaskConical, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

const CLINICAL_ARSENAL = [
  {
    id: 'cgm',
    name: 'Metabolic Glucose Monitor',
    provider: 'Stelo / Nutrisense',
    desc: 'Indispensable for mapping real-time glycemic response to stress and nutritional inputs.',
    image: '/Products/stelo.jpg',
    link: 'https://amazon.com/dp/B0D47R9S6D'
  },
  {
    id: 'ltheanine',
    name: 'L-Theanine Complex',
    provider: 'Thorne / 200mg',
    desc: 'Critical for stabilizing the glutamatergic system and enhancing cognitive recovery cycles.',
    image: '/Products/theanine.jpg',
    link: 'https://amazon.com/dp/B0068VAKV6'
  },
  {
    id: 'magnesium',
    name: 'Theanine & Magnesium Suite',
    provider: 'Pure Encapsulations',
    desc: 'Synergistic support for deep sleep architecture and neuro-muscular repair.',
    image: '/Products/magnesium.jpg',
    link: 'https://amazon.com/dp/B0058HWV9S'
  }
];

export default function CognitiveMetabolic() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('cm_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Dynamic Header */}
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20"
            alt="Neuroscience"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-slate-950 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-emerald-300/50 hover:text-emerald-300 font-black uppercase tracking-widest transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Women's Health Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-emerald-500"></div>
             <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em]">Protocol Path C</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            Cognitive<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">Metabolic</span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-2 border-emerald-500 pl-8">
            The female brain is a <strong>metabolic powerhouse</strong>—yet highly sensitive to hormonal shifts. Our protocols prioritize <strong>Neuro-Metabolic Shielding</strong>, using precision fueling and diagnostics to protect against cognitive decline and brain fog.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40 relative z-20">
        
        {/* Neuro-Metabolic Bridge */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-xs uppercase tracking-widest">
              <Target size={14} /> Cognitive Fuel Partitioning
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              The Neuro-Metabolic <span className="text-emerald-500">Bridge</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              {t('cm_creatine_p')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-emerald-400 mb-1">Peak</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Glucose Clearance</span>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
                <span className="block text-4xl font-black text-purple-400 mb-1">-40%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Brain Fog Incidence</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
              alt="Woman Meditating"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>

        {/* Clinical Arsenal Section */}
        <section className="mb-40">
          <div className="text-center mb-20 text-white">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
              <Sparkles size={16} /> Technical Arsenal
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">The Clinical <span className="text-emerald-500">Arsenal</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLINICAL_ARSENAL.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-slate-900 border border-white/5 rounded-[3rem] p-8 flex flex-col group shadow-2xl"
              >
                <div className="aspect-square rounded-[2rem] overflow-hidden mb-8 bg-slate-800 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{item.provider}</div>
                  <h4 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-2 leading-tight">{item.name}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{item.desc}</p>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-white hover:bg-emerald-600 text-slate-950 hover:text-white rounded-2xl text-center font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  Acquire Protocol <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* NAD+ Section */}
        <section className="rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20"
                 style={{
                   backgroundImage: "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2000')",
                   backgroundSize: "cover", backgroundPosition: "center"
                 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-slate-900/65"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {t('cm_nad_title')}
              </h2>
              <p className="text-xl text-emerald-100/70 leading-relaxed">
                {t('cm_nad_p')}
              </p>
              
              <div className="space-y-4">
                <a href={links.nad?.url || "https://amazon.com"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 p-6 bg-white text-emerald-950 rounded-3xl group font-black uppercase tracking-tighter hover:bg-emerald-100 transition-all">
                  Order Mitochondrial Suite <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className="bg-white/5 rounded-[3rem] p-8 border border-white/10 backdrop-blur-xl">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-300 mb-8">Targeted Indicators</h4>
              <div className="space-y-6">
                {[
                  { name: 'Mitochondrial Reserve', percentage: 94 },
                  { name: 'Dermal Resilience', percentage: 88 },
                  { name: 'Metabolic Flexibility', percentage: 91 }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                      <span>{stat.name}</span>
                      <span>{stat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stat.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
