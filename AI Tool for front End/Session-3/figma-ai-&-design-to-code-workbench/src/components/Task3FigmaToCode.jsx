import React, { useState } from 'react';
import { FIGMA_CODE_TEMPLATES } from '../data/mockData';
import { FigmaTemplate } from '../types';
import { Code2, Copy, Check, ExternalLink, CheckCircle, Smartphone, Monitor, ShieldCheck, Download, Layers } from 'lucide-react';

export const Task3FigmaToCode: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<FigmaTemplate>(FIGMA_CODE_TEMPLATES[0]);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css'>('html');
  const [copied, setCopied] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleCopyCode = () => {
    const codeToCopy = activeCodeTab === 'html' ? selectedTemplate.htmlCode : selectedTemplate.cssCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Figma to Code Export - ${selectedTemplate.name}</title>
  <style>
    body {
      background-color: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
    }
    ${selectedTemplate.cssCode}
  </style>
</head>
<body>
  ${selectedTemplate.htmlCode}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `figma_exported_${selectedTemplate.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Task 3: Figma to Code Plugin Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Export Figma Design to HTML & CSS
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Export any Figma layout template using the <span className="text-cyan-300 font-semibold">'Figma to Code'</span> plugin, inspect generated semantic markup, and verify responsive browser layout rendering in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadCode}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Exported index.html</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Code Inspector vs Live Browser Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Inspector Panel (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Figma Template:
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {FIGMA_CODE_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {tmpl.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Code View Tabs & Copy Button */}
          <div className="flex items-center justify-between bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold transition ${
                  activeCodeTab === 'html'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                HTML (Exported)
              </button>
              <button
                onClick={() => setActiveCodeTab('css')}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold transition ${
                  activeCodeTab === 'css'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CSS (Styles)
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-mono text-[11px] transition border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Display Container */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto max-h-[420px] scrollbar-thin text-slate-300">
            <pre className="whitespace-pre-wrap leading-relaxed">
              {activeCodeTab === 'html' ? selectedTemplate.htmlCode : selectedTemplate.cssCode}
            </pre>
          </div>
        </div>

        {/* Live Browser Render Sandbox (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Live Browser Verification Sandbox
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1 rounded transition ${
                  viewportMode === 'desktop' ? 'bg-slate-800 text-cyan-300' : 'text-slate-500'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1 rounded transition ${
                  viewportMode === 'mobile' ? 'bg-slate-800 text-cyan-300' : 'text-slate-500'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sandbox Frame */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 min-h-[360px] flex items-center justify-center overflow-auto relative">
            <div
              className={`transition-all duration-300 flex justify-center ${
                viewportMode === 'mobile' ? 'max-w-[320px] w-full' : 'w-full'
              }`}
            >
              <style>{selectedTemplate.cssCode}</style>
              <div dangerouslySetInnerHTML={{ __html: selectedTemplate.htmlCode }} />
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Layout Verification Checklist (Figma vs Code)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2 bg-slate-900/80 p-2 rounded border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Semantic HTML tags</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/80 p-2 rounded border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Flexbox / Auto-layout parity</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/80 p-2 rounded border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Clean border-box bounds</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/80 p-2 rounded border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Cross-browser viewport check</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
