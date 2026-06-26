import React, { useState, useEffect, useRef } from 'react';
import { Mail, X, Check, Loader2, Sparkles } from 'lucide-react';

const CATEGORIES = ['Health', 'Fitness', 'Nutrition', 'Wellness'];

export default function SlideInNewsletter() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(CATEGORIES);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter_subscribed') === 'true';
    if (subscribed) {
      setHasSubscribed(true);
    }
  }, []);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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
        localStorage.setItem('newsletter_subscribed', 'true');
        setHasSubscribed(true);
        setEmail('');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <>
      {/* Floating Trigger Tab */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all duration-300 group cursor-pointer ${
          isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
        </span>
        <Mail size={16} className="group-hover:rotate-12 transition-transform duration-300" />
        <span>{hasSubscribed ? 'Newsletter Center' : 'Subscribe & Level Up'}</span>
      </button>

      {/* Slide-out Panel Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Slide-out Panel Container */}
        <div
          ref={panelRef}
          className={`absolute top-0 right-0 w-full max-w-md h-full bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-start mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
                <Sparkles size={12} className="mr-1.5 animate-pulse" />
                The Next Level Blueprint
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-semibold uppercase tracking-wide text-white mb-4 leading-tight">
              {hasSubscribed ? 'Manage Preferences' : 'Unclutter Your Health Journey'}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              We send a single **Bento Box style** weekly digest featuring one deep-dive post, one practical tip, and one tool from your selected interest pillars.
            </p>

            {status === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1">
                  <Check size={20} />
                </div>
                <h4 className="text-white font-bold">Preferences Saved!</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Thank you! We've updated your newsletter topics. You will receive your welcome confirmation shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-6">
                {/* Preference Options */}
                <div className="space-y-3">
                  <label className="block text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Pillars of Interest
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(category => {
                      const isSelected = selectedPrefs.includes(category);
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => togglePref(category)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                              : 'bg-slate-800/40 border-slate-800 text-slate-500 hover:border-slate-700'
                          }`}
                        >
                          <span>{category}</span>
                          {isSelected && <Check size={12} className="text-blue-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-slate-950/60 border border-slate-850 focus:border-blue-500 text-white rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-600 outline-none transition-colors"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-400 text-xs font-semibold">{errorMessage}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || selectedPrefs.length === 0}
                  className="w-full inline-flex justify-center items-center py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Subscribing...
                    </>
                  ) : (
                    hasSubscribed ? 'Update Preferences' : 'Unlock Access'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer Info */}
          <div className="border-t border-white/5 pt-6 text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
            100% spam-free. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
          </div>
        </div>
      </div>
    </>
  );
}
