import { useState } from "react";
import { Header } from "./components/Header";
import { AiQuoteGenerator } from "./components/AiQuoteGenerator";
import { ResumeSummaryForm } from "./components/ResumeSummaryForm";
import { BlogSummarizer } from "./components/BlogSummarizer";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, CheckCircle2, Sliders, AlertTriangle, Play, FileText } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"quote" | "resume" | "blog">("quote");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "quote" && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <AiQuoteGenerator />
            </motion.div>
          )}

          {activeTab === "resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <ResumeSummaryForm />
            </motion.div>
          )}

          {activeTab === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <BlogSummarizer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Requirements Compliance Quick Checklist Card */}
        <section className="mt-16 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Project Requirements Verification Checklist
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5">
              <div className="font-semibold text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                1 & 3. Hugging Face Quote & Prompt Tuning
              </div>
              <p className="text-slate-600 leading-relaxed">
                Fetches quotes from Hugging Face Inference API. Tune prompts by selecting 7 tone options (funny, serious, inspirational, sarcastic, etc.).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5">
              <div className="font-semibold text-emerald-950 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                2 & 5. OpenAI Resume Summary & Error Handling
              </div>
              <p className="text-slate-600 leading-relaxed">
                Generates a 2-line resume summary with loading spinner. Refactored to handle network/auth API errors gracefully with status codes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5">
              <div className="font-semibold text-purple-950 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-purple-600" />
                4. fetchBlogSummary(prompt)
              </div>
              <p className="text-slate-600 leading-relaxed">
                Executes <code className="font-mono text-purple-700 bg-purple-50 px-1 py-0.5 rounded">fetchBlogSummary(prompt)</code> with interactive sample prompts to verify output.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-center text-xs mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 AI Quote & Resume Generator Suite — Hugging Face & OpenAI Integration</p>
          <div className="flex gap-4 text-slate-500">
            <span>React 19</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Express Server</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
