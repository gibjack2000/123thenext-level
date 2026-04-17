import React, { useEffect } from 'react';
import { ArrowLeft, Microscope, Shield, Dna, Info, ExternalLink, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';


export default function OvarianLongevity() {
  const t = useT();
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('ol_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen text-white pb-32 relative"
         style={{
           backgroundImage: "url('https://images.unsplash.com/photo-1559526324-c1f2567e1a97?auto=format&fit=crop&q=80&w=2000')",
           backgroundPosition: "center", backgroundSize: "cover", backgroundAttachment: "fixed", backgroundRepeat: "no-repeat"
         }}>
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/55 via-rose-900/45 to-rose-950/60"></div>
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
      }}></div>

      {/* Header */}
      <div className="relative py-32 overflow-hidden bg-rose-950 text-white">
        <div className="absolute inset-0 bg-rose-500/10 blur-[120px] -mt-64"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/womens-health" className="inline-flex items-center text-white/50 hover:text-white font-black uppercase tracking-tighter transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tight leading-none mb-8"
          >
            {t('ol_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-rose-100/70 max-w-3xl font-medium leading-relaxed border-l-4 border-rose-500 pl-8">
            {t('ol_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 -mt-16 relative z-20">
        {/* Fibrosis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-rose-100">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 font-black text-xs uppercase tracking-widest">
              <Shield size={14} /> Systemic Inflamm-Aging
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('ol_fibrosis_title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('ol_fibrosis_p')}
            </p>
            <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 space-y-4">
              <div className="flex items-center gap-4 text-rose-600">
                <Dna size={24} />
                <span className="font-black uppercase tracking-tighter">Molecular Signaling Protocol</span>
              </div>
              <p className="text-sm text-slate-500 italic">"The ovary is a biological clock for the entire body. Slowing its fibrosis slows the clock for the heart, bones, and brain."</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1579165466541-74e2149581ae?auto=format&fit=crop&q=80&w=800"
              alt="Medical Diagnostics"
              className="relative rounded-[3rem] border border-white shadow-2xl"
            />
          </div>
        </div>

        {/* Diagnostics Section */}
        <section className="rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-rose-900/40"
                 style={{
                   backgroundImage: "url('https://images.unsplash.com/photo-1559526324-c1f2567e1a97?auto=format&fit=crop&q=80&w=2000')",
                   backgroundSize: "cover", backgroundPosition: "center"
                 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/70 to-purple-900/65"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400/10 blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
          }}></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-rose-200 font-black text-xs uppercase tracking-widest">
                <Activity size={14} /> Diagnostic Horizon
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {t('ol_diagnostics_title')}
              </h2>
              <p className="text-xl text-rose-100/70 leading-relaxed max-w-xl">
                {t('ol_diagnostics_p')}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[3rem] p-12 space-y-8"
                 style={{
                   backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f9fcb004fb4?auto=format&fit=crop&q=80&w=1200')",
                   backgroundSize: "cover", backgroundPosition: "center"
                 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/65 to-rose-50/55 rounded-[3rem]"></div>
              <div className="relative z-10 text-slate-900 space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-2">The Longevity Panel</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Clinical Grade Testing</p>
              </div>
              <div className="space-y-4">
                <a href={links.us} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-rose-50 rounded-3xl group hover:bg-rose-600 hover:text-white transition-all">
                  <span className="font-bold uppercase tracking-tight">Ovarian Reserve Home Kit</span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <a href={links.epigenetic} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-rose-50 rounded-3xl group hover:bg-rose-600 hover:text-white transition-all">
                  <span className="font-bold uppercase tracking-tight">Biological Age (Epigenetic)</span>
                  <ExternalLink className="opacity-40 group-hover:opacity-100" size={18} />
                </a>
                <div className="p-6 bg-rose-600 text-white rounded-3xl text-center font-black uppercase tracking-tighter shadow-lg shadow-rose-900/20">
                  Precision Roadmap Activated
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
