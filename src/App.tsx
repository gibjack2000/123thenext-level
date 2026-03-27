/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
import NutritionPillar from './pages/NutritionPillar';
import NutritionPostG from './pages/NutritionPostG';
import NutritionPostH from './pages/NutritionPostH';
import NutritionPostI from './pages/NutritionPostI';
import WellnessPillar from './pages/WellnessPillar';
import WellnessPostJ from './pages/WellnessPostJ';
import WellnessPostK from './pages/WellnessPostK';
import WellnessPostL from './pages/WellnessPostL';
import PreventiveHealth from './pages/PreventiveHealth';
import FitnessFundamentals from './pages/FitnessFundamentals';
import RegionHub from './pages/RegionHub';
import CategoryPage from './pages/CategoryPage';
import AdminPage from './pages/AdminPage';
import BlogPostPage from './pages/BlogPostPage';
import { Settings, Home as HomeIcon, Menu, X } from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center text-slate-900 font-display uppercase tracking-tight text-lg hover:text-blue-600 transition-colors">
              <HomeIcon size={20} className="mr-2" />
              123TheNext Level
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/#pillars" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pillars</a>
              <a href="/#blog" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Blog</a>
              <a href="/#shop" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Shop</a>
              <Link 
                to="/admin" 
                className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
              >
                <Settings size={16} className="mr-2" />
                Admin
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-lg absolute w-full">
              <a 
                href="/#pillars" 
                className="block text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pillars
              </a>
              <a 
                href="/#blog" 
                className="block text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="/#shop" 
                className="block text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </a>
              <div className="pt-2 border-t border-slate-100">
                <Link 
                  to="/admin" 
                  className="flex items-center text-base font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings size={18} className="mr-2" />
                  Admin
                </Link>
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
            <Route path="/nutrition" element={<NutritionPillar />} />
            <Route path="/nutrition/post-g" element={<NutritionPostG />} />
            <Route path="/nutrition/post-h" element={<NutritionPostH />} />
            <Route path="/nutrition/post-i" element={<NutritionPostI />} />
            <Route path="/wellness" element={<WellnessPillar />} />
            <Route path="/wellness/post-j" element={<WellnessPostJ />} />
            <Route path="/wellness/post-k" element={<WellnessPostK />} />
            <Route path="/wellness/post-l" element={<WellnessPostL />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/:region" element={<RegionHub />} />
            <Route path="/:region/:category" element={<CategoryPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
