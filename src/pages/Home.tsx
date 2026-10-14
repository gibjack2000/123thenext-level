import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InteractiveTabbedHero } from '../components/InteractiveTabbedHero';
import { DiagnosticRoadmap } from '../components/DiagnosticRoadmap';
import { PillarGateway } from '../components/PillarGateway';
import { SovereignStoreShowcase } from '../components/SovereignStoreShowcase';
import { EpigeneticsSection } from '../components/EpigeneticsSection';

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash on route change if target exists
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="bg-slate-950 min-h-screen text-slate-100">
      
      {/* LAYER 1: New Clean 7-Tab Hero Gateway */}
      <InteractiveTabbedHero />

      {/* LAYER 2: Practical Diagnostic Roadmap & Mind-Body Companion Spotlight */}
      <DiagnosticRoadmap />

      {/* LAYER 3: Interactive 6-Pillar Gateway Matrix */}
      <PillarGateway />

      {/* LAYER 4: Sovereign Store Showcase (Multi-Region US / UK / Spain) */}
      <SovereignStoreShowcase />

      {/* LAYER 5: Epigenetic Engine & Yamanaka Hardware vs Software Science */}
      <EpigeneticsSection />

    </main>
  );
};

export default Home;
