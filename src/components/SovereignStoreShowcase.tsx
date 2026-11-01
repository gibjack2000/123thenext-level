import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, ArrowRight, Star, ExternalLink, Sparkles } from 'lucide-react';
import { useMarket, Market } from '../contexts/MarketContext';
import { Product, mapToProduct } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { FlagUS, FlagUK, FlagES } from './MarketSelector';
import HomeExpressShop, { EXPRESS_PRODUCTS } from './HomeExpressShop';
import { resolveDiagnosticImage, getSmartImageFallback, withCacheBuster } from '../pages/Store';

export function cleanProductImage(product: any, region: string = 'US'): string {
  let url = product?.image_url || product?.imageUrl || '';
  if (typeof url === 'string') {
    url = url.replace(/^https?:\/\/(?:www\.)?123thenextlevel\.com/, '');
    if (url.startsWith('/Products/zelus') && !url.endsWith('.jpg')) url = '/Products/zelus.jpg';
    if (url.startsWith('/Products/multifunctionabs') && !url.endsWith('.jpg')) url = '/Products/multifunctionabs.jpg';
    if (url.startsWith('/Products/aerlang') && !url.endsWith('.jpg')) url = '/Products/aerlang.jpg';
    if (url.startsWith('/Products/Yogamat') && !url.endsWith('.jpg')) url = '/Products/yogamat.jpg';
    if (url.startsWith('/Products/vibrationplate') && !url.endsWith('.jpg')) url = '/Products/vibration.jpg';
    if (url.startsWith('/Products/gritin') && !url.endsWith('.jpg')) url = '/Products/gritin.jpg';
    if (url.startsWith('/Products/burever') && !url.endsWith('.jpg')) url = '/Products/burever.jpg';
  }

  const isAmazonGif = typeof url === 'string' && (url.includes('ssl-images-amazon') || url.includes('images-na.ssl-images-amazon'));
  const isBroken = !url || isAmazonGif || (typeof url === 'string' && url.includes('lola_clinic_peak'));

  if (isBroken) {
    url = getSmartImageFallback(product, region as any);
  }

  const resolved = resolveDiagnosticImage(product, url, region as any);
  return withCacheBuster(resolved);
}

const REGIONS = [
  { 
    id: 'us', 
    name: 'United States', 
    label: 'US Storefront', 
    currency: 'USD', 
    domain: 'amazon.com • CLIA HealthLabs', 
    FlagComponent: FlagUS, 
    storeUrl: '/store-us',
    accentColor: '#06b6d4',
    badgeText: 'FDA / CLIA Monitored'
  },
  { 
    id: 'uk', 
    name: 'United Kingdom', 
    label: 'UK Storefront', 
    currency: 'GBP', 
    domain: 'amazon.co.uk • UKAS LOLA', 
    FlagComponent: FlagUK, 
    storeUrl: '/store-uk',
    accentColor: '#10b981',
    badgeText: 'MHRA / UKAS Accredited'
  },
  { 
    id: 'es', 
    name: 'Spain / Europe', 
    label: 'ES / EU Storefront', 
    currency: 'EUR', 
    domain: 'amazon.es • Melio Health', 
    FlagComponent: FlagES, 
    storeUrl: '/store-es',
    accentColor: '#f59e0b',
    badgeText: 'CE Medical Marked'
  },
];

