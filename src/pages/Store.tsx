import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Activity, 
  Zap, 
  HeartPulse, 
  Droplets, 
  Moon, 
  Dumbbell, 
  Search, 
  Info, 
  Globe2, 
  Package, 
  Sparkles, 
  FileText, 
  Stethoscope, 
  Star, 
  RefreshCw, 
  SlidersHorizontal, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { 
  sovereignHealthStack, 
  SovereignProduct, 
  SovereignProductItem,
  MarketRegion, 
  ProductCategory 
} from '../config/affiliateLinks';

// Map product category to icons and accent styling
const getCategoryMeta = (category: string) => {
  const cat = (category || '').toLowerCase().trim();
  if (cat.includes('gadget') || cat.includes('wearable') || cat === 'telemetry' || cat === 'somatic' || cat === 'recovery') {
    return {
      label: 'Tech Gadgets & Wearables',
      icon: HeartPulse,
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      glow: 'from-rose-500/20 to-transparent',
      accentText: 'text-rose-400'
    };
  }
  if (cat.includes('performance') || cat.includes('testing') || cat === 'reagents' || cat === 'blood') {
    return {
      label: 'Performance & Testing',
      icon: Stethoscope,
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      glow: 'from-cyan-500/20 to-transparent',
      accentText: 'text-cyan-400'
    };
  }
  if (cat.includes('supplement') || cat.includes('sirtuin') || cat.includes('nutrition')) {
    return {
      label: 'Supplements & Recovery',
      icon: Sparkles,
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      glow: 'from-amber-500/20 to-transparent',
      accentText: 'text-amber-400'
    };
  }
  return {
    label: category || 'Diagnostic Hardware',
    icon: Package,
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    glow: 'from-cyan-500/20 to-transparent',
    accentText: 'text-cyan-400'
  };
};

const countryOptions: { id: MarketRegion; name: string; flag: string; badge: string; subText: string }[] = [
  {
    id: 'US',
    name: 'United States',
    flag: '🇺🇸',
    badge: 'FDA Cleared & CLIA Waived',
    subText: 'USPS / Prime / Quest & Labcorp'
  },
  {
    id: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    badge: 'MHRA Registered & UKCA',
    subText: 'Domestic Dispatch / Healf / Lola'
  },
  {
    id: 'ES',
    name: 'España / EU',
    flag: '🇪🇸',
    badge: 'CE 0123 / Marcado Sanitario',
    subText: 'Logística Libre de Aduana / Melio'
  }
];

