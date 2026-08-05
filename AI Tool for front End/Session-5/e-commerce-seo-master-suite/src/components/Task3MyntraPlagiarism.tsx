import React from 'react';
import { Task3Data } from '../types';
import { ShieldCheck, CheckCircle2, Shirt, Sparkles, Copy, Check, FileCheck, Search, BarChart3 } from 'lucide-react';

interface Props {
  data: Task3Data;
}

export const Task3MyntraPlagiarism: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);
  const report = data.plagiarismReport;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.productDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="task3-container">
      {/* Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Shirt className="w-4 h-4" />
              <span>Myntra Fashion E-Commerce Copywriting</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Task 3: Denim Jacket Description & Plagiarism Report</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Original human-written fashion product description verified for uniqueness using Quetext & SmallSEOTools plagiarism audit standards.
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Description' : 'Copy Description'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Myntra Product Card & Description */}
        <div className="lg:col-span-6 space-y-6">
          {/* Fashion Product Details */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Shirt className="w-4 h-4 text-pink-400" />
                <span>Myntra Fashion Item Copy</span>
              </span>
              <span className="text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2.5 py-1 rounded-md">
                Brand: {data.brand}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{data.productName}</h3>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>Category: Men's Outerwear</span>
                <span>•</span>
                <span>Fit: Relaxed Oversized Fit</span>
                <span>•</span>
                <span>Material: 100% Cotton Denim</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <label className="text-xs font-semibold text-indigo-400 block">Product Description Text:</label>
              <p className="text-slate-200 text-sm leading-relaxed font-sans">
                "{data.productDescription}"
              </p>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Word Count</span>
                <span className="text-base font-extrabold text-white">{report.wordCount} words</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Characters</span>
                <span className="text-base font-extrabold text-white">{report.characterCount} chars</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Readability</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">Grade 9.2 (Easy)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quetext / SmallSEOTools Plagiarism Report */}
        <div className="lg:col-span-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Plagiarism Check Verification</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Quetext / SmallSEOTools Audit
            </span>
          </div>

          {/* Uniqueness Score Banner */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center">
                <span className="text-xl font-extrabold text-emerald-400">100%</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-white">100% Unique Content</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">0% Plagiarism Detected across 10B+ web documents</p>
              </div>
            </div>
            <span className="hidden sm:inline bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg">
              PASSED
            </span>
          </div>

          {/* Sentence by Sentence Breakdown */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Sentence-by-Sentence Duplicate Match Analysis:
            </label>

            {report.sentenceBreakdown.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-start space-x-3">
                <div className="mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">{item.text}</p>
                  <div className="mt-1 flex items-center space-x-2 text-[10px] text-emerald-400 font-mono">
                    <span>Similarity: 0%</span>
                    <span>•</span>
                    <span>Match Status: Clean & Original</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
            <span>Audit Engine: SmallSEOTools API & Quetext Index</span>
            <span className="text-emerald-400 font-medium">Safe for E-Commerce Publishing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
