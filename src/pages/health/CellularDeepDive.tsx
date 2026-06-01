import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Dna, Microscope, Zap, Shield, Sparkles, CheckSquare, Square, Info, ExternalLink, RefreshCw, Flame, Moon, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAffiliateLinks } from '../../contexts/AffiliateLinksContext';

type TabId = 'autophagy' | 'nad' | 'senolytics' | 'mitochondria';

interface ConceptDetail {
  id: TabId;
  title: string;
  simpleName: string;
  icon: React.ReactNode;
  scientificSummary: string;
  simpleAnalogy: string;
  whyItMatters: string;
  howToActivate: string[];
  compounds: { name: string; desc: string; link: string }[];
}

export default function CellularDeepDive() {
  const [activeTab, setActiveTab] = useState<TabId>('autophagy');
  const [checkedHabits, setCheckedHabits] = useState<Record<string, boolean>>({});
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cellular Engineering Deep Dive | 123TheNext Level";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Deep dive into the science of Cellular Engineering, NAD+ activation, Autophagy, Senolytics, and Mitochondria in plain English.');
    }
  }, []);

  const concepts: Record<TabId, ConceptDetail> = {
    autophagy: {
      id: 'autophagy',
      title: 'Autophagy',
      simpleName: 'Your Cells\' Recycle System',
      icon: <RefreshCw size={28} className="text-indigo-400" />,
      scientificSummary: 'Autophagy is an evolutionarily conserved lysosomal degradation pathway responsible for clearing damaged organelles, misfolded proteins, and intracellular pathogens to maintain metabolic homeostasis.',
      simpleAnalogy: 'Think of autophagy as your body\'s internal recycling team. It finds old, broken cell parts, takes them apart, and uses the pieces to build fresh, strong, new cells. It keeps your cellular machinery clean and running efficiently.',
      whyItMatters: 'As we age, this recycling system slows down. Damaged cell parts build up like trash in a factory, leading to lower energy, brain fog, and faster overall aging.',
      howToActivate: [
        'Intermittent Fasting: Fasting for 16-18 hours signals your body to start consuming its own waste for energy.',
        'High-Intensity Workouts: Intense exercise stresses cells, triggering them to clean out old parts to recover faster.',
        'Spermidine Rich Foods: Add foods like green peas, mushrooms, aged cheese, or high-quality supplements to trigger cell renewal.'
      ],
      compounds: [
        { name: links.hp_spermidine?.name || 'Primeadine Spermidine', desc: links.hp_spermidine?.desc || 'Concentrated plant extract to trigger cellular recycling.', link: links.hp_spermidine?.url || 'https://www.amazon.com/dp/B08J5P8D9D' }
      ]
    },
    nad: {
      id: 'nad',
      title: 'NAD+ & Sirtuins',
      simpleName: 'The Cell Recharge Battery',
      icon: <Zap size={28} className="text-amber-400" />,
      scientificSummary: 'Nicotinamide Adenine Dinidualeotide (NAD+) is a coenzyme essential for cellular respiration, ATP production, and activating Sirtuins—enzymes that regulate DNA repair and cellular defense.',
      simpleAnalogy: 'If your cells are smartphones, NAD+ is the electricity in the battery. Without enough charge, your phone cannot run its apps. Sirtuins are the built-in antivirus software that repairs code, but they can only run when the battery has power.',
      whyItMatters: 'By the time we reach age 40, our natural NAD+ levels drop by half. This drain in cellular power causes sluggishness, slower recovery times, and less protection against DNA damage.',
      howToActivate: [
        'Cold Plunges & Hot Saunas: Extreme temperatures trigger stress responses that increase NAD+ production.',
        'Consistent Quality Sleep: NAD+ levels follow your natural sleep-wake cycle (circadian rhythm). Sleeping well keeps them elevated.',
        'NMN or NR Precursors: Vetted supplements that your body converts directly into active cellular electricity.'
      ],
      compounds: [
        { name: links.hp_nad_complete?.name || 'NAD+ Complete', desc: links.hp_nad_complete?.desc || 'Triple-action NMN & NR precursor stack for energy levels.', link: links.hp_nad_complete?.url || 'https://renuebyscience.com/' }
      ]
    },
    senolytics: {
      id: 'senolytics',
      title: 'Senolytics',
      simpleName: 'Clearing Zombie Cells',
      icon: <Shield size={28} className="text-emerald-400" />,
      scientificSummary: 'Senolytics are agents that selectively induce apoptosis (programmed cell death) in senescent cells—cells that have permanently ceased division but secrete harmful pro-inflammatory factors.',
      simpleAnalogy: 'Senescent cells are "zombie cells." They refuse to die, but they don\'t help the body either. Instead, they linger and release chemicals that inflame and damage surrounding healthy cells.',
      whyItMatters: 'The accumulation of zombie cells leads to persistent low-grade inflammation (often called "inflammaging"). Clearing them restores tissue health and allows healthy cells to thrive.',
      howToActivate: [
        'Polyphenol Foods: Eat foods rich in Quercetin and Fisetin, such as apples, onions, strawberries, and green tea.',
        'Exercise Consistency: Aerobic exercise helps your immune system identify and sweep away zombie cells.',
        'Targeted Senolytic Cycles: Using natural supplements on a periodic basis to "flush out" accumulated senescent cells.'
      ],
      compounds: [
        { name: links.hp_quercetin?.name || 'Liposomal Quercetin', desc: links.hp_quercetin?.desc || 'High-absorption senolytic to help sweep away zombie cells.', link: links.hp_quercetin?.url || 'https://www.amazon.com/dp/B07BFR4QC2' }
      ]
    },
    mitochondria: {
      id: 'mitochondria',
      title: 'Mitochondrial Health',
      simpleName: 'Your Cellular Powerplants',
      icon: <Flame size={28} className="text-rose-400" />,
      scientificSummary: 'Mitochondrial biogenesis is the growth and division of pre-existing mitochondria, driven by PGC-1α activation to maximize adenosine triphosphate (ATP) production capacity.',
      simpleAnalogy: 'Mitochondria are the actual engines inside your cells that turn food and oxygen into usable energy. Having more of these engines (and keeping them clean) gives you more endurance, focus, and vitality.',
      whyItMatters: 'Damaged or fewer mitochondria mean your cells starve for energy, which is why chronic fatigue, brain fog, and muscle weakness increase as mitochondrial function declines.',
      howToActivate: [
        'Zone 2 Cardio: Long, steady workouts (like jogging or brisk walking where you can still talk) stimulate the growth of new mitochondria.',
        'CoQ10 & L-Carnitine: Compounds that act like high-grade fuel, helping your mitochondria convert nutrients to energy efficiently.',
        'Cold Exposure: Short cold showers activate brown fat, which is packed with mitochondria, burning calories to generate heat.'
      ],
      compounds: [
        { name: links.hp_coq10?.name || 'CoQ10 / PQQ Ubiquinol', desc: links.hp_coq10?.desc || 'Promotes mitochondrial energy generation and cell health.', link: links.hp_coq10?.url || 'https://www.amazon.com/dp/B0019GW3Y8' }
      ]
    }
  };

  const glossaryItems = [
    { tech: 'Autophagy', route: 'autophagy', simple: 'Your cells\' automatic garbage cleanup and recycling system.' },
    { tech: 'NAD+', route: 'nad', simple: 'A natural molecule that acts like fuel to recharge cellular batteries.' },
    { tech: 'Sirtuins', route: 'sirtuins', simple: 'Helper proteins that act like an antivirus to repair DNA and protect cells.' },
    { tech: 'Senescent Cells', route: 'senescent', simple: '"Zombie cells" that stop working but don\'t die, causing inflammation.' },
    { tech: 'Mitochondria', route: 'mitochondria', simple: 'The powerhouses inside cells that turn food and air into energy.' },
    { tech: 'Biogenesis', route: 'biogenesis', simple: 'The process of growing new, healthy cellular components (like new powerplants).' }
  ];

  const handleToggleHabit = (habit: string) => {
    setCheckedHabits(prev => ({
      ...prev,
      [habit]: !prev[habit]
    }));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30">
      {/* Background Cinematic Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)", backgroundSize: "40px 40px" }}>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48">
        
        {/* Back Link */}
        <Link to="/health/cellular" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-16 transition-all group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="border-b border-white/10 group-hover:border-white">Back to Cellular Hub</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-24">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-display font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-2xl backdrop-blur-md">
            <Microscope size={14} className="mr-3 animate-pulse" />
            Plain-English Biology Lab
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-none">
            Cellular Engineering<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              Deep Dive
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
            Understanding cellular biology shouldn't require a medical degree. Below, we break down the four critical processes of aging into simple, everyday concepts, along with how to trigger them.
          </p>
        </div>

        {/* Concepts Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {(Object.keys(concepts) as TabId[]).map((key) => {
            const isSelected = activeTab === key;
            const item = concepts[key];
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-6 rounded-[2rem] border text-left transition-all relative overflow-hidden flex flex-col justify-between h-40 ${
                  isSelected 
                    ? 'bg-slate-900 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 text-white' 
                    : 'bg-slate-900/30 border-white/5 text-slate-400 hover:border-white/10 hover:bg-slate-900/50'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display font-black uppercase text-sm tracking-tight text-white leading-none mb-1">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium block truncate">
                    {item.simpleName}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Concept Details Card */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0f172a] border border-white/5 rounded-[3.5rem] p-8 md:p-16 shadow-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left side: Explanations */}
                <div className="lg:col-span-7 space-y-10">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 font-display block mb-3">
                      Pillar Profile
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-white leading-none mb-4">
                      {concepts[activeTab].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium font-display uppercase tracking-widest">
                      Also known as: <span className="text-slate-300">{concepts[activeTab].simpleName}</span>
                    </p>
                  </div>

                  {/* Plain English vs Scientific */}
                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 bg-slate-950/40 rounded-[2rem] border border-white/5 space-y-3">
                      <div className="flex items-center gap-3 text-indigo-400">
                        <Sparkles size={18} />
                        <h4 className="text-xs font-black uppercase tracking-widest font-display">In Plain English</h4>
                      </div>
                      <p className="text-slate-300 text-base leading-relaxed font-medium">
                        {concepts[activeTab].simpleAnalogy}
                      </p>
                    </div>

                    <div className="p-8 bg-slate-950/20 rounded-[2rem] border border-white/5 space-y-3">
                      <div className="flex items-center gap-3 text-slate-500">
                        <Info size={16} />
                        <h4 className="text-xs font-black uppercase tracking-widest font-display">The Technical Science</h4>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        {concepts[activeTab].scientificSummary}
                      </p>
                    </div>
                  </div>

                  {/* Why it Matters */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-display font-bold uppercase text-white tracking-tight">
                      Why It Matters for Aging
                    </h4>
                    <p className="text-slate-400 text-base leading-relaxed font-medium">
                      {concepts[activeTab].whyItMatters}
                    </p>
                  </div>
                </div>

                {/* Right side: Actions & Products */}
                <div className="lg:col-span-5 space-y-10">
                  {/* Daily Activators Checklist */}
                  <div className="p-8 bg-slate-950/50 rounded-[2.5rem] border border-white/5 space-y-8">
                    <h4 className="text-sm font-black uppercase tracking-widest text-white border-b border-white/5 pb-4 font-display">
                      Daily Activators
                    </h4>
                    <div className="space-y-6">
                      {concepts[activeTab].howToActivate.map((habit, idx) => {
                        const isChecked = !!checkedHabits[habit];
                        return (
                          <button
                            key={idx}
                            onClick={() => handleToggleHabit(habit)}
                            className="flex items-start text-left gap-4 group/habit w-full"
                          >
                            <div className="mt-0.5 text-indigo-400 group-hover/habit:scale-110 transition-transform flex-shrink-0">
                              {isChecked ? <CheckSquare size={20} className="text-indigo-400" /> : <Square size={20} className="text-slate-600" />}
                            </div>
                            <span className={`text-sm font-medium leading-relaxed ${isChecked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                              {habit}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compound Vetting */}
                  <div className="p-8 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/10 space-y-6">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 font-display mb-1">
                        Vetted Compound
                      </h4>
                      <p className="text-slate-500 text-xs font-medium">Recommended for biological optimization</p>
                    </div>
                    {concepts[activeTab].compounds.map((comp, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="p-5 bg-slate-950/60 rounded-2xl border border-white/5">
                          <h5 className="text-sm font-bold text-white mb-1">{comp.name}</h5>
                          <p className="text-xs text-slate-400 leading-normal">{comp.desc}</p>
                        </div>
                        <a
                          href={comp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all font-display"
                        >
                          Explore Pricing <ExternalLink size={12} className="ml-2" />
                        </a>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Translation Glossary Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs font-display">Science Glossary</span>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white leading-none">
                Cellular Translation Card
              </h2>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-indigo-500/20 pb-4 font-display">
              Complex Terminology Made Simple
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossaryItems.map((item, idx) => (
              <Link
                key={idx}
                to={`/health/cellular/glossary/${item.route}`}
                className="p-8 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-indigo-500/30 hover:bg-slate-900/60 transition-all flex flex-col justify-between gap-4 group cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Dna size={18} className="text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-base font-display font-black uppercase text-white tracking-wider group-hover:text-indigo-400 transition-colors">
                    {item.tech}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {item.simple}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Summary CTA Box */}
        <div className="bg-slate-900/30 p-10 md:p-16 rounded-[3rem] border border-white/5 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.05),transparent_40%)] pointer-events-none"></div>
          <div className="max-w-2xl mx-auto space-y-6">
            <Compass size={40} className="text-indigo-400 mx-auto animate-pulse" />
            <h3 className="text-2xl font-display font-black uppercase text-white">Ready to Put Science into Practice?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Now that you understand the molecular foundations of aging, take the next step by configuring your personal biomarker diagnostic panel to track your progress.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link to="/health/preventive" className="px-8 py-4 bg-indigo-600 hover:bg-white hover:text-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all font-display">
                Enter Diagnostic Archive
              </Link>
              <Link to="/health/systemic" className="px-8 py-4 border border-white/10 hover:border-white text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all font-display">
                Systemic Maintenance
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
