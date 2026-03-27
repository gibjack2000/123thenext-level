import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { Product, mapToProduct } from '../types';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-slate-900 flex items-center">
          <Home size={16} className="mr-1" /> Home
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to={`/${region}`} className="hover:text-slate-900 uppercase">
          {regionUpper}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-slate-900 font-medium capitalize">{categoryFormatted}</span>
      </nav>

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display uppercase tracking-tight text-slate-900 capitalize mb-4">
            {regionUpper} {categoryFormatted}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover the best {categoryFormatted} products available on Amazon {regionUpper}. 
            Our curated list updates in real-time with the latest ratings and top picks.
          </p>
        </div>
        {showingMockData && (
          <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm font-medium flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
            Viewing Demo Products
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      ) : initialProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Home className="text-slate-300" size={32} />
          </div>
          <h3 className="text-xl font-display uppercase tracking-tight text-slate-900 mb-2">No products here yet</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            We haven't added any products to this category in the {regionUpper} region yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admin" className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Add Products
            </Link>
            <button 
              onClick={loadMockData}
              className="inline-flex items-center justify-center px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
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
  );
}
