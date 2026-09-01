import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Disc, 
  Zap, 
  Activity, 
  ArrowRight, 
  ChevronRight, 
  Sun, 
  Award, 
  Clock, 
  Flame, 
  Dna, 
  HeartPulse, 
  CheckCircle2, 
  Stethoscope, 
  TrendingUp, 
  Gauge, 
  FileText, 
  Share2, 
  Compass, 
  BatteryCharging, 
  Droplets,
  Layers,
  HelpCircle,
  Cpu,
  RefreshCw,
  ExternalLink,
  Target
} from 'lucide-react';
import CDLaserIllustration from '../components/science-showcase/CDLaserIllustration';
import CrisisFirefighterIllustration from '../components/science-showcase/CrisisFirefighterIllustration';
import ProactiveBridgeLaserIllustration from '../components/science-showcase/ProactiveBridgeLaserIllustration';
import RestorativeHorizonIllustration from '../components/science-showcase/RestorativeHorizonIllustration';
import CitationModal from '../components/science-showcase/CitationModal';
import FriendlyWellnessQuizModal from '../components/FriendlyWellnessQuizModal';

type TimelineNodeKey = 'traditional-care' | 'proactive-care' | 'future-software';

interface TimelineNode {
  id: TimelineNodeKey;
  number: string;
  label: string;
  shortTag: string;
  status: string;
  statusType: 'crisis' | 'active' | 'future';
  badge: string;
  timeframe: string;
  summary: string;
}

const timelineNodes: TimelineNode[] = [
  {
    id: 'traditional-care',
    number: '01',
    label: 'Crisis Firefighting (Traditional Care)',
    shortTag: 'Traditional Care',
    status: 'Emergency Mitigation Only',
    statusType: 'crisis',
    badge: 'Stage 1: Reactive Crisis',
    timeframe: 'Acute Onset / Symptoms',
    summary: 'Brilliant emergency intervention for acute trauma, infections, and surgical rescue. Structurally reactive: waits for downstream clinical disease thresholds before sounding alarms, missing decades of silent subclinical decay.'
  },
  {
    id: 'proactive-care',
    number: '02',
    label: 'The Critical Path (Proactive Care Today)',
    shortTag: 'Proactive Care Today',
    status: 'Active Hardware Optimization - Core Program',
    statusType: 'active',
    badge: 'Stage 2: Core Program (Active)',
    timeframe: 'Present Era (Years 0 – 10)',
    summary: 'Active Hardware Preservation. Eliminating epigenetic scratches, preserving vascular compliance, and stabilizing glycemic curves today to ensure your biological machine remains pristine to run tomorrow’s geroscience software.'
  },
  {
    id: 'future-software',
    number: '03',
    label: 'The Reprogramming Software (Future Epigenetic Care)',
    shortTag: 'Future Epigenetic Care',
    status: 'Continuous Development - Target 2036',
    statusType: 'future',
    badge: 'Stage 3: Restorative Horizon',
    timeframe: 'Target Horizon ~2036',
    summary: 'Nobel Prize-winning cellular reprogramming (OSK factors & ER-100 therapies) that reboots cells to youthful factory settings without changing raw DNA. Constrained by the physical necessity of intact biological hardware.'
  }
];

