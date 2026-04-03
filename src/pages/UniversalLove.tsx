import React from 'react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function UniversalLove() {
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
                src="/assets2/foundations/universal_love.png" 
                alt="Universal Love" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold uppercase tracking-wider mb-6 border border-amber-100">
              <Heart size={16} className="mr-2" />
              Life Practice Foundation I
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-8 leading-tight">
              Universal Love <br />
              <span className="text-amber-500">For All Beings</span>
            </h1>

            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="text-xl font-medium text-slate-700 mb-6 leading-relaxed">
                One aspect of progressing to Enlightenment is to develop loving-kindness and compassion for all living beings. This is not a selective love, but a universal orientation toward every form of life.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Ancient Connection</h2>
              <p className="mb-6">
                According to the original Teachings, all beings that exist today have experienced countless rebirths in multiple forms. It is taught that it would be difficult to find a being in existence that has not previously been our mother, father, sister, brother, or some other relative in a past existence.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-xl">
                <p className="text-amber-900 italic font-medium">
                  "When we view life through this lens, the 'stranger' or the 'animal' is revealed as a long-lost relative. This realization naturally dissolves barriers and allows compassion to flow freely."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Practical Steps for Daily Life</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">1</span>
                  <span><strong>Recognize the Shared Journey:</strong> Throughout your day, look at those you encounter—people, insects, or animals—and silently acknowledge them as former kin. This subtly shifts your internal state from indifference to connection.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">2</span>
                  <span><strong>Practice Non-Discrimination:</strong> Notice when your mind creates "us vs. them" categories. Gently return to the teaching of universal kinship to melt away judgment and ill-will.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4 font-bold text-sm mt-1">3</span>
                  <span><strong>Extend Compassion to the Smallest:</strong> Practice mindfulness in your movements to avoid accidentally harming small creatures. This strengthens the habit of "Harmlessness" which is a direct expression of Universal Love.</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 italic">Insights from The Buddha</h2>
              <p className="mb-8">
                The Path provides you with Teachings for a "life practice," not a religion. When implemented, it leads to a Higher Consciousness and an improved existence for you, those close to you, and all of humanity.
              </p>

              <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 flex items-center text-amber-400">
                  <Sparkles size={20} className="mr-2" />
                  Cultivation Note
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Universal Love is won through consistent, small choices. Each time you choose compassion over annoyance, you are walking the Middle Way and clearing the path for Enlightenment.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
