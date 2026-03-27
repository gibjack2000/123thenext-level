import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FitnessPostD() {
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
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200" 
              alt="A Beginner's Guide to Strength Training at Home" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            A Beginner's Guide to Strength Training at Home
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              Starting a strength training journey can be intimidating, especially if you feel you need a fully-equipped gym. But building muscle and functional strength at home is entirely possible with minimal equipment and a solid plan.
            </p>
            <p className="mb-8">
              Whether you want to build lean muscle, improve your metabolism, or just feel stronger in your daily life, the principles of progressive overload still apply in your living room. Here is a step-by-step guide to starting your home strength training journey.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Master Bodyweight Basics First</h3>
            <p className="mb-4">
              Before lifting heavy weights, you need to master your own bodyweight. This builds the neuromuscular connections necessary for safe lifting later on. Focus on the foundational movement patterns: push, pull, squat, and hinge.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>Push:</strong> Push-ups (knees or incline if needed)</li>
              <li><strong>Pull:</strong> Bodyweight rows (using a sturdy table or door frame pull-up bar)</li>
              <li><strong>Squat:</strong> Bodyweight squats (focusing on depth and form)</li>
              <li><strong>Hinge:</strong> Glute bridges</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Invest in Versatile Equipment</h3>
            <p className="mb-4">
              Once bodyweight exercises become too easy (you can comfortably do 3 sets of 15 repetitions), it is time to add resistance. You don't need a bulky squat rack. A few versatile pieces of equipment can replicate almost an entire gym.
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li>
                <strong>Adjustable Dumbbells:</strong> <a href="https://www.amazon.com/s?k=adjustable+dumbbells" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Shop Adjustable Dumbbells on Amazon</a>. These are the holy grail of home workouts. They save space and allow you to micro-load your progress over time.
              </li>
              <li>
                <strong>Resistance Bands:</strong> <a href="https://www.amazon.com/s?k=heavy+resistance+bands" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Heavy Resistance Bands on Amazon</a>. Perfect for adding resistance to squats, assisting with pull-ups, or isolating smaller muscle groups like the shoulders and triceps.
              </li>
              <li>
                <strong>A Stable Bench:</strong> <a href="https://www.amazon.com/s?k=adjustable+weight+bench" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">Adjustable Weight Bench on Amazon</a>. A bench expands your exercise library exponentially, allowing for incline presses, step-ups, and supported rows.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Structure Your Weekly Routine</h3>
            <p className="mb-4">
              A common mistake beginners make is training randomly. For optimal results, you need a structured plan. A full-body routine performed 3 times a week is highly effective for beginners.
            </p>
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-2">Sample 3-Day Full Body Split (e.g., Mon/Wed/Fri):</strong>
              <ul className="list-decimal pl-6 space-y-1">
                <li>Goblet Squats (with dumbbell): 3 sets of 10-12 reps</li>
                <li>Dumbbell Floor Press or Push-ups: 3 sets of 8-12 reps</li>
                <li>Dumbbell Bent-Over Rows: 3 sets of 10-12 reps</li>
                <li>Dumbbell Romanian Deadlifts: 3 sets of 10-12 reps</li>
                <li>Plank: 3 sets, hold for 30-60 seconds</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Progressive Overload is Mandatory</h3>
            <p className="mb-8">
              Your muscles will only grow and adapt if you give them a reason to. This means you must progressively challenge them. You can achieve this by increasing the weight, increasing the repetitions, improving your form, or decreasing rest time between sets. Keep a journal or use an app to track your workouts so you know what you did last week and what you need to beat this week.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              Strength training at home offers unmatched convenience. By mastering form, investing in a few key pieces of equipment, and sticking to a progressive routine, you can build incredible strength without ever stepping foot on a noisy gym floor. Start light, stay consistent, and enjoy the process of becoming stronger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
