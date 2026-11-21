import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Home as HomeIcon, Shield, Info, Heart, ExternalLink, BookOpen, Database, Mail, Youtube, Instagram, Facebook } from 'lucide-react';
import { useT } from '../translations';
import MarketSelector from './MarketSelector';
import NewsletterOptIn from './NewsletterOptIn';
import { isAdminAuthenticated } from '../utils/adminTestMode';

const Footer = () => {
  const t = useT();
  const currentYear = new Date().getFullYear();
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isAdminAuthenticated() || Boolean(import.meta.env.DEV);
  });

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(isAdminAuthenticated() || Boolean(import.meta.env.DEV));
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    return () => window.removeEventListener('storage', checkAdmin);
  }, []);

  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footer Real Estate: High-Trust Newsletter Registration Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-800/80 pb-12 mb-12">
          <div className="lg:col-span-6 space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
              <span>Proactive Longevity Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-wide text-white">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">Proactive Longevity Protocol</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xl leading-relaxed">
              Get the Free Idiot's Guide to Biological Age, High-Level Blueprint PDF, and weekly biomarker telemetry insights.
            </p>
          </div>
          <div className="lg:col-span-6 w-full">
            <NewsletterOptIn variant="footer" source="footer_lead" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <img 
                src="/assets/logo-icon.png" 
                alt="123TheNextLevel Logo" 
                className="w-10 h-10 object-contain mr-3 drop-shadow group-hover:scale-105 transition-transform duration-300 shrink-0" 
              />
              <span className="font-display font-black tracking-tight text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
                123<span className="text-cyan-400">TheNextLevel</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              {t('footer_disclaimer')}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
              {t('footer_navigation')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/black-friday" className="text-amber-400 hover:text-amber-300 font-black transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 group-hover:scale-125 transition-transform"></span>
                  🔥 Black Friday Deal (£39.99)
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-blue-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <a href="/#pillars" className="text-slate-400 hover:text-blue-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t('nav_pillars')}
                </a>
              </li>
              <li>
                <a href="/#blog" className="text-slate-400 hover:text-blue-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t('nav_blog')}
                </a>
              </li>
              <li>
                <Link to="/clinician-copilot" className="text-slate-400 hover:text-cyan-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Diagnostics &amp; Co-Pilot
                </Link>
              </li>
              <li>
                <a href="/guides/" className="text-slate-400 hover:text-cyan-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Preventative Blood Guides
                </a>
              </li>
              <li>
                <Link to="/store" className="text-slate-400 hover:text-blue-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t('nav_shop')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-cyan-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Contact &amp; Community
                </Link>
              </li>
              <li>
                <Link to="/intelligence-hub" className="text-slate-400 hover:text-indigo-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Intelligence Hub
                </Link>
              </li>
              <li>
                <Link to="/updates" className="text-slate-400 hover:text-indigo-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Magazine Updates
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="text-slate-400 hover:text-indigo-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Jargon Buster (Glossary)
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sessionStorage.removeItem('hasSeen123Splash');
                      localStorage.removeItem('hasSeen123Splash');
                    } catch {}
                    window.location.href = '/?splash=1';
                  }}
                  className="text-slate-400 hover:text-cyan-400 font-semibold transition-colors duration-200 flex items-center group text-left cursor-pointer"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Replay Intro Experience ➔
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical & Expat Guides Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></span>
              Clinical &amp; Expat Guides
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/guides/uk-preventative-blood-tests/" 
                  className="text-slate-400 hover:text-cyan-400 font-semibold transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  UK Preventative Blood Test Guide (NHS Script)
                </a>
              </li>
              <li>
                <a 
                  href="/guides/us-doctor-blood-tests/" 
                  className="text-slate-400 hover:text-cyan-400 font-semibold transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  US Preventative Blood Test Guide (PCP &amp; Insurance)
                </a>
              </li>
              <li>
                <a 
                  href="/guides/spain-preventative-blood-tests/" 
                  className="text-slate-400 hover:text-cyan-400 font-semibold transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Spain Preventative Blood Test Guide (English Expat Guide)
                </a>
              </li>
            </ul>
          </div>

          {/* Admin Section Column (Direct access to all administrative & editorial suites) */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
              {t('footer_admin')}
            </h3>
            <div className="space-y-4">
              <p className="text-slate-400 text-xs font-medium italic mb-4">
                {t('footer_admin_desc')}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
                <Link 
                  to="/admin" 
                  className="inline-flex items-center text-[10px] font-black text-white bg-slate-800 hover:bg-blue-600 px-3.5 py-2.5 rounded-xl transition-all duration-300 shadow-lg border border-slate-700 hover:border-transparent group uppercase tracking-widest"
                >
                  <Settings size={14} className="mr-2 group-hover:rotate-45 transition-transform duration-500 text-blue-400 group-hover:text-white" />
                  {t('footer_admin_btn')}
                </Link>
                <Link 
                  to="/admin/blogs" 
                  className="inline-flex items-center text-[10px] font-black text-white bg-blue-950/50 hover:bg-blue-600 px-3.5 py-2.5 rounded-xl transition-all duration-300 shadow-lg border border-blue-500/30 hover:border-transparent group uppercase tracking-widest"
                >
                  <BookOpen size={14} className="mr-2 group-hover:scale-110 transition-transform duration-500 text-cyan-400 group-hover:text-white" />
                  Blog Admin
                </Link>
                <Link 
                  to="/admin/store" 
                  className="inline-flex items-center text-[10px] font-black text-white bg-emerald-950/50 hover:bg-emerald-600 px-3.5 py-2.5 rounded-xl transition-all duration-300 shadow-lg border border-emerald-500/30 hover:border-transparent group uppercase tracking-widest"
                >
                  <Database size={14} className="mr-2 group-hover:scale-110 transition-transform duration-500 text-emerald-400 group-hover:text-white" />
                  Store Admin
                </Link>
                <Link 
                  to="/superadmin" 
                  className="inline-flex items-center text-[10px] font-black text-white bg-indigo-900/40 hover:bg-indigo-600 px-3.5 py-2.5 rounded-xl transition-all duration-300 shadow-lg border border-indigo-500/30 hover:border-transparent group uppercase tracking-widest"
                >
                  <Shield size={14} className="mr-2 group-hover:scale-110 transition-transform duration-500 text-indigo-400 group-hover:text-white" />
                  SuperAdmin
                </Link>
                <Link 
                  to="/automation-admin" 
                  className="inline-flex items-center text-[10px] font-black text-white bg-purple-950/40 hover:bg-purple-600 px-3.5 py-2.5 rounded-xl transition-all duration-300 shadow-lg border border-purple-500/30 hover:border-transparent group uppercase tracking-widest"
                >
                  <Settings size={14} className="mr-2 group-hover:rotate-180 transition-transform duration-500 text-purple-400 group-hover:text-white" />
                  Blog Bot
                </Link>
              </div>
            </div>
          </div>

          {/* Trust/Social Placeholder Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2"></span>
              {t('footer_global')}
            </h3>
            <div className="bg-slate-800/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
               <MarketSelector className="justify-between" />
            </div>

            {/* Official Social & Community Hub */}
            <div className="mt-6 pt-5 border-t border-slate-800/60">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Official Channels
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.youtube.com/@123thenextlevel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-rose-500 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-all shadow-sm"
                  title="YouTube @123thenextlevel"
                  aria-label="YouTube Channel"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="https://www.instagram.com/123thenextlevel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-fuchsia-500 hover:bg-fuchsia-950/40 text-slate-300 hover:text-fuchsia-400 flex items-center justify-center transition-all shadow-sm"
                  title="Instagram @123thenextlevel"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.pinterest.com/123thenextlevel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-red-500 hover:bg-red-950/40 text-slate-300 hover:text-red-400 flex items-center justify-center transition-all shadow-sm"
                  title="Pinterest @123thenextlevel"
                  aria-label="Pinterest Boards"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/123thenextlevel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-blue-500 hover:bg-blue-950/40 text-slate-300 hover:text-blue-400 flex items-center justify-center transition-all shadow-sm"
                  title="Facebook 123TheNextLevel"
                  aria-label="Facebook Page"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="mailto:contact@123thenextlevel.com"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-cyan-500 hover:bg-cyan-950/40 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm"
                  title="Direct Email contact@123thenextlevel.com"
                  aria-label="Email Support"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimers Section */}
        <div className="border-t border-slate-800/50 pt-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            <div className="flex items-start space-x-3 bg-slate-800/30 p-6 rounded-3xl border border-slate-800/50 hover:bg-slate-800/40 transition-colors duration-300">
              <ExternalLink className="text-blue-500 shrink-0 mt-1" size={18} />
              <div>
                <h4 className="text-white font-bold text-sm mb-2">{t('footer_amazon_title')}</h4>
                <p className="text-slate-400 text-xs leading-loose font-medium">
                  {t('footer_disclaimer')}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-slate-800/30 p-6 rounded-3xl border border-slate-800/50 hover:bg-slate-800/40 transition-colors duration-300">
              <Shield className="text-indigo-500 shrink-0 mt-1" size={18} />
              <div>
                <h4 className="text-white font-bold text-sm mb-2">{t('footer_medical_title')}</h4>
                <p className="text-slate-400 text-xs leading-loose font-medium">
                  {t('footer_medical_text')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} <span className="text-slate-400">123TheNext Level</span>. {t('footer_rights')}
          </p>
          <div className="flex items-center space-x-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-1 text-slate-600 lowercase font-medium tracking-normal italic">
            <span>{t('footer_built_with')}</span>
            <Heart size={12} className="text-red-900 fill-red-900/20 mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
