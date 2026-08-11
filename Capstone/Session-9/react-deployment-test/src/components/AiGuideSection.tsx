import React, { useState } from 'react';
import { Bot, Send, Sparkles, CheckCircle2, AlertTriangle, MessageSquareCode, FileText, RefreshCw, Copy, Check } from 'lucide-react';
import { StepLog } from '../types';

export const AiGuideSection: React.FC = () => {
  const [targetPlatform, setTargetPlatform] = useState<'Netlify' | 'Firebase'>('Firebase');
  const [customPrompt, setCustomPrompt] = useState(
    `Act as a senior DevOps engineer. Generate a complete, step-by-step guide for deploying a React single-page app built with Vite to ${targetPlatform} Hosting. Include build commands, configuration files to prevent 404 errors on page refresh, and verification steps.`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponseText, setAiResponseText] = useState<string>(`### Step-by-Step ${targetPlatform} Hosting Guide (AI Generated)

#### Step 1: Prepare Build Script & Verify Directory
- Check your \`package.json\` script to ensure Vite builds into \`dist/\`:
  \`\`\`bash
  npm run build
  \`\`\`

#### Step 2: Initialize ${targetPlatform} CLI
- For ${targetPlatform}:
  ${targetPlatform === 'Firebase' 
    ? 'Run `firebase login` then `firebase init hosting`. Set public folder to `dist` and select YES for single-page app rewrites.'
    : 'Run `npm install -g netlify-cli` and run `netlify init` or connect GitHub repository.'}

#### Step 3: Configure SPA 404 Prevention Rewrite
- ${targetPlatform === 'Firebase'
    ? 'Ensure `firebase.json` contains `"rewrites": [{"source": "**", "destination": "/index.html"}]`.'
    : 'Ensure `public/_redirects` contains `/* /index.html 200` or `netlify.toml` has redirects.'}

#### Step 4: Deploy & Test Live URL
- Execute final deployment:
  ${targetPlatform === 'Firebase' ? '`firebase deploy`' : '`netlify deploy --prod`'}
- Visit the live site and verify homepage displays "React Deployment Test".`);

  const [stepLogs, setStepLogs] = useState<StepLog[]>([
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Run local build script',
      command: 'npm run build',
      description: 'Compiled production assets into dist/ folder successfully.',
      status: 'completed',
      userNotes: 'Executed smoothly in 1.3 seconds.',
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Firebase init & SPA prompt selection',
      command: 'firebase init hosting',
      description: 'Configured public directory to dist/ and enabled SPA catch-all rewrites.',
      status: 'completed',
      userNotes: 'Crucial: Selected "Yes" when asked if single-page app.',
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'SPA Rewrite 404 Verification on Page Refresh',
      command: 'firebase.json verification',
      description: 'Tested visiting subroutes directly and refreshing.',
      status: 'completed',
      userNotes: 'No 404 error occurred! App loaded React Deployment Test correctly.',
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Execute final production deployment',
      command: targetPlatform === 'Firebase' ? 'firebase deploy' : 'netlify deploy --prod',
      description: 'Pushed compiled dist/ build to global CDN hosting.',
      status: 'completed',
      userNotes: 'Live URL active and verified.',
    },
  ]);

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const handlePlatformChange = (p: 'Netlify' | 'Firebase') => {
    setTargetPlatform(p);
    setCustomPrompt(
      `Act as a senior DevOps engineer. Generate a complete, step-by-step guide for deploying a React single-page app built with Vite to ${p} Hosting. Include build commands, configuration files to prevent 404 errors on page refresh, and verification steps.`
    );
  };

  const handleGenerateAiGuide = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: targetPlatform,
          promptOverride: customPrompt,
        }),
      });
      const data = await res.json();
      if (data.success && data.guide) {
        setAiResponseText(data.guide);
      }
    } catch (err) {
      console.error('Error contacting AI guide endpoint:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateStepStatus = (id: string, status: 'completed' | 'failed') => {
    setStepLogs((prev) =>
      prev.map((step) => (step.id === id ? { ...step, status } : step))
    );
  };

  const updateStepNote = (id: string, userNotes: string) => {
    setStepLogs((prev) =>
      prev.map((step) => (step.id === id ? { ...step, userNotes } : step))
    );
  };

  const copyText = (text: string, type: 'prompt' | 'response') => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-slate-900 to-teal-950/40 p-6 rounded-2xl border border-emerald-500/20 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Task 5: AI-Generated Deployment Guide & Execution Log
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Use ChatGPT, Copilot, or Gemini to generate a step-by-step React deployment guide, follow the instructions, and log any unexpected issues!
            </p>
          </div>
        </div>
      </div>

      {/* AI Prompt Generator & Live Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Prompt Input Form */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <MessageSquareCode className="w-5 h-5" />
              <span>1. AI Prompt Configuration</span>
            </div>
            <span className="text-[10px] text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-500/30 font-mono font-semibold">
              ChatGPT / Copilot / Gemini
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Target Deployment Provider</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handlePlatformChange('Firebase')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  targetPlatform === 'Firebase'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Firebase Hosting
              </button>
              <button
                onClick={() => handlePlatformChange('Netlify')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  targetPlatform === 'Netlify'
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Netlify
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300">Prompt Sent to AI</label>
              <button
                onClick={() => copyText(customPrompt, 'prompt')}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            onClick={handleGenerateAiGuide}
            disabled={isGenerating}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating AI Deployment Guide...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Guide with Gemini AI</span>
              </>
            )}
          </button>
        </div>

        {/* Right: AI Response Display */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-sm">
              <FileText className="w-5 h-5" />
              <span>2. Generated AI Response</span>
            </div>
            <button
              onClick={() => copyText(aiResponseText, 'response')}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              {copiedResponse ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedResponse ? 'Copied!' : 'Copy AI Output'}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-h-[360px] overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap">
            {aiResponseText}
          </div>
        </div>

      </div>

      {/* Step Tracker & Unexpected Issues Log */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>3. Step-by-Step Followup & Unexpected Step Notes</span>
          </h3>
          <span className="text-xs text-slate-400">
            Note any step that didn't work as expected
          </span>
        </div>

        <div className="space-y-3">
          {stepLogs.map((step) => (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all text-xs space-y-3 ${
                step.status === 'completed'
                  ? 'bg-slate-950/80 border-slate-800'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-emerald-400 text-[11px]">
                    {step.stepNumber}
                  </span>
                  <span className="font-bold text-slate-100">{step.title}</span>
                  {step.command && (
                    <code className="text-[11px] font-mono text-teal-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {step.command}
                    </code>
                  )}
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <button
                    onClick={() => updateStepStatus(step.id, 'completed')}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-all ${
                      step.status === 'completed'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Worked as Expected
                  </button>
                  <button
                    onClick={() => updateStepStatus(step.id, 'failed')}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-all ${
                      step.status === 'failed'
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Unexpected Issue
                  </button>
                </div>
              </div>

              <p className="text-slate-400 text-xs">{step.description}</p>

              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Notes / Unexpected Issue Log
                </label>
                <input
                  type="text"
                  value={step.userNotes || ''}
                  onChange={(e) => updateStepNote(step.id, e.target.value)}
                  placeholder="e.g. Node version mismatch, missing rewrites config, build folder typo..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
