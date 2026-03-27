import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const ACCORDION_DATA = [
  {
    title: "Preventive Health Basics",
    description: 'Preventive health is about playing "offense" rather than "defense." By managing risk factors early, you can stop chronic issues before they manifest as symptoms.',
    items: [
      { bold: "Regular Screenings:", text: "Tracking blood pressure, glucose, and cholesterol levels." },
      { bold: "Movement:", text: "Combining cardiovascular health with resistance training to maintain bone density." },
      { bold: "Supplements:", text: "Ensuring your body isn't deficient in vital nutrients like Vitamin D or Magnesium." }
    ]
  },
  {
    title: "Sleep Optimization",
    description: 'Sleep is a vital physiological repair process. Optimization focuses on both the quantity (7–9 hours) and the quality (deep and REM cycles).',
    strongDescWords: ['quantity', 'quality'],
    items: [
      { bold: "Circadian Rhythm:", text: "Getting natural sunlight shortly after waking to set your internal clock." },
      { bold: "Environment:", text: "Keeping your bedroom dark and cool (around 18°C) for optimal recovery." },
      { bold: "Blue Light:", text: "Reducing screen time 60 minutes before bed to allow natural melatonin production." }
    ]
  },
  {
    title: "Stress Management",
    description: 'Chronic stress keeps the body in "fight or flight" mode, causing inflammation. Management is about triggering the parasympathetic (rest and digest) response.',
    strongDescWords: ['parasympathetic'],
    items: [
      { bold: "Breathwork:", text: 'Techniques like "Box Breathing" to physically lower your heart rate.' },
      { bold: "Mindfulness:", text: "Reducing mental rumination through meditation or focused presence." },
      { bold: "Cortisol Control:", text: "Balancing high-intensity workouts with active recovery like walking." }
    ]
  },
  {
    title: "Healthy Daily Routines",
    description: "Consistency beats intensity. A routine automates healthy choices so they don't require daily willpower.",
    items: [
      { bold: "Habit Stacking:", text: "Attaching a new habit to an existing one (e.g., stretching while coffee brews)." },
      { bold: "The 1% Rule:", text: "Focusing on small, incremental improvements that compound over time." },
      { bold: "Hydration:", text: "Starting every morning with 500ml of water to rehydrate the brain and body." }
    ]
  }
];

export default function PreventiveHealth() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderDescription = (desc: string, boldWords?: string[]) => {
    if (!boldWords) return <p className="mb-4">{desc}</p>;
    
    let result: React.ReactNode[] = [desc];
    boldWords.forEach(word => {
      const parts = [];
      result.forEach((part, i) => {
        if (typeof part === 'string') {
          const split = part.split(word);
          for (let j = 0; j < split.length; j++) {
            parts.push(split[j]);
            if (j < split.length - 1) {
              parts.push(<strong key={`${i}-${j}`} className="text-white">{word}</strong>);
            }
          }
        } else {
          parts.push(part);
        }
      });
      result = parts;
    });

    return <p className="mb-4">{result}</p>;
  };

  return (
    <div className="min-h-screen bg-[#121821] text-white flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <Link to="/#pillars" className="fixed top-8 left-8 inline-flex items-center text-slate-400 hover:text-white font-medium transition-colors bg-[#1c2531] px-4 py-2 rounded-xl shadow-lg border border-slate-700/50 z-50 hover:bg-slate-800">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      <div className="max-w-3xl w-full mt-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-[2px] mb-4 text-white">
            Health Foundation
          </h1>
          <p className="text-lg text-[#a0a0a0]">
            Build a strong foundation for your body. Click a category to dive deeper.
          </p>
        </motion.div>

        <div className="space-y-4">
          {ACCORDION_DATA.map((section, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#1c2531] rounded-xl border border-[#2d3748] overflow-hidden transition-colors"
                style={{ borderColor: isOpen ? '#2d3748' : '#2d3748' }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-300 hover:bg-[#253040] ${isOpen ? 'text-[#ff4757]' : 'text-white'}`}
                >
                  <div className="flex items-center font-bold text-lg md:text-xl">
                    <span className="text-[#ff4757] mr-4 text-sm">●</span>
                    {section.title}
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className={isOpen ? 'text-[#ff4757]' : 'text-slate-400'} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-[#a0a0a0] bg-[#161e29] border-t border-[#2d3748] leading-relaxed">
                        {renderDescription(section.description, section.strongDescWords)}
                        <ul className="space-y-3 mt-4">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex flex-col sm:flex-row sm:items-baseline">
                              <span className="text-white font-bold mr-2 mb-1 sm:mb-0 sm:shrink-0">• {item.bold}</span>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center italic text-[#a0a0a0]"
        >
          "Small changes make a big impact."
        </motion.div>
      </div>
    </div>
  );
}
