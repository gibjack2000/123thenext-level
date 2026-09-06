import * as fs from 'fs';

const catalogs = JSON.parse(fs.readFileSync('scripts/generated-regional-catalogs.json', 'utf8'));

const fileContent = `import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  Dumbbell, 
  ChefHat, 
  Smartphone, 
  Pill, 
  Sparkles, 
  Zap, 
  Activity,
  Star
} from 'lucide-react';

type MarketTab = 'US' | 'UK' | 'ES';

// Dedicated Regional Master Registries (Guarantees strict separation across US, UK, and Spain)
const REGIONAL_MASTER_CATALOGS: Record<MarketTab, any[]> = ${JSON.stringify(catalogs, null, 2)};

function CategoryBanner({ categoryKey, marketTab }: { categoryKey: string; marketTab: MarketTab }) {
  const normKey = categoryKey.toLowerCase();
  
  const getBannerConfig = (cat: string, market: MarketTab) => {
    if (cat.includes('supplement')) {
      if (market === 'UK') {
        return {
          title: 'UK AMAZON SUPPLEMENTS',
          subtitle: 'Curated British & European pharmaceutical-grade longevity supplements and bioactives',
          icon: Pill,
          iconColor: 'text-emerald-400',
          iconBorder: 'border-emerald-500/30',
          iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          radarColor: 'text-emerald-500/10'
        };
      } else if (market === 'ES') {
        return {
          title: 'ES AMAZON SUPLEMENTOS',
          subtitle: 'Vitaminas, bioactivos y suplementos de longevidad certificados de Amazon España',
          icon: Pill,
          iconColor: 'text-emerald-400',
          iconBorder: 'border-emerald-500/30',
          iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          radarColor: 'text-emerald-500/10'
        };
      } else {
        return {
          title: 'US AMAZON SUPPLEMENTS',
          subtitle: 'Curated US Amazon longevity vitamins, bioactives, and purity-tested nutraceuticals',
          icon: Pill,
          iconColor: 'text-emerald-400',
          iconBorder: 'border-emerald-500/30',
          iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          radarColor: 'text-emerald-500/10'
        };
      }
    }
    
    if (cat.includes('fitness')) {
      return {
        title: market === 'ES' ? 'ES EQUIPAMIENTO FITNESS' : \`\${market} FITNESS GEAR\`,
        subtitle: market === 'ES' 
          ? 'Material de entrenamiento y gimnasio en casa en España' 
          : \`Home gym essentials and workout equipment in the \${market === 'UK' ? 'United Kingdom' : 'United States'}\`,
        icon: Dumbbell,
        iconColor: 'text-cyan-400',
        iconBorder: 'border-cyan-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
        radarColor: 'text-cyan-500/10'
      };
    }

    if (cat.includes('kitchen')) {
      return {
        title: market === 'ES' ? 'ES HOGAR Y COCINA' : \`\${market} HOME & KITCHEN\`,
        subtitle: market === 'ES' 
          ? 'Electrodomésticos, extractores y cocina saludable en España' 
          : \`Appliances, cookware, and longevity nutrient extractors in the \${market === 'UK' ? 'UK' : 'US'}\`,
        icon: ChefHat,
        iconColor: 'text-amber-400',
        iconBorder: 'border-amber-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
        radarColor: 'text-amber-500/10'
      };
    }

    if (cat.includes('tech') || cat.includes('wearable')) {
      return {
        title: market === 'ES' ? 'ES DISPOSITIVOS Y WEARABLES' : \`\${market} TECH GADGETS & WEARABLES\`,
        subtitle: market === 'ES' 
          ? 'Sensores biofísicos, wearables y monitorización del sueño' 
          : 'Latest biophysical monitors, wearables, and sleep sensors',
        icon: Smartphone,
        iconColor: 'text-indigo-400',
        iconBorder: 'border-indigo-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(99,102,241,0.25)]',
        radarColor: 'text-indigo-500/10'
      };
    }

    if (cat.includes('performance') || cat.includes('testing')) {
      return {
        title: market === 'ES' ? 'ES PRUEBAS Y RENDIMIENTO' : \`\${market} PERFORMANCE & TESTING\`,
        subtitle: market === 'ES' 
          ? 'Herramientas de diagnóstico y pruebas de biomarcadores' 
          : 'Diagnostic tools, biomarker testing, and telemetry devices',
        icon: Sparkles,
        iconColor: 'text-rose-400',
        iconBorder: 'border-rose-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]',
        radarColor: 'text-rose-500/10'
      };
    }

    return {
      title: \`\${market} CURATED GEAR\`,
      subtitle: 'High-performance lifestyle accelerators and equipment',
      icon: Activity,
      iconColor: 'text-cyan-400',
      iconBorder: 'border-cyan-500/30',
      iconGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      radarColor: 'text-cyan-500/10'
    };
  };

  const config = getBannerConfig(normKey, marketTab);
  const Icon = config.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-8 flex items-center justify-between shadow-2xl transition-all duration-300">
      {/* Subtle Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      />

      {/* Futuristic Radar & Circular Reticle Graphics (Right-aligned) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none opacity-20 overflow-hidden">
        <svg className={\`w-full h-full \${config.radarColor || 'text-cyan-400'}\`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="75" cy="50" r="44" strokeDasharray="3 3" />
          <circle cx="75" cy="50" r="32" />
          <circle cx="75" cy="50" r="18" strokeDasharray="2 2" />
          <circle cx="75" cy="50" r="6" />
          <path d="M75 6 v88 M31 50 h88" strokeDasharray="1 3" />
          <path d="M44 19 l62 62 M44 81 l62 -62" strokeWidth="0.3" strokeDasharray="2 4" />
        </svg>
      </div>

      {/* Main Content Info */}
      <div className="relative z-10 flex items-center space-x-6">
        {/* Squircle Badge Icon */}
        <div className={\`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-slate-950/90 border \${config.iconBorder} flex items-center justify-center \${config.iconGlow} flex-shrink-0 transition-transform duration-300 hover:scale-105\`}>
          <Icon className={\`w-8 h-8 md:w-10 md:h-10 \${config.iconColor} transform -rotate-45\`} />
        </div>

        {/* Text Area */}
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            {config.title}
          </h3>
          <p className="text-slate-400 text-sm md:text-base mt-1 font-normal">
            {config.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  const [activeTab, setActiveTab] = useState<MarketTab>('US');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicStore() {
      setLoading(true);
      try {
        // 1. Fetch live products from Supabase for the strictly selected market
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('market_region', activeTab);

        if (error || !data || data.length === 0) {
          throw error || new Error(\`Database is empty for \${activeTab}\`);
        }

        // 2. Client-side absolute image link and deal URL matching
        const healedData = data.map((p: any) => {
          let healedImg = p.image_url;
          if (healedImg && healedImg.startsWith('/assets/') && !healedImg.startsWith('http')) {
            healedImg = \`https://123thenextlevel.com\${healedImg}\`;
          } else if (healedImg && healedImg.startsWith('/Products/') && !healedImg.startsWith('http')) {
            healedImg = \`https://123thenextlevel.com\${healedImg}\`;
          }

          let healedDeal = p.deal_url;
          if (healedDeal && healedDeal.startsWith('https://123thenextlevel.comhttp')) {
            healedDeal = healedDeal.replace('https://123thenextlevel.com', '');
          }

          return { ...p, image_url: healedImg, deal_url: healedDeal };
        });

        setProducts(healedData);

        // 3. Extract unique categories present in this specific market
        const rawCategories = healedData.map((p: any) => p.category).filter(Boolean);
        const uniqueCategories = Array.from(new Set(rawCategories)).map((cat: any) => {
          return cat.charAt(0).toUpperCase() + cat.slice(1);
        });

        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.warn(\`Supabase fetch failed for \${activeTab}. Falling back to regional offline registry:\`, err);
        
        // 4. Strict Market-Specific Offline Fallback logic
        const fallbackList = REGIONAL_MASTER_CATALOGS[activeTab] || [];
        setProducts(fallbackList);

        const uniqueCategories = Array.from(new Set(fallbackList.map((p: any) => p.category).filter(Boolean)))
          .map((cat: any) => cat.charAt(0).toUpperCase() + cat.slice(1));
        setCategories(['All', ...uniqueCategories]);
      } finally {
        setLoading(false);
      }
    }

    fetchDynamicStore();
  }, [activeTab]);

  // Handle case-insensitive filtering
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());

  // Split into Tier 1 (Clinical Direct) and Tier 2 (Amazon Hub)
  const clinicalPartners = filteredProducts.filter(p => 
    p.is_direct_affiliate === true || 
    (p.deal_url && !p.deal_url.toLowerCase().includes('amazon'))
  );

  const amazonHubProducts = filteredProducts.filter(p => 
    p.is_direct_affiliate !== true && 
    (p.deal_url && p.deal_url.toLowerCase().includes('amazon'))
  );

  // Group amazon products by category for structured sections when "All" is active
  const amazonCategoriesInView = Array.from(
    new Set(amazonHubProducts.map(p => p.category).filter(Boolean))
  );

  const getFlagEmoji = (tab: MarketTab) => {
    if (tab === 'US') return '🇺🇸';
    if (tab === 'UK') return '🇬🇧';
    return '🇪🇸';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased p-6 md:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Sovereign Apothecary & Longevity Gear Store
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Access highly localized, premium diagnostic blood screening, advanced biophysical sensors, and curated lifestyle accelerators.
        </p>
      </div>

      {/* Country Selector */}
      <div className="max-w-md mx-auto flex justify-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl mb-12">
        {(['US', 'UK', 'ES'] as MarketTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setActiveCategory('All');
            }}
            className={\`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 \${
              activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }\`}
          >
            <span className="text-lg">{getFlagEmoji(tab)}</span>
            <span>{tab === 'ES' ? 'España (EU)' : tab === 'UK' ? 'United Kingdom' : 'United States'}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Filter Pills */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-900 pb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={\`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 \${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }\`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
          <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Syncing Live {activeTab} Catalog...</span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* TIER 1: CLINICAL DIAGNOSTICS & DIRECT PARTNERS */}
          {clinicalPartners.length > 0 && (
            <div className="space-y-6">
              <div className="border-l-4 border-rose-500 pl-4">
                <span className="text-xs text-rose-500 uppercase font-semibold tracking-widest">DIRECT ACCESS PARTNERS ({activeTab})</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Clinical Diagnostics & Direct Offerings</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalPartners.map(product => (
                  <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/30 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                    <div>
                      {product.image_url && (
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-slate-800/80 mb-4 flex items-center justify-center p-4 transition-colors group-hover:bg-white/[0.04]">
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-rose-950/20 border border-rose-900/30">
                          {product.category}
                        </span>
                        <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                          <span>{product.rating ? Number(product.rating).toFixed(1) : '4.9'}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors duration-300 line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">{product.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Badge Status</span>
                        <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/20">{product.badge_text || 'Verified'}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-slate-850">
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

          {/* TIER 2: CURATED LIFESTYLE & GEAR (AMAZON ASSOCIATES) */}
          {amazonHubProducts.length > 0 && (
            <div className="space-y-10 pt-6 border-t border-slate-900">
              <div className="border-l-4 border-cyan-500 pl-4">
                <span className="text-xs text-cyan-400 uppercase font-semibold tracking-widest">CURATED LIFESTYLE & PILLAR HARDWARE</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Amazon Longevity Gear Hub {getFlagEmoji(activeTab)}</h2>
              </div>

              {/* If "All" is active, render category-by-category with header banners */}
              {activeCategory === 'All' ? (
                amazonCategoriesInView.map(catKey => {
                  const catProducts = amazonHubProducts.filter(p => p.category === catKey);
                  return (
                    <div key={catKey} className="space-y-6 pt-4">
                      {/* Section Header Banner with Market Specificity & Telemetry */}
                      <CategoryBanner categoryKey={catKey} marketTab={activeTab} />

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catProducts.map(product => (
                          <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                            <div>
                              {product.image_url && (
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-slate-850/80 mb-4 flex items-center justify-center p-4 transition-colors group-hover:bg-white/[0.04]">
                                  <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                                    }}
                                  />
                                </div>
                              )}
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                                  {product.category}
                                </span>
                                <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                                  <Star size={13} className="fill-amber-400 text-amber-400" />
                                  <span>{product.rating ? Number(product.rating).toFixed(1) : '4.8'}</span>
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">{product.name}</h3>
                              <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">{product.description}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold">Network Target</span>
                                <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">{product.network || 'Amazon Associates'}</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                                <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                                <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300">
                                  Buy on Amazon {getFlagEmoji(activeTab)}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Specific Category Filter Active: Render Single Matching Category Banner */
                <div className="space-y-6">
                  <CategoryBanner categoryKey={activeCategory} marketTab={activeTab} />

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amazonHubProducts.map(product => (
                      <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                        <div>
                          {product.image_url && (
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-slate-850/80 mb-4 flex items-center justify-center p-4 transition-colors group-hover:bg-white/[0.04]">
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                              {product.category}
                            </span>
                            <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                              <Star size={13} className="fill-amber-400 text-amber-400" />
                              <span>{product.rating ? Number(product.rating).toFixed(1) : '4.8'}</span>
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">{product.name}</h3>
                          <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">{product.description}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-semibold">Network Target</span>
                            <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">{product.network || 'Amazon Associates'}</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                            <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                            <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300">
                              Buy on Amazon {getFlagEmoji(activeTab)}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Localized Disclaimers */}
          <div className="text-center max-w-3xl mx-auto pt-12 border-t border-slate-900 space-y-2 text-[10px] text-slate-500 leading-relaxed">
            <p>
              {activeTab === 'ES'
                ? '* Enlace de afiliado oficial de Amazon España. Su compra apoya directamente nuestra investigación de longevidad sin costo adicional.'
                : activeTab === 'UK'
                ? '* Official Amazon UK affiliate link. Your purchase directly supports our longevity research at zero additional cost to you.'
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
`;

fs.writeFileSync('src/pages/Store.tsx', fileContent, 'utf8');
console.log('Successfully wrote src/pages/Store.tsx with aspect-square fitting boxes and line clamping!');
