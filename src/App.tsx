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
        
        <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)] sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl text-white mr-3 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <HomeIcon size={20} strokeWidth={2.5} />
              </div>
              <span className="font-display font-black uppercase tracking-tighter text-xl border-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-500">
                123TheNext Level
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <a href="/#pillars" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">Pillars</a>
              <a href="/#blog" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">Blog</a>
              <a href="/#shop" className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">Shop</a>
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              <Link 
                to="/admin" 
                className="flex items-center text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5"
              >
                <Settings size={16} className="mr-2" />
                Admin
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-b-3xl">
              <div className="px-4 py-6 space-y-2">
                <a 
                  href="/#pillars" 
                  className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pillars
                </a>
                <a 
                  href="/#blog" 
                  className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </a>
                <a 
                  href="/#shop" 
                  className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </a>
                <div className="pt-4 mt-2 border-t border-slate-100">
                  <Link 
                    to="/admin" 
                    className="flex items-center justify-center w-full text-base font-bold text-white bg-slate-900 hover:bg-blue-600 px-4 py-3.5 rounded-xl transition-all shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings size={18} className="mr-2" />
                    Admin Dashboard
                  </Link>
                </div>
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
