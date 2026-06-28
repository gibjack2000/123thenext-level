/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import SlideInNewsletter from './components/newsletter/SlideInNewsletter';

// Lazy-load all pages for code-splitting (each page becomes its own JS chunk)
const Home = lazy(() => import('./pages/Home'));
const StartHere = lazy(() => import('./pages/StartHere'));
const HealthQuiz = lazy(() => import('./pages/HealthQuiz'));
const HealthPillar = lazy(() => import('./pages/HealthPillar'));
const HealthPostA = lazy(() => import('./pages/HealthPostA'));
const HealthPostB = lazy(() => import('./pages/HealthPostB'));
const HealthPostC = lazy(() => import('./pages/HealthPostC'));
const FitnessPillar = lazy(() => import('./pages/FitnessPillar'));
const FitnessPostD = lazy(() => import('./pages/FitnessPostD'));
const FitnessPostE = lazy(() => import('./pages/FitnessPostE'));
const FitnessPostF = lazy(() => import('./pages/FitnessPostF'));
const WearableWar = lazy(() => import('./pages/fitness/WearableWar'));
const RealTimeBiosensing = lazy(() => import('./pages/fitness/RealTimeBiosensing'));
const PerformanceMethodology = lazy(() => import('./pages/fitness/PerformanceMethodology'));
const ColdImmersion = lazy(() => import('./pages/fitness/ColdImmersion'));
const InfraredSauna = lazy(() => import('./pages/fitness/InfraredSauna'));
const NutritionPillar = lazy(() => import('./pages/NutritionPillar'));
const NutritionPostG = lazy(() => import('./pages/NutritionPostG'));
const NutritionPostH = lazy(() => import('./pages/NutritionPostH'));
const NutritionPostI = lazy(() => import('./pages/NutritionPostI'));
const NutritionGLP1 = lazy(() => import('./pages/NutritionGLP1'));
const NutritionMuscleBrain = lazy(() => import('./pages/NutritionMuscleBrain'));
const NutritionBiomarkers = lazy(() => import('./pages/NutritionBiomarkers'));
const WellnessPillar = lazy(() => import('./pages/WellnessPillar'));
const NeurowellnessPillar = lazy(() => import('./pages/NeurowellnessPillar'));
const NeurowellnessHardCare = lazy(() => import('./pages/NeurowellnessHardCare'));
const NeurowellnessSoftCare = lazy(() => import('./pages/NeurowellnessSoftCare'));
const NeurowellnessMetabolism = lazy(() => import('./pages/NeurowellnessMetabolism'));
const VNSDeepDive = lazy(() => import('./pages/neurowellness/VNSDeepDive'));
const SomaticBreathwork = lazy(() => import('./pages/neurowellness/SomaticBreathwork'));
const MuscleBrainAxis = lazy(() => import('./pages/neurowellness/MuscleBrainAxis'));
const WellnessPostJ = lazy(() => import('./pages/WellnessPostJ'));
const WellnessPostK = lazy(() => import('./pages/WellnessPostK'));
const WellnessPostL = lazy(() => import('./pages/WellnessPostL'));
const WomensHealthPillar = lazy(() => import('./pages/WomensHealthPillar'));
const OvarianLongevity = lazy(() => import('./pages/womens-health/OvarianLongevity'));
const StrengthMandate = lazy(() => import('./pages/womens-health/StrengthMandate'));
const CognitiveMetabolic = lazy(() => import('./pages/womens-health/CognitiveMetabolic'));
const EpigeneticAge = lazy(() => import('./pages/womens-health/EpigeneticAge'));
const MitochondrialCap = lazy(() => import('./pages/womens-health/MitochondrialCap'));
const HRVResilience = lazy(() => import('./pages/womens-health/HRVResilience'));
const BoneDensity = lazy(() => import('./pages/womens-health/BoneDensity'));
const SocialFitnessPillar = lazy(() => import('./pages/SocialFitnessPillar'));
const PickleballEcosystem = lazy(() => import('./pages/social-fitness/PickleballEcosystem'));
const FestivalizationWave = lazy(() => import('./pages/social-fitness/FestivalizationWave'));
const SocialRecovery = lazy(() => import('./pages/social-fitness/SocialRecovery'));
const PreventiveHealth = lazy(() => import('./pages/PreventiveHealth'));
const CellularEngineering = lazy(() => import('./pages/health/CellularEngineering'));
const CellularDeepDive = lazy(() => import('./pages/health/CellularDeepDive'));
const CellularGlossary = lazy(() => import('./pages/health/CellularGlossary'));
const EpigeneticTracking = lazy(() => import('./pages/health/EpigeneticTracking'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const SystemicMaintenance = lazy(() => import('./pages/health/SystemicMaintenance'));
const FitnessFundamentals = lazy(() => import('./pages/FitnessFundamentals'));
const UniversalLove = lazy(() => import('./pages/UniversalLove'));
const DoNoHarm = lazy(() => import('./pages/DoNoHarm'));
const GoodMoralPerson = lazy(() => import('./pages/GoodMoralPerson'));
const BreathingMindfulness = lazy(() => import('./pages/BreathingMindfulness'));
const LovingKindness = lazy(() => import('./pages/LovingKindness'));
const BeginnersGuide = lazy(() => import('./pages/BeginnersGuide'));
const RegionHub = lazy(() => import('./pages/RegionHub'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const SuperAdminPage = lazy(() => import('./pages/SuperAdminPage'));
const IntelligenceHub = lazy(() => import('./pages/IntelligenceHub'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const BlogCategoryPage = lazy(() => import('./pages/BlogCategoryPage'));
const BlogAutomationAdmin = lazy(() => import('./pages/BlogAutomationAdmin'));
const PremiumGuides = lazy(() => import('./pages/premium/PremiumGuides'));
const CheckoutSuccess = lazy(() => import('./pages/premium/CheckoutSuccess'));
const CheckoutCancel = lazy(() => import('./pages/premium/CheckoutCancel'));
const PremiumGuideDetailPage = lazy(() => import('./pages/premium/PremiumGuideDetailPage'));
const MagazineRack = lazy(() => import('./pages/MagazineRack'));

// Loading spinner shown during page transitions
const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-950 flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/start-here" element={<StartHere />} />
                <Route path="/health-quiz" element={<HealthQuiz />} />
                <Route path="/health" element={<HealthPillar />} />
                <Route path="/health/preventive" element={<PreventiveHealth />} />
                <Route path="/health/post-a" element={<HealthPostA />} />
                <Route path="/health/post-b" element={<HealthPostB />} />
                <Route path="/health/post-c" element={<HealthPostC />} />
                <Route path="/health/cellular" element={<CellularEngineering />} />
                <Route path="/health/cellular/deep-dive" element={<CellularDeepDive />} />
                <Route path="/health/cellular/glossary/:topicId" element={<CellularGlossary />} />
                <Route path="/health/cellular/epigenetic-tracking" element={<EpigeneticTracking />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/health/systemic" element={<SystemicMaintenance />} />
                <Route path="/fitness" element={<FitnessPillar />} />
                <Route path="/fitness/fundamentals" element={<FitnessFundamentals />} />
                <Route path="/fitness/post-d" element={<FitnessPostD />} />
                <Route path="/fitness/post-e" element={<FitnessPostE />} />
                <Route path="/fitness/post-f" element={<FitnessPostF />} />
                <Route path="/fitness/wearables" element={<WearableWar />} />
                <Route path="/fitness/biosensing" element={<RealTimeBiosensing />} />
                <Route path="/fitness/methodology" element={<PerformanceMethodology />} />
                <Route path="/fitness/recovery/cold-immersion" element={<ColdImmersion />} />
                <Route path="/fitness/recovery/infrared-sauna" element={<InfraredSauna />} />
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
                <Route path="/neurowellness/vns" element={<VNSDeepDive />} />
                <Route path="/neurowellness/breathwork" element={<SomaticBreathwork />} />
                <Route path="/neurowellness/muscle-brain-axis" element={<MuscleBrainAxis />} />
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
                <Route path="/automation-admin" element={<BlogAutomationAdmin />} />
                <Route path="/intelligence-hub" element={<IntelligenceHub />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/life-practice/universal-love" element={<UniversalLove />} />
                <Route path="/life-practice/do-no-harm" element={<DoNoHarm />} />
                <Route path="/life-practice/good-moral-person" element={<GoodMoralPerson />} />
                <Route path="/life-practice/breathing-mindfulness" element={<BreathingMindfulness />} />
                <Route path="/life-practice/loving-kindness" element={<LovingKindness />} />
                <Route path="/life-practice/beginners-guide" element={<BeginnersGuide />} />
                <Route path="/premium-guides" element={<PremiumGuides />} />
                <Route path="/premium-guides/success" element={<CheckoutSuccess />} />
                <Route path="/premium-guides/cancel" element={<CheckoutCancel />} />
                <Route path="/premium-guides/:slug" element={<PremiumGuideDetailPage />} />
                <Route path="/region/:region" element={<RegionHub />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/blog/category/:category" element={<BlogCategoryPage />} />
                <Route path="/updates" element={<MagazineRack />} />
                <Route path="/:region" element={<RegionHub />} />
                <Route path="/:region/:category" element={<CategoryPage />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <SlideInNewsletter />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
