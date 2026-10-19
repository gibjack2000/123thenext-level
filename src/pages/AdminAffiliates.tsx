import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Check, 
  X, 
  Edit3, 
  RefreshCw, 
  Filter, 
  Globe, 
  AlertCircle, 
  Save,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { supabase as importedSupabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

// Reliable Supabase client with environment and configured fallbacks
const supabase = importedSupabase || createClient(
  import.meta.env.VITE_SUPABASE_URL || supabaseUrl || 'https://seoaictzhmqdwnkfymxt.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI'
);

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  price_text: string;
  deal_url: string;
  market_region: 'US' | 'UK' | 'ES';
  badge_text: string;
  image_url: string;
  is_direct_affiliate?: boolean;
  hub_placement_slot?: string | null;
  updated_at?: string;
}

const PREDEFINED_CATEGORIES = [
  'Tech Gadgets & Wearables',
  'Performance & Testing',
  'Supplements',
  'Lifestyle & Performance Gear',
  'Health & Wellness',
  'Fitness',
  'Kitchen'
];

export const AdminAffiliates: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Filters
  const [selectedRegion, setSelectedRegion] = useState<string>('US');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Inline Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    price_text: string;
    badge_text: string;
    deal_url: string;
    category: string;
    market_region: 'US' | 'UK' | 'ES';
    is_direct_affiliate: boolean;
  }>({
    name: '',
    price_text: '',
    badge_text: '',
    deal_url: '',
    category: '',
    market_region: 'US',
    is_direct_affiliate: false
  });

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newProductForm, setNewProductForm] = useState<{
    id: string;
    name: string;
    category: string;
    rating: number;
    description: string;
    price_text: string;
    deal_url: string;
    market_region: 'US' | 'UK' | 'ES';
    badge_text: string;
    image_url: string;
    is_direct_affiliate: boolean;
  }>({
    id: '',
    name: '',
    category: 'Tech Gadgets & Wearables',
    rating: 4.8,
    description: '',
    price_text: '$0.00',
    deal_url: '',
    market_region: 'US',
    badge_text: '',
    image_url: '',
    is_direct_affiliate: false
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        showToast(`❌ Error fetching products: ${error.message}`);
      } else if (data) {
        setProducts(data as ProductItem[]);
      }
    } catch (err: any) {
      showToast(`❌ Connection error: ${err.message || 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const startEdit = (p: ProductItem) => {
    setEditingId(p.id);
    setEditForm({
      name: p.name || '',
      price_text: p.price_text || '',
      badge_text: p.badge_text || '',
      deal_url: p.deal_url || '',
      category: p.category || '',
      market_region: p.market_region || 'US',
      is_direct_affiliate: Boolean(p.is_direct_affiliate)
    });
  };

  const handleSaveProduct = async (id: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editForm.name,
          price_text: editForm.price_text,
          badge_text: editForm.badge_text,
          deal_url: editForm.deal_url,
          category: editForm.category,
          market_region: editForm.market_region,
          is_direct_affiliate: editForm.is_direct_affiliate,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        showToast(`❌ Update failed: ${error.message}`);
      } else {
        showToast(`✅ Successfully updated affiliate & product data for ${id}`);
        setEditingId(null);
        fetchProducts();
      }
    } catch (err: any) {
      showToast(`❌ Update exception: ${err.message || 'Unknown'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProductForm.id.trim() || !newProductForm.name.trim() || !newProductForm.deal_url.trim()) {
      showToast('⚠️ Please provide an ID, Product Name, and Affiliate Deal URL.');
      return;
    }

    setIsCreating(true);
    try {
      const { error } = await supabase
        .from('products')
        .insert([
          {
            id: newProductForm.id.trim(),
            name: newProductForm.name.trim(),
            category: newProductForm.category,
            rating: Number(newProductForm.rating) || 4.8,
            description: newProductForm.description.trim(),
            price_text: newProductForm.price_text.trim() || '$0.00',
            deal_url: newProductForm.deal_url.trim(),
            market_region: newProductForm.market_region,
            badge_text: newProductForm.badge_text.trim(),
            image_url: newProductForm.image_url.trim(),
            is_direct_affiliate: newProductForm.is_direct_affiliate,
            updated_at: new Date().toISOString()
          }
        ]);

      if (error) {
        showToast(`❌ Failed to create product: ${error.message}`);
      } else {
        showToast(`✅ Product "${newProductForm.name}" created successfully!`);
        setIsAddModalOpen(false);
        setNewProductForm({
          id: '',
          name: '',
          category: 'Tech Gadgets & Wearables',
          rating: 4.8,
          description: '',
          price_text: '$0.00',
          deal_url: '',
          market_region: selectedRegion === 'ALL' ? 'US' : (selectedRegion as 'US' | 'UK' | 'ES'),
          badge_text: '',
          image_url: '',
          is_direct_affiliate: false
        });
        fetchProducts();
      }
    } catch (err: any) {
      showToast(`❌ Create exception: ${err.message || 'Unknown'}`);
    } finally {
      setIsCreating(false);
    }
  };

  // Generate unique categories for filtering
  const allCategories = [
    'ALL',
    ...Array.from(new Set([...PREDEFINED_CATEGORIES, ...products.map((p) => p.category).filter(Boolean)]))
  ];

  // Multi-market + Category + Search filtering
  const filteredProducts = products.filter((p) => {
    const matchesRegion = selectedRegion === 'ALL' || p.market_region === selectedRegion;
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.name?.toLowerCase().includes(query) ||
      p.id?.toLowerCase().includes(query) ||
      p.deal_url?.toLowerCase().includes(query) ||
      p.badge_text?.toLowerCase().includes(query);

    return matchesRegion && matchesCategory && matchesSearch;
  });

  // Calculate Region Counts
  const usCount = products.filter((p) => p.market_region === 'US').length;
  const ukCount = products.filter((p) => p.market_region === 'UK').length;
  const esCount = products.filter((p) => p.market_region === 'ES').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-cyan-500/60 text-cyan-300 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                <Globe className="w-6 h-6" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sovereign Affiliate Manager
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              Live Supabase database management portal for multi-market product links, regional routing, and affiliate tags.
            </p>
          </div>

          {/* Quick Actions & Region Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fetchProducts()}
              disabled={loading}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition-all"
              title="Refresh from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              Sync
            </button>

            <button
              onClick={() => {
                setNewProductForm((prev) => ({
                  ...prev,
                  market_region: selectedRegion === 'ALL' ? 'US' : (selectedRegion as 'US' | 'UK' | 'ES')
                }));
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>

            {/* Market Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: 'US', label: '🇺🇸 US', count: usCount },
                { id: 'UK', label: '🇬🇧 UK', count: ukCount },
                { id: 'ES', label: '🇪🇸 ES', count: esCount },
                { id: 'ALL', label: '🌍 All', count: products.length }
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedRegion === reg.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span>{reg.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedRegion === reg.id ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {reg.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-grow max-w-2xl">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, ID, ASIN, or URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:border-cyan-500 outline-none w-full sm:w-auto cursor-pointer"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'ALL' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-400 shrink-0">
            Showing <strong className="text-cyan-400 font-mono">{filteredProducts.length}</strong> of{' '}
            <span className="font-mono">{products.length}</span> products for{' '}
            <span className="font-bold text-slate-200">
              {selectedRegion === 'ALL' ? 'All Markets' : `${selectedRegion} Market`}
            </span>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/90 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                  <th className="p-4 w-24">Market</th>
                  <th className="p-4 min-w-[280px]">Product Details</th>
                  <th className="p-4 w-28">Price</th>
                  <th className="p-4 min-w-[320px]">Affiliate Destination URL</th>
                  <th className="p-4 text-right w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                        <span>Querying Supabase products database...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="w-8 h-8 text-slate-600" />
                        <p className="font-semibold text-slate-300">No products match the selected criteria.</p>
                        <p className="text-[11px] text-slate-500">
                          Try adjusting your search query, region, or category filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const isEditing = editingId === p.id;

                    return (
                      <tr
                        key={p.id}
                        className={`transition-colors ${
                          isEditing ? 'bg-cyan-950/20 border-l-2 border-cyan-500' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        {/* Market Badge */}
                        <td className="p-4 align-top">
                          {isEditing ? (
                            <select
                              value={editForm.market_region}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  market_region: e.target.value as 'US' | 'UK' | 'ES'
                                })
                              }
                              className="bg-slate-950 border border-cyan-500/50 rounded-lg p-1 text-xs text-cyan-300 font-bold outline-none"
                            >
                              <option value="US">🇺🇸 US</option>
                              <option value="UK">🇬🇧 UK</option>
                              <option value="ES">🇪🇸 ES</option>
                            </select>
                          ) : (
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                                p.market_region === 'US'
                                  ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                                  : p.market_region === 'UK'
                                  ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                              }`}
                            >
                              {p.market_region === 'US'
                                ? '🇺🇸 US'
                                : p.market_region === 'UK'
                                ? '🇬🇧 UK'
                                : '🇪🇸 ES'}
                            </span>
                          )}

                          {p.is_direct_affiliate && (
                            <div className="mt-1 text-[9px] font-bold text-emerald-400 uppercase tracking-tight">
                              ★ Direct Deal
                            </div>
                          )}
                        </td>

                        {/* Product Info (ID, Name, Badge, Category) */}
                        <td className="p-4 align-top">
                          {isEditing ? (
                            <div className="space-y-2">
                              <div>
                                <label className="text-[10px] text-slate-400 font-semibold block">Title</label>
                                <input
                                  type="text"
                                  value={editForm.name}
                                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                  className="w-full bg-slate-950 border border-cyan-500/50 rounded-lg p-1.5 text-xs text-white outline-none focus:border-cyan-400"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] text-slate-400 font-semibold block">Badge</label>
                                  <input
                                    type="text"
                                    value={editForm.badge_text}
                                    placeholder="e.g. Top Rated"
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, badge_text: e.target.value })
                                    }
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1 text-xs text-slate-300 outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] text-slate-400 font-semibold block">Category</label>
                                  <select
                                    value={editForm.category}
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, category: e.target.value })
                                    }
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1 text-xs text-slate-300 outline-none"
                                  >
                                    {PREDEFINED_CATEGORIES.map((cat) => (
                                      <option key={cat} value={cat}>
                                        {cat}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-bold text-slate-100 leading-snug">{p.name}</div>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                                  {p.id}
                                </span>
                                {p.badge_text && (
                                  <span className="text-[10px] text-amber-400/90 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                    <Tag className="w-2.5 h-2.5" />
                                    {p.badge_text}
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-400">
                                  {p.category}
                                </span>
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Price */}
                        <td className="p-4 align-top">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.price_text}
                              onChange={(e) => setEditForm({ ...editForm, price_text: e.target.value })}
                              placeholder="$0.00"
                              className="w-20 bg-slate-950 border border-cyan-500/50 rounded-lg p-1.5 text-xs text-cyan-300 font-bold font-mono outline-none"
                            />
                          ) : (
                            <span className="font-black font-mono text-cyan-400 text-xs">
                              {p.price_text || '—'}
                            </span>
                          )}
                        </td>

                        {/* Affiliate Destination URL & Test Link */}
                        <td className="p-4 align-top">
                          {isEditing ? (
                            <div className="space-y-1">
                              <input
                                type="text"
                                className="w-full bg-slate-950 border border-cyan-500 rounded-lg p-2 text-xs text-cyan-300 font-mono outline-none focus:ring-1 focus:ring-cyan-500"
                                value={editForm.deal_url}
                                onChange={(e) => setEditForm({ ...editForm, deal_url: e.target.value })}
                                placeholder="https://www.amazon.com/dp/... or https://amzn.to/..."
                              />
                              <div className="text-[10px] text-slate-500">
                                Ensure your regional tag (e.g., <code>tag=123znl0e-20</code>) is attached.
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className="truncate font-mono text-[11px] text-slate-300 max-w-[320px] bg-slate-950/60 px-2 py-1 rounded border border-slate-800/80"
                                  title={p.deal_url}
                                >
                                  {p.deal_url || <em className="text-slate-600">No URL configured</em>}
                                </span>

                                {p.deal_url ? (
                                  <a
                                    href={p.deal_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-colors text-[10px] shrink-0 font-bold"
                                    title="Test link destination in new browser tab"
                                  >
                                    <span>Test Link</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ) : (
                                  <span className="text-[10px] text-amber-500 font-semibold shrink-0">
                                    ⚠️ Missing Link
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 align-top text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleSaveProduct(p.id)}
                                disabled={isSaving}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
                              >
                                {isSaving ? (
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Save className="w-3.5 h-3.5" />
                                )}
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-all"
                              >
                                <X className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEdit(p)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 hover:border-cyan-500/40 text-xs font-bold transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-5 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg">
                  <Plus className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-black text-white">Add Product to Supabase</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              {/* Product ID and Market */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    Product ID <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. withings-scale-us"
                    value={newProductForm.id}
                    onChange={(e) => setNewProductForm({ ...newProductForm, id: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono outline-none focus:border-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500">Unique identifier key in database</span>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    Market Region <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={newProductForm.market_region}
                    onChange={(e) =>
                      setNewProductForm({
                        ...newProductForm,
                        market_region: e.target.value as 'US' | 'UK' | 'ES'
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="US">🇺🇸 United States (US)</option>
                    <option value="UK">🇬🇧 United Kingdom (UK)</option>
                    <option value="ES">🇪🇸 Spain / EU (ES)</option>
                  </select>
                </div>
              </div>

              {/* Title & Category */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Product Title / Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oura Ring Horizon Gen 3"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {PREDEFINED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Price Text</label>
                  <input
                    type="text"
                    placeholder="e.g. $299.00 or £249.00"
                    value={newProductForm.price_text}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, price_text: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Deal URL */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Affiliate Deal URL <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.amazon.com/dp/... or https://amzn.to/..."
                  value={newProductForm.deal_url}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, deal_url: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-cyan-300 font-mono outline-none focus:border-cyan-500"
                />
              </div>

              {/* Badge Text & Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Badge Text (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Top Longevity Pick"
                    value={newProductForm.badge_text}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, badge_text: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Image URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="/assets/images/shop/... or https://..."
                    value={newProductForm.image_url}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, image_url: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Clinical or technical summary of the product..."
                  value={newProductForm.description}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, description: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Direct Affiliate Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_direct"
                  checked={newProductForm.is_direct_affiliate}
                  onChange={(e) =>
                    setNewProductForm({
                      ...newProductForm,
                      is_direct_affiliate: e.target.checked
                    })
                  }
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="is_direct" className="text-slate-300 cursor-pointer select-none">
                  Direct brand affiliate partnership (bypass Amazon tag)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
                >
                  {isCreating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAffiliates;