export default function Science() {
  const [activeNode, setActiveNode] = useState<TimelineNodeKey>('proactive-care');
  const [isCitationOpen, setIsCitationOpen] = useState<boolean>(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The Anti-Aging Health Revolution: The Critical Path to Human Optimization | 123TheNextLevel';
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-white font-sans antialiased selection:bg-cyan-500/30 relative overflow-hidden">
      {/* ========================================================================= */}
      {/* Ambient Grid & Glowing Cellular Pathway Vectors */}
      {/* ========================================================================= */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #f59e0b 1px, transparent 1px),
            linear-gradient(-45deg, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px'
        }}
      />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-1/3 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* TOP SECTION: The 10-Year Proactive Bridge Hero */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Sparkles size={14} className="animate-pulse text-cyan-300" />
            <span>THE ANTI-AGING HEALTH REVOLUTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15] mb-6">
            Upgrade the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">Hardware</span> Before You Wait for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">Software</span>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
            A unified geroscience manifesto: The breakthroughs of 2036 — cellular reprogramming, senescence reversal, the works — won't save a body that can't run them. Real longevity starts now, in the vessels, the metabolism, the mitochondria. Preserve the machine today, or there's nothing left to upgrade tomorrow.
          </p>

          {/* Quick Jump Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-slate-400 max-w-4xl mx-auto">
            <a href="#timeline-cpa" className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all flex items-center gap-1.5">
              <Activity size={13} className="text-cyan-400" />
              <span>Interactive CPA Timeline</span>
            </a>
            <a href="#epigenetic-sovereignty" className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all flex items-center gap-1.5">
              <Dna size={13} className="text-cyan-400" />
              <span>Epigenetic Sovereignty</span>
            </a>
            <a href="#cd-metaphor" className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all flex items-center gap-1.5">
              <Disc size={13} className="text-amber-400" />
              <span>CD & Laser Analogy</span>
            </a>
            <a href="#patient-to-partner" className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all flex items-center gap-1.5">
              <Stethoscope size={13} className="text-cyan-400" />
              <span>Physician Alliance</span>
            </a>
            <a href="#critical-toolkit" className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all flex items-center gap-1.5">
              <Cpu size={13} className="text-amber-400" />
              <span>The 3-Domain Toolkit</span>
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MIDDLE SECTION: Interactive 3-Node Critical Path Timeline Widget */}
        {/* ========================================================================= */}
        <section id="timeline-cpa" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-20">
          <div className="rounded-3xl bg-gradient-to-b from-[#0e1628]/90 via-[#0a0f1d]/90 to-[#070b14]/90 border border-cyan-500/30 p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden">
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest mb-1.5">
                  <Activity size={14} className="animate-pulse" />
                  <span>The Critical Path Analysis (CPA) Progression Widget</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  The 10-Year Bridge to Age-Reversal
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
                Click any milestone below to switch the stage simulator and inspect the clinical mechanics.
              </p>
            </div>

            {/* 3-Node Horizontal Timeline Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative">
              {timelineNodes.map((node) => {
                const isActive = activeNode === node.id;
                const isCrisis = node.statusType === 'crisis';
                const isCoreActive = node.statusType === 'active';
                const isFuture = node.statusType === 'future';

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={`relative p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? isCoreActive
                          ? 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/50'
                          : isCrisis
                            ? 'bg-rose-950/40 border-rose-400/80 shadow-[0_0_30px_rgba(244,63,94,0.3)] ring-1 ring-rose-400/50'
                            : 'bg-amber-950/40 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/50'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    {/* Top Row: Node Number & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          isActive
                            ? isCoreActive
                              ? 'bg-cyan-400 text-slate-950'
                              : isCrisis
                                ? 'bg-rose-500 text-white'
                                : 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {node.number}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          {node.timeframe}
                        </span>
                      </div>

                      {/* Active / Status Pills */}
                      {isCoreActive && (
                        <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold tracking-widest animate-pulse">
                          CORE PROGRAM
                        </span>
                      )}
                      {isCrisis && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-bold tracking-widest">
                          REACTIVE
                        </span>
                      )}
                      {isFuture && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold tracking-widest">
                          HORIZON
                        </span>
                      )}
                    </div>

                    {/* Node Title & Status */}
                    <div>
                      <h3 className="text-base font-display font-bold text-white mb-1.5 leading-snug">
                        {node.label}
                      </h3>
                      <div className={`text-xs font-mono font-semibold flex items-center gap-1.5 ${
                        isCoreActive
                          ? 'text-cyan-400'
                          : isCrisis
                            ? 'text-rose-400'
                            : 'text-amber-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          isCoreActive
                            ? 'bg-cyan-400 animate-ping'
                            : isCrisis
                              ? 'bg-rose-500'
                              : 'bg-amber-400'
                        }`} />
                        <span>Status: {node.status}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Simulation Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              {/* Left Column: Stage Description & Key Metrics (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                      <span>Milestone {timelineNodes.find(n => n.id === activeNode)?.number} of 03</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-cyan-400 font-bold">{timelineNodes.find(n => n.id === activeNode)?.shortTag}</span>
                    </div>

                    <h3 className="text-2xl font-display font-extrabold text-white">
                      {timelineNodes.find(n => n.id === activeNode)?.label}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {timelineNodes.find(n => n.id === activeNode)?.summary}
                    </p>

                    {/* Stage Feature Highlights */}
                    {activeNode === 'traditional-care' && (
                      <div className="space-y-2.5 pt-2">
                        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200 flex items-start gap-2.5">
                          <Flame size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block font-mono uppercase tracking-wider">Emergency Brilliance:</strong>
                            Unmatched for acute infections, severe physical trauma, and emergency surgical interventions.
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                          <ShieldAlert size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block font-mono uppercase tracking-wider">The Reactive Blind Spot:</strong>
                            Waits for downstream disease thresholds, missing 20–30 years of subclinical arterial & mitochondrial erosion.
                          </div>
                        </div>
                      </div>
                    )}

                    {activeNode === 'proactive-care' && (
                      <div className="space-y-2.5 pt-2">
                        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
                          <ShieldCheck size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block font-mono uppercase tracking-wider">Active Hardware Defense:</strong>
                            100% focused on keeping vascular compliance, glycemic stability, and cellular baseline telemetry pristine.
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                          <Sparkles size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block font-mono uppercase tracking-wider">The Physical Bridge:</strong>
                            Ensures you live in peak health and high vitality so you are biologically qualified to run the 2036 software.
                          </div>
                        </div>
                      </div>
                    )}

                    {activeNode === 'future-software' && (
                      <div className="space-y-2.5 pt-2">
                        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                          <Award size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block font-mono uppercase tracking-wider">Nobel Prize Geroscience:</strong>
                            Cellular reprogramming using Yamanaka factors (Oct4, Sox2, Klf4) to restore youthful epigenetic state.
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                          <Cpu size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block font-mono uppercase tracking-wider">Hardware Dependency:</strong>
                            Reprogramming code cannot reboot destroyed, calcified organs. Preserving biological hardware today is non-negotiable.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interactive CTAs */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsQuizModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
                      >
                        <Sun size={13} />
                        <span>Run 5-Min Balance Scan</span>
                      </button>
                      <button
                        onClick={() => setIsCitationOpen(true)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText size={13} />
                        <span>View Peer Citations</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Live Interactive Mechanical Illustration (7 Cols) */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeNode === 'traditional-care' && (
                      <CrisisFirefighterIllustration />
                    )}
                    {activeNode === 'proactive-care' && (
                      <ProactiveBridgeLaserIllustration />
                    )}
                    {activeNode === 'future-software' && (
                      <RestorativeHorizonIllustration onOpenCitation={() => setIsCitationOpen(true)} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* UNDER-TIMELINE SECTION: Complete Geroscience Philosophy Text */}
        {/* ========================================================================= */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
          
          {/* ----------------------------------------------------------------------- */}
          {/* SECTION 1: The Core Paradigm */}
          {/* ----------------------------------------------------------------------- */}
          <section id="epigenetic-sovereignty" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                01
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                1. The Core Paradigm: Epigenetic Sovereignty vs. Genetic Determinism
              </h2>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 shadow-xl space-y-5 text-slate-300 leading-relaxed font-light text-base md:text-lg">
              <p>
                Traditional healthcare has long operated under a deterministic fallacy: the belief that our health span, vitality, and cellular rate of decay are pre-programmed inside our raw DNA. Modern molecular biology and geroscience have completely shattered this assumption.
              </p>

              {/* Highlight Callout Block */}
              <div className="my-6 p-5 sm:p-6 rounded-xl bg-cyan-950/40 border-l-4 border-cyan-400 text-white font-medium text-lg sm:text-xl">
                <span className="text-cyan-300 font-bold">The science of epigenetics reveals that 80% to 90%</span> of how quickly your cells age is governed entirely by daily lifestyle, metabolic, and environmental inputs—not your inherited genetics.
              </div>

              <p>
                Your DNA is not a fixed, unalterable script; it is a library of blueprints. You are the primary software engineer of your own biology, possessing direct epigenetic sovereignty.
              </p>

              <p>
                Through the choices you make every day, you actively write the code that compacts or opens your DNA, turning off cellular damage markers and turning on the longevity pathways that maintain systemic youth and cellular stability.
              </p>
            </div>
          </section>

          {/* ----------------------------------------------------------------------- */}
          {/* SECTION 2: Critical Path Analysis */}
          {/* ----------------------------------------------------------------------- */}
          <section id="cd-metaphor" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                02
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                2. Critical Path Analysis: Preserving the Hardware for Tomorrow's Software
              </h2>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 shadow-xl space-y-6 text-slate-300 leading-relaxed font-light text-base md:text-lg">
              <p>
                To understand how we optimize human longevity, we apply the engineering framework of <strong className="text-white font-semibold">Critical Path Analysis (CPA)</strong>:
              </p>

              {/* High-Tech CPA Visual Box Representation */}
              <div className="p-5 md:p-6 rounded-xl bg-[#060a12] border border-cyan-500/30 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center min-w-[550px]">
                  {/* Milestone 1 Box (5 cols) */}
                  <div className="md:col-span-5 p-4 rounded-lg bg-slate-900 border border-cyan-500/40 text-slate-200">
                    <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
                      MILESTONE 1: TODAY
                    </div>
                    <div className="text-white font-bold text-sm mb-2">
                      Active Hardware Preservation
                    </div>
                    <ul className="space-y-1 text-xs text-slate-400">
                      <li>• Eliminate cellular scratches</li>
                      <li>• Maintain vascular compliance</li>
                      <li>• Flatten glycemic spikes</li>
                    </ul>
                  </div>

                  {/* Arrow Connector (1 col) */}
                  <div className="md:col-span-1 flex justify-center text-cyan-400 font-bold text-xl">
                    ───►
                  </div>

                  {/* Milestone 2 Box (5 cols) */}
                  <div className="md:col-span-5 p-4 rounded-lg bg-slate-900 border border-amber-500/40 text-slate-200">
                    <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                      TARGET MILESTONE: 2036
                    </div>
                    <div className="text-white font-bold text-sm mb-2">
                      Epigenetic Software Restore
                    </div>
                    <ul className="space-y-1 text-xs text-slate-400">
                      <li>• Nobel Prize-winning tech</li>
                      <li>• Cellular reprogramming (OSK)</li>
                      <li>• Systemic factory reset</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Subheading 1 */}
              <div className="pt-3">
                <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-400" />
                  <span>The Milestone: Software Reprogramming is on the Horizon</span>
                </h3>
                <p>
                  Breakthrough clinical trials (such as the ER-100 epigenetic reversal therapies currently reversing blindness and restoring tissue function in animal models) prove that Nobel Prize-winning geroscience is rapidly advancing. Within approximately <strong className="text-white font-semibold">10 years</strong>, safe, mainstream cellular reprogramming will allow us to reboot our cells back to their youthful factory settings without altering our genetic code.
                </p>
              </div>

              {/* Subheading 2 */}
              <div className="pt-2">
                <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-rose-400" />
                  <span>The Constraint: You Cannot Reboot a Destroyed Computer</span>
                </h3>
                <p>
                  This future software will be revolutionary—but it is subject to a non-negotiable physical bottleneck: <strong className="text-white font-semibold">you cannot run futuristic software on ruined computer hardware</strong>. If your vascular lining, insulin sensitivity, or mitochondrial centers suffer irreversible structural decay before these therapies arrive, you fall off the critical path.
                </p>
              </div>

              {/* Subheading 3 */}
              <div className="pt-2">
                <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-cyan-400" />
                  <span>The Solution: Today's Active Bridge</span>
                </h3>
                <p>
                  Our primary mission today is <strong className="text-white font-semibold">Active Hardware Preservation</strong>. We do not wait passively for the future. By maintaining high vascular compliance, stabilizing metabolic curves, and preserving mitochondrial density today, we keep our biological hardware pristine. This is your physical bridge, ensuring you survive to run tomorrow's geroscience software.
                </p>
              </div>

              {/* Clinical Analogy: The Compact Disc & Laser Epireader Metaphor */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-3">
                  <Disc size={15} />
                  <span>The Clinical Analogy: The Compact Disc & Optical Epireader</span>
                </div>

                <p className="mb-6">
                  Think of your DNA as a digital Compact Disc (CD) containing 3 billion pristine musical tracks. When you are born, the disc is mirror-clean: the optical laser (the epigenetic reader) reads the music with 100% acoustic fidelity. Over decades of unmanaged stress, glucose spikes, and poor sleep, microscopic "scratches" form on the surface. The songs on the disc never changed, but the laser skips and stutters—this is cellular aging.
                </p>

                {/* Embedded Live CD Laser Simulator Widget */}
                <div className="my-6">
                  <CDLaserIllustration />
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------------- */}
          {/* SECTION 3: From "Patient" to Partner */}
          {/* ----------------------------------------------------------------------- */}
          <section id="patient-to-partner" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                03
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                3. From "Patient" to Partner: The Educated and Empowered Model
              </h2>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 shadow-xl space-y-6 text-slate-300 leading-relaxed font-light text-base md:text-lg">
              <p>
                For over a century, traditional medicine has trapped us in a reactive "sick-care" framework. It acts as a crisis firefighter—brilliant at treating trauma and acute emergencies, but structurally unsuited for maintaining long-term vitality. It waits for physical symptoms to manifest, intervening only after irreversible subclinical erosion has occurred.
              </p>

              <p>
                Furthermore, traditional Fee-for-Service (FFS) healthcare economics reward the sheer volume of medical procedures, tests, and visits, incentivizing transactional, episodic care rather than long-term wellness.
              </p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-normal">
                True health optimization requires transitioning from <strong className="text-rose-400">reactive defense</strong> to <strong className="text-cyan-400">proactive design</strong>. We achieve this by shifting the dynamic from a patient being a passive recipient of care to an <strong className="text-white">active, highly informed partner</strong> in their health journey:
              </div>

              {/* 3 Core Empowered Partner Mandates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {/* Mandate 1 */}
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                      <TrendingUp size={16} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      Evidence-Based Autonomy
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Encouraging individuals to become active participants in their care is the scientifically proven key to optimizing long-term health outcomes and reducing lifetime medical burdens.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                    Self-Directed Sovereignty
                  </div>
                </div>

                {/* Mandate 2 */}
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                      <Activity size={16} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      Continuous Feedback vs. Static Snapshots
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Standard annual check-ups provide isolated, high-stress snapshots of your health. In contrast, we use non-invasive, passive telemetry to observe continuous physiological curves, allowing you to recognize your typical baselines and see exactly how daily choices impact your biomarkers in real-time.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                    Real-Time Biometrics
                  </div>
                </div>

                {/* Mandate 3 */}
                <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                      <Stethoscope size={16} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      The Physician-Co-Care Alliance
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Raw biometric data is not a clinical diagnosis. We explicitly mandate a collaborative partnership with your General Practitioner (GP). You print your continuous baselines, take them to your clinical consultation, and work with your physician to co-design your personalized medical roadmap.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
                    Mandatory GP Partnership
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------------- */}
          {/* SECTION 4: The Critical Path Toolkit */}
          {/* ----------------------------------------------------------------------- */}
          <section id="critical-toolkit" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                04
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                4. The Critical Path Toolkit: Integrating Practices & Vetted Accelerators
              </h2>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 shadow-xl space-y-6 text-slate-300 leading-relaxed font-light text-base md:text-lg">
              <p>
                Walking this critical path is not about buying shortcuts; it is an active awakening to daily human potential. True cellular optimization is achieved by pairing <strong className="text-emerald-400 font-semibold">high-impact, zero-cost daily habits</strong> with <strong className="text-cyan-300 font-semibold">highly compatible, non-invasive technology accelerators</strong> that measure your biological responses:
              </p>

              {/* 3 Domain Cards */}
              <div className="space-y-6 pt-2">
                
                {/* Domain I: Metabolic Stability */}
                <div className="rounded-2xl bg-[#0b101c] border border-cyan-500/30 p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                        I
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                        Metabolic Stability <span className="text-slate-400 font-normal text-sm font-sans">(Your Energy Fuel Gauge)</span>
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                      Glycemic Balance
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    {/* The Subclinical Shift */}
                    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-rose-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <Flame size={13} />
                        <span>The Subclinical Shift</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Glycemic volatility—constant spikes and crashes in blood sugar—exhausts cellular mitochondria, leading to insulin resistance, physical fatigue, and systemic tissue aging.
                      </p>
                    </div>

                    {/* The Free Primary Practice */}
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                      <div className="text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>The Free Primary Practice (Zero Cost)</span>
                      </div>
                      <p className="text-emerald-100 leading-relaxed">
                        Complete a low-intensity, 10-minute mobility walk immediately following your largest meal. This stimulates digestive circulation and recruits localized muscular glucose transport to naturally flatten your glycemic curves.
                      </p>
                    </div>

                    {/* The Optional Accelerator */}
                    <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                      <div className="text-cyan-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <Zap size={13} />
                        <span>The Optional Accelerator</span>
                      </div>
                      <p className="text-cyan-100 leading-relaxed">
                        Integrate Continuous Glucose Monitor (CGM) telemetry. This provides instant, real-time feedback on how specific foods and stressors impact your blood sugar, letting you design a personalized, spike-free nutritional framework.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Domain II: Nervous System Battery */}
                <div className="rounded-2xl bg-[#0b101c] border border-cyan-500/30 p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                        II
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                        Nervous System Battery <span className="text-slate-400 font-normal text-sm font-sans">(Your Stress & Sleep Recovery)</span>
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-amber-950/80 border border-amber-500/40 text-amber-300">
                      Autonomic Calibration
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    {/* The Subclinical Shift */}
                    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-rose-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <Flame size={13} />
                        <span>The Subclinical Shift</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Chronic, unmanaged stress overworks the sympathetic nervous system, degrading your heart rate variability (HRV), flooding tissues with cortisol, and hardening the vascular lining.
                      </p>
                    </div>

                    {/* The Free Primary Practice */}
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                      <div className="text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>The Free Primary Practice (Zero Cost)</span>
                      </div>
                      <p className="text-emerald-100 leading-relaxed">
                        Dedicate 10 minutes daily to slow, structured vagal breathing mindfulness or non-sleep deep rest (NSDR). This stimulates the vagus nerve, lowers systemic cortisol, and actively triggers a parasympathetic recovery state.
                      </p>
                    </div>

                    {/* The Optional Accelerator */}
                    <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30">
                      <div className="text-amber-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <BatteryCharging size={13} />
                        <span>The Optional Accelerator</span>
                      </div>
                      <p className="text-amber-100 leading-relaxed">
                        Track overnight sleeping HRV telemetry via multi-spectral optical biosensors (e.g., Apple Watch). This measures how deeply your nervous system recovers from daily stress while you sleep, letting you scientifically evaluate and refine your daily mindfulness practices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Domain III: Vascular Compliance */}
                <div className="rounded-2xl bg-[#0b101c] border border-cyan-500/30 p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-xs">
                        III
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                        Vascular Compliance <span className="text-slate-400 font-normal text-sm font-sans">(Your Vascular Flow Radar)</span>
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-950/80 border border-sky-500/40 text-sky-300">
                      Cardiovascular Flow
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    {/* The Subclinical Shift */}
                    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-rose-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <Flame size={13} />
                        <span>The Subclinical Shift</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        Silent arterial plaque accumulation builds in secret over decades. Waiting for physical symptoms is a critical risk, as standard cholesterol panels frequently miss early-stage warning signs of vascular compliance decay.
                      </p>
                    </div>

                    {/* The Free Primary Practice */}
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                      <div className="text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>The Free Primary Practice (Zero Cost)</span>
                      </div>
                      <p className="text-emerald-100 leading-relaxed">
                        Maintain optimal cellular hydration and adopt a low-glycemic, plant-forward diet rich in sirtuin-activating cofactors.
                      </p>
                    </div>

                    {/* The Optional Accelerator */}
                    <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30">
                      <div className="text-sky-400 font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                        <HeartPulse size={13} />
                        <span>The Optional Accelerator</span>
                      </div>
                      <p className="text-sky-100 leading-relaxed">
                        Monitor arterial compliance and trended blood pressure via a professional-grade, Wi-Fi-enabled blood pressure cuff. Additionally, track Apolipoprotein B (ApoB)—the true scientific marker of plaque-carrying particles—through private direct-to-consumer blood panels in partnership with your GP.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------------- */}
          {/* SECTION 5: The Inevitable Conclusion */}
          {/* ----------------------------------------------------------------------- */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                05
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                5. The Inevitable Conclusion
              </h2>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-amber-950/70 border border-cyan-500/40 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-6 text-slate-200 leading-relaxed font-light text-base md:text-lg">
              <p className="text-lg sm:text-xl font-medium text-white">
                We do not sell medical outcomes. We provide the deep education, scientific baselines, and structured templates required to put you back in the driver's seat of your own biology.
              </p>

              <div className="p-6 rounded-2xl bg-slate-950/80 border-l-4 border-amber-400 text-slate-100">
                When you understand the exact critical path of The Anti-Aging Health Revolution, you no longer need to be sold on products. The decision to adopt zero-cost daily habits, to measure your baselines privately, and to accelerate your progress using targeted, non-invasive tools becomes <strong className="text-cyan-300 font-bold">the only logical, self-directed conclusion</strong> to protect your cellular hardware today and secure your lifespan for the horizon of tomorrow.
              </div>

              {/* Action Buttons Hub */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsQuizModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 hover:from-cyan-300 hover:to-amber-300 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider text-center transition-all shadow-[0_0_25px_rgba(6,182,212,0.45)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sun size={16} />
                  <span>Take Free 5-Min Balance Scan</span>
                </button>

                <Link
                  to="/dual-track"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-mono text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Dual-Track Hub</span>
                  <ArrowRight size={14} className="text-cyan-400" />
                </Link>

                <Link
                  to="/hardware-store"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-amber-300 font-mono text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Biological Hardware Catalog</span>
                  <ChevronRight size={14} className="text-amber-400" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Peer Evidence Citation Modal */}
      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
      />

      {/* 5-Minute Friendly Wellness Scan Modal */}
      <FriendlyWellnessQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
}
