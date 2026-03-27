import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Home, Dumbbell, HeartPulse, ChefHat, Smartphone, Sparkles } from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { MOCK_PRODUCTS } from '../data/mockData';

const CATEGORIES = [
  { id: 'fitness_gear', name: 'Fitness Gear', icon: Dumbbell, desc: 'Home gym essentials and workout equipment' },
  { id: 'health_wellness', name: 'Health & Wellness', icon: HeartPulse, desc: 'Supplements, recovery tools, and monitors' },
  { id: 'home_kitchen', name: 'Home & Kitchen', icon: ChefHat, desc: 'Appliances, cookware, and smart home devices' },
  { id: 'tech_gadgets', name: 'Tech Gadgets', icon: Smartphone, desc: 'Latest electronics, accessories, and wearables' },
];

export default function RegionHub() {
  const { region } = useParams<{ region: string }>();
  const regionUpper = region?.toUpperCase() || 'US';
  
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const regionNames: Record<string, string> = {
    'US': 'United States',
    'UK': 'United Kingdom',
    'ES': 'Spain'
  };

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      
      const loadMockCategories = () => {
        const regionProducts = MOCK_PRODUCTS.filter(p => p.region === regionUpper);
        const categoriesWithProducts = Array.from(new Set(regionProducts.map(p => p.category)));
        setActiveCategories(categoriesWithProducts);
        setLoading(false);
      };

      if (!hasValidSupabaseConfig || !supabase) {
        loadMockCategories();
        return;
      }

      try {
        const { data, error } = await supabase
          .from('amazon_affiliate_products')
          .select('category')
          .eq('market', regionUpper);
          
        if (error) throw error;
        if (data) {
          const categoriesWithProducts = Array.from(new Set(data.map(p => p.category)));
          setActiveCategories(categoriesWithProducts);
        }
      } catch (err) {
        console.error('Error fetching categories from Supabase, falling back to mock data:', err);
        loadMockCategories();
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, [regionUpper]);

  const formatCategoryName = (id: string) => {
    return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const visibleCategories = activeCategories.map(catId => {
    const existing = CATEGORIES.find(c => c.id === catId);
    if (existing) return existing;
    return {
      id: catId,
      name: formatCategoryName(catId),
      icon: Sparkles,
      desc: `Explore top products in ${formatCategoryName(catId)}`
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-slate-900 flex items-center">
          <Home size={16} className="mr-1" /> Home
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-slate-900 font-medium uppercase">{regionUpper}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-display uppercase tracking-tight text-slate-900 mb-4">
          Amazon {regionNames[regionUpper] || regionUpper} Hub
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Browse our curated selection of top-rated products specifically chosen for the {regionNames[regionUpper] || regionUpper} market. Select a category below to get started.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
      ) : visibleCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link 
                key={cat.id} 
                to={`/${region}/${cat.id}`}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out flex items-start"
              >
                <div className="bg-slate-100 text-slate-700 p-4 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mr-6">
                  <Icon size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-display uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-slate-600">{cat.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-slate-500 mb-4">No products found for this region yet.</p>
        </div>
      )}
    </div>
  );
}
