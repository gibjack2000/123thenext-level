import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { useAffiliateLinks } from '../contexts/AffiliateLinksContext';

/**
 * Health Baseline Quiz — embedded route.
 *
 * The quiz itself is a self-contained standalone app at `public/health-quiz.html`
 * (served at `/health-quiz.html`). It runs inside a same-origin <iframe> so the
 * site navbar/footer stay visible, and reports its document height via postMessage
 * (see the "EMBEDDED MODE" snippet appended to that file) so the iframe always
 * matches the quiz's current screen (welcome → quiz → opt-in → results).
 */
export default function HealthQuiz() {
  const [height, setHeight] = useState(900);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { links } = useAffiliateLinks();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Attach dynamically updated affiliate links to window for same-origin iframe access
    (window as any).nextLevelAffiliateLinks = links;
  }, [links]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (data && data.source === 'health-quiz') {
        if (typeof data.height === 'number') {
          // Clamp to a sensible floor/ceiling
          setHeight(Math.max(600, Math.min(data.height, 6000)));
        }
        if (data.action === 'scrollToTop') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Back link */}
        <Link
          to="/dual-track"
          className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors group mb-6"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dual-Track Framework
        </Link>

        {/* Frame header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <ClipboardCheck size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-display uppercase tracking-tight text-white leading-none">
              Health Baseline Quiz
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Powered by The Next Level · 2-minute check · 100% private
            </p>
          </div>
        </div>

        {/* Embedded quiz card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-white">
          {!loaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950">
              <div className="w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/health-quiz.html"
            title="Health Baseline Quiz"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            style={{ height: `${height}px` }}
            className="w-full block border-0 transition-[height] duration-300 ease-out"
          />
        </div>

        {/* Footnote */}
        <p className="text-xs text-slate-500 text-center mt-6 max-w-2xl mx-auto leading-relaxed">
          Your answers stay in your browser. Nothing is sent or stored until you choose to email
          yourself the results. This quiz is for educational and self-reflection purposes only and is
          not a medical assessment — always consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  );
}
