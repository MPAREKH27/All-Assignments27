import React, { useState } from 'react';
import { TaskId } from './types';
import { Header } from './components/Header';
import { Task1FlipkartOutline } from './components/Task1FlipkartOutline';
import { Task2DesignToolsTable } from './components/Task2DesignToolsTable';
import { Task3ZomatoAiEthics } from './components/Task3 ZomatoAiEthics';
import { Task4MyntraNavbar } from './components/Task4MyntraNavbar';
import { PromptPlayground } from './components/PromptPlayground';
import { FileCode, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTask, setActiveTask] = useState<TaskId>('task1');

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header activeTask={activeTask} setActiveTask={setActiveTask} />

        {/* Main Workspace Body */}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTask === 'task1' && <Task1FlipkartOutline />}
          {activeTask === 'task2' && <Task2DesignToolsTable />}
          {activeTask === 'task3' && <Task3ZomatoAiEthics />}
          {activeTask === 'task4' && <Task4MyntraNavbar />}
          {activeTask === 'playground' && <PromptPlayground />}
        </main>
      </div>

      {/* Footer */}
      <footer class="bg-slate-900 border-t border-slate-800 py-6 mt-12 text-slate-400 text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span class="font-medium text-slate-300">AI Front-End Design & Assignment Workbench</span>
          </div>

          <div class="flex items-center space-x-4 font-mono text-[11px]">
            <a 
              href="/product-listing-outline.html" 
              target="_blank" 
              rel="noreferrer" 
              class="text-blue-400 hover:underline flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" /> product-listing-outline.html
            </a>
            <span>•</span>
            <a 
              href="/myntra-navbar.html" 
              target="_blank" 
              rel="noreferrer" 
              class="text-pink-400 hover:underline flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" /> myntra-navbar.html
            </a>
          </div>

          <p class="text-slate-500 text-[11px]">
            Built with React 19, Tailwind CSS & Lucide Icons
          </p>
        </div>
      </footer>
    </div>
  );
}
