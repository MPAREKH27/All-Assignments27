import React, { useState } from "react";
import { ToneType, ToneOption, QuoteResult, APIErrorState, SimulatedErrorType } from "../types";
import { fetchHuggingFaceQuote } from "../services/api";
import { Quote, Sparkles, Copy, Check, RefreshCw, AlertCircle, History, Sliders, ChevronDown, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const TONE_OPTIONS: ToneOption[] = [
  {
    id: "inspirational",
    label: "Inspirational",
    emoji: "✨",
    description: "Uplifting, empowering, and motivational",
    promptPrefix: "Produce an inspiring motivational quote about courage, perseverance, and success in an inspirational tone:",
  },
  {
    id: "funny",
    label: "Funny",
    emoji: "😂",
    description: "Humorous, witty, and lighthearted",
    promptPrefix: "Write a hilarious, witty motivational quote about daily life and work in a funny tone:",
  },
  {
    id: "serious",
    label: "Serious",
    emoji: "🎯",
    description: "Profound, disciplined, and focused",
    promptPrefix: "Generate a formal, disciplined, and solemn quote about leadership and dedication in a serious tone:",
  },
  {
    id: "sarcastic",
    label: "Sarcastic",
    emoji: "😏",
    description: "Snarky, satirical, and cheeky",
    promptPrefix: "Craft a cheekily sarcastic motivational quote about productivity and human habits in a sarcastic tone:",
  },
  {
    id: "poetic",
    label: "Poetic",
    emoji: "🌿",
    description: "Lyrical, graceful, and metaphorical",
    promptPrefix: "Compose a beautiful, lyrical, and evocative quote about nature and growth in a poetic tone:",
  },
  {
    id: "philosophical",
    label: "Philosophical",
    emoji: "🏛️",
    description: "Deep, contemplative, and timeless",
    promptPrefix: "Formulate a deep philosophical insight about time, purpose, and existence in a philosophical tone:",
  },
  {
    id: "energetic",
    label: "Energetic",
    emoji: "⚡",
    description: "High-octane, bold, and unstoppable",
    promptPrefix: "Create an intense, high-energy rallying quote about crushing goals and overcoming limits in an energetic tone:",
  },
];

const HF_MODELS = [
  { id: "gpt2", name: "GPT-2 (Default)", provider: "Hugging Face" },
  { id: "distilgpt2", name: "DistilGPT2 (Lightweight)", provider: "Hugging Face" },
  { id: "gpt2-medium", name: "GPT2-Medium", provider: "Hugging Face" },
  { id: "mistralai/Mistral-7B-Instruct-v0.2", name: "Mistral-7B-Instruct", provider: "Hugging Face Router" },
];

export const AiQuoteGenerator: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<ToneType>("inspirational");
  const [selectedModel, setSelectedModel] = useState<string>("gpt2");
  const [currentQuote, setCurrentQuote] = useState<QuoteResult | null>(null);
  const [quoteHistory, setQuoteHistory] = useState<QuoteResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [errorState, setErrorState] = useState<APIErrorState | null>(null);
  const [simulateError, setSimulateError] = useState<SimulatedErrorType>("none");
  const [showPromptDetails, setShowPromptDetails] = useState<boolean>(true);

  const activeTone = TONE_OPTIONS.find((t) => t.id === selectedTone) || TONE_OPTIONS[0];

  const handleGenerate = async () => {
    setLoading(true);
    setErrorState(null);
    setCopied(false);

    try {
      const result = await fetchHuggingFaceQuote(
        selectedTone,
        selectedModel,
        undefined,
        simulateError
      );

      setCurrentQuote(result);
      setQuoteHistory((prev) => [result, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setErrorState({
        type: err.type || "APIError",
        message: err.message || "Failed to fetch quote from Hugging Face Inference API.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(`"${text}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Hugging Face Inference API
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              AI Quote Generator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Fetch motivational quotes powered by Hugging Face models with dynamic prompt tuning based on tone selection.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Quote
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tone Selection & Prompt Tuning Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              1. Prompt Tuning: Select Tone
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose a tone to modify the prompt structure sent to Hugging Face
            </p>
          </div>
          <button
            onClick={() => setShowPromptDetails(!showPromptDetails)}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 cursor-pointer"
          >
            {showPromptDetails ? "Hide Prompt Structure" : "Show Prompt Structure"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPromptDetails ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Tone Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {TONE_OPTIONS.map((tone) => {
            const isSelected = selectedTone === tone.id;
            return (
              <button
                key={tone.id}
                onClick={() => setSelectedTone(tone.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-sm ring-1 ring-indigo-500/30"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{tone.emoji}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
                <div className="font-semibold text-sm mt-2">{tone.label}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {tone.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* Prompt Structure Preview Box */}
        <AnimatePresence>
          {showPromptDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-2 border border-slate-800"
            >
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="uppercase tracking-wider font-sans font-semibold">Tuned Prompt Payload</span>
                <span className="text-indigo-400 font-sans">Tone: {activeTone.label}</span>
              </div>
              <p className="text-emerald-400 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                &quot;{activeTone.promptPrefix} {customPrompt.trim() || "[Generating tone-tuned text...]"}&quot;
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                <span>Model Target: {selectedModel}</span>
                <span>API Endpoint: api-inference.huggingface.co</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Model & Error Simulation Controls */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Hugging Face Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {HF_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              API Error Tester (Requirement #5)
            </label>
            <select
              value={simulateError}
              onChange={(e) => setSimulateError(e.target.value as SimulatedErrorType)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-amber-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="none">Normal Mode (No Error Simulation)</option>
              <option value="network">Simulate Network Error (503)</option>
              <option value="invalid_key">Simulate Invalid API Key Error (401)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Alert Display */}
      {errorState && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 shadow-sm"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm space-y-1">
            <p className="font-semibold text-rose-900">Hugging Face API Call Failed</p>
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

      {/* Main Quote Result Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-8 shadow-xl border border-indigo-900/50 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
        <div className="absolute top-4 right-4 text-slate-800 pointer-events-none">
          <Quote className="w-24 h-24 opacity-10" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center my-auto py-12 space-y-4">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm font-medium text-indigo-200">
              Querying Hugging Face with {activeTone.label} tone prompt...
            </p>
          </div>
        ) : currentQuote ? (
          <motion.div
            key={currentQuote.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 relative z-10"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{TONE_OPTIONS.find((t) => t.id === currentQuote.tone)?.emoji}</span>
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                  {currentQuote.tone} Tone Output
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Model: {currentQuote.model}
              </span>
            </div>

            <p className="text-xl md:text-2xl font-serif italic text-slate-100 leading-relaxed">
              &quot;{currentQuote.quote}&quot;
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <span>Source: {currentQuote.source}</span>
              <button
                onClick={() => handleCopy(currentQuote.quote)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 transition-all text-xs font-medium cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Quote
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12 my-auto space-y-3">
            <Quote className="w-10 h-10 text-indigo-400 mx-auto opacity-40" />
            <p className="text-slate-300 text-sm font-medium">
              No quote generated yet. Select a tone above and click &quot;Generate Quote&quot;!
            </p>
            <p className="text-slate-500 text-xs">
              Output prompt tuning changes dynamically based on the selected tone.
            </p>
          </div>
        )}
      </div>

      {/* Quote Output History Matrix (Demonstrating Tone Shift) */}
      {quoteHistory.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-600" />
              Tone Tuning Comparison Log ({quoteHistory.length})
            </h3>
            <span className="text-xs text-slate-500">Notice how quotes adapt to selected tone</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quoteHistory.map((q) => (
              <div
                key={q.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 space-y-2 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-600 capitalize flex items-center gap-1">
                    <span>{TONE_OPTIONS.find((t) => t.id === q.tone)?.emoji}</span>
                    {q.tone}
                  </span>
                  <span className="text-[10px] text-slate-400">{q.timestamp}</span>
                </div>
                <p className="text-xs text-slate-700 italic font-serif leading-relaxed line-clamp-3">
                  &quot;{q.quote}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
