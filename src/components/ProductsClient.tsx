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
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Star className="text-slate-300" size={32} />
        </div>
        <h3 className="text-xl font-display uppercase tracking-tight text-slate-900 mb-2">No products found</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          We haven't added any products to this category yet. Check back soon or add some via the admin dashboard.
        </p>
        <a 
          href="/admin" 
          className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Add Products
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out flex flex-col">
          <div className="aspect-[4/3] w-full bg-slate-100 rounded-xl mb-4 overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
            )}
          </div>
          
          <div className="flex-grow">
            {product.featured && (
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md mb-2">
                Top Pick
              </span>
            )}
            <h2 className="text-2xl font-display uppercase tracking-tight text-slate-900 mb-2 line-clamp-2">{product.product_name}</h2>
            <p className="text-sm text-slate-600 mb-4 line-clamp-3">{product.short_benefit}</p>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-xl text-slate-900">
                {product.price ? `${product.price} ${product.currency}` : 'Check Price'}
              </span>
              <div className="flex items-center text-amber-500 font-medium">
                <Star size={16} className="fill-current mr-1" />
                {product.rating}
              </div>
            </div>
            <a 
              href={product.amazon_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-slate-900 text-white py-2.5 rounded-xl hover:bg-slate-800 transition-colors font-medium"
            >
              View on Amazon
              <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
