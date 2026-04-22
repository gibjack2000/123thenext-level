import React, { useEffect } from 'react';
import { ArrowLeft, Microscope, Shield, Dna, Info, ExternalLink, Activity, Target, FlaskConical, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

const DIAGNOSTIC_ARSENAL = [
  {
    id: 'ovarian-reserve',
    name: 'Clinical Ovarian Reserve Test',
    provider: 'Modern Fertility',
    desc: 'At-home AMH and FSH diagnostic mapping to determine current biological reserve status.',
    image: 'https://images.unsplash.com/photo-1579165466541-74e2149581ae?q=80&w=400',
    link: 'https://amazon.com/dp/B07RMXG6D8'
  },
  {
    id: 'biological-age',
    name: 'Epigenetic Clock Analysis',
    provider: 'Elysium / Index',
    desc: 'Identify the rate of biological aging vs. chronological time using cellular methylation markers.',
    image: 'https://images.unsplash.com/photo-1581093583449-80d50ad9df23?q=80&w=400',
    link: 'https://amazon.com/dp/B08G8Y5Y5L'
  }
];

export default function OvarianLongevity() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('ol_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-rose-500/30">
      {/* Dynamic Header */}
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559526324-c1f2567e1a97?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            alt="Biological Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/80 via-slate-950 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-rose-300/50 hover:text-rose-300 font-black uppercase tracking-widest transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Women's Health Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-12 bg-rose-500"></div>
             <span className="text-rose-400 font-black text-xs uppercase tracking-[0.4em]">Protocol Path A</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12"
          >
            Ovarian<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-200">Longevity</span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-2 border-rose-500 pl-8">
            Treating the ovary as the <strong>primary driver</strong> of female systemic longevity. Our intervention focus centers on the <strong>Anti-Fibrotic Horizon</strong>—stalling the rapid biological aging of ovarian tissue to protect the brain, bones, and cardiovascular system.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40 relative z-20">
        
        {/* Anti-Fibrotic Horizon: Technical Brief */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-12 mb-8">
             <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">The Anti-Fibrotic <span className="text-rose-500">Mechanism</span></h2>
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 md:p-12 bg-slate-900 border border-white/5 rounded-[3rem] space-y-8">
              <div className="flex items-center gap-4 text-rose-400">
                <Target size={32} />
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight">The 10-Year Accelerant</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                The ovaries age at 2x the rate of other visceral organs. This is driven by <strong>stromal fibrosis</strong>—a hardening of the tissue that triggers systemic inflammation-aging ("Inflamm-aging"). 
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-rose-300 font-black text-[10px] uppercase tracking-widest mb-2">Intervention I</div>
                    <h4 className="font-bold text-white mb-2 uppercase">Endocrine Preservation</h4>
                    <p className="text-xs text-slate-500">Stalling the decline of oocyte quality through mitochondrial NAD+ support.</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-rose-300 font-black text-[10px] uppercase tracking-widest mb-2">Intervention II</div>
                    <h4 className="font-bold text-white mb-2 uppercase">Systemic Shielding</h4>
                    <p className="text-xs text-slate-500">Protecting heart and brain health as the ovarian hormonal signal shifts.</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1579165466541-74e2149581ae?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt="Laboratory" />
              <div className="absolute inset-0 bg-rose-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
            </div>
            <div className="flex items-start gap-4 p-8 bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem]">
               <AlertCircle className="text-rose-500 flex-shrink-0" size={24} />
               <p className="text-sm font-bold text-rose-200 uppercase tracking-tight italic">
                  "Menopause is a clinical event of systemic transition. Ovarian longevity is the protocol to ensure this transition is managed with precision, not luck."
               </p>
            </div>
          </div>
        </section>

        {/* Diagnostic Arsenal Section */}
        <section>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
              <Sparkles size={16} /> Technical Diagnostics
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">The Diagnostic <span className="text-rose-500">Arsenal</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {DIAGNOSTIC_ARSENAL.map((kit) => (
              <div key={kit.id} className="relative group bg-white rounded-[3rem] p-10 flex flex-col items-center text-center text-slate-900 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                
                <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-slate-50 shadow-xl bg-slate-100">
                   <img src={kit.image} className="w-full h-full object-cover" alt={kit.name} />
                </div>
                
                <div className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-2">{kit.provider}</div>
                <h3 className="text-3xl font-display font-black uppercase tracking-tight mb-4 leading-tight">{kit.name}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 max-w-xs">{kit.desc}</p>
                
                <a 
                  href={kit.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-5 bg-slate-950 hover:bg-rose-600 text-white rounded-3xl font-black uppercase tracking-widest transition-all group flex items-center justify-center gap-3"
                >
                  Buy from Amazon <ExternalLink size={18} />
                </a>
                
                <div className="mt-8 pt-8 border-t border-slate-100 w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <CheckCircle2 size={14} className="text-rose-500" /> Clinical Data Integrity Verified
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Endocrine Blueprint Card */}
        <div className="rounded-[4rem] p-12 md:p-24 bg-gradient-to-br from-rose-900/40 to-slate-900 border border-white/5 relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-10 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1544367567-0f9fcb004fb4?q=80&w=1200" className="w-full h-full object-cover" alt="Health Blueprint" />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-5xl font-display font-black uppercase tracking-tighter mb-8 leading-none">The Endocrine <br /><span className="text-rose-400">Blueprint</span></h2>
                 <p className="text-xl text-slate-400 font-medium mb-12 max-w-xl">
                   Deploying the <strong>WH-2026.4 Standard</strong> involves moving from generic hormone management to precision endocrine engineering.
                 </p>
                 <div className="space-y-4">
                    {[
                      "Real-time AMH Mapping",
                      "Cycle-Aligned Resistance Loading",
                      "Anti-Fibrotic Micronutrient Stacks",
                      "Autonomic Nervous System Recalibration"
                    ].map(step => (
                      <div key={step} className="flex items-center gap-4 text-white font-bold uppercase tracking-tight text-sm">
                         <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-[10px] font-black">✓</div>
                         {step}
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-slate-950/60 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10 text-center">
                 <div className="mb-8 p-6 bg-rose-500/10 rounded-full w-fit mx-auto border border-rose-500/20">
                    <FlaskConical className="text-rose-500" size={48} />
                 </div>
                 <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">Protocol Active</h3>
                 <p className="text-slate-500 text-sm font-medium mb-10">All Ovarian Longevity protocols are strictly data-driven. Consult your bio-data dashboard for localized recommendations.</p>
                 <Link to="/womens-health" className="block w-full py-5 border border-white/20 hover:border-rose-500/50 hover:bg-rose-500/10 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
                    Return to Hub
                 </Link>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
