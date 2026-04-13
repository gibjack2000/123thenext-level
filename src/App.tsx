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
import SocialFitnessPillar from './pages/SocialFitnessPillar';
import PickleballEcosystem from './pages/social-fitness/PickleballEcosystem';
import FestivalizationWave from './pages/social-fitness/FestivalizationWave';
import SocialRecovery from './pages/social-fitness/SocialRecovery';
import PreventiveHealth from './pages/PreventiveHealth';
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
import BlogPostPage from './pages/BlogPostPage';
import TickerTape from './components/TickerTape';
import { Settings, Home as HomeIcon, Menu, X } from 'lucide-react';


export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useT();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        {!hasValidSupabaseConfig && (
          <div className="bg-amber-100 text-amber-800 px-4 py-2 text-center text-sm font-medium">
            Running in Demo Mode with placeholder data. Add Supabase credentials in Settings to connect your database.
          </div>
        )}
        
        <TickerTape />
        
        <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)] sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl text-white mr-3 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <HomeIcon size={20} strokeWidth={2.5} />
              </div>
              <span className="font-display font-semibold uppercase tracking-[0.02em] text-xl border-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-500">
                123TheNext Level
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <Link to="/" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">{t('nav_home')}</Link>
              <a href="/#pillars" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">{t('nav_pillars')}</a>
              <a href="/#blog" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">{t('nav_blog')}</a>
              <a href="/#shop" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">{t('nav_shop')}</a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-b-3xl">
              <div className="px-4 py-6 space-y-2">
                <Link 
                  to="/" 
                  className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav_home')}
                </Link>
                <a 
                  href="/#pillars" 
                  className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav_pillars')}
                </a>
                <a 
                  href="/#blog" 
                  className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav_blog')}
                </a>
                  <a 
                    href="/#shop" 
                    className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav_shop')}
                  </a>
                </div>
              </div>
            )}
          </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preventive-health" element={<PreventiveHealth />} />
            <Route path="/health" element={<HealthPillar />} />
            <Route path="/health/post-a" element={<HealthPostA />} />
            <Route path="/health/post-b" element={<HealthPostB />} />
            <Route path="/health/post-c" element={<HealthPostC />} />
            <Route path="/fitness-fundamentals" element={<FitnessFundamentals />} />
            <Route path="/fitness" element={<FitnessPillar />} />
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
            <Route path="/wellness" element={<NeurowellnessPillar />} />
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
            <Route path="/social-fitness" element={<SocialFitnessPillar />} />
            <Route path="/social-fitness/pickleball" element={<PickleballEcosystem />} />
            <Route path="/social-fitness/festivals" element={<FestivalizationWave />} />
            <Route path="/social-fitness/recovery" element={<SocialRecovery />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/superadmin" element={<SuperAdminPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/life-practice/universal-love" element={<UniversalLove />} />
            <Route path="/life-practice/do-no-harm" element={<DoNoHarm />} />
            <Route path="/life-practice/good-moral-person" element={<GoodMoralPerson />} />
            <Route path="/life-practice/breathing-mindfulness" element={<BreathingMindfulness />} />
            <Route path="/life-practice/loving-kindness" element={<LovingKindness />} />
            <Route path="/life-practice/beginners-guide" element={<BeginnersGuide />} />
            <Route path="/:region" element={<RegionHub />} />
            <Route path="/:region/:category" element={<CategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
