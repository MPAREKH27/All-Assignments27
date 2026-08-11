import React from 'react';
import { TaskId } from '../types';
import { 
  BookOpenCheck, 
  Compass, 
  LayoutDashboard, 
  Sparkles, 
  GitFork, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  FileDown
} from 'lucide-react';

interface OverviewProps {
  setActiveTab: (tab: TaskId) => void;
  onOpenExporter: () => void;
}

export const Overview: React.FC<OverviewProps> = ({ setActiveTab, onOpenExporter }) => {
  const cards = [
    {
      id: 'scope' as TaskId,
      number: '01',
      title: '1. Daily App Scope Statement',
      badge: 'Spotify / SoundScape',
      desc: 'Project scope statement for React audio app solving algorithmic clutter, featuring target user personas & interactive scope generator.',
      icon: <Compass className="w-5 h-5 text-indigo-400" />,
      color: 'indigo',
    },
    {
      id: 'ecommerce' as TaskId,
      number: '02',
      title: '2. Smart E-Commerce Dashboard',
      badge: 'Flipkart Seller Panel',
      desc: '5 core features with 1-line explanations plus a live interactive Flipkart-style seller panel demo with revenue charts & forecasters.',
      icon: <LayoutDashboard className="w-5 h-5 text-amber-400" />,
      color: 'amber',
    },
    {
      id: 'resume' as TaskId,
      number: '03',
      title: '3. AI-Powered Resume Builder',
      badge: 'ChatGPT Brainstormed',
      desc: '5 unique AI features beyond basic forms with live AI bullet point quantification engine & ATS match score sandbox.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      color: 'emerald',
    },
    {
      id: 'flow' as TaskId,
      number: '04',
      title: '4. User Flow Diagram',
      badge: '4-Step Interaction',
      desc: 'Interactive 4-step user lifecycle flowchart with decision nodes from Landing Page -> Auth -> AI Feature -> Export/Logout.',
      icon: <GitFork className="w-5 h-5 text-purple-400" />,
      color: 'purple',
    },
    {
      id: 'capstone' as TaskId,
      number: '05',
      title: '5. Capstone Theme Selection',
      badge: 'Chosen: AI Resume Builder',
      desc: 'Comprehensive 3-theme matrix comparing complexity & skills, featuring 2 detailed career-goal justifications for choice.',
      icon: <Award className="w-5 h-5 text-rose-400" />,
      color: 'rose',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ✓ Assignment Complete & Ready
            </span>
            <span className="text-xs text-slate-400">• React & Generative AI Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            Capstone Portfolio Assignment Hub
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Welcome to the interactive submission dashboard answering all 5 capstone portfolio tasks. Explore detailed text responses, inspect live interactive prototypes, or export the formatted report for assignment grading.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenExporter}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 hover:from-emerald-300 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Copy Formatted Assignment Submission Report</span>
            </button>

            <button
              onClick={() => setActiveTab('scope')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center space-x-2"
            >
              <span>Begin Interactive Tour</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5 Tasks Cards Overview Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-indigo-400" />
            <span>Assignment Tasks Breakdown</span>
          </h2>
          <span className="text-xs text-slate-400">Click any card to launch interactive view</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-xl hover:scale-[1.01] group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                    Task {card.number}
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {card.badge}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-400">
                <span>Inspect Task Answers & Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