export const SovereignStoreShowcase: React.FC = () => {
  const { setMarket } = useMarket();
  const [shuffledTopPicks, setShuffledTopPicks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper to render responsive, offline-resilient country SVG flag
  const renderCountryFlag = (region?: string) => {
    const regUpper = (region || 'US').toUpperCase();
    if (regUpper === 'UK') {
      return <FlagUK className="w-4 h-3 pointer-events-none rounded-[2px] shadow-sm shrink-0" />;
    }
    if (regUpper === 'ES') {
      return <FlagES className="w-4 h-3 pointer-events-none rounded-[2px] shadow-sm shrink-0" />;
    }
    return <FlagUS className="w-4 h-3 pointer-events-none rounded-[2px] shadow-sm shrink-0" />;
  };

  useEffect(() => {
    // 1. Seed instantly with curated high-rated products from verified catalog
    const expressMapped: Product[] = EXPRESS_PRODUCTS.flatMap((ep) => {
      return (['US', 'UK', 'ES'] as const).map(reg => {
        const rc = ep.regions[reg];
        const numPrice = parseFloat(rc.price.replace(/[^0-9.]/g, '')) || 29.99;
        return {
          id: `${ep.id}-${reg.toLowerCase()}`,
          region: reg,
          category: ep.categoryLabel || 'Supplements & Longevity Protocols',
          product_name: ep.name,
          amazon_asin: '',
          amazon_url: rc.url || `/store-${reg.toLowerCase()}`,
          image_url: cleanProductImage({ ...ep, image_url: ep.imageUrl }, reg),
          short_benefit: ep.shortBenefit || rc.badge,
          description: ep.description,
          price: numPrice,
          currency: reg === 'UK' ? 'GBP' : reg === 'ES' ? 'EUR' : 'USD',
          rating: ep.rating || 4.8,
          featured: true,
          tags: [ep.category, ep.tag]
        };
      });
    });

    const mockPool = [...MOCK_PRODUCTS]
      .filter(p => p.rating && p.rating >= 4.0)
      .map(p => ({
        ...p,
        image_url: cleanProductImage(p, p.region)
      }));

    const initialPool = [...expressMapped, ...mockPool];
    if (initialPool.length > 0) {
      setShuffledTopPicks([...initialPool].sort(() => Math.random() - 0.5).slice(0, 20));
    }

    // 2. Fetch live affiliate products from Supabase
    async function fetchLiveProducts() {
      if (!hasValidSupabaseConfig || !supabase) return;

      try {
        setLoading(true);

        // Try amazon_affiliate_products first
        const { data: amazonData, error: amazonErr } = await supabase
          .from('amazon_affiliate_products')
          .select('*')
          .eq('is_active', true)
          .order('rating', { ascending: false })
          .limit(50);

        if (!amazonErr && amazonData && amazonData.length > 0) {
          const mapped = amazonData.map(p => {
            const base = mapToProduct(p);
            return {
              ...base,
              image_url: cleanProductImage(base, base.region)
            };
          });
          setShuffledTopPicks([...mapped].sort(() => Math.random() - 0.5).slice(0, 20));
          return;
        }

        // Fallback to products table
        const { data: storeProducts, error: storeErr } = await supabase
          .from('products')
          .select('*')
          .order('rating', { ascending: false })
          .limit(50);

        if (!storeErr && storeProducts && storeProducts.length > 0) {
          const fallbackMapped: Product[] = storeProducts.map((p: any) => {
            const reg = (p.market_region as 'US' | 'UK' | 'ES') || 'US';
            return {
              id: p.id,
              region: reg,
              category: p.category || 'Clinical Hardware',
              product_name: p.name,
              amazon_asin: '',
              amazon_url: p.deal_url || `/store-${reg.toLowerCase()}`,
              image_url: cleanProductImage(p, reg),
              short_benefit: p.badge_text || '',
              description: p.description || '',
              price: parseFloat(p.price_text?.replace(/[^0-9.]/g, '') || '0') || 29.99,
              currency: reg === 'UK' ? 'GBP' : reg === 'ES' ? 'EUR' : 'USD',
              rating: Number(p.rating) || 4.8,
              featured: true,
              tags: []
            };
          });
          setShuffledTopPicks([...fallbackMapped].sort(() => Math.random() - 0.5).slice(0, 20));
        }
      } catch (err) {
        console.warn('Live product fetch info:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveProducts();
  }, []);

  // Duplicate track for 100% seamless -50% loop without visual jump
  const tickerItems = shuffledTopPicks.length > 0 ? [...shuffledTopPicks, ...shuffledTopPicks] : [];

  return (
    <section id="store-showcase" className="relative z-10 bg-slate-950 border-t border-cyan-500/10">
      
      {/* Product Express Lane: Supplements, Gym Equipment & Autonomic Reset Gear */}
      <div className="pt-16 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeExpressShop />
      </div>

      {/* Affiliates Hub Section with 3 Market Country Flags & Product Ticker */}
      <div 
        id="shop" 
        className="relative pt-16 pb-20 bg-slate-950 border-t border-slate-800/80 scroll-mt-20 overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest shadow-md">
              <ShoppingBag size={14} className="animate-pulse" />
              <span>Multi-Region Procurement Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white">
              Sovereign Longevity Marketplaces
            </h2>
            
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
              Curated hardware, clinical diagnostic blood draws, and verified nutritional protocols customized for local regulatory compliance across the United States, United Kingdom, and Spain.
            </p>
          </div>

          {/* 3 Country Market Flag Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {REGIONS.map((region) => {
              const FlagComp = region.FlagComponent;
              return (
                <Link
                  key={region.id}
                  to={region.storeUrl}
                  onClick={() => {
                    setMarket(region.id.toUpperCase() as Market);
                  }}
                  className="group relative rounded-2xl p-6 sm:p-7 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer"
                  aria-label={`Explore ${region.name} Marketplace`}
                >
                  {/* Watermark flag glow in top corner */}
                  <div className="absolute -top-4 -right-4 w-32 h-24 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none overflow-hidden blur-[1px]">
                    <FlagComp className="w-full h-full object-cover" />
                  </div>

                  <div>
                    {/* Top Row: Country Flag Badge & Compliance Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-8 rounded-lg overflow-hidden border border-slate-700 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center bg-slate-950">
                        <FlagComp className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {region.badgeText}
                      </span>
                    </div>

                    {/* Country Name */}
                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors mb-1.5">
                      {region.name}
                    </h3>

                    {/* Domain & Clinical Networks */}
                    <div className="flex items-center text-slate-400 text-xs mb-6">
                      <MapPin size={13} className="mr-1.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{region.domain}</span>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wider flex items-center gap-1.5">
                      <span>Enter {region.label}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {region.currency}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Section Header: Global Top Picks Product Ticker Tape */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-2">
                <span>Global Top Picks</span>
                <span className="text-xs font-mono font-normal text-slate-400 normal-case">(Live Telemetry &amp; Protocol Equipment)</span>
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Hover over items to pause ticker • Auto-looping 24/7
            </span>
          </div>

        </div>

        {/* Self-Contained CSS Marquee Animation */}
        <style>{`
          @keyframes topPicksMarquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-top-picks-track {
            display: flex;
            width: max-content;
            animation: topPicksMarquee 44s linear infinite;
          }
          .animate-top-picks-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Soft edge fade masks */}
        <div className="absolute left-0 top-64 bottom-0 w-16 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-64 bottom-0 w-16 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Continuous Product Ticker Tape Track */}
        <div className="relative w-full overflow-hidden py-4 bg-slate-900/40 border-y border-slate-800/80 select-none">
          <div className="animate-top-picks-track flex items-center gap-5 whitespace-nowrap pr-5">
            {tickerItems.map((product, idx) => {
              const regUpper = (product.region || 'US').toUpperCase();
              return (
                <div 
                  key={`${product.id}-${idx}`} 
                  className="inline-block w-[300px] sm:w-[320px] bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4.5 shadow-xl transition-all duration-300 hover:scale-[1.02] flex-shrink-0 group text-left"
                >
                  {/* Top Header: Country Flag Badge & Star Rating */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1.5 py-0.5 px-2 rounded-md bg-slate-950 border border-slate-800">
                      {renderCountryFlag(product.region)}
                      <span className="text-slate-300 text-[10px] font-black uppercase tracking-wider">
                        {regUpper} Market
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{Number(product.rating || 4.8).toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Product Image Box */}
                  <div className="aspect-square w-full bg-slate-950 rounded-xl mb-3 overflow-hidden p-2.5 flex items-center justify-center border border-slate-800/60 group-hover:border-slate-700 transition-colors relative">
                    <img 
                      src={cleanProductImage(product, regUpper)} 
                      alt={product.product_name} 
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const fallback = getSmartImageFallback(product, regUpper as any);
                        (e.target as HTMLImageElement).src = withCacheBuster(fallback);
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-white mb-2 line-clamp-2 h-8 leading-snug group-hover:text-cyan-400 transition-colors">
                    {product.product_name}
                  </h4>

                  {/* Footer: Price & View Deal Button */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-slate-500">Verified Price:</span>
                      <span className="font-black text-sm text-white">
                        {product.currency === 'GBP' ? '£' : product.currency === 'EUR' ? '€' : '$'}
                        {typeof product.price === 'number' ? product.price.toFixed(2) : product.price || '29.99'}
                      </span>
                    </div>

                    <a 
                      href={product.amazon_url || `/store-${regUpper.toLowerCase()}`} 
                      target={product.amazon_url?.startsWith('http') ? '_blank' : '_self'} 
                      rel="noopener noreferrer" 
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider py-1.5 px-3.5 rounded-lg transition-all shadow-md shadow-cyan-500/10 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Deal</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
};

export default SovereignStoreShowcase;
