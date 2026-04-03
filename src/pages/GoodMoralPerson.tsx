import React from 'react';
import { ArrowLeft, UserCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function GoodMoralPerson() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 blur-[80px] rounded-full -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-inner">
              <img 
                src="/assets2/foundations/moral_integrity.png" 
                alt="Moral Person" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold uppercase tracking-wider mb-6 border border-amber-100">
              <UserCheck size={16} className="mr-2" />
              Life Practice Foundation III
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-8 leading-tight">
              Be a <br />
              <span className="text-amber-500">Good Moral Person</span>
            </h1>

            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="text-xl font-medium text-slate-700 mb-6 leading-relaxed">
                The essence of being a good moral person is to live with integrity, transparency, and a commitment to wholesome choices. It is the practice of aligning your daily life with the principles that lead to Enlightenment.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Wise Decision-Making</h2>
              <p className="mb-6">
                Attaining Enlightenment is the result of making exclusively wise, wholesome decisions based on The Eight Fold Path. Through making wholesome choices, we experience wholesome outcomes; through unwholesome choices, we experience the results of suffering and discontentedness.
              </p>
              
              <div className="bg-slate-50 p-8 my-8 rounded-2xl border border-slate-100 italic">
                <h4 className="font-bold text-slate-900 mb-2 not-italic">Reflect with Your Teacher and Wise Friends</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  "Gotama Buddha guided us to share our unwholesome conduct with our Teachers or wise friends on The Path. This admitting that we are not perfect allows us to gain insight, eliminate ego, and gain restraint for the future."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Integrity and Trust</h2>
              <p className="mb-6">
                A good moral person is a "truth-speaker," someone who can be relied on, who is trustworthy and dependable. They are not deceivers of the world. This integrity is the foundation of inner peace.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">1</span>
                  <span><strong>Practice Honesty:</strong> Let your word be your bond. Commit to truthfulness in every interaction, large or small.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">2</span>
                  <span><strong>Choose Wisely:</strong> Before acting, consider whether your choice is 'wholesome' (based on wisdom and kindness) or 'unwholesome' (based on ego or greed).</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">3</span>
                  <span><strong>Cultivate Modesty:</strong> Admitting mistakes is a sign of strength. Use your errors as stepping stones for growth by seeking guidance from those further along The Path.</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 italic">Insights from The Buddha</h2>
              <p className="mb-8">
                By basing yourself on wholesome states, you can reside peacefully and joyfully, training day and night. Being a good moral person is not about following rules to please others; it is about creating a life that is conducive to the growth of your own mind.
              </p>

              <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 text-amber-400 flex items-center justify-center">
                  <Sparkles size={20} className="mr-2" />
                  Foundation Note
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
                  A moral life is the ground upon which meditation can flourish. Without morality, the mind is too restless to find true peace.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
