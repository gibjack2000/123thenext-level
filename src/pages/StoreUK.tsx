import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { 
  Sparkles, 
  Search, 
  Star, 
  ShieldCheck, 
  Microscope, 
  CheckCircle2, 
  Lock, 
  ExternalLink, 
  RefreshCw,
  AlertCircle,
  Stethoscope,
  FileText
} from 'lucide-react';
import { supabase as importedSupabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';
import { useMarket } from '../contexts/MarketContext';
import { ProductRecord } from './StoreUS';
import {
  STOREFRONT_CATEGORIES,
  normalizeStoreCategory,
  isDiagnosticProduct,
  isLolaProduct,
  isBundledDiagnosticImage,
  getDiagnosticCountryBadge,
  getCleanDiagnosticCta,
  getDiagnosticPricingBadge,
  resolveDiagnosticImage,
  formatDiagnosticPrice,
  ensureCoreRegionalCatalog,
  getCategoryDisplayLabel,
  MultiSupplierOptionsBar,
  DynamicSupplierCtaSection,
  getActiveSuppliers,
  lolaBloodPanelImg,
  clinicalBloodPanelImg,
  withingsScaleImg
} from './Store';
import { DigitalGuides } from '../components/DigitalGuides';
import BundleOffers from '../components/BundleOffers';

// Reliable Supabase client initialization
const supabase = importedSupabase || createClient(
  import.meta.env.VITE_SUPABASE_URL || supabaseUrl || 'https://seoaictzhmqdwnkfymxt.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI'
);

export const StoreUK: React.FC = () => {
  const navigate = useNavigate();
  const { setMarket } = useMarket();
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setMarket('UK');
  }, [setMarket]);

  // Live Supabase fetch for UK products
  const fetchUKProducts = async () => {
    try {
      setFetchError(null);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('market_region', 'UK')
        .order('rating', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const sanitized: ProductRecord[] = data.map((item: any) => {
          let healedDeal = item.deal_url || item.affiliate_link || '';
          if (healedDeal.startsWith('https://123thenextlevel.comhttp')) {
            healedDeal = healedDeal.replace('https://123thenextlevel.com', '');
          }

          const catFormatted = normalizeStoreCategory(item.category, item.name, healedDeal);
          const isDiag = isDiagnosticProduct({ ...item, category: catFormatted, deal_url: healedDeal });

          let healedImg = resolveDiagnosticImage(
            { ...item, market_region: 'UK', category: catFormatted, deal_url: healedDeal },
            item.image_url || '/Products/oxford.jpeg',
            'UK'
          );
          if (
            !healedImg.startsWith('http') &&
            !isBundledDiagnosticImage(healedImg)
          ) {
            if (healedImg.startsWith('/assets/') || healedImg.startsWith('/Products/')) {
              healedImg = `https://123thenextlevel.com${healedImg}`;
            }
          }

          const rawPrice = item.price_text || (item.price != null ? `£${Number(item.price).toFixed(2)}` : '£0.00');
          const priceFormatted = formatDiagnosticPrice(rawPrice, { ...item, market_region: 'UK', category: catFormatted, deal_url: healedDeal }, 'UK');

          return {
            id: item.id,
            name: item.name || 'Curated UK Protocol',
            category: catFormatted,
            rating: typeof item.rating === 'number' ? item.rating : 4.8,
            description: item.description || 'Clinically verified biological telemetry and longevity equipment for the UK market.',
            price_text: priceFormatted,
            deal_url: healedDeal,
            market_region: 'UK',
            badge_text: item.badge_text || (isDiag ? getDiagnosticCountryBadge('UK', item) : 'MHRA / UK Verified'),
            image_url: healedImg,
            is_direct_affiliate: item.is_direct_affiliate || (!healedDeal.toLowerCase().includes('amazon')),
            hub_placement_slot: item.hub_placement_slot,
            network: healedDeal.toLowerCase().includes('amazon') ? 'Amazon Associates' : 'Clinical Direct'
          };
        });

        setProducts(ensureCoreRegionalCatalog(sanitized, 'UK'));
      } else {
        setProducts(ensureCoreRegionalCatalog([], 'UK'));
      }
    } catch (err: any) {
      console.error('Error fetching UK products from Supabase:', err);
      setProducts(ensureCoreRegionalCatalog([], 'UK'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUKProducts();

    const channel = supabase
      .channel('products-uk-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products', filter: 'market_region=eq.UK' },
        () => {
          fetchUKProducts();
        }
      )
      .subscribe();

    const handleSuppliersChanged = () => {
      fetchUKProducts();
    };
    window.addEventListener('product_suppliers_changed', handleSuppliersChanged);
    window.addEventListener('storage', handleSuppliersChanged);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('product_suppliers_changed', handleSuppliersChanged);
      window.removeEventListener('storage', handleSuppliersChanged);
    };
  }, []);

  const categories = STOREFRONT_CATEGORIES;

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || 
      product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && getActiveSuppliers(product, 'UK').length > 0;
  });

  const isDiagCategoryActive = activeCategory.toLowerCase().includes('diagnostic');
  const clinicalPartners = filteredProducts.filter(p => 
    p.category === 'Clinical Diagnostics & Labs' || isDiagnosticProduct(p)
  );
  const amazonProducts = filteredProducts.filter(p => !clinicalPartners.includes(p));

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Ambient Glows & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)', backgroundSize: '32px 32px' }} 
      />

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-10 md:mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <Sparkles size={13} className="text-cyan-400 animate-pulse" />
          <span>Live Sovereign UK Procurement Hub • Supabase Powered</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent font-display">
          United Kingdom Longevity & Bio-Hardware Store 🇬🇧
        </h1>

        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
          Certified UK protocols built for uncompromising quality and speed. We audit against strict MHRA metrics and batch-purity standards, ensuring secure, instant data integration and dependable nationwide fulfillment.
        </p>

        {/* Highlights / Trust Pillars Grid */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>MHRA & UKCA Registered</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <Microscope size={13} className="text-cyan-400" />
            <span>Multi-Omic & Medical Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <CheckCircle2 size={13} className="text-amber-400" />
            <span>Direct Partner Portals</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <Lock size={13} className="text-sky-400" />
            <span>Zero Data Retention</span>
          </div>
        </div>
      </div>

      {/* Multi-Market Switcher Tabs */}
      <div className="max-w-md mx-auto flex justify-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl mb-8">
        <button
          type="button"
          onClick={() => navigate('/store-us')}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer min-h-[48px] text-slate-400 hover:text-white hover:bg-slate-800/60"
          aria-label="Select United States Market"
        >
          <FlagUS className="w-5 h-4 pointer-events-none" />
          <span>United States</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/store-uk')}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer min-h-[48px] bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg scale-105"
          aria-label="Select United Kingdom Market"
        >
          <FlagUK className="w-5 h-4 pointer-events-none" />
          <span>United Kingdom</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/store-es')}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer min-h-[48px] text-slate-400 hover:text-white hover:bg-slate-800/60"
          aria-label="Select Spain Market"
        >
          <FlagES className="w-5 h-4 pointer-events-none" />
          <span>España (EU)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search UK products, protocols, brands, or categories..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder-slate-500 transition-all backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Filter Pills */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-900 pb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {getCategoryDisplayLabel(category)}
          </button>
        ))}
      </div>

      {/* Clean Loading Skeleton */}
      {loading ? (
        <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase">
              Connecting to Live Supabase UK Product Table...
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-2xl bg-slate-800/50 mb-4 animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-700/40" />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-4 bg-slate-800 rounded w-28" />
                    <div className="h-4 bg-slate-800 rounded w-12" />
                  </div>
                  <div className="h-5 bg-slate-800 rounded w-4/5 mb-2" />
                  <div className="h-5 bg-slate-800/60 rounded w-2/3 mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-800/40 rounded w-full" />
                    <div className="h-3 bg-slate-800/40 rounded w-5/6" />
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-slate-800 rounded w-20" />
                    <div className="h-4 bg-slate-800 rounded w-16" />
                  </div>
                  <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                    <div className="h-6 bg-slate-800 rounded w-16" />
                    <div className="h-8 bg-slate-800 rounded-lg w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : fetchError && products.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 px-6 rounded-2xl bg-slate-900/60 border border-rose-900/30">
          <AlertCircle size={40} className="text-rose-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Live Catalog Unavailable</h3>
          <p className="text-xs text-slate-400 mb-6">{fetchError}</p>
          <button
            onClick={() => { setLoading(true); fetchUKProducts(); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
          >
            <RefreshCw size={14} />
            <span>Retry Live Sync</span>
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <p className="text-slate-400 text-sm">No UK products matched your search or category filter.</p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-lg bg-slate-855 border border-slate-800 text-cyan-400 text-xs font-bold hover:bg-slate-800"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Clinician Co-Pilot Helper Banner above Clinical Lab Panels */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-wider font-bold">
                  <Stethoscope size={12} className="text-cyan-400" />
                  <span>Physician Consultation Guide • 100% Free</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-bold">
                  Planning a LOLA Blood Panel? Consult Your GP First
                </h3>
                <p className="text-slate-350 text-xs sm:text-sm font-light leading-relaxed">
                  Before booking venous phlebotomy or starting high-dose protocols, use our free <strong>Clinician Co-Pilot Hub</strong> to translate your blood, urine, and wearable metrics into a standardized 2-Page GP Consultation Brief.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <Link
                  to="/clinician-copilot"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  <FileText size={14} />
                  <span>Open Clinician Co-Pilot →</span>
                </Link>
                <a
                  href="/assets/docs/clinical-baseline-consultation-template-v2.pdf"
                  download="clinical-baseline-consultation-template-v2.pdf"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all text-center"
                >
                  <span>Download 2-Page GP Brief PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* TIER 1: CLINICAL DIAGNOSTICS & DIRECT PARTNERS */}
          {clinicalPartners.length > 0 && (
            <div className="space-y-6">
              <div className="border-l-4 border-rose-500 pl-4">
                <span className="text-xs text-rose-500 uppercase font-semibold tracking-widest">DIRECT ACCESS PARTNERS</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Clinical Diagnostics &amp; Labs</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalPartners.map(product => {
                  const isDiag = isDiagnosticProduct(product);
                  const displayImg = resolveDiagnosticImage(product, product.image_url, 'UK');
                  const displayPrice = isDiag ? formatDiagnosticPrice(product.price_text, product, 'UK') : product.price_text;
                  return (
                    <div 
                      key={product.id} 
                      className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/30 p-6 flex flex-col justify-between shadow-xl transition-all duration-300"
                    >
                      <div>
                        {displayImg && (
                          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800/80 mb-4 flex items-center justify-center p-2 transition-colors group-hover:bg-white/[0.04]">
                            <img 
                              src={displayImg} 
                              alt={product.name} 
                              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                if (target.src.includes('123thenextlevel.com/')) {
                                  target.src = target.src.replace(/^https?:\/\/(?:www\.)?123thenextlevel\.com/, '');
                                  return;
                                }
                                if (isDiag) {
                                  target.src = isLolaProduct(product, 'UK') ? lolaBloodPanelImg : clinicalBloodPanelImg;
                                } else if (product.category === 'Smart Hardware & Wearables') {
                                  target.src = withingsScaleImg;
                                } else {
                                  target.src = '/assets/images/shop/sirtuin-stack.png';
                                }
                              }}
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-rose-950/20 border border-rose-900/30">
                            {product.category}
                          </span>
                          <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                            <Star size={13} className="fill-amber-400 text-amber-400" />
                            <span>{Number(product.rating).toFixed(1)}</span>
                          </span>
                        </div>
                        {isDiag && (
                          <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            <span className="text-[11px] font-bold text-sky-300 bg-sky-950/60 border border-sky-500/40 px-2.5 py-1 rounded-md">
                              {product.badge_text || getDiagnosticCountryBadge('UK', product)}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                              {getDiagnosticPricingBadge(product, 'UK')}
                            </span>
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500 font-semibold">Verification</span>
                          <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/20">
                            {product.badge_text || (isDiag ? getDiagnosticCountryBadge('UK', product) : 'MHRA / UKCA')}
                          </span>
                        </div>
                        <DynamicSupplierCtaSection
                          product={product}
                          market="UK"
                          isDiag={isDiag}
                          displayPrice={displayPrice}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TIER 2: CURATED LIFESTYLE & GEAR (AMAZON ASSOCIATES) */}
          {amazonProducts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-900">
              <div className="border-l-4 border-cyan-500 pl-4">
                <span className="text-xs text-cyan-400 uppercase font-semibold tracking-widest">VERIFIED PROTOCOL CATALOG</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">{activeCategory === 'All' ? 'Smart Hardware & Wearables' : getCategoryDisplayLabel(activeCategory)}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amazonProducts.map(product => {
                  const isDiag = isDiagnosticProduct(product);
                  const displayImg = resolveDiagnosticImage(product, product.image_url, 'UK');
                  return (
                    <div 
                      key={product.id} 
                      className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300"
                    >
                      <div>
                        {displayImg && (
                          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-slate-850/80 mb-4 flex items-center justify-center p-4 transition-colors group-hover:bg-white/[0.04]">
                            <img 
                              src={displayImg} 
                              alt={product.name} 
                              className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                if (target.src.includes('123thenextlevel.com/')) {
                                  target.src = target.src.replace(/^https?:\/\/(?:www\.)?123thenextlevel\.com/, '');
                                  return;
                                }
                                target.src = '/Products/oxford.jpeg';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                            {product.category}
                          </span>
                          <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                            <Star size={13} className="fill-amber-400 text-amber-400" />
                            <span>{Number(product.rating).toFixed(1)}</span>
                          </span>
                        </div>
                        {isDiag && (
                          <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            <span className="text-[11px] font-bold text-sky-300 bg-sky-950/60 border border-sky-500/40 px-2.5 py-1 rounded-md">
                              {getDiagnosticCountryBadge('UK', product)}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                              {getDiagnosticPricingBadge(product, 'UK')}
                            </span>
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500 font-semibold">Compliance Badge</span>
                          <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">
                            {isDiag ? getDiagnosticCountryBadge('UK', product) : (product.badge_text || 'UK Verified')}
                          </span>
                        </div>
                        <DynamicSupplierCtaSection
                          product={product}
                          market="UK"
                          isDiag={isDiag}
                          displayPrice={product.price_text}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 10 Digital Master Guides & Books Catalog */}
          <div className="pt-12 pb-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Direct Protocol Manuals
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                Digital Master Guides &amp; Longevity Books
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Evidence-based execution blueprints for metabolic health, body composition, sleep architecture, and autonomic engineering.
              </p>
            </div>
            <DigitalGuides showVaultBanner={false} />
          </div>

          {/* Master Protocol Bundles Showcase (Pick 3 for £29.99 or Complete 10 Vault for £59.99) */}
          <div className="pt-8 pb-4">
            <BundleOffers source="store" />
          </div>

          {/* Disclaimers & Sovereign Compliance */}
          <div className="text-center max-w-3xl mx-auto pt-12 border-t border-slate-900 space-y-2 text-[10px] text-slate-500 leading-relaxed">
            <p>
              * Official Amazon UK Associates & direct affiliate destination links. Your purchase directly supports our open-science longevity research at zero additional cost to you.
            </p>
            <p>
              All diagnostic and physiological telemetry equipment is intended strictly for personal tracking, wellness, and baseline evaluation purposes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreUK;
