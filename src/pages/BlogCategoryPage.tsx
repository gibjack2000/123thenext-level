import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tag, Home, ChevronRight, BookOpen } from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { BlogPost } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockBlogPosts';

const CATEGORY_DETAILS: Record<string, { title: string; desc: string; color: string; bg: string; border: string }> = {
  health: {
    title: 'Healthspan Intelligence',
    desc: 'Precision focus on disease prevention, cellular engineering, and biological age reversal. Understanding the mechanisms of longevity.',
    color: 'text-rose-500 hover:text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    border: 'border-rose-500/20'
  },
  fitness: {
    title: 'Performance Protocols',
    desc: 'Technical deep-dives into training mechanics, Vo2 Max optimization, neuromuscular adaptations, and high-performance recovery.',
    color: 'text-blue-500 hover:text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    border: 'border-blue-500/20'
  },
  nutrition: {
    title: 'Metabolic Intelligence',
    desc: 'Advanced metabolic nutrition strategy. From glucose regulation to intracellular energy production, supplement analysis, and peptide/GLP-1 biology.',
    color: 'text-emerald-500 hover:text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    border: 'border-emerald-500/20'
  },
  wellness: {
    title: 'Neurowellness Research',
    desc: 'The science of the internal state. Exploring nervous system regulation, VNS stimulation, somatic breathwork, cognitive restoration, and deep recovery.',
    color: 'text-purple-500 hover:text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    border: 'border-purple-500/20'
  },
  'social-fitness': {
    title: 'Social Fitness Research',
    desc: 'How team coordination, social fitness, and community connection stimulate physiological co-regulation and buffer stress.',
    color: 'text-cyan-500 hover:text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    border: 'border-cyan-500/20'
  },
  'womens-health': {
    title: "Women's Health Research",
    desc: 'Advancing research in ovarian longevity, cognitive-metabolic preservation, and epigenetic tracking.',
    color: 'text-pink-500 hover:text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    border: 'border-pink-500/20'
  }
};

export default function BlogCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const catKey = (category || '').toLowerCase();
  const details = CATEGORY_DETAILS[catKey] || {
    title: `${category?.replace(/-/g, ' ')} Insights`,
    desc: `Research, intelligence, and protocols in the ${category?.replace(/-/g, ' ')} category.`,
    color: 'text-blue-500 hover:text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    border: 'border-blue-500/20'
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        if (!supabase || !hasValidSupabaseConfig) {
          const filtered = MOCK_BLOG_POSTS.filter(
            p => p.category?.toLowerCase() === catKey
          ) as BlogPost[];
          setPosts(filtered);
          return;
        }

        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category', catKey)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error('Error fetching blogs from Supabase:', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [catKey]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 relative overflow-hidden">
      {/* Dynamic Background glow matched to category theme color */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-10 bg-current ${details.color.split(' ')[0]}`} />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs text-slate-400 mb-8 mt-4">
          <Link to="/" className="hover:text-white flex items-center transition-colors">
            <Home size={12} className="mr-1" /> Home
          </Link>
          <ChevronRight size={12} className="mx-2 text-slate-700" />
          <Link to="/updates" className="hover:text-white transition-colors">
            Updates
          </Link>
          <ChevronRight size={12} className="mx-2 text-slate-700" />
          <span className="text-white font-medium uppercase tracking-wider">{details.title}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-16 border-b border-slate-900 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-3xl">
              <span className={`inline-block px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest mb-4 ${details.bg}`}>
                {category?.replace(/-/g, ' ')}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-none">
                {details.title}
              </h1>
              <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed border-l-2 border-slate-800 pl-6">
                {details.desc}
              </p>
            </div>
            <Link to="/updates" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold shrink-0">
              <ArrowLeft size={14} className="mr-2" />
              All Categories
            </Link>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-900/60">
            <Link 
              to="/updates" 
              className="px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
            >
              All
            </Link>
            {Object.keys(CATEGORY_DETAILS).map(cat => {
              const isActive = cat === catKey;
              return (
                <Link
                  key={cat}
                  to={`/blog/category/${cat}`}
                  className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'border-blue-500 bg-blue-500/10 text-white' 
                      : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.replace(/-/g, ' ')}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-20 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">No insights here yet</h3>
            <p className="text-slate-400 mb-8 font-medium">
              We haven't published any articles in the {details.title} category yet. Check back soon for fresh technical updates.
            </p>
            <Link to="/updates" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
              Browse Other Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-700/80 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80'} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag size={12} />
                          {post.tags[0]}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-display uppercase tracking-tight text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-900/60 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      <span className="uppercase tracking-widest">Read Article</span>
                      <BookOpen size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
