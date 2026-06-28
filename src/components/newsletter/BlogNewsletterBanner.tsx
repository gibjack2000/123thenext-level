import React, { useState } from 'react';
import { Mail, Sparkles, Check, Loader2 } from 'lucide-react';
import { useT } from '../../translations';

interface BlogNewsletterBannerProps {
  currentCategory?: string;
}

const CATEGORIES = ['Health', 'Fitness', 'Nutrition', 'Wellness'];

export default function BlogNewsletterBanner({ currentCategory }: BlogNewsletterBannerProps) {
  const t = useT();
  const [email, setEmail] = useState('');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(() => {
    if (currentCategory) {
      const cleanCat = currentCategory.toLowerCase().replace(/[^a-z0-9]/g, '');
      const match = CATEGORIES.find(cat => cat.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanCat);
      if (match) return [match];
    }
    return CATEGORIES;
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const togglePref = (category: string) => {
    setSelectedPrefs(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          preferences: selectedPrefs,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="relative rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 md:p-12 overflow-hidden shadow-2xl border border-white/10 my-12 group">
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Content Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase border border-blue-500/30">
            <Sparkles size={12} className="mr-1.5 animate-pulse" />
            The Weekly Bento Box
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-semibold uppercase tracking-wide text-white leading-tight">
            Enjoying this? Let the updates come to you
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
            Subscribe to our Preference Center. Get exactly one curated deep-dive, action step, and tool from your selected health pillars—no clutter, no spam.
          </p>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
                <Check size={24} />
              </div>
              <h4 className="text-white font-bold text-lg">You're on the list!</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Check your inbox for a confirmation welcome email. We have saved your preferences.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-6">
              {/* Preference checkboxes */}
              <div>
                <label className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                  Choose your updates
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(category => {
                    const isSelected = selectedPrefs.includes(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => togglePref(category)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                            : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <span>{category}</span>
                        {isSelected && <Check size={12} className="text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input field */}
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-slate-900/60 border border-slate-800 focus:border-blue-500 text-white rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                
                {status === 'error' && (
                  <p className="text-red-400 text-xs font-semibold">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || selectedPrefs.length === 0}
                  className="w-full inline-flex justify-center items-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe to updates'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
