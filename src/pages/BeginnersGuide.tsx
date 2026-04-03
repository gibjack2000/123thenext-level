import React from 'react';
import { Compass, ArrowRight, Wind, HeartPulse, Sparkles, Zap, Target, Coffee, ScrollText, Play, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const BeginnersGuide = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-amber-500/30">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets2/foundations/beginners_guide.png" alt="Beginners Guide" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-[#0f172a]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/20 backdrop-blur-md">
            Start Your Journey
          </div>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-6">
            Beginners Start Here
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Starting your journey can feel like stepping into a vast ocean, but Daily Wisdom is designed to be your lighthouse.
          </p>
        </div>
      </div>

      {/* Infographic Section */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-4">
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Visual Overview</span>
          </div>
          <img
            src="/assets2/foundations/path_to_enlightenment_infographic.png"
            alt="The Path to Enlightenment: Developing a Life Practice"
            className="w-full h-auto"
          />
        </div>
        <p className="text-center text-slate-500 text-xs mt-3 italic">The Path to Enlightenment — a high-level overview of Gotama Buddha's teachings as a practical framework for modern life.</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xl leading-relaxed mb-12 border-l-4 border-amber-500 pl-6 py-2 bg-white/5 rounded-r-2xl">
          It takes ancient, complex teachings and turns them into a clear, step-by-step map for your modern life.
        </p>
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
          <Compass className="text-amber-500" size={32} />
          Why Daily Wisdom is Your Perfect Starting Point
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all group min-h-[220px]">
            <img src="/assets2/foundations/bg_roadmap.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/75 group-hover:bg-slate-900/60 transition-colors duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/30"><Zap size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-3">1. A No-Experience Roadmap</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Volume 1 starts exactly where you are: Developing a Life Practice. Build a simple daily habit that fits into a busy schedule without feeling overwhelmed.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all group min-h-[220px]">
            <img src="/assets2/foundations/bg_stress.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/75 group-hover:bg-slate-900/60 transition-colors duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/30"><Wind size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-3">2. Practical Tools for Stress</h3>
              <p className="text-slate-300 text-sm leading-relaxed">The Breathing Mindfulness (Vol 7) toolkit teaches you to use your own breath as a remote control for your nervous system to find calm anywhere.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all group min-h-[220px]">
            <img src="/assets2/foundations/bg_autopilot.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/75 group-hover:bg-slate-900/60 transition-colors duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/30"><Target size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-3">3. Understand Your Auto-Pilot</h3>
              <p className="text-slate-300 text-sm leading-relaxed">The Six Sense Bases (Vol 9) teaches you to spot the spark of a reaction before it becomes a fire, giving you the power to choose your response.</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all group min-h-[220px]">
            <img src="/assets2/foundations/bg_reallife.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/75 group-hover:bg-slate-900/60 transition-colors duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/30"><Coffee size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-3">4. Guidance for Real Life</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Vol 8: The Foremost Householder is about being a better partner and a more focused professional. Find Zen doing the dishes or stuck in traffic.</p>
            </div>
          </div>
          {/* Card 5 */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all group min-h-[220px]">
            <img src="/assets2/foundations/bg_wisdom.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/75 group-hover:bg-slate-900/60 transition-colors duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/30"><ScrollText size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-3">5. Authentic Wisdom, Simplified</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Get the authentic words of the Buddha, translated into language that makes sense today. The gold standard of meditation advice without confusing jargon.</p>
            </div>
          </div>
          {/* Card 6 */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all group min-h-[220px]">
            <img src="/assets2/foundations/bg_purpose.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/75 group-hover:bg-slate-900/60 transition-colors duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/30"><HeartPulse size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-3">6. A Path with a Purpose</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Whether it is Generosity (Vol 13) or Kamma (Vol 6), you always know why you are practicing and where it leads: a life of less friction and more joy.</p>
            </div>
          </div>
        </div>

        {/* The Vibe of the Journey */}
        <div className="p-10 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={120} className="text-amber-500" /></div>
          <h3 className="text-3xl font-bold text-white mb-6 relative z-10">The Vibe of the Journey</h3>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed italic relative z-10">Think of Daily Wisdom as a kind, expert friend walking beside you. It does not demand perfection; it simply invites you to be a little more awake today than yesterday.</p>
          <div className="relative z-10">
            <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">Where would you like to start?</h4>
            <div className="flex flex-wrap gap-4">
              <Link to="/life-practice/breathing-mindfulness" className="inline-flex items-center px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-400 transition-all">Try Breathing Techniques <Play size={18} className="ml-2" /></Link>
              <a href="https://www.buddhadailywisdom.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20">Join David NOW <ArrowRight size={18} className="ml-2" /></a>
            </div>
          </div>
        </div>

        {/* Global Schedule + CTA Side by Side */}
        <div className="lg:flex gap-10 items-start mb-16">

          {/* Schedule Content */}
          <div className="flex-1 mb-10 lg:mb-0">
            <p className="text-slate-300 leading-relaxed mb-8">
              To make the <span className="text-white font-bold">Daily Wisdom</span> teachings accessible to your global audience, you need a schedule that acknowledges the time difference between the home base in Chiang Mai and the rest of the world. Since Chiang Mai is at <span className="text-amber-400 font-bold">UTC+7</span>, a session held in the late evening there becomes a perfect morning or lunchtime slot for the West, and a late afternoon slot for the rest of Asia.
            </p>

            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Globe size={26} className="text-amber-500" />
              Global Weekly Teaching Schedule
            </h2>
            <p className="text-amber-400 font-bold italic mb-6 text-sm">"Wisdom Without Borders"</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">Whether you are joining David in person at the temple in Chiang Mai or tuning in from your living room, we have found a "Golden Window" to ensure no one is left behind.</p>

            <div className="mb-8">
              <h3 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Weekly Live Session: Sundays</h3>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-amber-500/10 border-b border-white/10">
                      <th className="text-left px-4 py-3 text-amber-400 font-bold">Region</th>
                      <th className="text-left px-4 py-3 text-amber-400 font-bold">Local Time</th>
                      <th className="text-left px-4 py-3 text-amber-400 font-bold hidden sm:table-cell">Perfect For...</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { region: "Chiang Mai (ICT)", time: "8:00 PM", note: "A peaceful end to your weekend." },
                      { region: "London (BST/GMT)", time: "1:00 PM", note: "A mindful Sunday lunch break." },
                      { region: "New York (EDT)", time: "8:00 AM", note: "Starting your Sunday with intention." },
                      { region: "Los Angeles (PDT)", time: "5:00 AM", note: "The ultimate early-bird meditation." },
                      { region: "Sydney (AEST)", time: "11:00 PM", note: "Deep sleep preparation." },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-white font-semibold">{row.region}</td>
                        <td className="px-4 py-3 text-amber-400 font-bold">{row.time}</td>
                        <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap size={24} className="text-amber-500" />
              How to Join the Journey
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h4 className="font-bold text-white mb-2">1. In-Person (Chiang Mai)</h4>
                <p className="text-slate-300 text-sm leading-relaxed">Join David and the community at the temple in Northern Thailand. Traditional setting, direct energy, and post-teaching Q&amp;A. Authentic, quiet, and deeply immersive.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h4 className="font-bold text-white mb-2">2. Live Online (Global Stream)</h4>
                <p className="text-slate-300 text-sm leading-relaxed">Stream the teachings live via our digital hub. Submit questions via live chat for David to answer in real-time. HD quality — feel like you're sitting in the temple.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h4 className="font-bold text-white mb-2">3. The "Wisdom Vault" (On-Demand)</h4>
                <p className="text-slate-300 text-sm leading-relaxed">Can't make the live time? Every weekly teaching is uploaded to the <span className="text-amber-400 font-semibold">Daily Wisdom Portal</span> within 2 hours, with a downloadable PDF study guide based on the Words of the Buddha volumes.</p>
              </div>
            </div>
          </div>

          {/* Sticky Join CTA */}
          <div className="lg:w-80 lg:sticky lg:top-24">
            <div className="rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-gradient-to-b from-amber-500/10 to-slate-900/80 backdrop-blur-sm">
              <div className="bg-amber-500 px-6 py-4 text-center">
                <span className="text-slate-950 font-black uppercase tracking-widest text-sm">Join David NOW</span>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center mx-auto mb-4">
                    <Users size={28} className="text-amber-400" />
                  </div>
                  <p className="text-white font-bold text-lg leading-snug mb-1">Start Your Mindful Journey With David</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Your journey doesn't stop because of a timezone — mindfulness is always "now."</p>
                </div>
                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>Live Sunday sessions at your local time</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>In-person or online — your choice</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>24/7 Wisdom Vault on-demand access</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>Monthly "Prime Time" workshops for all zones</div>
                </div>
                <a href="https://www.buddhadailywisdom.com/" target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 text-sm uppercase tracking-wider">
                  Begin Your Journey <ArrowRight size={16} className="inline ml-1" />
                </a>
                <p className="text-center text-slate-500 text-xs mt-4 italic">"The Suit Everyone" Guarantee — we rotate Deep Dive workshops monthly so every timezone gets a prime-time session.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-amber-500 transition-colors font-medium">
            <ArrowRight size={20} className="mr-2 rotate-180" />Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeginnersGuide;
