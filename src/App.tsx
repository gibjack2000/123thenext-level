/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useT } from './translations';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { hasValidSupabaseConfig } from './lib/supabase';
import Home from './pages/Home';
import HealthPillar from './pages/HealthPillar';
import HealthPostA from './pages/HealthPostA';
import HealthPostB from './pages/HealthPostB';
import HealthPostC from './pages/HealthPostC';
import FitnessPillar from './pages/FitnessPillar';
import FitnessPostD from './pages/FitnessPostD';
import FitnessPostE from './pages/FitnessPostE';
import FitnessPostF from './pages/FitnessPostF';
import WearableWar from './pages/fitness/WearableWar';
import RealTimeBiosensing from './pages/fitness/RealTimeBiosensing';
import PerformanceMethodology from './pages/fitness/PerformanceMethodology';
import NutritionPillar from './pages/NutritionPillar';
import NutritionPostG from './pages/NutritionPostG';
import NutritionPostH from './pages/NutritionPostH';
import NutritionPostI from './pages/NutritionPostI';
import NutritionGLP1 from './pages/NutritionGLP1';
import NutritionMuscleBrain from './pages/NutritionMuscleBrain';
import NutritionBiomarkers from './pages/NutritionBiomarkers';
import WellnessPillar from './pages/WellnessPillar';
import NeurowellnessPillar from './pages/NeurowellnessPillar';
import NeurowellnessHardCare from './pages/NeurowellnessHardCare';
import NeurowellnessSoftCare from './pages/NeurowellnessSoftCare';
import NeurowellnessMetabolism from './pages/NeurowellnessMetabolism';
import WellnessPostJ from './pages/WellnessPostJ';
import WellnessPostK from './pages/WellnessPostK';
import WellnessPostL from './pages/WellnessPostL';
import WomensHealthPillar from './pages/WomensHealthPillar';
import OvarianLongevity from './pages/womens-health/OvarianLongevity';
import StrengthMandate from './pages/womens-health/StrengthMandate';
import CognitiveMetabolic from './pages/womens-health/CognitiveMetabolic';
import EpigeneticAge from './pages/womens-health/EpigeneticAge';
import MitochondrialCap from './pages/womens-health/MitochondrialCap';
import HRVResilience from './pages/womens-health/HRVResilience';
import BoneDensity from './pages/womens-health/BoneDensity';
import SocialFitnessPillar from './pages/SocialFitnessPillar';
import PickleballEcosystem from './pages/social-fitness/PickleballEcosystem';
import FestivalizationWave from './pages/social-fitness/FestivalizationWave';
import SocialRecovery from './pages/social-fitness/SocialRecovery';
import PreventiveHealth from './pages/PreventiveHealth';
import CellularEngineering from './pages/health/CellularEngineering';
import SystemicMaintenance from './pages/health/SystemicMaintenance';
import FitnessFundamentals from './pages/FitnessFundamentals';
import UniversalLove from './pages/UniversalLove';
import DoNoHarm from './pages/DoNoHarm';
import GoodMoralPerson from './pages/GoodMoralPerson';
import BreathingMindfulness from './pages/BreathingMindfulness';
import LovingKindness from './pages/LovingKindness';
import BeginnersGuide from './pages/BeginnersGuide';
import RegionHub from './pages/RegionHub';
import CategoryPage from './pages/CategoryPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
import IntelligenceHub from './pages/IntelligenceHub';
import BlogPostPage from './pages/BlogPostPage';

import Navbar from './components/Navbar';

function App() {
  const t = useT();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health" element={<HealthPillar />} />
            <Route path="/health/post-a" element={<HealthPostA />} />
            <Route path="/health/post-b" element={<HealthPostB />} />
            <Route path="/health/post-c" element={<HealthPostC />} />
            <Route path="/health/cellular" element={<CellularEngineering />} />
            <Route path="/health/systemic" element={<SystemicMaintenance />} />
            <Route path="/fitness" element={<FitnessPillar />} />
            <Route path="/fitness/fundamentals" element={<FitnessFundamentals />} />
            <Route path="/fitness/post-d" element={<FitnessPostD />} />
            <Route path="/fitness/post-e" element={<FitnessPostE />} />
            <Route path="/fitness/post-f" element={<FitnessPostF />} />
            <Route path="/fitness/wearables" element={<WearableWar />} />
            <Route path="/fitness/biosensing" element={<RealTimeBiosensing />} />
            <Route path="/fitness/methodology" element={<PerformanceMethodology />} />
            <Route path="/nutrition" element={<NutritionPillar />} />
            <Route path="/nutrition/glp1" element={<NutritionGLP1 />} />
            <Route path="/nutrition/muscle-brain" element={<NutritionMuscleBrain />} />
            <Route path="/nutrition/biomarkers" element={<NutritionBiomarkers />} />
            <Route path="/nutrition/post-g" element={<NutritionPostG />} />
            <Route path="/nutrition/post-h" element={<NutritionPostH />} />
            <Route path="/nutrition/post-i" element={<NutritionPostI />} />
            <Route path="/wellness" element={<WellnessPillar />} />
            <Route path="/neurowellness" element={<NeurowellnessPillar />} />
            <Route path="/neurowellness/hard-care" element={<NeurowellnessHardCare />} />
            <Route path="/neurowellness/soft-care" element={<NeurowellnessSoftCare />} />
            <Route path="/neurowellness/metabolism" element={<NeurowellnessMetabolism />} />
            <Route path="/wellness/post-j" element={<WellnessPostJ />} />
            <Route path="/wellness/post-k" element={<WellnessPostK />} />
            <Route path="/wellness/post-l" element={<WellnessPostL />} />
            <Route path="/womens-health" element={<WomensHealthPillar />} />
            <Route path="/womens-health/longevity" element={<OvarianLongevity />} />
            <Route path="/womens-health/performance" element={<StrengthMandate />} />
            <Route path="/womens-health/metabolic" element={<CognitiveMetabolic />} />
            <Route path="/womens-health/epigenetic-age" element={<EpigeneticAge />} />
            <Route path="/womens-health/mitochondrial-cap" element={<MitochondrialCap />} />
            <Route path="/womens-health/hrv-resilience" element={<HRVResilience />} />
            <Route path="/womens-health/bone-density" element={<BoneDensity />} />
            <Route path="/social-fitness" element={<SocialFitnessPillar />} />
            <Route path="/social-fitness/pickleball" element={<PickleballEcosystem />} />
            <Route path="/social-fitness/festivals" element={<FestivalizationWave />} />
            <Route path="/social-fitness/recovery" element={<SocialRecovery />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/superadmin" element={<SuperAdminPage />} />
            <Route path="/intelligence-hub" element={<IntelligenceHub />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/life-practice/universal-love" element={<UniversalLove />} />
            <Route path="/life-practice/do-no-harm" element={<DoNoHarm />} />
            <Route path="/life-practice/good-moral-person" element={<GoodMoralPerson />} />
            <Route path="/life-practice/breathing-mindfulness" element={<BreathingMindfulness />} />
            <Route path="/life-practice/loving-kindness" element={<LovingKindness />} />
            <Route path="/life-practice/beginners-guide" element={<BeginnersGuide />} />
            <Route path="/:region" element={<RegionHub />} />
            <Route path="/:region/:category" element={<CategoryPage />} />
            <Route path="/region/:region" element={<RegionHub />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </main>

        <Footer />
        
        {/* AuthModal component is missing */}
      </div>
    </BrowserRouter>
  );
}

export default App;
