import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { Product, mapToProduct } from '../types';
import MarketSelector from '../components/MarketSelector';
import ProductsClient from '../components/ProductsClient';
import { ChevronRight, Home } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function CategoryPage() {
  const { region, category } = useParams<{ region: string; category: string }>();
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showingMockData, setShowingMockData] = useState(false);

  const regionUpper = region?.toUpperCase() || 'US';
  const categoryFormatted = category?.replace(/_/g, ' ') || '';

  const loadMockData = () => {
    const filtered = MOCK_PRODUCTS.filter(
      p => p.region === regionUpper && p.category === category
    ).sort((a, b) => {
      if (a.featured === b.featured) return b.rating - a.rating;
      return a.featured ? -1 : 1;
    });
    setInitialProducts(filtered);
    setShowingMockData(true);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    async function fetchProducts() {
      if (!hasValidSupabaseConfig || !supabase) {
        loadMockData();
        return;
      }
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('amazon_affiliate_products')
          .select('*')
          .eq('market', regionUpper)
          .eq('category', category)
          .order('is_active', { ascending: false })
          .order('rating', { ascending: false });

        if (error) throw error;
        
        if (data) {
          setInitialProducts(data.map(mapToProduct));
          setShowingMockData(false);
        }
      } catch (err: any) {
        console.error('Error fetching products from Supabase, falling back to mock data:', err);
        loadMockData();
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [regionUpper, category]);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs & Market Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <nav className="flex items-center text-sm text-slate-400">
            <Link to="/" className="hover:text-blue-400 flex items-center transition-colors">
              <Home size={16} className="mr-1" /> Home
            </Link>
            <ChevronRight size={16} className="mx-2 text-slate-600" />
            <Link to={`/${region}`} className="hover:text-blue-400 uppercase transition-colors">
              {regionUpper}
            </Link>
            <ChevronRight size={16} className="mx-2 text-slate-600" />
            <span className="text-white font-medium capitalize">{categoryFormatted}</span>
          </nav>
          
          <MarketSelector currentCategory={category} className="bg-slate-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl" />
        </div>

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-none">
              {regionUpper} <span className="text-blue-500">{categoryFormatted}</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed border-l-2 border-blue-500 pl-6">
              Discover the best {categoryFormatted} products available on Amazon {regionUpper}. 
              Our curated list updates in real-time with the latest ratings and top picks.
            </p>
          </div>
          {showingMockData && (
            <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-400 text-xs font-black uppercase tracking-widest flex items-center shadow-lg shadow-blue-900/20">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse"></div>
              Viewing 2026 Demo Data
            </div>
          )}
        </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : initialProducts.length === 0 ? (
        <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-24 text-center backdrop-blur-sm">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Home className="text-slate-600" size={40} />
          </div>
          <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-4">No products here yet</h3>
          <p className="text-slate-400 mb-12 max-w-md mx-auto text-lg font-medium leading-relaxed">
            We haven't added any products to this category in the {regionUpper} region yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/admin" className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
              Add Products
            </Link>
            <button 
              onClick={loadMockData}
              className="inline-flex items-center justify-center px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              View Demo Data
            </button>
          </div>
        </div>
      ) : (
        <ProductsClient 
          initialProducts={initialProducts} 
          region={regionUpper} 
          category={category || ''} 
        />
      )}
      </div>
    </div>
  );
}
