import React, { useState } from 'react';
import { Bot, Sparkles, Send, Copy, Check, AlertCircle, RefreshCw, Code2, Search } from 'lucide-react';

export const AiStudioSeoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('Generate an SEO title, description, and keywords for a Flipkart product page selling Sony Noise-Cancelling Wireless Headphones.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    "Generate an SEO title, description, and keywords for a Flipkart product page selling Sony Noise-Cancelling Headphones.",
    "Write a Zomato-style SEO blog introduction and 3 image alt texts for 'Butter Chicken' food delivery.",
    "Write a Myntra fashion product description for 'Slim Fit Solid Linen Shirt' in original words.",
    "Generate SEO meta tags and 2 alt texts for an e-commerce page selling badminton racquets."
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/generate-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate SEO metadata');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err?.message || 'Error connecting to Gemini API endpoint');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6" id="ai-generator-container">
      {/* Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Bot className="w-4 h-4" />
              <span>Server-Side Gemini AI Workbench</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Interactive Custom SEO Generator</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Test any product, dish, or category in real-time. Powered by Google Gemini 3.6 Flash via server-side API proxy.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl text-xs text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>gemini-3.6-flash</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prompt Input & Templates */}
        <div className="lg:col-span-5 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/50 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Enter AI SEO Prompt</span>
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Custom Prompt Instructions:</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed font-sans"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-2 block font-semibold">Or Pick a Quick Sample Prompt:</label>
            <div className="space-y-2">
              {samplePrompts.map((sp, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(sp)}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 p-2.5 rounded-xl text-xs text-slate-300 transition-all line-clamp-2"
                >
                  💡 {sp}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating SEO Meta Tags...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate SEO Copy with Gemini</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Response & Output View */}
        <div className="lg:col-span-7 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-3 mb-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Gemini Generated SEO Result</span>
              </span>
              {result && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Result'}</span>
                </button>
              )}
            </div>

            {error && (
              <div className="bg-rose-950/60 border border-rose-800/60 p-4 rounded-xl flex items-start space-x-3 text-xs text-rose-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                <div>
                  <strong className="block font-bold">API Notice:</strong>
                  <span>{error}</span>
                  <p className="mt-1 text-[11px] text-rose-400">Configure your GEMINI_API_KEY in AI Studio Settings &gt; Secrets panel to run real-time custom generations.</p>
                </div>
              </div>
            )}

            {!result && !error && !loading && (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <Bot className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-xs">Enter a prompt on the left and click "Generate SEO Copy with Gemini".</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-16 space-y-3">
                <RefreshCw className="w-8 h-8 mx-auto text-indigo-400 animate-spin" />
                <p className="text-xs text-indigo-300 font-medium">Synthesizing search-optimized copy & meta tags...</p>
              </div>
            )}

            {result && (
              <div className="prose prose-invert max-w-none">
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-indigo-200/90 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[420px] scrollbar-thin">
                  {result}
                </pre>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
            <span>Powered by @google/genai SDK</span>
            <span className="text-indigo-400 font-medium">Server-Side Security Enforced</span>
          </div>
        </div>
      </div>
    </div>
  );
};
