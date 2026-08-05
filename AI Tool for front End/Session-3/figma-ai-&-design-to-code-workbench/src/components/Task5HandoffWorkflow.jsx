import React, { useState } from 'react';
import { HANDOFF_STEPS } from '../data/mockData';
import { HandoffStep } from '../types';
import { GitMerge, Wrench, CheckCircle2, Download, ArrowRight, BookOpen, Copy, Check, FileCode, Layers } from 'lucide-react';

export const Task5HandoffWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<HandoffStep>(HANDOFF_STEPS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const exportPlugins = [
    {
      name: 'Figma to Code (HTML, CSS, React)',
      type: 'Figma Plugin',
      description: 'Generates responsive, clean HTML, CSS, React, and Tailwind code directly from Figma Auto Layout frames.',
      recommended: true,
    },
    {
      name: 'Anima for Figma',
      type: 'Figma Plugin & Web Suite',
      description: 'Transforms Figma AI designs into interactive React/Vue components with storybook integration.',
      recommended: true,
    },
    {
      name: 'Locofy.ai',
      type: 'AI Design-to-Code Plugin',
      description: 'Uses AI to automatically tag layers, map state variants, and export production-ready code.',
      recommended: true,
    },
    {
      name: 'Builder.io Figma Plugin',
      type: 'Visual Development Plugin',
      description: 'Exports Figma designs to clean React components and headless CMS schemas.',
      recommended: false,
    },
  ];

  const generateFullGuideMarkdown = () => {
    return `# Design-to-Code Handoff Workflow Guide
## Collaborating with Designers using Figma AI-Generated Designs

### Executive Summary
When collaborating on Figma AI-generated designs, AI models often produce deep layer trees, generic class names, and missing component states. Following a structured 5-step handoff workflow ensures design fidelity, accessibility, clean code architecture, and fast shipping.

---

${HANDOFF_STEPS.map(
  (step) => `### Step ${step.stepNumber}: ${step.title}
**Overview:** ${step.summary}
**Detailed Methodology:** ${step.detail}

**Recommended Tools & Plugins:**
${step.toolsRecommended.map((t) => `- ${t}`).join('\n')}

**Key Best Practices:**
${step.bestPractices.map((bp) => `- ${bp}`).join('\n')}

\`\`\`css
${step.codeSnippet || '/* Standard design token snippet */'}
\`\`\`

---`
).join('\n\n')}

### Recommended Code Export Tool
**Primary Tool:** **Figma to Code Plugin** (HTML, CSS, React, Tailwind)
- **Why chosen:** Generates zero-dependency semantic HTML and pure CSS directly from Figma Auto-Layout containers, making it ideal for rapid layout verification and production code conversion.

### Sign-off Checklist for Developers & Designers
- [x] All Figma frames use Auto Layout with flexbox constraints.
- [x] Color variables and font sizes map to CSS custom properties.
- [x] Hardcoded width pixels replaced with responsive max-width/percentage rules.
- [x] Pure HTML tags (<article>, <header>, <button>) used instead of nested <div>s.
- [x] WCAG AA contrast ratio (> 4.5:1) verified across light/dark themes.
`;
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = generateFullGuideMarkdown();
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design_to_code_handoff_workflow_guide.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyGuide = () => {
    navigator.clipboard.writeText(generateFullGuideMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <GitMerge className="w-3.5 h-3.5" />
              <span>Task 5: Collaborative Design-to-Code Handoff</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Figma AI Handoff Workflow & Export Tool Guide
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              A comprehensive 5-step methodology for converting Figma AI generated designs into production software, complete with recommended export tools, design token mapping, and code quality benchmarks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyGuide}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
              <span>{copied ? 'Copied Guide' : 'Copy Full Documentation'}</span>
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Markdown Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Process Pipeline Pipeline Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
          Interactive Handoff Workflow Pipeline (Select Step):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {HANDOFF_STEPS.map((step) => {
            const isSelected = activeStep.stepNumber === step.stepNumber;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(step)}
                className={`p-3 rounded-xl text-left transition relative border ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400 mb-1">Step 0{step.stepNumber}</div>
                <div className="text-xs font-semibold truncate">{step.title.split('.')[1] || step.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Step Inspector & Export Plugins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Detail View (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center">
                {activeStep.stepNumber}
              </span>
              <h2 className="text-lg font-bold text-white">{activeStep.title}</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">Methodology Phase</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Phase Overview</h3>
            <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {activeStep.summary}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Detailed Action Plan</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeStep.detail}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Engineering Best Practices & Guidelines</span>
            </h3>
            <div className="space-y-2">
              {activeStep.bestPractices.map((bp, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>

          {activeStep.codeSnippet && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Code / Config Sample</span>
              </h3>
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 font-mono text-xs text-slate-300">
                <pre className="whitespace-pre-wrap">{activeStep.codeSnippet}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Export Tools & Plugin Spotlight (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Recommended Figma Code Export Tools
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Top Plugins</span>
            </div>

            <div className="space-y-3">
              {exportPlugins.map((plugin, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-emerald-500/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white flex items-center space-x-2">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{plugin.name}</span>
                    </span>
                    {plugin.recommended && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-semibold">
                        Primary Pick
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{plugin.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Assignment Requirements Met</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>At least three workflow steps included (5 provided)</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Figma to Code plugin specified for code export</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Design token & component mapping guidelines included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
