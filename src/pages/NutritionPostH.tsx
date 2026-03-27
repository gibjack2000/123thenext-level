import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NutritionPostH() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200" 
              alt="Understanding Macronutrients" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            Understanding Macronutrients
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              Whether your goal is to lose weight, build muscle, or simply maintain steady energy levels throughout the day, understanding what makes up the food you eat is the first step. Enter the "Macros."
            </p>
            <p className="mb-8">
              Macronutrients—proteins, carbohydrates, and fats—are the three primary building blocks of the human diet. Every calorie you consume comes from one of these three sources (or alcohol). Let's break down exactly what they do and why you need them.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Protein: The Master Builder</h3>
            <p className="mb-4">
              Protein is essential for building and repairing tissues, including muscle, skin, and hair. It's also highly satiating, meaning a high-protein meal keeps you feeling full for much longer. 
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li><strong>Calories per gram:</strong> 4</li>
              <li><strong>Optimal daily intake:</strong> Roughly 0.8g to 1g per pound of target body weight.</li>
              <li><strong>Best sources:</strong> Chicken, turkey, fish, eggs, Greek yogurt, lentils, and tofu.</li>
              <li>
                <strong>Easy Supplementation:</strong> <a href="https://www.amazon.com/s?k=whey+protein+isolate" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">Whey Protein Isolate on Amazon</a>. A scoop of protein powder mixed with water or milk is the easiest way to hit your daily protein goals without adding excess fat or carbs.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Carbohydrates: The Premium Fuel</h3>
            <p className="mb-4">
              Carbs have been unfairly demonized. While it's true that overconsuming highly processed sugars can lead to weight gain, complex carbohydrates are your body's—and your brain's—preferred energy source.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li><strong>Calories per gram:</strong> 4</li>
              <li><strong>The Fiber Factor:</strong> Focus on carbs high in fiber. Fiber slows digestion, preventing the rapid blood sugar spikes (and subsequent crashes) associated with sugary foods.</li>
              <li><strong>Best sources:</strong> Oats, sweet potatoes, brown rice, quinoa, and fruits.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Dietary Fats: The Hormone Harmonizers</h3>
            <p className="mb-4">
              Eating fat does not make you fat. Dietary fat is crucial for absorbing vitamins (A, D, E, and K), protecting your organs, and regulating hormones like testosterone and estrogen.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li><strong>Calories per gram:</strong> 9 (More than double the calories of protein or carbs, which is why portion control is key).</li>
              <li><strong>The Rule of Thumb:</strong> Avoid artificial trans fats entirely. Focus on monounsaturated and polyunsaturated fats.</li>
              <li><strong>Best sources:</strong> Avocados, nuts, seeds, olive oil, and fatty fish like salmon.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How to Track Your Macros</h3>
            <p className="mb-4">
              You don't need to track your macros forever, but doing it for a few weeks provides an invaluable education on portion sizes and the true nutritional profile of your favorite foods.
            </p>
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <strong>The Tool You Need:</strong>
              <p className="mt-2">
                <a href="https://www.amazon.com/s?k=digital+kitchen+scale+food" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">Digital Kitchen Food Scale on Amazon</a>. Guesstimating a "tablespoon" of peanut butter usually results in three actual tablespoons, adding hundreds of unplanned calories to your day. A simple digital scale is the most powerful weight management tool you can own.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              Stop viewing food simply as "good" or "bad." View it as a combination of proteins, carbs, and fats that serve different functions in your body. When you balance these three pillars, you create a sustainable, highly effective diet that fuels your lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
