import React, { useState, useEffect } from 'react';
import { Info, X, ChevronDown, ChevronUp, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface UrinalysisInstructionsProps {
  onDismiss?: () => void;
}

export default function UrinalysisInstructions({ onDismiss }: UrinalysisInstructionsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load visibility preference from localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem('urinalysis_instructions_visible');
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === 'true');
    }
    const savedCollapsed = localStorage.getItem('urinalysis_instructions_collapsed');
    if (savedCollapsed !== null) {
      setIsCollapsed(savedCollapsed === 'true');
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('urinalysis_instructions_visible', 'false');
    if (onDismiss) onDismiss();
  };

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('urinalysis_instructions_collapsed', String(newState));
  };

  const handleReset = () => {
    setIsVisible(true);
    setIsCollapsed(false);
    localStorage.setItem('urinalysis_instructions_visible', 'true');
    localStorage.setItem('urinalysis_instructions_collapsed', 'false');
  };

  // Expose reset trigger on window for testing or development convenience
  useEffect(() => {
    (window as any).resetUrinalysisInstructions = handleReset;
    return () => {
      delete (window as any).resetUrinalysisInstructions;
    };
  }, []);

  if (!isVisible) {
    return (
      <div className="flex justify-end mb-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-wellness-cyan/30 text-slate-400 hover:text-wellness-cyan-light text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95"
        >
          <Eye size={12} />
          <span>Show Guidance Manual</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl bg-slate-900/50 border border-amber-500/20 p-6 text-left relative overflow-hidden transition-all duration-300">
      {/* Background glow overlay */}
      <span className="absolute -right-16 -top-16 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></span>

      {/* Header area */}
      <div className="flex justify-between items-start gap-4 border-b border-slate-800/80 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          {/* Informational light-blue beacon pulse */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wellness-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-wellness-cyan-light"></span>
          </span>
          <h4 className="text-xs sm:text-sm font-display uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
            <span>📋 Quick-Start Urinalysis Protocol • Read Before Testing</span>
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleCollapse}
            className="p-1 rounded bg-slate-950/40 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title={isCollapsed ? "Expand Directions" : "Collapse Directions"}
          >
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 rounded bg-slate-950/40 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
            title="Dismiss Directions"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Expandable Content Panel */}
      {!isCollapsed && (
        <div className="space-y-6 animate-fade-in">
          {/* Four steps structured numbered grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-4 bg-slate-950/30 border border-slate-850 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider font-bold">Step 01</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Preparation</span>
                </div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5">1. Prepare</h5>
                <p className="text-[11px] text-slate-grey-300 font-light leading-relaxed">
                  Cleanse hands and retrieve a fresh mid-stream sample in a sterile vessel. Extract one test strip and seal the vial lid immediately to prevent ambient moisture contamination.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-slate-950/30 border border-slate-850 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider font-bold">Step 02</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Submergence</span>
                </div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5">2. Dip</h5>
                <p className="text-[11px] text-slate-grey-300 font-light leading-relaxed">
                  Submerge all 10 reagent pads completely into the urine sample for <strong className="text-cyan-400 font-bold">exactly one second</strong>. Ensure uniform contact across all biochemical panels.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-slate-950/30 border border-slate-850 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider font-bold">Step 03</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Incubation</span>
                </div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5">3. Drain & Time</h5>
                <p className="text-[11px] text-slate-grey-300 font-light leading-relaxed">
                  Run the strip's edge along the container rim to remove excess liquid. Rest the strip horizontally on a clean paper towel to prevent pad cross-run, and wait for <strong className="text-cyan-400 font-bold">exactly 60 seconds</strong>.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-slate-950/30 border border-slate-850 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-wellness-cyan uppercase tracking-wider font-bold">Step 04</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Analysis</span>
                </div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wide mb-1.5">4. Match & Log</h5>
                <p className="text-[11px] text-slate-grey-300 font-light leading-relaxed">
                  Under bright, natural light, compare each pad with the reference chart on your bottle. Select the corresponding values in the logger tool to map system impacts.
                </p>
              </div>
            </div>

          </div>

          {/* Privacy & Safety Disclaimer */}
          <div className="p-4 border border-slate-800 bg-slate-950/60 rounded-2xl flex gap-3 items-start">
            <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider block">
                ⚠️ Patient Safety & Data Sovereignty
              </span>
              <p className="text-[10.5px] sm:text-[11px] text-slate-grey-400 font-light leading-relaxed">
                Raw biochemical measurements are not a diagnosis and must be co-evaluated with a qualified general practitioner. 123TheNext Level does not collect, store, or process your sensitive medical data on public servers. You maintain 100% local ownership of your biometrics.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Small notification-like preview when collapsed */}
      {isCollapsed && (
        <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-light">
          <div className="flex items-center gap-2">
            <Info size={12} className="text-wellness-cyan" />
            <span>Protocol guidelines collapsed. Click expand icon to review the 4-step testing manual.</span>
          </div>
          <button 
            onClick={toggleCollapse} 
            className="text-wellness-cyan hover:text-wellness-cyan-light underline font-bold uppercase tracking-wider cursor-pointer"
          >
            Review Steps
          </button>
        </div>
      )}
    </div>
  );
}
