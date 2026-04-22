import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product, mapToProduct } from '../types';
import { ExternalLink, Star } from 'lucide-react';

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
        <div key={product.id} className="group relative overflow-hidden bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-6 shadow-2xl hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm flex flex-col hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 aspect-square w-full bg-white/5 rounded-[2rem] mb-6 overflow-hidden p-6 flex items-center justify-center border border-white/5">
            {product.image_url ? (
              <img src={product.image_url} alt={product.product_name} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-700 uppercase font-black text-xs tracking-widest">No Visual Data</div>
            )}
            
            {product.featured && (
              <div className="absolute top-4 right-4 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-900/40">
                Top Pick
              </div>
            )}
          </div>

          <div className="relative z-10 flex-grow px-2">
            <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white mb-3 line-clamp-2 leading-none group-hover:text-blue-400 transition-colors">{product.product_name}</h2>
            <p className="text-sm text-slate-400 mb-6 line-clamp-3 font-medium leading-relaxed">{product.short_benefit}</p>
          </div>

          <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="font-black text-2xl text-white tracking-tighter">
                {product.price ? `${product.price} ${product.currency}` : 'VIEW PRICE'}
              </span>
              <div className="flex items-center text-blue-400 font-black text-sm">
                <Star size={16} className="fill-blue-500 text-blue-500 mr-2" />
                {product.rating}
              </div>
            </div>
            <a
              href={product.amazon_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-white hover:bg-blue-600 text-slate-950 hover:text-white py-4 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest shadow-xl"
            >
              Acquire Hardware
              <ExternalLink size={14} className="ml-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
