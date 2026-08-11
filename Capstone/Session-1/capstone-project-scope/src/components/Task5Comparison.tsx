import React, { useState } from 'react';
import { themeComparisons, capstoneChoiceReasoning } from '../data/assignmentData';
import { 
  Award, 
  Sparkles, 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Target, 
  Briefcase, 
  Layers, 
  Compass,
  ArrowRight
} from 'lucide-react';

export const Task5Comparison: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('resume');

  const selectedTheme = themeComparisons.find((t) => t.id === selectedThemeId) || themeComparisons[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Task 05 / 05
          </span>
          <span className="text-xs text-slate-400">Capstone Project Theme Decision & Justification</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
          5. Capstone Project Theme Selection & Comparison
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          <strong className="text-indigo-300">Assignment Prompt:</strong> Compare the three example project themes (AI Resume Builder, Smart E-Commerce Dashboard, AI Blog Creator) and write which one you would choose for your capstone and why, mentioning at least two reasons based on your interests or career goals.
        </p>
      </div>

      {/* Primary Capstone Decision Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 text-slate-950 font-bold shadow-lg shadow-indigo-500/20">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-300 uppercase tracking-wider font-semibold">Chosen Capstone Theme</span>
              <h3 className="text-xl font-bold text-slate-100">{capstoneChoiceReasoning.chosenTheme}</h3>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Selected Capstone Finalist</span>
          </span>
        </div>

        {/* Two Core Career Reasons Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Reason 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md hover:border-indigo-500/30 transition-all">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Reason #1: Career & Skill Alignment</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">{capstoneChoiceReasoning.reason1Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {capstoneChoiceReasoning.reason1Description}
            </p>
          </div>

          {/* Reason 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md hover:border-emerald-500/30 transition-all">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Reason #2: Real-World Utility & Peer Impact</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">{capstoneChoiceReasoning.reason2Title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {capstoneChoiceReasoning.reason2Description}
            </p>
          </div>
        </div>
      </div>

      {/* Comparative Matrix Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Comprehensive Theme Comparison Matrix</span>
          </h3>
          <span className="text-xs text-slate-400">Click any card to inspect technical stack details</span>
        </div>

        {/* 3 Themes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {themeComparisons.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-indigo-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {theme.id === 'resume' && <Sparkles className="w-5 h-5 text-emerald-400" />}
                      {theme.id === 'ecommerce' && <LayoutDashboard className="w-5 h-5 text-amber-400" />}
                      {theme.id === 'blog' && <FileText className="w-5 h-5 text-indigo-400" />}
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      theme.id === 'resume' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {theme.id === 'resume' ? 'Selected Choice' : 'Alternative'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 mb-2">{theme.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{theme.focus}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Complexity:</span>
                      <span className="font-mono font-bold text-amber-400">{theme.complexity}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 block mb-1">Market Utility:</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{theme.marketImpact}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-indigo-300 font-semibold">{theme.keySkills.length} Core Skills</span>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Theme Detailed Deep-Dive Box */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-base font-bold text-slate-100">
              Technical Stack & Skill Coverage for: <span className="text-indigo-400">{selectedTheme.name}</span>
            </h4>
            <span className="text-xs font-mono text-slate-400">Complexity Grade: {selectedTheme.complexity}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">Key Advantages & Strengths</span>
              <ul className="space-y-2">
                {selectedTheme.pros.map((pro, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">Technical Skills Demonstrated</span>
              <div className="flex flex-wrap gap-2">
                {selectedTheme.keySkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
