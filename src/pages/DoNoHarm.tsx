import React from 'react';
import { ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function DoNoHarm() {
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
                src="/assets2/foundations/do_no_harm.png" 
                alt="Do No Harm" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold uppercase tracking-wider mb-6 border border-amber-100">
              <Shield size={16} className="mr-2" />
              Life Practice Foundation II
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-8 leading-tight">
              The Way of <br />
              <span className="text-amber-500">Do No Harm</span>
            </h1>

            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="text-xl font-medium text-slate-700 mb-6 leading-relaxed">
                "Do no harm" is the principle of harmlessness—an active commitment to protecting other beings and the planet we inhabit. It is the practical foundation of ethical living.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Five Precepts</h2>
              <p className="mb-6">
                Gotama Buddha provided five core precepts that help significantly reduce unwholesome outcomes (Kamma) in our life. These are not commandments, but guidelines for harmless living:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 list-none pl-0">
                <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm"><strong>I. Refrain from killing:</strong> Having compassion for all living beings.</li>
                <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm"><strong>II. Refrain from taking what is not given:</strong> Practicing honesty and generosity.</li>
                <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm"><strong>III. Refrain from sexual misconduct:</strong> Maintaining respect and integrity in relationships.</li>
                <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm"><strong>IV. Refrain from false speech:</strong> Being a truth-speaker, trustworthy and dependable.</li>
                <li className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm"><strong>V. Refrain from intoxicants:</strong> Avoiding substances that lead to heedlessness and loss of mindfulness.</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Practice of Reflection</h2>
              <p className="mb-6">
                A key teaching for "Do No Harm" is the practice of reflecting on your actions at three distinct stages:
              </p>
              <div className="space-y-6">
                <div className="pl-6 border-l-4 border-amber-400">
                  <h4 className="font-bold text-slate-900">1. Intention (Before Action)</h4>
                  <p className="text-sm">Ask: "Would this action that I intend to perform lead to my own harm, the harm of others, or both?" If it is unwholesome, refrain.</p>
                </div>
                <div className="pl-6 border-l-4 border-amber-300">
                  <h4 className="font-bold text-slate-900">2. Implementation (During Action)</h4>
                  <p className="text-sm">Be mindful in the moment: "Is this action I am performing currently causing harm?" If it is, stop immediately.</p>
                </div>
                <div className="pl-6 border-l-4 border-amber-200">
                  <h4 className="font-bold text-slate-900">3. Review (After Action)</h4>
                  <p className="text-sm">Assess: "Did this action produce harm?" If it did, share this with a Teacher or wise friend to gain insight and gain restraint for the future.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Harmlessness for the Planet</h2>
              <p className="mb-6">
                "Do no harm" extends to the planet's revitalization. We must focus on decisions that lead to the renewal of resources rather than their destruction. This includes being mindful of our waste, pollution, and the impact of our consumption choices.
              </p>
              
              <div className="bg-amber-50 p-6 my-8 rounded-xl border border-amber-100">
                <h4 className="text-amber-900 font-bold mb-2">A Wise Choice: Veganism</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Choosing a vegan lifestyle is a specific choice to "do no harm" to other beings. It is an expression of holding compassion for all living beings, reflecting the question: "How could one have compassion while consuming a fellow living being?"
                </p>
              </div>

              <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden text-center">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 text-amber-400">The Law of Kamma</h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
                  By causing harm to others, we inevitably cause harm to ourselves through the natural law of cause and effect. harplessness is the path to a peaceful and content existence.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
