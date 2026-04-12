import React, { useState, useEffect, useCallback } from 'react';
import { supabase, hasValidSupabaseConfig, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { Save, AlertCircle, CheckCircle2, Sparkles, Database, Copy, ExternalLink, ChevronDown, ChevronUp, Shield, Cpu, Trash2, RefreshCw, Search, Tag, MapPin, Star, BookOpen, FileText, Pencil } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { Product, BlogPost, mapToProduct } from '../types';

const REGIONS = ['US', 'UK', 'ES'];
const PRODUCT_CATEGORIES = ['fitness_gear', 'health_wellness', 'home_kitchen', 'tech_gadgets', 'supplements'];
const BLOG_CATEGORIES = ['health', 'fitness', 'nutrition', 'wellness'];
const CURRENCIES = ['USD', 'GBP', 'EUR'];
// Gemini API Key - fallback ensures AI features always work
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDu4wqfISnPtU8JNUwGaW2tUUAPtOzsAk0';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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
    fetchProducts();
    fetchBlogPosts();
  }, [fetchProducts, fetchBlogPosts]);

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
  excerpt text,
  tags text[] default '{}',
  featured boolean default false
);

-- Enable Realtime
alter publication supabase_realtime add table amazon_affiliate_products;
alter publication supabase_realtime add table blog_posts;

-- Allow public access (Since Admin doesn't use Auth in this demo)
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
  });

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setBlogFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Auto-generate slug from title if slug is empty or we're editing title
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

  const handleGenerateBlogForProduct = (product: Product) => {
    setActiveTab('blog');
    setBlogFormData(prev => ({
      ...prev,
      title: `How ${product.product_name} Can Transform Your Health`,
      content: `### Introduction\n\nHealth and wellness are the foundation of a high-performance life. Today, we're looking at how the **${product.product_name}** fits into your routine.\n\n### Product Analysis\n\n[View the product here](${product.amazon_url})\n\n${product.description || 'Analysis incoming...'}\n\n### Why it Matters\n\n${product.short_benefit || 'This product provides essential support for your health journey.'}`,
      image_url: product.image_url || '',
      excerpt: `Discover the wellness benefits of ${product.product_name} and how it can elevate your daily routine.`,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : 'health, wellness, ' + product.category,
    }));
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        ...blogFormData,
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
        setError('Gemini AI Key is missing. Please add GEMINI_API_KEY to your env/secrets.');
        return;
      }

      if (!formData.product_name && !formData.amazon_url) {
        setError('Please enter a Product Name or Amazon URL first.');
        return;
      }

      setIsGenerating(true);
      setError(null);
      console.log('🤖 Starting AI Generation...');

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Analyze the product and generate a JSON marketing copy:
Product Name: ${formData.product_name || 'Unknown'}
Product URL: ${formData.amazon_url || 'Unknown'}

