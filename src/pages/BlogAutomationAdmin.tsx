import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Clock, RefreshCw, Sparkles, Eye, Pencil, Database } from 'lucide-react';

export default function BlogAutomationAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [jobs, setJobs] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [queue, setQueue] = useState<Record<string, string | null>>({});
  const [queueError, setQueueError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [backendOffline, setBackendOffline] = useState(false);
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [statusColumnMissing, setStatusColumnMissing] = useState(false);
  const isOfflineRef = React.useRef(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials.');
    }
  };

  useEffect(() => {
    fetchData();
    fetchPendingReviews();
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

  const fetchData = async () => {
    try {
      const { data: jobsData } = await supabase.from('publish_jobs').select('*');
      const { data: logsData } = await supabase.from('publish_logs').select('*').order('created_at', { ascending: false }).limit(20);
      
      if (!isOfflineRef.current) {
        try {
          const queueRes = await fetch('/api/jobs/queue');
          if (queueRes.ok) {
            const queueData = await queueRes.json();
            setQueue(queueData);
            setQueueError(null);
            setBackendOffline(false);
            isOfflineRef.current = false;
          } else {
            // Check if it's a proxy error (Vite returns 504/502 on proxy fail)
            if (queueRes.status === 504 || queueRes.status === 502) {
              setBackendOffline(true);
              isOfflineRef.current = true;
            } else {
              const errData = await queueRes.json();
              setQueueError(errData.error || 'Failed to fetch queue');
            }
          }
        } catch (apiErr) {
          // This is where the ECONNREFUSED usually ends up in the browser console
          setBackendOffline(true);
          isOfflineRef.current = true;
          console.warn('Backend API is currently unreachable.');
        }
      }
      
      if (jobsData) setJobs(jobsData);
      if (logsData) setLogs(logsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunJob = async (category: string) => {
    try {
      // Optimistic UI update so the user instantly sees it running
      setJobs(prevJobs => {
        const newJobs = [...prevJobs];
        const index = newJobs.findIndex(j => j.category === category);
        if (index !== -1) {
          newJobs[index] = { ...newJobs[index], status: 'running' };
        } else {
          newJobs.push({ category, status: 'running' });
        }
        return newJobs;
      });

      const res = await fetch(`/api/jobs/${category}/run`, { method: 'POST' });
      const data = await res.json();
      
      // We removed the alert() because some browsers block it silently.
      // The UI now instantly updates to "running" (yellow dot).
      fetchData();
    } catch (error) {
      console.error('Error triggering job:', error);
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
                    <div className="aspect-video relative overflow-hidden">
                      <img src={post.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded uppercase tracking-widest mb-2 inline-block">Draft Article</span>
                        <h3 className="text-sm font-bold text-white line-clamp-1">{post.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between gap-3">
                      <a 
                        href={`/blog/${post.slug}?preview=true`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all border border-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </a>
                      <a 
                        href={`/admin?edit_id=${post.id}`} 
                        onClick={() => {
                          localStorage.setItem('admin_target_tab', 'blog');
                          localStorage.setItem('edit_blog_post_id', post.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-600/20"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit & Publish
                      </a>
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
        
        {/* Jobs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {['Health', 'Fitness', 'Nutrition', 'Wellness'].map((category) => {
            const job = jobs.find(j => j.category === category) || { status: 'idle' };
            
            return (
              <div key={category} className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <h3 className="text-xl font-semibold mb-4">{category} Pipeline</h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${job.status === 'running' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                  <span className="text-slate-300 capitalize">{job.status || 'idle'}</span>
                </div>

                <div className="mb-6 h-12">
                  <p className="text-xs text-slate-400 font-semibold mb-1">UP NEXT:</p>
                  <p className="text-sm text-slate-200 line-clamp-2">
                    {queueError ? (
                      <span className="text-red-400 text-xs" title={queueError}>Error checking queue</span>
                    ) : queue[category] ? (
                      `"${queue[category]}"`
                    ) : (
                      <span className="italic text-slate-500">Queue is empty</span>
                    )}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleRunJob(category)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Review Draft</span>
                  </button>
                  <button 
                    onClick={() => handleRunJob(category)}
                    className="p-2 border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
                    title="Retry Failed"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}
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
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                        post.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 
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
    </div>
  );
}
