import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WellnessPostL() {
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
              src="/sleeping-kitten.png" 
              alt="The Importance of Rest: Doing Nothing" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-slate-900 mb-6">
            The Importance of Rest: Doing Nothing
          </h1>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-4">
              We live in a culture obsessed with optimization, productivity, and the "hustle." Even our downtime has been commodified into self-improvement projects. We read to get smarter, we exercise to get fitter, and we mediate to become more focused. 
            </p>
            <p className="mb-8">
              But what happens to the radical, essential act of doing absolutely nothing? Unstructured time—without a goal, without an output, without a screen—is rapidly going extinct. Yet, from a neuroscientific perspective, "doing nothing" is exactly what the brain needs to function at its highest level.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The Default Mode Network (DMN)</h3>
            <p className="mb-4">
              When you stop focusing on an external task (like reading an email or watching television), your brain doesn't shut down. Instead, it powers up a system called the Default Mode Network (DMN). 
            </p>
            <p className="mb-8">
              The DMN is responsible for consolidating memories, connecting disparate ideas, and fostering true creativity. Have you ever noticed that your best ideas come to you in the shower or while staring out a window on a long drive? That is your DMN at work. Constant stimulation prevents the DMN from activating, robbing you of deep insights and emotional processing.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Active vs. Passive Recovery</h3>
            <p className="mb-4">
              Watching Netflix for three hours is passive escaping, not true rest. It still demands cognitive resources to process the flashing images and narrative structures. True rest requires disengagement from intense stimuli.
            </p>
            <div className="space-y-4 mb-8">
              <p>Consider integrating these practices into your week:</p>
              <ul className="list-disc pl-6 space-y-4 text-slate-600">
                <li>
                  <strong>The 10-Minute Stare:</strong> Sit on a porch or look out a window. Leave your phone in another room. Do not listen to a podcast. Just let your eyes soften and your thoughts wander where they will.
                </li>
                <li>
                  <strong>Analog Hobbies:</strong> Engage your hands while letting your mind rest. 
                  <a href="https://www.amazon.com/s?k=adult+jigsaw+puzzles+1000+pieces" target="_blank" rel="noopener noreferrer" className="ml-1 text-purple-600 hover:text-purple-700 font-bold underline">Jigsaw puzzles on Amazon</a> or basic gardening are excellent ways to enter a low-stakes flow state.
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Removing the Guilt of Non-Productivity</h3>
            <p className="mb-4">
              The biggest barrier to rest isn't finding the time; it is the guilt that accompanies it. We have internalized the belief that our worth is tied directly to our output. 
            </p>
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <strong>A Mindset Shift:</strong>
              <p className="mt-2 text-slate-600">
                Think of an elite athlete. They do not train 24 hours a day. They train intensely, and then they lie on the couch to let their bodies rebuild. The rest is the vehicle for the growth. Apply the same logic to your cognitive output. If you want to perform at your peak, you must rest at your peak.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Conclusion</h3>
            <p className="mb-8">
              We must aggressively defend our right to do nothing. In a world that demands constant attention and continuous output, carving out time to sit quietly, to daydream, and to simply exist without producing is an act of profound self-care and rebellion. Put down the phone, close your eyes, and let your brain breathe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
