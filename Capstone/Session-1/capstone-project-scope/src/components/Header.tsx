import React from 'react';
import { TaskId } from '../types';
import { 
  Compass, 
  LayoutDashboard, 
  Sparkles, 
  GitFork, 
  Award, 
  FileDown, 
  BookOpenCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: TaskId;
  setActiveTab: (tab: TaskId) => void;
  onOpenExporter: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenExporter }) => {
  const tabs: { id: TaskId; label: string; number: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Executive Summary', number: '00', icon: <BookOpenCheck className="w-4 h-4" /> },
    { id: 'scope', label: '1. App Scope Statement', number: '01', icon: <Compass className="w-4 h-4" /> },
    { id: 'ecommerce', label: '2. Smart E-Commerce Dashboard', number: '02', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'resume', label: '3. AI Resume Features', number: '03', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'flow', label: '4. User Flow Diagram', number: '04', icon: <GitFork className="w-4 h-4" /> },
    { id: 'capstone', label: '5. Capstone Choice', number: '05', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-4">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-base font-bold bg-gradient-to-r from-slate-100 via-indigo-200 to-emerald-300 bg-clip-text text-transparent">
                  Capstone Portfolio Assignment Hub
                </h1>
                <p className="text-xs text-slate-400">React & Generative AI Systems Architecture</p>
              </div>
            </div>

            <button
              onClick={onOpenExporter}
              className="md:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          {/* Action Export Button Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All 5 Tasks Complete
            </span>

            <button
              onClick={onOpenExporter}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Copy Assignment Submission Report</span>
            </button>
          </div>
        </div>

        {/* Task Navigation Tabs */}
        <div className="flex items-center overflow-x-auto no-scrollbar py-2 space-x-1 border-t border-slate-800/80">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-500'}`}>
                  {tab.number}
                </span>
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
