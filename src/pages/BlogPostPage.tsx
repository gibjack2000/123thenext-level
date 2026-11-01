import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag as TagIcon, Share2, Star, ExternalLink, Stethoscope, FileText, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { BlogPost } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockBlogPosts';
import BlogMarkdownRenderer from '../components/BlogMarkdownRenderer';
import BlogNewsletterBanner from '../components/newsletter/BlogNewsletterBanner';
import { useMarket } from '../contexts/MarketContext';
import { getCategoryDefaultBanner, extractFrontmatter } from '../utils/blogImages';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { market } = useMarket();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Allow preview if ?preview=true or if logged into admin portal
  const isAdminLoggedIn = typeof window !== 'undefined' && (
    sessionStorage.getItem('admin_session_authenticated') === 'true' ||
    localStorage.getItem('admin_session_authenticated') === 'true'
  );
  const isPreview = searchParams.get('preview') === 'true' || isAdminLoggedIn;

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      try {
        let postData: any = null;
        
        if (supabase && hasValidSupabaseConfig) {
          try {
            const cleanSlug = slug.trim().toLowerCase();

            // 1. Primary Query: check blog_posts table directly
            let { data: postDb } = await supabase
              .from('blog_posts')
              .select('*')
              .eq('slug', cleanSlug)
              .maybeSingle();

            if (!postDb) {
              const res = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .maybeSingle();
              postDb = res.data;
            }

            // Fallback: match slug with prefix (in case numeric suffix was added)
            if (!postDb) {
              const res = await supabase
                .from('blog_posts')
                .select('*')
                .ilike('slug', `${cleanSlug}%`)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
              postDb = res.data;
            }

            // Fallback: check blogs table if exists
            if (!postDb) {
              try {
                const { data: blogDb } = await supabase
                  .from('blogs')
                  .select('*')
                  .eq('slug', cleanSlug)
                  .maybeSingle();
                if (blogDb) postDb = blogDb;
              } catch (_) {}
            }

            if (postDb) {
              postData = {
                ...postDb,
                image_url: postDb.cover_image_url || postDb.image_url,
                created_at: postDb.created_at
              };
            } else {
              const mockPost = MOCK_BLOG_POSTS.find(p => p.slug === cleanSlug || p.slug === slug);
              if (!mockPost) throw new Error('Post not found in database or catalog');
              postData = mockPost;
            }
          } catch (dbErr) {
            console.warn('Post not found in database, checking mock data:', dbErr);
            const mockPost = MOCK_BLOG_POSTS.find(p => p.slug === slug);
            if (!mockPost) throw new Error('Post not found');
            postData = mockPost;
          }
        } else {
          console.warn('Supabase not initialized, using mock data');
          const mockPost = MOCK_BLOG_POSTS.find(p => p.slug === slug);
          if (!mockPost) throw new Error('Post not found in mock data');
          postData = mockPost;
        }
        
        // If it's a draft and not in preview mode, block public view
        if (postData.status === 'draft' && !isPreview) {
          setError('This article is currently in draft and awaiting editorial authorization.');
          return;
        }

        // 2. Fetch affiliate products if they exist (manual join for reliability)
        let fullPost = { ...postData };
        
        if (supabase) {
          if (postData.affiliate_product_1) {
            try {
              const { data: prod1 } = await supabase
                .from('amazon_affiliate_products')
                .select('*')
                .eq('id', postData.affiliate_product_1)
                .single();
              if (prod1) fullPost.affiliate_product_1 = prod1;
            } catch (err) {
              console.error('Error fetching affiliate product 1:', err);
            }
          }

          if (postData.affiliate_product_2) {
            try {
              const { data: prod2 } = await supabase
                .from('amazon_affiliate_products')
                .select('*')
                .eq('id', postData.affiliate_product_2)
                .single();
              if (prod2) fullPost.affiliate_product_2 = prod2;
            } catch (err) {
              console.error('Error fetching affiliate product 2:', err);
            }
          }

          if (postData.affiliate_product_3) {
            try {
              const { data: prod3 } = await supabase
                .from('amazon_affiliate_products')
                .select('*')
                .eq('id', postData.affiliate_product_3)
                .single();
              if (prod3) fullPost.affiliate_product_3 = prod3;
            } catch (err) {
              console.error('Error fetching affiliate product 3:', err);
            }
          }

          if (postData.affiliate_product_4) {
            try {
              const { data: prod4 } = await supabase
                .from('amazon_affiliate_products')
                .select('*')
                .eq('id', postData.affiliate_product_4)
                .single();
              if (prod4) fullPost.affiliate_product_4 = prod4;
            } catch (err) {
              console.error('Error fetching affiliate product 4:', err);
            }
          }
        }

        setPost(fullPost);
      } catch (err: any) {
        console.error('Error fetching blog post:', err);
        setError('Article not found.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, isPreview]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-16 flex justify-center items-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error || !post) {
    const isDraftError = error?.includes('draft');
    return (
      <div className="min-h-screen pt-40 pb-20 px-4 max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
          <FileText size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white tracking-tight mb-3">
          {isDraftError ? 'Draft Awaiting Approval' : (error || 'Article Not Found')}
        </h1>
        <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
          {isDraftError
            ? 'This article has been generated and is currently in your review queue. To inspect or edit the draft, use preview mode or open the automation dashboard.'
            : "The blog post you're looking for doesn't exist, has been archived, or is currently being drafted."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {slug && (
            <Link
              to={`/blog/${slug}?preview=true`}
              className="w-full sm:w-auto px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30"
            >
              <Eye size={15} />
              <span>Open in Preview Mode</span>
            </Link>
          )}
          <Link
            to="/automation-admin"
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 border border-slate-700"
          >
            <span>Automation Admin</span>
          </Link>
          <Link
            to="/blog"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-xl font-medium text-xs transition flex items-center justify-center gap-1.5 border border-slate-800"
          >
            <ArrowLeft size={14} />
            <span>Blog Rack</span>
          </Link>
        </div>
      </div>
    );
  }

  // Safe market-aware fallback for hero click url
  const displayAffiliateUrl = post.affiliate_url || (() => {
    const match = post.content.match(/https?:\/\/(?:www\.)?(?:amazon|amzn)\.[a-z.]+(?:\/[^)\s]*)?/i);
    if (match) return match[0];
    return market === 'ES'
      ? 'https://www.amazon.es/?tag=123znl08a-21'
      : market === 'UK'
      ? 'https://www.amazon.co.uk/?tag=123znl0f3-21'
      : 'https://www.amazon.com/?tag=123znl0e-20';
  })();

  const rawAffiliateProducts = [
    (post as any).affiliate_product_1,
    (post as any).affiliate_product_2,
    (post as any).affiliate_product_3,
    (post as any).affiliate_product_4
  ].filter(Boolean);

  const activeMarketProds = rawAffiliateProducts.filter((prod: any) => {
    if (!prod.market) return true;
    return prod.market.toUpperCase() === (market || 'US').toUpperCase();
  });

  const fm = post ? extractFrontmatter(post.content || '') : {};
  const heroImage = post?.image_url || fm.featured_image || getCategoryDefaultBanner(post?.category);
  const heroAlt = fm.featured_image_alt || post?.title || 'Featured Article Visual';

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Editorial Preview Banner for Draft Articles */}
      {post.status === 'draft' && (
        <div className="sticky top-0 z-50 bg-amber-500/90 text-slate-950 font-black py-2.5 px-4 text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-lg backdrop-blur-md">
          <Eye size={15} />
          <span>EDITORIAL PREVIEW MODE — Article status is currently DRAFT (hidden from public category feeds until authorized).</span>
          <Link to="/automation-admin" className="underline ml-2 hover:opacity-80">
            Open /automation-admin &rarr;
          </Link>
        </div>
      )}
      {/* Hero Section */}
      <div className="relative w-full min-h-[560px] md:min-h-[640px] pt-36 sm:pt-40 md:pt-44 pb-28 sm:pb-32 flex flex-col justify-end items-center mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={heroAlt} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/10"></div>
          {/* Clickable Link covering everything */}
          {displayAffiliateUrl && (
            <a 
              href={displayAffiliateUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 z-10 block cursor-pointer hover:bg-black/5 transition-colors"
              aria-label="View Product"
            ></a>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link to="/#blog" className="inline-flex items-center text-white/70 hover:text-white mb-8 font-medium transition-colors backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl border border-white/20">
            <ArrowLeft size={16} className="mr-2" />
            Back to Insights
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <Link 
              to={`/blog/category/${post.category}`}
              className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 border border-blue-500/30 text-xs font-bold uppercase tracking-widest backdrop-blur-md hover:bg-blue-500/40 hover:text-white transition-colors"
            >
              {post.category}
            </Link>
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
      <article className="relative z-20 max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-16 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 -mt-20 border border-slate-100 mix-blend-normal">
        <div className="max-w-none">
          <BlogMarkdownRenderer content={post.content} theme="light" affiliateUrl={displayAffiliateUrl} />

          {post.image_url_2 && (
            <div className="my-12 rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl group">
              <a href={displayAffiliateUrl} target="_blank" rel="noopener noreferrer" className="block relative">
                <img src={post.image_url_2} alt="Supplementary visual" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </a>
            </div>
          )}

          {post.image_url_3 && (
            <div className="my-12 rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl group">
              <a href={displayAffiliateUrl} target="_blank" rel="noopener noreferrer" className="block relative">
                <img src={post.image_url_3} alt="Supplementary visual" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </a>
            </div>
          )}
        </div>

        
        {/* Affiliate Products Section (Only rendered if matching products exist for user's active region) */}
        {activeMarketProds.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mb-2">Featured Clinical Arsenal</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium">Clinically curated equipment and nutrition stacks matching this article's protocols.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeMarketProds.map((prod: any) => {
                const reviewCount = Math.abs(prod.title.charCodeAt(0) + prod.title.charCodeAt(prod.title.length - 1) * 7) % 850 + 120;
                return (
                  <div key={prod.id} className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group relative overflow-hidden">
                    <div className="w-full sm:w-28 h-28 shrink-0 rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex items-center justify-center p-3">
                      <img src={prod.image_url} alt={prod.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating block */}
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={10} className={`${i < Math.floor(prod.rating || 5.0) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                            ))}
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold">({reviewCount}+ Reviews)</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug group-hover:text-blue-600 transition-colors duration-300">{prod.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4 font-medium">{prod.description || prod.short_benefit}</p>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Price</span>
                          <span className="font-black text-[9px] text-blue-600 tracking-wider uppercase border border-blue-500/20 px-2 py-1 rounded-md bg-blue-500/5 mt-1 text-center">
                            CHECK THE LATEST DEAL
                          </span>
                        </div>
                        
                        <a 
                          href={prod.affiliate_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Buy from Amazon
                          <ExternalLink size={10} className="ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
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

        {/* Clinician Co-Pilot Bottom CTA Box for Pillar Articles */}
        <div className="mt-14 p-7 sm:p-9 rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-cyan-500/30 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-wider font-bold">
                <Stethoscope size={12} className="text-cyan-400" />
                <span>Free Clinician Co-Pilot • Collaborative GP Protocol</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-black leading-tight">
                Log Your Baselines on the Interactive Clinician Co-Pilot
              </h3>
              <p className="text-slate-350 text-xs sm:text-sm font-light leading-relaxed">
                Raw biohacks without baseline laboratory data carry real physiological risks. Track your 14-day resting vitals, record your supplement doses, and check your Level 1 Tri-Marker requisition (ApoB, HbA1c, hs-CRP) on our free interactive <strong>Clinician Co-Pilot Workbook</strong> before bringing the data to your GP.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                to="/clinician-copilot"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <FileText size={14} />
                <span>Log Baselines on Clinician Co-Pilot →</span>
              </Link>
              <Link
                to="/health-quiz"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all text-center"
              >
                <span>Take 5-Min Baseline Quiz</span>
              </Link>
            </div>
          </div>
        </div>

        <BlogNewsletterBanner currentCategory={post.category} />
      </article>
    </main>
  );
}
