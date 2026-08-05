import React, { useState } from 'react';
import { TaskId, TaskStatus } from './types';
import { INITIAL_TASKS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { Task1MusicWireframe } from './components/Task1MusicWireframe';
import { Task2UizardFoodApp } from './components/Task2UizardFoodApp';
import { Task3FigmaToCode } from './components/Task3FigmaToCode';
import { Task4MovieCard } from './components/Task4MovieCard';
import { Task5HandoffWorkflow } from './components/Task5HandoffWorkflow';
import { AssignmentFolderModal } from './components/AssignmentFolderModal';

export default function App() {
  const [activeTask, setActiveTask] = useState<TaskId>('overview');
  const [tasks, setTasks] = useState<TaskStatus[]>(INITIAL_TASKS);
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);

  const handleTask1Upload = (filename: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === 'task1' ? { ...t, uploadedArtifact: filename, completed: true } : t))
    );
  };

  const handleTask2NotesUpdate = (notes: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === 'task2' ? { ...t, notes, completed: true } : t))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white flex flex-col">
      {/* Top Header Navbar */}
      <Navbar
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        tasks={tasks}
        onOpenFolder={() => setIsFolderOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTask === 'overview' && (
          <OverviewDashboard
            tasks={tasks}
            onNavigate={(id) => setActiveTask(id)}
            onOpenFolder={() => setIsFolderOpen(true)}
          />
        )}

        {activeTask === 'task1' && (
          <Task1MusicWireframe onUploadSuccess={handleTask1Upload} />
        )}

        {activeTask === 'task2' && (
          <Task2UizardFoodApp onUpdateNotes={handleTask2NotesUpdate} />
        )}

        {activeTask === 'task3' && (
          <Task3FigmaToCode />
        )}

        {activeTask === 'task4' && (
          <Task4MovieCard />
        )}

        {activeTask === 'task5' && (
          <Task5HandoffWorkflow />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Design-to-Code Practical Suite • Powered by Figma AI & Uizard</span>
          <span className="text-slate-400">Assignment Tasks 1-5 Fully Implemented</span>
        </div>
      </footer>

      {/* Assignment Folder Modal */}
      <AssignmentFolderModal
        isOpen={isFolderOpen}
        onClose={() => setIsFolderOpen(false)}
        tasks={tasks}
      />
    </div>
  );
}
