import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Award, FileText, CheckCircle2, FlaskConical, Shield, Bookmark, Sparkles } from 'lucide-react';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-b from-[#0e1726] via-[#0b101d] to-[#080d16] border border-cyan-500/30 p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 text-white"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FileText size={16} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                Peer-Reviewed Evidence Citation [120]
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Primary Study Card */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase mb-2">
                    <Award size={11} />
                    Landmark Nature Publication
                  </div>
                  <h4 className="text-base md:text-lg font-display font-bold text-white leading-snug">
                    "Reprogramming to recover youthful epigenetic information and restore vision"
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Nature 588, 124–129 (2020) • Lu, Y., Brommer, B., Tian, X., Sinclair, D.A., et al. (Harvard Medical School)
                  </p>
                </div>
              </div>
            </div>

            {/* Core Scientific Takeaways */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Clinical Discovery Highlights
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                    <Sparkles size={13} className="text-cyan-400" />
                    Epigenetic Factory Reset
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ectopic expression of Oct4, Sox2, and Klf4 (OSK) in damaged retinal ganglion cells restored youthful DNA methylation patterns and promoted axon regeneration.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                    <FlaskConical size={13} className="text-amber-400" />
                    ER-100 Clinical Candidate
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Developed by Life Biosciences for treating glaucoma and non-arteritic anterior ischemic optic neuropathy (NAION), advancing partial reprogramming into human medicine.
                  </p>
                </div>
              </div>
            </div>

            {/* Nobel Prize Foundation Note */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/30 to-amber-950/30 border border-cyan-500/20 text-xs text-slate-300 flex items-start space-x-3">
              <Shield size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Why Excluding "c-Myc" Matters:</span> While the original 2006 Nobel Prize-winning Yamanaka factors included c-Myc (which can induce tumorigenesis), the modern longevity paradigm uses <strong>only the OSK trio</strong> (Oct4, Sox2, Klf4), restoring youthful identity without losing cellular differentiation or inducing oncogenesis.
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              Close Reference
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CitationModal;
