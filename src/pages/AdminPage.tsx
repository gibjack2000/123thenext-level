import React, { useState, useEffect, useCallback } from 'react';
import { supabase, hasValidSupabaseConfig, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { affiliateLinks } from '../config/affiliateLinks';
import { Save, AlertCircle, CheckCircle2, Sparkles, Database, Copy, ExternalLink, ChevronDown, ChevronUp, Shield, Cpu, Trash2, RefreshCw, Search, Tag, MapPin, Star, BookOpen, FileText, Pencil, Eye } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Product, BlogPost, PremiumGuide, mapToProduct } from '../types';

const REGIONS = ['US', 'UK', 'ES'];
const PRODUCT_CATEGORIES = ['fitness_gear', 'home_kitchen', 'tech_gadgets', 'supplements', 'performance_testing', 'health_wellness'];
const BLOG_CATEGORIES = ['health', 'fitness', 'nutrition', 'wellness'];
const CURRENCIES = ['USD', 'GBP', 'EUR'];
// Gemini API Key - fallback ensures AI features always work
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'zenextlevel2026') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'mappings' | 'discovery' | 'guides'>('products');

  useEffect(() => {
    const target = localStorage.getItem('admin_target_tab');
    if (target === 'blog' || target === 'products' || target === 'mappings' || target === 'discovery' || target === 'guides') {
      setActiveTab(target as any);
      localStorage.removeItem('admin_target_tab');
    }
  }, []);

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
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Blog Management State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [fetchingBlog, setFetchingBlog] = useState(false);
  const [editingBlogPostId, setEditingBlogPostId] = useState<string | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('all');
  const [mappingProductId, setMappingProductId] = useState<string | null>(null);

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

  // Mappings State
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [stagedMappings, setStagedMappings] = useState<Record<string, string>>({});
  const [fetchingMappings, setFetchingMappings] = useState(false);
  const [isSavingMapping, setIsSavingMapping] = useState<Record<string, boolean>>({});

  // Guides Management State
  const [guides, setGuides] = useState<PremiumGuide[]>([]);
  const [fetchingGuides, setFetchingGuides] = useState(false);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);
  const [guideFormData, setGuideFormData] = useState({
    slug: '',
    title: '',
    category: 'Fitness',
    short_description: '',
    long_description: '',
    price_display: '',
    stripe_price_id: '',
    image: '',
    file_name: '',
    featured: false,
    tags: '',
    included: '',
    audience: '',
    disclaimer: '',
  });

  const fetchGuides = useCallback(async () => {
    if (!hasValidSupabaseConfig || !supabase) return;
    setFetchingGuides(true);
    try {
      const { data, error } = await supabase.from('premium_guides').select('*').order('created_at', { ascending: false });
      if (error) {
        if (error.code !== '42P01') throw error;
      } else if (data) setGuides(data);
    } catch (err) {
      console.error('Error fetching guides:', err);
    } finally {
      setFetchingGuides(false);
    }
  }, []);

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
        const response = await fetch(window.location.origin + route);
        const html = await response.text();
        
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
      } catch (err) {
        console.error(`Error scanning ${route}:`, err);
      }
    }

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchBlogPosts();
      fetchMappings();
      fetchGuides();
    }
  }, [isAuthenticated, fetchProducts, fetchBlogPosts, fetchMappings, fetchGuides]);

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
    image_url_2: '',
    image_url_3: '',
    affiliate_product_1: '',
    affiliate_product_2: '',
    excerpt: '',
    tags: '',
    featured: false,
    status: 'draft',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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

  const handleEditProduct = useCallback((product: Product) => {
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
  }, []);

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

  const handleDeleteProduct = async (id: string) => {
    if (id.startsWith('static-')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      return;
    }
    if (!supabase || !window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await supabase.from('affiliate_link_mappings').delete().eq('product_id', id);
      const { error } = await supabase.from('amazon_affiliate_products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
  };

  const handleEditBlog = useCallback((post: BlogPost) => {
    setEditingBlogPostId(post.id);
    setBlogFormData({
      category: post.category || 'health',
      title: post.title || '',
      slug: post.slug || '',
      author: post.author || 'The Next Level Team',
      content: post.content || '',
      image_url: post.image_url || '',
      image_url_2: (post as any).image_url_2 || '',
      image_url_3: (post as any).image_url_3 || '',
      affiliate_product_1: (post as any).affiliate_product_1 || '',
      affiliate_product_2: (post as any).affiliate_product_2 || '',
      excerpt: post.excerpt || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      featured: post.featured || false,
      status: (post as any).status || 'published',
    });
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleteBlog = async (id: string) => {
    if (!supabase || !window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting blog post:', err);
      alert('Failed to delete blog post.');
    }
  };

  const handleGuideChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setGuideFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditGuide = useCallback((guide: PremiumGuide) => {
    setEditingGuideId(guide.id);
    setGuideFormData({
      slug: guide.slug || '',
      title: guide.title || '',
      category: guide.category || 'Fitness',
      short_description: guide.short_description || '',
      long_description: guide.long_description || '',
      price_display: guide.price_display || '',
      stripe_price_id: guide.stripe_price_id || '',
      image: guide.image || '',
      file_name: guide.file_name || '',
      featured: guide.featured || false,
      tags: Array.isArray(guide.tags) ? guide.tags.join(', ') : '',
      included: Array.isArray(guide.included) ? guide.included.join(', ') : '',
      audience: guide.audience || '',
      disclaimer: guide.disclaimer || '',
    });
    setActiveTab('guides');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleteGuide = async (id: string) => {
    if (!supabase || !window.confirm('Are you sure you want to delete this guide?')) return;
    try {
      const { error } = await supabase.from('premium_guides').delete().eq('id', id);
      if (error) throw error;
      setGuides(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      console.error('Error deleting guide:', err);
      alert('Failed to delete guide.');
    }
  };

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!hasValidSupabaseConfig || !supabase) {
      setError('Cannot save guide in Demo Mode.');
      setLoading(false);
      return;
    }

    try {
      const data = {
        ...guideFormData,
        tags: guideFormData.tags.split(',').map(t => t.trim()).filter(Boolean),
        included: guideFormData.included.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (editingGuideId) {
        const { error } = await supabase.from('premium_guides').update(data).eq('id', editingGuideId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('premium_guides').insert([data]);
        if (error) throw error;
      }

      setSuccess(true);
      setEditingGuideId(null);
      setGuideFormData({ slug: '', title: '', category: 'Fitness', short_description: '', long_description: '', price_display: '', stripe_price_id: '', image: '', file_name: '', featured: false, tags: '', included: '', audience: '', disclaimer: '' });
      fetchGuides();
    } catch (err: any) {
      console.error('Error saving guide:', err);
      setError(err.message || 'Failed to save guide');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!hasValidSupabaseConfig || !supabase) {
      setError('Cannot save products in Demo Mode.');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        market: formData.region,
        category: formData.category,
        title: formData.product_name,
        asin: formData.amazon_asin,
        affiliate_link: formData.amazon_url,
        image_url: formData.image_url,
        price: parseFloat(formData.price),
        currency: formData.currency,
        rating: parseFloat(formData.rating),
        is_active: formData.featured,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        last_updated: new Date().toISOString(),
        description: formData.description,
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
      fetchProducts();
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
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
      const postData: any = {
        ...blogFormData,
        tags: blogFormData.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      };

      if (!postData.affiliate_product_1) postData.affiliate_product_1 = null;
      if (!postData.affiliate_product_2) postData.affiliate_product_2 = null;

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
        image_url_2: '',
        image_url_3: '',
        affiliate_product_1: '',
        affiliate_product_2: '',
        excerpt: '',
        tags: '',
        featured: false,
        status: 'draft',
      });
      fetchBlogPosts();
    } catch (err: any) {
      console.error('Error saving blog post:', err);
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.product_name) {
      setError('Please enter a product name first.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Act as an expert affiliate marketer. Write marketing copy for a product named "${formData.product_name}". Category: ${formData.category}. Format as JSON with short_benefit, description, and tags.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setFormData(prev => ({
          ...prev,
          short_benefit: data.short_benefit || prev.short_benefit,
          description: data.description || prev.description,
          tags: data.tags || prev.tags
        }));
      }
    } catch (err) {
      setError('AI Generation failed. Check API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    // Mock image generation for now
    setTimeout(() => {
      setGeneratedImage(`https://source.unsplash.com/800x800/?${formData.product_name.replace(/\s+/g, ',')}`);
      setIsGeneratingImage(false);
    }, 1500);
  };

  const applyGeneratedImage = () => {
    if (generatedImage) {
      setFormData(prev => ({ ...prev, image_url: generatedImage }));
      setGeneratedImage(null);
    }
  };

  const handleGenerateBlogAI = async () => {
    if (!blogFormData.title) {
      setError('Please enter a title first.');
      return;
    }
    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Write a professional blog post about "${blogFormData.title}". Format as JSON with content (markdown) and excerpt.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setBlogFormData(prev => ({
          ...prev,
          content: data.content || prev.content,
          excerpt: data.excerpt || prev.excerpt
        }));
      }
    } catch (err) {
      setError('AI Generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateBlogImage = async () => {
    setIsGeneratingBlogImage(true);
    setTimeout(() => {
      setGeneratedBlogImage(`https://source.unsplash.com/1200x630/?${blogFormData.category},health`);
      setIsGeneratingBlogImage(false);
    }, 1500);
  };

  const applyGeneratedBlogImage = () => {
    if (generatedBlogImage) {
      setBlogFormData(prev => ({ ...prev, image_url: generatedBlogImage }));
      setGeneratedBlogImage(null);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopySql = () => {
    const sqlSchema = `-- Run this in Supabase SQL Editor
create table amazon_affiliate_products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  market text not null,
  category text not null,
  title text not null,
  asin text,
  affiliate_link text not null,
  image_url text,
  price numeric not null,
  currency text default 'USD',
  rating numeric default 5.0,
  is_active boolean default false,
  tags text[] default '{}',
  description text,
  short_benefit text,
  featured boolean default false,
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
  affiliate_product_1 uuid references amazon_affiliate_products(id),
  affiliate_product_2 uuid references amazon_affiliate_products(id),
  excerpt text,
  tags text[] default '{}',
  featured boolean default false,
  status text default 'published'
);

create table if not exists affiliate_link_mappings (
  key text primary key,
  product_id uuid references amazon_affiliate_products(id)
);

create table if not exists premium_guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Fitness', 'Nutrition', 'Wellness')),
  short_description text not null,
  long_description text not null,
  price_display text not null,
  stripe_price_id text not null,
  image text not null,
  file_name text not null,
  featured boolean default false,
  tags text[] default '{}',
  included text[] default '{}',
  audience text not null,
  disclaimer text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);`;
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-slate-900 p-4 rounded-2xl text-white mb-4">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900">Administrator Login</h1>
            <p className="text-slate-500 text-sm mt-2">Access restricted to authorized personnel.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Security Key</label>
              <input 
                type="password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono"
                placeholder="••••••••••••"
              />
            </div>
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle size={14} />
                {loginError}
              </div>
            )}
            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 py-6 mb-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-2 rounded-lg text-white">
              <Cpu size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900">Next Level Admin</h1>
              <p className="text-xs text-slate-500 font-medium">V1.2 Production Control Center</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-slate-500 hover:text-red-600 font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            Terminal Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {!hasValidSupabaseConfig && (
          <div className="mb-8 bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center shadow-sm">
            <AlertCircle className="mr-3 shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-sm">Demo Mode Active</h3>
              <p className="text-xs mt-0.5 opacity-80">You are currently viewing mock data. Connect Supabase to enable production management.</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-8 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center shadow-sm animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="mr-3 shrink-0" size={20} />
            <p className="font-bold text-sm uppercase tracking-tight">Operation Successful</p>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center shadow-sm">
            <AlertCircle className="mr-3 shrink-0" size={20} />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { id: 'products', label: 'Clinical Arsenal', icon: Database },
            { id: 'blog', label: 'Editorial Center', icon: BookOpen },
            { id: 'guides', label: 'Digital Guides', icon: FileText },
            { id: 'mappings', label: 'Placement Hub', icon: Tag },
            { id: 'discovery', label: 'Deep Scanner', icon: Search }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-2xl -translate-y-1' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'products' ? (
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                  <Database size={24} />
                </div>
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter text-slate-900">
                  {editingProductId ? 'Edit Diagnostic Asset' : 'New Clinical Asset'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Market Region</label>
                  <select name="region" value={formData.region} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10">
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10">
                    {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10">
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Identity *</label>
                  <input required type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. ProFit Dumbbells" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amazon ASIN</label>
                  <input type="text" name="amazon_asin" value={formData.amazon_asin} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. B08XXXXX1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amazon Affiliate Link *</label>
                  <input required type="url" name="amazon_url" value={formData.amazon_url} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="https://amzn.to/..." />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Image URL</label>
                    <button type="button" onClick={handleGenerateImage} className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-widest">
                      {isGeneratingImage ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />}
                      AI Visualization
                    </button>
                  </div>
                  <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="https://..." />
                  {generatedImage && (
                    <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={generatedImage} alt="" className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                        <span className="text-xs font-bold text-indigo-900">New Visual Ready</span>
                      </div>
                      <button type="button" onClick={applyGeneratedImage} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Apply</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price *</label>
                  <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Rating</label>
                  <input required type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm font-bold text-slate-700">Feature on Dashboard</span>
                  </label>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-black uppercase tracking-tight text-slate-900">Marketing & SEO</h3>
                  <button type="button" onClick={handleGenerateAI} disabled={isGenerating} className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all flex items-center gap-2">
                    {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    Draft with AI
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Benefit *</label>
                    <input required type="text" name="short_benefit" value={formData.short_benefit} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="One sentence highlight..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comprehensive Description *</label>
                    <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="Deep clinical analysis..."></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Tags (CSV)</label>
                    <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="biohacking, recovery, strength" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
                  {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                  {editingProductId ? 'Update Infrastructure' : 'Initialize Clinical Asset'}
                </button>
                {editingProductId && (
                  <button type="button" onClick={cancelEdit} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">Cancel</button>
                )}
              </div>
            </form>

            <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
              <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900">Clinical Repository</h3>
                  <p className="text-sm text-slate-500 mt-1">Audit and manage your available affiliate hardware.</p>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search Assets..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 outline-none w-64"
                    />
                  </div>
                  <button onClick={fetchProducts} className="bg-slate-100 p-3.5 rounded-2xl text-slate-600 hover:bg-slate-200 transition-all">
                    <RefreshCw size={20} className={fetchingProducts ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Market/Cat</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Commands</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {products.filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                      <tr key={product.id} className="group hover:bg-slate-50/80 transition-all">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                              <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-black text-slate-900">{product.product_name}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">{product.amazon_asin}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <MapPin size={10} className="text-indigo-500" /> {product.region}
                            </span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                              {product.category.replace(/_/g, ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-6 font-black text-slate-900">{product.price} {product.currency}</td>
                        <td className="px-10 py-6">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEditProduct(product)} className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-xl transition-all shadow-sm">
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-100 rounded-xl transition-all shadow-sm">
                              <Trash2 size={18} />
                            </button>
                            <a href={product.amazon_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-lg">
                              <ExternalLink size={18} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'blog' ? (
          <div className="space-y-8">
            <form onSubmit={handleBlogSubmit} className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                    <BookOpen size={24} />
                  </div>
                  <h2 className="text-3xl font-display font-black uppercase tracking-tighter text-slate-900">
                    {editingBlogPostId ? 'Modify Article' : 'Compose Publication'}
                  </h2>
                </div>
                <button type="button" onClick={handleGenerateBlogAI} disabled={isGenerating} className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all flex items-center gap-2">
                  {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Draft with AI
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publication Title *</label>
                  <input required type="text" name="title" value={blogFormData.title} onChange={handleBlogChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. The Neurobiology of Deep Sleep" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Semantic Slug *</label>
                  <input required type="text" name="slug" value={blogFormData.slug} onChange={handleBlogChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="the-neurobiology-of-deep-sleep" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select name="category" value={blogFormData.category} onChange={handleBlogChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10">
                    {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Author Identity</label>
                  <input type="text" name="author" value={blogFormData.author} onChange={handleBlogChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publication Status</label>
                  <select name="status" value={blogFormData.status} onChange={handleBlogChange} className={`w-full border rounded-xl p-4 font-black text-xs uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-500/10 ${blogFormData.status === 'published' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                    <option value="draft">Internal Draft</option>
                    <option value="published">Live Publication</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured Visual URL</label>
                  <button type="button" onClick={handleGenerateBlogImage} className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-widest">
                    {isGeneratingBlogImage ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />}
                    Visualizer
                  </button>
                </div>
                <input type="url" name="image_url" value={blogFormData.image_url} onChange={handleBlogChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="https://..." />
                {generatedBlogImage && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={generatedBlogImage} alt="" className="w-20 h-12 rounded-lg object-cover shadow-sm" />
                      <span className="text-xs font-bold text-indigo-900">Cover Art Ready</span>
                    </div>
                    <button type="button" onClick={applyGeneratedBlogImage} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Apply</button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Editorial Excerpt *</label>
                <textarea required name="excerpt" value={blogFormData.excerpt} onChange={handleBlogChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="A brief clinical summary..."></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Content (Markdown) *</label>
                <textarea required name="content" value={blogFormData.content} onChange={handleBlogChange} rows={12} className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-medium text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10 leading-relaxed" placeholder="Compose your publication here..."></textarea>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Linked Clinical Arsenal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Primary Affiliate Hardware</label>
                    <select name="affiliate_product_1" value={blogFormData.affiliate_product_1} onChange={handleBlogChange} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-900 outline-none">
                      <option value="">No Product Linked</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.product_name} ({p.region})</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Secondary Affiliate Hardware</label>
                    <select name="affiliate_product_2" value={blogFormData.affiliate_product_2} onChange={handleBlogChange} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-900 outline-none">
                      <option value="">No Product Linked</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.product_name} ({p.region})</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
                  {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                  {editingBlogPostId ? 'Update Publication' : 'Release Publication'}
                </button>
                {editingBlogPostId && (
                  <button type="button" onClick={() => { setEditingBlogPostId(null); setBlogFormData({ category: 'health', title: '', slug: '', author: 'The Next Level Team', content: '', image_url: '', excerpt: '', tags: '', status: 'draft', featured: false, affiliate_product_1: '', affiliate_product_2: '', image_url_2: '', image_url_3: '' } as any); }} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">Cancel</button>
                )}
              </div>
            </form>

            <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
              <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900">Editorial Archive</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage published and drafted articles.</p>
                </div>
                <button onClick={fetchBlogPosts} className="bg-slate-100 p-3.5 rounded-2xl text-slate-600 hover:bg-slate-200 transition-all">
                  <RefreshCw size={20} className={fetchingBlog ? 'animate-spin' : ''} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Publication</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Commands</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {blogPosts.map(post => (
                      <tr key={post.id} className="group hover:bg-slate-50/80 transition-all">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                              <img src={post.image_url} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-black text-slate-900">{post.title}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">/{post.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${post.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEditBlog(post)} className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all">
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDeleteBlog(post.id)} className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-red-600 rounded-xl shadow-sm transition-all">
                              <Trash2 size={18} />
                            </button>
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-indigo-600 transition-all">
                              <Eye size={18} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'mappings' ? (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900">Placement Hub</h3>
                  <p className="text-sm text-slate-500 mt-1">Map placement keys to clinical assets.</p>
                </div>
                <button onClick={fetchMappings} className="bg-slate-100 p-3.5 rounded-2xl text-slate-600 hover:bg-slate-200 transition-all">
                  <RefreshCw size={20} className={fetchingMappings ? 'animate-spin' : ''} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: 'whp_oura', label: 'WHP Oura Ring' },
                  { key: 'whp_creatine', label: 'WHP Creatine' },
                  { key: 'whp_multivitamin', label: 'WHP Multivitamin' },
                  { key: 'whp_scale', label: 'WHP Smart Scale' },
                  { key: 'nw_oura', label: 'NW Oura Ring' },
                  { key: 'nw_apollo', label: 'NW Apollo Neuro' },
                  { key: 'epigenetic', label: 'Cellular Kit' },
                  { key: 'nad', label: 'Metabolic Kit' }
                ].map(spot => (
                  <div key={spot.key} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-indigo-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{spot.label}</span>
                    </div>
                    <select 
                      value={mappings[spot.key] || ''} 
                      onChange={async (e) => {
                        const pid = e.target.value;
                        if (!supabase) return;
                        const { error } = await supabase.from('affiliate_link_mappings').upsert({ key: spot.key, product_id: pid });
                        if (!error) {
                          setMappings(prev => ({ ...prev, [spot.key]: pid }));
                          setSuccess(true);
                          setTimeout(() => setSuccess(false), 2000);
                        }
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 outline-none"
                    >
                      <option value="">-- Select Product --</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.product_name} ({p.region})</option>)}
                    </select>
                    {mappings[spot.key] && (
                      <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100">
                        <img src={products.find(p => p.id === mappings[spot.key])?.image_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <div className="text-[10px] font-black text-slate-900 truncate flex-1">{products.find(p => p.id === mappings[spot.key])?.product_name}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'guides' ? (
          <div className="space-y-8">
            <form onSubmit={handleGuideSubmit} className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter text-slate-900">
                  {editingGuideId ? 'Edit Digital Guide' : 'New Digital Guide'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title *</label>
                  <input required type="text" name="title" value={guideFormData.title} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Slug *</label>
                  <input required type="text" name="slug" value={guideFormData.slug} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category *</label>
                  <select name="category" value={guideFormData.category} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none">
                    <option value="Fitness">Fitness</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price Display *</label>
                  <input required type="text" name="price_display" value={guideFormData.price_display} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" placeholder="$19.99" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stripe Price ID *</label>
                  <input required type="text" name="stripe_price_id" value={guideFormData.stripe_price_id} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" placeholder="price_1..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image URL *</label>
                  <input required type="text" name="image" value={guideFormData.image} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">File Name (PDF) *</label>
                  <input required type="text" name="file_name" value={guideFormData.file_name} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" name="featured" checked={guideFormData.featured} onChange={handleGuideChange} className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm font-bold text-slate-700">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Description *</label>
                <textarea required name="short_description" value={guideFormData.short_description} onChange={handleGuideChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 outline-none"></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Long Description *</label>
                <textarea required name="long_description" value={guideFormData.long_description} onChange={handleGuideChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-900 outline-none"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Included Items (CSV)</label>
                  <input type="text" name="included" value={guideFormData.included} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tags (CSV)</label>
                  <input type="text" name="tags" value={guideFormData.tags} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Audience</label>
                  <input type="text" name="audience" value={guideFormData.audience} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Disclaimer</label>
                  <input type="text" name="disclaimer" value={guideFormData.disclaimer} onChange={handleGuideChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-900 outline-none" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
                  {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                  {editingGuideId ? 'Update Guide' : 'Publish Guide'}
                </button>
                {editingGuideId && (
                  <button type="button" onClick={() => { setEditingGuideId(null); setGuideFormData({ slug: '', title: '', category: 'Fitness', short_description: '', long_description: '', price_display: '', stripe_price_id: '', image: '', file_name: '', featured: false, tags: '', included: '', audience: '', disclaimer: '' }); }} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">Cancel</button>
                )}
              </div>
            </form>

            <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900">Guides Archive</h3>
                </div>
                <button onClick={fetchGuides} className="bg-slate-100 p-3.5 rounded-2xl text-slate-600 hover:bg-slate-200 transition-all">
                  <RefreshCw size={20} className={fetchingGuides ? 'animate-spin' : ''} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Guide</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Commands</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {guides.map(guide => (
                      <tr key={guide.id} className="group hover:bg-slate-50/80 transition-all">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                              <img src={guide.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-black text-slate-900">{guide.title}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">{guide.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 font-black">{guide.price_display}</td>
                        <td className="px-10 py-6">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEditGuide(guide)} className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all">
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDeleteGuide(guide.id)} className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-red-600 rounded-xl shadow-sm transition-all">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm text-center">
            <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900">Deep Link Scanner</h3>
            <p className="text-slate-500 max-w-md mx-auto mt-2 mb-8">Recursively scan your infrastructure for untracked affiliate hardware references.</p>
            <button onClick={handleScanWebsite} disabled={isScanning} className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-3 mx-auto">
              {isScanning ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {isScanning ? 'Scanning Network...' : 'Launch Global Scan'}
            </button>
            {isScanning && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  <span>{scanStatus}</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all" style={{ width: `${scanProgress}%` }}></div>
                </div>
              </div>
            )}
            {discoveredLinks.length > 0 && !isScanning && (
              <div className="mt-12 text-left space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 ml-2">Discovered Hardware ({discoveredLinks.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discoveredLinks.map((link, i) => (
                    <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="text-xs font-black text-slate-900 truncate">{link.url || link.key}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{link.page}</div>
                      </div>
                      <button onClick={() => { setActiveTab('mappings'); }} className="p-2 bg-white text-indigo-600 rounded-lg shadow-sm border border-slate-100 hover:bg-indigo-600 hover:text-white transition-all">
                        <Save size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-400">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Secure Terminal</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Encrypted Database Tunnel Active</p>
              </div>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setShowSql(!showSql)} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">SQL Schema</button>
              <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">API Logs</button>
              <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">System Status</button>
            </div>
          </div>
          {showSql && (
            <div className="mt-8 bg-slate-900 rounded-[2rem] p-8 relative group">
              <button onClick={handleCopySql} className="absolute top-6 right-6 p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
              <pre className="text-[11px] font-mono text-blue-300 overflow-x-auto leading-relaxed">
{`-- Run this in Supabase SQL Editor
create table amazon_affiliate_products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  market text not null,
  category text not null,
  title text not null,
  asin text,
  affiliate_link text not null,
  image_url text,
  price numeric not null,
  currency text default 'USD',
  rating numeric default 5.0,
  is_active boolean default false,
  tags text[] default '{}',
  description text,
  short_benefit text,
  featured boolean default false,
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
  affiliate_product_1 uuid references amazon_affiliate_products(id),
  affiliate_product_2 uuid references amazon_affiliate_products(id),
  excerpt text,
  tags text[] default '{}',
  featured boolean default false,
  status text default 'published'
);

create table if not exists affiliate_link_mappings (
  key text primary key,
  product_id uuid references amazon_affiliate_products(id)
);

create table if not exists premium_guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Fitness', 'Nutrition', 'Wellness')),
  short_description text not null,
  long_description text not null,
  price_display text not null,
  stripe_price_id text not null,
  image text not null,
  file_name text not null,
  featured boolean default false,
  tags text[] default '{}',
  included text[] default '{}',
  audience text not null,
  disclaimer text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);`}
              </pre>
            </div>
          )}
        </footer>
      </main>
    </div>
  );
}
