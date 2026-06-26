import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { BlogPost } from '../types';
import { guides as fallbackGuides } from '../data/guides';

export default function MagazineRack() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      if (!hasValidSupabaseConfig || !supabase) {
        // Fallback mock posts
        const mockPosts: BlogPost[] = [
          {
            id: '1',
            title: 'The Epigenetic Clock: Tracking Cellular Age in Real-Time',
            slug: 'epigenetic-clock-cellular-age',
            author: 'Dr. Evelyn Carter',
            content: 'Deep dive into methylation profiles and tracking biological rate of aging.',
            excerpt: 'How new consumer diagnostics allow you to measure biological vs chronological age and evaluate longevity protocols.',
            category: 'health',
            created_at: new Date().toISOString(),
            image_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
            tags: ['Longevity', 'Epigenetics', 'Biomarkers'],
            featured: false,
            status: 'published'
          },
          {
            id: '2',
            title: 'Mitochondrial Reserve: The Ultimate Metric of Athletic Longevity',
            slug: 'mitochondrial-reserve-athletic-longevity',
            author: 'Coach Marcus Vance',
            content: 'Maximizing cellular respiration and ATP efficiency through structured zone 2 training.',
            excerpt: 'Why raw VO2 max is only half the story. Learn how to train your mitochondria for decade-spanning power.',
            category: 'fitness',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
            tags: ['Mitochondria', 'Vo2Max', 'Zone 2'],
            featured: false,
            status: 'published'
          },
          {
            id: '3',
            title: 'GLP-1 Sensitizers: Natural Pathways to Metabolic Efficiency',
            slug: 'glp1-sensitizers-natural-metabolism',
            author: 'Nutritional Scientist Sarah Jenkins',
            content: 'Exploring dietary fibers, polyphenols, and timing strategies that mimic peptide agonists.',
            excerpt: 'Beyond the injections: How to leverage specific dietary compounds to trigger endogenous GLP-1 and balance blood sugar.',
            category: 'nutrition',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
            tags: ['GLP-1', 'Metabolism', 'Peptides'],
            featured: false,
            status: 'published'
          },
          {
            id: '4',
            title: 'The Social Vagus: Building Co-Regulation in Community Cohorts',
            slug: 'social-vagus-vns-community',
            author: 'Dr. Liam Thorne',
            content: 'How shared activities and physiological alignment stimulate vagal tone and speed up CNS recovery.',
            excerpt: 'Why training alone misses a critical recovery trigger. How team coordination and social fitness buffer stress.',
            category: 'wellness',
            created_at: new Date(Date.now() - 259200000).toISOString(),
            image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
            tags: ['Vagus Nerve', 'Social Fitness', 'Co-Regulation'],
            featured: false,
            status: 'published'
          }
        ];
        setPosts(mockPosts);
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
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts for Magazine Rack:', err);
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
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          accent: 'border-emerald-500',
          badge: 'Health Pillar'
        };
      case 'fitness':
        return {
          bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          accent: 'border-blue-500',
          badge: 'Fitness Pillar'
        };
      case 'nutrition':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          accent: 'border-amber-500',
          badge: 'Nutrition Pillar'
        };
      case 'wellness':
      default:
        return {
          bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          accent: 'border-purple-500',
          badge: 'Wellness Pillar'
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

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post, idx) => {
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
                      <span className={`px-2.5 py-1 rounded border text-[9px] font-black uppercase tracking-widest ${styles.bg}`}>
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
