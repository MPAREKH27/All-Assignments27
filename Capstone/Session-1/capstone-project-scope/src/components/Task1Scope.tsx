import React, { useState } from 'react';
import { scopeData } from '../data/assignmentData';
import { 
  Music, 
  Target, 
  Users, 
  CheckCircle2, 
  Wand2, 
  Sparkles, 
  ChevronRight, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';

export const Task1Scope: React.FC = () => {
  // Custom scope generator state
  const [customAppName, setCustomAppName] = useState('Zomato');
  const [customProblem, setCustomProblem] = useState(
    'Users spend excessive time browsing hundreds of restaurant menus with overwhelming choices, inconsistent ratings, and lack instant meal recommendation matching for specific dietary constraints or group orders.'
  );
  const [customSolution, setCustomSolution] = useState(
    'A ultra-fast React group food order app featuring AI meal recommendation matching, dynamic bill splitting, and live order cooking status updates.'
  );
  const [customTarget, setCustomTarget] = useState('Office Teams & College Roommates needing fast group dinner decisions.');

  const handlePresetSelect = (preset: 'zomato' | 'instagram' | 'flipkart' | 'spotify') => {
    if (preset === 'zomato') {
      setCustomAppName('Zomato');
      setCustomProblem('Users spend excessive time browsing hundreds of menus, struggling with indecision, fragmented dietary filters, and complex group ordering bill splits.');
      setCustomSolution('A lightweight React web food portal with an AI Decision Matrix, instant group meal cart synchronization, and dietary nutrition verification.');
      setCustomTarget('Busy professionals & college groups making rapid meal choices.');
    } else if (preset === 'instagram') {
      setCustomAppName('Instagram');
      setCustomProblem('Creators face platform algorithm fatigue, heavy battery drain from bloated mobile app features, and fragmented tools for scheduling micro-content.');
      setCustomSolution('A streamlined React creator studio web app centered purely on direct media publishing, reel analytics, and clean follower engagement inbox.');
      setCustomTarget('Digital content creators & independent brand managers.');
    } else if (preset === 'flipkart') {
      setCustomAppName('Flipkart');
      setCustomProblem('Shoppers encounter overwhelming festive deal banners, misleading price discounts, and slow price history tracking across flash sales.');
      setCustomSolution('A sleek React e-commerce web client featuring instant price history alerts, AI product comparison matrices, and 1-click cart checkout.');
      setCustomTarget('Budget-conscious online shoppers seeking verified discounts.');
    } else if (preset === 'spotify') {
      setCustomAppName(scopeData.originalApp);
      setCustomProblem(scopeData.problemStatement);
      setCustomSolution(scopeData.proposedSolution);
      setCustomTarget(scopeData.targetAudience.map(t => t.persona).join(' & '));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Task 01 / 05
          </span>
          <span className="text-xs text-slate-400">Daily App Scope & User Persona Analysis</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
          1. Daily App Project Scope Statement
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          <strong className="text-indigo-300">Assignment Prompt:</strong> Pick any app you use daily (like Zomato, Instagram, Flipkart, or Spotify) and write a short project scope statement describing what problem your React app version would solve and who the main users would be.
        </p>
      </div>

      {/* Primary Scope Response Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Response Overview */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-lg">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Selected App</div>
              <h3 className="text-xl font-bold text-slate-100">Spotify (React Version: SoundScape)</h3>
            </div>
          </div>

          {/* Problem Statement Box */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>1. Core Problem Statement</span>
            </div>
            <p className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-slate-300 text-sm leading-relaxed">
              {scopeData.problemStatement}
            </p>
          </div>

          {/* Proposed Solution Box */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>2. Proposed React Solution</span>
            </div>
            <p className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-slate-300 text-sm leading-relaxed font-medium">
              {scopeData.proposedSolution}
            </p>
          </div>

          {/* Key Deliverables Summary */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Solution Capabilities</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Distraction-free lightweight web player UI',
                'AI-driven real-time mood audio blending',
                'Synchronized co-listening session rooms',
                'Organic indie artist discovery feed',
              ].map((cap, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Users Personas */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Target Audience</div>
                <h3 className="text-lg font-bold text-slate-100">Main User Personas</h3>
              </div>
            </div>

            <div className="space-y-4">
              {scopeData.targetAudience.map((target, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/40 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300">Persona #{idx + 1}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">Primary User</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100">{target.persona}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{target.description}</p>
                  
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Key Needs & Motivations:</div>
                    <ul className="space-y-1">
                      {target.keyNeeds.map((need, nIdx) => (
                        <li key={nIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                          <ChevronRight className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span>{need}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-200/90 leading-relaxed">
              <strong>Scope Boundary:</strong> Focuses strictly on client-side React audio rendering, state synchronization, and AI playlist mixing without bloated desktop dependencies.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive App Scope Generator Tool */}
      <div className="bg-slate-900 rounded-2xl border border-indigo-500/30 p-6 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Interactive Scope Statement Builder</h3>
              <p className="text-xs text-slate-400">Test or generate a scope statement for any daily app instantly!</p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
            {(['zomato', 'instagram', 'flipkart', 'spotify'] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetSelect(preset)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700 transition-all"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Application Name</label>
            <input
              type="text"
              value={customAppName}
              onChange={(e) => setCustomAppName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target User Persona</label>
            <input
              type="text"
              value={customTarget}
              onChange={(e) => setCustomTarget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Statement</label>
            <textarea
              rows={3}
              value={customProblem}
              onChange={(e) => setCustomProblem(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Proposed React App Solution</label>
            <textarea
              rows={3}
              value={customSolution}
              onChange={(e) => setCustomSolution(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Live Generated Scope Statement Output Box */}
        <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Formatted Project Scope Output
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Ready for Submission</span>
          </div>

          <div className="text-sm text-slate-200 leading-relaxed font-sans bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <p className="font-semibold text-indigo-300 mb-2">Project Scope Statement for {customAppName} (React Edition):</p>
            <p className="mb-2">
              <strong>Problem:</strong> {customProblem}
            </p>
            <p className="mb-2">
              <strong>Solution:</strong> {customSolution}
            </p>
            <p>
              <strong>Target Users:</strong> {customTarget}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
