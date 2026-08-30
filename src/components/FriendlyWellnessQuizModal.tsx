import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, 
  Leaf, 
  Sparkles, 
  Moon, 
  Activity, 
  Compass, 
  Lock, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake,
  Zap,
  Coffee,
  Check
} from 'lucide-react';

interface FriendlyWellnessQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz?: (selectedInitialFocus?: string) => void;
}

export const FriendlyWellnessQuizModal: React.FC<FriendlyWellnessQuizModalProps> = ({
  isOpen,
  onClose,
  onStartQuiz
}) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('metabolic');
  const [currentStep, setCurrentStep] = useState<number>(1);

  const options = [
    {
      id: 'metabolic',
      title: 'Mid-afternoon fatigue & brain fog',
      focusTag: 'Metabolic Focus',
      icon: Coffee,
      color: 'amber',
      description: 'Occasional post-lunch crashes, energy dips, or sugar cravings around 3 PM.'
    },
    {
      id: 'sleep',
      title: 'Trouble switching off & waking up tired',
      focusTag: 'Sleep & Autonomic Focus',
      icon: Moon,
      color: 'cyan',
      description: 'Racing evening thoughts, light sleep, or needing caffeine to start your day.'
    },
    {
      id: 'somatic',
      title: 'General physical stiffness & muscle recovery lag',
      focusTag: 'Somatic Focus',
      icon: Activity,
      color: 'emerald',
      description: 'Lingering soreness, tight joints, or feeling like your body needs a reset.'
    },
    {
      id: 'general',
      title: 'I just want to establish a clean, simple baseline',
      focusTag: 'General Longevity',
      icon: Compass,
      color: 'cyan',
      description: 'Proactively benchmarking your biological rhythms with zero stress or guesswork.'
    }
  ];

  const handleStartScan = () => {
    if (onStartQuiz) {
      onStartQuiz(selectedOption);
    } else {
      navigate(`/health-quiz?focus=${selectedOption}`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto font-sans">
        {/* Soft Ambient Backdrop with Deep Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Outer Glowing White-Cyan Gradient Border Chassis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-[2.25rem] p-[1.5px] bg-gradient-to-b from-white/40 via-cyan-400/50 to-cyan-500/10 shadow-[0_25px_80px_rgba(6,182,212,0.25)] z-10 overflow-hidden my-auto"
        >
          {/* Inner Core: Dark Slate Gray Welcoming Sanctuary */}
          <div className="relative rounded-[calc(2.25rem-1.5px)] bg-gradient-to-b from-[#0f172a] via-[#0b1220] to-[#070b14] p-6 sm:p-8 md:p-10 text-white overflow-hidden">
            
            {/* Soft Ambient Light Glows inside modal */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/5 z-20"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header: Reassuring Warm Icon + Title + Friendly Sub-headline */}
            <div className="relative z-10 space-y-4 text-center sm:text-left">
              {/* Co-Branded Reassuring Eyebrow & Glowing Sun Icon */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 via-cyan-500/20 to-emerald-500/10 border border-cyan-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] flex-shrink-0">
                  <Sun size={28} className="animate-[spin_24s_linear_infinite]" />
                  <div className="absolute inset-0 rounded-2xl bg-amber-400/10 animate-pulse pointer-events-none" />
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                    <Sparkles size={11} className="text-cyan-400" />
                    <span>Free 5-Minute Wellness Discovery</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                    Let's Check Your Daily{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
                      Biological Balance
                    </span>
                  </h3>
                </div>
              </div>

              {/* Friendly, Non-Intimidating Sub-Headline */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-sans">
                We translate complex longevity science into simple, daily practices. Take 5 minutes to find your baseline, identify silent energy drainers, and get your personalized wellness protocol—completely free.
              </p>
            </div>

            {/* Questionnaire Preview Box: Step 1 */}
            <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/80 space-y-4">
              {/* Step Counter & Progress Bar */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Step 1: Energy & Daily Rhythm
                </span>
                <span className="text-slate-400">Question 1 of 5</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1.5 bg-slate-850 rounded-full overflow-hidden">
                <div className="w-1/5 h-full bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </div>

              {/* Step 1 Question Title */}
              <h4 className="text-sm sm:text-base font-bold text-white pt-1">
                Where do you feel your energy draining first?
              </h4>

              {/* 4 Interactive Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((option) => {
                  const IconComp = option.icon;
                  const isSelected = selectedOption === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedOption(option.id)}
                      className={`relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-start space-x-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-slate-900/90 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/40'
                          : 'bg-slate-950/60 border-slate-800/90 hover:border-cyan-500/40 hover:bg-slate-900/40'
                      }`}
                    >
                      {/* Selection Radio Icon */}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        isSelected 
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                          : 'border border-slate-750 group-hover:border-cyan-400/60'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>

                      {/* Content */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isSelected 
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                              : 'bg-slate-800/80 text-slate-400'
                          }`}>
                            {option.focusTag}
                          </span>
                          <IconComp size={14} className={isSelected ? 'text-cyan-300' : 'text-slate-500'} />
                        </div>

                        <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                          {option.title}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Guarantee & Primary/Secondary Actions */}
            <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/80 space-y-4">
              {/* Privacy & Research Partnership Guarantee */}
              <div className="flex items-start space-x-2 text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                <Lock size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>100% Free & Private:</strong> Your responses are fully encrypted and never shared with third parties. Designed in partnership with leading longevity researchers to provide friendly, actionable lifestyle steps.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors underline order-2 sm:order-1 text-center py-2 cursor-pointer"
                >
                  I'll explore the science on my own first
                </button>

                <button
                  type="button"
                  onClick={handleStartScan}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 hover:from-cyan-300 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer order-1 sm:order-2"
                >
                  <span>Start My Free Wellness Scan</span>
                  <span className="text-[11px] opacity-80 lowercase font-normal hidden sm:inline">(5 mins)</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FriendlyWellnessQuizModal;
