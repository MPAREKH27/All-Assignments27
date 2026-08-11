import React, { useEffect, useState } from "react";
import { Sparkles, Quote, FileText, BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeTab: "quote" | "resume" | "blog";
  setActiveTab: (tab: "quote" | "resume" | "blog") => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [apiHealth, setApiHealth] = useState<{
    hasGeminiKey: boolean;
    hasOpenAIKey: boolean;
    hasHuggingFaceKey: boolean;
  } | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setApiHealth(data))
      .catch(() => null);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("quote")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              AI Quote & Resume Generator
            </h1>
            <p className="text-[11px] text-slate-400">
              Hugging Face & OpenAI Integration Suite
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab("quote")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "quote"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>AI Quote (HF)</span>
          </button>

          <button
            onClick={() => setActiveTab("resume")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "resume"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume Summary</span>
          </button>

          <button
            onClick={() => setActiveTab("blog")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "blog"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog Summarizer</span>
          </button>
        </nav>

        {/* Health status badge */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Server Engine Ready</span>
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        </div>
      </div>
    </header>
  );
};
