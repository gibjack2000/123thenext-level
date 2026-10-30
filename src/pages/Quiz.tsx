import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ClipboardCheck, 
  Mail, 
  User, 
  Loader2, 
  Award, 
  Zap, 
  Activity, 
  Moon, 
  Heart, 
  Scale, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useMarket } from '../contexts/MarketContext';

interface QuizQuestion {
  id: string;
  category: string;
  pillar: 'health' | 'fitness' | 'nutrition' | 'wellness';
  question: string;
  description: string;
  options: {
    label: string;
    score: number;
    subtext?: string;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'metabolic_energy',
    category: 'Metabolic Architecture',
    pillar: 'nutrition',
    question: 'How consistent is your daily cognitive energy and physical vitality?',
    description: 'Benchmarking glycemic volatility and mitochondrial adenosine triphosphate (ATP) throughput.',
    options: [
      { label: 'Steady & Sustained', score: 95, subtext: 'Zero mid-afternoon energy crashes, clear mental acuity.' },
      { label: 'Occasional Post-Lunch Slumps', score: 75, subtext: 'Noticeable drop in focus 2-3 hours after heavy meals.' },
      { label: 'Frequent Fatigue Spikes', score: 50, subtext: 'Reliance on caffeine/sugar to push through afternoons.' },
      { label: 'Chronic Exhaustion', score: 30, subtext: 'Wake up feeling unrefreshed, volatile brain fog throughout the day.' },
    ],
  },
  {
    id: 'sleep_autonomic',
    category: 'Autonomic & Sleep Engineering',
    pillar: 'wellness',
    question: 'What is your current sleep depth and restorative wake rate?',
    description: 'Assessing sympathetic vs. parasympathetic tone and nighttime HRV recovery.',
    options: [
      { label: 'Deep & Restorative (7.5-9 hrs)', score: 95, subtext: 'Wake naturally refreshed with high morning heart rate variability.' },
      { label: 'Good (6.5-7.5 hrs)', score: 75, subtext: 'Consistent sleep with minor nocturnal awakenings.' },
      { label: 'Fragmented or Restless (5-6.5 hrs)', score: 50, subtext: 'Trouble falling asleep or frequent 3 AM wake-up cycles.' },
      { label: 'Severe Insomnia / Chronic Sleep Deficit', score: 30, subtext: 'Less than 5 hours or elevated sympathetic night overdrive.' },
    ],
  },
  {
    id: 'biomarkers_labs',
    category: 'Clinical Diagnostics',
    pillar: 'health',
    question: 'When did you last test key longevity biomarkers (ApoB, hs-CRP, HbA1c, Vitamin D)?',
    description: 'Evaluating proactive preventative lab tracking vs reactive disease care.',
    options: [
      { label: 'Within the last 3 to 6 months', score: 100, subtext: 'Full venous multi-omic map with active optimization.' },
      { label: 'Within the last 12 months', score: 75, subtext: 'Standard GP blood check; basic lipid panel reviewed.' },
      { label: 'Over 1 to 2 years ago', score: 50, subtext: 'Outdated baseline data with zero microvascular tracking.' },
      { label: 'Never tested / Unknown', score: 25, subtext: 'Zero visibility into underlying inflammatory or lipid markers.' },
    ],
  },
  {
    id: 'physical_hardware',
    category: 'Somatic Hardware & Strength',
    pillar: 'fitness',
    question: 'How structured is your weekly progressive resistance & cardiovascular training?',
    description: 'Skeletal muscle mass index, VO2 max progression, and joint resilience.',
    options: [
      { label: '3-5x Weekly Periodized Training', score: 95, subtext: 'Structured hypertrophy, Zone 2 cardio, and mobility integration.' },
      { label: '2-3x Weekly Moderate Workouts', score: 75, subtext: 'General gym sessions, recreational sports, or running.' },
      { label: 'Irregular / Occasional Exercise', score: 50, subtext: 'High intention but inconsistent weekly training cadence.' },
      { label: 'Sedentary Lifestyle', score: 30, subtext: 'Minimal weekly physical loading; mostly desk-bound.' },
    ],
  },
  {
    id: 'visceral_fat_monitoring',
    category: 'Body Composition Telemetry',
    pillar: 'nutrition',
    question: 'Do you track visceral fat rating or segmental body composition?',
    description: 'Assessing bioelectrical impedance tracking of silent organ fat accumulation.',
    options: [
      { label: 'Yes, with smart segmental hardware', score: 95, subtext: 'Regularly tracking skeletal muscle vs visceral fat index.' },
      { label: 'Standard scale & mirror assessment', score: 70, subtext: 'Tracking total weight only; no visceral organ fat metrics.' },
      { label: 'Not currently tracking', score: 45, subtext: 'No current instrumentation or bio-hardware monitoring.' },
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { market } = useMarket();

  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0..N-1 questions, N = email optin, N+1 = results
  const [answers, setAnswers] = useState<Record<string, { score: number; label: string }>>({});
  
  // Email capture state
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isQuestionStep = currentStepIndex < totalQuestions;
  const isEmailRoadmapStep = currentStepIndex === totalQuestions;
  const isResultsStep = currentStepIndex === totalQuestions + 1;

  // Calculate composite score
  const calculateTotalScore = () => {
    const scores = Object.values(answers).map(a => a.score);
    if (scores.length === 0) return 72;
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return Math.max(35, Math.min(98, avg));
  };

  const handleSelectAnswer = (questionId: string, score: number, label: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: { score, label } }));
    // Automatically transition to next question after brief feedback
    setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1);
    }, 250);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const finalScore = calculateTotalScore();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          quizScore: finalScore,
          source: 'onboarding_quiz_roadmap',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setHasSubscribed(true);
        // Advance to results screen
        setCurrentStepIndex(totalQuestions + 1);
      } else {
        setSubmitError(data.error || 'Unable to subscribe. Please try again.');
      }
    } catch (err: any) {
      console.error('[Quiz Email Submit] Error:', err);
      setSubmitError('Unable to subscribe at this moment. You can still view your results below.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkipEmail = () => {
    // Proceed directly to results without email
    setCurrentStepIndex(totalQuestions + 1);
  };

  const finalScore = calculateTotalScore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Ambient Aesthetics */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-[140px]" />
        <div 
          className="absolute inset-0 opacity-[0.025]" 
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)', backgroundSize: '32px 32px' }} 
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-28 pb-20">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Portal</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
            <Sparkles size={12} className="animate-pulse" />
            <span>Clinical Baseline Diagnostic</span>
          </div>
        </div>

        {/* Progress Bar */}
        {!isResultsStep && (
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
              <span>{isEmailRoadmapStep ? 'Final Step: Roadmap Delivery' : `Question ${currentStepIndex + 1} of ${totalQuestions}`}</span>
              <span className="text-cyan-400 font-bold">
                {isEmailRoadmapStep ? '95% Complete' : `${Math.round(((currentStepIndex + 1) / (totalQuestions + 1)) * 100)}%`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStepIndex + 1) / (totalQuestions + 1)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 1: QUESTION FLOW */}
        {/* ========================================================================= */}
        {isQuestionStep && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-left space-y-6">
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                {QUIZ_QUESTIONS[currentStepIndex].category}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                {QUIZ_QUESTIONS[currentStepIndex].question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                {QUIZ_QUESTIONS[currentStepIndex].description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {QUIZ_QUESTIONS[currentStepIndex].options.map((opt, idx) => {
                const isSelected = answers[QUIZ_QUESTIONS[currentStepIndex].id]?.label === opt.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectAnswer(QUIZ_QUESTIONS[currentStepIndex].id, opt.score, opt.label)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer group ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                        : 'border border-slate-700 group-hover:border-cyan-400/60 text-transparent'
                    }`}>
                      <Check size={14} strokeWidth={3} className={isSelected ? 'block' : 'opacity-0'} />
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {opt.label}
                      </div>
                      {opt.subtext && (
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          {opt.subtext}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back Button if not on first question */}
            {currentStepIndex > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStepIndex(prev => prev - 1)}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors underline cursor-pointer"
                >
                  ← Previous Question
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2: OPTIONAL EMAIL ROADMAP STEP (Right before results) */}
        {/* ========================================================================= */}
        {isEmailRoadmapStep && (
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl text-left space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
                <ClipboardCheck size={14} className="text-cyan-400" />
                <span>Diagnostic Assessment Complete</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Send my full results & roadmap to email
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                Enter your details to receive your personalized biological roadmap, executive summary report, and immediate free download link for <strong>The Longevity Blueprint</strong>.
              </p>
            </div>

            {/* Key Inclusions Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>Baseline Score Card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>Targeted Protocol Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>Lab Test Checklist</span>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* First Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                    First Name <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                      <User size={15} />
                    </span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Jack"
                      disabled={submitting}
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl py-3.5 pl-10 pr-4 text-xs font-medium placeholder-slate-600 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email Address Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                      <Mail size={15} />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      disabled={submitting}
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl py-3.5 pl-10 pr-4 text-xs font-medium placeholder-slate-600 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-slate-950" />
                      <span>Transmitting Protocol...</span>
                    </>
                  ) : (
                    <>
                      <span>Send My Results & Reveal Roadmap →</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSkipEmail}
                  className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer py-2 px-3"
                >
                  Skip & View Results Directly →
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Zero spam guarantee. 1-Click unsubscribe at any time.</span>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 3: RESULTS SCREEN */}
        {/* ========================================================================= */}
        {isResultsStep && (
          <div className="space-y-8 text-left">
            {/* Top Score Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono uppercase tracking-wider">
                    <Award size={13} className="text-amber-400" />
                    <span>Biological Health Baseline</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
                    Your Longevity Composite Score
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md font-sans">
                    {finalScore >= 80 
                      ? "High optimization level. Focus on fine-tuning microvascular biomarkers and sleep depth architecture."
                      : finalScore >= 60
                      ? "Solid foundation with actionable room for metabolic stabilization and progressive hardware tracking."
                      : "Clear intervention opportunities identified in circadian recovery and biological monitoring."}
                  </p>
                </div>

                {/* Score Dial */}
                <div className="relative flex flex-col items-center justify-center w-36 h-36 rounded-full bg-slate-950/80 border-4 border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.3)] shrink-0">
                  <span className="text-4xl font-display font-black text-white">{finalScore}</span>
                  <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mt-0.5">/ 100</span>
                </div>
              </div>

              {hasSubscribed && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>Results & roadmap have been dispatched to <strong>{email}</strong>.</span>
                  </div>
                  <a
                    href="/docs/the-next-level-lifespan.pdf"
                    download="the-next-level-lifespan.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 rounded-lg text-[11px] font-bold uppercase transition-colors shrink-0"
                  >
                    <Download size={12} />
                    <span>PDF Download</span>
                  </a>
                </div>
              )}
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Clinical Diagnostics */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Activity size={18} />
                </div>
                <h3 className="text-base font-bold text-white">Recommended Lab Panel</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Map ApoB, hs-CRP, and metabolic indicators with official venous draw partners (LOLA Health UK / Quest Diagnostics US).
                </p>
                <div className="pt-1">
                  <Link
                    to="/store"
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Explore Clinical Lab Tests</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Card 2: Bio-Hardware */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Scale size={18} />
                </div>
                <h3 className="text-base font-bold text-white">Bio-Hardware Monitoring</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Track skeletal muscle mass vs. visceral organ fat index with CE/FDA medical-grade segmental impedance hardware.
                </p>
                <div className="pt-1">
                  <Link
                    to="/hardware-store"
                    className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Bio-Hardware Registry</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Retake & Portal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setCurrentStepIndex(0);
                  setHasSubscribed(false);
                }}
                className="text-xs font-mono text-slate-400 hover:text-white transition-colors underline cursor-pointer"
              >
                Retake Assessment
              </button>

              <Link
                to="/store"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors border border-slate-700"
              >
                <span>Visit Apothecary Store →</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
