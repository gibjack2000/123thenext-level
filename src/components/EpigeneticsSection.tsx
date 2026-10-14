import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HeartPulse, Dumbbell, Apple, Heart, BookOpen, ArrowRight, Smartphone, Shield, X } from 'lucide-react';
import { useT } from '../translations';
import IntelligenceTeaser from './IntelligenceTeaser';
import FriendlyWellnessQuizModal from './FriendlyWellnessQuizModal';

export const EpigeneticsSection: React.FC = () => {
  const t = useT();

  // Canvas animation refs
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  const extendedHeroRef = useRef<HTMLDivElement>(null);
  const frameCount = 120;

  // Modal states
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalInitialState, setLeadModalInitialState] = useState<'ebook' | 'quiz'>('quiz');
  const [activePairingDevice, setActivePairingDevice] = useState<'apple_watch' | 'smart_scale' | 'cgm' | null>(null);
  const [pairedDevices, setPairedDevices] = useState<string[]>([]);

  useEffect(() => {
    // Preload sequence for extended hero canvas
    for (let i = 0; i < frameCount; i++) {
      const frameNum = i.toString().padStart(3, '0');
      const img = new Image();
      img.src = `/assets1/frame_${frameNum}_delay-0.066s.webp`;
      images2Ref.current.push(img);
    }

    const firstImg = images2Ref.current[0];
    if (firstImg) {
      const drawInitial = (canvas: HTMLCanvasElement | null, img: HTMLImageElement) => {
        if (canvas && canvas.getContext) {
          const ctx = canvas.getContext('2d');
          const dpr = window.devicePixelRatio || 1;
          const render = () => {
            canvas.width = img.width * dpr;
            canvas.height = img.height * dpr;
            ctx?.scale(dpr, dpr);
            ctx?.drawImage(img, 0, 0, img.width, img.height);
          };
          img.onload = render;
          if (img.complete) render();
        }
      };
      drawInitial(canvas2Ref.current, firstImg);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const container2 = extendedHeroRef.current;
        const canvas2 = canvas2Ref.current;
        if (container2 && canvas2) {
          const rect = container2.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          const elementHeight = rect.height;
          const windowHeight = window.innerHeight;

          const startScroll2 = elementTop - windowHeight;
          const endScroll2 = elementTop + elementHeight;

          let scrollFraction2 = 0;
          if (scrollTop > startScroll2) {
            scrollFraction2 = (scrollTop - startScroll2) / (endScroll2 - startScroll2);
          }
          scrollFraction2 = Math.max(0, Math.min(1, scrollFraction2));

          const frameIndex2 = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction2 * frameCount)
          );

          const ctx2 = canvas2.getContext('2d');
          const img2 = images2Ref.current[frameIndex2];
          if (img2 && img2.complete && img2.width > 0) {
            if (canvas2.width !== img2.width || canvas2.height !== img2.height) {
              canvas2.width = img2.width;
              canvas2.height = img2.height;
            }
            ctx2?.drawImage(img2, 0, 0);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative z-10 bg-slate-950 py-16 md:py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ========================================================================= */}
        {/* 1. The Epigenetic Future Glimpse Teaser (Horizontal Horizon Banner) */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#241708] via-[#101424] to-[#071f28] border border-amber-500/40 hover:border-amber-400/70 shadow-[0_0_40px_rgba(245,158,11,0.15)] text-left space-y-4 relative overflow-hidden group transition-all duration-300">
          {/* Celestial Golden Dawn & Cyber Reprogramming Glows */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.25),transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.22),transparent_60%)] pointer-events-none" />
          
          {/* Luminous Multi-Spectrum Horizon Top Beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-200 via-sky-300 to-cyan-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />

          <div className="relative z-10 space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>🔬 THE HORIZON</span>
            </div>
            
            <p className="text-white font-bold text-base sm:text-lg tracking-tight">
              Your cells have a reset button. Scientists just found it.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Nobel Prize-winning research (Yamanaka factors) can flip aging cells back to a younger state — like software rewinding to factory settings. It's already in human trials: Life Biosciences' ER-100 is testing this exact reset on damaged optic nerves right now.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 font-mono text-cyan-300 text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Realistic timeline to mainstream use: ~10 years.</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-200 font-medium text-xs sm:text-sm">
                But here's the catch: you can't reboot hardware that's already been destroyed.
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light pt-1">
              The software is coming. The question is whether your body will still be running when it arrives.
            </p>

            <div className="p-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-amber-950/50 border border-cyan-400/40 flex items-center justify-between shadow-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 font-extrabold font-mono text-xs sm:text-sm uppercase tracking-wide">
                Build the hardware today. Run tomorrow's software.
              </span>
              <span className="text-cyan-400 font-mono text-xs font-bold hidden sm:inline">
                100% Critical Path →
              </span>
            </div>
          </div>

          {/* Action Trigger Button & Callout */}
          <div className="pt-4 flex flex-col items-center gap-4 relative z-10">
            <p className="text-xs sm:text-sm md:text-base font-mono font-semibold text-amber-300 tracking-wide text-center">
              Don't wait for the inflated bill. Map your Critical Path today.
            </p>

            <Link
              to="/quiz"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.65)] flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles size={18} className="text-slate-950" />
              <span>Start Now →</span>
            </Link>

            <Link
              to="/science"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-all underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-300"
            >
              <span>Or, explore The Anti-Aging Health Revolution & Molecular Science →</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. Resources Showcase Section */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 block mb-3">Resource Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white mb-6">
              Your Complete Wellness Toolkit
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Access curated blueprints, protocols, and guides to support every pillar of your wellness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/premium-guides" className="resource-preview">
              <div className="resource-icon">📖</div>
              <div className="resource-content text-left">
                <h4>Premium Wellness Guides</h4>
                <p>Science-backed protocols for physical, mental, and spiritual wellness</p>
                <span className="resource-count">50+ comprehensive guides available</span>
              </div>
            </Link>

            <Link to="/store" className="resource-preview">
              <div className="resource-icon">🛍️</div>
              <div className="resource-content text-left">
                <h4>Curated Wellness Products</h4>
                <p>Expert-recommended tools, supplements, and resources for your journey</p>
                <span className="resource-count">100+ vetted products</span>
              </div>
            </Link>

            <Link to="/intelligence-hub" className="resource-preview">
              <div className="resource-icon">🎯</div>
              <div className="resource-content text-left">
                <h4>Expert Protocols</h4>
                <p>Guided pathways with step-by-step instructions for optimal results</p>
                <span className="resource-count">24 structured programs</span>
              </div>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. Extended Hero Text Block */}
        {/* ========================================================================= */}
        <div ref={extendedHeroRef} className="lg:w-11/12 xl:w-full mx-auto">
          <div className="p-8 md:p-12 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none rounded-[2rem] overflow-hidden">
              <canvas
                ref={canvas2Ref}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] -ml-32 -mb-32 transition-transform duration-1000 group-hover:scale-110"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-white mb-8 border-l-4 border-blue-500 pl-4">
                {t('hero_block_title')}
                <span className="text-blue-400">Take Your Quiz First</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-5 space-y-6">
                  <p className="text-xl text-slate-200 leading-relaxed font-medium">
                    {t('hero_block_p1')}
                    <span className="text-blue-400 font-bold block mt-2">
                      Start with our 5-minute wellness quiz - your personalized roadmap begins here.
                    </span>
                  </p>
                  <p className="text-emerald-400 leading-relaxed text-lg">
                    Discover exactly which wellness pillars need attention and get started with your focused action plan - no more guessing!
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="text-2xl font-display uppercase tracking-tight text-white mb-6 flex items-center">
                    <Sparkles className="text-blue-400 mr-3" size={24} />
                    What Your Quiz Reveals
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mr-4">
                        <Heart size={18} />
                      </span>
                      <div>
                        <strong className="text-white block mb-1 text-lg">Your Current State</strong>
                        <span className="text-emerald-400 text-sm leading-relaxed block">Your quiz reveals your strongest wellness pillars - start building on what you already do well.</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mr-4">
                        <Dumbbell size={18} />
                      </span>
                      <div>
                        <strong className="text-white block mb-1 text-lg">Your Personalized Action Plan</strong>
                        <span className="text-emerald-400 text-sm leading-relaxed block">Get 3 focused steps based on your quiz results - not generic advice.</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mr-4">
                        <Sparkles size={18} />
                      </span>
                      <div>
                        <strong className="text-white block mb-1 text-lg">Progress Tracking</strong>
                        <span className="text-emerald-400 text-sm leading-relaxed block">Watch your transformation from reactive to proactive wellness based on quiz insights.</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mr-4">
                        <BookOpen size={18} />
                      </span>
                      <div>
                        <strong className="text-white block mb-1 text-lg">Holistic Learning</strong>
                        <span className="text-emerald-400 text-sm leading-relaxed block">Your quiz paths you to specific resources and learning in your strongest areas.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-12 pt-8 border-t border-slate-700/50 text-center">
              <p className="text-xl text-slate-300 font-medium max-w-4xl mx-auto mb-2">
                The fastest way to wellness starts here: Take our quiz → Get your personalized assessment → Begin your transformation right now.
              </p>
              <span className="text-blue-400 font-bold block mt-4 text-2xl uppercase tracking-wider">Your wellness journey begins with one quiz.</span>
            </div>

            {/* 🎯 Enhanced Holistic CTA Section */}
            <div className="mt-12 holistic-cta-section-enhanced">
              <Link to="/quiz" className="holistic-cta-main">
                Begin Your Complete Holistic Journey
              </Link>
              <p className="cta-description">
                Start with our wellness quiz → Get personalized assessment → Access expert guides & products → Transform body and mind together
              </p>
              <div className="journey-preview">
                <Link to="/quiz" className="journey-step">🎯 Quiz → Results</Link>
                <span className="journey-arrow">→</span>
                <Link to="/premium-guides" className="journey-step">📚 Guides → Products</Link>
                <span className="journey-arrow">→</span>
                <Link to="/wellness" className="journey-step">⚖️ Balance → Wellness</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Curated essentials callout */}
        <div className="text-center max-w-4xl mx-auto px-4">
          <p className="text-amber-400 text-lg md:text-xl font-medium tracking-wide drop-shadow-sm">
            View our Curated essentials to power your wellness journey—keeping you informed, inspired, and equipped with handpicked tools and products that truly make a difference.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 4. Daily Intelligence & Research Feed */}
        {/* ========================================================================= */}
        <div id="blog" className="py-16 border-t border-slate-100/10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-white mb-6 leading-none">
              Daily Intelligence <br /><span className="text-blue-500">& Research Feed</span>
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Stay at the absolute frontier. Technical deep-dives and evidence-based optimization updates from the global health ecosystem.
            </p>
          </div>

          <div className="space-y-32">
            {/* Health Blog */}
            <div className="relative p-8 rounded-[2rem] shadow-xl shadow-rose-900/5 border border-rose-100/50 overflow-hidden group bg-gradient-to-br from-rose-50 via-white to-pink-50/50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/30 blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-125" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100/20 blur-[80px] rounded-full -ml-24 -mb-24 transition-transform duration-1000 group-hover:scale-110" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mr-3">
                      <HeartPulse className="text-rose-500" size={20} />
                    </div>
                    <Link to="/blog/category/health" className="hover:text-rose-600 transition-colors">Healthspan Intelligence</Link>
                  </h3>
                  <Link to="/blog/category/health" className="text-xs font-bold uppercase tracking-widest text-rose-600 hover:text-rose-700 transition-colors">View Research</Link>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-md">Precision focus on disease prevention and biological age reversal. Understanding the mechanisms of longevity.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Link to="/blog/the-science-of-sleep-how-to-build-a-better-bedtime-routine" className="sm:col-span-2 flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(244,63,94,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-40 sm:h-48 w-full overflow-hidden relative">
                      <img src="/sleeping-kitten.png" alt="Sleep" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-[10px] font-bold uppercase tracking-wider text-rose-600">Longevity</span>
                        <span className="text-[10px] text-slate-400 font-medium">8 min read</span>
                      </div>
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-3 text-xl leading-snug group-hover/card:text-rose-600 transition-colors">The Science of Sleep: How to Build a Better Bedtime Routine</h4>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">Discover the neurological impact of deep sleep and how to optimize your environment for recovery.</p>
                      <div className="mt-auto flex items-center text-sm font-bold text-rose-600">
                        Read full article <ArrowRight size={14} className="ml-2 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/understanding-immune-system" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(244,63,94,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=800" alt="Immune System" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-rose-600 transition-colors">Understanding Your Immune System</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-rose-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/5-daily-habits-that-support-vitality" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(244,63,94,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" alt="Daily Habits" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-rose-600 transition-colors">5 Daily Habits That Support Vitality</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-rose-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Fitness Blog */}
            <div className="relative p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-100/50 overflow-hidden group bg-gradient-to-br from-blue-50 via-white to-cyan-50/50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200/30 blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-125" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100/20 blur-[80px] rounded-full -ml-24 -mb-24 transition-transform duration-1000 group-hover:scale-110" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mr-3">
                      <Dumbbell className="text-blue-500" size={20} />
                    </div>
                    <Link to="/blog/category/fitness" className="hover:text-blue-600 transition-colors">Performance Protocols</Link>
                  </h3>
                  <Link to="/blog/category/fitness" className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">View Research</Link>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-md">Technical deep-dives into training mechanics and high-performance recovery. Optimizing the human machine.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Link to="/blog/beginners-guide-strength-training-home" className="sm:col-span-2 flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-40 sm:h-48 w-full overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" alt="Strength Training" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[10px] font-bold uppercase tracking-wider text-blue-600">Strength</span>
                        <span className="text-[10px] text-slate-400 font-medium">12 min read</span>
                      </div>
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-3 text-xl leading-snug group-hover/card:text-blue-600 transition-colors">A Beginner's Guide to Strength Training at Home</h4>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">No gym? No problem. Learn how to build muscle and strength using minimal equipment and bodyweight.</p>
                      <div className="mt-auto flex items-center text-sm font-bold text-blue-600">
                        Read full article <ArrowRight size={14} className="ml-2 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/improve-mobility-10-minutes" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Mobility" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-blue-600 transition-colors">Improve Your Mobility in 10 Minutes</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-blue-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/overcoming-workout-plateaus" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" alt="Workout Plateaus" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-blue-600 transition-colors">Overcoming Workout Plateaus</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-blue-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Nutrition Blog */}
            <div className="relative p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-emerald-100/50 overflow-hidden group bg-gradient-to-br from-emerald-50 via-white to-teal-50/50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/30 blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-125" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/20 blur-[80px] rounded-full -ml-24 -mb-24 transition-transform duration-1000 group-hover:scale-110" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mr-3">
                      <Apple className="text-emerald-500" size={20} />
                    </div>
                    <Link to="/blog/category/nutrition" className="hover:text-emerald-600 transition-colors">Metabolic Intelligence</Link>
                  </h3>
                  <Link to="/blog/category/nutrition" className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors">View Research</Link>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-md">Advanced metabolic nutrition strategy. From glucose regulation to intracellular energy production and meal-timing protocols.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Link to="/blog/mastering-meal-prep" className="sm:col-span-2 flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-40 sm:h-48 w-full overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800" alt="Meal Prep" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Meal Prep</span>
                        <span className="text-[10px] text-slate-400 font-medium">10 min read</span>
                      </div>
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-3 text-xl leading-snug group-hover/card:text-emerald-600 transition-colors">Mastering Meal Prep: A Step-by-Step Guide for Busy Weeks</h4>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">Save time and stay on track with our efficient system for prepping nutritious meals in under 2 hours.</p>
                      <div className="mt-auto flex items-center text-sm font-bold text-emerald-600">
                        Read full article <ArrowRight size={14} className="ml-2 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/understanding-macronutrients" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" alt="Macronutrients" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-emerald-600 transition-colors">Understanding Macronutrients</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-emerald-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/10-blood-sugar-friendly-snacks" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" alt="Healthy Snacks" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-emerald-600 transition-colors">10 Blood-Sugar-Friendly Snacks</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-emerald-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Wellness Blog */}
            <div className="relative p-8 rounded-[2rem] shadow-xl shadow-purple-900/5 border border-purple-100/50 overflow-hidden group bg-gradient-to-br from-purple-50 via-white to-fuchsia-50/50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-125" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-100/20 blur-[80px] rounded-full -ml-24 -mb-24 transition-transform duration-1000 group-hover:scale-110" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mr-3">
                      <Sparkles className="text-purple-500" size={20} />
                    </div>
                    <Link to="/blog/category/wellness" className="hover:text-purple-600 transition-colors">Neurowellness Research</Link>
                  </h3>
                  <Link to="/blog/category/wellness" className="text-xs font-bold uppercase tracking-widest text-purple-600 hover:text-purple-700 transition-colors">View Research</Link>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-md">The science of the internal state. Exploring nervous system regulation, cognitive restoration, and psychological safety.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Link to="/blog/practical-mindfulness" className="sm:col-span-2 flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(168,85,247,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-40 sm:h-48 w-full overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800" alt="Mindfulness" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[10px] font-bold uppercase tracking-wider text-purple-600">Mindset</span>
                        <span className="text-[10px] text-slate-400 font-medium">6 min read</span>
                      </div>
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-3 text-xl leading-snug group-hover/card:text-purple-600 transition-colors">Practical Mindfulness: Techniques for Busy Schedules</h4>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">Learn how to integrate micro-meditations and mindful presence into your daily workflow.</p>
                      <div className="mt-auto flex items-center text-sm font-bold text-purple-600">
                        Read full article <ArrowRight size={14} className="ml-2 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/how-to-set-boundaries" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(168,85,247,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800" alt="Boundaries" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-purple-600 transition-colors">How to Set Boundaries and Protect Energy</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-purple-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/blog/the-importance-of-rest" className="flex flex-col rounded-2xl bg-white/40 hover:bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(168,85,247,0.12)] hover:-translate-y-3 overflow-hidden group/card">
                    <div className="h-28 w-full overflow-hidden">
                      <img src="/sleeping-kitten.png" alt="Rest" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-display uppercase tracking-tight text-slate-900 mb-2 leading-tight group-hover/card:text-purple-600 transition-colors">The Importance of Rest: Doing Nothing</h4>
                      <div className="mt-auto flex items-center text-xs font-bold text-purple-600">
                        Explore <ArrowRight size={12} className="ml-1 transition-transform group-hover/card:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Teaser */}
        <div className="relative z-10 pt-8">
          <IntelligenceTeaser />
        </div>

      </div>

      {/* =========================================================================== */}
      {/* ENHANCED SECTION STYLES */}
      {/* =========================================================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        .holistic-benefits-section {
          margin: 40px 0;
          padding: 30px;
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .resources-showcase {
          margin: 40px 0;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .resource-preview {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 25px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          gap: 20px;
          align-items: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .resource-preview:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          border-color: rgba(255,215,0,0.3);
        }

        .resource-icon {
          font-size: 3rem;
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resource-content h4 {
          color: white;
          margin-bottom: 8px;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .resource-content p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 8px;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .resource-count {
          color: #ffd93d;
          font-size: 0.8rem;
          font-weight: 600;
          background: rgba(255,215,0,0.1);
          padding: 2px 8px;
          border-radius: 8px;
        }

        .holistic-cta-section-enhanced {
          margin: 40px 0;
          text-align: center;
        }

        .holistic-cta-main {
          display: inline-block;
          text-decoration: none;
          background: linear-gradient(135deg, #ffd93d, #ff6b6b, #4dabf7, #ae3ec9);
          color: #0d1b2a;
          border: none;
          padding: 25px 80px;
          font-size: 1.4rem;
          font-weight: 800;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 30px rgba(255,215,0,0.5);
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .holistic-cta-main:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255,215,0,0.7);
          letter-spacing: 2px;
          background: linear-gradient(135deg, #fff176, #ff5252, #45a5f7, #c855f0);
        }

        .cta-description {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 20px;
          line-height: 1.6;
        }

        .journey-preview {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .journey-step {
          display: inline-block;
          text-decoration: none;
          background: rgba(255,215,0,0.1);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,215,0,0.3);
          color: #ffd93d;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .journey-step:hover {
          background: rgba(255,215,0,0.2);
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }

        .journey-arrow {
          color: rgba(255,255,255,0.5);
          font-weight: bold;
          font-size: 1.2rem;
        }
      `}} />

      {/* Closed-Loop Onboarding & Quiz Modal */}
      <FriendlyWellnessQuizModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialState={leadModalInitialState}
      />

      {/* Device Connection Modal */}
      {activePairingDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-slate-700/60 rounded-3xl p-6 max-w-sm w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActivePairingDevice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 animate-bounce">
                <Smartphone size={24} />
              </div>
              <h4 className="text-lg font-display uppercase tracking-tight text-white">
                Authorize Connection
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Securely sync health telemetry with <strong>{
                  activePairingDevice === 'apple_watch' ? 'Apple Watch Series 10' :
                  activePairingDevice === 'smart_scale' ? 'Bluetooth Smart Scale' :
                  'Continuous Glucose Monitor'
                }</strong>.
              </p>
            </div>

            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-cyan-400" />
                <span className="font-semibold text-white">Clinical Data Privacy Protocols</span>
              </div>
              <p className="text-[10px] leading-relaxed font-light">
                Your biological datasets remain fully encrypted. Telemetry transmission complies strictly with HIPAA and GDPR security standard frameworks.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setActivePairingDevice(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors border border-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (activePairingDevice) {
                    setPairedDevices([...pairedDevices, activePairingDevice]);
                    setActivePairingDevice(null);
                  }
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border border-cyan-400/20 shadow-lg shadow-cyan-500/15 cursor-pointer"
              >
                Pair Device
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EpigeneticsSection;
