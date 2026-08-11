import React, { useState } from "react";
import { ResumeFormData, ResumeSummaryResult, APIErrorState, SimulatedErrorType } from "../types";
import { fetchResumeSummary } from "../services/api";
import { FileText, Sparkles, Loader2, AlertTriangle, Check, Copy, RefreshCw, UserCheck, ShieldAlert, KeyRound, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SAMPLE_PRESETS: { label: string; data: ResumeFormData }[] = [
  {
    label: "Senior Full-Stack Engineer",
    data: {
      fullName: "Alex Rivera",
      targetRole: "Senior Full-Stack Developer",
      experienceYears: "6",
      skills: "React, TypeScript, Node.js, Express, PostgreSQL, Docker, AWS",
      achievements: "Architected real-time microservices handling 2M daily API requests with 99.99% uptime.",
      bio: "Passionate engineer focusing on frontend architecture and distributed backend systems.",
    },
  },
  {
    label: "AI Product Manager",
    data: {
      fullName: "Maya Chen",
      targetRole: "Lead AI Product Manager",
      experienceYears: "8",
      skills: "Product Strategy, LLM Evaluation, Agile, Roadmap Execution, Data Analytics",
      achievements: "Launched generative AI features resulting in 45% increase in user retention and $1.2M ARR.",
      bio: "Cross-functional leader connecting machine learning research with consumer product experiences.",
    },
  },
  {
    label: "Cybersecurity Analyst",
    data: {
      fullName: "David Miller",
      targetRole: "Senior Cybersecurity Specialist",
      experienceYears: "5",
      skills: "SIEM, Penetration Testing, Cloud Security, Incident Response, ISO 27001",
      achievements: "Remediated 150+ high-risk vulnerabilities and established SOC protocol across 12 business units.",
      bio: "Dedicated security engineer specialized in threat intelligence and automated compliance.",
    },
  },
];

export const ResumeSummaryForm: React.FC = () => {
  const [formData, setFormData] = useState<ResumeFormData>({
    fullName: "",
    targetRole: "",
    experienceYears: "",
    skills: "",
    achievements: "",
    bio: "",
  });

  const [summaryResult, setSummaryResult] = useState<ResumeSummaryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<APIErrorState | null>(null);
  const [simulateError, setSimulateError] = useState<SimulatedErrorType>("none");
  const [customApiKey, setCustomApiKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyPreset = (preset: ResumeFormData) => {
    setFormData(preset);
    setErrorState(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorState(null);
    setSummaryResult(null);

    try {
      const result = await fetchResumeSummary(
        formData,
        customApiKey.trim() || undefined,
        simulateError
      );
      setSummaryResult(result);
    } catch (err: any) {
      // Requirement #5: Handle API errors gracefully by displaying error message if call fails
      setErrorState({
        type: err.type || "OpenAIAPIError",
        message: err.message || "Failed to reach OpenAI API. Please verify your connection or API key.",
        status: err.status,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopySummary = () => {
    if (!summaryResult) return;
    navigator.clipboard.writeText(summaryResult.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to split 2-line summary cleanly for display
  const summaryLines = summaryResult
    ? summaryResult.summary.split("\n").filter((l) => l.trim().length > 0)
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              OpenAI API Integration
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Resume Executive Summary Generator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Enter candidate details to generate a concise 2-line professional resume summary with robust error handling.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-all cursor-pointer self-start md:self-center"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            {showKeyInput ? "Hide API Key Settings" : "Configure Custom OpenAI Key"}
          </button>
        </div>

        {/* Optional Custom Key Input */}
        <AnimatePresence>
          {showKeyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-slate-800 text-xs space-y-2"
            >
              <label className="block text-slate-300 font-medium">
                Custom OpenAI API Key (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="sk-..."
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-xs"
                />
                {customApiKey && (
                  <button
                    onClick={() => setCustomApiKey("")}
                    className="px-3 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 text-xs"
                  >
                    Clear Key
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                If left blank, requests will use the server environment default or fallbacks.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Preset Controls */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Quick Presets (Instant Auto-Fill)
          </span>
          <span className="text-[11px] text-slate-400">Click any role to load sample details</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p.data)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 text-xs font-medium transition-all cursor-pointer"
            >
              + {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Requirement #5: API Error Handling Tester Bar */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Requirement #5 Error Handling Test Suite
          </div>
          <span className="text-[11px] text-amber-700">Simulate API failures to verify error state UI</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSimulateError("none")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              simulateError === "none"
                ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            Normal (Success)
          </button>
          <button
            type="button"
            onClick={() => setSimulateError("invalid_key")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              simulateError === "invalid_key"
                ? "bg-rose-600 text-white border-rose-700 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-rose-50 hover:text-rose-700"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Simulate Invalid Key (401)
          </button>
          <button
            type="button"
            onClick={() => setSimulateError("network")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              simulateError === "network"
                ? "bg-rose-600 text-white border-rose-700 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-rose-50 hover:text-rose-700"
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            Simulate Network Failure (503)
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            Candidate Resume Information
          </h3>
          <span className="text-xs text-slate-400">* All fields optional</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Job Role
            </label>
            <input
              type="text"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleInputChange}
              placeholder="e.g. Lead Software Engineer"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Years of Experience
            </label>
            <input
              type="text"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleInputChange}
              placeholder="e.g. 5"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Key Skills & Tech Stack
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g. Python, PyTorch, React, Docker, System Design"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Major Achievements & Metrics
          </label>
          <input
            type="text"
            name="achievements"
            value={formData.achievements}
            onChange={handleInputChange}
            placeholder="e.g. Reduced API latency by 40%, led team of 6 engineers"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Background / Career Summary Context
          </label>
          <textarea
            rows={2}
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Briefly state your core background or value proposition..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setFormData({ fullName: "", targetRole: "", experienceYears: "", skills: "", achievements: "", bio: "" })}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Clear Form
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Generating Summary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Generate 2-Line Summary</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Requirement #5: Graceful Error Display Card */}
      <AnimatePresence>
        {errorState && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-rose-50/90 border-2 border-rose-300 rounded-2xl p-6 text-rose-900 shadow-md space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 rounded-xl text-rose-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-rose-950 flex items-center gap-2">
                    OpenAI API Error Encountered
                  </h4>
                  {errorState.status && (
                    <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 text-xs font-mono font-semibold">
                      HTTP {errorState.status}
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono font-medium text-rose-800">
                  Type: {errorState.type}
                </p>
                <p className="text-sm text-rose-800 mt-2 leading-relaxed bg-white/60 p-3 rounded-xl border border-rose-200">
                  {errorState.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-rose-200/80 text-xs text-rose-700">
              <span>
                💡 Note: To fix this error, switch to &quot;Normal&quot; mode above or check your OpenAI key.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setErrorState(null)}
                  className="px-3 py-1.5 rounded-lg bg-rose-200/80 hover:bg-rose-200 text-rose-900 font-medium cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => setSimulateError("none")}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 cursor-pointer"
                >
                  Reset to Normal & Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Requirement #2: Loading Spinner Constraint Indicator */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100 text-center space-y-4"
        >
          <div className="relative w-12 h-12 mx-auto">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
            <Sparkles className="w-5 h-5 text-emerald-400 absolute inset-0 m-auto" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-800">
              Processing Candidate Resume via OpenAI API...
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Applying executive summarization model to generate a precise 2-line response.
            </p>
          </div>
        </motion.div>
      )}

      {/* Requirement #2: Display 2-Line Summary Output */}
      {summaryResult && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-emerald-900/40 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-emerald-800/60 pb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Generated 2-Line Resume Summary
              </span>
              <p className="text-slate-400 text-xs mt-0.5">
                Optimized executive summary ready for resume headers & LinkedIn bio
              </p>
            </div>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/30 text-xs font-medium transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {summaryLines.map((line, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-emerald-800/40 text-slate-100 text-sm md:text-base leading-relaxed flex items-start gap-3"
              >
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0 mt-0.5">
                  Line {idx + 1}
                </span>
                <p className="flex-1 font-sans">{line}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-2 border-t border-emerald-900/40 gap-2">
            <span>Source: {summaryResult.source}</span>
            <div className="flex items-center gap-3">
              <span>{summaryResult.summary.length} characters</span>
              <span>•</span>
              <span>{summaryResult.summary.split(/\s+/).length} words</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
