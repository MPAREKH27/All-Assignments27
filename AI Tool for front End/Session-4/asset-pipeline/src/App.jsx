import React, { useState } from 'react';
import { Header } from './components/Header';
import { Task1AppIcons } from './components/Task1AppIcons';
import { Task2ZomatoBg } from './components/Task2ZomatoBg';
import { Task3WebPOptimizer } from './components/Task3WebPOptimizer';
import { Task4MusicHeroCompare } from './components/Task4MusicHeroCompare';
import { Task5FintechCompare } from './components/Task5FintechCompare';
import { Sparkles, Layers, ArrowRight, Zap, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('icons');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Sticky Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Active Tab View Rendering */}
        {activeTab === 'icons' && <Task1AppIcons />}
        {activeTab === 'zomato' && <Task2ZomatoBg />}
        {activeTab === 'webp' && <Task3WebPOptimizer />}
        {activeTab === 'music' && <Task4MusicHeroCompare />}
        {activeTab === 'fintech' && <Task5FintechCompare />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-rose-500 to-indigo-500 flex items-center justify-center text-white font-bold text-[10px]">
              AI
            </div>
            <span className="font-semibold text-slate-300">AI Image Prompt Engineering & WebP Optimization Lab</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <span className="flex items-center text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> WebP Pipeline Active
            </span>
            <span>Target: &lt; 200 KB per asset</span>
            <span>5 Lab Tasks Fully Implemented</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
