import React, { useState } from 'react';
import { Task1Data } from '../types';
import { Copy, Check, Eye, Code, Search, Globe, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

interface Props {
  data: Task1Data;
}

export const Task1FlipkartMeta: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'serp' | 'code' | 'social'>('serp');
  
  const [title, setTitle] = useState(data.metaTitle);
  const [description, setDescription] = useState(data.metaDescription);
  const [keywords, setKeywords] = useState(data.keywords.join(', '));

  const titleLength = title.length;
  const descLength = description.length;

  const handleCopyHead = () => {
    const formattedHtml = `<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="product" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:site_name" content="Flipkart.com" />`;

    navigator.clipboard.writeText(formattedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="task1-container">
      {/* Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Flipkart E-Commerce Product SEO</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Task 1: Wireless Earbuds Meta Metadata</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Optimized meta title, meta description, and keywords added directly to the <code className="text-yellow-300 bg-yellow-950/40 px-1.5 py-0.5 rounded font-mono text-xs">&lt;head&gt;</code> section of <code className="text-yellow-300 bg-yellow-950/40 px-1.5 py-0.5 rounded font-mono text-xs">index.html</code>.
            </p>
          </div>
          <button
            onClick={handleCopyHead}
            className="flex items-center space-x-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-xl font-bold text-xs transition-all shadow-lg shadow-yellow-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied HTML Head Tags!' : 'Copy Head HTML Tags'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Meta Form */}
        <div className="lg:col-span-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-400" />
              <span>Live Meta Tag Editor</span>
            </h3>
            <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
              Flipkart.com Target
            </span>
          </div>

          {/* Meta Title Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Meta Title Tag (&lt;title&gt;)</label>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                titleLength <= 60 ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/50' : 'text-amber-400 bg-amber-950/40 border border-amber-800/50'
              }`}>
                {titleLength} / 60 chars {titleLength <= 60 ? '✓ Optimal' : '⚠ Long'}
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 font-sans"
            />
          </div>

          {/* Meta Description Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Meta Description (&lt;meta name="description"&gt;)</label>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                descLength >= 120 && descLength <= 160 ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/50' : 'text-amber-400 bg-amber-950/40 border border-amber-800/50'
              }`}>
                {descLength} / 160 chars {descLength >= 120 && descLength <= 160 ? '✓ Ideal' : '⚠ Check length'}
              </span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 font-sans leading-relaxed"
            />
          </div>

          {/* Keywords Input */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Target Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
          </div>

          {/* Keywords Tag Cloud */}
          <div>
            <label className="text-xs text-slate-400 block mb-2">Parsed Keywords List:</label>
            <div className="flex flex-wrap gap-1.5">
              {keywords.split(',').map((kw, idx) => (
                <span key={idx} className="bg-slate-900 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-lg text-xs font-medium">
                  #{kw.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Google SERP & OpenGraph Preview */}
        <div className="lg:col-span-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            {/* View Selector Buttons */}
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-3 mb-4">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Live Preview Simulator</span>
              <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveView('serp')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeView === 'serp' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 inline mr-1" /> Google SERP
                </button>
                <button
                  onClick={() => setActiveView('social')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeView === 'social' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 inline mr-1" /> OpenGraph Card
                </button>
                <button
                  onClick={() => setActiveView('code')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeView === 'code' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5 inline mr-1" /> Head Tags
                </button>
              </div>
            </div>

            {/* Google SERP Card View */}
            {activeView === 'serp' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2 shadow-inner">
                <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">F</div>
                  <div className="truncate">
                    <span className="text-slate-200 font-medium">Flipkart</span>
                    <span className="text-slate-500 mx-1">›</span>
                    <span className="text-slate-400">Audio Store</span>
                    <span className="text-slate-500 mx-1">›</span>
                    <span className="text-slate-400">boAt Airdopes 141</span>
                  </div>
                </div>
                <h3 className="text-blue-400 text-lg hover:underline cursor-pointer font-medium leading-snug">
                  {title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {description}
                </p>
                <div className="pt-2 flex items-center space-x-3 text-[11px] text-emerald-400">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> In Stock</span>
                  <span>• ₹1,299.00</span>
                  <span>• Free Delivery</span>
                </div>
              </div>
            )}

            {/* Social Media Card Preview */}
            {activeView === 'social' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-yellow-500/20 via-blue-600/20 to-indigo-600/20 p-8 text-center flex flex-col items-center justify-center border-b border-slate-800 relative">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-xl mb-2">
                    F
                  </div>
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Flipkart Electronics</span>
                </div>
                <div className="p-4 space-y-1 bg-slate-900">
                  <p className="text-[10px] uppercase font-bold text-slate-400">FLIPKART.COM</p>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{description}</p>
                </div>
              </div>
            )}

            {/* Code View */}
            {activeView === 'code' && (
              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-amber-300/90 overflow-x-auto leading-relaxed">
{`<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="product" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:site_name" content="Flipkart.com" />`}
              </pre>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
            <span>Status: Verified in <code className="text-slate-300">/index.html</code></span>
            <span className="text-emerald-400 font-semibold">Ready for Crawlers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
