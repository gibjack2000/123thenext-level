import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe2, MapPin, ShoppingBag, ArrowRight, Heart, Dumbbell, Apple, Sparkles, BookOpen, Shield, UserCheck, Wind, HeartPulse, ExternalLink, Compass, Microscope, Users } from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { Product, mapToProduct, PremiumGuide } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';

const REGIONS = [
  { id: 'us', name: 'United States', currency: 'USD', flag: '🇺🇸', domain: 'amazon.com', image: 'https://flagcdn.com/w640/us.png' },
  { id: 'uk', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', domain: 'amazon.co.uk', image: 'https://flagcdn.com/w640/gb.png' },
  { id: 'es', name: 'Spain', currency: 'EUR', flag: '🇪🇸', domain: 'amazon.es', image: 'https://flagcdn.com/w640/es.png' },
];

import BlogSection from '../components/BlogSection';
import { useT } from '../translations';
import { motion } from 'motion/react';
import PillarCard from '../components/home/PillarCard';
import IntelligenceTeaser from '../components/IntelligenceTeaser';
import { guides as fallbackGuides } from '../data/guides';


export default function Home() {
  const t = useT();
  const [topPicks, setTopPicks] = useState<Product[]>([]);
  const [shuffledTopPicks, setShuffledTopPicks] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [guides, setGuides] = useState<PremiumGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showingMockData, setShowingMockData] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  const canvas3Ref = useRef<HTMLCanvasElement>(null);
  const images3Ref = useRef<HTMLImageElement[]>([]);
  const extendedHeroRef = useRef<HTMLDivElement>(null);
  const lifePracticeRef = useRef<HTMLDivElement>(null);

  const frameCount = 120;

  useEffect(() => {
    // Preload sequences
    for (let i = 0; i < frameCount; i++) {
      const frameNum = i.toString().padStart(3, '0');

      const img = new Image();
      img.src = `/assets1/frame_${frameNum}_delay-0.066s.webp`;
      imagesRef.current.push(img);

      const img2 = new Image();
      img2.src = `/assets1/frame_${frameNum}_delay-0.066s.webp`;
      images2Ref.current.push(img2);

      const img3 = new Image();
      img3.src = `/assets2/frame_${frameNum}_delay-0.066s.webp`;
      images3Ref.current.push(img3);
    }

    // Draw first frames
    const firstImg = imagesRef.current[0];
    const firstImg3 = images3Ref.current[0];

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

    drawInitial(canvasRef.current, firstImg);
    drawInitial(canvas2Ref.current, firstImg);
    drawInitial(canvas3Ref.current, firstImg3);
  }, []);

  const location = useLocation();
  useEffect(() => {
    // Scroll to hash on route change
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  // Existing effect for canvas animation
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        // Map 0 -> 1.5x viewport height to 0 -> 119 frames
        const maxScroll = window.innerHeight * 1.5;
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));

        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(scrollFraction * frameCount)
        );

        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const img = imagesRef.current[frameIndex];
          if (img && img.complete && img.width > 0) {
            if (canvas.width !== img.width || canvas.height !== img.height) {
              canvas.width = img.width;
              canvas.height = img.height;
            }
            ctx?.drawImage(img, 0, 0);
          }
        }

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
        // Life Practice Section Scrubbing
        const practiceContainer = lifePracticeRef.current;
        const canvas3 = canvas3Ref.current;
        if (practiceContainer && canvas3) {
          const rect = practiceContainer.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate progress: 0 when top enters, 1 when bottom leaves
          const totalDistance = rect.height + windowHeight;
          const currentPos = windowHeight - rect.top;
          let scrollFraction3 = currentPos / totalDistance;

          scrollFraction3 = Math.max(0, Math.min(1, scrollFraction3));

          const frameIndex3 = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction3 * frameCount)
          );

          const ctx3 = canvas3.getContext('2d');
          const img3 = images3Ref.current[frameIndex3];
          if (img3 && img3.complete && img3.width > 0) {
            const dpr = window.devicePixelRatio || 1;
            if (canvas3.width !== img3.width * dpr || canvas3.height !== img3.height * dpr) {
              canvas3.width = img3.width * dpr;
              canvas3.height = img3.height * dpr;
              ctx3?.scale(dpr, dpr);
            }
            ctx3?.drawImage(img3, 0, 0, img3.width, img3.height);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMockData = () => {
    const mockPicks = [...MOCK_PRODUCTS]
      .filter(p => p.featured)
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
    setTopPicks(mockPicks);

    const mockLatest = MOCK_PRODUCTS
      .sort((a, b) => new Date(b.last_checked_at).getTime() - new Date(a.last_checked_at).getTime())
      .slice(0, 8);
    setLatestProducts(mockLatest);

    setGuides(fallbackGuides);

    setShowingMockData(true);
    setLoading(false);
  };

  useEffect(() => {
    if (topPicks.length > 0) {
      // Shuffle the fetched pool (up to 50 items) and take 12 for the ticker
      const shuffled = [...topPicks]
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);
      setShuffledTopPicks(shuffled);
    }
  }, [topPicks]);

  useEffect(() => {
    async function fetchData() {
      if (!hasValidSupabaseConfig || !supabase) {
        loadMockData();
        return;
      }

      try {
        setLoading(true);

        // Fetch Top Picks
        const { data: topData, error: topError } = await supabase
          .from('amazon_affiliate_products')
          .select('*')
          .eq('is_active', true)
          .order('rating', { ascending: false })
          .limit(50);

        if (topError) throw topError;

        // Fetch Latest Products
        const { data: latestData, error: latestError } = await supabase
          .from('amazon_affiliate_products')
          .select('*')
          .order('last_updated', { ascending: false })
          .limit(8);

        if (latestError) throw latestError;

        // Fetch Guides
        const { data: guidesData, error: guidesError } = await supabase
          .from('premium_guides')
          .select('*')
          .order('created_at', { ascending: false });

        if (guidesError && guidesError.code !== '42P01') throw guidesError;

        if (topData || latestData) {
          setTopPicks(topData ? topData.map(mapToProduct) : []);
          setLatestProducts(latestData ? latestData.map(mapToProduct) : []);
          setGuides(guidesData && guidesData.length > 0 ? guidesData : fallbackGuides);
          setShowingMockData(false);
        }
      } catch (err) {
        console.error('Error fetching data from Supabase, falling back to mock data:', err);
        loadMockData();
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Add real-time subscription for Home page
    if (hasValidSupabaseConfig && supabase) {
      const channel = supabase
        .channel('home_updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'amazon_affiliate_products' },
          () => {
            fetchData();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[90dvh] flex items-center">
        {/* Animated Background Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/80 md:to-transparent"></div>
        </div>

        {/* Background glow and grids */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Content */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase border border-blue-500/20">
                <Sparkles size={14} className="mr-2" />
                {t('hero_badge')}
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-[1.05]">
                {t('hero_title1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{t('hero_title2')}</span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg text-slate-400 leading-relaxed max-w-[45ch]">
                {t('hero_subtitle')}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/health-quiz" className="inline-flex justify-center items-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all active:scale-[0.98] shadow-lg shadow-blue-900/30 border border-blue-500/20 whitespace-nowrap">
                  Take Wellness Quiz
                  <ArrowRight size={14} className="ml-2" />
                </Link>
                <a href="#pillars" className="inline-flex justify-center items-center px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors border border-white/15 whitespace-nowrap">
                  Explore Pillars
                  <ArrowRight size={14} className="ml-2" />
                </a>
              </div>

              {/* Quiz Urgency Metrics */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span><strong>142</strong> assessments completed this week</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span><strong>5-minute</strong> diagnostic blueprint</span>
                </div>
              </div>
            </div>

            {/* Right side: Video Player */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-xl lg:max-w-none relative">
                {/* Glowing backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-3xl blur-[32px] opacity-10 pointer-events-none"></div>
                
                {/* Video Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                  <video
                    className="w-full object-cover aspect-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src="https://res.cloudinary.com/dbhpaqnq8/video/upload/v1782468396/Add_meditation_image_1080p_202606261104_yofrsn.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

          </div>

          {/* 🌱 Holistic Benefits Section */}
          <div className="mt-24 pt-16 border-t border-white/5">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 block mb-3">Holistic Paradigm</span>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white mb-6">
                Why Choose a Holistic Approach?
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Build resilience before problems arise. We integrate science-backed protocols with proven wellness practices to transform reactive care into sustainable vitality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="benefit-card">
                <div className="benefit-icon">🧠</div>
                <h4 className="text-lg font-bold text-white mb-2">Mind-Body Connection</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Your wellness journey connects mental clarity with physical vitality, creating true balance.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h4 className="text-lg font-bold text-white mb-2">Proactive Prevention</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Build resilience before problems arise. Transform reactive care into sustainable wellness.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚖️</div>
                <h4 className="text-lg font-bold text-white mb-2">Comprehensive Support</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Science-backed protocols integrated with proven wellness practices for optimal results.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📈</div>
                <h4 className="text-lg font-bold text-white mb-2">Measurable Progress</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Track your transformation from reactive patterns to proactive wellness habits.</p>
              </div>
            </div>
          </div>

          {/* 📚 Resources Showcase Section */}
          <div className="mt-24 pt-16 border-t border-white/5">
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

              <a href="#shop" className="resource-preview">
                <div className="resource-icon">🛍️</div>
                <div className="resource-content text-left">
                  <h4>Curated Wellness Products</h4>
                  <p>Expert-recommended tools, supplements, and resources for your journey</p>
                  <span className="resource-count">100+ vetted products</span>
                </div>
              </a>

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

          {/* New Extended Hero Text Block */}
          <div ref={extendedHeroRef} className="mt-20 md:mt-28 lg:w-11/12 xl:w-full mx-auto">
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
                <Link to="/health-quiz" className="holistic-cta-main">
                  Begin Your Complete Holistic Journey
                </Link>
                <p className="cta-description">
                  Start with our wellness quiz → Get personalized assessment → Access expert guides & products → Transform body and mind together
                </p>
                <div className="journey-preview">
                  <Link to="/health-quiz" className="journey-step">🎯 Quiz → Results</Link>
                  <span className="journey-arrow">→</span>
                  <Link to="/premium-guides" className="journey-step">📚 Guides → Products</Link>
                  <span className="journey-arrow">→</span>
                  <Link to="/wellness" className="journey-step">⚖️ Balance → Wellness</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 mb-[-1rem] text-center max-w-4xl mx-auto px-4">
            <p className="text-amber-400 text-lg md:text-xl font-medium tracking-wide drop-shadow-sm">
              View our Curated essentials to power your wellness journey—keeping you informed, inspired, and equipped with handpicked tools and products that truly make a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Main Sections (The Four Pillars) */}
      <div id="pillars" className="relative pt-32 pb-48 bg-slate-950 overflow-hidden">
        {/* Modern Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000')] bg-fixed bg-center bg-cover brightness-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/40 to-slate-950" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[150px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-rose-600/10 blur-[150px] -ml-32 -mb-32" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-24"
          >
            <h2 id="six-core-optimization" className="text-5xl md:text-7xl font-display uppercase tracking-[0.02em] text-white mb-6 leading-[1.15]">
              The Six Core <br /><span className="text-blue-500">Optimization Protocols</span>
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Every breakthrough starts with a single step. Access the high-resolution blueprints for your biological future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                to: "/health",
                image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200",
                icon: HeartPulse,
                iconColor: "text-rose-400",
                title: "Healthspan & Longevity",
                bullets: ["Cellular Age Optimization", "Autophagy Induction", "NAD+ Modulation", "Systems Maintenance"],
                description: "Master the science of cellular health and aging. Transition from reactive repair to proactive optimization using the 2026 Longevity Standards.",
                hoverBorderColor: "hover:border-rose-500/50",
                hoverShadowColor: "hover:shadow-rose-500/20"
              },
              {
                to: "/fitness",
                image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1200",
                icon: Dumbbell,
                iconColor: "text-blue-400",
                title: "Performance & Bio-Data",
                bullets: ["VO2 Max Optimization", "Real-time HRV Tracking", "Biomechanical Precision", "Longevity Strength"],
                description: "Optimize human potential through data-driven training. Transition from general fitness to precision performance and recovery.",
                hoverBorderColor: "hover:border-blue-500/50",
                hoverShadowColor: "hover:shadow-blue-500/20"
              },
              {
                to: "/nutrition",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
                icon: Apple,
                iconColor: "text-emerald-400",
                title: "Metabolic Nutrition",
                bullets: ["Glycemic Index Mastering", "Microbiome Diversification", "Mitochondrial Fueling", "Personalized Protocols"],
                description: "Fuel your biological machinery with metabolic precision. Transition from generic dieting to optimized glycemic control and chronic disease prevention.",
                hoverBorderColor: "hover:border-emerald-500/50",
                hoverShadowColor: "hover:shadow-emerald-500/20"
              },
              {
                to: "/neurowellness",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
                icon: Sparkles,
                iconColor: "text-purple-400",
                title: "Autonomic Engineering",
                bullets: ["Vagal Tone Optimization", "Circadian Precision", "NSDR Neuro-Reset", "Neural State Regulation"],
                description: "Master the biological rhythms that dictate cognitive and physical performance. High-precision neuro-recovery for systemic resilience.",
                hoverBorderColor: "hover:border-purple-500/50",
                hoverShadowColor: "hover:shadow-purple-500/20"
              },
              {
                to: "/womens-health",
                image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1200",
                icon: Microscope,
                iconColor: "text-rose-400",
                title: "Women's Health",
                bullets: ["Ovary-Span Optimization", "Strength over Thinness", "Hormonal Bio-Data", "Cognitive Longevity"],
                description: "Clinical precision for the female athlete. Transition from generic wellness to biology-specific high performance.",
                hoverBorderColor: "hover:border-rose-500/50",
                hoverShadowColor: "hover:shadow-rose-500/20"
              },
              {
                to: "/social-fitness",
                image: "/social-fitness-bg.png",
                icon: Users,
                iconColor: "text-orange-400",
                title: "Socio-Biological Architecture",
                bullets: ["Neural Coupling Dynamics", "Oxytocin Engineering", "Pickleball Ecosystems", "Micro-Community Vitals"],
                description: "The clinical impact of collective connection. Re-architecting social interaction as a primary driver of human longevity.",
                hoverBorderColor: "hover:border-orange-500/50",
                hoverShadowColor: "hover:shadow-orange-500/20"
              }
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: idx * 0.1, 
                  duration: 0.8, 
                  ease: [0.21, 0.45, 0.32, 0.9] 
                }}
              >
                <PillarCard {...pillar} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium Guides Teaser Section */}
        <div className="relative pt-24 pb-20 bg-slate-950 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-500/20">
                <Shield size={14} className="mr-2" />
                Premium Resources
              </div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-white mb-4">
                Digital <span className="text-blue-500">Master Guides</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                Downloadable, science-backed protocols for fitness, nutrition, and wellness. Instant PDF delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guides.filter(g => g.featured).slice(0, 3).map(guide => (
                <Link 
                  key={guide.id}
                  to="/premium-guides"
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-colors flex flex-col cursor-pointer shadow-xl hover:shadow-blue-900/20"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700">
                        {guide.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">{guide.title}</h3>
                    <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed flex-1">
                      {(guide as any).shortDescription || guide.short_description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-auto">
                      <span className="text-xl font-black text-white">{(guide as any).priceDisplay || guide.price_display}</span>
                      <span className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link 
                to="/premium-guides" 
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors border border-slate-700 hover:border-slate-600"
              >
                View All Premium Guides <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Life Practice Section */}
        <div id="life-practice" ref={lifePracticeRef} className="relative h-[250vh] scroll-mt-20 bg-slate-900 overflow-visible">
          <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
            {/* Background Canvas Layer */}
            <div className="absolute inset-0">
              <canvas
                ref={canvas3Ref}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/40"></div>
              {/* Bottom transition blend */}
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
          </div>

          <div className="relative z-10 -mt-[100vh] min-h-screen flex items-center pointer-events-none sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 pointer-events-auto relative">
              {/* Floating Free Guidance Badge */}
              <div className="absolute top-24 right-4 sm:right-8 lg:right-12 z-20 hidden md:block">
                <a 
                  href="https://www.buddhadailywisdom.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:border-amber-500/50 hover:bg-slate-900/60">
                    {/* Animated Gradient Background */}
                    <div className="absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                    
                    <div className="relative z-10 flex flex-col items-end text-right">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="h-px w-8 bg-amber-500/50 transition-all duration-500 group-hover:w-12"></span>
                        <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase">
                          Free Guidance
                        </h3>
                      </div>
                      <p className="text-xl lg:text-2xl font-serif italic text-white/90 leading-tight">
                        The path to inner peace
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-500/80 uppercase tracking-widest opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        Explore Wisdom
                        <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-500/20 to-transparent opacity-50"></div>
                  </div>
                </a>
              </div>

              <div className="max-w-3xl">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-bold tracking-wider uppercase mb-8 border border-amber-500/20 shadow-sm backdrop-blur-md">
                  <Sparkles size={16} className="mr-2" />
                  {t('lp_badge')}
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-display uppercase tracking-tight text-white mb-8 leading-[0.95]">
                  {t('lp_title1')} <br />
                  <span className="text-amber-500">{t('lp_title2')}</span>
                </h2>
                <p className="text-xl text-slate-200 leading-relaxed mb-12 max-w-xl font-medium drop-shadow-md">
                  {t('lp_subtitle')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <Link to="/life-practice/universal-love" className="relative p-6 rounded-3xl overflow-hidden group border border-white/10 transition-all hover:border-amber-500/50 shadow-xl overflow-hidden h-40">
                    <div className="absolute inset-0">
                      <img src="/assets2/foundations/universal_love.png" alt="Universal Love" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center mr-3 backdrop-blur-md border border-white/10">
                          <Heart size={18} />
                        </div>
                        <h4 className="font-bold text-white text-lg">{t('lp_universal_love')}</h4>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed line-clamp-2 max-w-[240px]">{t('lp_universal_love_desc')}</p>
                      <div className="mt-auto text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center">
                        {t('lp_explore')} <ArrowRight size={12} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/life-practice/do-no-harm" className="relative p-6 rounded-3xl overflow-hidden group border border-white/10 transition-all hover:border-amber-500/50 shadow-xl overflow-hidden h-40">
                    <div className="absolute inset-0">
                      <img src="/assets2/foundations/do_no_harm.png" alt="Do No Harm" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center mr-3 backdrop-blur-md border border-white/10">
                          <Shield size={18} />
                        </div>
                        <h4 className="font-bold text-white text-lg">{t('lp_do_no_harm')}</h4>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed line-clamp-2 max-w-[240px]">{t('lp_do_no_harm_desc')}</p>
                      <div className="mt-auto text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center">
                        {t('lp_explore')} <ArrowRight size={12} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/life-practice/good-moral-person" className="relative p-6 rounded-3xl overflow-hidden group border border-white/10 transition-all hover:border-amber-500/50 shadow-xl overflow-hidden h-40">
                    <div className="absolute inset-0">
                      <img src="/assets2/foundations/moral_integrity.png" alt="Moral Integrity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center mr-3 backdrop-blur-md border border-white/10">
                          <UserCheck size={18} />
                        </div>
                        <h4 className="font-bold text-white text-lg">{t('lp_moral_person')}</h4>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed line-clamp-2 max-w-[240px]">{t('lp_moral_person_desc')}</p>
                      <div className="mt-auto text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center">
                        {t('lp_explore')} <ArrowRight size={12} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/life-practice/breathing-mindfulness" className="relative p-6 rounded-3xl overflow-hidden group border border-white/10 transition-all hover:border-amber-500/50 shadow-xl overflow-hidden h-40">
                    <div className="absolute inset-0">
                      <img src="/assets2/foundations/breathing_mindfulness.png" alt="Breathing Mindfulness" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center mr-3 backdrop-blur-md border border-white/10">
                          <Wind size={18} />
                        </div>
                        <h4 className="font-bold text-white text-lg">{t('lp_breathing')}</h4>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed line-clamp-2 max-w-[240px]">{t('lp_breathing_desc')}</p>
                      <div className="mt-auto text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center">
                        {t('lp_explore')} <ArrowRight size={12} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/life-practice/loving-kindness" className="relative p-6 rounded-3xl overflow-hidden group border border-white/10 transition-all hover:border-amber-500/50 shadow-xl h-40">
                    <div className="absolute inset-0">
                      <img src="/assets2/foundations/loving_kindness.png" alt="Loving-kindness" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center mr-3 backdrop-blur-md border border-white/10">
                          <HeartPulse size={18} />
                        </div>
                        <h4 className="font-bold text-white text-lg">{t('lp_loving_kindness')}</h4>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed line-clamp-1 max-w-xl">{t('lp_loving_kindness_desc')}</p>
                      <div className="mt-auto text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center">
                        {t('lp_explore')} <ArrowRight size={12} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/life-practice/beginners-guide" className="relative p-6 rounded-3xl overflow-hidden group border border-white/10 transition-all hover:border-amber-500/50 shadow-xl h-40">
                    <div className="absolute inset-0">
                      <img src="/assets2/foundations/beginners_guide.png" alt="Beginners Guide" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center mr-3 backdrop-blur-md border border-white/10">
                          <Compass size={18} />
                        </div>
                        <h4 className="font-bold text-white text-lg">{t('lp_beginners_guide')}</h4>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed line-clamp-2 max-w-[240px]">{t('lp_beginners_guide_desc')}</p>
                      <div className="mt-auto text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center">
                        {t('lp_explore')} <ArrowRight size={12} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* New "Journey with David" CTA Banner */}
                <div className="relative rounded-3xl overflow-hidden group shadow-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm mb-12">
                  <div className="md:flex items-center">
                    <div className="md:w-1/2 relative h-64 md:h-[400px]">
                      <img 
                        src="/assets2/foundations/journey_with_david.jpg" 
                        alt="Start your journey with David" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-transparent"></div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 relative text-left">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Sparkles size={120} className="text-amber-500 rotate-12" />
                      </div>
                      <div className="relative z-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] uppercase font-bold tracking-widest mb-6 border border-amber-500/20">
                          {t('lp_cta_badge')}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {t('lp_cta_title')} <span className="text-amber-500">{t('lp_cta_name')}</span>
                        </h3>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                          {t('lp_cta_desc')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <a 
                            href="https://www.buddhadailywisdom.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0"
                          >
                            {t('lp_cta_btn')} <ExternalLink size={18} className="ml-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/wellness" className="inline-flex items-center px-10 py-5 bg-amber-600 text-white rounded-full font-bold text-lg hover:bg-amber-500 transition-all hover:scale-105 shadow-2xl shadow-amber-900/20">
                  Explore The Practice
                  <ArrowRight size={20} className="ml-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Intelligence & Research Feed */}
        <div id="blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-slate-100/10 bg-slate-50/50">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter text-slate-900 mb-6 leading-none">
              Daily Intelligence <br /><span className="text-blue-600">& Research Feed</span>
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
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

      <div className="relative z-10">
        <IntelligenceTeaser />
      </div>

      {/* Affiliates Hub */}
        <div id="shop" className="relative pt-16 pb-24 bg-fixed bg-center bg-cover scroll-mt-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2000')" }}>
          <div className="absolute inset-0 bg-slate-900/90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <div className="p-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl backdrop-blur-sm">
                  <ShoppingBag size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">Shop the Tools We Trust</h2>
              </div>
              
              <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-8">
                We curate helpful products that support the six pillars of health, fitness, metabolic nutrition, neurowellness, women's health, and social fitness. Our recommendations are chosen for usefulness, not hype.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    <span className="text-amber-400 mr-2">●</span>
                    Hand-picked gear, kitchen tools, and wellness gadgets chosen for quality and performance.
                  </p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    <span className="text-amber-400 mr-2">●</span>
                    Organized by region (US, UK, Spain) and category for an easy, customized shopping experience.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  Transparency: Links may be affiliate links. We only recommend products we truly believe in.
                </p>
              </div>
            </div>

            {/* Region Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {REGIONS.map((region) => (
                <Link
                  key={region.id}
                  to={`/${region.id}`}
                  className="relative rounded-3xl p-8 shadow-sm border border-slate-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out group overflow-hidden min-h-[240px] flex flex-col justify-end"
                >
                  <div className="absolute inset-0">
                    <img src={region.image} alt={region.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20 group-hover:via-slate-900/60 transition-colors duration-500"></div>
                  </div>
                  <div className="relative z-10">
                    <motion.div
                      className="text-4xl mb-2 origin-bottom-left w-fit animate-flag-wave"
                      style={{ display: 'inline-block' }}
                    >
                      {region.flag}
                    </motion.div>
                    <h3 className="text-2xl font-display uppercase tracking-tight text-white mb-1">{region.name}</h3>
                    <div className="flex items-center text-slate-300 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{region.domain}</span>
                    </div>
                    <div className="flex items-center text-amber-400 font-medium group-hover:text-amber-300">
                      Browse Categories <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Top Picks Section - Random Ticker Tape */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display uppercase tracking-tight text-white flex items-center">
                Global Top Picks
              </h3>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : shuffledTopPicks.length > 0 ? (
              <div className="relative w-full overflow-hidden py-10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-20 bg-slate-900/30 backdrop-blur-sm border-y border-slate-800/50">
                <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-6">
                  {/* Duplicate the items to create the seamless loop */}
                  {[...shuffledTopPicks, ...shuffledTopPicks, ...shuffledTopPicks].map((product, idx) => (
                    <div 
                      key={`${product.id}-${idx}`} 
                      className="inline-block w-[320px] bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out flex-shrink-0 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 py-1">
                            <img 
                              src={REGIONS.find(r => r.id === (product.region || '').toLowerCase())?.image} 
                              alt={product.region} 
                              className="w-5 h-3.5 object-cover rounded shadow-sm border border-slate-100" 
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">
                              {product.region}
                            </span>
                          </div>
                          {showingMockData && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase whitespace-nowrap">
                              Demo
                            </span>
                          )}
                        </div>
                        <span className="text-amber-500 text-sm font-bold flex items-center whitespace-nowrap">
                          ★ {product.rating}
                        </span>
                      </div>
                      <div className="aspect-square w-full bg-slate-50 rounded-xl mb-4 overflow-hidden p-3 flex items-center justify-center">
                        {product.image_url && (
                          <img src={product.image_url} alt={product.product_name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                        )}
                      </div>
                      <h3 className="text-md font-bold text-slate-900 mb-2 truncate whitespace-normal line-clamp-2 h-10 leading-tight">
                        {product.product_name}
                      </h3>
                      <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                        <span className="font-black text-[8px] text-blue-600 tracking-wider uppercase border border-blue-500/20 px-2 py-1 rounded-md bg-blue-500/5 whitespace-nowrap">
                          CHECK THE LATEST DEAL
                        </span>
                        <a 
                          href={product.amazon_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors whitespace-nowrap"
                        >
                          View Deal
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center mb-20">
                <p className="text-slate-500 mb-6">No top picks found in your database yet.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/admin" className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Add Your First Product
                  </Link>
                  <button
                    onClick={loadMockData}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                  >
                    View Demo Products
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* =========================================================================== */}
      {/* ENHANCED HERO SECTION STYLES - Added for holistic benefits and resources */}
      {/* =========================================================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        .holistic-benefits-section {
          margin: 40px 0;
          padding: 30px;
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          animation: fadeInUp 0.8s ease-out;
        }

        .benefit-card {
          background: rgba(255,255,255,0.08);
          padding: 25px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }

        .benefit-card:hover {
          transform: translateY(-5px) scale(1.02);
          background: rgba(255,255,255,0.12);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
          border-color: rgba(255,215,0,0.5);
        }

        .benefit-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
          display: block;
          animation: pulse 2s infinite;
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
          animation: glow 3s infinite;
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
          animation: fadeIn 1s ease-out;
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

        .holistic-cta-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.8s;
        }

        .holistic-cta-main:hover::before {
          left: 100%;
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

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255,215,0,0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255,215,0,0.6);
          }
        }
      `}} />
    </div>
  );
}
