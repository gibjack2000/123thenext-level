import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, BookOpen, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { jargonDatabase, JargonTerm } from '../data/jargon';

type CategoryFilter = 'All' | 'Autonomic' | 'Cellular' | 'Metabolic' | 'Epigenetics';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Medical Jargon Buster & Glossary | 123TheNext Level`;
  }, []);

  const allTerms = Object.values(jargonDatabase);

  const filteredTerms = allTerms.filter((item) => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.simpleDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories: CategoryFilter[] = ['All', 'Autonomic', 'Cellular', 'Metabolic', 'Epigenetics'];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none z-0"></div>

      {/* Hero Header */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-24 flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center text-white/40 hover:text-white font-black uppercase tracking-tighter text-xs mb-12 transition-all group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-white/10 group-hover:border-white">Back to Home</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-display font-black text-[10px] uppercase tracking-widest mb-6"
          >
            Scientific Translator Suite
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white mb-6 leading-none">
            Jargon Buster
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed border-l-4 border-indigo-500/50 pl-8 text-left italic">
            Translating complex medical science and physiological markers into plain, simple English. Understand your lab results and wearable metrics with clinical clarity.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-32">
        
        {/* Search and Filters Bar */}
        <div className="bg-slate-900/50 backdrop-blur-3xl p-6 md:p-8 rounded-[3rem] border border-white/5 shadow-2xl mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md group">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search medical terms (e.g. endocrine)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-950/80 rounded-2xl border border-white/10 text-white font-medium text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    isSelected 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20 scale-105'
                      : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {filteredTerms.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTerms.map((item, idx) => (
                <motion.div 
                  key={item.term}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-8 flex flex-col justify-between group shadow-xl hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500"
                >
                  <div>
                    {/* Header: Term & Tag */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
                        {item.category}
                      </span>
                    </div>

                    {/* Word Title */}
                    <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-4 group-hover:text-indigo-400 transition-colors leading-none">
                      {item.term}
                    </h3>

                    {/* Plain English Translation Highlight */}
                    <div className="p-5 bg-slate-950/30 rounded-2xl border-l-3 border-indigo-500/50 mb-6">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block mb-1">In Plain English:</span>
                      <p className="text-sm text-slate-200 font-semibold leading-relaxed">
                        {item.simpleDefinition}
                      </p>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Biological Role:</span>
                      <p className="text-slate-400 text-xs leading-relaxed font-medium">
                        {item.detailedExplanation}
                      </p>
                    </div>
                  </div>

                  {/* Practical Action Tip */}
                  <div className="pt-6 border-t border-white/5 flex gap-3 items-start text-emerald-400">
                    <Sparkles size={16} className="flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-500 block">Take Action:</span>
                      <p className="text-[11px] leading-relaxed font-bold text-slate-300">
                        {item.practicalTip}
                      </p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-slate-900/20 rounded-[4rem] border border-white/5"
            >
              <BookOpen size={48} className="text-slate-600 mx-auto mb-6" />
              <h3 className="text-2xl font-display font-black uppercase text-white mb-2">No Terms Found</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                No jargon items matched your query "{searchQuery}". Try searching for categories or general medical terms like "endocrine" or "epigenetics".
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
