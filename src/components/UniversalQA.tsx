import React, { useState, useMemo } from 'react';
import { Search, HelpCircle, ArrowRight, ExternalLink, Zap, Shield, Heart, Activity, Users, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useT } from '../translations';

interface Question {
  id: string;
  category: 'how' | 'why' | 'what' | 'vs' | 'human';
  questionKey: string;
  answerKey: string;
  icon: React.ReactNode;
  tags: string[];
  links?: {
    label: string;
    url: string;
  }[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Intelligence' },
  { id: 'how', label: 'The "How"' },
  { id: 'why', label: 'The "Why"' },
  { id: 'what', label: 'The "What"' },
  { id: 'vs', label: 'The "Vs"' },
  { id: 'human', label: 'Human Safety' }
];

export default function UniversalQA() {
  const t = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const questions: Question[] = useMemo(() => [
    // How
    {
      id: 'bio-age',
      category: 'how',
      questionKey: 'uqa_q_bio_age',
      answerKey: 'uqa_a_bio_age',
      icon: <Activity className="text-blue-500" />,
      tags: ['DNA Methylation', 'SystemAge', 'Longevity'],
      links: [{ label: 'View SystemAge Kits', url: 'https://amazon.com/dp/B0CXM1X8PQ' }]
    },
    {
      id: 'nervous-system',
      category: 'how',
      questionKey: 'uqa_q_nervous_system',
      answerKey: 'uqa_a_nervous_system',
      icon: <Zap className="text-amber-500" />,
      tags: ['VNS', 'Polyvagal', 'Homeostasis'],
      links: [{ label: 'Vagus Nerve Stimulators', url: 'https://amazon.com/dp/B0CXM1X8PQ' }]
    },
    {
      id: 'glp1',
      category: 'how',
      questionKey: 'uqa_q_glp1',
      answerKey: 'uqa_a_glp1',
      icon: <Activity className="text-emerald-500" />,
      tags: ['GLP-1', 'Muscle Care', 'Metabolic'],
      links: [{ label: 'Muscle Protection Stack', url: 'https://amazon.com/dp/B0CXM1X8PQ' }]
    },
    {
      id: 'vo2max',
      category: 'how',
      questionKey: 'uqa_q_vo2max',
      answerKey: 'uqa_a_vo2max',
      icon: <Zap className="text-red-500" />,
      tags: ['VO2 Max', 'Zone 2', 'Functional Age'],
      links: [{ label: 'Explore VO2 Trackers', url: 'https://amazon.com/dp/B0CXM1X8PQ' }]
    },
    {
      id: 'pickleball',
      category: 'how',
      questionKey: 'uqa_q_pickleball',
      answerKey: 'uqa_a_pickleball',
      icon: <Users className="text-orange-500" />,
      tags: ['Social Fitness', 'Community', 'Pickleball'],
      links: [{ label: 'Find a Lifestyle Club', url: '/region-hub' }]
    },
    
    // Why
    {
      id: 'muscle-metabolic',
      category: 'why',
      questionKey: 'uqa_q_muscle_metabolic',
      answerKey: 'uqa_a_muscle_metabolic',
      icon: <Activity className="text-indigo-500" />,
      tags: ['Myokines', 'Insulin', 'Metabolism']
    },
    {
      id: 'terminology',
      category: 'why',
      questionKey: 'uqa_q_terminology',
      answerKey: 'uqa_a_terminology',
      icon: <Shield className="text-purple-500" />,
      tags: ['Skin Longevity', 'Functional Aging']
    },
    {
      id: 'gut-brain',
      category: 'why',
      questionKey: 'uqa_q_gut_brain',
      answerKey: 'uqa_a_gut_brain',
      icon: <Activity className="text-green-500" />,
      tags: ['Gut-Brain Axis', 'Neuro-Metabolism']
    },

    // What
    {
      id: 'peptides',
      category: 'what',
      questionKey: 'uqa_q_peptides',
      answerKey: 'uqa_a_peptides',
      icon: <Zap className="text-blue-400" />,
      tags: ['BPC-157', 'Recovery', 'Peptides']
    },
    {
      id: 'systemage',
      category: 'what',
      questionKey: 'uqa_q_systemage',
      answerKey: 'uqa_a_systemage',
      icon: <Info className="text-slate-500" />,
      tags: ['Diagnostics', 'Organ Health', 'Precision']
    },
    {
      id: 'rings',
      category: 'what',
      questionKey: 'uqa_q_rings',
      answerKey: 'uqa_a_rings',
      icon: <Activity className="text-pink-500" />,
      tags: ['Oura 4', 'WHOOP 5.0', 'Biometrics'],
      links: [{ label: 'Compare 2026 Wearables', url: 'https://amazon.com/dp/B0CXM1X8PQ' }]
    },

    // Vs
    {
      id: 'wearables-vs',
      category: 'vs',
      questionKey: 'uqa_q_wearables_vs',
      answerKey: 'uqa_a_wearables_vs',
      icon: <HelpCircle className="text-slate-400" />,
      tags: ['Comparison', 'Tech', 'Metrics']
    },
    {
      id: 'cold-sauna',
      category: 'vs',
      questionKey: 'uqa_q_cold_sauna',
      answerKey: 'uqa_a_cold_sauna',
      icon: <HelpCircle className="text-blue-600" />,
      tags: ['Readiness', 'Adaptation', 'Hormetic']
    },
    {
      id: 'diet-vs',
      category: 'vs',
      questionKey: 'uqa_q_diet_vs',
      answerKey: 'uqa_a_diet_vs',
      icon: <HelpCircle className="text-emerald-600" />,
      tags: ['Mediterranean', 'CGM', 'Bio-Intelligence']
    },

    // Human / Backlash
    {
      id: 'over-optimization',
      category: 'human',
      questionKey: 'uqa_q_over_optimization',
      answerKey: 'uqa_a_over_optimization',
      icon: <Heart className="text-red-400" />,
      tags: ['Safety', 'Mental Health', 'Backlash']
    },
    {
      id: 'human-connection',
      category: 'human',
      questionKey: 'uqa_q_human_connection',
      answerKey: 'uqa_a_human_connection',
      icon: <Users className="text-indigo-400" />,
      tags: ['Connection', 'Humanity', 'Safety']
    }
  ], [t]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = t(q.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t(q.answerKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
                           q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [questions, searchQuery, activeCategory, t]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100" id="qa-hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest mb-4"
            >
              <HelpCircle size={14} className="mr-2" />
              {t('uqa_title')}
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
              {t('uqa_subtitle')}
            </h2>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder={t('uqa_search_placeholder')}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {cat.id === 'all' ? cat.label : t(`uqa_${cat.id}`)}
            </button>
          ))}
        </div>

        {/* Question Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((q) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group cursor-pointer rounded-[2rem] border transition-all duration-300 ${
                  expandedId === q.id 
                    ? 'bg-slate-900 border-slate-900 shadow-2xl p-10' 
                    : 'bg-white border-slate-100 p-8 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50'
                }`}
                onClick={() => toggleExpand(q.id)}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    expandedId === q.id ? 'bg-white/10' : 'bg-slate-50 group-hover:bg-indigo-50'
                  }`}>
                    {q.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`text-xl font-bold leading-tight mb-2 transition-colors ${
                      expandedId === q.id ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'
                    }`}>
                      {t(q.questionKey)}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {q.tags.map(tag => (
                        <span key={tag} className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                          expandedId === q.id ? 'bg-white/10 text-white/50' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <AnimatePresence>
                      {expandedId === q.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="h-px bg-white/10 my-6" />
                          <p className="text-slate-300 leading-relaxed mb-8">
                            {t(q.answerKey)}
                          </p>
                          
                          {q.links && (
                            <div className="space-y-3">
                              <p className="text-white font-black text-[10px] uppercase tracking-widest mb-2">Technical Deep Dive:</p>
                              {q.links.map(link => (
                                <a 
                                  key={link.label}
                                  href={link.url}
                                  target={link.url.startsWith('http') ? '_blank' : undefined}
                                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all group/link"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="font-bold">{link.label}</span>
                                  <ExternalLink size={16} className="text-white/40 group-hover/link:text-indigo-400 transition-colors" />
                                </a>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={`mt-1 transition-transform duration-300 ${expandedId === q.id ? 'rotate-180' : ''}`}>
                    <ArrowRight size={20} className={expandedId === q.id ? 'text-indigo-400' : 'text-slate-300'} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No intelligence markers found matching your query.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 text-indigo-600 font-bold uppercase text-xs tracking-widest"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
