import React, { useEffect } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Sun, ThermometerSnowflake, Moon, Eye, ExternalLink, Brain, Waves, RefreshCw, Zap, Activity, Shield, Wind, Microscope, Heart, UserCheck, HeartPulse, Compass, Play, Pause, Headphones, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useT } from '../translations';
import BlogSection from '../components/BlogSection';
import IntelligenceTeaser from '../components/IntelligenceTeaser';
import { useAffiliateLinks } from '../contexts/AffiliateLinksContext';

export default function WellnessPillar() {
  const t = useT();
  const { links } = useAffiliateLinks();

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.8);
  const [isMuted, setIsMuted] = React.useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const vol = parseFloat(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
    if (vol > 0) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    document.title = `${t('wp_title_start')} ${t('wp_title_end')} | 123TheNext Level`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('wp_description'));
    }
  }, [t]);

  const affiliateLinks = {
    oura: links.well_oura?.url || 'https://amazon.com/dp/B0D4N3L9XW',
    apollo: links.well_apollo?.url || 'https://amazon.com/dp/B0CXM1X8PQ',
    eightsleep: links.well_eightsleep?.url || 'https://www.eightsleep.com/',
    nootropics: links.well_nootropics?.url || 'https://amazon.com/dp/B00V4L7J5E'
  };

  const pillarEssentials = [
    {
      name: "HRV & Sleep Guardian",
      brand: links.well_oura?.brand || "Oura Ring Gen5",
      desc: links.well_oura?.desc || "Clinical-grade tracking of autonomic nervous system balance and recovery readiness.",
      image: links.well_oura?.image || "/Products/oura.jpg",
      link: affiliateLinks.oura
    },
    {
      name: "ANS Regulator",
      brand: links.well_apollo?.brand || "Apollo Neuro",
      desc: links.well_apollo?.desc || "Wearable tech that uses touch therapy to stabilize vagal tone and reduce stress-induced cortisol.",
      image: links.well_apollo?.image || "/Products/apollo.jpg",
      link: affiliateLinks.apollo
    },
    {
      name: "Clinical Thermoregulation",
      brand: links.well_eightsleep?.brand || "Eight Sleep Pod 4",
      desc: "Active cooling/heating mattress cover dynamically altering temperature based on biometrics.",
      image: links.well_eightsleep?.image || "/Products/eightsleep.jpg",
      link: affiliateLinks.eightsleep
    },
    {
      name: "Neuro-Chemical Catalyst",
      brand: links.well_nootropics?.brand || "Qualia Mind / Nootropics",
      desc: "High-fidelity cognitive enhancer targeting acetylcholine pathways and BDNF synthesis.",
      image: links.well_nootropics?.image || "/Products/nootropics.jpg",
      link: affiliateLinks.nootropics
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
      {/* Hero Section */}
      <div className="relative pt-32 pb-48 md:pt-48 md:pb-72 flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000"
            alt="Bio-Harmonization and Neuro-Recovery"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        
        {/* High-Fidelity Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-blue-950/20"></div>
        
        {/* Animated Recovery Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 60, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-[45rem] h-[45rem] bg-indigo-600 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -60, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-[35rem] h-[35rem] bg-blue-500 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Technical Data Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)", backgroundSize: "52px 52px" }}>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/#pillars" className="absolute -top-32 left-4 sm:left-6 lg:left-8 inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">{t('wp_back')}</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-12 shadow-2xl backdrop-blur-md"
            >
              <Activity size={14} className="mr-3 animate-pulse" />
              Autonomic State: Parasympathetic
            </motion.div>
            
            <h1 className="text-6xl md:text-[clamp(4.5rem,8vw,11rem)] font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t('wp_title_start')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600">
                {t('wp_title_end')}
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-indigo-500/50 pl-8 text-left"
            >
              {t('wp_description')} In 2026, wellness is **autonomic engineering**. We optimize for vagal tone, circadian precision, and hormone-stabilizing recovery.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 pb-32">
        <audio
          ref={audioRef}
          src="/assets/audio/universal-love-overview.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />

        {/* Custom Audio Player Card (Protocol 04 Alignment) */}
        <div className="max-w-3xl mx-auto mb-20 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-8 md:p-12 rounded-[2.5rem] border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 group overflow-hidden"
          >
            {/* Visual glow overlay */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15)_0%,transparent_50%)]" />
            
            <div className="relative z-10">
              {/* Header: Label + Icon */}
              <div className="flex items-center justify-between mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-display font-black text-[10px] uppercase tracking-[0.2em] border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Audio Overview • 8 Mins
                </div>
                <div className="text-cyan-500/60 group-hover:text-cyan-400 transition-colors duration-300">
                  <Headphones size={20} className={isPlaying ? "animate-bounce" : ""} />
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-white mb-6 leading-tight">
                Protocol 04 • Universal Love as a Biological Input
              </h2>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                Your daily life practice is the physical vehicle for neural state regulation. Cultivating Universal Love (developing compassion for all living beings, recognizing our shared journey) and Loving-kindness (Metta, cultivating a heart free of ill-will) are no longer just philosophical or spiritual concepts—they are active, zero-cost biophysical inputs.
                <br /><br />
                In this comprehensive audio discussion, our hosts unpack the hard neuroscience behind these practices. Learn how daily intentional choices directly down-regulate sympathetic alert states, manage chronic cortisol, stimulate vagal tone, and optimize Heart Rate Variability (HRV) to protect your long-term cellular healthspan.
              </p>

              {/* Player Controls Grid */}
              <div className="flex flex-col md:flex-row items-center gap-6 pt-6 border-t border-white/5">
                {/* Play/Pause & Reset */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center hover:bg-cyan-400 active:scale-95 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] group/play focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={24} className="fill-slate-950 text-slate-950" /> : <Play size={24} className="fill-slate-950 text-slate-950 ml-1" />}
                  </button>
                  <button
                    onClick={() => {
                      if (!audioRef.current) return;
                      audioRef.current.currentTime = 0;
                      setCurrentTime(0);
                    }}
                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/30 cursor-pointer"
                    title="Restart Audio"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>

                {/* Seek Bar and Timers */}
                <div className="flex-grow w-full flex items-center gap-4">
                  <span className="text-[10px] font-mono text-slate-500 select-none">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex-grow relative group/seek">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/50 bg-slate-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_8px_#06b6d4] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125"
                      style={{
                        background: `linear-gradient(to right, #06b6d4 ${progressPercent}%, #1e293b ${progressPercent}%)`
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 select-none">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Volume Controls */}
                <div className="flex items-center gap-2 min-w-[120px] max-md:w-full max-md:justify-center">
                  <button
                    onClick={toggleMute}
                    className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 rounded-full appearance-none cursor-pointer outline-none transition-all bg-slate-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125"
                    style={{
                      background: `linear-gradient(to right, #06b6d4 ${(isMuted ? 0 : volume) * 100}%, #1e293b ${(isMuted ? 0 : volume) * 100}%)`
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hub Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          <motion.div 
            whileHover={{ y: -10 }}
            className="relative bg-slate-900/40 backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] border border-white/5 flex flex-col justify-between lg:col-span-2 group overflow-hidden shadow-2xl transition-all duration-700 hover:border-indigo-500/30"
          >
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.15)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-indigo-400 mb-10 border border-white/10 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl">
                <Brain size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white mb-8 leading-[0.85]">
                {t('wp_circadian_title')}
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-10 font-medium max-w-2xl group-hover:text-slate-200 transition-colors">
                {t('wp_circadian_desc')}
              </p>
              <div className="p-10 bg-white/5 rounded-[3rem] border border-white/5 mb-10 backdrop-blur-xl group-hover:border-indigo-500/20 transition-colors">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4 flex items-center gap-3">
                   <Moon size={16} className="animate-pulse" /> Circadian Entrainment
                 </h4>
                 <p className="text-base text-slate-500 leading-relaxed font-medium group-hover:text-slate-400 transition-colors">Precision light hygiene and temperature cycles are leveraged to synchronize the master clock, ensuring optimal melatonin/cortisol flux.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-indigo-400 font-black text-[11px] uppercase tracking-[0.3em] border-t border-white/5 pt-10 group-hover:text-white transition-colors">
              <Zap size={18} className="animate-pulse" />
              The Recovery Operating System
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="relative bg-slate-900/40 backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] border border-white/5 flex flex-col justify-between group overflow-hidden shadow-2xl transition-all duration-700 hover:border-blue-500/30"
          >
            {/* Abstract Tech Grid */}
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-blue-400 mb-10 border border-white/10 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-xl">
                <ThermometerSnowflake size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white mb-8 leading-none">
                {t('wp_hormetic_title')}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium group-hover:text-slate-200 transition-colors">
                {t('wp_hormetic_desc')}
              </p>
              <div className="space-y-6 pt-10 border-t border-white/5 mt-auto">
                {[
                  { label: "Deep Sleep Efficiency", value: "92%" },
                  { label: "HRV Variability", value: "High" },
                  { label: "Cortisol Suppression", value: "Optimal" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/60">{stat.label}</span>
                    <span className="text-sm font-black text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-blue-400 font-black text-[11px] uppercase tracking-[0.3em] pt-10 relative z-10 group-hover:text-white transition-colors">
              <Activity size={18} className="animate-pulse" />
              Clinical Bio-Resilience
            </div>
          </motion.div>
        </div>

        {/* Deep Recovery Section */}
        <section className="mb-40">
          <div className="bg-[#0f172a] p-10 md:p-24 rounded-[4rem] md:rounded-[5rem] border border-white/5 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              <div className="lg:col-span-12 mb-16 text-center">
                <div className="inline-flex items-center gap-4 text-indigo-400 font-black uppercase tracking-widest text-[10px] bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-500/20 mb-8">
                  <Shield size={14} />
                  Vagal Tone Optimization
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
                  {t('wp_recovery_title')}
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium max-w-4xl mx-auto">
                  {t('wp_recovery_desc')} A comprehensive protocol for neutralizing the modern stress response.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                      <Waves size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white mb-4">{t('wp_nature_title')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('wp_nature_desc')}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white/5 rounded-[3rem] border border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                      <Wind size={24} />
                    </div>
                    <h4 className="text-xl font-display font-bold uppercase text-white mb-4">NSDR Protocols</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Non-Sleep Deep Rest techniques to down-regulate the nervous system in under 20 minutes.</p>
                  </motion.div>
                </div>

                <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <Microscope size={24} className="text-indigo-400" />
                    <h4 className="text-xl font-display font-bold uppercase text-white">Clinical Recovery Tools</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-500 mb-2 block tracking-widest">Thermoregulation</span>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Using cold/heat cycles to trigger HSP (Heat Shock Proteins) and improve sleep depth.</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-500 mb-2 block tracking-widest">Neural Decompression</span>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Sound-frequency and vibration therapy to induce alpha-state brain waves.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-slate-950 p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles size={120} className="text-indigo-400" />
                  </div>
                  <div className="relative z-10 space-y-10">
                    <h3 className="text-2xl font-display font-black uppercase text-indigo-400">Tactical Hub</h3>
                    
                    <div className="space-y-6">
                      {[
                        { key: 'wp_cta_sauna_us', link: affiliateLinks.oura, label: 'Sleep & HRV' },
                        { key: 'wp_cta_sauna_uk', link: affiliateLinks.apollo, label: 'ANS Balance' },
                        { key: 'wp_cta_sauna_es', link: affiliateLinks.eightsleep, label: 'Thermal recovery' },
                        { key: 'wp_cta_nootropics', link: affiliateLinks.nootropics, label: 'Neuro-Stack' }
                      ].map((cta, i) => (
                        <a key={i} href={cta.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white hover:text-slate-950 transition-all group/cta">
                          <span className="flex items-center gap-4">
                            <span className="w-32 text-center text-[9px] font-black bg-white/10 px-2 py-0.5 rounded group-hover/cta:bg-slate-200 uppercase">{cta.label}</span>
                            <span className="text-xs font-black uppercase tracking-tight leading-none">{t(cta.key as any)}</span>
                          </span>
                          <ExternalLink size={16} className="opacity-40 group-hover/cta:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cultivate Your Life Practice Section */}
        <section className="mb-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs">
                {t('lp_badge')}
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-[0.9]">
                {t('lp_title1')}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600">
                  {t('lp_title2')}
                </span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed font-medium">
              {t('lp_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Link to="/life-practice/universal-love" className="relative p-8 rounded-[2.5rem] overflow-hidden group border border-white/5 transition-all hover:border-indigo-500/50 shadow-xl h-48 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img src="/assets2/foundations/universal_love.png" alt="Universal Love" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors duration-500"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-indigo-400 flex items-center justify-center mr-4 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Heart size={20} />
                  </div>
                  <h4 className="font-display font-bold uppercase text-white text-lg">{t('lp_universal_love')}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 max-w-[280px] my-3">{t('lp_universal_love_desc')}</p>
                <div className="text-indigo-450 text-[10px] font-black uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Protocol <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>

            <Link to="/life-practice/do-no-harm" className="relative p-8 rounded-[2.5rem] overflow-hidden group border border-white/5 transition-all hover:border-indigo-500/50 shadow-xl h-48 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img src="/assets2/foundations/do_no_harm.png" alt="Do No Harm" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-955/70 group-hover:bg-slate-955/60 transition-colors duration-500"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-indigo-400 flex items-center justify-center mr-4 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Shield size={20} />
                  </div>
                  <h4 className="font-display font-bold uppercase text-white text-lg">{t('lp_do_no_harm')}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 max-w-[280px] my-3">{t('lp_do_no_harm_desc')}</p>
                <div className="text-indigo-450 text-[10px] font-black uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Protocol <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>

            <Link to="/life-practice/good-moral-person" className="relative p-8 rounded-[2.5rem] overflow-hidden group border border-white/5 transition-all hover:border-indigo-500/50 shadow-xl h-48 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img src="/assets2/foundations/moral_integrity.png" alt="Moral Integrity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-955/60 transition-colors duration-500"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-indigo-400 flex items-center justify-center mr-4 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <UserCheck size={20} />
                  </div>
                  <h4 className="font-display font-bold uppercase text-white text-lg">{t('lp_moral_person')}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 max-w-[280px] my-3">{t('lp_moral_person_desc')}</p>
                <div className="text-indigo-450 text-[10px] font-black uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Protocol <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>

            <Link to="/life-practice/breathing-mindfulness" className="relative p-8 rounded-[2.5rem] overflow-hidden group border border-white/5 transition-all hover:border-indigo-500/50 shadow-xl h-48 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img src="/assets2/foundations/breathing_mindfulness.png" alt="Breathing Mindfulness" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors duration-500"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-indigo-400 flex items-center justify-center mr-4 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Wind size={20} />
                  </div>
                  <h4 className="font-display font-bold uppercase text-white text-lg">{t('lp_breathing')}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 max-w-[280px] my-3">{t('lp_breathing_desc')}</p>
                <div className="text-indigo-450 text-[10px] font-black uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Protocol <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>

            <Link to="/life-practice/loving-kindness" className="relative p-8 rounded-[2.5rem] overflow-hidden group border border-white/5 transition-all hover:border-indigo-500/50 shadow-xl h-48 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img src="/assets2/foundations/loving_kindness.png" alt="Loving-kindness" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-955/70 group-hover:bg-slate-955/60 transition-colors duration-500"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-indigo-400 flex items-center justify-center mr-4 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <HeartPulse size={20} />
                  </div>
                  <h4 className="font-display font-bold uppercase text-white text-lg">{t('lp_loving_kindness')}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 max-w-[280px] my-3">{t('lp_loving_kindness_desc')}</p>
                <div className="text-indigo-450 text-[10px] font-black uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Protocol <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>

            <Link to="/life-practice/beginners-guide" className="relative p-8 rounded-[2.5rem] overflow-hidden group border border-white/5 transition-all hover:border-indigo-500/50 shadow-xl h-48 flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img src="/assets2/foundations/beginners_guide.png" alt="Beginners Guide" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors duration-500"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-indigo-400 flex items-center justify-center mr-4 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Compass size={20} />
                  </div>
                  <h4 className="font-display font-bold uppercase text-white text-lg">{t('lp_beginners_guide')}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 max-w-[280px] my-3">{t('lp_beginners_guide_desc')}</p>
                <div className="text-indigo-450 text-[10px] font-black uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Protocol <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Journey with David Banner */}
          <div className="relative rounded-[3rem] overflow-hidden group shadow-3xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
            <div className="md:flex items-center">
              <div className="md:w-1/2 relative h-72 md:h-[400px]">
                <img 
                  src="/assets2/foundations/journey_with_david.jpg" 
                  alt="Start your journey with David" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/20 to-transparent"></div>
              </div>
              <div className="md:w-1/2 p-12 md:p-16 relative text-left">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles size={120} className="text-indigo-400 rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] uppercase font-bold tracking-widest mb-6 border border-indigo-500/20">
                    {t('lp_cta_badge')}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white mb-6 leading-tight">
                    {t('lp_cta_title')} <span className="text-indigo-400">{t('lp_cta_name')}</span>
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-md">
                    {t('lp_cta_desc')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="https://www.buddhadailywisdom.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 text-sm uppercase tracking-wider"
                    >
                      {t('lp_cta_btn')} <ExternalLink size={18} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IntelligenceTeaser />

        {/* Pillar Essentials Grid */}
        <section className="mb-40 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
            <div className="space-y-4">
              <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs">Recovery Arsenal</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                Pillar Essentials
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs border-b border-indigo-500/20 pb-4">
              Vetted 2026 Wellness Tier-1 Tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillarEssentials.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5 gap-2">
                    <span className="font-black text-[8px] text-blue-400 tracking-wider uppercase border border-blue-500/30 px-2 py-1.5 rounded-lg bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] whitespace-nowrap">
                      CHECK THE LATEST DEAL
                    </span>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-400 font-black text-[9px] uppercase tracking-widest hover:text-white transition-colors whitespace-nowrap">
                      Buy from Amazon <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed */}
        <div className="space-y-48">
          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('wp_top_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="wellness" limit={3} featured={true} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-10 mb-20 px-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
                {t('wp_latest_posts')}
              </h2>
              <div className="h-px bg-white/10 flex-grow mt-2"></div>
            </div>
            <BlogSection category="wellness" limit={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
