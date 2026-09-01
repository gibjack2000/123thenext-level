import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  ShieldCheck, 
  Globe2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Target
} from 'lucide-react';
import BiologicalHardwareStoreGrid from '../components/BiologicalHardwareStoreGrid';
import MorningBalanceCheck from '../components/MorningBalanceCheck';

export default function HardwareStorePage() {
  useEffect(() => {
    document.title = 'Biological Hardware Store & Verified Telemetry Catalog | 123TheNextLevel';
    const params = new URLSearchParams(window.location.search);
    if (!params.get('suite')) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#060911] text-white font-sans antialiased selection:bg-cyan-500/30">
      {/* Hero Header Section */}
      <div className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-sky-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)', backgroundSize: '32px 32px' }} 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation Link */}
          <Link 
            to="/science-of-age-reversal" 
            className="inline-flex items-center text-slate-400 hover:text-cyan-300 font-mono text-xs uppercase tracking-wider mb-8 transition-colors group"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to The 10-Year Bridge Showcase</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono uppercase tracking-[0.25em] font-semibold shadow-lg"
            >
              <Package size={12} className="text-cyan-400" />
              <span>Medical-Grade Telemetry & Reagents Catalog</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
              Preserving the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">
                Biological Hardware
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
              Equip your daily routine with localized, regulatory-cleared diagnostics, zero screen-time chemical reagents, and continuous cardiac telemetry to protect your biological substrate on the 10-Year Bridge.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Spotlight: 2-Minute Morning Balance Check */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            Zero Screen-Time Daily Baseline
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Featured Reagent Protocol
          </h2>
        </div>
        <MorningBalanceCheck />
      </div>

      {/* Master Store Grid Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-20">
        <BiologicalHardwareStoreGrid />
      </div>
    </div>
  );
}
