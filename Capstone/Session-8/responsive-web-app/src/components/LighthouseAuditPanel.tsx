import React from 'react';
import { 
  LIGHTHOUSE_METRICS, 
  LIGHTHOUSE_OPPORTUNITIES 
} from '../data/mockData';
import { 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  Eye, 
  Sliders,
  ShieldCheck,
  Check
} from 'lucide-react';

interface LighthouseAuditPanelProps {
  score: number;
  optimizedImages: boolean;
  setOptimizedImages: (val: boolean) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  lazyLoad: boolean;
  setLazyLoad: (val: boolean) => void;
  onApplyAllFixes: () => void;
}

export const LighthouseAuditPanel: React.FC<LighthouseAuditPanelProps> = ({
  score,
  optimizedImages,
  setOptimizedImages,
  highContrast,
  setHighContrast,
  lazyLoad,
  setLazyLoad,
  onApplyAllFixes,
}) => {
  const isAllFixed = optimizedImages && highContrast && lazyLoad;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Assignment Q4 - Chrome DevTools Lighthouse Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Lighthouse Performance & Audit Reporter
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Run audits on your homepage. Apply fixes for image sizing, layout shift (CLS), and WCAG AA contrast ratio to observe the performance score leap from <strong>74/100</strong> to <strong>98/100</strong>.
            </p>
          </div>

          {/* Big Score Gauge Box */}
          <div className="flex items-center space-x-4 bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 shadow-lg flex-shrink-0">
            <div
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 shadow-inner transition-all duration-500 ${
                score >= 90
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                  : 'border-amber-500 bg-amber-950/40 text-amber-400'
              }`}
            >
              <span className="text-3xl font-black">{score}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                / 100
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    score >= 90 ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="text-xs font-extrabold uppercase text-slate-200">
                  {score >= 90 ? 'Passed (Good)' : 'Needs Improvement'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {score >= 90 ? '+24 points gained after fixes' : 'Initial baseline audit score'}
              </p>
              <button
                onClick={onApplyAllFixes}
                disabled={isAllFixed}
                className={`mt-1 inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isAllFixed
                    ? 'bg-emerald-500/20 text-emerald-300 cursor-default border border-emerald-500/30'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                }`}
              >
                {isAllFixed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All Fixes Applied</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Apply All Lighthouse Fixes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Optimization Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Interactive Audit Fix Controls (Toggle Individual Optimizations)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Toggle switches below to see real-time score impacts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Toggle 1 */}
          <button
            onClick={() => setOptimizedImages(!optimizedImages)}
            className={`p-4 rounded-xl border text-left transition-all ${
              optimizedImages
                ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-slate-900">1. Image Optimization & Sizing</span>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                  optimizedImages ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}
              >
                {optimizedImages ? <Check className="w-3.5 h-3.5" /> : 'Off'}
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              Serves WebP images with explicit width/height to eliminate CLS and cut LCP load.
            </p>
          </button>

          {/* Toggle 2 */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`p-4 rounded-xl border text-left transition-all ${
              highContrast
                ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-slate-900">2. WCAG AA Text Contrast Ratio</span>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                  highContrast ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}
              >
                {highContrast ? <Check className="w-3.5 h-3.5" /> : 'Off'}
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              Boosts body text contrast from muted grey `#94A3B8` to high-contrast `#0F172A` (&gt;4.5:1).
            </p>
          </button>

          {/* Toggle 3 */}
          <button
            onClick={() => setLazyLoad(!lazyLoad)}
            className={`p-4 rounded-xl border text-left transition-all ${
              lazyLoad
                ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-slate-900">3. Native Offscreen Lazy Loading</span>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                  lazyLoad ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}
              >
                {lazyLoad ? <Check className="w-3.5 h-3.5" /> : 'Off'}
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              Applies `loading="lazy"` on below-the-fold product card images to reduce initial TBT.
            </p>
          </button>
        </div>
      </div>

      {/* Core Web Vitals Metrics Comparison Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">
          Core Web Vitals Metrics (Before vs After Optimization)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LIGHTHOUSE_METRICS.map((metric) => {
            const displayValue = isAllFixed ? metric.afterValue : metric.beforeValue;
            const currentScore = isAllFixed ? metric.scoreAfter : metric.scoreBefore;

            return (
              <div
                key={metric.key}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 transition-all"
              >
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  {metric.name}
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-slate-900">{displayValue}</span>
                  <span className="text-xs text-slate-500 font-semibold">{metric.unit}</span>
                </div>

                <div className="flex items-center space-x-1.5 text-xs font-bold">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentScore >= 90 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <span className={currentScore >= 90 ? 'text-emerald-700' : 'text-amber-700'}>
                    Score: {currentScore}/100
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 leading-tight pt-1 border-t border-slate-200/80">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Opportunities Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Lighthouse Audit Opportunities & Diagnostics
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific suggestions identified by Lighthouse audit and how they were resolved in full code:
            </p>
          </div>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold">
            View Opportunities
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {LIGHTHOUSE_OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                    {opp.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{opp.title}</h4>
                </div>
                <p className="text-xs text-slate-600">{opp.description}</p>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {opp.savings}
                </span>
                <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  ✅ Resolved
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
