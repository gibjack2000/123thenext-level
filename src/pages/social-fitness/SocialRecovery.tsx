import React, { useEffect } from 'react';
import { ArrowLeft, Thermometer, Smile, Users, ExternalLink, Heart, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';


export default function SocialRecovery() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('sr_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-32">
      {/* Header */}
      <div className="relative py-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-orange-600/10 blur-[120px] -mt-64"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/social-fitness" className="inline-flex items-center text-white/50 hover:text-white font-black uppercase tracking-tighter transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tight leading-none mb-8"
          >
            {t('sr_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-orange-500 pl-8">
            {t('sr_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 -mt-16 relative z-20">
        {/* Sauna Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 bg-slate-900 p-12 rounded-[3rem] shadow-xl border border-white/5 backdrop-blur-md">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-black text-xs uppercase tracking-widest">
              <Thermometer size={14} /> Shared Physiology
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('sr_sauna_title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('sr_sauna_p')}
            </p>
            <div className="flex gap-4">
              <a href="https://amazon.com/dp/B0CMB6X8Y1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 p-6 bg-orange-600 text-white rounded-3xl font-black uppercase tracking-tighter hover:bg-orange-700 transition-all text-sm group">
                Shop Social Recovery Pods <ExternalLink className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-500/20 rounded-[4rem] blur-2xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800"
              alt="Social Sauna Ritual"
              className="relative rounded-[3rem] border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Catharsis Section */}
        <section className="bg-white rounded-[4rem] p-10 md:p-20 text-slate-900 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
                alt="Group Somatic Release"
                className="rounded-[3rem] shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-600/10 border border-orange-600/30 text-orange-600 font-black text-xs uppercase tracking-widest">
                <Smile size={14} /> Somatic Safety 2026
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {t('sr_catharsis_title')}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('sr_catharsis_p')}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-center text-center">
                  <Heart className="mx-auto text-orange-500 mb-2" size={24} />
                  <span className="font-black uppercase tracking-tighter text-[10px]">Co-Regulation</span>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-center text-center">
                  <Shield className="mx-auto text-blue-500 mb-2" size={24} />
                  <span className="font-black uppercase tracking-tighter text-[10px]">Vagus Safety</span>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
