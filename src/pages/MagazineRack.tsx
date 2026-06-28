import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { BlogPost } from '../types';
import { guides as fallbackGuides } from '../data/guides';
import { MOCK_BLOG_POSTS } from '../data/mockBlogPosts';

export default function MagazineRack() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const CATEGORIES = [
    { id: 'all', name: 'All Issues' },
    { id: 'health', name: 'Health' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'wellness', name: 'Wellness' }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category?.toLowerCase() === selectedCategory);

  useEffect(() => {
    async function fetchPosts() {
      if (!hasValidSupabaseConfig || !supabase) {
        setPosts(MOCK_BLOG_POSTS as BlogPost[]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          const dbSlugs = new Set(data.map(p => p.slug));
          const uniqueMock = MOCK_BLOG_POSTS.filter(p => !dbSlugs.has(p.slug)) as BlogPost[];
          const merged = [...data, ...uniqueMock];
          merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setPosts(merged);
        } else {
          setPosts(MOCK_BLOG_POSTS as BlogPost[]);
        }
      } catch (err) {
        console.error('Error fetching blog posts for Magazine Rack:', err);
        setPosts(MOCK_BLOG_POSTS as BlogPost[]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const getPillarStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case 'health':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          accent: 'border-rose-500',
          badge: 'Health'
        };
      case 'fitness':
        return {
          bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          accent: 'border-blue-500',
          badge: 'Fitness'
        };
      case 'nutrition':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          accent: 'border-emerald-500',
          badge: 'Nutrition'
        };
      case 'wellness':
        return {
          bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          accent: 'border-purple-500',
          badge: 'Wellness'
        };
      case 'social-fitness':
        return {
          bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          accent: 'border-cyan-500',
          badge: 'Social Fitness'
        };
      case 'womens-health':
        return {
          bg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
          accent: 'border-pink-500',
          badge: "Women's Health"
        };
      default:
        return {
          bg: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
          accent: 'border-slate-500',
          badge: 'Insights'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-slate-900 pb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4 text-xs uppercase tracking-widest font-bold">
              <ArrowLeft size={14} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-wider text-white">
              The Magazine Rack
            </h1>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl font-medium">
              Browse our latest research insights, training protocol designs, and clinical notes styled as premium cover issues.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-xs font-bold uppercase tracking-widest text-slate-300">
            <Sparkles size={14} className="text-blue-400" />
            <span>Weekly Issue Ticker</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap gap-2.5 pb-6 border-b border-slate-900/60">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all duration-300 outline-none cursor-pointer ${
                  isActive 
                    ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-500/5' 
                    : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-20 text-center backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-4">No issues here yet</h3>
            <p className="text-slate-400 mb-8 font-medium">
              We haven't published any articles in this category yet. Check back soon for fresh weekly updates.
            </p>
            <button 
              onClick={() => setSelectedCategory('all')} 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all"
            >
              Browse All Issues
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPosts.map((post, idx) => {
              const styles = getPillarStyles(post.category);
              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group relative flex flex-col h-[520px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-900/10"
                >
                  {/* Magazine Cover Visual Background */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={post.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />
                    {/* Top border accent */}
                    <div className={`absolute top-0 inset-x-0 h-2 border-t-2 ${styles.accent}`} />
                  </div>

                  {/* Magazine Cover Formatting / Content Overlay */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Top Header Row of the Cover */}
                    <div className="flex justify-between items-start">
                      <span 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/blog/category/${post.category}`);
                        }}
                        className={`px-2.5 py-1 rounded border text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer hover:bg-white hover:text-slate-950 ${styles.bg}`}
                      >
                        {styles.badge}
                      </span>
                      <div className="text-right text-[9px] font-bold text-slate-400 tracking-wider uppercase space-y-0.5">
                        <div>Issue #{posts.length - idx}</div>
                        <div>{new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</div>
                      </div>
                    </div>

                    {/* Middle Text: Big Cover Headlines */}
                    <div className="space-y-4">
                      {/* Bold Editorial Headline */}
                      <h2 className="text-2xl font-display font-extrabold uppercase tracking-tight text-white leading-tight line-clamp-3 group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h2>
                      
                      {/* Author Cover Line */}
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        By <span className="text-white">{post.author}</span>
                      </p>
                      
                      {/* Cover Excerpt */}
                      <p className="text-xs text-slate-300/80 leading-relaxed font-medium line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer Row: Barcode & Stats */}
                    <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                      {/* Decorative Barcode to simulate real magazine covers */}
                      <div className="flex items-center gap-1.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col justify-between h-8 bg-slate-950 p-1 rounded border border-slate-800">
                          <div className="flex gap-px h-5 items-stretch bg-white px-0.5">
                            <span className="w-0.5 bg-black" />
                            <span className="w-px bg-black" />
                            <span className="w-1 bg-black" />
                            <span className="w-0.5 bg-black" />
                            <span className="w-px bg-black" />
                            <span className="w-1.5 bg-black" />
                            <span className="w-0.5 bg-black" />
                          </div>
                          <span className="text-[5px] text-white font-mono leading-none tracking-widest uppercase">NXTLVL-#{posts.length - idx}</span>
                        </div>
                      </div>

                      {/* Read Info */}
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:text-blue-300">
                        <BookOpen size={12} />
                        <span>Read Issue</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
