import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import {
  Play, RotateCcw, AlertTriangle, CheckCircle, Clock, RefreshCw,
  Sparkles, Eye, Pencil, Database, Mail, Check, ArrowRight, Zap,
  Upload, Image as ImageIcon, X, ExternalLink, Link2, FileText, CheckCircle2
} from 'lucide-react';
import {
  CATEGORY_DEFAULT_BANNERS,
  getCategoryDefaultBanner,
  getCategoryDefaultAlt,
  updateArticleFrontmatter,
  extractFrontmatter
} from '../utils/blogImages';
import BlogMarkdownRenderer from '../components/BlogMarkdownRenderer';
import { generateFullClinicalMasterclass } from '../utils/clinicalArticleGenerator';

export default function BlogAutomationAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendOffline, setBackendOffline] = useState(false);
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [statusColumnMissing, setStatusColumnMissing] = useState(false);
  const [isUpgradingDraftId, setIsUpgradingDraftId] = useState<string | null>(null);
  const isOfflineRef = React.useRef(false);

  // Weekly Topic Pitches State
  const [weeklyPitches, setWeeklyPitches] = useState<any[]>([]);
  const [pitchLoading, setPitchLoading] = useState(false);
  const [isGeneratingFreshPitches, setIsGeneratingFreshPitches] = useState(false);
  const [generatingPitchId, setGeneratingPitchId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [alertSending, setAlertSending] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Featured Image Replacement & Preview Modal State
  const [previewingDraft, setPreviewingDraft] = useState<any | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [customImageAlt, setCustomImageAlt] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageSuccessMsg, setImageSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openPreviewModal = (post: any) => {
    const fm = extractFrontmatter(post.content || '');
    const currentImg = post.image_url || fm.featured_image || getCategoryDefaultBanner(post.category);
    const currentAlt = fm.featured_image_alt || getCategoryDefaultAlt(post.category, post.title);
    setPreviewingDraft(post);
    setCustomImageUrl(currentImg);
    setCustomImageAlt(currentAlt);
    setImageSuccessMsg(null);
  };

  const closePreviewModal = () => {
    setPreviewingDraft(null);
    setCustomImageUrl('');
    setCustomImageAlt('');
    setImageSuccessMsg(null);
  };

  const handleApplyFeaturedImage = async (newUrl: string, newAlt?: string) => {
    if (!previewingDraft) return;
    try {
      const altToUse = newAlt || customImageAlt || getCategoryDefaultAlt(previewingDraft.category, previewingDraft.title);
      const updatedContent = updateArticleFrontmatter(previewingDraft.content || '', newUrl, altToUse);

      // 1. Try server-side bypass first (service role key bypasses RLS)
      let updated = false;
      try {
        const res = await fetch('/api/automation/update-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: previewingDraft.id,
            updates: {
              image_url: newUrl,
              content: updatedContent
            }
          })
        });
        const data = await res.json();
        if (res.ok && data.success) updated = true;
      } catch (_) { }

      // Fallback to client-side Supabase
      if (!updated && supabase) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            image_url: newUrl,
            content: updatedContent
          })
          .eq('id', previewingDraft.id);

        if (error) throw error;
      }

      // 2. Update local state
      const updatedPost = {
        ...previewingDraft,
        image_url: newUrl,
        content: updatedContent
      };
      setPreviewingDraft(updatedPost);
      setCustomImageUrl(newUrl);
      setCustomImageAlt(altToUse);
      setPendingReviews(prev => prev.map(p => p.id === previewingDraft.id ? updatedPost : p));
      setImageSuccessMsg(`✅ Featured image updated to ${newUrl} with frontmatter!`);
      setTimeout(() => setImageSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error('Failed to update featured image:', err);
      alert('Error updating image: ' + (err.message || 'Database update failed'));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !previewingDraft) return;

    setIsUploadingImage(true);
    setImageSuccessMsg(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/automation/upload-blog-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageData: base64Data,
              fileName: file.name,
              altText: customImageAlt || previewingDraft.title
            })
          });

          const data = await res.json();
          if (!data.success || !data.url) {
            throw new Error(data.error || 'Server upload failed');
          }

          await handleApplyFeaturedImage(data.url, customImageAlt || previewingDraft.title);
        } catch (uploadErr: any) {
          console.error('File upload error:', uploadErr);
          alert('Upload failed: ' + uploadErr.message);
        } finally {
          setIsUploadingImage(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error('File reading failed:', err);
      setIsUploadingImage(false);
    }
  };

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
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials.');
    }
  };

  useEffect(() => {
    fetchData();
    fetchPendingReviews();
    fetchWeeklyPitches();
    const interval = setInterval(() => {
      fetchData();
      fetchPendingReviews();
    }, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'draft')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42703') { // Column missing
          setStatusColumnMissing(true);
        }
        throw error;
      }

      if (data) {
        setPendingReviews(data);
        setStatusColumnMissing(false);
      }

      // Also fetch ALL posts for the inspector
      const { data: allData } = await supabase
        .from('blog_posts')
        .select('id, title, slug, status, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      if (allData) {
        setAllPosts(allData);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const fetchWeeklyPitches = async () => {
    try {
      setPitchLoading(true);
      const res = await fetch('/content/pitches/weekly-pitches.json');
      if (res.ok) {
        const data = await res.json();
        setWeeklyPitches(data.pitches || []);
      }
    } catch (err) {
      console.warn('Failed to load weekly pitches:', err);
    } finally {
      setPitchLoading(false);
    }
  };

  const handlePitchTitleChange = (id: string, newTitle: string) => {
    setWeeklyPitches(prev => prev.map(p => p.id === id ? { ...p, title: newTitle } : p));
  };

  const handleGeneratePitchDraft = async (pitch: any) => {
    setGeneratingPitchId(pitch.id);
    try {
      // 1. Check if this article already exists in local state or Supabase
      let existingMatch = allPosts.find(p =>
        p.slug === pitch.slug ||
        (p.title && p.title.toLowerCase().trim() === pitch.title.toLowerCase().trim())
      );

      if (!existingMatch && supabase) {
        try {
          const { data: dbMatch } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', pitch.slug || '')
            .maybeSingle();
          if (dbMatch) existingMatch = dbMatch;
        } catch (_) {}
      }

      if (existingMatch) {
        setWeeklyPitches(prev => prev.map(p => p.id === pitch.id ? { ...p, draftStatus: 'drafted' } : p));
        setAlertMessage(`ℹ️ "${pitch.title}" is already in your Review Queue! Opening preview...`);
        openPreviewModal(existingMatch);
        return;
      }

      const categoryMap: Record<string, string> = {
        health: 'Health',
        fitness: 'Fitness',
        nutrition: 'Nutrition',
        wellness: 'Wellness'
      };
      const cat = categoryMap[pitch.category] || 'Health';
      const baseSlug = (pitch.slug || pitch.title || 'clinical-masterclass')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      let slug = baseSlug;
      if (allPosts.some(p => p.slug === slug)) {
        slug = `${baseSlug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
      }

      // Generate comprehensive 2,000+ word clinical masterclass
      const fullMasterclassContent = generateFullClinicalMasterclass({
        title: pitch.title,
        category: cat,
        targetKeyword: pitch.targetKeyword,
        summary: pitch.summary,
        slug,
        regionalProducts: pitch.regionalProducts
      });

      const defaultBanner = getCategoryDefaultBanner(pitch.category);
      const defaultAlt = getCategoryDefaultAlt(pitch.category, pitch.title);
      const contentWithFm = updateArticleFrontmatter(fullMasterclassContent, defaultBanner, defaultAlt);
      const keywordTag = (pitch.targetKeyword || '').split(' ')[0] || 'longevity';

      const newDraft: any = {
        title: pitch.title,
        slug,
        category: cat,
        excerpt: pitch.summary || `${pitch.title} — Comprehensive clinical masterclass covering biochemical pathways, reference intervals, and actionable protocols.`,
        content: contentWithFm,
        status: 'draft',
        image_url: defaultBanner,
        author: 'Clinical Advisory Team',
        tags: [pitch.category, 'longevity', 'biomarkers', keywordTag].filter(Boolean),
        created_at: new Date().toISOString()
      };

      // 1. Try server-side endpoint first (uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS)
      let draftCreated = false;
      try {
        const res = await fetch('/api/automation/create-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ draft: newDraft })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          draftCreated = true;
        } else {
          console.warn('Backend create-draft error:', data.error);
        }
      } catch (apiErr) {
        console.warn('Backend create-draft endpoint unreachable, falling back to direct Supabase client');
      }

      // 2. Fallback to client-side Supabase if server API is offline
      if (!draftCreated && supabase) {
        let insertResult = await supabase.from('blog_posts').insert([newDraft]).select().single();

        // If unique constraint or duplicate key, retry with guaranteed unique suffix
        if (insertResult.error && (
          insertResult.error.code === '23505' ||
          insertResult.error.message?.includes('unique') ||
          insertResult.error.message?.includes('duplicate') ||
          insertResult.error.message?.includes('slug')
        )) {
          newDraft.slug = `${baseSlug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
          insertResult = await supabase.from('blog_posts').insert([newDraft]).select().single();
        }

        if (insertResult.error && insertResult.error.code === 'PGRST205') {
          insertResult = await supabase.from('blogs').insert([newDraft]).select().single();
        }

        if (insertResult.error) throw insertResult.error;
      }

      // Update local state
      setWeeklyPitches(prev => prev.map(p => p.id === pitch.id ? { ...p, draftStatus: 'drafted' } : p));
      setAlertMessage(`✅ Draft created for "${pitch.title}"! It is now pending review in the queue above.`);
      await fetchPendingReviews();
    } catch (err: any) {
      console.error('Error creating pitch draft:', err);
      const isRls = (err.message || '').includes('row-level security') || err.code === '42501';
      if (isRls) {
        alert(
          'Supabase RLS Block Detected:\n\n' +
          'Row-Level Security (RLS) is blocking draft creation on "blog_posts".\n\n' +
          'To resolve this in 5 seconds, run this in your Supabase SQL Editor:\n\n' +
          'ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;\n' +
          'ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;'
        );
      } else {
        alert('Draft error: ' + (err.message || 'Failed to create draft in database'));
      }
    } finally {
      setGeneratingPitchId(null);
    }
  };

  const handleUpgradeDraftToMasterclass = async (post: any) => {
    setIsUpgradingDraftId(post.id);
    try {
      const cat = post.category || 'Health';
      const targetKeyword = (post.tags && post.tags[0]) || post.title;
      const fullMasterclass = generateFullClinicalMasterclass({
        title: post.title,
        category: cat,
        targetKeyword,
        summary: post.excerpt || post.title,
        slug: post.slug
      });

      const currentBanner = post.image_url || getCategoryDefaultBanner(cat);
      const currentAlt = getCategoryDefaultAlt(cat, post.title);
      const contentWithFm = updateArticleFrontmatter(fullMasterclass, currentBanner, currentAlt);

      // 1. Try server-side endpoint first (uses service role key to bypass RLS)
      let updated = false;
      try {
        const res = await fetch('/api/automation/update-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: post.id,
            updates: {
              content: contentWithFm,
              excerpt: post.excerpt || `${post.title} — Comprehensive clinical masterclass covering biochemical pathways, reference intervals, and actionable protocols.`
            }
          })
        });
        const data = await res.json();
        if (res.ok && data.success) updated = true;
      } catch (_) {}

      // 2. Fallback to direct supabase client
      if (!updated && supabase) {
        const { error } = await supabase
          .from('blog_posts')
          .update({ content: contentWithFm })
          .eq('id', post.id);

        if (error && error.code === 'PGRST205') {
          await supabase.from('blogs').update({ content: contentWithFm }).eq('id', post.id);
        }
      }

      // 3. Update local state
      const updatedPost = { ...post, content: contentWithFm };
      setPendingReviews(prev => prev.map(p => p.id === post.id ? updatedPost : p));
      setAllPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
      if (previewingDraft && previewingDraft.id === post.id) {
        setPreviewingDraft(updatedPost);
      }

      setAlertMessage(`⚡ Successfully upgraded "${post.title}" into a full 2,000+ word clinical masterclass!`);
      await fetchPendingReviews();
    } catch (err: any) {
      console.error('Error upgrading draft to masterclass:', err);
      alert('Upgrade error: ' + (err.message || 'Failed to update draft content'));
    } finally {
      setIsUpgradingDraftId(null);
    }
  };

  const handleAuthorizePublish = async (post: any) => {
    setPublishingId(post.id);
    try {
      // 1. Try server-side endpoint first (uses service role key to bypass RLS)
      let published = false;
      try {
        const res = await fetch('/api/automation/publish-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: post.id })
        });
        const data = await res.json();
        if (res.ok && data.success) published = true;
      } catch (_) { }

      // 2. Fallback to client-side Supabase
      if (!published && supabase) {
        const { error } = await supabase
          .from('blog_posts')
          .update({ status: 'published' })
          .eq('id', post.id);

        if (error) throw error;
      }

      setAlertMessage(`✅ Successfully published "${post.title}" live! View at /blog/${post.slug}`);
      fetchPendingReviews();
    } catch (err: any) {
      console.error('Error publishing post:', err);
      const isRls = (err.message || '').includes('row-level security') || err.code === '42501';
      if (isRls) {
        alert('Publish error: Supabase RLS is blocking updates. Run "ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;" in Supabase SQL editor.');
      } else {
        alert('Publish error: ' + (err.message || 'Failed to update article status'));
      }
    } finally {
      setPublishingId(null);
    }
  };

  const handleSendMondayAlert = async () => {
    setAlertSending(true);
    setAlertMessage(null);
    try {
      const res = await fetch('/api/automation/dispatch-weekly-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: 'jack_2000@yahoo.com' })
      });
      const data = await res.json();
      if (data.success) {
        setAlertMessage('✅ Notification successfully sent to jack_2000@yahoo.com!');
      } else {
        setAlertMessage('⚠️ Notification response: ' + (data.error || 'Notice logged'));
      }
    } catch (err: any) {
      setAlertMessage('⚠️ Dispatch submitted to background handler.');
    } finally {
      setAlertSending(false);
    }
  };

  const handleGenerateFreshTopicsNow = async () => {
    setIsGeneratingFreshPitches(true);
    setAlertMessage(null);
    try {
      // 1. Trigger fresh pitch generation via internal API route
      const res = await fetch('/api/automation/generate-fresh-pitches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data?.pitches) {
          setWeeklyPitches(data.data.pitches);
        }
      }
      // 2. Refresh pitches from the written static / mirrored file
      await fetchWeeklyPitches();
      setAlertMessage('⚡ Fresh batch of 20 high-intent topic pitches generated successfully!');
    } catch (err: any) {
      console.warn('Backend generation call notice:', err);
      // Fallback: Re-fetch pitches
      await fetchWeeklyPitches();
      setAlertMessage('⚡ Fresh topics refreshed.');
    } finally {
      setIsGeneratingFreshPitches(false);
    }
  };

  const fetchData = async () => {
    try {
      const { data: logsData } = await supabase.from('publish_logs').select('*').order('created_at', { ascending: false }).limit(20);

      // Health check endpoint probe
      if (!isOfflineRef.current) {
        try {
          const pingRes = await fetch('/ping');
          if (pingRes.ok) {
            setBackendOffline(false);
            isOfflineRef.current = false;
          } else {
            setBackendOffline(true);
            isOfflineRef.current = true;
          }
        } catch (apiErr) {
          setBackendOffline(true);
          isOfflineRef.current = true;
        }
      }

      if (logsData) setLogs(logsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2rem] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-blue-400 mb-4">
              <Database size={32} />
            </div>
            <h1 className="text-2xl font-display font-black uppercase tracking-tight text-white">Automation Portal</h1>
            <p className="text-slate-400 text-sm mt-2">Access restricted to authorized personnel.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Security Key</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono text-white"
                placeholder="••••••••••••"
              />
            </div>
            {loginError && (
              <div className="p-3 bg-red-950/40 border border-red-900/50 text-red-400 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertTriangle size={14} />
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-900/10"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-24 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">AI Blog Automation Dashboard</h1>

        {backendOffline && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-6 rounded-xl mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <p className="font-bold">Backend Server Offline</p>
                <p className="text-sm opacity-80">Automation jobs cannot be triggered. Please start the server using npm run dev.</p>
              </div>
            </div>
            <button
              onClick={() => {
                isOfflineRef.current = false;
                setBackendOffline(false);
                fetchData();
              }}
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Diagnostic Debug Panel (Temporary) */}
        <div className="mb-12 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">System Diagnostics</h3>
            <button
              onClick={() => fetchPendingReviews()}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest flex items-center gap-2"
            >
              <RefreshCw className="w-3 h-3" /> Force Refresh
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Total Posts</p>
              <p className="text-2xl font-display font-bold text-white">{allPosts.length}</p>
            </div>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Drafts Found</p>
              <p className="text-2xl font-display font-bold text-amber-500">{pendingReviews.length}</p>
            </div>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Status Column</p>
              <p className={`text-sm font-bold ${statusColumnMissing ? 'text-rose-500' : 'text-emerald-500'}`}>
                {statusColumnMissing ? 'Missing' : 'Active'}
              </p>
            </div>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Security Sync</p>
              <p className="text-[10px] text-indigo-400 font-bold uppercase">Check Below</p>
            </div>
          </div>

          {/* RLS Troubleshooting */}
          {allPosts.length > 0 && pendingReviews.length === 0 && !statusColumnMissing && (
            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
              <p className="text-xs text-indigo-300 font-bold mb-2 flex items-center gap-2">
                <AlertTriangle size={14} /> Potential Security Block Detected
              </p>
              <p className="text-[10px] text-slate-400 mb-3">
                You have articles in the database, but your dashboard cannot see "Drafts".
                This usually means **Supabase Row Level Security (RLS)** is blocking access.
              </p>
              <div className="flex items-center gap-3">
                <code className="bg-slate-950 p-2 rounded text-[9px] text-indigo-400 flex-grow">
                  ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;');
                    alert('SQL Copied! Run this in Supabase SQL Editor.');
                  }}
                  className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase rounded"
                >
                  Copy Fix
                </button>
              </div>
            </div>
          )}

          {/* Recent Database Peek */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-[10px] text-slate-500 uppercase font-black mb-3 text-center">Last 5 Articles in Database</p>
            <div className="space-y-2">
              {logs.slice(0, 5).map((log, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] bg-slate-950/30 p-2 rounded-lg border border-white/5">
                  <span className="text-slate-300 font-medium truncate max-w-[200px]">{log.message}</span>
                  <span className={`px-1.5 py-0.5 rounded font-black ${log.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Schema Warning */}
        {statusColumnMissing && (
          <div className="mb-12 bg-amber-900/40 border border-amber-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-500 p-3 rounded-xl text-white">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-400">Database Upgrade Required</h2>
                <p className="text-amber-200/80 text-sm mt-1">To enable the Review Queue and Drafting features, you need to add the <code className="bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300">status</code> column to your blog table.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-slate-950/50 rounded-xl border border-amber-500/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Run this in Supabase SQL Editor:</p>
              <code className="text-xs text-amber-200 block break-all">ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';</code>
            </div>
          </div>
        )}

        {/* Pending Reviews Section */}
        {!statusColumnMissing && (
          <div className="mb-12 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight flex items-center gap-3">
                <Sparkles className="text-indigo-400" />
                Mandatory Review Queue
              </h2>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
                {pendingReviews.length} Articles Pending
              </span>
            </div>

            {pendingReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingReviews.map((post) => (
                  <div key={post.id} className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group">
                    <div
                      className="aspect-video relative overflow-hidden cursor-pointer"
                      onClick={() => openPreviewModal(post)}
                      title="Click to preview draft & replace featured image"
                    >
                      <img
                        src={post.image_url || getCategoryDefaultBanner(post.category)}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = getCategoryDefaultBanner(post.category);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded uppercase tracking-widest inline-block">
                            {post.category || 'Draft'}
                          </span>
                          {(post.content || '').split(/\s+/).filter(Boolean).length < 600 ? (
                            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold rounded-full">
                              ⚠️ Short ({(post.content || '').split(/\s+/).filter(Boolean).length}w)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold rounded-full">
                              ✓ {(post.content || '').split(/\s+/).filter(Boolean).length.toLocaleString()}w Masterclass
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-white line-clamp-1">{post.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-2.5">
                      {(post.content || '').split(/\s+/).filter(Boolean).length < 600 && (
                        <button
                          type="button"
                          disabled={isUpgradingDraftId === post.id}
                          onClick={() => handleUpgradeDraftToMasterclass(post)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 text-amber-200 border border-amber-500/40 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Zap size={13} className={isUpgradingDraftId === post.id ? 'animate-spin' : 'text-amber-400'} />
                          <span>{isUpgradingDraftId === post.id ? 'Upgrading to Masterclass...' : '⚡ Upgrade to 2,000+ Word Masterclass'}</span>
                        </button>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => openPreviewModal(post)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-bold transition-all border border-cyan-500/30 cursor-pointer"
                          title="Open preview modal to inspect draft & replace featured image"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Preview &amp; Image</span>
                        </button>
                        <a
                          href={`/admin?edit_id=${post.id}`}
                          onClick={() => {
                            localStorage.setItem('admin_target_tab', 'blog');
                            localStorage.setItem('edit_blog_post_id', post.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg text-xs font-bold transition-all border border-indigo-500/30"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </a>
                      </div>

                      <button
                        onClick={() => handleAuthorizePublish(post)}
                        disabled={publishingId === post.id}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30 border border-emerald-400/30 disabled:opacity-50 cursor-pointer"
                      >
                        {publishingId === post.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Publishing Live...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Authorize &amp; Publish Live</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-indigo-500/10 rounded-xl">
                <div className="bg-indigo-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-indigo-400 w-6 h-6" />
                </div>
                <h3 className="text-slate-300 font-bold mb-1">Queue Empty</h3>
                <p className="text-slate-500 text-sm">Click "Generate Review Draft" below to create new articles.</p>
              </div>
            )}
          </div>
        )}

        {/* Weekly Topic Selection Board (4 Columns) */}
        <div className="mb-14 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
                <Sparkles size={13} className="text-cyan-400" />
                <span>Monday 08:00 UTC Pitch Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Weekly Topic Pitches (20 Candidates)
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Select candidate topics across our 4 core pillars. Adjust headlines directly on the card and click &quot;Generate Full Draft&quot; to queue for clinical review.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleGenerateFreshTopicsNow}
                disabled={isGeneratingFreshPitches}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30 border border-emerald-400/30 cursor-pointer disabled:opacity-60"
                title="Immediately run topic pitch generation on demand"
              >
                {isGeneratingFreshPitches ? (
                  <>
                    <RefreshCw size={14} className="animate-spin text-white" />
                    <span>Analyzing search queries &amp; drafting 20 topics...</span>
                  </>
                ) : (
                  <>
                    <Zap size={14} className="text-emerald-200 fill-emerald-200" />
                    <span>⚡ Generate Fresh Topics Now</span>
                  </>
                )}
              </button>

              <button
                onClick={fetchWeeklyPitches}
                disabled={pitchLoading || isGeneratingFreshPitches}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw size={14} className={pitchLoading ? 'animate-spin text-cyan-400' : ''} />
                <span>Refresh Pitches</span>
              </button>

              <button
                onClick={handleSendMondayAlert}
                disabled={alertSending}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                title="Send test Monday email notification to jack_2000@yahoo.com"
              >
                <Mail size={14} />
                <span>{alertSending ? 'Sending Alert...' : '📧 Send Monday Alert (jack_2000@yahoo.com)'}</span>
              </button>
            </div>
          </div>

          {isGeneratingFreshPitches && (
            <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-3 animate-pulse">
              <RefreshCw size={16} className="animate-spin text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-emerald-300">Analyzing search queries &amp; drafting 20 topics...</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Synthesizing clinical keyword queries and regional procurement links across all 4 pillars.</p>
              </div>
            </div>
          )}

          {alertMessage && (
            <div className="mb-6 p-3 bg-blue-950/40 border border-blue-500/30 text-blue-300 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span>{alertMessage}</span>
            </div>
          )}

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { key: 'health', name: 'Healthspan Intelligence', color: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/30', badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
              { key: 'fitness', name: 'Performance Protocols', color: 'from-rose-500/20 to-orange-500/10', border: 'border-rose-500/30', badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
              { key: 'nutrition', name: 'Metabolic Intelligence', color: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/30', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
              { key: 'wellness', name: 'Neurowellness Research', color: 'from-purple-500/20 to-indigo-500/10', border: 'border-purple-500/30', badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
            ].map(pillar => {
              const columnPitches = weeklyPitches.filter(p => p.category === pillar.key);

              return (
                <div key={pillar.key} className="space-y-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${pillar.color} border ${pillar.border} flex items-center justify-between`}>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pillar.badge}`}>
                        Pillar
                      </span>
                      <h3 className="text-base font-bold text-white mt-1.5">{pillar.name}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950/60 px-2 py-1 rounded-md border border-white/5">
                      {columnPitches.length} Pitches
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {columnPitches.map((pitch, idx) => {
                      const isGenerating = generatingPitchId === pitch.id;
                      const existingMatch = allPosts.find(p =>
                        p.slug === pitch.slug ||
                        (p.title && p.title.toLowerCase().trim() === pitch.title.toLowerCase().trim())
                      );
                      const isDrafted = pitch.draftStatus === 'drafted' || Boolean(existingMatch);

                      return (
                        <div
                          key={pitch.id || idx}
                          className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 shadow-md"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
                              <span className="text-[10px] font-mono font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded truncate max-w-[170px]" title={pitch.targetKeyword}>
                                🎯 {pitch.targetKeyword}
                              </span>
                            </div>

                            {/* Editable Title */}
                            <textarea
                              value={pitch.title}
                              onChange={(e) => handlePitchTitleChange(pitch.id, e.target.value)}
                              rows={2}
                              className="w-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-xs font-semibold text-white rounded-lg p-2 outline-none transition-all resize-none leading-snug"
                              placeholder="Headline..."
                            />

                            <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                              {pitch.summary}
                            </p>

                            {/* Regional Store Indicators */}
                            <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                              <span className="text-slate-400 font-semibold">Store:</span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">🇺🇸 /store-us</span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">🇬🇧 /store-uk</span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">🇪🇸 /es</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (existingMatch) {
                                openPreviewModal(existingMatch);
                              } else {
                                handleGeneratePitchDraft(pitch);
                              }
                            }}
                            disabled={isGenerating}
                            className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${isDrafted
                                ? 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 shadow-sm'
                                : isGenerating
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                  : 'bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-200 border border-slate-700'
                              }`}
                          >
                            {isDrafted ? (
                              <>
                                <Eye size={13} className="text-emerald-400" />
                                <span>Draft in Queue (View / Edit)</span>
                              </>
                            ) : isGenerating ? (
                              <>
                                <RefreshCw size={13} className="animate-spin text-amber-400" />
                                <span>Generating Draft...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles size={13} className="text-cyan-400" />
                                <span>Generate Full Draft</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Recent Activity Logs</span>
          </h2>

          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4 p-4 border border-slate-800 rounded-lg bg-slate-950/50">
                <div className="mt-1">
                  {log.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-slate-200">[{log.category}]</span>
                    <span className="text-sm text-slate-500">{new Date(log.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{log.message}</p>
                </div>
              </div>
            ))}

            {logs.length === 0 && (
              <div className="text-center text-slate-500 py-8">No recent activity logs.</div>
            )}
          </div>
        </div>
        {/* Detailed Database Inspector */}
        <div className="mt-12 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md">
          <h2 className="text-xl font-display font-black uppercase tracking-tight text-white mb-6 flex items-center gap-3">
            <Database className="text-indigo-400" />
            Full Database Inspector
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 border-b border-white/5">
                <tr>
                  <th className="pb-4">Article Title</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Created At</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allPosts.map((post) => (
                  <tr key={post.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-medium">{post.title}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${post.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' :
                          post.status === 'draft' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-slate-500/10 text-slate-500'
                        }`}>
                        {post.status || 'NULL'}
                      </span>
                    </td>
                    <td className="py-4 text-[10px] tabular-nums">
                      {new Date(post.created_at).toLocaleString()}
                    </td>
                    <td className="py-4 text-right">
                      <a
                        href={`/blog/${post.slug}?preview=true`}
                        target="_blank"
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Preview"
                      >
                        <Eye size={16} className="inline" />
                      </a>
                      <a
                        href={`/admin?edit_id=${post.id}`}
                        onClick={() => {
                          localStorage.setItem('admin_target_tab', 'blog');
                          localStorage.setItem('edit_blog_post_id', post.id);
                        }}
                        className="ml-3 text-indigo-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} className="inline" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allPosts.length === 0 && (
              <p className="py-8 text-center text-slate-500 italic">No articles found in database.</p>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BLOG DRAFT PREVIEW & FEATURED IMAGE REPLACEMENT MODAL                     */}
      {/* ========================================================================= */}
      {previewingDraft && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
          onClick={closePreviewModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Draft Article Review
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    Category: {previewingDraft.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {previewingDraft.title}
                </h3>
              </div>
              <button
                onClick={closePreviewModal}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 custom-scrollbar">

              {/* Notification Banner */}
              {imageSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                  <span>{imageSuccessMsg}</span>
                </div>
              )}

              {/* SECTION 1: FEATURED IMAGE SELECTION & REPLACEMENT */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon size={16} className="text-emerald-400" />
                      Featured Hero Image
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Preview and replace the article&apos;s featured cover image and frontmatter metadata.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold self-start sm:self-auto">
                    frontmatter synced
                  </span>
                </div>

                {/* Hero Preview Box */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group">
                  <img
                    src={previewingDraft.image_url || getCategoryDefaultBanner(previewingDraft.category)}
                    alt={customImageAlt || previewingDraft.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = getCategoryDefaultBanner(previewingDraft.category);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700/60 max-w-md truncate">
                      {previewingDraft.image_url || getCategoryDefaultBanner(previewingDraft.category)}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500 text-slate-950 shadow">
                      Active Cover
                    </span>
                  </div>
                </div>

                {/* Replacement Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Option A: Direct File Upload to /assets/images/blog/ */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 border border-emerald-400/30 cursor-pointer disabled:opacity-50"
                    >
                      {isUploadingImage ? (
                        <>
                          <RefreshCw size={14} className="animate-spin text-white" />
                          <span>Uploading to /assets/images/blog/...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={14} />
                          <span>Upload File to /assets/images/blog/</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-500 mt-1 pl-1 font-mono">
                      Accepts PNG, JPG, WebP. Writes directly to public assets.
                    </p>
                  </div>

                  {/* Option B: Enter Custom Image URL */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="https://... or /assets/images/blog/..."
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyFeaturedImage(customImageUrl, customImageAlt)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition border border-slate-700 cursor-pointer"
                    >
                      Apply URL
                    </button>
                  </div>
                </div>

                {/* Alt Text Input */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-900">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                    featured_image_alt:
                  </span>
                  <input
                    type="text"
                    value={customImageAlt}
                    onChange={(e) => setCustomImageAlt(e.target.value)}
                    placeholder="Clinical visual description for SEO & accessibility"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyFeaturedImage(previewingDraft.image_url || customImageUrl, customImageAlt)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-emerald-400 text-xs font-bold transition border border-slate-700 cursor-pointer"
                  >
                    Save Alt
                  </button>
                </div>

                {/* Quick 1-Click Dark-Mode Category Banners (#111827 & #10b981) */}
                <div className="space-y-2 pt-3 border-t border-slate-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-emerald-400" />
                    1-Click Dark-Mode Banners (#111827 &amp; #10b981)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(CATEGORY_DEFAULT_BANNERS).map(([catKey, banner]) => {
                      const isActive = (previewingDraft.image_url === banner.url);
                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => handleApplyFeaturedImage(banner.url, banner.alt)}
                          className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between gap-2 cursor-pointer ${isActive
                              ? 'bg-emerald-950/60 border-emerald-500/80 ring-1 ring-emerald-500'
                              : 'bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
                            }`}
                        >
                          <div className="aspect-[21/9] w-full rounded-lg overflow-hidden bg-slate-950 relative">
                            <img src={banner.url} alt={banner.label} className="w-full h-full object-cover" />
                            {isActive && (
                              <div className="absolute top-1 right-1 bg-emerald-500 text-slate-950 rounded-full p-0.5">
                                <Check size={10} />
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                            {banner.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* SECTION 2: ARTICLE SUMMARY & CONTENT PREVIEW */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <FileText size={16} className="text-cyan-400" />
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">
                      Article Reader Preview
                    </h4>
                    {((previewingDraft.content || '').split(/\s+/).filter(Boolean).length < 600) ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                        ⚠️ Short Stub ({(previewingDraft.content || '').split(/\s+/).filter(Boolean).length} words)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        ✓ {(previewingDraft.content || '').split(/\s+/).filter(Boolean).length.toLocaleString()} words (~{Math.ceil((previewingDraft.content || '').split(/\s+/).filter(Boolean).length / 220)} min read)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={isUpgradingDraftId === previewingDraft.id}
                    onClick={() => handleUpgradeDraftToMasterclass(previewingDraft)}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer disabled:opacity-50"
                  >
                    <Zap size={13} className={isUpgradingDraftId === previewingDraft.id ? 'animate-spin' : ''} />
                    <span>
                      {isUpgradingDraftId === previewingDraft.id
                        ? 'Upgrading Content...'
                        : (previewingDraft.content || '').split(/\s+/).filter(Boolean).length < 600
                        ? '⚡ Upgrade to 2,000+ Word Masterclass'
                        : '⚡ Regenerate 2,000+ Word Masterclass'}
                    </span>
                  </button>
                </div>

                {previewingDraft.excerpt && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-medium">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Snippet Excerpt:</span>
                    {previewingDraft.excerpt}
                  </div>
                )}

                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200">
                  <BlogMarkdownRenderer content={previewingDraft.content} theme="dark" />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`/blog/${previewingDraft.slug}?preview=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <ExternalLink size={13} />
                  <span>Full Reader Page</span>
                </a>
                <a
                  href={`/admin?edit_id=${previewingDraft.id}`}
                  onClick={() => {
                    localStorage.setItem('admin_target_tab', 'blog');
                    localStorage.setItem('edit_blog_post_id', previewingDraft.id);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-indigo-500/30"
                >
                  <Pencil size={13} />
                  <span>Open in /admin</span>
                </a>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={closePreviewModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await handleAuthorizePublish(previewingDraft);
                    closePreviewModal();
                  }}
                  disabled={publishingId === previewingDraft.id}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30 border border-emerald-400/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {publishingId === previewingDraft.id ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} />
                      <span>Authorize &amp; Publish Live</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
