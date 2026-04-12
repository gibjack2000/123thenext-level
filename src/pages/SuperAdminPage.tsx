import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, hasValidSupabaseConfig, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { Save, AlertCircle, CheckCircle2, Sparkles, Database, Copy, ExternalLink, ChevronDown, ChevronUp, Shield, Cpu, Trash2, RefreshCw, Search, Tag, MapPin, Star, BookOpen, FileText, Pencil } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Product, BlogPost, mapToProduct } from '../types';

const REGIONS = ['US', 'UK', 'ES'];
const PRODUCT_CATEGORIES = ['fitness_gear', 'health_wellness', 'home_kitchen', 'tech_gadgets', 'supplements'];
const BLOG_CATEGORIES = ['health', 'fitness', 'nutrition', 'wellness'];
const CURRENCIES = ['USD', 'GBP', 'EUR'];
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function SuperAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'blog'>('products');
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingBlogImage, setIsGeneratingBlogImage] = useState(false);
  const [generatedBlogImage, setGeneratedBlogImage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  // Product Management State
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Blog Management State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [fetchingBlog, setFetchingBlog] = useState(false);
  const [editingBlogPostId, setEditingBlogPostId] = useState<string | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const blogTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedProductToLink, setSelectedProductToLink] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('all');

  const fetchProducts = useCallback(async () => {
    if (!hasValidSupabaseConfig || !supabase) return;
    
    setFetchingProducts(true);
    try {
      const { data, error } = await supabase
        .from('amazon_affiliate_products')
        .select('*')
        .order('last_updated', { ascending: false });
        
      if (error) throw error;
      setProducts(data ? data.map(mapToProduct) : []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setFetchingProducts(false);
    }
  }, []);

  const fetchBlogPosts = useCallback(async () => {
    if (!hasValidSupabaseConfig || !supabase) return;
    
    setFetchingBlog(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        if (error.code === '42P01') {
          setError('The "blog_posts" table does not exist. Please run the SQL schema at the bottom of the page.');
        }
        throw error;
      }
      setBlogPosts(data as BlogPost[] || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setFetchingBlog(false);
    }
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (!supabase || !window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('amazon_affiliate_products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      if (editingProductId === id) {
        setEditingProductId(null);
        setFormData({
          region: 'US',
          category: 'fitness_gear',
          product_name: '',
          amazon_asin: '',
          amazon_url: '',
          image_url: '',
          short_benefit: '',
          description: '',
          price: '',
          currency: 'USD',
          rating: '5.0',
          featured: false,
          tags: '',
        });
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      region: product.region,
      category: product.category,
      product_name: product.product_name,
      amazon_asin: product.amazon_asin || '',
      amazon_url: product.amazon_url,
      image_url: product.image_url || '',
      short_benefit: product.short_benefit || '',
      description: product.description || '',
      price: product.price.toString(),
      currency: product.currency || 'USD',
      rating: product.rating.toString(),
      featured: product.featured || false,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setFormData({
      region: 'US',
      category: 'fitness_gear',
      product_name: '',
      amazon_asin: '',
      amazon_url: '',
      image_url: '',
      short_benefit: '',
      description: '',
      price: '',
      currency: 'USD',
      rating: '5.0',
      featured: false,
      tags: '',
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchBlogPosts();
    }
  }, [isAuthenticated, fetchProducts, fetchBlogPosts]);

  const sqlSchema = `create table amazon_affiliate_products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  market text not null,
  category text not null,
  title text not null,
  asin text,
  affiliate_link text not null,
  image_url text,
  cta text,
  description text,
  price numeric not null,
  currency text default 'USD',
  rating numeric default 5.0,
  is_active boolean default false,
  "Amazon tag" text,
  tags text[] default '{}',
  last_updated timestamp with time zone
);

create table blog_posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  category text not null,
  title text not null,
  slug text not null unique,
  author text not null,
  content text not null,
  image_url text,
  image_url_2 text,
  image_url_3 text,
  affiliate_url text,
  excerpt text,
  tags text[] default '{}',
  featured boolean default false
);

-- Enable Realtime
alter publication supabase_realtime add table amazon_affiliate_products;
alter publication supabase_realtime add table blog_posts;

-- Allow public access
alter table amazon_affiliate_products disable row level security;
alter table blog_posts disable row level security;`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [formData, setFormData] = useState({
    region: 'US',
    category: 'fitness_gear',
    product_name: '',
    amazon_asin: '',
    amazon_url: '',
    image_url: '',
    short_benefit: '',
    description: '',
    price: '',
    currency: 'USD',
    rating: '5.0',
    featured: false,
    tags: '',
  });

  const [blogFormData, setBlogFormData] = useState({
    category: 'health',
    title: '',
    slug: '',
    author: 'The Next Level Team',
    content: '',
    image_url: '',
    excerpt: '',
    tags: '',
    featured: false,
    description: '',
    linkedProductId: '', // Primary
    additionalProductIds: [] as string[],
    additionalImage1: '',
    additionalImage2: '',
    is_html: false,
    draftMode: 'ai' as 'ai' | 'manual',
  });

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setBlogFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      if (name === 'title' && !editingBlogPostId) {
        newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      
      return newData;
    });
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingBlogPostId(post.id);
    setBlogFormData({
      category: post.category,
      title: post.title,
      slug: post.slug,
      author: post.author,
      content: post.content,
      image_url: post.image_url || '',
      additionalImage1: post.image_url_2 || '',
      additionalImage2: post.image_url_3 || '',
      excerpt: post.excerpt || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      featured: post.featured || false,
    });
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (id: string) => {
    if (!supabase || !window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setBlogPosts(prev => prev.filter(p => p.id !== id));
      if (editingBlogPostId === id) {
        setEditingBlogPostId(null);
        setBlogFormData({
          category: 'health',
          title: '',
          slug: '',
          author: 'The Next Level Team',
          content: '',
          image_url: '',
          excerpt: '',
          tags: '',
          featured: false,
        });
      }
    } catch (err) {
      console.error('Error deleting blog post:', err);
      alert('Failed to delete blog post.');
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!hasValidSupabaseConfig || !supabase) {
      setError('Cannot save blog post in Demo Mode.');
      setLoading(false);
      return;
    }

    try {
      const postData = {
        title: blogFormData.title,
        slug: blogFormData.slug,
        category: blogFormData.category,
        author: blogFormData.author,
        excerpt: blogFormData.excerpt,
        content: blogFormData.content,
        image_url: blogFormData.image_url || `https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800`,
        image_url_2: blogFormData.additionalImage1,
        image_url_3: blogFormData.additionalImage2,
        affiliate_url: products.find(p => p.id === blogFormData.linkedProductId)?.amazon_url || '',
        featured: blogFormData.featured,
        tags: blogFormData.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (editingBlogPostId) {
        const { error: supabaseError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingBlogPostId);

        if (supabaseError) throw supabaseError;
      } else {
        const { error: supabaseError } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (supabaseError) throw supabaseError;
      }

      setSuccess(true);
      setEditingBlogPostId(null);
      setBlogFormData({
        category: 'health',
        title: '',
        slug: '',
        author: 'The Next Level Team',
        content: '',
        image_url: '',
        excerpt: '',
        tags: '',
        featured: false,
      });
      fetchBlogPosts();
    } catch (err: any) {
      console.error('Error saving blog post:', err);
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenerateAI = async () => {
    try {
      const apiKey = GEMINI_KEY;
      if (!apiKey) {
        setError('Gemini AI Key is missing.');
        return;
      }
      if (!formData.product_name && !formData.amazon_url) {
        setError('Please enter a Product Name or Amazon URL first.');
        return;
      }

      setIsGenerating(true);
      setError(null);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-flash-latest',
        generationConfig: {
          responseMimeType: 'application/json',
        }
      });

      const prompt = `Analyze the product and generate a JSON marketing copy:
Product Name: ${formData.product_name || 'Unknown'}
Product URL: ${formData.amazon_url || 'Unknown'}
Provide a short benefit (1 sentence highlight), a description (2-3 sentences), and 3-5 tags (comma-separated).`;

      const response = await model.generateContent(prompt);
      const aiText = response.response.text();
      
      if (aiText) {
        const data = JSON.parse(aiText);
        setFormData(prev => ({
          ...prev,
          short_benefit: data.short_benefit || prev.short_benefit,
          description: data.description || prev.description,
          tags: data.tags || prev.tags
        }));
      }
    } catch (err: any) {
      console.error('AI ERROR:', err);
      setError('Blog AI Failed (v2.5+ mode): ' + (err.message || 'Check console.'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateBlogAI = async () => {
    try {
      const apiKey = GEMINI_KEY;
      if (!apiKey) {
        setError('Gemini AI Key is missing.');
        return;
      }
      if (!blogFormData.title) {
        setError('Please enter a Blog Title first.');
        return;
      }

      setIsGenerating(true);
      setError(null);
      
      const primaryProduct = products.find(p => p.id === blogFormData.linkedProductId);
      const otherProducts = products.filter(p => blogFormData.additionalProductIds.includes(p.id));
      const allProducts = [...(primaryProduct ? [primaryProduct] : []), ...otherProducts];
      
      // No extra initialization needed here as it's done below correctly
      const prompt = `
        You are a premium content creator for 123TheNextLevel.
        Task: Generate an engaging, descriptive, and informative blog post of approximately 300 words.
        
        Core Input:
        Title: ${blogFormData.title}
        
        Contextual Info (Optional):
        Brief Description/Goal: ${blogFormData.description || 'Create a highly engaging and informative health/wellness article based on the title provided. Be descriptive and use a premium tone.'}
        
        Featured Products (Mention and Link these!):
        ${allProducts.map(p => `- ${p.product_name} (Link: ${p.amazon_url})`).join('\n')}
        
        ${blogFormData.additionalImage1 || blogFormData.additionalImage2 
          ? `Additional Images to embed (Use Markdown ![alt](url)):
             ${blogFormData.additionalImage1 ? `- Image 1 URL: ${blogFormData.additionalImage1}` : ''}
             ${blogFormData.additionalImage2 ? `- Image 2 URL: ${blogFormData.additionalImage2}` : ''}
             IMPORTANT: ONLY embed these specific images if URLs are provided. Do NOT use placeholder URLs.` 
          : 'Additional Images: None provided. Do not include any extra images in the markdown.'}
        
        Requirements:
        1. Length: Approximately 300 words.
        2. Format: Markdown with clear, punchy headers (##, ###).
        3. Tone: Authoritative, descriptive, and premium.
        4. Strategy: If only a title is provided, use your expertise to craft a comprehensive guide, narrative, or tip-list that adds real value to the reader.
        5. Images: Only embed images provided in the context. Never guess image URLs.
        6. Output ONLY a valid JSON object with keys: "slug", "excerpt", "content", "tags" (array).
      `;

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-flash-latest',
        generationConfig: {
          responseMimeType: 'application/json',
        }
      });
      
      const response = await model.generateContent(prompt);
      const aiText = response.response.text();
      
      if (aiText) {
        const data = JSON.parse(aiText);
        setBlogFormData(prev => ({
          ...prev,
          slug: data.slug || prev.slug,
          excerpt: data.excerpt || prev.excerpt,
          content: data.content || prev.content,
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : prev.tags
        }));
      }
    } catch (err: any) {
      console.error('BLOG AI ERROR:', err);
      setError('Blog AI Failed (v2.5+ mode): ' + (err.message || 'Check console.'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
      setError('Note: Real visual generation is restricted in browser.');
  };

  const applyGeneratedImage = () => {
    if (generatedImage) {
      setFormData(prev => ({ ...prev, image_url: generatedImage }));
      setGeneratedImage(null);
    }
  };

  const handleGenerateBlogImage = async () => {};
  const applyGeneratedBlogImage = () => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!hasValidSupabaseConfig || !supabase) {
      setError('Cannot save product in Demo Mode.');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        market: formData.region,
        asin: formData.amazon_asin,
        title: formData.product_name,
        image_url: formData.image_url || `https://picsum.photos/seed/${encodeURIComponent(formData.product_name || 'product')}/600/400`,
        price: parseFloat(formData.price) || 0,
        category: formData.category,
        rating: parseFloat(formData.rating) || 0,
        description: formData.description,
        affiliate_link: formData.amazon_url,
        is_active: formData.featured,
        last_updated: new Date().toISOString(),
        cta: formData.short_benefit || 'Buy Now',
        "Amazon tag": "123thenextlevel-20"
      };

      if (editingProductId) {
        const { error: supabaseError } = await supabase
          .from('amazon_affiliate_products')
          .update(productData)
          .eq('id', editingProductId);
        if (supabaseError) throw supabaseError;
      } else {
        const { error: supabaseError } = await supabase
          .from('amazon_affiliate_products')
          .insert([productData]);
        if (supabaseError) throw supabaseError;
      }

      setSuccess(true);
      setEditingProductId(null);
      setFormData(prev => ({ ...prev, product_name: '', amazon_asin: '', amazon_url: '', image_url: '', short_benefit: '', description: '', price: '', tags: '', featured: false }));
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const insertAffiliateLink = () => {
    const textarea = blogTextareaRef.current;
    if (!textarea || !selectedProductToLink) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = blogFormData.content.substring(start, end);
    const product = products.find(p => p.id === selectedProductToLink);

    if (!product) return;

    // Default to product name if no text is selected
    const linkText = selectedText || product.product_name;
    const markdownLink = `[${linkText}](${product.amazon_url})`;

    const newContent = 
      blogFormData.content.substring(0, start) + 
      markdownLink + 
      blogFormData.content.substring(end);

    setBlogFormData(prev => ({ ...prev, content: newContent }));
    
    // Reset selection after a short delay to allow UI to update
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + markdownLink.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const superPassword = import.meta.env.VITE_SUPERADMIN_PASSWORD || 'superadmin123';
    if (passwordInput === superPassword) {
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem('isSuperAdminAuthenticated', 'true');
    } else {
      setLoginError('Incorrect SuperAdmin password');
      setPasswordInput('');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('isSuperAdminAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] w-full max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900 mb-2">SuperAdmin Access</h1>
          <p className="text-slate-500 mb-8 font-medium">Please enter your specialized credentials to access critical system tools.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="SuperAdmin key..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-center font-bold tracking-widest text-lg"
                autoFocus
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-bold animate-pulse">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Authenticate Securely
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display uppercase tracking-tight text-slate-900 mb-2">SuperAdmin Command Center</h1>
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px]">Level: Elevated Permissions</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hidden sm:block">
           <span className="text-xs font-bold text-indigo-700">Root Access Active</span>
        </div>
      </div>

      {success && (
        <div className="mb-8 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center">
          <CheckCircle2 className="mr-3 shrink-0" size={20} />
          <p className="font-medium">Changes synchronized with master database!</p>
        </div>
      )}

      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center">
          <AlertCircle className="mr-3 shrink-0" size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}
        >
          Product Architecture
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'blog' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}
        >
          Content Ecosystem
        </button>
      </div>

      {activeTab === 'products' ? (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Database size={24} />
            </div>
            <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900">
              {editingProductId ? 'Edit Core Product' : 'Initialize New Product'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
              <select name="region" value={formData.region} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 outline-none">
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 outline-none">
                {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 outline-none">
                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Identity *</label>
              <input required type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amazon ASIN</label>
              <input type="text" name="amazon_asin" value={formData.amazon_asin} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 outline-none" />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Affiliate Link Protocol *</label>
             <input required type="url" name="amazon_url" value={formData.amazon_url} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl disabled:opacity-50">
              {loading ? 'Processing...' : 'Synchronize Product Data'}
            </button>
            {editingProductId && <button onClick={cancelEdit} className="w-full bg-slate-100 text-slate-600 font-bold py-3 rounded-xl">Revert</button>}
          </div>
        </form>
      ) : (
        <form onSubmit={handleBlogSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
           <div className="flex items-center justify-between border-b pb-4">
             <h2 className="text-xl font-display uppercase tracking-tight text-slate-900">Content Deployment System</h2>
             
             <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-xl border border-slate-200">
               <button
                 type="button"
                 onClick={() => setBlogFormData(prev => ({ ...prev, draftMode: 'ai' }))}
                 className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all ${blogFormData.draftMode === 'ai' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 AI Architect
               </button>
               <button
                 type="button"
                 onClick={() => setBlogFormData(prev => ({ ...prev, draftMode: 'manual' }))}
                 className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all ${blogFormData.draftMode === 'manual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Manual Entry
               </button>
             </div>

             {blogFormData.draftMode === 'ai' && (
               <button
                 type="button"
                 onClick={handleGenerateBlogAI}
                 disabled={isGenerating}
                 className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-all text-xs border border-indigo-100 disabled:opacity-50"
               >
                 {isGenerating ? <div className="animate-spin h-3 w-3 border-b-2 border-indigo-700 rounded-full" /> : <Sparkles size={14} />}
                 Draft with AI
               </button>
             )}
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
               <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Article Title *</label>
                 <input required type="text" name="title" value={blogFormData.title} onChange={handleBlogChange} placeholder="e.g. The Power of Vitamin D" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>

               <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Category</label>
                 <select name="category" value={blogFormData.category} onChange={handleBlogChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none capitalize">
                   {BLOG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                 </select>
               </div>

               {blogFormData.draftMode === 'ai' ? (
                 <>
                   <div>
                     <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Brief Description / Goal (Optional)</label>
                     <textarea name="description" value={blogFormData.description} onChange={handleBlogChange} rows={2} placeholder="Add a specific angle or leave blank for a general informative article..." className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                   </div>
                   
                   <div>
                     <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Link Multiple Products</label>
                     <div className="space-y-2 mt-1">
                        <select 
                          className="w-full p-2 border rounded-lg text-sm"
                          onChange={(e) => {
                            if (!e.target.value) return;
                            setBlogFormData(prev => ({
                              ...prev,
                              additionalProductIds: prev.additionalProductIds.includes(e.target.value) 
                                ? prev.additionalProductIds 
                                : [...prev.additionalProductIds, e.target.value]
                            }));
                          }}
                          value=""
                        >
                          <option value="">-- Click to add product --</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.product_name}</option>
                          ))}
                        </select>
                        <div className="flex flex-wrap gap-2">
                          {blogFormData.additionalProductIds.map(id => {
                            const p = products.find(prod => prod.id === id);
                            return (
                              <span key={id} className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold border border-indigo-100">
                                {p?.product_name || 'Product'}
                                <button type="button" onClick={() => setBlogFormData(prev => ({ ...prev, additionalProductIds: prev.additionalProductIds.filter(pid => pid !== id) }))}>×</button>
                              </span>
                            );
                          })}
                        </div>
                     </div>
                   </div>
                 </>
               ) : (
                 <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                   <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">
                    Manual mode allows you to supply pre-written content or raw HTML blocks. 
                   </p>
                   <label className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" name="is_html" checked={blogFormData.is_html} onChange={handleBlogChange} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                     <span className="text-[10px] font-bold text-slate-700 uppercase">Input contains Raw HTML</span>
                   </label>
                 </div>
               )}

               <div className="pt-4 border-t border-slate-100 space-y-4 opacity-80 hover:opacity-100 transition-opacity">
                 <div className="flex items-center justify-between">
                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Supplementary Visuals</label>
                   <span className="text-[9px] font-black px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full uppercase tracking-widest">Optional</span>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest pl-1">Image Link 1</span>
                     <input 
                       type="text" 
                       name="additionalImage1"
                       value={blogFormData.additionalImage1}
                       onChange={handleBlogChange}
                       className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 focus:bg-white transition-all focus:ring-2 focus:ring-indigo-500 outline-none" 
                       placeholder="https://example.com/image1.jpg" 
                     />
                     {blogFormData.additionalImage1 && (
                       <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                         <img src={blogFormData.additionalImage1} className="w-full h-full object-cover" alt="Preview 1" />
                       </div>
                     )}
                   </div>

                   <div className="space-y-1">
                     <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest pl-1">Image Link 2</span>
                     <input 
                       type="text" 
                       name="additionalImage2"
                       value={blogFormData.additionalImage2}
                       onChange={handleBlogChange}
                       className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 focus:bg-white transition-all focus:ring-2 focus:ring-indigo-500 outline-none" 
                       placeholder="https://example.com/image2.jpg" 
                     />
                     {blogFormData.additionalImage2 && (
                       <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                         <img src={blogFormData.additionalImage2} className="w-full h-full object-cover" alt="Preview 2" />
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Article Content (Markdown)</label>
                    <div className="flex items-center gap-2">
                       <select 
                         className="text-[10px] p-1 border rounded bg-slate-50 font-bold"
                         value={selectedProductToLink}
                         onChange={(e) => setSelectedProductToLink(e.target.value)}
                       >
                         <option value="">-- Link a Product --</option>
                         {products.map(p => (
                           <option key={p.id} value={p.id}>{p.product_name}</option>
                         ))}
                       </select>
                       <button 
                         type="button"
                         onClick={insertAffiliateLink}
                         disabled={!selectedProductToLink}
                         className="p-1 px-2 bg-indigo-600 text-white rounded text-[10px] font-black uppercase tracking-tighter hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                       >
                         <ExternalLink size={10} /> Link Text
                       </button>
                    </div>
                  </div>
                  <textarea 
                    ref={blogTextareaRef}
                    required 
                    name="content" 
                    value={blogFormData.content} 
                    onChange={handleBlogChange} 
                    rows={12} 
                    className="w-full p-2.5 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[300px]" 
                    placeholder="Draft will appear here..." 
                  />
                </div>
              </div>
           </div>

           <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2">
             {loading ? <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full" /> : <Save size={20} />}
             Deploy Blog Content
           </button>
        </form>
      )}

      {/* Blog Management List */}
      <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-display uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <FileText size={22} className="text-indigo-600" /> Recent Content Architecture
          </h3>
          <div className="flex items-center gap-2">
            <select 
              className="text-[10px] font-bold uppercase p-2 border rounded-xl"
              value={blogCategoryFilter}
              onChange={(e) => setBlogCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="pl-9 pr-4 py-2 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                value={blogSearchQuery}
                onChange={(e) => setBlogSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {fetchingBlog ? (
            <div className="flex justify-center py-12">
               <div className="animate-spin h-8 w-8 border-b-2 border-indigo-600 rounded-full" />
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium">No articles found in the ecosystem.</div>
          ) : (
            blogPosts
              .filter(p => blogCategoryFilter === 'all' || p.category === blogCategoryFilter)
              .filter(p => p.title.toLowerCase().includes(blogSearchQuery.toLowerCase()))
              .map(post => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-200">
                         <img src={post.image_url || ''} className="w-full h-full object-cover" alt="Thumb" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-0.5">
                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[9px] font-black uppercase tracking-widest">{post.category}</span>
                            {post.featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[9px] font-black uppercase tracking-widest">Featured</span>}
                         </div>
                         <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{post.title}</h4>
                         <p className="text-[10px] text-slate-400 font-medium font-mono">{post.slug}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditBlog(post)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                         <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDeleteBlog(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                         <Trash2 size={16} />
                      </button>
                   </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Database Management */}
      <div className="mt-12 bg-slate-900 p-8 rounded-3xl border border-slate-800">
        <h3 className="text-white font-display uppercase tracking-tighter text-lg mb-4 flex items-center gap-2">
          <Database size={20} className="text-indigo-400" /> System Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Total Assets</span>
              <span className="text-2xl font-black text-white">{products.length}</span>
           </div>
           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Articles</span>
              <span className="text-2xl font-black text-white">{blogPosts.length}</span>
           </div>
           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Engine Status</span>
              <span className="text-xs font-bold text-emerald-400">OPTIMIZED</span>
           </div>
           <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Security Level</span>
              <span className="text-xs font-bold text-indigo-400">MAXIMUM</span>
           </div>
        </div>
      </div>
    </div>
  );
}
