import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useMarket, Market } from '../contexts/MarketContext';
import { Product, mapToProduct } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import HomeExpressShop from './HomeExpressShop';

const REGIONS = [
  { id: 'us', name: 'United States', currency: 'USD', flag: '🇺🇸', domain: 'amazon.com', image: 'https://flagcdn.com/w640/us.png' },
  { id: 'uk', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', domain: 'amazon.co.uk', image: 'https://flagcdn.com/w640/gb.png' },
  { id: 'es', name: 'Spain', currency: 'EUR', flag: '🇪🇸', domain: 'amazon.es', image: 'https://flagcdn.com/w640/es.png' },
];

export const SovereignStoreShowcase: React.FC = () => {
  const { setMarket } = useMarket();
  const [topPicks, setTopPicks] = useState<Product[]>([]);
  const [shuffledTopPicks, setShuffledTopPicks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showingMockData, setShowingMockData] = useState(false);

  const loadMockData = () => {
    const mockPicks = [...MOCK_PRODUCTS]
      .filter(p => p.featured)
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
    setTopPicks(mockPicks);
    setShowingMockData(true);
    setLoading(false);
  };

  useEffect(() => {
    if (topPicks.length > 0) {
      const shuffled = [...topPicks]
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);
      setShuffledTopPicks(shuffled);
    }
  }, [topPicks]);

  useEffect(() => {
    async function fetchData() {
      if (!hasValidSupabaseConfig || !supabase) {
        loadMockData();
        return;
      }

      try {
        setLoading(true);
        const { data: topData, error: topError } = await supabase
          .from('amazon_affiliate_products')
          .select('*')
          .eq('is_active', true)
          .order('rating', { ascending: false })
          .limit(50);

        if (topError) throw topError;

        if (topData && topData.length > 0) {
          setTopPicks(topData.map(mapToProduct));
          setShowingMockData(false);
        } else {
          loadMockData();
        }
      } catch (err) {
        console.error('Error fetching affiliate products in SovereignStoreShowcase:', err);
        loadMockData();
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    if (hasValidSupabaseConfig && supabase) {
      const channel = supabase
        .channel('sovereign_store_updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'amazon_affiliate_products' },
          () => {
            fetchData();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  return (
    <section id="store-showcase" className="relative z-10 bg-slate-950 border-t border-cyan-500/10">
      {/* Product Express Lane: Supplements, Gym Equipment & Autonomic Reset Gear */}
      <div className="pt-16 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeExpressShop />
      </div>

      {/* Affiliates Hub */}
      <div id="shop" className="relative pt-16 pb-24 bg-fixed bg-center bg-cover scroll-mt-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2000')" }}>
        <div className="absolute inset-0 bg-slate-900/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
              <div className="p-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl backdrop-blur-sm">
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white">Shop the Tools We Trust</h2>
            </div>
            
            <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-8">
              We curate helpful products that support the six pillars of health, fitness, metabolic nutrition, neurowellness, women's health, and social fitness. Our recommendations are chosen for usefulness, not hype.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  <span className="text-amber-400 mr-2">●</span>
                  Hand-picked gear, kitchen tools, and wellness gadgets chosen for quality and performance.
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  <span className="text-amber-400 mr-2">●</span>
                  Organized by region (US, UK, Spain) and category for an easy, customized shopping experience.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Transparency: Links may be affiliate links. We only recommend products we truly believe in.
              </p>
            </div>
          </div>

          {/* Region Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {REGIONS.map((region) => (
              <Link
                key={region.id}
                to={`/${region.id}`}
                onClick={() => {
                  setMarket(region.id.toUpperCase() as Market);
                }}
                className="relative rounded-3xl p-8 shadow-sm border border-slate-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out group overflow-hidden min-h-[240px] flex flex-col justify-end touch-manipulation cursor-pointer active:scale-98"
                aria-label={`Explore Amazon ${region.name} Marketplace`}
              >
                <div className="absolute inset-0">
                  <img 
                    src={region.image} 
                    alt={region.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20 group-hover:via-slate-900/60 transition-colors duration-500"></div>
                </div>
                <div className="relative z-10">
                  <motion.div
                    className="text-4xl mb-2 origin-bottom-left w-fit animate-flag-wave select-none"
                    style={{ display: 'inline-block' }}
                  >
                    {region.flag}
                  </motion.div>
                  <h3 className="text-2xl font-display uppercase tracking-tight text-white mb-1">{region.name}</h3>
                  <div className="flex items-center text-slate-300 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{region.domain}</span>
                  </div>
                  <div className="flex items-center text-amber-400 font-medium group-hover:text-amber-300">
                    Browse Categories <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Top Picks Section - Random Ticker Tape */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display uppercase tracking-tight text-white flex items-center">
              Global Top Picks
            </h3>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : shuffledTopPicks.length > 0 ? (
            <div className="relative w-full overflow-hidden py-10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-20 bg-slate-900/30 backdrop-blur-sm border-y border-slate-800/50">
              <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-6">
                {/* Duplicate the items to create the seamless loop */}
                {[...shuffledTopPicks, ...shuffledTopPicks, ...shuffledTopPicks].map((product, idx) => (
                  <div 
                    key={`${product.id}-${idx}`} 
                    className="inline-block w-[320px] bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out flex-shrink-0 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 py-1">
                          <img 
                            src={REGIONS.find(r => r.id === (product.region || '').toLowerCase())?.image} 
                            alt={product.region} 
                            className="w-5 h-3.5 object-cover rounded shadow-sm border border-slate-100" 
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">
                            {product.region}
                          </span>
                        </div>
                        {showingMockData && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase whitespace-nowrap">
                            Demo
                          </span>
                        )}
                      </div>
                      <span className="text-amber-500 text-sm font-bold flex items-center whitespace-nowrap">
                        ★ {product.rating}
                      </span>
                    </div>
                    <div className="aspect-square w-full bg-slate-50 rounded-xl mb-4 overflow-hidden p-3 flex items-center justify-center">
                      {product.image_url && (
                        <img src={product.image_url} alt={product.product_name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                      )}
                    </div>
                    <h3 className="text-md font-bold text-slate-900 mb-2 truncate whitespace-normal line-clamp-2 h-10 leading-tight">
                      {product.product_name}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                      <span className="font-black text-[8px] text-blue-600 tracking-wider uppercase border border-blue-500/20 px-2 py-1 rounded-md bg-blue-500/5 whitespace-nowrap">
                        CHECK THE LATEST DEAL
                      </span>
                      <a 
                        href={product.amazon_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors whitespace-nowrap"
                      >
                        View Deal
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center mb-20">
              <p className="text-slate-500 mb-6">No top picks found in your database yet.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/admin" className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  Add Your First Product
                </Link>
                <button
                  onClick={loadMockData}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  View Demo Products
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default SovereignStoreShowcase;
