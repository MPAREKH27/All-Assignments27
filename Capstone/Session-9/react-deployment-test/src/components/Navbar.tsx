import React from 'react';
import { Rocket, Flame, Globe, GitBranch, Bot, Code2, CheckCircle2, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'netlify', label: '1. Netlify Deploy', icon: Rocket },
    { id: 'firebase', label: '2. Firebase Hosting', icon: Flame },
    { id: 'domain', label: '3. Custom Domain', icon: Globe },
    { id: 'cicd', label: '4. CI/CD Explanation', icon: GitBranch },
    { id: 'ai-guide', label: '5. AI Prompt Guide', icon: Bot },
    { id: 'code', label: '6. Full React Code', icon: Code2 },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Main Title Badge - REQUIRED TO DISPLAY "React Deployment Test" */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  React Deployment Test
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Live Test Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Comprehensive React App Deployment & SPA Router Validation Suite
              </p>
            </div>
          </div>

          {/* Quick Status Bar */}
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SPA 404 Prevention: <strong className="text-emerald-400">Active</strong></span>
            <span className="text-slate-600">|</span>
            <span>Port: <strong className="text-cyan-300">3000</strong></span>
          </div>

        </div>

        {/* Tab Navigation Bar */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto mt-3 pb-1 no-scrollbar border-t border-slate-800 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
