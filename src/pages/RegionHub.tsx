import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Home, Dumbbell, HeartPulse, ChefHat, Smartphone, Sparkles, Pill } from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { MOCK_PRODUCTS } from '../data/mockData';

const CATEGORIES = [
  { id: 'fitness_gear', name: 'Fitness Gear', icon: Dumbbell, desc: 'Home gym essentials and workout equipment' },
  { id: 'health_wellness', name: 'Health & Wellness', icon: HeartPulse, desc: 'Supplements, recovery tools, and monitors' },
  { id: 'home_kitchen', name: 'Home & Kitchen', icon: ChefHat, desc: 'Appliances, cookware, and smart home devices' },
  { id: 'tech_gadgets', name: 'Tech Gadgets & Wearables', icon: Smartphone, desc: 'Latest electronics, accessories, and wearables' },
  { id: 'supplements', name: 'Supplements', icon: Pill, desc: 'Vitamins, proteins, and dietary supplements' },
];

import MarketSelector from '../components/MarketSelector';

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

  const visibleCategories = [...CATEGORIES];
  activeCategories.forEach(catId => {
    if (!visibleCategories.find(c => c.id === catId)) {
      visibleCategories.push({
        id: catId,
        name: formatCategoryName(catId),
        icon: Sparkles,
        desc: `Explore top products in ${formatCategoryName(catId)}`
      });
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Market Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <nav className="flex items-center text-sm text-slate-400">
            <Link to="/" className="hover:text-blue-400 flex items-center transition-colors">
              <Home size={16} className="mr-1" /> Home
            </Link>
            <ChevronRight size={16} className="mx-2 text-slate-600" />
            <span className="text-white font-medium uppercase tracking-widest">{regionUpper} Hub</span>
          </nav>
          
          <MarketSelector className="bg-slate-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl" />
        </div>

        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-none">
            Amazon <span className="text-blue-500">{regionNames[regionUpper] || regionUpper}</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed border-l-2 border-blue-500 pl-6">
            Browse our curated selection of top-rated products specifically chosen for the {regionNames[regionUpper] || regionUpper} market. Select a category below to get started.
          </p>
        </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : visibleCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link 
                key={cat.id} 
                to={`/${region}/${cat.id}`}
                className="group relative overflow-hidden bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start">
                  <div className="bg-white/5 text-blue-400 p-6 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mr-8 shadow-2xl group-hover:scale-110">
                    <Icon size={40} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-24 text-center">
           <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Home className="text-slate-700" size={40} />
           </div>
          <p className="text-slate-500 text-xl font-bold uppercase tracking-widest">No products found for this region yet.</p>
        </div>
      )}
      </div>
    </div>
  );
}
