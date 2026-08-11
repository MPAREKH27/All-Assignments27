import React, { useState } from 'react';
import { flowSteps } from '../data/assignmentData';
import { 
  GitFork, 
  LogIn, 
  LayoutDashboard, 
  Sparkles, 
  LogOut, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  User, 
  Cpu, 
  CheckCircle2, 
  ArrowDown, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Task4FlowDiagram: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleNextStep = () => {
    setActiveStepId((prev) => (prev < 4 ? prev + 1 : 1));
  };

  const handleResetSimulation = () => {
    setActiveStepId(1);
    setIsSimulating(false);
  };

  const getStepIcon = (id: number) => {
    switch (id) {
      case 1: return <LogIn className="w-5 h-5 text-indigo-400" />;
      case 2: return <LayoutDashboard className="w-5 h-5 text-emerald-400" />;
      case 3: return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 4: return <LogOut className="w-5 h-5 text-rose-400" />;
      default: return <GitFork className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Task 04 / 05
          </span>
          <span className="text-xs text-slate-400">User Interaction Architecture & Flowchart</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
          4. User Interaction Flow Diagram
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          <strong className="text-indigo-300">Assignment Prompt:</strong> Draw a simple flow diagram showing how a user would interact with your chosen app idea — from landing page to main feature completion. <em>(Include at least 4 steps, such as login, dashboard, using a main feature, and logout).</em>
        </p>
      </div>

      {/* Flow Walkthrough Controls */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Interactive User Flow Simulator</h3>
            <p className="text-xs text-slate-400">Step through the 4-stage lifecycle sequentially</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleNextStep}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md shadow-indigo-500/20"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Advance Step ({activeStepId}/4)</span>
          </button>

          <button
            onClick={handleResetSimulation}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all"
            title="Reset Flow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Flow Chart Horizontal / Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {flowSteps.map((step, idx) => {
          const isActive = activeStepId === step.id;
          const isPassed = activeStepId > step.id;

          return (
            <div key={step.id} className="relative flex flex-col">
              {/* Connector arrow desktop */}
              {idx < flowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className={`w-6 h-6 ${isPassed ? 'text-emerald-400 animate-pulse' : 'text-slate-700'}`} />
                </div>
              )}

              <div
                onClick={() => setActiveStepId(step.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex-1 flex flex-col justify-between space-y-4 shadow-lg ${
                  isActive
                    ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/40 shadow-indigo-500/10 scale-[1.02]'
                    : isPassed
                    ? 'bg-slate-900/90 border-emerald-500/40 opacity-90'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-xl border ${isActive ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-slate-950 border-slate-800'}`}>
                        {getStepIcon(step.id)}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">Step 0{step.id}</span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      step.actor === 'AI Engine'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {step.actor === 'AI Engine' ? <Cpu className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {step.actor}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 mb-1.5">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{step.description}</p>

                  {/* Bullet details */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 text-[11px] text-slate-300">
                        <ChevronRight className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <span className={isActive ? 'text-indigo-400 font-bold' : isPassed ? 'text-emerald-400' : 'text-slate-500'}>
                    {isActive ? 'Current Active Step' : isPassed ? 'Completed' : 'Upcoming'}
                  </span>
                  {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
              </div>

              {/* Mobile Connector */}
              {idx < flowSteps.length - 1 && (
                <div className="lg:hidden flex justify-center py-2 text-slate-700">
                  <ArrowDown className={`w-5 h-5 ${isPassed ? 'text-emerald-400' : 'text-slate-700'}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Flowchart Narrative & Decision Logic */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>System Decision Nodes & Authentication Guard Logic</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-indigo-400 uppercase">Node A: Auth Check</span>
            <p className="text-slate-300 leading-relaxed">
              If candidate is unauthenticated on Step 1, guest session token is generated in localStorage allowing immediate testing without sign-up friction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-amber-400 uppercase">Node B: ATS Keyword Gap</span>
            <p className="text-slate-300 leading-relaxed">
              If target job description text is pasted in Step 2, AI Engine initiates keyword extraction pipeline to compute live match score.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-rose-400 uppercase">Node C: Session Logout</span>
            <p className="text-slate-300 leading-relaxed">
              Upon PDF export completion in Step 4, user profile state is securely synced to cloud database and local session cache is purged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
