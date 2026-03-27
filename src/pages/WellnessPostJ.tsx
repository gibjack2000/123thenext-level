import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WellnessPostJ() {
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
              src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1200" 
              alt="Practical Mindfulness: Techniques for Busy Schedules" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            Practical Mindfulness: Techniques for Busy Schedules
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              When most people hear the word "mindfulness," they picture sitting cross-legged on a cushion for an hour in total silence. For the average professional juggling deadlines, meetings, and family responsibilities, this image isn't just intimidating—it's impossible.
            </p>
            <p className="mb-8">
              But mindfulness isn't about emptying your mind of all thoughts; it is about paying attention on purpose, in the present moment, without judgment. You do not need hours of free time to cultivate this. You just need intention. Here is how to build practical mindfulness into a packed schedule.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. The "Anchor" Micro-Meditation</h3>
            <p className="mb-4">
              You do not need to pause your day to be mindful. Instead, tie mindfulness to an "anchor"—an activity you already perform daily without thinking. Excellent anchors include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
              <li>Waiting for your morning coffee to brew.</li>
              <li>Washing your hands.</li>
              <li>Walking from your car to your office building.</li>
            </ul>
            <p className="mb-4">
              During these brief windows (often 30 seconds to 2 minutes), drop the mental to-do list. Focus entirely on the physical sensations. How does the warm water feel on your hands? What does the coffee smell like? These micro-breaks lower your baseline cortisol levels throughout the day.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. The 5-4-3-2-1 Grounding Technique</h3>
            <p className="mb-4">
              When anxiety spikes before a presentation or during a stressful meeting, your mind usually races into the future ("What if I fail?") or dwells on the past. To instantly pull yourself back to the present, use your five senses:
            </p>
            <ul className="list-decimal pl-6 space-y-2 mb-8 text-slate-600">
              <li>Acknowledge <strong>FIVE</strong> things you see around you.</li>
              <li>Acknowledge <strong>FOUR</strong> things you can physically feel (e.g., your feet on the floor, your shirt against your back).</li>
              <li>Acknowledge <strong>THREE</strong> things you can hear.</li>
              <li>Acknowledge <strong>TWO</strong> things you can smell.</li>
              <li>Acknowledge <strong>ONE</strong> thing you can taste.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Single-Tasking as Mindfulness</h3>
            <p className="mb-4">
              Multitasking is a myth; you are actually rapid-task-switching, which drains mental energy and increases anxiety. Choose to do one thing at a time. If you are writing an email, just write the email. Do not check Slack at the same time. If you are eating lunch, just eat lunch. Do not scroll through social media.
            </p>
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <strong>Recommended Tool for Focus:</strong>
              <p className="mt-2">
                <a href="https://www.amazon.com/s?k=physical+pomodoro+timer" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 font-bold underline">Physical Pomodoro Timer on Amazon</a>. Using a physical timer instead of your phone prevents you from getting distracted by notifications when you set your focus blocks. Set it for 25 minutes of pure, single-tasking focus.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. The Transition Breath</h3>
            <p className="mb-4">
              We often carry the energy of one task directly into the next. The stress of the commute bleeds into the morning meeting; the irritation of the meeting bleeds into family time.
            </p>
            <p className="mb-8">
              Create a buffer. Before you open your car door, or before you click "Join" on a Zoom call, take one deep inhale through the nose and exhale slowly through the mouth. This signals to your nervous system that a transition is occurring and allows you to start the next event with a clean slate.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              Mindfulness is a muscle. The goal is not to achieve a permanent state of zen, but to reduce the lag time between noticing you are distracted or stressed, and returning to the present moment. By weaving these practices into your existing routine, you will find a profound sense of space even on your busiest days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
