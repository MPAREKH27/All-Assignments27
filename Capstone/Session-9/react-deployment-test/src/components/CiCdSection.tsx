import React, { useState } from 'react';
import { GitBranch, GitCommit, CheckCircle2, RefreshCcw, Zap, ShieldCheck, Play, ArrowRight } from 'lucide-react';

export const CiCdSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);

  const pipelineStages = [
    { name: 'Git Push', desc: 'Developer pushes code to GitHub main branch', icon: GitCommit },
    { name: 'Automated Test & Lint', desc: 'CI checks TypeScript types & runs ESLint', icon: ShieldCheck },
    { name: 'Vite Production Build', desc: 'Build runner compiles React JSX to dist/', icon: Zap },
    { name: 'Auto Deploy to Netlify/Firebase', desc: 'CD deploys built static assets instantly', icon: CheckCircle2 },
  ];

  const handleRunPipeline = () => {
    setIsRunningPipeline(true);
    setActiveStage(0);

    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= pipelineStages.length - 1) {
          clearInterval(interval);
          setIsRunningPipeline(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-purple-500/20 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 border border-purple-500/30">
            <GitBranch className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Task 4: CI/CD Explanation & Key Benefits
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Understanding Continuous Integration and Continuous Deployment for modern React applications.
            </p>
          </div>
        </div>
      </div>

      {/* Main CI/CD Explanation Card (3-4 Sentences as required) */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-lg">
        <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>What CI/CD Means (Concise 3-4 Sentence Definition)</span>
        </div>

        <div className="bg-slate-950 border border-purple-500/30 p-5 rounded-xl text-sm leading-relaxed text-slate-200 font-sans shadow-inner">
          <p>
            <strong className="text-purple-300">CI/CD</strong> stands for <strong>Continuous Integration and Continuous Deployment</strong>, an automated software engineering practice that automatically builds, tests, and deploys code changes whenever new commits are pushed to a repository. Continuous Integration ensures that new code updates pass type checks and linting rules without breaking existing functionality, while Continuous Deployment automatically delivers the compiled production assets directly to hosting servers like Netlify or Firebase Hosting. This eliminates manual build commands and upload steps, allowing developers to ship updates quickly, safely, and reliably.
          </p>
        </div>
      </div>

      {/* Two Core Ways CI/CD Helps Manage Future React App Updates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Benefit 1 */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
            01
          </div>
          <h3 className="text-base font-bold text-white">
            1. Instant Zero-Downtime Deployment on Git Push
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instead of manually running <code className="text-purple-300 font-mono">npm run build</code> and dragging files into a hosting dashboard or running CLI commands every time a bug is fixed, pushing a commit to GitHub automatically triggers a build and updates the live React site in seconds with zero downtime.
          </p>
        </div>

        {/* Benefit 2 */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
            02
          </div>
          <h3 className="text-base font-bold text-white">
            2. Automated Error Prevention & Preview Deployments
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            CI/CD pipelines automatically run build scripts and type-checking tests before pushing to production. If a syntax error or broken React component exists, the build fails safely in CI, preventing broken code from reaching users, while pull requests generate isolated preview URLs for review.
          </p>
        </div>

      </div>

      {/* Interactive Visual CI/CD Pipeline Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <RefreshCcw className="w-4 h-4 text-purple-400" />
              <span>Interactive React CI/CD Pipeline Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate an automated GitHub Actions to Netlify / Firebase deployment workflow.
            </p>
          </div>

          <button
            onClick={handleRunPipeline}
            disabled={isRunningPipeline}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center space-x-2 self-start sm:self-auto shadow-md shadow-purple-600/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunningPipeline ? 'Pipeline Executing...' : 'Trigger Git Push'}</span>
          </button>
        </div>

        {/* Pipeline Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = activeStage === idx && isRunningPipeline;
            const isCompleted = activeStage > idx || (activeStage === pipelineStages.length - 1 && !isRunningPipeline);

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all text-xs space-y-2 relative ${
                  isCurrent
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/20 ring-2 ring-purple-500/40'
                    : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Step {idx + 1}
                  </span>
                </div>

                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>{stage.name}</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-snug">
                  {stage.desc}
                </p>

                {isCurrent && (
                  <div className="text-[10px] text-purple-300 font-mono font-semibold animate-pulse flex items-center gap-1 pt-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                    Running step...
                  </div>
                )}

                {isCompleted && (
                  <div className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Passed (0s)
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
