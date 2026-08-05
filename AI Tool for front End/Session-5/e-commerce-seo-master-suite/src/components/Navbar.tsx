import React from 'react';
import { 
  Sparkles, 
  Tag, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Network, 
  Code2, 
  Layers,
  Bot
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: Layers },
    { id: 'task1', label: '1. Flipkart Meta Tags', icon: Tag },
    { id: 'task2', label: '2. Zomato Food Blog', icon: FileText },
    { id: 'task3', label: '3. Myntra Plagiarism', icon: ShieldCheck },
    { id: 'task4', label: '4. Cricket Gear Audit', icon: CheckCircle2 },
    { id: 'task5', label: '5. Keyword Clustering', icon: Network },
    { id: 'gemini', label: 'AI Generator', icon: Bot },
    { id: 'code', label: 'Full Code & Export', icon: Code2 },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-extrabold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  SEO Master Suite
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                  E-Commerce Lab
                </span>
              </div>
              <p className="text-xs text-slate-400">5-Task Full Code Interactive Workshop</p>
            </div>
          </div>

          {/* Export / Quick Status Indicator */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All 5 Tasks Validated & Saved</span>
            </div>
            <button
              onClick={() => setActiveTab('code')}
              className="flex items-center space-x-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-indigo-600/30"
            >
              <Code2 className="w-4 h-4" />
              <span>View Source Code</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Scrollbar */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/50 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
