import React, { useState } from 'react';
import { CROSS_BROWSER_ISSUES } from '../data/mockData';
import { Globe, CheckCircle2, AlertTriangle, ShieldCheck, Cpu, Code, Sparkles } from 'lucide-react';

export const CrossBrowserTester: React.FC = () => {
  const [selectedBrowser, setSelectedBrowser] = useState<'all' | 'chrome' | 'firefox'>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 mb-2">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Assignment Q3 - Chrome vs Firefox Cross-Browser Testing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Cross-Browser Compatibility Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Comparative test log evaluating Blink (Chrome) vs Gecko (Firefox) rendering engines. Identifies CSS scrollbar specs, font smoothing, and backdrop-filter behavior.
            </p>
          </div>

          {/* Browser Filter Buttons */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setSelectedBrowser('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedBrowser === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Engine Logs
            </button>
            <button
              onClick={() => setSelectedBrowser('chrome')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedBrowser === 'chrome' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Google Chrome (Blink)
            </button>
            <button
              onClick={() => setSelectedBrowser('firefox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedBrowser === 'firefox' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mozilla Firefox (Gecko)
            </button>
          </div>
        </div>
      </div>

      {/* Engine Architecture Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chrome Engine Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              🌐
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Google Chrome (Blink Engine)</h3>
              <p className="text-xs text-slate-500">Version 120.0+ (Mac / Windows / iOS / Android)</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200/80">
              <strong className="text-blue-900 block mb-0.5">Scrollbars & Styling:</strong>
              Supports custom `::-webkit-scrollbar`, `::-webkit-scrollbar-thumb`, and hover states natively.
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200/80">
              <strong className="text-blue-900 block mb-0.5">Backdrop Filter GPU Acceleration:</strong>
              Renders glassmorphism blur effects with hardware accelerated sub-compositor layers.
            </div>
          </div>
        </div>

        {/* Firefox Engine Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
              🦊
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Mozilla Firefox (Gecko Engine)</h3>
              <p className="text-xs text-slate-500">Version 121.0+ (Quantum / Gecko Compositor)</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-2.5 rounded-lg bg-orange-50/80 border border-orange-200/80">
              <strong className="text-orange-900 block mb-0.5">Scrollbars & Styling:</strong>
              Requires standard W3C `scrollbar-width: thin` and `scrollbar-color: ...` declarations.
            </div>
            <div className="p-2.5 rounded-lg bg-orange-50/80 border border-orange-200/80">
              <strong className="text-orange-900 block mb-0.5">Font Anti-Aliasing & Rendering:</strong>
              Renders thin typography slightly bolder due to Gecko OS X grayscale smoothing pipeline.
            </div>
          </div>
        </div>
      </div>

      {/* Cross Browser Test Details Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">
            Detailed Cross-Browser Issues & Applied Fixes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified discrepancies observed between Chrome and Firefox during full application testing:
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {CROSS_BROWSER_ISSUES.map((issue) => (
            <div key={issue.id} className="p-6 space-y-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs">
                    <Code className="w-4 h-4" />
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">{issue.featureName}</h4>
                </div>
                <span
                  className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase ${
                    issue.severity === 'high'
                      ? 'bg-rose-100 text-rose-700'
                      : issue.severity === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {issue.severity} Priority Issue
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Chrome Side */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-1">
                  <strong className="text-blue-900 font-extrabold block">Chrome Observed Behavior:</strong>
                  <p className="text-slate-700">{issue.chromeBehavior}</p>
                </div>

                {/* Firefox Side */}
                <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 space-y-1">
                  <strong className="text-orange-900 font-extrabold block">Firefox Observed Behavior:</strong>
                  <p className="text-slate-700">{issue.firefoxBehavior}</p>
                </div>
              </div>

              {/* Solution Code */}
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-indigo-300">
                  <div className="flex items-center space-x-2 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Applied Cross-Browser Solution Code</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">
                    Verified Fix
                  </span>
                </div>
                <p className="text-slate-300 font-sans text-xs">{issue.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
