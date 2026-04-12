import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockBlogPosts';

interface BlogSectionProps {
  category?: 'health' | 'fitness' | 'nutrition' | 'wellness';
  limit?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  featured?: boolean;
}

export default function BlogSection({ category, limit = 3, title, subtitle, className = "", featured }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (category) {
          query = query.eq('category', category);
        }
        
        if (featured !== undefined) {
          query = query.eq('featured', featured);
        }

        const { data, error } = await query;
        if (error) throw error;
        
        // Only set posts if we got data. 
        // If data is empty but we had no error, it means the category is just empty.
        setPosts(data || []);
      } catch (err: any) {
        console.error('Error fetching blog posts, using mock data:', err);
        
        // Only use fallback if we actually have NO posts at all (indicating first run or connection issue)
        let mockPosts = MOCK_BLOG_POSTS;
        if (category) {
          mockPosts = mockPosts.filter((p: any) => p.category === category);
        }
        if (featured !== undefined) {
          mockPosts = mockPosts.filter((p: any) => p.featured === featured);
        }
        setPosts(mockPosts.slice(0, limit) as BlogPost[]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [category, limit, featured]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-12 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center space-y-4">
          {title && <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-slate-900">{title}</h2>}
          {subtitle && <p className="text-slate-500 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={`/blog/${post.slug}`}
              className="group flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={post.image_url || "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800"} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  {post.tags && post.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-display uppercase tracking-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Read Article
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
