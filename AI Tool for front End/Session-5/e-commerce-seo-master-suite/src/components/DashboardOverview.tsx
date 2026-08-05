import React from 'react';
import { AllTasksData } from '../types';
import { 
  Tag, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Network, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Utensils, 
  Shirt, 
  ShieldAlert, 
  Compass,
  Code2
} from 'lucide-react';

interface Props {
  data: AllTasksData;
  setActiveTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<Props> = ({ data, setActiveTab }) => {
  const cards = [
    {
      id: 'task1',
      number: 'Task 1',
      title: 'Flipkart Wireless Earbuds Meta Tags',
      category: 'E-Commerce Product SEO',
      icon: ShoppingBag,
      color: 'yellow',
      borderColor: 'border-yellow-500/30',
      badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      description: 'Meta title (<60 chars), description, and target keywords integrated into index.html <head> tag.',
      previewText: data.task1.metaTitle,
    },
    {
      id: 'task2',
      number: 'Task 2',
      title: 'Zomato Food Blog (Paneer Butter Masala)',
      category: 'Culinary Blog Content & Alt Texts',
      icon: Utensils,
      color: 'rose',
      borderColor: 'border-rose-500/30',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      description: 'SEO-friendly blog post intro & 3 image alt text tags saved to blogContent.txt.',
      previewText: `File saved: /blogContent.txt ("${data.task2.dishName}")`,
    },
    {
      id: 'task3',
      number: 'Task 3',
      title: 'Myntra Fashion Denim Jacket Description',
      category: 'Fashion E-Commerce & Plagiarism',
      icon: Shirt,
      color: 'indigo',
      borderColor: 'border-indigo-500/30',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      description: 'Original fashion product description verified via Quetext & SmallSEOTools plagiarism audit (100% Unique).',
      previewText: `100% Unique Content • 0% Plagiarism Score`,
    },
    {
      id: 'task4',
      number: 'Task 4',
      title: 'Cricket Gear SEO Bias & Claims Review',
      category: 'Advertising & Search Compliance',
      icon: ShieldAlert,
      color: 'amber',
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      description: 'Audited raw AI output to remove false guarantees and biased claims ("hit sixes like Dhoni"). Added clean HTML snippet.',
      previewText: `5 Flagged Claims Audited & Edited into Clean HTML`,
    },
    {
      id: 'task5',
      number: 'Task 5',
      title: 'Online Food Delivery Keyword Clustering',
      category: 'Search Architecture & Strategy',
      icon: Network,
      color: 'cyan',
      borderColor: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      description: 'Grouped 5 food delivery search terms (Swiggy/Zomato) into 3 intent clusters + 1-line reach explanation.',
      previewText: data.task5.oneLineExplanation,
    },
  ];

  return (
    <div className="space-y-8" id="overview-container">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/80 border border-slate-700/60 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive SEO Workshop & Code Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            E-Commerce SEO Master Suite
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to the complete, interactive 5-task SEO laboratory. Explore live SERP previews, view <code className="text-indigo-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">blogContent.txt</code>, inspect plagiarism audits, review bias copy edits, and analyze keyword clustering intent structures.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('task1')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
            >
              <span>Explore Task 1: Flipkart SEO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center space-x-2"
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Full Code & Deliverables</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Tasks Matrix Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Completed SEO Tasks Matrix (100% Validated)</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">5/5 Exercises Done</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className={`bg-slate-800/40 hover:bg-slate-800/70 border ${card.borderColor} rounded-2xl p-6 transition-all cursor-pointer group flex flex-col justify-between hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{card.number}</span>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${card.badgeBg}`}>
                      {card.category}
                    </span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/40 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-mono truncate max-w-[200px] text-[11px]">
                    {card.previewText}
                  </span>
                  <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Inspect <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
