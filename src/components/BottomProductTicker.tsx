import React from 'react';
import { Link } from 'react-router-dom';
import { FlagUS, FlagUK, FlagES } from './MarketSelector';

interface ProductItem {
  id: string;
  name: string;
  badge: string;
  price: string;
  category: string;
  icon: string;
  link: string;
  region: 'US' | 'UK' | 'ES';
}

const products: ProductItem[] = [
  {
    id: 'lola-core-45',
    name: 'LOLA Core Health 45',
    badge: '45 Essential Biomarkers • UKAS Accredited',
    price: 'From £125.00',
    category: 'Clinical Blood Test',
    icon: '🩸',
    link: '/store-uk',
    region: 'UK'
  },
  {
    id: 'lola-vital-56',
    name: 'LOLA Vital Check 56 (Longevity Baseline)',
    badge: '56 Biomarkers • ApoB + hs-CRP + HbA1c',
    price: 'From £155.00',
    category: 'Clinical Blood Test',
    icon: '🩸',
    link: '/store-uk',
    region: 'UK'
  },
  {
    id: 'healthlabs-56',
    name: 'HealthLabs Cellular Biomarker Map',
    badge: 'CLIA Accredited Direct Requisition',
    price: '$299.00',
    category: 'Clinical Blood Test',
    icon: '🩸',
    link: '/store-us',
    region: 'US'
  },
  {
    id: 'melio-advanced',
    name: 'Melio Health España Bio-Panel',
    badge: 'Red de Laboratorios Certificados',
    price: '149,00€',
    category: 'Clinical Blood Test',
    icon: '🩸',
    link: '/store-es',
    region: 'ES'
  },
  {
    id: 'cgm-lingo',
    name: 'Continuous Glucose Monitor (CGM)',
    badge: 'FDA Cleared / MHRA Telemetry',
    price: '$89.00/mo',
    category: 'Glycemic Telemetry',
    icon: '📊',
    link: '/store-us',
    region: 'US'
  },
  {
    id: 'eko-core-500',
    name: 'Eko CORE 500™ Digital AI Stethoscope',
    badge: 'FDA 3-Lead ECG Sensor',
    price: '$429.00',
    category: 'Cardiac AI Diagnostics',
    icon: '🫀',
    link: '/store-us',
    region: 'US'
  },
  {
    id: 'momentous-stack',
    name: 'Momentous Sirtuin Recovery Stack',
    badge: 'NSF Certified for Sport',
    price: '$89.95',
    category: 'Cellular Nutraceuticals',
    icon: '🧬',
    link: '/store-us',
    region: 'US'
  },
  {
    id: 'withings-body-scan',
    name: 'Withings Body Scan Segmental Scale',
    badge: '8-Electrode Segmental BIA',
    price: '$399.95',
    category: 'Somatic Hardware',
    icon: '⚖️',
    link: '/store-us',
    region: 'US'
  },
  {
    id: 'lola-urinalysis',
    name: 'LOLA Urinalysis Microalbumin/ACR',
    badge: 'MHRA Registered Reagent',
    price: 'From £65.00',
    category: 'Renal & Microvascular',
    icon: '🧪',
    link: '/store-uk',
    region: 'UK'
  },
  {
    id: 'withings-sleep',
    name: 'Withings Sleep Analyzer Mattress Pad',
    badge: 'Touch-Free Autonomous HRV',
    price: '$129.95',
    category: 'Circadian Telemetry',
    icon: '😴',
    link: '/store-us',
    region: 'US'
  }
];

export const BottomProductTicker: React.FC = () => {
  const renderCountryFlag = (region: 'US' | 'UK' | 'ES') => {
    if (region === 'UK') return <FlagUK className="w-3.5 h-2.5 pointer-events-none rounded-[1px] shrink-0" />;
    if (region === 'ES') return <FlagES className="w-3.5 h-2.5 pointer-events-none rounded-[1px] shrink-0" />;
    return <FlagUS className="w-3.5 h-2.5 pointer-events-none rounded-[1px] shrink-0" />;
  };

  const renderProductCard = (item: ProductItem, key: string) => (
    <Link
      key={key}
      to={item.link}
      className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3.5 flex items-center gap-3.5 transition-all duration-300 hover:scale-[1.02] shadow-lg min-w-[290px] shrink-0"
    >
      <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0 group-hover:border-cyan-500/40 transition-colors">
        {item.icon}
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
            {renderCountryFlag(item.region)}
            <span>{item.region}</span>
          </span>
          <span className="text-xs font-black text-white">{item.price}</span>
        </div>

        <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[195px] mt-1">
          {item.name}
        </h4>

        <span className="text-[10px] text-slate-400 truncate max-w-[195px]">
          {item.badge}
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
            SOVEREIGN HARDWARE &amp; CLINICAL DIRECTORY
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
