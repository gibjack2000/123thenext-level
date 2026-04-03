import React from 'react';
import { ArrowLeft, Wind, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function BreathingMindfulness() {
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
                src="/assets2/foundations/breathing_mindfulness.png" 
                alt="Breathing Mindfulness" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold uppercase tracking-wider mb-6 border border-amber-100">
              <Wind size={16} className="mr-2" />
              Life Practice Foundation IV
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-8 leading-tight">
              Breathing <br />
              <span className="text-amber-500">Mindfulness Meditation</span>
            </h1>

            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="text-xl font-medium text-slate-700 mb-6 leading-relaxed">
                Breathing Mindfulness Meditation is the foundation of a practice in these Teachings and should be developed as the primary meditation practiced daily.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Purpose of the Breath</h2>
              <p className="mb-6">
                Meditation is used to clear past and future thoughts along with attachment to thoughts, emotions, and situations. By bringing the mind to the present moment, we can walk the middle way.
              </p>
              
              <div className="bg-amber-50 p-6 my-8 rounded-xl border border-amber-100 italic font-medium">
                "Cutting off thoughts does not mean you will never have thoughts. It means you train the mind not to hold on to thoughts, ideas, and perceptions—because then you would be attached to them."
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">A Simple Practice Guide</h2>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">1</span>
                  <div>
                    <h4 className="font-bold text-slate-900">Establish a Daily Rhythm</h4>
                    <p className="text-sm">Dedicate a specific time each day for this practice. Regularity is the key to training the mind's patterns.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">2</span>
                  <div>
                    <h4 className="font-bold text-slate-900">The Focus: The Breath</h4>
                    <p className="text-sm">Sit comfortably and focus your awareness on the natural flow of your breath. If the mind wanders, gently bring it back without judgment.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">3</span>
                  <div>
                    <h4 className="font-bold text-slate-900">Letting Go of Attachment</h4>
                    <p className="text-sm">Observe thoughts as they arise, but do not 'grab' them. Let them pass like clouds in the sky. By not attaching to thoughts and ideas, you prevent the 'discontentedness' that occurs when expectations are not met.</p>
                  </div>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 italic">Insights from The Buddha</h2>
              <p className="mb-8">
                You will need meditation to clear past and future thoughts. It will help you walk the middle way. All these meditation techniques should be learned with the guidance of a Teacher as one will need assistance on The Path.
              </p>

              <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl opacity-50" />
                <h3 className="text-xl font-bold mb-4 text-amber-400">The Middle Way</h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
                   Mindfulness of the breath is the primary tool to bring the mind back from the past or future into the reality of the present moment.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
