import React, { useState } from 'react';
import { MUSIC_PROMPT_COMPARISONS, MUSIC_COMPARISON_SUMMARY } from '../data';
import { Music, Check, Copy, Award, ArrowUpRight, Play, Heart, Radio, Sparkles, Layout } from 'lucide-react';
import { motion } from 'motion/react';

export const Task4MusicHeroCompare: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<'cartoon' | 'real'>('cartoon');

  const copyPrompt = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Task Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-3">
              <Music className="w-3.5 h-3.5" />
              <span>Task 4 • Prompt Style Comparison (Music Streaming App)</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Realistic vs. Cartoon Hero Prompts</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Engineered two distinct artistic directions for a music app landing page. Compare visual outputs, prompt structures, and strategic UI evaluations side-by-side.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 font-medium">Preview Landing Theme:</span>
            <button
              onClick={() => setActiveTheme('cartoon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTheme === 'cartoon'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cartoon Vector
            </button>
            <button
              onClick={() => setActiveTheme('real')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTheme === 'real'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Realistic 8K
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Prompt & Output Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MUSIC_PROMPT_COMPARISONS.map((comp) => {
          const isWinner = comp.id === 'cartoon-style';
          return (
            <motion.div
              key={comp.id}
              whileHover={{ y: -4 }}
              className={`bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all ${
                isWinner
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'border-slate-800'
              }`}
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      {comp.styleName}
                    </span>
                    {isWinner && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                        <Award className="w-3 h-3 mr-1 text-amber-400" /> Best for Consumer Web
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{comp.fileSize}</span>
                </div>

                {/* Image Display */}
                <div className="relative h-60 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                  <img
                    src={comp.webpUrl}
                    alt={comp.styleName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-300 border border-slate-700">
                    16:9 Aspect Ratio
                  </div>
                </div>

                {/* Prompt Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Engineered Prompt
                    </span>
                    <button
                      onClick={() => copyPrompt(comp.id, comp.prompt)}
                      className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                      title="Copy Prompt"
                    >
                      {copiedId === comp.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed italic">
                    "{comp.prompt}"
                  </p>
                </div>

                {/* Strengths & Best Use Cases */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white block">Key Visual Characteristics:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {comp.strengths.map((str, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 mr-2 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button to Activate Theme */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveTheme(comp.id === 'cartoon-style' ? 'cartoon' : 'real')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-colors ${
                    (activeTheme === 'cartoon' && comp.id === 'cartoon-style') ||
                    (activeTheme === 'real' && comp.id === 'real-style')
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Layout className="w-4 h-4" />
                  <span>
                    {(activeTheme === 'cartoon' && comp.id === 'cartoon-style') ||
                    (activeTheme === 'real' && comp.id === 'real-style')
                      ? 'Currently Active on Hero Landing Preview'
                      : 'Apply to Live Landing Page Preview'}
                  </span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Interactive Landing Page Preview using active theme */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <Radio className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">Live Music Landing Page Mockup</h3>
              <p className="text-xs text-slate-400">
                Rendering active theme: <strong className="text-indigo-400 font-semibold">{activeTheme === 'cartoon' ? '2D Cartoon Vector' : 'Realistic Cinematic 8K'}</strong>
              </p>
            </div>
          </div>
          <span className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
            Interactive Landing Hero
          </span>
        </div>

        {/* Music App Landing Hero Container */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left Copy & CTA */}
            <div className="p-8 space-y-6 z-10">
              <div className="inline-flex items-center space-x-2 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stream Over 100 Million Songs</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Feel Every Beat.<br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                  Anytime, Anywhere.
                </span>
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Experience loss-less audio quality, smart algorithmic playlists, and seamless listening across all your smart devices.
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/40 transition-all">
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start 30-Day Free Trial</span>
                </button>
                <button className="text-xs text-slate-300 hover:text-white font-semibold flex items-center space-x-1">
                  <span>Explore Playlists</span> <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative h-72 md:h-96 w-full overflow-hidden">
              <img
                src={activeTheme === 'cartoon' ? MUSIC_PROMPT_COMPARISONS[1].webpUrl : MUSIC_PROMPT_COMPARISONS[0].webpUrl}
                alt="Music Hero Active Theme"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Style Winner & In-Depth Analytical Comparison */}
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 text-amber-400">
          <Award className="w-6 h-6" />
          <h3 className="text-lg font-bold text-white">
            Which Prompt Style Worked Better & Why?
          </h3>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Winning Style</span>
          <h4 className="text-xl font-bold text-white">{MUSIC_COMPARISON_SUMMARY.winner}</h4>
          <p className="text-sm text-slate-300 leading-relaxed pt-1">
            {MUSIC_COMPARISON_SUMMARY.verdict}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MUSIC_COMPARISON_SUMMARY.keyReasons.map((reason, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 block">Reason {idx + 1}</span>
              <h5 className="text-sm font-bold text-white">{reason.title}</h5>
              <p className="text-xs text-slate-400 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
