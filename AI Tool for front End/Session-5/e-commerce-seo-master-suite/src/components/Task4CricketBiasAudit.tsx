import React, { useState } from 'react';
import { Task4Data } from '../types';
import { AlertTriangle, CheckCircle2, Copy, Check, Code, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  data: Task4Data;
}

export const Task4CricketBiasAudit: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'diff' | 'snippet'>('diff');

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(data.htmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="task4-container">
      {/* Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>SEO Advertising Compliance & Editorial Audit</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Task 4: Cricket Gear SEO Bias & Claims Review</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Reviewed raw AI copy for biased claims, false guarantees, and hype words ("hit sixes like Dhoni", "world's #1"). Edited into factual, search-compliant SEO HTML metadata.
            </p>
          </div>
          <button
            onClick={handleCopySnippet}
            className="flex items-center space-x-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied HTML Snippet!' : 'Copy Clean HTML Snippet'}</span>
          </button>
        </div>
      </div>

      {/* Flagged Bias Issues Summary Cards */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>5 Flagged Biased / Unrealistic Claims in Raw AI Output</span>
          </h3>
          <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1 rounded-md font-semibold">
            Audit Result: 5 Edits Applied
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.flaggedIssues.map((issue, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Flagged Claim #{idx + 1}</span>
              </div>
              <p className="text-xs font-semibold text-rose-300 line-through bg-rose-950/40 px-2 py-1 rounded border border-rose-900/40">
                "{issue.claim}"
              </p>
              <p className="text-[11px] text-slate-400 leading-normal">
                <strong className="text-slate-300">Issue:</strong> {issue.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Copy Diff (Raw AI vs Edited Clean Version) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Raw Biased AI Output */}
        <div className="lg:col-span-6 bg-slate-800/40 border border-rose-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-rose-500/30 pb-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Raw Unedited ChatGPT Output (Biased / Hype)
            </span>
            <span className="text-[10px] text-rose-400 bg-rose-950/50 border border-rose-800 px-2 py-0.5 rounded font-mono">
              Rejected Format
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block">SEO Title Tag:</label>
              <p className="text-xs font-mono text-rose-200 bg-slate-900 p-3 rounded-xl border border-rose-900/50 leading-relaxed">
                {data.rawOutput.title}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block">Meta Description:</label>
              <p className="text-xs font-mono text-rose-200 bg-slate-900 p-3 rounded-xl border border-rose-900/50 leading-relaxed">
                {data.rawOutput.description}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">Image Alt Texts:</label>
              <div className="bg-slate-900 p-3 rounded-xl border border-rose-900/50 space-y-1 font-mono text-xs text-rose-200/90">
                <p>1. {data.rawOutput.altText1}</p>
                <p>2. {data.rawOutput.altText2}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reviewed & Edited Clean Output */}
        <div className="lg:col-span-6 bg-slate-800/40 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Reviewed & Edited Compliance Output (Clean)
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-2 py-0.5 rounded font-mono">
              Approved HTML Snippet
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block">Clean SEO Title Tag:</label>
              <p className="text-xs font-mono text-emerald-200 bg-slate-900 p-3 rounded-xl border border-emerald-900/50 leading-relaxed">
                {data.editedOutput.title}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block">Clean Meta Description:</label>
              <p className="text-xs font-mono text-emerald-200 bg-slate-900 p-3 rounded-xl border border-emerald-900/50 leading-relaxed">
                {data.editedOutput.description}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">Factual Image Alt Texts:</label>
              <div className="bg-slate-900 p-3 rounded-xl border border-emerald-900/50 space-y-1 font-mono text-xs text-emerald-200/90">
                <p>1. {data.editedOutput.altText1}</p>
                <p>2. {data.editedOutput.altText2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final HTML Snippet Showcase */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4 text-amber-400" />
            <span>Final E-Commerce Landing Page HTML Snippet</span>
          </h3>
          <button
            onClick={handleCopySnippet}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy HTML'}</span>
          </button>
        </div>

        <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-amber-300/90 leading-relaxed overflow-x-auto">
          {data.htmlSnippet}
        </pre>
      </div>
    </div>
  );
};
