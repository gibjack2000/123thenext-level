import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Home, Dumbbell, HeartPulse, ChefHat, Smartphone, Sparkles, Pill } from 'lucide-react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { MOCK_PRODUCTS } from '../data/mockData';

const CATEGORIES = [
  { id: 'fitness_gear', name: 'Fitness Gear', icon: Dumbbell, desc: 'Home gym essentials and workout equipment' },
  { id: 'home_kitchen', name: 'Home & Kitchen', icon: ChefHat, desc: 'Appliances, cookware, and smart home devices' },
  { id: 'tech_gadgets', name: 'Tech Gadgets & Wearables', icon: Smartphone, desc: 'Latest electronics, accessories, and wearables' },
  { id: 'supplements', name: 'Supplements', icon: Pill, desc: 'Vitamins, proteins, and dietary supplements' },
  { id: 'performance_testing', name: 'Performance & Testing', icon: Sparkles, desc: 'Diagnostic tools and high-performance gear' },
];

const CATEGORY_STYLES: Record<string, {
  glowFrom: string;
  glowTo: string;
  shadow: string;
  textAccent: string;
  iconGlow: string;
  iconColor: string;
  iconBorder: string;
  gradientBorder: string;
}> = {
  fitness_gear: {
    glowFrom: "from-cyan-500/25",
    glowTo: "to-blue-600/5",
    shadow: "group-hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]",
    textAccent: "group-hover:text-cyan-400",
    iconGlow: "group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]",
    iconColor: "text-cyan-400 group-hover:text-cyan-300",
    iconBorder: "border-cyan-500/20 group-hover:border-cyan-500/40",
    gradientBorder: "group-hover:from-cyan-500/40 group-hover:via-blue-500/20 group-hover:to-transparent"
  },
  home_kitchen: {
    glowFrom: "from-amber-500/25",
    glowTo: "to-orange-600/5",
    shadow: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.15)]",
    textAccent: "group-hover:text-amber-400",
    iconGlow: "group-hover:bg-amber-500/10 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]",
    iconColor: "text-amber-400 group-hover:text-amber-300",
    iconBorder: "border-amber-500/20 group-hover:border-amber-500/40",
    gradientBorder: "group-hover:from-amber-500/40 group-hover:via-orange-500/20 group-hover:to-transparent"
  },
  tech_gadgets: {
    glowFrom: "from-indigo-500/25",
    glowTo: "to-violet-600/5",
    shadow: "group-hover:shadow-[0_0_50px_rgba(99,102,241,0.15)]",
    textAccent: "group-hover:text-indigo-400",
    iconGlow: "group-hover:bg-indigo-500/10 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]",
    iconColor: "text-indigo-400 group-hover:text-indigo-300",
    iconBorder: "border-indigo-500/20 group-hover:border-indigo-500/40",
    gradientBorder: "group-hover:from-indigo-500/40 group-hover:via-violet-500/20 group-hover:to-transparent"
  },
  supplements: {
    glowFrom: "from-emerald-500/25",
    glowTo: "to-teal-600/5",
    shadow: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]",
    textAccent: "group-hover:text-emerald-400",
    iconGlow: "group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]",
    iconColor: "text-emerald-400 group-hover:text-emerald-300",
    iconBorder: "border-emerald-500/20 group-hover:border-emerald-500/40",
    gradientBorder: "group-hover:from-emerald-500/40 group-hover:via-teal-500/20 group-hover:to-transparent"
  },
  performance_testing: {
    glowFrom: "from-rose-500/25",
    glowTo: "to-pink-600/5",
    shadow: "group-hover:shadow-[0_0_50px_rgba(244,63,94,0.15)]",
    textAccent: "group-hover:text-rose-400",
    iconGlow: "group-hover:bg-rose-500/10 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]",
    iconColor: "text-rose-400 group-hover:text-rose-300",
    iconBorder: "border-rose-500/20 group-hover:border-rose-500/40",
    gradientBorder: "group-hover:from-rose-500/40 group-hover:via-pink-500/20 group-hover:to-transparent"
  }
};

