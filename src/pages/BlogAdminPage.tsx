import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowLeft, 
  RefreshCw, 
  Send, 
  Image as ImageIcon, 
  BookOpen, 
  FileText, 
  X,
  ExternalLink,
  Layers,
  Check,
  ChevronRight
} from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { BlogPost } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockBlogPosts';
import BlogMarkdownRenderer from '../components/BlogMarkdownRenderer';

const CATEGORY_OPTIONS = [
  { id: 'health', name: 'Health & Longevity', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  { id: 'fitness', name: 'Fitness & Biodata', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { id: 'nutrition', name: 'Metabolic Nutrition', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { id: 'wellness', name: 'Wellness & Somatics', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { id: 'womens-health', name: "Women's Health", color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  { id: 'social-fitness', name: 'Social Fitness & Bio-Networks', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' }
];

const PRESET_COVERS = [
  {
    name: 'Performance & Biodata',
    category: 'fitness',
    url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png'
  },
  {
    name: 'Healthspan & Longevity',
    category: 'health',
    url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png'
  },
  {
    name: 'Metabolic Nutrition',
    category: 'nutrition',
    url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png'
  },
  {
    name: 'Autonomic Engineering',
    category: 'wellness',
    url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png'
  },
  {
    name: "Women's Health & Vitality",
    category: 'womens-health',
    url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png'
  },
  {
    name: 'Socio-Architecture & Bio-Networks',
    category: 'social-fitness',
    url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png'
  }
];

export default function BlogAdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Main post collection
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'scheduled' | 'published'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');
  const [saving, setSaving] = useState(false);

  // Check existing session authentication
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_session_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin123';
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session_authenticated');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Fetch articles from Supabase blogs table (with fallback)
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      if (!supabase || !hasValidSupabaseConfig) {
        setPosts(MOCK_BLOG_POSTS as BlogPost[]);
        setLoading(false);
        return;
      }

      // 1. Try public.blogs table
      const { data: blogsData, error: blogsErr } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!blogsErr && blogsData && blogsData.length > 0) {
        const mapped = blogsData.map((b: any) => ({
          ...b,
          image_url: b.cover_image_url || b.image_url,
          cover_image_url: b.cover_image_url || b.image_url,
          status: b.status || (b.published_at ? 'published' : 'draft')
        }));
        setPosts(mapped);
      } else {
        // 2. Fallback to blog_posts table
        const { data: legacyData, error: legacyErr } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (!legacyErr && legacyData && legacyData.length > 0) {
          const mapped = legacyData.map((b: any) => ({
            ...b,
            image_url: b.cover_image_url || b.image_url,
            cover_image_url: b.cover_image_url || b.image_url,
            status: b.status || 'published'
          }));
          setPosts(mapped);
        } else {
          setPosts(MOCK_BLOG_POSTS as BlogPost[]);
        }
      }
    } catch (err: any) {
      console.error('Error loading articles in admin:', err);
      showToast('Could not load database articles: ' + (err.message || 'Check database connection'), 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated, fetchArticles]);

  // Single-Click "Approve & Publish" Handler
  const handleApproveAndPublish = async (post: BlogPost) => {
    try {
      const nowIso = new Date().toISOString();
      const updatedPost = {
        ...post,
        status: 'published' as const,
        published_at: nowIso
      };

      if (supabase && hasValidSupabaseConfig) {
        // Try updating blogs table
        const { error: blogErr } = await supabase
          .from('blogs')
          .update({
            status: 'published',
            published_at: nowIso,
            updated_at: nowIso
          })
          .eq('id', post.id);

        if (blogErr) {
          // If blogs table fails, try legacy blog_posts
          await supabase
            .from('blog_posts')
            .update({ status: 'published' })
            .eq('id', post.id);
        }
      }

      setPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
      showToast(`🎉 "${post.title}" is now PUBLISHED and live on the blog!`, 'success');

      // Trigger Queue Empty check
      fetch('/api/webhooks/blog-queue-empty-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'approve_and_publish', id: post.id })
      }).catch(() => {});
    } catch (err: any) {
      console.error('Error approving blog:', err);
      showToast('Failed to approve article: ' + err.message, 'error');
    }
  };


  // Move back to draft
  const handleRevertToDraft = async (post: BlogPost) => {
    try {
      const updatedPost = {
        ...post,
        status: 'draft' as const,
        published_at: null
      };

      if (supabase && hasValidSupabaseConfig) {
        const { error: blogErr } = await supabase
          .from('blogs')
          .update({
            status: 'draft',
            published_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', post.id);

        if (blogErr) {
          await supabase
            .from('blog_posts')
            .update({ status: 'draft' })
            .eq('id', post.id);
        }
      }

      setPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
      showToast(`Article "${post.title}" reverted to Draft status.`, 'info');
    } catch (err: any) {
      console.error('Error reverting blog:', err);
      showToast('Failed to revert article: ' + err.message, 'error');
    }
  };

  // Open Editor for New or Existing Article
  const handleOpenEditor = (post?: BlogPost) => {
    if (post) {
      setEditingPost({ ...post });
    } else {
      setEditingPost({
        id: '',
        title: '',
        slug: '',
        category: 'wellness',
        author: '123TheNextLevel Editorial',
        excerpt: '',
        content: `## Executive Summary\n\nEnter article opening hook and problem statement here...\n\n### Scientific Protocol & Mechanism\n\nExplain physiological or training mechanisms here.\n\n### Practical Action Steps\n\n- **Step 1:** Action item\n- **Step 2:** Action item\n\n### Conclusion\n\nSummary and call to action.`,
        cover_image_url: PRESET_COVERS[0].url,
        image_url: PRESET_COVERS[0].url,
        status: 'draft',
        published_at: null,
        reading_time_minutes: 5,
        tags: ['health', 'protocol'],
        featured: false
      });
    }
    setEditorTab('write');
    setIsEditorOpen(true);
  };

  // Save Article (Insert or Update)
  const handleSaveArticle = async (andPublish: boolean = false) => {
    if (!editingPost || !editingPost.title || !editingPost.content) {
      showToast('Please enter both a Title and Content body.', 'error');
      return;
    }

    setSaving(true);
    try {
      const nowIso = new Date().toISOString();
      const slugValue = editingPost.slug?.trim() || editingPost.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const newStatus = andPublish ? 'published' : (editingPost.status || 'draft');
      const publishTimestamp = andPublish 
        ? nowIso 
        : (newStatus === 'published' ? (editingPost.published_at || nowIso) : editingPost.published_at || null);

      const payload: any = {
        title: editingPost.title,
        slug: slugValue,
        category: editingPost.category || 'wellness',
        author: editingPost.author || '123TheNextLevel Editorial',
        excerpt: editingPost.excerpt || '',
        content: editingPost.content,
        cover_image_url: editingPost.cover_image_url || editingPost.image_url || PRESET_COVERS[0].url,
        image_url: editingPost.cover_image_url || editingPost.image_url || PRESET_COVERS[0].url,
        status: newStatus,
        published_at: publishTimestamp,
        reading_time_minutes: editingPost.reading_time_minutes || 5,
        tags: Array.isArray(editingPost.tags) ? editingPost.tags : (typeof editingPost.tags === 'string' ? (editingPost.tags as string).split(',').map(s => s.trim()) : []),
        featured: Boolean(editingPost.featured),
        meta_title: editingPost.meta_title || `${editingPost.title} | 123TheNextLevel`,
        meta_description: editingPost.meta_description || editingPost.excerpt || '',
        updated_at: nowIso
      };

      if (supabase && hasValidSupabaseConfig) {
        if (editingPost.id && editingPost.id.length > 5) {
          // Update existing
          const { error: uErr } = await supabase
            .from('blogs')
            .update(payload)
            .eq('id', editingPost.id);

          if (uErr) {
            await supabase.from('blog_posts').update(payload).eq('id', editingPost.id);
          }
        } else {
          // Insert new
          payload.created_at = nowIso;
          const { data: iData, error: iErr } = await supabase
            .from('blogs')
            .insert([payload])
            .select()
            .single();

          if (iErr) {
            const { data: legacyData } = await supabase
              .from('blog_posts')
              .insert([payload])
              .select()
              .single();
            if (legacyData) payload.id = legacyData.id;
          } else if (iData) {
            payload.id = iData.id;
          }
        }
      }

      await fetchArticles();
      setIsEditorOpen(false);
      showToast(andPublish ? `🚀 "${payload.title}" published successfully!` : `💾 Saved "${payload.title}" as ${newStatus}!`, 'success');

      // If published, check if queue is now empty and trigger notification
      if (newStatus === 'published' || andPublish) {
        fetch('/api/webhooks/blog-queue-empty-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'post_published', id: payload.id })
        }).catch(() => {});
      }
    } catch (err: any) {
      console.error('Error saving article:', err);
      showToast('Failed to save article: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (post: BlogPost) => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    try {
      if (supabase && hasValidSupabaseConfig) {
        await supabase.from('blogs').delete().eq('id', post.id);
        await supabase.from('blog_posts').delete().eq('id', post.id);
      }
      setPosts(prev => prev.filter(p => p.id !== post.id));
      showToast(`Article "${post.title}" deleted.`, 'info');

      // Check if queue is now empty after deletion
      fetch('/api/webhooks/blog-queue-empty-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'post_deleted', id: post.id })
      }).catch(() => {});
    } catch (err: any) {
      console.error('Error deleting article:', err);
      showToast('Failed to delete: ' + err.message, 'error');
    }
  };


  // Filtering calculations
  const filteredPosts = posts.filter(p => {
    const postStatus = p.status || (p.published_at ? 'published' : 'draft');
    if (statusFilter !== 'all' && postStatus !== statusFilter) return false;
    if (categoryFilter !== 'all' && p.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchCategory = p.category?.toLowerCase().includes(q);
      const matchTags = Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCategory && !matchTags) return false;
    }
    return true;
  });

  const draftCount = posts.filter(p => (p.status || 'draft') === 'draft').length;
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const publishedCount = posts.filter(p => p.status === 'published').length;

  // Unauthenticated Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Shield size={32} />
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-center text-white mb-2 uppercase tracking-wide">
            Editorial Blog Admin
          </h1>
          <p className="text-slate-400 text-center text-sm mb-6">
            Enter administrator password to access article drafting, scheduling, and publication controls.
          </p>

          {authError && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors pl-10"
                  required
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Unlock Editorial Studio
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' 
            : toast.type === 'error'
            ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
            : 'bg-blue-950/90 border-blue-500/40 text-blue-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> : <AlertCircle size={18} className="text-rose-400 shrink-0" />}
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb & Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Main Admin
            </Link>
            <span>/</span>
            <span className="text-blue-400">Blog Publication Studio</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/updates"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Eye size={14} /> View Public /blog
            </Link>
            <button
              onClick={fetchArticles}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh database"
            >
              <RefreshCw size={15} />
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-rose-400 hover:bg-rose-950/30 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Lock Studio
            </button>
          </div>
        </div>

        {/* Studio Header & Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white flex items-center gap-3">
              Editorial Studio
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono font-bold">
                v2.0
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl font-medium">
              Review draft articles, inspect scheduled releases, edit rich markdown content, and approve pieces for instant public display on <code className="text-blue-400">/blog</code>.
            </p>
          </div>

          <button
            onClick={() => handleOpenEditor()}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-wider text-xs transition-all shadow-xl shadow-blue-600/25 hover:scale-[1.02] cursor-pointer shrink-0"
          >
            <Plus size={16} />
            Draft New Article
          </button>
        </div>

        {/* Counter Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => setStatusFilter('draft')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'draft' 
                ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5' 
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Staged Drafts</div>
            <div className="text-3xl font-display font-black text-white">{draftCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Pending review & approval</div>
          </div>

          <div 
            onClick={() => setStatusFilter('scheduled')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'scheduled' 
                ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/5' 
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-1">Scheduled</div>
            <div className="text-3xl font-display font-black text-white">{scheduledCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Automated future release</div>
          </div>

          <div 
            onClick={() => setStatusFilter('published')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'published' 
                ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Live Published</div>
            <div className="text-3xl font-display font-black text-white">{publishedCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Visible on /blog to public</div>
          </div>

          <div 
            onClick={() => setStatusFilter('all')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === 'all' 
                ? 'bg-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/5' 
                : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Total Catalog</div>
            <div className="text-3xl font-display font-black text-white">{posts.length}</div>
            <div className="text-[10px] text-slate-400 mt-1">All editorial entries</div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {(['all', 'draft', 'scheduled', 'published'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  statusFilter === tab 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab === 'all' ? 'All Articles' : tab}
              </button>
            ))}
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORY_OPTIONS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title or tag..."
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 pl-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-56"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Articles List / Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-28 text-slate-400">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-xs uppercase tracking-widest font-bold">Synchronizing with Supabase...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-16 text-center max-w-xl mx-auto">
            <BookOpen size={40} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
            <p className="text-xs text-slate-400 mb-6">
              There are no articles matching your current filter criteria.
            </p>
            <button
              onClick={() => { setStatusFilter('all'); setCategoryFilter('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const categoryMatch = CATEGORY_OPTIONS.find(c => c.id === post.category?.toLowerCase());
              const isDraft = (post.status || 'draft') === 'draft';
              const isScheduled = post.status === 'scheduled';
              const isPublished = post.status === 'published';

              return (
                <div 
                  key={post.id || post.slug}
                  className="bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group hover:bg-slate-900"
                >
                  {/* Left: Thumbnail & Info */}
                  <div className="flex items-start gap-4 sm:gap-5 w-full lg:w-2/3">
                    <div className="w-24 h-24 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 relative">
                      <img
                        src={post.cover_image_url || post.image_url || PRESET_COVERS[0].url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category Badge */}
                        <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${categoryMatch?.color || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                          {categoryMatch?.name || post.category}
                        </span>

                        {/* Status Badge */}
                        {isDraft && (
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Clock size={10} /> Draft (Staged)
                          </span>
                        )}
                        {isScheduled && (
                          <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Calendar size={10} /> Scheduled
                          </span>
                        )}
                        {isPublished && (
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 size={10} /> Published
                          </span>
                        )}

                        <span className="text-[11px] text-slate-500 font-mono">
                          /blog/{post.slug}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug truncate">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-1 font-normal">
                        {post.excerpt || 'No summary provided.'}
                      </p>

                      <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        <span>By {post.author || '123TheNextLevel'}</span>
                        {post.published_at && (
                          <span>Live since: {new Date(post.published_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end border-t lg:border-t-0 border-slate-800/80 pt-3 lg:pt-0">
                    {/* Primary Single-Click Action: Approve & Publish */}
                    {isDraft ? (
                      <button
                        onClick={() => handleApproveAndPublish(post)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer"
                      >
                        <Send size={13} />
                        Approve & Publish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRevertToDraft(post)}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Clock size={13} />
                        Move to Draft
                      </button>
                    )}

                    {/* Edit Article */}
                    <button
                      onClick={() => handleOpenEditor(post)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 size={13} />
                      Edit
                    </button>

                    {/* Preview in Reader View */}
                    <Link
                      to={`/blog/${post.slug}?preview=true`}
                      target="_blank"
                      className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Preview article reader view"
                    >
                      <ExternalLink size={15} />
                    </Link>

                    {/* Delete Article */}
                    <button
                      onClick={() => handleDeleteArticle(post)}
                      className="p-2 rounded-xl bg-slate-800/60 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FULL ARTICLE EDITOR MODAL                                                 */}
      {/* ========================================================================= */}
      {isEditorOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800 shrink-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white uppercase tracking-wide">
                  {editingPost.id ? 'Edit Article' : 'Draft New Article'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Refine publication details, cover graphics, and markdown formatting.
                </p>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Scrollable Area */}
            <div className="overflow-y-auto py-6 space-y-6 flex-1 pr-1 custom-scrollbar">
              
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    placeholder="e.g. Circadian Optimization Protocols"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Slug Identifier
                  </label>
                  <input
                    type="text"
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-blue-300 font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 2: Category, Status, Reading Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Category Pillar *
                  </label>
                  <select
                    value={editingPost.category || 'wellness'}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={editingPost.status || 'draft'}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="draft">Draft (Private / Staged)</option>
                    <option value="scheduled">Scheduled (Future Release)</option>
                    <option value="published">Published (Public)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Est. Reading Time (min)
                  </label>
                  <input
                    type="number"
                    value={editingPost.reading_time_minutes || 5}
                    onChange={(e) => setEditingPost({ ...editingPost, reading_time_minutes: parseInt(e.target.value) || 5 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 3: Cover Image Selector & CDN Presets */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4.5 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <ImageIcon size={14} className="text-blue-400" />
                    Cover Image Selection (1-Click Studio CDN Presets)
                  </label>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Public Supabase CDN</span>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {PRESET_COVERS.map(preset => {
                    const isSelected = (editingPost.cover_image_url || editingPost.image_url) === preset.url;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setEditingPost({ ...editingPost, cover_image_url: preset.url, image_url: preset.url })}
                        className={`relative rounded-xl overflow-hidden border p-1 text-left transition-all group cursor-pointer ${
                          isSelected 
                            ? 'border-blue-500 ring-2 ring-blue-500/40 bg-blue-500/10' 
                            : 'border-slate-800 hover:border-slate-700 bg-slate-900'
                        }`}
                      >
                        <div className="h-14 rounded-lg overflow-hidden mb-1.5 relative">
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-blue-600 rounded-full p-0.5 text-white">
                              <Check size={10} />
                            </div>
                          )}
                        </div>
                        <div className="text-[10px] font-bold text-slate-300 leading-tight line-clamp-1">{preset.name}</div>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <input
                    type="text"
                    value={editingPost.cover_image_url || editingPost.image_url || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, cover_image_url: e.target.value, image_url: e.target.value })}
                    placeholder="Custom image URL..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Row 4: Excerpt & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Excerpt Summary
                  </label>
                  <textarea
                    rows={3}
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    placeholder="Short 2-sentence overview for feed cards..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Tags (Comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={Array.isArray(editingPost.tags) ? editingPost.tags.join(', ') : (editingPost.tags || '')}
                    onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value.split(',').map(s => s.trim()) })}
                    placeholder="longevity, sleep, strength training..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none font-mono"
                  />
                </div>
              </div>

              {/* Row 5: Markdown Body & Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Markdown Article Body *
                  </label>

                  <div className="flex rounded-xl bg-slate-950 border border-slate-800 p-1">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editorTab === 'write' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Write Markdown
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        editorTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {editorTab === 'write' ? (
                  <textarea
                    rows={12}
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    placeholder="# Main Headline&#10;&#10;Write full article in Markdown syntax..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
                  />
                ) : (
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-200 max-w-none min-h-[300px] overflow-y-auto">
                    <h1 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">{editingPost.title || 'Untitled Post'}</h1>
                    <BlogMarkdownRenderer content={editingPost.content || ''} theme="dark" />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-slate-800 shrink-0">
              <div className="text-[11px] text-slate-500">
                Editing: <span className="text-slate-300 font-mono">{editingPost.slug || 'new-post'}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSaveArticle(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Draft'}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSaveArticle(true)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send size={13} />
                  {saving ? 'Publishing...' : 'Approve & Publish Now'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
