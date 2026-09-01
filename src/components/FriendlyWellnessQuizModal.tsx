import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Moon, 
  Activity, 
  Compass, 
  Lock, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Coffee, 
  Check, 
  BookOpen, 
  Download, 
  Disc, 
  Dna, 
  Zap, 
  Sun,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';

export type ModalState = 'state1_ebook' | 'state1_5_awakening' | 'state2_quiz' | 'state3_results';

export interface FriendlyWellnessQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialState?: 'ebook' | 'quiz';
  onStartQuiz?: (selectedInitialFocus?: string) => void;
}

export const FriendlyWellnessQuizModal: React.FC<FriendlyWellnessQuizModalProps> = ({
  isOpen,
  onClose,
  initialState = 'quiz',
  onStartQuiz
}) => {
  const navigate = useNavigate();

  // State Management
  const [modalState, setModalState] = useState<ModalState>(
    initialState === 'ebook' ? 'state1_ebook' : 'state2_quiz'
  );

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFrustration, setSelectedFrustration] = useState<string>('metabolic');
  const [quizStep, setQuizStep] = useState<1 | 2>(1);

  // Sync initial state when modal opens
  useEffect(() => {
    if (isOpen) {
      setModalState(initialState === 'ebook' ? 'state1_ebook' : 'state2_quiz');
      setQuizStep(1);
      setIsSubmitting(false);
    }
  }, [isOpen, initialState]);

  const triggerPdfDownload = (filename: string = 'The-Longevity-Blueprint.pdf') => {
    const link = document.createElement('a');
    link.href = '/assets/docs/longevity-blueprint.pdf';
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    // Trigger PDF download
    triggerPdfDownload('The-Longevity-Blueprint-28Page-Guide.pdf');

    // Asynchronously register lead
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          source: 'ebook_onboarding_modal',
          preferences: ['Health', 'Fitness', 'Nutrition', 'Wellness']
        })
      }).catch(() => {});

      if (hasValidSupabaseConfig && supabase) {
        await supabase
          .from('newsletter_subscribers')
          .insert([{ 
            email, 
            name: name || null,
            source: 'ebook_onboarding_modal',
            preferences: ['Health', 'Fitness', 'Nutrition', 'Wellness'] 
          }]);
      }
    } catch (err) {
      console.error('Lead subscription background error:', err);
    }

    setIsSubmitting(false);
    // Transition to State 1.5
    setModalState('state1_5_awakening');
  };

  const handleQuizStep1Next = () => {
    setQuizStep(2);
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          source: 'critical_path_trajectory_scan',
          focus: selectedFrustration,
          preferences: ['Health', 'Fitness', 'Nutrition', 'Wellness']
        })
      }).catch(() => {});

      if (hasValidSupabaseConfig && supabase) {
        await supabase
          .from('newsletter_subscribers')
          .insert([{ 
            email, 
            name: name || null,
            source: 'critical_path_trajectory_scan',
            preferences: ['Health', 'Fitness', 'Nutrition', 'Wellness'] 
          }]);
      }
    } catch (err) {
      console.error('Quiz lead submission error:', err);
    }

    setIsSubmitting(false);
    // Transition to State 3
    setModalState('state3_results');
  };

  const frustrationOptions = [
    {
      id: 'metabolic',
      title: 'Mid-afternoon fatigue & brain fog',
      focusTag: 'Metabolic Focus',
      icon: Coffee,
      color: 'amber',
      description: 'Glycemic volatility, mitochondrial energy crashes, or post-lunch sluggishness.'
    },
    {
      id: 'sleep',
      title: 'Trouble switching off or waking up exhausted',
      focusTag: 'Sleep & Autonomic Focus',
      icon: Moon,
      color: 'cyan',
      description: 'Sympathetic nervous overdrive, racing evening thoughts, and degraded sleeping HRV.'
    },
    {
      id: 'somatic',
      title: 'Physical stiffness & joint/muscle recovery lag',
      focusTag: 'Somatic Focus',
      icon: Activity,
      color: 'emerald',
      description: 'Tissue inflammation, slow athletic bounce-back, or joint compliance decline.'
    },
    {
      id: 'general',
      title: 'I want to establish a clean, preventative baseline',
      focusTag: 'General Longevity',
      icon: Compass,
      color: 'cyan',
      description: 'Benchmarking biological hardware, vascular flow, and daily habits with zero guesswork.'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto font-sans">
        {/* Soft Ambient Backdrop with Deep Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Glowing Gold-Cyan Chassis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-[2.25rem] p-[1.5px] bg-gradient-to-b from-cyan-400/40 via-amber-400/30 to-cyan-500/20 shadow-[0_25px_80px_rgba(6,182,212,0.3)] z-10 overflow-hidden my-auto"
        >
          {/* Inner Core: Dark Slate (#0f172a) Sanctuary */}
          <div className="relative rounded-[calc(2.25rem-1.5px)] bg-gradient-to-b from-[#0f172a] via-[#0b1220] to-[#070b14] p-6 sm:p-8 md:p-10 text-white overflow-hidden">
            
            {/* Ambient Background Flares */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/5 z-30"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Dynamic State Machine View Transitions */}
            <AnimatePresence mode="wait">

              {/* ========================================================================= */}
              {/* STATE 1: THE REASSURING EBOOK SIGN-UP MODAL */}
              {/* ========================================================================= */}
              {modalState === 'state1_ebook' && (
                <motion.div
                  key="state1_ebook"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 relative z-10"
                >
                  {/* Header Badge & Title */}
                  <div className="space-y-3 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                      <BookOpen size={12} className="text-cyan-400" />
                      <span>FREE 28-PAGE LONGEVITY BLUEPRINT</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                      Your Guide to{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
                        Molecular Proactivity
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      Eighty to ninety percent of how you age is governed by lifestyle choices, not raw genetics. We are ready to send your blueprint. Enter your details to claim your guide.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleEbookSubmit} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. David"
                        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white rounded-xl py-3 px-4 text-xs font-medium placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white rounded-xl py-3 px-4 text-xs font-medium placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{isSubmitting ? 'Dispatching...' : 'Email My Free Guide →'}</span>
                      </button>
                    </div>
                  </form>

                  {/* Switcher to Quiz */}
                  <div className="pt-2 text-center border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setModalState('state2_quiz')}
                      className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
                    >
                      Or, take the 5-Minute Critical Path Trajectory Scan instead →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ========================================================================= */}
              {/* STATE 1.5: THE EBOOK SUCCESS & PROACTIVE MINDSET AWAKENING HOOK */}
              {/* ========================================================================= */}
              {modalState === 'state1_5_awakening' && (
                <motion.div
                  key="state1_5_awakening"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 relative z-10 text-center sm:text-left"
                >
                  {/* Success Icon + Headline */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 size={30} />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                        Dispatch Confirmed
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                        Your 28-Page Blueprint is on its way!
                      </h3>
                    </div>
                  </div>

                  {/* Proactive Mindset Awakening Narrative */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-light space-y-3 text-left">
                    <p>
                      Your 28-Page Blueprint is on its way to your inbox! But remember: reading is only the first step on the critical path. True proactivity is a major mindset awakening—an immediate daily upgrade that is miles ahead of traditional, reactive 'sick-care' and enables a highly active, enhanced life right now.
                    </p>
                    <p className="text-cyan-100">
                      Let's run a systems check: see if your biological hardware is ready to survive on the critical path to future age-reversal software. Anyone who doesn't actively focus on their hardware today risks completely missing the epigenetic boat tomorrow.
                    </p>
                  </div>

                  {/* Actions Hub */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate('/science');
                      }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 hover:from-cyan-300 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(6,182,212,0.45)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles size={16} />
                      <span>Step Into the Anti-Aging Health Revolution →</span>
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setModalState('state2_quiz')}
                        className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
                      >
                        I'll take the 5-Minute Critical Path Scan instead
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================================================= */}
              {/* STATE 2: THE 5-MINUTE CRITICAL PATH TRAJECTORY SCAN (THE QUIZ) */}
              {/* ========================================================================= */}
              {modalState === 'state2_quiz' && (
                <motion.div
                  key="state2_quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 relative z-10"
                >
                  {/* Header */}
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                      <Zap size={11} className="text-amber-400" />
                      <span>5-MINUTE CRITICAL PATH TRAJECTORY SCAN</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      Awaken Your{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
                        Proactive Strategy
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      Find your baseline, identify silent subclinical energy drains, and check your biological hardware compatibility against our 10-year timeline.
                    </p>
                  </div>

                  {/* Step 1: Frustration Check */}
                  {quizStep === 1 ? (
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                        <span className="text-cyan-400 font-bold uppercase tracking-wider">
                          Step 1 of 2: Frustration Check
                        </span>
                        <span className="text-slate-500">Zero Guesswork</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white">
                        Where do you notice your vitality or energy flagging first?
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {frustrationOptions.map((opt) => {
                          const Icon = opt.icon;
                          const isSelected = selectedFrustration === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSelectedFrustration(opt.id)}
                              className={`relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-start space-x-3 cursor-pointer group ${
                                isSelected
                                  ? 'bg-slate-900/95 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40'
                                  : 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/40'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                                isSelected 
                                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                                  : 'border border-slate-700 group-hover:border-cyan-400/60'
                              }`}>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </div>

                              <div className="space-y-1 min-w-0 flex-1">
                                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                                  isSelected 
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {opt.focusTag}
                                </span>
                                <div className="text-xs font-bold text-white leading-snug">
                                  {opt.title}
                                </div>
                                <p className="text-[10px] text-slate-400 leading-tight">
                                  {opt.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={handleQuizStep1Next}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
                        >
                          <span>Continue to Trajectory Calculator →</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Step 2: The Lead Capture Bridge */
                    <form onSubmit={handleQuizSubmit} className="space-y-4 pt-1">
                      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                        <span className="text-amber-400 font-bold uppercase tracking-wider">
                          Step 2 of 2: The Lead Capture Bridge
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuizStep(1)}
                          className="text-slate-400 hover:text-white underline text-[11px]"
                        >
                          ← Change Focus
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
                        Selected Focus: <strong className="text-white font-mono uppercase">{frustrationOptions.find(f => f.id === selectedFrustration)?.focusTag}</strong>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold">
                          Enter your email to calculate your Critical Path Trajectory Score & unlock your immediate daily protocols
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white rounded-xl py-3 px-4 text-xs font-medium placeholder-slate-500 outline-none transition-colors"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Sparkles size={16} />
                          <span>{isSubmitting ? 'Calculating...' : 'Reveal My Score & Daily Toolkit →'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}

              {/* ========================================================================= */}
              {/* STATE 3: THE MINDSET RESULTS & SCIENCE INTEGRATION BRIDGE */}
              {/* ========================================================================= */}
              {modalState === 'state3_results' && (
                <motion.div
                  key="state3_results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 relative z-10 text-center sm:text-left"
                >
                  {/* Top Score Gauge & Badge */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 pb-2 border-b border-slate-800/80">
                    {/* Circular Percentage Ring Gauge */}
                    <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        {/* Background Path */}
                        <path
                          className="text-slate-800"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Progress Path (78%) */}
                        <path
                          className="text-cyan-400"
                          strokeDasharray="78, 100"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          stroke="url(#scoreGradient)"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                        <span className="text-xl font-black text-white">78%</span>
                        <span className="text-[8px] text-cyan-300 font-bold uppercase">Index</span>
                      </div>
                    </div>

                    {/* Title & Status */}
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono uppercase tracking-widest font-bold">
                        <ShieldCheck size={12} className="text-emerald-400" />
                        <span>Trajectory: 78% - Proactive Path Builder</span>
                      </div>
                      <h3 className="text-2xl font-display font-extrabold text-white">
                        Your Baseline is Strong, But Vulnerable
                      </h3>
                    </div>
                  </div>

                  {/* Reassuring Narrative Assessment */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-light space-y-3 text-left shadow-lg">
                    <p>
                      Your daily choices govern <strong className="text-cyan-300 font-semibold">80% to 90% of how quickly your cells age</strong>—not your raw genetics.
                    </p>
                    <p className="text-slate-300">
                      Your baseline is solid, but silent, subclinical <strong className="text-amber-300">'scratches'</strong> are forming on your biological CD. The proactive mindset is a massive awakening: it is a miles-ahead daily upgrade to your performance and vitality today, while ensuring your physical hardware remains pristine to run tomorrow's age-reversal software.
                    </p>
                  </div>

                  {/* Focused Dual Call-to-Action */}
                  <div className="space-y-3 pt-2">
                    {/* Primary Button */}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate('/science');
                      }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 hover:from-cyan-300 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(6,182,212,0.45)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles size={16} />
                      <span>Step Into the Anti-Aging Health Revolution →</span>
                    </button>

                    {/* Secondary Button */}
                    <button
                      type="button"
                      onClick={() => triggerPdfDownload('My-Customized-Longevity-Guide.pdf')}
                      className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/20 hover:border-white/40 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={14} className="text-cyan-400" />
                      <span>Download My Customized Longevity Guide</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FriendlyWellnessQuizModal;
