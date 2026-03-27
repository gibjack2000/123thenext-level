import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WellnessPostK() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200" 
              alt="How to Set Boundaries and Protect Energy" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            How to Set Boundaries and Protect Energy
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              Burnout rarely happens over night. It is the result of a thousand tiny, unmanaged energy leaks. Taking a work call during dinner. Saying "yes" to a project when you are already underwater. Dealing with toxic people out of obligation rather than choice.
            </p>
            <p className="mb-8">
              At its core, burnout is a boundary issue. Many of us avoid setting boundaries because we fear conflict or want to be perceived as helpful. But protecting your energy isn't selfish; it is the prerequisite for being able to show up fully in the areas of life that truly matter.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Audit Your Energy Drains</h3>
            <p className="mb-4">
              Before you can defend your boundaries, you need to know where the breaches are occurring. Spend three days doing an "energy audit." Note down everything you do, and mark whether the activity (or the person) gave you energy (+) or drained you (-). 
            </p>
            <p className="mb-8 text-slate-500 italic">
              Common drains include endless text threads, unstructured meetings, doom-scrolling before bed, and performing tasks that fall outside your core responsibilities.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. The "No, But" Strategy</h3>
            <p className="mb-4">
              The hardest part of boundary-setting is the physical act of saying no. To make it easier, use the "No, But" technique. This allows you to protect your time without sounding unhelpful or harsh.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li>"I don't have the bandwidth to take on this project right now, <strong>but</strong> I'd be happy to review the final draft on Friday."</li>
              <li>"I can't make that social event, <strong>but</strong> let's grab coffee one-on-one next week."</li>
              <li>"I'm logging off for the evening, <strong>but</strong> I will tackle this first thing tomorrow."</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Establish Digital Boundaries</h3>
            <p className="mb-4">
              Your phone is a portal through which the demands of the world can instantly access your attention. If you don't build a fence here, you will never truly rest.
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8 text-slate-600">
              <li>
                <strong>Turn off non-essential notifications:</strong> The only people who should be able to interrupt you immediately are close family members or critical work emergencies. Everything else can wait for a designated checking period.
              </li>
              <li>
                <strong>The Phone Lock Box:</strong> <a href="https://www.amazon.com/s?k=time+locking+container+for+phone" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-bold underline">Time-Locking Phone Container on Amazon</a>. If you lack the willpower to ignore the ping, physically removing access during family time or deep work sessions is incredibly effective.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Protect Your First and Last Hours</h3>
            <p className="mb-4">
              The first 60 minutes of your day set the trajectory for everything that follows. The last 60 minutes determine the quality of your recovery. These hours should be strictly defended against outside demands.
            </p>
            <p className="mb-8">
              Do not check email while still in bed. Do not watch stressful news right before trying to sleep. Create a Morning Routine that fills your cup (reading, journaling, exercising) and an Evening Routine that down-regulates your nervous system.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              Setting boundaries will initially feel uncomfortable, especially if you have spent years being overly accommodating. People may push back. Let them. Your time, attention, and mental health are your most precious resources. Defend them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
