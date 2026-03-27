import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FitnessPostF() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" 
              alt="Overcoming Workout Plateaus" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            Overcoming Workout Plateaus
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              You have been hitting the gym consistently, eating well, and getting adequate sleep. For weeks, your lifts went up and your body fat went down. But then, suddenly, progress grinds to a halt. The weights feel heavier, the mirror looks the same, and your motivation takes a nosedive.
            </p>
            <p className="mb-8">
              Welcome to the plateau. It is a frustrating but entirely normal part of any fitness journey. A plateau simply means your body has adapted to the stimulus you are providing, and it is time to change the variables. Here is how to break through and start making gains again.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Audit Your Recovery (The Silent Plateau Killer)</h3>
            <p className="mb-4">
              More often than not, a plateau isn't caused by a lack of training, but an inability to recover from the training you're already doing. When you hit a wall, ask yourself three questions:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Am I getting 7-9 hours of quality sleep per night?</li>
              <li>Am I eating enough protein (0.8-1g per pound of body weight) to support muscle repair?</li>
              <li>Are my daily stress levels abnormally high?</li>
            </ul>
            <p className="mb-4 text-slate-500 italic">
              Fixing a recovery deficit is often the fastest way to jumpstart progress. Taking a "Deload week"—where you lift lighter weights or reduce volume by half for 7 days—can allow accumulated fatigue to dissipate, revealing the fitness you've built.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Micro-Loading to Force Adaptation</h3>
            <p className="mb-4">
              When you're a beginner, jumping from 20lb dumbbells to 25lb dumbbells is easy. But as you get stronger, a 5lb jump can represent a massive percentage increase that your body isn't ready for. The solution is micro-loading.
            </p>
            <div className="mb-8">
              <strong>The Tool You Need:</strong> 
              <p className="mt-2">
                <a href="https://www.amazon.com/s?k=fractional+weight+plates" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Fractional Weight Plates on Amazon</a>. These tiny plates (from 0.25lbs to 1lb) allow you to increase the bar weight by minuscule amounts. Progressing by merely 1 pound a week adds up to 52 pounds a year, completely bypassing traditional plateaus.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Change the Rep Range or Tempo</h3>
            <p className="mb-4">
              If you have been doing 3 sets of 10 reps for months, your nervous system is bored. You need a novel stimulus to trigger muscle growth and strength gains.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>Try Strength Phases:</strong> Drop the reps to 4-6 and increase the weight. This targets myofibrillar hypertrophy and pure strength.</li>
              <li><strong>Try Time Under Tension (Tempo):</strong> Use the same weight, but slow down the eccentric (lowering) portion of the lift to 3 or 4 seconds. The burning sensation is a sign of metabolic stress, which drives hypertrophy.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Fuel the Machine Appropriately</h3>
            <p className="mb-4">
              If your goal is to build muscle and increase strength, you need a slight caloric surplus. Trying to build muscle while staying shredded year-round is a one-way ticket to Plateau City. 
            </p>
            <div className="mb-8">
              <strong>Recommended Supplementation:</strong>
              <p className="mt-2">
                <a href="https://www.amazon.com/s?k=creatine+monohydrate+powder" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Creatine Monohydrate on Amazon</a>. The most researched sports supplement in the world. It helps turn over ATP (cellular energy) faster, potentially giving you that extra 1 or 2 reps needed to break a plateau.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              Plateaus are proof that you have leveled up. Your body has successfully adapted to the old you, and now it requires a new approach. Whether you choose to deload, micro-load, eat a bit more, or change your rep schemes, the key is to remain patient. Apply a new stimulus, stick to it for several weeks, and trust the process. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
