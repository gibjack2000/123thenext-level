import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-900">
      
      {/* Brand Logo & Name */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-slate-950 text-lg tracking-tighter">
          123
        </div>
        <span className="font-semibold text-base tracking-tight text-slate-200">123TheNextLevel</span>
      </div>

      {/* Main Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
        <Link to="/library" className="hover:text-cyan-400 transition-colors">
          📚 Library & Manuals
        </Link>
        <Link to="/quiz" className="text-slate-350 hover:text-cyan-400 transition-colors">
          ⚡ Free Wellness Quiz
        </Link>
        <Link 
          to="/store" 
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 font-bold"
        >
          <span>🛒 Store</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm shadow-amber-500/30 animate-pulse">
            Express
          </span>
        </Link>
      </nav>

      {/* Primary Conversion Button (Highlighted & Neon Styled) */}
      <div>
        <Link 
          to="/quiz" 
          className="px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/10 transition"
        >
          Start Free Quiz
        </Link>
      </div>

    </header>
  );
}
