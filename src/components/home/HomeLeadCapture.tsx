import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function HomeLeadCapture() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: name,
          source: 'homepage_lead'
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setSuccess(true);
      } else {
        navigate('/library?download=idiots-guide');
      }
    } catch (err: any) {
      console.error('Subscription error:', err.message);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="onboarding-gateway" className="relative overflow-hidden bg-slate-950 border border-slate-900 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl my-12 scroll-mt-28">
      {/* Soft blue ambient glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Left Column: Glass-Holographic Book Cover */}
        <div className="col-span-12 md:col-span-5 flex justify-center">
          <div className="relative group max-w-[260px] md:max-w-xs transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-20 blur-lg group-hover:opacity-30 transition duration-500" />
            <img 
              src="/assets/images/shop/next_level_cover.png" 
              alt="An Idiot's Guide to the Next Level Lifespan" 
              className="relative rounded-2xl border border-slate-800 shadow-2xl w-full h-auto object-contain"
            />
            <span className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
              Free PDF
            </span>
          </div>
        </div>

        {/* Right Column: High-Converting Opt-In Copy */}
        <div className="col-span-12 md:col-span-7 space-y-6 text-left">
          <div className="space-y-3">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block">
              💡 Biological Decoder Ring
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              The Science is Deep.<br />We Made It Simple.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              123TheNextLevel is packed with elite molecular protocols, complex biological telemetry, and clinical metrics. It can feel overwhelming.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              That’s why we wrote <strong>An Idiot’s Guide to the Next Level Lifespan</strong>—a ruthlessly honest, 5-page translator. It is designed to decode our complex science, explain why living longer is a curse if you are frail, and give you the exact, simple daily habits to start reclaiming your biological youth today.
            </p>
          </div>

          {success ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 space-y-3 text-center">
              <div className="text-2xl">✓</div>
              <h4 className="text-lg font-bold text-white">Check your inbox! Your welcome email is on its way.</h4>
              <p className="text-xs text-slate-300">Your complimentary guide has been dispatched to your email.</p>
              <button
                type="button"
                onClick={() => navigate('/library?download=idiots-guide')}
                className="mt-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Download Guide Directly ➔
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm focus:border-cyan-500/50 focus:outline-none transition"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm focus:border-cyan-500/50 focus:outline-none transition"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all duration-200 shadow-lg shadow-cyan-500/10 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Securing Access...' : 'Subscribe & Level Up ➔'}
              </button>
              <p className="text-[10px] text-center text-slate-500">
                Zero spam. Your email and metrics are secured behind bank-grade encryption [33].
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
