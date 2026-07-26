import React, { useEffect } from 'react';
import { ArrowLeft, Thermometer, Smile, Users, ExternalLink, Heart, Shield, Activity, ArrowRight, Zap, Target, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useT } from '../../translations';

export default function SocialRecovery() {
  const t = useT();
  const [activeProtocol, setActiveProtocol] = React.useState<'vagus' | 'deescalation' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('sr_title')} | 123TheNext Level`;
  }, [t]);

  const recoveryArsenal = [
    {
      name: "HigherDOSE Infrared Sauna Blanket",
      brand: "Cellular Recovery",
      desc: "Portable thermal architecture for shared HSP induction and metabolic detoxification.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400",
      asin: "B0CMP1X8PQ"
    },
    {
      name: "The Plunge: All-In",
      brand: "Vagus Tuning",
      desc: "High-fidelity cold immersion designed for community contrast therapy and neural resetting.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=401",
      asin: "B0D5N6X8Z2"
    },
    {
      name: "Therabody SmartGoggles",
      brand: "Neural Safety",
      desc: "Proprioceptive facial activation for rapid transition into the ventral vagal state.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=402",
      asin: "B0CMB6X8Y1"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30">
      {/* Header: Cinematic Tech Overlay */}
      <div className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-orange-600/10 blur-[120px] -mt-64"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,140,94,0.05)_0%,transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/social-fitness" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter transition-all mb-12 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Hub</span>
          </Link>
          
          <div className="flex flex-col items-start gap-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black text-[10px] uppercase tracking-widest"
            >
              <Shield size={14} /> Somatic Safety: Active Protocol
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-display font-black uppercase tracking-tight leading-[0.85] text-white"
            >
              Social<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Recovery</span>
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed border-l-4 border-orange-500 pl-8">
              {t('sr_intro')} We engineer environments that facilitate high-resolution social safety and somatic co-regulation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 pb-40">
        {/* Physiological Contrast Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none text-white">
                Co-Regulation<br />Architecture
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {t('sr_sauna_p')} In 2026, shared thermal and cryo rituals are not just recovery—they are social software updates that synchronize the autonomic nervous systems of the group.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div 
                onClick={() => setActiveProtocol('vagus')}
                className="bg-white/5 p-8 rounded-[3rem] border border-white/10 flex items-start gap-6 group hover:bg-orange-955/20 hover:border-orange-500/30 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-slate-950 transition-all duration-300">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-display font-black uppercase tracking-tight text-white mb-2 group-hover:text-orange-400 transition-colors">Vagus Synchronization</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-200 transition-colors">Shared physiological stress (heat/cold) induces deep trust through ventral vagal signaling.</p>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-orange-400 mt-3 inline-block">Open Guide →</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveProtocol('deescalation')}
                className="bg-white/5 p-8 rounded-[3rem] border border-white/10 flex items-start gap-6 group hover:bg-orange-955/20 hover:border-orange-500/30 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-slate-950 transition-all duration-300">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="font-display font-black uppercase tracking-tight text-white mb-2 group-hover:text-orange-400 transition-colors">Metabolic De-escalation</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-200 transition-colors">Lowering the collective basal heart rate through intentional shared silence and ritual.</p>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-orange-400 mt-3 inline-block">Open Guide →</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-500/10 rounded-[4rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200"
              alt="Social Recovery Architecture"
              className="relative rounded-[3rem] border border-white/5 shadow-3xl grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* The Recovery Arsenal: Product Grid */}
        <section className="pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">Somatic Tools</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
                The Suite
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recoveryArsenal.map((product, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-slate-900/50 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl flex flex-col h-full"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8] grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black uppercase text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.desc}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <a href={`https://amazon.com/dp/${product.asin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/btn">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover/btn:text-orange-400 transition-colors">Buy from Amazon</span>
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover/btn:bg-orange-500 group-hover/btn:text-white transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA: Navigation */}
        <section className="bg-gradient-to-tr from-orange-600/20 to-amber-600/5 rounded-[4rem] p-12 md:p-24 border border-white/5 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              Biological Integrity Realized
            </h2>
            <p className="text-xl text-slate-400 font-medium">
              Return to the social hub or explore the underlying biometric foundations of the Health Pillar.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/health/preventive" className="px-10 py-6 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-tight hover:bg-orange-500 hover:text-white transition-all shadow-xl">
              Biometric Foundation <ArrowRight className="inline ml-2" size={20} />
            </Link>
            <Link to="/social-fitness" className="px-10 py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-tight hover:bg-slate-800 transition-all border border-white/10">
              Return to Hub
            </Link>
          </div>
        </section>
      </div>

      {/* Protocol Details Modal */}
      <AnimatePresence>
        {activeProtocol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-955/90 backdrop-blur-md"
            onClick={() => setActiveProtocol(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-orange-500/30 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-orange-500/10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProtocol(null)}
                className="absolute top-8 right-8 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer focus:outline-none"
              >
                <X size={20} />
              </button>

              {activeProtocol === 'vagus' ? (
                <div>
                  <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-400 mb-8 border border-orange-500/20">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    Vagus Synchronization
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-8 block">
                    Ventral Vagal Tone & Shared Somatic Safety
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Inducing mild physiological stress in pairs/groups (contrast heat/cold therapy) triggers positive neural signaling, reinforcing a biological state of safety, trust, and shared resilience.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Thermal Contrast Cycles", desc: "Perform 15 minutes of infrared heat followed by a 3-minute cold plunge in sequence. Sharing this transition helps normalize cortisol spikes." },
                      { step: "02", title: "Autonomic Trust Building", desc: "Partner up for respiratory guidance, helping your teammate regulate their breathing rate during intense cold transitions." },
                      { step: "03", title: "Somatic Grounding Integration", desc: "Practice 5 minutes of direct barefoot earthing in union post-contrast to signal environmental safety to the nervous system." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
                        <div>
                          <h4 className="text-white font-bold uppercase text-sm mb-1">{step.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-400 mb-8 border border-orange-500/20">
                    <Activity size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-none">
                    Metabolic De-escalation
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-8 block">
                    Parasympathetic Transition & Heart Rate Suppression
                  </span>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    Lowering collective heart rates and metabolic demand through shared quiet rituals triggers immediate parasympathetic dominance, allowing efficient cellular repair and cognitive reset.
                  </p>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Cooperative Silent Space", desc: "Create a 10-minute screen-free silent environment for the group to sit or lie in, lowering visual-sensory stimulation." },
                      { step: "02", title: "Binaural Frequency Resonance", desc: "Utilize low-frequency (theta or delta) audio backgrounds during group recovery sessions to entrain brainwaves to a resting state." },
                      { step: "03", title: "Vagal Humming Audits", desc: "Engage in 2 minutes of low, humming vocalizations to stimulate the vagal branch that directly slows the cardiac pacemaker." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <span className="text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/25 px-2.5 py-1 rounded-md flex-shrink-0">{step.step}</span>
                        <div>
                          <h4 className="text-white font-bold uppercase text-sm mb-1">{step.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
