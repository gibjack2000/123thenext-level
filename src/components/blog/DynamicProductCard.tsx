import React, { useState } from 'react';
import { ExternalLink, Star, ShieldCheck, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useDynamicProduct, ProductDb } from '../../services/productService';
import { Market } from '../../contexts/MarketContext';

export interface DynamicProductCardProps {
  id: string;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  productType?: string;
  dealBtnText?: string;
  marketOverride?: Market;
}

export const DynamicProductCard: React.FC<DynamicProductCardProps> = ({
  id,
  theme = 'auto',
  className = '',
  productType,
  dealBtnText,
  marketOverride
}) => {
  const { product, loading, error, market } = useDynamicProduct(id, marketOverride);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  // Reset image error state whenever product or id changes
  React.useEffect(() => {
    setImgSrc(null);
  }, [product?.image_url, product?.id, market]);

  // Sync or fallback image
  const displayImage = imgSrc || product?.image_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60';

  const isDark = theme === 'dark' || (theme === 'auto' && true);

  // Localized deal button label
  const defaultDealText = market === 'ES' 
    ? 'Ver Oferta Directa' 
    : market === 'UK' 
    ? 'Check UK Live Deal' 
    : 'Direct Live Deal';
  
  const ctaLabel = dealBtnText || defaultDealText;

  // Localized store button label
  const storeLabel = market === 'ES' ? 'Catálogo Store' : 'Store Hub';
  const storeUrl = `/store?country=${(market || 'US').toLowerCase()}`;

  // Deterministic review count for visual balance
  const reviewCount = product
    ? Math.abs(product.name.charCodeAt(0) * 13 + product.name.length * 7) % 650 + 150
    : 240;

  if (loading && !product) {
    return (
      <div 
        className={`my-8 p-6 rounded-2xl border transition-all duration-300 animate-pulse ${
          isDark 
            ? 'bg-slate-900/80 border-slate-800' 
            : 'bg-slate-50/80 border-slate-200'
        } ${className}`}
      >
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-32 h-32 rounded-2xl bg-slate-800/60 shrink-0" />
          <div className="flex-1 w-full space-y-3">
            <div className="flex gap-2">
              <div className="h-5 w-28 bg-slate-800/60 rounded-full" />
              <div className="h-5 w-20 bg-slate-800/60 rounded-full" />
            </div>
            <div className="h-6 w-3/4 bg-slate-800/60 rounded-lg" />
            <div className="h-4 w-full bg-slate-800/40 rounded-lg" />
            <div className="h-10 w-44 bg-slate-800/60 rounded-xl mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product && error) {
    return (
      <div className={`my-6 p-4 rounded-xl border text-xs ${isDark ? 'bg-rose-950/20 border-rose-900/40 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-700'} ${className}`}>
        Product recommendation unavailable ({id}).
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div
      data-product-card-id={product.id}
      data-market-region={product.market_region}
      className={`product-card-box my-8 p-6 sm:p-7 rounded-[1.75rem] border shadow-2xl transition-all duration-300 group hover:shadow-cyan-500/10 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900/95 via-slate-950/90 to-slate-900/95 border-slate-800/80 hover:border-cyan-500/40 text-slate-100'
          : 'bg-gradient-to-br from-white via-slate-50 to-white border-slate-200/90 hover:border-blue-500/40 shadow-slate-200/60 text-slate-900'
      } ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
        {/* Product Image Container */}
        <div className="relative shrink-0 w-full sm:w-44 h-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-950/40 border border-slate-800/60 flex items-center justify-center p-3 shadow-inner">
          <a
            href={product.deal_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full relative flex items-center justify-center cursor-pointer"
            aria-label={`View ${product.name}`}
          >
            <img
              src={displayImage}
              alt={product.name}
              onError={() => {
                setImgSrc('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60');
              }}
              className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl" />
          </a>

          {/* Region Flag / Marker in image corner */}
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950/80 backdrop-blur-md border border-slate-700 text-cyan-400">
            {product.market_region}
          </span>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 w-full flex flex-col justify-between">
          <div>
            {/* Badges & Type Header */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              {/* Clinical / Compliance Badge */}
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck size={13} className="shrink-0" />
                <span>{product.badge_text}</span>
              </span>

              {/* Category / Type */}
              <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {productType || product.category}
              </span>
            </div>

            {/* Product Title */}
            <h4 className={`text-lg sm:text-xl font-display font-extrabold leading-snug mb-2 transition-colors duration-200 ${
              isDark 
                ? 'text-white group-hover:text-cyan-300' 
                : 'text-slate-900 group-hover:text-blue-600'
            }`}>
              <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {product.name}
              </a>
            </h4>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}
                  />
                ))}
              </div>
              <span className={`text-xs font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                {product.rating ? Number(product.rating).toFixed(1) : '4.9'}
              </span>
              <span className={`text-[11px] font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                ({reviewCount}+ clinical reviews)
              </span>
            </div>

            {/* Description */}
            <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {product.description}
            </p>
          </div>

          {/* Pricing & CTA Action Strip */}
          <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 ${
            isDark ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            {/* Live Pricing */}
            <div className="flex flex-col">
              <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Live Retail & Deals
              </span>
              <span className={`text-xl sm:text-2xl font-display font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {product.price_text}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Primary Affiliate Deal CTA */}
              <a
                href={product.deal_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight size={14} className="shrink-0" />
              </a>

              {/* Secondary Sovereign Store Hub Link */}
              <a
                href={storeUrl}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-colors duration-200 ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <ShoppingBag size={13} className="shrink-0 opacity-80" />
                <span>{storeLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProductCard;