Provide a short benefit (1 sentence highlight), a description (2-3 sentences), and 3-5 tags (comma-separated).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              short_benefit: { type: 'STRING' },
              description: { type: 'STRING' },
              tags: { type: 'STRING' }
            },
            required: ["short_benefit", "description", "tags"]
          }
        }
      });

      const aiText = response.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('🤖 AI Raw Response:', aiText);

      if (aiText) {
        let jsonStr = aiText;
        const start = jsonStr.indexOf('{');
        const end = jsonStr.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          jsonStr = jsonStr.slice(start, end + 1);
        }
        
        const data = JSON.parse(jsonStr);
        setFormData(prev => ({
          ...prev,
          short_benefit: data.short_benefit || prev.short_benefit,
          description: data.description || prev.description,
          tags: data.tags || prev.tags
        }));
      } else {
        throw new Error('The AI returned no content candidates.');
      }
    } catch (err: any) {
      console.error('❌ AI ERROR:', err);
      setError('AI Failed: ' + (err.message || 'Check console for errors.'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateBlogAI = async () => {
    try {
      const apiKey = GEMINI_KEY;
      
      if (!apiKey) {
        setError('Gemini API Key is missing.');
        return;
      }

      if (!blogFormData.title) {
        setError('Please enter a Blog Title first.');
        return;
      }

      setIsGenerating(true);
      setError(null);
      console.log('📝 Generating Blog content...');

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Generate a blog post (JSON):
Title: ${blogFormData.title}
Category: ${blogFormData.category}

Output JSON: "slug", "excerpt", "content" (Markdown). At least 500 words. 2-3 real authoritative links.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              slug: { type: 'STRING' },
              excerpt: { type: 'STRING' },
              content: { type: 'STRING' }
            },
            required: ["slug", "excerpt", "content"]
          }
        }
      });

      const aiText = response.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (aiText) {
        let jsonStr = aiText;
        const start = jsonStr.indexOf('{');
        const end = jsonStr.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          jsonStr = jsonStr.slice(start, end + 1);
        }
        
        const data = JSON.parse(jsonStr);
        setBlogFormData(prev => ({
          ...prev,
          slug: data.slug || prev.slug,
          excerpt: data.excerpt || prev.excerpt,
          content: data.content || prev.content
        }));
      } else {
        throw new Error('No blog content generated.');
      }
    } catch (err: any) {
      console.error('❌ BLOG AI ERROR:', err);
      setError('Blog AI Failed: ' + (err.message || 'Check console.'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const apiKey = GEMINI_KEY;
      
      if (!apiKey) {
        setError('Gemini API Key is missing.');
        return;
      }

      if (!formData.amazon_url && !formData.product_name) {
        setError('Please enter a Product Name or URL.');
        return;
      }

      setIsGeneratingImage(true);
      setError(null);
      console.log('🎨 Generating image...');

      const ai = new GoogleGenAI({ apiKey });
      
      let visualPrompt = `A professional lifestyle product photograph of: ${formData.product_name || 'the product at this URL'}. High resolution, cinematic lighting.`;
      
      const analysisResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: formData.amazon_url ? `Describe the visual appearance of this product for a photo: ${formData.amazon_url}` : visualPrompt }] }],
      });

      const visualDescription = analysisResponse.candidates?.[0]?.content?.parts?.[0]?.text || formData.product_name;

      // Note: Image generation via gemini-2.0-flash is not directly supported in the same way as Imagen.
      // We'll attempt a multimodal generation if supported by the model, or log a limitation.
      setError('Note: Real visual generation (Imagen) is restricted in browser. The AI is analyzing the product visual description.');
    } catch (err: any) {
      console.error('❌ IMAGE ERROR:', err);
      setError('Image Generation failed: ' + (err.message || 'Check console.'));
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const applyGeneratedImage = () => {
    if (generatedImage) {
      setFormData(prev => ({ ...prev, image_url: generatedImage }));
      setGeneratedImage(null);
    }
  };

  const handleGenerateBlogImage = async () => {
    const apiKey = GEMINI_KEY;
    
    if (!apiKey) {
      setError('Gemini API Key is missing. Please add GEMINI_API_KEY to your AI Studio Secrets (⚙️ Settings > Secrets).');
      return;
    }

    if (!blogFormData.title) {
      setError('Please enter a Blog Title first so the AI knows what to visualize.');
      return;
    }

    setIsGeneratingBlogImage(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      let visualPrompt = `You are a world-class art director. The user is writing a blog post titled: "${blogFormData.title}". 
Generate an incredibly interesting, highly engaging, and deeply relatable visual concept for the background hero image of this post. Describe the scene, lighting, mood, and atmosphere in vivid detail. Make it stand out and perfectly relevant to the topic.`;
      
      const analysisResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: visualPrompt }] }],
      });

      const visualDescription = analysisResponse.text || blogFormData.title;

      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
          role: 'user',
          parts: [
            {
              text: `A stunning, highly engaging, and visually interesting hero background image depicting: ${visualDescription}. Masterpiece, hyper-detailed, breathtaking lighting, modern editorial styling, vibrant and evocative. Make it perfectly relatable to the topic.`,
            },
          ],
        }],
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      let base64Image = '';
      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          base64Image = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (base64Image) {
        setGeneratedBlogImage(base64Image);
      } else {
        throw new Error('The AI failed to generate an image part.');
      }
    } catch (err: any) {
      console.error('Blog Image Generation failed:', err);
      setError('Blog Image Generation failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsGeneratingBlogImage(false);
    }
  };

  const applyGeneratedBlogImage = () => {
    if (generatedBlogImage) {
      setBlogFormData(prev => ({ ...prev, image_url: generatedBlogImage }));
      setGeneratedBlogImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!hasValidSupabaseConfig || !supabase) {
      setError('Cannot save product in Demo Mode. Please connect to Supabase in Settings.');
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

        if (supabaseError) {
          if (supabaseError.code === '42P01') {
            throw new Error('The "amazon_affiliate_products" table does not exist in your Supabase database. Please run the SQL schema provided at the bottom of this page.');
          }
          throw supabaseError;
        }
      }

      setSuccess(true);
      setEditingProductId(null);
      // Reset form partially
      setFormData(prev => ({
        ...prev,
        product_name: '',
        amazon_asin: '',
        amazon_url: '',
        image_url: '',
        short_benefit: '',
        description: '',
        price: '',
        tags: '',
        featured: false,
      }));
      fetchProducts(); // Refresh the list
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

    // Authentication is disabled as per user request

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display uppercase tracking-tight text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">
          {editingProductId ? 'Edit existing product details.' : 'Add new affiliate products to your database.'}
        </p>
      </div>

      {!hasValidSupabaseConfig && (
        <div className="mb-8 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start">
          <AlertCircle className="mr-3 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold">Demo Mode Active</h3>
            <p className="text-sm mt-1">You are currently viewing mock data. To actually save products, you need to add your Supabase credentials in the AI Studio settings.</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-8 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center">
          <CheckCircle2 className="mr-3 shrink-0" size={20} />
          <p className="font-medium">
            {editingProductId ? 'Product successfully updated!' : 'Product successfully added to database!'}
          </p>
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
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'products' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'blog' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}
        >
          Manage Blog Posts
        </button>
      </div>

      {activeTab === 'products' ? (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
          <div className="bg-slate-900 p-2 rounded-lg text-white">
            <Save size={24} />
          </div>
          <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900">
            {editingProductId ? 'Edit Product' : 'Add New Product'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
            <select name="region" value={formData.region} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
            <input required type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g. ProFit Dumbbells" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amazon ASIN</label>
            <input type="text" name="amazon_asin" value={formData.amazon_asin} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g. B08XXXXX1" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amazon Affiliate URL *</label>
            <input required type="url" name="amazon_url" value={formData.amazon_url} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="https://amzn.to/..." />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Image URL</label>
              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 flex items-center gap-1 disabled:opacity-50"
              >
                {isGeneratingImage ? (
                  <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-indigo-600"></div>
                ) : (
                  <Sparkles size={10} />
                )}
                Magic Visualizer
              </button>
            </div>
            <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="https://..." />
            
            {generatedImage && (
              <div className="mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-[10px] font-bold text-indigo-600 uppercase mb-2">Generated Preview</p>
                <div className="aspect-square w-32 rounded-lg overflow-hidden mb-2 border border-white shadow-sm">
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={applyGeneratedImage}
                  className="text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Apply Image
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price *</label>
            <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="199.99" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rating (0-5)</label>
            <input required type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div className="flex items-center h-full pt-6">
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.featured ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.featured ? 'translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                Featured Product (Show on Home Page)
              </div>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Marketing Copy</h3>
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors text-sm"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-700 mr-2"></div>
              ) : (
                <Sparkles size={16} className="mr-2" />
              )}
              Auto-fill with AI
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Short Benefit *</label>
              <input required type="text" name="short_benefit" value={formData.short_benefit} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="One sentence highlight..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Mini-review or comparison copy..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="fitness, home gym, weights" />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          <label htmlFor="featured" className="ml-2 block text-sm font-medium text-slate-900">
            Feature on Homepage (Top Pick)
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <Save size={20} className="mr-2" />
            )}
            {editingProductId ? 'Update Product' : 'Save Product'}
          </button>
          
          {editingProductId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-3 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      ) : (
        <form onSubmit={handleBlogSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 mb-6">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" />
              Start with a Product
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select a Product to Base Article On</label>
                <select 
                  className="w-full rounded-xl border-slate-200 border p-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                  onChange={(e) => {
                    const p = products.find(prod => prod.id === e.target.value);
                    if (p) handleGenerateBlogForProduct(p);
                  }}
                  value=""
                >
                  <option value="">-- Select from your database --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.product_name}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-slate-400 italic mb-2">
                Selecting a product will automatically fill the title, excerpt, and drafting area with product-specific details.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900">
                {editingBlogPostId ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h2>
            </div>
            <button
              type="button"
              onClick={handleGenerateBlogAI}
              disabled={isGenerating}
              className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors text-sm"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-700 mr-2"></div>
              ) : (
                <Sparkles size={16} className="mr-2" />
              )}
              Auto-fill Blog with AI
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input required type="text" name="title" value={blogFormData.title} onChange={handleBlogChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g. 10 Tips for Better Sleep" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug *</label>
              <input required type="text" name="slug" value={blogFormData.slug} onChange={handleBlogChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g. 10-tips-for-better-sleep" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={blogFormData.category} onChange={handleBlogChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
              <input type="text" name="author" value={blogFormData.author} onChange={handleBlogChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">Featured Image URL</label>
                <button
                  type="button"
                  onClick={handleGenerateBlogImage}
                  disabled={isGeneratingBlogImage}
                  className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 flex items-center gap-1 disabled:opacity-50"
                >
                  {isGeneratingBlogImage ? (
                    <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-indigo-600"></div>
                  ) : (
                    <Sparkles size={10} />
                  )}
                  Magic Visualizer
                </button>
              </div>
              <input type="url" name="image_url" value={blogFormData.image_url} onChange={handleBlogChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="https://..." />
              
              {generatedBlogImage && (
                <div className="mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase mb-2">Generated Preview</p>
                  <div className="aspect-video w-full rounded-lg overflow-hidden mb-2 border border-white shadow-sm">
                    <img src={generatedBlogImage} alt="Generated" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={applyGeneratedBlogImage}
                    className="text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Apply Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt (Short Summary) *</label>
            <textarea required name="excerpt" value={blogFormData.excerpt} onChange={handleBlogChange} rows={2} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="A brief summary of the post..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content (Markdown supported) *</label>
            <textarea required name="content" value={blogFormData.content} onChange={handleBlogChange} rows={12} className="w-full rounded-lg border-slate-300 border p-2.5 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Write your post content here..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={blogFormData.tags} onChange={handleBlogChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="sleep, health, routine" />
            </div>
            <div className="flex items-center h-full pt-6">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={blogFormData.featured}
                    onChange={handleBlogChange}
                    className="sr-only"
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${blogFormData.featured ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${blogFormData.featured ? 'translate-x-4' : ''}`}></div>
                </div>
                <div className="ml-3 text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                  Featured Post
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Save size={20} className="mr-2" />
              )}
              {editingBlogPostId ? 'Update Post' : 'Save Post'}
            </button>
            
            {editingBlogPostId && (
              <button
                type="button"
                onClick={() => {
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
                }}
                className="px-6 py-3 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div className="mt-12 pt-12 border-t border-slate-200 space-y-8">
        {/* Supabase Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Database size={24} />
            </div>
            <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900">Supabase Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Connection</h3>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${hasValidSupabaseConfig ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <span className="font-medium text-slate-900">
                  {hasValidSupabaseConfig ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {hasValidSupabaseConfig ? 'Database is active.' : 'Running in Demo Mode.'}
              </p>
            </div>

            <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Required AI Studio Secrets</h3>
                <a 
                  href="https://supabase.com/dashboard/project/_/settings/api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={10} />
                  Find these in Project Settings &gt; API
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Secret Name</span>
                  <code className="text-xs font-mono text-blue-600 font-bold">VITE_SUPABASE_URL</code>
                  <span className="text-[10px] text-slate-400 block mt-2">Current Value:</span>
                  <code className="text-[10px] font-mono text-slate-500 break-all">{supabaseUrl || 'None'}</code>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Secret Name</span>
                  <code className="text-xs font-mono text-blue-600 font-bold">VITE_SUPABASE_ANON_KEY</code>
                  <span className="text-[10px] text-slate-400 block mt-2">Current Value:</span>
                  <code className="text-[10px] font-mono text-slate-500 break-all">
                    {supabaseAnonKey ? `${supabaseAnonKey.substring(0, 8)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 8)}` : 'None'}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setShowSql(!showSql)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-slate-400" />
                <span className="font-semibold text-slate-900">Database Schema (SQL)</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">Required</span>
              </div>
              {showSql ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>

            {showSql && (
              <div className="p-5 border-t border-slate-200 bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-slate-400">Run this in your Supabase SQL Editor to create the table.</p>
                  <button 
                    onClick={handleCopySql}
                    className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-lg"
                  >
                    {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy SQL'}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-blue-300 overflow-x-auto p-4 bg-slate-800/50 rounded-lg border border-slate-700 leading-relaxed">
                  {sqlSchema}
                </pre>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <ExternalLink size={14} />
                  <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">
                    Open Supabase Dashboard
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* AI Section */}
        <section className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <Cpu size={24} />
            </div>
            <h2 className="text-xl font-display uppercase tracking-tight text-slate-900">AI Generation Status</h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${GEMINI_KEY ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              <div>
                <span className="font-medium text-slate-900">
                  {GEMINI_KEY ? 'Gemini AI Ready' : 'Gemini AI Disabled'}
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  {GEMINI_KEY
                    ? 'AI-powered marketing copy generation is active.' 
                    : 'Add GEMINI_API_KEY to secrets to enable auto-fill features.'}
                </p>
              </div>
            </div>
            
            <div className="bg-white px-4 py-2 rounded-lg border border-indigo-100 text-xs font-mono text-indigo-600">
              Secret: GEMINI_API_KEY
            </div>
          </div>
        </section>

        {/* Management Section */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                {activeTab === 'products' ? <Database size={24} /> : <BookOpen size={24} />}
              </div>
              <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900">
                {activeTab === 'products' ? 'Manage Products' : 'Manage Blog Posts'}
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setBlogCategoryFilter('all')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${blogCategoryFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  All
                </button>
                {BLOG_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setBlogCategoryFilter(cat)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${blogCategoryFilter === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'products' ? "Search products..." : "Search blog posts..."}
                  value={activeTab === 'products' ? searchQuery : blogSearchQuery}
                  onChange={(e) => activeTab === 'products' ? setSearchQuery(e.target.value) : setBlogSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
                />
              </div>
              <button 
                onClick={activeTab === 'products' ? fetchProducts : fetchBlogPosts}
                disabled={activeTab === 'products' ? fetchingProducts : fetchingBlog}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-50"
                title="Refresh List"
              >
                <RefreshCw size={20} className={(activeTab === 'products' ? fetchingProducts : fetchingBlog) ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {!hasValidSupabaseConfig ? (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 text-center">
              <p className="text-amber-800 font-medium mb-2">Supabase Disconnected</p>
              <p className="text-sm text-amber-600">Connect your database to manage live data.</p>
            </div>
          ) : activeTab === 'products' ? (
            fetchingProducts && products.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center">
                <p className="text-slate-500">No products found in your database.</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Region/Cat</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rating</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {products
                      .filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-2 opacity-100 transition-opacity">
                            <a 
                              href={product.amazon_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="View on Amazon"
                            >
                              <ExternalLink size={18} />
                            </a>
                            <button 
                              onClick={() => handleGenerateBlogForProduct(product)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                              title="Generate Blog Post for this Product"
                            >
                              <BookOpen size={18} />
                            </button>
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className={`p-2 rounded-lg transition-all ${editingProductId === product.id ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                              title="Edit Product"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Product"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                              {product.image_url && (
                                <img src={product.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 line-clamp-1">{product.product_name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{product.id.substring(0, 8)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600">
                              <MapPin size={10} /> {product.region}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                              <Tag size={10} /> {product.category.replace(/_/g, ' ')}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="font-bold text-slate-900 text-sm">{product.price} {product.currency}</span>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                            <Star size={14} className="fill-current" />
                            {product.rating}
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          {product.featured ? (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">Featured</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-bold rounded uppercase">Standard</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            fetchingBlog && blogPosts.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center">
                <p className="text-slate-500">No blog posts found in your database.</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category/Author</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {blogPosts
                      .filter(p => {
                        const matchesSearch = p.title.toLowerCase().includes(blogSearchQuery.toLowerCase());
                        const matchesCategory = blogCategoryFilter === 'all' || p.category === blogCategoryFilter;
                        return matchesSearch && matchesCategory;
                      })
                      .map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-2 opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEditBlog(post)}
                              className={`p-2 rounded-lg transition-all ${editingBlogPostId === post.id ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                              title="Edit Post"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteBlog(post.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Post"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                              {post.image_url && (
                                <img src={post.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 line-clamp-1">{post.title}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{post.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                              <Tag size={10} /> {post.category}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium">
                              By {post.author}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="text-slate-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
                        </td>
                        <td className="px-8 py-4">
                          {post.featured ? (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">Featured</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-bold rounded uppercase">Standard</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}

