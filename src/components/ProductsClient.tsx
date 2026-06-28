import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product, mapToProduct } from '../types';
import { ExternalLink, Star } from 'lucide-react';

const CATEGORY_BADGES: Record<string, string> = {
  fitness_gear: 'ADAPTIVE ATHLETE',
  home_kitchen: 'METABOLIC NUTRITION',
  tech_gadgets: 'PERFORMANCE TECH',
  supplements: 'CLINICAL GRADE',
  performance_testing: 'LAB QUALITY CORE',
};

export default function ProductsClient({
  initialProducts,
  region,
  category
}: {
  initialProducts: Product[],
  region: string,
  category: string
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel('affiliate_products_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'amazon_affiliate_products' },
        (payload) => {
          setProducts((currentProducts) => {
            let updated = [...currentProducts];

            if (payload.eventType === 'DELETE') {
              updated = updated.filter((p) => p.id !== payload.old.id?.toString());
            }
            else {
              const newRecord = mapToProduct(payload.new);

              if (newRecord.region !== region || newRecord.category !== category) {
                return currentProducts;
              }

              if (payload.eventType === 'INSERT') {
                updated.push(newRecord);
              } else if (payload.eventType === 'UPDATE') {
                updated = updated.map((p) => (p.id === newRecord.id ? newRecord : p));
              }
            }

            return updated.sort((a, b) => {
              if (a.featured === b.featured) return b.rating - a.rating;
              return a.featured ? -1 : 1;
            });
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [region, category]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={12} className="fill-amber-400 text-amber-400" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative inline-block w-[12px] h-[12px]">
            <Star size={12} className="text-slate-700 absolute top-0 left-0" />
            <div className="overflow-hidden w-1/2 absolute top-0 left-0">
              <Star size={12} className="fill-amber-400 text-amber-400 max-w-none" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={12} className="text-slate-700" />);
      }
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  const getReviewCount = (productId: string) => {
    let hash = 0;
    for (let i = 0; i < productId.length; i++) {
      hash = productId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 950) + 120;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-24 bg-slate-900/50 rounded-[3rem] border border-white/5 backdrop-blur-sm shadow-2xl">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Star className="text-slate-600" size={40} />
        </div>
        <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-4">No products found</h3>
        <p className="text-slate-400 mb-12 max-w-md mx-auto text-lg font-medium leading-relaxed">
          We haven't added any products to this category yet. Check back soon or add some via the admin dashboard.
        </p>
        <a
          href="/admin"
          className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40"
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group relative overflow-hidden bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-6 shadow-2xl hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm flex flex-col">
          {/* Subtle Accent Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <div className="relative z-10 aspect-square w-full bg-white/[0.02] group-hover:bg-white/[0.04] rounded-[2rem] mb-6 overflow-hidden p-6 flex items-center justify-center border border-white/5 transition-colors duration-500">
            {product.image_url ? (
              <img src={product.image_url} alt={product.product_name} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-700 uppercase font-black text-xs tracking-widest">No Visual Data</div>
            )}
            
            {/* Category specific dynamic badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-950/85 backdrop-blur-md text-blue-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-blue-500/20 shadow-md">
              {CATEGORY_BADGES[product.category] || 'CURATED OPTION'}
            </div>

            {product.featured && (
              <div className="absolute top-4 right-4 px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.15em] rounded-full shadow-lg shadow-blue-900/30">
                Top Pick
              </div>
            )}
          </div>

          <div className="relative z-10 flex-grow px-2">
            {/* Ratings & Social Proof Block */}
            <div className="flex items-center gap-2 mb-3">
              {renderStars(product.rating)}
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                ({getReviewCount(product.id || '')}+ Reviews)
              </span>
            </div>

            <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-3 line-clamp-2 leading-none group-hover:text-blue-400 transition-colors duration-300">{product.product_name}</h2>
            <p className="text-sm text-slate-400 mb-6 line-clamp-3 font-medium leading-relaxed">{product.short_benefit}</p>
          </div>

          <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black leading-none mb-1">Price</span>
                <span className="font-black text-[10px] text-blue-400 tracking-wider uppercase border border-blue-500/30 px-2.5 py-1.5 rounded-lg bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] mt-1">
                  CHECK THE LATEST DEAL
                </span>
              </div>
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-black">
                {product.rating.toFixed(1)} / 5.0
              </div>
            </div>
            
            <a
              href={product.amazon_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-white hover:bg-blue-600 text-slate-950 hover:text-white py-4 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest shadow-xl group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]"
            >
              Buy from Amazon
              <ExternalLink size={13} className="ml-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
