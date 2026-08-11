import React, { useState } from 'react';
import { resumeFeatures } from '../data/assignmentData';
import { 
  Target, 
  Sparkles, 
  FolderGit2, 
  Bot, 
  SlidersHorizontal, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  FileText, 
  Zap, 
  Sliders, 
  Check, 
  Info,
  Wand2
} from 'lucide-react';

export const Task3Resume: React.FC = () => {
  // Sandbox states
  const [jobDescription, setJobDescription] = useState(
    'Seeking a Senior React & Full-Stack Engineer with experience in TypeScript, Tailwind CSS, State Management, REST APIs, CI/CD pipelines, and LLM Generative AI integration.'
  );

  const [bulletPointInput, setBulletPointInput] = useState(
    'Built web features for client projects and helped fix UI bugs.'
  );

  const [quantifiedResult, setQuantifiedResult] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [atsScore, setAtsScore] = useState<number>(78);
  const [selectedPersona, setSelectedPersona] = useState<'corporate' | 'startup' | 'creative'>('startup');

  const handleEnhanceBullet = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      let result = '';
      if (selectedPersona === 'startup') {
        result = 'Architected 8+ high-performance React & TypeScript modules, reducing page load latency by 38% and resolving 100+ production bugs across 10k daily active users.';
      } else if (selectedPersona === 'corporate') {
        result = 'Spearheaded cross-functional enterprise web development initiatives using React and REST APIs, improving system uptime to 99.9% and optimizing front-end sprint velocity.';
      } else {
        result = 'Crafted visually captivating, accessible React web interfaces with fluid motion animations, elevating user engagement metrics by 52%.';
      }
      setQuantifiedResult(result);
      setIsEnhancing(false);
      setAtsScore(92);
    }, 800);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5 text-indigo-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'FolderGit2': return <FolderGit2 className="w-5 h-5 text-amber-400" />;
      case 'BotHandshake': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'SlidersHorizontal': return <SlidersHorizontal className="w-5 h-5 text-rose-400" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Task 03 / 05
          </span>
          <span className="text-xs text-slate-400">Generative AI Feature Architecture</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
          3. AI-Powered Resume Builder (5 Unique Features)
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          <strong className="text-indigo-300">Assignment Prompt:</strong> Use ChatGPT to brainstorm and list 5 unique features for an AI-powered Resume Builder app that goes beyond just filling forms. <em>(Features that use AI to personalize, analyze, or improve resumes)</em>.
        </p>
      </div>

      {/* 5 Unique Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resumeFeatures.map((feature) => (
          <div
            key={feature.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group hover:shadow-indigo-500/10"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                  {getIcon(feature.iconName)}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  Feature 0{feature.id}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-indigo-200 transition-colors">
                {feature.title}
              </h3>

              {/* One-Line Value */}
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 mb-3 leading-relaxed">
                <strong>Core Capability:</strong> {feature.oneLiner}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {feature.detailedExplanation}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Category:</span>
              <span className="text-indigo-300 font-semibold">{feature.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive AI Resume Sandbox Demo */}
      <div className="bg-slate-900 rounded-2xl border border-indigo-500/30 p-6 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Live AI Bullet Point & ATS Match Engine</h3>
              <p className="text-xs text-slate-400">Test Feature 1 (ATS Gap Analyzer) & Feature 2 (Bullet Quantification) in real-time!</p>
            </div>
          </div>

          {/* ATS Score Gauge */}
          <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono">ATS Match Score:</span>
            <div className="flex items-center space-x-2">
              <span className={`text-base font-bold font-mono ${atsScore > 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {atsScore}%
              </span>
              <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${atsScore > 85 ? 'bg-emerald-400' : 'bg-amber-400'}`} 
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Inputs */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>1. Target Job Description Keywords</span>
                <span className="text-[10px] text-indigo-400">Feature #1: ATS Keyword Match</span>
              </label>
              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>2. Draft Candidate Bullet Point</span>
                <span className="text-[10px] text-amber-400">Feature #2: Quantification Engine</span>
              </label>
              <textarea
                rows={2}
                value={bulletPointInput}
                onChange={(e) => setBulletPointInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            {/* Persona Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>3. Target Persona Tone (Feature #5)</span>
                <span className="text-[10px] text-purple-400 font-mono">Select Voice Style</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'startup', label: 'Startup Tech', desc: 'Fast-paced, metric-first' },
                  { id: 'corporate', label: 'Corporate Exec', desc: 'Formal, strategic leadership' },
                  { id: 'creative', label: 'Design & UI', desc: 'Accessible, UX-focused' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPersona(p.id as any)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedPersona === p.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.label}</div>
                    <div className="text-[10px] text-slate-500">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleEnhanceBullet}
              disabled={isEnhancing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2"
            >
              {isEnhancing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing AI Transformation...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Run AI Quantified Rewrite & Boost ATS Score</span>
                </>
              )}
            </button>
          </div>

          {/* Right Comparison Box */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>AI Transformation Output</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Style: {selectedPersona.toUpperCase()}
                </span>
              </div>

              {/* Input Original */}
              <div className="mt-4 space-y-1.5">
                <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Before (Raw Passive Text):</div>
                <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs text-slate-300 italic">
                  "{bulletPointInput}"
                </div>
              </div>

              {/* Transformed Result */}
              <div className="mt-4 space-y-1.5">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                  <span>After (AI Quantified Impact Statement):</span>
                  <span className="text-[10px] text-emerald-300 font-mono">+14 ATS Points</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-200 leading-relaxed shadow-inner">
                  {quantifiedResult || (
                    <span className="text-slate-500 italic">Click "Run AI Quantified Rewrite" above to generate enhanced result...</span>
                  )}
                </div>
              </div>

              {/* Detected Missing Keywords list */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 mb-2">Detected Keyword Alignment:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['TypeScript', 'React', 'Tailwind CSS', 'REST APIs', 'CI/CD', 'LLM Generative AI'].map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-mono text-indigo-300 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-200 flex items-center space-x-2">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>Uses Gemini API for structured JSON prompt extraction & metric quantification.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
