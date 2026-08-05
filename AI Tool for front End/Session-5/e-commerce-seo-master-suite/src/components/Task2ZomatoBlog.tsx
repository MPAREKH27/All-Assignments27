import React, { useState } from 'react';
import { Task2Data } from '../types';
import { FileText, Download, Copy, Check, Utensils, Image as ImageIcon, Sparkles } from 'lucide-react';

interface Props {
  data: Task2Data;
}

export const Task2ZomatoBlog: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'formatted' | 'raw'>('formatted');

  const rawFileText = `================================================================================
ZOMATO-STYLE FOOD BLOG CONTENT: PANEER BUTTER MASALA
================================================================================

[BLOG POST INTRODUCTION]
${data.blogIntro}

--------------------------------------------------------------------------------
[IMAGE ALT TEXTS]

Image Alt Text 1:
"${data.altTexts[0]}"

Image Alt Text 2:
"${data.altTexts[1]}"

Image Alt Text 3:
"${data.altTexts[2]}"
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawFileText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([rawFileText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'blogContent.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6" id="task2-container">
      {/* Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Utensils className="w-4 h-4" />
              <span>Zomato Culinary Food Blog SEO</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Task 2: Paneer Butter Masala Blog & Alt Texts</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Generated SEO introduction & 3 targeted image alt texts saved directly to <code className="text-rose-300 bg-rose-950/40 px-1.5 py-0.5 rounded font-mono text-xs">blogContent.txt</code>.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3.5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition-all border border-slate-600"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Content' : 'Copy Content'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-rose-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Download blogContent.txt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Formatted Blog Post & Image Alt Texts */}
        <div className="lg:col-span-7 space-y-6">
          {/* SEO Blog Intro Card */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> SEO Blog Post Introduction
              </span>
              <span className="text-[11px] bg-rose-500/10 text-rose-300 px-2.5 py-1 rounded-md border border-rose-500/20 font-medium">
                Target Keywords: Paneer Butter Masala, Zomato Delivery
              </span>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-200 text-sm leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800 italic">
                "{data.blogIntro}"
              </p>
            </div>
          </div>

          {/* 3 Image Alt Texts Visual Showcase */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/50 pb-3">
              <ImageIcon className="w-4 h-4 text-rose-400" />
              <span>3 SEO Image Alt Text Descriptions</span>
            </h3>

            <div className="space-y-4">
              {data.altTexts.map((alt, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400">Image #{idx + 1} Alt Attribute</span>
                    <span className="text-[10px] text-slate-500 font-mono">alt="{alt.substring(0, 25)}..."</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-rose-200/90 leading-relaxed">
                    &lt;img src="paneer-butter-masala-{idx + 1}.jpg" <span className="text-amber-400">alt="{alt}"</span> /&gt;
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: File Explorer Preview of blogContent.txt */}
        <div className="lg:col-span-5 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-white">/blogContent.txt</span>
              </div>
              <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded">
                ✓ File Saved on Server
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Exact text file output as formatted and saved in the root workspace folder:
            </p>

            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto h-96 scrollbar-thin">
              {rawFileText}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
            <span>Encoding: UTF-8</span>
            <button
              onClick={handleDownload}
              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
