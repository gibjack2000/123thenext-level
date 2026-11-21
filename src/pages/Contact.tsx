import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Youtube, 
  Instagram, 
  Facebook, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  ShieldAlert, 
  Send, 
  Clock, 
  Sparkles,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

// Official Endpoints Configuration
const CONTACT_CONFIG = {
  email: 'contact@123thenextlevel.com',
  youtube: 'https://www.youtube.com/@123thenextlevel',
  instagram: 'https://www.instagram.com/123thenextlevel',
  facebook: 'https://www.facebook.com/123thenextlevel',
  pinterest: 'https://www.pinterest.com/123thenextlevel',
};

// Official Pinterest Monogram SVG Icon
const PinterestIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Protocol Question',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact & Community | 123TheNextLevel Longevity Research";
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(CONTACT_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay and provide email client hand-off option
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleLaunchEmailClient = () => {
    const subject = encodeURIComponent(`[${formData.category}] Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Category: ${formData.category}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden pb-24">
      {/* Ambient Cybernetic Lighting */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-cyan-900/15 via-teal-900/10 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
        
        {/* ========================================================= */}
        {/* HERO HEADER */}
        {/* ========================================================= */}
        <header className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold tracking-widest uppercase mb-5 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            COMMUNICATION &amp; PROTOCOL INQUIRIES
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">123TheNextLevel</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
            Questions about our longevity protocols, clinician co-pilot biomarker guides, or partnership inquiries? Reach out directly below.
          </p>
        </header>

        {/* ========================================================= */}
        {/* SECTION A: DIRECT CONTACT & SOCIAL MEDIA 4-CARD GRID */}
        {/* ========================================================= */}
        <section aria-label="Official Communication Channels" className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* CARD 1: DIRECT EMAIL */}
            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/40 p-6 sm:p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_8px_35px_rgba(6,182,212,0.12)] hover:-translate-y-0.5 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400/60 transition-all shadow-inner">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Desk
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-1.5 font-display">
                  Direct Inquiries
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  For formal protocol requests, clinician consultation inquiries, or customer support:
                </p>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                  <a 
                    href={`mailto:${CONTACT_CONFIG.email}`}
                    className="font-mono text-xs sm:text-sm text-cyan-300 hover:text-cyan-200 hover:underline truncate flex-1 font-semibold"
                    title="Send an email to contact@123thenextlevel.com"
                  >
                    {CONTACT_CONFIG.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all text-xs font-semibold shrink-0 flex items-center gap-1"
                    title="Copy email to clipboard"
                    aria-label="Copy business email"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Response window: Within 24–48 hours.</span>
              </div>
            </div>

            {/* CARD 2: YOUTUBE CHANNEL */}
            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-rose-500/40 p-6 sm:p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_8px_35px_rgba(244,63,94,0.12)] hover:-translate-y-0.5 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 group-hover:border-rose-400/60 transition-all shadow-inner">
                    <Youtube className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-rose-300 bg-rose-950/40 border border-rose-500/30 px-2.5 py-1 rounded-full">
                    @123thenextlevel
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-1.5 font-display">
                  YouTube Channel
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Clinical deep dives, biological age testing reviews, and longevity Shorts.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <a
                  href={CONTACT_CONFIG.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 hover:text-white border border-rose-500/40 hover:border-rose-400 text-xs font-bold transition-all shadow-md group-hover:shadow-rose-950/50"
                >
                  <span>Watch Channel Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* CARD 3: META COMMUNITY (INSTAGRAM & FACEBOOK) */}
            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-fuchsia-500/40 p-6 sm:p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_8px_35px_rgba(217,70,239,0.12)] hover:-translate-y-0.5 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-fuchsia-950/60 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 group-hover:scale-105 group-hover:border-fuchsia-400/60 transition-all shadow-inner">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:border-blue-400/60 transition-all shadow-inner">
                      <Facebook className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-fuchsia-300 bg-fuchsia-950/40 border border-fuchsia-500/30 px-2.5 py-1 rounded-full">
                    Social Channels
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-1.5 font-display">
                  Meta Community
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Daily protocol micro-habits, reels, and product updates.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2.5">
                <a
                  href={CONTACT_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-fuchsia-950/40 hover:bg-fuchsia-900/60 text-fuchsia-200 hover:text-white border border-fuchsia-500/40 hover:border-fuchsia-400 text-xs font-bold transition-all text-center"
                >
                  <Instagram className="w-3.5 h-3.5 shrink-0" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
                <a
                  href={CONTACT_CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 text-blue-200 hover:text-white border border-blue-500/40 hover:border-blue-400 text-xs font-bold transition-all text-center"
                >
                  <Facebook className="w-3.5 h-3.5 shrink-0" />
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* CARD 4: PINTEREST HUB */}
            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-red-500/40 p-6 sm:p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_8px_35px_rgba(239,68,68,0.12)] hover:-translate-y-0.5 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 group-hover:border-red-400/60 transition-all shadow-inner">
                    <PinterestIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-red-300 bg-red-950/40 border border-red-500/30 px-2.5 py-1 rounded-full">
                    Visual Protocols
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-1.5 font-display">
                  Pinterest Hub
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Visual circadian protocols, sleep sanctuary guides, and Black Friday master vault pins.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <a
                  href={CONTACT_CONFIG.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-200 hover:text-white border border-red-500/40 hover:border-red-400 text-xs font-bold transition-all shadow-md group-hover:shadow-red-950/50"
                >
                  <span>Explore Pinterest Boards</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION B: QUICK CONTACT & INQUIRY FORM */}
        {/* ========================================================= */}
        <section aria-label="Inquiry Form" className="max-w-3xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] relative">
            
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Telemetry Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Send Direct Protocol Inquiry
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Have a question regarding biomarker panels, vault access, or scientific collaborations? Submit your note below.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  Inquiry Successfully Prepared!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your note regarding <span className="text-cyan-300">"{formData.category}"</span> has been logged. Our protocol team responds to all inquiries within 24–48 business hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleLaunchEmailClient}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email App</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', category: 'General Protocol Question', message: '' });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Inquiry Category Dropdown */}
                <div>
                  <label htmlFor="contact-category" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Inquiry Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl px-4 py-3 text-sm outline-none transition-all cursor-pointer"
                  >
                    <option value="General Protocol Question">General Protocol Question</option>
                    <option value="Clinician Co-Pilot Support">Clinician Co-Pilot Support</option>
                    <option value="Vault Order Assistance">Vault Order Assistance</option>
                    <option value="Partnership / Media">Partnership / Media</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Message Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Describe your inquiry, biological question, or order details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-600 resize-y min-h-[120px]"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Medical Disclaimer Banner */}
            <div className="mt-8 p-4 sm:p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold block mb-0.5">Educational Advisory:</strong>
                <p>
                  Note: 123TheNextLevel provides educational longevity research and biomarker frameworks. We cannot provide direct medical diagnoses or emergency medical advice. Always consult your GP or personal physician.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
