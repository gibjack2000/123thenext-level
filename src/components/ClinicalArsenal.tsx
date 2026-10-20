import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Star, 
  RefreshCw, 
  AlertCircle,
  Database,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { supabase as importedSupabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { useMarket } from '../contexts/MarketContext';

// Reliable Supabase client initialization
const supabase = importedSupabase || createClient(
  import.meta.env.VITE_SUPABASE_URL || supabaseUrl || 'https://seoaictzhmqdwnkfymxt.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI'
);

export interface ClinicalArsenalProduct {
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
}

interface ClinicalArsenalProps {
  region?: 'US' | 'UK' | 'ES';
  primaryProductId?: string;
  companionProductIds?: string[];
  className?: string;
}

// Fallback in case of network interruption
const OFFLINE_FALLBACKS: Record<string, Partial<ClinicalArsenalProduct>> = {
  'sirtuin-stack-us': {
    id: 'sirtuin-stack-us',
    name: 'Momentous Sirtuin Activation & Cell Recovery Stack',
    category: 'Supplements',
    rating: 4.95,
    description: 'Synergistic Trans-Resveratrol, NMN & Nattokinase to activate cellular repair, genomic stability, and NAD+ longevity cofactors. NSF Certified for Sport.',
    price_text: '$89.95',
    deal_url: 'https://livemomentous.com/modernwisdom?code=modernwisdom',
    market_region: 'US',
    badge_text: 'NSF Certified for Sport',
    image_url: '/Products/quercitin.jpeg'
  },
  'sirtuin-stack-uk': {
    id: 'sirtuin-stack-uk',
    name: 'Momentous Sirtuin Activation & Cell Recovery Stack',
    category: 'Supplements',
    rating: 4.95,
    description: 'Synergistic Trans-Resveratrol, NMN & Nattokinase to activate cellular repair and NAD+ longevity cofactors.',
    price_text: '£79.99',
    deal_url: 'https://healf.co.uk/collections/momentus',
    market_region: 'UK',
    badge_text: 'NSF Certified / UK Sourced',
    image_url: '/Products/quercitin.jpeg'
  },
  'sirtuin-stack-es': {
    id: 'sirtuin-stack-es',
    name: 'Paquete de Activación de Sirtuina y Recuperación Celular Momentous',
    category: 'Supplements',
    rating: 4.95,
    description: 'Stack de longevidad celular de máxima pureza con Resveratrol, precursores NAD+ y Apigenina.',
    price_text: '89,95€',
    deal_url: 'https://newtra.eu',
    market_region: 'ES',
    badge_text: 'Customs-Safe EU Delivery',
    image_url: '/Products/quercitin.jpeg'
  }
};

export const ClinicalArsenal: React.FC<ClinicalArsenalProps> = ({
  region,
  primaryProductId = 'sirtuin-stack-us',
  companionProductIds = ['timeline-mitopure-us', 'core-500-us'],
  className = ''
}) => {
  const { market } = useMarket();
  const effectiveRegion = region || (['US', 'UK', 'ES'].includes(market) ? market : 'US') as 'US' | 'UK' | 'ES';

  // Resolve target product ID for the active region (e.g. sirtuin-stack-us, sirtuin-stack-uk, sirtuin-stack-es)
  const targetPrimaryId = primaryProductId.includes('-')
    ? primaryProductId.replace(/-(us|uk|es)$/i, `-${effectiveRegion.toLowerCase()}`)
    : `${primaryProductId}-${effectiveRegion.toLowerCase()}`;

  const [products, setProducts] = useState<ClinicalArsenalProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchClinicalArsenal = async () => {
    try {
      setFetchError(null);

      // Query the unified primary product ID (sirtuin-stack-us) first and foremost
      const idsToFetch = [targetPrimaryId, primaryProductId, ...companionProductIds];

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', idsToFetch);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const sanitized: ClinicalArsenalProduct[] = data.map((item: any) => {
          let healedImg = item.image_url || '/Products/quercitin.jpeg';
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
            name: item.name || 'Mitochondrial NAD+ Precursor & Sirtuin Stack',
            category: item.category || 'Supplements',
            rating: typeof item.rating === 'number' ? item.rating : 4.9,
            description: item.description || 'Clinical-grade longevity cofactors for mitochondrial integrity and NAD+ support.',
            price_text: item.price_text || '$89.95',
            deal_url: healedDeal,
            market_region: item.market_region || effectiveRegion,
            badge_text: item.badge_text || 'NSF Certified for Sport',
            image_url: healedImg,
            is_direct_affiliate: item.is_direct_affiliate ?? true
          };
        });

        // Ensure the primary unified product (sirtuin-stack-us) appears first
        sanitized.sort((a, b) => {
          if (a.id === targetPrimaryId || a.id === primaryProductId) return -1;
          if (b.id === targetPrimaryId || b.id === primaryProductId) return 1;
          return 0;
        });

        setProducts(sanitized);
      } else {
        // Fallback to designated local record
        const fallback = OFFLINE_FALLBACKS[targetPrimaryId] || OFFLINE_FALLBACKS['sirtuin-stack-us'];
        if (fallback) {
          setProducts([fallback as ClinicalArsenalProduct]);
        }
      }
    } catch (err: any) {
      console.warn('Clinical Arsenal Supabase query warning, using resilient fallback:', err);
      const fallback = OFFLINE_FALLBACKS[targetPrimaryId] || OFFLINE_FALLBACKS['sirtuin-stack-us'];
      if (fallback) {
        setProducts([fallback as ClinicalArsenalProduct]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinicalArsenal();

    // Listen to real-time changes on products table in Supabase
    const channel = supabase
      .channel(`clinical-arsenal-live-${targetPrimaryId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          // If the changed record is our unified product, re-fetch immediately
          const changedId = (payload.new as any)?.id || (payload.old as any)?.id;
          if (changedId === targetPrimaryId || changedId === primaryProductId) {
            fetchClinicalArsenal();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [targetPrimaryId, primaryProductId]);

  return (
    <section className={`space-y-6 ${className}`} id="clinical-arsenal-section">
      {/* Section Header */}
      <div className="border-l-4 border-rose-500 pl-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 uppercase font-mono font-bold tracking-widest">
            <Sparkles size={13} className="text-rose-400 animate-pulse" />
            <span>CLINICAL ARSENAL {effectiveRegion} • SINGLE SOURCE OF TRUTH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 font-display tracking-tight">
            Mitochondrial NAD+ &amp; Sirtuin Longevity Stack
          </h2>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <Database size={13} className="text-cyan-400" />
          <span>Table: <strong className="text-slate-200">products</strong> &bull; ID: <strong className="text-cyan-300 font-bold">{targetPrimaryId}</strong></span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && products.length === 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4">
              <div className="w-full aspect-square bg-slate-800/50 rounded-2xl" />
              <div className="h-4 bg-slate-800 rounded w-1/3" />
              <div className="h-5 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800/60 rounded w-full" />
              <div className="h-10 bg-slate-800 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/40 p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-rose-500/5 relative overflow-hidden"
            >
              {/* Product Badge & Region Indicator */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-950/80 text-rose-400 border border-rose-500/30 backdrop-blur-md">
                  {product.badge_text || 'NSF Certified'}
                </span>
              </div>

              <div>
                {/* Image Container */}
                {product.image_url && (
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-slate-800/80 mb-5 flex items-center justify-center p-4 transition-colors group-hover:bg-white/[0.04]">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/Products/quercitin.jpeg';
                      }}
                    />
                  </div>
                )}

                {/* Category & Rating */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-rose-950/30 border border-rose-900/40">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star size={13} fill="currentColor" />
                    <span>{Number(product.rating || 4.9).toFixed(1)}</span>
                  </div>
                </div>

                {/* Unified Title from Database */}
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors duration-300 line-clamp-2 leading-snug">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Action Area with Live Supabase Deal URL & Test Link */}
              <div className="mt-6 pt-4 border-t border-slate-900/90 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Direct Partner Price:
                  </span>
                  <span className="font-extrabold text-slate-100 text-lg font-sans">
                    {product.price_text}
                  </span>
                </div>

                {/* Primary Action Button: Buy Now / Access Portal */}
                <div className="grid grid-cols-5 gap-2">
                  <a 
                    href={product.deal_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="col-span-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Procure via Partner Portal</span>
                    <ExternalLink size={13} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>

                  {/* Test Link ↗ Utility Button */}
                  <a 
                    href={product.deal_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Test Link in New Tab"
                    className="col-span-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 hover:text-white transition-all duration-200 flex items-center justify-center"
                    aria-label="Test destination link in new window"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                {/* Database Key Verification Stamp */}
                <div className="text-[9px] font-mono text-slate-500 flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-emerald-400" />
                    <span>Supabase Live Sync</span>
                  </span>
                  <span className="truncate max-w-[140px] text-slate-400">
                    ID: {product.id}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ClinicalArsenal;
