import React from 'react';
import { Link } from 'react-router-dom';

interface TickerItem {
  label: string;
  link?: string;
  highlight?: boolean;
}

export const TickerTapeBanner: React.FC = () => {
  const line1Items: TickerItem[] = [
    { label: '⚡ GEROSCIENCE PIPELINE ONLINE', highlight: true },
    { label: '🧬 EPIGENETIC AGE & WHOLE-METHYLOME TESTING ACTIVE', highlight: false },
    { label: '🎯 5-MINUTE LONGEVITY BASELINE QUIZ', link: '/quiz' },
  ];

  const line2Items: TickerItem[] = [
    { label: '📘 FREE 28-PAGE LONGEVITY BLUEPRINT (PDF AVAILABLE)', link: '/the-next-level-lifespan-v7.pdf' },
    { label: '🩸 DIRECT CLINICAL LAB DRAWS: HEALTHLABS (US) • LOLA (UK) • MELIO (ES)', link: '/store-us' },
    { label: '🩺 CLINICIAN CONSULTATION TEMPLATE INCLUDED', link: '/clinical-baseline-consultation-template.pdf' },
  ];

  const renderItem = (item: TickerItem, key: string) => {
    const isExternal = item.link?.endsWith('.pdf') || item.link?.startsWith('http');

    return (
      <React.Fragment key={key}>
        {item.link ? (
          isExternal ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold flex items-center gap-1 cursor-pointer"
            >
              {item.label} ➔
            </a>
          ) : (
            <Link
              to={item.link}
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold flex items-center gap-1 cursor-pointer"
            >
              {item.label} ➔
            </Link>
          )
        ) : (
          <span className={item.highlight ? 'text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5' : 'text-slate-300'}>
            {item.highlight && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
            {item.label}
          </span>
        )}
        <span className="text-slate-800 font-normal select-none">|</span>
      </React.Fragment>
    );
  };

  // 2 sets per track for 100% seamless mathematical -50% loop without visual jump
  const line1Track = [...line1Items, ...line1Items];
  const line2Track = [...line2Items, ...line2Items];

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 text-[10px] sm:text-[11px] font-semibold text-slate-300 py-1.5 overflow-hidden select-none relative z-50 space-y-1">
      
      {/* Inline Marquee Animations with Pause on Hover */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 34s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 38s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* LINE 1: System Status & Diagnostic Readiness (Scrolls Left) */}
      <div className="flex w-full overflow-hidden border-b border-slate-900/60 pb-1 relative">
        <div className="animate-marquee-left flex items-center gap-6 whitespace-nowrap pr-6">
          {/* Half 1 */}
          <div className="flex items-center gap-6 whitespace-nowrap">
            {line1Track.map((item, idx) => renderItem(item, `l1-a-${idx}`))}
          </div>
          {/* Half 2 (Exact duplicate for seamless -50% loop) */}
          <div className="flex items-center gap-6 whitespace-nowrap" aria-hidden="true">
            {line1Track.map((item, idx) => renderItem(item, `l1-b-${idx}`))}
          </div>
        </div>
      </div>

      {/* LINE 2: Lead Magnets & Lab Draw Infrastructure (Scrolls Right) */}
      <div className="flex w-full overflow-hidden pt-0.5 relative">
        <div className="animate-marquee-right flex items-center gap-6 whitespace-nowrap pr-6">
          {/* Half 1 */}
          <div className="flex items-center gap-6 whitespace-nowrap">
            {line2Track.map((item, idx) => renderItem(item, `l2-a-${idx}`))}
          </div>
          {/* Half 2 (Exact duplicate for seamless -50% loop) */}
          <div className="flex items-center gap-6 whitespace-nowrap" aria-hidden="true">
            {line2Track.map((item, idx) => renderItem(item, `l2-b-${idx}`))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TickerTapeBanner;
