import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag as TagIcon, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug || !supabase) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (error) throw error;
        setPost(data);
      } catch (err: any) {
        console.error('Error fetching blog post:', err);
        setError('Article not found.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-display uppercase text-slate-900 mb-4">{error || 'Article not found'}</h1>
        <p className="text-slate-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const renderContent = () => {
    // If post is marked as HTML, render it directly
    if ((post as any).is_html || post.content.trim().startsWith('<')) {
      return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
    }

    // Basic markdown-like rendering for the content
    return post.content.split('\n').map((paragraph, index) => {
      const text = paragraph.trim();
      if (!text) return <br key={index} />;
      if (text.startsWith('### ')) {
        return <h3 key={index} className="font-display uppercase tracking-tight text-xl mt-8 mb-4 text-slate-900">{text.replace('### ', '')}</h3>;
      }
      if (text.startsWith('## ')) {
        return <h2 key={index} className="font-display uppercase tracking-tight text-2xl mt-12 mb-6 text-slate-900">{text.replace('## ', '')}</h2>;
      }
      if (text.startsWith('# ')) {
        return <h1 key={index} className="font-display uppercase tracking-tight text-3xl mt-12 mb-8 text-slate-900">{text.replace('# ', '')}</h1>;
      }
      const formatText = (content: string) => {
        // Parse bold and markdown links into HTML safely
        return content
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, title, url) => {
            let validUrl = url;
            if (!validUrl.startsWith('http') && !validUrl.startsWith('//')) {
              validUrl = 'https://' + validUrl;
            }
            return `<a href="${validUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-bold hover:text-blue-800 underline transition-colors">${title}</a>`;
          });
      };

      if (text.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2 text-slate-600" dangerouslySetInnerHTML={{ __html: formatText(text.replace('- ', '')) }} />;
      }
      if (text.startsWith('* ')) {
        return <li key={index} className="ml-6 mb-2 text-slate-600" dangerouslySetInnerHTML={{ __html: formatText(text.replace('* ', '')) }} />;
      }
      
      return <p key={index} className="text-slate-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: formatText(text) }} />;
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[400px] flex items-end justify-center mb-12">
        {post.image_url ? (
          <div className="absolute inset-0 z-0">
            <a href={post.affiliate_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer hover:opacity-95 transition-opacity">
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </a>
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/10"></div>
          </div>
        ) : (
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Engaging Post Background" 
              className="w-full h-full object-cover opacity-90" 
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20"></div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <Link to="/#blog" className="inline-flex items-center text-white/70 hover:text-white mb-8 font-medium transition-colors backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl border border-white/20">
            <ArrowLeft size={16} className="mr-2" />
            Back to Insights
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 border border-blue-500/30 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              {post.category}
            </span>
            <button className="text-white/60 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20" title="Copy Article Link" onClick={() => navigator.clipboard.writeText(window.location.href)}>
              <Share2 size={18} />
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display uppercase tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border-2 border-slate-700">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=0f172a&color=fff`} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <span className="text-white font-semibold">{post.author}</span>
            </div>
            
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-6">
              <Calendar size={16} />
              {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Container */}
      <article className="relative z-20 max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-16 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 -mt-24 border border-slate-100 mix-blend-normal">
        <div className="prose prose-slate prose-lg lg:prose-xl max-w-none">
          {/* First part of content */}
          {renderContent().slice(0, 4)}

          {/* Additional Image 1 Slot */}
          {post.image_url_2 && (
            <div className="my-12 rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl group">
              <a href={post.affiliate_url} target="_blank" rel="noopener noreferrer" className="block relative">
                <img src={post.image_url_2} alt="Supplementary visual" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </a>
            </div>
          )}

          {/* Middle part of content */}
          {renderContent().slice(4, 8)}

          {/* Additional Image 2 Slot */}
          {post.image_url_3 && (
            <div className="my-12 rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl group">
              <a href={post.affiliate_url} target="_blank" rel="noopener noreferrer" className="block relative">
                <img src={post.image_url_3} alt="Supplementary visual" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </a>
            </div>
          )}

          {/* Remaining content */}
          {renderContent().slice(8)}
        </div>
        
        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-200">
                <TagIcon size={14} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
