import React, { useState } from 'react';
import { CHATGPT_SUGGESTIONS } from '../data/mockData';
import { 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  Code, 
  Zap, 
  Terminal, 
  Check, 
  Copy,
  ArrowRight
} from 'lucide-react';

interface ChatGPTAdvisorPanelProps {
  contentVisibility: boolean;
  setContentVisibility: (val: boolean) => void;
}

export const ChatGPTAdvisorPanel: React.FC<ChatGPTAdvisorPanelProps> = ({
  contentVisibility,
  setContentVisibility,
}) => {
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string>('chatgpt-1');
  const [copied, setCopied] = useState(false);

  const activeSuggestion =
    CHATGPT_SUGGESTIONS.find((s) => s.id === selectedSuggestionId) || CHATGPT_SUGGESTIONS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSuggestion.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assignment Q5 - ChatGPT AI Performance Optimization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              ChatGPT Performance Recommendations Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We asked ChatGPT: <em>"Suggest improvements for my React app based on this Lighthouse performance report..."</em> Below is the AI response analysis and chosen code optimization.
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2 flex-shrink-0">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Chosen Implementation
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CSS `content-visibility: auto`</span>
            </div>
            <p className="text-[11px] text-slate-300 max-w-xs">
              Skips off-screen card layout calculations until scrolled into view.
            </p>
          </div>
        </div>
      </div>

      {/* ChatGPT Prompt & Response Console Box */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Console Header */}
        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">ChatGPT Prompt Session & AI Response</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">GPT-4o Vision & Code Model</span>
        </div>

        {/* Prompt Box */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-900/40 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>User Prompt to ChatGPT:</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed">
            "{activeSuggestion.promptText}"
          </div>
        </div>

        {/* ChatGPT Suggestions Selector Tabs */}
        <div className="p-6 space-y-6">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Select ChatGPT Recommendation to Inspect & Toggle:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CHATGPT_SUGGESTIONS.map((sug) => {
              const isSelected = sug.id === selectedSuggestionId;

              return (
                <button
                  key={sug.id}
                  onClick={() => setSelectedSuggestionId(sug.id)}
                  className={`p-4 rounded-xl text-left border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 text-white'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">Recommendation</span>
                    {sug.isApplied && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                        Active in App
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 leading-snug">{sug.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{sug.impactSummary}</p>
                </button>
              );
            })}
          </div>

          {/* Active Suggestion Implementation Detail Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide">
                  ChatGPT Architectural Advice:
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeSuggestion.title}</h3>
              </div>

              {activeSuggestion.id === 'chatgpt-1' && (
                <button
                  onClick={() => setContentVisibility(!contentVisibility)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                    contentVisibility
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {contentVisibility
                      ? '`content-visibility: auto` Enabled'
                      : 'Enable ChatGPT Optimization'}
                  </span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {activeSuggestion.recommendation}
            </p>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              💡 <strong>Performance Impact Summary:</strong> {activeSuggestion.impactSummary}
            </div>

            {/* Code Snippet Box */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold text-indigo-300">
                  Implemented Code Modification (React & CSS):
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                {activeSuggestion.codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
