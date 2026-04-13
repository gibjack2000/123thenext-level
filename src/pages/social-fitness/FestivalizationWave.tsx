import React, { useEffect } from 'react';
import { ArrowLeft, Music, Zap, Users, ExternalLink, Ticket, Trophy, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';
import UniversalQA from '../../components/UniversalQA';

export default function FestivalizationWave() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('fv_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-orange-950 text-white pb-32">
      {/* Header */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/social-fitness" className="inline-flex items-center text-white/50 hover:text-white font-black uppercase tracking-tighter transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-9xl font-display font-black uppercase tracking-tight leading-[0.85] mb-8"
          >
            {t('fv_title')}
          </motion.h1>
          <p className="text-xl md:text-3xl text-orange-200/70 max-w-4xl font-medium leading-relaxed border-l-4 border-orange-500 pl-8">
            {t('fv_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Rave Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-black text-xs uppercase tracking-widest">
              <Music size={14} /> Neuro-Dopamine Sync
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              {t('fv_rave_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('fv_rave_p')}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <Zap className="text-yellow-400" size={20} />
                <span className="font-bold uppercase tracking-widest text-[10px]">Zero Stimulant</span>
              </div>
              <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <Heart className="text-orange-500" size={20} />
                <span className="font-bold uppercase tracking-widest text-[10px]">Ventral Vagal Safety</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1545127398-14699f999344?auto=format&fit=crop&q=80&w=800"
              alt="Sober Rave Movement"
              className="rounded-[3rem] shadow-2xl border border-white/10"
            />
            <div className="absolute -bottom-8 -right-8 bg-orange-600 p-8 rounded-[2rem] shadow-2xl">
              <Ticket size={40} />
            </div>
          </div>
        </div>

        {/* Revolution Section */}
        <section className="bg-white rounded-[4rem] p-10 md:p-20 text-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ea580c 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-600/10 border border-orange-600/30 text-orange-600 font-black text-xs uppercase tracking-widest">
                <Trophy size={14} /> Collective Athletics
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {t('fv_revolution_title')}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('fv_revolution_p')}
              </p>
              <div className="flex gap-4 pt-4">
                <a href="https://hyrox.com" target="_blank" rel="noopener noreferrer" className="flex-grow flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-tighter hover:bg-orange-600 transition-all text-sm md:text-base group">
                  Access Mass Event Tickets <ExternalLink className="group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </div>
            </div>
            <div className="bg-orange-50 rounded-[3rem] p-12 border border-orange-100 flex flex-col justify-center text-center">
              <Users size={64} className="mx-auto text-orange-600 mb-6" />
              <h4 className="text-2xl font-display font-black uppercase tracking-tight mb-2">Social Strength</h4>
              <p className="text-slate-500 font-medium">Training is a solo discipline. Performance is a collective act.</p>
            </div>
          </div>
        </section>

        <UniversalQA />
      </div>
    </div>
  );
}
