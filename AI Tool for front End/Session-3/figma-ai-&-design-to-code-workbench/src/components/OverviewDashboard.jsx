import React from 'react';
import { TaskId, TaskStatus } from '../types';
import musicWireframeImg from '../assets/images/music_wireframe_1785924055313.jpg';
import uizardFoodImg from '../assets/images/uizard_food_app_1785924074993.jpg';
import dunePosterImg from '../assets/images/dune_movie_poster_1785924090984.jpg';
import { CheckCircle2, ArrowRight, Wand2, Sparkles, Code2, Film, GitMerge, Download, FolderArchive, Layers } from 'lucide-react';

interface OverviewDashboardProps {
  tasks: TaskStatus[];
  onNavigate: (taskId: TaskId) => void;
  onOpenFolder: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ tasks, onNavigate, onOpenFolder }) => {
  const taskIcons: Record<TaskId, React.ReactNode> = {
    overview: <Layers className="w-5 h-5 text-rose-400" />,
    task1: <Wand2 className="w-5 h-5 text-rose-400" />,
    task2: <Sparkles className="w-5 h-5 text-amber-400" />,
    task3: <Code2 className="w-5 h-5 text-cyan-400" />,
    task4: <Film className="w-5 h-5 text-rose-400" />,
    task5: <GitMerge className="w-5 h-5 text-emerald-400" />,
  };

  const taskPreviews: Record<string, string> = {
    task1: musicWireframeImg,
    task2: uizardFoodImg,
    task4: dunePosterImg,
  };

  return (
    <div className="space-y-8">
      {/* Main Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>UI/UX Design & Handoff Practical Assignment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Figma AI & Design-to-Code Assignment Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Complete solutions and interactive workbench for all 5 assignment practical tasks. Explore generated wireframes, Uizard food delivery prototypes, Figma-to-Code verification tools, pure HTML/CSS movie cards, and collaborative handoff documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenFolder}
              className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white px-5 py-3 rounded-2xl text-sm font-bold transition shadow-lg shadow-rose-500/25 flex items-center space-x-2.5 active:scale-95"
            >
              <FolderArchive className="w-5 h-5" />
              <span>View Assignment Folder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task Grid Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <span>Assignment Practical Modules</span>
            <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              5/5 Tasks Ready
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const previewImg = taskPreviews[task.id];
            return (
              <div
                key={task.id}
                onClick={() => onNavigate(task.id)}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      {taskIcons[task.id]}
                    </div>
                    <span className="flex items-center space-x-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  </div>

                  {previewImg && (
                    <div className="h-32 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                      <img
                        src={previewImg}
                        alt={task.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-rose-400 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{task.subtitle}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-400 font-semibold">
                  <span>Open Interactive Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Download className="w-4 h-4 text-rose-400" />
          <span>Assignment Deliverable Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Task ID</th>
                <th className="p-3">Description</th>
                <th className="p-3">Tool / Framework</th>
                <th className="p-3">Artifact File</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-rose-400">{task.id.toUpperCase()}</td>
                  <td className="p-3 text-slate-200 font-sans">{task.title}</td>
                  <td className="p-3 text-slate-400">
                    {task.id === 'task1' && 'Figma AI Prompt Engine'}
                    {task.id === 'task2' && 'Uizard Design AI'}
                    {task.id === 'task3' && 'Figma to Code Plugin'}
                    {task.id === 'task4' && 'Pure HTML5 & Vanilla CSS3'}
                    {task.id === 'task5' && 'Collaborative Handoff Guide'}
                  </td>
                  <td className="p-3 text-emerald-400">{task.uploadedArtifact || 'Ready'}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onNavigate(task.id)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 font-sans"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
