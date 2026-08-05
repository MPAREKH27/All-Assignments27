import React from 'react';
import { Music, ShoppingBag, Utensils, Video, ShieldCheck, FolderCode, Sparkles, Terminal } from 'lucide-react';

export type TabType = 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5' | 'code-hub';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'ex1' as TabType,
      title: '1. Copilot PlaylistCard',
      icon: Music,
      badge: 'Copilot',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    },
    {
      id: 'ex2' as TabType,
      title: '2. Flipkart Card & Debugger',
      icon: ShoppingBag,
      badge: 'ChatGPT',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      id: 'ex3' as TabType,
      title: '3. Zomato Hook Prompt',
      icon: Utensils,
      badge: 'Custom Hook',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    },
    {
      id: 'ex4' as TabType,
      title: '4. YouTube useVideos Hook',
      icon: Video,
      badge: 'Copilot Refactor',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20'
    },
    {
      id: 'ex5' as TabType,
      title: '5. AI Code Review & Audit',
      icon: ShieldCheck,
      badge: 'Improvements',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      id: 'code-hub' as TabType,
      title: 'Full JSX & JS Files Hub',
      icon: FolderCode,
      badge: 'Download All',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 flex items-center gap-2">
                React AI Developer Workbench
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Copilot & ChatGPT Lab • Complete JSX & JS Solutions
              </p>
            </div>
          </div>

          {/* Quick Stats or Status Badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>VS Code + ChatGPT + Copilot Ready</span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/60 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md border ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