const DEFAULT_STYLE = {
  glowFrom: "from-blue-500/25",
  glowTo: "to-indigo-600/5",
  shadow: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]",
  textAccent: "group-hover:text-blue-400",
  iconGlow: "group-hover:bg-blue-500/10 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]",
  iconColor: "text-blue-400 group-hover:text-blue-300",
  iconBorder: "border-blue-500/20 group-hover:border-blue-500/40",
  gradientBorder: "group-hover:from-blue-500/40 group-hover:via-indigo-500/20 group-hover:to-transparent"
};

function CategoryPattern({ id }: { id: string }) {
  switch (id) {
    case 'fitness_gear':
      return (
        <svg className="absolute right-0 bottom-0 w-80 h-80 text-cyan-500/5 group-hover:text-cyan-500/10 transition-all duration-700 pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110 group-hover:-rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="30" />
          <path d="M10 50 h80 M50 10 v80" strokeDasharray="1 3" />
          <path d="M25 25 l50 50 M25 75 l50 -50" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="10" strokeDasharray="2 1" />
        </svg>
      );
    case 'home_kitchen':
      return (
        <svg className="absolute right-0 bottom-0 w-80 h-80 text-amber-500/5 group-hover:text-amber-500/10 transition-all duration-700 pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M 0,50 C 25,20 25,80 50,50 C 75,20 75,80 100,50" />
          <path d="M 0,60 C 25,30 25,90 50,60 C 75,30 75,90 100,60" strokeDasharray="2 2" />
          <path d="M 0,40 C 25,10 25,70 50,40 C 75,10 75,70 100,40" strokeDasharray="4 1" />
          <circle cx="50" cy="50" r="20" strokeDasharray="3 3" />
        </svg>
      );
    case 'tech_gadgets':
      return (
        <svg className="absolute right-0 bottom-0 w-80 h-80 text-indigo-500/5 group-hover:text-indigo-500/10 transition-all duration-700 pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110 group-hover:-rotate-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <rect x="20" y="20" width="60" height="60" rx="10" strokeDasharray="5 3" />
          <circle cx="30" cy="30" r="4" fill="currentColor" fillOpacity="0.1" />
          <circle cx="70" cy="30" r="4" fill="currentColor" fillOpacity="0.1" />
          <circle cx="50" cy="70" r="6" />
          <path d="M30 34 v20 h40 v-20" />
          <path d="M50 54 v10" />
          <path d="M20 50 h60" strokeDasharray="1 2" />
          <path d="M10 10 h80 v80 h-80 z" strokeDasharray="2 8" />
        </svg>
      );
    case 'supplements':
      return (
        <svg className="absolute right-0 bottom-0 w-80 h-80 text-emerald-500/5 group-hover:text-emerald-500/10 transition-all duration-700 pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110 group-hover:rotate-45" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M30 20 l15 -8 l15 8 v16 l-15 8 l-15 -8 z" />
          <path d="M60 36 l15 -8 l15 8 v16 l-15 8 l-15 -8 z" />
          <path d="M30 52 l15 -8 l15 8 v16 l-15 8 l-15 -8 z" />
          <path d="M30 20 v16" />
          <path d="M45 28 v16" />
          <circle cx="45" cy="12" r="2.5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="60" cy="36" r="2.5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="30" cy="52" r="2.5" fill="currentColor" fillOpacity="0.2" />
          <path d="M45 44 l15 -8" strokeWidth="1" />
        </svg>
      );
    case 'performance_testing':
      return (
        <svg className="absolute right-0 bottom-0 w-80 h-80 text-rose-500/5 group-hover:text-rose-500/10 transition-all duration-700 pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M10 50 Q 20 20, 30 50 T 50 50 T 70 50 T 90 50" />
          <path d="M10 60 Q 25 15, 40 60 T 70 60 T 90 60" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="45" strokeDasharray="10 5" />
          <circle cx="50" cy="50" r="15" />
          <path d="M50 5 v90" strokeDasharray="2 4" />
        </svg>
      );
    default:
      return (
        <svg className="absolute right-0 bottom-0 w-80 h-80 text-blue-500/5 group-hover:text-blue-500/10 transition-all duration-700 pointer-events-none transform translate-x-12 translate-y-12 group-hover:scale-110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="5 5" />
          <path d="M10 10 l80 80 M90 10 l-80 80" strokeDasharray="2 4" />
        </svg>
      );
  }
}

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
        const categoriesWithProducts = Array.from(new Set(regionProducts.map(p => p.category))).filter(Boolean) as string[];
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
          const categoriesWithProducts = Array.from(new Set(data.map(p => p.category))).filter(Boolean) as string[];
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
    if (!id) return '';
    return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const visibleCategories = [...CATEGORIES];
  activeCategories.forEach(catId => {
    if (catId && !visibleCategories.find(c => c.id === catId)) {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-52 pb-12">
        {/* Header & Market Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <nav className="flex items-center text-sm text-slate-400">
            <Link to="/" className="hover:text-blue-400 flex items-center transition-colors">
              <Home size={16} className="mr-1" /> Home
            </Link>
            <ChevronRight size={16} className="mx-2 text-slate-600" />
            <span className="text-white font-medium uppercase tracking-widest">{regionUpper} Hub</span>
          </nav>
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
            const style = CATEGORY_STYLES[cat.id] || DEFAULT_STYLE;
            return (
              <Link 
                key={cat.id} 
                to={`/${region}/${cat.id}`}
                className={`group relative overflow-hidden bg-slate-950/40 rounded-[2.5rem] p-10 transition-all duration-500 backdrop-blur-xl hover:scale-[1.02] flex flex-col justify-between h-full ${style.shadow}`}
              >
                {/* Custom Gradient Border Overlay */}
                <div 
                  className={`absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-white/10 to-transparent ${style.gradientBorder} transition-all duration-500 pointer-events-none`}
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                  }}
                />

                {/* Primary Background Ambient Glow */}
                <div className={`absolute -top-16 -left-16 w-56 h-56 bg-gradient-to-br ${style.glowFrom} ${style.glowTo} rounded-full blur-[80px] opacity-35 group-hover:opacity-75 group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

                {/* Secondary Background Ambient Glow */}
                <div className={`absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br ${style.glowFrom} ${style.glowTo} rounded-full blur-[60px] opacity-10 group-hover:opacity-40 group-hover:scale-125 transition-all duration-700 pointer-events-none`} />

                {/* Shimmer Sweep Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                
                {/* Subtle Technical Dot Grid with Accent Matching */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 pointer-events-none transition-opacity duration-700" 
                     style={{ 
                       backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${
                         cat.id === 'fitness_gear' ? 'rgba(6, 182, 212, 0.25)' :
                         cat.id === 'home_kitchen' ? 'rgba(245, 158, 11, 0.25)' :
                         cat.id === 'tech_gadgets' ? 'rgba(99, 102, 241, 0.25)' :
                         cat.id === 'supplements' ? 'rgba(16, 185, 129, 0.25)' :
                         cat.id === 'performance_testing' ? 'rgba(244, 63, 94, 0.25)' :
                         'rgba(59, 130, 246, 0.25)'
                       } 1.5px, transparent 0)`, 
                       backgroundSize: "24px 24px" 
                     }}>
                </div>

                {/* Decorative Tech SVG Line Patterns */}
                <CategoryPattern id={cat.id} />

                <div className="relative z-10 flex items-start">
                  <div className={`relative bg-slate-950/80 border ${style.iconBorder} p-6 rounded-[2rem] ${style.iconColor} ${style.iconGlow} transition-all duration-500 mr-8 flex-shrink-0 flex items-center justify-center group-hover:scale-110 shadow-2xl`}>
                    <Icon size={40} className="relative z-10" />
                    {/* Inner glowing core for the icon */}
                    <div className={`absolute inset-2 bg-gradient-to-br ${style.glowFrom} ${style.glowTo} rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                  <div>
                    <h2 className={`text-3xl font-display font-black uppercase tracking-tight text-white mb-4 ${style.textAccent} transition-colors duration-300`}>
                      {cat.name}
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium transition-colors duration-300 group-hover:text-slate-200">
                      {cat.desc}
                    </p>
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
