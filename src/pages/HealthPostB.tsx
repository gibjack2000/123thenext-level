import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthPostB() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=1200" 
              alt="Understanding Your Immune System" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            Understanding Your Immune System
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-bold uppercase tracking-wider">
              Health
            </span>
            <span className="text-slate-500 font-medium">5 min read</span>
          </div>

          <div className="prose prose-lg prose-rose max-w-none text-slate-600">
            <p className="lead text-2xl text-slate-500 mb-8 font-medium">
              Right now, as you read this sentence, a silent war is being waged inside you. On one side are trillions of bacteria, viruses, and fungi trying to find a home. On the other side is the most complex security system ever devised: your immune system.
            </p>

            <p>
              Most of us only think about our immunity when we’re reaching for a box of tissues. But what if you viewed your immune system not just as a "sickness preventer," but as a highly intelligent, biological superpower that you can actually train? Understanding how this system works is the first step toward mastering your long-term health.
            </p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">The Two-Tiered Defense System</h3>
            <p>
              Your immune system isn't just one organ; it's a vast network of cells and proteins spread throughout your body. It operates using two primary strategies:
            </p>

            <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. The Innate Immune System (The First Responders)</h4>
            <p>
              This is the defense you were born with. It includes physical barriers like your skin and stomach acid, as well as general-purpose "scout" cells that attack any foreign invader on sight. It’s fast and aggressive, but it doesn't "remember" specific enemies.
            </p>

            <h4 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Adaptive Immunity (The Special Ops)</h4>
            <p>
              This is your body's "learning" defense. When the innate system is overwhelmed, the adaptive system creates specific antibodies to target a unique invader. Most importantly, it keeps a "memory" of that enemy. This is why you usually don't get the same cold or chickenpox twice—your Special Ops team recognizes the threat and neutralizes it before you even feel a symptom.
            </p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">Why Your Gut is the "Training Ground"</h3>
            <p>
              It might surprise you to learn that nearly <strong>70% to 80% of your immune system resides in your gut.</strong>
            </p>
            <p>
              Your digestive tract is where your body interacts most frequently with the outside world. Your gut microbiome—the trillions of "good" bacteria living in your intestines—acts as a training academy for your immune cells. These bacteria teach your immune system to distinguish between a harmless piece of food and a dangerous pathogen.
            </p>
            <p>
              When your gut health is compromised, your immune system can become "confused," leading to chronic inflammation or even autoimmune issues where the body starts attacking its own healthy tissue.
            </p>

            <div className="my-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 italic">
              [Image of the gut-associated lymphoid tissue GALT]
            </div>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">The Pillars of Immune Support</h3>
            <p>
              You can’t "boost" your immune system into overdrive (that would actually lead to allergies and inflammation), but you can <strong>optimize</strong> it. Based on recent clinical research, three lifestyle factors stand above the rest:
            </p>

            <ul className="space-y-4 my-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>Sleep:</strong> During deep sleep, your immune system releases proteins called cytokines, which help promote sleep and fight infection. Chronic sleep deprivation significantly reduces the production of these protective cells.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>Moderate Exercise:</strong> Regular physical activity improves the circulation of immune cells, making it easier for your "bodyguards" to patrol for invaders.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>Targeted Nutrition:</strong> Beyond just Vitamin C, your body needs a variety of micronutrients like Zinc, Vitamin D, and Selenium to fuel the production of new white blood cells.</span>
              </li>
            </ul>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">Strategic Tools for Your Health Arsenal</h3>
            <p>
              To help support your internal defenses, consider these science-backed additions to your daily routine:
            </p>

            <ul className="space-y-4 my-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>High-Quality Probiotics:</strong> Since so much of your immunity starts in the gut, maintaining a healthy bacterial balance is key. <a href="https://www.google.com/search?q=https://www.amazon.com/s%3Fk%3Dprobiotic%2Bsupplement%2Bfor%2Bimmune%2Bsupport" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline font-medium">Explore Probiotic Support on Amazon</a>.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-3 mt-1.5">•</span>
                <span><strong>Vitamin D3 + K2:</strong> Vitamin D is essential for activating the T-cells that fight off serious infections. <a href="https://www.amazon.com/s?k=vitamin+d3+k2" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline font-medium">Shop Vitamin D3/K2 on Amazon</a>.</span>
              </li>
            </ul>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl font-display uppercase tracking-tight text-slate-900 mt-12 mb-6">The Final Word: Immunity as Longevity</h3>
            <p>
              Here is the valuable conclusion most people miss: <strong>A strong immune system is your primary engine for longevity.</strong>
            </p>
            <p>
              As we age, our immune function naturally declines—a process called <em>immunosenescence</em>. This doesn't just make us more prone to the flu; it's linked to chronic low-grade inflammation that accelerates aging in every organ.
            </p>
            <p>
              By investing in your immune health today through better sleep, gut-friendly nutrition, and strategic supplementation, you aren't just avoiding a cold next week. You are protecting your future self against the systemic wear and tear of time. Your immune system is more than a shield; it is the ultimate foundation for a long, vibrant life.
            </p>

            <div className="mt-12 p-8 bg-rose-50 rounded-2xl border border-rose-100 italic text-slate-700 font-medium text-center">
              <strong>Would you like me to create an infographic summary of these immune-supporting habits for you?</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
