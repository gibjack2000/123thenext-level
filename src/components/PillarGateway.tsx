import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Dumbbell, Apple, Sparkles, Microscope, Users, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import PillarCard from './home/PillarCard';
import HomeTripleGateway from './home/HomeTripleGateway';
import { guides as fallbackGuides } from '../data/guides';
import { PremiumGuide } from '../types';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';

export const PillarGateway: React.FC = () => {
  const [guides, setGuides] = useState<any[]>(fallbackGuides);

  useEffect(() => {
    async function fetchGuides() {
      if (!hasValidSupabaseConfig || !supabase) return;
      try {
        const { data: guidesData, error: guidesError } = await supabase
          .from('premium_guides')
          .select('*')
          .order('created_at', { ascending: false });

        if (!guidesError && guidesData && guidesData.length > 0) {
          setGuides(guidesData);
        }
      } catch (err) {
        console.error('Error fetching guides in PillarGateway:', err);
      }
    }
    fetchGuides();
  }, []);

  const pillars = [
    {
      to: "/health",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200",
      icon: HeartPulse,
      iconColor: "text-rose-400",
      title: "Healthspan & Longevity",
      bullets: ["Cellular Age Optimization", "Autophagy Induction", "NAD+ Modulation", "Systems Maintenance"],
      description: "Master the science of cellular health and aging. Transition from reactive repair to proactive optimization using the 2026 Longevity Standards.",
      hoverBorderColor: "hover:border-rose-500/50",
      hoverShadowColor: "hover:shadow-rose-500/20",
      subLink: {
        text: "Discover the Anti-Aging Health Revolution & Molecular Science →",
        to: "/science"
      }
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
  ];

  return (
    <div id="pillars" className="relative pt-32 pb-32 bg-slate-950 overflow-hidden border-t border-cyan-500/10">
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
          {pillars.map((pillar, idx) => {
            if (pillar.title === "Autonomic Engineering") {
              return (
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
                  <Link
                    to="/neurowellness"
                    className="relative p-10 pb-12 rounded-3xl shadow-xl border border-slate-700/50 overflow-hidden group flex flex-col h-full transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] hover:border-cyan-500/50 hover:shadow-cyan-500/20 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75 contrast-[1.1]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-slate-900/80 group-hover:via-slate-900/30 transition-all duration-500"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full w-full">
                      <div className="w-14 h-14 bg-white/10 text-cyan-400 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <Sparkles size={28} />
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-[0.9] group-hover:text-cyan-400 transition-colors duration-300">
                        Wellness & Autonomic Engineering
                      </h3>
                      
                      <p className="text-slate-300 mb-8 leading-relaxed font-medium text-lg lg:pr-4">
                        Daily behavioral and mental choices are direct physiological inputs. Optimize your nervous system to lower chronic cortisol, rebuild autonomic resilience, and maximize Heart Rate Variability (HRV).
                      </p>
                      
                      {/* Two-Column Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
                        {/* Column A: Clinical Neuro-Metrics */}
                        <div className="space-y-4">
                          <h4 className="text-cyan-400 font-display font-bold uppercase tracking-wider text-xs border-b border-white/10 pb-2">
                            Clinical Neuro-Metrics
                          </h4>
                          <ul className="space-y-3 text-slate-100 font-bold text-sm tracking-wide">
                            {["Vagal Tone Optimization", "Circadian Sleep Precision", "NSDR Neuro-Resets"].map((item, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Column B: Daily Life Practices */}
                        <div className="space-y-4">
                          <h4 className="text-cyan-400 font-display font-bold uppercase tracking-wider text-xs border-b border-white/10 pb-2">
                            Daily Life Practices
                          </h4>
                          <ul className="space-y-3 text-slate-100 font-bold text-sm tracking-wide">
                            {["Breathing Mindfulness", "Universal Metta Love", "Precept-Based Harmlessness"].map((item, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-auto text-white font-black uppercase tracking-widest text-xs flex items-center group-hover:translate-x-2 transition-transform duration-300 underline-offset-8 decoration-2 hover:underline">
                        Explore Protocols <ArrowRight size={16} className="ml-2 text-cyan-500" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            }
            return (
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
            );
          })}
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

          {/* Split-Column Triple-Gateway Lead Capture, Quiz & Express Shop Suite */}
          <div className="pt-16 pb-4">
            <HomeTripleGateway />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillarGateway;
