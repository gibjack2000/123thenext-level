import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NutritionPostG() {
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
              src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200" 
              alt="Mastering Meal Prep: A Step-by-Step Guide for Busy Weeks" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            Mastering Meal Prep: A Step-by-Step Guide for Busy Weeks
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              We all know the feeling: It is 7:00 PM on a Wednesday, you are exhausted from work, and the last thing you want to do is chop vegetables. So, you order takeout. Again.
            </p>
            <p className="mb-8">
              The secret to eating healthy consistently isn't willpower; it is preparation. Meal prepping removes the daily friction of deciding what to eat and cooking it from scratch. Here is a foolproof guide to prepping your meals for the week in under two hours.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. The "Buffet Style" Method vs. "Full Meals"</h3>
            <p className="mb-4">
              Many beginners try to cook five identical meals of chicken, rice, and broccoli in individual containers. By Wednesday, they are so bored they order pizza anyway. 
            </p>
            <p className="mb-8">
              Instead, try <strong>Buffet Style Prepping</strong> (also known as ingredient prepping). You cook large batches of 2-3 proteins, a couple of complex carbohydrates, and plenty of roasted or chopped vegetables. You store these separately in large containers. During the week, you simply mix and match these components to build different meals on the fly.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. The Essential Gear</h3>
            <p className="mb-4">
              Having the right tools can cut your prep time in half and keep your food fresher for longer. Do not rely on mismatched plastic tubs missing their lids.
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li>
                <strong>Glass Storage Containers:</strong> <a href="https://www.amazon.com/s?k=glass+meal+prep+containers" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">Glass Meal Prep Containers on Amazon</a>. Glass won't stain, doesn't retain odors from that garlic chicken you made last week, and is perfectly safe for the microwave and dishwasher.
              </li>
              <li>
                <strong>A High-Quality Chef's Knife:</strong> <a href="https://www.amazon.com/s?k=8+inch+chefs+knife" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">8-Inch Chef's Knife on Amazon</a>. More time is wasted struggling with dull knives than almost anything else in the kitchen. A sharp knife makes chopping sweet potatoes a breeze rather than a workout.
              </li>
              <li>
                <strong>Rice Cooker or Instant Pot:</strong> <a href="https://www.amazon.com/s?k=instant+pot+multicooker" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold underline">Instant Pot on Amazon</a>. Set it and forget it. While your grains or slow-cooked proteins are cooking automatically, you can focus on chopping and roasting.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. The 2-Hour Action Plan</h3>
            <p className="mb-4">
              To keep your prep under two hours, you must embrace multitasking. Here is the ideal workflow for a Sunday afternoon:
            </p>
            <ol className="list-decimal pl-6 space-y-3 mb-8">
              <li><strong>Preheat the oven (400°F).</strong> Start by washing and chopping all your vegetables.</li>
              <li><strong>Start the slow cookers/boiling water.</strong> Get your rice, quinoa, or hard-boiled eggs going since they require zero active attention once started.</li>
              <li><strong>Sheet Pan Roasting.</strong> Toss your chopped vegetables in olive oil, salt, and pepper. Put them in the oven (they usually take 20-30 minutes).</li>
              <li><strong>Stovetop Proteins.</strong> While the oven and rice cooker are working, cook your ground turkey, chicken breast, or tofu on the stove.</li>
              <li><strong>Cool and Store.</strong> Let everything cool completely before sealing the containers, otherwise, condensation will make your food soggy.</li>
            </ol>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              Meal prepping is a skill. Your first attempt might take three hours, and you might make a mess of your kitchen. But with practice, having healthy, delicious food ready to eat in your fridge becomes the ultimate life hack for maintaining your nutrition and saving money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
