import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface QuizResultsPanelProps {
  score: number;
}

export default function QuizResultsLeadCapture({ score }: QuizResultsPanelProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleQuizLeadSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // 1. Log quiz score & subscriber details into Supabase
      if (supabase) {
        const { error } = await supabase
          .from('subscribers')
          .insert([{ 
            email, 
            lead_source: 'Quiz Results Lead Capture',
            quiz_score: score,
            subscribed_at: new Date().toISOString()
          }]);

        if (error) {
          console.warn('Supabase subscribers insert notice:', error.message);
          // Fallback to quiz_submissions or newsletter_subscribers if subscribers table schema differs
          try {
            await supabase
              .from('quiz_submissions')
              .insert([{ email, score, lead_source: 'Quiz Results Lead Capture' }]);
          } catch (e2) {
            // non-blocking
          }
        }
      }

      // Also post to backend if available
      try {
        await fetch('/api/quiz-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, score, lead_source: 'Quiz Results Lead Capture' })
        });
      } catch (e3) {
        // non-blocking
      }

      setSuccess(true);

      // 2. Programmatically fire the "Idiot's Guide" PDF download
      const link = document.createElement('a');
      link.href = '/assets/docs/idiots-guide-to-the-next-level-lifespan.pdf';
      link.download = 'idiots-guide-to-the-next-level-lifespan.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err: any) {
      console.error('Quiz lead capture failed:', err.message);
      setSuccess(true); // Fallback to let them download anyway
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
              ✓ Check your downloads! Your Idiot’s Guide has triggered.
            </div>
          ) : (
            <form onSubmit={handleQuizLeadSave} className="flex flex-col sm:flex-row gap-2">
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
