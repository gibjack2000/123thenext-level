import React from 'react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function LovingKindness() {
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
                src="/assets2/foundations/loving_kindness.png" 
                alt="Loving Kindness" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold uppercase tracking-wider mb-6 border border-amber-100">
              <Heart size={16} className="mr-2" />
              Life Practice Foundation V
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-8 leading-tight">
              Loving-kindness <br />
              <span className="text-amber-500">Meditation (Metta)</span>
            </h1>

            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="text-xl font-medium text-slate-700 mb-6 leading-relaxed">
                To attain Enlightenment, an individual needs to focus on developing a practice of Loving-kindness Meditation. This is one of the two core meditations required for the final Goal.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Abandoning Ill-will</h2>
              <p className="mb-6">
                Loving-kindness should be developed specifically to abandon ill-will. It is the antidote to anger, resentment, and hostility. By cultivating this wholesome state, we clear the obstacles to serenity.
              </p>
              
              <div className="bg-amber-50 p-6 my-8 rounded-xl border border-amber-100">
                  <h4 className="font-bold text-amber-900 mb-2">Practice Instructions</h4>
                <ol className="list-decimal pl-6 space-y-4 text-sm text-amber-800">
                   <li><strong>Start with Self:</strong> Begin by wishing yourself well. "May I be happy, may I be peaceful." This is the necessary starting point for extending love to others.</li>
                   <li><strong>Expand to Loved Ones:</strong> Think of a person to whom you feel unconditional love or gratitude. Silently offer them the same wishes.</li>
                   <li><strong>Extend to Neutrals:</strong> Think of someone you feel no particular emotion toward—perhaps a regular checkout clerk or neighbor. Extend the same wishes.</li>
                   <li><strong>The Final Step (All Beings):</strong> Broaden your field of awareness to include all living beings without exception across the entire universe.</li>
                </ol>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">A Shared Humanity</h2>
              <p className="mb-8">
                As with all these Teachings, you can gradually train the mind to move in this direction. The practice of Metta reminds us that every being wants to be happy and free from suffering. By recognizing this shared desire, we develop the "Universal Love" that leads to Enlightenment.
              </p>

              <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 text-amber-400">Enlightenment Requirement</h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
                  Breathing Mindfulness and Loving-kindness are the two meditations required to attain Enlightenment. They are the essential tools to destroy discontentedness and find lasting peace.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
