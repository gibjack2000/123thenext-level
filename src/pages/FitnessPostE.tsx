import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FitnessPostE() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Improve Your Mobility in 10 Minutes" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            Improve Your Mobility in 10 Minutes
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              We often think of fitness purely in terms of strength or cardiovascular endurance. However, mobility—the ability to actively control your joints through their full range of motion—is the unsung hero of lifelong structural health.
            </p>
            <p className="mb-8">
              Poor mobility limits your athletic potential, increases injury risk, and contributes to the nagging aches and pains we often wrongfully attribute to "just getting older." The good news? You can significantly improve your mobility with just 10 minutes of targeted work a day.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The Difference Between Flexibility and Mobility</h3>
            <p className="mb-8">
              Flexibility is passive (how far a muscle can stretch), while mobility is active (how much control you have over that stretch). Being able to touch your toes when someone pushes you is flexibility. Being able to actively lift your leg straight up to a 90-degree angle without momentum is mobility. We want <strong>mobility</strong> because active control prevents injuries.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The 10-Minute Daily Mobility Flow</h3>
            <p className="mb-4">
              Perform this sequence either first thing in the morning to lubricate your joints or as a warm-up before a workout. Spend about 2 minutes on each movement, focusing on deep breathing and smooth, controlled motions.
            </p>
            
            <div className="space-y-6 mb-8">
              <div>
                <strong className="text-slate-900 text-lg">1. The World's Greatest Stretch (Spine, Hips, Hamstrings)</strong>
                <p className="mt-1">
                  Start in a push-up position. Step your right foot outside your right hand. Drop your right elbow toward the floor, then twist your torso and reach your right hand toward the ceiling. Return to the start and switch sides. This targets the thoracic spine and tight hip flexors simultaneously.
                </p>
              </div>
              <div>
                <strong className="text-slate-900 text-lg">2. 90/90 Hip Switches (Hip Internal/External Rotation)</strong>
                <p className="mt-1">
                  Sit on the floor with both knees bent at 90 degrees, one leg sweeping in front of you and the other sweeping behind. Keeping your torso tall, slowly pivot on your heels to flip your knees to the other side. This is crucial for undoing the damage of sitting in office chairs all day.
                </p>
              </div>
              <div>
                <strong className="text-slate-900 text-lg">3. Deep Squat Hold with Prying (Ankles, Hips, Lower Back)</strong>
                <p className="mt-1">
                  Drop into the deepest squat you can manage while keeping your heels on the ground. Use your elbows to gently push your knees outward. If your ankles are tight, place a rolled-up towel under your heels. Hold for a minute, shifting weight gently from side to side.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Tools to Accelerate Your Progress</h3>
            <p className="mb-4">
              While bodyweight is often enough, specific tools can help release myofascial restrictions and allow you to achieve deeper ranges of motion.
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li>
                <strong>High-Density Foam Roller:</strong> <a href="https://www.amazon.com/s?k=high+density+foam+roller" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Shop Foam Rollers on Amazon</a>. Perfect for rolling out tight quads, lats, and the thoracic spine before beginning your mobility flow.
              </li>
              <li>
                <strong>Trigger Point Massage Balls:</strong> <a href="https://www.amazon.com/s?k=lacrosse+massage+ball" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Lacrosse Massage Balls on Amazon</a>. For targeted relief in stubborn areas like the glutes, feet, or between the shoulder blades where a foam roller can't reach.
              </li>
              <li>
                <strong>Yoga blocks:</strong> <a href="https://www.amazon.com/s?k=cork+yoga+blocks" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Cork Yoga Blocks on Amazon</a>. Essential for bringing the floor closer to you during stretches if your current mobility doesn't allow you to reach the ground safely without compromising your lower back.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              Ten minutes a day might not sound like much, but the compounding returns of daily mobility work are massive. By dedicating a small fraction of your day to caring for your joints, you'll feel looser, train harder, and move through life with significantly less friction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
