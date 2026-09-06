import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { sovereignHealthStack, SovereignProduct } from '../config/affiliateLinks';

type MarketTab = 'US' | 'UK' | 'ES';
type CategoryFilter = 'All' | 'Tech Gadgets & Wearables' | 'Performance & Testing' | 'Supplements' | 'Lifestyle & Performance Gear';

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const countryParam = (searchParams.get('country') || '').toUpperCase();
  const initialCountry: MarketTab = (countryParam === 'UK' || countryParam === 'ES') ? countryParam : 'US';

  const [activeTab, setActiveTab] = useState<MarketTab>(initialCountry);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const c = (searchParams.get('country') || '').toUpperCase();
    if (c === 'US' || c === 'UK' || c === 'ES') {
      setActiveTab(c as MarketTab);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchUnifiedCatalog() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('market_region', activeTab)
          .eq('is_active', true);

        if (error || !data || data.length === 0) {
          throw new Error("Using static JSON fallback matrix");
        }
        setProducts(data);
      } catch (err) {
        const marketKey = activeTab.toLowerCase() as 'us' | 'uk' | 'es';
        const formattedFallback = sovereignHealthStack.map(product => {
          const marketConfig = product[marketKey];
          return {
            id: product.id,
            name: product.name,
            category: product.category,
            is_direct_affiliate: product.isDirectAffiliate,
            rating: product.rating,
            description: product.description,
            image_url: product.image_url,
            deal_url: marketConfig.url,
            badge_text: marketConfig.badge,
            network: marketConfig.network,
            price_text: marketConfig.priceText,
            market_region: activeTab
          };
        });
        setProducts(formattedFallback);
      } finally {
        setLoading(false);
      }
    }
    fetchUnifiedCatalog();
  }, [activeTab]);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const clinicalPartners = filteredProducts.filter(p => p.is_direct_affiliate === true);
  const amazonHubProducts = filteredProducts.filter(p => p.is_direct_affiliate !== true);

  const getFlagEmoji = (tab: MarketTab) => {
    if (tab === 'US') return '🇺🇸';
    if (tab === 'UK') return '🇬🇧';
    return '🇪🇸';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased p-6 md:p-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Sovereign Apothecary & Longevity Gear Store
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Access highly localized, premium diagnostic blood screening, advanced biophysical sensors, and curated lifestyle accelerators.
        </p>
      </div>

      {/* Global Country Selector */}
      <div className="max-w-md mx-auto flex justify-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl mb-12">
        {(['US', 'UK', 'ES'] as MarketTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setActiveCategory('All');
              setSearchParams({ country: tab.toLowerCase() });
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/15 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <span className="text-lg">{getFlagEmoji(tab)}</span>
            <span>{tab === 'ES' ? 'España (EU)' : tab === 'UK' ? 'United Kingdom' : 'United States'}</span>
          </button>
        ))}
      </div>

      {/* Category Pills Bar */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-900 pb-6">
        {(['All', 'Tech Gadgets & Wearables', 'Performance & Testing', 'Supplements', 'Lifestyle & Performance Gear'] as CategoryFilter[]).map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
              activeCategory === category
                ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
          <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Compiling Catalog...</span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* TIER 1: CLINICAL-GRADE DIAGNOSTICS & TELEMETRY */}
          {clinicalPartners.length > 0 && (
            <div className="space-y-6">
              <div className="border-l-4 border-rose-500 pl-4">
                <span className="text-xs text-rose-500 uppercase font-semibold tracking-widest">DIRECT ACCESS REGULATORY NETWORK</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Clinical-Grade Sovereign Diagnostics</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalPartners.map(product => (
                  <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/30 p-6 flex flex-col justify-between shadow-xl shadow-slate-950/20 transition-all duration-300">
                    <div>
                      {product.image_url && (
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 mb-4 flex items-center justify-center p-4">
                          <img src={product.image_url} alt={product.name} className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-rose-950/20 border border-rose-900/30">
                          {product.category}
                        </span>
                        <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                          <span>★</span> <span>{product.rating}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors duration-300">{product.name}</h3>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Badge Status</span>
                        <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/20">{product.badge_text}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                        <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                        <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition-all duration-300">
                          Access Partner Portal
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIER 2: CURATED LIFESTYLE & TELEMETRY GEAR (AMAZON ASSOCIATES) */}
          {amazonHubProducts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-900">
              <div className="border-l-4 border-cyan-500 pl-4">
                <span className="text-xs text-cyan-400 uppercase font-semibold tracking-widest">CURATED LIFESTYLE & PILLAR HARDWARE</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Amazon Longevity Gear Hub</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amazonHubProducts.map(product => (
                  <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl shadow-slate-950/10 transition-all duration-300">
                    <div>
                      {product.image_url && (
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 mb-4 flex items-center justify-center p-4">
                          <img src={product.image_url} alt={product.name} className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                          {product.category}
                        </span>
                        <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                          <span>★</span> <span>{product.rating}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{product.name}</h3>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Network Target</span>
                        <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{product.network}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                        <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                        <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300">
                          Buy on Amazon {getFlagEmoji(activeTab)}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Localized Disclaimers */}
          <div className="text-center max-w-3xl mx-auto pt-12 border-t border-slate-900 space-y-2 text-[10px] text-slate-500 leading-relaxed">
            <p>
              {activeTab === 'ES'
                ? '* Enlace de afiliado oficial de Amazon España. Su compra apoya directamente nuestra investigación de longevidad sin costo adicional.'
                : '* Official Amazon affiliate link. Your purchase directly supports our longevity research at zero additional cost to you.'}
            </p>
            <p>
              All diagnostic and physiological telemetry solutions are intended strictly for educational and baseline tracking purposes. Access portals are operated by external third-party medical partners. 123TheNextLevel never retains, compiles, or sells your genetic, hematological, or molecular test results.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
