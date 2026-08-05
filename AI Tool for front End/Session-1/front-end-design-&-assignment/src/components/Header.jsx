import React from 'react';
import { TaskId } from '../types';
import { 
  Layout, 
  Sparkles, 
  Table, 
  ShieldAlert, 
  Navigation, 
  Terminal, 
  FileCode, 
  CheckCircle2 
} from 'lucide-react';

interface HeaderProps {
  activeTask: TaskId;
  setActiveTask: (task: TaskId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTask, setActiveTask }) => {
  const navItems = [
    { id: 'task1' as TaskId, label: '1. Flipkart HTML Outline', icon: Layout, file: 'product-listing-outline.html' },
    { id: 'task2' as TaskId, label: '2. Figma AI vs Uizard', icon: Table, file: null },
    { id: 'task3' as TaskId, label: '3. Zomato AI & Ethics', icon: ShieldAlert, file: null },
    { id: 'task4' as TaskId, label: '4. Myntra Navbar JSX', icon: Navigation, file: 'myntra-navbar.html' },
    { id: 'playground' as TaskId, label: 'AI Prompt Studio', icon: Terminal, file: null },
  ];

  return (
    <header class="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
                AI Front-End Studio
                <span class="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </h1>
              <p class="text-xs text-slate-400 font-sans hidden sm:block">
                E-Commerce Outlines • Figma AI & Uizard • Ethics & Speedups • Responsive JSX
              </p>
            </div>
          </div>

          {/* Quick File Links */}
          <div class="hidden lg:flex items-center space-x-2 text-xs">
            <span class="text-slate-400 font-mono">Files Generated:</span>
            <a 
              href="/product-listing-outline.html" 
              target="_blank" 
              rel="noreferrer"
              class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded border border-slate-700 flex items-center gap-1.5 transition-colors font-mono"
            >
              <FileCode className="w-3.5 h-3.5" /> product-listing-outline.html
            </a>
            <a 
              href="/myntra-navbar.html" 
              target="_blank" 
              rel="noreferrer"
              class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-pink-400 rounded border border-slate-700 flex items-center gap-1.5 transition-colors font-mono"
            >
              <FileCode className="w-3.5 h-3.5" /> myntra-navbar.html
            </a>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div class="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/80 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTask === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTask(item.id)}
                class={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.file && (
                  <span class={`text-[9px] font-mono px-1.5 py-0.2 rounded ${isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'}`}>
                    .html
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
