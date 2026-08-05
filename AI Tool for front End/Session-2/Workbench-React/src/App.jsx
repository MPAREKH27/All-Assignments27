import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { Exercise1PlaylistCard } from './components/Exercise1PlaylistCard';
import { Exercise2FlipkartCard } from './components/Exercise2FlipkartCard';
import { Exercise3ZomatoListing } from './components/Exercise3ZomatoListing';
import { Exercise4YouTubeList } from './components/Exercise4YouTubeList';
import { Exercise5CodeReview } from './components/Exercise5CodeReview';
import { CodeFilesHub } from './components/CodeFilesHub';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('ex1');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'ex1' && <Exercise1PlaylistCard />}
        {activeTab === 'ex2' && <Exercise2FlipkartCard />}
        {activeTab === 'ex3' && <Exercise3ZomatoListing />}
        {activeTab === 'ex4' && <Exercise4YouTubeList />}
        {activeTab === 'ex5' && <Exercise5CodeReview />}
        {activeTab === 'code-hub' && <CodeFilesHub />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 React AI Developer Workbench • GitHub Copilot & ChatGPT React Guide</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>VS Code Integrated</span>
            <span>•</span>
            <span>Full Standalone JSX & JS Code Files</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
