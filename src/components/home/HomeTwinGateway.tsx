import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function HomeTwinGateway() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // 1. Log subscriber in Supabase database with source tracker
      if (supabase) {
        const { error } = await supabase
          .from('subscribers')
          .insert([{ 
            email, 
            full_name: name,
            lead_source: 'Idiots Guide Homepage Twin-Gateway',
            subscribed_at: new Date().toISOString()
          }]);

        if (error) {
          console.warn('Supabase subscribers notice:', error.message);
          try {
            await supabase
              .from('newsletter_subscribers')
              .insert([{ email, full_name: name, preferences: ['Idiots Guide Homepage Twin-Gateway'] }]);
          } catch (e2) {
            // non-blocking
          }
        }
      }

      // Also notify backend API asynchronously
      try {
        await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, source: 'Idiots Guide Homepage Twin-Gateway' })
        });
      } catch (apiErr) {
        // non-blocking
      }

      navigate('/blueprint-success');
    } catch (err: any) {
      console.error('Subscription error:', err.message);
      // Fallback redirect so we never block a potential lead
      navigate('/blueprint-success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="onboarding-gateway" 
      className="relative overflow-hidden bg-slate-950 border border-slate-900 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl my-16 scroll-mt-28"
    >
      {/* Background ambient neon radial flare */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Left Hand Column: Holographic Cover Art */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-center">
          <div className="relative group max-w-[240px] md:max-w-xs transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-20 blur-lg group-hover:opacity-30 transition duration-500" />
            <img 
              src="/assets/images/shop/next_level_cover.png" 
              alt="An Idiot's Guide to the Next Level Lifespan" 
              className="relative rounded-2xl border border-slate-800 shadow-2xl w-full h-auto object-contain"
            />
            <span className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
              100% Free
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 italic">
            Includes full access to our Advanced Clinical Manuals & Bibles.
          </p>
        </div>

        {/* Right Hand Column: Compelling Twin-Gateway Options */}
        <div className="col-span-12 md:col-span-7 space-y-6 text-left">
          
          {/* Section Introduction */}
          <div className="space-y-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
              Clinical Gateway Suite
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Shatter the Myth of Aging.<br />Completely Free.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              123TheNextLevel features advanced molecular science, clinical-grade biomarkers, and cellular data. It can feel intimidating. To help you take immediate action with zero confusion, we have created two complimentary entry points:
            </p>
          </div>

          {/* DUAL GATEWAY TRACKS */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            
            {/* Track A: The Wellness Quiz */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-cyan-500/20 transition">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-cyan-400">PATHWAY 1: THE QUIZ</span>
                <h3 className="text-base font-bold text-white">Find Your Score</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Spend 5 minutes to diagnose your baseline across our 6 core protocols. No guessing.
                </p>
              </div>
              <button 
                onClick={() => navigate('/quiz')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:scale-[1.01] transition duration-200 shadow-md shadow-cyan-500/5 cursor-pointer"
              >
                Take Free Quiz Now ➔
              </button>
            </div>

            {/* Track B: The Idiot's Guide */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-indigo-500/20 transition">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-indigo-400">PATHWAY 2: THE BOOK</span>
                <h3 className="text-base font-bold text-white">An Idiot's Guide</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Get our ruthlessly honest, 5-page translator to turn clinical jargon into simple daily habits.
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-slate-100 text-xs focus:border-cyan-500/50 focus:outline-none transition"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-2 px-4 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Get Free Guide PDF'}
                </button>
              </form>
            </div>

          </div>

          <p className="text-[10px] text-center md:text-left text-slate-500 italic">
            🔒 Both tools are completely free, open-access, and zero-risk. Your data is secure.
          </p>
        </div>

      </div>
    </section>
  );
}
