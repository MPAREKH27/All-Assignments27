import React from 'react';
import { Task5Data } from '../types';
import { Network, Search, Target, Lightbulb, Compass, ShoppingBag, Tag, HelpCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  data: Task5Data;
}

export const Task5KeywordClustering: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-6" id="task5-container">
      {/* Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Network className="w-4 h-4" />
              <span>Online Food Delivery Search Architecture (Swiggy / Zomato)</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Task 5: Keyword Clustering & Organic Reach Analysis</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Grouping 5 target food delivery search queries into 3 intent-based keyword clusters for maximum organic search dominance.
            </p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>5 Keywords • 3 Clusters</span>
          </div>
        </div>
      </div>

      {/* One-Line Explanation Card (Core SEO Benefit) */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 rounded-2xl p-6 space-y-3 shadow-lg">
        <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
          <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Core SEO Takeaway: Why Keyword Clustering Matters</span>
        </div>
        <p className="text-white text-base font-semibold leading-relaxed font-sans border-l-4 border-cyan-400 pl-4 py-1">
          "{data.oneLineExplanation}"
        </p>
      </div>

      {/* 5 Raw Seed Keywords */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Target Food Delivery Seed Keywords (5 Total)</span>
          </h3>
          <span className="text-xs text-slate-400">Swiggy & Zomato Market Ecosystem</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.keywords.map((kw, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-200 flex items-center space-x-2 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <span>"{kw}"</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Intent Clusters Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <span>Semantic Keyword Clusters & Landing Page Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.clusters.map((cluster, idx) => {
            const icons = [ShoppingBag, Tag, HelpCircle];
            const Icon = icons[idx % icons.length];
            const accentColors = [
              'border-emerald-500/30 text-emerald-400 bg-emerald-950/40',
              'border-amber-500/30 text-amber-400 bg-amber-950/40',
              'border-indigo-500/30 text-indigo-400 bg-indigo-950/40'
            ];
            const badgeColor = accentColors[idx % accentColors.length];

            return (
              <div key={idx} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-slate-600 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-xl border ${badgeColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase">Cluster #{idx + 1}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${badgeColor}`}>
                      {cluster.intent}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">{cluster.name}</h4>
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase">Grouped Keywords:</span>
                      {cluster.keywords.map((kw, kIdx) => (
                        <div key={kIdx} className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span>"{kw}"</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase">Target Landing Page:</span>
                    <p className="text-xs font-semibold text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      🎯 {cluster.targetPageType}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">SEO Execution Strategy:</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {cluster.seoStrategy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
