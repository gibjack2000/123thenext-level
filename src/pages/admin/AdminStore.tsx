import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Check, 
  X, 
  RefreshCw, 
  Filter, 
  Globe, 
  AlertCircle, 
  Save,
  ShieldCheck,
  Tag,
  Trash2,
  CheckCircle2,
  Sliders,
  DollarSign,
  Link as LinkIcon,
  ShoppingBag,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { supabase as importedSupabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { AdminLayout } from '../../components/AdminLayout';
import { 
  STORE_CATEGORIES, 
  StoreCategory, 
  MarketRegion, 
  SupplierOption, 
  resolveProductSuppliers,
  sovereignHealthStack
} from '../../config/affiliateLinks';
import { normalizeStoreCategory, getCategoryDisplayLabel } from '../Store';

// Reliable Supabase client
const supabase = importedSupabase || createClient(
  import.meta.env.VITE_SUPABASE_URL || supabaseUrl || 'https://seoaictzhmqdwnkfymxt.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI'
);

export interface AdminProductItem {
  id: string;
  name: string;
  category: StoreCategory | string;
  rating: number;
  description: string;
  price_text: string;
  deal_url: string;
  market_region: MarketRegion;
  badge_text: string;
  image_url: string;
  suppliers: SupplierOption[];
}

export const AdminStore: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMarket, setSelectedMarket] = useState<MarketRegion>('US');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionNotice, setActionNotice] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Add Supplier Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [targetProduct, setTargetProduct] = useState<AdminProductItem | null>(null);
  const [newSupplierForm, setNewSupplierForm] = useState<{
    supplierName: string;
    url: string;
    ctaText: string;
    priceText: string;
    badgeText: string;
    perksNote: string;
    isPrimary: boolean;
  }>({
    supplierName: 'Amazon',
    url: '',
    ctaText: '',
    priceText: '',
    badgeText: '',
    perksNote: '',
    isPrimary: false
  });

  // Verify Admin Auth
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

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setActionNotice({ message, type });
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Broadcast change so live storefront updates without rebuild
  const broadcastStorefrontUpdate = useCallback((productId: string, supplierId: string, action: string) => {
    try {
      const syncPayload = { market: selectedMarket, productId, supplierId, action, timestamp: Date.now() };
      localStorage.setItem(`sovereign_suppliers_live_sync`, JSON.stringify(syncPayload));
      localStorage.setItem(`sovereign_store_suppliers_sync_${selectedMarket}`, Date.now().toString());
      window.dispatchEvent(new CustomEvent('product_suppliers_changed', { detail: syncPayload }));
    } catch (err) {
      console.warn('Local broadcast sync warning:', err);
    }
  }, [selectedMarket]);

  // Load Products & Dynamic Suppliers for Market
  const loadMarketProductsAndSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch base products for market
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .eq('market_region', selectedMarket)
        .order('rating', { ascending: false });

      if (prodErr) {
        console.warn('Database fetch warning, using offline master catalog:', prodErr.message);
      }

      // 2. Fetch active/custom suppliers from product_suppliers table
      let dbSuppliers: any[] = [];
      try {
        const { data: supData, error: supErr } = await supabase
          .from('product_suppliers')
          .select('*')
          .eq('market_region', selectedMarket);
        
        if (!supErr && Array.isArray(supData)) {
          dbSuppliers = supData;
        }
      } catch (err) {
        console.warn('Custom suppliers table query skipped:', err);
      }

      // Read local storage overrides for deleted/toggled suppliers
      const deletedIdsKey = `sovereign_deleted_suppliers_${selectedMarket}`;
      const deletedIds = new Set<string>(JSON.parse(localStorage.getItem(deletedIdsKey) || '[]'));

      const toggledStateKey = `sovereign_toggled_suppliers_${selectedMarket}`;
      const toggledStates: Record<string, boolean> = JSON.parse(localStorage.getItem(toggledStateKey) || '{}');

      // Base catalog fallback if db has no products
      const baseCatalog = (dbProducts && dbProducts.length > 0)
        ? dbProducts
        : sovereignHealthStack.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            rating: p.rating,
            description: p.description,
            price_text: selectedMarket === 'UK' ? '£49.00' : selectedMarket === 'ES' ? '49,00€' : '$49.00',
            deal_url: p[selectedMarket.toLowerCase() as 'us' | 'uk' | 'es']?.[0]?.url || '',
            market_region: selectedMarket,
            badge_text: 'Verified Supplier',
            image_url: p.image_url
          }));

      const enriched: AdminProductItem[] = baseCatalog.map((prod: any) => {
        const cat = normalizeStoreCategory(prod.category, prod.name, prod.deal_url);
        
        // Match suppliers from product_suppliers table
        const matchingDb = dbSuppliers.filter(s => s.product_id === prod.id);

        let finalSuppliers: SupplierOption[] = [];
        if (matchingDb.length > 0) {
          finalSuppliers = matchingDb.map(row => ({
            id: String(row.id),
            productId: row.product_id,
            marketRegion: row.market_region,
            supplierName: row.supplier_name,
            url: row.url,
            ctaText: row.cta_text,
            priceText: row.price_text,
            badgeText: row.badge_text,
            isPrimary: Boolean(row.is_primary),
            isActive: row.is_active !== false,
            perksNote: row.perks_note
          }));
        } else {
          // Generate standard default suppliers
          finalSuppliers = resolveProductSuppliers(prod, selectedMarket);
        }

        // Apply local overrides & deleted filters
        finalSuppliers = finalSuppliers
          .filter(s => s.id && !deletedIds.has(s.id))
          .map(s => {
            if (s.id && toggledStates[s.id] !== undefined) {
              return { ...s, isActive: toggledStates[s.id] };
            }
            return s;
          });

        return {
          id: prod.id,
          name: prod.name || 'Curated Product',
          category: cat,
          rating: prod.rating || 4.8,
          description: prod.description || '',
          price_text: prod.price_text || '',
          deal_url: prod.deal_url || '',
          market_region: selectedMarket,
          badge_text: prod.badge_text || '',
          image_url: prod.image_url || '',
          suppliers: finalSuppliers
        };
      });

      setProducts(enriched);
    } catch (err: any) {
      console.error('Failed to load store supplier catalog:', err);
      showNotification('Failed to load catalog. Using verified offline fallbacks.', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedMarket]);

  useEffect(() => {
    if (isAuthenticated) {
      loadMarketProductsAndSuppliers();
    }
  }, [isAuthenticated, loadMarketProductsAndSuppliers]);

  // TOGGLE IS_ACTIVE ACTION
  const handleToggleSupplierActive = async (productId: string, supplier: SupplierOption) => {
    if (!supplier.id) return;
    const newActiveState = supplier.isActive === false;

    // 1. Optimistic UI Update
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        suppliers: p.suppliers.map(s => s.id === supplier.id ? { ...s, isActive: newActiveState } : s)
      };
    }));

    // 2. Persist to Local Storage for zero-rebuild instantaneous sync
    const toggledStateKey = `sovereign_toggled_suppliers_${selectedMarket}`;
    const currentToggles = JSON.parse(localStorage.getItem(toggledStateKey) || '{}');
    currentToggles[supplier.id] = newActiveState;
    localStorage.setItem(toggledStateKey, JSON.stringify(currentToggles));

    // 3. Persist to Supabase product_suppliers
    try {
      const { error } = await supabase
        .from('product_suppliers')
        .upsert({
          id: supplier.id,
          product_id: productId,
          market_region: selectedMarket,
          supplier_name: supplier.supplierName,
          url: supplier.url,
          cta_text: supplier.ctaText,
          price_text: supplier.priceText,
          badge_text: supplier.badgeText,
          is_primary: supplier.isPrimary,
          is_active: newActiveState,
          perks_note: supplier.perksNote,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Supabase toggle update note:', error.message);
      }
    } catch (err) {
      console.warn('Database offline, change preserved locally in live storefront cache:', err);
    }

    broadcastStorefrontUpdate(productId, supplier.id, 'toggle');
    showNotification(
      `${supplier.supplierName} ${newActiveState ? 'activated' : 'deactivated'} for ${selectedMarket}. Live storefront updated!`,
      'success'
    );
  };

  // DELETE SUPPLIER ACTION
  const handleDeleteSupplier = async (productId: string, supplier: SupplierOption) => {
    if (!supplier.id) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete supplier "${supplier.supplierName}" for ${selectedMarket}?\n\nIf this leaves 1 supplier, the storefront card collapses into a single CTA. If 0 suppliers remain, the product is automatically hidden.`
    );
    if (!confirmed) return;

    // 1. Optimistic UI Update
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        suppliers: p.suppliers.filter(s => s.id !== supplier.id)
      };
    }));

    // 2. Persist deletion in local storage for instant live storefront sync
    const deletedIdsKey = `sovereign_deleted_suppliers_${selectedMarket}`;
    const deletedIds: string[] = JSON.parse(localStorage.getItem(deletedIdsKey) || '[]');
    if (!deletedIds.includes(supplier.id)) {
      deletedIds.push(supplier.id);
      localStorage.setItem(deletedIdsKey, JSON.stringify(deletedIds));
    }

    // 3. Execute exact Supabase deletion
    try {
      const { error } = await supabase
        .from('product_suppliers')
        .delete()
        .eq('id', supplier.id);

      if (error) {
        console.warn('Supabase deletion note:', error.message);
      }
    } catch (err) {
      console.warn('Database deletion fallback preserved locally:', err);
    }

    broadcastStorefrontUpdate(productId, supplier.id, 'delete');
    showNotification(`Supplier "${supplier.supplierName}" deleted from ${selectedMarket}. Live storefront updated!`, 'success');
  };

  // ADD SUPPLIER MODAL SUBMIT
  const handleAddSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProduct) return;

    const newId = `${targetProduct.id}-${selectedMarket.toLowerCase()}-${newSupplierForm.supplierName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    const newOption: SupplierOption = {
      id: newId,
      productId: targetProduct.id,
      marketRegion: selectedMarket,
      supplierName: newSupplierForm.supplierName as any,
      url: newSupplierForm.url,
      ctaText: newSupplierForm.ctaText || `Order on ${newSupplierForm.supplierName}`,
      priceText: newSupplierForm.priceText || targetProduct.price_text,
      badgeText: newSupplierForm.badgeText || 'Verified Supplier',
      perksNote: newSupplierForm.perksNote,
      isPrimary: newSupplierForm.isPrimary,
      isActive: true
    };

    // 1. Optimistic UI Update
    setProducts(prev => prev.map(p => {
      if (p.id !== targetProduct.id) return p;
      const updated = newOption.isPrimary 
        ? p.suppliers.map(s => ({ ...s, isPrimary: false })) 
        : [...p.suppliers];
      return {
        ...p,
        suppliers: [...updated, newOption]
      };
    }));

    // 2. Persist to Supabase
    try {
      await supabase
        .from('product_suppliers')
        .insert({
          id: newId,
          product_id: targetProduct.id,
          market_region: selectedMarket,
          supplier_name: newOption.supplierName,
          url: newOption.url,
          cta_text: newOption.ctaText,
          price_text: newOption.priceText,
          badge_text: newOption.badgeText,
          is_primary: newOption.isPrimary,
          is_active: true,
          perks_note: newOption.perksNote,
          created_at: new Date().toISOString()
        });
    } catch (err) {
      console.warn('Database insert note, active in local cache:', err);
    }

    broadcastStorefrontUpdate(targetProduct.id, newId, 'add');
    setIsAddModalOpen(false);
    setTargetProduct(null);
    showNotification(`Added ${newOption.supplierName} to ${targetProduct.name}. Storefront updated!`, 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3 border border-cyan-500/20">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Storefront Supplier Manager</h2>
            <p className="text-xs text-slate-400 mt-1">Multi-Supplier Architecture & Live Deletion Engine</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Administrator Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-850 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                <AlertCircle size={14} />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
            >
              Authenticate &amp; Open Store Manager
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter products by category & search query
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.suppliers.some(s => s.supplierName.toLowerCase().includes(query) || s.url.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminLayout
      title="Storefront Supplier Manager"
      subtitle="Manage Multi-Market Suppliers, Live Toggles & Deletions (Auto-Collapsing CTAs)"
    >
      <div className="space-y-6">
        {/* Top Control Bar: Market Selector & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
          {/* Market Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1.5">
              <Globe size={14} className="text-cyan-400" /> Market:
            </span>
            {(['US', 'UK', 'ES'] as MarketRegion[]).map(m => (
              <button
                key={m}
                onClick={() => setSelectedMarket(m)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedMarket === m
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                }`}
              >
                {m === 'US' ? '🇺🇸 US' : m === 'UK' ? '🇬🇧 UK' : '🇪🇸 ES'}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products, suppliers, or links..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Refresh Action */}
          <button
            onClick={loadMarketProductsAndSuppliers}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-cyan-400' : 'text-slate-400'} />
            <span>Reload</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter size={13} className="text-cyan-400" /> Category:
          </span>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Categories ({products.length})
          </button>
          {STORE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {getCategoryDisplayLabel(cat)}
            </button>
          ))}
        </div>

        {/* Action Notification Alert */}
        {actionNotice && (
          <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
            actionNotice.type === 'success' 
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
              : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
          }`}>
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <CheckCircle2 size={16} />
              <span>{actionNotice.message}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Live Architecture Status Summary Banner */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles size={15} className="text-cyan-400" />
            <span>Storefront Dynamic Rules:</span>
            <span className="text-emerald-400 font-bold">2+ Suppliers = Primary + Secondary CTAs</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold">1 Supplier = Collapsed Single CTA</span>
            <span className="text-slate-500">•</span>
            <span className="text-rose-400 font-bold">0 Suppliers = Auto-Hidden from Store</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/30 px-2 py-0.5 rounded">
            Live Market: {selectedMarket}
          </span>
        </div>

        {/* Products & Suppliers List */}
        {loading ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <RefreshCw size={28} className="animate-spin text-cyan-400 mx-auto" />
            <p className="text-sm">Synchronizing market catalog and suppliers...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-2">
            <AlertCircle size={28} className="text-slate-500 mx-auto" />
            <p className="text-sm font-semibold">No products found matching filters.</p>
            <p className="text-xs text-slate-500">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map(product => {
              const activeSuppliersCount = product.suppliers.filter(s => s.isActive !== false).length;
              return (
                <div 
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700 space-y-4"
                >
                  {/* Product Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-850">
                    <div className="flex items-center gap-3.5">
                      {product.image_url && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-1 shrink-0">
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest px-2 py-0.5 rounded bg-rose-950/20 border border-rose-900/30">
                            {product.category}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">ID: {product.id}</span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-tight">{product.name}</h3>
                      </div>
                    </div>

                    {/* Storefront Display Badge based on Active Suppliers */}
                    <div className="flex items-center gap-3 shrink-0">
                      {activeSuppliersCount >= 2 ? (
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg flex items-center gap-1.5">
                          <CheckCircle2 size={13} /> Multi-Supplier ({activeSuppliersCount} Active)
                        </span>
                      ) : activeSuppliersCount === 1 ? (
                        <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-lg flex items-center gap-1.5">
                          <Sliders size={13} /> Single CTA (1 Active)
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-3 py-1 rounded-lg flex items-center gap-1.5">
                          <EyeOff size={13} /> Hidden from Store (0 Active)
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setTargetProduct(product);
                          setNewSupplierForm({
                            supplierName: 'Amazon',
                            url: '',
                            ctaText: `Order on Amazon ${selectedMarket}`,
                            priceText: product.price_text,
                            badgeText: 'Verified Partner',
                            perksNote: selectedMarket === 'ES' ? 'Prime 24h' : 'Prime 2-Day',
                            isPrimary: product.suppliers.length === 0
                          });
                          setIsAddModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
                      >
                        <Plus size={13} /> Add Supplier
                      </button>
                    </div>
                  </div>

                  {/* Supplier Rows */}
                  {product.suppliers.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-850/80 text-center text-slate-500 text-xs">
                      No suppliers registered for this product in {selectedMarket}. Click "+ Add Supplier" to configure.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-12 gap-3 text-[11px] font-mono text-slate-500 uppercase tracking-wider px-3">
                        <span className="col-span-3">Supplier Name &amp; Perks</span>
                        <span className="col-span-4">Target Affiliate URL</span>
                        <span className="col-span-2">CTA &amp; Price</span>
                        <span className="col-span-1 text-center">Active</span>
                        <span className="col-span-2 text-right">Actions</span>
                      </div>

                      {product.suppliers.map(supplier => {
                        const isActive = supplier.isActive !== false;
                        return (
                          <div
                            key={supplier.id || supplier.supplierName}
                            className={`grid grid-cols-12 gap-3 items-center p-3 rounded-xl border text-xs transition-all ${
                              isActive
                                ? 'bg-slate-950/70 border-slate-800 text-slate-200'
                                : 'bg-slate-950/30 border-slate-900/60 text-slate-500 opacity-60'
                            }`}
                          >
                            {/* Supplier Name & Badge */}
                            <div className="col-span-3 flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{supplier.supplierName}</span>
                              {supplier.isPrimary && (
                                <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded">
                                  Primary
                                </span>
                              )}
                              {supplier.perksNote && (
                                <span className="text-[10px] text-amber-400 font-normal">
                                  ({supplier.perksNote})
                                </span>
                              )}
                            </div>

                            {/* Destination URL */}
                            <div className="col-span-4 truncate">
                              <a
                                href={supplier.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline text-xs truncate max-w-full"
                              >
                                <span className="truncate">{supplier.url}</span>
                                <ExternalLink size={12} className="shrink-0 text-slate-500" />
                              </a>
                            </div>

                            {/* CTA & Price */}
                            <div className="col-span-2 flex flex-col">
                              <span className="font-bold text-white text-xs">{supplier.priceText || product.price_text}</span>
                              <span className="text-[11px] text-slate-400 truncate">{supplier.ctaText}</span>
                            </div>

                            {/* "Is Active" Toggle */}
                            <div className="col-span-1 flex justify-center">
                              <button
                                type="button"
                                onClick={() => handleToggleSupplierActive(product.id, supplier)}
                                title={isActive ? 'Deactivate Supplier' : 'Activate Supplier'}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  isActive ? 'bg-emerald-500' : 'bg-slate-800'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isActive ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Delete Supplier Action */}
                            <div className="col-span-2 flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleDeleteSupplier(product.id, supplier)}
                                title="Delete Supplier"
                                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Add Supplier Modal */}
        {isAddModalOpen && targetProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Add Supplier Option</h3>
                  <p className="text-xs text-slate-400 truncate max-w-sm">{targetProduct.name}</p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddSupplierSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Supplier Name</label>
                  <select
                    value={newSupplierForm.supplierName}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, supplierName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="iHerb">iHerb</option>
                    <option value="Life Extension">Life Extension</option>
                    <option value="Withings">Withings</option>
                    <option value="HealthLabs">HealthLabs</option>
                    <option value="LOLA Health">LOLA Health</option>
                    <option value="Melio">Melio</option>
                    <option value="Other">Custom Supplier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Affiliate Destination URL</label>
                  <input
                    type="url"
                    required
                    value={newSupplierForm.url}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={newSupplierForm.ctaText}
                      onChange={e => setNewSupplierForm({ ...newSupplierForm, ctaText: e.target.value })}
                      placeholder="e.g. Order on iHerb"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Price Text</label>
                    <input
                      type="text"
                      value={newSupplierForm.priceText}
                      onChange={e => setNewSupplierForm({ ...newSupplierForm, priceText: e.target.value })}
                      placeholder="e.g. $29.99"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={newSupplierForm.badgeText}
                      onChange={e => setNewSupplierForm({ ...newSupplierForm, badgeText: e.target.value })}
                      placeholder="e.g. Third-Party Tested"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Perks Note</label>
                    <input
                      type="text"
                      value={newSupplierForm.perksNote}
                      onChange={e => setNewSupplierForm({ ...newSupplierForm, perksNote: e.target.value })}
                      placeholder="e.g. Prime 2-Day or Rewards + 5%"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isPrimaryCheckbox"
                    checked={newSupplierForm.isPrimary}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, isPrimary: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <label htmlFor="isPrimaryCheckbox" className="text-slate-300 font-medium cursor-pointer">
                    Set as Primary Supplier for this market
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-750 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
                  >
                    Save &amp; Publish Supplier
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminStore;
