import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Compass, Dumbbell, Apple, Heart, Sparkles, 
  ArrowRight, Shield, Activity, Brain, Moon
} from 'lucide-react';

export default function StartHere() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans">
      
      {/* 1. Welcoming Introduction (The 'Why') */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-slate-950" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] -mr-32 -mt-32" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold tracking-wider uppercase mb-8 border border-blue-500/20">
              <Compass size={16} className="mr-2" />
              Beginner's Pathway
            </div>
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-8 leading-tight">
              The best time to start was <span className="text-blue-500">yesterday</span>.<br />
              The second best time is <span className="text-blue-400">now</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-6">
              Good health is about keeping the body strong, active, and independent. Our Six-Pillar plan provides a clear map to balance both body and mind.
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Sustainable health is simply about small, consistent daily steps. Do not wait for "warning signals" before giving your body the care it deserves. Start your journey today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Drivers of Good Health & Diagnostics Section */}
      <section className="relative py-24 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white border-l-4 border-blue-500 pl-4">
                The biggest changes driving <br />
                <span className="text-blue-400">today's approach to health</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-base font-medium">
                The fundamental shift in how we deal with health today is the <strong className="text-white">transition from "reactive repair to proactive optimization"</strong>. Instead of waiting to treat illnesses, the focus has moved toward disease prevention and biological age reversal using the "2026 Longevity Standards".
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                This shift is largely driven by the scientific realization that <strong className="text-white">80% to 90% of how quickly you age depends on your lifestyle and "Epigenetics,"</strong> rather than just your genetics. As a result, the health landscape has evolved into what your site calls "Medicalized Wellness," which replaces generic dieting and wellness routines with highly specific, clinical-level precision, such as optimizing glycemic control or tailoring protocols specifically to female biology.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-6 space-y-6 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white border-l-4 border-indigo-500 pl-4">
                The importance of <br />
                <span className="text-indigo-400">lab diagnostics and health data</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-base font-medium">
                Because health has shifted toward precise, proactive optimization, gathering personal health data through lab diagnostics is critical. The goal is to <strong className="text-indigo-400 font-bold">"Stop guessing. Start knowing."</strong>
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mr-4 text-xs font-bold font-display">1</span>
                  <div>
                    <strong className="text-white block mb-1 text-sm">Precision Over Generalization</strong>
                    <span className="text-slate-400 text-sm leading-relaxed block">Transition from "general fitness to precision performance and recovery". By tracking metrics like "Real-time HRV" or "Hormonal Bio-Data," you can fuel your body's biological machinery with exact measurements.</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mr-4 text-xs font-bold font-display">2</span>
                  <div>
                    <strong className="text-white block mb-1 text-sm">Tracking Biological Age</strong>
                    <span className="text-slate-400 text-sm leading-relaxed block">Diagnostics allow you to measure whether your lifestyle changes are actually working. Test your biological age at home using a "Biological Age (Epigenetic) Test".</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mr-4 text-xs font-bold font-display">3</span>
                  <div>
                    <strong className="text-white block mb-1 text-sm">Targeted Optimization</strong>
                    <span className="text-slate-400 text-sm leading-relaxed block">Accessing specific biomarkers helps map out targeted protocols. For example, utilizing an "Ovarian Reserve Test Kit" provides clinical precision for women's health, while testing can help identify "42 more intelligence markers" to guide your journey.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-300 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-rose-500 via-indigo-500 to-rose-500" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-black uppercase tracking-widest mb-4 border border-rose-500/20">
                Establish Baseline Urgency
              </span>
              <p className="text-xl md:text-2xl text-white font-bold mb-4 leading-snug max-w-3xl mx-auto">
                There is an urgent need to get your basic necessary tests done today.
              </p>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-6 leading-relaxed">
                Establishing your biological baseline is the critical starting point to determine where your health stands and map out an exact, personalized course of action.
              </p>
              <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed border-t border-slate-800 pt-4">
                By building a foundation on <strong className="text-white">personal health data rather than waiting for "warning signals,"</strong> you can actively protect your body and maintain physical and mental resilience as you age.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Step 1: Learn the Language (Handholding) */}
      <section className="relative py-24 bg-slate-900 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-blue-500 font-black tracking-widest uppercase mb-2 text-sm">Step 1</div>
              <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-white mb-6">
                Learn the <span className="text-blue-400">Language</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                As you explore our platform, you will encounter advanced clinical terminology like "Autophagy Induction" and "Glycemic Index Mastering." Don't let the science overwhelm you. 
                <br /><br />
                We built a comprehensive Jargon Buster to handhold you through these concepts so you never feel lost.
              </p>
              <Link to="/glossary" className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-colors border border-slate-700 group">
                <BookOpen size={18} className="mr-3 text-blue-400" />
                Access the Glossary
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700/50 shadow-2xl backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <BookOpen size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/50">
                  <span className="text-blue-400 font-bold block mb-1">VO2 Max</span>
                  <span className="text-sm text-slate-400">The maximum rate of oxygen consumption measured during incremental exercise.</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/50">
                  <span className="text-emerald-400 font-bold block mb-1">Autophagy</span>
                  <span className="text-sm text-slate-400">The body's way of cleaning out damaged cells, in order to regenerate newer, healthier cells.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Step 2: Build the Foundation (Free Content) */}
      <section className="relative py-24 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-amber-500 font-black tracking-widest uppercase mb-2 text-sm">Step 2</div>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-white mb-6">
              Build the <span className="text-amber-500">Foundation</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Before running, we must walk. Start your mindful journey by setting the right mindset and optimizing your physical activity at home—no gym required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/life-practice/beginners-guide" className="block p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group h-full shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Mindset: The Beginner's Guide</h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Prepare your mind for a life-changing journey. Understanding the 'why' is critical before exploring the 'how'.
                </p>
                <span className="text-sm font-bold uppercase tracking-wider text-amber-500 flex items-center">
                  Read the Guide <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/fitness/fundamentals" className="block p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group h-full shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
                  <Dumbbell size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Strength Training at Home</h3>
                <div className="inline-flex items-center px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded mb-4">12-Minute Read</div>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Our foundational free guide to optimizing your physical activity without needing a gym membership or expensive equipment.
                </p>
                <span className="text-sm font-bold uppercase tracking-wider text-amber-500 flex items-center">
                  Start Training <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Step 3: Take Action (Monetization Funnel) */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="text-emerald-400 font-black tracking-widest uppercase mb-2 text-sm">Step 3</div>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-white mb-6">
              Take Action with <br className="md:hidden" /><span className="text-emerald-400">Digital Master Guides</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Ready to implement a structured plan? Our zero-barrier entry-level guides provide systematic approaches to fitness and nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Guide 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-950 border border-slate-800 p-8 rounded-3xl flex flex-col hover:border-emerald-500/50 transition-all shadow-2xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Activity size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Beginner Home Workout Plan</h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                A definitive 4-week zero-equipment protocol. Build foundational strength, increase mobility, and establish a bulletproof routine from the comfort of your living room.
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800">
                <span className="text-2xl font-black text-white">£19.00</span>
                <Link to="/premium-guides" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors uppercase tracking-wider">
                  Get Plan
                </Link>
              </div>
            </motion.div>

            {/* Guide 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-950 border border-slate-800 p-8 rounded-3xl flex flex-col hover:border-emerald-500/50 transition-all shadow-2xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Apple size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">The Master Meal Planning Guide</h3>
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                The practical next step. A systematic approach to weekly meal prep and macro-balancing to ensure your body is fueled with optimal metabolic nutrition.
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800">
                <span className="text-2xl font-black text-white">£24.00</span>
                <Link to="/premium-guides" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors uppercase tracking-wider">
                  Get Guide
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Step 4: Explore the Six Pillars (The Holistic Benefit) */}
      <section className="relative py-24 bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-purple-400 font-black tracking-widest uppercase mb-2 text-sm">Step 4</div>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-white mb-6">
              Explore the <span className="text-purple-400">Six Pillars</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              True longevity comes from understanding how these systems are interconnected. 
              Metabolic Nutrition fuels the body, Restorative Sleep rebuilds it, and Mental Well-Being manages the stress that breaks it down.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { icon: Apple, label: "Metabolic Nutrition", color: "text-emerald-400", bg: "bg-emerald-500/10", path: "/nutrition" },
              { icon: Activity, label: "Physical Activity", color: "text-blue-400", bg: "bg-blue-500/10", path: "/fitness" },
              { icon: Moon, label: "Restorative Sleep", color: "text-indigo-400", bg: "bg-indigo-500/10", path: "/neurowellness" },
              { icon: Brain, label: "Mental Well-Being", color: "text-purple-400", bg: "bg-purple-500/10", path: "/wellness" },
              { icon: Heart, label: "Social Fitness", color: "text-rose-400", bg: "bg-rose-500/10", path: "/social-fitness" },
              { icon: Shield, label: "Preventive Health", color: "text-amber-400", bg: "bg-amber-500/10", path: "/health/preventive" }
            ].map((pillar, i) => (
              <Link 
                key={i}
                to={pillar.path}
                className="block group"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all cursor-pointer h-full shadow-lg hover:shadow-2xl"
                >
                  <div className={`w-12 h-12 rounded-xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon size={24} />
                  </div>
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-wide group-hover:text-white transition-colors">{pillar.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">Ready for the Next Level?</h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Once you master these basics, enter the Intelligence Hub to access the latest technical deep-dives and evidence-based optimization updates.
              </p>
              <Link to="/intelligence-hub" className="inline-flex items-center px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105 shadow-lg">
                <Sparkles size={18} className="mr-2" />
                Enter the Intelligence Hub
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
