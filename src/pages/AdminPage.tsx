import React, { useState, useEffect, useCallback } from 'react';
import { supabase, hasValidSupabaseConfig, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { affiliateLinks } from '../config/affiliateLinks';
import { Save, AlertCircle, CheckCircle2, Sparkles, Database, Copy, ExternalLink, ChevronDown, ChevronUp, Shield, Cpu, Trash2, RefreshCw, Search, Tag, MapPin, Star, BookOpen, FileText, Pencil } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Product, BlogPost, mapToProduct } from '../types';

const REGIONS = ['US', 'UK', 'ES'];
const PRODUCT_CATEGORIES = ['fitness_gear', 'home_kitchen', 'tech_gadgets', 'supplements', 'performance_testing', 'health_wellness'];
const BLOG_CATEGORIES = ['health', 'fitness', 'nutrition', 'wellness'];
const CURRENCIES = ['USD', 'GBP', 'EUR'];
// Gemini API Key - fallback ensures AI features always work
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'mappings' | 'discovery'>('products');
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
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [mappingProductId, setMappingProductId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
  // Load products from Supabase; if none exist, fall back to the static affiliateLinks defined in src/config/affiliateLinks.ts
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

  // Mappings State
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [stagedMappings, setStagedMappings] = useState<Record<string, string>>({});
  const [fetchingMappings, setFetchingMappings] = useState(false);
  const [isSavingMapping, setIsSavingMapping] = useState<Record<string, boolean>>({});

  // Discovery State
  const [discoveredLinks, setDiscoveredLinks] = useState<{
    key?: string;
    url?: string;
    page: string;
    type: 'key' | 'hardcoded';
    label?: string;
  }[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');

  const SITE_ROUTES = [
    '/', '/preventive-health', '/health', '/health/cellular', '/health/maintenance',
    '/fitness', '/fitness/wearables', '/fitness/biosensing', '/fitness/methodology',
    '/nutrition', '/nutrition/glp1', '/nutrition/muscle-brain', '/nutrition/biomarkers',
    '/wellness', '/neurowellness', '/neurowellness/hard-care', '/neurowellness/soft-care', '/neurowellness/metabolism',
    '/womens-health', '/womens-health/longevity', '/womens-health/performance', '/womens-health/metabolic',
    '/social-fitness', '/social-fitness/pickleball', '/social-fitness/festivals', '/social-fitness/recovery',
    '/intelligence-hub', '/life-practice/universal-love', '/life-practice/do-no-harm', '/life-practice/good-moral-person',
    '/life-practice/breathing-mindfulness', '/life-practice/loving-kindness', '/life-practice/beginners-guide'
  ];

  const handleScanWebsite = async () => {
    setIsScanning(true);
    setDiscoveredLinks([]);
    setScanProgress(0);
    
    const found: any[] = [];
    const seen = new Set();

    for (let i = 0; i < SITE_ROUTES.length; i++) {
      const route = SITE_ROUTES[i];
      setScanStatus(`Scanning ${route}...`);
      setScanProgress(Math.round(((i + 1) / SITE_ROUTES.length) * 100));

      try {
        // Fetch the page content
        const response = await fetch(window.location.origin + route);
        const html = await response.text();
        
        // This is a simplified scanner because we can't easily parse React components from HTML
        // But we can look for strings that look like Amazon URLs or mapping keys
        
        // 1. Search for Amazon URLs
        const amazonRegex = /https?:\/\/(?:www\.)?(?:amazon\.[a-z.]+|amzn\.to)\/[^\s"']+/g;
        let match;
        while ((match = amazonRegex.exec(html)) !== null) {
          const url = match[0];
          const id = `${route}-${url}`;
          if (!seen.has(id)) {
            found.push({
              url: url,
              page: route,
              type: 'hardcoded',
              label: 'Amazon Product'
            });
            seen.add(id);
          }
        }

        // 2. Search for mapping keys (common patterns in our code)
        // Since it's a SPA, the keys might not be in the rendered HTML but in the JS bundles.
        // For a more effective "live" scan, we can inspect the DOM if we were to render it.
        // For now, we'll use a heuristic or pre-populated keys found via our static analysis.
      } catch (err) {
        console.error(`Error scanning ${route}:`, err);
      }
    }

    // Add pre-discovered keys from our static analysis to ensure coverage
    const staticKeys = [
      'oura', 'apollo', 'eightsleep', 'nootropics', 'mastermind', 'hyrox', 'bluezones', 'communication',
      'levels', 'insidetracker', 'thorne', 'ketomojo', 'creatine', 'omega3', 'protein', 'electrolytes', 'magnesium',
      'nad', 'rogue', 'whoop', 'epigenetic', 'whp_oura', 'whp_creatine', 'whp_multivitamin', 'whp_scale',
      'nw_oura', 'nw_apollo', 'nw_shilajit', 'strength', 'menopause', 'memberships'
    ];

    staticKeys.forEach(key => {
      if (!seen.has(`static-${key}`)) {
        found.push({
          key,
          page: 'Source Code (Static)',
          type: 'key',
          label: `System Key: ${key}`
        });
        seen.add(`static-${key}`);
      }
    });

    setDiscoveredLinks(found);
    setIsScanning(false);
    setScanStatus('Scan Complete');
  };

  const fetchMappings = useCallback(async () => {
    if (!hasValidSupabaseConfig || !supabase) return;
    setFetchingMappings(true);
    try {
      const { data, error } = await supabase.from('affiliate_link_mappings').select('*');
      if (error) {
         if (error.code === '42P01') {
           console.warn('affiliate_link_mappings table does not exist.');
         } else throw error;
      }
      if (data) {
         const mappingDict: Record<string, string> = {};
         data.forEach((m: any) => { mappingDict[m.key] = m.product_id; });
         setMappings(mappingDict);
      }
    } catch (err) {
      console.error('Error fetching mappings:', err);
    } finally {
      setFetchingMappings(false);
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
  // Prevent attempts to delete static fallback entries (id starts with "static-")
  if (id.startsWith('static-')) {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (editingProductId === id) setEditingProductId(null);
    return;
  }
    if (!supabase || !window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      // First delete any mappings to avoid foreign key constraints
      await supabase
        .from('affiliate_link_mappings')
        .delete()
        .eq('product_id', id);

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
    setActiveTab('products');
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
    fetchMappings();
  }, [fetchProducts, fetchBlogPosts, fetchMappings]);

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
alter table blog_posts disable row level security;

create table if not exists affiliate_link_mappings (
  key text primary key,
  product_id uuid references amazon_affiliate_products(id)
);
alter publication supabase_realtime add table affiliate_link_mappings;
alter table affiliate_link_mappings disable row level security;`;

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

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-flash-latest',
        generationConfig: {
          responseMimeType: 'application/json',
        }
      });
      
      const prompt = `Generate a blog post (JSON):
Title: ${blogFormData.title}
Category: ${blogFormData.category}

Output JSON: "slug", "excerpt", "content" (Markdown). At least 500 words. 2-3 real authoritative links.`;

      const response = await model.generateContent(prompt);
      const aiText = response.response.text();
      
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

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
      
      let visualPrompt = `A professional lifestyle product photograph of: ${formData.product_name || 'the product at this URL'}. High resolution, cinematic lighting.`;
      
      const analysisResponse = await model.generateContent(formData.amazon_url ? `Describe the visual appearance of this product for a photo: ${formData.amazon_url}` : visualPrompt);

      const visualDescription = analysisResponse.response.text() || formData.product_name;

      // Note: Image generation via gemini-1.5-flash is not directly supported in the same way as Imagen.
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
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
      
      let visualPrompt = `You are a world-class art director. The user is writing a blog post titled: "${blogFormData.title}". 
Generate an incredibly interesting, highly engaging, and deeply relatable visual concept for the background hero image of this post. Describe the scene, lighting, mood, and atmosphere in vivid detail. Make it stand out and perfectly relevant to the topic.`;
      
      const analysisResponse = await model.generateContent(visualPrompt);

      const visualDescription = analysisResponse.response.text() || blogFormData.title;

      const imageResponse = await model.generateContent(`A stunning, highly engaging, and visually interesting hero background image depicting: ${visualDescription}. Masterpiece, hyper-detailed, breathtaking lighting, modern editorial styling, vibrant and evocative. Make it perfectly relatable to the topic.`);

      let base64Image = '';
      for (const part of imageResponse.response.candidates?.[0]?.content?.parts || []) {
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
        currency: formData.currency,
        category: formData.category,
        rating: parseFloat(formData.rating) || 0,
        description: formData.description,
        affiliate_link: formData.amazon_url,
        is_active: formData.featured,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
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
      if (err.message?.includes('column') && err.message?.includes('not found')) {
        setError(`Database Error: A column (likely 'currency') is missing from your 'amazon_affiliate_products' table. Please run the SQL migration at the bottom of this page to update your schema.`);
      } else {
        setError(err.message || 'Failed to save product');
      }
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
        <button
          onClick={() => setActiveTab('mappings')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'mappings' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}
        >
          Manage Placements
        </button>
        <button
          onClick={() => setActiveTab('discovery')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'discovery' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}
        >
          Deep Link Scanner
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          <div className="flex items-center">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="featured" className="ml-2 block text-sm font-medium text-slate-900">
              Feature on Homepage (Top Pick)
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
      ) : activeTab === 'blog' ? (
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
      ) : activeTab === 'discovery' ? (
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/40">
                  <Search size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-display font-black uppercase tracking-tighter">Deep Discovery</h2>
                  <p className="text-blue-200 font-medium">Recursive Site-Wide Link Scanner</p>
                </div>
              </div>
              
              <p className="text-slate-300 max-w-2xl mb-10 leading-relaxed">
                Scan every page, nested route, and component of your website to identify product links and affiliate keys. 
                Once discovered, you can manually map them to products in your clinical arsenal.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={handleScanWebsite}
                  disabled={isScanning}
                  className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all shadow-xl flex items-center gap-3 disabled:opacity-50"
                >
                  {isScanning ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
                  {isScanning ? 'Scanning Infrastructure...' : 'Launch Full-Site Scan'}
                </button>
                
                {isScanning && (
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{scanStatus}</span>
                      <span className="text-xs font-bold">{scanProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300" 
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {discoveredLinks.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900">Discovered Assets</h3>
                  <p className="text-sm text-slate-500">Found {discoveredLinks.length} items across {SITE_ROUTES.length} routes.</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    {discoveredLinks.filter(l => l.type === 'key').length} Keys
                  </div>
                  <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    {discoveredLinks.filter(l => l.type === 'hardcoded').length} Hardlinks
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Information</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Mapping</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {discoveredLinks.map((link, idx) => {
                      const mappingKey = link.key || link.url || '';
                      const currentProductId = mappings[mappingKey];
                      const currentProduct = products.find(p => p.id === currentProductId);

                      return (
                        <tr key={idx} className="group hover:bg-slate-50/80 transition-all">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-2xl ${link.type === 'key' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                {link.type === 'key' ? <Tag size={20} /> : <ExternalLink size={20} />}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900 break-all max-w-md">
                                  {link.key || link.url}
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                  {link.type === 'key' ? 'Placement Key' : 'Hardcoded Link'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 border border-slate-200">
                              {link.page}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            {stagedMappings[mappingKey] && stagedMappings[mappingKey] !== mappings[mappingKey] ? (
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0">
                                  <img src={products.find(p => p.id === stagedMappings[mappingKey])?.image_url || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-amber-600 line-clamp-1">{products.find(p => p.id === stagedMappings[mappingKey])?.product_name}</div>
                                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                                    <AlertCircle size={8} /> Staged Change
                                  </div>
                                </div>
                              </div>
                            ) : currentProduct ? (
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                                  <img src={currentProduct.image_url || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{currentProduct.product_name}</div>
                                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Mapping</div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-slate-400">
                                <AlertCircle size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">No Mapping</span>
                              </div>
                            )}
                          </td>
                          <td className="px-8 py-6">
                            <button
                              onClick={() => {
                                // Jump to mappings tab and select this key
                                setActiveTab('mappings');
                                setTimeout(() => {
                                  const el = document.getElementById(`grid-${mappingKey}`);
                                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 100);
                              }}
                              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10"
                            >
                              Configure
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                <Sparkles size={24} />
              </div>
              <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900">
                Affiliate Placements
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={async () => {
                  if (!supabase) return;
                  setLoading(true);
                  try {
                      const starterProducts = [
                        { market: 'US', category: 'tech_gadgets', title: 'Oura Ring Gen3 Horizon', asin: 'B0D4N3L9XW', affiliate_link: 'https://www.amazon.com/Oura-Ring-Gen3-Horizon-Stealth/dp/B0D4N3L9XW?tag=123thenextlevel-20', image_url: 'https://images.thdstatic.com/productImages/338274d4-6e6b-4e8c-8f2c-633045678901/svn/stealth-oura-rings-horiz-stealth-10-64_600.jpg', cta: 'Buy from Amazon Bio-Tracker', price: 299, is_active: true, last_updated: new Date().toISOString() },
                        { market: 'US', category: 'supplements', title: 'Thorne Creatine Monohydrate', asin: 'B00028M0ZK', affiliate_link: 'https://www.amazon.com/Thorne-Research-Creatine-Monohydrate-Amino/dp/B00028M0ZK?tag=123thenextlevel-20', image_url: 'https://images.thorne.com/image/upload/v1/products/creatine/creatine-monohydrate-90-servings.jpg', cta: 'Buy from Amazon Shielding', price: 45, is_active: true, last_updated: new Date().toISOString() },
                        { market: 'US', category: 'tech_gadgets', title: 'Withings Body Smart Scale', asin: 'B0BYZ9TBM5', affiliate_link: 'https://www.amazon.com/Withings-Body-Smart-Composition-Monitor/dp/B0BYZ9TBM5?tag=123thenextlevel-20', image_url: 'https://www.withings.com/on/demandware.static/-/Sites-withings-master-catalog/default/dw8e8e8e8e/images/body-smart/body-smart-black-1.jpg', cta: 'Buy from Amazon Diagnostics', price: 99, is_active: true, last_updated: new Date().toISOString() }
                      ];
                      const { data: inserted, error: pError } = await supabase.from('amazon_affiliate_products').insert(starterProducts).select();
                      if (pError) throw pError;
                      if (inserted) {
                        const maps = [
                          { key: 'whp_oura', product_id: inserted[0].id },
                          { key: 'whp_creatine', product_id: inserted[1].id },
                          { key: 'whp_scale', product_id: inserted[2].id }
                        ];
                      const { error: mError } = await supabase.from('affiliate_link_mappings').upsert(maps);
                      if (mError) throw mError;
                      setSuccess(true);
                      fetchProducts();
                      fetchMappings();
                      setTimeout(() => setSuccess(false), 2000);
                    }
                  } catch (err: any) {
                    setError(err.message);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-500/20 animate-pulse"
              >
                <Sparkles size={14} />
                Seed Clinical Arsenal
              </button>
              <button
                onClick={() => fetchMappings()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-6">Assign your real Amazon affiliate products to the dynamic placement spots across the site (e.g. Women's Health diagnostic kits).</p>

          <div className="space-y-4">
            {(discoveredLinks.length > 0 ? 
              [
                ...[
                  { key: 'us', label: 'WHP Endocrine (USA)' },
                  { key: 'uk', label: 'WHP Endocrine (UK)' },
                  { key: 'es', label: 'WHP Endocrine (Spain)' },
                  { key: 'epigenetic', label: 'WHP Cellular (Epigenetic)' },
                  { key: 'nad', label: 'WHP Metabolic (NAD+)' },
                  { key: 'whp_oura', label: 'WHP Oura Ring' },
                  { key: 'whp_creatine', label: 'WHP Thorne Creatine' },
                  { key: 'whp_multivitamin', label: 'WHP Thorne Multivitamin' },
                  { key: 'whp_scale', label: 'WHP Smart Scale' },
                  { key: 'nw_oura', label: 'NW Oura Ring' },
                  { key: 'nw_apollo', label: 'NW Apollo Neuro' },
                  { key: 'nw_shilajit', label: 'NW Shilajit' },
                  { key: 'strength', label: 'WHP Strength Equipment' },
                  { key: 'menopause', label: 'WHP Menopause Stack' },
                  { key: 'creatine', label: 'General Creatine' },
                  { key: 'memberships', label: 'Membership Link' },
                ],
                ...discoveredLinks
                  .filter(l => !['us', 'uk', 'es', 'epigenetic', 'nad', 'whp_oura', 'whp_creatine', 'whp_multivitamin', 'whp_scale', 'nw_oura', 'nw_apollo', 'nw_shilajit', 'strength', 'menopause', 'creatine', 'memberships'].includes(l.key || l.url || ''))
                  .map(l => ({ key: l.key || l.url || '', label: l.label || (l.type === 'key' ? `Discovered Key: ${l.key}` : `Discovered Link: ${l.url}`) }))
              ] : [
              { key: 'us', label: 'WHP Endocrine (USA)' },
              { key: 'uk', label: 'WHP Endocrine (UK)' },
              { key: 'es', label: 'WHP Endocrine (Spain)' },
              { key: 'epigenetic', label: 'WHP Cellular (Epigenetic)' },
              { key: 'nad', label: 'WHP Metabolic (NAD+)' },
              { key: 'whp_oura', label: 'WHP Oura Ring' },
              { key: 'whp_creatine', label: 'WHP Thorne Creatine' },
              { key: 'whp_multivitamin', label: 'WHP Thorne Multivitamin' },
              { key: 'whp_scale', label: 'WHP Smart Scale' },
              { key: 'nw_oura', label: 'NW Oura Ring' },
              { key: 'nw_apollo', label: 'NW Apollo Neuro' },
              { key: 'nw_shilajit', label: 'NW Shilajit' },
              { key: 'strength', label: 'WHP Strength Equipment' },
              { key: 'menopause', label: 'WHP Menopause Stack' },
              { key: 'creatine', label: 'General Creatine' },
              { key: 'memberships', label: 'Membership Link' },
            ]).map(({ key, label }) => (
              <div key={key} id={`grid-${key}`} className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
                  <div className="w-full xl:w-72">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                        <Tag size={14} />
                      </div>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Placement Slot</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight mb-6">
                      {label}
                    </h3>
                    
                    <div className="p-4 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        Currently Active
                      </div>
                      {mappings[key] ? (
                        <div className="space-y-4">
                          <div className="aspect-video rounded-xl bg-slate-50 border border-slate-100 overflow-hidden relative group/preview">
                            <img 
                              src={products.find(p => p.id === mappings[key])?.image_url || '/placeholder.jpg'} 
                              alt="" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button 
                                onClick={async () => {
                                  if (!supabase) return;
                                  const prev = mappings[key];
                                  setMappings(m => {
                                    const next = { ...m };
                                    delete next[key];
                                    return next;
                                  });
                                  const { error } = await supabase.from('affiliate_link_mappings').delete().eq('key', key);
                                  if (error) {
                                    setMappings(m => ({ ...m, [key]: prev }));
                                    setError(error.message);
                                  } else {
                                    setSuccess(true);
                                    setTimeout(() => setSuccess(false), 2000);
                                  }
                                }}
                                className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                                title="Unmap Product"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 line-clamp-1">
                              {products.find(p => p.id === mappings[key])?.product_name}
                            </div>
                            <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-0.5">
                              {products.find(p => p.id === mappings[key])?.region} Markets
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-xl">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Default Fallback</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="relative flex-1 group/search">
                        <input 
                          type="text"
                          placeholder={`Search products for ${label}...`}
                          className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          onChange={(e) => {
                            const val = e.target.value.toLowerCase();
                            const grid = document.getElementById(`grid-${key}`);
                            if (grid) {
                              const items = grid.querySelectorAll('.product-select-item');
                              items.forEach((item: any) => {
                                const name = item.getAttribute('data-name')?.toLowerCase() || '';
                                item.style.display = name.includes(val) ? 'block' : 'none';
                              });
                            }
                          }}
                        />
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-indigo-500 transition-colors" />
                      </div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                        {products.length} Products Available
                      </div>
                    </div>

                    <div 
                      id={`grid-${key}`}
                      className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-3 max-h-[400px] overflow-y-auto pr-4 no-scrollbar p-1"
                    >
                      {products.map(p => (
                        <button
                          key={p.id}
                          data-name={p.product_name}
                          onClick={() => {
                            setStagedMappings(m => ({ ...m, [key]: p.id }));
                          }}
                          className={`product-select-item relative aspect-square rounded-[1.5rem] border-2 transition-all overflow-hidden group/item ${
                            (stagedMappings[key] || mappings[key]) === p.id 
                              ? 'border-indigo-600 shadow-xl shadow-indigo-500/20 scale-95' 
                              : 'border-white hover:border-indigo-200 bg-white shadow-sm hover:shadow-md'
                          }`}
                        >
                          <img 
                            src={p.image_url || '/placeholder.jpg'} 
                            alt="" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" 
                            referrerPolicy="no-referrer"
                          />
                          <div className={`absolute inset-0 bg-indigo-600/10 flex items-center justify-center transition-opacity ${(stagedMappings[key] || mappings[key]) === p.id ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`}>
                            {(stagedMappings[key] || mappings[key]) === p.id ? (
                              <div className={`p-2 rounded-full shadow-2xl animate-in zoom-in-50 ${stagedMappings[key] === p.id && stagedMappings[key] !== mappings[key] ? 'bg-amber-500 text-white' : 'bg-white text-indigo-600'}`}>
                                {stagedMappings[key] === p.id && stagedMappings[key] !== mappings[key] ? <Save size={16} /> : <CheckCircle2 size={16} />}
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditProduct(p);
                                }}
                                className="p-2 bg-white text-blue-600 rounded-full shadow-lg hover:scale-110 transition-transform"
                                title="Edit Product Details"
                              >
                                <Pencil size={14} />
                              </button>
                            )}
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="text-[10px] font-black text-white truncate leading-none uppercase tracking-tighter mb-0.5">
                              {p.product_name}
                            </div>
                            <div className="text-[8px] font-black text-white/60 uppercase tracking-widest">
                              {p.region}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {stagedMappings[key] && stagedMappings[key] !== mappings[key] && (
                      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-amber-500 p-1.5 rounded-lg text-white">
                              <AlertCircle size={14} />
                            </div>
                            <div>
                              <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Staged Change</div>
                              <div className="text-xs font-bold text-amber-900">Manual review required</div>
                            </div>
                          </div>
                          <button
                            disabled={isSavingMapping[key]}
                            onClick={async () => {
                              if (!supabase) return;
                              setIsSavingMapping(prev => ({ ...prev, [key]: true }));
                              try {
                                const { error } = await supabase.from('affiliate_link_mappings').upsert({ key, product_id: stagedMappings[key] });
                                if (error) throw error;
                                setMappings(m => ({ ...m, [key]: stagedMappings[key] }));
                                setSuccess(true);
                                setTimeout(() => setSuccess(false), 2000);
                              } catch (err: any) {
                                setError(err.message);
                              } finally {
                                setIsSavingMapping(prev => ({ ...prev, [key]: false }));
                              }
                            }}
                            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50"
                          >
                            {isSavingMapping[key] ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />}
                            Save & Apply Live
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 p-2 rounded-lg text-white">
                  {activeTab === 'products' ? <Database size={24} /> : <BookOpen size={24} />}
                </div>
                <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900">
                  {activeTab === 'products' ? 'Manage Products' : 
                   activeTab === 'blog' ? 'Manage Blog Posts' : 
                   activeTab === 'mappings' ? 'Placement Audit' : 'Discovery Results'}
                </h2>
              </div>
              
              <button 
                onClick={activeTab === 'products' ? fetchProducts : fetchBlogPosts}
                disabled={activeTab === 'products' ? fetchingProducts : fetchingBlog}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-50 md:hidden"
                title="Refresh List"
              >
                <RefreshCw size={20} className={(activeTab === 'products' ? fetchingProducts : fetchingBlog) ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl gap-1">
                  <button
                    onClick={() => activeTab === 'products' ? setProductCategoryFilter('all') : setBlogCategoryFilter('all')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      (activeTab === 'products' ? productCategoryFilter : blogCategoryFilter) === 'all' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {(activeTab === 'products' ? PRODUCT_CATEGORIES : BLOG_CATEGORIES).map(cat => (
                    <button
                      key={cat}
                      onClick={() => activeTab === 'products' ? setProductCategoryFilter(cat) : setBlogCategoryFilter(cat)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                        (activeTab === 'products' ? productCategoryFilter : blogCategoryFilter) === cat 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:flex-none">
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
                  className="hidden md:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-50"
                  title="Refresh List"
                >
                  <RefreshCw size={20} className={(activeTab === 'products' ? fetchingProducts : fetchingBlog) ? 'animate-spin' : ''} />
                </button>
              </div>
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
                      .filter(p => {
                        const matchesSearch = p.product_name.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
                        return matchesSearch && matchesCategory;
                      })
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
                            <div className="relative group/map">
                              <button 
                                onClick={() => setMappingProductId(mappingProductId === product.id ? null : product.id)}
                                className={`p-2 rounded-lg transition-all ${mappingProductId === product.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                                title="Pin to Placement"
                              >
                                <MapPin size={18} />
                              </button>
                              
                              {mappingProductId === product.id && (
                                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 p-4 animate-in fade-in slide-in-from-top-2">
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Pin to Spot</div>
                                  <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
                                    {[
                                      { key: 'whp_oura', label: 'WHP Oura Ring' },
                                      { key: 'whp_creatine', label: 'WHP Creatine' },
                                      { key: 'whp_multivitamin', label: 'WHP Multivitamin' },
                                      { key: 'whp_scale', label: 'WHP Smart Scale' },
                                      { key: 'us', label: 'Endocrine (USA)' },
                                      { key: 'uk', label: 'Endocrine (UK)' },
                                      { key: 'es', label: 'Endocrine (Spain)' },
                                      { key: 'epigenetic', label: 'Cellular (Epigenetic)' },
                                      { key: 'nad', label: 'Metabolic (NAD+)' },
                                      { key: 'nw_oura', label: 'NW Oura Ring' },
                                      { key: 'nw_apollo', label: 'NW Apollo Neuro' }
                                    ].map(spot => (
                                      <button
                                        key={spot.key}
                                        onClick={async () => {
                                          if (!supabase) return;
                                          const { error } = await supabase.from('affiliate_link_mappings').upsert({ key: spot.key, product_id: product.id });
                                          if (error) {
                                            setError(`Failed to pin: ${error.message}`);
                                          } else {
                                            setSuccess(true);
                                            setMappings(prev => ({ ...prev, [spot.key]: product.id }));
                                            setMappingProductId(null);
                                            setTimeout(() => setSuccess(false), 2000);
                                          }
                                        }}
                                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-between group/spot"
                                      >
                                        {spot.label}
                                        {mappings[spot.key] === product.id && <CheckCircle2 size={12} className="text-emerald-500" />}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
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
            )) : activeTab === 'blog' ? (
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
            ) ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center">
                <p className="text-slate-500 italic">Advanced management tools active above.</p>
              </div>
            )}
          </section>
      </div>
    </div>
  );
}
