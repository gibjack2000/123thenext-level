import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface QuizResultsPanelProps {
  score: number;
}

export default function QuizResultsLeadCapture({ score }: QuizResultsPanelProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleQuizLeadSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // 1. Submit to /api/subscribe (MailerLite & Supabase sync)
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          quizScore: score,
          source: 'wellness_quiz',
          groupId: '201226349911737620'
        })
      });

      // Save subscription in localStorage
      try {
        localStorage.setItem('subscribed_email', email.trim().toLowerCase());
      } catch (e) {}

      // Also trigger PDF download
      const link = document.createElement('a');
      link.href = '/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf';
      link.download = 'idiots-guide-to-the-next-level-lifespan.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess(true);
    } catch (err: any) {
      console.error('Quiz lead capture failed:', err.message);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden text-left">
      <div className="grid md:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Side: Teaser Cover */}
        <div className="col-span-12 md:col-span-4 flex justify-center">
          <div className="relative max-w-[150px] md:max-w-[180px]">
            <img 
              src="/assets/images/shop/next_level_cover.png" 
              alt="An Idiot's Guide" 
              className="rounded-xl border border-slate-800 shadow-xl w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side: Lead Capture */}
        <div className="col-span-12 md:col-span-8 space-y-4">
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold text-cyan-400 uppercase tracking-widest">
              🔧 Next Level Action Plan
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white">
              Your score is locked. Let's start correcting your baselines.
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To begin optimizing your scores across our six core protocols, download your free personalized copy of <strong>An Idiot’s Guide to the Next Level Lifespan</strong>. This simple, 5-page workbook translates your diagnostic numbers into immediate, zero-cost physical habits.
            </p>
          </div>

          {success ? (
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold flex items-center justify-center">
              ✓ Check your inbox! Your welcome email is on its way, and your Idiot’s Guide download has triggered.
            </div>
          ) : (
            <form onSubmit={handleQuizLeadSave} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full sm:w-1/3 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:border-cyan-500/50 focus:outline-none transition"
              />
              <input 
                type="email" 
                required
                placeholder="Enter email to save score & download"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:border-cyan-500/50 focus:outline-none transition"
              />
              <button 
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all duration-200 shadow-lg shadow-cyan-500/10 whitespace-nowrap disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Saving...' : 'Get My Free Guide'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
