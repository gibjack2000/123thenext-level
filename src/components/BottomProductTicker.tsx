import React from 'react';
import { Link } from 'react-router-dom';

interface ProductItem {
  id: string;
  name: string;
  badge: string;
  price: string;
  category: string;
  icon: string;
  link: string;
}

const products: ProductItem[] = [
  {
    id: 'lola-core-45',
    name: 'Lola Core Health 45 (Baseline Longevity Blood Map)',
    badge: '45 Essential Biomarkers • UKAS Accredited',
    price: '£149.00',
    category: 'Clinical Blood Test',
    icon: '🩸',
    link: '/store-uk'
  },
  {
    id: 'healthlabs-56',
    name: 'HealthLabs Cellular Biomarker Map',
    badge: 'CLIA Accredited (US 🇺🇸)',
    price: '$299.00',
    category: 'Clinical Blood Test',
    icon: '🩸',
    link: '/store-us'
  },
  {
    id: 'cgm-lingo',
    name: 'Continuous Glucose Monitor (CGM)',
    badge: 'FDA Cleared / MHRA',
    price: '$89.00/mo',
    category: 'Glycemic Telemetry',
    icon: '📊',
    link: '/store'
  },
  {
    id: 'eko-core-500',
    name: 'Eko CORE 500™ Digital AI Stethoscope',
    badge: 'FDA 3-Lead ECG',
    price: '$429.00',
    category: 'Cardiac AI Diagnostics',
    icon: '🫀',
    link: '/store'
  },
  {
    id: 'momentous-stack',
    name: 'Momentous Sirtuin Recovery Stack',
    badge: 'NSF Certified for Sport',
    price: '$89.95',
    category: 'Cellular Nutraceuticals',
    icon: '🧬',
    link: '/store'
  },
  {
    id: 'withings-body-scan',
    name: 'Withings Body Scan Segmental Scale',
    badge: '8-Electrode BIA',
    price: '$399.95',
    category: 'Somatic Hardware',
    icon: '⚖️',
    link: '/store'
  },
  {
    id: 'alltest-strips',
    name: 'ALLTEST 10-Parameter Urinary Strips',
    badge: 'CE Medical Marked',
    price: '$14.99',
    category: 'Rapid Fluid Reagents',
    icon: '🧪',
    link: '/store'
  },
  {
    id: 'withings-sleep',
    name: 'Withings Sleep Analyzer Mattress Pad',
    badge: 'Touch-Free HRV',
    price: '$129.95',
    category: 'Circadian Telemetry',
    icon: '😴',
    link: '/store'
  }
];

export const BottomProductTicker: React.FC = () => {
  const renderProductCard = (item: ProductItem, key: string) => (
    <Link
      key={key}
      to={item.link}
      className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3.5 flex items-center gap-3.5 transition-all duration-300 hover:scale-[1.02] shadow-lg min-w-[280px] shrink-0"
    >
      <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0 group-hover:border-cyan-500/40 transition-colors">
        {item.icon}
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded uppercase">
            {item.badge}
          </span>
          <span className="text-xs font-black text-white">{item.price}</span>
        </div>

        <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[190px] mt-1">
          {item.name}
        </h4>

        <span className="text-[10px] text-slate-400">
          {item.category}
        </span>
      </div>
    </Link>
  );

  return (
    <section id="product-ticker" className="w-full bg-slate-950 border-t border-b border-slate-800/80 py-6 overflow-hidden select-none relative z-10">
      
      {/* Header Label */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
            SOVEREIGN HARDWARE & CLINICAL DIRECTORY
          </h3>
        </div>
        <Link 
          to="/store" 
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
        >
          View Full Sovereign Storefront (US / UK / ES) ➔
        </Link>
      </div>

      {/* Marquee Animation Styles with Hover Pause */}
      <style>{`
        @keyframes productMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-product-marquee {
          display: flex;
          width: max-content;
          animation: productMarquee 42s linear infinite;
        }
        .animate-product-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-12 bottom-0 w-12 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-12 bottom-0 w-12 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

      {/* Continuously Scrolling Track */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-product-marquee flex items-center gap-4 whitespace-nowrap pr-4">
          
          {/* Half 1 */}
          <div className="flex items-center gap-4 whitespace-nowrap">
            {products.map((item, idx) => renderProductCard(item, `p1-${item.id}-${idx}`))}
          </div>

          {/* Half 2 (Exact duplicate for seamless -50% loop) */}
          <div className="flex items-center gap-4 whitespace-nowrap" aria-hidden="true">
            {products.map((item, idx) => renderProductCard(item, `p2-${item.id}-${idx}`))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default BottomProductTicker;
