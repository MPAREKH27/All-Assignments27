import React, { useState } from "react";
import { fetchBlogSummary } from "../services/api";
import { BlogSummaryResult, APIErrorState, SimulatedErrorType } from "../types";
import { BookOpen, Sparkles, Loader2, Copy, Check, Play, AlertCircle, History, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SAMPLE_PROMPTS = [
  {
    id: "prompt_1",
    title: "Prompt 1: AI in Healthcare",
    text: "Artificial Intelligence is transforming modern healthcare through early diagnostic imaging, AI-assisted surgical precision, and personalized treatment plans based on genomic analysis. Machine learning models can analyze MRI and CT scans faster than traditional workflows, reducing false positives in oncology. However, regulatory frameworks and patient privacy regulations like HIPAA present unique adoption challenges that hospitals must navigate.",
  },
  {
    id: "prompt_2",
    title: "Prompt 2: Future of Remote Engineering",
    text: "Distributed software teams thrive when relying on asynchronous communication, comprehensive documentation, and outcome-oriented deliverables rather than seat time. Key challenges include maintaining team cohesion, avoiding developer burnout, and managing timezone friction across global squads. Leading engineering organizations leverage continuous deployment pipelines and automated testing to maintain fast shipping velocity.",
  },
  {
    id: "prompt_3",
    title: "Prompt 3: Quantum Computing Basics",
    text: "Quantum computing leverages the fundamental principles of quantum mechanics, specifically superposition and entanglement, to solve complex mathematical problems exponentially faster than classical supercomputers. Unlike classical bits that store 0 or 1, qubits can exist in superposition. Applications span cryptography, molecular modeling for drug discovery, and logistics optimization.",
  },
];

export const BlogSummarizer: React.FC = () => {
  const [promptInput, setPromptInput] = useState<string>("");
  const [activePromptLabel, setActivePromptLabel] = useState<string>("");
  const [summaryResult, setSummaryResult] = useState<BlogSummaryResult | null>(null);
  const [summaryHistory, setSummaryHistory] = useState<BlogSummaryResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<APIErrorState | null>(null);
  const [simulateError, setSimulateError] = useState<SimulatedErrorType>("none");

  // Execute fetchBlogSummary function
  const handleSummarize = async (overridePrompt?: string, label?: string) => {
    const promptToUse = overridePrompt || promptInput;
    if (!promptToUse.trim()) {
      setErrorState({
        type: "ValidationError",
        message: "Please enter or select a blog prompt to generate a summary.",
      });
      return;
    }

    setLoading(true);
    setErrorState(null);
    setCopied(false);
    if (label) setActivePromptLabel(label);

    try {
      // Direct call to requirement #4 function: fetchBlogSummary(prompt)
      const summaryText = await fetchBlogSummary(
        promptToUse,
        undefined,
        simulateError
      );

      const result: BlogSummaryResult = {
        summary: summaryText,
        promptReceived: promptToUse,
        source: "OpenAI API via fetchBlogSummary(prompt)",
        timestamp: new Date().toLocaleTimeString(),
      };

      setSummaryResult(result);
      setSummaryHistory((prev) => [result, ...prev]);
    } catch (err: any) {
      setErrorState({
        type: err.type || "APIError",
        message: err.message || "Failed to fetch blog summary using OpenAI API.",
        status: err.status,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Requirement #4 Implementation
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              OpenAI Blog Summarizer
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Uses <code className="text-purple-300 font-mono bg-purple-950/80 px-1.5 py-0.5 rounded">fetchBlogSummary(prompt)</code> to summarize articles or prompts with OpenAI API.
            </p>
          </div>
        </div>
      </div>

      {/* Requirement #4 Test Suite Box */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Play className="w-4 h-4 text-purple-600" />
              Requirement #4 Test Prompts (Minimum 2 Required)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click below to test <code className="font-mono text-purple-600">fetchBlogSummary(prompt)</code> with pre-configured prompts
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-200">
            {summaryHistory.length} Test Runs Done
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_PROMPTS.map((sample) => (
            <div
              key={sample.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-purple-50/50 hover:border-purple-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-purple-900 block">
                  {sample.title}
                </span>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {sample.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPromptInput(sample.text);
                  handleSummarize(sample.text, sample.title);
                }}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                Run Test Prompt
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Prompt Input Box */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <MessageSquareText className="w-4 h-4 text-purple-600" />
            Or Enter Custom Blog Article / Topic
          </label>
          {activePromptLabel && (
            <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
              Active: {activePromptLabel}
            </span>
          )}
        </div>

        <textarea
          rows={4}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Paste blog article, technical summary, or prompt text here..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
        />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {promptInput.trim().length} characters
            </span>
            <select
              value={simulateError}
              onChange={(e) => setSimulateError(e.target.value as SimulatedErrorType)}
              className="text-xs border border-slate-200 bg-slate-50 rounded-lg px-2 py-1 text-slate-700"
            >
              <option value="none">Error Sim: None</option>
              <option value="invalid_key">Simulate 401</option>
              <option value="network">Simulate 503</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => handleSummarize()}
            disabled={loading || !promptInput.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-all shadow-md shadow-purple-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Summarize Blog Prompt
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error State */}
      {errorState && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 shadow-sm"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm space-y-1">
            <p className="font-semibold text-rose-900">fetchBlogSummary API Error</p>
            <p className="text-rose-700 text-xs">{errorState.message}</p>
          </div>
          <button
            onClick={() => setErrorState(null)}
            className="text-xs font-medium text-rose-600 hover:text-rose-800 underline cursor-pointer"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Output Summary Card */}
      {summaryResult && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-purple-900/40 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                OpenAI Blog Executive Summary
              </span>
            </div>

            <button
              onClick={() => handleCopy(summaryResult.summary)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-xs font-medium transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Summary
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {summaryResult.summary}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span>Executed via fetchBlogSummary(prompt)</span>
            <span>{summaryResult.timestamp}</span>
          </div>
        </motion.div>
      )}

      {/* Tested Prompts History Log */}
      {summaryHistory.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-purple-600" />
            Prompt Testing Log ({summaryHistory.length} Runs)
          </h3>
          <div className="space-y-3">
            {summaryHistory.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-semibold text-purple-700">Test Run #{summaryHistory.length - idx}</span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="text-slate-600 italic line-clamp-1 font-mono">
                  Prompt: &quot;{item.promptReceived}&quot;
                </p>
                <p className="text-slate-800 font-sans leading-relaxed line-clamp-2 pt-1 border-t border-slate-200/60">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
