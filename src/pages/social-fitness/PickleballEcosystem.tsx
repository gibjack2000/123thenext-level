import React, { useEffect } from 'react';
import { ArrowLeft, Sun, Users, Activity, ExternalLink, MapPin, Trophy, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../../translations';


export default function PickleballEcosystem() {
  const t = useT();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('pb_title')} | 123TheNext Level`;
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32">
      {/* Header */}
      <div className="relative py-32 overflow-hidden bg-slate-900 text-white">
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
            {t('pb_title')}
          </motion.h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-orange-500 pl-8">
            {t('pb_intro')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 -mt-16 relative z-20">
        {/* Advantage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-orange-100">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 font-black text-xs uppercase tracking-widest">
              <Users size={14} /> Biological Belonging
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {t('pb_advantage_title')}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('pb_advantage_p')}
            </p>
            <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                <Activity size={32} />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-tighter text-orange-900">Nervous System Calibration</h4>
                <p className="text-sm text-orange-700/70">Co-regulation via shared movement and eye contact.</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800"
              alt="Pickleball Players"
              className="relative rounded-[3rem] border border-white shadow-2xl"
            />
          </div>
        </div>

        {/* Conditioning/Clubs Section */}
        <section className="bg-orange-600 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-orange-100 font-black text-xs uppercase tracking-widest">
                <Trophy size={14} /> Club Architecture
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {t('pb_integration_title')}
              </h2>
              <p className="text-xl text-orange-50/80 leading-relaxed">
                {t('pb_integration_p')}
              </p>
              <div className="flex gap-4">
                <a href="https://amazon.com/dp/B0CXM1X8PQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 p-6 bg-white text-orange-600 rounded-3xl font-black uppercase tracking-tighter hover:bg-orange-50 transition-all">
                  Shop Pro Gear <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Hyper-Local Leagues', icon: MapPin },
                { label: 'Group Conditioning', icon: Activity },
                { label: 'Social Safety', icon: Shield },
                { label: 'Active Longevity', icon: Sun }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/10 rounded-[2.5rem] border border-white/20 backdrop-blur-md text-center group hover:bg-white/20 transition-all">
                  <item.icon className="mx-auto mb-4 text-orange-200 group-hover:scale-110 transition-transform" size={32} />
                  <span className="font-black uppercase tracking-tighter text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
