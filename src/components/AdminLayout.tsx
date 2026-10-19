import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Database, 
  BookOpen, 
  Cpu, 
  Bot, 
  ExternalLink, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  Globe
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    label: '🛡️ Affiliates',
    path: '/admin/affiliates',
    icon: Shield,
    badge: 'Live',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    label: '⚙️ Clinical Catalog',
    path: '/admin',
    icon: Database,
    badge: 'Core',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  },
  {
    label: '📝 Blog Studio',
    path: '/admin/blogs',
    icon: BookOpen,
  },
  {
    label: '🤖 Automation',
    path: '/automation-admin',
    icon: Bot,
  },
  {
    label: '⚡ SuperAdmin',
    path: '/superadmin',
    icon: Cpu,
  }
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Shield size={18} />
          </div>
          <div>
            <div className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
              123<span className="text-cyan-400">NextLevel</span> Admin
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Control Portal</div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle mobile admin menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Navigation Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden sticky top-[57px] z-30 bg-slate-950/98 border-b border-slate-800 p-4 space-y-1.5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 py-1">
            Admin Navigation
          </div>

          {ADMIN_NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon size={16} className={active ? 'text-cyan-400' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase border ${item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-800/80">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Globe size={15} />
              <span>Return to Public Website ↗</span>
            </Link>
          </div>
        </div>
      )}

      <div className="flex-1 flex w-full">
        {/* Desktop Permanent Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-slate-950 border-r border-slate-800/80 z-30">
          
          {/* Sidebar Brand Header */}
          <div className="p-6 border-b border-slate-800/80">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/10">
                <Shield size={20} />
              </div>
              <div>
                <div className="text-base font-black text-white tracking-tight flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                  123<span className="text-cyan-400">NextLevel</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Admin Command Center
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 py-1 mb-2">
              Management Portals
            </div>

            {ADMIN_NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    active
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon 
                      size={16} 
                      className={`transition-colors ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} 
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase border ${item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                      {item.badge}
                    </span>
                  ) : active ? (
                    <ChevronRight size={14} className="text-cyan-400" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Bottom Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/30 space-y-2">
            <Link
              to="/"
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-slate-500" />
                <span>Public Website</span>
              </div>
              <ExternalLink size={12} className="text-slate-500" />
            </Link>

            <div className="text-[10px] text-slate-500 text-center pt-1 font-mono">
              System v1.2.4 • Supabase Live
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
