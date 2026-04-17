import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Home as HomeIcon, Shield, Info, Heart, ExternalLink } from 'lucide-react';
import { useT } from '../translations';

const Footer = () => {
  const t = useT();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl text-white mr-3 shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300">
                <HomeIcon size={20} strokeWidth={2.5} />
              </div>
              <span className="font-display font-semibold uppercase tracking-[0.02em] text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
                123TheNext Level
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
                <a href="/#shop" className="text-slate-400 hover:text-blue-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {t('nav_shop')}
                </a>
              </li>
              <li>
                <Link to="/intelligence-hub" className="text-slate-400 hover:text-indigo-400 font-semibold transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Intelligence Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin Section Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
              {t('footer_admin')}
            </h3>
            <div className="space-y-4">
              <p className="text-slate-400 text-xs font-medium italic mb-4">
                {t('footer_admin_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/admin" 
                  className="inline-flex items-center text-[10px] font-black text-white bg-slate-800 hover:bg-blue-600 px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg border border-slate-700 hover:border-transparent group uppercase tracking-widest"
                >
                  <Settings size={14} className="mr-2 group-hover:rotate-45 transition-transform duration-500" />
                  {t('footer_admin_btn')}
                </Link>
                <Link 
                  to="/superadmin" 
                  className="inline-flex items-center text-[10px] font-black text-white bg-indigo-900/40 hover:bg-indigo-600 px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg border border-indigo-500/30 hover:border-transparent group uppercase tracking-widest"
                >
                  <Shield size={14} className="mr-2 group-hover:scale-110 transition-transform duration-500" />
                  SuperAdmin
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
            <div className="grid grid-cols-2 gap-3">
              <Link to="/us" className="bg-slate-800/50 hover:bg-slate-800 p-2 rounded-lg text-xs font-bold transition-all text-center border border-slate-700/50">US STORE</Link>
              <Link to="/uk" className="bg-slate-800/50 hover:bg-slate-800 p-2 rounded-lg text-xs font-bold transition-all text-center border border-slate-700/50">UK STORE</Link>
              <Link to="/es" className="bg-slate-800/50 hover:bg-slate-800 p-2 rounded-lg text-xs font-bold transition-all text-center border border-slate-700/50">ES STORE</Link>
              <div className="bg-slate-800/20 p-2 rounded-lg text-xs font-bold text-slate-500 text-center border border-slate-800 border-dashed">GLOBAL</div>
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