const categoryTabs: { key: string; label: string }[] = [
  { key: 'all', label: 'All Protocols' },
  { key: 'Tech Gadgets & Wearables', label: 'Tech Gadgets & Wearables' },
  { key: 'Performance & Testing', label: 'Performance & Testing' },
  { key: 'Supplements', label: 'Supplements' }
];

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract initial country from URL search params if present
  const initialCountryParam = searchParams.get('country')?.toUpperCase();
  const initialRegion: MarketRegion = ['US', 'UK', 'ES'].includes(initialCountryParam || '')
    ? (initialCountryParam as MarketRegion)
    : 'US';

  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>(initialRegion);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<SovereignProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'fallback'>('fallback');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = 'Sovereign Storefront | Country-Localized Diagnostics & Telemetry | 123TheNextLevel';
    window.scrollTo(0, 0);
  }, []);

  // Sync state with URL parameters
  useEffect(() => {
    const country = searchParams.get('country')?.toUpperCase();
    if (country && ['US', 'UK', 'ES'].includes(country) && country !== selectedRegion) {
      setSelectedRegion(country as MarketRegion);
    }
    const suite = searchParams.get('suite')?.toLowerCase();
    if (suite === 'hardware') {
      setActiveCategory('Tech Gadgets & Wearables');
    } else if (suite === 'reagents') {
      setActiveCategory('Supplements');
    } else if (suite === 'blood') {
      setActiveCategory('Performance & Testing');
    }
  }, [searchParams]);

  // Helper function to dynamically map sovereignHealthStack into flat regional items
  const getFormattedFallbackProducts = (region: MarketRegion): SovereignProductItem[] => {
    const marketKey = region.toLowerCase() as 'us' | 'uk' | 'es';
    return sovereignHealthStack.map((product) => {
      const marketConfig = product[marketKey] || product.us;

      // Parse localized price if multiple are listed
      let localizedPrice = product.price_text;
      if (product.price_text && product.price_text.includes('/')) {
        const parts = product.price_text.split('/').map((s) => s.trim());
        if (marketKey === 'us' && parts[0]) localizedPrice = parts[0];
        else if (marketKey === 'uk' && parts[1]) localizedPrice = parts[1];
        else if (marketKey === 'es' && parts[2]) localizedPrice = parts[2];
      }

      return {
        id: `${product.id}-${region}`,
        name: product.name,
        category: product.category,
        rating: product.rating,
        description: product.description,
        price_text: localizedPrice,
        image_url: product.image_url,
        deal_url: marketConfig?.url || '',
        badge_text: marketConfig?.badge || 'Clinical Grade',
        market_region: region
      };
    });
  };

  // Resilient fetch with a 1.5-second timeout race condition against Supabase
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadProducts = async () => {
      // Step 1: Compute dynamic fallback for the currently selected region
      const formattedFallback = getFormattedFallbackProducts(selectedRegion);

      // If Supabase is not configured, offline, or unavailable, immediately use static stack
      if (!hasValidSupabaseConfig || !supabase) {
        if (isMounted) {
          setProducts(formattedFallback);
          setDataSource('fallback');
          setIsLoading(false);
        }
        return;
      }

      // Step 2: Set up a 1.5s timeout promise race
      const timeoutPromise = new Promise<{ timeout: true }>((resolve) =>
        setTimeout(() => resolve({ timeout: true }), 1500)
      );

      const fetchPromise = (async () => {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('market_region', selectedRegion);

          if (error) {
            console.warn('[Store] Supabase query returned error, using fallback:', error.message);
            return { timeout: false, data: null };
          }
          return { timeout: false, data: data as SovereignProductItem[] };
        } catch (err) {
          console.warn('[Store] Network error fetching Supabase products:', err);
          return { timeout: false, data: null };
        }
      })();

      try {
        const raceResult = await Promise.race([fetchPromise, timeoutPromise]);

        if (!isMounted) return;

        if ('timeout' in raceResult && raceResult.timeout) {
          console.info('[Store] Supabase query took >1.5s. Rendered high-speed static fallback stack.');
          setProducts(formattedFallback);
          setDataSource('fallback');
        } else if ('data' in raceResult && raceResult.data && raceResult.data.length > 0) {
          setProducts(raceResult.data);
          setDataSource('supabase');
        } else {
          // Fallback if data is empty or errored
          setProducts(formattedFallback);
          setDataSource('fallback');
        }
      } catch (err) {
        if (isMounted) {
          setProducts(formattedFallback);
          setDataSource('fallback');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [selectedRegion]);

  // Filtered products based on category tab and search input
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const active = activeCategory.toLowerCase();
      const itemCat = (item.category || '').toLowerCase();

      let matchesCategory = active === 'all';
      if (!matchesCategory) {
        if (active.includes('gadget') || active.includes('wearable')) {
          matchesCategory = itemCat.includes('gadget') || itemCat.includes('wearable') || ['telemetry', 'somatic', 'recovery'].includes(itemCat);
        } else if (active.includes('performance') || active.includes('testing')) {
          matchesCategory = itemCat.includes('performance') || itemCat.includes('testing') || ['reagents', 'blood'].includes(itemCat);
        } else if (active.includes('supplement')) {
          matchesCategory = itemCat.includes('supplement') || itemCat.includes('sirtuin') || itemCat.includes('nutrition');
        } else {
          matchesCategory = itemCat === active;
        }
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.badge_text && item.badge_text.toLowerCase().includes(query)) ||
        (item.category && item.category.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* Background Ambience & Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)', backgroundSize: '36px 36px' }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-10">

        {/* Hero Header Section */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-[0.2em] font-semibold backdrop-blur-md">
            <Sparkles size={13} className="text-cyan-400" />
            <span>Sovereign Health Catalog // Country-Localized Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
            Preserving the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
              Biological Substrate
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
            A verified index of medical-grade chemical reagents, continuous cardiac telemetry, contactless autonomic sleep monitors, and DTC multi-omic blood panels—localized with native currencies, customs-safe logistics, and regional regulatory approvals.
          </p>
        </div>

        {/* Outer Bezel Wrapper */}
        <div className="relative rounded-[2.25rem] bg-slate-900/50 p-2 md:p-3 ring-1 ring-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          
          {/* Bezel Glow Lines */}
          <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="absolute bottom-0 right-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

          {/* Inner Core Container */}
          <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-b from-[#080c16] via-[#0b1220] to-[#070a13] border border-slate-800/90 p-5 sm:p-8 lg:p-10 space-y-8">

            {/* Region Segmented Controller Bar */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-cyan-400 font-bold">
                  <Globe2 size={14} />
                  Select Market Compliance Region:
                </span>
                <span className="text-slate-500 text-[11px]">
                  {dataSource === 'supabase' ? '⚡ Live Database Connected' : '🚀 Instant High-Speed Registry'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md">
                {countryOptions.map((country) => {
                  const isSelected = selectedRegion === country.id;
                  return (
                    <button
                      key={country.id}
                      type="button"
                      onClick={() => setSelectedRegion(country.id)}
                      className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                        isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeStoreRegion"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                        />
                      )}

                      <div className="relative z-10 flex items-center space-x-3">
                        <span className="text-2xl sm:text-3xl flex-shrink-0">{country.flag}</span>
                        <div>
                          <div className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                            {country.name}
                          </div>
                          <div className={`text-[10px] font-mono font-semibold ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                            {country.badge}
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 text-right hidden lg:block">
                        <span className="text-[9px] font-mono text-slate-500 block">
                          {country.subText}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Bar: Category Tabs & Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-mono">
                {categoryTabs.map((tab) => {
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveCategory(tab.key)}
                      className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer border text-xs font-medium ${
                        isActive
                          ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Field */}
              <div className="relative min-w-[260px]">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter by keyword, biomarker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono transition-colors"
                />
              </div>
            </div>

            {/* Product Catalog Grid (3x3 Layout) */}
            <div className="pt-2">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 p-6" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => {
                      const meta = getCategoryMeta(product.category);
                      const IconComponent = meta.icon;
                      const hasImgError = imageErrors[product.id];

                      return (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          className="relative rounded-2xl bg-gradient-to-b from-[#090e1b] via-[#0d1424] to-[#070a13] p-6 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] flex flex-col justify-between group overflow-hidden"
                        >
                          {/* Top Ambient Corner Glow */}
                          <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                          <div className="relative z-10 space-y-4">
                            
                            {/* Badges & Rating Header */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1.5">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                                  <ShieldCheck size={11} className="text-cyan-400" />
                                  <span>{product.badge_text}</span>
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 block font-medium">
                                  {meta.label}
                                </div>
                              </div>

                              {/* Category Icon / Pill */}
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-300 group-hover:scale-105 ${meta.badgeBg}`}>
                                <IconComponent size={17} />
                              </div>
                            </div>

                            {/* Optional Product Image Preview with Fallback */}
                            {product.image_url && !hasImgError && (
                              <div className="relative w-full h-32 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-center overflow-hidden p-2">
                                <img 
                                  src={product.image_url} 
                                  alt={product.name}
                                  onError={() => handleImageError(product.id)}
                                  className="max-h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
                                />
                              </div>
                            )}

                            {/* Product Title & Score */}
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-mono">
                                <div className="flex items-center">
                                  <Star size={12} className="fill-amber-400 text-amber-400" />
                                </div>
                                <span className="font-bold">{product.rating.toFixed(2)}</span>
                                <span className="text-slate-500 text-[10px]">• Verified Clinical Specs</span>
                              </div>

                              <h3 className="text-base sm:text-lg font-display font-extrabold text-white leading-snug group-hover:text-cyan-200 transition-colors">
                                {product.name}
                              </h3>
                            </div>

                            {/* Clinical Purpose Narrative */}
                            <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                              {product.description}
                            </p>

                            {/* Price / Availability Card */}
                            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono flex items-center justify-between">
                              <span className="text-slate-400">Direct Price / Cycle:</span>
                              <span className="font-bold text-cyan-300 text-xs sm:text-sm">
                                {product.price_text}
                              </span>
                            </div>
                          </div>

                          {/* Primary Affiliate Action CTA */}
                          <div className="relative z-10 mt-6 pt-3 border-t border-slate-800/80">
                            <a
                              href={product.deal_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-cyan-950/80 hover:via-slate-800 hover:to-cyan-950/80 border border-slate-700 hover:border-cyan-500/50 text-white hover:text-cyan-200 text-xs font-mono font-bold flex items-center justify-between transition-all group/btn shadow-md"
                            >
                              <span className="truncate flex items-center gap-1.5">
                                <span>Inspect {selectedRegion === 'ES' ? 'Especificaciones' : 'Verified Listing'}</span>
                                <span className="text-slate-400">({selectedRegion})</span>
                              </span>
                              <ExternalLink size={14} className="text-cyan-400 flex-shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-20 space-y-3">
                  <Search size={36} className="mx-auto text-slate-600 mb-2" />
                  <div className="text-lg font-bold text-white">No matching products found</div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    No protocols match "{searchQuery}" in this category. Try adjusting your search query or reset your filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mt-2"
                  >
                    <RefreshCw size={12} className="mr-1" />
                    Reset Search & Filters
                  </button>
                </div>
              )}
            </div>

            {/* Authoritative Affiliate & Medical Transparency Footer */}
            <div className="pt-8 border-t border-slate-800/80 text-xs text-slate-400 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold uppercase text-[11px]">
                <Info size={14} />
                <span>Regulatory Verification & Affiliate Transparency</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                123TheNextLevel participates in verified medical & diagnostics affiliate networks (including Amazon Associates, Impact.com, CJ Affiliate, Momentous, Eko Health, DocCheck, Healf UK, and Melio Labs). All listings are curated strictly for biological longevity, zero screen-time chemical testing, and clinical sensor accuracy. Product pricing, regulatory badges (FDA Cleared, CLIA Waived, MHRA, CE 0123), and fulfillment routes automatically reflect the selected region. Always consult your medical physician before initiating new diagnostic, biomarker, or therapeutic regimens.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
