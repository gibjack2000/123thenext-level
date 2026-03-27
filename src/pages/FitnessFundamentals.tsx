import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const FITNESS_DATA = [
  {
    title: "Beginner-friendly",
    description: "Start your journey without the overwhelm. We focus on movement patterns that are easy to learn and safe to execute.",
    items: [
      { bold: "Low Impact:", text: "Protecting your joints while building stamina." },
      { bold: "Foundational Gains:", text: "Building a base of strength before adding complexity." }
    ]
  },
  {
    title: "Strength Fundamentals",
    description: "Muscle is the currency of longevity. Learn the mechanics of lifting to change your body composition and metabolic rate.",
    items: [
      { bold: "Compound Lifts:", text: "Squats, hinges, and presses." },
      { bold: "Progressive Overload:", text: "Ensuring you get stronger every single week." }
    ]
  },
  {
    title: "Mobility & Flexibility",
    description: "Strength is useless if you can't move freely. We help you unlock tight joints and improve your athletic \"flow.\"",
    items: [
      { bold: "Range of Motion:", text: "Reclaiming your body's natural ability to move." },
      { bold: "Recovery:", text: "Using stretching to downregulate the nervous system." }
    ]
  },
  {
    title: "At-home Routines",
    description: "No gym? No problem. Transform any small space into your personal training ground with efficient, equipment-free plans.",
    items: [
      { bold: "Bodyweight Mastery:", text: "Using your own weight for resistance." },
      { bold: "High Efficiency:", text: "Workouts designed for busy schedules (15-30 mins)." }
    ]
  }
];

export default function FitnessFundamentals() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] font-sans relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url('/fitness-bg.jpg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient Overlay for Text Readability */}
      <div className="fixed inset-0 bg-[#0d1117]/80 z-0"></div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-screen">
        <Link to="/#pillars" className="fixed top-8 left-8 inline-flex items-center text-[#8b949e] hover:text-[#f0f6fc] font-medium transition-colors bg-[#161b22] px-4 py-2 rounded-xl shadow-lg border border-[#30363d] z-50 hover:bg-[#21262d]">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

      <div className="max-w-[850px] w-full mt-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-l-[5px] border-[#58a6ff] pl-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-[3rem] font-black uppercase tracking-tight m-0 leading-none mb-3">
            FITNESS
          </h1>
          <p className="text-[#8b949e] text-lg lg:text-xl max-w-2xl">
            Move your body in ways that feel good and build lasting strength. Find routines that fit your lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FITNESS_DATA.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#161b22] p-8 rounded-xl border border-[#30363d] hover:border-[#58a6ff] hover:-translate-y-1.5 transition-all duration-300 shadow-lg group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#58a6ff]/5 blur-3xl rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#58a6ff] mb-4 flex items-center">
                  <ArrowRight size={20} className="mr-3 shrink-0" />
                  {card.title}
                </h3>
                <p className="text-[#8b949e] mb-6 leading-relaxed">
                  {card.description}
                </p>
                <ul className="space-y-3 pl-2 text-[#8b949e]">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex flex-col sm:flex-row sm:items-baseline">
                      <span className="text-[#f0f6fc] font-bold mr-2 mb-1 sm:mb-0 sm:shrink-0">• {item.bold}</span>
                      <span className="leading-snug">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
