import React from 'react';
import { TaskId, TaskStatus } from '../types';
import { Layout, Music, Utensils, Code, Film, GitMerge, CheckCircle, FolderArchive, Layers } from 'lucide-react';

interface NavbarProps {
  activeTask: TaskId;
  setActiveTask: (task: TaskId) => void;
  tasks: TaskStatus[];
  onOpenFolder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTask, setActiveTask, tasks, onOpenFolder }) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const navItems: { id: TaskId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview Dashboard', icon: <Layout className="w-4 h-4" /> },
    { id: 'task1', label: '1. Music Wireframe', icon: <Music className="w-4 h-4" />, badge: 'Figma AI' },
    { id: 'task2', label: '2. Food Delivery Prototype', icon: <Utensils className="w-4 h-4" />, badge: 'Uizard' },
    { id: 'task3', label: '3. Figma to Code', icon: <Code className="w-4 h-4" />, badge: 'Plugin' },
    { id: 'task4', label: '4. Pure Movie Card', icon: <Film className="w-4 h-4" />, badge: 'HTML/CSS' },
    { id: 'task5', label: '5. Handoff Workflow', icon: <GitMerge className="w-4 h-4" />, badge: 'Guide' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTask('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">Design-to-Code</span>
                <span className="bg-rose-500/20 text-rose-300 text-xs px-2 py-0.5 rounded-full border border-rose-500/30 font-medium">
                  Assignment Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">Figma AI • Uizard • Figma to Code • Pure HTML/CSS</p>
            </div>
          </div>

          {/* Right Action Controls: Progress + Assignment Folder */}
          <div className="flex items-center space-x-3">
            {/* Progress pill */}
            <div className="hidden md:flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <div className="text-xs">
                <span className="text-slate-300 font-medium">Status: </span>
                <span className="text-emerald-400 font-bold">{completedCount}/{totalTasks} Completed</span>
              </div>
              <div className="w-20 bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Folder Button */}
            <button
              onClick={onOpenFolder}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shadow-sm hover:shadow-indigo-500/25 active:scale-95"
            >
              <FolderArchive className="w-4 h-4" />
              <span className="hidden sm:inline">Assignment Folder</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none pt-1">
          {navItems.map((item) => {
            const isActive = activeTask === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTask(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-white border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span className={isActive ? 'text-rose-400' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-rose-500/30 text-rose-200' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
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
