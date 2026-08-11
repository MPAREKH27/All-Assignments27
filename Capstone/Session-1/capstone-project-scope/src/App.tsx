import React, { useState } from 'react';
import { TaskId } from './types';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { Task1Scope } from './components/Task1Scope';
import { Task2Ecommerce } from './components/Task2Ecommerce';
import { Task3Resume } from './components/Task3Resume';
import { Task4FlowDiagram } from './components/Task4FlowDiagram';
import { Task5Comparison } from './components/Task5Comparison';
import { AssignmentExporter } from './components/AssignmentExporter';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TaskId>('overview');
  const [isExporterOpen, setIsExporterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExporter={() => setIsExporterOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <Overview
            setActiveTab={setActiveTab}
            onOpenExporter={() => setIsExporterOpen(true)}
          />
        )}
        {activeTab === 'scope' && <Task1Scope />}
        {activeTab === 'ecommerce' && <Task2Ecommerce />}
        {activeTab === 'resume' && <Task3Resume />}
        {activeTab === 'flow' && <Task4FlowDiagram />}
        {activeTab === 'capstone' && <Task5Comparison />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800 py-6 mt-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Capstone Portfolio Assignment Hub • Built with React 19 & Tailwind CSS</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-500">
            <span>All 5 Prompts Covered</span>
            <span>•</span>
            <button
              onClick={() => setIsExporterOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Copy Submission Text
            </button>
          </div>
        </div>
      </footer>

      {/* Copy Assignment Modal */}
      <AssignmentExporter
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
      />
    </div>
  );
}
