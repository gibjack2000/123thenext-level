import React from 'react';
import { Compass, ArrowRight, Wind, HeartPulse, Sparkles, Zap, Target, Coffee, ScrollText, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const BeginnersGuide = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-amber-500/30">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets2/foundations/beginners_guide.png" alt="Beginners Guide" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-[#0f172a]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/20 backdrop-blur-md">
            Start Your Journey
          </div>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-6">
            Beginners Start Here
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Starting your journey can feel like stepping into a vast ocean, but Daily Wisdom is designed to be your lighthouse.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xl leading-relaxed mb-12 border-l-4 border-amber-500 pl-6 py-2 bg-white/5 rounded-r-2xl">
          It takes ancient, complex teachings and turns them into a clear, step-by-step map for your modern life.
        </p>
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
          <Compass className="text-amber-500" size={32} />
          Why Daily Wisdom is Your Perfect Starting Point
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
            <h3 className="text-xl font-bold text-white mb-3">1. A No-Experience Roadmap</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Volume 1 starts exactly where you are: Developing a Life Practice. Build a simple daily habit that fits into a busy schedule without feeling overwhelmed.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Wind size={24} /></div>
            <h3 className="text-xl font-bold text-white mb-3">2. Practical Tools for Stress</h3>
            <p className="text-slate-300 text-sm leading-relaxed">The Breathing Mindfulness (Vol 7) toolkit teaches you to use your own breath as a remote control for your nervous system to find calm anywhere.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Target size={24} /></div>
            <h3 className="text-xl font-bold text-white mb-3">3. Understand Your Auto-Pilot</h3>
            <p className="text-slate-300 text-sm leading-relaxed">The Six Sense Bases (Vol 9) teaches you to spot the spark of a reaction before it becomes a fire, giving you the power to choose your response.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Coffee size={24} /></div>
            <h3 className="text-xl font-bold text-white mb-3">4. Guidance for Real Life</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Vol 8: The Foremost Householder is about being a better partner and a more focused professional. Find Zen doing the dishes or stuck in traffic.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><ScrollText size={24} /></div>
            <h3 className="text-xl font-bold text-white mb-3">5. Authentic Wisdom, Simplified</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Get the authentic words of the Buddha, translated into language that makes sense today. The gold standard of meditation advice without confusing jargon.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><HeartPulse size={24} /></div>
            <h3 className="text-xl font-bold text-white mb-3">6. A Path with a Purpose</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Whether it is Generosity (Vol 13) or Kamma (Vol 6), you always know why you are practicing and where it leads: a life of less friction and more joy.</p>
          </div>
        </div>
        <div className="p-10 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={120} className="text-amber-500" /></div>
          <h3 className="text-3xl font-bold text-white mb-6 relative z-10">The Vibe of the Journey</h3>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed italic relative z-10">Think of Daily Wisdom as a kind, expert friend walking beside you. It does not demand perfection; it simply invites you to be a little more awake today than yesterday.</p>
          <div className="relative z-10">
            <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">Where would you like to start?</h4>
            <div className="flex flex-wrap gap-4">
              <Link to="/life-practice/breathing-mindfulness" className="inline-flex items-center px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-400 transition-all">Try Breathing Techniques <Play size={18} className="ml-2" /></Link>
              <Link to="/wellness" className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20">Setting Up Your Space <ArrowRight size={18} className="ml-2" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors font-medium">
            <ArrowRight size={20} className="mr-2 rotate-180" />Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeginnersGuide;
