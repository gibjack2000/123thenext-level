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
import DiagnosticPathwaySelector from '../components/DiagnosticPathwaySelector';
import { supabase as importedSupabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { FlagUS, FlagUK, FlagES } from '../components/MarketSelector';
import { useMarket } from '../contexts/MarketContext';
import { ProductRecord } from './StoreUS';

// Reliable Supabase client initialization
const supabase = importedSupabase || createClient(
  import.meta.env.VITE_SUPABASE_URL || supabaseUrl || 'https://seoaictzhmqdwnkfymxt.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI'
);

export const StoreES: React.FC = () => {
  const navigate = useNavigate();
  const { setMarket } = useMarket();
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setMarket('ES');
  }, [setMarket]);

  // Live Supabase fetch for ES products
  const fetchESProducts = async () => {
    try {
      setFetchError(null);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('market_region', 'ES')
        .order('rating', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const sanitized: ProductRecord[] = data.map((item: any) => {
          let healedImg = item.image_url || '/assets/images/shop/sirtuin-stack.png';
          if (healedImg.startsWith('/assets/') && !healedImg.startsWith('http')) {
            healedImg = `https://123thenextlevel.com${healedImg}`;
          } else if (healedImg.startsWith('/Products/') && !healedImg.startsWith('http')) {
            healedImg = `https://123thenextlevel.com${healedImg}`;
          }

          let healedDeal = item.deal_url || item.affiliate_link || '';
          if (healedDeal.startsWith('https://123thenextlevel.comhttp')) {
            healedDeal = healedDeal.replace('https://123thenextlevel.com', '');
          }

          return {
            id: item.id,
            name: item.name || 'Protocolo Curado España',
            category: item.category || 'Tech Gadgets & Wearables',
            rating: typeof item.rating === 'number' ? item.rating : 4.8,
            description: item.description || 'Equipos de telemetría biológica y longevidad verificados para España y la Unión Europea.',
            price_text: item.price_text || (item.price != null ? `${Number(item.price).toFixed(2).replace('.', ',')}€` : '0,00€'),
            deal_url: healedDeal,
            market_region: 'ES',
            badge_text: item.badge_text || 'Certificado UE / España',
            image_url: healedImg,
            is_direct_affiliate: item.is_direct_affiliate || (!healedDeal.toLowerCase().includes('amazon')),
            hub_placement_slot: item.hub_placement_slot,
            network: healedDeal.toLowerCase().includes('amazon') ? 'Amazon Associates' : 'Clinical Direct'
          };
        });

        setProducts(sanitized);
      } else {
        setProducts([]);
      }
    } catch (err: any) {
      console.error('Error fetching ES products from Supabase:', err);
      setFetchError(err.message || 'No se pudo sincronizar el catálogo en vivo desde Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchESProducts();

    const channel = supabase
      .channel('products-es-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products', filter: 'market_region=eq.ES' },
        () => {
          fetchESProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || 
      product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const clinicalPartners = filteredProducts.filter(p => p.is_direct_affiliate);
  const amazonProducts = filteredProducts.filter(p => !p.is_direct_affiliate);

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
          <span>Hub Soberano de Adquisición España • Alimentado por Supabase</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent font-display">
          Tienda de Longevidad y Bio-Hardware España 🇪🇸
        </h1>

        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
          Soluciones de protocolo selectivamente adquiridas para España y la Unión Europea, verificadas contra estándares de pureza CE, trazabilidad aduanera de la UE y sin retención de datos.
        </p>

        {/* Highlights / Trust Pillars Grid */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Certificado CE & Pureza de Lote</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <Microscope size={13} className="text-cyan-400" />
            <span>Telemetría Médica y Multi-Ómica</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <CheckCircle2 size={13} className="text-amber-400" />
            <span>Portales Clínicos Directos</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
            <Lock size={13} className="text-sky-400" />
            <span>Cero Retención de Datos</span>
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
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer min-h-[48px] text-slate-400 hover:text-white hover:bg-slate-800/60"
          aria-label="Select United Kingdom Market"
        >
          <FlagUK className="w-5 h-4 pointer-events-none" />
          <span>United Kingdom</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/store-es')}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer min-h-[48px] bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg scale-105"
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
            placeholder="Buscar productos en España, protocolos o categorías..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder-slate-500 transition-all backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Limpiar
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
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Clean Loading Skeleton */}
      {loading ? (
        <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase">
              Conectando a la tabla de productos de Supabase (ES)...
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
          <h3 className="text-lg font-bold text-white mb-2">Catálogo en vivo no disponible</h3>
          <p className="text-xs text-slate-400 mb-6">{fetchError}</p>
          <button
            onClick={() => { setLoading(true); fetchESProducts(); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
          >
            <RefreshCw size={14} />
            <span>Reintentar sincronización</span>
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <p className="text-slate-400 text-sm">No se encontraron productos para esta búsqueda o filtro en España.</p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-lg bg-slate-855 border border-slate-800 text-cyan-400 text-xs font-bold hover:bg-slate-800"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Diagnostic Dual-Pathway Requisition Selector */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <DiagnosticPathwaySelector 
              initialMarket="ES" 
              showRegionTabs={true}
              showCopilotLink={true}
            />
          </div>

          {/* Clinician Co-Pilot Helper Banner above Clinical Lab Panels */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-wider font-bold">
                  <Stethoscope size={12} className="text-cyan-400" />
                  <span>Guía de Consulta Médica • 100% Gratuita</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white font-bold">
                  ¿Planea un Análisis Clínico (Melio / Lola)? Consulte a su Médico de Cabecera
                </h3>
                <p className="text-slate-350 text-xs sm:text-sm font-light leading-relaxed">
                  Antes de solicitar análisis de sangre privados o iniciar suplementación terapéutica, descargue nuestro <strong>Cuaderno Clínico Copiloto (Clinician Co-Pilot)</strong> gratuito de 4 páginas. Incluye un registro de constantes vitales de 14 días, la solicitud del Tri-Marcador Nivel 1 (ApoB, HbA1c, hs-CRP) y guiones de diálogo para evaluar sus resultados de forma colaborativa.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <Link
                  to="/clinician-copilot"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  <FileText size={14} />
                  <span>Abrir Clinician Co-Pilot →</span>
                </Link>
                <a
                  href="/assets/docs/clinical-baseline-consultation-workbook.pdf"
                  download="clinical-baseline-consultation-workbook.pdf"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all text-center"
                >
                  <span>Descargar PDF Directo</span>
                </a>
              </div>
            </div>
          </div>

          {/* TIER 1: CLINICAL DIAGNOSTICS & DIRECT PARTNERS */}
          {clinicalPartners.length > 0 && (
            <div className="space-y-6">
              <div className="border-l-4 border-rose-500 pl-4">
                <span className="text-xs text-rose-500 uppercase font-semibold tracking-widest">SOCIOS DE ACCESO DIRECTO (ES)</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Diagnósticos Clínicos y Socios Directos</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalPartners.map(product => (
                  <div 
                    key={product.id} 
                    className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/30 p-6 flex flex-col justify-between shadow-xl transition-all duration-300"
                  >
                    <div>
                      {product.image_url && (
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-slate-800/80 mb-4 flex items-center justify-center p-4 transition-colors group-hover:bg-white/[0.04]">
                          <img 
                            src={product.image_url} 
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
                              target.src = '/assets/images/shop/sirtuin-stack.png';
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
                          <span>{Number(product.rating).toFixed(1)}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Certificación</span>
                        <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/20">
                          {product.badge_text || 'Certificado UE'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                        <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                        <a 
                          href={product.deal_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition-all duration-300 inline-flex items-center gap-1.5"
                        >
                          <span>Acceder al Portal</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIER 2: CURATED LIFESTYLE & GEAR (AMAZON ASSOCIATES) */}
          {amazonProducts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-900">
              <div className="border-l-4 border-cyan-500 pl-4">
                <span className="text-xs text-cyan-400 uppercase font-semibold tracking-widest">HARDWARE Y DISPOSITIVOS SELECCIONADOS</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Amazon España Longevity Gear Hub 🇪🇸</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amazonProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300"
                  >
                    <div>
                      {product.image_url && (
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-slate-850/80 mb-4 flex items-center justify-center p-4 transition-colors group-hover:bg-white/[0.04]">
                          <img 
                            src={product.image_url} 
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
                              target.src = '/assets/images/shop/sirtuin-stack.png';
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
                          <span>{Number(product.rating).toFixed(1)}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Insignia</span>
                        <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">
                          {product.badge_text || 'Certificado UE'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                        <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                        <a 
                          href={product.deal_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300 inline-flex items-center gap-1.5"
                        >
                          <span>Comprar en Amazon 🇪🇸</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimers & Sovereign Compliance */}
          <div className="text-center max-w-3xl mx-auto pt-12 border-t border-slate-900 space-y-2 text-[10px] text-slate-500 leading-relaxed">
            <p>
              * Enlace de afiliado oficial de Amazon España y socios clínicos directos. Su compra apoya directamente nuestra investigación de longevidad sin costo adicional.
            </p>
            <p>
              Todos los equipos de telemetría y diagnóstico están destinados exclusivamente a la evaluación y seguimiento personal del bienestar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreES;
